export interface CachedList<T> {
  data: T[];
  timestamp: number;
}

export function readCachedList<T>(key: string): CachedList<T> | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !Array.isArray((parsed as CachedList<T>).data) ||
      typeof (parsed as CachedList<T>).timestamp !== 'number'
    ) {
      return null;
    }

    return parsed as CachedList<T>;
  } catch {
    return null;
  }
}
