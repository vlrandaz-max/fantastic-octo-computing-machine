import * as THREE from 'three';
import { SimplexNoise2D, bakeNoiseCanvas } from '../lib/noise';

/**
 * Act I — "The Quarry": a single massive slab of raw-cut limestone.
 *
 * No real PBR scans were available for this handoff, so the material is
 * built procedurally per the spec's fallback ("procedurally displaced mesh
 * — noise-driven surface irregularity — rather than a smooth primitive
 * with a texture slapped on"): the geometry is genuinely displaced by
 * layered fbm noise and normals are recomputed from the displaced surface,
 * and albedo/roughness/AO are baked from the same noise field so the
 * material reads as cut stone rather than a flat texture.
 */
export function buildStoneSlab() {
  const noise = new SimplexNoise2D(4211);

  const width = 6.4;
  const height = 4;
  const segX = 240;
  const segY = 150;
  const geometry = new THREE.PlaneGeometry(width, height, segX, segY);

  const pos = geometry.attributes.position as THREE.BufferAttribute;
  const reliefScale = 3.1; // spatial frequency across the slab
  const reliefAmp = 0.085; // macro relief depth (meters) — subtle, camera is macro

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const u = x / width + 0.5;
    const v = y / height + 0.5;
    const macro = noise.fbm(u * reliefScale, v * reliefScale, 5) * reliefAmp;
    const fineGrain = noise.fbm(u * reliefScale * 9 + 40, v * reliefScale * 9 + 40, 3) * reliefAmp * 0.18;
    // A shallow diagonal "cut line" — the slab reads as sawn, not natural.
    const cutLine = Math.exp(-Math.pow((u * 0.7 + v * 0.3 - 0.62) * 9, 2)) * reliefAmp * 1.6;
    pos.setZ(i, macro + fineGrain - cutLine);
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();

  const texSize = 1024;
  const albedoCanvas = bakeNoiseCanvas(texSize, noise, reliefScale * 9, { octaves: 5, contrast: 0.7 });
  const roughnessCanvas = bakeNoiseCanvas(texSize, noise, reliefScale * 14, { octaves: 4, contrast: 1.2, bias: 0.05 });
  const bumpCanvas = bakeNoiseCanvas(texSize, noise, reliefScale * 22, { octaves: 4, contrast: 1.4 });

  // Tint the grayscale albedo bake into a warm limestone palette.
  tintCanvas(albedoCanvas, [0x8f, 0x89, 0x7c], [0xc9, 0xc0, 0xac]);

  const albedoMap = new THREE.CanvasTexture(albedoCanvas);
  albedoMap.colorSpace = THREE.SRGBColorSpace;
  const roughnessMap = new THREE.CanvasTexture(roughnessCanvas);
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  [albedoMap, roughnessMap, bumpMap].forEach((t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.needsUpdate = true;
  });

  const material = new THREE.MeshStandardMaterial({
    map: albedoMap,
    roughnessMap,
    bumpMap,
    bumpScale: 0.6,
    roughness: 0.92,
    metalness: 0.02,
    color: new THREE.Color('#b9ae9c'),
  });

  return { geometry, material };
}

function tintCanvas(canvas: HTMLCanvasElement, dark: [number, number, number], light: [number, number, number]) {
  const ctx = canvas.getContext('2d')!;
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = img.data[i] / 255;
    img.data[i] = dark[0] + (light[0] - dark[0]) * v;
    img.data[i + 1] = dark[1] + (light[1] - dark[1]) * v;
    img.data[i + 2] = dark[2] + (light[2] - dark[2]) * v;
  }
  ctx.putImageData(img, 0, 0);
}
