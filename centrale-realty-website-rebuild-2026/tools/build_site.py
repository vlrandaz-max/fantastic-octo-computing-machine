"""Regenerates every HTML page, sitemap.xml, robots.txt, 404.html etc. in ../site.
Run: python3 tools/build_site.py   (then python3 tools/audit.py)"""
import os,sys
HERE=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,HERE)
from legal_text import TERMS,LEGAL
SITE=os.path.join(os.path.dirname(HERE),"site")
ORG="Centrale Realty, Inc."
ADDR="2490 Walton Boulevard, Ste 103, Rochester Hills, MI 48309"
NAV=[("for-sale/","For Sale"),("properties/","Properties"),("for-lease/","For Lease"),("commercial-space/","Commercial"),("construction-services/","Construction"),("contact-us/","Contact")]
IDX=""
JSONLD='''
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"RealEstateAgent","name":"Centrale Realty, Inc.","telephone":"+1-248-656-8830","email":"info@centralerealty.com","foundingDate":"1984","address":{"@type":"PostalAddress","streetAddress":"2490 Walton Boulevard, Ste 103","addressLocality":"Rochester Hills","addressRegion":"MI","postalCode":"48309","addressCountry":"US"},"areaServed":["Metro Detroit, MI","Oakland County, MI","Macomb County, MI"]}</script>'''
PAUSE_BTN='<button class="hero-pause" type="button" aria-pressed="false" aria-label="Pause background motion"><span aria-hidden="true"></span></button>'
SHARED_JS="""<script>(function(){var b=document.querySelector(".hero-pause");if(!b)return;b.addEventListener("click",function(){var p=b.getAttribute("aria-pressed")!=="true";b.setAttribute("aria-pressed",p);b.setAttribute("aria-label",p?"Play background motion":"Pause background motion");document.querySelectorAll(".hero video").forEach(function(v){if(p){v.pause()}else{v.play()}});document.querySelectorAll(".slides").forEach(function(s){s.classList.toggle("paused",p)})})})()</script>"""
def shell(path,title,desc,main,home=False,overlay=False,abs_root=False,noindex=False):
    depth=path.count("/"); r="/" if abs_root else "../"*depth
    url="https://centralerealty.com/"+path
    head_extra=f'''
  <meta property="og:url" content="{url}">
  <meta property="og:site_name" content="Centrale Realty, Inc.">
  <meta property="og:image" content="https://centralerealty.com/assets/images/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#0b0b0b">
  <link rel="manifest" href="{r}site.webmanifest">'''
    if noindex: head_extra+='\n  <meta name="robots" content="noindex">'
    crumbs=""
    if not home and not noindex:
        name=title.split(" | ")[0].replace("&amp;","&").replace('"','')
        crumbs='\n  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://centralerealty.com/"},{"@type":"ListItem","position":2,"name":"'+name+'","item":"'+url+'"}]}</script>'
    canon="" if noindex else f'<link rel="canonical" href="{url}">'

    items=[]
    for u,t in NAV:
        cls=' class="nav-contact"' if u=="contact-us/" else ''
        cur=' aria-current="page"' if u==path else ''
        items.append(f'<a{cls} href="{r}{u}"{cur}>{t}</a>')
    nav="".join(items)
    foot_links="".join(f'<li><a href="{r}{u}">{t}</a></li>' for u,t in NAV[:5])
    html=f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  {canon}
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:type" content="website">{head_extra}
  <link rel="preload" as="font" type="font/woff2" crossorigin href="{r}assets/fonts/cormorant-garamond-normal.woff2">
  <link rel="preload" as="font" type="font/woff2" crossorigin href="{r}assets/fonts/jost-normal.woff2">
  <link rel="icon" href="{r}assets/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="{r}assets/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="192x192" href="{r}assets/favicon-192.png">
  <link rel="apple-touch-icon" href="{r}assets/apple-touch-icon.png">
  <link rel="stylesheet" href="{r}styles.css">{JSONLD if home else ""}{crumbs}
