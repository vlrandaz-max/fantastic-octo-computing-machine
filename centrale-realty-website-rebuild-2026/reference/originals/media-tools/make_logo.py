"""Centrale lockup (gold C/R mark | CENTRALE / REALTY) as a transparent PNG with a soft shadow,
built to the site header's proportions (64px mark, Cormorant 30.4px, Jost 14px)."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter

D = r"C:/Users/vlran/AppData/Local/Temp/claude/C--Users-vlran-Documents-fantastic-octo-computing-machine/3486c1c8-de8a-46d1-b9ad-40d9ce582181/scratchpad/logo/"
MARK = r"C:/Users/vlran/Documents/centrale-wt/centrale-realty-website-rebuild-2026/site/assets/logo-cr-gold.png"
GOLD = (212, 184, 122, 255)
WHITE = (255, 255, 255, 255)

SCALE = 0.9            # relative to the website header
SS = 4                 # supersampling
k = SCALE * SS

def font(path, size, wght):
    f = ImageFont.truetype(path, int(round(size * k)))
    f.set_variation_by_axes([wght])
    return f

serif = font(D + "cormorant-garamond-normal.ttf", 30.4, 500)
sans = font(D + "jost-normal.ttf", 14.6, 400)

def spaced_width(text, f, spacing):
    return sum(f.getlength(ch) + spacing for ch in text) - spacing

def draw_spaced(d, xy, text, f, fill, spacing):
    x, y = xy
    for ch in text:
        d.text((x, y), ch, font=f, fill=fill)
        x += f.getlength(ch) + spacing

mark = Image.open(MARK).convert("RGBA")
mh = int(64 * k)
mark = mark.resize((int(mark.width * mh / mark.height), mh), Image.LANCZOS)

gap, pad = int(14 * k), int(18 * k)
sp1, sp2 = 30.4 * 0.14 * k, 14.2 * 0.5 * k
w1 = spaced_width("CENTRALE", serif, sp1)
w2 = spaced_width("REALTY", sans, sp2)
tw = int(max(w1, w2))
margin = int(30 * k)                               # room for the shadow
W = margin * 2 + mark.width + gap + 1 + pad + tw
H = margin * 2 + mh
layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
layer.alpha_composite(mark, (margin, margin))
d = ImageDraw.Draw(layer)
x_div = margin + mark.width + gap
d.rectangle([x_div, margin + int(5 * k), x_div + max(1, int(1 * k)) - 1, margin + mh - int(5 * k)], fill=(186, 163, 131, 150))
tx = x_div + max(1, int(1 * k)) + pad
# CENTRALE (white), REALTY (gold, centred under it)
asc1 = serif.getmetrics()[0]
cy = margin + int(mh * 0.5) - int(asc1 * 0.62) - int(6 * k)
draw_spaced(d, (tx, cy), "CENTRALE", serif, WHITE, sp1)
ry = cy + int(30.4 * k) + int(3 * k)
draw_spaced(d, (tx + (w1 - w2) / 2, ry), "REALTY", sans, GOLD, sp2)

# soft shadow so it reads over bright walls
alpha = layer.split()[3]
shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
shadow.putalpha(alpha.point(lambda a: int(a * 0.85)))
shadow = shadow.filter(ImageFilter.GaussianBlur(6 * SS * SCALE))
out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
out.alpha_composite(shadow)
out.alpha_composite(layer)
out = out.resize((W // SS, H // SS), Image.LANCZOS)
out.save(D + "centrale-lockup.png")
print(out.size)

# preview on a mid-tone background
bg = Image.new("RGBA", out.size, (120, 130, 150, 255)); bg.alpha_composite(out); bg.save(D + "preview.png")
