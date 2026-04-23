"use client";

import { useState, useEffect, memo, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { usePageVisibility } from "@/hooks/use-page-visibility";
import { useTheme } from "@/hooks/use-theme";

const Teardown3DViewer = dynamic(() => import("@/components/teardown-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  bgImage: string;
  icon: string;
}

const services: ServiceItem[] = [
  { id: "screen", title: "Screen", category: "Hardware", description: "Screen replacement", bgImage: "/images/screen.jpg", icon: "📱" },
  { id: "battery", title: "Battery", category: "Hardware", description: "Battery replacement", bgImage: "/images/battery.jpg", icon: "🔋" },
  { id: "macbook", title: "MacBook", category: "Hardware", description: "MacBook repairs", bgImage: "/images/macbookrepair.jpg", icon: "💻" },
  { id: "imac", title: "iMac", category: "Hardware", description: "iMac repairs", bgImage: "/images/imacrepair.jpg", icon: "🖥️" },
  { id: "parts", title: "Parts", category: "Sales", description: "Genuine parts", bgImage: "/images/parts.jpg", icon: "🛠️" },
  { id: "software", title: "Software", category: "Services", description: "OS & apps", bgImage: "/images/installation.jpg", icon: "⚙️" },
];

const phoneNumber = "+233 54 966 5779";
const whatsappLink = "https://wa.me/233549665779";

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
      <div className="relative w-24 h-24 mb-3">
        <Image src="/images/logo.png.png" alt="I.T MAN APPLE CARE" fill sizes="96px" className="object-contain" priority />
      </div>
      <h1 className="text-2xl font-bold text-black dark:text-white">Repair & Services</h1>
      <p className="text-sm text-amber-500 mt-1">Professional Apple Repairs</p>
      <div className="w-full max-w-md h-48 rounded-xl overflow-hidden shadow-xl mt-4">
        <Teardown3DViewer />
      </div>
    </div>
  );
});

const VideoSection = memo(function VideoSection() {
  const { isTabActive } = usePageVisibility();
  if (!isTabActive) return null;

  return (
    <section className="relative h-[50vh] w-full overflow-hidden">
      <video autoPlay loop muted playsInline preload="none" className="absolute inset-0 w-full h-full object-cover" poster="/images/service1.jpg">
        <source src="/videos/service.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-white/50 dark:bg-black/50" />
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div>
          <h2 className="text-xl font-semibold text-black dark:text-white">Expert Repair Services</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">All Apple Devices</p>
        </div>
      </div>
    </section>
  );
});

const ServiceCard = memo(function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Link href="/buy-sell" className="block">
      <div className="bg-black/5 p-3 rounded-xl border border-black/10 dark:bg-white/5 dark:border-white/10 flex items-center gap-3 touch-manipulation active:scale-95 transition-transform">
        <div className="text-2xl">{service.icon}</div>
        <div>
          <h3 className="text-black dark:text-white font-medium text-sm">{service.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs">{service.description}</p>
        </div>
      </div>
    </Link>
  );
});

