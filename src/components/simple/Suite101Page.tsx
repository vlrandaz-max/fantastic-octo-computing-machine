import { Reveal } from '../Reveal';
import { withBase } from '../../lib/url';

const LEASING = {
  office: '(248) 656-8830',
  officeHref: 'tel:2486568830',
  direct: '(248) 388-3473',
  directHref: 'tel:2483883473',
  email: 'vlrandaz@centralerealty.com',
  siteHref: 'https://centralerealty.com/',
  officeAddress: '2490 Walton Boulevard, Ste 103, Rochester Hills, MI 48309',
  address: '2490 Walton Boulevard, Rochester Hills, MI 48309',
  mapsHref: 'https://www.google.com/maps/dir/?api=1&destination=2490+Walton+Blvd+Rochester+Hills+MI+48309',
};

const img = (name: string) => withBase(`/assets/suite-101/${name}.jpg`);
const logo = withBase('/assets/suite-101/logo-cr-gold.png');

const FACTS = [
  { label: 'Rent', value: 'Call', sub: 'for current pricing' },
  { label: 'Size', value: '956', sub: 'square feet' },
  { label: 'Use', value: 'Office / Medical', sub: 'professional & administrative' },
  { label: 'Minimum Term', value: '2 Years', sub: 'modified gross lease' },
];

const HIGHLIGHTS = [
  'Prime exposure at the northeast corner of Walton Boulevard and Brewster Road',
  'Easy access to the I-75 and M-59 freeways',
  'Minutes from the Village of Rochester Hills and Downtown Rochester',
  'Close proximity to Oakland University',
  'Ample free on-site parking',
  'Near Henry Ford (Crittenton) Hospital',
  'Suitable for medical, engineering, professional, or administrative use',
];

const GALLERY = [
  { src: 'interior-1', alt: 'Suite 101 open workspace with recessed lighting and a wood feature wall' },
  { src: 'interior-french-doors', alt: 'Suite 101 room seen through French doors' },
  { src: 'interior-2', alt: 'Suite 101 open area with built-in counter and windows' },
  { src: 'interior-3', alt: 'Suite 101 corner with window and built-in desk nook' },
  { src: 'interior-entry', alt: 'Suite 101 entry area with closet and stone accent column' },
];

