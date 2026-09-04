import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Crossfades two photographs via a luminance-biased diagonal wipe — light
 * passing across the frame — rather than a plain opacity crossfade
 * (Part 4: "Image transitions (Act V)").
 */
export const LuminanceWipeMaterial = shaderMaterial(
  {
    uTexA: null,
    uTexB: null,
    uProgress: 0,
  },
  /* vertex */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* fragment */ `
    uniform sampler2D uTexA;
    uniform sampler2D uTexB;
    uniform float uProgress;
    varying vec2 vUv;

    void main() {
      vec4 colorA = texture2D(uTexA, vUv);
      vec4 colorB = texture2D(uTexB, vUv);
      float luminance = dot(colorA.rgb, vec3(0.299, 0.587, 0.114));
      float wipeCoord = vUv.x * 0.65 + vUv.y * 0.35;
      float bias = (1.0 - luminance) * 0.3;
      float threshold = uProgress * 1.6 - 0.3;
      float edge = smoothstep(threshold - 0.18, threshold + 0.18, wipeCoord + bias);
      gl_FragColor = mix(colorA, colorB, edge);
    }
  `,
);

extend({ LuminanceWipeMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    luminanceWipeMaterial: {
      uTexA?: THREE.Texture | null;
      uTexB?: THREE.Texture | null;
      uProgress?: number;
      transparent?: boolean;
      ref?: React.Ref<unknown>;
    };
  }
}
