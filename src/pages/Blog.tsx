import { Link } from 'react-router';
import PageMetadata from '@/components/layout/PageMetadata';
import { posts } from '@/content/posts';
import PostItem from '@/components/ui/PostItem';

export default function Blog() {
  const sortedPosts = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <section className="post-archive" aria-labelledby="posts-heading">
      <PageMetadata page="blog" />
      <h1 id="posts-heading" className="post-title">
        Posts
      </h1>
      {sortedPosts.length === 0 ? (
        <p className="text-muted">
          No posts yet.{' '}
          <Link to="/about" className="text-accent-light underline underline-offset-4">
            More about my work
          </Link>
        </p>
      ) : (
        <ul className="post-list" role="list">
          {sortedPosts.map(post => (
            <PostItem key={post.slug} post={post} />
          ))}
        </ul>
      )}
    </section>
  );
}
