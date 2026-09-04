import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { experienceStore } from '../state/experience';

/**
 * Act V (The Household) — real walkthrough footage (dining, kitchen, great
 * room, primary suite) as a looping, muted background video rather than a
 * crossfading photo sequence. Genuine motion reads as considerably more
 * "real environment, lit" than stills ever could.
 *
 * Builds the HTMLVideoElement + THREE.VideoTexture directly rather than
 * using drei's `useVideoTexture` — that hook statically imports hls.js for
 * streaming support this local mp4 file will never use, and pulled ~550KB
 * onto the bundle for a feature this scene doesn't need.
 */
export function Act5Household() {
  const video = useMemo(() => {
    const el = document.createElement('video');
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute('muted', ''); // some browsers gate autoplay on the attribute, not just the property
    el.loop = true;
    el.playsInline = true;
    el.setAttribute('playsinline', '');
    el.crossOrigin = 'anonymous';
    el.preload = 'auto';
    // A handful of browsers won't reliably decode/play a video element
    // that's never attached to the document, even when only used as a
    // WebGL texture source — it rendered solid black without this.
    // Kept out of layout and hidden from the accessibility tree; it's
    // purely a texture source, the real content is the mesh below.
    el.style.position = 'fixed';
    el.style.width = '1px';
    el.style.height = '1px';
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(el);
    el.src = '/assets/video/household-tour.mp4';
    el.play().catch(() => {
      // Autoplay can be blocked before any user gesture on some browsers —
      // the poster-less first frame just stays black until it can play.
    });
    return el;
  }, []);

  const texture = useMemo(() => {
    const t = new THREE.VideoTexture(video);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [video]);

  useEffect(() => () => {
    video.pause();
    video.src = '';
    video.remove();
    texture.dispose();
  }, [video, texture]);

  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const progress = experienceStore.get().smoothProgress;
    const fadeIn = THREE.MathUtils.smoothstep(progress, 3.75, 4.05);
    const fadeOut = 1 - THREE.MathUtils.smoothstep(progress, 4.85, 5.15);
    const opacity = Math.min(fadeIn, fadeOut);
    if (mesh.current) {
      mesh.current.visible = opacity > 0.01;
      (mesh.current.material as THREE.Material).opacity = opacity;
    }
  });

  return (
    <mesh ref={mesh} position={[-0.3, 0.15, -3.4]}>
      <planeGeometry args={[3.4, 1.9125]} />
      <meshBasicMaterial map={texture} transparent opacity={0} toneMapped={false} />
    </mesh>
  );
}
