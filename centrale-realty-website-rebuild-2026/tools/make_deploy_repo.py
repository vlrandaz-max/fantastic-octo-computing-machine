"""Builds dist/deploy-repo/: the site files + .cpanel.yml + README, as its own git repo ready to push to
github.com/<owner>/centrale-realty-site. cPanel > Git Version Control clones that repo and copies it into public_html.
Run: python3 tools/make_deploy_repo.py   (re-run after every site change, then push)"""
import os, shutil, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, "site"); OUT = os.path.join(ROOT, "dist", "deploy-repo")
CPANEL_HOME = "/home/jbcuvgp53x82"
os.makedirs(os.path.dirname(OUT), exist_ok=True)
git_dir = os.path.join(OUT, ".git")
keep = None
if os.path.isdir(git_dir):  # keep history between runs
    keep = os.path.join(os.path.dirname(OUT), ".deploy-git"); shutil.rmtree(keep, ignore_errors=True); shutil.move(git_dir, keep)
shutil.rmtree(OUT, ignore_errors=True)
shutil.copytree(SITE, OUT)
if keep: shutil.move(keep, git_dir)
open(os.path.join(OUT, ".cpanel.yml"), "w").write(f"""---
deployment:
  tasks:
    - export DEPLOYPATH={CPANEL_HOME}/public_html/
    - /bin/mkdir -p $DEPLOYPATH
    - if command -v rsync >/dev/null 2>&1; then rsync -rlt --exclude='.git' --exclude='.github' --exclude='scripts' --exclude='.cpanel.yml' --exclude='README.md' ./ $DEPLOYPATH; else tar --exclude='.git' --exclude='.github' --exclude='scripts' --exclude='.cpanel.yml' --exclude='README.md' -cf - . | (cd $DEPLOYPATH && tar -xf -); fi
""")
open(os.path.join(OUT, "README.md"), "w").write("""# Centrale Realty, Inc. - live website files

Static site for https://centralerealty.com. Do not edit by hand: files here are generated.
Deployment: cPanel > Git Version Control > Manage > Pull or Deploy > **Update from Remote**, then **Deploy HEAD Commit**.
`.cpanel.yml` copies these files into `public_html` (it never touches cgi-bin, .htpasswds or the SSL .well-known/acme-challenge folder).
""")

