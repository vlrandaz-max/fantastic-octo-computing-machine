import { useEffect, useRef, useState } from 'react';
import { ClassicNav } from './ClassicNav';
import { ClassicFooter } from './ClassicFooter';
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
  { label: 'Falcon Estates', image: withBase('/assets/home/falcon-estates-hero.jpg'), href: withBase('/falcon-estates-rochester-hills') },
  { label: 'Pine Woods', image: withBase('/assets/pine-woods/heritage-exterior-twilight.jpg'), href: withBase('/pine-woods') },
  { label: 'Homes Available', image: withBase('/assets/home/grandeur-exterior-twilight.jpg'), href: withBase('/homes-available') },
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

const ACCORDION_ITEMS = [
  { label: 'Functional Live/Work Space', image: withBase('/assets/home/library-staged.jpg') },
  { label: 'Chef-Ready Kitchens', image: withBase('/assets/home/kitchen-staged-1.jpg') },
  { label: 'Timeless Exteriors', image: withBase('/assets/home/coachwood-aerial-twilight-2.jpg') },
  { label: 'Serene Primary Suites', image: withBase('/assets/home/grandeur-primary-suite.jpg') },
  { label: 'Gathering Spaces', image: withBase('/assets/home/family-room-3-staged.jpg') },
];

type RevealType = 'fade-in-down' | 'fade-in' | 'fade-in-up' | 'fade-in-right' | 'fade-in-left';

/** Tracks whether an element has scrolled into view, once — the shared logic
 * behind Reveal, and behind any element (like a flex/grid item) that needs
 * the animation classes applied directly rather than via a wrapper div. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/** Fades/slides a section in once, the first time it scrolls into view — mirrors the
 * Elementor `_animation` scroll-entrance pattern used throughout lassalehomes.com. */
function Reveal({
  children,
  type,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  type: RevealType;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`classic2-reveal ${type}${visible ? ' is-visible' : ''}`}
      style={{ animationDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </div>
  );
}

/** An accordion panel that slides in from alternating sides as it scrolls into
 * view, then hover-expands like the rest of the accordion once settled. */
function AccordionPanel({ label, image, direction, delay }: { label: string; image: string; direction: RevealType; delay: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`classic2-accordion-item classic2-reveal ${direction}${visible ? ' is-visible' : ''}`}
      style={{ backgroundImage: `url('${image}')`, animationDelay: `${delay}ms` }}
      tabIndex={0}
      role="img"
      aria-label={label}
    >
      <span className="classic2-accordion-caption">{label}</span>
    </div>
  );
}

const HERO_POSTER_HOLD_MS = 2000;

/**
 * A side-by-side variant of /classic: identical nav, hero video, Explore
 * row, CTA slideshow, and footer, but with the section right after the
 * hero replaced by (1) a scroll-animated About block built around a
 * staged kitchen photo and (2) a hover-expand horizontal image accordion
 * — recreating the entrance-animation and ElementsKit "Image Accordion"
 * motion from lassalehomes.com's own homepage, in L&R's own copy and
 * photography, for comparison against /classic's current middle section.
 */
export function Classic2HomePage() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      heroVideoRef.current?.play().catch(() => {});
    }, HERO_POSTER_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div style={{ background: '#FFFFFF' }}>
      <ClassicNav homeHref={withBase('/classic2')} />

      {/* Hero — identical to /classic */}
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
          <a href="#kitchen" className="classic-btn-outline classic-hover-float" style={{ color: '#F8F4EE' }}>
            Learn More
          </a>
        </div>
      </section>

      {/* NEW — scroll-animated About block built around a staged kitchen photo */}
      <section id="kitchen" style={{ padding: '100px 32px' }}>
        <div className="classic-grid-2" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <Reveal type="fade-in-down">
              <p style={kicker}>Custom Homebuilding</p>
            </Reveal>
            <Reveal type="fade-in-down" delay={120}>
              <h2 style={heading}>An Experience Built Around You</h2>
            </Reveal>
            <Reveal type="fade-in" delay={280}>
              <p style={{ fontFamily: "'Jost', var(--font-body)", fontSize: 16, lineHeight: 1.85, color: 'var(--fg2)', marginBottom: 16, maxWidth: 480 }}>
                Whether it&apos;s your first home or the one you&apos;ve always envisioned, you deserve nothing less than
                a home built to your exacting standards — one that reflects your personal style, fulfills every need,
                and exceeds all expectations.
              </p>
            </Reveal>
            <Reveal type="fade-in" delay={360}>
              <p style={{ fontFamily: "'Jost', var(--font-body)", fontSize: 16, lineHeight: 1.85, color: 'var(--fg2)', marginBottom: 16, maxWidth: 480 }}>
                From the kitchen where the family gathers to the details that enrich everyday life, L&amp;R Homes
                crafts distinctive residences with meticulous care and an unrelenting commitment to excellence —
                fifty years of hands-on Rochester Hills craftsmanship, in every cabinet and countertop.
              </p>
            </Reveal>
            <Reveal type="fade-in-up" delay={480}>
              <a href={withBase('/homes-available')} className="classic-btn-underline" style={{ marginTop: 10 }}>
                Discover More
              </a>
            </Reveal>
          </div>
          <Reveal type="fade-in-right" delay={200}>
            <img
              src={withBase('/assets/home/grandeur-kitchen-staged.jpg')}
              alt="A staged kitchen in an L&amp;R Homes residence"
              loading="lazy"
              style={{ width: '100%', height: 520, objectFit: 'cover', boxShadow: 'var(--shadow-3)' }}
            />
          </Reveal>
        </div>
      </section>

      {/* NEW — hover-expand horizontal image accordion */}
      <section style={{ padding: '0 32px 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <Reveal type="fade-in-down">
            <p className="classic-flanked" style={{ color: 'var(--color-brand-gold-dark)', marginBottom: 20 }}>
              Every Room, Considered
            </p>
          </Reveal>
          <Reveal type="fade-in-down" delay={120}>
            <h2 style={heading}>Designed For The Way You Live</h2>
          </Reveal>
          <div className="classic2-accordion" style={{ marginTop: 40 }}>
            {ACCORDION_ITEMS.map((item, i) => (
              <AccordionPanel
                key={item.label}
                label={item.label}
                image={item.image}
                direction={i % 2 === 0 ? 'fade-in-left' : 'fade-in-right'}
                delay={i * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Explore — same cards as /classic, with a staggered slide-in-from-below reveal */}
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
                  <img
                    src={card.image}
                    alt={card.label}
                    loading="lazy"
                    style={{ width: '100%', height: 300, objectFit: 'cover', boxShadow: 'var(--shadow-2)' }}
                  />
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

      {/* New Construction CTA — identical to /classic */}
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

      <ClassicFooter homeHref={withBase('/classic2')} />
    </div>
  );
}
