import React, { useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  loading = false,
  className = "",
  children,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const baseStyles =
    "relative overflow-hidden px-6 py-3 rounded-xl font-medium transition-all duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed select-none touch-manipulation";

  const variants = {
    primary: `
      bg-amber-600 text-white
      hover:bg-amber-500 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(217,119,6,0.5)]
      active:scale-95 active:bg-amber-700
    `,
    outline: `
      bg-transparent border border-white/20 text-white
      hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(217,119,6,0.3)] hover:scale-[1.02]
      active:scale-95 active:bg-white/10
    `,
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    onClick?.(e);
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${isPressed ? "scale-95" : ""} ${className}`}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading...
        </span>
      ) : children}
    </button>
  );
}