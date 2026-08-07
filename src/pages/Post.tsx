import { useParams, Navigate } from 'react-router';
import { Suspense, lazy, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { posts } from '@/content/posts';
import { formatPostDate } from '@/lib/posts';
import { buildArticleJsonLd, serializeJsonLd, SITE_URL } from '@/lib/seo';

export default function Post() {
  const { slug } = useParams<{ slug: string }>();

  const post = useMemo(() => posts.find(p => p.slug === slug), [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const PostContent = lazy(post.component);
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const articleJsonLd = serializeJsonLd(
    buildArticleJsonLd({
      headline: post.title,
      description: post.description,
      url: canonicalUrl,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
    })
  );

  return (
    <>
      <Helmet>
        <title>{post.title} | Babak Barghi</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} | Babak Barghi`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="article:published_time" content={post.publishedAt} />
        {post.updatedAt && <meta property="article:modified_time" content={post.updatedAt} />}
        <meta property="twitter:title" content={`${post.title} | Babak Barghi`} />
        <meta property="twitter:description" content={post.description} />
        <script type="application/ld+json">{articleJsonLd}</script>
      </Helmet>

      <article className="prose prose-invert max-w-none">
        <header className="not-prose mb-8">
          <time dateTime={post.publishedAt} className="text-sm text-muted">
            {formatPostDate(post.publishedAt)}
          </time>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">{post.title}</h1>
          <p className="text-muted mt-2">{post.readTime}</p>
        </header>

        <Suspense fallback={<div className="text-muted">Loading...</div>}>
          <PostContent />
        </Suspense>
      </article>
    </>
  );
}
