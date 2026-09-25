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

// route -> overrides. `image`, when set, replaces og:image with a photo of
// that specific home instead of the site-wide fallback.
const ROUTES = {
  '/homes-available': {
    title: 'Homes Available | L&R Homes, Inc. — Rochester Hills, MI',
    description:
      'Browse available new-construction homes across Falcon Estates and Pine Woods in Rochester Hills, Michigan — from move-in ready to immediate occupancy.',
  },
  '/falcon-estates-rochester-hills': {
    title: 'Falcon Estates | L&R Homes, Inc. — Rochester Hills, MI',
    description:
      'An upscale enclave of finely appointed, European-inspired homes on generous lots framed by mature woodland, minutes from downtown Rochester.',
  },
  '/pine-woods': {
    title: 'Pine Woods | Town Properties, LLC — Rochester Hills, MI',
    description:
      'A new development of spacious, beautifully crafted homes in Rochester Hills — ranch, split-level, and colonial floor plans by Town Properties, an L&R Homes affiliate.',
    image: '/assets/pine-woods/majestic-twilight-1-wide.jpg',
  },
  '/majestic': {
    title: 'The Majestic | Pine Woods, Rochester Hills',
    description:
      'Classic brick & stone architecture. 2,662 sq ft, 3 bedrooms, 3-car garage — now open with immediate occupancy in Pine Woods, Rochester Hills.',
    image: '/assets/pine-woods/majestic-twilight-1.jpg',
  },
  '/heritage': {
    title: 'The Heritage | Pine Woods, Rochester Hills',
    description:
      'Colonial architecture with a stone elevation. 3,143 sq ft, 4 bedrooms — move-in ready now at Lot 7, 3110 Raffler Dr, Rochester Hills.',
    image: '/assets/pine-woods/heritage-twilight-4.jpg',
  },
  '/grandeur': {
    title: 'The Grandeur | Falcon Estates, Rochester Hills',
    description:
      'A 4,170 sq ft European-inspired masterwork in Falcon Estates, bordered by a 10-acre nature preserve. Built by L&R Homes, Inc.',
    image: '/assets/home/grandeur-exterior-twilight.jpg',
  },
  '/crestwood': {
    title: 'The Crestwood | Falcon Estates, Rochester Hills',
    description:
      'European-inspired architecture and hands-on craftsmanship on one of Falcon Estates’ finest homesites, built by L&R Homes, Inc.',
    image: '/assets/home/crestwood-twilight-2026.jpg',
  },
  '/cambridge': {
    title: 'The Cambridge | Falcon Estates, Rochester Hills',
    description:
      'A soaring, light-filled foyer and a two-story great room anchor this sold Falcon Estates home built by L&R Homes, Inc.',
    image: '/assets/home/cambridge-twilight.jpg',
  },
  '/stratford': {
    title: 'The Stratford | Falcon Estates, Rochester Hills',
    description:
      'Built for a full household — open kitchen, wet bar, media room, and multiple suites in this sold Falcon Estates home by L&R Homes, Inc.',
    image: '/assets/home/stratford-aerial-twilight.jpg',
  },
  '/madison': {
    title: 'The Madison | Falcon Estates, Rochester Hills',
    description:
      'A commanding stone-and-brick elevation with a soaring arched entry — this sold Falcon Estates home was built by L&R Homes, Inc.',
    image: '/assets/home/madison-twilight-aerial.jpg',
  },
  '/gallery': {
    title: 'Photo Gallery | L&R Homes, Inc.',
    description:
      'Browse photography from L&R Homes’ completed and available homes across Falcon Estates and Pine Woods in Rochester Hills, Michigan.',
  },
  '/contact-us': {
    title: 'Contact Us | L&R Homes, Inc. — Rochester Hills, MI',
    description:
      'Get in touch with L&R Homes, Inc. to schedule a tour or ask about available homes in Rochester Hills, Michigan. Call (248) 656-8830.',
  },
};

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildPage(overrides) {
  const title = escapeHtml(overrides.title);
  const description = escapeHtml(overrides.description);
  let html = template.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`);
  if (overrides.image) {
    html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${overrides.image}$2`);
  }
  return html;
}

let count = 0;
for (const [route, overrides] of Object.entries(ROUTES)) {
  const dir = join(distDir, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), buildPage(overrides));
  count++;
}

// Apache's ErrorDocument 404 (see public/.htaccess) points at this file for
// any path that isn't a known route — same app bundle (App.tsx renders
// NotFoundPage for any unmatched path once it loads), but with its own
// title/description instead of the homepage's, for the crawlers and link
// unfurlers that only read the static HTML. Named to avoid colliding with
// public/404.html, which is GitHub Pages' unrelated SPA-redirect trick and
// also gets copied into dist/ verbatim.
writeFileSync(
  join(distDir, '_404.html'),
  buildPage({
    title: 'Page Not Found | L&R Homes, Inc.',
    description: 'The page you were looking for doesn’t exist, may have moved, or the link may be out of date.',
  }),
);

console.log(`prerender-meta: wrote ${count} route-specific index.html files plus _404.html under ${distDir}/`);
