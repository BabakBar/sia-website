import { Link } from 'react-router';
import type { Post } from '@/types';
import { formatPostDate } from '@/lib/posts';

interface PostItemProps {
  post: Omit<Post, 'component'>;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <li>
      <Link to={`/blog/${post.slug}`} className="post-list-link">
        <div>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
        {post.preview ? (
          <span className="post-label">Local preview</span>
        ) : (
          <time className="post-label" dateTime={post.publishedAt}>
            {formatPostDate(post.publishedAt)}
          </time>
        )}
      </Link>
    </li>
  );
}
