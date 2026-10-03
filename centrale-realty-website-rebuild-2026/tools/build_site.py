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
import hashlib
CSSV=hashlib.md5(open(os.path.join(SITE,"styles.css"),"rb").read()).hexdigest()[:8]
IDX=""
JSONLD='''
  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"RealEstateAgent","@id":"https://centralerealty.com/#organization","name":"Centrale Realty, Inc.","url":"https://centralerealty.com/","telephone":"+1-248-656-8830","faxNumber":"+1-248-694-9344","email":"info@centralerealty.com","foundingDate":"1984","hasMap":"https://www.google.com/maps/search/?api=1&query=2490+Walton+Blvd+Ste+103+Rochester+Hills+MI+48309","image":"https://centralerealty.com/assets/images/og-image.jpg","logo":"https://centralerealty.com/assets/logo-cr-gold.png","address":{"@type":"PostalAddress","streetAddress":"2490 Walton Boulevard, Ste 103","addressLocality":"Rochester Hills","addressRegion":"MI","postalCode":"48309","addressCountry":"US"},"areaServed":["Metro Detroit, MI","Oakland County, MI","Macomb County, MI"]},{"@type":"WebSite","@id":"https://centralerealty.com/#website","url":"https://centralerealty.com/","name":"Centrale Realty, Inc.","publisher":{"@id":"https://centralerealty.com/#organization"}}]}</script>'''
SHARED_JS="""<script>(function(){var R=[[".hero-copy .sub","rv-down",0],[".hero-copy h1","rv-down",140],[".hero-copy .btn,.hero-copy .btn-link","rv-fade",420],[".welcome .sub,.services-head .sub,.split-text .sub,.cta .sub","rv-down",0],[".welcome h2,.services-head h2,.split-text h2,.cta h2","rv-down",120],[".welcome p,.split-text p,.cta p,.prose > p,.prose > ul,.prose > h2,.prose > h3,.prose > figure,.prose > address","rv-up",200],[".welcome .kb","rv-right",200],[".acc,.services-head+*","rv-up",150],[".btn-link,.cta .btn,.prose .btn","rv-fade",360]];var seen=new Set();var els=[];R.forEach(function(r){document.querySelectorAll(r[0]).forEach(function(e){if(seen.has(e))return;seen.add(e);e.classList.add("rv",r[1]);e.style.setProperty("--d",r[2]+"ms");els.push(e)})});if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("is-visible")});}else{var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("is-visible");io.unobserve(x.target)}})},{threshold:.12});els.forEach(function(e){io.observe(e)})}var t=document.getElementById("menu-toggle");function sync(){if(t)t.setAttribute("aria-expanded",t.checked?"true":"false")}function close(){if(t&&t.checked){t.checked=false}sync()}if(t){t.addEventListener("change",sync);document.querySelectorAll(".primary a").forEach(function(a){a.addEventListener("click",close)});addEventListener("pageshow",close);addEventListener("keydown",function(e){if(e.key==="Escape")close()});matchMedia("(min-width:1101px)").addEventListener("change",close);document.addEventListener("click",function(e){if(t.checked&&!e.target.closest(".site-header"))close()});sync()}})()</script>"""
EXTRA_HEAD={'contact-us/':'\n  <script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Where is Centrale Realty located?","acceptedAnswer":{"@type":"Answer","text":"Our office is at 2490 Walton Boulevard, Suite 103, Rochester Hills, Michigan 48309."}},{"@type":"Question","name":"What areas do you serve?","acceptedAnswer":{"@type":"Answer","text":"We have served the Metro Detroit area since 1984, with properties in Rochester Hills, Auburn Hills, Shelby Township, Chesterfield Township, Macomb Township, Troy, Birmingham, Royal Oak and Sterling Heights."}},{"@type":"Question","name":"What services do you offer?","acceptedAnswer":{"@type":"Answer","text":"Residential and commercial sales, leasing, vacant land and construction services, with representation for buyers, sellers and tenants."}},{"@type":"Question","name":"How do I schedule a consultation?","acceptedAnswer":{"@type":"Answer","text":"Call (248) 656-8830 or email info@centralerealty.com and one of our agents will be in touch."}},{"@type":"Question","name":"Do you build homes?","acceptedAnswer":{"@type":"Answer","text":"We build spec homes and list them for sale once they are complete. Our homes are built by our affiliates, L&R Homes Inc and Town Properties LLC."}},{"@type":"Question","name":"Do you handle rentals?","acceptedAnswer":{"@type":"Answer","text":"Yes. We specialize in rentals across Metro Detroit, from corporate housing in Rochester Hills to duplexes and townhomes in Shelby Township and Chesterfield Township."}}]}</script>'}
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
    lcp='<link rel="preload" as="image" href="'+r+'assets/images/hero-poster.jpg" fetchpriority="high">\n  ' if home else ''
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
  <script>document.documentElement.className+=" js"</script>
  <title>{title}</title>
  <meta name="description" content="{desc}">
  {canon}
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:type" content="website">{head_extra}
  {lcp}<link rel="preload" as="font" type="font/woff2" crossorigin href="{r}assets/fonts/cormorant-garamond-normal.woff2">
  <link rel="preload" as="font" type="font/woff2" crossorigin href="{r}assets/fonts/jost-normal.woff2">
  <link rel="icon" href="{r}assets/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="{r}assets/favicon.png">
  <link rel="icon" type="image/png" sizes="192x192" href="{r}assets/favicon-192.png">
  <link rel="apple-touch-icon" href="{r}assets/apple-touch-icon.png">
  <link rel="stylesheet" href="{r}styles.css?v={CSSV}">{JSONLD if home else ""}{crumbs}{EXTRA_HEAD.get(path,"")}
