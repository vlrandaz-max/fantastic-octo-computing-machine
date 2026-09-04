import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { HomeCard } from './HomeCard';
import { COMPANY, FALCON_ESTATES, FALCON_ESTATES_HOMES } from '../../data/site';

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
 * footer) but built entirely from L&R Homes' own brand tokens and real
 * copy transcribed from the live landrhomes.com site. No 3D, no scroll
 * choreography — just a well-composed, conventional site.
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
          flexDirection: 'column',
          justifyContent: 'flex-end',
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
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '0 24px 56px', maxWidth: 900, margin: '0 auto' }}>
          <p style={{ ...eyebrow, color: 'var(--color-brand-gold-light)', marginBottom: 20 }}>
            {COMPANY.foundedBadge}
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
            {COMPANY.name}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: 'rgba(242,240,230,0.75)',
              maxWidth: 640,
              margin: '0 auto',
            }}
          >
            {COMPANY.tagline}
          </p>
        </div>
        {/* Stats bar */}
        <div style={{ position: 'relative', zIndex: 5, display: 'flex', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {COMPANY.stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '24px 16px',
                background: 'rgba(16,20,30,0.55)',
                borderRight: i < COMPANY.stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : undefined,
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 300, color: '#F2F0E6' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,240,230,0.6)', marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
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
            <p style={eyebrow}>{COMPANY.ourStory.eyebrow}</p>
            <h2 style={sectionHeading}>{COMPANY.ourStory.heading}</h2>
            {COMPANY.ourStory.body.map((p) => (
              <p key={p} style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--fg2)', marginBottom: 16, maxWidth: 480 }}>
                {p}
              </p>
            ))}
            <a href="/homes-available" style={{ ...outlineButton, marginTop: 12 }}>
              View Available Homes
            </a>
          </div>
          <div style={{ position: 'relative', height: 440 }}>
            <img
              src="/assets/home/grandeur-exterior.jpg"
              alt="The Grandeur — an L&amp;R Homes residence at twilight"
              loading="lazy"
              style={{ position: 'absolute', top: 0, left: 0, width: '78%', height: '65%', objectFit: 'cover', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-2)' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '52%',
                height: '55%',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-3)',
                border: '6px solid #fff',
                overflow: 'hidden',
                background: "url('/assets/home/family-room-3-staged.jpg') center / cover no-repeat",
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(0deg, rgba(12,10,8,0.55) 0%, rgba(12,10,8,0) 55%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 16,
                }}
              >
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 17, color: '#F2F0E6' }}>
                  {COMPANY.ourStory.photoCaption.title}
                </p>
                <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,240,230,0.75)' }}>
                  {COMPANY.ourStory.photoCaption.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* See What We've Built */}
      <section style={{ padding: '88px 40px', background: 'linear-gradient(180deg, #1c2840 0%, #192038 100%)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ ...eyebrow, color: 'var(--color-brand-gold-light)' }}>Our Homes</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(2.25rem,4vw,3rem)', color: '#F2F0E6', margin: '14px 0 20px' }}>
            See What We&rsquo;ve Built
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(242,240,230,0.7)', maxWidth: 720, margin: '0 auto 44px' }}>
            Each home is designed with its own distinct style and character, shaped by the property and its
            surroundings, built with a timeless quality meant to last. The Grandeur is our current move-in ready
            home — the homes below are examples of that same craftsmanship, each already sold.
          </p>
          <div
            className="simple-gallery-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, textAlign: 'left' }}
          >
            {FALCON_ESTATES_HOMES.map((home) => (
              <HomeCard key={home.name} home={home} dark />
            ))}
          </div>
        </div>
      </section>

      {/* Falcon Estates */}
      <section id="falcon-estates" style={{ padding: '96px 40px', background: 'var(--bg1)' }}>
        <div className="simple-grid-2" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <p style={eyebrow}>{FALCON_ESTATES.eyebrow}</p>
            <h2 style={sectionHeading}>{FALCON_ESTATES.name}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--fg2)', marginBottom: 28, maxWidth: 480 }}>
              {FALCON_ESTATES.body}
            </p>
            <a href="/homes-available" style={outlineButton}>
              View Homes
            </a>
          </div>
          <img
            src="/assets/home/foyer-staged.jpg"
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

      {/* CTA band */}
      <section
        style={{
          position: 'relative',
          minHeight: 380,
          display: 'flex',
          alignItems: 'center',
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
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,10,8,0.72)' }} />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 1280,
            margin: '0 auto',
            width: '100%',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 32,
          }}
        >
          <div>
            <p style={{ ...eyebrow, color: 'var(--color-brand-gold-light)', marginBottom: 16 }}>{COMPANY.ctaBand.eyebrow}</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(2.25rem,4.5vw,3.25rem)', color: '#F2F0E6', marginBottom: 12 }}>
              {COMPANY.ctaBand.heading}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(242,240,230,0.65)' }}>{COMPANY.address}</p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a
              href={COMPANY.phoneHref}
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
              Call {COMPANY.phone}
            </a>
            <a
              href="/homes-available"
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
              View All Homes
            </a>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
}
