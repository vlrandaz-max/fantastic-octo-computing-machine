import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PhotoPlane } from './PhotoPlane';
import { experienceStore } from '../state/experience';

/**
 * Act VI (The Land) — pull-out to golden-hour exterior. Preserve green
 * appears here and only here, via a soft rim wash rather than a literal
 * green ground plane (no landscape asset exists to place it on honestly).
 */
export function Act6Land() {
  const rim = useRef<THREE.Mesh>(null);
  const rimMaterial = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    const progress = experienceStore.get().smoothProgress;
    const fadeIn = THREE.MathUtils.smoothstep(progress, 4.75, 5.1);
    const fadeOut = 1 - THREE.MathUtils.smoothstep(progress, 5.85, 6.15);
    const opacity = Math.min(fadeIn, fadeOut) * 0.16;
    if (rimMaterial.current) rimMaterial.current.opacity = opacity;
    if (rim.current) rim.current.visible = opacity > 0.005;
  });

  return (
    <group>
      <PhotoPlane
        url="/assets/home/coachwood-aerial-dusk-front.jpg"
        position={[0, 0, -5]}
        size={[6.4, 3.4]}
        fadeWindow={[4.75, 5.1, 5.85, 6.15]}
        brightness={1.2}
      />
      <mesh ref={rim} position={[0, -1.1, -4.6]} rotation={[-Math.PI / 2.4, 0, 0]}>
        <planeGeometry args={[7, 3]} />
        <meshBasicMaterial ref={rimMaterial} color="#3f5b3f" transparent opacity={0} />
      </mesh>
    </group>
  );
}
