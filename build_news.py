#!/usr/bin/env python3
"""
The DailyLocal publisher — turns newsletter/*.md into published pages under dailylocal/.

One piece of writing → a permanent, searchable web page. Run this after writing a new issue:
  python3 build_news.py
It generates dailylocal/<slug>.html for each issue + dailylocal/index.html (the archive).
Stdlib only. The welcome (000) and README are skipped — those aren't public articles.
"""
import os, re, glob, json

SRC = "newsletter"
OUT = "dailylocal"
SITE = "https://localdiabetic.com"
SHORTS_DB = "dailyshorts/shorts.json"   # DailyShorts registry (pin by slug from issue frontmatter)


def load_shorts():
    """Registry of rendered DailyShorts, keyed by slug. {} if none yet."""
    if not os.path.exists(SHORTS_DB):
        return {}
    return {s["slug"]: s for s in json.load(open(SHORTS_DB, encoding="utf-8"))}


def mmss(sec):
    sec = int(sec or 0)
    return f"{sec // 60}:{sec % 60:02d}"


def short_player(s):
    """The pinned DailyShort — a vertical 9:16 player at the top of a web issue.
    Muted + playsinline by default (autoplay-safe); on-screen text/captions carry it."""
    dur = mmss(s.get("durationSec", 65))
    cap = f'<track kind="captions" src="{s["captionsUrl"]}" srclang="en" label="English" default>' if s.get("captionsUrl") else ""
    return f"""<figure class="dailyshort" style="margin:0 0 40px;display:flex;flex-direction:column;align-items:center;gap:14px">
  <div style="position:relative;width:100%;max-width:340px;aspect-ratio:9/16;max-height:78vh;border-radius:22px;overflow:hidden;background:#0B0F14;border:1px solid #ECE3D2;box-shadow:0 30px 60px -40px rgba(43,33,24,.45)">
    <video style="width:100%;height:100%;object-fit:cover;display:block" playsinline muted controls preload="none"
      poster="{s['posterUrl']}" width="1080" height="1920">
      <source src="{s['videoUrl']}" type="video/mp4">{cap}
    </video>
  </div>
  <figcaption style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;font:600 14px/1.4 'Inter',system-ui,sans-serif;color:#6B5E4F">
    <span style="background:#F2B441;color:#1a1205;font-weight:800;border-radius:999px;padding:5px 12px;font-size:12.5px">▶ Today&rsquo;s Short</span>
    <b style="color:#2B2118">{s.get('title','')}</b>
    <span style="color:#9B8D7B">· {s.get('topic','')} · {dur}</span>
  </figcaption>
</figure>"""


def parse(path):
    raw = open(path, encoding="utf-8").read()
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, re.S)
    fm, body = (m.group(1), m.group(2)) if m else ("", raw)
    meta = {}
    for line in fm.split("\n"):
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip().strip('"')
    slug = re.sub(r"^\d+-", "", os.path.splitext(os.path.basename(path))[0])
    meta["slug"] = slug
    return meta, body.strip()


def inline(t):
    t = (t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"\*(.+?)\*", r"<em>\1</em>", t)
    t = re.sub(r"\[(.+?)\]\((.+?)\)", r'<a href="\2">\1</a>', t)
    return t


def body_html(body):
    out, para, in_list = [], [], False
    def flush():
        if para:
            out.append("<p>" + inline(" ".join(para).strip()) + "</p>"); para.clear()
    for line in body.split("\n"):
        s = line.rstrip()
        if s.strip() == "---":
            flush()
            if in_list: out.append("</ul>"); in_list = False
            out.append('<hr class="rule">'); continue
        if s.startswith("- "):
            flush()
            if not in_list: out.append('<ul class="steps">'); in_list = True
            out.append("<li>" + inline(s[2:].strip()) + "</li>"); continue
        if in_list and not s.strip():
            out.append("</ul>"); in_list = False; continue
        if not s.strip():
            flush(); continue
        if s.startswith("## "):
            flush(); out.append("<h2>" + inline(s[3:]) + "</h2>"); continue
        para.append(s.strip())
    flush()
    if in_list: out.append("</ul>")
    # the 🐝 sign line → centered brand
    return "\n".join(out).replace("<p>🐝 localdiabetic.com</p>",
                                  '<p class="signbee">🐝 localdiabetic.com</p>')


