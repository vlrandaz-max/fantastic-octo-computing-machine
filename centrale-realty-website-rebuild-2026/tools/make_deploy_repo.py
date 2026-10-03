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
    - if command -v rsync >/dev/null 2>&1; then rsync -rlt --exclude='.git' --exclude='.cpanel.yml' --exclude='README.md' ./ $DEPLOYPATH; else tar --exclude='.git' --exclude='.cpanel.yml' --exclude='README.md' -cf - . | (cd $DEPLOYPATH && tar -xf -); fi
""")
open(os.path.join(OUT, "README.md"), "w").write("""# Centrale Realty, Inc. - live website files

Static site for https://centralerealty.com. Do not edit by hand: files here are generated.
Deployment: cPanel > Git Version Control > Manage > Pull or Deploy > **Update from Remote**, then **Deploy HEAD Commit**.
`.cpanel.yml` copies these files into `public_html` (it never touches cgi-bin, .htpasswds or the SSL .well-known/acme-challenge folder).
""")
def g(*a): return subprocess.run(["git", "-C", OUT, *a], capture_output=True, text=True)
if not os.path.isdir(git_dir):
    g("init", "-b", "main"); g("config", "user.name", "Claude"); g("config", "user.email", "noreply@anthropic.com")
g("add", "-A")
r = g("commit", "-m", "Update live site files")
print(r.stdout.strip().splitlines()[0] if r.stdout.strip() else r.stderr.strip() or "no changes")
print(OUT)
