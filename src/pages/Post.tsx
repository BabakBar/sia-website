import { useParams, Navigate } from 'react-router';
import { Suspense, lazy, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { posts } from '@/content/posts';

export default function Post() {
  const { slug } = useParams<{ slug: string }>();

  const post = useMemo(
    () => posts.find((p) => p.slug === slug),
    [slug]
  );

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const PostContent = lazy(post.component);

  return (
    <>
      <Helmet>
        <title>{post.title} | Babak Barghi</title>
        <meta name="description" content={post.description} />
      </Helmet>

      <article className="prose prose-invert max-w-none">
        <header className="not-prose mb-8">
          <time className="text-sm text-muted">{post.date}</time>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
            {post.title}
          </h1>
          <p className="text-muted mt-2">{post.readTime}</p>
        </header>

        <Suspense fallback={<div className="text-muted">Loading...</div>}>
          <PostContent />
        </Suspense>
      </article>
    </>
  );
}
