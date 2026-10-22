"""Builds toner-friendly (light) print versions of the Suite 100/101 brochures.
Run from the repo folder: python3 tools/make_print_brochures.py   (then print each *-print.html to PDF with headless Chromium)"""
import re
CSS = """
/* print-light overrides */
html,body{background:#fff}
.sheet,.sheet.p2,.p2 .exh{background:#fff}
.top,.p2 .hd{background:#fff;color:var(--ink);border-bottom:2px solid var(--gold)}
.top{padding-bottom:0}
.brand span{color:var(--gold-deep)}
.brand .rule{background:var(--gold)}
.pricebox small,.pricebox em,.top .sub,.p2 .hd small{color:var(--mute)}
.pricebox strong,.top h1 em,.p2 .hd h2 em{color:var(--gold-deep)}
.tag{background:#efe7da;color:var(--ink)}
.photos,.photos3{background:#fff}
.photos figcaption,.photos3 figcaption{background:rgba(255,255,255,.9);color:var(--ink)}
.stats{background:#efe7da;border-top:1px solid var(--gold);border-bottom:1px solid var(--gold)}
.stats div{border-left:1px solid var(--gold)}
.stats b{color:var(--ink)}
.stats span{color:var(--mute)}
.expand{background:#faf6ef;color:var(--ink);border-bottom:1px solid var(--gold)}
.dir{background:#faf6ef;color:var(--ink)}
.dir b{color:var(--gold-deep)}
.dir span{color:var(--ink)}
.foot{background:#fff;color:var(--ink)}
.foot .row{border-top:3px solid var(--gold)}
.agent span{color:var(--gold-deep)}
.agent i{color:var(--mute)}
.contact{color:var(--ink)}
.contact span,.qrbox small{color:var(--gold-deep)}
.disc{border-top:1px solid var(--line);color:var(--mute)}
.disc img{filter:brightness(0);opacity:.6}
.p2 .hd h2{color:var(--ink)}
"""
for n,cam,util in [('100','about $950 per quarter (est., billed as actual pro-rata share)','Gas &amp; electric included in rent; tenant pays internet/cable and quarterly maintenance fee (CAM)'),
                   ('101','about $1,250 per quarter (est., billed as actual pro-rata share)','Tenant pays own gas &amp; electric, internet/cable, and quarterly maintenance fee (CAM)')]:
    f=f'brochures/suite-{n}-brochure.html'
    s=open(f).read()
    s=s.replace('</style>',CSS+'</style>',1)
    s=s.replace('logo-cr-gold.png','../branding-kit/logos/logo-cr-black.png' if False else 'logo-cr-gold.png')
    s=s.replace('../site/assets/logo-cr-gold.png','../branding-kit/logos/logo-cr-black.png')
    s,k=re.subn(r'<tr><td>Tenant Pays</td><td>.*?</td></tr>',f'<tr><td>Utilities / CAM</td><td>{util}</td></tr>',s)
    assert k==1
    open(f'brochures/suite-{n}-brochure-print.html','w').write(s)
