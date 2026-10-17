import type { MetadataRoute } from "next";
import { categoryPath, destinationCategories } from "@/data/destination-categories";
import { indexedDestinations } from "@/data/destinations";
import { SITE_URL } from "@/lib/seo";

const islandGuides: Record<string, string[]> = {
  kauai: [
    "doors-off-helicopter-tours",
    "private-helicopter-tours",
    "waterfall-helicopter-tours",
    "photography-helicopter-tours",
    "helicopter-tour-prices",
    "helicopter-tour-operators",
  ],
  oahu: [
    "doors-off-helicopter-tours",
    "private-helicopter-tours",
    "volcano-helicopter-tours",
    "photography-helicopter-tours",
    "helicopter-tour-prices",
    "helicopter-tour-operators",
  ],
  maui: [
    "doors-off-helicopter-tours",
    "private-helicopter-tours",
    "molokai",
    "photography-helicopter-tours",
    "helicopter-tour-prices",
    "helicopter-tour-operators",
  ],
  "big-island": [
    "doors-off-helicopter-tours",
    "kilauea-volcano",
    "photography-helicopter-tours",
    "helicopter-tour-prices",
    "helicopter-tour-operators",
  ],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const islands = Object.entries(islandGuides).flatMap(([island, guides]) => [
    {
      url: `${SITE_URL}/${island}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...guides.map((guide) => ({
      url: `${SITE_URL}/${island}/${guide}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);

  const worldwide = indexedDestinations
    .filter((d) => d.group === "worldwide")
    .map((d) => ({
      url: `${SITE_URL}/${d.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const worldwideCategories = destinationCategories.filter((c) => c.indexable !== false).map((c) => ({
    url: `${SITE_URL}${categoryPath(c)}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    ...islands,
    ...worldwide,
    ...worldwideCategories,
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.1 },
  ];
}