</head>
<body class="{'home' if home else ('inner overlay' if overlay else 'inner')}">
  <a class="skip" href="#main">Skip to content</a>
  <div class="topbar"><div class="wrap"><span class="addr">{ADDR}</span><a href="tel:+12486568830">(248) 656-8830</a><a href="mailto:info@centralerealty.com">info@centralerealty.com</a></div></div>
  <header class="site-header">
    <div class="wrap bar">
      <a class="logo" href="{r or './'}" aria-label="Centrale Realty home"><img class="logo-mark" src="{r}assets/logo-cr.png" alt="" width="58" height="64"><span class="logo-text"><b>CENTRALE</b><span>REALTY</span></span></a>
      <input type="checkbox" id="menu-toggle" class="menu-toggle" aria-label="Toggle menu">
      <label for="menu-toggle" class="burger"><span class="sr">Menu</span><i></i><i></i><i></i></label>
      <nav class="primary" aria-label="Primary">{nav}</nav>
      <a class="btn" href="{r}contact-us/">Contact Us</a>
    </div>
  </header>
{main}
  <footer class="site-footer">
    <div class="wrap">
      <div class="foot-grid">
        <div><h3>Address</h3><address>{ORG}<br>2490 Walton Boulevard, Ste 103<br>Rochester Hills, MI 48309</address></div>
        <div><h3>Contact</h3><a href="mailto:info@centralerealty.com">info@centralerealty.com</a><br>Office <a href="tel:+12486568830">(248) 656-8830</a><br>Fax (248) 694-9344</div>
        <div><h3>Services</h3><ul>{foot_links}</ul></div>
        <div><h3>Legal</h3><ul><li><a href="{r}terms-of-use/">Terms of Use</a></li><li><a href="{r}legal/">Legal</a></li><li><a href="{r}contact-us/">Contact Us</a></li><li><a href="{r}sitemap/">Sitemap</a></li></ul></div>
        <div><h3>Equal Housing</h3><img src="{r}assets/equal-housing-white.png" alt="Equal Housing Opportunity" width="64" height="64"></div>
      </div>
      <div class="foot-bottom"><span>&copy; 2026 {ORG} All Rights Reserved</span><span>Serving Metro Detroit since 1984</span></div>
    </div>
  </footer>
  <div class="mobile-cta" role="region" aria-label="Call or schedule a consultation"><a class="mc-call" href="tel:+12486568830">Call (248) 656-8830</a><a class="mc-sched" href="{r}contact-us/">Schedule Consultation</a></div>
  {SHARED_JS}
