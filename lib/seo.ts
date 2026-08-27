import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/data/images";

export const SITE_URL = "https://besthelicopterflights.com";
export const SITE_NAME = "Best Helicopter Flights";

const ogImage = {
  url: SITE_OG_IMAGE,
  width: 1200,
  height: 630,
  alt: "Best Helicopter Flights — helicopter tour research and comparisons",
};

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

/** Builds page metadata with matching Open Graph + Twitter SEO fields and the sitewide OG image. */
export function createPageMetadata({
  title,
  description,
  path,
  keywords,
}: PageSeoInput): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SITE_OG_IMAGE],
    },
  };
}
