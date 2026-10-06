"""Print-ready 46.5" x 17.5" "FOR LEASE" sign for the 2490 Walton road sign.
Text only (no QR code), sized to fill the sign for readability from the road.
Usage: python signs/make_sign.py        (needs: pip install reportlab)
Env:   SIGN_OUT=<path> to write somewhere else (e.g. when the PDF is open in a viewer)
"""
import os
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

W, H = 46.5 * 72, 17.5 * 72
BG, INK = HexColor("#baa383"), HexColor("#0b0b0b")  # Centrale brand inverted: gold background, black text
pdfmetrics.registerFont(TTFont("Black", "C:/Windows/Fonts/ariblk.ttf"))

OUT = os.environ.get("SIGN_OUT", "signs/for-lease-sign-2490-46.5x17.5in.pdf")
c = canvas.Canvas(OUT, pagesize=(W, H))
c.setTitle("For Lease sign 46.5 x 17.5 in")
c.setFillColor(BG); c.rect(0, 0, W, H, fill=1, stroke=0)
c.setStrokeColor(INK); c.setLineWidth(5); c.rect(0.4*72, 0.4*72, W-0.8*72, H-0.8*72, fill=0)  # inset border (safe from trim)

MARGIN_X, MARGIN_Y = 1.3*72, 1.3*72
lw = W - 2*MARGIN_X
LINES = ["FOR LEASE", "248-656-8830", "OFFICE / MEDICAL SPACE", "CENTRALEREALTY.COM/2490"]
cap = pdfmetrics.getFont("Black").face.capHeight / 1000.0     # cap height per 1pt of font size
sizes = [lw / pdfmetrics.stringWidth(t, "Black", 1) for t in LINES]   # each line spans the full width
RULE = 0.18*72
avail = H - 2*MARGIN_Y
caps = [cap * s for s in sizes]
# gaps hold the lines apart (one fewer than lines); the rule sits in the first gap
min_gap = 1.0*72
need = sum(caps) + (len(LINES)-1)*min_gap + RULE
if need > avail:                                              # shrink uniformly if it can't fit
    k = avail / need
    sizes = [s*k for s in sizes]; caps = [cap*s for s in sizes]
gap = (avail - sum(caps) - RULE) / (len(LINES)-1)

c.setFillColor(INK)
y_top = H - MARGIN_Y
# line 1
y1 = y_top - caps[0]
c.setFont("Black", sizes[0]); c.drawCentredString(W/2, y1, LINES[0])
# rule
c.rect(MARGIN_X, y1 - gap*0.5 - RULE/2, lw, RULE, fill=1, stroke=0)
# line 2
y2 = y1 - gap - caps[1]
c.setFont("Black", sizes[1]); c.drawCentredString(W/2, y2, LINES[1])
# line 3
y3 = y2 - gap - caps[2]
c.setFont("Black", sizes[2]); c.drawCentredString(W/2, y3, LINES[2])
# line 4 (web address)
y4 = y3 - gap - caps[3]
c.setFont("Black", sizes[3]); c.drawCentredString(W/2, y4, LINES[3])

c.showPage(); c.save()
print("sizes pt:", [round(s) for s in sizes], "cap heights in:", [round(x/72, 2) for x in caps], "gap in:", round(gap/72, 2))