</body>
</html>
'''
    if path.endswith(".html"):
        open(os.path.join(SITE,path),"w").write(html); return
    d=os.path.join(SITE,path); os.makedirs(d,exist_ok=True) if path else None
    open(os.path.join(d,"index.html") if path else os.path.join(SITE,"index.html"),"w").write(html)

def page(path,title,desc,h1,body,home=False,banner=None):
    depth=path.count("/"); r="../"*depth
    if banner and banner[0]=='slides':
        lz=' loading="lazy"'
        imgs=''.join(f'<img src="{r}assets/images/{f}" alt="{a}" width="1600" height="686"{"" if k==0 else lz}>' for k,(f,a) in enumerate(banner[1]))
        media=f'<div class="slides">{imgs}</div>'
    elif banner:
        media=f'<img src="{r}assets/images/{banner[0]}" alt="{banner[1]}" width="1600" height="686">'
    else:
        media=''
    if banner:
        pb=PAUSE_BTN if banner[0]=='slides' else ''
        head=f'<section class="hero page-hero" aria-labelledby="page-title">{media}{pb}<div class="hero-copy"><h1 id="page-title">{h1}</h1></div></section>'
    else:
        head=f'<section class="page-title"><h1>{h1}</h1></section>'
    main=f'''  <main id="main">
    {head}
    <section class="page-body">
      <div class="wrap"><div class="prose">
      {body}
      </div></div>
    </section>
  </main>'''
    shell(path,title,desc,main,home,overlay=bool(banner))

TODO="<p>TODO: final copy from Centrale.</p>"

def svc(href,img,alt,label):
    return f'<div class="svc-item"><a class="img" href="{href}"><img src="assets/images/{img}" alt="{alt}" width="480" height="720" loading="lazy"></a><a class="btn" href="{href}">{label}</a></div>'
def acc(href,img,alt,label,desc,active=False):
    cls='acc-item is-active' if active else 'acc-item'
    return f'<a class="{cls}" href="{href}"><img src="assets/images/{img}" alt="{alt}" width="900" height="1000" loading="lazy"><span class="acc-text"><span class="acc-label">{label}</span><span class="acc-desc">{desc}</span><span class="acc-view">View &rarr;</span></span></a>'
home_main=f'''  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <video autoplay muted loop playsinline preload="metadata" poster="assets/images/hero-poster.jpg" aria-hidden="true"><source src="assets/video/hero.mp4" type="video/mp4"></video>
      {PAUSE_BTN}
      <div class="hero-copy">
        <h1 id="hero-title">Serving Metro Detroit<br><em>since 1984</em></h1>
        <span class="sub bordered">Centrale Realty</span>
      </div>
    </section>

    <section class="band light">
      <div class="wrap welcome">
        <div>
          <span class="sub">Residential &amp; Commercial Real Estate</span>
          <h2>Welcome<br>to Centrale<br>Realty</h2>
          <p>Centrale Realty, Inc. is a full service real estate company located in Rochester Hills serving the Metro Detroit area since 1984. We specialize in residential and commercial buyer, seller and tenant representation.</p>
          <p>If you are looking to sell, purchase or lease a property, let Centrale put its knowledge to work for you. Call <a href="tel:+12486568830">(248) 656-8830</a> or email <a href="mailto:info@centralerealty.com">info@centralerealty.com</a>.</p>
          <a class="btn-link" href="contact-us/">Contact Us</a>
        </div>
        <img src="assets/images/welcome-1.jpg" alt="Staged home office with built-in bookshelves and a wooden desk" width="550" height="825" loading="lazy">
        <img class="tall-2" src="assets/images/welcome-2.jpg" alt="Bright white kitchen with a large island and gold hardware" width="550" height="825" loading="lazy">
      </div>
    </section>

    <section class="band light-2" id="services">
      <div class="wrap">
        <div class="services-head">
          <span class="sub">Our Services</span>
          <h2>Real Estate<br>Services</h2>
        </div>
        <div class="acc" id="acc">
          {acc("for-sale/","acc-sale.jpg","Stone and brick custom home at twilight","For Sale","Residential and commercial properties.",True)}
          {acc("properties/","acc-land.jpg","Aerial view of land next to a neighborhood","Properties","Pine Woods, Falcon Estates and more.")}
          {acc("for-lease/","acc-lease.jpg","Brick duplex with attached two-car garages","For Lease","Metro Detroit rentals, from duplexes to corporate housing.")}
          {acc("commercial-space/","acc-commercial.jpg","Two-storey brick and stone office building","Commercial","Office space in Rochester Hills and Auburn Hills.")}
          {acc("construction-services/","acc-construction.jpg","Telehandler lifting masonry to scaffolding at a home under construction","Construction","New construction, your site or ours.")}
        </div>
      </div>
    </section>

    <section class="split dark on-dark">
      <div class="split-media"><img src="assets/images/split-office.jpg" alt="Two-storey brick and stone office building at 2490 Walton Boulevard" width="1000" height="860" loading="lazy"></div>
      <div class="split-text">
        <span class="sub">Commercial Space</span>
        <h2>Office Space<br>Near <em>Automation Alley</em></h2>
        <p>Close to I-75, M-59, Stellantis Headquarters, Henry Ford Rochester Hospital and most major job hubs, with properties in Rochester Hills and Auburn Hills.</p>
        <a class="btn-link" href="commercial-space/">See Commercial Space</a>
      </div>
    </section>

    <section class="split light flip">
      <div class="split-media"><img src="assets/images/split-foundation.jpg" alt="Aerial view of a new home foundation with poured walls before framing" width="1000" height="860" loading="lazy"></div>
      <div class="split-text">
        <span class="sub">Construction Services</span>
        <h2>New Construction,<br><em>Your Site or Ours</em></h2>
        <p>Specializing in new construction and luxury construction across the Metro Detroit area, from custom homes to spec homes.</p>
        <a class="btn-link" href="construction-services/">Explore Construction</a>
      </div>
    </section>

    <section class="cta on-dark" id="contact-band">
      <div class="wrap">
        <span class="sub gold">Get In Touch</span>
        <h2>Contact Us Today</h2>
        <p>(248) 656-8830 &nbsp;·&nbsp; info@centralerealty.com</p>
        <a class="btn" href="contact-us/">Contact Us</a>
      </div>
    </section>
  </main>
  <script>(function(){{var items=document.querySelectorAll("#acc .acc-item");function on(i){{items.forEach(function(x){{x.classList.toggle("is-active",x===i)}})}}items.forEach(function(i){{i.addEventListener("mouseenter",function(){{on(i)}});i.addEventListener("focus",function(){{on(i)}});i.addEventListener("click",function(e){{if(matchMedia("(hover: none)").matches&&!i.classList.contains("is-active")){{e.preventDefault();on(i)}}}})}})}})();</script>
  <script>if(matchMedia("(prefers-reduced-motion: reduce)").matches){{document.querySelectorAll(".hero video,.banner video").forEach(function(v){{v.removeAttribute("autoplay");v.pause()}})}}</script>'''
shell("","Centrale Realty, Inc | Serving Metro Detroit Since 1984","Full service real estate company in Rochester Hills serving Metro Detroit since 1984. Residential and commercial buyer, seller and tenant representation.",home_main,home=True)
CTA='<p>For more information on any of our services, call <a href="tel:+12486568830">(248) 656-8830</a> or email <a href="mailto:info@centralerealty.com">info@centralerealty.com</a>.</p>'
page("for-sale/","Homes For Sale in Metro Detroit | Centrale Realty","Looking for a home in Metro Detroit? Centrale Realty agents offer personalized searches in Rochester Hills, Troy, Birmingham, Royal Oak and more.","Homes <em>For Sale</em>",f'''<p>Looking for a home in the Metro Detroit area? Contact one of our agents. We will be glad to meet with you and do a personalized search based on your desires and needs.</p>
    <p>Whether you are relocating to the area or just looking for a new home, let one of our agents put their knowledge of the area to work for you. From luxury homes in Rochester Hills to homes in Macomb Twp, Troy, Birmingham, Royal Oak and Sterling Heights, just to name a few areas, we will help you find the home of your dreams.</p>
    {CTA}''',banner=('slides',[('slide-grandeur-aerial.jpg','Twilight aerial view of The Grandeur'),('slide-majestic.jpg','The Majestic at twilight'),('slide-crestwood-aerial.jpg','Twilight aerial view of The Crestwood')]))
page("properties/","Properties | Pine Woods &amp; Falcon Estates | Centrale Realty","Properties in Rochester Hills and Bruce Township, including Pine Woods and Falcon Estates, from Centrale Realty.","Our <em>Properties</em>",f'''<h2>Pine Woods, Rochester Hills</h2>
    <p>Pine Woods is an exclusive enclave of 28 homesites in Rochester Hills, with municipal city water and sewer, underground utilities and Avondale Schools. Its close proximity to major thoroughfares, downtown Rochester and shopping and entertainment centers keeps you connected to everything you need. Call today to schedule a tour.</p>
    <figure class="plan"><img src="../assets/images/pine-woods-site-plan.jpg" alt="Pine Woods site plan, Rochester Hills" width="1600" height="434" loading="lazy"><figcaption>Pine Woods site plan.</figcaption></figure>
    <h2>Falcon Estates, Rochester Hills</h2>
    <p>Looking for a peaceful setting with city conveniences? Falcon Estates Subdivision, also known as Sherwood Forest Estates, in beautiful Rochester Hills may be just what you are looking for. This luxury development is meant for busy individuals and families who want quiet surroundings close to I-75, M-59, Stellantis Headquarters, Henry Ford Rochester Hospital, Oakland University, Meadowbrook Theatre, Village of Rochester Hills shopping and major job hubs.</p>
    <figure class="plan"><img src="../assets/images/falcon-estates-site-plan.jpg" alt="Falcon Estates site plan showing completed construction and available lots" width="1400" height="1082" loading="lazy"><figcaption>Falcon Estates site plan.</figcaption></figure>
    <h2>Cambridge Hills, Bruce Township</h2>
    <p>Looking for a little more property or acreage? Cambridge Hills in Bruce Twp may be the property you have been searching for. Contact us today for more details.</p>
    <figure class="plan"><video controls muted playsinline preload="metadata" poster="../assets/images/land-flyover-poster.jpg" width="1196" height="678"><source src="../assets/video/land-flyover.mp4" type="video/mp4"></video><figcaption>Aerial flyover of the property.</figcaption></figure>
    <h2>Spec <em>Homes</em></h2>
    <p>We build spec homes and place them for sale once they are complete. Our homes are built by our affiliates, L&amp;R Homes Inc and Town Properties LLC. See the <a href="../for-sale/">homes for sale</a> or contact us to learn what is coming soon.</p>
    {CTA}''',banner=('slides',[('slide-land-aerial.jpg','Aerial view of land beside a neighborhood'),('slide-falcon-site-plan.jpg','Falcon Estates site plan'),('slide-pine-woods-site-plan.jpg','Pine Woods site plan, Rochester Hills'),('slide-pine-woods.jpg','Heritage home at twilight in Pine Woods'),('slide-falcon-estates.jpg','Brick and stone home in Falcon Estates')]))
page("for-lease/","Rentals in Metro Detroit | Centrale Realty","Metro Detroit rentals: luxury corporate housing in Rochester Hills and duplexes and townhomes in Shelby Twp and Chesterfield Twp.","Properties <em>For Lease</em>",f'''<p>We specialize in Metro Detroit area rentals. Whether you are relocating to the area or just looking for a new place to call home, one of our agents will be glad to help.</p>
    <p>From our luxury corporate housing in Rochester Hills to our duplexes and townhomes in Shelby Twp and Chesterfield Twp, all offer premium features such as 3 to 4 bedrooms, full basements, 1 to 3 car garages and much more.</p>
    <p>For additional properties and areas, contact one of our agents for a customized search.</p>
    {CTA}''',banner=('slides',[('duplex-banner.jpg','Brick duplex with attached two-car garages'),('slide-lease-kitchen.jpg','Bright kitchen with gold hardware'),('slide-lease-suite.jpg','Primary suite with coffered ceiling')]))
page("commercial-space/","Commercial Space in Rochester Hills & Auburn Hills | Centrale Realty","Commercial properties in Metro Detroit, including office space near Automation Alley with close access to I-75 and M-59.","Commercial <em>Space</em>",f'''<p>We offer Metro Detroit area commercial properties. If you are looking for office space near Automation Alley, with close proximity to I-75, M-59, Stellantis Headquarters, Henry Ford Rochester Hospital and most major job hubs, take a look at what we have to offer in Rochester Hills and Auburn Hills.</p>
    <p>For other properties and areas, contact one of our agents to conduct a search to meet your needs.</p>
    {CTA}''',banner=('office-banner.jpg','Two-storey brick and stone office building at 2490 Walton Boulevard, Rochester Hills'))
page("construction-services/","Construction Services | Centrale Realty","New home construction and general contracting services in Metro Detroit.","Construction <em>Services</em>",f'''<p>Specializing in new construction and luxury construction across the Metro Detroit area, on your site or ours.</p>
    <ul>
      <li>Custom homes</li>
      <li>Project management and site coordination</li>
      <li>Custom trim</li>
      <li>Kitchen rehabs</li>
      <li>Commercial properties</li>
    </ul>
    <p>New home construction: <a href="https://www.landrhomes.com">www.landrhomes.com</a><br>General contracting services: <a href="http://www.lrgeneralcontracting.com">www.lrgeneralcontracting.com</a></p>
    <figure class="plan"><img src="../assets/images/new-construction-banner.jpg" alt="Aerial view of a newly built stone home at dusk" width="1600" height="686" loading="lazy"><figcaption>From foundation to finished home.</figcaption></figure>
    {CTA}''',banner=('slides',[('slide-con-foundation.jpg','Aerial view of a new home foundation with poured walls before framing'),('slide-con-telehandler.jpg','Telehandler lifting masonry to scaffolding at a home under construction'),('slide-con-new.jpg','Aerial view of a finished custom home')]))
page("contact-us/","Contact Us | Centrale Realty","Contact Centrale Realty, Inc. in Rochester Hills, Michigan.","Contact <em>Us</em>",
 f'<address>{ORG}<br>{ADDR}<br>Office: <a href="tel:+12486568830">248.656.8830</a><br>Fax: 248.694.9344<br>Email: <a href="mailto:info@centralerealty.com">info@centralerealty.com</a></address>\n    <p><a class="btn" href="mailto:info@centralerealty.com">Email us</a></p>\n    ',banner=('office-banner.jpg','Two-storey brick and stone office building at 2490 Walton Boulevard, Rochester Hills'))
page("terms-of-use/","Terms of Use | Centrale Realty","Terms of use for centralerealty.com, the website of Centrale Realty, Inc. in Rochester Hills, Michigan.","Terms <em>of Use</em>",TERMS,banner=('slide-crestwood-aerial.jpg','Twilight aerial view of The Crestwood'))
page("legal/","Legal | Centrale Realty","Legal notices, fair housing and privacy for Centrale Realty, Inc.","<em>Legal</em>",LEGAL,banner=('slide-majestic.jpg','The Majestic at twilight'))


# ---- sitemap page, 404, and crawler/support files ----
PAGES=[("","Home","Centrale Realty, Inc. serving Metro Detroit since 1984."),
("for-sale/","For Sale","Homes for sale in Metro Detroit."),
("properties/","Properties","Pine Woods, Falcon Estates and Cambridge Hills, plus spec homes."),
("for-lease/","For Lease","Rentals, corporate housing, duplexes and townhomes."),
("commercial-space/","Commercial","Commercial and office space in Rochester Hills and Auburn Hills."),
("construction-services/","Construction","New home construction and general contracting."),
("contact-us/","Contact Us","Address, phone, fax and email."),
("terms-of-use/","Terms of Use","Terms for using centralerealty.com."),
("legal/","Legal","Legal notices, fair housing and privacy."),
("sitemap/","Sitemap","Every page on this site.")]
lis="".join(f'<li><a href="../{u}">{t}</a> &mdash; {d}</li>' if u else f'<li><a href="../">{t}</a> &mdash; {d}</li>' for u,t,d in PAGES[:-1])
page("sitemap/","Sitemap | Centrale Realty","Every page on the Centrale Realty, Inc. website.","<em>Sitemap</em>",f'''<ul class="sitemap-list">{lis}</ul>
    <p>Can't find what you need? Call <a href="tel:+12486568830">(248) 656-8830</a> or email <a href="mailto:info@centralerealty.com">info@centralerealty.com</a>.</p>''',banner=('slide-grandeur-aerial.jpg','Twilight aerial view of The Grandeur'))
