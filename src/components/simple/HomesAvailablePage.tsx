import { SimpleNav } from './SimpleNav';
import { PhotoHero } from './PhotoHero';
import { SimpleFooter } from './SimpleFooter';
import { HomeCard } from './HomeCard';
import { Reveal } from '../Reveal';
import { FALCON_ESTATES, FALCON_ESTATES_HOMES, PINE_WOODS, PINE_WOODS_HOMES, HOMES_AVAILABLE_INTRO } from '../../data/site';
import { withBase } from '../../lib/url';

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-gold-dark)',
};

// Exteriors and interiors alternating across the Falcon Estates and Pine
// Woods homes — a different set from the contact page's header.
const HERO_SLIDES = [
  { src: withBase('/assets/home/crestwood-twilight-2026.jpg'), position: 'center 55%' },
  { src: withBase('/assets/pine-woods/majestic-kitchen-staged.jpg'), position: 'center' },
  { src: withBase('/assets/home/grandeur-kitchen-ai-staged.jpg'), position: 'center' },
  { src: withBase('/assets/pine-woods/heritage-family-room.jpg'), position: 'center' },
  { src: withBase('/assets/pine-woods/majestic-exterior-twilight.jpg'), position: 'center 60%' },
  { src: withBase('/assets/home/grandeur-dining-room.jpg'), position: 'center' },
];

/**
 * Homes Available — aggregates listings from both communities (Falcon
 * Estates and Pine Woods), matching the real landrhomes.com page.
 */
export function HomesAvailablePage() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      <div style={{ position: 'relative' }}>
        <SimpleNav />
      </div>

      <main>
      <PhotoHero
        slides={HERO_SLIDES}
        eyebrow="Homes Available"
        title={HOMES_AVAILABLE_INTRO.heading}
        subtitle="Move-in ready homes in Falcon Estates and Pine Woods, Rochester Hills."
      />

      <section style={{ padding: '72px 40px 40px', textAlign: 'center' }}>
        <p style={eyebrow}>{HOMES_AVAILABLE_INTRO.eyebrow}</p>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--fg2)', maxWidth: 680, margin: '16px auto 0' }}>
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
            className="home-tiles"
          >
            {FALCON_ESTATES_HOMES.map((home, i) => (
              <Reveal key={home.name} type="fade-in-up" delay={i * 100}>
                <HomeCard home={home} />
              </Reveal>
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
            className="home-tiles"
          >
            {PINE_WOODS_HOMES.map((home, i) => (
              <Reveal key={home.name} type="fade-in-up" delay={i * 100}>
                <HomeCard home={home} />
              </Reveal>
            ))}
          </div>
          <a
            href={withBase('/pine-woods')}
            className="classic-btn-underline"
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
      <section style={{ background: '#131210', padding: '64px 40px' }}>
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
              Your Next Home Awaits
            </h2>
          </div>
          <a
            href={withBase('/contact-us')}
            className="classic-hover-float"
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
      </main>

      <SimpleFooter />
    </div>
  );
}