// Brand tokens, type and component styling mirror the Centrale Realty site
// (centrale-realty-website-rebuild-2026/site/styles.css on branch
// claude/determined-bardeen-xoc8n8): black #0b0b0b, gold #baa383 / #7d6849,
// cream #f6f3ee, thin uppercase Cormorant Garamond headings, Jost body.
const CSS = `
.s101 { --black:#0b0b0b; --gold:#baa383; --gold-deep:#7d6849; --cream:#f6f3ee; --cream-2:#ece6db; --ink:#1a1a1a; --line:#d9d1c3; --on-dark:#e8e8e8; --on-dark-soft:#c6c6c6;
  --serif:'Cormorant Garamond',Georgia,'Times New Roman',serif; --sans:'Jost',system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;
  --gutter:clamp(18px,4vw,56px);
  font:400 17px/1.8 var(--sans); color:var(--ink); background:var(--cream); -webkit-font-smoothing:antialiased; }
.s101{ overflow-x:clip; }
.s101 *{ box-sizing:border-box; }
.s101 img{ max-width:100%; height:auto; display:block; }
.s101 a{ color:inherit; }
.s101 :focus-visible{ outline:2px solid var(--gold); outline-offset:3px; }
.s101 h1,.s101 h2,.s101 h3{ font-family:var(--serif); font-weight:300; text-transform:uppercase; letter-spacing:.1em; line-height:1.15; margin:0 0 .6em; text-wrap:balance; }
.s101 h1 em,.s101 h2 em{ font-style:italic; text-transform:none; letter-spacing:.02em; font-weight:300; }
.s101 p{ margin:0 0 1.1rem; }
.s101-wrap{ width:100%; max-width:1240px; margin-inline:auto; padding-inline:var(--gutter); }
.s101-sub{ display:inline-block; font:500 .78rem/1.4 var(--sans); letter-spacing:.32em; text-transform:uppercase; color:var(--gold-deep); margin:0 0 1.1rem; }
.s101-dark .s101-sub,.s101-hero .s101-sub{ color:var(--gold); }
.s101-btn{ display:inline-block; font:500 .8rem/1 var(--sans); letter-spacing:.22em; text-transform:uppercase; text-decoration:none; padding:1.05rem 2rem; border:1px solid var(--gold); color:var(--ink); background:transparent; transition:background .25s,color .25s; cursor:pointer; }
.s101-btn:hover{ background:var(--gold); color:var(--black); }
.s101-dark .s101-btn,.s101-hero .s101-btn,.s101-head .s101-btn{ color:#fff; }
.s101-dark .s101-btn:hover,.s101-hero .s101-btn:hover,.s101-head .s101-btn:hover{ color:var(--black); }
.s101-topbar{ background:var(--black); color:var(--on-dark-soft); font:400 .82rem/1 var(--sans); letter-spacing:.08em; }
.s101-topbar .s101-wrap{ display:flex; justify-content:center; gap:clamp(14px,3vw,40px); padding-block:12px; flex-wrap:wrap; }
.s101-topbar a{ text-decoration:none; } .s101-topbar a:hover{ color:var(--gold); }
.s101-head{ background:var(--black); color:var(--on-dark); border-bottom:1px solid rgba(255,255,255,.08); }
.s101-head .s101-wrap{ display:flex; align-items:center; justify-content:space-between; gap:16px; min-height:96px; }
.s101-logo{ display:flex; align-items:center; gap:14px; text-decoration:none; color:#fff; }
.s101-logo img{ height:64px; width:auto; }
.s101-logo-text{ display:flex; flex-direction:column; align-items:center; line-height:1; padding-left:18px; border-left:1px solid rgba(186,163,131,.55); min-height:54px; justify-content:center; }
.s101-logo-text b{ font-family:var(--serif); font-weight:400; font-size:1.9rem; letter-spacing:.14em; padding-left:.14em; }
.s101-logo-text span{ font:300 .884rem/1 var(--sans); letter-spacing:.5em; margin-top:6px; padding-left:.5em; color:var(--gold); }
.s101-hero{ position:relative; min-height:clamp(480px,70vh,680px); display:grid; place-items:center; text-align:center; color:#fff; background:#000 center/cover no-repeat; isolation:isolate; }
.s101-hero::after{ content:''; position:absolute; inset:0; background:rgba(0,0,0,.5); z-index:-1; }
.s101-hero-copy{ padding:80px var(--gutter); max-width:1000px; }
.s101-hero h1{ color:#fff; font-size:clamp(2.2rem,5.2vw,4.4rem); margin-bottom:1rem; text-shadow:0 2px 24px rgba(0,0,0,.35); }
.s101-addr{ font-size:1.1rem; letter-spacing:.06em; color:var(--on-dark); margin-bottom:2rem; }
.s101-cta{ display:flex; flex-wrap:wrap; gap:14px; justify-content:center; }
.s101-facts{ background:var(--black); color:#fff; border-top:1px solid rgba(186,163,131,.4); }
.s101-facts .s101-wrap{ display:grid; grid-template-columns:repeat(4,1fr); }
.s101-fact{ padding:34px 18px; border-left:1px solid rgba(255,255,255,.1); text-align:center; }
.s101-fact:first-child{ border-left:0; }
.s101-fact .l{ font:500 .74rem/1.4 var(--sans); letter-spacing:.3em; text-transform:uppercase; color:var(--gold); }
.s101-fact .v{ font-family:var(--serif); font-weight:300; font-size:clamp(1.7rem,3vw,2.5rem); letter-spacing:.06em; text-transform:uppercase; margin:8px 0 2px; line-height:1.1; }
.s101-fact .s{ font-size:.85rem; color:var(--on-dark-soft); letter-spacing:.06em; }
.s101-sec{ padding-block:clamp(56px,8vw,110px); }
.s101-sec.alt{ background:linear-gradient(180deg,var(--cream-2),var(--cream)); }
.s101 .s101-h2{ font-size:clamp(1.9rem,3.6vw,3rem); color:var(--ink); }
.s101-rule{ width:56px; height:1px; background:var(--gold); margin:0 0 28px; }
.s101-grid2{ display:grid; grid-template-columns:1fr 1fr; gap:clamp(28px,5vw,72px); align-items:center; }
.s101-list{ list-style:none; padding:0; margin:0; }
.s101-list li{ position:relative; padding:12px 0 12px 30px; border-bottom:1px solid var(--line); line-height:1.5; }
.s101-list li::before{ content:''; position:absolute; left:2px; top:22px; width:12px; height:1px; background:var(--gold-deep); }
.s101-photo{ width:100%; display:block; background:#000; }
.s101-gallery{ display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
.s101-gallery .wide{ grid-column:span 2; }
.s101-plan{ background:#fff; border:1px solid var(--line); padding:14px; }
.s101-plan img{ width:100%; }
.s101-card{ background:#fff; border:1px solid var(--line); border-top:2px solid var(--gold); padding:clamp(24px,3vw,40px); }
.s101 .s101-card h2{ font-size:clamp(1.5rem,2.4vw,2rem); }
.s101-row{ display:flex; justify-content:space-between; gap:16px; padding:12px 0; border-bottom:1px solid var(--line); }
.s101-row.total{ border-bottom:0; font-weight:500; font-size:1.2rem; padding-top:16px; letter-spacing:.04em; }
.s101-terms{ margin:0; padding-left:22px; line-height:1.8; }
.s101-dark{ background:var(--black); color:var(--on-dark); text-align:center; }
.s101 .s101-dark h2{ color:#fff; }
.s101-dark .s101-rule{ margin-inline:auto; }
.s101-dark p{ color:var(--on-dark-soft); }
.s101-phone{ display:block; font-family:var(--serif); font-weight:300; font-size:clamp(2.4rem,7vw,4.2rem); letter-spacing:.08em; color:var(--gold); text-decoration:none; margin:10px 0 6px; }
.s101-foot{ background:var(--black); color:var(--on-dark-soft); padding-block:clamp(40px,5vw,64px) 28px; font-size:.95rem; border-top:1px solid rgba(255,255,255,.08); }
.s101-foot-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(20px,3vw,40px); text-align:center; }
.s101 .s101-foot-grid h3{ font:500 .78rem/1.4 var(--sans); letter-spacing:.3em; color:var(--gold); margin-bottom:1rem; }
.s101-foot-grid a{ text-decoration:none; } .s101-foot-grid a:hover{ color:var(--gold); }
.s101-foot-grid img{ margin-inline:auto; }
.s101-foot-bottom{ margin-top:clamp(28px,4vw,48px); padding-top:22px; border-top:1px solid rgba(255,255,255,.1); display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px; font-size:.8rem; letter-spacing:.05em; }
.s101-mobile{ display:none; }
@media (max-width:820px){
  .s101-grid2{ grid-template-columns:1fr; }
  .s101-facts .s101-wrap{ grid-template-columns:1fr 1fr; }
  .s101-fact:nth-child(3){ border-left:0; }
  .s101-fact:nth-child(n+3){ border-top:1px solid rgba(255,255,255,.1); }
  .s101-gallery{ grid-template-columns:1fr 1fr; }
  .s101-head .s101-btn{ display:none; }
  .s101-head .s101-wrap{ min-height:80px; justify-content:center; }
  .s101-logo img{ height:52px; } .s101-logo-text b{ font-size:1.5rem; }
  .s101-foot-grid{ grid-template-columns:1fr; }
  .s101-foot-bottom{ justify-content:center; text-align:center; }
  .s101-topbar a{ display:inline-block; padding:6px 0; }
  .s101-mobile{ display:grid; grid-template-columns:1fr 1fr; position:fixed; left:0; right:0; bottom:0; z-index:60; background:var(--black); border-top:1px solid var(--gold); padding-bottom:env(safe-area-inset-bottom); }
  .s101-mobile a{ display:flex; align-items:center; justify-content:center; min-height:54px; padding:8px 6px; text-align:center; text-decoration:none; font:500 .74rem/1.2 var(--sans); letter-spacing:.12em; text-transform:uppercase; color:#fff; }
  .s101-mobile a:last-child{ background:var(--gold); color:var(--black); }
  .s101 { padding-bottom:54px; }
}
`;

