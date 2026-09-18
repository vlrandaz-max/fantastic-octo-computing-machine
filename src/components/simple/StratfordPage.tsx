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
  { src: withBase('/assets/home/stratford-family-room.jpg'), alt: 'The Stratford — family room', caption: 'Family Room' },
  { src: withBase('/assets/home/stratford-family-kitchen.jpg'), alt: 'The Stratford — family room and kitchen', caption: 'Family Room · Kitchen' },
  { src: withBase('/assets/home/stratford-bar-kitchen-nook-family.jpg'), alt: 'The Stratford — bar, kitchen nook, and family room', caption: 'Bar · Kitchen Nook · Family Room' },
  { src: withBase('/assets/home/stratford-kitchen-nook.jpg'), alt: 'The Stratford — kitchen and breakfast nook', caption: 'Kitchen · Breakfast Nook' },
  { src: withBase('/assets/home/stratford-dining-room.jpg'), alt: 'The Stratford — dining room', caption: 'Dining Room' },
  { src: withBase('/assets/home/stratford-study.jpg'), alt: 'The Stratford — study', caption: 'Study' },
  { src: withBase('/assets/home/stratford-media-room.jpg'), alt: 'The Stratford — media room', caption: 'Media Room' },
  { src: withBase('/assets/home/stratford-owners-suite.jpg'), alt: "The Stratford — owner's suite", caption: "Owner's Suite" },
  { src: withBase('/assets/home/stratford-private-bedroom.jpg'), alt: 'The Stratford — private bedroom', caption: 'Private Bedroom' },
  { src: withBase('/assets/home/stratford-jack-bedroom.jpg'), alt: 'The Stratford — Jack and Jill bedroom', caption: 'Bedroom — Jack & Jill Suite' },
  { src: withBase('/assets/home/stratford-jill-bedroom.jpg'), alt: 'The Stratford — Jack and Jill bedroom', caption: 'Bedroom — Jack & Jill Suite' },
];

/**
 * The Stratford — a sold Falcon Estates home (829 Crestwood, per the real
 * site's own street-address photo mapping), shown here as a portfolio
 * page. Mirrors CrestwoodPage/CambridgePage's structure — self-contained
 * rather than PINE_WOODS-driven, since Stratford has no floor plans or
 * Town Properties spec sheet of its own to show.
 */
export function StratfordPage() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `url('${withBase('/assets/home/829-crestwood-front.jpg')}') center 45% / cover no-repeat` }} />
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
            Stratford
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
              <p style={eyebrow}>Welcome to The Stratford</p>
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
                Space to Gather, <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-dark)' }}>Room to Grow</em>
              </h2>
            </div>
          </Reveal>
          <div>
            <Reveal type="fade-in" delay={100}>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--fg2)', marginBottom: 18 }}>
                The Stratford was built for a full household — an open kitchen, nook, and family room anchored by
                a wet bar for entertaining, a separate dining room and study, a dedicated media room, and an
                owner&rsquo;s suite alongside a private bedroom and a Jack-and-Jill suite for the rest of the family.
              </p>
            </Reveal>
            <Reveal type="fade-in" delay={200}>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--fg2)', marginBottom: 18 }}>{FALCON_ESTATES.body}</p>
            </Reveal>
            <Reveal type="fade-in" delay={300}>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--fg2)' }}>
                The Stratford has sold — the photography below shows the completed home, professionally staged.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interior gallery */}
      <section style={{ padding: '88px 40px', background: 'var(--bg1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
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
            Inside <em style={{ fontStyle: 'italic', color: 'var(--color-brand-gold-dark)' }}>The Stratford</em>
          </h2>
          <div className="simple-gallery-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {GALLERY.map((photo, i) => (
              <Reveal key={photo.src} type="fade-in-up" delay={(i % 3) * 100}>
                <span className="photo-zoom" style={{ borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-1)', marginBottom: 12 }}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" style={{ width: '100%', height: 300, objectFit: 'cover' }} />
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
