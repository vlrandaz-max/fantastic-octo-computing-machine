"""Turns brochures/8424-annsbury-brochure.html (the $2,100 print brochure) into the public web version
tools/annsbury_brochure_web.html (rent shown as "Call for Pricing", all CSS scoped under .bro).
Run: python3 tools/make_web_brochure.py   (then python3 tools/build_site.py)"""
import re,os
HERE=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.dirname(HERE)
src=open(os.path.join(ROOT,'brochures','8424-annsbury-brochure.html'),encoding='utf-8').read()
css=re.search(r'<style>(.*?)</style>',src,re.S).group(1)
body=re.search(r'<body>(.*)</body>',src,re.S).group(1)
CLS="sheet top brand rule pricebox tag sub photos a stats soon body lbl hi move tot foot row agent contact qrbox qr disc hd plans gal note col".split()
# ---- body: no prices, scoped class names ----
body=body.replace('<div class="pricebox"><small>Rent</small><strong>$2,100<span style="font-size:.45em;letter-spacing:.06em"> / month</span></strong><em>1-year minimum &middot; No pets</em></div>',
                  '<div class="pricebox"><small>Rent</small><strong class="cfp">Call for Pricing</strong><em>1-year minimum &middot; No pets</em></div>')
mv=re.search(r'<div class="move">.*?</div>\n      <div class="lbl">Lease Details</div>',body,re.S).group(0)
newmv='''<div class="move">
        <div class="lbl">Move-In Requirements</div>
        <table>
          <tr><td>First Month&rsquo;s Rent</td><td>Due at move-in</td></tr>
          <tr><td>Security Deposit</td><td>1.5 months&rsquo; rent</td></tr>
          <tr><td>Cleaning Fee</td><td>$350</td></tr>
        </table>
        <small>The $350 cleaning fee may be waived if the home is taken as-is. Call for pricing.</small>
      </div>
      <div class="lbl">Lease Details</div>'''
body=body.replace(mv,newmv)
body=body.replace('<tr><td>Rent</td><td>$2,100 per month</td></tr>','<tr><td>Rent</td><td>Call for pricing</td></tr>')
body=body.replace('&nbsp;&middot;&nbsp; $2,100 / month','&nbsp;&middot;&nbsp; Call for pricing')
assert '$2,100' not in body and '$3,150' not in body and '5,600' not in body and '5,250' not in body, 'price left in web brochure'
body=body.replace('<h1>','<div class="b-h1">').replace('</h1>','</div>').replace('<h2>','<div class="b-h2">').replace('</h2>','</div>')
body=body.replace('../branding-kit/logos/logo-cr-black.png','../../../assets/images/logo-cr-black.png')
body=body.replace('../site/assets/images/','../../../assets/images/').replace('../site/assets/equal-housing.png','../../../assets/equal-housing.png')
body=body.replace('src="qr-annsbury.png"','src="../../../assets/images/qr-annsbury.png"')
def cls(m):
    return 'class="'+' '.join('b-'+t if t in CLS else t for t in m.group(1).split())+'"'
body=re.sub(r'class="([^"]*)"',cls,body)
css=css.replace('CGI,serif','"Cormorant Garamond",serif').replace('CG,serif','"Cormorant Garamond",serif')
body=body.replace('class="b-sheet"','class="b-sheet"')
# image sizes + alt text (layout shift, accessibility)
from PIL import Image
ALT={'logo-cr-black.png':'Centrale Realty','annsbury-exterior.jpg':'Brick and stone townhouses on Annsbury Drive','annsbury-kitchen-2.jpg':'Kitchen with maple cabinets, granite counters and stainless steel appliances','annsbury-kitchen-1.jpg':'Kitchen and dinette with a patio door','annsbury-3d-plan-garage-right.jpg':'3D floor plan of 8424 Annsbury Drive','annsbury-exterior-twilight.jpg':'The townhouses at twilight','annsbury-living.jpg':'Living room','annsbury-closets.jpg':'Closet and storage space','qr-annsbury.png':'QR code for the Annsbury Drive page','equal-housing.png':'Equal Housing Opportunity'}
def fiximg(m):
    tag=m.group(0); f=re.search(r'src="([^"]+)"',tag).group(1); name=os.path.basename(f)
    path=os.path.join(ROOT,'site','assets','images',name) if os.path.exists(os.path.join(ROOT,'site','assets','images',name)) else os.path.join(ROOT,'site','assets',name)
    w,h=Image.open(path).size
    tag=tag.replace('alt=""','alt="'+ALT.get(name,'')+'"')
    return tag.replace('<img ','<img width="%d" height="%d" '%(w,h),1)
