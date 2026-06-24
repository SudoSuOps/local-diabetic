// POST /api/stripe-webhook — Stripe -> Printful auto-fulfillment.
// On checkout.session.completed: verify signature, then create the Printful order
// with the buyer's shipping address. Idempotent via KV (env.localdiabetics).
// Env: STRIPE_WEBHOOK_SECRET, PRINTFUL_TOKEN, ORDER_CONFIRM ("true"=auto-submit | "false"=draft).
const enc = (s) => new TextEncoder().encode(s);

async function verifyStripeSig(secret, payload, header) {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((kv) => kv.split("=")));
  const t = parts.t, v1 = parts.v1;
  if (!t || !v1) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) return false; // 5-min tolerance
  const key = await crypto.subtle.importKey("raw", enc(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, enc(`${t}.${payload}`));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  if (hex.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ v1.charCodeAt(i);
  return diff === 0;
}

export async function onRequestPost({ request, env }) {
  const raw = await request.text();
  const ok = await verifyStripeSig(env.STRIPE_WEBHOOK_SECRET || "", raw, request.headers.get("stripe-signature"));
  if (!ok) return new Response("bad signature", { status: 400 });

  let event;
  try { event = JSON.parse(raw); } catch { return new Response("bad json", { status: 400 }); }
  if (event.type !== "checkout.session.completed") return new Response("ignored", { status: 200 });

  const s = event.data.object;
  const sid = s.id;

  // idempotency: skip if we've already fulfilled this session
  const kv = env.localdiabetics;
  if (kv) {
    if (await kv.get("pforder:" + sid)) return new Response("dup", { status: 200 });
  }

  const ship = s.shipping_details || s.collected_information?.shipping_details ||
               { name: s.customer_details?.name, address: s.customer_details?.address };
  const a = ship.address || {};
  const recipient = {
    name: ship.name || s.customer_details?.name || "Customer",
    address1: a.line1 || "",
    address2: a.line2 || "",
    city: a.city || "",
    state_code: a.state || "",
    country_code: a.country || "US",
    zip: a.postal_code || "",
    email: s.customer_details?.email || "",
    phone: s.customer_details?.phone || "",
  };
  const vid = s.metadata?.pf_variant;
  const qty = Math.max(parseInt(s.metadata?.qty || "1", 10) || 1, 1);
  if (!vid || !recipient.address1) {
    // can't fulfill without address/variant — record for manual handling, ack so Stripe stops retrying
    if (kv) await kv.put("pforderFAIL:" + sid, JSON.stringify({ vid, recipient }), { expirationTtl: 2592000 });
    return new Response("missing data", { status: 200 });
  }

  const confirm = (env.ORDER_CONFIRM ?? "true") !== "false";
  const order = {
    external_id: "stripe_" + sid,           // dedupe at Printful too
    confirm,
    recipient,
    items: [{ sync_variant_id: Number(vid), quantity: qty }],
  };
  const r = await fetch("https://api.printful.com/orders", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + env.PRINTFUL_TOKEN,
      "Content-Type": "application/json",
      "User-Agent": "LocalDiabetic-Shop/1.0",
    },
    body: JSON.stringify(order),
  });
  const body = await r.json().catch(() => ({}));
  if (kv) {
    await kv.put("pforder:" + sid,
      JSON.stringify({ printful: body.result?.id, status: body.result?.status, code: r.status }),
      { expirationTtl: 31536000 });
  }
  // always 200 on a verified event so Stripe doesn't hammer retries; failures are in KV
  return new Response(JSON.stringify({ ok: r.ok, printful_order: body.result?.id || null }), {
    status: 200, headers: { "Content-Type": "application/json" },
  });
}
