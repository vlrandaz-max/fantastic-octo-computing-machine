import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, DepthOfField, Vignette } from '@react-three/postprocessing';
import { experienceStore } from '../state/experience';

/** Shallow DOF for Act I's macro shot, relaxing into focus by Act III. */
export function DepthOfFieldRig() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dof = useRef<any>(null);

  useFrame(() => {
    const progress = experienceStore.get().smoothProgress;
    if (!dof.current) return;
    const bokeh = THREE.MathUtils.lerp(3.4, 0.15, THREE.MathUtils.smoothstep(progress, 0, 2.2));
    dof.current.bokehScale = bokeh;
  });

  return (
    <EffectComposer multisampling={0}>
      <DepthOfField ref={dof} focusDistance={0.012} focalLength={0.02} bokehScale={3.4} height={480} />
      <Vignette eskil={false} offset={0.25} darkness={0.6} />
    </EffectComposer>
  );
}
