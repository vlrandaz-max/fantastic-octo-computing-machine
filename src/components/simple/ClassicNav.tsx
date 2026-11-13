import { useState } from 'react';
import { COMPANY, NAV_LINKS } from '../../data/site';
import { withBase } from '../../lib/url';
import { StickyMobileCTA } from './StickyMobileCTA';

const linkStyle: React.CSSProperties = {
  fontFamily: "'Jost', var(--font-body)",
  fontSize: 14,
  fontWeight: 500,
  color: '#F2F0E6',
};

const TOUR_HREF = withBase('/contact-us?intent=tour');

/**
 * The one site header — a thin info bar (address / phone / email) over a
 * main row with logo left and nav right. Solid and sticky by default;
 * `overlay` lays it transparently over a page's hero photograph instead.
 */
export function ClassicNav({ homeHref = withBase('/'), overlay = false }: { homeHref?: string; overlay?: boolean } = {}) {
  const [open, setOpen] = useState(false);
  const LINKS = [{ label: 'Home', href: homeHref }, ...NAV_LINKS.filter((l) => l.label !== 'Home')];

  return (
    <>
    <header
      style={
        overlay
          ? { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }
          : {
              position: 'sticky',
              top: 0,
              zIndex: 30,
              background: 'rgba(11,11,11,0.96)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }
      }
    >
      <div
        className="classic-info-bar"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 36,
          padding: '9px 24px',
          background: overlay ? 'rgba(19,18,16,0.55)' : undefined,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          fontFamily: "'Jost', var(--font-body)",
          fontSize: 12,
          letterSpacing: '0.04em',
          color: 'rgba(242,240,230,0.7)',
        }}
      >
        <span>{COMPANY.address}</span>
        <a href={COMPANY.phoneHref} className="nav-link-hover" style={{ color: 'inherit' }}>
          {COMPANY.phone}
        </a>
        <a href={`mailto:${COMPANY.email}`} className="nav-link-hover" style={{ color: 'inherit' }}>
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
        <a href={homeHref} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={withBase('/assets/lr-logo-badge.png')} alt="" style={{ width: 42, height: 42, objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span className="classic-title" style={{ fontSize: 24, letterSpacing: '0.05em', color: '#F2F0E6' }}>
              L&amp;R Homes
            </span>
            <span style={{ fontFamily: "'Jost', var(--font-body)", fontSize: 10, fontWeight: 500, letterSpacing: '0.28em', color: 'var(--color-brand-gold-light)' }}>
              CUSTOM BUILDERS SINCE 1973
            </span>
          </div>
        </a>

        <nav aria-label="Primary" className="classic-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} className="nav-link-hover" style={linkStyle}>
              {link.label}
            </a>
          ))}
          <a href={TOUR_HREF} className="classic-btn-primary classic-hover-float">
            Schedule a Tour
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
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} className="nav-link-hover" style={{ ...linkStyle, padding: '10px 0' }}>
              {link.label}
            </a>
          ))}
          <a href={TOUR_HREF} className="classic-btn-primary" style={{ textAlign: 'center', marginTop: 10 }}>
            Schedule a Tour
          </a>
        </div>
      )}
    </header>
    <StickyMobileCTA />
    </>
  );
}
