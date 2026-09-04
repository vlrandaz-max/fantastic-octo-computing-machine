/** Act VII — primary conversion. Motion stops here; so does urgency copy. */
export function InvitationCTA() {
  return (
    <div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 'clamp(2.25rem,4vw,3.25rem)',
          color: '#F2F0E6',
          marginBottom: 24,
        }}
      >
        Come Home.
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
        <a
          href="/contact-us?intent=tour"
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#131210',
            background: 'var(--color-brand-gold)',
            padding: '15px 30px',
            borderRadius: 'var(--radius-xs)',
          }}
        >
          Schedule a Tour
        </a>
        <a
          href="tel:2486568830"
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#F2F0E6',
            border: '1px solid rgba(242,240,230,0.35)',
            padding: '15px 30px',
            borderRadius: 'var(--radius-xs)',
          }}
        >
          Call 248.656.8830
        </a>
        <a
          href="mailto:info@landrhomes.com"
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(242,240,230,0.7)',
            padding: '15px 12px',
          }}
        >
          Email Us
        </a>
      </div>
    </div>
  );
}
