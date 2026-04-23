"use client";

import { useState, useEffect, memo, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { products, Product } from "@/lib/products";
import { usePageVisibility } from "@/hooks/use-page-visibility";
import { useTheme } from "@/hooks/use-theme";
import { generateWhatsAppMessage, createWhatsAppLink } from "@/lib/whatsapp";

const ThemeToggle = memo(function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-black/[0.03] border border-black/12 dark:bg-white/[0.03] dark:border-white/12 active:scale-95 transition-transform duration-150 touch-manipulation"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
});

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-black/10 dark:border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="relative w-10 h-10">
              <Image src="/images/logo.png.png" alt="I.T MAN APPLE CARE" fill sizes="40px" className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-amber-500 leading-none">I.T MAN</span>
              <span className="text-[10px] text-gray-600 dark:text-gray-400 leading-none">APPLE CARE</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={toggleMenu} className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-black/[0.03] border border-black/12 dark:bg-white/[0.03] dark:border-white/12 active:scale-95 transition-transform duration-150 touch-manipulation" aria-label="Toggle menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black dark:text-white">
                {menuOpen ? (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>) : (<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>)}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="overflow-hidden bg-white/95 dark:bg-black/95 border-t border-black/10 dark:border-white/10">
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMenu} className="py-3 px-4 text-black/80 hover:text-black hover:bg-black/5 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/5 rounded-lg transition-colors duration-150 touch-manipulation text-center block">
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
      <h1 className="text-2xl font-bold text-white">iPhone</h1>
      <p className="text-amber-500 mt-1 text-sm">Buy & Sell</p>
      <div className="w-full max-w-md h-48 rounded-xl overflow-hidden shadow-xl mt-4">
        <video autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover" poster="/images/screen.jpg">
          <source src="/videos/iphone vid.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
});

const CategoryCard = memo(function CategoryCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <div onClick={onClick} className="bg-white/5 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden cursor-pointer active:scale-95 transition-transform duration-150 touch-manipulation">
      <div className="relative h-32 w-full">
        <Image src={product.imageFront} alt={product.name} fill className="object-contain p-2" unoptimized />
      </div>
      <div className="p-3 text-center bg-black/50 dark:bg-black/70">
        <h3 className="text-sm font-bold text-white dark:text-white">{product.name}</h3>
        {product.storage && product.storage.length > 0 && (
          <p className="text-gray-400 dark:text-gray-300 text-xs mt-1">{product.storage[0]} - {product.storage[product.storage.length - 1]}</p>
        )}
      </div>
    </div>
  );
});

