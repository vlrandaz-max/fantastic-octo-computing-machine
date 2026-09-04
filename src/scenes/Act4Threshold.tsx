import { PhotoPlane } from './PhotoPlane';

/** Act IV (The Threshold) — full daylight, real entry photography. */
export function Act4Threshold() {
  return (
    <PhotoPlane
      url="/assets/home/grandeur-exterior.jpg"
      position={[0, 0.25, -2.2]}
      size={[3.6, 2.2]}
      fadeWindow={[2.75, 3.05, 3.85, 4.15]}
      brightness={1.3}
    />
  );
}
