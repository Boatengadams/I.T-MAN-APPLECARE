"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const phoneNumber = "233549665779";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hi%20I.T%20MAN%20APPLE%20CARE,%20I%20need%20help%20with%20my%20Apple%20device`;
  const locationLink = "https://maps.app.goo.gl/hyzo2Bp2brdcyg7o7";

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/10 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src="/images/logo.png.png"
                alt="I.T MAN APPLE CARE"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <span className="text-sm font-semibold text-amber-600">
              I.T MAN APPLE CARE
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link 
              href={locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Tafo 4 miles
            </Link>
            <p className="text-gray-400 text-sm">
              Contact: +233 54 966 5779
            </p>
            <p className="text-gray-400 text-sm">
              Email: info@itmanapplecare.com
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="text-sm font-medium">WhatsApp</span>
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} I.T MAN APPLE CARE. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Created by <a href="mailto:bagsgraphicsgh@gmail.com" className="text-amber-600 hover:text-amber-500">BAGSGRAPHICS</a>
          </p>
        </div>
      </div>
    </footer>
  );
}