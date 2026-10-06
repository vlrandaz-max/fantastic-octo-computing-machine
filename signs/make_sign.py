"""Print-ready 46.5" x 17.5" "FOR LEASE" sign for the 2490 Walton road sign.
Usage: python signs/make_sign.py [URL]   (needs: pip install reportlab qrcode)
"""
import sys, qrcode
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

URL = sys.argv[1] if len(sys.argv) > 1 else "https://vlrandaz-max.github.io/fantastic-octo-computing-machine/suite-101"
W, H = 46.5 * 72, 17.5 * 72
NAVY, SILVER = HexColor("#0b0b0b"), HexColor("#baa383")  # Centrale brand: black + gold
pdfmetrics.registerFont(TTFont("Black", "C:/Windows/Fonts/ariblk.ttf"))
pdfmetrics.registerFont(TTFont("Bold", "C:/Windows/Fonts/arialbd.ttf"))
pdfmetrics.registerFont(TTFont("Serif", "C:/Windows/Fonts/georgia.ttf"))

c = canvas.Canvas("signs/suite-101-for-lease-sign-46.5x17.5in.pdf", pagesize=(W, H))
c.setTitle("Suite 101 For Lease sign 46.5 x 17.5 in")
c.setFillColor(NAVY); c.rect(0, 0, W, H, fill=1, stroke=0)
c.setStrokeColor(SILVER); c.setLineWidth(5); c.rect(0.4*72, 0.4*72, W-0.8*72, H-0.8*72, fill=0)  # inset border (safe from trim)

# QR tile (right): white tile incl. quiet zone
qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_Q, border=0, box_size=1)
qr.add_data(URL); qr.make(fit=True)
m = qr.get_matrix(); n = len(m)
tile = 15.0 * 72; tx = W - tile - 1.0*72; ty = (H - tile) / 2 + 0.0
c.setFillColor(white); c.roundRect(tx, ty, tile, tile, 0.25*72, fill=1, stroke=0)
quiet = 0.8 * 72; cell = (tile - 2*quiet - 0.9*72) / n   # leave room for caption
qx, qy = tx + (tile - cell*n)/2, ty + quiet*0.55 + 0.9*72 - 0.0
c.setFillColor(HexColor("#000000"))
for r in range(n):
    for k in range(n):
        if m[r][k]: c.rect(qx + k*cell, qy + (n-1-r)*cell, cell+0.3, cell+0.3, fill=1, stroke=0)
c.setFillColor(NAVY); c.setFont("Black", 40); c.drawCentredString(tx + tile/2, ty + 0.3*72, "SCAN FOR DETAILS")

# Left block
lw = tx - 1.0*72 - 1.2*72   # usable width
cx = 1.2*72 + lw/2
def fit(text, font, width):
    return width / pdfmetrics.stringWidth(text, font, 1)
c.setFillColor(white)
sz = fit("FOR LEASE", "Black", lw); c.setFont("Black", sz); c.drawCentredString(cx, 9.0*72, "FOR LEASE")
c.setFillColor(SILVER); c.rect(1.2*72, 8.35*72, lw, 0.12*72, fill=1, stroke=0)
c.setFillColor(HexColor("#ffffff"))
sz2 = fit("248-656-8830", "Black", lw); c.setFont("Black", sz2); c.drawCentredString(cx, 4.35*72, "248-656-8830")
c.setFillColor(SILVER); sz3 = fit("SUITE 101  •  956 SQ FT  •  OFFICE / MEDICAL", "Bold", lw); c.setFont("Bold", sz3)
c.drawCentredString(cx, 1.6*72, "SUITE 101  •  956 SQ FT  •  OFFICE / MEDICAL")

# Brand lockup (top-left): gold C/R mark + CENTRALE REALTY wordmark
LOGO = "public/assets/suite-101/logo-cr-gold.png"
lh = 3.4*72; lwid = lh*539/600; ly = 13.15*72
c.drawImage(LOGO, 1.2*72, ly, width=lwid, height=lh, mask="auto")
wx = 1.2*72 + lwid + 0.7*72
c.setStrokeColor(SILVER); c.setLineWidth(3); c.line(wx-0.35*72, ly+0.2*72, wx-0.35*72, ly+lh-0.2*72)
c.setFillColor(white); c.setFont("Serif", 120); c.drawString(wx, ly+1.75*72, "CENTRALE")
c.setFillColor(SILVER); c.setFont("Bold", 60); c.drawString(wx+4, ly+0.7*72, "R E A L T Y")
c.showPage(); c.save()
print("qr modules:", n, "cell in:", round(cell/72,3), "FOR LEASE pt:", round(sz), "phone pt:", round(sz2), "sub pt:", round(sz3))
