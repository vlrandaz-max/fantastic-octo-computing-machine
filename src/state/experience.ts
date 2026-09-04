import { useSyncExternalStore } from 'react';

export const ACT_COUNT = 7;
export const ACT_NAMES = [
  'The Quarry',
  'The Cut',
  'The Frame',
  'The Threshold',
  'The Household',
  'The Land',
  'The Invitation',
] as const;

interface ExperienceState {
  /** Raw scroll-driven progress, 0..ACT_COUNT, updated by ScrollTrigger every scrub tick. */
  rawProgress: number;
  /** Damped/eased progress the camera rig actually reads — smoothed per-frame. */
  smoothProgress: number;
  navResolved: boolean;
  preloadDone: boolean;
}

// `rawProgress`/`smoothProgress` change up to 60x/sec and are read
// imperatively inside r3f `useFrame` callbacks via `experienceStore.get()`
// directly — never through the React hook — so mutating them in place is
// intentional and cheap. `navResolved`/`preloadDone` are the only fields
// any component subscribes to via `useSyncExternalStore`, so *those* two
// replace the whole state object with a new reference when they change —
// required for Object.is-based change detection to actually fire a
// re-render — while every other update reuses the same reference so
// React correctly does nothing.
let state: ExperienceState = {
  rawProgress: 0,
  smoothProgress: 0,
  navResolved: false,
  preloadDone: false,
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const experienceStore = {
  get: () => state,
  setRawProgress(p: number) {
    const resolved = p >= 2; // Act III — nav resolves into the datum line
    if (resolved !== state.navResolved) {
      state = { ...state, rawProgress: p, navResolved: resolved };
      emit();
    } else {
      state.rawProgress = p;
    }
  },
  setSmoothProgress(p: number) {
    state.smoothProgress = p;
  },
  setPreloadDone(v: boolean) {
    if (v === state.preloadDone) return;
    state = { ...state, preloadDone: v };
    emit();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function useExperienceState() {
  return useSyncExternalStore(experienceStore.subscribe, experienceStore.get, experienceStore.get);
}
