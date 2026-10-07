import math, random
from PIL import Image, ImageDraw, ImageFilter
random.seed(7)
W,D,H,T=28.6,18.3,9.0,0.6
S=80; c=math.cos(math.radians(30)); M=120
OX=D*c*S+M+T*c*S; OY=H*S+M+T*0.5*S
IW=int((W+D+2*T)*c*S+2*M); IH=int((W+D+2*T)*0.5*S+H*S+2*M)
def P(x,y,z=0): return (OX+(x-y)*c*S, OY+(x+y)*0.5*S-z*S)
def shade(col,f): return tuple(max(0,min(255,int(v*f))) for v in col)
bg=(246,243,238)
img=Image.new('RGB',(IW,IH),bg); d=ImageDraw.Draw(img)
def poly(pts,fill,outline=None):
    d.polygon([P(*p) for p in pts],fill=fill,outline=outline)
def box(x0,y0,z0,x1,y1,z1,col,dd=None,edge=True):
    dd=dd or d
    top=shade(col,1.08); so=shade(col,.82); ea=shade(col,.64); ol=shade(col,.45) if edge else None
    f=lambda pts,fl: dd.polygon([P(*p) for p in pts],fill=fl,outline=ol)
    f([(x0,y1,z0),(x1,y1,z0),(x1,y1,z1),(x0,y1,z1)],so)      # south
    f([(x1,y0,z0),(x1,y1,z0),(x1,y1,z1),(x1,y0,z1)],ea)      # east
    f([(x0,y0,z1),(x1,y0,z1),(x1,y1,z1),(x0,y1,z1)],top)     # top
# ---- floor
floor=(120,104,94)
poly([(0,0,0),(W,0,0),(W,D,0),(0,D,0)],floor)
# planks
k=0.0;row=0
while k<D:
    col=shade(floor,random.uniform(.93,1.06))
    # plank row band
    x=-random.uniform(0,4)
    while x<W:
        L=random.uniform(3.2,5.5); xa=max(0,x); xb=min(W,x+L)
        if xb>xa:
            cc=shade(floor,random.uniform(.9,1.08))
            poly([(xa,k,0),(xb,k,0),(xb,min(D,k+.5),0),(xa,min(D,k+.5),0)],cc)
            d.line([P(xa,k,0),P(xb,k,0)],fill=shade(floor,.72),width=1)
            d.line([P(xa,k,0),P(xa,min(D,k+.5),0)],fill=shade(floor,.72),width=1)
        x+=L
    k+=.5
# ---- shadows layer
sh=Image.new('RGBA',(IW,IH),(0,0,0,0)); sd=ImageDraw.Draw(sh)
def shadow(x0,y0,x1,y1,h):
    o=min(1.6,0.25+h*.22)
    pts=[(x0,y0),(x1,y0),(x1+o,y0+o),(x1+o,y1+o),(x0+o,y1+o),(x0,y1)]
    sd.polygon([P(x,y,0) for x,y in pts],fill=(0,0,0,95))
items=[]  # (key, drawfn)
def add(key,fn): items.append((key,fn))
def desk(x0,y0,x1,y1,face):  # face: direction chair sits ('S' or 'E')
    wood=(150,104,68); dark=(48,48,50)
    zt=2.45
    def fn():
        # legs/panels
        if face=='S':
            box(x0+.1,y0+.1,0,x0+.3,y1-.1,zt,dark); box(x1-.3,y0+.1,0,x1-.1,y1-.1,zt,dark)
        else:
            box(x0+.1,y0+.1,0,x1-.1,y0+.3,zt,dark); box(x0+.1,y1-.3,0,x1-.1,y1-.1,zt,dark)
        box(x0,y0,zt,x1,y1,zt+.14,wood)
        # monitor + laptop
        if face=='S':
            mx=(x0+x1)/2; box(mx-.9,y0+.45,zt+.14,mx+.9,y0+.6,zt+1.45,(25,25,28))
            box(mx-.8,y0+.62,zt+.3,mx+.8,y0+.63,zt+1.35,(110,160,210),edge=False)
            box(mx-.25,y0+.4,zt+.14,mx+.25,y0+.7,zt+.4,(40,40,42))
            box(mx+1.0,y0+1.2,zt+.14,mx+1.9,y0+1.9,zt+.2,(190,190,195))
            box(mx+1.0,y0+1.2,zt+.2,mx+1.9,y0+1.25,zt+.8,(60,60,64))
        else:
            my=(y0+y1)/2; box(x0+.45,my-.9,zt+.14,x0+.6,my+.9,zt+1.45,(25,25,28))
            box(x0+.62,my-.8,zt+.3,x0+.63,my+.8,zt+1.35,(110,160,210),edge=False)
            box(x0+.4,my-.25,zt+.14,x0+.7,my+.25,zt+.4,(40,40,42))
            box(x0+1.2,my+1.0,zt+.14,x0+1.9,my+1.9,zt+.2,(190,190,195))
            box(x0+1.2,my+1.0,zt+.2,x0+1.25,my+1.9,zt+.8,(60,60,64))
    shadow(x0,y0,x1,y1,zt)
    add((x0+x1+y0+y1)/2,fn)
