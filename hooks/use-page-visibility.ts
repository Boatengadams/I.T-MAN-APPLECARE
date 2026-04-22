"use client";

import { useEffect, useState, useCallback } from "react";

type VisibilityState = "visible" | "hidden" | "prerender" | undefined;

export function usePageVisibility() {
  const [visibilityState, setVisibilityState] = useState<VisibilityState>(undefined);
  const [isTabActive, setIsTabActive] = useState(true);

  const handleVisibilityChange = useCallback(() => {
    const state = document.visibilityState;
    setVisibilityState(state);
    setIsTabActive(state === "visible");
  }, []);

  useEffect(() => {
    handleVisibilityChange();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return { visibilityState, isTabActive };
}

export function useVisibilityCallback<T>(
  onVisible: () => T,
  onHidden?: () => void
) {
  const { isTabActive } = usePageVisibility();

  useEffect(() => {
    if (isTabActive) {
      return onVisible();
    } else if (onHidden) {
      return onHidden();
    }
  }, [isTabActive, onVisible, onHidden]);

  return isTabActive;
}