/**
 * Act VI's primary funnel branch. Per Part 2, Falcon Estates is the only
 * community with a dedicated cinematic pass "given asset availability" —
 * that second Quarry-to-Threshold pass doesn't exist yet in this build
 * (no second set of photography/materials was handed off for it), so its
 * link is flagged rather than faked. Pine Woods and Homes Available hand
 * off to conventional pages, as specified.
 */
export function CommunityBranch() {
  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(212,184,122,0.85)',
          marginBottom: 14,
        }}
      >
        Choose Your Path
      </p>
      <nav aria-label="Communities" style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
        <a
          href="/communities/falcon-estates"
          title="Dedicated cinematic pass — pending photography/material handoff for this community"
          style={{
            padding: '16px 28px',
            border: '1px solid rgba(196,160,90,0.4)',
            borderRadius: 'var(--radius-xs)',
            color: '#F2F0E6',
            fontFamily: 'var(--font-display)',
            fontSize: 20,
          }}
        >
          Falcon Estates
        </a>
        <a
          href="/communities/pine-woods"
          style={{
            padding: '16px 28px',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 'var(--radius-xs)',
            color: 'rgba(242,240,230,0.75)',
            fontFamily: 'var(--font-display)',
            fontSize: 20,
          }}
        >
          Pine Woods
        </a>
        <a
          href="/homes-available"
          style={{
            padding: '16px 28px',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 'var(--radius-xs)',
            color: 'rgba(242,240,230,0.75)',
            fontFamily: 'var(--font-display)',
            fontSize: 20,
          }}
        >
          Homes Available
        </a>
      </nav>
    </div>
  );
}
