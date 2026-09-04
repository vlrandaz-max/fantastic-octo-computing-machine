import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { experienceStore } from '../state/experience';

interface PhotoPlaneProps {
  url: string;
  position: [number, number, number];
  size: [number, number];
  fadeWindow: [number, number, number, number]; // fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd (in global progress units)
  brightness?: number;
}

/** A single real-photography plane, faded in/out across a scroll window. */
export function PhotoPlane({ url, position, size, fadeWindow, brightness = 1 }: PhotoPlaneProps) {
  const texture = useTexture(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const progress = experienceStore.get().smoothProgress;
    const [inStart, inEnd, outStart, outEnd] = fadeWindow;
    const fadeIn = THREE.MathUtils.smoothstep(progress, inStart, inEnd);
    const fadeOut = 1 - THREE.MathUtils.smoothstep(progress, outStart, outEnd);
    const opacity = Math.min(fadeIn, fadeOut);
    if (material.current) material.current.opacity = opacity;
    if (mesh.current) mesh.current.visible = opacity > 0.01;
  });

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        ref={material}
        map={texture}
        transparent
        opacity={0}
        roughness={0.85}
        metalness={0}
        emissive={new THREE.Color(1, 1, 1)}
        emissiveMap={texture}
        emissiveIntensity={brightness * 0.15}
      />
    </mesh>
  );
}
