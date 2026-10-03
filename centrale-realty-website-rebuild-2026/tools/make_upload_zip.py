"""Builds dist/centrale-site-upload.zip: one file to upload to GoDaddy cPanel File Manager
(public_html -> Upload -> then right-click the zip -> Extract). Includes .htaccess and .well-known."""
import os, zipfile
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, "site"); OUT = os.path.join(ROOT, "dist"); os.makedirs(OUT, exist_ok=True)
z = os.path.join(OUT, "centrale-site-upload.zip")
with zipfile.ZipFile(z, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
    for dp, dn, fn in os.walk(SITE):
        for n in sorted(fn):
            f = os.path.join(dp, n)
            zf.write(f, os.path.relpath(f, SITE))
print(z, round(os.path.getsize(z) / 1048576, 1), "MB")
