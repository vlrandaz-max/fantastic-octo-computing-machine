import { useEffect, useMemo, useState } from 'react';
import { SimpleNav } from './simple/SimpleNav';
import { SimpleFooter } from './simple/SimpleFooter';
import { GALLERY_PHOTOS } from '../data/galleryPhotos';

type Filter = 'all' | 'exterior' | 'interior';

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
            background: "url('/assets/home/family-room-3-staged.jpg') center / cover no-repeat",
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

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 40px 96px' }}>
        <nav aria-label="Filter photos" style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '10px 18px',
                border: '1px solid ' + (filter === f.key ? 'var(--color-brand-gold)' : 'var(--border)'),
                background: filter === f.key ? 'var(--color-brand-gold)' : 'transparent',
                color: filter === f.key ? '#131210' : 'var(--fg2)',
                cursor: 'pointer',
              }}
            >
              {f.label}
            </button>
          ))}
        </nav>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 18,
          }}
        >
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer', display: 'block' }}
              aria-label={`View larger: ${photo.alt}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 240,
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: 'var(--shadow-1)',
                  transition: 'opacity 200ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              />
            </button>
          ))}
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
