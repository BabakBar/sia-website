export const SITE_URL = 'https://www.babakbarghi.com';
export const AUTHOR_NAME = 'Babak Barghi';

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
      name: AUTHOR_NAME,
      url: SITE_URL,
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
