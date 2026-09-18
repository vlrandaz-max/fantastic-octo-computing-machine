import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { Reveal } from '../Reveal';
import { COMPANY, FALCON_ESTATES } from '../../data/site';
import { withBase } from '../../lib/url';

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-gold)',
};

const GALLERY = [
  { src: withBase('/assets/home/crestwood-dining-room.jpg'), alt: 'The Crestwood — dining room', caption: 'Dining Room' },
  { src: withBase('/assets/home/crestwood-family-dining.jpg'), alt: 'The Crestwood — family room and dining', caption: 'Family Room · Dining' },
  { src: withBase('/assets/home/crestwood-owners-suite.jpg'), alt: "The Crestwood — owner's suite", caption: "Owner's Suite" },
  { src: withBase('/assets/home/crestwood-study.jpg'), alt: 'The Crestwood — study', caption: 'Study' },
];

/**
 * The Crestwood — a sold Falcon Estates home, shown here as a portfolio
 * page. Mirrors HomeDetailPage's hero/intro/gallery/CTA structure (used
 * for Pine Woods' available homes), but self-contained rather than
 * PINE_WOODS-driven, since Crestwood belongs to Falcon Estates and has no
 * floor plans or Town Properties spec sheet of its own to show.
 */
export function CrestwoodPage() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `url('${withBase('/assets/home/crestwood-twilight-2026.jpg')}') center 45% / cover no-repeat` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,12,16,0.55) 0%, rgba(10,12,16,0.35) 40%, rgba(10,12,16,0.85) 100%)' }} />
        <SimpleNav />
        <div className="hero-credit-tag" style={{ position: 'absolute', right: 48, bottom: 44, zIndex: 5, textAlign: 'right' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 15, color: 'rgba(242,240,230,0.85)' }}>{COMPANY.name}</p>
          <p style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,240,230,0.5)' }}>
            Custom Home Builder · Est. Rochester Hills
          </p>
        </div>
        <div style={{ position: 'relative', zIndex: 5, width: '100%', padding: '0 40px 64px', textAlign: 'center' }}>
          <a
            href={withBase('/falcon-estates-rochester-hills')}
            className="nav-link-hover"
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,240,230,0.7)' }}
          >
            ← Falcon Estates – Rochester Hills
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
            Crestwood
          </p>
          <p style={{ fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,240,230,0.75)', marginBottom: 22 }}>
            European-Inspired Custom Home
          </p>
          <span
            style={{
              display: 'inline-block',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#F2F0E6',
              background: '#3a3530',
              padding: '6px 14px',
              marginBottom: 26,
            }}
          >
            Sold
          </span>
          <p style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(242,240,230,0.55)' }}>
            Falcon Estates · Rochester Hills, MI 48309
          </p>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: '88px 40px', background: 'var(--bg1)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 56 }} className="simple-grid-2">
          <Reveal type="fade-in-down">
            <div>
              <p style={eyebrow}>Welcome to The Crestwood</p>
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
                European Elegance, <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-dark)' }}>Timeless Craft</em>
              </h2>
            </div>
          </Reveal>
          <div>
            <Reveal type="fade-in" delay={100}>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--fg2)', marginBottom: 18 }}>
                The Crestwood brought European-inspired architecture and L&amp;R Homes&rsquo; hands-on craftsmanship
                together on one of Falcon Estates&rsquo; finest homesites — stone and brick elevations, generous
                formal living spaces, and a floor plan built for both everyday life and entertaining.
              </p>
            </Reveal>
            <Reveal type="fade-in" delay={200}>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--fg2)', marginBottom: 18 }}>{FALCON_ESTATES.body}</p>
            </Reveal>
            <Reveal type="fade-in" delay={300}>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--fg2)' }}>
                The Crestwood has sold — the photography below shows the completed home, professionally staged.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interior gallery */}
      <section style={{ padding: '88px 40px', background: 'var(--bg1)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <p style={eyebrow}>A Closer Look</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2rem,4vw,2.75rem)',
              color: 'var(--color-brand-dark)',
              margin: '14px 0 40px',
            }}
          >
            Inside <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-dark)' }}>The Crestwood</em>
          </h2>
          <div className="simple-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {GALLERY.map((photo, i) => (
              <Reveal key={photo.src} type={i % 2 === 0 ? 'fade-in-left' : 'fade-in-right'} delay={Math.floor(i / 2) * 100}>
                <span className="photo-zoom" style={{ borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-1)', marginBottom: 12 }}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" style={{ width: '100%', height: 340, objectFit: 'cover' }} />
                </span>
                <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg3)' }}>{photo.caption}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{ padding: '80px 40px', background: '#131210', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ ...eyebrow, marginBottom: 10 }}>Love This Style?</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(2rem,4vw,2.75rem)', color: '#F2F0E6', marginBottom: 8 }}>
            See What&rsquo;s <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-light)' }}>Available Now</em>
          </h2>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,240,230,0.55)', marginBottom: 40 }}>
            Falcon Estates · Rochester Hills, MI
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
                Builder
              </p>
              <p style={{ fontSize: 14, color: 'rgba(242,240,230,0.8)', lineHeight: 1.7 }}>{COMPANY.name}</p>
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
            href={withBase('/homes-available')}
            className="classic-btn-outline classic-hover-float"
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
            View Homes Available
          </a>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
}
