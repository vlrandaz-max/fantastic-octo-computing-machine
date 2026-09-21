import type { HomeListing } from '../../data/site';
import { STATUS_LABEL } from '../../data/site';
import { withBase } from '../../lib/url';

const badgeColor: Record<HomeListing['status'], { bg: string; fg: string }> = {
  'move-in-ready': { bg: 'var(--color-brand-gold)', fg: '#131210' },
  sold: { bg: '#3a3530', fg: '#F2F0E6' },
  'immediate-occupancy': { bg: 'var(--color-brand-gold)', fg: '#131210' },
};

/** A single home listing card — reused on /simple, /homes-available, /pine-woods. */
export function HomeCard({ home, dark = false }: { home: HomeListing; dark?: boolean }) {
  const badge = badgeColor[home.status];
  return (
    <div
      className="hover-card-lift"
      style={{
        background: dark ? '#1a1815' : '#FFFFFF',
        border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--border)',
      }}
    >
      <a href={home.href ?? withBase('/contact-us')} className="photo-zoom" style={{ position: 'relative', display: 'block' }}>
        <img
          src={home.image}
          alt={home.name}
          loading="lazy"
          style={{ width: '100%', height: 220, objectFit: 'cover' }}
        />
        <span
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '6px 12px',
            background: badge.bg,
            color: badge.fg,
          }}
        >
          {STATUS_LABEL[home.status]}
        </span>
      </a>
      <div style={{ padding: '22px 24px 26px', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 22,
            color: dark ? '#F2F0E6' : 'var(--color-brand-dark)',
            marginBottom: 10,
          }}
        >
          {home.name}
        </p>
        <a
          href={home.href ?? withBase('/contact-us')}
          className="classic-btn-underline"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-brand-gold)',
            borderBottom: '1px solid var(--color-brand-gold)',
            paddingBottom: 2,
          }}
        >
          Click for Home Details →
        </a>
      </div>
    </div>
  );
}
