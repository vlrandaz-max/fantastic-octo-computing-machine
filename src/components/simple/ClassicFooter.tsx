import { COMPANY, NAV_LINKS } from '../../data/site';

const colHeading: React.CSSProperties = {
  fontFamily: "'Jost', var(--font-body)",
  fontWeight: 600,
  fontSize: 13,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-dark)',
  marginBottom: 14,
};

const colText: React.CSSProperties = {
  fontFamily: "'Jost', var(--font-body)",
  fontSize: 14,
  lineHeight: 1.8,
  color: 'var(--fg2)',
};

/** Centered, multi-column contact footer matching rh.house's footer structure. */
export function ClassicFooter({ homeHref }: { homeHref?: string } = {}) {
  const year = new Date().getFullYear();
  const footerLinks = homeHref ? NAV_LINKS.map((l) => (l.label === 'Home' ? { ...l, href: homeHref } : l)) : NAV_LINKS;

  return (
    <footer style={{ background: '#FFFFFF' }}>
      <div
        className="classic-footer-grid"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '72px 32px 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 40,
          textAlign: 'center',
        }}
      >
        <div>
          <p style={colHeading}>Address</p>
          <p style={colText}>{COMPANY.addressShort}</p>
        </div>
        <div>
          <p style={colHeading}>Contact</p>
          <p style={colText}>
            <a href={`mailto:${COMPANY.email}`} className="nav-link-hover" style={{ color: 'var(--fg2)' }}>
              {COMPANY.email}
            </a>
            <br />
            <a href={COMPANY.phoneHref} className="nav-link-hover" style={{ color: 'var(--fg2)' }}>
              {COMPANY.phone}
            </a>
          </p>
        </div>
        <div>
          <p style={colHeading}>Schedule a Visit</p>
          <a href={COMPANY.phoneHref} className="classic-btn-outline classic-hover-float" style={{ color: 'var(--color-brand-dark)' }}>
            Find a Home
          </a>
        </div>
      </div>
      <div
        style={{
          borderTop: '1px solid var(--border)',
          maxWidth: 1280,
          margin: '0 auto',
          padding: '18px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          fontFamily: "'Jost', var(--font-body)",
          fontSize: 12,
          color: 'var(--fg3)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            role="img"
            aria-label="Equal Housing Opportunity"
            style={{ flexShrink: 0 }}
          >
            <rect x="1" y="1" width="22" height="22" rx="1" />
            <path d="M4 12.5 L12 5.5 L20 12.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="9" y1="13.5" x2="15" y2="13.5" strokeLinecap="round" />
            <line x1="9" y1="16.5" x2="15" y2="16.5" strokeLinecap="round" />
          </svg>
          <span>
            {COMPANY.name} | {COMPANY.addressShort} | Telephone {COMPANY.phone} | email:{' '}
            <a href={`mailto:${COMPANY.email}`} className="nav-link-hover" style={{ color: 'var(--color-brand-gold-dark)' }}>
              {COMPANY.email}
            </a>{' '}
            | Copyright &copy; {year}
          </span>
        </span>
        <nav aria-label="Footer" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link-hover" style={{ color: 'var(--fg3)' }}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
