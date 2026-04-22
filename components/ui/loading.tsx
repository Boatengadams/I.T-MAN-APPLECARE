"use client";

interface LoadingProps {
  variant?: "spinner" | "dots" | "pulse";
}

export function Loading({ variant = "spinner" }: LoadingProps) {
  if (variant === "dots") {
    return (
      <div className="flex items-center justify-center gap-2">
        <span className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className="flex flex-col gap-4">
        <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
        <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
        <div className="h-4 w-28 bg-white/10 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
  );
}