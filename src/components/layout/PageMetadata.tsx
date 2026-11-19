import {
  ABOUT_META,
  BLOG_META,
  HOME_META,
  SITE_URL,
  buildArticleJsonLd,
  buildProfileJsonLd,
  serializeJsonLd,
} from '@/lib/seo';
import type { Post } from '@/types';

type PageMetadataProps =
  | { page: 'home' | 'about' | 'blog' | 'not-found'; post?: never }
  | { page: 'post'; post: Post };

const pages = {
  home: { ...HOME_META, path: '/' },
  about: { ...ABOUT_META, path: '/about' },
  blog: { ...BLOG_META, path: '/blog' },
};

export default function PageMetadata({ page, post }: PageMetadataProps) {
  if (page === 'not-found') {
    return (
      <>
        <title>Page not found | Babak Barghi</title>
        <meta name="robots" content="noindex" />
      </>
    );
  }

  const { title, description, path } = post
    ? { title: `${post.title} | Babak Barghi`, description: post.description, path: `/blog/${post.slug}` }
    : pages[page];
  const url = `${SITE_URL}${path}`;
  const article = post && !post.preview;
  const structuredData = article
    ? buildArticleJsonLd({
        headline: post.title,
        description: post.description,
        url,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
      })
    : page === 'home' || page === 'about'
      ? buildProfileJsonLd(path)
      : undefined;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={post ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
      {post?.preview && <meta name="robots" content="noindex" />}
      {article && <meta property="article:published_time" content={post.publishedAt} />}
      {article && <meta property="article:modified_time" content={post.updatedAt ?? post.publishedAt} />}
      {structuredData && <script type="application/ld+json">{serializeJsonLd(structuredData)}</script>}
    </>
  );
}
