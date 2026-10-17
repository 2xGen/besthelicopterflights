import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WorldDestinationLanding } from "@/components/flights/WorldDestinationLanding";
import { destinationGuides } from "@/data/destination-guides";
import { resolveFlightSearch } from "@/lib/flight-search";
import { sightseeingMetaDescription } from "@/lib/inventory-stats";
import { createPageMetadata } from "@/lib/seo";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const guide = destinationGuides["cape-town"];

export async function generateMetadata(): Promise<Metadata> {
  const search = await resolveFlightSearch({
    destination: "cape-town",
    type: "sightseeing",
  });
  const description = sightseeingMetaDescription({
    placeName: "Cape Town",
    productLabel: "helicopter tours",
    flights: search.flights,
    trailing:
      "Explore Table Mountain, Atlantic Coast, Two Oceans and Cape Point flights, durations and prices.",
    fallback: guide.metaDescription,
  });
  return createPageMetadata({
    title: guide.metaTitle,
    description,
    path: "/cape-town",
    keywords: guide.keywords,
  });
}

export default async function CapeTownPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  return (
    <>
      <Header />
      <main className="flex-1 min-w-0 w-full max-w-full pt-[4.25rem]">
        <WorldDestinationLanding guide={guide} searchParams={sp} />
      </main>
      <Footer />
    </>
  );
}
