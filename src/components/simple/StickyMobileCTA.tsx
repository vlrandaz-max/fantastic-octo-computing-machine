import { COMPANY } from '../../data/site';
import { withBase } from '../../lib/url';

/**
 * Persistent bottom action bar, mobile only (hidden ≥900px via CSS in
 * global.css — same breakpoint the nav components switch to their
 * hamburger menu at). Rendered once per page from SimpleNav/ClassicNav so
 * every page gets it without a per-page change.
 */
export function StickyMobileCTA() {
  return (
    <div className="sticky-mobile-cta">
      <a href={COMPANY.phoneHref} className="sticky-mobile-cta-link sticky-mobile-cta-call">
        Call {COMPANY.phone}
      </a>
      <a href={withBase('/contact-us?intent=tour')} className="sticky-mobile-cta-link sticky-mobile-cta-tour">
        Schedule a Tour
      </a>
    </div>
  );
}
