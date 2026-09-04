import * as THREE from 'three';

export interface CameraKeyframe {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

export interface LightKeyframe {
  color: string;
  intensity: number;
  /** Degrees, low = raking/grazing */
  elevation: number;
  azimuth: number;
  ambient: number;
  ambientColor: string;
  preserveGreen: number; // 0..1, used only in Act VI
}

// One entry per act boundary — index i is the *start* of act i (and the
// implicit end of act i-1). Index 7 is the final settle for Act VII / footer.
export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  // 0 — Act I, The Quarry: extreme macro, a few degrees off-axis.
  { position: [0.32, 0.16, 1.35], lookAt: [0, 0, 0], fov: 20 },
  // 1 — Act II, The Cut: pull back, monogram etches into the stone.
  { position: [0.5, 0.35, 2.7], lookAt: [0, 0.05, 0], fov: 30 },
  // 2 — Act III, The Frame: lateral glide, nav resolves.
  { position: [2.0, 0.5, 3.3], lookAt: [0.35, 0.1, 0], fov: 36 },
  // 3 — Act IV, The Threshold: full daylight, entry photography.
  { position: [0, 0.55, 4.4], lookAt: [0, 0.25, 0], fov: 42 },
  // 4 — Act V, The Household: interior sequence, practical light.
  { position: [-0.35, 0.35, 3.6], lookAt: [0, 0.15, 0], fov: 34 },
  // 5 — Act VI, The Land: pull-out to golden-hour exterior.
  { position: [0, 1.15, 6.6], lookAt: [0, 0, 0], fov: 50 },
  // 6 — Act VII, The Invitation: camera settles, hearth light.
  { position: [0, 0.28, 2.15], lookAt: [0, 0, 0], fov: 28 },
  // 7 — post-experience settle (identical to 6 — motion stops entirely).
  { position: [0, 0.28, 2.15], lookAt: [0, 0, 0], fov: 28 },
];

export const LIGHT_KEYFRAMES: LightKeyframe[] = [
  // 0 — raking warm light, near-zero ambient, max texture contrast.
  { color: '#fff1d6', intensity: 3.2, elevation: 8, azimuth: -35, ambient: 0.02, ambientColor: '#1a1610', preserveGreen: 0 },
  // 1 — cool dawn enters.
  { color: '#e8ecff', intensity: 2.4, elevation: 18, azimuth: -20, ambient: 0.12, ambientColor: '#2a3040', preserveGreen: 0 },
  // 2 — orientation light, neutral.
  { color: '#f0ece0', intensity: 2.0, elevation: 30, azimuth: 10, ambient: 0.22, ambientColor: '#3a3530', preserveGreen: 0 },
  // 3 — full daylight, warm palette begins.
  { color: '#fff4dc', intensity: 2.6, elevation: 45, azimuth: 25, ambient: 0.42, ambientColor: '#f2f0e6', preserveGreen: 0 },
  // 4 — interior practical light glow.
  { color: '#ffdca6', intensity: 1.8, elevation: 35, azimuth: 40, ambient: 0.5, ambientColor: '#3a2e1e', preserveGreen: 0 },
  // 5 — golden hour exterior, preserve green appears once.
  { color: '#ffb46a', intensity: 2.9, elevation: 12, azimuth: -60, ambient: 0.3, ambientColor: '#40381e', preserveGreen: 1 },
  // 6 — hearth light, warm and low.
  { color: '#ff9d52', intensity: 1.6, elevation: 15, azimuth: 0, ambient: 0.14, ambientColor: '#1c1410', preserveGreen: 0 },
  // 7 — settled, matches 6.
  { color: '#ff9d52', intensity: 1.6, elevation: 15, azimuth: 0, ambient: 0.14, ambientColor: '#1c1410', preserveGreen: 0 },
];

/** Pinned hold, then a single decelerating scrub — never linear. */
export function pinnedScrub(localT: number, holdFraction = 0.55): number {
  const t = THREE.MathUtils.clamp(localT, 0, 1);
  if (t <= holdFraction) return 0;
  const u = (t - holdFraction) / (1 - holdFraction);
  return 1 - Math.pow(1 - u, 3); // decelerating — same family as cubic-bezier(0.22,1,0.36,1)
}

export function lerpKeyframe(a: CameraKeyframe, b: CameraKeyframe, t: number): CameraKeyframe {
  const lerp3 = (p: [number, number, number], q: [number, number, number]): [number, number, number] => [
    THREE.MathUtils.lerp(p[0], q[0], t),
    THREE.MathUtils.lerp(p[1], q[1], t),
    THREE.MathUtils.lerp(p[2], q[2], t),
  ];
  return {
    position: lerp3(a.position, b.position),
    lookAt: lerp3(a.lookAt, b.lookAt),
    fov: THREE.MathUtils.lerp(a.fov, b.fov, t),
  };
}

export function lerpLight(a: LightKeyframe, b: LightKeyframe, t: number): LightKeyframe {
  const colorA = new THREE.Color(a.color);
  const colorB = new THREE.Color(b.color);
  const ambA = new THREE.Color(a.ambientColor);
  const ambB = new THREE.Color(b.ambientColor);
  return {
    color: '#' + colorA.lerp(colorB, t).getHexString(),
    intensity: THREE.MathUtils.lerp(a.intensity, b.intensity, t),
    elevation: THREE.MathUtils.lerp(a.elevation, b.elevation, t),
    azimuth: THREE.MathUtils.lerp(a.azimuth, b.azimuth, t),
    ambient: THREE.MathUtils.lerp(a.ambient, b.ambient, t),
    ambientColor: '#' + ambA.lerp(ambB, t).getHexString(),
    preserveGreen: THREE.MathUtils.lerp(a.preserveGreen, b.preserveGreen, t),
  };
}

export function sampleAtProgress<T>(
  keyframes: T[],
  progress: number,
  lerpFn: (a: T, b: T, t: number) => T,
): T {
  const clamped = THREE.MathUtils.clamp(progress, 0, keyframes.length - 1);
  const actIndex = Math.min(Math.floor(clamped), keyframes.length - 2);
  const localT = clamped - actIndex;
  const scrub = pinnedScrub(localT);
  return lerpFn(keyframes[actIndex], keyframes[actIndex + 1], scrub);
}
