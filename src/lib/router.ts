import { useSyncExternalStore } from 'react';

/**
 * Minimal client-side router: internal <a> clicks are intercepted and
 * turned into history.pushState navigations instead of full page loads.
 * Added because rapid navigation between pages — especially on mobile —
 * was occasionally hitting the hosting proxy's default error page: every
 * click re-requested the whole document from Network Solutions' server,
 * and firing several of those in quick succession sometimes got dropped
 * or reset. Client-side navigation only needs the one JS bundle every
 * route already shares, so it doesn't re-hit the server at all.
 *
 * Hand-rolled rather than a routing library: the app has a fixed, small
 * set of routes already matched by simple prefix checks in App.tsx, so a
 * full router would add a dependency for little benefit.
 */

function toAppPath(pathname: string): string {
  const base = import.meta.env.BASE_URL;
  return pathname.startsWith(base) ? `/${pathname.slice(base.length)}` : pathname;
}

function getSnapshot(): string {
  return window.location.pathname;
}

const listeners = new Set<() => void>();

function emitChange(): void {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  window.addEventListener('popstate', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('popstate', callback);
  };
}

/** Current route, normalized against the deploy base — re-renders the
 *  subscribing component on both client-side navigate() calls and
 *  browser back/forward navigation. */
export function useAppPath(): string {
  const pathname = useSyncExternalStore(subscribe, getSnapshot);
  return toAppPath(pathname);
}

/** Push a new URL and notify subscribers, without a full page reload. */
export function navigate(href: string): void {
  const current = window.location.pathname + window.location.search + window.location.hash;
  if (href === current) return;
  window.history.pushState(null, '', href);
  window.scrollTo(0, 0);
  emitChange();
}

let installed = false;

/** Global click interceptor for same-origin, unmodified left-clicks on
 *  <a> tags — everything else (external links, mailto:/tel:, ctrl/cmd
 *  -click, middle-click, target="_blank", downloads, in-page "#"
 *  anchors) falls through to normal browser handling untouched.
 *  Idempotent and safe to call more than once (e.g. StrictMode). */
export function installLinkInterceptor(): void {
  if (installed || typeof document === 'undefined') return;
  installed = true;

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = (event.target as Element).closest?.('a[href]') as HTMLAnchorElement | null;
    if (!anchor) return;
    if (anchor.target && anchor.target !== '_self') return;
    if (anchor.hasAttribute('download')) return;

    const rawHref = anchor.getAttribute('href') || '';
    if (!rawHref || rawHref.startsWith('#')) return;

    let url: URL;
    try {
      url = new URL(anchor.href, window.location.href);
    } catch {
      return;
    }
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    navigate(url.pathname + url.search + url.hash);
  });
}
