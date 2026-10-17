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

const guide = destinationGuides["dubai"];

export async function generateMetadata(): Promise<Metadata> {
  const search = await resolveFlightSearch({
    destination: "dubai",
    type: "sightseeing",
  });
  const description = sightseeingMetaDescription({
    placeName: "Dubai",
    productLabel: "helicopter tours",
    flights: search.flights,
    trailing:
      "Explore 12–25 minute flights, Palm Jumeirah, Burj Al Arab, prices and private options.",
    fallback: guide.metaDescription,
  });
  return createPageMetadata({
    title: guide.metaTitle,
    description,
    path: "/dubai",
    keywords: guide.keywords,
  });
}

export default async function DubaiPage({ searchParams }: PageProps) {
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
