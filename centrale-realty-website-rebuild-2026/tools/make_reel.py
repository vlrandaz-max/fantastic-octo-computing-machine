"""Builds the Suite 100 / Suite 101 vertical reel (1080x1920, 30 fps, H.264, silent).
Run from the site folder root:  python3 tools/make_reel.py <out.mp4> [work-dir]
Needs numpy, opencv-python-headless, ffmpeg, and headless Chromium (for the text overlays)."""
import sys, os, subprocess, numpy as np, cv2, html
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1]; WORK = sys.argv[2] if len(sys.argv) > 2 else "/tmp/reel_work"
os.makedirs(WORK, exist_ok=True)
CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
W, H, FPS, XF = 1080, 1920, 30, 0.35
P = lambda *a: os.path.join(ROOT, *a)
S100 = P("brochures", "suite-100-staged"); S101 = P("brochures", "suite-101-staged")
STG = "Virtually staged · furniture not included"
# (kind, source, seconds, big text, small text, staged note, pan direction)
SCENES = [
 ("img", P("site/assets/images/office-banner.jpg"), 3.0, "Need office space<br>in <em>Rochester Hills?</em>", "2490 WALTON BLVD", False, 1),
 ("img", f"{S100}/suite-100-staged-workspace-original.jpg", 2.6, "Suite <em>100</em>", "725 SQ FT · LOWER LEVEL", True, 1),
 ("img", f"{S100}/suite-100-staged-walnut-original.jpg", 2.3, "Room for the<br><em>whole team</em>", "OPEN, BRIGHT LAYOUT", True, -1),
 ("img", f"{S100}/suite-100-staged-counter-original.jpg", 2.3, "Built-in counter<br>&amp; <em>coffee bar</em>", "SUITE 100", True, 1),
 ("img", f"{S101}/suite-101-staged-boucle-original.jpg", 2.6, "Suite <em>101</em>", "956 SQ FT · LOWER LEVEL", True, -1),
 ("img", f"{S101}/suite-101-staged-conference-original.jpg", 2.3, "Your own<br><em>conference room</em>", "SUITE 101", True, 1),
 ("img", f"{S101}/suite-101-staged-office-cropped.jpg", 2.3, "Private <em>office</em><br>space", "SUITE 101", True, -1),
 ("vid", P("site/assets/video/suite-101-walkthrough-2-stable.mp4"), 3.2, "Take a <em>walk</em> inside", "SUITE 101 · REAL FOOTAGE", False, 0),
 ("img", f"{S101}/suite-101-staged-whitetable-original.jpg", 2.3, "Natural light.<br><em>Stone accent wall.</em>", "SUITE 101", True, 1),
 ("img", f"{S100}/suite-100-staged-roundtable-original.jpg", 2.3, "Free parking.<br>Minutes to<br><em><span style=\"white-space:nowrap\">I-75 &amp; M-59</span></em>", "HENRY FORD ROCHESTER HOSPITAL NEARBY", True, -1),
 ("end", None, 3.6, "", "", False, 0),
]
FONTS = f"""@font-face{{font-family:CG;font-weight:300 700;src:url(file://{P('site/assets/fonts/cormorant-garamond-normal.woff2')})}}
@font-face{{font-family:CGI;font-style:italic;font-weight:300 700;src:url(file://{P('site/assets/fonts/cormorant-garamond-italic.woff2')})}}
@font-face{{font-family:Jost;font-weight:100 900;src:url(file://{P('site/assets/fonts/jost-normal.woff2')})}}"""
BASE = FONTS + """html,body{margin:0;width:1080px;height:1920px;background:transparent;overflow:hidden}
.t{position:absolute;left:0;right:0;text-align:center;color:#fff}"""
def overlay(i, big, small, staged):
    hh = f"""<style>{BASE}
.g1{{position:absolute;left:0;right:0;top:0;height:1080px;background:linear-gradient(rgba(0,0,0,.78) 0%,rgba(0,0,0,.66) 55%,rgba(0,0,0,0) 100%)}}
.g2{{position:absolute;left:0;right:0;bottom:0;height:700px;background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.72))}}
.logo{{position:absolute;top:236px;left:50%;transform:translateX(-50%);width:92px}}
.blk{{top:500px}}
.big{{font:400 118px/1.04 CG,serif;letter-spacing:.03em;text-transform:uppercase;text-shadow:0 2px 6px rgba(0,0,0,.55),0 4px 40px rgba(0,0,0,.7);padding:0 50px}}
.big em{{font:italic 500 132px/1 CGI,serif;text-transform:none;color:#e6cf9f;text-shadow:0 2px 6px rgba(0,0,0,.7),0 4px 36px rgba(0,0,0,.8)}}
.sm{{margin-top:44px;font:500 31px/1.3 Jost,sans-serif;letter-spacing:.3em;padding:0 40px;color:#fff;text-shadow:0 2px 6px rgba(0,0,0,.75),0 2px 22px rgba(0,0,0,.8)}}
.stg{{top:1496px;font:500 24px/1 Jost,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.88);text-shadow:0 2px 10px rgba(0,0,0,.7)}}
</style><div class="g1"></div><div class="g2"></div>
<img class="logo" src="file://{P('site/assets/logo-cr-gold.png')}">
<div class="t blk"><div class="big">{big}</div><div class="sm">{small}</div></div>{'<div class="t stg">'+STG+'</div>' if staged else ''}"""
    return hh
