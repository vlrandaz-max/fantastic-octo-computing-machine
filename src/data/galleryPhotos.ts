import { withBase } from '../lib/url';

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
  { src: 'coachwood-twilight-2.png', alt: 'Coachwood — twilight', category: 'exterior' },
  { src: 'coachwood-aerial-mls-2.png', alt: 'Coachwood — aerial', category: 'exterior' },
  { src: 'coachwood-rear-aerial-mls.jpg', alt: 'Coachwood — rear aerial', category: 'exterior' },
  { src: 'coachwood-rear-aerial-mls-2.jpg', alt: 'Coachwood — rear aerial', category: 'exterior' },
  { src: '829-crestwood-front.jpg', alt: '829 Crestwood — front', category: 'exterior' },
  { src: '835-crestwood-front.jpg', alt: '835 Crestwood — front', category: 'exterior' },
  { src: 'madison-twilight.jpg', alt: 'The Madison — twilight exterior', category: 'exterior' },
  { src: 'madison-exterior.jpg', alt: 'The Madison — daytime exterior', category: 'exterior' },
  { src: 'madison-exteriors-2.jpg', alt: 'The Madison — aerial exterior', category: 'exterior' },

  { src: 'foyer-staged.jpg', alt: 'Foyer', category: 'interior' },
  { src: 'kitchen-staged-1.png', alt: 'Kitchen', category: 'interior' },
  { src: 'kitchen-staged-2.png', alt: 'Kitchen', category: 'interior' },
  { src: 'kitchen-full-run.jpg', alt: 'Kitchen', category: 'interior' },
  { src: 'butlers-pantry-staged.jpg', alt: "Butler's pantry", category: 'interior' },
  { src: 'nook-staged.png', alt: 'Breakfast nook', category: 'interior' },
  { src: 'dining-room-staged-2.jpg', alt: 'Dining room', category: 'interior' },
  { src: 'family-room-3-staged.jpg', alt: 'Great room', category: 'interior' },
  { src: 'family-room-1-staged.jpg', alt: 'Family room', category: 'interior' },
  { src: 'family-room-bath-staged.jpg', alt: 'Family room — bath', category: 'interior' },
  { src: 'flex-room-staged.jpg', alt: 'Flex room', category: 'interior' },
  { src: 'library-staged.png', alt: 'Library', category: 'interior' },
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
  { src: 'crestwood-dining-room.jpg', alt: 'The Crestwood — dining room', category: 'interior' },
  { src: 'crestwood-family-dining.jpg', alt: 'The Crestwood — family room & dining', category: 'interior' },
  { src: 'crestwood-owners-suite.jpg', alt: "The Crestwood — owner's suite", category: 'interior' },
  { src: 'crestwood-study.jpg', alt: 'The Crestwood — study', category: 'interior' },
  { src: 'cambridge-foyer.jpg', alt: 'The Cambridge — foyer', category: 'interior' },
  { src: 'cambridge-living-room.jpg', alt: 'The Cambridge — living room', category: 'interior' },
  { src: 'cambridge-family-room-2.jpg', alt: 'The Cambridge — family room', category: 'interior' },
  { src: 'cambridge-dining-room.jpg', alt: 'The Cambridge — dining room', category: 'interior' },
  { src: 'cambridge-study.jpg', alt: 'The Cambridge — study', category: 'interior' },
  { src: 'cambridge-master-bedroom.jpg', alt: 'The Cambridge — primary bedroom', category: 'interior' },
  { src: 'stratford-family-room.jpg', alt: 'The Stratford — family room', category: 'interior' },
  { src: 'stratford-family-kitchen.jpg', alt: 'The Stratford — family room and kitchen', category: 'interior' },
  { src: 'stratford-bar-kitchen-nook-family.jpg', alt: 'The Stratford — bar, kitchen nook, and family room', category: 'interior' },
  { src: 'stratford-dining-room.jpg', alt: 'The Stratford — dining room', category: 'interior' },
  { src: 'stratford-study.jpg', alt: 'The Stratford — study', category: 'interior' },
  { src: 'stratford-media-room.jpg', alt: 'The Stratford — media room', category: 'interior' },
  { src: 'stratford-owners-suite.jpg', alt: "The Stratford — owner's suite", category: 'interior' },
  { src: 'stratford-private-bedroom.jpg', alt: 'The Stratford — private bedroom', category: 'interior' },
  { src: 'stratford-jack-bedroom.jpg', alt: 'The Stratford — Jack and Jill bedroom', category: 'interior' },
  { src: 'stratford-jill-bedroom.jpg', alt: 'The Stratford — Jack and Jill bedroom', category: 'interior' },
  { src: 'madison-interior-26.jpg', alt: 'The Madison — great room', category: 'interior' },
  { src: 'madison-interior-14.jpg', alt: 'The Madison — kitchen', category: 'interior' },
  { src: 'madison-interior-15.jpg', alt: 'The Madison — kitchen island', category: 'interior' },
  { src: 'madison-kitchen-nook.jpg', alt: 'The Madison — kitchen and breakfast nook', category: 'interior' },
  { src: 'madison-interior-10.jpg', alt: "The Madison — wet bar and butler's pantry", category: 'interior' },
  { src: 'madison-interior-11.jpg', alt: "The Madison — wet bar and butler's pantry", category: 'interior' },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = RAW_PHOTOS.map((p) => ({ ...p, src: withBase(`/assets/home/${p.src}`) }));
