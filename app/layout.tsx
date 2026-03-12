import React from "react";
import type { Metadata } from "next";
import { Outfit, Oswald, Poppins, Quicksand, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import FooterWrapper from "@/components/layout/FooterWrapper";
import CustomCursor from "@/components/ui/CustomCursor";
import OnboardingGuard from "@/components/auth/OnboardingGuard";
import { Toaster } from "sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FemFlare",
  description: "A Website for KLFemFlare 2026",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${quicksand.variable} ${oswald.variable} ${poppins.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <SmoothScroll>
          <CustomCursor />
          <React.Suspense fallback={<div className="h-16 w-full bg-white/10" />}>
             <Navbar />
          </React.Suspense>
          <React.Suspense fallback={null}>
             <OnboardingGuard />
          </React.Suspense>
          {children}
          <React.Suspense fallback={null}>
            <FooterWrapper />
          </React.Suspense>
          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              className: "font-sans !bg-white !border-gray-200 !shadow-xl !rounded-2xl !p-4",
              style: {
                background: 'white',
                color: '#1a1a1a',
                border: '1px solid #E5E7EB',
              },
            }}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}