</head>
<body class="{'home' if home else ('inner overlay' if overlay else 'inner')}">
  <a class="skip" href="#main">Skip to content</a>
  <div class="topbar"><div class="wrap"><span class="addr">{ADDR}</span><a href="tel:+12486568830">(248) 656-8830</a><a href="mailto:info@centralerealty.com">info@centralerealty.com</a></div></div>
  <header class="site-header">
    <div class="wrap bar">
      <a class="logo" href="{r or './'}" aria-label="Centrale Realty home"><img class="logo-mark" src="{r}assets/logo-cr-gold.png" alt="" width="58" height="64"><span class="logo-text"><b>CENTRALE</b><span>REALTY</span></span></a>
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
        <div><h3>Address</h3><img class="foot-logo" src="{r}assets/logo-cr-gold.png" alt="Centrale Realty C/R logo" width="58" height="64" loading="lazy"><address>{ORG}<br><a href="https://www.google.com/maps/dir/?api=1&amp;destination=2490+Walton+Blvd+Ste+103+Rochester+Hills+MI+48309" target="_blank" rel="noopener">2490 Walton Boulevard, Ste 103<br>Rochester Hills, MI 48309</a></address></div>
        <div><h3>Contact</h3><a href="mailto:info@centralerealty.com">info@centralerealty.com</a><br>Office <a href="tel:+12486568830">(248) 656-8830</a><br>Fax (248) 694-9344</div>
        <div><h3>Services</h3><ul>{foot_links}</ul></div>
        <div><h3>Legal</h3><ul><li><a href="{r}terms-of-use/">Terms of Use</a></li><li><a href="{r}legal/">Privacy &amp; Legal</a></li><li><a href="{r}contact-us/">Contact Us</a></li><li><a href="{r}sitemap/">Sitemap</a></li></ul></div>
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
        lz=' loading="lazy"'; fp=' fetchpriority="high"'
        imgs=''.join(f'<img src="{r}assets/images/{f}" alt="{a}" width="1600" height="686"{fp if k==0 else lz}>' for k,(f,a) in enumerate(banner[1]))
        media=f'<div class="slides" data-n="{len(banner[1])}">{imgs}</div>'
    elif banner:
        media=f'<img src="{r}assets/images/{banner[0]}" alt="{banner[1]}" width="1600" height="686" fetchpriority="high">'
    else:
        media=''
    if banner:
        pb=''
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
      <div class="hero-copy">
        <h1 id="hero-title">Serving Metro Detroit<br><em>since 1984</em></h1>
        <div class="hero-cta"><a class="btn" href="tel:+12486568830">Call (248) 656-8830</a></div>
      </div>
    </section>
    <section class="usp" aria-label="Why Centrale Realty"><ul class="wrap"><li><b>Serving</b><i>Metro Detroit since 1984</i></li><li><b>Specializing in</b><i>Residential &amp; Commercial</i></li><li><b>Services</b><i>Sales &middot; Leasing &middot; Construction</i></li><li><b>Broker License No.</b><i>6505204949</i></li></ul></section>

    <section class="band light">
      <div class="wrap welcome">
        <div>
          <span class="sub">Residential &amp; Commercial Real Estate</span>
          <h2>Welcome<br>to Centrale<br>Realty</h2>
          <p>Centrale Realty, Inc. is a full-service real estate company based in Rochester Hills, proudly serving the Metro Detroit area since 1984. We specialize in residential and commercial representation for buyers, sellers and tenants.</p>
          <p>Whether you are looking to sell, buy or lease a property, let Centrale put its knowledge to work for you. Call <a href="tel:+12486568830">(248) 656-8830</a> or email <a href="mailto:info@centralerealty.com">info@centralerealty.com</a>.</p>
          <a class="btn-link" href="contact-us/">Contact Us</a>
        </div>
        <div class="kb"><img src="assets/images/welcome-1.jpg" alt="Staged home office with built-in bookshelves and a wooden desk" width="550" height="825" loading="lazy"></div>
        <div class="kb tall-2"><img src="assets/images/welcome-2.jpg" alt="Bright white kitchen with a large island and gold hardware" width="550" height="825" loading="lazy"></div>
      </div>
    </section>

    <section class="band light-2" id="services">
      <div class="wrap">
        <div class="services-head">
          <span class="sub">Our Services</span>
          <h2>Real Estate<br>Services</h2>
        </div>
        <div class="acc" id="acc">
          {acc("for-sale/","acc-sale.jpg","Stone and brick home at twilight","For Sale","Residential and commercial properties.",True)}
          {acc("properties/","acc-land.jpg","Aerial view of land next to a neighborhood","Properties","Pine Woods, Falcon Estates and more.")}
          {acc("for-lease/","acc-lease.jpg","Brick duplex with attached two-car garages","For Lease","Metro Detroit rentals, from duplexes to corporate housing.")}
          {acc("commercial-space/","acc-commercial.jpg","Two-storey brick and stone office building","Commercial","Office space in Rochester Hills and Auburn Hills.")}
          {acc("construction-services/","acc-construction.jpg","Telehandler lifting masonry to scaffolding at a home under construction","Construction","New and luxury construction across Metro Detroit.")}
        </div>
      </div>
    </section>

    <section class="split dark on-dark">
      <div class="split-media"><img src="assets/images/split-office.jpg" alt="Two-storey brick and stone office building at 2490 Walton Boulevard" width="1000" height="860" loading="lazy"></div>
      <div class="split-text">
        <span class="sub">Commercial Space</span>
        <h2>Office Space<br>Near <em>Automation Alley</em></h2>
        <p>Close to I-75, M-59, Stellantis Headquarters, Henry Ford Rochester Hospital, the Village of Rochester Hills, Downtown Rochester and most major job hubs, with properties in Rochester Hills and Auburn Hills.</p>
        <a class="btn-link" href="commercial-space/">See Commercial Space</a>
      </div>
    </section>

    <section class="split light flip">
      <div class="split-media"><img src="assets/images/split-foundation.jpg" alt="Aerial view of a new home foundation with poured walls before framing" width="1000" height="860" loading="lazy"></div>
      <div class="split-text">
        <span class="sub">Construction Services</span>
        <h2>New &amp; Luxury<br><em>Construction</em></h2>
        <p>Specializing in new and luxury construction across the Metro Detroit area, including spec homes.</p>
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
shell("","Centrale Realty, Inc | Serving Metro Detroit Since 1984","Full-service real estate company based in Rochester Hills, serving Metro Detroit since 1984. Residential and commercial representation for buyers, sellers and tenants.",home_main,home=True)
CTA='<p>To learn more about any of our services, call <a href="tel:+12486568830">(248) 656-8830</a> or email <a href="mailto:info@centralerealty.com">info@centralerealty.com</a>.</p>'
page("for-sale/","Homes For Sale in Metro Detroit | Centrale Realty","Looking for a home in Metro Detroit? Centrale Realty agents offer personalized searches in Rochester Hills, Troy, Birmingham, Royal Oak and more.","Homes <em>For Sale</em>",f'''<p>Looking for a home in the Metro Detroit area? Our agents will gladly meet with you and conduct a personalized search based on your needs and preferences.</p>
    <p>Whether you are relocating to the area or simply ready for a new home, let our agents put their knowledge of the market to work for you. From luxury homes in Rochester Hills to properties in Macomb Township, Troy, Birmingham, Royal Oak, Sterling Heights and beyond, we will help you find the home of your dreams.</p>
    <h2>Newly Built <em>Homes</em></h2>
    <p>Looking for a newly built home? Our affiliate, L&amp;R Homes Inc, builds spec homes that Centrale Realty lists for sale. See the homes currently available on the <a href="https://landrhomes.com/homes-available" target="_blank" rel="noopener">L&amp;R Homes website</a>, or call us at <a href="tel:+12486568830">(248) 656-8830</a> to arrange a showing.</p>
    {CTA}''',banner=('slides',[('slide-grandeur-aerial.jpg','Twilight aerial view of The Grandeur'),('slide-majestic.jpg','The Majestic at twilight'),('slide-crestwood-aerial.jpg','Twilight aerial view of The Crestwood')]))
