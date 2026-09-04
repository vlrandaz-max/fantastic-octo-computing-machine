import { useExperienceState } from '../../state/experience';

const LINKS = [
  { label: 'Homes Available', href: '#land' },
  { label: 'Communities', href: '#land' },
  { label: 'Build With Us', href: '#invitation' },
  { label: 'About', href: '#threshold' },
];

/**
 * Persistent nav. Visually it "resolves into the structural datum line"
 * at Act III (Part 2), but it is real, keyboard-focusable markup from the
 * very first frame — the accessibility note in Part 2 requires a direct
 * nav path from Act I onward, so this is never display:none.
 */
export function Nav() {
  const { navResolved } = useExperienceState();

  return (
    <nav
      id="site-nav"
      aria-label="Primary"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 72,
        padding: '0 var(--space-10)',
        opacity: navResolved ? 1 : 0,
        transform: navResolved ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'opacity 500ms var(--ease-out), transform 500ms var(--ease-out)',
        pointerEvents: navResolved ? 'auto' : 'none',
      }}
    >
      <a
        href="#top"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 15,
          color: 'var(--fg-inverse)',
          letterSpacing: '0.02em',
        }}
      >
        L&amp;R Homes, Inc.
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(242,240,230,0.85)',
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#invitation"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#131210',
            background: 'var(--color-brand-gold)',
            padding: '10px 18px',
            borderRadius: 'var(--radius-xs)',
          }}
        >
          Schedule a Tour
        </a>
      </div>
    </nav>
  );
}
