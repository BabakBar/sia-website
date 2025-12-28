import { Link } from 'react-router';
import type { Post } from '@/types';

interface PostItemProps {
  post: Omit<Post, 'component'>;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-4 -mx-4 px-4 rounded-lg hover:bg-foreground/5 transition-colors"
    >
      <time className="text-sm text-muted tabular-nums shrink-0 w-28">
        {post.date}
      </time>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground group-hover:text-accent-light transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-muted mt-1 line-clamp-2">{post.description}</p>
        <span className="text-xs text-muted mt-2 block">{post.readTime}</span>
      </div>
    </Link>
  );
}
