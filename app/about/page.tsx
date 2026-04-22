"use client";

import { useState, useEffect, memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePageVisibility } from "@/hooks/use-page-visibility";
import { useTheme } from "@/hooks/use-theme";

const phoneNumber = "+233 54 966 5779";
const whatsappLink = "https://wa.me/233549665779";

const openingHours = [
  { day: "Monday", time: "8AM - 7PM", open: true },
  { day: "Tuesday", time: "8AM - 7PM", open: true },
  { day: "Wednesday", time: "8AM - 7PM", open: true },
  { day: "Thursday", time: "8AM - 7PM", open: true },
  { day: "Friday", time: "8AM - 7PM", open: true },
  { day: "Saturday", time: "8AM - 7PM", open: true },
  { day: "Sunday", time: "1PM - 7PM", open: true },
];

const services = [
  "iPhone Repair & Sales",
  "iPad Repair & Sales",
  "MacBook Repair & Sales",
  "Apple Watch Repair",
  "iMac Repair & Sales",
  "Screen Replacement",
  "Battery Replacement",
  "Water Damage Repair",
];

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
        <Image src="/images/logo.png.png" alt="I.T MAN APPLE CARE" fill sizes="96px" className="object-contain" style={{ filter: 'drop-shadow(0 0 30px rgba(217,119,6,0.6))' }} priority />
      </div>
      <h1 className="text-2xl font-bold text-black dark:text-white">About Us</h1>
      <p className="text-sm text-amber-500 mt-1"> Support & Service Center </p>
    </div>
  );
});

const AboutSection = memo(function AboutSection() {
  return (
    <section className="px-4 py-4">
      <div className="bg-black/5 p-4 rounded-xl border border-black/10 dark:bg-white/5 dark:border-white/10">
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Welcome to I.T MAN APPLE CARE</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">Your trusted Apple authorized support and service center. We specialize in buying, selling, and repairing all Apple products.</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Our certified technicians provide professional repair services with genuine parts and warranty on all repairs.</p>
      </div>
    </section>
  );
});

