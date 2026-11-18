export interface Post {
  slug: string;
  title: string;
  publishedAt: string;
  updatedAt?: string;
  description: string;
  readTime: string;
  preview?: true;
  component: () => Promise<{ default: React.ComponentType }>;
}

export interface Project {
  title: string;
  description: string;
  url: string;
  image?: string;
}

export interface FavoriteBook {
  title: string;
  subtitle?: string;
  authors: string[];
  firstPublishYear?: number;
  coverUrl?: string;
  openLibraryUrl?: string;
  note: string;
}
