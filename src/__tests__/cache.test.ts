import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readCachedList } from '@/lib/cache';
import { fetchTopRepos } from '@/lib/github';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('readCachedList', () => {
  it('returns null when the key is missing', () => {
    expect(readCachedList('nope')).toBeNull();
  });

  it('returns null for corrupted JSON', () => {
    localStorage.setItem('k', '{not json');
    expect(readCachedList('k')).toBeNull();
  });

  it('returns null for a valid-JSON wrong shape', () => {
    localStorage.setItem('k', JSON.stringify({ foo: 1 }));
    expect(readCachedList('k')).toBeNull();
    localStorage.setItem('k', JSON.stringify({ data: 'not-a-list', timestamp: 1 }));
    expect(readCachedList('k')).toBeNull();
  });

  it('returns the entry for the expected shape', () => {
    localStorage.setItem('k', JSON.stringify({ data: [1, 2], timestamp: 42 }));
    expect(readCachedList<number>('k')).toEqual({ data: [1, 2], timestamp: 42 });
  });
});

describe('fetchTopRepos with corrupted cache', () => {
  it('ignores the bad cache and fetches fresh data', async () => {
    localStorage.setItem('github-repos', '{corrupted');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          { name: 'a', fork: false, stargazers_count: 5 },
          { name: 'b', fork: true, stargazers_count: 9 },
        ],
      })
    );

    const repos = await fetchTopRepos('BabakBar');
    expect(repos.map((r) => r.name)).toEqual(['a']);
  });
});
