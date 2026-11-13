import { useEffect, useMemo, useState } from 'react';
import { SimpleNav } from './simple/SimpleNav';
import { SimpleFooter } from './simple/SimpleFooter';
import { Reveal } from './Reveal';
import { GALLERY_PHOTOS } from '../data/galleryPhotos';
import { withBase } from '../lib/url';

type Filter = 'all' | 'exterior' | 'interior';

// Descriptions read "The Stratford — media room" or just "Kitchen"; split
// into a tile title and a smaller detail line.
function caption(alt: string, category: 'exterior' | 'interior') {
  const [title, rest] = alt.split(' — ');
  const detail = rest ?? (category === 'exterior' ? 'Exterior' : 'Interior');
  return { title, detail: detail.charAt(0).toUpperCase() + detail.slice(1) };
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All Photos' },
  { key: 'exterior', label: 'Exteriors' },
  { key: 'interior', label: 'Interiors' },
];

/** Full photo gallery — linked from every "View Full Gallery" CTA on the site. */
export function GalleryPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = useMemo(
    () => (filter === 'all' ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter((p) => p.category === filter)),
    [filter],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, photos.length]);

  // Filtering can shrink the list out from under an open lightbox index.
  useEffect(() => {
    if (lightboxIndex !== null && lightboxIndex >= photos.length) setLightboxIndex(null);
  }, [photos.length, lightboxIndex]);

  return (
    <div style={{ background: '#FFFFFF' }}>
      <div style={{ position: 'relative', height: 260 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `url('${withBase('/assets/home/family-room-3-staged.jpg')}') center / cover no-repeat`,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,10,8,0.6)' }} />
        <SimpleNav />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0 40px 32px',
          }}
        >
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(2rem,4vw,3rem)', color: '#F2F0E6' }}>
            Full Gallery
          </h1>
        </div>
      </div>

      <div style={{ background: 'var(--bg1)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 32px 96px' }}>
        <nav aria-label="Filter photos" className="gallery-filters">
          {FILTERS.map((f) => {
            const count = f.key === 'all' ? GALLERY_PHOTOS.length : GALLERY_PHOTOS.filter((p) => p.category === f.key).length;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className="gallery-filter"
                aria-pressed={filter === f.key}
              >
                {f.label}
                <span className="gallery-filter-count">{count}</span>
              </button>
            );
          })}
        </nav>

        <div className="gallery-tiles">
          {photos.map((photo, i) => {
            const { title, detail } = caption(photo.alt, photo.category);
            return (
              <Reveal key={photo.src} type="fade-in-up" delay={(i % 3) * 90}>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="explore-tile gallery-tile"
                  aria-label={`View larger: ${photo.alt}`}
                >
                  <img src={photo.src} alt="" loading="lazy" />
                  <span className="explore-tile-frame" aria-hidden="true" />
                  <span className="explore-tile-body">
                    <span className="explore-tile-title">{title}</span>
                    <span className="explore-tile-rule" aria-hidden="true" />
                    <span className="explore-tile-detail">
                      {detail}
                      <span className="gallery-tile-expand" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
      </div>

      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setLightboxIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(8,7,6,0.94)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
          }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightboxIndex(null)}
            style={{ position: 'fixed', top: 24, right: 28, color: '#F2F0E6', fontSize: 28, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ✕
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
            }}
            style={{ position: 'fixed', left: 20, top: '50%', transform: 'translateY(-50%)', color: '#F2F0E6', fontSize: 36, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ‹
          </button>
          <img
            src={photos[lightboxIndex].src}
            alt={photos[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '88vw', maxHeight: '84vh', objectFit: 'contain', boxShadow: 'var(--shadow-4)' }}
          />
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? i : (i + 1) % photos.length));
            }}
            style={{ position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', color: '#F2F0E6', fontSize: 36, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ›
          </button>
          <p style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', color: 'rgba(242,240,230,0.7)', fontSize: 13 }}>
            {photos[lightboxIndex].alt} &middot; {lightboxIndex + 1} / {photos.length}
          </p>
        </div>
      )}

      <SimpleFooter />
    </div>
  );
}
