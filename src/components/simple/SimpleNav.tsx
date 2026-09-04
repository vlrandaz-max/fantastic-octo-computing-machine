import { useState } from 'react';

const LINKS = ['Homes Available', 'Communities', 'Build With Us', 'About'];

/**
 * Conventional utility-bar + logo + nav + CTA header, styled after
 * rh.house's structure: a thin dark contact strip above a transparent
 * nav row that sits directly on the hero image.
 */
export function SimpleNav() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
      <div
        style={{
          background: 'rgba(19,18,16,0.55)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '10px 24px',
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
          flexWrap: 'wrap',
          fontSize: 12,
          color: 'rgba(242,240,230,0.75)',
        }}
      >
        <span>2490 Walton Boulevard, Suite 103, Rochester Hills, MI 48309</span>
        <a href="tel:2486568830" style={{ color: 'inherit' }}>
          248.656.8830
        </a>
        <a href="mailto:inquiry@landrhomes.com" style={{ color: 'inherit' }}>
          inquiry@landrhomes.com
        </a>
      </div>

      <nav
        aria-label="Primary"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 40px',
        }}
      >
        <a href="/simple" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: '#F2F0E6' }}>L&amp;R Homes</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.28em', color: 'var(--color-brand-gold-light)' }}>
            CUSTOM BUILDERS
          </span>
        </a>

        <div className="simple-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          {LINKS.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(242,240,230,0.9)',
              }}
            >
              {link}
            </a>
          ))}
          <a
            href="/contact-us/?intent=tour"
            style={{
              border: '1px solid var(--color-brand-gold)',
              color: '#F2F0E6',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '13px 24px',
            }}
          >
            Schedule a Tour
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="simple-nav-burger"
          style={{ display: 'none', color: '#F2F0E6', fontSize: 24, background: 'none', border: 'none' }}
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {open && (
        <div
          className="simple-nav-drawer"
          style={{
            background: '#131210',
            padding: '20px 24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          {LINKS.map((link) => (
            <a
              key={link}
              href="#"
              style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F2F0E6' }}
            >
              {link}
            </a>
          ))}
          <a
            href="/contact-us/?intent=tour"
            style={{
              border: '1px solid var(--color-brand-gold)',
              color: '#F2F0E6',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '13px 24px',
              textAlign: 'center',
            }}
          >
            Schedule a Tour
          </a>
        </div>
      )}
    </header>
  );
}
