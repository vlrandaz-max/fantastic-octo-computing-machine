import { useState } from 'react';
import { ClassicNav } from './ClassicNav';
import { SimpleFooter } from './SimpleFooter';
import { COMPANY, FALCON_ESTATES_HOMES, PINE_WOODS_HOMES } from '../../data/site';

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-gold-dark)',
};

const fieldLabel: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--fg3)',
  marginBottom: 4,
};

const GENERAL = 'General inquiry';
const TOUR = 'Schedule a tour';
const INTERESTS = [
  GENERAL,
  TOUR,
  ...[...FALCON_ESTATES_HOMES, ...PINE_WOODS_HOMES]
    .filter((h) => h.status !== 'sold')
    .map((h) => `${h.name} — ${h.community}`),
];

/**
 * Contact Us — the single destination every CTA across the site points
 * to. This is a static site with nothing server-side to post to, so the
 * form composes a ready-to-send email in the visitor's own mail app
 * rather than pretending to submit somewhere. Reads `?home=` or
 * `?intent=tour` from the URL to preselect what the visitor is asking
 * about.
 */
export function ContactUsPage() {
  const [params] = useState(() =>
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams(),
  );
  const homeParam = params.get('home');
  const wantsTour = params.get('intent') === 'tour';

  const [interest, setInterest] = useState(() => {
    const match = homeParam && INTERESTS.find((i) => i.toLowerCase().includes(homeParam.toLowerCase()));
    return match || (wantsTour ? TOUR : GENERAL);
  });
  const [composed, setComposed] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? '').trim();
    const lines = [
      `Name: ${get('name')}`,
      `Email: ${get('email')}`,
      ...(get('phone') ? [`Phone: ${get('phone')}`] : []),
      `Interested in: ${interest}`,
      '',
      get('message'),
    ];
    const subject = interest === GENERAL ? `Inquiry from ${get('name')}` : `${interest} — ${get('name')}`;
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    setComposed(true);
  }

  return (
    <div style={{ background: '#FFFFFF' }}>
      <ClassicNav />

      <main>
      <section style={{ padding: '80px 40px 96px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '5fr 6fr', gap: 72, alignItems: 'start' }} className="simple-grid-2">
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
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--fg2)', marginBottom: 36, maxWidth: 440 }}>
              Reach out and a member of our team will walk you through what&rsquo;s currently available, or arrange a
              private showing at your convenience.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <p style={fieldLabel}>Call</p>
                <a href={COMPANY.phoneHref} className="nav-link-hover" style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--color-brand-dark)' }}>
                  {COMPANY.phone}
                </a>
              </div>
              <div>
                <p style={fieldLabel}>Email</p>
                <a href={`mailto:${COMPANY.email}`} className="nav-link-hover" style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-brand-dark)' }}>
                  {COMPANY.email}
                </a>
              </div>
              <div>
                <p style={fieldLabel}>Office</p>
                <p style={{ fontSize: 16, color: 'var(--fg2)', lineHeight: 1.6 }}>{COMPANY.address}</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <p style={eyebrow}>{wantsTour ? 'Schedule a Tour' : 'Send Us a Message'}</p>
            <div className="contact-form-row">
              <label className="contact-field">
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label className="contact-field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
            </div>
            <div className="contact-form-row">
              <label className="contact-field">
                <span>Phone (optional)</span>
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
              <label className="contact-field">
                <span>I&rsquo;m interested in</span>
                <select value={interest} onChange={(e) => setInterest(e.target.value)}>
                  {INTERESTS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="contact-field">
              <span>Message</span>
              <textarea
                name="message"
                rows={5}
                required
                placeholder={interest === GENERAL ? undefined : 'Days and times that work for you'}
              />
            </label>
            <button type="submit" className="classic-btn-primary classic-hover-float">
              {wantsTour ? 'Request a Tour' : 'Send Message'}
            </button>
            <p className="contact-form-note" role="status">
              {composed
                ? `Your email app should now be open with this message ready — press send there to deliver it. If nothing opened, call ${COMPANY.phone}.`
                : 'Opens your email app with the message filled in, ready to send.'}
            </p>
          </form>
        </div>
      </section>
      </main>

      <SimpleFooter />
    </div>
  );
}
