/**
 * Real content from the live landrhomes.com WordPress site, transcribed
 * from a screen recording of the site (Sept 2026) so the mockups use
 * actual company facts/copy/home names rather than invented placeholders.
 *
 * Photography note: only `grandeur-exterior.jpg` and the two
 * `*-crestwood-front.jpg` files are confirmed photos of their named
 * homes (filename matches the model name). Cambridge, Madison, Stratford,
 * The Majestic, and The Heritage have no dedicated photo in this asset
 * set, so they reuse other real L&R exterior photography as stand-ins —
 * flagged here rather than left unstated.
 */

export const COMPANY = {
  name: 'L & R Homes, Inc.',
  tagline: 'Time-honored craftsmanship and thoughtfully built homes in Metro Detroit’s most desirable communities.',
  foundedBadge: 'EST. 1973 · ROCHESTER HILLS, MI',
  address: '2490 Walton Boulevard, Suite 103, Rochester Hills, MI 48309',
  addressShort: '2490 Walton Blvd Suite 103, Rochester Hills, MI 48309',
  phone: '(248) 656-8830',
  phoneHref: 'tel:2486568830',
  email: 'info@landrhomes.com',
  stats: [
    { value: '50+', label: 'Years of Craftsmanship' },
    { value: '1973', label: 'Founded In' },
    { value: 'Rochester Hills', label: 'Metro Detroit, MI' },
  ],
  ourStory: {
    eyebrow: 'Our Story',
    heading: 'Attention to Detail. Hands-On Management.',
    body: [
      'Founded in 1973, L&R Homes, Inc. is proud to have remained true to its founding ideology of attention to detail and hands-on management.',
      'Today, as needs and wants change, L&R Homes is committed to delivering your home with the time-honored style, cutting-edge amenities, and most importantly the overall value you’ve been looking for.',
      'Specializing in new construction, L&R Homes builds spec homes on desirable sites throughout Metro Detroit, delivering move-in ready homes with an abundance of the most desired amenities.',
    ],
    photoCaption: { title: 'Timeless Craftsmanship', subtitle: 'THE GRANDEUR' },
  },
  ctaBand: {
    eyebrow: 'Get in Touch',
    heading: 'Let’s Build Something Lasting',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/simple' },
  { label: 'Falcon Estates', href: '/simple#falcon-estates' },
  { label: 'Homes Available', href: '/homes-available' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Pine Woods', href: '/pine-woods' },
  { label: 'Contact Us', href: '/contact-us' },
] as const;

export type HomeStatus = 'move-in-ready' | 'sold' | 'immediate-occupancy';

export const STATUS_LABEL: Record<HomeStatus, string> = {
  'move-in-ready': 'Move-In Ready',
  sold: 'Sold',
  'immediate-occupancy': 'Immediate Occupancy',
};

export interface HomeListing {
  name: string;
  status: HomeStatus;
  image: string;
  community: 'Falcon Estates' | 'Pine Woods';
}

export const FALCON_ESTATES_HOMES: HomeListing[] = [
  { name: 'The Grandeur', status: 'move-in-ready', image: '/assets/home/grandeur-exterior.jpg', community: 'Falcon Estates' },
  { name: 'The Crestwood', status: 'sold', image: '/assets/home/829-crestwood-front.jpg', community: 'Falcon Estates' },
  { name: 'The Cambridge', status: 'sold', image: '/assets/home/coachwood-front-twilight.jpg', community: 'Falcon Estates' },
  { name: 'The Madison', status: 'sold', image: '/assets/home/coachwood-exterior-2.png', community: 'Falcon Estates' },
  { name: 'The Stratford', status: 'sold', image: '/assets/home/835-crestwood-front.jpg', community: 'Falcon Estates' },
];

export const PINE_WOODS_HOMES: HomeListing[] = [
  { name: 'The Majestic', status: 'immediate-occupancy', image: '/assets/pine-woods/majestic-exterior.jpg', community: 'Pine Woods' },
  { name: 'The Heritage', status: 'immediate-occupancy', image: '/assets/pine-woods/heritage-exterior.jpg', community: 'Pine Woods' },
];

export const FALCON_ESTATES = {
  eyebrow: 'Rochester Hills · European-Inspired',
  name: 'Falcon Estates',
  builder: 'L & R Homes, Inc.',
  body: 'An upscale enclave of finely appointed homes set on generous lots and framed by mature woodland, minutes from downtown Rochester.',
} as const;

/** Town Properties, LLC is a distinct L&R Homes affiliate — the builder of record for Pine Woods. */
export const PINE_WOODS = {
  eyebrow: 'Rochester Hills · Town Properties, LLC',
  name: 'Pine Woods',
  tagline: 'Living, Simplified',
  builder: 'Town Properties, LLC',
  builderNote: 'An L&R Homes, Inc. affiliate',
  heroBadge: 'Now Open',
  intro:
    'Pine Woods Rochester Hills is a new development of spacious, beautifully crafted homes that offer the best of both worlds. Whether you’re looking for a cozy ranch, a split-level, or a luxurious colonial, there’s a home to fit your lifestyle.',
  community: [
    {
      label: 'Schools',
      title: 'Avondale School District',
      body: 'Pine Woods is served by the Avondale School District — with easy access to Oakland University and Meadow Brook just minutes away.',
    },
    {
      label: 'Infrastructure',
      title: 'Municipal Water & Sewer',
      body: 'Served by reliable municipal water and sewer utilities. No well, no septic — full municipal-grade infrastructure from day one.',
    },
    {
      label: 'Location',
      title: 'Rochester Hills, MI 48309',
      body: 'Convenient access to M-59, I-75, dining, retail, and the vibrant Village of Rochester Hills & downtown Rochester.',
    },
    {
      label: 'Builder',
      title: 'Town Properties, LLC',
      body: 'Every Pine Woods home is built by Town Properties, LLC — an L&R Homes, Inc. affiliate.',
    },
  ],
  standardFeatures: {
    eyebrow: 'Standard Features',
    heading: 'Built to the Town Properties Standard',
    intro:
      'Every Pine Woods home built by Town Properties, LLC includes the same premium finish package throughout — from Lafata soft-close maple cabinetry to quartz countertops and a fully insulated, high-efficiency mechanical system.',
    columns: [
      {
        title: 'Kitchen',
        items: [
          'Lafata “Soft Close Maple Cabinets” with upgraded hardware',
          'Quartz countertops throughout',
          'Kitchen island or peninsula, as per plan',
          'Generous pantry & garbage disposal',
          'Under-mount stainless steel sink w/ Kohler single-lever faucet',
          'Water line to refrigerator',
          'GE dishwasher, gas cooktop, oven, range hood exhaust & built-in microwave, as per plan',
        ],
      },
      {
        title: 'Bathrooms',
        items: [
          'Lafata maple vanities with mirrors',
          'Tile floor, shower & tubs, as per plan',
          'Owner’s bath: soaking tub, separate shower with dual shower heads & clear chrome Euro shower door',
          'Owner’s bath: premium porcelain 24"x36" tile on walls, floors & shower ceiling, as per plan',
        ],
      },
      {
        title: 'Interior Features',
        items: [
          '2-story foyer with balcony, as per plan',
          '9’ ceilings on first floor',
          'Wood floors with upgraded inlay wood heat registers throughout first floor, as per plan',
          'Wall-to-wall carpeting throughout second floor, as per plan',
          'Gas fireplace with finished mantle & porcelain tile surround',
          'Premium wood trim casings, base & shoe moldings',
          'Upgraded newel posts with stained handrails, end caps & skirting, solid wrought-iron spindles',
        ],
      },
    ],
  },
  discoverCta: {
    eyebrow: 'Ready When You Are',
    heading: 'Discover Pine Woods',
    body: 'Don’t miss this opportunity to live in a prime Rochester Hills location with all the amenities. Contact us today to discover the possibilities at Pine Woods.',
  },
  legalDisclaimer:
    'Pine Woods is developed by L&R Homes, Inc. and built by Town Properties, LLC, an L&R Homes affiliate. Floor plans reproduced courtesy of Town Properties, LLC, which reserves all rights to the plan documents; the plans may not be duplicated, reproduced, copied, sold, or licensed without express written consent of Town Properties, LLC. Renderings, photography, and specifications are for marketing purposes only and are subject to change. Estimated timeframes are not guaranteed and should not be considered reliable commitments. Final pricing requires Director of Operations approval. This page does not constitute a contract or binding offer. L&R Homes, Inc. and Town Properties, LLC are equal opportunity builders and comply with all applicable Fair Housing laws.',
} as const;

export const HOMES_AVAILABLE_INTRO = {
  eyebrow: 'L&R Homes, Inc. · Custom Builder',
  heading: 'Featuring Time-Honored Style in the Most Desirable Communities',
  body: 'Come see the homes we have to offer. Each residence is thoughtfully built to the same exacting standard — available now or nearing completion in Metro Detroit’s most desirable communities. Contact us today to learn more about our current offerings.',
} as const;

export const FAIR_HOUSING_NOTE =
  'Renderings, photography, and specifications are for marketing purposes only and are subject to change. Estimated timeframes are not guaranteed and should not be considered reliable commitments. L&R Homes, Inc. is an equal opportunity builder and complies with all applicable Fair Housing laws.';
