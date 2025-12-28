import { useState, useEffect } from 'react';
import { fetchTopRepos } from '@/lib/github';
import type { GitHubRepo } from '@/types';
import RepoCard from '../ui/RepoCard';

export default function GitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopRepos('BabakBar', 4)
      .then(setRepos)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-8">
        <h2 className="text-xl font-bold mb-4">GitHub</h2>
        <p className="text-sm text-muted">Popular repositories</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-lg bg-foreground/5 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (repos.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <h2 className="text-xl font-bold mb-4">GitHub</h2>
      <p className="text-sm text-muted">Popular repositories</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}