def chair(cx,cy,back,col=(52,54,60)):  # back: side where backrest is: 'N','S','E','W'
    s=0.85
    x0,x1,y0,y1=cx-s,cx+s,cy-s,cy+s
    def fn():
        box(cx-.12,cy-.12,0,cx+.12,cy+.12,1.1,(30,30,32))
        for a,b in [(-.8,-.8),(.8,-.8),(-.8,.8),(.8,.8)]:
            box(cx+a-.1,cy+b-.1,0,cx+a+.1,cy+b+.1,.12,(30,30,32),edge=False)
        box(x0,y0,1.1,x1,y1,1.4,col)
        t=.28
        if back=='N': box(x0,y0,1.4,x1,y0+t,2.9,col)
        if back=='S': box(x0,y1-t,1.4,x1,y1,2.9,col)
        if back=='W': box(x0,y0,1.4,x0+t,y1,2.9,col)
        if back=='E': box(x1-t,y0,1.4,x1,y1,2.9,col)
    shadow(x0,y0,x1,y1,1.4)
    add(cx+cy+0.05,fn)
def plant(cx,cy,h=4.2,pot=(70,70,74)):
    def fn():
        box(cx-.7,cy-.7,0,cx+.7,cy+.7,1.3,pot)
        for dx,dy,dz,r in [(0,0,h-.6,1.25),(-.55,.2,h-1.3,1.0),(.6,-.1,h-1.5,1.0),(.1,.6,h-1.9,.95),(-.2,-.5,h-1.0,.9)]:
            px,py=P(cx+dx,cy+dy,dz+1.3)
            rr=r*S*.8
            g=random.choice([(66,118,70),(78,134,80),(58,104,64)])
            d.ellipse([px-rr,py-rr,px+rr,py+rr],fill=g,outline=(40,80,46))
            d.ellipse([px-rr*.5,py-rr*.7,px+rr*.2,py-rr*.1],fill=(110,168,106))
    shadow(cx-.7,cy-.7,cx+.7,cy+.7,2)
    add(cx+cy+.3,fn)
def rug(x0,y0,x1,y1,col):
    def fn():
        poly([(x0,y0,.01),(x1,y0,.01),(x1,y1,.01),(x0,y1,.01)],col)
        poly([(x0+.25,y0+.25,.02),(x1-.25,y0+.25,.02),(x1-.25,y1-.25,.02),(x0+.25,y1-.25,.02)],shade(col,1.12))
    items.insert(0,(-99,fn))
def table(x0,y0,x1,y1):
    wood=(150,104,68);dark=(48,48,50)
    def fn():
        for a,b in [(x0+.5,y0+.4),(x1-.7,y0+.4),(x0+.5,y1-.6),(x1-.7,y1-.6)]:
            box(a,b,0,a+.2,b+.2,2.45,dark)
        box(x0,y0,2.45,x1,y1,2.62,wood)
    shadow(x0,y0,x1,y1,2.6)
    add((x0+x1+y0+y1)/2,fn)
def sideboard(x0,y0,x1,y1,hh=2.6):
    def fn():
        box(x0,y0,0,x1,y1,hh,(236,232,224))
        box(x0-.05,y0-.05,hh,x1+.05,y1+.05,hh+.12,(150,104,68))
        # books/decor
    shadow(x0,y0,x1,y1,hh)
    add((x0+x1+y0+y1)/2,fn)
def shelf(x0,y0,x1,y1,hh=6.5):
    def fn():
        box(x0,y0,0,x1,y1,hh,(236,232,224))
        for zz in (1.6,3.2,4.8):
            box(x0+.05,y0+.05,zz,x1-.05,y1-.05,zz+.1,(150,104,68),edge=False)
        # books
        for zz in (1.7,3.3,4.9,0.15):
            xx=x0+.1
            while xx<x1-.3:
                w=random.uniform(.15,.3); box(xx,y0+.1,zz,xx+w,y1-.1,zz+random.uniform(.9,1.3),random.choice([(120,90,70),(186,163,131),(60,70,90),(200,200,205)]),edge=False)
                xx+=w+.05
    shadow(x0,y0,x1,y1,hh)
    add((x0+x1+y0+y1)/2,fn)
