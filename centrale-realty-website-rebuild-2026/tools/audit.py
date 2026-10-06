"""Site audit for the static Centrale Realty site. Run: python3 tools/audit.py
Exits non-zero if any ERROR is found. Checks:
  - every internal link / image / video / stylesheet / font target exists (incl. #anchors)
  - no dead-end pages (every page has primary nav + footer links) and no orphans
    (every page is reachable from the home page)
  - sitemap.xml lists exactly the real pages; robots.txt points at it; 404 page exists
  - one <h1>, unique <title> and meta description, canonical matches the path, lang set
  - images have alt text, mailto/tel links are well formed, no TODO/placeholder text
  - .htaccess redirect targets exist
"""
import os, re, sys
from html.parser import HTMLParser
from urllib.parse import urlparse, urldefrag, unquote

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "site")
BASE = "https://centralerealty.com"
errors, warns = [], []
E = lambda m: errors.append(m)
W = lambda m: warns.append(m)


class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links, self.assets, self.ids = [], [], set()
        self.h1 = 0
        self.title = ""
        self._t = False
        self.meta, self.imgs_noalt = {}, 0
        self.canonical = None
        self.lang = None
        self.nav_links = self.foot_links = 0
        self._in = []
        self.text = []

    def handle_starttag(self, tag, a):
        a = dict(a)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "html":
            self.lang = a.get("lang")
        if tag == "title":
            self._t = True
        if tag == "h1":
            self.h1 += 1
        if tag == "meta":
            k = a.get("name") or a.get("property")
            if k:
                self.meta[k] = a.get("content", "")
        if tag == "link":
            if a.get("rel") == "canonical":
                self.canonical = a.get("href")
            elif a.get("href"):
                self.assets.append(a["href"])
        if tag == "a":
            href = a.get("href")
            self.links.append(href)
            if "nav" in self._in:
                self.nav_links += 1
            if "footer" in self._in:
                self.foot_links += 1
        if tag in ("nav", "footer"):
            self._in.append(tag)
        if tag == "img":
            if a.get("alt") is None:
                self.imgs_noalt += 1
            if a.get("src"):
                self.assets.append(a["src"])
        if tag in ("source", "script") and a.get("src"):
            self.assets.append(a["src"])
        if tag == "video" and a.get("poster"):
            self.assets.append(a["poster"])

    def handle_endtag(self, tag):
        if tag == "title":
            self._t = False
        if tag in ("nav", "footer") and self._in and self._in[-1] == tag:
            self._in.pop()

    def handle_data(self, d):
        if self._t:
            self.title += d
        self.text.append(d)


def url_to_file(url_path):
    p = unquote(url_path.lstrip("/"))
    f = os.path.join(ROOT, p)
    if p == "" or p.endswith("/"):
        f = os.path.join(f, "index.html")
    elif os.path.isdir(f):
        f = os.path.join(f, "index.html")
    return f


def page_url(file_rel):
    d = os.path.dirname(file_rel)
    return "/" if d == "" else "/" + d + "/"


pages = {}
for dp, dn, fn in os.walk(ROOT):
    for n in fn:
        if n.endswith(".html"):
            rel = os.path.relpath(os.path.join(dp, n), ROOT)
            if re.fullmatch(r'google[0-9a-f]+\.html', rel):
                continue  # Search Console verification file, not a page
            if 'http-equiv="refresh"' in open(os.path.join(dp, n), encoding='utf-8').read():
                continue  # tiny redirect page (e.g. the old hub URL), not a real page
            pages[rel] = None
for rel in pages:
    p = P()
    p.feed(open(os.path.join(ROOT, rel)).read())
    pages[rel] = p

real = {r: p for r, p in pages.items() if r not in ("404.html","410.html")}
link_graph = {}

