"use client";

import { useState, useEffect, memo, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { products, Product } from "@/lib/products";
import { usePageVisibility } from "@/hooks/use-page-visibility";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/buy-sell", label: "Buy & Sell" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
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
              {navLinks.map((link) => (
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
    <div className="flex flex-col items-center justify-center px-4 py-6 text-center">
      <div className="relative w-24 h-24 mb-2">
        <Image src="/images/logo.png.png" alt="I.T MAN APPLE CARE" fill sizes="96px" className="object-contain" priority />
      </div>
      <h1 className="text-2xl font-bold text-white">Apple Watch</h1>
      <p className="text-amber-500 mt-1 text-sm">Buy & Sell</p>
    </div>
  );
});

const CategoryCard = memo(function CategoryCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <div onClick={onClick} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden cursor-pointer active:scale-95 transition-transform duration-150 touch-manipulation">
      <div className="relative h-32 w-full">
        <Image src={product.imageFront} alt={product.name} fill className="object-contain p-2" unoptimized />
      </div>
      <div className="p-3 text-center bg-black/50">
        <h3 className="text-sm font-bold text-white">{product.name}</h3>
        {product.storage && product.storage.length > 0 && (
          <p className="text-gray-400 text-xs mt-1">{product.storage[0]} - {product.storage[product.storage.length - 1]}</p>
        )}
      </div>
    </div>
  );
});

