import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { COMPANY, PINE_WOODS, type HomeDetail } from '../../data/site';

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

const specList = (items: readonly string[]) => (
  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
    {items.map((item) => (
      <li key={item} style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(242,240,230,0.75)', paddingLeft: 14, position: 'relative' }}>
        <span style={{ position: 'absolute', left: 0, color: 'var(--color-brand-gold)' }}>—</span>
        {item}
      </li>
    ))}
  </ul>
);

/**
 * Individual home detail page — mirrors the structure of the real
 * landrhomes.com/majestic/ and /heritage/ pages: framed hero, narrative
 * intro, (optional) stats bar, full standard-features spec sheet, a
 * captioned interior gallery, the shared Pine Woods community info, and
 * a closing developer/address/contact block with the legal disclaimer.
 */
export function HomeDetailPage({ home }: { home: HomeDetail }) {
  return (
    <div style={{ background: '#FFFFFF' }}>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `url('${home.heroImage}') center 45% / cover no-repeat` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,12,16,0.55) 0%, rgba(10,12,16,0.35) 40%, rgba(10,12,16,0.85) 100%)' }} />
        <SimpleNav />
        <div style={{ position: 'absolute', right: 48, bottom: 44, zIndex: 5, textAlign: 'right' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 15, color: 'rgba(242,240,230,0.85)' }}>{COMPANY.name}</p>
          <p style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,240,230,0.5)' }}>
            Custom Home Builder · Est. Rochester Hills
          </p>
        </div>
        <div style={{ position: 'relative', zIndex: 5, width: '100%', padding: '0 40px 64px', textAlign: 'center' }}>
          <a
            href="/pine-woods"
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,240,230,0.7)' }}
          >
            ← Pine Woods – Rochester Hills
          </a>
          <p style={{ ...eyebrow, color: 'rgba(242,240,230,0.6)', marginTop: 28, marginBottom: 8 }}>Rochester Hills, Michigan</p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(2.75rem,6vw,4.5rem)',
              color: '#F2F0E6',
              lineHeight: 1.05,
              marginBottom: 4,
            }}
          >
            The
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(3rem,7vw,5rem)',
              color: 'var(--color-brand-gold-light)',
              lineHeight: 1.05,
              marginBottom: 18,
            }}
          >
            {home.name.replace(/^The\s+/, '')}
          </p>
          <p style={{ fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,240,230,0.75)', marginBottom: 22 }}>
            {home.tagline}
          </p>
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
              marginBottom: 26,
            }}
          >
            {home.badge}
          </span>
          <p style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(242,240,230,0.55)' }}>
            {home.addressLine}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: '88px 40px', background: 'var(--bg1)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 56 }} className="simple-grid-2">
          <div>
            <p style={eyebrow}>{home.introEyebrow}</p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(2rem,4vw,2.75rem)',
                color: 'var(--color-brand-dark)',
                lineHeight: 1.15,
                margin: '14px 0 0',
              }}
            >
              {home.introHeadingPlain} <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-dark)' }}>{home.introHeadingEmphasis}</em>
              {home.introHeadingPlain2 && (
                <>
                  <br />
                  {home.introHeadingPlain2}
                </>
              )}
            </h2>
          </div>
          <div>
            {home.introParagraphs.map((p) => (
              <p key={p} style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--fg2)', marginBottom: 18 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      {home.stats && (
        <div style={{ background: '#131210', display: 'flex', flexWrap: 'wrap' }}>
          {home.stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: '1 1 160px',
                textAlign: 'center',
                padding: '32px 16px',
                borderRight: i < home.stats!.length - 1 ? '1px solid rgba(255,255,255,0.1)' : undefined,
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,2.6vw,1.9rem)', fontWeight: 300, color: 'var(--color-brand-gold-light)' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,240,230,0.6)', marginTop: 6 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floor plan */}
      <section style={{ padding: '88px 40px', background: 'var(--bg1)', textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={eyebrow}>Floor Plan</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2rem,4vw,2.75rem)',
              color: 'var(--color-brand-dark)',
              margin: '14px 0 20px',
            }}
          >
            {home.floorPlanHeadingPlain} <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-dark)' }}>{home.floorPlanHeadingEmphasis}</em>
            {home.floorPlanHeadingPlain2 && (
              <>
                <br />
                {home.floorPlanHeadingPlain2}
              </>
            )}
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--fg2)', maxWidth: 760, margin: '0 auto 48px' }}>{home.floorPlanDescription}</p>

          <div
            className="simple-grid-2"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, textAlign: 'center', marginBottom: 20 }}
          >
            {home.floorPlans.map((plan) => (
              <div key={plan.src}>
                <img
                  src={plan.src}
                  alt={`${home.name} — ${plan.caption}`}
                  loading="lazy"
                  style={{ width: '100%', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-2)', border: '1px solid var(--border)' }}
                />
                <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg3)', marginTop: 12 }}>{plan.caption}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'var(--fg3)' }}>
            Built by {PINE_WOODS.builder} · {PINE_WOODS.builderNote}
          </p>
        </div>
      </section>

      {/* Standard Features — full spec sheet */}
      <section style={{ padding: '80px 40px', background: '#131210' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ ...eyebrow, marginBottom: 8 }}>{PINE_WOODS.standardFeatures.eyebrow}</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2rem,4vw,2.75rem)',
              color: '#F2F0E6',
              maxWidth: 560,
              marginBottom: 48,
            }}
          >
            Built to the Town Properties <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-light)' }}>Standard</em>
          </h2>

          <div className="simple-gallery-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginBottom: 48 }}>
            {PINE_WOODS.standardFeatures.columns.map((col) => (
              <div key={col.title}>
                <p style={specColHeading}>{col.title}</p>
                {specList(col.items)}
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 40 }} />

          <div className="simple-gallery-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            {PINE_WOODS.extraSpecs.map((col) => (
              <div key={col.title}>
                <p style={specColHeading}>{col.title}</p>
                {specList(col.items)}
              </div>
            ))}
            <div>
              <p style={specColHeading}>Development Amenities</p>
              {specList(PINE_WOODS.developmentAmenities)}
            </div>
          </div>

          <p style={{ fontSize: 11, color: 'rgba(242,240,230,0.35)', marginTop: 32 }}>
            Built by {PINE_WOODS.builder} · {PINE_WOODS.builderNote}
          </p>
        </div>
      </section>

      {/* Interior gallery */}
      <section style={{ padding: '88px 40px', background: 'var(--bg1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <p style={eyebrow}>Move-In Ready</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2rem,4vw,2.75rem)',
              color: 'var(--color-brand-dark)',
              margin: '14px 0 16px',
            }}
          >
            Inside <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-dark)' }}>{home.name}</em> Today
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg3)', maxWidth: 640, margin: '0 auto 40px' }}>{home.galleryCaption}</p>
          <div className="simple-gallery-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {home.gallery.map((photo) => (
              <div key={photo.src}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-1)', marginBottom: 12 }}
                />
                <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg3)' }}>{photo.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
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
            {PINE_WOODS.name} — <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-dark)' }}>{PINE_WOODS.tagline}</em>
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

      {/* Closing CTA */}
      <section style={{ padding: '80px 40px', background: '#131210', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ ...eyebrow, marginBottom: 10 }}>{home.ctaEyebrow}</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(2rem,4vw,2.75rem)', color: '#F2F0E6', marginBottom: 8 }}>
            The <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-light)' }}>{home.name.replace(/^The\s+/, '')}</em>
          </h2>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,240,230,0.55)', marginBottom: 40 }}>
            {home.ctaAddressLine}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 48,
              flexWrap: 'wrap',
              textAlign: 'left',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: 32,
              marginBottom: 32,
            }}
          >
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-brand-gold-light)', marginBottom: 6 }}>
                Developer
              </p>
              <p style={{ fontSize: 14, color: 'rgba(242,240,230,0.8)', lineHeight: 1.7 }}>
                {COMPANY.name}
                <br />
                Builder: {PINE_WOODS.builder}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-brand-gold-light)', marginBottom: 6 }}>
                Address
              </p>
              <p style={{ fontSize: 14, color: 'rgba(242,240,230,0.8)', lineHeight: 1.7 }}>{COMPANY.addressShort}</p>
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-brand-gold-light)', marginBottom: 6 }}>
                Contact
              </p>
              <p style={{ fontSize: 14, color: 'rgba(242,240,230,0.8)', lineHeight: 1.7 }}>
                {COMPANY.phone}
                <br />
                {COMPANY.email}
              </p>
            </div>
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
            }}
          >
            Contact Us
          </a>
        </div>
      </section>

      <section style={{ padding: '28px 40px', background: '#131210', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ maxWidth: 900, margin: '0 auto', fontSize: 11, lineHeight: 1.7, color: 'rgba(242,240,230,0.3)', textAlign: 'center' }}>
          {PINE_WOODS.legalDisclaimer}
        </p>
      </section>

      <SimpleFooter />
    </div>
  );
}