page("properties/","Properties | Pine Woods &amp; Falcon Estates | Centrale Realty","Properties in Rochester Hills and Bruce Township, including Pine Woods and Falcon Estates, from Centrale Realty.","Our <em>Properties</em>",f'''<h2>Pine Woods, Rochester Hills</h2>
    <p>Pine Woods is an exclusive enclave of 28 homesites in Rochester Hills, with municipal water and sewer, underground utilities and Avondale Schools. Its close proximity to major thoroughfares, Downtown Rochester and area shopping and entertainment keeps everything you need within easy reach. Call today to schedule a tour.</p>
    <figure class="plan"><img src="../assets/images/pine-woods-site-plan.jpg" alt="Pine Woods site plan, Rochester Hills" width="1600" height="434" loading="lazy"><figcaption>Pine Woods site plan.</figcaption></figure>
    <h2>Falcon Estates, Rochester Hills</h2>
    <p>Looking for a peaceful setting with city conveniences? Falcon Estates, also known as Sherwood Forest Estates, in beautiful Rochester Hills may be just what you are looking for. This luxury community is designed for busy individuals and families who want quiet surroundings close to I-75, M-59, Stellantis Headquarters, Henry Ford Rochester Hospital, Oakland University, Meadowbrook Theatre, the Village of Rochester Hills, Downtown Rochester and major job hubs.</p>
    <figure class="plan"><img src="../assets/images/falcon-estates-site-plan.jpg" alt="Falcon Estates site plan showing completed construction and available lots" width="1400" height="1082" loading="lazy"><figcaption>Falcon Estates site plan.</figcaption></figure>
    <h2>Cambridge Hills, Bruce Township</h2>
    <p>Looking for more land or acreage? Cambridge Hills in Bruce Township may be the property you have been searching for. Contact us today for details.</p>
    <h2>New <em>Spec Homes</em></h2>
    <p>Our affiliates, L&amp;R Homes Inc and Town Properties LLC, build spec homes, and Centrale Realty lists each one for sale upon completion. Browse our current <a href="../for-sale/">homes for sale</a>, or <a href="../contact-us/">contact us</a> to learn about upcoming homes.</p>
    {CTA}''',banner=('slides',[('slide-land-aerial.jpg','Aerial view of land beside a neighborhood'),('slide-falcon-site-plan.jpg','Falcon Estates site plan'),('slide-pine-woods-site-plan.jpg','Pine Woods site plan, Rochester Hills'),('slide-pine-woods.jpg','Heritage home at twilight in Pine Woods'),('slide-falcon-estates.jpg','Brick and stone home in Falcon Estates')]))
