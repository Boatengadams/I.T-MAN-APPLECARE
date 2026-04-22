"use client";

import Image from "next/image";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  bgImage: string;
}

const services: ServiceItem[] = [
  {
    id: "screen",
    title: "Screen Replacement",
    category: "Hardware Repairs",
    description: "Cracked or damaged screen replacement for all iPhone models",
    bgImage: "/images/screen.jpg",
  },
  {
    id: "battery",
    title: "Battery Replacement",
    category: "Hardware Repairs",
    description: "Original battery replacement with warranty",
    bgImage: "/images/battery.jpg",
  },
  {
    id: "macbook",
    title: "MacBook Repairs",
    category: "Hardware Repairs",
    description: "Fix MacBook issues and replace damaged parts",
    bgImage: "/images/macbookrepair.jpg",
  },
  {
    id: "imac",
    title: "iMac Repairs",
    category: "Hardware Repairs",
    description: "Chip-level repairs for complex iMac issues",
    bgImage: "/images/imacrepair.jpg",
  },
  {
    id: "parts",
    title: "Buy Parts",
    category: "Parts Sales",
    description: "Genuine Apple parts for self-repair",
    bgImage: "/images/parts.jpg",
  },
  {
    id: "installation",
    title: "System & Software Installation",
    category: "Software Services",
    description: "OS installation Windows, macOS, and more",
    bgImage: "/images/installation.jpg",
  },
];

export function ServiceGrid() {
  return (
    <section className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link key={service.id} href="/buy-sell">
            <div 
              className="relative h-48 md:h-56 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(217,119,6,0.2)] rounded-xl overflow-hidden"
              style={{ backgroundImage: `url(${service.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
              <div className="absolute p-6 flex flex-col justify-end h-full">
                <p className="text-amber-500 text-sm font-medium mb-1">{service.category}</p>
                <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                <p className="text-gray-300 text-sm">{service.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}