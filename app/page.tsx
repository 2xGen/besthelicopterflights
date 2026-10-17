import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroAtmosphere, HeroSiteMark } from "@/components/HeroChrome";
import { FlightFinder } from "@/components/flights/FlightFinder";
import {
  destinationResultsPath,
  getDestination,
  hawaiiIslands,
  searchableDestinations,
  type Destination,
  type DestinationSlug,
} from "@/data/destinations";
import { doorsLabel, flightResultsHref, flights, ratingWord, type Flight } from "@/data/flights";
import {
  BIG_ISLAND_FEATURED_IMAGE,
  KAUAI_FEATURED_IMAGE,
  MAUI_FEATURED_IMAGE,
  OAHU_FEATURED_IMAGE,
} from "@/data/images";
import { resolveFlightSearch } from "@/lib/flight-search";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Helicopter Tours Worldwide – Compare Flights & Prices",
  description:
    "Compare helicopter tours in Hawaii, New York, Las Vegas, Dubai and more. Find scenic, doors-off and private flights, compare prices and book with trusted providers.",
  path: "/",
  keywords: [
    "helicopter tours",
    "compare helicopter tours",
    "helicopter flights",
    "Hawaii helicopter tours",
    "New York helicopter tours",
    "Grand Canyon helicopter tours",
    "Dubai helicopter tours",
  ],
});

const islandImages: Record<string, string> = {
  kauai: KAUAI_FEATURED_IMAGE,
  oahu: OAHU_FEATURED_IMAGE,
  maui: MAUI_FEATURED_IMAGE,
  "big-island": BIG_ISLAND_FEATURED_IMAGE,
};

const operatorCount = new Set(flights.map((f) => f.operator)).size;

const worldwideIndexed = searchableDestinations.filter(
  (d) => d.group === "worldwide" && d.seo === "indexed",
);

type DestinationSnapshot = {
  dest: Destination;
  count: number;
  minPrice: number | null;
  top: Flight | undefined;
};

async function snapshotDestination(slug: DestinationSlug): Promise<DestinationSnapshot> {
  const dest = getDestination(slug)!;
  const result = await resolveFlightSearch({
    destination: slug,
    type: "sightseeing",
    sort: "recommended",
  });
  const prices = result.flights
    .map((f) => f.priceFrom)
    .filter((p): p is number => p != null);
  return {
    dest,
    count: result.flights.length,
    minPrice: prices.length ? Math.round(Math.min(...prices)) : null,
    top: result.flights[0],
  };
}

function hawaiiTopFlights(): Flight[] {
  return hawaiiIslands
    .map((d) =>
      flights
        .filter((f) => f.destination === d.slug)
        .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))[0],
    )
    .filter((f): f is Flight => Boolean(f));
}

function countFor(slug: string) {
  return flights.filter((f) => f.destination === slug).length;
}

function minPriceFor(slug: string) {
  const prices = flights
    .filter((f) => f.destination === slug && f.priceFrom != null)
    .map((f) => f.priceFrom as number);
  return prices.length ? Math.round(Math.min(...prices)) : null;
}

const trust = [
  {
    title: `${searchableDestinations.length} destinations`,
    body: "Hawaii, New York, Grand Canyon, Las Vegas, Dubai, Cape Town, Victoria Falls and more",
  },
  { title: `${operatorCount}+ operators`, body: "Routes, durations and formats side by side" },
  { title: "No booking fees from us", body: "Book directly with trusted providers" },
  { title: "Honest labels", body: "Flight time and total trip length shown separately when listed" },
];

