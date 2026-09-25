// Writes a per-route index.html into dist/<route>/index.html, each with its
// own <title>/description/OG tags swapped in. The app is a client-side SPA
// with no router (nav links are plain <a> tags, so every navigation is a
// full page load) and no SSR, so every route otherwise serves the exact
// same homepage <title> — real SEO/click-through loss, and social share
// previews always show the homepage's title/image regardless of the page
// actually being shared. This script fixes both without adding a router or
// a build framework: it just clones the built index.html per route with a
// different head block. Asset references inside index.html already carry
// the correct SITE_BASE-aware paths from the Vite build, so copying the
// file verbatim and only swapping <title>/meta text keeps those correct.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const distDir = process.argv[2] || 'dist';
const indexPath = join(distDir, 'index.html');
const template = readFileSync(indexPath, 'utf-8');

const SITE_ORIGIN = 'https://landrhomes.com';
const HOME_CRUMB = { name: 'Home', path: '/' };
const FALCON_CRUMB = { name: 'Falcon Estates', path: '/falcon-estates-rochester-hills' };
const PINE_WOODS_CRUMB = { name: 'Pine Woods', path: '/pine-woods' };

// route -> overrides. `image`, when set, replaces og:image with a photo of
// that specific home instead of the site-wide fallback. `breadcrumb` is the
// page's own trail (Home is prepended automatically) — this doubles as the
// site's silo structure declared to search engines: each Falcon
// Estates/Pine Woods home nests under its own community hub, not flat
// under Home.
const ROUTES = {
  '/homes-available': {
    title: 'Homes Available | L&R Homes, Inc. — Rochester Hills, MI',
    description:
      'Browse available new-construction homes across Falcon Estates and Pine Woods in Rochester Hills, Michigan — from move-in ready to immediate occupancy.',
    breadcrumb: [{ name: 'Homes Available', path: '/homes-available' }],
  },
  '/falcon-estates-rochester-hills': {
    title: 'Falcon Estates | L&R Homes, Inc. — Rochester Hills, MI',
    description:
      'An upscale enclave of finely appointed, European-inspired homes on generous lots framed by mature woodland, minutes from downtown Rochester.',
    breadcrumb: [FALCON_CRUMB],
  },
  '/pine-woods': {
    title: 'Pine Woods | Town Properties, LLC — Rochester Hills, MI',
    description:
      'A new development of spacious, beautifully crafted homes in Rochester Hills — ranch, split-level, and colonial floor plans by Town Properties, an L&R Homes affiliate.',
    image: '/assets/pine-woods/majestic-twilight-1-wide.jpg',
    breadcrumb: [PINE_WOODS_CRUMB],
  },
  '/majestic': {
    title: 'The Majestic | Pine Woods, Rochester Hills',
    description:
      'Classic brick & stone architecture. 2,662 sq ft, 3 bedrooms, 3-car garage — now open with immediate occupancy in Pine Woods, Rochester Hills.',
    image: '/assets/pine-woods/majestic-twilight-1.jpg',
    breadcrumb: [PINE_WOODS_CRUMB, { name: 'The Majestic', path: '/majestic' }],
  },
  '/heritage': {
    title: 'The Heritage | Pine Woods, Rochester Hills',
    description:
      'Colonial architecture with a stone elevation. 3,143 sq ft, 4 bedrooms — move-in ready now at Lot 7, 3110 Raffler Dr, Rochester Hills.',
    image: '/assets/pine-woods/heritage-twilight-4.jpg',
    breadcrumb: [PINE_WOODS_CRUMB, { name: 'The Heritage', path: '/heritage' }],
  },
  '/grandeur': {
    title: 'The Grandeur | Falcon Estates, Rochester Hills',
    description:
      'A 4,170 sq ft European-inspired masterwork in Falcon Estates, bordered by a 10-acre nature preserve. Built by L&R Homes, Inc.',
    image: '/assets/home/grandeur-exterior-twilight.jpg',
    breadcrumb: [FALCON_CRUMB, { name: 'The Grandeur', path: '/grandeur' }],
  },
  '/crestwood': {
    title: 'The Crestwood | Falcon Estates, Rochester Hills',
    description:
      'European-inspired architecture and hands-on craftsmanship on one of Falcon Estates’ finest homesites, built by L&R Homes, Inc.',
    image: '/assets/home/crestwood-twilight-2026.jpg',
    breadcrumb: [FALCON_CRUMB, { name: 'The Crestwood', path: '/crestwood' }],
  },
  '/cambridge': {
    title: 'The Cambridge | Falcon Estates, Rochester Hills',
    description:
      'A soaring, light-filled foyer and a two-story great room anchor this sold Falcon Estates home built by L&R Homes, Inc.',
    image: '/assets/home/cambridge-twilight.jpg',
    breadcrumb: [FALCON_CRUMB, { name: 'The Cambridge', path: '/cambridge' }],
  },
  '/stratford': {
    title: 'The Stratford | Falcon Estates, Rochester Hills',
    description:
      'Built for a full household — open kitchen, wet bar, media room, and multiple suites in this sold Falcon Estates home by L&R Homes, Inc.',
    image: '/assets/home/stratford-aerial-twilight.jpg',
    breadcrumb: [FALCON_CRUMB, { name: 'The Stratford', path: '/stratford' }],
  },
  '/madison': {
    title: 'The Madison | Falcon Estates, Rochester Hills',
    description:
      'A commanding stone-and-brick elevation with a soaring arched entry — this sold Falcon Estates home was built by L&R Homes, Inc.',
    image: '/assets/home/madison-twilight-aerial.jpg',
    breadcrumb: [FALCON_CRUMB, { name: 'The Madison', path: '/madison' }],
  },
  '/gallery': {
    title: 'Photo Gallery | L&R Homes, Inc.',
    description:
      'Browse photography from L&R Homes’ completed and available homes across Falcon Estates and Pine Woods in Rochester Hills, Michigan.',
    breadcrumb: [{ name: 'Photo Gallery', path: '/gallery' }],
  },
  '/contact-us': {
    title: 'Contact Us | L&R Homes, Inc. — Rochester Hills, MI',
    description:
      'Get in touch with L&R Homes, Inc. to schedule a tour or ask about available homes in Rochester Hills, Michigan. Call (248) 656-8830.',
    breadcrumb: [{ name: 'Contact Us', path: '/contact-us' }],
  },
  // /classic2 renders the exact same homepage component as / (nothing on
  // the site links to it anymore — every internal "Home" link now points
  // at / — but the URL itself still works for old bookmarks/links).
  // Canonicalizing it to / avoids Google indexing two identical pages.
  '/classic2': {
    title: 'L&R Homes, Inc. — Custom Builders Since 1973 | Rochester Hills, Michigan',
    description:
      'L&R Homes builds custom, European-inspired homes in Rochester Hills, Michigan. Fifty years of hands-on craftsmanship, from groundbreaking to move-in.',
    canonical: '/',
  },
  // /classic and /simple are earlier alternate homepage designs kept
  // reachable at their own URLs (e.g. for internal comparison) but not
  // meant to be indexed as separate pages — noindex rather than just
  // omitting them from the sitemap, since sitemap omission alone doesn't
  // stop Google from indexing a URL it finds some other way.
  '/classic': {
    title: 'L&R Homes, Inc. — Custom Builders Since 1973 | Rochester Hills, Michigan',
    description:
      'L&R Homes builds custom, European-inspired homes in Rochester Hills, Michigan. Fifty years of hands-on craftsmanship, from groundbreaking to move-in.',
    noindex: true,
  },
  '/simple': {
    title: 'L&R Homes, Inc. — Custom Builders Since 1973 | Rochester Hills, Michigan',
    description:
      'L&R Homes builds custom, European-inspired homes in Rochester Hills, Michigan. Fifty years of hands-on craftsmanship, from groundbreaking to move-in.',
    noindex: true,
  },
};

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function breadcrumbJsonLd(trail) {
  const crumbs = [HOME_CRUMB, ...trail];
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: SITE_ORIGIN + c.path,
    })),
  });
}

