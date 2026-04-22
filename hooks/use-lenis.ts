"use client";

import { useEffect, useRef, useCallback } from "react";
import { createLenis, LenisInstance } from "@/lib/lenis";

export function useLenis() {
  const lenisRef = useRef<LenisInstance | null>(null);

  const handleVisibilityChange = useCallback(() => {
    if (!lenisRef.current) return;

    if (document.hidden) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, []);

  useEffect(() => {
    lenisRef.current = createLenis();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [handleVisibilityChange]);
}