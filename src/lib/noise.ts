// Self-contained 2D simplex noise + fractal Brownian motion.
// Used to procedurally displace the Act I stone geometry and to bake
// its albedo/roughness/AO textures — no external texture assets.
// Adapted from the public-domain reference algorithm (Stefan Gustavson).

const GRAD3: [number, number][] = [
  [1, 1], [-1, 1], [1, -1], [-1, -1],
  [1, 0], [-1, 0], [1, 0], [-1, 0],
  [0, 1], [0, -1], [0, 1], [0, -1],
];

function buildPermutation(seed: number): Uint8Array {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = seed >>> 0 || 1;
  const rand = () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  return perm;
}

export class SimplexNoise2D {
  private perm: Uint8Array;

  constructor(seed = 1337) {
    this.perm = buildPermutation(seed);
  }

  noise(xin: number, yin: number): number {
    const perm = this.perm;
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;

    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;

    const ii = i & 255;
    const jj = j & 255;

    const gi0 = perm[ii + perm[jj]] % 12;
    const gi1 = perm[ii + i1 + perm[jj + j1]] % 12;
    const gi2 = perm[ii + 1 + perm[jj + 1]] % 12;

    const contrib = (gi: number, x: number, y: number) => {
      let t0 = 0.5 - x * x - y * y;
      if (t0 < 0) return 0;
      t0 *= t0;
      const [gx, gy] = GRAD3[gi];
      return t0 * t0 * (gx * x + gy * y);
    };

    const n0 = contrib(gi0, x0, y0);
    const n1 = contrib(gi1, x1, y1);
    const n2 = contrib(gi2, x2, y2);

    return 70 * (n0 + n1 + n2);
  }

  /** Fractal Brownian motion — layered octaves for natural stone-grain irregularity. */
  fbm(x: number, y: number, octaves = 5, lacunarity = 2.05, gain = 0.52): number {
    let amp = 0.5;
    let freq = 1;
    let sum = 0;
    let norm = 0;
    for (let o = 0; o < octaves; o++) {
      sum += amp * this.noise(x * freq, y * freq);
      norm += amp;
      amp *= gain;
      freq *= lacunarity;
    }
    return sum / norm;
  }
}

/** Bakes a grayscale fbm field to a canvas — used for bump/roughness/AO maps. */
export function bakeNoiseCanvas(
  size: number,
  noise: SimplexNoise2D,
  scale: number,
  opts: { octaves?: number; contrast?: number; bias?: number } = {},
): HTMLCanvasElement {
  const { octaves = 5, contrast = 1, bias = 0 } = opts;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = (x / size) * scale;
      const ny = (y / size) * scale;
      let v = noise.fbm(nx, ny, octaves) * 0.5 + 0.5;
      v = Math.min(1, Math.max(0, (v - 0.5) * contrast + 0.5 + bias));
      const idx = (y * size + x) * 4;
      const c = Math.round(v * 255);
      img.data[idx] = c;
      img.data[idx + 1] = c;
      img.data[idx + 2] = c;
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}
