import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SITE_OG_IMAGE } from "@/data/images";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const defaultTitle =
  "Best Helicopter Flights — Hawaii Helicopter Tours Researched & Ranked";
const defaultDescription =
  "Independent research and comparisons of helicopter tours in Hawaii. We compare traveler reviews, routes, pricing, operator information and booking terms so you can choose the right flight.";
const ogTitle =
  "The Best Helicopter Tours in Hawaii: Researched, Compared & Ranked";

const ogImage = {
  url: SITE_OG_IMAGE,
  width: 1200,
  height: 630,
  alt: "Best Helicopter Flights — helicopter tour research and comparisons",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
  applicationName: SITE_NAME,
  keywords: [
    "best helicopter tours Hawaii",
    "Hawaii helicopter comparison",
    "Kauai helicopter tours",
    "Maui helicopter flights",
    "Oahu helicopter tours",
    "Big Island helicopter",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: ogTitle,
    description: defaultDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: defaultDescription,
    images: [SITE_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-navy bg-mist">
        {children}
      </body>
    </html>
  );
}
