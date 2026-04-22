"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ProductCard } from "@/components/ui/product-card";
import { products, Product } from "@/lib/products";
import { usePageVisibility } from "@/hooks/use-page-visibility";

function generateCarouselItems(items: Product[], count: number): Product[] {
  const result: Product[] = [];
  for (let i = 0; i < count; i++) {
    result.push(...items);
  }
  return result;
}

export function ProductCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [carouselItems, setCarouselItems] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { isTabActive } = usePageVisibility();

  useEffect(() => {
    const iphones = products.filter(p => p.category === "iphone");
    setCarouselItems(generateCarouselItems(iphones, 6));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldAnimate(entry.isIntersecting && isTabActive);
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isLoaded, isTabActive]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  const displayAnimation = isPaused || !shouldAnimate || !isTabActive ? "none" : undefined;

  if (!isLoaded) {
    return null;
  }

  return (
    <section ref={sectionRef} className="py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6 mb-8 md:mb-12">
        <h2 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(217,119,6,0.4)',
          }}
        >
          Explore iPhones
        </h2>
      </div>

      <div
        ref={containerRef}
        className="relative w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex gap-2 sm:gap-3 md:gap-4"
          style={{
            animation: displayAnimation,
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