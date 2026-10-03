# Auto-publish: GitHub -> GoDaddy cPanel

How it works: `python3 tools/make_deploy_repo.py` builds `dist/deploy-repo/` (site files + `.cpanel.yml`). That is pushed to the GitHub repo `centrale-realty-site`. In cPanel, **Git Version Control** clones that repo and, when you click **Deploy HEAD Commit**, `.cpanel.yml` copies the files into `public_html` (never touching `cgi-bin`, `.htpasswds` or the SSL `.well-known/acme-challenge`). Nothing is deleted on deploy.

One-time setup (cPanel):
1. cPanel > **Git Version Control** > **Create**.
2. Turn **Clone a Repository** on. Clone URL: `https://github.com/<owner>/centrale-realty-site.git`. Repository path: `/home/jbcuvgp53x82/repositories/centrale-realty-site` (not inside public_html). Name: Centrale site. Click **Create**.

Every update:
1. Ask Claude to change the site; Claude rebuilds and pushes to GitHub.
2. cPanel > Git Version Control > **Manage** next to the repo > **Pull or Deploy** tab > **Update from Remote**, then **Deploy HEAD Commit**.
3. Hard-refresh the site.

Notes: a page deleted from the site stays on the server until you remove it in File Manager. If Deploy HEAD Commit is greyed out, cPanel found uncommitted changes in the cloned repo; do not edit files in that folder.
