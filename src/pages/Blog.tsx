import { Helmet } from 'react-helmet-async';
import { posts } from '@/content/posts';
import PostItem from '@/components/ui/PostItem';
import { BLOG_META } from '@/lib/seo';

export default function Blog() {
  const sortedPosts = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <section className="post-archive" aria-labelledby="posts-heading">
      <Helmet>
        <title>{BLOG_META.title}</title>
        <meta name="description" content={BLOG_META.description} />
      </Helmet>
      <h1 id="posts-heading" className="post-title">Posts</h1>
      {sortedPosts.length === 0 ? (
        <p className="text-muted">No posts yet.</p>
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