const MobileProductDetail = memo(function MobileProductDetail({ product, onBack, onWhatsApp }: { product: Product; onBack: () => void; onWhatsApp: (action: "buy" | "sell") => void }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedStorage, setSelectedStorage] = useState(product.storage?.[0] || "");

  const getColorHex = (color: string): string => {
    const colorMap: Record<string, string> = {
      "Black": "#1a1a1a", "White": "#f5f5f5", "Blue": "#0066cc", "Pink": "#ffb6c1",
      "Purple": "#8b5cf6", "Green": "#10b981", "Space Gray": "#6b7280", "Space Black": "#1a1a1a",
      "Silver": "#c0c0c0", "Gold": "#fbbf24", "Natural": "#d4c4a8", "Orange": "#f97316",
      "Teal": "#14b8a6", "Yellow": "#facc15", "Red": "#ef4444", "PRODUCT Red": "#dc2626",
      "Black Titanium": "#1a1a1a", "White Titanium": "#f5f5f5", "Natural Titanium": "#d4c4a8",
    };
    return colorMap[color] || "#6b7280";
  };

  return (
    <div className="px-4 py-4">
      <button onClick={onBack} className="mb-4 text-amber-500 flex items-center gap-2 text-sm">← Back</button>
      <div className="relative h-64 w-full mb-4 bg-white/5 dark:bg-black/20 rounded-xl overflow-hidden">
        <Image src={product.imageFront} alt={product.name} fill className="object-contain p-4" unoptimized />
      </div>
      <h2 className="text-xl font-bold text-black dark:text-white text-center mb-4">{product.name}</h2>

      {product.colors && product.colors.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 text-center">Select Color</p>
          <div className="flex justify-center gap-3">
            {product.colors.map((color) => (
              <button key={color} onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? "border-amber-500 scale-110" : "border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40"}`}
                style={{ backgroundColor: getColorHex(color) }} title={color} />
            ))}
          </div>
        </div>
      )}

      {product.storage && product.storage.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 text-center">Select Storage</p>
          <div className="flex flex-wrap justify-center gap-2">
            {product.storage.map((storage) => (
              <button key={storage} onClick={() => setSelectedStorage(storage)}
                className={`px-4 py-2 rounded-lg text-sm ${selectedStorage === storage ? "bg-amber-600 text-white" : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"}`}>
                {storage}
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
  const iphones = products.filter(p => p.category === "iphone");
  
  const sortedIphones = [...iphones].sort((a, b) => {
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
        {sortedIphones.map((product) => (
          <CategoryCard key={product.id} product={product} onClick={() => handleProductSelect(product)} />
        ))}
      </div>
      <Link href="/services" className="block w-full text-center py-3 bg-amber-600 text-white rounded-full text-sm mt-6 active:scale-95 transition-transform">
        Request Service
      </Link>
    </div>
  );
});

const Iphone3DViewer = dynamic(() => import("@/components/iphone-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const colorImages: Record<string, any> = {
  "iphone-17-pro-max": { "Deep Blue": "/images/iphone 17 series/iphone 17pro max-Deep blue.jpg", "Orange": "/images/iphone 17 series/iphone 17pro max-orange.jpg" },
  "iphone-17-pro": { "Orange": "/images/iphone 17 series/iphone 17 pro-orange.jpg", "Deep Blue": "/images/iphone 17 series/iphone 17 pro-Deep blue.jpg" },
  "iphone-17-slim": { "Space Black": "/images/iphone 17 series/iphone 17 AIR (slim)-space black.jpg", "Cloud White": "/images/iphone 17 series/iphone 17 AIR (slim)-cloud white.jpg", "Light Gold": "/images/iphone 17 series/iphone 17 AIR (slim)-light gold.jpg", "Sky Blue": "/images/iphone 17 series/iphone 17 AIR (slim)-sky blue.jpg" },
  "iphone-17": { "Black": "/images/iphone 17 series/iphone 17-black.jpg", "White": "/images/iphone 17 series/iphone 17-white.jpg", "Mist Blue": "/images/iphone 17 series/iphone 17-mist blue.jpg", "Sage": "/images/iphone 17 series/iphone 17-sage.jpg", "Lavender": "/images/iphone 17 series/iphone 17-lavender.jpg" },
  "iphone-16-pro-max": { "Black Titanium": "/images/iphone 16 series/iphone 16pro max- black titanium.jpg", "White Titanium": "/images/iphone 16 series/iphone 16pro max-white titanium.jpg", "Natural Titanium": "/images/iphone 16 series/iphone 16pro max-natural titanium.jpg", "Desert Titanium": "/images/iphone 16 series/iphone 16pro max-desert titanium.jpg" },
  "iphone-16-pro": { "Black Titanium": "/images/iphone 16 series/iphone 16pro -black titanium.jpg", "White Titanium": "/images/iphone 16 series/iphone 16pro -white titanium.jpg", "Natural Titanium": "/images/iphone 16 series/iphone 16pro -natural titanium.jpg" },
  "iphone-16-plus": { "Black": "/images/iphone 16 series/iphone 16 plus-black.jpg", "White": "/images/iphone 16 series/iphone 16 plus-white.jpg", "Pink": "/images/iphone 16 series/iphone 16 -pink.jpg", "Teal": "/images/iphone 16 series/iphone 16 plus-teal.jpg" },
  "iphone-16": { "Black": "/images/iphone 16 series/iphone 16 -black.jpg", "White": "/images/iphone 16 series/iphone 16 -white.jpg", "Pink": "/images/iphone 16 series/iphone 16 -pink.jpg" },
  "iphone-15-pro-max": { "Black Titanium": "/images/iphone 15 series/iphone 15 pro max -black titanium.jpg", "White Titanium": "/images/iphone 15 series/iphone 15 pro max -white titanium.jpg" },
  "iphone-15-pro": { "Black Titanium": "/images/iphone 15 series/iphone 15 pro  -black titanium.jpg", "White Titanium": "/images/iphone 15 series/iphone 15 pro  -white tatiniun.jpg" },
  "iphone-15-plus": { "Black": "/images/iphone 15 series/iphone 15plus-black.jpg", "Blue": "/images/iphone 15 series/iphone 15plus-blue.jpg", "Green": "/images/iphone 15 series/iphone 15plus-green.jpg" },
  "iphone-15": { "Black": "/images/iphone 15 series/iphone 15-black.jpg", "Blue": "/images/iphone 15 series/iphone 15-blue.jpg", "Pink": "/images/iphone 15 series/iphone 15-pink.jpg" },
};

export default function IPhoneBuySellPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const iphones = products.filter(p => p.category === "iphone");

  const sortedIphones = [...iphones].sort((a, b) => {
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
    setSelectedColor(product.colors?.[0] || "");
    setSelectedStorage(product.storage?.[0] || "");
    setShow3D(false);
  };

  const handleColorChange = (color: string) => setSelectedColor(color);

  const getColorHex = (color: string): string => {
    const colorMap: Record<string, string> = {
      "Black": "#1a1a1a", "White": "#f5f5f5", "Blue": "#0066cc", "Pink": "#ffb6c1",
      "Purple": "#8b5cf6", "Green": "#10b981", "Space Gray": "#6b7280", "Space Black": "#1a1a1a",
      "Silver": "#c0c0c0", "Gold": "#fbbf24", "Natural": "#d4c4a8", "Orange": "#f97316",
      "Teal": "#14b8a6", "Yellow": "#facc15", "Red": "#ef4444", "PRODUCT Red": "#dc2626",
      "Black Titanium": "#1a1a1a", "White Titanium": "#f5f5f5", "Natural Titanium": "#d4c4a8",
    };
    return colorMap[color] || "#6b7280";
  };

   const handleWhatsApp = (action: "buy" | "sell") => {
     if (!selectedProduct || !selectedColor || !selectedStorage) {
       alert("Please select all options");
       return;
     }
     
     const productData = {
       product: selectedProduct.name,
       model: selectedProduct.id,
       spec: selectedStorage,
       color: selectedColor,
       condition: "Verified & Tested"
     };
     
     const message = generateWhatsAppMessage(productData);
     const link = createWhatsAppLink(message);
     window.open(link, "_blank");
   };

  const currentImage = selectedProduct ? colorImages[selectedProduct.id]?.[selectedColor] || selectedProduct.imageFront : "";

  if (isMobile) {
    if (selectedProduct) {
      return (
        <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
          <MobileHeader />
          <HeroSection />
          <MobileProductDetail product={selectedProduct} onBack={() => { setSelectedProduct(null); setSelectedColor(""); setSelectedStorage(""); }} onWhatsApp={handleWhatsApp} />
        </div>
      );
    }
    return (
      <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
        <MobileHeader />
        <HeroSection />
        <MobileContent />
      </div>
    );
  }

  return (
    <main className="min-h-screen py-24 px-4 md:px-6 bg-main">
      <div className="container mx-auto mb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image src="/images/logo.png.png" alt="I.T MAN APPLE CARE" fill className="object-contain" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-center lg:text-left">
                <span className="bg-black/60 px-4 py-2 rounded-xl text-white">iPhone</span>
              </h1>
            </div>
            <p className="text-gray-400 text-center lg:text-left mt-4 text-lg">Buy & Sell premium iPhones - Select color & storage</p>
          </div>
          <div className="h-40 lg:h-60 rounded-xl overflow-hidden shadow-xl">
            <video autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover" poster="/images/screen.jpg">
              <source src="/videos/iphone vid.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {selectedProduct ? (
        <div className="container mx-auto px-4">
          <button onClick={() => { setSelectedProduct(null); setSelectedColor(""); setSelectedStorage(""); setShow3D(false); }} className="mb-6 text-amber-600 hover:text-amber-500 flex items-center gap-2 text-lg">← Back to all iPhones</button>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col gap-6">
              <GlassCard className="p-6 w-full">
                {show3D ? (<div className="w-full aspect-square"><Iphone3DViewer productId={selectedProduct.id} /></div>) : (
                  <div className="relative w-full aspect-square">
                    <Image key={`${selectedProduct.id}-${selectedColor}`} src={currentImage} alt={selectedProduct.name} fill className="object-contain p-6" unoptimized />
                  </div>
                )}
              </GlassCard>
              
              <button onClick={() => setShow3D(!show3D)} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                {show3D ? "View 2D Image" : "View 3D Model"}
              </button>
              
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div className="flex justify-center gap-4">
                  {selectedProduct.colors.map((color) => (
                    <button key={color} onClick={() => handleColorChange(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${selectedColor === color ? "border-amber-500 scale-110 shadow-lg shadow-amber-500/30" : "border-white/20 hover:border-white/40 hover:scale-105"}`}
                      style={{ backgroundColor: getColorHex(color) }} title={color} />
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">{selectedProduct.name}</h2>
              
              {selectedProduct.storage && selectedProduct.storage.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-gray-400 mb-3 text-base font-medium flex items-center gap-2"><span className="w-2 h-2 bg-amber-500 rounded-full"></span>Select Storage</h3>
                  <div className="space-y-3">
                    {selectedProduct.storage?.map((storage) => (
                      <button key={storage} onClick={() => setSelectedStorage(storage)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 border ${selectedStorage === storage ? "bg-amber-600/20 border-amber-500" : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedStorage === storage ? "border-amber-500 bg-amber-500" : "border-gray-500"}`}>
                            {selectedStorage === storage && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </div>
                          <span className={`text-base font-medium ${selectedStorage === storage ? "text-white" : "text-gray-300"}`}>{storage}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 mt-4">
                <p className="text-gray-400 mb-4 text-base">Premium quality iPhone available for sale. Each device is thoroughly inspected and certified.</p>
                <ul className="text-gray-500 space-y-2 text-base">
                  <li>✓ Fully tested & certified</li>
                  <li>✓ 90-day warranty</li>
                  <li>✓ Original Apple parts</li>
                  <li>✓ Trade-in accepted</li>
                </ul>
              </div>
              
              <div className="flex gap-4 flex-wrap mt-6">
                <button onClick={() => handleWhatsApp("buy")} className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors text-lg">Buy Now</button>
                <button onClick={() => handleWhatsApp("sell")} className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-colors text-lg">Sell Yours</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {sortedIphones.map((product) => (
              <GlassCard key={product.id} onClick={() => handleProductSelect(product)} className="p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-600/20">
                <div className="relative w-full aspect-square mb-4">
                  <Image src={product.imageFront} alt={product.name} fill className="object-contain p-2" unoptimized />
                </div>
                <p className="text-center font-medium text-white text-sm">{product.name}</p>
                {product.storage && product.storage.length > 0 && (<p className="text-center text-gray-500 text-xs mt-1">{product.storage[0]} - {product.storage[product.storage.length - 1]}</p>)}
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}