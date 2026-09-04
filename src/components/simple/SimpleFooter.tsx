/** Plain, light multi-column footer matching rh.house's structure. */
export function SimpleFooter() {
  const year = new Date().getFullYear();
  const col: React.CSSProperties = { minWidth: 180 };
  const heading: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-brand-dark)',
    marginBottom: 14,
  };
  const line: React.CSSProperties = { fontSize: 14, color: 'var(--fg2)', lineHeight: 1.8 };

  return (
    <footer style={{ background: '#FFFFFF', borderTop: '1px solid var(--border)' }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '56px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 40,
          justifyContent: 'space-between',
        }}
      >
        <div style={col}>
          <p style={heading}>Address</p>
          <p style={line}>
            2490 Walton Boulevard, Suite 103
            <br />
            Rochester Hills, Michigan 48309
          </p>
        </div>
        <div style={col}>
          <p style={heading}>Contact</p>
          <p style={line}>
            <a href="mailto:inquiry@landrhomes.com" style={{ color: 'var(--fg2)' }}>
              inquiry@landrhomes.com
            </a>
            <br />
            <a href="tel:2486568830" style={{ color: 'var(--fg2)' }}>
              248.656.8830
            </a>
          </p>
        </div>
        <div style={col}>
          <p style={heading}>Service Area</p>
          <p style={line}>Rochester Hills &amp; surrounding communities</p>
        </div>
        <div style={col}>
          <p style={heading}>Schedule a Tour</p>
          <a
            href="/contact-us/?intent=tour"
            style={{
              display: 'inline-block',
              border: '1px solid var(--color-brand-gold)',
              color: 'var(--color-brand-dark)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '13px 22px',
            }}
          >
            Find a Home
          </a>
        </div>
      </div>
      <div
        style={{
          borderTop: '1px solid var(--border)',
          padding: '18px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          fontSize: 12,
          color: 'var(--fg3)',
        }}
      >
        <span>&copy; {year} L&amp;R Homes, Inc.</span>
        <nav aria-label="Footer" style={{ display: 'flex', gap: 20 }}>
          <a href="#" style={{ color: 'var(--fg3)' }}>
            Homes Available
          </a>
          <a href="#" style={{ color: 'var(--fg3)' }}>
            Communities
          </a>
          <a href="/" style={{ color: 'var(--fg3)' }}>
            The Full Experience
          </a>
        </nav>
      </div>
    </footer>
  );
}