function buildPage(overrides, route) {
  const title = escapeHtml(overrides.title);
  const description = escapeHtml(overrides.description);
  let html = template.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`);
  if (overrides.image) {
    html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${overrides.image}$2`);
  }
  const extras = [];
  if (overrides.breadcrumb) {
    extras.push(`<script type="application/ld+json">${breadcrumbJsonLd(overrides.breadcrumb)}</script>`);
  }
  if (route) {
    const canonicalPath = overrides.canonical || route;
    extras.push(`<link rel="canonical" href="${SITE_ORIGIN}${canonicalPath}" />`);
  }
  if (overrides.noindex) {
    extras.push(`<meta name="robots" content="noindex, follow" />`);
  }
  if (extras.length) {
    html = html.replace(/<\/head>/, `${extras.join('\n  ')}\n  </head>`);
  }
  return html;
}

let count = 0;
for (const [route, overrides] of Object.entries(ROUTES)) {
  const dir = join(distDir, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), buildPage(overrides, route));
  count++;
}

// The homepage (index.html itself) gets its own self-canonical tag too —
// every other route above gets one automatically via buildPage, but /
// is written directly by Vite, not by this script's per-route loop.
writeFileSync(indexPath, buildPage(
  {
    title: 'L&R Homes, Inc. — Custom Builders Since 1973 | Rochester Hills, Michigan',
    description:
      'L&R Homes builds custom, European-inspired homes in Rochester Hills, Michigan. Fifty years of hands-on craftsmanship, from groundbreaking to move-in.',
  },
  '/',
));

// Apache's ErrorDocument 404 (see public/.htaccess) points at this file for
// any path that isn't a known route — same app bundle (App.tsx renders
// NotFoundPage for any unmatched path once it loads), but with its own
// title/description instead of the homepage's, for the crawlers and link
// unfurlers that only read the static HTML. Named to avoid colliding with
// public/404.html, which is GitHub Pages' unrelated SPA-redirect trick and
// also gets copied into dist/ verbatim. noindex since a 404 should never
// be indexed regardless of which URL happened to trigger it.
writeFileSync(
  join(distDir, '_404.html'),
  buildPage({
    title: 'Page Not Found | L&R Homes, Inc.',
    description: 'The page you were looking for doesn’t exist, may have moved, or the link may be out of date.',
    noindex: true,
  }),
);

console.log(`prerender-meta: wrote ${count} route-specific index.html files plus _404.html under ${distDir}/`);
