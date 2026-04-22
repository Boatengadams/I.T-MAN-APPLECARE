"use client";

import { useState } from "react";
import Image from "next/image";
import { GlassCard } from "./glass-card";

interface ProductCardProps {
  name: string;
  imageFront: string;
  imageBack: string;
}

export function ProductCard({ name, imageFront, imageBack }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-[45%] sm:w-[40%] md:w-[32%] lg:w-[30%] min-w-[160px] sm:min-w-[200px] md:min-w-[280px] cursor-pointer select-none touch-manipulation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => { setIsPressed(false); setIsHovered(false); }}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      <GlassCard 
        className={`
          p-3 sm:p-4 md:p-6 
          transition-all duration-150 ease-out 
          ${isHovered ? 'scale-[1.02] shadow-xl shadow-amber-500/20' : ''}
          ${isPressed ? 'scale-[0.98]' : ''}
          h-full flex flex-col
        `}
      >
        <div className="relative w-full aspect-[4/3] sm:aspect-square mb-2 sm:mb-4">
          {!imageError ? (
            <>
              <div
                className={`absolute inset-0 transition-opacity duration-300 p-2 sm:p-4 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              >
                <Image
                  src={imageFront}
                  alt={`${name} front`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 32vw"
                  onError={() => setImageError(true)}
                />
                <span className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 text-[10px] sm:text-xs bg-black/70 px-1.5 sm:px-2 py-0.5 rounded text-white">
                  FRONT
                </span>
              </div>
              <div
                className={`absolute inset-0 transition-opacity duration-300 p-2 sm:p-4 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={imageBack}
                  alt={`${name} back`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 32vw"
                  onError={() => setImageError(true)}
                />
                <span className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 text-[10px] sm:text-xs bg-black/70 px-1.5 sm:px-2 py-0.5 rounded text-white">
                  BACK
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-amber-500 text-3xl sm:text-4xl md:text-5xl">
              📱
            </div>
          )}
        </div>
        <p 
          className="mt-auto text-center text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
        >
          {name}
        </p>
      </GlassCard>
    </div>
  );
}