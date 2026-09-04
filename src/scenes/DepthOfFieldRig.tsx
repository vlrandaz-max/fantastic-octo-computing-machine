import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, DepthOfField, Vignette } from '@react-three/postprocessing';
import { experienceStore } from '../state/experience';
import { focusTarget } from './focusTarget';

/**
 * Shallow DOF for Act I's macro shot, relaxing into focus by Act III.
 *
 * `target` (passed once, below) puts the effect in autofocus mode; every
 * frame we then copy the camera's actual look-at point into the effect's
 * internal target imperatively via the ref. Previously this used a fixed
 * `focusDistance` that didn't track the camera, so the subject itself
 * sat outside the focused plane and the whole frame read as an unfocused
 * blur rather than "shallow DOF, sharp subject."
 */
export function DepthOfFieldRig() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dof = useRef<any>(null);

  useFrame(() => {
    const progress = experienceStore.get().smoothProgress;
    if (!dof.current) return;
    const bokeh = THREE.MathUtils.lerp(2.1, 0.35, THREE.MathUtils.smoothstep(progress, 0, 2.2));
    dof.current.bokehScale = bokeh;
    if (dof.current.target) dof.current.target.copy(focusTarget);
  });

  return (
    <EffectComposer multisampling={0}>
      <DepthOfField ref={dof} target={focusTarget} focusRange={0.09} focalLength={0.05} bokehScale={2.1} height={480} />
      <Vignette eskil={false} offset={0.25} darkness={0.55} />
    </EffectComposer>
  );
}
