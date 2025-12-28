import type { GitHubRepo } from '@/types';

interface RepoCardProps {
  repo: GitHubRepo;
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors"
    >
      <h3 className="font-medium text-foreground group-hover:text-blue-400 transition-colors truncate">
        {repo.name}
      </h3>
      {repo.description && (
        <p className="text-sm text-muted mt-1 line-clamp-2">{repo.description}</p>
      )}
      <div className="flex items-center gap-3 mt-3 text-xs text-muted">
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
          </svg>
          {repo.stargazers_count}
        </span>
        {repo.language && <span>{repo.language}</span>}
      </div>
    </a>
  );
}
