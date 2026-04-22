"use client";

import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <Image
              src="/images/logo.png.png"
              alt="I.T MAN APPLE CARE"
              fill
              className="object-contain"
              sizes="48px"
            />
          </div>
          <span className="text-xl font-bold text-amber-600">
            I.T MAN APPLE CARE
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="/buy-sell"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Buy & Sell
          </Link>
          <Link
            href="/services"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="text-gray-300 hover:text-white transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}