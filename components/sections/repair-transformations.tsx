"use client";

import { useRef, useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";

interface RepairService {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
}

const repairServices: RepairService[] = [
  { id: "screen", title: "Macbook Screen Replacement", beforeImage: "/images/Before&After/screen before.png", afterImage: "/images/Before&After/screen after.png" },
  { id: "battery", title: "iPhone backglass fix", beforeImage: "/images/Before&After/iphone back before.jpg", afterImage: "/images/Before&After/iphone back after.jpg" },
  { id: "charging", title: "iMac Fix", beforeImage: "/images/Before&After/imac before.jpg", afterImage: "/images/Before&After/imac after.jpg" },
  { id: "water", title: "ipad Fix", beforeImage: "/images/Before&After/ipad screen before.jpg", afterImage: "/images/Before&After/ipad screen after.jpg" },
  { id: "speaker", title: "battery Fix", beforeImage: "/images/Before&After/battery.png", afterImage: "/images/Before&After/battery after.png" },
  { id: "camera", title: "Camera Repair", beforeImage: "/images/Before&After/camera.png", afterImage: "/images/Before&After/cameraafter.png" },
  { id: "faceid", title: "Apple watch", beforeImage: "/images/Before&After/iwatch.png", afterImage: "/images/Before&After/iwatchafter.png" },
  { id: "touchid", title: "Touch ID Fix", beforeImage:"/images/Before&After/screen before.png", afterImage: "/images/Before&After/screen after.png" },
  { id: "ic", title: "IC Chip Repair", beforeImage: "/images/Before&After/screen before.png", afterImage: "/images/Before&After/screen after.png" },
];

function generateItems(items: RepairService[], count: number): RepairService[] {
  const result: RepairService[] = [];
  for (let i = 0; i < count; i++) {
    result.push(...items);
  }
  return result;
}

export function RepairTransformations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [items, setItems] = useState<RepairService[]>([]);

  useEffect(() => {
    setItems(generateItems(repairServices, 3));
  }, []);

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <h2 
          className="text-4xl md:text-5xl font-bold text-center"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 30px rgba(217,119,6,0.4)',
          }}
        >
          Repair Transformations
        </h2>
      </div>

      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-6"
          style={{
            animation: isPaused ? "none" : "scroll 60s linear infinite",
          }}
        >
          {items.map((service, index) => (
            <GlassCard 
              key={`${service.id}-${index}`}
              className="flex-shrink-0 w-72 md:w-80 p-3 transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden bg-black/30">
                    <img 
                      src={service.beforeImage} 
                      alt="Before" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs bg-red-600/80 px-2 py-0.5 rounded text-white font-medium mt-2">BEFORE</span>
                </div>
                <div className="h-20 w-px bg-gradient-to-b from-transparent via-amber-500 to-transparent"></div>
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden bg-black/30">
                    <img 
                      src={service.afterImage} 
                      alt="After" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs bg-green-600/80 px-2 py-0.5 rounded text-white font-medium mt-2">AFTER</span>
                </div>
              </div>
              <p 
                className="text-center text-sm font-medium mt-3"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
              >
                {service.title}
              </p>
            </GlassCard>
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