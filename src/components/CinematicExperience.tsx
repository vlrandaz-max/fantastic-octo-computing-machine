import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Experience3D } from '../scenes/Experience3D';
import { Nav } from './ui/Nav';
import { PreloadScreen } from './ui/PreloadScreen';
import { Footer } from './ui/Footer';
import { CommunityBranch } from './ui/CommunityBranch';
import { InvitationCTA } from './ui/InvitationCTA';
import { ACT_CONTENT } from './ui/actContent';
import { ACT_COUNT, experienceStore, useExperienceState } from '../state/experience';

gsap.registerPlugin(ScrollTrigger);

export function CinematicExperience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { preloadDone } = useExperienceState();

  useEffect(() => {
    document.body.style.overflow = preloadDone ? '' : 'hidden';
    if (preloadDone) ScrollTrigger.refresh();
  }, [preloadDone]);

  useEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    const ctx = gsap.context(() => {
      const proxy = { progress: 0 };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin,
          anticipatePin: 1,
        },
      });

      tl.to(
        proxy,
        {
          progress: ACT_COUNT,
          ease: 'none',
          duration: ACT_COUNT,
          onUpdate: () => experienceStore.setRawProgress(proxy.progress),
        },
        0,
      );

      ACT_CONTENT.forEach((_, i) => {
        const el = overlayRefs.current[i];
        if (!el) return;
        gsap.set(el, { opacity: 0 });
        tl.to(el, { opacity: 1, duration: 0.35, ease: 'power2.out' }, i + 0.12);
        tl.to(el, { opacity: 0, duration: 0.3, ease: 'power2.in' }, i + 0.82);
      });
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <div id="top">
      <a href="#footer-content" className="skip-link">
        Skip to contact &amp; navigation
      </a>
      <PreloadScreen />

      <div ref={trackRef} style={{ position: 'relative', height: `${ACT_COUNT * 100}vh` }}>
        {ACT_CONTENT.map((act, i) => (
          <div key={act.id} id={act.id} style={{ position: 'absolute', top: `${i * 100}vh`, height: '1px', width: '1px' }} />
        ))}

        <div ref={pinRef} style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
          <Experience3D />

          <Nav />

          {ACT_CONTENT.map((act, i) => (
            <div
              key={act.id}
              ref={(el) => {
                overlayRefs.current[i] = el;
              }}
              style={{ position: 'absolute', zIndex: 10, ...act.wrapperStyle }}
            >
              {act.node}
              {act.id === 'land' && <CommunityBranch />}
              {act.id === 'invitation' && <InvitationCTA />}
            </div>
          ))}
        </div>
      </div>

      <div id="footer-content">
        <Footer />
      </div>
    </div>
  );
}