function DestinationBrowseCard({
  href,
  label,
  region,
  highlights,
  count,
  minPrice,
  image,
  imageAlt,
}: {
  href: string;
  label: string;
  region: string;
  highlights: string;
  count: number | null;
  minPrice: number | null;
  image?: string | null;
  imageAlt: string;
}) {
  const showImage = image && !image.endsWith(".svg");
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-xl border border-navy/10 bg-white transition-shadow hover:shadow-[0_8px_30px_rgba(15,29,51,0.12)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-deep">
        {showImage ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col justify-end p-4 text-white"
            style={{
              background:
                "linear-gradient(145deg, #123f46 0%, #0b2a2f 55%, rgba(255,118,94,0.35) 100%)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sky">{region}</p>
            <p className="mt-1 font-display text-xl">{label}</p>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="font-display text-lg text-navy">{label}</p>
        <p className="mt-0.5 text-sm text-stone">{highlights}</p>
        {count != null && count > 0 ? (
          <p className="mt-3 text-sm text-navy">
            <span className="font-semibold">
              {count} flight{count === 1 ? "" : "s"}
            </span>
            {minPrice != null ? (
              <span className="text-stone"> · from ${minPrice}</span>
            ) : null}
          </p>
        ) : (
          <p className="mt-3 text-sm font-semibold text-teal">Compare flights →</p>
        )}
      </div>
    </Link>
  );
}

function TopPickCard({ flight, placeLabel }: { flight: Flight; placeLabel: string }) {
  return (
    <Link
      href={flightResultsHref(flight)}
      className="group flex flex-col overflow-hidden rounded-xl border border-navy/10 bg-white transition-shadow hover:shadow-[0_8px_30px_rgba(15,29,51,0.12)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={flight.image}
          alt={flight.title}
          fill
          unoptimized={flight.source === "viator"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-navy">
          {placeLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="line-clamp-2 font-display text-base leading-snug text-navy">
          {flight.shortName}
        </p>
        <p className="mt-1 text-sm text-stone">
          {flight.durationLabel} · {doorsLabel(flight.doors)}
        </p>
        {flight.rating != null ? (
          <p className="mt-3 flex items-center gap-2 text-sm">
            <span className="rounded-md rounded-bl-none bg-navy-deep px-1.5 py-0.5 text-xs font-bold text-white">
              {flight.rating.toFixed(1)}
            </span>
            <span className="font-medium text-navy">{ratingWord(flight.rating)}</span>
            {flight.reviewCount != null ? (
              <span className="text-stone">· {flight.reviewCount.toLocaleString("en-US")}</span>
            ) : null}
          </p>
        ) : null}
        <p className="mt-auto pt-4 text-right text-sm text-stone">
          From <span className="font-display text-xl text-navy">{flight.priceLabel}</span>
        </p>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const worldwideSnapshots = await Promise.all(
    worldwideIndexed.map((d) => snapshotDestination(d.slug)),
  );
  const hawaiiTops = hawaiiTopFlights();
  const worldwideTops = worldwideSnapshots
    .map((s) => s.top)
    .filter((f): f is Flight => Boolean(f));

  return (
    <>
      <Header />
      <main className="flex-1 min-w-0 w-full max-w-full pt-[4.25rem]">
        <section className="relative overflow-hidden bg-navy-deep px-5 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16">
          <HeroAtmosphere />
          <div className="relative mx-auto max-w-6xl">
            <HeroSiteMark />
            <h1 className="max-w-3xl text-3xl leading-[1.1] text-white md:text-5xl">
              Find your perfect helicopter flight.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/80 md:text-xl">
              Compare helicopter tours worldwide by destination, flight duration, route, price and
              experience — then book with trusted providers.
            </p>
            <div className="mt-8 md:mt-10">
              <FlightFinder />
            </div>
          </div>
        </section>

        <section className="border-b border-navy/8 bg-white px-5 py-6 md:px-8">
          <ul className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t) => (
              <li key={t.title} className="flex gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist-soft text-navy-deep">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                    <path
                      d="M4.5 10.5 8 14l7.5-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">{t.title}</p>
                  <p className="text-sm text-stone">{t.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl text-navy md:text-3xl">Compare helicopter tours worldwide</h2>
            <p className="mt-2 text-stone">
              Pick a destination to see every helicopter flight we compare.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {worldwideSnapshots.map(({ dest, count, minPrice, top }) => (
                <DestinationBrowseCard
                  key={dest.slug}
                  href={destinationResultsPath(dest.slug)}
                  label={dest.shortLabel}
                  region={dest.region}
                  highlights={dest.highlights}
                  count={count}
                  minPrice={minPrice}
                  image={top?.image}
                  imageAlt={`${dest.name} helicopter tour`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl text-navy md:text-3xl">Explore Hawaii from above</h2>
            <p className="mt-2 text-stone">
              Pick an island to see every helicopter flight we compare.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {hawaiiIslands.map((island) => {
                const minPrice = minPriceFor(island.slug);
                return (
                  <DestinationBrowseCard
                    key={island.slug}
                    href={destinationResultsPath(island.slug)}
                    label={island.shortLabel}
                    region={island.region}
                    highlights={island.highlights}
                    count={countFor(island.slug)}
                    minPrice={minPrice}
                    image={islandImages[island.slug]}
                    imageAlt={`${island.name} from a helicopter`}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl text-navy md:text-3xl">
              Popular helicopter flights by destination
            </h2>
            <p className="mt-2 max-w-2xl text-stone">
              Explore highly reviewed flights across our destinations.
            </p>

            {worldwideTops.length > 0 ? (
              <>
                <h3 className="mt-8 font-display text-lg text-navy md:text-xl">Worldwide</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {worldwideSnapshots.map(
                    (s) =>
                      s.top && (
                        <TopPickCard
                          key={s.top.id}
                          flight={s.top}
                          placeLabel={s.dest.shortLabel}
                        />
                      ),
                  )}
                </div>
              </>
            ) : null}

            <h3 className="mt-10 font-display text-lg text-navy md:text-xl">Hawaii</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {hawaiiTops.map((f) => (
                <TopPickCard
                  key={f.id}
                  flight={f}
                  placeLabel={
                    hawaiiIslands.find((d) => d.slug === f.destination)?.shortLabel ?? "Hawaii"
                  }
                />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl text-navy md:text-3xl">How it works</h2>
            <ol className="mt-7 grid gap-4 md:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Pick a destination",
                  body: "Filter by flight duration, doors-off, private or shared — results look like a booking site, not a blog.",
                },
                {
                  step: "2",
                  title: "Compare side by side",
                  body: "Tick up to three flights and line them up on duration, doors format, operator, price and reviews.",
                },
                {
                  step: "3",
                  title: "Book with the provider",
                  body: "Check live availability and book with Viator or the operator. We never charge booking fees.",
                },
              ].map((item) => (
                <li
                  key={item.step}
                  className="rounded-xl border border-navy/10 bg-white p-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sun font-display text-base text-navy">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-lg text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-5 pb-16 md:px-8">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 rounded-2xl bg-navy-deep p-6 md:flex-row md:items-center md:p-10">
            <div>
              <h2 className="text-2xl text-white md:text-3xl">Not sure between two flights?</h2>
              <p className="mt-2 max-w-xl text-white/75">
                A short scenic flight vs a longer route needs more than a top-10 list. Compare them
                side by side before you book.
              </p>
            </div>
            <Link
              href="/search#results"
              className="shrink-0 rounded-lg bg-sun px-6 py-3.5 text-base font-bold text-navy transition-opacity hover:opacity-90"
            >
              Start comparing
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
