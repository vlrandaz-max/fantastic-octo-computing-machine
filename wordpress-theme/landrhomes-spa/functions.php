<?php
/**
 * L&R Homes SPA shell theme.
 *
 * Serves the built React app's own dist/index.html for every front-end
 * route, letting the app's client-side routing (App.tsx) decide what to
 * render based on the URL — WordPress never renders its own template for
 * these requests. wp-admin, wp-login.php, and the REST API are left
 * completely alone, so the normal WordPress plugin ecosystem (Wordfence,
 * Complianz, etc.) keeps working exactly as it would on any other theme.
 *
 * Plugins that inject markup via the standard wp_head/wp_footer hooks
 * (a Complianz cookie banner, a Yoast SEO tag, a Google Analytics
 * snippet) still fire here — their output is spliced into the built
 * page's own <head> and just before </body> — so activating a plugin in
 * wp-admin actually changes what visitors see, not just what WordPress
 * thinks is active.
 */

// Trim WordPress's own default <head> clutter (emoji scripts, RSD link,
// generator tag, shortlink) — the app supplies its own meta tags and
// none of this default WP output is needed on top of it.
add_action('init', function () {
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
});

add_action('template_redirect', function () {
    $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);

    // Leave WordPress's own admin/login/REST/cron routes to WordPress —
    // this theme only takes over front-end page requests.
    $wp_prefixes = ['/wp-admin', '/wp-login.php', '/wp-json', '/wp-cron.php', '/xmlrpc.php'];
    foreach ($wp_prefixes as $prefix) {
        if (str_starts_with($uri, $prefix)) {
            return;
        }
    }

    $shell_path = get_stylesheet_directory() . '/dist/index.html';
    if (!file_exists($shell_path)) {
        // The built app hasn't been uploaded into this theme's dist/
        // folder yet — fall through to WordPress's normal 404 instead of
        // erroring, so the gap is obvious rather than silent.
        return;
    }

    $html = file_get_contents($shell_path);

    ob_start();
    wp_head();
    $head_extra = ob_get_clean();

    ob_start();
    wp_footer();
    $footer_extra = ob_get_clean();

    $html = str_replace('</head>', $head_extra . '</head>', $html);
    $html = str_replace('</body>', $footer_extra . '</body>', $html);

    header('Content-Type: text/html; charset=UTF-8');
    echo $html;
    exit;
});
