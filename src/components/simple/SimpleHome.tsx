import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-gold)',
};

const sectionHeading: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  fontSize: 'clamp(2.25rem, 4vw, 3rem)',
  color: 'var(--color-brand-dark)',
  lineHeight: 1.1,
  margin: '14px 0 20px',
};

const outlineButton: React.CSSProperties = {
  display: 'inline-block',
  border: '1px solid var(--color-brand-gold)',
  color: 'var(--color-brand-dark)',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  padding: '14px 26px',
};

/**
 * A conventional, single-page marketing homepage — structured after
 * rh.house (full-bleed hero, welcome intro with an offset photo collage,
 * alternating image/text content blocks, a full-width CTA band, plain
 * footer) but built entirely from L&R Homes' own brand tokens and
 * photography. No 3D, no scroll choreography — just a well-composed,
 * conventional site.
 */
export function SimpleHome() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: "url('/assets/home/coachwood-aerial-twilight-2.png') center 60% / cover no-repeat",
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(12,10,8,0.55) 0%, rgba(12,10,8,0.25) 45%, rgba(12,10,8,0.75) 100%)',
          }}
        />
        <SimpleNav />
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '0 24px', maxWidth: 900 }}>
          <p style={{ ...eyebrow, color: 'var(--color-brand-gold-light)', marginBottom: 20 }}>
            Custom Builders Since 1973
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(2.75rem, 6vw, 4.75rem)',
              color: '#F2F0E6',
              lineHeight: 1.08,
              letterSpacing: '0.01em',
              marginBottom: 24,
            }}
          >
            Fifty Years of Building,
            <br />
            One Home at a Time.
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <span style={{ width: 40, height: 1, background: 'var(--color-brand-gold)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.3em', color: 'rgba(242,240,230,0.75)' }}>
              L &amp; R HOMES
            </span>
            <span style={{ width: 40, height: 1, background: 'var(--color-brand-gold)' }} />
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section style={{ padding: '96px 40px', background: 'var(--bg1)' }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 56,
            alignItems: 'center',
          }}
          className="simple-grid-2"
        >
          <div>
            <p style={eyebrow}>Custom Homes in Rochester Hills, Michigan</p>
            <h2 style={sectionHeading}>Welcome to L&amp;R Homes</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--fg2)', marginBottom: 28, maxWidth: 480 }}>
              L&amp;R Homes builds custom, European-inspired residences on generous lots throughout Rochester Hills.
              Fifty years of hands-on craftsmanship means an elevated building experience from groundbreaking to
              move-in — your site or ours.
            </p>
            <a href="#about" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-brand-gold-dark)', borderBottom: '1px solid var(--color-brand-gold)', paddingBottom: 4 }}>
              About Us
            </a>
          </div>
          <div style={{ position: 'relative', height: 440 }}>
            <img
              src="/assets/home/coachwood-exterior-2.png"
              alt="L&amp;R Homes custom residence"
              loading="lazy"
              style={{ position: 'absolute', top: 0, left: 0, width: '78%', height: '85%', objectFit: 'cover', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-2)' }}
            />
            <img
              src="/assets/home/kitchen-staged-1.png"
              alt="Custom kitchen"
              loading="lazy"
              style={{ position: 'absolute', bottom: 0, right: 0, width: '52%', height: '55%', objectFit: 'cover', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-3)', border: '6px solid #fff' }}
            />
          </div>
        </div>
      </section>

      {/* Content block A — image left, text right */}
      <section style={{ padding: '0 40px 96px', background: 'var(--bg1)' }}>
        <div className="simple-grid-2" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <img
            src="/assets/home/family-room-3-staged.png"
            alt="A great room in a custom L&amp;R Homes residence"
            loading="lazy"
            style={{ width: '100%', height: 420, objectFit: 'cover', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-2)' }}
          />
          <div>
            <p style={eyebrow}>Build Your Dream</p>
            <h2 style={sectionHeading}>Your Site or Ours</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--fg2)', marginBottom: 28, maxWidth: 480 }}>
              Flexible, build-to-suit floor plans paired with premium finishes and hands-on management from
              groundbreaking to move-in.
            </p>
            <a href="/homes-available" style={outlineButton}>
              View Homes
            </a>
          </div>
        </div>
      </section>

      {/* Content block B — text left, image right */}
      <section style={{ padding: '0 40px 96px', background: 'var(--bg1)' }}>
        <div className="simple-grid-2 simple-grid-2-reverse" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <p style={eyebrow}>Now Selling &middot; Rochester Hills</p>
            <h2 style={sectionHeading}>Falcon Estates</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--fg2)', marginBottom: 28, maxWidth: 480 }}>
              An upscale enclave of finely appointed homes set on generous lots and framed by mature woodland,
              minutes from downtown Rochester.
            </p>
            <a href="/communities/falcon-estates" style={outlineButton}>
              View Community
            </a>
          </div>
          <img
            src="/assets/home/foyer-staged.png"
            alt="A foyer in a home in Falcon Estates"
            loading="lazy"
            style={{ width: '100%', height: 420, objectFit: 'cover', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-2)' }}
          />
        </div>
      </section>

      {/* Interiors gallery */}
      <section style={{ padding: '0 40px 96px', background: 'var(--bg1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <p style={eyebrow}>Proof of Craft</p>
          <h2 style={sectionHeading}>Every Detail, Considered.</h2>
          <div
            className="simple-gallery-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 36 }}
          >
            {[
              ['/assets/home/kitchen-staged-2.png', "Chef's kitchen"],
              ['/assets/home/primary-suite-staged-4.png', 'Primary suite'],
              ['/assets/home/butlers-pantry-staged.jpg', "Butler's pantry"],
            ].map(([src, alt]) => (
              <img
                key={src}
                src={src}
                alt={alt}
                loading="lazy"
                style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-1)' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tour CTA band */}
      <section
        style={{
          position: 'relative',
          minHeight: 420,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: "url('/assets/home/sitting-room-staged-3.jpg') center / cover no-repeat",
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,10,8,0.68)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 24px' }}>
          <p style={{ ...eyebrow, color: 'var(--color-brand-gold-light)', marginBottom: 16 }}>
            Come See What L&amp;R Homes Can Do For You
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#F2F0E6', marginBottom: 28 }}>
            Schedule a Tour
          </h2>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/contact-us/?intent=tour"
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
              Schedule a Tour
            </a>
            <a
              href="tel:2486568830"
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#F2F0E6',
                border: '1px solid rgba(242,240,230,0.4)',
                padding: '16px 30px',
              }}
            >
              Call 248.656.8830
            </a>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
}
