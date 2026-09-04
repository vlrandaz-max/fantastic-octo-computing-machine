import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { CameraRig } from './CameraRig';
import { Act1Stone } from './Act1Stone';
import { Act3Frame } from './Act3Frame';
import { Act4Threshold } from './Act4Threshold';
import { Act5Household } from './Act5Household';
import { Act6Land } from './Act6Land';
import { Act7Invitation } from './Act7Invitation';
import { DepthOfFieldRig } from './DepthOfFieldRig';
import { LazyMount } from './LazyMount';

/** The single continuous 3D scene all seven acts share, per Part 4. */
export function Experience3D() {
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const ambientLight = useRef<THREE.AmbientLight>(null);

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 20, near: 0.05, far: 30 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={['#0c0a08']} />
      <fog attach="fog" args={['#0c0a08', 3.5, 12]} />
      <ambientLight ref={ambientLight} intensity={0.02} />
      <directionalLight ref={keyLight} intensity={3.2} color="#fff1d6" />
      <CameraRig keyLightRef={keyLight} ambientLightRef={ambientLight} />
      <Suspense fallback={null}>
        <Act1Stone />
        <Act3Frame />
        <LazyMount activateAt={2.1}>
          <Act4Threshold />
        </LazyMount>
        <LazyMount activateAt={3.15}>
          <Act5Household />
        </LazyMount>
        <LazyMount activateAt={4.15}>
          <Act6Land />
        </LazyMount>
        <Act7Invitation />
      </Suspense>
      <DepthOfFieldRig />
    </Canvas>
  );
}
