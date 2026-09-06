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
  /** Dedicated detail-page route, when one exists — falls back to /contact-us. */
  href?: string;
}

export const FALCON_ESTATES_HOMES: HomeListing[] = [
  { name: 'The Grandeur', status: 'move-in-ready', image: '/assets/home/grandeur-exterior.jpg', community: 'Falcon Estates' },
  { name: 'The Crestwood', status: 'sold', image: '/assets/home/829-crestwood-front.jpg', community: 'Falcon Estates' },
  { name: 'The Cambridge', status: 'sold', image: '/assets/home/coachwood-front-twilight.jpg', community: 'Falcon Estates' },
  { name: 'The Madison', status: 'sold', image: '/assets/home/coachwood-exterior-2.png', community: 'Falcon Estates' },
  { name: 'The Stratford', status: 'sold', image: '/assets/home/835-crestwood-front.jpg', community: 'Falcon Estates' },
];

export const PINE_WOODS_HOMES: HomeListing[] = [
  { name: 'The Majestic', status: 'immediate-occupancy', image: '/assets/pine-woods/majestic-exterior.jpg', community: 'Pine Woods', href: '/majestic' },
  { name: 'The Heritage', status: 'immediate-occupancy', image: '/assets/pine-woods/heritage-exterior.jpg', community: 'Pine Woods', href: '/heritage' },
];

export interface HomeDetail {
  slug: 'majestic' | 'heritage';
  name: string;
  tagline: string;
  badge: string;
  addressLine: string;
  heroImage: string;
  introEyebrow: string;
  introHeadingPlain: string;
  introHeadingEmphasis: string;
  introParagraphs: string[];
  stats?: { value: string; label: string }[];
  floorPlanHeadingPlain: string;
  floorPlanHeadingEmphasis: string;
  floorPlanDescription: string;
  floorPlans: { src: string; caption: string }[];
  galleryCaption: string;
  gallery: { src: string; alt: string; caption: string }[];
  ctaEyebrow: string;
  ctaAddressLine: string;
}

/**
 * Individual home detail pages, transcribed from landrhomes.com/majestic/
 * and /heritage/. Both homes share Pine Woods' standard-features spec
 * sheet and community info (below) — only what's specific to each home
 * lives here. Heritage's opening intro sentence is a light paraphrase
 * bridging into the verbatim copy that follows (the real site's first
 * sentence scrolled past too quickly in the source recording to transcribe
 * exactly); everything else on both pages is verbatim.
 */