for rel, p in pages.items():
    here = "/" + rel if rel in ("404.html","410.html") else page_url(rel)
    out = set()
    for href in p.links + p.assets:
        if href is None or href.strip() == "":
            E(f"{rel}: empty href/src")
            continue
        if href.startswith("mailto:"):
            if not re.fullmatch(r"mailto:[^@\s?]+@[^@\s?]+\.[a-z]{2,}(\?[^\s]*)?", href):
                E(f"{rel}: bad mailto {href}")
            continue
        if href.startswith("tel:"):
            if not re.fullmatch(r"tel:\+?\d{10,15}", href):
                E(f"{rel}: bad tel {href}")
            continue
        u = urlparse(href)
        if u.scheme in ("http", "https"):
            if u.netloc == "centralerealty.com":
                href = u.path or "/"
                u = urlparse(href)
            else:
                if u.scheme == "http":
                    W(f"{rel}: external link uses http: {href}")
                continue
        if href.startswith("#"):
            if href != "#" and href[1:] not in p.ids:
                E(f"{rel}: missing anchor {href}")
            elif href == "#":
                E(f"{rel}: placeholder '#' link")
            continue
        target, frag = urldefrag(href)
        target = target.split('?')[0]
        base = here if here.endswith("/") or here == "/" else "/"
        abs_path = target if target.startswith("/") else os.path.normpath(os.path.join(base, target)).replace("\\", "/")
        if target.endswith("/") and not abs_path.endswith("/"):
            abs_path += "/"
        f = url_to_file(abs_path)
        if not os.path.exists(f):
            E(f"{rel}: broken link/asset {href} -> {abs_path}")
        elif f.endswith("index.html") and href in p.links:
            out.add(os.path.relpath(f, ROOT))
    link_graph[rel] = out

    # per-page checks
    if p.lang != "en":
        E(f"{rel}: missing lang=en")
    if p.h1 != 1:
        E(f"{rel}: expected exactly one h1, found {p.h1}")
    if not p.title.strip():
        E(f"{rel}: empty title")
    if len(p.meta.get("description", "")) < 40:
        E(f"{rel}: description missing or too short")
    if len(p.title) > 70:
        W(f"{rel}: title is {len(p.title)} chars (over 70)")
    if len(p.meta.get("description", "")) > 170:
        W(f"{rel}: description is {len(p.meta['description'])} chars (over 170)")
    if p.imgs_noalt:
        E(f"{rel}: {p.imgs_noalt} image(s) without alt attribute")
    if rel not in ("404.html","410.html"):
        want = BASE + page_url(rel)
        if p.canonical != want:
            E(f"{rel}: canonical {p.canonical} != {want}")
    for tag in ("og:title", "og:description", "og:image", "og:url", "twitter:card"):
        if tag not in p.meta:
            E(f"{rel}: missing {tag}")
    if p.nav_links < 5:
        E(f"{rel}: dead end? only {p.nav_links} nav links")
    if p.foot_links < 5:
        E(f"{rel}: dead end? only {p.foot_links} footer links")
    body = " ".join(p.text)
    for bad in ("TODO", "lorem ipsum", "placeholder"):
        if bad.lower() in body.lower():
            E(f"{rel}: contains '{bad}'")

# unique titles/descriptions
for key in ("title", "description"):
    seen = {}
    for rel, p in pages.items():
        v = p.title.strip() if key == "title" else p.meta.get("description", "")
        if v in seen:
            E(f"duplicate {key}: {rel} and {seen[v]}")
        seen[v] = rel

# reachability from home
reach, todo = set(), ["index.html"]
while todo:
    c = todo.pop()
    if c in reach:
        continue
    reach.add(c)
    todo += [x for x in link_graph.get(c, ()) if x in link_graph]
for rel in real:
    if rel not in reach:
        E(f"orphan page (not reachable from home): {rel}")

# sitemap / robots / 404
sm = os.path.join(ROOT, "sitemap.xml")
if os.path.exists(sm):
    locs = set(re.findall(r"<loc>([^<]+)</loc>", open(sm).read()))
    want = {BASE + page_url(r) for r in real}
    for m in sorted(want - locs):
        E(f"sitemap.xml missing {m}")
    for m in sorted(locs - want):
        E(f"sitemap.xml lists nonexistent page {m}")
else:
    E("sitemap.xml missing")
rb = os.path.join(ROOT, "robots.txt")
if not os.path.exists(rb) or "Sitemap: " + BASE + "/sitemap.xml" not in open(rb).read():
    E("robots.txt missing or does not point at sitemap.xml")
if "404.html" not in pages:
    E("404.html missing")
for f in ("site.webmanifest", ".well-known/security.txt", ".htaccess"):
    if not os.path.exists(os.path.join(ROOT, f)):
        E(f"{f} missing")

# .htaccess redirect targets exist
ht = open(os.path.join(ROOT, ".htaccess")).read()
for m in re.finditer(r"RewriteRule \S+ https://centralerealty\.com(/\S*) \[R=301", ht):
    if m.group(1) != "%{REQUEST_URI}" and not m.group(1).startswith("%") and not os.path.exists(url_to_file(m.group(1))):
        E(f".htaccess redirect target missing: {m.group(1)}")
if "ErrorDocument 404 /404.html" not in ht:
    E(".htaccess has no ErrorDocument 404")
if "ErrorDocument 410 /410.html" not in ht:
    E(".htaccess has no ErrorDocument 410")