def end_html():
    return f"""<style>{BASE}
body{{background:#0b0b0b}}
.logo{{position:absolute;top:330px;left:50%;transform:translateX(-50%);width:210px}}
.nm{{top:640px;font:400 70px/1 CG,serif;letter-spacing:.24em;text-transform:uppercase;color:#fff}}
.rl{{top:732px;font:300 28px/1 Jost,sans-serif;letter-spacing:.62em;color:#baa383}}
.tag{{position:absolute;top:880px;left:50%;transform:translateX(-50%);background:#baa383;color:#0b0b0b;font:500 34px/1 Jost,sans-serif;letter-spacing:.32em;padding:22px 38px;text-transform:uppercase;white-space:nowrap}}
.h{{top:1010px;font:400 104px/1.04 CG,serif;text-transform:uppercase;letter-spacing:.03em;padding:0 40px}}
.h em{{font:italic 400 112px/1 CGI,serif;text-transform:none;color:#baa383}}
.d{{top:1370px;font:400 36px/1.5 Jost,sans-serif;letter-spacing:.08em;color:rgba(255,255,255,.88)}}
.u{{top:1480px;font:500 44px/1 Jost,sans-serif;letter-spacing:.06em;color:#baa383}}
.c{{top:1560px;font:500 34px/1 Jost,sans-serif;letter-spacing:.2em;color:#fff}}
</style><img class="logo" src="file://{P('site/assets/logo-cr-gold.png')}">
<div class="t nm">Centrale</div><div class="t rl">REALTY</div>
<div class="tag">Now Leasing</div>
<div class="t h">Office space at<br><em>2490 Walton Blvd</em></div>
<div class="t d">Suite 100 · Suite 101 · 1,681 sq ft combined</div>
<div class="t u">centralerealty.com/2490</div><div class="t c">(248) 656-8830 · LINK IN BIO</div>"""
def render_png(i, htm, transparent=True):
    hp = os.path.join(WORK, f"ov{i}.html"); op = os.path.join(WORK, f"ov{i}.png")
    open(hp, "w").write("<!doctype html><meta charset=utf-8>" + htm)
    args = [CHROME, "--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", f"--window-size={W},{H}",
            "--default-background-color=00000000", f"--screenshot={op}", "file://" + hp]
    subprocess.run(args, capture_output=True)
    im = cv2.imread(op, cv2.IMREAD_UNCHANGED)
    if im.shape[2] == 3: im = np.dstack([im, np.full(im.shape[:2], 255, np.uint8)])
    return im