export const HOME_DETAILS: Record<'majestic' | 'heritage', HomeDetail> = {
  majestic: {
    slug: 'majestic',
    name: 'The Majestic',
    tagline: 'Classic Brick & Stone Architecture',
    badge: 'Now Open · Immediate Occupancy',
    addressLine: 'Rochester Hills, MI 48309',
    heroImage: '/assets/pine-woods/majestic-exterior.jpg',
    introEyebrow: 'Welcome to The Majestic',
    introHeadingPlain: 'A Floor Plan Built for',
    introHeadingEmphasis: 'Real Life',
    introParagraphs: [
      'The Majestic pairs a classic brick-and-stone façade with an open, light-filled interior — designed around the way families actually live. A sweeping great room flows directly into the kitchen and dining nook, while a private primary suite, main-floor library, and two additional bedrooms complete the first level.',
      'Upstairs, a versatile loft and bonus room offer flexible space for a media room, second family room, or home gym — whatever the household needs it to be.',
    ],
    floorPlanHeadingPlain: 'One-Level Living,',
    floorPlanHeadingEmphasis: 'Room to Grow',
    floorPlanDescription:
      'First floor: Foyer, Great Room, Kitchen, Nook, Pantry, a Primary Suite with Bath & walk-in closet, Library, Bedrooms 2–3 with a shared Bath, Laundry, and a 3-car garage. Second floor: a Loft, Bath, and Bonus Room above the garage.',
    floorPlans: [
      { src: '/assets/pine-woods/majestic-floorplan-1.jpg', caption: 'First Floor Plan' },
      { src: '/assets/pine-woods/majestic-floorplan-2.jpg', caption: 'Second Floor Plan' },
    ],
    galleryCaption: 'Photography shown is of the actual home, professionally staged and ready for immediate occupancy.',
    gallery: [
      { src: '/assets/pine-woods/majestic-kitchen-nook.jpg', alt: 'The Majestic — kitchen and breakfast nook', caption: 'Kitchen · Breakfast Nook' },
      { src: '/assets/pine-woods/majestic-owners-suite.jpg', alt: 'The Majestic — bedroom suite', caption: 'Bedroom Suite' },
      { src: '/assets/pine-woods/majestic-study.jpg', alt: 'The Majestic — library and home office', caption: 'Library / Home Office' },
    ],
    ctaEyebrow: 'Ready to Make It Yours',
    ctaAddressLine: 'Pine Woods · Rochester Hills, MI',
  },
  heritage: {
    slug: 'heritage',
    name: 'The Heritage',
    tagline: 'Colonial Architecture · Stone Elevation',
    badge: 'New Construction · Immediate Occupancy',
    addressLine: '3110 Raffler Dr · Lot 7 · Rochester Hills, MI 48309',
    heroImage: '/assets/pine-woods/heritage-exterior-twilight-front.jpg',
    introEyebrow: 'Welcome to The Heritage',
    introHeadingPlain: 'Effortless Living,',
    introHeadingEmphasis: 'Classic Style',
    introParagraphs: [
      'The Heritage brings colonial architecture and a stone elevation together with a thoughtfully designed floor plan. The great room opens directly to the kitchen, dinette, and a large walk-in pantry — the kind of open, connected first floor built for everyday life and entertaining alike.',
      'Upstairs, the primary suite offers a stepped ceiling, an expansive walk-in closet, and a spa-style bath with a soaking tub and oversized shower. Three additional bedrooms share a full bath, each with direct access for privacy and convenience.',
      'Lot 7 at 3110 Raffler Dr is move-in ready now. The Heritage is one of the homes available in Pine Woods, an exclusive enclave in Rochester Hills developed by L&R Homes, Inc. and built by Town Properties, LLC — an L&R Homes affiliate.',
    ],
    stats: [
      { value: '3,143 sq ft', label: 'Total Habitable' },
      { value: '4', label: 'Bedrooms' },
      { value: '3', label: 'Bathrooms' },
      { value: '3-Car', label: 'Garage' },
      { value: '2-Story', label: 'Colonial' },
    ],
    floorPlanHeadingPlain: '18-Foot Foyer to',
    floorPlanHeadingEmphasis: 'a Private Upstairs Retreat',
    floorPlanDescription:
      '3,143 sq ft of total habitable space. First floor: Foyer, Family Room, Kitchen, Dinette, Command Center, Pantry, Library, Mud Room, Laundry, Bath, and a 3-car garage. Second floor: Primary Suite with Primary Bath & Closet, Bedrooms 2-4, and a shared Main Bath.',
    floorPlans: [
      { src: '/assets/pine-woods/heritage-floorplan-1.jpg', caption: 'First Floor Plan' },
      { src: '/assets/pine-woods/heritage-floorplan-2.jpg', caption: 'Second Floor Plan' },
    ],
    galleryCaption: 'Photography shown is of the actual home at 3110 Raffler Dr, Lot 7, professionally staged and ready for immediate occupancy.',
    gallery: [
      { src: '/assets/pine-woods/heritage-family-room.jpg', alt: 'The Heritage — family room', caption: 'Family Room' },
      { src: '/assets/pine-woods/heritage-kitchen.jpg', alt: 'The Heritage — kitchen', caption: 'Kitchen' },
      { src: '/assets/pine-woods/heritage-primary-bedroom.jpg', alt: 'The Heritage — primary bedroom', caption: 'Primary Bedroom' },
    ],
    ctaEyebrow: 'Ready Now · Lot 7',
    ctaAddressLine: '3110 Raffler Dr · Pine Woods · Rochester Hills, MI',
  },
};

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
  /** Second row of the full spec sheet shown on individual home detail pages. */
  extraSpecs: [
    {
      title: 'Exterior & Basement',
      items: [
        'Stone elevation with premium brick / Hardie-plank siding',
        'Maintenance-free Pella windows',
        'Custom stone address',
        'CertainTeed Landmark dimensional shingles',
        '3-car garage, drywalled & skim coated',
        "8' raised-panel roll-up garage doors, prepped for openers",
        "Concrete driveway & walkway; double side-lite 8' tall front door",
        'Lawn with irrigation system',
        'Fully excavated 8\'-10" height basement walls, egress window, prepped for future bathroom',
      ],
    },
    {
      title: 'Systems & Efficiency',
      items: [
        'Energy Seal Package',
        'R-19 2x6 exterior wall insulation, R-38 ceiling',
        '95% high-efficiency furnace',
        '50-gallon high-efficiency hot water heater',
        'PEX® plumbing system & central air conditioning',
        '200-amp electrical service with circuit breakers',
        'Automatic sump pump, smoke & CO detectors',
        'Whole-house humidifier, furnace media filter & Google Nest smart thermostat',
      ],
    },
  ],
  developmentAmenities: [
    'Easy access to major thoroughfares',
    'Minutes to major retail, the Village of Rochester Hills & downtown Rochester shopping',
    'Avondale School System',
    'Proximity to Oakland University & Meadow Brook',
    'Municipal water & sewer, underground utilities',
  ],
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
