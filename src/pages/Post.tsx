import { useParams, Link } from 'react-router';
import { Suspense, lazy } from 'react';
import PageMetadata from '@/components/layout/PageMetadata';
import NotFound from './NotFound';
import { posts } from '@/content/posts';
import { profile } from '@/content/profile';
import { formatPostDate } from '@/lib/posts';

export default function Post() {
  const { slug } = useParams<{ slug: string }>();

  const post = posts.find(post => post.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  const PostContent = lazy(post.component);
  return (
    <>
      <PageMetadata page="post" post={post} />

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
