import React, { forwardRef, useState } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = "", onClick }, ref) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = () => {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
      onClick?.();
    };

    return (
      <div
        ref={ref}
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        className={`
          backdrop-blur-[15px]
          bg-black/5 dark:bg-white/5
          border border-black/10 dark:border-white/10
          rounded-2xl
          p-6
          shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]
          transition-all duration-150 ease-out
          ${isPressed ? "scale-[0.98] bg-black/10 dark:bg-white/10" : "hover:scale-[1.01]"}
          ${className}
        `}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";