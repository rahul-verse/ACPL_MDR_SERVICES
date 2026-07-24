import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { ToastProvider } from "@/components/ui/toast";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.company}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.company }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/hero-security-operations.svg",
        width: 1600,
        height: 900,
        alt: "ACPL MDR security operations command visual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/hero-security-operations.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}>
        <ThemeProvider defaultTheme="dark">
          <ToastProvider>
            <a
              href="#main-content"
              className="sr-only z-[100] rounded-md bg-indigo-500 px-4 py-2 text-sm font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
            >
              Skip to content
            </a>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
