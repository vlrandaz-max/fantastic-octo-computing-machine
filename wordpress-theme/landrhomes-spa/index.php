<?php
/**
 * Fallback template — WordPress requires every theme to have an
 * index.php, but the template_redirect hook in functions.php intercepts
 * every real front-end request before it gets here. This only runs if
 * that hook's dist/index.html check fails (build not yet uploaded).
 */
?><!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Site build not found</title></head>
<body style="max-width:640px;margin:80px auto;padding:0 24px;font-family:sans-serif;line-height:1.6;">
  <h1>Site build not found</h1>
  <p>
    This WordPress install is configured to serve the L&amp;R Homes React app,
    but <code>wp-content/themes/landrhomes-spa/dist/index.html</code> is missing.
    Run <code>npm run build:wordpress</code> and upload the resulting
    <code>wordpress-theme/landrhomes-spa/dist/</code> folder into this theme via FTP.
  </p>
</body>
</html>
