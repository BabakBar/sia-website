import type { Post } from '@/types';

export const posts: Post[] = [
  {
    slug: 'telegram-is-the-cheapest-frontend-i-know',
    title: 'Telegram Is the Cheapest Frontend I Know',
    publishedAt: '2026-07-28',
    description:
      'Why I keep reaching for a Telegram bot for digests, voice capture, alerts, and small ops checks before I build a web app.',
    readTime: '4 min read',
    component: () => import('./telegram-is-the-cheapest-frontend-i-know.mdx'),
  },
];
