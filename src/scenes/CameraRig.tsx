import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  CAMERA_KEYFRAMES,
  LIGHT_KEYFRAMES,
  lerpKeyframe,
  lerpLight,
  sampleAtProgress,
} from './cameraKeyframes';
import { experienceStore } from '../state/experience';
import { focusTarget } from './focusTarget';

const DAMPING_LAMBDA = 6.2; // ≈ 0.1 damping factor per 60fps frame — weight, not a snap.

function angleToPosition(elevation: number, azimuth: number, distance: number, target: THREE.Vector3, out: THREE.Vector3) {
  const el = THREE.MathUtils.degToRad(elevation);
  const az = THREE.MathUtils.degToRad(azimuth);
  out.set(
    target.x + distance * Math.cos(el) * Math.sin(az),
    target.y + distance * Math.sin(el),
    target.z + distance * Math.cos(el) * Math.cos(az),
  );
  return out;
}

export function CameraRig({
  keyLightRef,
  ambientLightRef,
}: {
  keyLightRef: React.RefObject<THREE.DirectionalLight | null>;
  ambientLightRef: React.RefObject<THREE.AmbientLight | null>;
}) {
  const { camera, pointer } = useThree();
  const lookTarget = useRef(new THREE.Vector3());
  const lightPos = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const st = experienceStore.get();
    const dt = Math.min(delta, 1 / 15); // guard against tab-switch spikes
    const damp = 1 - Math.exp(-DAMPING_LAMBDA * dt);
    const nextSmooth = THREE.MathUtils.lerp(st.smoothProgress, st.rawProgress, damp);
    experienceStore.setSmoothProgress(nextSmooth);

    const camState = sampleAtProgress(CAMERA_KEYFRAMES, nextSmooth, lerpKeyframe);
    camera.position.set(...camState.position);
    lookTarget.current.set(...camState.lookAt);
    camera.lookAt(lookTarget.current);
    focusTarget.copy(lookTarget.current);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = camState.fov;
      camera.updateProjectionMatrix();
    }

    const lightState = sampleAtProgress(LIGHT_KEYFRAMES, nextSmooth, lerpLight);

    // Cursor nudges the light angle a few degrees — restrained, only alive
    // during Act I so it never fights the choreographed lighting later.
    const actOneWeight = THREE.MathUtils.clamp(1 - nextSmooth, 0, 1);
    const nudgeEl = pointer.y * 4 * actOneWeight;
    const nudgeAz = pointer.x * 6 * actOneWeight;

    const key = keyLightRef.current;
    if (key) {
      angleToPosition(
        lightState.elevation + nudgeEl,
        lightState.azimuth + nudgeAz,
        4,
        lookTarget.current,
        lightPos.current,
      );
      key.position.copy(lightPos.current);
      key.color.set(lightState.color);
      key.intensity = lightState.intensity;
      key.target.position.copy(lookTarget.current);
      key.target.updateMatrixWorld();
    }
    const amb = ambientLightRef.current;
    if (amb) {
      amb.color.set(lightState.ambientColor);
      amb.intensity = lightState.ambient;
    }
  });

  return null;
}