os.makedirs(os.path.join(OUT, ".github", "workflows"), exist_ok=True)
os.makedirs(os.path.join(OUT, "scripts"), exist_ok=True)
open(os.path.join(OUT, ".github", "workflows", "deploy.yml"), "w").write("""name: Deploy to GoDaddy (FTPS)

# Runs automatically whenever the site files change on main, and can also be run by hand
# (Actions tab > Deploy to GoDaddy (FTPS) > Run workflow). It uploads to the web root over
# encrypted FTPS using three secrets stored in this repository's settings. It never deletes
# anything on the server and only uploads files whose size changed (tick "force" to upload all).
on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      force:
        description: 'Upload every file even if the size matches (true/false)'
        required: false
        default: 'false'

concurrency:
  group: ftps-deploy
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      HAS_FTP: ${{ secrets.FTP_HOST != '' && secrets.FTP_USERNAME != '' && secrets.FTP_PASSWORD != '' }}
    steps:
      - name: Skip until FTP secrets are added
        if: ${{ env.HAS_FTP != 'true' }}
        run: echo "FTP secrets are not set yet, so nothing was deployed. Add FTP_HOST, FTP_USERNAME and FTP_PASSWORD under Settings > Secrets and variables > Actions."
      - uses: actions/checkout@v4
        if: ${{ env.HAS_FTP == 'true' }}
      - name: Upload to GoDaddy over FTPS
        if: ${{ env.HAS_FTP == 'true' }}
        env:
          FTP_HOST: ${{ secrets.FTP_HOST }}
          FTP_USERNAME: ${{ secrets.FTP_USERNAME }}
          FTP_PASSWORD: ${{ secrets.FTP_PASSWORD }}
          FTP_REMOTE_DIR: ${{ vars.FTP_REMOTE_DIR }}
          FTP_INSECURE_TLS: ${{ vars.FTP_INSECURE_TLS }}
          FTP_TLS_SERVERNAME: ${{ vars.FTP_TLS_SERVERNAME || 'prod.phx3.secureserver.net' }}
          FORCE: ${{ github.event.inputs.force }}
        run: python3 scripts/ftps_deploy.py
      - name: Diagnose FTPS certificate (only when the upload failed)
        if: ${{ failure() && env.HAS_FTP == 'true' }}
        env:
          FTP_HOST: ${{ secrets.FTP_HOST }}
        run: |
          echo "Certificate the server presents (public information):"
          echo | openssl s_client -starttls ftp -connect "$FTP_HOST:21" 2>/dev/null | openssl x509 -noout -subject -issuer -dates -ext subjectAltName || true
""")
open(os.path.join(OUT, "scripts", "ftps_deploy.py"), "w").write('''"""Upload the site to the web root over explicit FTPS (ftplib only, no extra packages).
Env: FTP_HOST, FTP_USERNAME, FTP_PASSWORD, optional FTP_REMOTE_DIR (default "/"), FTP_TLS_SERVERNAME (name on the server certificate), FORCE=true to re-upload everything.
Never deletes remote files. Skips .git, .github, scripts, .cpanel.yml and README.md."""
import os, ssl, sys, ftplib
HOST = os.environ.get("FTP_HOST", "").strip()
USER = os.environ.get("FTP_USERNAME", "").strip()
PASSWORD = os.environ.get("FTP_PASSWORD", "")
REMOTE = (os.environ.get("FTP_REMOTE_DIR") or "/").strip() or "/"
FORCE = (os.environ.get("FORCE") or "").lower() == "true"
PORT = int(os.environ.get("FTP_PORT") or 21)
if not (HOST and USER and PASSWORD):
    sys.exit("Missing FTP_HOST / FTP_USERNAME / FTP_PASSWORD secrets (repository Settings > Secrets and variables > Actions).")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {".git", ".github", "scripts"}
SKIP_FILES = {".cpanel.yml", "README.md"}
if not os.path.isfile(os.path.join(ROOT, "index.html")) or os.path.getsize(os.path.join(ROOT, "index.html")) < 1000:
    sys.exit("Safety stop: index.html is missing or too small; nothing was uploaded.")
files = []
for dp, dn, fn in os.walk(ROOT):
    dn[:] = [d for d in dn if d not in SKIP_DIRS]
    for n in fn:
        if n in SKIP_FILES and dp == ROOT:
            continue
        full = os.path.join(dp, n)
        files.append((full, os.path.relpath(full, ROOT).replace(os.sep, "/")))
ctx = ssl.create_default_context()
if os.environ.get("FTP_INSECURE_TLS", "").lower() == "true":
    ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE
ftp = ftplib.FTP_TLS(context=ctx, timeout=60)
ftp.connect(HOST, PORT)
TLS_NAME = (os.environ.get("FTP_TLS_SERVERNAME") or "").strip()
if TLS_NAME:
    ftp.host = TLS_NAME  # verify the certificate against its real name (chain is still fully verified)
ftp.login(USER, PASSWORD)
ftp.prot_p()
ftp.cwd(REMOTE)
made = set()
def ensure_dir(rel):
    if not rel or rel in made:
        return
    parent = rel.rpartition("/")[0]
    ensure_dir(parent)
    try:
        ftp.mkd(rel)
    except ftplib.error_perm:
        pass  # already exists
    made.add(rel)
up = skipped = 0
for full, rel in sorted(files):
    ensure_dir(rel.rpartition("/")[0])
    size = os.path.getsize(full)
    if not FORCE:
        try:
            ftp.voidcmd("TYPE I")
            if ftp.size(rel) == size:
                skipped += 1
                continue
        except ftplib.all_errors:
            pass
    with open(full, "rb") as fh:
        ftp.storbinary("STOR " + rel, fh)
    up += 1
    print("uploaded", rel)
ftp.quit()
print(f"Done: {up} uploaded, {skipped} unchanged.")
''')

def g(*a): return subprocess.run(["git", "-C", OUT, *a], capture_output=True, text=True)
if not os.path.isdir(git_dir):
    g("init", "-b", "main"); g("config", "user.name", "Claude"); g("config", "user.email", "noreply@anthropic.com")
g("add", "-A")
r = g("commit", "-m", "Update live site files")
print(r.stdout.strip().splitlines()[0] if r.stdout.strip() else r.stderr.strip() or "no changes")
print(OUT)
