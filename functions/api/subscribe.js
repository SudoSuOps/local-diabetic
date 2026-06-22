// Cloudflare Pages Function — POST /api/subscribe -> The DailyLocal newsletter signup.
// Reuses RESEND_API_KEY (same as the contact form). If RESEND_AUDIENCE_ID is set, the email is added to a
// managed Resend audience for broadcasts; either way build@opendiabetic.com is notified so no signup is lost.

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });

const clean = (v, n) => String(v ?? "").trim().slice(0, n);
const looksEmail = (e) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

export async function onRequestPost({ request, env }) {
  let data;
  try { data = await request.json(); } catch { return json({ error: "bad request" }, 400); }
  if (data.company) return json({ ok: true });               // honeypot
  const email = clean(data.email, 160);
  if (!looksEmail(email)) return json({ error: "Please enter a valid email." }, 400);
  if (!env.RESEND_API_KEY) return json({ error: "Signups are paused — email build@opendiabetic.com to join." }, 500);

  const auth = { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" };

  // 1. add to the managed audience if one is configured (best-effort; never blocks the signup)
  if (env.RESEND_AUDIENCE_ID) {
    try {
      await fetch(`https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`, {
        method: "POST", headers: auth, body: JSON.stringify({ email, unsubscribed: false }),
      });
    } catch (_) { /* fall through to the notification */ }
  }

  // 2. always notify so the list is captured even before an audience is set up
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: auth,
    body: JSON.stringify({
      from: "The DailyLocal <hello@opendiabetic.com>",
      to: ["build@opendiabetic.com"],
      reply_to: email,
      subject: `[The DailyLocal] New subscriber — ${email}`,
      text: `New DailyLocal signup from localdiabetic.com\n\nEmail: ${email}\n\nAdd to the list / send the welcome.`,
    }),
  });
  if (!r.ok) return json({ error: "Couldn't sign you up just now — please email build@opendiabetic.com.", detail: (await r.text()).slice(0, 200) }, 502);
  return json({ ok: true });
}

export const onRequestGet = () => json({ ok: true, endpoint: "subscribe" });

export function onRequestOptions() {
  return new Response(null, { status: 204, headers: {
    "Allow": "POST, OPTIONS",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }});
}
