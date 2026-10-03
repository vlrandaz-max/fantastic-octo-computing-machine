# Google Search Console launch checklist - centralerealty.com

Built into the site (checked by `python3 tools/audit.py`):
- `https://centralerealty.com/sitemap.xml` lists all 10 public pages (valid XML, absolute https URLs, no duplicates). `robots.txt` allows everything and points to it.
- One self-referencing canonical per page; no `noindex` on real pages; `404.html` is `noindex` and is served with a real 404 status.
- Mobile-friendly: viewport meta, 44px+ tap targets, no horizontal scroll, text readable without zoom.
- Structured data (JSON-LD): RealEstateAgent + WebSite on the home page, BreadcrumbList on inner pages. All images have width/height (no layout shift); the first image on each page loads at high priority (good Largest Contentful Paint).
- HTTPS everywhere, www -> non-www, one redirect hop; old addresses `/for-sale/vacant-land-for-sale/` and `/vacant-land/` 301 to `/properties/`.

Steps only you can do (they need your Google login / DNS):
1. Upload the site (see README) and confirm `https://centralerealty.com/` loads with a padlock.
2. In Search Console choose **Add property**.
   - Easiest: **Domain** property `centralerealty.com`, then add the TXT record Google gives you at your DNS host (the domain is registered with Network Solutions; if DNS is at GoDaddy add it there).
   - Alternative: **URL prefix** property `https://centralerealty.com/` and upload the verification HTML file Google gives you into `public_html/`. (Do not delete it afterwards.)
3. **Sitemaps** -> submit `sitemap.xml`. Expect status "Success" and 10 discovered pages.
4. **URL Inspection** -> paste `https://centralerealty.com/` -> **Test live URL** -> **Request indexing**. Repeat for `/properties/` and `/for-sale/`.
5. Test the redirects: open `https://centralerealty.com/for-sale/vacant-land-for-sale/` and `/vacant-land/`; both must land on `/properties/`.
6. Check **Pages** (indexing) after a few days, **Mobile usability** / **Core Web Vitals** after ~28 days, and **Enhancements** for the breadcrumb and business markup. Test markup any time at https://search.google.com/test/rich-results.
7. Optional: claim the Google Business Profile for 2490 Walton Blvd, Ste 103 so the name, address and phone (NAP) match the site exactly.
