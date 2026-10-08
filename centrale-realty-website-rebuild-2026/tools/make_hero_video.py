"""Rebuilds site/assets/video/hero.mp4 as a smooth slideshow: continuous sub-pixel Ken Burns zoom,
seamless loop. Input: 12 still frames named s00.png..s11.png (1920x1080) in the folder given as argv[1].
Run: python3 tools/make_hero_video.py <still-folder> <out.mp4>   (needs numpy, opencv-python-headless, ffmpeg)"""
import sys, subprocess, numpy as np, cv2
src, out = sys.argv[1], sys.argv[2]
W, H, FPS = 1920, 1080, 30
N, P, F = 12, 4.0, 0.7          # slides, seconds per slide, crossfade seconds
TOTAL = N * P
ZOOM = 0.07                      # total zoom over each slide's life
imgs = [cv2.imread(f"{src}/s{k:02d}.png") for k in range(N)]
ss = lambda x: x * x * (3 - 2 * x)
def render(k, t):
    start = k * P - F / 2
    for te in (t, t - TOTAL):
        p = (te - start) / (P + F)
        if 0 <= p <= 1:
            s = 1 + ZOOM * p
            pan = (1 if k % 2 == 0 else -1) * 0.012 * W * (p - 0.5)
            tin = np.clip((te - start) / F, 0, 1)
            tout = np.clip(((start + P + F) - te) / F, 0, 1)
            a = ss(tin) * ss(tout)
            M = np.float32([[s, 0, W / 2 - s * (W / 2) + pan], [0, s, H / 2 - s * (H / 2)]])
            return a, cv2.warpAffine(imgs[k], M, (W, H), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    return 0, None
ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                       "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", out],
                      stdin=subprocess.PIPE)
for i in range(int(TOTAL * FPS)):
    t = i / FPS
    acc = np.zeros((H, W, 3), np.float32)
    for k in range(N):
        a, fr = render(k, t)
        if a > 0:
            acc += a * fr.astype(np.float32)
    ff.stdin.write(np.clip(acc, 0, 255).astype(np.uint8).tobytes())
ff.stdin.close(); ff.wait()
