import { useState } from 'react';
import { COMPANY } from '../../data/site';

const LINKS = [
  { label: 'Home', href: '/classic' },
  { label: 'About Us', href: '#about-us' },
  {
    label: 'Build',
    children: [
      { label: 'Falcon Estates', href: '/falcon-estates-rochester-hills' },
      { label: 'Homes Available', href: '/homes-available' },
      { label: 'Pine Woods', href: '/pine-woods' },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact-us' },
];

const linkStyle: React.CSSProperties = {
  fontFamily: "'Jost', var(--font-body)",
  fontSize: 14,
  fontWeight: 500,
  color: '#F2F0E6',
};

/**
 * Sticky, always-solid dark header — a thin info bar (address / phone /
 * email) over a main row with logo left and a hover/click "Build"
 * dropdown right, styled after rh.house's two-tier restaurant-site
 * header: Jost for nav/body type, an outlined CTA button rather than a
 * filled one.
 */
export function ClassicNav() {
  const [open, setOpen] = useState(false);
  const [buildOpen, setBuildOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: 'rgba(11,11,11,0.96)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="classic-info-bar"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 36,
          padding: '9px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          fontFamily: "'Jost', var(--font-body)",
          fontSize: 12,
          letterSpacing: '0.04em',
          color: 'rgba(242,240,230,0.7)',
        }}
      >
        <span>{COMPANY.addressShort}</span>
        <a href={COMPANY.phoneHref} style={{ color: 'inherit' }}>
          {COMPANY.phone}
        </a>
        <a href={`mailto:${COMPANY.email}`} style={{ color: 'inherit' }}>
          {COMPANY.email}
        </a>
      </div>

      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a href="/classic" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span className="classic-title" style={{ fontSize: 24, letterSpacing: '0.05em', color: '#F2F0E6' }}>
            L&amp;R Homes
          </span>
          <span style={{ fontFamily: "'Jost', var(--font-body)", fontSize: 10, fontWeight: 500, letterSpacing: '0.28em', color: 'var(--color-brand-gold-light)' }}>
            TIME-HONORED SINCE 1973
          </span>
        </a>

        <nav aria-label="Primary" className="classic-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          {LINKS.map((link) =>
            link.children ? (
              <div
                key={link.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => setBuildOpen(true)}
                onMouseLeave={() => setBuildOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setBuildOpen((v) => !v)}
                  aria-expanded={buildOpen}
                  style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  {link.label}
                  <span style={{ fontSize: 10 }}>▾</span>
                </button>
                {buildOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: 10,
                      background: '#0b0b0b',
                      border: '1px solid rgba(255,255,255,0.1)',
                      minWidth: 200,
                      padding: '8px 0',
                      boxShadow: 'var(--shadow-3)',
                    }}
                  >
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        style={{ ...linkStyle, display: 'block', padding: '10px 18px' }}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a key={link.label} href={link.href} style={linkStyle}>
                {link.label}
              </a>
            )
          )}
          <a href={COMPANY.phoneHref} className="classic-btn-outline classic-hover-float" style={{ color: '#F2F0E6' }}>
            Find a Home
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="classic-nav-burger"
          style={{ display: 'none', color: '#F2F0E6', fontSize: 22, background: 'none', border: 'none' }}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="classic-nav-drawer" style={{ background: '#0b0b0b', padding: '10px 24px 26px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {LINKS.flatMap((link) => (link.children ? link.children : [link])).map((link) => (
            <a key={link.label} href={link.href} style={{ ...linkStyle, padding: '10px 0' }}>
              {link.label}
            </a>
          ))}
          <a
            href={COMPANY.phoneHref}
            className="classic-btn-outline"
            style={{ color: '#F2F0E6', textAlign: 'center', marginTop: 10 }}
          >
            {COMPANY.phone}
          </a>
        </div>
      )}
    </header>
  );
}
