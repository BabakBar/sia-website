import { useParams, Link, Navigate } from 'react-router';
import { Suspense, lazy, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { posts } from '@/content/posts';
import { profile } from '@/content/profile';
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
      {post.preview && <meta name="robots" content="noindex" />}
      <Helmet>
        <title>{post.title} | Babak Barghi</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} | Babak Barghi`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={canonicalUrl} />
        {!post.preview && <meta property="article:published_time" content={post.publishedAt} />}
        {post.updatedAt && <meta property="article:modified_time" content={post.updatedAt} />}
        <meta property="twitter:title" content={`${post.title} | Babak Barghi`} />
        <meta property="twitter:description" content={post.description} />
        {!post.preview && <script type="application/ld+json">{articleJsonLd}</script>}
      </Helmet>

      <article>
        <Link className="post-back" to="/blog">
          <span aria-hidden="true">←</span> All posts
        </Link>
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta post-label">
            <Link to="/about">{profile.name}</Link>
            {post.preview ? (
              <span>Local preview</span>
            ) : (
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            )}
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="prose post-body">
          <Suspense fallback={<p role="status">Loading post…</p>}>
            <PostContent />
          </Suspense>
        </div>
      </article>
    </>
  );
}
