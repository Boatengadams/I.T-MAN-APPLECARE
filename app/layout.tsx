import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const inter = Inter({ 
  subsets: ["latin"], 
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itmanapplecare.com"),
  title: {
    default: "I.T MAN APPLE CARE | Apple Device Repair & Sales",
    template: "%s | I.T MAN APPLE CARE",
  },
  description: "Premier Apple device repair service. Buy, sell, and fix all Apple devices including iPhone, iPad, and MacBook. Screen replacement, battery, and parts available.",
  keywords: ["Apple repair", "iPhone fix", "MacBook repair", "iPad service", "Apple parts", "screen replacement", "battery replacement"],
  authors: [{ name: "I.T MAN APPLE CARE" }],
  creator: "I.T MAN APPLE CARE",
  publisher: "I.T MAN APPLE CARE",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://itmanapplecare.com",
    siteName: "I.T MAN APPLE CARE",
    title: "I.T MAN APPLE CARE | Apple Device Repair & Sales",
    description: "Premier Apple device repair service. Buy, sell, and fix all Apple devices.",
    images: [
      {
        url: "/images/logo.png.png",
        width: 1200,
        height: 630,
        alt: "I.T MAN APPLE CARE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "I.T MAN APPLE CARE",
    description: "Premier Apple device repair service",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png.png",
    apple: "/images/logo.png.png",
    sizes: "512x512",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/images/logo.png.png" type="image/png" sizes="512x512" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} bg-main text-white antialiased min-h-screen`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}