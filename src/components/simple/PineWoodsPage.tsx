import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { HomeCard } from './HomeCard';
import { COMPANY, PINE_WOODS, PINE_WOODS_HOMES } from '../../data/site';

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-gold)',
};

const specColHeading: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-gold-light)',
  borderBottom: '1px solid rgba(255,255,255,0.15)',
  paddingBottom: 12,
  marginBottom: 16,
};

/**
 * Pine Woods — Rochester Hills. A second community, built by Town
 * Properties, LLC (an L&R Homes affiliate) — distinct builder, distinct
 * standard-features spec sheet, matching the real landrhomes.com page.
 */
export function PineWoodsPage() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: "url('/assets/home/coachwood-aerial-twilight-2.png') center 55% / cover no-repeat",
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,10,8,0.5) 0%, rgba(12,10,8,0.2) 40%, rgba(12,10,8,0.8) 100%)' }} />
        <SimpleNav />
        <div style={{ position: 'relative', zIndex: 5, padding: '0 40px 64px', maxWidth: 900 }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#131210',
              background: 'var(--color-brand-gold)',
              padding: '6px 14px',
              marginBottom: 18,
            }}
          >
            {PINE_WOODS.heroBadge}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(2.5rem,5.5vw,4rem)',
              color: '#F2F0E6',
              lineHeight: 1.1,
              marginBottom: 10,
            }}
          >
            {PINE_WOODS.name} <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-light)' }}>— Rochester Hills</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, color: 'rgba(242,240,230,0.75)' }}>
            {PINE_WOODS.tagline}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: '88px 40px', background: 'var(--bg1)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={eyebrow}>L&amp;R Homes, Inc. · New Development</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2rem,4vw,2.75rem)',
              color: 'var(--color-brand-dark)',
              margin: '14px 0 24px',
            }}
          >
            Spacious, <em style={{ fontStyle: 'italic' }}>Beautifully Crafted</em> Homes
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--fg2)' }}>{PINE_WOODS.intro}</p>
        </div>
      </section>

      {/* Community info grid */}
      <section style={{ padding: '0 40px 88px', background: 'var(--bg1)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ ...eyebrow, textAlign: 'center', marginBottom: 8 }}>The Community</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(1.75rem,3.5vw,2.5rem)',
              color: 'var(--color-brand-dark)',
              textAlign: 'center',
              marginBottom: 44,
            }}
          >
            {PINE_WOODS.name} — <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-dark)' }}>{PINE_WOODS.name}</em>
            <br />
            {PINE_WOODS.tagline}
          </h2>
          <div className="simple-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 56px' }}>
            {PINE_WOODS.community.map((item) => (
              <div key={item.label} style={{ borderTop: '1px solid var(--border)', paddingTop: 18 }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg3)', marginBottom: 8 }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--color-brand-dark)', marginBottom: 10 }}>
                  {item.title}
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--fg2)' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standard Features spec sheet */}
      <section style={{ padding: '80px 40px', background: '#131210' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ ...eyebrow, marginBottom: 8 }}>{PINE_WOODS.standardFeatures.eyebrow}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(2rem,4vw,2.75rem)',
                color: '#F2F0E6',
                maxWidth: 480,
              }}
            >
              Built to the Town Properties <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-light)' }}>Standard</em>
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(242,240,230,0.6)', maxWidth: 380 }}>
              {PINE_WOODS.standardFeatures.intro}
            </p>
          </div>
          <div className="simple-gallery-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            {PINE_WOODS.standardFeatures.columns.map((col) => (
              <div key={col.title}>
                <p style={specColHeading}>{col.title}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {col.items.map((item) => (
                    <li key={item} style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(242,240,230,0.75)', paddingLeft: 14, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--color-brand-gold)' }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'rgba(242,240,230,0.35)', marginTop: 12 }}>
            Built by {PINE_WOODS.builder} · {PINE_WOODS.builderNote}
          </p>
        </div>
      </section>

      {/* Discover Pine Woods CTA */}
      <section style={{ padding: '80px 40px', background: '#131210', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ ...eyebrow, marginBottom: 8 }}>{PINE_WOODS.discoverCta.eyebrow}</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2rem,4vw,2.75rem)',
              color: '#F2F0E6',
              margin: '10px 0 20px',
            }}
          >
            Discover <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-light)' }}>Pine Woods</em>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(242,240,230,0.65)', marginBottom: 40 }}>{PINE_WOODS.discoverCta.body}</p>

          <p style={{ ...eyebrow, fontSize: 10, marginBottom: 20 }}>Available Homes</p>
          <div
            className="simple-gallery-3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 320px))',
              gap: 20,
              justifyContent: 'center',
              textAlign: 'left',
              marginBottom: 40,
            }}
          >
            {PINE_WOODS_HOMES.map((home) => (
              <HomeCard key={home.name} home={home} dark />
            ))}
          </div>

          <a
            href="/contact-us"
            style={{
              display: 'inline-block',
              border: '1px solid var(--color-brand-gold)',
              color: '#F2F0E6',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '15px 32px',
              marginBottom: 20,
            }}
          >
            Contact Us
          </a>
          <p style={{ fontSize: 14, color: 'rgba(242,240,230,0.6)' }}>
            {COMPANY.phone} &middot;{' '}
            <a href={`mailto:${COMPANY.email}`} style={{ color: 'var(--color-brand-gold-light)' }}>
              {COMPANY.email}
            </a>
          </p>
        </div>
      </section>

      {/* Legal disclaimer */}
      <section style={{ padding: '28px 40px', background: '#131210', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ maxWidth: 900, margin: '0 auto', fontSize: 11, lineHeight: 1.7, color: 'rgba(242,240,230,0.3)', textAlign: 'center' }}>
          {PINE_WOODS.legalDisclaimer}
        </p>
      </section>

      <SimpleFooter />
    </div>
  );
}
