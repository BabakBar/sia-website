import { profile } from '@/content/profile';

export const SITE_URL = 'https://www.babakbarghi.com';
export const AUTHOR_NAME = profile.name;
export const HOME_META = { title: profile.title, description: profile.description };
export const ABOUT_META = { title: 'About Babak Barghi — Cloud Architect', description: profile.description };

export function buildProfileJsonLd(path: string) {
  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: profile.name,
    alternateName: profile.alternateName,
    jobTitle: profile.role,
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/IMG-website_edited-384.webp`,
    worksFor: { '@type': 'Organization', name: profile.employer },
    sameAs: [profile.github, profile.linkedin],
  };
  return {
    '@context': 'https://schema.org',
    '@type': path === '/about' ? 'ProfilePage' : 'WebPage',
    '@id': `${SITE_URL}${path}`,
    url: `${SITE_URL}${path}`,
    mainEntity: person,
  };
}

export const BLOG_META = {
  title: 'Blog | Babak Barghi',
  description: 'Field notes on practical AI, boring infrastructure, and small systems that make real work easier.',
};

export interface ArticleMetadata {
  headline: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt?: string;
}

export function buildArticleJsonLd(article: ArticleMetadata) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    url: article.url,
    mainEntityOfPage: article.url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    image: `${SITE_URL}/og-image.png`,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}
