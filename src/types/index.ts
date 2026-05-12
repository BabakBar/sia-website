export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  readTime: string;
  component: () => Promise<{ default: React.ComponentType }>;
}

export interface Project {
  title: string;
  description: string;
  url: string;
  image?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

export interface FavoriteBookSeed {
  title: string;
  searchTitle: string;
  authorHint?: string;
  note: string;
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
