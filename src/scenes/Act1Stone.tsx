import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { buildStoneSlab } from '../materials/stoneSlab';
import { DustMotes } from './DustMotes';
import { experienceStore } from '../state/experience';

/**
 * Two textures for the monogram: a crisp `coverage` mask (pure letterforms,
 * used for the cutout alpha so edges stay sharp) and a `shaded` map with a
 * dark shadow offset one way and a bright highlight offset the other —
 * simulating a bevel catching the raking key light, so the mark reads as
 * incised into the stone rather than a flat gold sticker on top of it.
 */
function buildMonogramTextures(): { coverage: THREE.CanvasTexture; shaded: THREE.CanvasTexture } {
  const size = 1024;
  const font = '300 440px "Cormorant Garamond", Garamond, Georgia, serif';
  const draw = (ctx: CanvasRenderingContext2D, dx: number, dy: number, alpha: number, blur: number) => {
    ctx.save();
    ctx.filter = blur > 0 ? `blur(${blur}px)` : 'none';
    ctx.globalAlpha = alpha;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = font;
    ctx.fillStyle = '#ffffff';
    ctx.fillText('L & R', size / 2 + dx, size / 2 + 16 + dy);
    ctx.restore();
  };

  const coverageCanvas = document.createElement('canvas');
  coverageCanvas.width = coverageCanvas.height = size;
  draw(coverageCanvas.getContext('2d')!, 0, 0, 1, 0);

  const shadedCanvas = document.createElement('canvas');
  shadedCanvas.width = shadedCanvas.height = size;
  const sctx = shadedCanvas.getContext('2d')!;
  // Shadow (recess, away from the raking light) then highlight (catching
  // it), then the base fill — order matters, each layer partially covers
  // the last so the edge reads as a rounded incision, not a hard outline.
  draw(sctx, 9, 10, 0.55, 6);
  draw(sctx, -6, -7, 0.9, 4);
  draw(sctx, 0, 0, 1, 0);

  const coverage = new THREE.CanvasTexture(coverageCanvas);
  const shaded = new THREE.CanvasTexture(shadedCanvas);
  coverage.needsUpdate = true;
  shaded.needsUpdate = true;
  return { coverage, shaded };
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
  const monogramTextures = useMemo(() => buildMonogramTextures(), []);
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
          alphaMap={monogramTextures.coverage}
          color="#c4a05a"
          emissive="#e8c88a"
          emissiveMap={monogramTextures.shaded}
          emissiveIntensity={0}
          roughness={0.4}
          metalness={0.35}
          depthWrite={false}
        />
      </mesh>
      <DustMotes />
    </group>
  );
}
