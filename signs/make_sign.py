"""Print-ready 46.5" x 17.5" "FOR LEASE" sign for the 2490 Walton road sign.
Text only (no QR code), sized to fill the sign for readability from the road.
Usage: python signs/make_sign.py        (needs: pip install reportlab)
Env:   SIGN_OUT=<path>  write somewhere else (e.g. when the PDF is open in a viewer)
       SIGN_FONT=Black|Impact  typeface for all three lines (default Black)
"""
import os
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

W, H = 46.5 * 72, 17.5 * 72
BG, INK = HexColor("#baa383"), HexColor("#0b0b0b")  # Centrale brand inverted: gold background, black text
FONT_FILES = {"Black": "C:/Windows/Fonts/ariblk.ttf", "Impact": "C:/Windows/Fonts/impact.ttf"}
FONT = os.environ.get("SIGN_FONT", "Black")
pdfmetrics.registerFont(TTFont(FONT, FONT_FILES[FONT]))

OUT = os.environ.get("SIGN_OUT", "signs/for-lease-sign-2490-46.5x17.5in.pdf")
c = canvas.Canvas(OUT, pagesize=(W, H))
c.setTitle("For Lease sign 46.5 x 17.5 in")
c.setFillColor(BG); c.rect(0, 0, W, H, fill=1, stroke=0)
c.setStrokeColor(INK); c.setLineWidth(5); c.rect(0.4*72, 0.4*72, W-0.8*72, H-0.8*72, fill=0)  # inset border (safe from trim)

MARGIN_X, MARGIN_Y = 1.0*72, 1.0*72
lw = W - 2*MARGIN_X
LINES = ["FOR LEASE", "248-656-8830", "CENTRALEREALTY.COM/2490"]
RULE = 0.18*72                                   # separator rules between lines, full text width
cap = pdfmetrics.getFont(FONT).face.capHeight / 1000.0   # cap height per 1pt of font size
sizes = [lw / pdfmetrics.stringWidth(t, FONT, 1) for t in LINES]   # each line spans the full width
caps = [cap * s for s in sizes]
avail = H - 2*MARGIN_Y
MIN_GAP = 0.9*72                                 # room for a rule plus space either side
need = sum(caps) + (len(LINES)-1)*MIN_GAP
if need > avail:                                 # shrink uniformly if it can't fit
    k = avail / need
    sizes = [s*k for s in sizes]; caps = [cap*s for s in sizes]
gap = (avail - sum(caps)) / (len(LINES)-1)

c.setFillColor(INK)
y_top = H - MARGIN_Y
y = y_top - caps[0]                              # baseline of the first line
for i, (text, size) in enumerate(zip(LINES, sizes)):
    c.setFont(FONT, size)
    c.drawCentredString(W/2, y, text)
    if i < len(LINES) - 1:
        c.rect(MARGIN_X, y - gap/2 - RULE/2, lw, RULE, fill=1, stroke=0)   # separator, centred in the gap
        y = y - gap - caps[i+1]

c.showPage(); c.save()
print(FONT, "sizes pt:", [round(s) for s in sizes], "cap heights in:", [round(x/72, 2) for x in caps], "gap in:", round(gap/72, 2))
