import { useState } from 'react';
import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { COMPANY } from '../../data/site';

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-gold)',
};

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
      <div style={{ position: 'relative', background: '#131210' }}>
        <SimpleNav />
        <div style={{ height: 220 }} />
      </div>

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
              Let&rsquo;s Build Something Lasting
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
                <a href={COMPANY.phoneHref} style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--color-brand-dark)' }}>
                  {COMPANY.phone}
                </a>
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg3)', marginBottom: 4 }}>
                  Email
                </p>
                <a href={mailtoHref} style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-brand-dark)' }}>
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
              style={{
                display: 'inline-block',
                marginTop: 36,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#131210',
                background: 'var(--color-brand-gold)',
                padding: '16px 30px',
              }}
            >
              Send Us a Message
            </a>
          </div>

          <div
            style={{
              background: 'var(--bg1)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '32px 28px',
              alignSelf: 'start',
            }}
          >
            <p style={eyebrow}>Explore</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              <a href="/homes-available" style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-brand-dark)' }}>
                Homes Available →
              </a>
              <a href="/simple#falcon-estates" style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-brand-dark)' }}>
                Falcon Estates →
              </a>
              <a href="/pine-woods" style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-brand-dark)' }}>
                Pine Woods →
              </a>
              <a href="/gallery" style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-brand-dark)' }}>
                Photo Gallery →
              </a>
            </div>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
}
