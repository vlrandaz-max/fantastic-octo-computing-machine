import * as THREE from 'three';

/**
 * Shared world-space point the camera is currently looking at. CameraRig
 * writes to it every frame; DepthOfFieldRig reads it as the postprocessing
 * focus target. Previously DepthOfField used a fixed `focusDistance` that
 * didn't track the camera, so the actual subject sat outside the focused
 * plane and read as a blurry smear instead of "shallow DOF, sharp subject."
 */
export const focusTarget = new THREE.Vector3();