def first_sentence(body):
    txt = re.sub(r"[*#>-]", "", body.split("\n\n")[0]).strip()
    return (txt[:155] + "…") if len(txt) > 156 else txt


YOUTUBE = "https://www.youtube.com/@LocalDiabeticwin"  # LocalDiabetic channel


def share_bar(s, slug):
    """Forward-to-a-friend · X post · copy link (· YouTube when set) under a pinned Short."""
    import urllib.parse as up
    url = f"{SITE}/dailylocal/{slug}"
    title = s.get("title", "")
    xtext = f"{title} 🐝 A 60-second LocalDiabetic Short on A1C + time in range. Know your numbers — win big."
    x_url = "https://x.com/intent/tweet?text=" + up.quote(xtext) + "&url=" + up.quote(url)
    mail = ("mailto:?subject=" + up.quote(f"Watch this — {title} 🐝") +
            "&body=" + up.quote(f"A 60-second LocalDiabetic Short — {title}.\n\nWatch it: {url}\n\nKnow your numbers. Win big. 🐝"))
    pill = ("text-decoration:none;display:inline-flex;align-items:center;gap:8px;font:700 14px/1 'Inter',system-ui,sans-serif;"
            "color:#2B2118;background:#fff;border:1px solid #ECE3D2;border-radius:999px;padding:11px 18px;cursor:pointer")
    yt = (f'<a style="{pill}" href="{YOUTUBE}" target="_blank" rel="noopener" aria-label="LocalDiabetic on YouTube">▶ YouTube</a>'
          if YOUTUBE else "")
    return f"""<div class="ds-share" style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:0 0 40px">
  <a style="{pill}" href="{x_url}" target="_blank" rel="noopener">𝕏 &nbsp;Post on X</a>
  <a style="{pill}" href="{mail}">✉ &nbsp;Forward to a friend</a>
  <button type="button" style="{pill}" onclick="navigator.clipboard.writeText('{url}').then(()=>{{this.firstChild.textContent='✓  Link copied';}})"><span>🔗 &nbsp;Copy link</span></button>
  {yt}
</div>"""


def page(meta, body, shorts=None):
    title, slug = meta.get("title", "DailyLocal"), meta["slug"]
    desc = first_sentence(body)
    date = meta.get("date", "")
    src = meta.get("source", "")
    src_html = f'<p class="source">Sources: {inline(src)}</p>' if src else ""
    # pinned DailyShort (frontmatter: pinned_short: <slug>)
    pin = (shorts or {}).get(meta.get("pinned_short", ""))
    pin_html = (short_player(pin) + share_bar(pin, slug)) if pin else ""
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} · The DailyLocal · LocalDiabetic</title>
<meta name="description" content="{desc}">
<link rel="icon" href="/assets/bee.svg" type="image/svg+xml">
<link rel="canonical" href="{SITE}/dailylocal/{slug}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="article">
<meta property="og:title" content="{title} · The DailyLocal">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{SITE}/dailylocal/{slug}">
<meta property="og:image" content="{SITE}/assets/og.png">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@opendiabetics">
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"Article","headline":{title!r},
"datePublished":"{date}","author":{{"@type":"Person","name":"Donovan Mackey","description":"Type 1 diabetic, building LocalDiabetic"}},
"publisher":{{"@type":"Organization","name":"LocalDiabetic","url":"{SITE}"}},
"mainEntityOfPage":"{SITE}/dailylocal/{slug}","isAccessibleForFree":true}}
</script>
<link rel="stylesheet" href="/style.css">
</head><body>
<header class="nav">
  <a class="brand" href="/"><span class="bee" aria-hidden="true">🐝</span><span>Local<b>Diabetic</b></span></a>
  <nav><a href="/dailylocal">← The DailyLocal</a><a class="btn" href="/#news">Subscribe</a></nav>
</header>
<article class="post">
  <p class="eyebrow">🐝 The DailyLocal{f' · {date}' if date else ''}</p>
  <h1>{title}</h1>
  {pin_html}
  {body_html(body)}
  <p class="signoff">— Donovan<br>Building one day at a time 🐝</p>
  {src_html}
  <div class="post-cta">
    <p><b>The DailyLocal</b> — one small diabetic-life win at a time, written by someone living it.</p>
    <a class="btn big" href="/#news">Get it free in your inbox →</a>
    <p class="byline">— Donovan · Type 1 Diabetic · building LocalDiabetic one day at a time</p>
  </div>
