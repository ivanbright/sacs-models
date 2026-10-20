export type GalleryCategory = 'Nature' | 'City' | 'People' | 'Food' | 'Tech' | 'Abstract';

export interface GalleryImage {
  id: string;
  title: string;
  author: string;
  category: GalleryCategory;
  uri: string;
  fullUri: string;
  blurhash: string;
  likes: number;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Nature',
  'City',
  'People',
  'Food',
  'Tech',
  'Abstract',
];

const BLURHASH = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';

function photo(seed: string): Pick<GalleryImage, 'uri' | 'fullUri' | 'blurhash'> {
  return {
    uri: `https://picsum.photos/seed/${seed}/600/800`,
    fullUri: `https://picsum.photos/seed/${seed}/900/1200`,
    blurhash: BLURHASH,
  };
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'alpine-drift',
    title: 'Alpine Drift',
    author: 'Anna Keller',
    category: 'Nature',
    likes: 342,
    ...photo('makro-alpine'),
  },
  {
    id: 'pine-hollow',
    title: 'Pine Hollow',
    author: 'Marco Ruiz',
    category: 'Nature',
    likes: 128,
    ...photo('makro-pines'),
  },
  {
    id: 'tide-lines',
    title: 'Tide Lines',
    author: 'Sofia Lind',
    category: 'Nature',
    likes: 511,
    ...photo('makro-tides'),
  },
  {
    id: 'dune-light',
    title: 'Dune Light',
    author: 'Omar Haddad',
    category: 'Nature',
    likes: 97,
    ...photo('makro-dunes'),
  },
  {
    id: 'glass-canyon',
    title: 'Glass Canyon',
    author: 'Leo Park',
    category: 'City',
    likes: 264,
    ...photo('makro-glass'),
  },
  {
    id: 'night-crossing',
    title: 'Night Crossing',
    author: 'Mira Novak',
    category: 'City',
    likes: 489,
    ...photo('makro-night'),
  },
  {
    id: 'brick-and-wire',
    title: 'Brick & Wire',
    author: 'Tom Weaver',
    category: 'City',
    likes: 76,
    ...photo('makro-brick'),
  },
  {
    id: 'sunday-market',
    title: 'Sunday Market',
    author: 'Ines Costa',
    category: 'People',
    likes: 623,
    ...photo('makro-market'),
  },
  {
    id: 'quiet-focus',
    title: 'Quiet Focus',
    author: 'Daniel Osei',
    category: 'People',
    likes: 154,
    ...photo('makro-focus'),
  },
  {
    id: 'backlit',
    title: 'Backlit',
    author: 'Yuki Tanaka',
    category: 'People',
    likes: 388,
    ...photo('makro-backlit'),
  },
  {
    id: 'slow-roast',
    title: 'Slow Roast',
    author: 'Clara Meyer',
    category: 'Food',
    likes: 205,
    ...photo('makro-roast'),
  },
  {
    id: 'morning-pour',
    title: 'Morning Pour',
    author: 'Ben Asher',
    category: 'Food',
    likes: 331,
    ...photo('makro-pour'),
  },
  {
    id: 'circuit-bloom',
    title: 'Circuit Bloom',
    author: 'Priya Nair',
    category: 'Tech',
    likes: 442,
    ...photo('makro-circuit'),
  },
  {
    id: 'desk-ritual',
    title: 'Desk Ritual',
    author: 'Sam Ford',
    category: 'Tech',
    likes: 118,
    ...photo('makro-desk'),
  },
  {
    id: 'color-field',
    title: 'Color Field',
    author: 'Noor Ali',
    category: 'Abstract',
    likes: 275,
    ...photo('makro-field'),
  },
  {
    id: 'fold-study',
    title: 'Fold Study',
    author: 'Elin Dahl',
    category: 'Abstract',
    likes: 163,
    ...photo('makro-fold'),
  },
];
