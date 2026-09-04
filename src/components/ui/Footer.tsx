/**
 * Standard, fully semantic footer — deliberately outside the cinematic
 * layer (Part 2: "Deliberately not part of the cinematic layer"). Same
 * markup for both the WebGL experience and the reduced-motion/mobile path.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: 'var(--color-near-black)',
        padding: 'var(--space-10) var(--space-12)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 32,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--fg-inverse)', marginBottom: 6 }}>
            L&amp;R Homes, Inc.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(242,240,230,0.45)', lineHeight: 1.7 }}>
            2490 Walton Boulevard, Suite 103
            <br />
            Rochester Hills, Michigan 48309
          </p>
        </div>
        <nav aria-label="Footer" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <a href="/homes-available" style={{ fontSize: 12, color: 'rgba(242,240,230,0.55)' }}>
            Homes Available
          </a>
          <a href="#land" style={{ fontSize: 12, color: 'rgba(242,240,230,0.55)' }}>
            Communities
          </a>
          <a href="tel:2486568830" style={{ fontSize: 12, color: 'rgba(242,240,230,0.55)' }}>
            248.656.8830
          </a>
          <a href="mailto:info@landrhomes.com" style={{ fontSize: 12, color: 'rgba(242,240,230,0.55)' }}>
            info@landrhomes.com
          </a>
          <a href="/sitemap.xml" style={{ fontSize: 12, color: 'rgba(242,240,230,0.55)' }}>
            Sitemap
          </a>
        </nav>
        <p style={{ fontSize: 12, color: 'rgba(242,240,230,0.3)' }}>
          &copy; {year} L&amp;R Homes, Inc. &middot; Rochester Hills, Michigan
        </p>
      </div>
    </footer>
  );
}
