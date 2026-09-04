import { useEffect, useState } from 'react';

/**
 * Specifically the `prefers-reduced-motion: reduce` media query — distinct
 * from `useMotionPreference`'s combined cinematic/flat decision. Needed
 * because the flat page serves two different audiences (reduced-motion
 * visitors AND ordinary mobile visitors) who should not necessarily get
 * the same treatment for things like autoplaying background video.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}
