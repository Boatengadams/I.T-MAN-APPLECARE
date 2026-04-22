"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { products, Product } from "@/lib/products";
import { MobileHeader } from "@/components/mobile/mobile-header";

const Iphone3DViewer = dynamic(() => import("@/components/iphone-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const colorImages: Record<string, any> = {
  "iphone-17-pro-max": {
    "Deep Blue": "/images/iphone 17 series/iphone 17pro max-Deep blue.jpg",
    "Orange": "/images/iphone 17 series/iphone 17pro max-orange.jpg",
  },
  "iphone-17-pro": {
    "Orange": "/images/iphone 17 series/iphone 17 pro-orange.jpg",
    "Deep Blue": "/images/iphone 17 series/iphone 17 pro-Deep blue.jpg",
  },
  "iphone-17-slim": {
    "Space Black": "/images/iphone 17 series/iphone 17 AIR (slim)-space black.jpg",
    "Cloud White": "/images/iphone 17 series/iphone 17 AIR (slim)-cloud white.jpg",
    "Light Gold": "/images/iphone 17 series/iphone 17 AIR (slim)-light gold.jpg",
    "Sky Blue": "/images/iphone 17 series/iphone 17 AIR (slim)-sky blue.jpg",
  },
  "iphone-17": {
    "Black": "/images/iphone 17 series/iphone 17-black.jpg",
    "White": "/images/iphone 17 series/iphone 17-white.jpg",
    "Mist Blue": "/images/iphone 17 series/iphone 17-mist blue.jpg",
    "Sage": "/images/iphone 17 series/iphone 17-sage.jpg",
    "Lavender": "/images/iphone 17 series/iphone 17-lavender.jpg",
  },
  "iphone-17e": {
    "Black": "/images/iphone 17 series/iphone 17e-black.jpg",
    "White": "/images/iphone 17 series/iphone 17e-white.jpg",
    "Soft Pink": "/images/iphone 17 series/iphone 17e-soft pink.jpg",
  },
  "iphone-16-pro-max": {
    "Black Titanium": "/images/iphone 16 series/iphone 16pro max- black titanium.jpg",
    "White Titanium": "/images/iphone 16 series/iphone 16pro max-white titanium.jpg",
    "Natural Titanium": "/images/iphone 16 series/iphone 16pro max-natural titanium.jpg",
    "Desert Titanium": "/images/iphone 16 series/iphone 16pro max-desert titanium.jpg",
  },
  "iphone-16-pro": {
    "Black Titanium": "/images/iphone 16 series/iphone 16pro -black titanium.jpg",
    "White Titanium": "/images/iphone 16 series/iphone 16pro -white titanium.jpg",
    "Natural Titanium": "/images/iphone 16 series/iphone 16pro -natural titanium.jpg",
    "Desert Titanium": "/images/iphone 16 series/iphone 16pro-desert titanium.jpg",
  },
  "iphone-16-plus": {
    "Black": "/images/iphone 16 series/iphone 16 plus-black.jpg",
    "White": "/images/iphone 16 series/iphone 16 plus-white.jpg",
    "Pink": "/images/iphone 16 series/iphone 16 -pink.jpg",
    "Teal": "/images/iphone 16 series/iphone 16 plus-teal.jpg",
    "Ultramarine": "/images/iphone 16 series/iphone 16 plus-ultralmarine.jpg",
  },
  "iphone-16e": {
    "Black": "/images/iphone 16 series/iphone 16e-black.jpg",
    "White": "/images/iphone 16 series/iphone 16e-white.jpg",
  },
  "iphone-16": {
    "Black": "/images/iphone 16 series/iphone 16 -black.jpg",
    "White": "/images/iphone 16 series/iphone 16 -white.jpg",
    "Pink": "/images/iphone 16 series/iphone 16 -pink.jpg",
    "Teal": "/images/iphone 16 series/iphone 16 -teal.jpg",
    "Ultramarine": "/images/iphone 16 series/iphone 16 -ultramarine.jpg",
  },
  "iphone-15-pro-max": {
    "Black Titanium": "/images/iphone 15 series/iphone 15 pro max -black titanium.jpg",
    "White Titanium": "/images/iphone 15 series/iphone 15 pro max -white titanium.jpg",
    "Blue Titanium": "/images/iphone 15 series/iphone 15 pro max -blue titanium.jpg",
    "Natural Titanium": "/images/iphone 15 series/iphone 15 pro max -natural titanium.jpg",
  },
  "iphone-15-pro": {
    "Black Titanium": "/images/iphone 15 series/iphone 15 pro  -black titanium.jpg",
    "White Titanium": "/images/iphone 15 series/iphone 15 pro  -white tatiniun.jpg",
    "Blue Titanium": "/images/iphone 15 series/iphone 15 pro  -blue titanium.jpg",
    "Natural Titanium": "/images/iphone 15 series/iphone 15 pro  -natural titanium.jpg",
  },
  "iphone-15-plus": {
    "Black": "/images/iphone 15 series/iphone 15plus-black.jpg",
    "Blue": "/images/iphone 15 series/iphone 15plus-blue.jpg",
    "Green": "/images/iphone 15 series/iphone 15plus-green.jpg",
    "Yellow": "/images/iphone 15 series/iphone 15plus-yellow.jpg",
    "Pink": "/images/iphone 15 series/iphone 15plus-pink.jpg",
  },
  "iphone-15": {
    "Black": "/images/iphone 15 series/iphone 15-black.jpg",
    "Blue": "/images/iphone 15 series/iphone 15-blue.jpg",
    "Green": "/images/iphone 15 series/iphone 15-green.jpg",
    "Yellow": "/images/iphone 15 series/iphone 15-yellow.jpg",
    "Pink": "/images/iphone 15 series/iphone 15-pink.jpg",
  },
};

export default function IPhoneBuySellPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [imageError, setImageError] = useState(false);
  const [showColorPopup, setShowColorPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const iphones = products.filter(p => p.category === "iphone");

  const sortedIphones = [...iphones].sort((a, b) => {
    const orderA = parseInt(a.id.replace(/\D/g, "")) || 0;
    const orderB = parseInt(b.id.replace(/\D/g, "")) || 0;
    return orderB - orderA;
  });

  useEffect(() => {
    if (selectedProduct) {
      setSelectedColor(selectedProduct.colors?.[0] || "");
      setSelectedStorage(selectedProduct.storage?.[0] || "");
      setImageError(false);
    }
  }, [selectedProduct]);

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
    setImageError(false);
    setShow3D(false);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const getColorHex = (color: string): string => {
    const colorMap: Record<string, string> = {
      "Black": "#1a1a1a",
      "White": "#f5f5f5",
      "Blue": "#0066cc",
      "Pink": "#ffb6c1",
      "Purple": "#8b5cf6",
      "Green": "#10b981",
      "Starlight": "#f0e6d2",
      "Space Gray": "#6b7280",
      "Space Black": "#1a1a1a",
      "Silver": "#c0c0c0",
      "Gold": "#fbbf24",
      "Midnight": "#1e3a5f",
      "Deep Blue": "#1e3a8a",
      "Natural": "#d4c4a8",
      "Orange": "#f97316",
      "Teal": "#14b8a6",
      "Yellow": "#facc15",
      "Red": "#ef4444",
      "PRODUCT Red": "#dc2626",
      "Graphite": "#374151",
      "Sierra Blue": "#7dd3fc",
      "Alpine Green": "#3f6212",
      "Mist Blue": "#7dd3fc",
      "Sage": "#84cc16",
      "Lavender": "#c4b5fd",
      "Cloud White": "#f8fafc",
      "Sky Blue": "#0ea5e9",
      "Light Gold": "#fcd34d",
      "Soft Pink": "#f9a8d4",
      "Desert Titanium": "#c4a77d",
      "Black Titanium": "#1a1a1a",
      "White Titanium": "#f5f5f5",
      "Blue Titanium": "#0ea5e9",
      "Natural Titanium": "#d4c4a8",
    };
    return colorMap[color] || "#6b7280";
  };

  const handleWhatsApp = (action: "buy" | "sell") => {
    if (!selectedProduct) return;
    
    let message = `I'm interested in ${action === "buy" ? "buying" : "selling"} my ${selectedProduct.name}`;
    if (selectedColor) message += ` (${selectedColor})`;
    if (selectedStorage) message += ` - ${selectedStorage}`;
    
    window.open(`https://wa.me/233549665779?text=${encodeURIComponent(message)}`, "_blank");
  };

  const currentImage = selectedProduct 
    ? colorImages[selectedProduct.id]?.[selectedColor] || selectedProduct.imageFront 
    : "";

  return (
    <>
      {isMobile && <MobileHeader />}
      <main className={`min-h-screen ${isMobile ? 'pt-0' : 'py-24'} px-4 md:px-6`}>
      <div className="container mx-auto mb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src="/images/logo.png.png"
                  alt="I.T MAN APPLE CARE"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 
                className="text-5xl md:text-6xl font-bold text-center lg:text-left"
              >
                <span className="bg-black/60 px-4 py-2 rounded-xl text-white">iPhone</span>
              </h1>
            </div>
            <p className="text-gray-400 text-center lg:text-left mt-4 text-lg">
              Buy & Sell premium iPhones - Select color & storage
            </p>
          </div>
          <div className="h-40 lg:h-60 rounded-xl overflow-hidden shadow-xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className="w-full h-full object-cover"
              poster="/images/screen.jpg"
            >
              <source src="/videos/iphone vid.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {selectedProduct ? (
        <div className="container mx-auto px-4">
          <button
            onClick={() => { setSelectedProduct(null); setSelectedColor(""); setSelectedStorage(""); setShow3D(false); }}
            className="mb-6 text-amber-600 hover:text-amber-500 flex items-center gap-2 text-lg"
          >
            ← Back to all iPhones
          </button>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col gap-6">
              <GlassCard className="p-6 w-full">
                {show3D ? (
                  <div className="w-full aspect-square">
                    <Iphone3DViewer />
                  </div>
                ) : (
                  <div className="relative w-full aspect-square">
                    <Image
                      key={`${selectedProduct.id}-${selectedColor}`}
                      src={currentImage}
                      alt={selectedProduct.name}
                      fill
                      className="object-contain p-6"
                      unoptimized
                    />
                  </div>
                )}
              </GlassCard>
              
              <button
                onClick={() => setShow3D(!show3D)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {show3D ? "View 2D Image" : "View 3D Model"}
              </button>
              
              {/* Color Selection Circles - Below Image */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div className="flex justify-center gap-4">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`
                        w-12 h-12 rounded-full border-2 transition-all duration-200
                        ${selectedColor === color 
                          ? "border-amber-500 scale-110 shadow-lg shadow-amber-500/30" 
                          : "border-white/20 hover:border-white/40 hover:scale-105"
                        }
                      `}
                      style={{ backgroundColor: getColorHex(color) }}
                      title={color}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">{selectedProduct.name}</h2>
              
              {selectedProduct.storage && selectedProduct.storage.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-gray-400 mb-3 text-base font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Select Storage
                  </h3>
                  <div className="space-y-3">
                    {selectedProduct.storage?.map((storage) => (
                      <button
                        key={storage}
                        onClick={() => setSelectedStorage(storage)}
                        className={`
                          w-full flex items-center justify-between p-4 rounded-xl cursor-pointer 
                          transition-all duration-200 border
                          ${selectedStorage === storage 
                            ? "bg-amber-600/20 border-amber-500" 
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedStorage === storage 
                              ? "border-amber-500 bg-amber-500" 
                              : "border-gray-500"
                          }`}>
                            {selectedStorage === storage && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span className={`text-base font-medium ${
                            selectedStorage === storage ? "text-white" : "text-gray-300"
                          }`}>
                            {storage}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 mt-4">
                <p className="text-gray-400 mb-4 text-base">
                  Premium quality iPhone available for sale. Each device is thoroughly inspected and certified.
                </p>
                <ul className="text-gray-500 space-y-2 text-base">
                  <li>✓ Fully tested & certified</li>
                  <li>✓ 90-day warranty</li>
                  <li>✓ Original Apple parts</li>
                  <li>✓ Trade-in accepted</li>
                </ul>
              </div>
              
              <div className="flex gap-4 flex-wrap mt-6">
                <button
                  onClick={() => handleWhatsApp("buy")}
                  className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors text-lg"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleWhatsApp("sell")}
                  className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-colors text-lg"
                >
                  Sell Yours
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {sortedIphones.map((product) => (
              <GlassCard
                key={product.id}
                onClick={() => handleProductSelect(product)}
                className="p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-600/20"
              >
                <div className="relative w-full aspect-square mb-4">
                  <Image
                    src={product.imageFront}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
                <p className="text-center font-medium text-white text-sm">{product.name}</p>
                {product.storage && product.storage.length > 0 && (
                  <p className="text-center text-gray-500 text-xs mt-1">
                    {product.storage[0]} - {product.storage[product.storage.length - 1]}
                  </p>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
        )}
      </main>
    </>
  );
}