const HoursSection = memo(function HoursSection() {
  return (
    <section className="px-4 py-4">
      <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Opening Hours</h2>
      <div className="grid grid-cols-2 gap-2">
        {openingHours.map((day) => (
          <div key={day.day} className={`p-2 rounded-lg text-center ${day.open ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'}`}>
            <p className="text-black dark:text-white text-sm font-medium">{day.day}</p>
            <p className={`text-xs ${day.open ? 'text-green-400' : 'text-red-400'}`}>{day.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
});

const ServicesSection = memo(function ServicesSection() {
  return (
    <section className="px-4 py-4">
      <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Our Services</h2>
      <div className="grid grid-cols-2 gap-2">
        {services.slice(0, 8).map((service) => (
          <div key={service} className="flex items-center gap-2 p-2 bg-black/5 dark:bg-white/5 rounded-lg">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></span>
            <span className="text-gray-600 dark:text-gray-300 text-xs">{service}</span>
          </div>
        ))}
      </div>
    </section>
  );
});

const LocationSection = memo(function LocationSection() {
  return (
    <section className="px-4 py-4">
      <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Find Us</h2>
      <div className="h-48 rounded-xl overflow-hidden" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <iframe src="https://www.google.com/maps?q=6.6885,-1.6244&hl=en&z=17&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location" />
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 text-center">Kumasi, Tafo 4 miles - Near Tafo Market</p>
      <Link href="https://maps.app.goo.gl/GFgDbDqxKxuW4Yya6" target="_blank" className="block w-full text-center py-3 bg-amber-600 text-black dark:text-white rounded-xl text-sm mt-3 touch-manipulation active:scale-95 transition-transform">📍 Open in Maps</Link>
    </section>
  );
});

const ContactSection = memo(function ContactSection() {
  return (
    <section className="px-4 py-4">
      <h2 className="text-lg font-semibold text-black dark:text-white mb-3 text-center">Contact Us</h2>
      <div className="space-y-3">
        <Link href={whatsappLink} target="_blank" className="flex items-center justify-center gap-2 py-3 bg-green-600 text-black dark:text-white rounded-xl font-medium touch-manipulation active:scale-95 transition-transform">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.182 1.24 8.475 3.687 2.397 2.502 3.823 5.857 3.823 9.213 0 6.627-5.403 11.891-11.893 11.891-3.172-.001-6.129-1.243-8.354-3.688l-6.164 1.667zm4.764-3.961c-.381-.127-.791-.191-1.219-.191-.964 0-1.877.388-2.543 1.115l-.332.457c-.546.786-.793 1.762-.793 2.756 0 2.117 1.726 3.837 3.854 3.837 1.125 0 2.182-.461 2.968-1.237.758-.752 1.165-1.743 1.165-2.814 0-1.054-.385-2.035-1.096-2.794l-.458-.332z"/></svg>
          WhatsApp
        </Link>
        <a href={`tel:${phoneNumber}`} className="flex items-center justify-center gap-2 py-3 bg-amber-600 text-black dark:text-white rounded-xl font-medium touch-manipulation active:scale-95 transition-transform">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          {phoneNumber}
        </a>
      </div>
    </section>
  );
});

const MobileContent = memo(function MobileContent() {
  return (
    <>
      <AboutSection />
      <HoursSection />
      <ServicesSection />
      <LocationSection />
      <ContactSection />
    </>
  );
});

export default function AboutPage() {
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
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image src="/images/logo.png.png" alt="I.T MAN APPLE CARE" fill className="object-contain" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 30px rgba(217,119,6,0.4)' }}>About Us</h1>
            </div>
            <p className="text-gray-200 bg-black/60 px-4 py-2 rounded-xl text-lg leading-relaxed mb-6">
              Welcome to <span className="text-amber-500 font-semibold">I.T MAN APPLE CARE</span> - your trusted Apple authorized support and service center.
              We specialize in buying, selling, and repairing all Apple products including iPhone, iPad, MacBook, Apple Watch, and iMac.
            </p>
            <p className="text-gray-200 bg-black/60 px-4 py-2 rounded-xl text-lg leading-relaxed mb-6">
              Our team of certified technicians provides professional repair services with genuine parts and warranty on all repairs.
              Whether you need a screen replacement, battery service, or software support, we have got you covered.
            </p>
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors touch-manipulation">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.182 1.24 8.475 3.687 2.397 2.502 3.823 5.857 3.823 9.213 0 6.627-5.403 11.891-11.893 11.891-3.172-.001-6.129-1.243-8.354-3.688l-6.164 1.667zm4.764-3.961c-.381-.127-.791-.191-1.219-.191-.964 0-1.877.388-2.543 1.115l-.332.457c-.546.786-.793 1.762-.793 2.756 0 2.117 1.726 3.837 3.854 3.837 1.125 0 2.182-.461 2.968-1.237.758-.752 1.165-1.743 1.165-2.814 0-1.054-.385-2.035-1.096-2.794l-.458-.332z"/></svg>
              Chat on WhatsApp
            </Link>
          </div>
          <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden">
            <Image src="/images/logo.png.png" alt="I.T MAN APPLE CARE" fill className="object-contain" style={{ filter: 'drop-shadow(0 0 40px rgba(217,119,6,0.6)) drop-shadow(0 0 80px rgba(217,119,0,3))' }} />
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}><span className="text-amber-500">Find</span> Us</h2>
          <div className="container mx-auto" style={{ maxWidth: '1000px', height: '420px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
            <iframe src="https://www.google.com/maps?q=6.6885,-1.6244&hl=en&z=17&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location" />
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-200 bg-black/60 px-4 py-2 rounded-xl mb-2 inline-block">Kumasi, Tafo 4 miles - Near Tafo Market</p>
            <Link href="https://maps.app.goo.gl/GFgDbDqxKxuW4Yya6" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-xl font-semibold transition-all bg-amber-600 hover:bg-amber-700 text-white">📍 Open in Google Maps</Link>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}><span className="text-amber-500">Opening</span> Hours</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {openingHours.map((day) => (
              <div key={day.day} className={`p-4 text-center rounded-xl ${day.open ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'}`}>
                <h3 className="text-lg font-semibold text-white mb-1">{day.day}</h3>
                <p className={day.open ? 'text-green-400' : 'text-red-400'}>{day.time}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}><span className="text-amber-500">Our</span> Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service} className="p-4 flex items-center gap-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-gray-200">{service}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8"><span className="text-amber-500 bg-black/60 px-3 py-1 rounded-xl">Contact</span> <span className="text-white bg-black/60 px-3 py-1 rounded-xl">Us</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 text-center bg-white/5 rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.182 1.24 8.475 3.687 2.397 2.502 3.823 5.857 3.823 9.213 0 6.627-5.403 11.891-11.893 11.891-3.172-.001-6.129-1.243-8.354-3.688l-6.164 1.667zm4.764-3.961c-.381-.127-.791-.191-1.219-.191-.964 0-1.877.388-2.543 1.115l-.332.457c-.546.786-.793 1.762-.793 2.756 0 2.117 1.726 3.837 3.854 3.837 1.125 0 2.182-.461 2.968-1.237.758-.752 1.165-1.743 1.165-2.814 0-1.054-.385-2.035-1.096-2.794l-.458-.332z"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">WhatsApp</h3>
              <Link href={whatsappLink} target="_blank" className="text-green-400 hover:text-green-300">{phoneNumber}</Link>
            </div>
            <div className="p-6 text-center bg-white/5 rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <a href="mailto:info@itmanapplecare.com" className="text-blue-400 hover:text-blue-300">info@itmanapplecare.com</a>
            </div>
            <div className="p-6 text-center bg-white/5 rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
              <a href={`tel:${phoneNumber}`} className="text-amber-400 hover:text-amber-300">{phoneNumber}</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}