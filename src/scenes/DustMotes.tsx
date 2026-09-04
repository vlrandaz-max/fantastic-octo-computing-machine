import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { experienceStore } from '../state/experience';

const COUNT = 260;

/**
 * Faint dust motes, visible only inside the Act I light shaft — motivated
 * by the key light, never decorative. Fades out through Act II.
 */
export function DustMotes() {
  const pointsRef = useRef<THREE.Points>(null);
  const material = useRef<THREE.PointsMaterial>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1.6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.2 + 0.4;
      speeds[i] = 0.02 + Math.random() * 0.05;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    return geo;
  }, []);

  useFrame((_, delta) => {
    const progress = experienceStore.get().smoothProgress;
    const visibility = THREE.MathUtils.clamp(1 - progress / 1.3, 0, 1);
    if (material.current) material.current.opacity = visibility * 0.35;
    if (pointsRef.current) pointsRef.current.visible = visibility > 0.01;

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const speed = geometry.attributes.aSpeed as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      let y = pos.getY(i) + speed.getX(i) * delta;
      if (y > 0.55) y = -0.55;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        ref={material}
        color="#f4dfa8"
        size={0.008}
        transparent
        opacity={0}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