const MobileProductDetail = memo(function MobileProductDetail({ product, onBack, onWhatsApp }: { product: Product; onBack: () => void; onWhatsApp: (action: "buy" | "sell") => void }) {
  const [selectedSize, setSelectedSize] = useState(product.storage?.[0] || "");

  return (
    <div className="px-4 py-4">
      <button onClick={onBack} className="mb-4 text-amber-500 flex items-center gap-2 text-sm">← Back</button>
      <div className="relative h-64 w-full mb-4 bg-white/5 rounded-xl overflow-hidden">
        <Image src={product.imageFront} alt={product.name} fill className="object-contain p-4" unoptimized />
      </div>
      <h2 className="text-xl font-bold text-white text-center mb-4">{product.name}</h2>
      
      {product.storage && product.storage.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-400 text-sm mb-2 text-center">Select Size</p>
          <div className="flex flex-wrap justify-center gap-2">
            {product.storage.map((size) => (
              <button key={size} onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg text-sm ${selectedSize === size ? "bg-amber-600 text-white" : "bg-white/10 text-gray-300"}`}>
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex gap-3 mt-6">
        <button onClick={() => onWhatsApp("buy")} className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold text-sm active:scale-95 transition-transform">Buy Now</button>
        <button onClick={() => onWhatsApp("sell")} className="flex-1 py-3 bg-amber-600 text-white rounded-lg font-semibold text-sm active:scale-95 transition-transform">Sell Yours</button>
      </div>
    </div>
  );
});

const MobileContent = memo(function MobileContent() {
  const { isTabActive } = usePageVisibility();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const watches = products.filter(p => p.category === "watches");
  
  const sortedWatches = [...watches].sort((a, b) => {
    const orderA = parseInt(a.id.replace(/\D/g, "")) || 0;
    const orderB = parseInt(b.id.replace(/\D/g, "")) || 0;
    return orderB - orderA;
  });

  const handleProductSelect = (product: Product) => setSelectedProduct(product);
  const handleBack = () => setSelectedProduct(null);
  
  const handleWhatsApp = (action: "buy" | "sell") => {
    if (!selectedProduct) return;
    let message = `I'm interested in ${action === "buy" ? "buying" : "selling"} my ${selectedProduct.name}`;
    window.open(`https://wa.me/233549665779?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (!isTabActive) return null;

  if (selectedProduct) {
    return <MobileProductDetail product={selectedProduct} onBack={handleBack} onWhatsApp={handleWhatsApp} />;
  }

  return (
    <div className="px-4 py-4">
      <div className="grid grid-cols-2 gap-3">
        {sortedWatches.map((product) => (
          <CategoryCard key={product.id} product={product} onClick={() => handleProductSelect(product)} />
        ))}
      </div>
      <Link href="/services" className="block w-full text-center py-3 bg-amber-600 text-white rounded-full text-sm mt-6 active:scale-95 transition-transform">
        Request Service
      </Link>
    </div>
  );
});

const Watch3DViewer = dynamic(() => import("@/components/watch-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function WatchBuySellPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const [show3D, setShow3D] = useState(false);
  
  const watches = products.filter(p => p.category === "watches");

  const sortedWatches = [...watches].sort((a, b) => {
    const orderA = parseInt(a.id.replace(/\D/g, "")) || 0;
    const orderB = parseInt(b.id.replace(/\D/g, "")) || 0;
    return orderB - orderA;
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.storage?.[0] || "");
    setShow3D(false);
  };

  const handleWhatsApp = (action: "buy" | "sell") => {
    if (!selectedProduct) return;
    let message = `I'm interested in ${action === "buy" ? "buying" : "selling"} my ${selectedProduct.name}`;
    if (selectedSize) message += ` - ${selectedSize}`;
    window.open(`https://wa.me/233549665779?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (isMobile) {
    if (selectedProduct) {
      return (
        <div className="bg-black text-white min-h-screen">
          <MobileHeader />
          <HeroSection />
          <MobileProductDetail product={selectedProduct} onBack={() => { setSelectedProduct(null); setSelectedSize(""); }} onWhatsApp={handleWhatsApp} />
        </div>
      );
    }
    return (
      <div className="bg-black text-white min-h-screen">
        <MobileHeader />
        <HeroSection />
        <MobileContent />
      </div>
    );
  }

  return (
    <main className="min-h-screen py-24 px-6 bg-main">
      <div className="container mx-auto px-6 mb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <div className="relative w-12 h-12 md:w-16 md:h-16">
                <Image src="/images/logo.png.png" alt="I.T MAN APPLE CARE" fill className="object-contain" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-center lg:text-left">
                <span className="bg-black/60 px-4 py-2 rounded-xl text-white">Apple Watch</span>
              </h1>
            </div>
            <p className="text-gray-400 text-center lg:text-left mt-4 text-lg">Buy & Sell premium Apple Watches - Select size</p>
          </div>
          <div className="h-40 lg:h-60 rounded-xl overflow-hidden shadow-xl">
            <video autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover" poster="/images/watchimages/series%209.jpg">
              <source src="/videos/iwatch.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {selectedProduct ? (
        <div className="container mx-auto px-6">
          <button onClick={() => { setSelectedProduct(null); setSelectedSize(""); setShow3D(false); }} className="mb-6 text-amber-600 hover:text-amber-500 flex items-center gap-2">← Back to all Apple Watches</button>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <GlassCard className="p-4">
              {show3D ? (<div className="h-64 md:h-80 w-full"><Watch3DViewer /></div>) : (
                <div className="relative h-64 md:h-80 w-full">
                  <Image src={selectedProduct.imageFront} alt={selectedProduct.name} fill className="object-contain" />
                </div>
              )}
            </GlassCard>
            
            <button onClick={() => setShow3D(!show3D)} className="mt-4 w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors">
              {show3D ? "View 2D Image" : "View 3D Model"}
            </button>
            
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{selectedProduct.name}</h2>
              
              {selectedProduct.storage && selectedProduct.storage.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-400 mb-2 text-sm">Select Size:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.storage.map((size) => (
                      <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 rounded-lg text-sm transition-all ${selectedSize === size ? "bg-amber-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-gray-400 mb-4 text-sm">Premium quality Apple Watch available for sale. Each device is thoroughly inspected and certified.</p>
              <ul className="text-gray-500 mb-6 space-y-1 text-sm">
                <li>✓ Fully tested & certified</li>
                <li>✓ 90-day warranty</li>
                <li>✓ Original Apple parts</li>
                <li>✓ Trade-in accepted</li>
              </ul>
              
              <div className="flex gap-4 flex-wrap">
                <button onClick={() => handleWhatsApp("buy")} className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors text-lg">Buy Now</button>
                <button onClick={() => handleWhatsApp("sell")} className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors text-lg">Sell Yours</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedWatches.map((product) => (
              <GlassCard key={product.id} onClick={() => handleProductSelect(product)} className="p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-600/20">
                <div className="relative h-32 md:h-40 w-full mb-4">
                  <Image src={product.imageFront} alt={product.name} fill className="object-contain" />
                </div>
                <p className="text-center font-medium text-white text-sm">{product.name}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}