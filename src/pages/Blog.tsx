import { posts } from '@/content/posts';
import PostItem from '@/components/ui/PostItem';

export default function Blog() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
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
