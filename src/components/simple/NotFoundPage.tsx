import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { COMPANY, NAV_LINKS } from '../../data/site';
import { withBase } from '../../lib/url';

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-gold)',
};

/** Shown for any path that doesn't match a real route — including on the
 *  live host, where .htaccess's SPA fallback serves index.html (200 OK)
 *  for literally any non-file path, so this is the only "not found" signal
 *  a visitor actually sees. */
export function NotFoundPage() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      <div style={{ position: 'relative', background: '#131210' }}>
        <SimpleNav />
        <div style={{ height: 220 }} />
      </div>

      <section style={{ padding: '72px 40px 96px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <p style={eyebrow}>Error 404</p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(2.5rem,6vw,4rem)',
              color: 'var(--color-brand-dark)',
              margin: '14px 0 20px',
            }}
          >
            Page Not Found
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--fg2)', marginBottom: 40 }}>
            The page you&rsquo;re looking for doesn&rsquo;t exist, may have moved, or the link may be out of date.
            Here are a few places to pick back up.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginBottom: 40 }}>
            <a
              href={withBase('/classic2')}
              className="classic-hover-float"
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#131210',
                background: 'var(--color-brand-gold)',
                padding: '16px 30px',
              }}
            >
              Back to Home
            </a>
            {NAV_LINKS.filter((l) => l.label !== 'Home').map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="classic-btn-outline classic-hover-float"
                style={{ color: 'var(--color-brand-dark)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <p style={{ fontSize: 14, color: 'var(--fg3)' }}>
            Or call us at{' '}
            <a href={COMPANY.phoneHref} className="nav-link-hover" style={{ color: 'var(--color-brand-gold-dark)' }}>
              {COMPANY.phone}
            </a>
          </p>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
}
