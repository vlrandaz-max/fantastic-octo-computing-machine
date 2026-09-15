import { COMPANY } from '../../data/site';

const icon: React.CSSProperties = { width: 16, height: 16, flexShrink: 0, color: 'var(--color-brand-gold-dark)' };

function PinIcon() {
  return (
    <svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

/** Light footer with a contact icon list, matching the reference template's structure. */
export function ClassicFooter() {
  const year = new Date().getFullYear();
  const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--fg2)' };

  return (
    <footer style={{ background: '#FFFFFF', borderTop: '1px solid var(--border)' }}>
      <div
        className="classic-footer-grid"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '64px 32px 40px',
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: 40,
        }}
      >
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--color-brand-dark)' }}>L&amp;R Homes</span>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--fg2)', maxWidth: 440, marginTop: 14 }}>
            Fifty years of hands-on management and attention to detail — L&amp;R Homes stands behind every home it
            builds, long after the closing.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
          <div style={row}>
            <PinIcon />
            <span>{COMPANY.addressShort}</span>
          </div>
          <a href={`mailto:${COMPANY.email}`} style={{ ...row, color: 'var(--fg2)' }}>
            <MailIcon />
            <span>{COMPANY.email}</span>
          </a>
          <a href={COMPANY.phoneHref} style={{ ...row, color: 'var(--fg2)' }}>
            <PhoneIcon />
            <span>{COMPANY.phone}</span>
          </a>
        </div>
      </div>
      <div
        style={{
          borderTop: '1px solid var(--border)',
          maxWidth: 1280,
          margin: '0 auto',
          padding: '18px 32px',
          fontSize: 12,
          color: 'var(--fg3)',
        }}
      >
        Copyright &copy; {year} {COMPANY.name} All rights reserved.
      </div>
    </footer>
  );
}
