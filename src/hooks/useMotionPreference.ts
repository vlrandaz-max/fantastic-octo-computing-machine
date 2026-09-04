import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Decides which experience a visitor gets:
 *  - `cinematic` — full WebGL scroll-choreographed desktop experience
 *  - `flat`      — prefers-reduced-motion or a phone/small-touch viewport;
 *                  a fully considered 2D layout sharing the same tokens,
 *                  type, palette and photography, not a stripped-down 3D scene.
 *
 * Re-evaluated on resize/orientation change and on a live change to the
 * reduced-motion media query, but the *initial* read (not a random guess)
 * happens synchronously so there is no flash of the wrong experience.
 */
export function useMotionPreference(): 'cinematic' | 'flat' {
  const [mode, setMode] = useState<'cinematic' | 'flat'>(() => resolve());

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMode(resolve());
    mq.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return mode;
}

function resolve(): 'cinematic' | 'flat' {
  if (typeof window === 'undefined') return 'flat';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = window.innerWidth < MOBILE_BREAKPOINT;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches && narrow;
  if (reduced || narrow || coarsePointer) return 'flat';
  return 'cinematic';
}
