#!/usr/bin/env python3
"""
Send a DailyLocal issue to the KV subscriber list via /api/send (free transactional tier — no Marketing plan).

  python3 send_issue.py 1 --secret <SEND_SECRET> --dry-run   # check the count, send nothing
  python3 send_issue.py 1 --secret <SEND_SECRET>             # actually send issue 001

Builds the email HTML + plain text straight from newsletter/NNN-*.md (reuses build_news.py), then POSTs it.
The /api/send endpoint adds the List-Unsubscribe header + footer link to every email.
"""
import sys, json, glob, urllib.request
import build_news as bn

ENDPOINT = "https://localdiabetic.com/api/send"


def email_html(body):
    inner = bn.body_html(body)
    return ('<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;'
            'max-width:560px;margin:0 auto;color:#2B2118;line-height:1.65;font-size:16px">'
            '<p style="font-size:20px;font-weight:800;color:#D99A2B;margin:0 0 14px">🐝 The DailyLocal</p>'
            f'{inner}</div>')


def email_text(body):
    import re
    t = body.replace("**", "").replace("*", "")
    return re.sub(r"^- ", "• ", t, flags=re.M)


def main():
    if len(sys.argv) < 2:
        print("usage: send_issue.py <issue#> --secret <SEND_SECRET> [--dry-run]"); return
    num = sys.argv[1].zfill(3)
    dry = "--dry-run" in sys.argv
    secret = sys.argv[sys.argv.index("--secret") + 1] if "--secret" in sys.argv else ""
    matches = glob.glob(f"newsletter/{num}-*.md")
    if not matches:
        print(f"no issue {num} in newsletter/"); return
    meta, body = bn.parse(matches[0])
    payload = {
        "secret": secret,
        "subject": meta.get("subject") or meta.get("title", "The DailyLocal"),
        "html": email_html(body),
        "text": email_text(body),
        "dryRun": dry,
    }
    req = urllib.request.Request(ENDPOINT, json.dumps(payload).encode(), {"Content-Type": "application/json", "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"})
    try:
        out = json.loads(urllib.request.urlopen(req, timeout=180).read())
    except urllib.error.HTTPError as e:
        out = {"http_error": e.code, "body": e.read().decode()[:200]}
    label = "DRY RUN" if dry else "SENT"
    print(f"  [{label}] issue {num} · {payload['subject']}")
    print(f"  → {out}")


if __name__ == "__main__":
    main()
