import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { DestinationCategoryPage } from "@/components/flights/DestinationCategoryPage";
import {
  categoriesFor,
  categoryFlights,
  categoryPath,
  getDestinationCategory,
  isCategoryIndexable,
} from "@/data/destination-categories";
import type { DestinationSlug } from "@/data/destinations";
import { isSightseeing } from "@/data/flights";
import { resolveDetailedSightseeing } from "@/lib/flight-details";
import { resolveFlightSearch } from "@/lib/flight-search";
import { createPageMetadata } from "@/lib/seo";

export function categoryStaticParams(destination: DestinationSlug) {
  return categoriesFor(destination).map((c) => ({ category: c.slug }));
}

export async function categoryMetadata(destination: DestinationSlug, slug: string): Promise<Metadata> {
  const category = getDestinationCategory(destination, slug);
  if (!category) return {};
  const flights = categoryFlights(category, await resolveDetailedSightseeing(destination));
  return {
    ...createPageMetadata({
      title: category.metaTitle,
      description: category.metaDescription,
      path: categoryPath(category),
      keywords: category.keywords,
    }),
    ...(isCategoryIndexable(category, flights.length)
      ? {}
      : { robots: { index: false, follow: true } }),
  };
}

export async function CategoryRoutePage({
  destination,
  slug,
}: {
  destination: DestinationSlug;
  slug: string;
}) {
  const category = getDestinationCategory(destination, slug);
  if (!category) notFound();
  if (destination === "cape-town" && slug === "private-helicopter-tours") {
    redirect("/cape-town");
  }
  const inventory = await resolveDetailedSightseeing(destination);
  const packages = category.packages
    ? (await resolveFlightSearch({ destination, type: "all" })).flights.filter(
        (f) => !isSightseeing(f) && category.packages!.match(f),
      )
    : [];

  return (
    <>
      <Header />
      <main className="flex-1 min-w-0 w-full max-w-full pt-[4.25rem]">
        <DestinationCategoryPage
          category={category}
          inventory={inventory}
          flights={categoryFlights(category, inventory)}
          packages={packages}
        />
      </main>
      <Footer />
    </>
  );
}
