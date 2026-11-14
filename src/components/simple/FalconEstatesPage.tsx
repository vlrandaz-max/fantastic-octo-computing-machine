import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { PhotoHero } from './PhotoHero';
import { useRevealScope } from '../Reveal';
import { withBase } from '../../lib/url';
import { FALCON_ESTATES, FALCON_ESTATES_HOMES, STATUS_LABEL } from '../../data/site';

/**
 * Falcon Estates — the community landing page. Like GrandeurPage, this is a
 * verbatim port of the real landrhomes.com/falcon-estates-rochester-hills/
 * page's own bespoke markup and CSS (pasted in full by the user), rendered
 * via dangerouslySetInnerHTML rather than hand-converted to JSX/className
 * markup to avoid transcription errors — the content is first-party (the
 * site owner's own copy), not third-party input.
 *
 * The source page's own <style> block defines a `:root { --color-brand-gold;
 * --bg1; --fg1; ... }` block using the exact same custom-property names the
 * rest of this app's tokens.css already defines globally. Ported as literal
 * `:root`, it would silently override those tokens site-wide for as long as
 * this page is mounted. Fixed by rescoping that block to `.falcon-page`
 * (custom properties are inherited, so this scopes them to the subtree)
 * and prefixing every selector in the stylesheet with `.falcon-page`.
 *
 * Photos: the real site's own home-card images map by street address, not
 * by home name — Grandeur → 3836 Coachwood Lane (confirmed), Cambridge →
 * 835 Crestwood, Stratford → 829 Crestwood, Crestwood and Madison each have
 * their own confirmed twilight photos. That mapping is applied here and was
 * also used to correct FALCON_ESTATES_HOMES in data/site.ts, which
 * previously had Crestwood/Stratford's addressed photos swapped. Grandeur
 * uses the twilight exterior (matching its use as a listing thumbnail
 * everywhere else in the app).
 *
 * The "View the Site Plan" button used to link to
 * landrhomes.com/wp-content/uploads/Falcon-Estates-2024--scaled.jpg,
 * which no longer exists now that WordPress has been retired. It now
 * points at /assets/home/falcon-estates-site-plan.jpg, which doesn't
 * exist yet — it'll work as soon as that file is uploaded.
 *
 * Header: the shared PhotoHero used on Homes Available, Pine Woods and
 * Contact Us, rotating the best exterior/interior shots of the Crestwood,
 * Cambridge and Stratford — three of the homes profiled below. The
 * community stats strip that used to overlay its bottom edge now sits
 * directly under it as a solid band.
 */

const HERO_SLIDES = [
  { src: withBase('/assets/home/crestwood-twilight-2026.jpg'), position: 'center 55%' },
  { src: withBase('/assets/home/cambridge-family-room-2.jpg'), position: 'center' },
  { src: withBase('/assets/home/stratford-aerial-twilight.jpg'), position: 'center 60%' },
  { src: withBase('/assets/home/crestwood-owners-suite.jpg'), position: 'center' },
  { src: withBase('/assets/home/cambridge-twilight.jpg'), position: 'center 60%' },
  { src: withBase('/assets/home/stratford-family-kitchen.jpg'), position: 'center' },
];

