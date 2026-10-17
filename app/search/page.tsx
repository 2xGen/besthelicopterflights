import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroAtmosphere, HeroSiteMark } from "@/components/HeroChrome";
import { DestinationFlightResults } from "@/components/flights/DestinationFlightResults";
import { FlightFinder } from "@/components/flights/FlightFinder";
import {
  destinationResultsPath,
  getSearchableDestination,
  searchableDestinations,
} from "@/data/destinations";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const dest = getSearchableDestination(first((await searchParams).destination));
  return {
    title: dest
      ? `Helicopter flights in ${dest.name} — compare & book`
      : "Search helicopter flights",
    description: dest
      ? `Compare helicopter flights in ${dest.name} by route, flight time, price and experience, then book with the provider.`
      : "Search and compare helicopter flights by destination, flight time, price and experience.",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const dest = getSearchableDestination(first(sp.destination));

  if (dest?.seo === "indexed") {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(sp)) {
      const v = first(value);
      if (key !== "destination" && v) query.set(key, v);
    }
    redirect(destinationResultsPath(dest.slug, query));
  }

  return (
    <>
      <Header />
      <main className="flex-1 min-w-0 w-full max-w-full pt-[4.25rem]">
        {dest ? (
          <DestinationFlightResults
            destination={dest.slug}
            destinationName={dest.name}
            searchParams={sp}
          />
        ) : (
          <section className="relative overflow-hidden bg-navy-deep px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-10">
            <HeroAtmosphere />
            <div className="relative mx-auto max-w-6xl">
              <HeroSiteMark className="mb-3" />
              <h1 className="text-2xl text-white md:text-4xl">
                Where do you want to fly?
              </h1>
              <p className="mt-2 text-sm text-white/75 md:text-base">
                Pick a destination to compare helicopter flights side by side.
              </p>
              <div className="mt-6">
                <FlightFinder />
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {searchableDestinations.map((d) => (
                  <Link
                    key={d.slug}
                    href={`${destinationResultsPath(d.slug)}#results`}
                    className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:border-white hover:bg-white/10"
                  >
                    {d.shortLabel}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
