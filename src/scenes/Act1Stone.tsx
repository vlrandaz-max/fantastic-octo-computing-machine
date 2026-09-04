import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { buildStoneSlab } from '../materials/stoneSlab';
import { DustMotes } from './DustMotes';
import { experienceStore } from '../state/experience';

function buildMonogramTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // 'Cormorant Garamond' if the webfont has loaded by now; a serif
  // fallback otherwise — canvas text needs no network fetch either way,
  // unlike drei's default remote-font Text component.
  ctx.font = '300 220px "Cormorant Garamond", Garamond, Georgia, serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('L & R', size / 2, size / 2 + 8);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Act I (The Quarry) + Act II (The Cut) share one physical object: the
 * stone slab the camera pulls back from, with the monogram etched into
 * it by the same key light rather than overlaid as a fade-in graphic.
 */
export function Act1Stone() {
  const { geometry, material } = useMemo(() => {
    const built = buildStoneSlab();
    built.material.transparent = true;
    return built;
  }, []);
  const monogramTexture = useMemo(() => buildMonogramTexture(), []);
  const stoneRef = useRef<THREE.Mesh>(null);
  const monogramRef = useRef<THREE.Mesh>(null);
  const monogramMaterial = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    const progress = experienceStore.get().smoothProgress;
    // Etches in through Act II (progress 1→2), fully resolved by Act III.
    const etch = THREE.MathUtils.clamp((progress - 0.75) / 1.1, 0, 1);
    // The stone's narrative job is done once Act III's lateral glide hands
    // off to the Threshold — Act VII's camera settle returns near this same
    // origin point for the hearth beat, so the slab recedes rather than
    // colliding with that later scene.
    const presence = 1 - THREE.MathUtils.smoothstep(progress, 2.15, 2.75);

    if (monogramMaterial.current) {
      monogramMaterial.current.emissiveIntensity = etch * 1.6;
      monogramMaterial.current.opacity = Math.min(1, etch * 1.3) * presence;
    }
    if (monogramRef.current) monogramRef.current.visible = etch > 0.01 && presence > 0.01;
    if (material.opacity !== presence) material.opacity = presence;
    if (stoneRef.current) stoneRef.current.visible = presence > 0.01;
  });

  return (
    <group>
      <mesh ref={stoneRef} geometry={geometry} material={material} />
      <mesh ref={monogramRef} position={[0, 0.02, 0.1]}>
        <planeGeometry args={[1.1, 1.1]} />
        <meshStandardMaterial
          ref={monogramMaterial}
          transparent
          opacity={0}
          alphaMap={monogramTexture}
          color="#c4a05a"
          emissive="#c4a05a"
          emissiveMap={monogramTexture}
          emissiveIntensity={0}
          roughness={0.35}
          metalness={0.4}
          depthWrite={false}
        />
      </mesh>
      <DustMotes />
    </group>
  );
}
