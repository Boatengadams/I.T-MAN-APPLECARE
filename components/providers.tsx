"use client";

import { useEffect } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { usePageVisibility } from "@/hooks/use-page-visibility";
import { ThemeProvider } from "@/hooks/use-theme";
import { ReactNode } from "react";

function PageVisibilityManager() {
  const { isTabActive } = usePageVisibility();

  useEffect(() => {
    if (!isTabActive) {
      document.body.classList.add("tab-hidden");
    } else {
      document.body.classList.remove("tab-hidden");
    }
  }, [isTabActive]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  useLenis();

  return (
    <ThemeProvider>
      <PageVisibilityManager />
      {children}
    </ThemeProvider>
  );
}