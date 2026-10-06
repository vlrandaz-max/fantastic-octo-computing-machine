import { Reveal } from '../Reveal';
import { withBase } from '../../lib/url';

const LEASING = {
  office: '(248) 656-8830',
  officeHref: 'tel:2486568830',
  direct: '(248) 388-3473',
  directHref: 'tel:2483883473',
  email: 'vlrandaz@centralerealty.com',
  brokerage: 'Centrale Realty Inc.',
  address: '2490 Walton Boulevard, Rochester Hills, MI 48309',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=2490+Walton+Blvd+Rochester+Hills+MI+48309',
};

const img = (name: string) => withBase(`/assets/suite-101/${name}.jpg`);

const FACTS = [
  { label: 'Rent', value: '$1,675', sub: 'per month' },
  { label: 'Size', value: '956', sub: 'square feet' },
  { label: 'Use', value: 'Office / Medical', sub: 'professional & admin' },
  { label: 'Min. Term', value: '2 Years', sub: 'modified gross lease' },
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

const MOVE_IN = [
  { label: 'First month’s rent', amount: '$1,675.00' },
  { label: 'Security deposit', amount: '$2,512.50' },
  { label: 'Non-refundable cleaning fee', amount: '$350.00' },
];

const GALLERY = [
  { src: 'interior-1', alt: 'Suite 101 open workspace with recessed lighting and a wood feature wall' },
  { src: 'interior-french-doors', alt: 'Suite 101 room seen through French doors' },
  { src: 'interior-2', alt: 'Suite 101 open area with built-in counter and windows' },
  { src: 'interior-3', alt: 'Suite 101 corner with window and built-in desk nook' },
  { src: 'interior-entry', alt: 'Suite 101 entry area with closet and stone accent column' },
];

const CSS = `
.s101 { --navy:#1a1f6e; --navy-2:#0e1148; --blue:#3a43b0; --gold:#d3d7e6; --ink:#1b2433; --muted:#5b6679; --line:#dde3ee; --bg:#f5f7fb;
  font-family:'Jost',system-ui,sans-serif; color:var(--ink); background:#fff; -webkit-font-smoothing:antialiased; }
.s101 *{ box-sizing:border-box; }
.s101 a{ color:inherit; text-decoration:none; }
.s101-wrap{ max-width:1100px; margin:0 auto; padding:0 20px; }
.s101-top{ background:var(--navy-2); color:#fff; }
.s101-top .s101-wrap{ display:flex; justify-content:space-between; align-items:center; gap:12px; padding-top:12px; padding-bottom:12px; }
.s101-brand{ display:flex; align-items:center; gap:12px; font-family:'Cormorant Garamond',serif; font-weight:600; letter-spacing:.12em; font-size:22px; text-transform:uppercase; }
.s101-brand img{ width:40px; height:40px; border-radius:6px; }
.s101-top a.s101-call{ background:#fff; color:var(--navy); font-weight:700; padding:9px 16px; border-radius:999px; font-size:14px; white-space:nowrap; }
.s101-hero{ position:relative; color:#fff; background:var(--navy-2) center/cover no-repeat; }
.s101-hero::before{ content:''; position:absolute; inset:0; background:linear-gradient(180deg,rgba(14,17,72,.55) 0%,rgba(14,17,72,.88) 100%); }
.s101-hero .s101-wrap{ position:relative; padding-top:72px; padding-bottom:64px; }
.s101-eyebrow{ font-size:13px; font-weight:600; letter-spacing:.24em; text-transform:uppercase; color:var(--gold); margin:0 0 14px; }
.s101-h1{ font-family:'Montserrat',var(--font-body),sans-serif; font-weight:800; font-size:clamp(2.2rem,6vw,4rem); line-height:1.05; margin:0 0 14px; text-transform:uppercase; letter-spacing:-.01em; }
.s101-addr{ font-size:clamp(1rem,2.4vw,1.25rem); opacity:.92; margin:0 0 28px; }
.s101-cta{ display:flex; flex-wrap:wrap; gap:12px; }
.s101-btn{ display:inline-block; padding:15px 26px; border-radius:6px; font-weight:700; font-size:16px; letter-spacing:.02em; }
.s101-btn.primary{ background:#fff; color:var(--navy); }
.s101-btn.ghost{ border:2px solid rgba(255,255,255,.7); color:#fff; }
.s101-facts{ background:var(--navy); color:#fff; }
.s101-facts .s101-wrap{ display:grid; grid-template-columns:repeat(4,1fr); gap:0; padding-top:0; padding-bottom:0; }
.s101-fact{ padding:26px 18px; border-left:1px solid rgba(255,255,255,.14); text-align:center; }
.s101-fact:first-child{ border-left:0; }
.s101-fact .l{ font-size:12px; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); font-weight:600; }
.s101-fact .v{ font-family:'Montserrat',sans-serif; font-weight:800; font-size:clamp(1.3rem,3vw,1.9rem); margin:6px 0 2px; }
.s101-fact .s{ font-size:13px; opacity:.75; }
.s101-sec{ padding:72px 0; }
.s101-sec.alt{ background:var(--bg); }
.s101-h2{ font-family:'Montserrat',sans-serif; font-weight:800; text-transform:uppercase; font-size:clamp(1.5rem,3.4vw,2.1rem); color:var(--navy); margin:0 0 8px; letter-spacing:-.005em; }
.s101-rule{ width:56px; height:4px; background:var(--gold); border-radius:2px; margin:0 0 28px; }
.s101-grid2{ display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
.s101-list{ list-style:none; padding:0; margin:0; }
.s101-list li{ position:relative; padding:12px 0 12px 32px; border-bottom:1px solid var(--line); font-size:17px; line-height:1.45; }
.s101-list li::before{ content:''; position:absolute; left:2px; top:19px; width:14px; height:8px; border-left:3px solid var(--blue); border-bottom:3px solid var(--blue); transform:rotate(-45deg); }
.s101-photo{ width:100%; display:block; border-radius:10px; box-shadow:0 10px 30px rgba(14,17,72,.18); background:#e8ecf3; }
.s101-gallery{ display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
.s101-gallery img{ aspect-ratio:16/10; object-fit:cover; }
.s101-gallery .wide{ grid-column:span 2; }
.s101-plan{ background:#fff; border:1px solid var(--line); border-radius:10px; padding:14px; }
.s101-plan img{ width:100%; display:block; }
.s101-card{ background:#fff; border:1px solid var(--line); border-radius:12px; padding:28px; box-shadow:0 6px 22px rgba(14,17,72,.07); }
.s101-row{ display:flex; justify-content:space-between; gap:16px; padding:12px 0; border-bottom:1px solid var(--line); font-size:17px; }
.s101-row.total{ border-bottom:0; font-weight:700; font-size:20px; color:var(--navy); padding-top:16px; }
.s101-terms{ margin:0; padding-left:22px; font-size:17px; line-height:1.7; }
.s101-contact{ background:var(--navy-2); color:#fff; text-align:center; }
.s101-contact .s101-h2{ color:#fff; }
.s101-contact .s101-rule{ margin-left:auto; margin-right:auto; }
.s101-contact p{ margin:0 0 6px; font-size:18px; }
.s101-phone{ display:block; font-family:'Montserrat',sans-serif; font-weight:800; font-size:clamp(2rem,7vw,3.4rem); color:var(--gold); margin:12px 0 4px; }
.s101-foot{ background:#080a30; color:rgba(255,255,255,.6); font-size:12.5px; line-height:1.6; text-align:center; padding:26px 0; }
.s101-foot a{ text-decoration:underline; }
@media (max-width:820px){
  .s101-grid2{ grid-template-columns:1fr; gap:28px; }
  .s101-facts .s101-wrap{ grid-template-columns:1fr 1fr; }
  .s101-fact:nth-child(3){ border-left:0; }
  .s101-fact:nth-child(n+3){ border-top:1px solid rgba(255,255,255,.14); }
  .s101-gallery{ grid-template-columns:1fr 1fr; }
  .s101-gallery .wide{ grid-column:span 2; }
  .s101-sec{ padding:52px 0; }
  .s101-hero .s101-wrap{ padding-top:48px; padding-bottom:44px; }
  .s101-brand{ font-size:17px; letter-spacing:.06em; } .s101-brand img{ width:34px; height:34px; }
  .s101-btn{ flex:1 1 100%; text-align:center; }
}
`;

/**
 * Suite 101 leasing page — the destination of the QR code on the "FOR LEASE"
 * sign at the 2490 Walton Blvd road sign. Content follows the Centrale Realty
 * "Prime Office Space For Lease — Suite 101" brochure; mobile-first because
 * the audience arrives by scanning from a phone.
 */
export function Suite101Page() {
  return (
    <div className="s101">
      <style>{CSS}</style>

      <div className="s101-top">
        <div className="s101-wrap">
          <span className="s101-brand">
            <img src={withBase('/assets/suite-101/centrale-logo.png')} alt="" />
            Centrale Realty
          </span>
          <a className="s101-call" href={LEASING.officeHref}>
            Call {LEASING.office}
          </a>
        </div>
      </div>

      <header className="s101-hero" style={{ backgroundImage: `url(${img('building-wide')})` }}>
        <div className="s101-wrap">
          <p className="s101-eyebrow">Now Leasing · Suite 101</p>
          <h1 className="s101-h1">
            Prime Office Space
            <br />
            For Lease
          </h1>
          <p className="s101-addr">{LEASING.address}</p>
          <div className="s101-cta">
            <a className="s101-btn primary" href={LEASING.officeHref}>
              Call {LEASING.office}
            </a>
            <a className="s101-btn ghost" href={`mailto:${LEASING.email}?subject=${encodeURIComponent('Suite 101 — 2490 Walton Blvd')}`}>
              Email About Suite 101
            </a>
          </div>
        </div>
      </header>

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
            <h2 className="s101-h2">Property Highlights</h2>
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
            <h2 className="s101-h2">Take a Look Inside</h2>
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
            <h2 className="s101-h2">Floor Plan</h2>
            <div className="s101-rule" />
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--muted)', margin: '0 0 12px' }}>
              <strong style={{ color: 'var(--ink)' }}>Suite 101 — 956 sq ft.</strong> An office, a conference room, and an open workspace area, with a shared common area at the entrance.
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
              <h2 className="s101-h2" style={{ fontSize: '1.4rem' }}>Lease Details</h2>
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
              <h2 className="s101-h2" style={{ fontSize: '1.4rem' }}>Move-In Costs</h2>
              <div className="s101-rule" />
              {MOVE_IN.map((m) => (
                <div className="s101-row" key={m.label}>
                  <span>{m.label}</span>
                  <span>{m.amount}</span>
                </div>
              ))}
              <div className="s101-row total">
                <span>Total move-in</span>
                <span>$4,537.50</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="s101-sec s101-contact">
        <div className="s101-wrap">
          <img src={withBase('/assets/suite-101/centrale-logo.png')} alt="Centrale Realty" style={{ display: "block", margin: "0 auto 18px", width: 84, height: 84, borderRadius: 10 }} />
          <h2 className="s101-h2">Arrange a Private Viewing</h2>
          <div className="s101-rule" />
          <p>Call or text the leasing office</p>
          <a className="s101-phone" href={LEASING.officeHref}>
            {LEASING.office}
          </a>
          <p>
            Direct: <a href={LEASING.directHref} style={{ textDecoration: 'underline' }}>{LEASING.direct}</a>
          </p>
          <p>
            <a href={`mailto:${LEASING.email}`} style={{ textDecoration: 'underline' }}>
              {LEASING.email}
            </a>
          </p>
          <p style={{ marginTop: 22 }}>
            <a className="s101-btn ghost" href={LEASING.mapsHref} target="_blank" rel="noreferrer">
              Get Directions
            </a>
          </p>
        </div>
      </section>

      <footer className="s101-foot">
        <div className="s101-wrap">
          {LEASING.brokerage} · {LEASING.address}
          <br />
          All information deemed reliable however not guaranteed and subject to change without notice.
        </div>
      </footer>
    </div>
  );
}
