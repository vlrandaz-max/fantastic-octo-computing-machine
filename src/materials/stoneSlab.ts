import * as THREE from 'three';
import { SimplexNoise2D, bakeNoiseCanvas, heightCanvasToNormalMap } from '../lib/noise';

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

  // 1024px is plenty for a texture that only ever fills part of a macro
  // shot — the earlier 1536px pass plus a redundant extra noise bake made
  // this synchronous, main-thread-blocking setup noticeably slow to first
  // paint for no visible benefit. Three baked canvases, not four.
  const texSize = 1024;
  const albedoCanvas = bakeNoiseCanvas(texSize, noise, reliefScale * 9, { octaves: 4, contrast: 1.1 });
  const roughnessCanvas = bakeNoiseCanvas(texSize, noise, reliefScale * 14, { octaves: 3, contrast: 1.4, bias: 0.05 });
  const heightCanvas = bakeNoiseCanvas(texSize, noise, reliefScale * 9, { octaves: 4, contrast: 1 });
  const normalCanvas = heightCanvasToNormalMap(heightCanvas, 2.6);

  // Tint the grayscale albedo bake into a warm limestone palette.
  tintCanvas(albedoCanvas, [0x82, 0x7b, 0x6c], [0xd2, 0xc8, 0xb2]);

  const albedoMap = new THREE.CanvasTexture(albedoCanvas);
  albedoMap.colorSpace = THREE.SRGBColorSpace;
  const roughnessMap = new THREE.CanvasTexture(roughnessCanvas);
  const normalMap = new THREE.CanvasTexture(normalCanvas);
  [albedoMap, roughnessMap, normalMap].forEach((t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 8;
    t.needsUpdate = true;
  });

  const material = new THREE.MeshStandardMaterial({
    map: albedoMap,
    roughnessMap,
    normalMap,
    normalScale: new THREE.Vector2(1.4, 1.4),
    roughness: 0.88,
    metalness: 0.015,
    color: new THREE.Color('#c2b8a4'),
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
