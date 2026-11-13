import { useState } from 'react';
import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { ExploreTiles } from './ExploreTiles';
import { COMPANY, FALCON_ESTATES_HOMES, PINE_WOODS_HOMES, STATUS_LABEL } from '../../data/site';
import { withBase } from '../../lib/url';

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-gold-dark)',
};

// Six slides: the shared `.classic-bg-slide` crossfade (global.css) is
// timed for exactly six. Exteriors and interiors alternate across The
// Grandeur, The Majestic and The Heritage.
const HERO_SLIDES = [
  { src: withBase('/assets/home/coachwood-twilight-final.jpg'), position: 'center 62%' },
  { src: withBase('/assets/home/grandeur-kitchen-staged.jpg'), position: 'center' },
  { src: withBase('/assets/pine-woods/majestic-twilight-1-wide.jpg'), position: 'center 65%' },
  { src: withBase('/assets/home/grandeur-family-room.jpg'), position: 'center' },
  { src: withBase('/assets/pine-woods/heritage-twilight-4.jpg'), position: 'center 78%' },
  { src: withBase('/assets/home/grandeur-primary-suite.jpg'), position: 'center' },
];

// The first home still for sale — so the photo always shows something a
// visitor can actually tour.
const FEATURED_HOME = [...FALCON_ESTATES_HOMES, ...PINE_WOODS_HOMES].find((h) => h.status !== 'sold');

/**
 * Contact Us — the single destination every CTA across the site points
 * to. No form: per the original design brief, these pages collect no
 * submissions, so a phone/email/mailto is the honest interaction rather
 * than a form with nothing to submit it to. Reads `?home=` or `?intent=`
 * from the URL to prefill context, matching how property-detail CTAs
 * were specified to pass the home slug along.
 */
export function ContactUsPage() {
  const [homeParam] = useState(() =>
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('home') : null,
  );

  const subject = homeParam ? `Inquiry about ${homeParam}` : 'General Inquiry';
  const mailtoHref = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}`;

  return (
    <div style={{ background: '#FFFFFF' }}>
      <div style={{ position: 'relative' }}>
        <SimpleNav />
      </div>

      <main>
      {/* Hero — crossfading photo rotation, same treatment as Falcon Estates */}
      <section className="contact-hero">
        <div style={{ position: 'absolute', inset: 0 }}>
          {HERO_SLIDES.map((slide) => (
            <div
              key={slide.src}
              className="classic-bg-slide"
              style={{ backgroundImage: `url('${slide.src}')`, backgroundPosition: slide.position }}
            />
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(95deg, rgba(16,20,30,0.88) 0%, rgba(16,20,30,0.5) 42%, rgba(16,20,30,0.12) 75%), linear-gradient(to top, rgba(12,16,24,0.8) 0%, rgba(12,16,24,0.05) 50%)',
          }}
        />
        <div className="contact-hero-content">
          <p style={{ ...eyebrow, color: 'var(--color-brand-gold-light)' }}>Get in Touch</p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(2.75rem,5.5vw,4.75rem)',
              color: '#F2F0E6',
              lineHeight: 1.05,
              margin: '14px 0 14px',
            }}
          >
            Your Next Home Awaits
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1.15rem,2vw,1.5rem)', color: 'rgba(242,240,230,0.8)' }}>
            Call, email, or arrange a private showing in Rochester Hills.
          </p>
        </div>
      </section>

      <section style={{ padding: '72px 40px 88px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }} className="simple-grid-2">
          <div>
            <p style={{ ...eyebrow, marginBottom: 18 }}>Reach Us Directly</p>
            {homeParam && (
              <p style={{ fontSize: 14, color: 'var(--fg3)', marginBottom: 16 }}>
                Mention <em style={{ fontStyle: 'italic', color: 'var(--fg2)' }}>{homeParam}</em> and we&rsquo;ll have details ready.
              </p>
            )}
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--fg2)', marginBottom: 32, maxWidth: 440 }}>
              Reach out and a member of our team will walk you through what&rsquo;s currently available, or arrange a
              private showing at your convenience.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg3)', marginBottom: 4 }}>
                  Call
                </p>
                <a href={COMPANY.phoneHref} className="nav-link-hover" style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--color-brand-dark)' }}>
                  {COMPANY.phone}
                </a>
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg3)', marginBottom: 4 }}>
                  Email
                </p>
                <a href={mailtoHref} className="nav-link-hover" style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-brand-dark)' }}>
                  {COMPANY.email}
                </a>
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg3)', marginBottom: 4 }}>
                  Office
                </p>
                <p style={{ fontSize: 16, color: 'var(--fg2)', lineHeight: 1.6 }}>{COMPANY.address}</p>
              </div>
            </div>

            <a
              href={mailtoHref}
              className="classic-btn-primary classic-hover-float"
              style={{ marginTop: 36 }}
            >
              Send Us a Message
            </a>
          </div>

          {FEATURED_HOME && (
            <a
              href={FEATURED_HOME.href}
              className="photo-zoom"
              style={{ height: '100%', minHeight: 320, boxShadow: 'var(--shadow-2)' }}
            >
              <img
                src={FEATURED_HOME.image}
                alt={`${FEATURED_HOME.name} at ${FEATURED_HOME.community}`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                  padding: '48px 22px 18px',
                  background: 'linear-gradient(180deg, rgba(11,11,11,0) 0%, rgba(11,11,11,0.82) 100%)',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '2px 16px',
                  color: '#F2F0E6',
                }}
              >
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>
                  {FEATURED_HOME.name} · {FEATURED_HOME.community}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-brand-gold-light)', whiteSpace: 'nowrap' }}>
                  {STATUS_LABEL[FEATURED_HOME.status]}
                </span>
              </span>
            </a>
          )}
        </div>
      </section>

      {/* Explore — the same photo tiles as the homepage */}
      <section style={{ padding: '80px 32px 96px', background: 'var(--bg1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <p style={eyebrow}>Keep Exploring</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(1.9rem,3.5vw,2.6rem)',
              color: 'var(--color-brand-dark)',
              lineHeight: 1.15,
              marginTop: 12,
            }}
          >
            Communities, Homes &amp; Gallery
          </h2>
          <ExploreTiles />
        </div>
      </section>
      </main>

      <SimpleFooter />
    </div>
  );
}
