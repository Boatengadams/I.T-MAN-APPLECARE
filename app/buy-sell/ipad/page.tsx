"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { products, Product } from "@/lib/products";
import { MobileHeader } from "@/components/mobile/mobile-header";

const IPad3DViewer = dynamic(() => import("@/components/ipad-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function IPadBuySellPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const [show3D, setShow3D] = useState(false);
  
  const ipads = products.filter(p => p.category === "ipad");

  const sortedIpads = [...ipads].sort((a, b) => {
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
    setSelectedStorage(product.storage?.[0] || "");
    setShow3D(false);
  };

  const handleWhatsApp = (action: "buy" | "sell") => {
    if (!selectedProduct) return;
    
    let message = `I'm interested in ${action === "buy" ? "buying" : "selling"} my ${selectedProduct.name}`;
    if (selectedStorage) message += ` - ${selectedStorage}`;
    
    window.open(`https://wa.me/233549665779?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      {isMobile && <MobileHeader />}
      <main className={`min-h-screen ${isMobile ? 'pt-0' : 'py-24'} px-6`}>
      <div className="container mx-auto px-6 mb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <div className="relative w-12 h-12 md:w-16 md:h-16">
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
                <span className="bg-black/60 px-4 py-2 rounded-xl text-white">iPad</span>
              </h1>
            </div>
            <p className="text-gray-400 text-center lg:text-left mt-4 text-lg">
              Buy & Sell premium iPads - Select storage
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
              poster="/images/ipad%20Air%2011%20in(M4)/ipad%20Air%2011%20in(M4)-blue.jpg"
            >
              <source src="/videos/ipadvid.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {selectedProduct ? (
        <div className="container mx-auto px-6">
          <button
            onClick={() => { setSelectedProduct(null); setSelectedStorage(""); setShow3D(false); }}
            className="mb-6 text-amber-600 hover:text-amber-500 flex items-center gap-2"
          >
            ← Back to all iPads
          </button>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <GlassCard className="p-4">
              {show3D ? (
                <div className="h-64 md:h-80 w-full">
                  <IPad3DViewer />
                </div>
              ) : (
                <div className="relative h-64 md:h-80 w-full">
                  <Image
                    src={selectedProduct.imageFront}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </GlassCard>
            
            <button
              onClick={() => setShow3D(!show3D)}
              className="mt-4 w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
            >
              {show3D ? "View 2D Image" : "View 3D Model"}
            </button>
            
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{selectedProduct.name}</h2>
              
              {selectedProduct.storage && selectedProduct.storage.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-400 mb-2 text-sm">Select Storage:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.storage.map((storage) => (
                      <button
                        key={storage}
                        onClick={() => setSelectedStorage(storage)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          selectedStorage === storage 
                            ? "bg-amber-600 text-white" 
                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                        }`}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-gray-400 mb-4 text-sm">
                Premium quality iPad available for sale. Each device is thoroughly inspected and certified.
              </p>
              <ul className="text-gray-500 mb-6 space-y-1 text-sm">
                <li>✓ Fully tested & certified</li>
                <li>✓ 90-day warranty</li>
                <li>✓ Original Apple parts</li>
                <li>✓ Trade-in accepted</li>
              </ul>
              
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => handleWhatsApp("buy")}
                  className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors text-lg"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleWhatsApp("sell")}
                  className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors text-lg"
                >
                  Sell Yours
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedIpads.map((product) => (
              <GlassCard
                key={product.id}
                onClick={() => handleProductSelect(product)}
                className="p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-600/20"
              >
                <div className="relative h-32 md:h-40 w-full mb-4">
                  <Image
                    src={product.imageFront}
                    alt={product.name}
                    fill
                    className="object-contain"
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