# ---- Google Search Console / crawlability checks ----
import json, xml.etree.ElementTree as ET
raw = {r: open(os.path.join(ROOT, r)).read() for r in pages}
for rel, html in raw.items():
    if 'name="viewport"' not in html:
        E(f"{rel}: no viewport meta (mobile usability)")
    if rel not in ("404.html","410.html") and re.search(r'<meta name="robots"[^>]*noindex', html):
        E(f"{rel}: real page is noindex")
    if rel in ("404.html","410.html") and "noindex" not in html:
        W("404.html should be noindex")
    if len(re.findall(r'rel="canonical"', html)) > 1:
        E(f"{rel}: multiple canonicals")
    for u in re.findall(r'(?:src|href|poster)="(http://[^"]+)"', html):
        if "www.lr" not in u:
            E(f"{rel}: insecure http resource {u}")
    for blk in re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
        try:
            d = json.loads(blk)
        except Exception as ex:
            E(f"{rel}: invalid JSON-LD ({ex})")
            continue
        nodes = d.get("@graph", [d])
        for n in nodes:
            t = n.get("@type")
            if t == "RealEstateAgent":
                for k in ("name", "address", "telephone", "url", "image"):
                    if k not in n:
                        E(f"{rel}: RealEstateAgent JSON-LD missing {k}")
            if t == "BreadcrumbList":
                if not n.get("itemListElement"):
                    E(f"{rel}: empty BreadcrumbList")
    img = re.findall(r'<img [^>]*>', html)
    for tag in img:
        if "width=" not in tag or "height=" not in tag:
            W(f"{rel}: img without width/height (layout shift): {tag[:70]}")
    og = re.search(r'property="og:image" content="([^"]+)"', html)
    if og:
        local = os.path.join(ROOT, og.group(1).replace(BASE + "/", ""))
        if not os.path.exists(local):
            E(f"{rel}: og:image file missing")
# sitemap well-formed, https, absolute, <= 50k urls
try:
    tree = ET.parse(os.path.join(ROOT, "sitemap.xml"))
    urls = [e.text for e in tree.getroot().iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
    if any(not u.startswith(BASE + "/") for u in urls):
        E("sitemap.xml has non-canonical URLs")
    if len(urls) != len(set(urls)):
        E("sitemap.xml has duplicates")
except Exception as ex:
    E(f"sitemap.xml not well-formed: {ex}")
rb = open(os.path.join(ROOT, "robots.txt")).read()
if re.search(r"(?im)^disallow:\s*/\s*$", rb):
    E("robots.txt blocks the whole site")
# heavy files
for dp, dn, fn in os.walk(ROOT):
    for n in fn:
        f = os.path.join(dp, n)
        mb = os.path.getsize(f) / 1048576
        if n.endswith((".jpg", ".png")) and mb > 1.5:
            W(f"large image {os.path.relpath(f, ROOT)} ({mb:.1f} MB)")
        if n.endswith(".mp4") and mb > 15:
            W(f"large video {os.path.relpath(f, ROOT)} ({mb:.1f} MB)")
# .htaccess: single-hop http->https, no chains from old URLs
ht2 = open(os.path.join(ROOT, ".htaccess")).read()
if "RewriteCond %{HTTPS} off" not in ht2:
    E(".htaccess does not force HTTPS")


# unused assets (dead weight slows upload)
used = set()
for rel, html in raw.items():
    used |= set(re.findall(r'[\w\-./]+\.(?:jpg|png|mp4|pdf|woff2|svg|ico)', html))
used |= set(re.findall(r'[\w\-./]+\.(?:jpg|png|mp4|woff2|svg|ico)', open(os.path.join(ROOT, "styles.css")).read()))
used |= set(re.findall(r'[\w\-./]+\.(?:jpg|png|mp4|woff2|svg|ico)', open(os.path.join(ROOT, "site.webmanifest")).read()))
names = {os.path.basename(u) for u in used}
for dp, dn, fn in os.walk(os.path.join(ROOT, "assets")):
    for n in fn:
        if n not in names:
            W(f"unused asset {os.path.relpath(os.path.join(dp, n), ROOT)}")
total = sum(os.path.getsize(os.path.join(dp, n)) for dp, dn, fn in os.walk(ROOT) for n in fn) / 1048576
print(f"Total site size: {total:.1f} MB")

if not os.path.exists(os.path.join(ROOT, "favicon.ico")):
    E("root favicon.ico missing (browsers and Google request /favicon.ico first)")
print(f"Pages audited: {len(pages)}  (+404)")
for w in warns:
    print("WARN ", w)
for e in errors:
    print("ERROR", e)
print(f"\n{len(errors)} error(s), {len(warns)} warning(s)")
sys.exit(1 if errors else 0)