# 404 (served from any URL, so root-absolute links; not indexed)
nf='<section class="page-title"><h1>Page <em>Not Found</em></h1></section><section class="page-body"><div class="wrap"><div class="prose"><p>Sorry, we could not find that page. It may have moved. Try one of these:</p><ul class="sitemap-list">'+"".join(f'<li><a href="/{u}">{t}</a> &mdash; {d}</li>' for u,t,d in PAGES)+'</ul><p>Or call <a href="tel:+12486568830">(248) 656-8830</a>.</p></div></div></section>'
shell("404.html","Page Not Found | Centrale Realty","The page you were looking for could not be found.","  <main id=\"main\">\n    "+nf+"\n  </main>",abs_root=True,noindex=True)
import datetime
today=datetime.date.today().isoformat()
sm='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+"".join(f'  <url><loc>https://centralerealty.com/{u}</loc><lastmod>{today}</lastmod></url>\n' for u,t,d in PAGES)+'</urlset>\n'
open(os.path.join(SITE,"sitemap.xml"),"w").write(sm)
open(os.path.join(SITE,"robots.txt"),"w").write("User-agent: *\nAllow: /\n\nSitemap: https://centralerealty.com/sitemap.xml\n")
import json
open(os.path.join(SITE,"site.webmanifest"),"w").write(json.dumps({"name":"Centrale Realty, Inc.","short_name":"Centrale","start_url":"/","display":"browser","background_color":"#0b0b0b","theme_color":"#0b0b0b","icons":[{"src":"/assets/favicon-192.png","sizes":"192x192","type":"image/png"}]},indent=2)+"\n")
os.makedirs(os.path.join(SITE,".well-known"),exist_ok=True)
open(os.path.join(SITE,".well-known","security.txt"),"w").write("Contact: mailto:info@centralerealty.com\nExpires: 2027-10-01T00:00:00.000Z\nPreferred-Languages: en\nCanonical: https://centralerealty.com/.well-known/security.txt\n")
