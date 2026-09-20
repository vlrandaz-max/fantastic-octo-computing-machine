import { useEffect, useRef } from 'react';
import { ClassicNav } from './ClassicNav';
import { ClassicFooter } from './ClassicFooter';
import { Reveal } from '../Reveal';
import { COMPANY } from '../../data/site';
import { withBase } from '../../lib/url';

const kicker: React.CSSProperties = {
  fontFamily: "'Jost', var(--font-body)",
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-gold-dark)',
};

const heading: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', var(--font-display)",
  fontWeight: 300,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  fontSize: 'clamp(2.5rem, 4.5vw, 3.6rem)',
  color: 'var(--color-brand-dark)',
  lineHeight: 1.05,
  margin: '16px 0 22px',
  overflowWrap: 'break-word',
};

const EXPLORE_CARDS = [
  { label: 'Falcon Estates', image: withBase('/assets/home/crestwood-twilight-2026.jpg'), href: withBase('/falcon-estates-rochester-hills') },
  { label: 'Pine Woods', image: withBase('/assets/pine-woods/majestic-twilight-2.jpg'), href: withBase('/pine-woods') },
  { label: 'Homes Available', image: withBase('/assets/home/coachwood-twilight-final.jpg'), href: withBase('/homes-available') },
  { label: 'Gallery', image: withBase('/assets/home/dining-room-staged-2.jpg'), href: withBase('/gallery') },
];

const CTA_SLIDES = [
  withBase('/assets/home/coachwood-aerial-twilight-2.jpg'),
  withBase('/assets/home/grandeur-kitchen-optimized.jpg'),
  withBase('/assets/home/coachwood-rear-aerial-mls-2.jpg'),
  withBase('/assets/home/grandeur-primary-suite.jpg'),
  withBase('/assets/home/coachwood-rear-aerial-mls.jpg'),
  withBase('/assets/home/family-room-3-staged.jpg'),
];

/**
 * A homepage variant structured after rh.house's restaurant-marketing
 * template: sticky two-tier dark nav, full-bleed video hero with a
 * flanking-line subtitle badge, an offset two-photo collage in the About
 * section against a faint gold trellis pattern, stem-labeled photo cards,
 * a dark crossfading CTA band, and a centered contact footer — carrying
 * rh.house's Cormorant Garamond / Jost type pairing and outline/underline
 * button language, built entirely from L&R Homes' own real copy, facts,
 * and photography.
 */
const HERO_POSTER_HOLD_MS = 2000;

export function ClassicHomePage() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      heroVideoRef.current?.play().catch(() => {});
    }, HERO_POSTER_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div style={{ background: '#FFFFFF' }}>
      <ClassicNav />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <video
          ref={heroVideoRef}
          muted
          loop
          playsInline
          poster={withBase('/assets/home/coachwood-aerial-twilight-2.jpg')}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={withBase('/assets/video/household-tour.mp4')} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,11,11,0.48)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1150, margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', var(--font-display)",
              fontWeight: 300,
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              fontSize: 'clamp(1.8rem, 4.6vw, 3.6rem)',
              color: '#F8F4EE',
              lineHeight: 1.15,
              marginBottom: 26,
              overflowWrap: 'break-word',
            }}
          >
            Time-Honored Craftsmanship, Thoughtfully Designed
          </h1>
          <p className="classic-flanked" style={{ color: '#F8F4EE', marginBottom: 36 }}>
            L&amp;R Homes
          </p>
          <a href="#about-us" className="classic-btn-outline classic-hover-float" style={{ color: '#F8F4EE' }}>
            Learn More
          </a>
        </div>
      </section>

      {/* About Us */}
      <section id="about-us" className="classic-pattern-bg" style={{ padding: '100px 32px' }}>
        <div className="classic-grid-2" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <Reveal type="fade-in-down">
              <p style={kicker}>Modern Craftsmanship in a Trusted Name</p>
            </Reveal>
            <Reveal type="fade-in-down" delay={120}>
              <h2 style={heading}>
                Welcome
                <br />
                To L&amp;R Homes
              </h2>
            </Reveal>
            {COMPANY.ourStory.body.map((p, i) => (
              <Reveal key={p} type="fade-in" delay={260 + i * 100}>
                <p style={{ fontFamily: "'Jost', var(--font-body)", fontSize: 16, lineHeight: 1.85, color: 'var(--fg2)', marginBottom: 16, maxWidth: 480 }}>
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal type="fade-in-up" delay={480}>
              <a href={withBase('/homes-available')} className="classic-btn-underline" style={{ marginTop: 10 }}>
                About Us
              </a>
            </Reveal>
          </div>
          <div className="classic-collage" style={{ position: 'relative', height: 520 }}>
            <Reveal type="fade-in-left" style={{ position: 'absolute', left: 0, bottom: 0, width: '58%', height: '82%' }}>
              <span className="photo-zoom" style={{ width: '100%', height: '100%', boxShadow: 'var(--shadow-2)' }}>
                <img
                  src={withBase('/assets/home/grandeur-exterior-twilight.jpg')}
                  alt="An L&amp;R Homes residence at twilight"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </span>
            </Reveal>
            <Reveal type="fade-in-right" delay={200} className="classic-collage-offset" style={{ position: 'absolute', right: 0, top: 0, width: '48%', height: '68%' }}>
              <span className="photo-zoom" style={{ width: '100%', height: '100%', boxShadow: 'var(--shadow-3)' }}>
                <img
                  src={withBase('/assets/home/kitchen-full-run.jpg')}
                  alt="A kitchen in an L&amp;R Homes residence"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Explore */}
      <section style={{ padding: '100px 32px', background: 'var(--bg1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <p className="classic-flanked" style={{ color: 'var(--color-brand-gold-dark)', marginBottom: 20 }}>
            Where We Build
          </p>
          <h2 style={heading}>Explore Our Communities</h2>
          <div className="classic-explore-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginTop: 56 }}>
            {EXPLORE_CARDS.map((card, i) => (
              <Reveal key={card.label} type="fade-in-up" delay={i * 100}>
                <a href={card.href} className="classic-stem-card">
                  <span className="classic-stem-photo">
                    <img
                      src={card.image}
                      alt={card.label}
                      loading="lazy"
                      style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }}
                    />
                  </span>
                  <span className="classic-stem-line" />
                  <span
                    className="classic-btn-outline classic-hover-float"
                    style={{ color: 'var(--color-brand-dark)', borderColor: 'var(--color-brand-gold)' }}
                  >
                    {card.label}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* New Construction CTA */}
      <section style={{ position: 'relative', minHeight: 540, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          {CTA_SLIDES.map((src) => (
            <div key={src} className="classic-bg-slide" style={{ backgroundImage: `url('${src}')` }} />
          ))}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,11,11,0.66)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '0 32px', width: '100%', textAlign: 'center' }}>
          <p className="classic-flanked" style={{ color: 'var(--color-brand-gold-light)', marginBottom: 20 }}>
            New Construction
          </p>
          <h2 style={{ ...heading, color: '#F8F4EE', margin: '0 auto 24px' }}>Specializing In Move-In Ready Homes</h2>
          <p style={{ fontFamily: "'Jost', var(--font-body)", fontSize: 16, lineHeight: 1.85, color: 'rgba(248,244,238,0.82)', maxWidth: 640, margin: '0 auto 32px' }}>
            {COMPANY.ourStory.body[2]}
          </p>
          <a href={withBase('/homes-available')} className="classic-btn-outline classic-hover-float" style={{ color: '#F8F4EE' }}>
            View Homes
          </a>
        </div>
      </section>

      <ClassicFooter />
    </div>
  );
}
