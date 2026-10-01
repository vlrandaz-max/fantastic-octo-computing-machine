# Reference notes (region detail page of an upscale brokerage)
- Platform is a hosted ASP.NET real-estate CMS with vendor JS/CSS bundles — not portable; do not copy.
- Strengths worth emulating: restrained palette (white / black / one accent), serif display headings (italic emphasis word) + clean sans body, large imagery, card grids with full-card links, section jump-nav, schema.org JSON-LD (Organization, WebSite+SearchAction, BreadcrumbList, WebPage, RealEstateAgent), canonical + OG tags, lazy-loaded images, reduced footprint above the fold.
- Weaknesses to avoid: heavy third-party scripts, mixed-state footer legal text for unrelated states/countries, missing alt/aria in places, duplicate `rel=stylesheet` preload hacks.
- Accessibility to improve: skip link, visible focus, real <button>s, form labels.
