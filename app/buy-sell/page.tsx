"use client";

import { useState, useEffect, memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePageVisibility } from "@/hooks/use-page-visibility";

interface CategoryCard {
  id: string;
  name: string;
  image: string;
  count: number;
}

const categories: CategoryCard[] = [
  { id: "iphone", name: "iPhone", image: "/images/iphone.jpg", count: 44 },
  { id: "ipad", name: "iPad", image: "/images/ipad.jpg", count: 43 },
  { id: "macbook", name: "MacBook", image: "/images/macbook.jpg", count: 25 },
  { id: "watch", name: "Watch", image: "/images/applewatch.jpg", count: 18 },
  { id: "imac", name: "iMac", image: "/images/imac.jpg", count: 15 },
  { id: "accessory", name: "Accessories", image: "/images/accessories.jpg", count: 24 },
];

const MobileHeader = memo(function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="relative w-10 h-10">
              <Image src="/images/logo.png.png" alt="I.T MAN APPLE CARE" fill sizes="40px" className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-amber-500 leading-none">I.T MAN</span>
              <span className="text-[10px] text-gray-400 leading-none">APPLE CARE</span>
            </div>
          </Link>
          <button onClick={toggleMenu} className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/12 active:scale-95 transition-transform duration-150 touch-manipulation" aria-label="Toggle menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              {menuOpen ? (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>) : (<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>)}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="overflow-hidden bg-black/95 border-t border-white/10">
            <nav className="flex flex-col px-4 py-4 gap-1">
              {[{ href: "/", label: "Home" }, { href: "/buy-sell", label: "Buy & Sell" }, { href: "/services", label: "Services" }, { href: "/about", label: "About" }].map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMenu} className="py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-150 touch-manipulation text-center block">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      <div className="h-16" />
    </>
  );
});

const HeroSection = memo(function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
    
      <div className="relative w-28 h-28 mb-3">
        <Image src="/images/logo.png.png" alt="I.T MAN APPLE CARE" fill sizes="112px" className="object-contain" priority />
      </div>
      <h1 className="text-2xl font-bold text-white leading-tight">Buy & Sell</h1>
      <p className="text-sm text-amber-500 mt-1">Quality Apple Products</p>
      <p className="text-gray-400 mt-2 text-sm">Choose a category below</p>
    </div>
  );
});

const CategoryCard = memo(function CategoryCard({ category }: { category: CategoryCard }) {
  return (
    <Link href={`/buy-sell/${category.id}`} className="block">
      <div 
        className="relative h-36 cursor-pointer transition-transform duration-150 touch-manipulation active:scale-95"
        style={{ backgroundImage: `url(${category.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3 text-center bg-black/50">
          <h3 className="text-lg font-bold text-white">{category.name}</h3>
          <p className="text-gray-300 text-xs">{category.count} models</p>
        </div>
      </div>
    </Link>
  );
});

const MobileContent = memo(function MobileContent() {
  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
      <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
        <h2 className="text-lg font-bold text-white text-center mb-3">Why Choose Us?</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-green-500">✓</span> Genuine Apple products
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-green-500">✓</span> Warranty on all items
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-green-500">✓</span> Best trade-in prices
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-green-500">✓</span> Professional service
          </div>
        </div>
      </div>
      <Link href="/services" className="block w-full text-center py-3 bg-amber-600 text-white rounded-full text-sm mt-6 touch-manipulation active:scale-95 transition-transform">
        Request Service
      </Link>
    </div>
  );
});

const DesktopContent = memo(function DesktopContent() {
  return (
    <div className="container mx-auto px-6 mb-16">
      <div className="flex items-center justify-center gap-4">
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <Image src="/images/logo.png.png" alt="I.T MAN APPLE CARE" fill className="object-contain" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-center">
          <span className="bg-black/60 px-4 py-2 rounded-xl text-white">Buy & Sell</span>
        </h1>
      </div>
      <p className="text-gray-300 text-center mt-4 text-lg font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
        Choose a category to view all available devices
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/buy-sell/${cat.id}`}>
            <div 
              className="relative h-40 md:h-48 cursor-pointer transition-all duration-150 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-600/20 rounded-xl overflow-hidden select-none touch-manipulation"
              style={{ backgroundImage: `url(${cat.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center bg-black/60">
                <h3 className="text-xl font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-gray-200 text-sm font-medium">{cat.count} models available</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

export default function BuySellPage() {
  const [isMobile, setIsMobile] = useState(false);
  const { isTabActive } = usePageVisibility();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="bg-black text-white min-h-screen">
        <MobileHeader />
        <HeroSection />
        {isTabActive && <MobileContent />}
      </div>
    );
  }

  return (
    <main className="min-h-screen py-24 px-6 bg-main">
      <DesktopContent />
    </main>
  );
}