body=re.sub(r'<img [^>]*>',fiximg,body)
# ---- css: scope under .bro ----
css=re.sub(r'@font-face\{[^}]*\}','',css)
css=re.sub(r'@page\{[^}]*\}','',css)
css=re.sub(r':root\{[^}]*\}','',css)
css=re.sub(r'\*\{[^}]*\}','',css)
css=re.sub(r'html,body\{[^}]*\}','',css)
css=re.sub(r'(?<![.\w-])body\{[^}]*\}','',css)
css=re.sub(r'@media print\{[^}]*\}\}?','',css)
out=[]
for sel,decl in re.findall(r'([^{}]+)\{([^{}]*)\}',css):
    sels=[]
    for s in sel.split(','):
        s=s.strip()
        if not s: continue
        s=re.sub(r'\.(\w+)',lambda m:'.b-'+m.group(1) if m.group(1) in CLS else m.group(0),s)
        s=re.sub(r'(^|\s)h1\b',r'\1.b-h1',s); s=re.sub(r'(^|\s)h2\b',r'\1.b-h2',s)
        sels.append('.bro '+s)
    out.append(','.join(sels)+'{'+decl+'}')
scoped='\n'.join(out)
extra='''
.bro{--ink:#1a1a1a;--gold:#baa383;--gold-deep:#7d6849;--tint:#f6f1e8;--line:#d9d2c5;--mute:#5b5750;font-family:Jost,Arial,sans-serif;color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.bro *{box-sizing:border-box}
.bro .b-sheet{box-shadow:0 2px 14px rgba(0,0,0,.22);margin:0 auto 24px}
.bro .b-pricebox .cfp{font:500 27px/1.2 "Cormorant Garamond",serif;color:var(--gold-deep);margin-top:9px;letter-spacing:.02em}
.bro .b-actions{text-align:center;margin:0 0 22px}
.bro .b-sheet p,.bro .b-sheet ul,.bro .b-sheet li,.bro .b-sheet table{max-width:none}
.bro .b-sheet .b-top{margin:0}
.bro figure{margin:0;max-width:none;width:auto}
.bro img{max-width:none;display:block}
.bro .b-photos figure,.bro .b-gal figure{width:auto}
.bro .b-plans img{display:inline-block;max-width:100%}
.bro .b-sheet table{margin-top:0}
@media (max-width:880px){.bro .b-sheet{zoom:.42;margin-bottom:10px}}
@media (max-width:520px){.bro .b-sheet{zoom:.36}}
@page{size:8.5in 11in;margin:0}
@media print{
 .skip,.topbar,.site-header,.site-footer,.page-title,.hero,.stg-strip,.mobile-cta,.noprint,.b-actions{display:none!important}
 html,body{background:#fff!important}
 .page-body{padding:0!important;margin:0!important}
 .wrap,.prose{max-width:none!important;padding:0!important;margin:0!important;width:auto!important}
 .bro .b-sheet{zoom:1!important;margin:0!important;box-shadow:none!important;height:10.9in!important;page-break-after:auto;break-after:auto}
 .bro .b-sheet+.b-sheet{page-break-before:always;break-before:page}
 .bro .b-sheet:last-child{page-break-after:avoid;break-after:avoid;height:10.9in!important}
 html,body{height:auto!important;min-height:0!important;margin:0!important}
 body>*:not(main):not(script):not(style){display:none!important}
 .bro{overflow:hidden;page-break-after:avoid;break-after:avoid}
 .page-body .wrap{display:block}
}
'''
open(os.path.join(HERE,'annsbury_brochure_web.html'),'w',encoding='utf-8').write('<style>'+scoped+extra+'</style>\n<div class="bro">\n<p class="b-actions noprint"><button type="button" class="btn btn-solid" onclick="window.print()">Print / Save as PDF</button> <a class="btn" href="../">&larr; Back to 8424 Annsbury Drive</a></p>\n'+body+'\n</div>')
print('wrote',len(scoped),'chars css')
