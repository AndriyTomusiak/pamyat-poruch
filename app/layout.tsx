import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";

import { site } from "@/content/site";
import "./globals.css";

const sans = localFont({
  src: [
    { path: "../assets/fonts/Manrope-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/Manrope-Medium.ttf", weight: "500", style: "normal" },
    { path: "../assets/fonts/Manrope-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../assets/fonts/Manrope-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

const display = localFont({
  src: [
    {
      path: "../assets/fonts/cormorant-garamond-cyrillic-500-normal.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/cormorant-garamond-cyrillic-600-normal.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/cormorant-garamond-cyrillic-700-normal.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: site.seo.title,
  description: site.seo.description,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: site.siteUrl,
    siteName: site.brand,
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  await headers();

  return (
    <html lang="uk" className={`${sans.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full bg-background pb-24 text-foreground md:pb-0">
        <a className="skip-link" href="#content">
          Перейти до змісту
        </a>
        {children}
      </body>
    </html>
  );
}