# ---- LAYOUT (feet; room 28.6 x 18.3, north wall y=0, west wall x=0)
# reception near right (NE) entry door
rug(10.5,7.0,18.5,13.0,(205,200,192))
# workstations along north wall
desk(5.3,0.3,10.6,3.0,'S'); chair(7.95,4.1,'N')
desk(12.0,0.3,17.3,3.0,'S'); chair(14.65,4.1,'N')
# west wall workstations
desk(0.3,5.3,3.0,10.6,'E'); chair(4.1,7.95,'W')
desk(0.3,12.0,3.0,17.3,'E'); chair(4.1,14.65,'W')
# conference table + chairs
table(11.2,8.2,17.8,11.8)
for x in (12.6,14.5,16.4): chair(x,7.15,'N',(186,163,131)); chair(x,12.85,'S',(186,163,131))
chair(10.2,10.0,'W',(186,163,131)); chair(18.8,10.0,'E',(186,163,131))
# reception at right (north-east): sideboard + guest chairs
sideboard(19.5,0.3,24.0,1.7)
desk(21.2,4.2,26.8,6.2,'S'); chair(24.0,7.4,'N')
chair(22.8,9.6,'S',(186,163,131)); chair(25.6,9.6,'S',(186,163,131)); box_dummy=None
# shelves, plants, credenza
shelf(0.2,0.3,1.8,4.6) if False else None
plant(1.2,1.2); plant(27.3,12.2,4.6); plant(19.6,16.6,3.6)
sideboard(5.0,16.2,11.0,17.6)
# existing unit (HVAC / panel) bottom-right
def unit():
    box(22.3,15.2,0,26.1,18.2,3.4,(200,200,204))
    box(22.5,15.4,3.4,25.9,18.0,3.55,(120,120,126),edge=False)
add(26.1+18.2,unit); shadow(22.3,15.2,26.1,18.2,3.4)
# ---- draw: shadows, rug, items
sh=sh.filter(ImageFilter.GaussianBlur(10))
mask=Image.new('L',(IW,IH),0); ImageDraw.Draw(mask).polygon([P(0,0),P(W,0),P(W,D),P(0,D)],fill=255)
a=sh.split()[3]; from PIL import ImageChops; sh.putalpha(ImageChops.multiply(a,mask))
base=img.convert('RGBA'); base.alpha_composite(sh); img=base.convert('RGB'); d=ImageDraw.Draw(img)
# ---- walls (behind)
wall=(244,241,236)
box(-T,-T,0,W,0,H,wall)           # north wall
box(-T,0,0,0,D,H,wall)            # west wall
# base trim
box(0,0,0,W,.12,.45,(225,220,212),edge=False)
box(0,0,0,.12,D,.45,(225,220,212),edge=False)
# doors on north wall interior (y=0)
def door(x0,x1):
    fr=(70,52,40); pan=(160,112,76)
    poly([(x0-.15,-0.001,0),(x1+.15,-0.001,0),(x1+.15,-0.001,7.2),(x0-.15,-0.001,7.2)],fr)
    poly([(x0,-0.002,0),(x1,-0.002,0),(x1,-0.002,7.0),(x0,-0.002,7.0)],pan)
    for a,b,z0,z1 in [(x0+.35,x1-.35,.5,3.3),(x0+.35,x1-.35,3.7,6.5)]:
        poly([(a,-0.003,z0),(b,-0.003,z0),(b,-0.003,z1),(a,-0.003,z1)],shade(pan,.88),shade(pan,.6))
    px,py=P(x1-.35,-0.004,3.4); d.ellipse([px-5,py-5,px+5,py+5],fill=(210,200,170))
door(0.4,3.5); door(25.4,28.4)
# framed art + wall decor on north wall
def frame(x0,x1,z0,z1,col):
    poly([(x0,-0.002,z0),(x1,-0.002,z0),(x1,-0.002,z1),(x0,-0.002,z1)],(40,40,42))
    poly([(x0+.15,-0.003,z0+.15),(x1-.15,-0.003,z0+.15),(x1-.15,-0.003,z1-.15),(x0+.15,-0.003,z1-.15)],col)
frame(6.5,9.5,4.4,6.6,(186,163,131)); frame(13.0,16.2,4.4,6.6,(20,54,130))
# west wall art + wordmark panel
def frameW(y0,y1,z0,z1,col):
    poly([(-0.002,y0,z0),(-0.002,y1,z0),(-0.002,y1,z1),(-0.002,y0,z1)],(40,40,42))
    poly([(-0.003,y0+.15,z0+.15),(-0.003,y1-.15,z0+.15),(-0.003,y1-.15,z1-.15),(-0.003,y0+.15,z1-.15)],col)
frameW(6.2,9.8,4.4,6.6,(186,163,131)); frameW(12.6,16.0,4.4,6.6,(20,54,130))
# ---- furniture
for k,fn in sorted(items,key=lambda t:t[0]): fn()
# ---- low south & east cut stubs with glazing hint
box(0,D,0,W,D+T,.35,(236,232,224))
box(W,0,0,W+T,D+T,.35,(236,232,224))
img=img.crop((int(M*.4),int(M*.3),IW-int(M*.4),IH-int(M*.3)))
img=img.resize((img.width//2,img.height//2),Image.LANCZOS)
img.save('scene.png'); print(img.size)
