"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { MobileLayout } from "@/components/mobile/mobile-layout";
import { usePageVisibility } from "@/hooks/use-page-visibility";

const Hero3D = dynamic(() => import("@/components/sections/hero-3d").then((mod) => mod.Hero3D), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

function HeroFallback() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center">
        <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-8 mb-8 md:mb-10">
          <div className="relative w-64 h-64 md:w-[28rem] md:h-[28rem] lg:w-[42rem] lg:h-[42rem]">
            <Image
              src="/images/logo.png.png"
              alt="I.T MAN APPLE CARE"
              fill
              className="object-contain"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(217,119,6,0.6)) drop-shadow(0 0 80px rgba(217,119,0.3))',
              }}
              sizes="(max-width: 768px) 256px, (max-width: 1024px) 448px, 672px"
              priority
            />
          </div>
          <div className="text-center md:text-left">
            <h1 
              className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight"
            >
              <span className="text-white bg-black/60 px-2 py-1 rounded-lg">I.T MAN</span>
            </h1>
            <h1 
              className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight"
            >
              <span className="text-white bg-black/60 px-2 py-1 rounded-lg">APPLE CARE</span>
            </h1>
            
            <div className="mt-4 md:mt-6 flex items-center justify-center lg:justify-start">
              <p 
                className="text-lg md:text-3xl font-semibold tracking-widest uppercase"
              >
                <span className="text-amber-500 bg-black/60 px-2 py-1 rounded-lg">Support</span> <span className="text-white">&</span> <span className="text-amber-500 bg-black/60 px-2 py-1 rounded-lg">Service Centre</span>
              </p>
            </div>
          </div>
        </div>
        <p 
          className="text-lg md:text-2xl font-light tracking-widest uppercase"
        >
          <span className="text-amber-400 animate-pulse">●</span> <span className="text-white bg-black/60 px-2 py-1 rounded-lg">Buy</span> <span className="text-amber-700 mx-2">|</span> <span className="text-white bg-black/60 px-2 py-1 rounded-lg">Sell</span> <span className="text-amber-700 mx-2">|</span> <span className="text-white bg-black/60 px-2 py-1 rounded-lg">Fix</span>
        </p>
      </div>
    </section>
  );
}

function ServiceCard({ title, subtitle, image, color, bgImage, href }: { title: string; subtitle: string; image: string; color: string; bgImage?: string; href?: string }) {
  return (
    <Link href={href || "#"} className="flex-1">
      <GlassCard className="p-0 overflow-hidden cursor-pointer group transition-transform duration-150 hover:scale-[1.02]">
        <div 
          className="relative h-36 md:h-56 w-full"
          style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
        >
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
              }}
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-center bg-black/60">
            <h3 
              className="text-xl md:text-3xl font-bold"
              style={{ color }}
            >
              {title}
            </h3>
            <p className="text-xs md:text-sm text-gray-200 mt-1">{subtitle}</p>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

function ServicesSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          <ServiceCard 
            title="BUY" 
            subtitle="Quality Products"
            image="/images/buy.png"
            color="#22c55e"
            bgImage="/images/buy.jpg"
            href="/buy-sell"
          />
          <ServiceCard 
            title="SELL" 
            subtitle="Best Value"
            image="/images/sell.png"
            color="#f59e0b"
            bgImage="/images/sell.jpg"
            href="/buy-sell"
          />
          <ServiceCard 
            title="FIX" 
            subtitle="Repairs"
            image="/images/fix.png"
            color="#ef4444"
            bgImage="/images/fix.jpg"
            href="/services"
          />
        </div>
      </div>
    </section>
  );
}

function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-2 py-20">
      <span className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  );
}

const ProductCarousel = dynamic(
  () => import("@/components/sections/product-carousel").then((mod) => mod.ProductCarousel),
  { ssr: false, loading: () => <LoadingDots /> }
);

const IPadCarousel = dynamic(
  () => import("@/components/sections/ipad-carousel").then((mod) => mod.IPadCarousel),
  { ssr: false, loading: () => <LoadingDots /> }
);

const MacBookCarousel = dynamic(
  () => import("@/components/sections/macbook-carousel").then((mod) => mod.MacBookCarousel),
  { ssr: false, loading: () => <LoadingDots /> }
);

const WatchCarousel = dynamic(
  () => import("@/components/sections/watch-carousel").then((mod) => mod.WatchCarousel),
  { ssr: false, loading: () => <LoadingDots /> }
);

const IMacCarousel = dynamic(
  () => import("@/components/sections/imac-carousel").then((mod) => mod.IMacCarousel),
  { ssr: false, loading: () => <LoadingDots /> }
);

const AccessoryCarousel = dynamic(
  () => import("@/components/sections/accessory-carousel").then((mod) => mod.AccessoryCarousel),
  { ssr: false, loading: () => <LoadingDots /> }
);

const RepairTransformations = dynamic(
  () => import("@/components/sections/repair-transformations").then((mod) => mod.RepairTransformations),
  { ssr: false, loading: () => <LoadingDots /> }
);

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const { isTabActive } = usePageVisibility();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile && !isTabActive) {
    return <MobileLayout />;
  }

  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <main>
      <section className="min-h-screen">
        <Suspense fallback={<HeroFallback />}>
          <Hero3D />
        </Suspense>
      </section>
      <section className="py-12 md:py-20">
        <ServicesSection />
      </section>
      {isTabActive && (
        <>
          <section>
            <ProductCarousel />
          </section>
          <section>
            <IPadCarousel />
          </section>
          <section>
            <MacBookCarousel />
          </section>
          <section>
            <WatchCarousel />
          </section>
          <section>
            <IMacCarousel />
          </section>
          <section>
            <AccessoryCarousel />
          </section>
          <section>
            <RepairTransformations />
          </section>
        </>
      )}
    </main>
  );
}