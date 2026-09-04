import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { experienceStore, useExperienceState } from '../../state/experience';

/**
 * Beat 0.0 — Preload. Black screen, one monospace line fades legible, a
 * thin brass line fills left-to-right as the *real* progress bar (driven
 * by drei's useProgress, which watches the actual THREE loading manager —
 * no spinner, no fake timer). This is the only beat with zero commercial
 * intent, per Part 2.
 */
export function PreloadScreen() {
  const { progress, active } = useProgress();
  const { preloadDone } = useExperienceState();
  const [skipVisible, setSkipVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setTextVisible(true), 120);
    const t2 = setTimeout(() => setSkipVisible(true), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (!active && progress >= 100) {
      const t = setTimeout(() => experienceStore.setPreloadDone(true), 500);
      return () => clearTimeout(t);
    }
  }, [active, progress]);

  if (preloadDone) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        transition: 'opacity 600ms var(--ease-out)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          letterSpacing: '0.08em',
          color: 'rgba(242,240,230,0.75)',
          opacity: textVisible ? 1 : 0,
          transition: 'opacity 1400ms var(--ease-out)',
        }}
      >
        Fifty years, in the making.
      </p>
      <div style={{ width: 220, height: 1, background: 'rgba(255,255,255,0.12)' }}>
        <div
          style={{
            width: `${Math.min(100, progress)}%`,
            height: '100%',
            background: 'var(--color-brand-gold)',
            transition: 'width 200ms linear',
          }}
        />
      </div>
      <button
        type="button"
        onClick={() => experienceStore.setPreloadDone(true)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 28,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.08em',
          color: 'rgba(242,240,230,0.35)',
          opacity: skipVisible ? 1 : 0,
          transition: 'opacity 400ms var(--ease-out), color 200ms',
          pointerEvents: skipVisible ? 'auto' : 'none',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(242,240,230,0.9)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,240,230,0.35)')}
      >
        Skip intro →
      </button>
    </div>
  );
}
