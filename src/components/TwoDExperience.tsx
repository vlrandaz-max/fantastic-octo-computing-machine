import { Footer } from './ui/Footer';
import { CommunityBranch } from './ui/CommunityBranch';
import { InvitationCTA } from './ui/InvitationCTA';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * The `prefers-reduced-motion` / mobile path (Part 2's accessibility note
 * and Part 5 step 9): "a genuinely different site, not a crippled one."
 * Same tokens, type, palette and photography as the cinematic experience,
 * laid out as a conventional scroll — no camera choreography, no canvas.
 */
export function TwoDExperience() {
  // This page serves two different audiences: mobile visitors (motion is
  // fine) and visitors who explicitly asked for prefers-reduced-motion
  // (autoplaying video is exactly what that preference exists to avoid).
  // Only autoplay the walkthrough footage for the former.
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div id="top" style={{ background: 'var(--color-brand-black)' }}>
      <a href="#footer-content" className="skip-link">
        Skip to contact &amp; navigation
      </a>

      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px var(--space-6)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--fg-inverse)' }}>
          L&amp;R Homes, Inc.
        </span>
        <a
          href="/contact-us/?intent=tour"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#131210',
            background: 'var(--color-brand-gold)',
            padding: '10px 16px',
            borderRadius: 'var(--radius-xs)',
          }}
        >
          Schedule a Tour
        </a>
      </header>

      {/* I–III: Quarry / Cut / Frame, collapsed to a single considered hero */}
      <section
        className="section-2d"
        style={{
          minHeight: '78vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background:
            "linear-gradient(180deg, rgba(12,10,8,0.55) 0%, rgba(12,10,8,0.15) 45%, rgba(12,10,8,0.75) 100%), url('/assets/home/falcon-estates-hero.jpg') center 55% / cover no-repeat",
        }}
      >
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(242,240,230,0.7)', marginBottom: 18 }}>
          L&amp;R Homes — Custom Builders since 1973 — Rochester Hills, MI.
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(2.5rem,7vw,4.5rem)',
            color: '#F2F0E6',
            lineHeight: 1.05,
            marginBottom: 16,
            maxWidth: 720,
          }}
        >
          Fifty Years of Building,
          <br />
          One Home at a Time.
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(242,240,230,0.7)', maxWidth: 460, marginBottom: 24 }}>
          Custom, European-inspired homes in Rochester Hills, Michigan — your site or ours.
        </p>
        <a
          href="#household"
          style={{
            display: 'inline-block',
            width: 'fit-content',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#131210',
            background: 'var(--color-brand-gold)',
            padding: '15px 28px',
            borderRadius: 'var(--radius-xs)',
          }}
        >
          See Our Work
        </a>
      </section>

      {/* V: The Household */}
      <section id="household" className="section-2d" style={{ background: 'var(--bg1)' }}>
        <p className="eyebrow">Proof of Craft</p>
        <span className="section-rule" style={{ margin: '12px 0 20px' }} />
        <h2 style={{ fontSize: 'var(--text-display-md)', color: 'var(--color-brand-dark)', marginBottom: 32 }}>
          Every Detail, Considered.
        </h2>
        {reducedMotion ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              ['/assets/home/kitchen-full-run.jpg', "Chef's kitchen"],
              ['/assets/home/family-room-1-staged.jpg', 'Great room'],
              ['/assets/home/primary-suite-1-staged.png', 'Primary suite'],
            ].map(([src, alt]) => (
              <img
                key={src}
                src={src}
                alt={alt}
                loading="lazy"
                style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />
            ))}
          </div>
        ) : (
          <video
            src="/assets/video/household-tour.mp4"
            poster="/assets/home/kitchen-full-run.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            style={{ width: '100%', maxHeight: 480, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
          />
        )}
        <a
          href="/gallery"
          style={{
            display: 'inline-block',
            marginTop: 24,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--fg-accent)',
          }}
        >
          View Full Gallery →
        </a>
      </section>

      {/* VI: The Land */}
      <section
        id="land"
        className="section-2d"
        style={{
          background: "linear-gradient(180deg, rgba(28,40,64,0.82), rgba(25,32,56,0.92)), url('/assets/home/coachwood-aerial-dusk-front.jpg') center / cover no-repeat",
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: 'var(--text-display-md)', color: '#F2F0E6', marginBottom: 32 }}>
          Choose Your Community.
        </h2>
        <CommunityBranch />
      </section>

      {/* VII: The Invitation */}
      <section
        id="invitation"
        className="section-2d"
        style={{ background: 'linear-gradient(135deg, #1c2840 0%, #2a2018 60%, #1e1a10 100%)', textAlign: 'center' }}
      >
        <InvitationCTA />
      </section>

      <div id="footer-content">
        <Footer />
      </div>
    </div>
  );
}
