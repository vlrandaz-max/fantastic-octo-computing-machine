interface AccordionImage {
  src: string;
  alt: string;
}

/**
 * Full-bleed row of images that expands whichever one is hovered —
 * the horizontal "image accordion" treatment this page's reference
 * template uses as a photo interlude between content sections.
 */
export function AccordionGallery({ images }: { images: AccordionImage[] }) {
  return (
    <div className="accordion-gallery" style={{ display: 'flex', height: 520, width: '100%' }}>
      {images.map((img) => (
        <div
          key={img.src}
          className="accordion-gallery-item"
          style={{
            flex: 1,
            minWidth: 0,
            backgroundImage: `url('${img.src}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'flex var(--transition-slow) var(--ease-out)',
          }}
          role="img"
          aria-label={img.alt}
        />
      ))}
    </div>
  );
}
