"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero3D() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10 order-2 lg:order-1">
          <div className="flex items-center gap-6 mb-4">
            <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 hidden lg:block">
              <Image
                src="/images/logo.png.png"
                alt="I.T MAN APPLE CARE"
                fill
                className="object-contain"
                style={{
                  filter: 'drop-shadow(0 0 25px rgba(217,119,6,0.5)) drop-shadow(0 0 50px rgba(217,119,0.3))',
                }}
                sizes="(max-width: 1024px) 112px, 176px"
              />
            </div>
            <div>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.2)',
                }}
              >
                <span className="text-white">I.T MAN</span>
              </h1>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.2)',
                }}
              >
                <span className="text-white">APPLE CARE</span>
              </h1>
              
              <div className="mt-3 flex items-center justify-center lg:justify-start gap-3">
                <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-amber-500"></div>
                <span 
                  className="text-sm md:text-base font-light tracking-widest uppercase"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(217,119,6,0.4)',
                  }}
                >
                  Support and Service Centre
                </span>
                <div className="h-[2px] w-8 bg-gradient-to-l from-transparent to-amber-500"></div>
              </div>
            </div>
          </div>
          <p 
            className="text-lg md:text-xl font-light tracking-widest uppercase mb-8"
          >
            <span className="text-amber-400 animate-pulse">●</span> <span className="text-white bg-black/60 px-2 py-1 rounded-lg">Buy</span> <span className="text-amber-700 mx-2">|</span> <span className="text-white bg-black/60 px-2 py-1 rounded-lg">Sell</span> <span className="text-amber-700 mx-2">|</span> <span className="text-white bg-black/60 px-2 py-1 rounded-lg">Fix Apple Devices</span>
          </p>
          <Button variant="primary">Explore Services</Button>
        </div>

        <div className="h-[40vh] lg:h-[70vh] order-1 lg:order-2 rounded-xl overflow-hidden shadow-2xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover"
            poster="/images/service1.jpg"
          >
            <source src="/videos/3dvid.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}