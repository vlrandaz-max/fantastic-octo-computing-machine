import { useState } from 'react';
import { ClassicNav } from './ClassicNav';
import { SimpleFooter } from './SimpleFooter';
import { COMPANY, FALCON_ESTATES_HOMES, PINE_WOODS_HOMES, STATUS_LABEL } from '../../data/site';
import { withBase } from '../../lib/url';

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-gold-dark)',
};

// The first home still for sale — so the photo always shows something a
// visitor can actually tour.
const FEATURED_HOME = [...FALCON_ESTATES_HOMES, ...PINE_WOODS_HOMES].find((h) => h.status !== 'sold');

/**
 * Contact Us — the single destination every CTA across the site points
 * to. No form: per the original design brief, these pages collect no
 * submissions, so a phone/email/mailto is the honest interaction rather
 * than a form with nothing to submit it to. Reads `?home=` or `?intent=`
 * from the URL to prefill context, matching how property-detail CTAs
 * were specified to pass the home slug along.
 */
export function ContactUsPage() {
  const [homeParam] = useState(() =>
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('home') : null,
  );

  const subject = homeParam ? `Inquiry about ${homeParam}` : 'General Inquiry';
  const mailtoHref = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}`;

  return (
    <div style={{ background: '#FFFFFF' }}>
      <ClassicNav />

      <main>
      <section style={{ padding: '72px 40px 96px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }} className="simple-grid-2">
          <div>
            <p style={eyebrow}>Get in Touch</p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(2.25rem,4.5vw,3.25rem)',
                color: 'var(--color-brand-dark)',
                lineHeight: 1.1,
                margin: '14px 0 20px',
              }}
            >
              Your Next Home Awaits
            </h1>
            {homeParam && (
              <p style={{ fontSize: 14, color: 'var(--fg3)', marginBottom: 16 }}>
                Mention <em style={{ fontStyle: 'italic', color: 'var(--fg2)' }}>{homeParam}</em> and we&rsquo;ll have details ready.
              </p>
            )}
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--fg2)', marginBottom: 32, maxWidth: 440 }}>
              Reach out and a member of our team will walk you through what&rsquo;s currently available, or arrange a
              private showing at your convenience.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg3)', marginBottom: 4 }}>
                  Call
                </p>
                <a href={COMPANY.phoneHref} className="nav-link-hover" style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--color-brand-dark)' }}>
                  {COMPANY.phone}
                </a>
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg3)', marginBottom: 4 }}>
                  Email
                </p>
                <a href={mailtoHref} className="nav-link-hover" style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-brand-dark)' }}>
                  {COMPANY.email}
                </a>
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg3)', marginBottom: 4 }}>
                  Office
                </p>
                <p style={{ fontSize: 16, color: 'var(--fg2)', lineHeight: 1.6 }}>{COMPANY.address}</p>
              </div>
            </div>

            <a
              href={mailtoHref}
              className="classic-btn-primary classic-hover-float"
              style={{ marginTop: 36 }}
            >
              Send Us a Message
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignSelf: 'start' }}>
          {FEATURED_HOME && (
            <a href={FEATURED_HOME.href} className="photo-zoom" style={{ boxShadow: 'var(--shadow-2)' }}>
              <img
                src={FEATURED_HOME.image}
                alt={`${FEATURED_HOME.name} at ${FEATURED_HOME.community}`}
                style={{ width: '100%', aspectRatio: '3 / 2', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                  padding: '48px 22px 18px',
                  background: 'linear-gradient(180deg, rgba(11,11,11,0) 0%, rgba(11,11,11,0.82) 100%)',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '2px 16px',
                  color: '#F2F0E6',
                }}
              >
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>
                  {FEATURED_HOME.name} · {FEATURED_HOME.community}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-brand-gold-light)', whiteSpace: 'nowrap' }}>
                  {STATUS_LABEL[FEATURED_HOME.status]}
                </span>
              </span>
            </a>
          )}
          <div
            style={{
              background: 'var(--bg1)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '32px 28px',
            }}
          >
            <p style={eyebrow}>Explore</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              <a href={withBase('/homes-available')} className="nav-link-hover" style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-brand-dark)' }}>
                Homes Available →
              </a>
              <a href={withBase('/falcon-estates-rochester-hills')} className="nav-link-hover" style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-brand-dark)' }}>
                Falcon Estates →
              </a>
              <a href={withBase('/pine-woods')} className="nav-link-hover" style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-brand-dark)' }}>
                Pine Woods →
              </a>
              <a href={withBase('/gallery')} className="nav-link-hover" style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-brand-dark)' }}>
                Photo Gallery →
              </a>
            </div>
          </div>
          </div>
        </div>
      </section>
      </main>

      <SimpleFooter />
    </div>
  );
}