const MobileContent = memo(function MobileContent() {
  return (
    <>
      <VideoSection />
      <section className="px-4 py-6">
        <h2 className="text-xl font-bold text-black dark:text-white mb-4">Our Services</h2>
        <div className="grid grid-cols-2 gap-3">
          {services.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </section>
      <section className="px-4 py-6 bg-gradient-to-b from-white/30 to-white/60 dark:from-black/30 dark:to-black/60">
        <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-5 border border-black/10 shadow-lg dark:bg-black/50 dark:border-white/10">
          <h2 className="text-lg font-semibold text-black dark:text-white mb-4 text-center">Request Service</h2>
          <div className="space-y-3">
            <Link href={whatsappLink} target="_blank" className="flex items-center justify-center gap-2 py-3 bg-green-600 text-black dark:text-white rounded-xl font-medium touch-manipulation active:scale-95 transition-transform">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.182 1.24 8.475 3.687 2.397 2.502 3.823 5.857 3.823 9.213 0 6.627-5.403 11.891-11.893 11.891-3.172-.001-6.129-1.243-8.354-3.688l-6.164 1.667zm4.764-3.961c-.381-.127-.791-.191-1.219-.191-.964 0-1.877.388-2.543 1.115l-.332.457c-.546.786-.793 1.762-.793 2.756 0 2.117 1.726 3.837 3.854 3.837 1.125 0 2.182-.461 2.968-1.237.758-.752 1.165-1.743 1.165-2.814 0-1.054-.385-2.035-1.096-2.794l-.458-.332z"/></svg>
              Chat on WhatsApp
            </Link>
            <a href={`tel:${phoneNumber}`} className="flex items-center justify-center gap-2 py-3 bg-amber-600 text-black dark:text-white rounded-xl font-medium touch-manipulation active:scale-95 transition-transform">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              Call: {phoneNumber}
            </a>
          </div>
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-5 border border-black/10 shadow-lg dark:bg-black/50 dark:border-white/10">
          <h2 className="text-lg font-semibold text-black dark:text-white mb-4 text-center">Contact Info</h2>
          <div className="space-y-3">
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
                <p className="text-sm text-black dark:text-white">{phoneNumber}</p>
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
    </>
  );
});

export default function ServicesPage() {
  const [isMobile, setIsMobile] = useState(false);
  const { isTabActive } = usePageVisibility();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="bg-white text-black dark:bg-black dark:text-white">
        <MobileHeader />
        <HeroSection />
        {isTabActive && <MobileContent />}
      </div>
    );
  }

  return (
    <main className="min-h-screen py-24 px-6 bg-main">
      <div className="container mx-auto mb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <div className="relative w-12 h-12 md:w-16 md:h-16">
                <Image src="/images/logo.png.png" alt="I.T MAN APPLE CARE" fill className="object-contain" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-center lg:text-left" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 30px rgba(217,119,6,0.4)' }}>Repair & Services</h1>
            </div>
            <p className="text-white bg-black/60 px-4 py-2 rounded-xl text-center lg:text-left mt-4 text-lg font-medium inline-block">Professional Apple device repair services</p>
            <p className="text-green-400 bg-black/60 px-4 py-2 rounded-xl mt-2 font-semibold inline-block">Contact: {phoneNumber}</p>
          </div>
          <div className="h-40 lg:h-60 rounded-xl overflow-hidden shadow-xl">
            <Teardown3DViewer />
          </div>
        </div>
      </div>
      <section className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.id} href="/buy-sell">
              <div className="relative h-48 md:h-56 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(217,119,6,0.2)] rounded-xl overflow-hidden" style={{ backgroundImage: `url(${service.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
      <section className="mt-24 relative">
        <div className="absolute inset-0 bg-black/60 -z-10" aria-hidden="true" />
        <div className="container mx-auto px-6 mb-12 pt-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center"><span className="text-white bg-black/60 px-4 py-2 rounded-xl">Request Service</span></h2>
        </div>
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={whatsappLink} target="_blank" className="flex items-center justify-center gap-2 py-3 px-6 bg-green-600 text-white rounded-xl font-semibold touch-manipulation">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.182 1.24 8.475 3.687 2.397 2.502 3.823 5.857 3.823 9.213 0 6.627-5.403 11.891-11.893 11.891-3.172-.001-6.129-1.243-8.354-3.688l-6.164 1.667zm4.764-3.961c-.381-.127-.791-.191-1.219-.191-.964 0-1.877.388-2.543 1.115l-.332.457c-.546.786-.793 1.762-.793 2.756 0 2.117 1.726 3.837 3.854 3.837 1.125 0 2.182-.461 2.968-1.237.758-.752 1.165-1.743 1.165-2.814 0-1.054-.385-2.035-1.096-2.794l-.458-.332z"/></svg>
              Chat on WhatsApp
            </Link>
            <a href={`tel:${phoneNumber}`} className="flex items-center justify-center gap-2 py-3 px-6 bg-amber-600 text-white rounded-xl font-semibold touch-manipulation">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              Call Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}