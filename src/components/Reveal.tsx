import { useEffect, useRef, useState } from 'react';

export type RevealType = 'fade-in-down' | 'fade-in' | 'fade-in-up' | 'fade-in-right' | 'fade-in-left';

/** Tracks whether an element has scrolled into view, once — the shared logic
 * behind Reveal, and behind any element (like a flex/grid item) that needs
 * the animation classes applied directly rather than via a wrapper div. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/** For pages that render raw HTML via dangerouslySetInnerHTML (no individual
 * React elements to hook per-image): scans the container for any element
 * carrying the `.reveal` class after mount and observes each one, adding
 * `.is-visible` once it scrolls into view. The `.reveal`/`fade-in-*` CSS is
 * shared with the Reveal component above, so markup just needs classes like
 * `class="reveal fade-in-up"` (optionally `style="animation-delay:100ms"`). */
export function useRevealScope<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const elements = container.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}

/** Fades/slides its children in once, the first time they scroll into view —
 * mirrors the Elementor `_animation` scroll-entrance pattern used throughout
 * lassalehomes.com (fadeInDown/fadeIn/fadeInUp/fadeInRight/fadeInLeft). */
export function Reveal({
  children,
  type,
  delay = 0,
  style,
  className,
}: {
  children: React.ReactNode;
  type: RevealType;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${type}${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ animationDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </div>
  );
}
