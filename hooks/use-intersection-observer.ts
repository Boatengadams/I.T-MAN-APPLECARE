"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement>(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<T>, boolean] {
  const { threshold = 0.1, rootMargin = "50px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsIntersecting(inView);

        if (inView && triggerOnce) {
          hasTriggered.current = true;
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref as React.RefObject<T>, isIntersecting];
}

export function useLazyLoad<T extends HTMLElement>(options: UseIntersectionObserverOptions = {}) {
  const [ref, isVisible] = useIntersectionObserver<T>(options);
  return { ref, isVisible };
}

export function useOnScreen<T extends HTMLElement>(
  callback: () => void,
  options: UseIntersectionObserverOptions = {}
) {
  const [ref, isIntersecting] = useIntersectionObserver<T>(options);

  useEffect(() => {
    if (isIntersecting) {
      callback();
    }
  }, [isIntersecting, callback]);

  return ref;
}