page("for-lease/","Rentals in Metro Detroit | Centrale Realty","Metro Detroit rentals: luxury corporate housing in Rochester Hills and duplexes and townhomes in Shelby Twp and Chesterfield Twp.","Properties <em>For Lease</em>",f'''<p>We specialize in rental properties throughout Metro Detroit. Whether you are relocating to the area or simply looking for a new place to call home, one of our agents will be glad to help.</p>
    <p>From luxury corporate housing in Rochester Hills to duplexes and townhomes in Shelby Township and Chesterfield Township, every home offers premium features such as 3 to 4 bedrooms, full basements, 1 to 3 car garages and more.</p>
    <p>Looking for additional properties or areas? Contact one of our agents for a customized search.</p>
    {CTA}''',banner=('slides',[('duplex-banner.jpg','Brick duplex with attached two-car garages'),('townhomes-banner.jpg','Brick and stone townhomes with attached garages'),('slide-lease-living.jpg','Staged living room with vaulted ceiling and dining area'),('slide-lease-open-plan.jpg','Open-plan kitchen, dining and living area')]))
page("commercial-space/","Commercial Space in Rochester Hills & Auburn Hills | Centrale Realty","Commercial properties in Metro Detroit, including office space near Automation Alley with close access to I-75 and M-59.","Commercial <em>Space</em>",f'''<p>We offer commercial properties throughout Metro Detroit. If you are looking for office space near Automation Alley with close proximity to I-75, M-59, Stellantis Headquarters, Henry Ford Rochester Hospital, the Village of Rochester Hills, Downtown Rochester and most major job hubs, take a look at what we have to offer in Rochester Hills and Auburn Hills.</p>
    <p>For other properties and areas, contact one of our agents and we will search to meet your needs.</p>
    {CTA}''',banner=('office-banner.jpg','Two-storey brick and stone office building at 2490 Walton Boulevard, Rochester Hills'))