</article>
<footer class="footer"><div class="wrap">
  <p class="links"><a href="/">Home</a> · <a href="/dailylocal">The DailyLocal</a> · <a href="/about">About Donovan</a> · <a href="/try">Try the model</a> · <a href="https://www.youtube.com/@LocalDiabeticwin" target="_blank" rel="noopener">YouTube</a></p>
  <p class="motto">The good stuff, no noise.</p>
  <p class="legal">© 2026 Swarm and Bee LLC · build@localdiabetic.com · General education, not medical advice.</p>
</div></footer>
</body></html>"""


def archive(items):
    by_month = {}
    for meta in items:
        d = meta.get("date", "")
        month = ""
        if re.match(r"\d{4}-\d{2}", d):
            y, mo = d[:4], int(d[5:7])
            month = ["", "January", "February", "March", "April", "May", "June", "July", "August",
                     "September", "October", "November", "December"][mo] + " " + y
        by_month.setdefault(month or "Recent", []).append(meta)
    blocks = ""
    for month, metas in by_month.items():
        rows = "".join(
            f'<a class="arow" href="/dailylocal/{m["slug"]}"><b>{m.get("title")}</b>'
            f'<span>{m.get("subject","").replace(chr(34),"")}</span></a>' for m in metas)
        blocks += f'<h2>{month}</h2><div class="arows">{rows}</div>'
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The DailyLocal — LocalDiabetic's notebook</title>
<meta name="description" content="The DailyLocal: one small, useful diabetic-life win at a time — written by Donovan Mackey, a Type 1 diabetic building LocalDiabetic. Foot care, your numbers, food, real life. No noise.">
<link rel="icon" href="/assets/bee.svg" type="image/svg+xml">
<link rel="canonical" href="{SITE}/dailylocal">
<meta property="og:title" content="The DailyLocal — LocalDiabetic"><meta property="og:url" content="{SITE}/dailylocal">
<meta property="og:description" content="One small diabetic-life win at a time. Written by someone living it.">
<meta property="og:image" content="{SITE}/assets/og.png">
<link rel="stylesheet" href="/style.css">
</head><body>
<header class="nav">
  <a class="brand" href="/"><span class="bee" aria-hidden="true">🐝</span><span>Local<b>Diabetic</b></span></a>
  <nav><a href="/">Home</a><a href="/about">About Donovan</a><a class="btn" href="/#news">Subscribe</a></nav>
</header>
<section class="hero" style="padding:54px 0 30px">
  <div class="wrap">
    <h1>The DailyLocal</h1>
    <p class="lede">One small, useful diabetic-life win at a time — written by someone living it.
      Foot care, your numbers, food, real days. <b>The good stuff, no noise.</b></p>
    <div class="cta"><a class="btn big" href="/#news">Get it free in your inbox →</a></div>
  </div>
</section>
<section class="section"><div class="wrap archive">
  {blocks}
</div></section>
<footer class="footer"><div class="wrap">
  <p class="links"><a href="/">Home</a> · <a href="/about">About Donovan</a> · <a href="/try">Try the model</a> · <a href="https://www.youtube.com/@LocalDiabeticwin" target="_blank" rel="noopener">YouTube</a></p>
  <p class="motto">The good stuff, no noise. 🐝</p>
  <p class="legal">© 2026 Swarm and Bee LLC · build@localdiabetic.com · General education, not medical advice.</p>
</div></footer>
</body></html>"""


def main():
    os.makedirs(OUT, exist_ok=True)
    shorts = load_shorts()
    items = []
    for path in sorted(glob.glob(f"{SRC}/*.md")):
        name = os.path.basename(path)
        if name == "README.md" or name.startswith("000"):
            continue
        meta, body = parse(path)
        open(f"{OUT}/{meta['slug']}.html", "w", encoding="utf-8").write(page(meta, body, shorts))
        if meta.get("pinned_short") in shorts:
            print(f"    📌 pinned Short '{meta['pinned_short']}' → {meta['slug']}")
        items.append(meta)
    items.sort(key=lambda m: m.get("date", ""), reverse=True)
    open(f"{OUT}/index.html", "w", encoding="utf-8").write(archive(items))
    print(f"  published {len(items)} issues → {OUT}/ + archive")
    for m in items:
        print(f"    /dailylocal/{m['slug']}  ·  {m.get('title')}")


if __name__ == "__main__":
    main()
