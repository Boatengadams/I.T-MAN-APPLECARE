"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePageVisibility } from "@/hooks/use-page-visibility";
import { useTheme } from "@/hooks/use-theme";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/buy-sell", label: "Buy & Sell" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

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

const ProMobileHeader = memo(function ProMobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isTabActive } = usePageVisibility();

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

const HeroHeader = memo(function HeroHeader() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
      <p className="text-sm text-amber-400 mb-2 tracking-wide">Welcome to</p>
      <div className="relative w-28 h-28 mb-3">
        <Image src="/images/logo.png.png" alt="I.T MAN APPLE CARE" fill sizes="112px" className="object-contain" priority />
      </div>
      <h1 className="text-2xl font-bold text-black dark:text-white leading-tight">I.T MAN APPLECARE</h1>
      <p className="text-sm text-amber-500 mt-1">Support & Service Center</p>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">Buy • Sell • Fix Apple Devices</p>
    </div>
  );
});

const VideoSection = memo(function VideoSection() {
  const { isTabActive } = usePageVisibility();
  
  if (!isTabActive) return null;
  
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <video autoPlay muted loop playsInline preload="none" className="absolute inset-0 w-full h-full object-cover" poster="/images/service1.jpg">
        <source src="/videos/3dvid.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-white/50 dark:bg-black/50" />
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div>
          <h2 className="text-xl font-semibold text-black dark:text-white">Premium Apple Products</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">& Professional Services</p>
        </div>
      </div>
    </section>
  );
});

const ExploreSection = memo(function ExploreSection({ title, subtitle, image, href }: { title: string; subtitle: string; image: string; href: string }) {
  return (
    <section className="relative h-[70vh] flex items-end px-4 pb-10 overflow-hidden" style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent dark:from-black/90" />
      <div className="relative z-10 w-full">
        <h2 className="text-2xl font-bold text-black dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 mb-4">{subtitle}</p>
        <Link href={href} className="inline-block px-6 py-3 bg-amber-600 text-black dark:text-white rounded-full text-sm active:scale-95 transition-transform duration-150 touch-manipulation">
          Explore
        </Link>
      </div>
    </section>
  );
});

const RepairTransformationSection = memo(function RepairTransformationSection() {
  const transformations = [
    { title: "MacBook Screen", before: "/images/Before&After/screen before.png", after: "/images/Before&After/screen after.png" },
    { title: "iPhone Backglass", before: "/images/Before&After/iphone back before.jpg", after: "/images/Before&After/iphone back after.jpg" },
    { title: "iMac Fix", before: "/images/Before&After/imac before.jpg", after: "/images/Before&After/imac after.jpg" },
    { title: "iPad Screen", before: "/images/Before&After/ipad screen before.jpg", after: "/images/Before&After/ipad screen after.jpg" },
    { title: "Battery Fix", before: "/images/Before&After/battery.png", after: "/images/Before&After/battery after.png" },
    { title: "Camera Repair", before: "/images/Before&After/camera.png", after: "/images/Before&After/cameraafter.png" },
    { title: "Apple Watch", before: "/images/Before&After/iwatch.png", after: "/images/Before&After/iwatchafter.png" },
    { title: "Touch ID", before: "/images/Before&After/screen before.png", after: "/images/Before&After/screen after.png" },
  ];

  return (
    <section className="px-4 py-14">
      <h2 className="text-2xl font-bold text-black dark:text-white text-center">Repair Transformation</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center text-sm mt-1 mb-6">Before & After Results</p>
      <div className="grid grid-cols-2 gap-3">
        {transformations.map((item, index) => (
          <div key={index} className="bg-black/5 p-2 rounded-xl border border-black/10 dark:bg-white/5 dark:border-white/10 overflow-hidden">
            <div className="flex gap-1">
              <div className="relative w-1/2 h-20">
                <Image src={item.before} alt="Before" fill className="object-cover" sizes="80px" />
                <span className="absolute bottom-0 left-0 right-0 text-[10px] bg-red-600/80 text-black dark:text-white text-center py-0.5">BEFORE</span>
              </div>
              <div className="relative w-1/2 h-20">
                <Image src={item.after} alt="After" fill className="object-cover" sizes="80px" />
                <span className="absolute bottom-0 left-0 right-0 text-[10px] bg-green-600/80 text-black dark:text-white text-center py-0.5">AFTER</span>
              </div>
            </div>
            <p className="text-xs text-black dark:text-white font-medium text-center mt-2">{item.title}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link href="/services" className="block w-full text-center py-3 bg-amber-600 text-black dark:text-white rounded-full text-sm active:scale-95 transition-transform duration-150 touch-manipulation">
          Request Service
        </Link>
      </div>
    </section>
  );
});

const ContactInfoSection = memo(function ContactInfoSection() {
  return (
    <section className="px-4 py-10 bg-gradient-to-b from-white/30 to-white/60 dark:from-black/30 dark:to-black/60">
      <div className="w-full max-w-xs mx-auto bg-white/50 backdrop-blur-lg rounded-2xl p-5 border border-black/10 shadow-lg dark:bg-black/50 dark:border-white/10">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4 text-center">Contact Us</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-black/5 dark:bg-white/5 rounded-xl">
            <span className="text-2xl">📍</span>
            <div>
              <p className="text-xs text-amber-400 uppercase font-medium">Location</p>
              <p className="text-sm text-black dark:text-white">Kumasi, Tafo 4 miles</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-black/5 dark:bg-white/5 rounded-xl">
            <span className="text-2xl">📞</span>
            <div>
              <p className="text-xs text-amber-400 uppercase font-medium">Contact</p>
              <p className="text-sm text-black dark:text-white">+233 54 966 5779</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-black/5 dark:bg-white/5 rounded-xl">
            <span className="text-2xl">🕐</span>
            <div>
              <p className="text-xs text-amber-400 uppercase font-medium">Hours</p>
              <p className="text-sm text-black dark:text-white">Mon-Sat 8am-7pm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export function MobileLayout() {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white">
      <ProMobileHeader />
      <HeroHeader />
      <VideoSection />
      <ExploreSection title="iPhone" subtitle="Buy & Repair iPhones" image="/images/iphone.jpg" href="/buy-sell/iphone" />
      <ExploreSection title="iPad" subtitle="iPads for work & fun" image="/images/ipad.jpg" href="/buy-sell/ipad" />
      <ExploreSection title="MacBook" subtitle="Powerful laptops" image="/images/macbook.jpg" href="/buy-sell/macbook" />
      <ExploreSection title="iMac" subtitle="All-in-one computers" image="/images/imac.jpg" href="/buy-sell/imac" />
      <ExploreSection title="Apple Watch" subtitle="Smart watches" image="/images/applewatch.jpg" href="/buy-sell/watch" />
      <ExploreSection title="Accessories" subtitle="AirPods & more" image="/images/accessories.jpg" href="/buy-sell/accessory" />
      <RepairTransformationSection />
      <ContactInfoSection />
    </div>
  );
}