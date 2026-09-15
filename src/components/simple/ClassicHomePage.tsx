import { ClassicNav } from './ClassicNav';
import { ClassicFooter } from './ClassicFooter';
import { AccordionGallery } from './AccordionGallery';
import { COMPANY } from '../../data/site';

const eyebrow: React.CSSProperties = {
  fontFamily: "'Montserrat', var(--font-body)",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-gold-dark)',
};

const heading: React.CSSProperties = {
  fontFamily: "'Montserrat', var(--font-body)",
  fontWeight: 800,
  fontSize: 'clamp(2.25rem, 4vw, 3.1rem)',
  color: 'var(--color-brand-dark)',
  lineHeight: 1.1,
  margin: '14px 0 22px',
};

const solidButton: React.CSSProperties = {
  display: 'inline-block',
  background: 'var(--color-brand-gold)',
  color: '#161310',
  fontFamily: "'Montserrat', var(--font-body)",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '0.06em',
  padding: '15px 30px',
};

const CTA_SLIDES = [
  '/assets/home/grandeur-exterior-twilight.jpg',
  '/assets/home/coachwood-front-twilight.jpg',
  '/assets/home/family-room-3-staged.jpg',
];

/**
 * A homepage variant structured after a bold-sans, video-hero
 * homebuilder marketing template (sticky black nav with a "Build"
 * dropdown, full-bleed video hero, an About Us split section, a
 * hover-accordion photo band, a dark CTA band with a slow-crossfading
 * background, and a light contact footer) — built entirely from L&R
 * Homes' own real copy, facts, and photography.
 */
export function ClassicHomePage() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      <ClassicNav />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/home/grandeur-exterior-twilight.jpg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/assets/video/household-tour.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,13,10,0.5)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 980, margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
          <h1
            style={{
              fontFamily: "'Montserrat', var(--font-body)",
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 5.5vw, 3.75rem)',
              color: '#F8F4EE',
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Time-Honored Craftsmanship, Built To Last
          </h1>
          <p style={{ fontFamily: "'Montserrat', var(--font-body)", fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(248,244,238,0.85)', marginBottom: 32 }}>
            Metro Detroit&rsquo;s Custom Home Builder Since 1973
          </p>
          <a
            href="#about-us"
            style={{
              display: 'inline-block',
              border: '1px solid rgba(248,244,238,0.7)',
              color: '#F8F4EE',
              fontFamily: "'Montserrat', var(--font-body)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.1em',
              padding: '16px 34px',
            }}
          >
            LEARN MORE
          </a>
        </div>
      </section>

      {/* About Us */}
      <section id="about-us" style={{ padding: '96px 32px' }}>
        <div className="classic-grid-2" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <p style={eyebrow}>About Us</p>
            <h2 style={heading}>{COMPANY.ourStory.heading}</h2>
            {COMPANY.ourStory.body.map((p) => (
              <p key={p} style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--fg2)', marginBottom: 16, maxWidth: 480 }}>
                {p}
              </p>
            ))}
            <a href="/homes-available" style={{ ...solidButton, marginTop: 10 }}>
              Discover More
            </a>
          </div>
          <img
            src="/assets/home/grandeur-exterior-twilight.jpg"
            alt="An L&amp;R Homes residence at twilight"
            loading="lazy"
            style={{ width: '100%', height: 480, objectFit: 'cover', borderRadius: '4px 4px 4px 120px', boxShadow: 'var(--shadow-2)' }}
          />
        </div>
      </section>

      {/* Photo accordion */}
      <AccordionGallery
        images={[
          { src: '/assets/home/kitchen-full-run.jpg', alt: "A chef's kitchen in an L&R Homes residence" },
          { src: '/assets/home/primary-suite-staged-4.png', alt: 'A primary suite in an L&R Homes residence' },
          { src: '/assets/home/family-room-3-staged.jpg', alt: 'A family room in an L&R Homes residence' },
          { src: '/assets/home/foyer-staged.jpg', alt: 'A foyer in an L&R Homes residence' },
          { src: '/assets/home/dining-room-staged-2.jpg', alt: 'A dining room in an L&R Homes residence' },
        ]}
      />

      {/* New Construction CTA */}
      <section style={{ position: 'relative', minHeight: 520, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          {CTA_SLIDES.map((src) => (
            <div key={src} className="classic-bg-slide" style={{ backgroundImage: `url('${src}')` }} />
          ))}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,10,8,0.68)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '0 32px', width: '100%' }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ ...eyebrow, color: 'var(--color-brand-gold-light)' }}>New Construction</p>
            <h2 style={{ ...heading, color: '#F8F4EE' }}>Specializing In Move-In Ready Homes</h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(248,244,238,0.8)', marginBottom: 12 }}>
              {COMPANY.ourStory.body[2]}
            </p>
            <p style={{ fontSize: 14, color: 'rgba(248,244,238,0.65)', marginBottom: 26 }}>
              Learn More About Our Current Homes
            </p>
            <a href="/homes-available" style={solidButton}>
              View Homes
            </a>
          </div>
        </div>
      </section>

      <ClassicFooter />
    </div>
  );
}
