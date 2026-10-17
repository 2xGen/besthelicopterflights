import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ConsentAnalytics } from "@/components/ConsentAnalytics";
import { CookieConsent } from "@/components/CookieConsent";
import { SITE_OG_IMAGE } from "@/data/images";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const heading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const defaultTitle = "Best Helicopter Flights — Find Your Perfect Flight";
const defaultDescription =
  "Compare helicopter tours worldwide by flight time, price, doors-off or private experience — Hawaii, New York, Grand Canyon, Dubai and more. Book through trusted providers.";
const ogTitle = "Best Helicopter Flights — Find Your Perfect Helicopter Flight";

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
    "helicopter tours",
    "compare helicopter tours",
    "Hawaii helicopter tours",
    "New York helicopter tours",
    "Grand Canyon helicopter tours",
    "Dubai helicopter tours",
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
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full max-w-full flex-col bg-mist font-sans text-navy">
        {children}
        <CookieConsent />
        <ConsentAnalytics />
      </body>
    </html>
  );
}