const FALCON_STYLE = `
  .falcon-page {
    --color-brand-gold:        #C4A05A;
    --color-brand-gold-light:  #D4B87A;
    --color-brand-gold-dark:   #83672F;
    --color-bg-alabaster:      #F2F0E6;
    --color-bg-warm:           #EAE4D6;
    --color-text-primary:      #1E1A16;
    --color-text-secondary:    #5A5248;
    --color-text-tertiary:     #8A8078;
    --color-border:            #D8D0BC;

    --fe-fg1: var(--color-text-primary);
    --fe-fg2: var(--color-text-secondary);
    --fe-fg3: var(--color-text-tertiary);
    --fe-bg1: var(--color-bg-alabaster);
    --fe-bg2: var(--color-bg-warm);
    --fe-border: var(--color-border);
    --fe-accent: var(--color-brand-gold);
    --fe-accent-light: var(--color-brand-gold-light);
    --fe-accent-dark: var(--color-brand-gold-dark);

    --fe-font-display: 'Cormorant Garamond', 'Garamond', 'Georgia', serif;
    --fe-font-body: 'Lato', 'Helvetica Neue', 'Arial', sans-serif;

    --fe-radius-xs: 2px; --fe-radius-sm: 4px; --fe-radius-md: 6px;
    --fe-shadow-1: 0 2px 8px rgba(28, 20, 10, 0.07);
    --fe-shadow-2: 0 8px 32px rgba(28, 20, 10, 0.12);
    --fe-transition-fast: 150ms ease-out;

    font-family: var(--fe-font-body);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.65;
    color: var(--fe-fg1);
    background: var(--fe-bg1);
  }

  .falcon-page *, .falcon-page *::before, .falcon-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .falcon-page img { max-width: 100%; display: block; }
  .falcon-page a { color: var(--fe-accent); text-decoration: none; transition: color var(--fe-transition-fast); }

  .falcon-page .eyebrow { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--fe-accent-dark); }
  .falcon-page .rule { display: block; width: 64px; height: 1px; background: var(--fe-accent); margin: 12px 0 18px; }
  .falcon-page .rule-center { margin: 12px auto 18px; }
  .falcon-page .wrap { max-width: 1280px; margin: 0 auto; padding: 0 48px; }

  .falcon-page .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    font-family: var(--fe-font-body); font-weight: 700; font-size: 12px; letter-spacing: 0.12em;
    text-transform: uppercase; text-decoration: none; border-radius: var(--fe-radius-xs);
    border: 1px solid transparent; cursor: pointer; transition: all var(--fe-transition-fast);
    padding: 0 26px; height: 48px; white-space: nowrap; }
  .falcon-page .btn-gold { background: var(--fe-accent); color: #1C1A18; }
  .falcon-page .btn-gold:hover { background: var(--fe-accent-dark); color: #1C1A18; text-decoration: none; }
  .falcon-page .btn-onDark { background: transparent; border-color: rgba(242,240,230,0.35); color: #F2F0E6; }
  .falcon-page .btn-onDark:hover { border-color: #F2F0E6; text-decoration: none; }

  /* COMMUNITY STAT BAR (directly under the header) */
  .falcon-page .stat-bar { position: relative; z-index: 2; display: flex; background: #131210; border-top: 1px solid rgba(255,255,255,0.08); }
  .falcon-page .stat-cell { flex: 1; background: rgba(20,28,48,0.4); backdrop-filter: blur(12px); padding: 20px 48px;
    border-right: 1px solid rgba(255,255,255,0.08); }
  .falcon-page .stat-cell:last-child { border-right: none; }
  .falcon-page .stat-value { font-family: var(--fe-font-display); font-size: 2.2rem; font-weight: 300; color: #F2F0E6; line-height: 1; }
  .falcon-page .stat-unit { font-size: 1rem; color: var(--fe-accent-light); margin-left: 4px; }
  .falcon-page .stat-label { font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(242,240,230,0.45); margin-top: 8px; }

  /* OVERVIEW BAND */
  .falcon-page .overview-band { background: var(--fe-bg2); padding: 96px 48px; }
  .falcon-page .overview-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1.15fr 1fr;
    gap: 72px; align-items: center; }
  .falcon-page .overview-h2 { font-family: var(--fe-font-display); font-size: clamp(2rem, 3vw, 2.75rem); font-weight: 300;
    color: #2E2820; line-height: 1.15; margin-bottom: 20px; }
  .falcon-page .overview-p { font-size: 1rem; line-height: 1.8; color: var(--fe-fg2); margin-bottom: 16px; }
  .falcon-page .overview-photo { position: relative; height: 420px; border-radius: var(--fe-radius-md); overflow: hidden; box-shadow: var(--fe-shadow-2); }
  .falcon-page .overview-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform 700ms cubic-bezier(0.25,0.1,0.25,1); }
  .falcon-page .overview-photo:hover img { transform: scale(1.08); }
  .falcon-page .overview-photo-label { position: absolute; bottom: 24px; left: 24px; }
  .falcon-page .overview-photo-label .yr { font-family: var(--fe-font-display); font-size: 3rem; font-weight: 300; color: rgba(196,160,90,0.7); line-height: 1; }
  .falcon-page .overview-photo-label .since { font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(196,160,90,0.85); margin-top: 4px; }

  /* AMENITIES BAND */
  .falcon-page .amenities-band { background: var(--fe-bg1); padding: 96px 48px; }
  .falcon-page .amenities-inner { max-width: 1280px; margin: 0 auto; }
  .falcon-page .amenities-h2 { font-family: var(--fe-font-display); font-size: clamp(2rem,3vw,2.5rem); font-weight: 300; color: var(--fe-fg1); margin: 12px 0 40px; }
  .falcon-page .amenities-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  .falcon-page .amenity-card { background: #FFFFFF; border: 1px solid var(--fe-border); border-radius: var(--fe-radius-sm);
    padding: 28px 24px; box-shadow: var(--fe-shadow-1); transition: transform 220ms ease, box-shadow 220ms ease; }
  .falcon-page .amenity-card:hover { transform: translateY(-3px); box-shadow: var(--fe-shadow-2); }
  .falcon-page .amenity-icon { width: 44px; height: 44px; border-radius: 4px; background: linear-gradient(135deg, rgba(196,160,90,0.16), rgba(196,160,90,0.06));
    border: 1px solid rgba(196,160,90,0.25); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
  .falcon-page .amenity-icon svg { width: 22px; height: 22px; stroke: var(--fe-accent-dark); fill: none; stroke-width: 1.6; }
  .falcon-page .amenity-title { font-family: var(--fe-font-display); font-size: 1.35rem; font-weight: 400; color: var(--fe-fg1); margin-bottom: 8px; }
  .falcon-page .amenity-body { font-size: 0.8125rem; line-height: 1.6; color: var(--fe-fg3); }

  /* AVAILABLE HOMES */
  .falcon-page .homes-band { background: linear-gradient(180deg, #1C1A18 0%, #131210 100%); padding: 96px 48px; }
  .falcon-page .homes-inner { max-width: 1280px; margin: 0 auto; }
  .falcon-page .homes-h2 { font-family: var(--fe-font-display); font-size: clamp(2rem,3vw,2.5rem); font-weight: 300; color: #F2F0E6 !important; margin: 12px 0 40px; }
  /* Home tiles reuse the site-wide .explore-tile/.home-tile styles; these two
     rules undo this page's own blanket resets (all margins zeroed, all links
     gold) inside the tiles. */
  .falcon-page a.explore-tile { color: #F8F4EE; }
  .falcon-page .explore-tile-rule { margin: 14px 0 12px; }

  /* LOCATION CTA */
  .falcon-page .location-band { background: linear-gradient(135deg, #1C1A18 0%, #2A2018 60%, #1E1A10 100%); padding: 72px 48px; }
  .falcon-page .location-inner { max-width: 1280px; margin: 0 auto; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 40px; align-items: center; }
  .falcon-page .location-h2 { font-family: var(--fe-font-display); font-size: clamp(1.8rem,2.5vw,2.5rem); font-weight: 300; color: #F2F0E6 !important; margin: 12px 0 14px; }
  .falcon-page .location-address { display: flex; align-items: center; gap: 8px; font-size: 14px; color: rgba(242,240,230,0.55); }
  .falcon-page .location-actions { display: flex; gap: 12px; flex-wrap: wrap; }

  /* FOOTER (legal disclaimer only — the ported page's own footer widget) */
  .falcon-page .fe-site-footer { background: #131210; padding: 40px 48px; }
  .falcon-page .fe-disclaimer { font-size: 8px; color: rgba(242,240,230,0.22); line-height: 1.8; max-width: 900px; margin: 24px auto 0; }

  /* RESPONSIVE */
  @media (max-width: 1023px) {
    .falcon-page .overview-inner { grid-template-columns: 1fr; }
    .falcon-page .amenities-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 767px) {
    .falcon-page .wrap, .falcon-page .overview-band, .falcon-page .amenities-band,
    .falcon-page .homes-band, .falcon-page .location-band, .falcon-page .fe-site-footer { padding-left: 20px; padding-right: 20px; }
    .falcon-page .stat-bar { flex-wrap: wrap; }
    .falcon-page .stat-cell { flex: 1 1 50%; padding: 16px 20px; }
    .falcon-page .amenities-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
    .falcon-page .amenity-card { padding: 20px 16px; }
    .falcon-page .overview-photo { height: 280px; }
    .falcon-page .location-inner { flex-direction: column; align-items: flex-start; }
  }
`;