overlays = []
for i, (k, src, sec, big, small, st, d) in enumerate(SCENES):
    overlays.append(render_png(i, end_html() if k == "end" else overlay(i, big, small, st)))
imgs = {i: cv2.imread(s[1]) for i, s in enumerate(SCENES) if s[0] == "img"}
vids = {i: cv2.VideoCapture(s[1]) for i, s in enumerate(SCENES) if s[0] == "vid"}
starts = []; t = 0.0
for s in SCENES: starts.append(t); t += s[2] - XF
TOTAL = starts[-1] + SCENES[-1][2]
def ease(x): x = min(max(x, 0), 1); return x * x * (3 - 2 * x)
def img_frame(i, p):
    im = imgs[i]; h, w = im.shape[:2]; d = SCENES[i][6]
    z = 1.0 + 0.10 * p
    base = H / h                      # scale so image height fills the frame
    sh = base * z; sw = w * sh
    travel = max(sw - W, 0)
    frac = 0.15 + 0.70 * p if d >= 0 else 0.85 - 0.70 * p
    x0 = travel * frac; y0 = (h * sh - H) / 2
    M = np.float32([[sh, 0, -x0], [0, sh, -y0]])
    return cv2.warpAffine(im, M, (W, H), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
def vid_frame(i, p):
    cap = vids[i]; n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT)); fps = cap.get(cv2.CAP_PROP_FPS) or 28
    want = min(int(p * SCENES[i][2] * fps), n - 1)
    cap.set(cv2.CAP_PROP_POS_FRAMES, want); ok, fr = cap.read()
    if not ok: fr = np.zeros((720, 1280, 3), np.uint8)
    h, w = fr.shape[:2]
    bg = cv2.resize(fr, (W, H), interpolation=cv2.INTER_AREA)
    bg = cv2.resize(cv2.resize(bg, (54, 96), interpolation=cv2.INTER_AREA), (W, H), interpolation=cv2.INTER_CUBIC)
    bg = (bg * 0.55).astype(np.uint8)
    fw = W; fh = int(h * W / w)
    fg = cv2.resize(fr, (fw, fh), interpolation=cv2.INTER_CUBIC)
    y = (H - fh) // 2 + 40
    bg[y:y + fh] = fg
    return bg
def end_frame():
    return np.full((H, W, 3), (11, 11, 11), np.uint8)
def scene_frame(i, tt):
    k, _, sec, *_ = SCENES[i]; p = (tt - starts[i]) / sec
    if k == "img": f = img_frame(i, p)
    elif k == "vid": f = vid_frame(i, p)
    else: f = end_frame()
    ov = overlays[i].astype(np.float32) / 255.0
    # text overlay fades in 0.25s after the scene starts and out 0.25s before it ends
    ta = min(max((tt - starts[i] - 0.2) / 0.3, 0), 1) * min(max((starts[i] + sec - tt - 0.1) / 0.3, 0), 1) if k != "end" else min(max((tt - starts[i]) / 0.5, 0), 1)
    a = ov[..., 3:4] * ta
    return f.astype(np.float32) * (1 - a) + ov[..., :3] * 255.0 * a
ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                       "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", OUT], stdin=subprocess.PIPE)
N = int(TOTAL * FPS)
for n in range(N):
    tt = n / FPS; acc = None; wsum = 0
    active = [i for i, s in enumerate(SCENES) if starts[i] <= tt < starts[i] + s[2]]
    if len(active) == 1:
        out = scene_frame(active[0], tt)
    else:
        a, b = active[0], active[-1]
        mix = ease((tt - starts[b]) / XF)
        out = scene_frame(a, tt) * (1 - mix) + scene_frame(b, tt) * mix
    ff.stdin.write(np.clip(out, 0, 255).astype(np.uint8).tobytes())
ff.stdin.close(); ff.wait(); print("frames", N, "seconds", round(TOTAL, 1))
