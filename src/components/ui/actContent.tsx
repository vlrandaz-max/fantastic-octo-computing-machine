import type { ReactNode } from 'react';

export interface ActContentDef {
  id: string;
  wrapperStyle: React.CSSProperties;
  node: ReactNode;
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(212,184,122,0.85)',
};

/**
 * Real, server-rendered copy for each act — the DOM underneath the canvas
 * that Part 2's accessibility note requires ("SEO requires a real DOM
 * underneath the canvas... independent of whether WebGL loads at all").
 * GSAP drives each container's opacity from the master scroll timeline;
 * the text itself never depends on WebGL to exist or be readable.
 */
export const ACT_CONTENT: ActContentDef[] = [
  // 0 — The Quarry: no CTA, no text beyond the value-prop line (Part 3),
  // which is attached to this container and timed to appear as the
  // monogram resolves.
  {
    id: 'quarry',
    wrapperStyle: { left: 32, bottom: 32, maxWidth: 520 },
    node: (
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em', color: 'rgba(242,240,230,0.7)' }}>
        L&amp;R Homes — Custom Builders since 1973 — Rochester Hills, MI.
      </p>
    ),
  },
  // 1 — The Cut: brand recognition. The monogram itself is the visual;
  // this is the accessible equivalent for anyone not seeing the canvas.
  {
    id: 'cut',
    wrapperStyle: { left: '50%', top: '38%', transform: 'translate(-50%, -50%)', textAlign: 'center' },
    node: (
      <h1 className="visually-hidden">L&amp;R Homes, Inc. — Custom Builders</h1>
    ),
  },
  // 2 — The Frame: orientation. Nav resolving is the content; nothing
  // else competes with it.
  {
    id: 'frame',
    wrapperStyle: { left: 32, top: '46%' },
    node: null,
  },
  // 3 — The Threshold: primary headline + one-line positioning + first CTA.
  {
    id: 'threshold',
    wrapperStyle: { left: 48, bottom: '18%', maxWidth: 620 },
    node: (
      <div>
        <p style={labelStyle}>Rochester Hills, Michigan · Since 1973</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(2.25rem,4.5vw,3.75rem)', color: '#F2F0E6', lineHeight: 1.05, margin: '10px 0 12px' }}>
          Fifty Years of Building,
          <br />
          One Home at a Time.
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(242,240,230,0.65)', maxWidth: 460, marginBottom: 22 }}>
          Custom, European-inspired homes — your site or ours.
        </p>
        <a
          href="#household"
          style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#131210',
            background: 'var(--color-brand-gold)',
            padding: '13px 26px',
            borderRadius: 'var(--radius-xs)',
          }}
        >
          See Our Work
        </a>
      </div>
    ),
  },
  // 4 — The Household: proof of craft, soft engagement.
  {
    id: 'household',
    wrapperStyle: { right: 48, top: '20%', maxWidth: 320, textAlign: 'right' },
    node: (
      <div>
        <p style={labelStyle}>Proof of Craft</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '1.9rem', color: '#F2F0E6', margin: '10px 0 16px' }}>
          Every Detail, Considered.
        </h3>
        <a href="/gallery" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-gold-light)' }}>
          View Full Gallery →
        </a>
      </div>
    ),
  },
  // 5 — The Land: primary funnel branch.
  {
    id: 'land',
    wrapperStyle: { left: '50%', bottom: '14%', transform: 'translateX(-50%)', width: '100%', maxWidth: 900, textAlign: 'center' },
    node: null, // rendered by CommunityBranch, composed in CinematicExperience
  },
  // 6 — The Invitation: primary conversion.
  {
    id: 'invitation',
    wrapperStyle: { left: '50%', top: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', maxWidth: 560 },
    node: null, // rendered by InvitationCTA, composed in CinematicExperience
  },
];
