import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { HomeCard } from './HomeCard';
import { FALCON_ESTATES, FALCON_ESTATES_HOMES, PINE_WOODS, PINE_WOODS_HOMES, HOMES_AVAILABLE_INTRO } from '../../data/site';

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-gold)',
};

/**
 * Homes Available — aggregates listings from both communities (Falcon
 * Estates and Pine Woods), matching the real landrhomes.com page.
 */
export function HomesAvailablePage() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      <div style={{ position: 'relative', background: '#131210' }}>
        <SimpleNav />
        <div style={{ height: 220 }} />
      </div>

      <section style={{ padding: '72px 40px 40px', textAlign: 'center' }}>
        <p style={eyebrow}>{HOMES_AVAILABLE_INTRO.eyebrow}</p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(2.25rem,4.5vw,3.25rem)',
            color: 'var(--color-brand-dark)',
            lineHeight: 1.15,
            margin: '16px auto 20px',
            maxWidth: 780,
          }}
        >
          {HOMES_AVAILABLE_INTRO.heading}
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--fg2)', maxWidth: 680, margin: '0 auto' }}>
          {HOMES_AVAILABLE_INTRO.body}
        </p>
      </section>

      {/* Falcon Estates */}
      <section style={{ padding: '40px 40px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <p style={eyebrow}>{FALCON_ESTATES.eyebrow}</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1.75rem,3vw,2.25rem)',
              color: 'var(--color-brand-dark)',
              margin: '10px 0 40px',
            }}
          >
            {FALCON_ESTATES.name}
          </h2>
          <div
            className="simple-gallery-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, textAlign: 'left' }}
          >
            {FALCON_ESTATES_HOMES.map((home) => (
              <HomeCard key={home.name} home={home} />
            ))}
          </div>
        </div>
      </section>

      {/* Pine Woods */}
      <section style={{ padding: '0 40px 88px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <p style={eyebrow}>{PINE_WOODS.eyebrow}</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1.75rem,3vw,2.25rem)',
              color: 'var(--color-brand-dark)',
              margin: '10px 0 40px',
            }}
          >
            {PINE_WOODS.name}
          </h2>
          <div
            className="simple-gallery-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 780, margin: '0 auto', textAlign: 'left' }}
          >
            {PINE_WOODS_HOMES.map((home) => (
              <HomeCard key={home.name} home={home} />
            ))}
          </div>
          <a
            href="/pine-woods"
            style={{
              display: 'inline-block',
              marginTop: 32,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-gold-dark)',
              borderBottom: '1px solid var(--color-brand-gold)',
              paddingBottom: 4,
            }}
          >
            Explore Pine Woods →
          </a>
        </div>
      </section>

      {/* CTA band */}
      <section style={{ background: 'linear-gradient(135deg, #1c2840 0%, #2a2018 60%, #1e1a10 100%)', padding: '64px 40px' }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 28,
          }}
        >
          <div>
            <p style={{ ...eyebrow, color: 'var(--color-brand-gold-light)', marginBottom: 12 }}>Get in Touch</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', color: '#F2F0E6' }}>
              Let&rsquo;s Build Something Lasting
            </h2>
          </div>
          <a
            href="/contact-us"
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#131210',
              background: 'var(--color-brand-gold)',
              padding: '16px 30px',
            }}
          >
            Contact Us
          </a>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
}