page("construction-services/","Construction Services | Centrale Realty","New home construction and general contracting services in Metro Detroit.","Construction <em>Services</em>",f'''<p>Specializing in new and luxury construction across the Metro Detroit area.</p>
    <ul>
      <li>Project management and site coordination</li>
      <li>Custom trim</li>
      <li>Kitchen rehabs</li>
      <li>Commercial properties</li>
    </ul>
    <p>New home construction: <a href="https://www.landrhomes.com">www.landrhomes.com</a><br>General contracting services: <a href="http://www.lrgeneralcontracting.com">www.lrgeneralcontracting.com</a></p>
    <figure class="plan"><img src="../assets/images/new-construction-banner.jpg" alt="Aerial view of a newly built stone home at dusk" width="1600" height="686" loading="lazy"><figcaption>From foundation to finished home.</figcaption></figure>
    {CTA}''',banner=('slides',[('slide-con-foundation.jpg','Aerial view of a new home foundation with poured walls before framing'),('slide-con-telehandler.jpg','Telehandler lifting masonry to scaffolding at a home under construction'),('slide-con-new.jpg','Aerial view of a finished home')]))
page("contact-us/","Contact Us | Centrale Realty","Contact Centrale Realty, Inc. in Rochester Hills, Michigan.","Contact <em>Us</em>",
 f'<address>{ORG}<br>{ADDR}<br>Office: <a href="tel:+12486568830">248.656.8830</a><br>Fax: 248.694.9344<br>Email: <a href="mailto:info@centralerealty.com">info@centralerealty.com</a></address>\n    <p><a class="btn" href="mailto:info@centralerealty.com">Email us</a> <a class="btn" href="https://www.google.com/maps/dir/?api=1&amp;destination=2490+Walton+Blvd+Ste+103+Rochester+Hills+MI+48309" target="_blank" rel="noopener">Get Directions</a></p>\n    <h2>Frequently Asked <em>Questions</em></h2><div class="faq"><details><summary>Where is Centrale Realty located?</summary><p>Our office is at 2490 Walton Boulevard, Suite 103, Rochester Hills, Michigan 48309.</p></details><details><summary>What areas do you serve?</summary><p>We have served the Metro Detroit area since 1984, with properties in Rochester Hills, Auburn Hills, Shelby Township, Chesterfield Township, Macomb Township, Troy, Birmingham, Royal Oak and Sterling Heights.</p></details><details><summary>What services do you offer?</summary><p>Residential and commercial sales, leasing, vacant land and construction services, with representation for buyers, sellers and tenants.</p></details><details><summary>How do I schedule a consultation?</summary><p>Call (248) 656-8830 or email info@centralerealty.com and one of our agents will be in touch.</p></details><details><summary>Do you build homes?</summary><p>We build spec homes and list them for sale once they are complete. Our homes are built by our affiliates, L&amp;R Homes Inc and Town Properties LLC.</p></details><details><summary>Do you handle rentals?</summary><p>Yes. We specialize in rentals across Metro Detroit, from corporate housing in Rochester Hills to duplexes and townhomes in Shelby Township and Chesterfield Township.</p></details></div>',banner=('office-banner.jpg','Two-storey brick and stone office building at 2490 Walton Boulevard, Rochester Hills'))
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
open(os.path.join(SITE,"site.webmanifest"),"w").write(json.dumps({"name":"Centrale Realty, Inc.","short_name":"Centrale","start_url":"/","display":"browser","background_color":"#0b0b0b","theme_color":"#0b0b0b","icons":[{"src":"/assets/favicon-192.png","sizes":"192x192","type":"image/png"},{"src":"/assets/favicon-512.png","sizes":"512x512","type":"image/png"}]},indent=2)+"\n")
os.makedirs(os.path.join(SITE,".well-known"),exist_ok=True)
open(os.path.join(SITE,".well-known","security.txt"),"w").write("Contact: mailto:info@centralerealty.com\nExpires: 2027-10-01T00:00:00.000Z\nPreferred-Languages: en\nCanonical: https://centralerealty.com/.well-known/security.txt\n")

# Google Search Console ownership file (keep it: Google re-checks it)
open(os.path.join(SITE,"google82522a2cd00e9dc3.html"),"w").write("google-site-verification: google82522a2cd00e9dc3.html")

# browsers and crawlers request /favicon.ico from the site root first
import shutil
shutil.copyfile(os.path.join(SITE,"assets","favicon.ico"),os.path.join(SITE,"favicon.ico"))
