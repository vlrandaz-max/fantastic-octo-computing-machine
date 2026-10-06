/**
 * Route -> document.title, for keeping the browser tab title correct
 * during client-side navigation (see src/lib/router.ts). Mirrors the
 * title strings in scripts/prerender-meta.mjs's ROUTES table — that
 * script sets these in the static per-route HTML for first loads and
 * crawlers; this covers subsequent in-app navigations, which never
 * reload that HTML. Keep both in sync when adding or renaming a route.
 *
 * Checked in the same prefix order App.tsx uses to pick a page
 * component, so the title always matches whichever route rendered.
 */
const ROUTE_TITLES: Array<{ prefix: string; title: string }> = [
  { prefix: '/homes-available', title: 'Homes Available | L&R Homes, Inc. — Rochester Hills, MI' },
  { prefix: '/grandeur', title: 'The Grandeur | Falcon Estates, Rochester Hills' },
  { prefix: '/crestwood', title: 'The Crestwood | Falcon Estates, Rochester Hills' },
  { prefix: '/cambridge', title: 'The Cambridge | Falcon Estates, Rochester Hills' },
  { prefix: '/stratford', title: 'The Stratford | Falcon Estates, Rochester Hills' },
  { prefix: '/madison', title: 'The Madison | Falcon Estates, Rochester Hills' },
  { prefix: '/falcon-estates', title: 'Falcon Estates | L&R Homes, Inc. — Rochester Hills, MI' },
  { prefix: '/majestic', title: 'The Majestic | Pine Woods, Rochester Hills' },
  { prefix: '/heritage', title: 'The Heritage | Pine Woods, Rochester Hills' },
  { prefix: '/pine-woods', title: 'Pine Woods | Town Properties, LLC — Rochester Hills, MI' },
  { prefix: '/contact-us', title: 'Contact Us | L&R Homes, Inc. — Rochester Hills, MI' },
  { prefix: '/gallery', title: 'Photo Gallery | L&R Homes, Inc.' },
  { prefix: '/classic2', title: 'L&R Homes, Inc. — Custom Builders Since 1973 | Rochester Hills, Michigan' },
  { prefix: '/classic', title: 'L&R Homes, Inc. — Custom Builders Since 1973 | Rochester Hills, Michigan' },
  { prefix: '/simple', title: 'L&R Homes, Inc. — Custom Builders Since 1973 | Rochester Hills, Michigan' },
];

const HOME_TITLE = 'L&R Homes, Inc. — Custom Builders Since 1973 | Rochester Hills, Michigan';
const NOT_FOUND_TITLE = 'Page Not Found | L&R Homes, Inc.';

export function titleForPath(path: string): string {
  if (path === '/' || path === '') return HOME_TITLE;
  const match = ROUTE_TITLES.find((r) => path.startsWith(r.prefix));
  return match ? match.title : NOT_FOUND_TITLE;
}