/**
 * Suite 101 leasing page — the destination of the QR code on the "FOR LEASE"
 * sign at the 2490 Walton Blvd road sign. Content follows the Centrale Realty
 * "Prime Office Space For Lease — Suite 101" brochure; styled with the
 * Centrale Realty brand (see CSS note above). Mobile-first because the
 * audience arrives by scanning from a phone.
 */
export function Suite101Page() {
  return (
    <div className="s101">
      <style>{CSS}</style>

      <aside className="s101-topbar" aria-label="Contact information">
        <div className="s101-wrap">
          <span>{LEASING.officeAddress}</span>
          <a href={LEASING.officeHref}>{LEASING.office}</a>
          <a href={`mailto:${LEASING.email}`}>{LEASING.email}</a>
        </div>
      </aside>

      <header className="s101-head">
        <div className="s101-wrap">
          <a className="s101-logo" href={LEASING.siteHref} aria-label="Centrale Realty home">
            <img src={logo} alt="" width={58} height={64} />
            <span className="s101-logo-text">
              <b>CENTRALE</b>
              <span>REALTY</span>
            </span>
          </a>
          <a className="s101-btn" href={LEASING.officeHref}>
            Call {LEASING.office}
          </a>
        </div>
      </header>

      <main>
        <section className="s101-hero" style={{ backgroundImage: `url(${img('building-wide')})` }} aria-labelledby="s101-title">
          <div className="s101-hero-copy">
            <p className="s101-sub">Now Leasing · Suite 101</p>
            <h1 id="s101-title">
              Prime Office Space <em>For Lease</em>
            </h1>
            <p className="s101-addr">{LEASING.address}</p>
            <div className="s101-cta">
              <a className="s101-btn" href={LEASING.officeHref}>
                Call {LEASING.office}
              </a>
              <a className="s101-btn" href={`mailto:${LEASING.email}?subject=${encodeURIComponent('Suite 101 — 2490 Walton Blvd')}`}>
                Email About Suite 101
              </a>
            </div>
          </div>
        </section>

        <section className="s101-facts" aria-label="Suite 101 at a glance">
          <div className="s101-wrap">
            {FACTS.map((f) => (
              <div className="s101-fact" key={f.label}>
                <div className="l">{f.label}</div>
                <div className="v">{f.value}</div>
                <div className="s">{f.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="s101-sec">
          <div className="s101-wrap s101-grid2">
            <Reveal type="fade-in-right">
              <p className="s101-sub">The Space</p>
              <h2 className="s101-h2">
                Property <em>Highlights</em>
              </h2>
              <div className="s101-rule" />
              <ul className="s101-list">
                {HIGHLIGHTS.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal type="fade-in-left">
              <img className="s101-photo" src={img('building')} alt="Brick office building at 2490 Walton Boulevard" loading="lazy" />
            </Reveal>
          </div>
        </section>

        <section className="s101-sec alt">
          <div className="s101-wrap">
            <Reveal type="fade-in-up">
              <p className="s101-sub">Photos</p>
              <h2 className="s101-h2">
                Take a Look <em>Inside</em>
              </h2>
              <div className="s101-rule" />
            </Reveal>
            <div className="s101-gallery">
              {GALLERY.map((g, i) => (
                <Reveal type="fade-in-up" delay={(i % 3) * 80} key={g.src} className={i === 0 ? 'wide' : undefined}>
                  <img className="s101-photo" src={img(g.src)} alt={g.alt} loading="lazy" style={{ aspectRatio: i === 0 ? '32/10' : '16/10', objectFit: 'cover' }} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="s101-sec">
          <div className="s101-wrap s101-grid2">
            <Reveal type="fade-in-right">
              <p className="s101-sub">Layout</p>
              <h2 className="s101-h2">
                Floor <em>Plan</em>
              </h2>
              <div className="s101-rule" />
              <p>
                <strong style={{ fontWeight: 500 }}>Suite 101 — 956 sq ft.</strong> An office, a conference room, and an open workspace area, with a shared common area at the entrance.
              </p>
            </Reveal>
            <Reveal type="fade-in-left">
              <div className="s101-plan">
                <img src={img('floor-plan')} alt="Suite 101 floor plan, 956 square feet: office, conference room and workspace area" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="s101-sec alt">
          <div className="s101-wrap s101-grid2" style={{ alignItems: 'start' }}>
            <Reveal type="fade-in-right">
              <div className="s101-card">
                <h2>
                  Lease <em>Details</em>
                </h2>
                <div className="s101-rule" />
                <ol className="s101-terms">
                  <li>Minimum two (2) year lease term.</li>
                  <li>Modified gross lease with a quarterly maintenance fee (CAM).</li>
                  <li>Tenant is responsible for gas &amp; electric and internet/cable.</li>
                  <li>Remodeled 2002–2026.</li>
                </ol>
              </div>
            </Reveal>
            <Reveal type="fade-in-left">
              <div className="s101-card">
                <h2>
                  <em>Pricing</em>
                </h2>
                <div className="s101-rule" />
                <p>
                  Rates and move-in costs are available on request. Call <a href={LEASING.officeHref}>{LEASING.office}</a> or email{' '}
                  <a href={`mailto:${LEASING.email}`}>{LEASING.email}</a>.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="s101-sec s101-dark">
          <div className="s101-wrap">
            <p className="s101-sub">Schedule a Tour</p>
            <h2 className="s101-h2">
              Arrange a Private <em>Viewing</em>
            </h2>
            <div className="s101-rule" />
            <p>Call or text the leasing office</p>
            <a className="s101-phone" href={LEASING.officeHref}>
              {LEASING.office}
            </a>
            <p>
              Direct: <a href={LEASING.directHref}>{LEASING.direct}</a>
              <br />
              <a href={`mailto:${LEASING.email}`}>{LEASING.email}</a>
            </p>
            <p style={{ marginTop: 28 }}>
              <a className="s101-btn" href={LEASING.mapsHref} target="_blank" rel="noopener noreferrer">
                Get Directions
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="s101-foot">
        <div className="s101-wrap">
          <div className="s101-foot-grid">
            <div>
              <h3>ADDRESS</h3>
              <img src={logo} alt="Centrale Realty C/R logo" width={58} height={64} loading="lazy" style={{ height: 64, width: 'auto', marginBottom: 16 }} />
              <address style={{ fontStyle: 'normal' }}>
                Centrale Realty, Inc.
                <br />
                2490 Walton Boulevard, Ste 103
                <br />
                Rochester Hills, MI 48309
              </address>
            </div>
            <div>
              <h3>CONTACT</h3>
              <a href={`mailto:${LEASING.email}`}>{LEASING.email}</a>
              <br />
              Office <a href={LEASING.officeHref}>{LEASING.office}</a>
              <br />
              Direct <a href={LEASING.directHref}>{LEASING.direct}</a>
            </div>
            <div>
              <h3>EQUAL HOUSING</h3>
              <img src={withBase('/assets/suite-101/equal-housing-white.png')} alt="Equal Housing Opportunity" width={64} height={64} loading="lazy" />
            </div>
          </div>
          <div className="s101-foot-bottom">
            <span>&copy; 2026 Centrale Realty, Inc. All Rights Reserved</span>
            <span>All information deemed reliable however not guaranteed and subject to change without notice.</span>
          </div>
        </div>
      </footer>

      <div className="s101-mobile" role="region" aria-label="Call or email about Suite 101">
        <a href={LEASING.officeHref}>Call {LEASING.office}</a>
        <a href={`mailto:${LEASING.email}?subject=${encodeURIComponent('Suite 101 — 2490 Walton Blvd')}`}>Email Us</a>
      </div>
    </div>
  );
}
