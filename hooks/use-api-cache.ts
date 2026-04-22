"use client";

import { useRef, useCallback, useEffect } from "react";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class SimpleCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private maxAge: number;

  constructor(maxAgeMs = 5 * 60 * 1000) {
    this.maxAge = maxAgeMs;
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

export function createApiCache(maxAgeMs = 5 * 60 * 1000) {
  return new SimpleCache(maxAgeMs);
}

export function useApiCache<T>(
  fetchFn: () => Promise<T>,
  cacheKey: string,
  cache?: SimpleCache<T>,
  maxAgeMs = 5 * 60 * 1000
) {
  const cacheRef = useRef(cache || new SimpleCache<T>(maxAgeMs));
  const mounting = useRef(true);

  useEffect(() => {
    mounting.current = false;
  }, []);

  const getCachedData = useCallback(async (): Promise<T> => {
    if (!mounting.current) {
      const cached = cacheRef.current.get(cacheKey);
      if (cached !== null) {
        return cached;
      }
    }

    const data = await fetchFn();
    cacheRef.current.set(cacheKey, data);
    return data;
  }, [fetchFn, cacheKey]);

  return { getCachedData, cache: cacheRef.current };
}

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

export function useMemoizedFn<T extends (...args: any[]) => any>(callback: T): T {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => ref.current(...args),
    []
  ) as T;
}