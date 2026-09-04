import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import '../materials/LuminanceWipeMaterial';
import { experienceStore } from '../state/experience';

const IMAGES = [
  '/assets/home/kitchen-full-run.jpg',
  '/assets/home/family-room-1-staged.jpg',
  '/assets/home/primary-suite-1-staged.png',
];

/**
 * Act V (The Household) — kitchen → great room → primary suite, as lit
 * environments crossfading via a luminance wipe rather than a plain fade.
 */
export function Act5Household() {
  const [texKitchen, texGreatRoom, texSuite] = useTexture(IMAGES);
  [texKitchen, texGreatRoom, texSuite].forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
  });

  const mesh = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const material = useRef<any>(null);

  useFrame(() => {
    const progress = experienceStore.get().smoothProgress;
    const fadeIn = THREE.MathUtils.smoothstep(progress, 3.75, 4.05);
    const fadeOut = 1 - THREE.MathUtils.smoothstep(progress, 4.85, 5.15);
    const opacity = Math.min(fadeIn, fadeOut);
    if (mesh.current) {
      mesh.current.visible = opacity > 0.01;
      (mesh.current.material as THREE.Material).opacity = opacity;
    }

    const local = THREE.MathUtils.clamp(progress - 4, 0, 1);
    const mat = material.current;
    if (!mat) return;
    if (local < 0.5) {
      mat.uTexA = texKitchen;
      mat.uTexB = texGreatRoom;
      mat.uProgress = local / 0.5;
    } else {
      mat.uTexA = texGreatRoom;
      mat.uTexB = texSuite;
      mat.uProgress = (local - 0.5) / 0.5;
    }
  });

  return (
    <mesh ref={mesh} position={[-0.3, 0.15, -3.4]}>
      <planeGeometry args={[3.4, 2.1]} />
      <luminanceWipeMaterial ref={material} transparent />
    </mesh>
  );
}
