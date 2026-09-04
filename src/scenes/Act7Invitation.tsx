import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { experienceStore } from '../state/experience';

/** Act VII (The Invitation) — camera settles, hearth light, motion stops. */
export function Act7Invitation() {
  const glow = useRef<THREE.Sprite>(null);
  const glowMaterial = useRef<THREE.SpriteMaterial>(null);
  const light = useRef<THREE.PointLight>(null);

  const glowTexture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255,157,82,0.9)');
    grad.addColorStop(0.5, 'rgba(255,120,50,0.35)');
    grad.addColorStop(1, 'rgba(255,120,50,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(() => {
    const progress = experienceStore.get().smoothProgress;
    const strength = THREE.MathUtils.smoothstep(progress, 5.9, 6.3);
    // Additive blending + a low ceiling keeps this a soft warm wash behind
    // the CTA text, not a giant flat opaque disc — it previously ran up to
    // opacity 1 with normal alpha blending at a scale close enough to the
    // camera to fill the whole frame, blotting out the Invitation copy.
    if (glowMaterial.current) glowMaterial.current.opacity = strength * 0.45;
    if (glow.current) glow.current.visible = strength > 0.01;
    if (light.current) light.current.intensity = strength * 0.8;
  });

  return (
    <group position={[0, -0.15, -0.4]}>
      <sprite ref={glow} scale={[0.55, 0.55, 0.55]}>
        <spriteMaterial
          ref={glowMaterial}
          map={glowTexture}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      <pointLight ref={light} color="#ff9d52" intensity={0} distance={3} decay={2} />
    </group>
  );
}
