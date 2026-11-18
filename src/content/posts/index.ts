import type { Post } from '@/types';

const publishedPosts: Post[] = [];

// A fresh checkout can build without the Git-ignored preview registry.
const previewPosts = import.meta.env?.DEV && import.meta.env.MODE === 'blog-preview'
  ? import.meta.glob<Post[]>('./preview.local/posts.ts', { eager: true, import: 'default' })[
      './preview.local/posts.ts'
    ] ?? []
  : [];

export const posts: Post[] = [...publishedPosts, ...previewPosts];
