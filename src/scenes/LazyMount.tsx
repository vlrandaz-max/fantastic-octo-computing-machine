import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { experienceStore } from '../state/experience';

/**
 * Defers mounting (and therefore texture loading) of Act IV–VII
 * photography until the visitor is close enough to need it, per Part 4's
 * performance priorities ("lazy-load Act V–VII photography progressively
 * rather than up front"). Once mounted it stays mounted — no reload churn
 * if the visitor scrolls back and forth.
 */
export function LazyMount({ activateAt, children }: { activateAt: number; children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useFrame(() => {
    if (!mounted && experienceStore.get().smoothProgress >= activateAt) {
      setMounted(true);
    }
  });

  return mounted ? <>{children}</> : null;
}
