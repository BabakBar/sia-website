import type { FavoriteBook } from '@/types';

export const favoriteBooks: FavoriteBook[] = [
  {
    title: 'Algorithms to Live By',
    authors: ['Brian Christian', 'Tom Griffiths'],
    note: 'A favorite because it turns computer science ideas into surprisingly practical life advice.',
  },
  {
    title: 'The Phoenix Project',
    authors: ['Gene Kim', 'Kevin Behr', 'George Spafford'],
    note: 'A favorite because it explains ops, delivery bottlenecks, and organizational failure without sounding academic.',
  },
  {
    title: 'Software Architecture: The Hard Parts',
    authors: ['Neal Ford', 'Mark Richards', 'Pramod Sadalage', 'Zhamak Dehghani'],
    note: 'A favorite because it stays concrete about tradeoffs instead of pretending architecture has clean answers.',
  },
];
