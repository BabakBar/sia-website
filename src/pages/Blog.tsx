import { Helmet } from 'react-helmet-async';
import { posts } from '@/content/posts';
import PostItem from '@/components/ui/PostItem';
import { BLOG_META } from '@/lib/seo';

export default function Blog() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      <Helmet>
        <title>{BLOG_META.title}</title>
        <meta name="description" content={BLOG_META.description} />
      </Helmet>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Posts</h1>
      {sortedPosts.length === 0 ? (
        <p className="text-muted">No posts yet.</p>
      ) : (
        <div className="divide-y divide-muted/20">
          {sortedPosts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
