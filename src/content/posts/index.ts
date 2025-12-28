import type { Post } from '@/types';

export const posts: Post[] = [
  {
    slug: 'hello-world',
    title: 'Hello World',
    date: 'December 28, 2025',
    description: 'Welcome to my blog. This is my first post.',
    readTime: '2 min read',
    component: () => import('./hello-world.mdx'),
  },
];
