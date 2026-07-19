import type { GitHubRepo } from '@/types';
import { readCachedList } from '@/lib/cache';

const CACHE_KEY = 'github-repos';
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function fetchTopRepos(
  username: string,
  count = 4
): Promise<GitHubRepo[]> {
  const cached = readCachedList<GitHubRepo>(CACHE_KEY);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
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
      return cached.data;
    }
    return [];
  }
}
