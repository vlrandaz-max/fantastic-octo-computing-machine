import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { experienceStore } from '../state/experience';

/**
 * Act III (The Frame) — lateral glide along steel mullions and timber.
 * Low-poly bars sharing one material each (so the fade-in opacity actually
 * reaches every bar, not just the first) with enough roughness/warmth to
 * read as solid steel against a dark scene rather than near-invisible
 * reflective slivers.
 */
export function Act3Frame() {
  const group = useRef<THREE.Group>(null);
  const steelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#a8a4a0',
        metalness: 0.55,
        roughness: 0.42,
        emissive: '#3a3632',
        emissiveIntensity: 0.15,
        transparent: true,
        opacity: 0,
      }),
    [],
  );
  const timberMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#6b543c',
        roughness: 0.75,
        transparent: true,
        opacity: 0,
      }),
    [],
  );

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
    steelMaterial.opacity = visibility;
    timberMaterial.opacity = visibility;
  });

  return (
    <group ref={group}>
      {mullions.map((m, i) => (
        <mesh key={i} position={m.position} material={steelMaterial}>
          <boxGeometry args={[0.045, m.height, 0.045]} />
        </mesh>
      ))}
      <mesh position={[1.6, -0.55, -1.1]} material={timberMaterial}>
        <boxGeometry args={[2.6, 0.1, 0.1]} />
      </mesh>
    </group>
  );
}