const FALCON_BODY = `
<!-- COMMUNITY STATS -->
<div class="stat-bar">
  <div class="stat-cell"><div class="stat-value">10<span class="stat-unit">ac</span></div><div class="stat-label">Nature Preserve</div></div>
  <div class="stat-cell"><div class="stat-value">Rochester</div><div class="stat-label">School District</div></div>
  <div class="stat-cell"><div class="stat-value">Municipal</div><div class="stat-label">Water &amp; Sewer</div></div>
</div>

<!-- OVERVIEW -->
<div class="overview-band">
  <div class="overview-inner">
    <div>
      <div class="eyebrow">The Development</div>
      <span class="rule"></span>
      <h2 class="overview-h2">A Legacy of Craftsmanship Since 1973</h2>
      <p class="overview-p">Falcon Estates is an upscale, European-inspired subdivision nestled within a serene 10-acre nature preserve &mdash; built by L&amp;R Homes, Inc., Rochester Hills&rsquo; premier custom home builder.</p>
      <p class="overview-p">Every home is served by municipal water &amp; sewer and located within the sought-after Rochester School District, combining the privacy of a wooded setting with the convenience of full city-grade infrastructure.</p>
      <a class="btn btn-gold" href="${withBase('/assets/home/falcon-estates-site-plan.jpg')}" target="_blank" rel="noopener">View the Site Plan</a>
    </div>
    <div class="overview-photo reveal fade-in-right">
      <img decoding="async" src="${withBase('/assets/home/coachwood-aerial-2.jpg')}" alt="Falcon Estates aerial view of the community">
      <div class="overview-photo-label">
        <div class="yr">1973</div>
        <div class="since">Building Since</div>
      </div>
    </div>
  </div>
</div>

<!-- AMENITIES -->
<div class="amenities-band">
  <div class="amenities-inner">
    <div class="eyebrow">Community Highlights</div>
    <h2 class="amenities-h2">Amenities &amp; Features</h2>
    <div class="amenities-grid">
      <div class="amenity-card reveal fade-in" style="animation-delay: 0ms">
        <div class="amenity-icon"><svg viewBox="0 0 24 24"><path d="M12 21s-7-6.5-7-11.5A7 7 0 0 1 19 9.5C19 14.5 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg></div>
        <div class="amenity-title">10-Acre Preserve</div>
        <div class="amenity-body">A wooded nature preserve at the heart of the community, offering privacy and natural beauty year-round.</div>
      </div>
      <div class="amenity-card reveal fade-in" style="animation-delay: 100ms">
        <div class="amenity-icon"><svg viewBox="0 0 24 24"><path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5"/></svg></div>
        <div class="amenity-title">Rochester Schools</div>
        <div class="amenity-body">Located within the highly regarded Rochester School District, one of Metro Detroit&rsquo;s most sought-after.</div>
      </div>
      <div class="amenity-card reveal fade-in" style="animation-delay: 200ms">
        <div class="amenity-icon"><svg viewBox="0 0 24 24"><path d="M3 11 12 4l9 7"/><path d="M5 10v9h14v-9"/><path d="M10 19v-5h4v5"/></svg></div>
        <div class="amenity-title">Move-In Ready Homes</div>
        <div class="amenity-body">Each home is built to the same exacting standard and made available as it nears completion.</div>
      </div>
      <div class="amenity-card reveal fade-in" style="animation-delay: 300ms">
        <div class="amenity-icon"><svg viewBox="0 0 24 24"><path d="M12 2 14.6 8.5 21.5 9 16.3 13.5 17.8 20.5 12 16.9 6.2 20.5 7.7 13.5 2.5 9 9.4 8.5 12 2z"/></svg></div>
        <div class="amenity-title">50+ Year Legacy</div>
        <div class="amenity-body">L&amp;R Homes, Inc. has been building quality custom homes in the Rochester Hills area since 1973.</div>
      </div>
    </div>
  </div>
</div>

<!-- AVAILABLE HOMES -->
<div class="homes-band">
  <div class="homes-inner">
    <div class="eyebrow" style="color: rgba(200,180,140,0.75);">Now Available</div>
    <h2 class="homes-h2">Homes in Falcon Estates</h2>
    <div class="home-tiles">
${FALCON_ESTATES_HOMES.map(
  (home, i) => `      <a class="explore-tile home-tile${home.status === 'sold' ? ' is-sold' : ''} reveal fade-in-up" style="animation-delay: ${i * 100}ms" href="${home.href ?? withBase('/contact-us')}">
        <img decoding="async" loading="lazy" src="${home.image}" alt="">
        <span class="explore-tile-frame" aria-hidden="true"></span>
        <span class="explore-tile-body">
          <span class="explore-tile-title">${home.name}</span>
          <span class="explore-tile-rule" aria-hidden="true"></span>
          <span class="explore-tile-detail"><span class="home-tile-status">${STATUS_LABEL[home.status]}</span><span class="explore-tile-arrow" aria-hidden="true"></span></span>
        </span>
      </a>`,
).join('\n')}
    </div>
  </div>
</div>

<!-- LOCATION CTA -->
<div class="location-band">
  <div class="location-inner">
    <div>
      <div class="eyebrow" style="color: rgba(200,180,140,0.75);">Visit Falcon Estates</div>
      <h2 class="location-h2">See It in Person</h2>
      <div class="location-address">3836 Coachwood Lane, Rochester Hills, MI 48309</div>
    </div>
    <div class="location-actions">
      <a class="btn btn-gold" href="tel:+12486568830">Call (248) 656-8830</a>
      <a class="btn btn-onDark" href="${FALCON_ESTATES.mapsHref}" target="_blank" rel="noopener">Get Directions</a>
      <a class="btn btn-onDark" href="${withBase('/homes-available')}">View All Homes</a>
    </div>
  </div>
</div>

<!-- FOOTER (nav links + copyright come from the shared SimpleFooter below —
     this just keeps the legal disclaimer, which the shared footer doesn't include) -->
<div class="fe-site-footer">
  <div class="fe-disclaimer">
    Renderings, photography, and specifications are for marketing purposes only and are subject to change. Estimated timeframes are not guaranteed and should not be considered reliable commitments. L&amp;R Homes, Inc. is an equal opportunity builder and complies with all applicable Fair Housing laws.
  </div>
</div>
`;

export function FalconEstatesPage() {
  const revealScope = useRevealScope<HTMLDivElement>();

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <SimpleNav />
      </div>
      <main>
        <PhotoHero
          slides={HERO_SLIDES}
          eyebrow="Now Selling · Rochester Hills"
          title="Falcon Estates"
          subtitle="European-inspired custom homes set within a 10-acre nature preserve, in the heart of Rochester Hills."
        />
        {/* The ported page's own stylesheet resets every margin and padding
            under .falcon-page, so the shared header stays outside it. */}
        <div className="falcon-page">
          <style>{FALCON_STYLE}</style>
          <div ref={revealScope} dangerouslySetInnerHTML={{ __html: FALCON_BODY }} />
        </div>
      </main>
      <SimpleFooter />
    </div>
  );
}
