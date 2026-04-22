"use client";

import { useRef, useEffect, useState } from "react";
import { ProductCard } from "@/components/ui/product-card";
import { ipads } from "@/lib/products";

function generateCarouselItems(items: typeof ipads, count: number) {
  const result: typeof ipads = [];
  for (let i = 0; i < count; i++) {
    result.push(...items);
  }
  return result;
}

export function IPadCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [carouselItems, setCarouselItems] = useState<typeof ipads>([]);

  useEffect(() => {
    setCarouselItems(generateCarouselItems(ipads, 6));
  }, []);

  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6 mb-8 md:mb-12">
        <h2 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(217,119,6,0.4)',
          }}
        >
          Explore iPads
        </h2>
      </div>

      <div
        ref={containerRef}
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-2 sm:gap-3 md:gap-4"
          style={{
            animation: isPaused ? "none" : "scroll 60s linear infinite",
          }}
        >
          {carouselItems.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              name={product.name}
              imageFront={product.imageFront}
              imageBack={product.imageBack}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}