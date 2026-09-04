export interface GalleryPhoto {
  src: string;
  alt: string;
  category: 'exterior' | 'interior';
}

type RawPhoto = { src: string; alt: string; category: GalleryPhoto['category'] };

/** Every real photograph currently available across the L&R Homes assets. */
const RAW_PHOTOS: RawPhoto[] = [
  { src: 'coachwood-aerial-twilight-2.png', alt: 'Coachwood — twilight aerial', category: 'exterior' },
  { src: 'falcon-estates-hero.jpg', alt: 'Falcon Estates', category: 'exterior' },
  { src: 'coachwood-front-twilight.jpg', alt: 'Coachwood — twilight', category: 'exterior' },
  { src: 'coachwood-twilight-2.png', alt: 'Coachwood — twilight', category: 'exterior' },
  { src: 'coachwood-exterior-2.png', alt: 'Coachwood — exterior', category: 'exterior' },
  { src: 'coachwood-aerial-dusk-front.jpg', alt: 'Coachwood — aerial dusk', category: 'exterior' },
  { src: 'coachwood-aerial-2.jpg', alt: 'Coachwood — aerial', category: 'exterior' },
  { src: 'coachwood-aerial-mls-2.png', alt: 'Coachwood — aerial', category: 'exterior' },
  { src: 'coachwood-aerial-mls-3.png', alt: 'Coachwood — aerial', category: 'exterior' },
  { src: 'coachwood-rear-aerial-mls.jpg', alt: 'Coachwood — rear aerial', category: 'exterior' },
  { src: 'coachwood-rear-aerial-mls-2.jpg', alt: 'Coachwood — rear aerial', category: 'exterior' },
  { src: 'grandeur-exterior.jpg', alt: 'The Grandeur — exterior', category: 'exterior' },
  { src: '829-crestwood-front.jpg', alt: '829 Crestwood — front', category: 'exterior' },
  { src: '835-crestwood-front.jpg', alt: '835 Crestwood — front', category: 'exterior' },

  { src: 'foyer-staged.png', alt: 'Foyer', category: 'interior' },
  { src: 'kitchen-staged-1.png', alt: 'Kitchen', category: 'interior' },
  { src: 'kitchen-staged-2.png', alt: 'Kitchen', category: 'interior' },
  { src: 'kitchen-full-run.jpg', alt: 'Kitchen', category: 'interior' },
  { src: 'butlers-pantry-staged.jpg', alt: "Butler's pantry", category: 'interior' },
  { src: 'nook-staged.png', alt: 'Breakfast nook', category: 'interior' },
  { src: 'dining-room-staged.jpg', alt: 'Dining room', category: 'interior' },
  { src: 'dining-room-staged-2.jpg', alt: 'Dining room', category: 'interior' },
  { src: 'family-room-3-staged.png', alt: 'Great room', category: 'interior' },
  { src: 'family-room-1-staged.jpg', alt: 'Family room', category: 'interior' },
  { src: 'family-room-alt-1-staged.jpg', alt: 'Family room', category: 'interior' },
  { src: 'family-room-bath-staged.jpg', alt: 'Family room — bath', category: 'interior' },
  { src: 'flex-room-staged.jpg', alt: 'Flex room', category: 'interior' },
  { src: 'library-staged.png', alt: 'Library', category: 'interior' },
  { src: 'sitting-room-staged.png', alt: 'Sitting room', category: 'interior' },
  { src: 'sitting-room-staged-2.jpg', alt: 'Sitting room', category: 'interior' },
  { src: 'sitting-room-staged-3.jpg', alt: 'Sitting room', category: 'interior' },
  { src: 'primary-suite-1-staged.png', alt: 'Primary suite', category: 'interior' },
  { src: 'primary-suite-2-staged.png', alt: 'Primary suite', category: 'interior' },
  { src: 'primary-suite-staged-3.jpg', alt: 'Primary suite', category: 'interior' },
  { src: 'primary-suite-staged-4.png', alt: 'Primary suite', category: 'interior' },
  { src: 'powder-room-staged.jpg', alt: 'Powder room', category: 'interior' },
  { src: 'laundry-staged-1.png', alt: 'Laundry room', category: 'interior' },
  { src: 'laundry-staged-2.png', alt: 'Laundry room', category: 'interior' },
  { src: 'laundry-upstairs-staged.png', alt: 'Laundry room — upstairs', category: 'interior' },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = RAW_PHOTOS.map((p) => ({ ...p, src: `/assets/home/${p.src}` }));
