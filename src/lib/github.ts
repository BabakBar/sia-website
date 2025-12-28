import type { GitHubRepo } from '@/types';

const CACHE_KEY = 'github-repos';
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

interface CachedData {
  data: GitHubRepo[];
  timestamp: number;
}

export async function fetchTopRepos(
  username: string,
  count = 4
): Promise<GitHubRepo[]> {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp }: CachedData = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    }
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=stars&per_page=100`
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const repos: GitHubRepo[] = await res.json();

    // Filter out forks and get top by stars
    const topRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, count);

    // Cache the result
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: topRepos, timestamp: Date.now() })
    );

    return topRepos;
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    // Return cached data if available, even if stale
    if (cached) {
      const { data }: CachedData = JSON.parse(cached);
      return data;
    }
    return [];
  }
}
