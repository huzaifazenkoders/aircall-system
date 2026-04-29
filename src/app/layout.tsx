import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/components/providers/query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Aircall System - Where Lead Routing Meets Smart Calling",
  description:
    "Centralize outbound calling, manage priority lists, and optimize lead distribution all in one streamlined platform built for high-performance sales teams.",
  icons: {
    icon: [
      // { url: "/favs/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favs/favicon.svg", type: "image/svg+xml" },
      { url: "/favs/favicon.ico" }
    ]
    // apple: [{ url: "/favs/apple-touch-icon.png", sizes: "180x180" }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NuqsAdapter>
          <QueryProvider>{children}</QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
