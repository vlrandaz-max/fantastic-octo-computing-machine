/**
 * Prefixes a root-relative path (e.g. "/assets/foo.jpg", "/classic") with
 * the app's deploy base (Vite's `base` config — "/" in dev, a GitHub Pages
 * project subpath like "/fantastic-octo-computing-machine/" in prod).
 * Every hardcoded root-absolute href/src in this codebase must go through
 * this, since only bundler-processed imports get base-rewritten by Vite —
 * raw string literals in JSX do not.
 */
export function withBase(path: string): string {
  if (/^([a-z][a-z0-9+.-]*:|#)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}
