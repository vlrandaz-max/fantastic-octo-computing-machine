import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { experienceStore } from '../state/experience';

/**
 * Act III (The Frame) — lateral glide along steel mullions and timber.
 * Low-poly instanced bars; the light rig (CameraRig) carries the mood,
 * this geometry just needs to read as structural framing.
 */
export function Act3Frame() {
  const group = useRef<THREE.Group>(null);
  const steel = useRef<THREE.MeshStandardMaterial>(null);
  const timber = useRef<THREE.MeshStandardMaterial>(null);

  const mullions = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        position: [0.7 + i * 0.42, 0.15, -1.1] as [number, number, number],
        height: 1.5 + (i % 2 === 0 ? 0.2 : 0),
      })),
    [],
  );

  useFrame(() => {
    const progress = experienceStore.get().smoothProgress;
    const visibility = THREE.MathUtils.smoothstep(progress, 1.1, 1.9) * (1 - THREE.MathUtils.smoothstep(progress, 2.85, 3.4));
    if (group.current) group.current.visible = visibility > 0.01;
    if (steel.current) steel.current.opacity = visibility;
    if (timber.current) timber.current.opacity = visibility;
  });

  return (
    <group ref={group}>
      {mullions.map((m, i) => (
        <mesh key={i} position={m.position}>
          <boxGeometry args={[0.03, m.height, 0.03]} />
          <meshStandardMaterial
            ref={i === 0 ? steel : undefined}
            color="#8a8a8a"
            metalness={0.85}
            roughness={0.32}
            transparent
          />
        </mesh>
      ))}
      <mesh position={[1.6, -0.55, -1.1]}>
        <boxGeometry args={[2.6, 0.09, 0.09]} />
        <meshStandardMaterial ref={timber} color="#5a4632" roughness={0.7} transparent />
      </mesh>
    </group>
  );
}
