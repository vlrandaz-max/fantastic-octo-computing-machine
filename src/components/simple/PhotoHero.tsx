export interface HeroSlide {
  src: string;
  /** CSS background-position, to keep each photo's subject in frame. */
  position: string;
}

/**
 * Crossfading photo header with the page heading set over it, as on the
 * Falcon Estates page. Pass exactly six slides: the shared
 * `.classic-bg-slide` crossfade in global.css is timed for six.
 */
export function PhotoHero({
  slides,
  eyebrow,
  title,
  subtitle,
}: {
  slides: HeroSlide[];
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="photo-hero">
      <div style={{ position: 'absolute', inset: 0 }}>
        {slides.map((slide) => (
          <div
            key={slide.src}
            className="classic-bg-slide"
            style={{ backgroundImage: `url('${slide.src}')`, backgroundPosition: slide.position }}
          />
        ))}
      </div>
      <div className="photo-hero-scrim" />
      <div className="photo-hero-content">
        <p className="photo-hero-eyebrow">{eyebrow}</p>
        <h1 className="photo-hero-title">{title}</h1>
        <p className="photo-hero-subtitle">{subtitle}</p>
      </div>
    </section>
  );
}
