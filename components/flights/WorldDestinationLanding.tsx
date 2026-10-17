import Image from "next/image";
import Link from "next/link";
import { HeroAtmosphere, HeroSiteMark } from "@/components/HeroChrome";
import { BookingButton } from "@/components/flights/BookingButton";
import { DestinationCategoryNav } from "@/components/flights/DestinationCategoryNav";
import { DestinationFlightResults } from "@/components/flights/DestinationFlightResults";
import { FlightFinder } from "@/components/flights/FlightFinder";
import { HubCategoryPills } from "@/components/flights/HubCategoryPills";
import { CapeTownHubGuide } from "@/components/cape-town/CapeTownHubGuide";
import { DubaiHubGuide } from "@/components/dubai/DubaiHubGuide";
import { GrandCanyonHubGuide } from "@/components/grand-canyon/GrandCanyonHubGuide";
import { LasVegasHubGuide } from "@/components/las-vegas/LasVegasHubGuide";
import { NewYorkHubGuide } from "@/components/new-york/NewYorkHubGuide";
import { VictoriaFallsHubGuide } from "@/components/victoria-falls/VictoriaFallsHubGuide";
import type { DestinationGuide } from "@/data/destination-guides";
import {
  LAS_VEGAS_DEPARTURE,
  SOUTH_RIM_DEPARTURE,
} from "@/data/destination-categories";
import { destinationResultsPath, getDestination } from "@/data/destinations";
import {
  cabinLabel,
  flightResultsHref,
  ratingWord,
  weightedRating,
  type Flight,
} from "@/data/flights";
import { resolveDetailedSightseeing } from "@/lib/flight-details";
import {
  formatInventoryComparisonLine,
  inventoryComparisonStats,
} from "@/lib/inventory-stats";
import { isVerifiedGrandCanyonLanding } from "@/lib/grand-canyon-landings";
import { isLasVegasLandingTour, isStripFlight } from "@/lib/las-vegas-routes";
import { capeTownRoute } from "@/data/destination-categories";
import { destinationSupportsDoorsOffFilter } from "@/lib/infer-doors";
import { resolveFlightSearch } from "@/lib/flight-search";
import { VIATOR_LINK_REL, viatorGoPath } from "@/lib/viator";

type Props = {
  guide: DestinationGuide;
  searchParams: Record<string, string | string[] | undefined>;
};

type Pick = { label: string; flight: Flight };

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

/** Expects sightseeing flights only, so packages and transfers never win "longest" or "lowest price". */
function buildPicks(flights: Flight[], guide: DestinationGuide): Pick[] {
  const byReviewWeighted = (list: Flight[]) =>
    list
      .filter((f) => weightedRating(f) != null && (f.rating ?? 0) >= 4)
      .sort(
        (a, b) =>
          (weightedRating(b) ?? 0) - (weightedRating(a) ?? 0) ||
          (b.reviewCount ?? 0) - (a.reviewCount ?? 0),
      )[0];

  if (guide.slug === "las-vegas") {
    const strip = flights.filter(isStripFlight);
    const landings = flights.filter(isLasVegasLandingTour);
    const nightStrip = strip.filter((f) => f.kind === "night");
    const candidates: Array<[string, Flight | undefined]> = [
      [
        "Most reviewed (Strip)",
        [...strip].sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))[0],
      ],
      ["Highly rated landing experience", byReviewWeighted(landings)],
      [
        "Lowest Strip night price",
        nightStrip
          .filter((f) => f.priceFrom != null)
          .sort((a, b) => (a.priceFrom ?? 0) - (b.priceFrom ?? 0))[0],
      ],
      [
        "Longest stated flight time",
        flights
          .filter((f) => f.durationMinutes != null)
          .sort((a, b) => (b.durationMinutes ?? 0) - (a.durationMinutes ?? 0))[0],
      ],
    ];
    const seen = new Set<string>();
    return candidates.flatMap(([label, flight]) => {
      if (!flight || seen.has(flight.id)) return [];
      seen.add(flight.id);
      return [{ label, flight }];
    });
  }

  if (guide.slug === "cape-town") {
    const under20 = flights.filter((f) => f.durationMinutes != null && f.durationMinutes < 20);
    const twoOceans = flights.filter((f) => capeTownRoute(f) === "two-oceans");
    const capePoint = flights.filter((f) => capeTownRoute(f) === "cape-point");
    const candidates: Array<[string, Flight | undefined]> = [
      [
        "Lowest price (under 20 min)",
        under20
          .filter((f) => f.priceFrom != null)
          .sort((a, b) => (a.priceFrom ?? 0) - (b.priceFrom ?? 0))[0],
      ],
      ["Top rated (Two Oceans)", byReviewWeighted(twoOceans)],
      [
        "Lowest Cape Point price",
        capePoint
          .filter((f) => f.priceFrom != null)
          .sort((a, b) => (a.priceFrom ?? 0) - (b.priceFrom ?? 0))[0],
      ],
      [
        "Longest stated flight time",
        flights
          .filter((f) => f.durationMinutes != null)
          .sort((a, b) => (b.durationMinutes ?? 0) - (a.durationMinutes ?? 0))[0],
      ],
    ];
    const seen = new Set<string>();
    return candidates.flatMap(([label, flight]) => {
      if (!flight || seen.has(flight.id)) return [];
      seen.add(flight.id);
      return [{ label, flight }];
    });
  }

  if (guide.slug === "dubai") {
    const shortBand = flights.filter(
      (f) => f.durationMinutes != null && f.durationMinutes >= 12 && f.durationMinutes <= 15,
    );
    const extendedBand = flights.filter(
      (f) => f.durationMinutes != null && f.durationMinutes >= 21 && f.durationMinutes <= 30,
    );
    const candidates: Array<[string, Flight | undefined]> = [
      [
        "Lowest price (12–15 min)",
        shortBand
          .filter((f) => f.priceFrom != null)
          .sort((a, b) => (a.priceFrom ?? 0) - (b.priceFrom ?? 0))[0],
      ],
      ["Top rated (21–30 min)", byReviewWeighted(extendedBand)],
      ["Most reviewed", [...flights].sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))[0]],
      [
        "Longest stated flight time",
        flights
          .filter((f) => f.durationMinutes != null)
          .sort((a, b) => (b.durationMinutes ?? 0) - (a.durationMinutes ?? 0))[0],
      ],
    ];
    const seen = new Set<string>();
    return candidates.flatMap(([label, flight]) => {
      if (!flight || seen.has(flight.id)) return [];
      seen.add(flight.id);
      return [{ label, flight }];
    });
  }

  if (guide.slug === "grand-canyon") {
    const south = flights.filter((f) => f.departure === SOUTH_RIM_DEPARTURE);
    const vegasScenic = flights.filter(
      (f) => f.departure === LAS_VEGAS_DEPARTURE && !isVerifiedGrandCanyonLanding(f),
    );
    const landings = flights.filter(isVerifiedGrandCanyonLanding);
    const candidates: Array<[string, Flight | undefined]> = [
      ["Top rated (South Rim)", byReviewWeighted(south)],
      ["Top rated (from Las Vegas)", byReviewWeighted(vegasScenic)],
      ["Verified landing tour", byReviewWeighted(landings)],
      [
        "Lowest price (known flight time)",
        flights
          .filter((f) => f.priceFrom != null && f.durationMinutes != null)
          .sort((a, b) => (a.priceFrom ?? 0) - (b.priceFrom ?? 0))[0],
      ],
      [
        "Longest stated flight",
        flights
          .filter((f) => f.durationMinutes != null)
          .sort((a, b) => (b.durationMinutes ?? 0) - (a.durationMinutes ?? 0))[0],
      ],
    ];
    const seen = new Set<string>();
    return candidates.flatMap(([label, flight]) => {
      if (!flight || seen.has(flight.id)) return [];
      seen.add(flight.id);
      return [{ label, flight }];
    });
  }

  const candidates: Array<[string, Flight | undefined]> = [
    ["Top rated (review-weighted)", byReviewWeighted(flights)],
    ["Most reviewed", [...flights].sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))[0]],
    [
      "Lowest price",
      flights
        .filter((f) => f.priceFrom != null && f.durationMinutes != null)
        .sort((a, b) => (a.priceFrom ?? 0) - (b.priceFrom ?? 0))[0],
    ],
    [
      "Longest flight",
      flights
        .filter((f) => f.durationMinutes != null)
        .sort((a, b) => (b.durationMinutes ?? 0) - (a.durationMinutes ?? 0))[0],
    ],
    ["Private flight", byReviewWeighted(flights.filter((f) => f.cabin === "private"))],
  ];
  const seen = new Set<string>();
  return candidates.flatMap(([label, flight]) => {
    if (!flight || seen.has(flight.id)) return [];
    seen.add(flight.id);
    return [{ label, flight }];
  });
}

function ChooseList({ guide }: { guide: DestinationGuide }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {guide.choose.map((row) => (
        <li key={row.want} className="rounded-lg border border-navy/10 bg-white px-4 py-4">
          <p className="text-sm font-semibold text-navy">
            If you want {row.want.charAt(0).toLowerCase() + row.want.slice(1)}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-stone">{row.lookFor}</p>
          {row.filter ? (
            <Link
              href={`${destinationResultsPath(
                guide.slug,
                Object.fromEntries(Object.entries(row.filter).map(([k, v]) => [k, String(v)])),
              )}#results`}
              className="mt-2 inline-block text-sm font-semibold text-teal hover:underline"
            >
              Show matching flights →
            </Link>
          ) : row.href ? (
            <Link href={row.href} className="mt-2 inline-block text-sm font-semibold text-teal hover:underline">
              {row.href.includes("prices") ? "Compare prices →" : "Learn more →"}
            </Link>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export async function WorldDestinationLanding({ guide, searchParams }: Props) {
  const destination = getDestination(guide.slug)!;
  const introFirst = guide.hubLayout === "intro-first";
  const search = await resolveFlightSearch({ destination: guide.slug, type: "sightseeing" });
  const flights = introFirst
    ? await resolveDetailedSightseeing(guide.slug)
    : search.flights;
  const inventory = { ...search, flights };
  const picks = buildPicks(flights, guide);
  const hideDoorsOffOption =
    !destinationSupportsDoorsOffFilter(guide.slug) ||
    !flights.some((f) => f.doors === "doors-off" || f.doors === "doors-optional");
  const tableFlights = flights.slice(0, 10);
  const heroFlight = flights.find((f) => f.image && !f.image.endsWith(".svg"));
  // Flight count matches DestinationFlightResults (#results); operator names come from Viator product details when live.
  const { flightCount } = inventoryComparisonStats(search.flights);
  const operatorCount =
    search.live && introFirst
      ? inventoryComparisonStats(flights).operatorCount
      : inventoryComparisonStats(search.flights).operatorCount;
  const inventoryLine = formatInventoryComparisonLine({ flightCount, operatorCount });
  const duration = first(searchParams.duration) ?? "any";
  const experience = first(searchParams.experience) ?? "all";
  const pageH1 = guide.hubH1 ?? guide.heading;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  if (introFirst) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <DestinationCategoryNav
          destination={guide.slug}
          destinationName={destination.name}
          currentPath={`/${guide.slug}`}
        />

        <section className="relative overflow-hidden bg-navy-deep px-5 pb-10 pt-6 text-white md:px-8 md:pb-12 md:pt-8">
          <HeroAtmosphere />
          <div className="relative mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
            <div>
              <HeroSiteMark className="mb-2" />
              <nav aria-label="Breadcrumb" className="text-sm text-sky">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2 text-white/40">/</span>
                <span className="text-white/90">{destination.region}</span>
                <span className="mx-2 text-white/40">/</span>
                <span className="text-white">{destination.name}</span>
              </nav>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-sky">
                {guide.eyebrow}
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-3xl leading-tight md:text-4xl md:leading-[1.12]">
                {pageH1}
              </h1>
              {guide.intro.map((p, i) => (
                <p
                  key={i}
                  className={`max-w-2xl text-base leading-relaxed ${
                    i === 0 ? "mt-5 text-white/85 md:text-lg" : "mt-3 text-white/70"
                  }`}
                >
                  {p}
                </p>
              ))}
              {inventoryLine ? (
                <p className="mt-4 max-w-2xl text-sm text-white/60">{inventoryLine}</p>
              ) : null}
              <div className="mt-6">
                <FlightFinder
                  initialDestination={guide.slug}
                  initialDuration={duration}
                  initialExperience={experience}
                  hideDestination
                  hideDoorsOffOption={hideDoorsOffOption}
                  durationVariant={
                    guide.slug === "dubai"
                      ? "dubai"
                      : guide.slug === "cape-town"
                        ? "cape-town"
                        : "default"
                  }
                  experienceVariant={
                    guide.slug === "grand-canyon"
                      ? "grand-canyon"
                      : guide.slug === "las-vegas"
                        ? "las-vegas"
                        : guide.slug === "cape-town"
                          ? "cape-town"
                          : "default"
                  }
                />
              </div>
            </div>
            {heroFlight ? (
              <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/15 bg-navy shadow-[0_28px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                  <Image
                    src={heroFlight.image}
                    alt={guide.imageAlt}
                    fill
                    unoptimized={heroFlight.source === "viator"}
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 420px"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="border-b border-navy/8 bg-mist-soft px-5 py-10 md:px-8 md:py-12">
          <div className="mx-auto max-w-6xl">
            <p className="max-w-3xl text-base leading-relaxed text-stone">{guide.whyFromAir}</p>
            {picks.length > 0 ? (
              <>
                <h2 className="mt-8 font-display text-xl text-navy md:text-2xl">Quick picks</h2>
                <p className="mt-2 max-w-3xl text-xs leading-relaxed text-stone-light">
                  {guide.slug === "las-vegas"
                    ? "Picks are labeled by intent: most-reviewed Strip flights use raw review count; landing picks use review-weighted stars (rating × volume); duration labels only apply when the listing states flight time."
                    : guide.slug === "dubai"
                      ? "Dubai picks use 12–15 and 21–30 minute bands when flight time is stated, review-weighted ratings for extended routes, and current from-prices."
                      : guide.slug === "cape-town"
                        ? "Cape Town picks use under-20-minute pricing, review-weighted Two Oceans ratings, Cape Point from-prices and longest stated flight times."
                        : "Rankings use review-weighted ratings (review volume matters, not stars alone), known flight times for duration labels, and current from-prices — grouped by itinerary type where it helps."}
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {picks.map((pick) => (
                    <li key={pick.label}>
                      <Link
                        href={flightResultsHref(pick.flight)}
                        className="block h-full rounded-lg border border-navy/10 bg-white px-4 py-4 transition-colors hover:border-teal"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-teal">
                          {pick.label}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-navy">
                          {pick.flight.title}
                        </p>
                        <p className="mt-1.5 text-xs text-stone">
                          {pick.flight.durationLabel}
                          {pick.flight.experienceLabel
                            ? ` · ${pick.flight.experienceLabel} total`
                            : ""}{" "}
                          · {pick.flight.priceLabel}
                          {pick.flight.rating != null ? ` · ${pick.flight.rating.toFixed(1)} ★` : ""}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {guide.slug === "victoria-falls" ||
            guide.slug === "new-york" ||
            guide.slug === "grand-canyon" ||
            guide.slug === "las-vegas" ||
            guide.slug === "dubai" ||
            guide.slug === "cape-town" ? (
              <>
                <h2 className="mt-8 font-display text-xl text-navy md:text-2xl">Compare by topic</h2>
                <HubCategoryPills destination={guide.slug} />
              </>
            ) : null}
            <h2 className="mt-8 font-display text-xl text-navy md:text-2xl">Narrow your search</h2>
            <ChooseList guide={guide} />
          </div>
        </section>

        <DestinationFlightResults
          destination={guide.slug}
          destinationName={destination.name}
          searchParams={searchParams}
          includeHero={false}
        />

        {guide.slug === "victoria-falls" ? (
          <section className="bg-white px-5 py-12 md:px-8 md:py-16">
            <VictoriaFallsHubGuide
              guide={guide}
              flights={flights}
              destinationLabel={destination.shortLabel}
            />
          </section>
        ) : null}
        {guide.slug === "new-york" ? (
          <section className="bg-white px-5 py-12 md:px-8 md:py-16">
            <NewYorkHubGuide flights={flights} />
          </section>
        ) : null}
        {guide.slug === "grand-canyon" ? (
          <section className="bg-white px-5 py-12 md:px-8 md:py-16">
            <GrandCanyonHubGuide flights={flights} />
          </section>
        ) : null}
        {guide.slug === "las-vegas" ? (
          <section className="bg-white px-5 py-12 md:px-8 md:py-16">
            <LasVegasHubGuide flights={flights} />
          </section>
        ) : null}
        {guide.slug === "dubai" ? (
          <section className="bg-white px-5 py-12 md:px-8 md:py-16">
            <DubaiHubGuide flights={flights} />
          </section>
        ) : null}
        {guide.slug === "cape-town" ? (
          <section className="bg-white px-5 py-12 md:px-8 md:py-16">
            <CapeTownHubGuide flights={flights} />
          </section>
        ) : null}

        <section className="bg-mist px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              {destination.shortLabel} helicopter tours: frequently asked questions
            </h2>
            <div className="mt-6 divide-y divide-navy/10 border-y border-navy/10">
              {guide.faqs.map((faq) => (
                <details key={faq.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
                    {faq.q}
                    <span className="text-teal transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <DestinationCategoryNav
        destination={guide.slug}
        destinationName={destination.name}
        currentPath={`/${guide.slug}`}
      />

      <DestinationFlightResults
        destination={guide.slug}
        destinationName={destination.name}
        searchParams={searchParams}
        headline={pageH1 !== guide.heading ? pageH1 : undefined}
      />

      <section
        id="research-guide"
        className="relative overflow-hidden bg-navy-deep px-5 pb-12 pt-10 text-white md:px-8 md:pb-20 md:pt-16"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(42,111,122,0.45), transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sky">
              {guide.eyebrow}
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight md:mt-4 md:text-5xl md:leading-[1.12]">
              {guide.heading}
            </h2>
            {guide.intro.map((p, i) => (
              <p
                key={i}
                className={`max-w-2xl text-base leading-relaxed ${
                  i === 0 ? "mt-5 text-white/80 md:mt-6 md:text-lg" : "mt-4 text-white/70"
                }`}
              >
                {p}
              </p>
            ))}
            {inventoryLine ? (
              <p className="mt-4 max-w-2xl text-sm text-white/60">{inventoryLine}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3 md:mt-9 md:gap-4">
              <a
                href="#results"
                className="rounded-sm bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-bright"
              >
                See all {destination.shortLabel} flights →
              </a>
              <a
                href="#how-to-choose"
                className="rounded-sm border border-white/35 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
              >
                How to choose →
              </a>
            </div>
          </div>

          {heroFlight ? (
            <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/15 bg-navy shadow-[0_28px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                <Image
                  src={heroFlight.image}
                  alt={guide.imageAlt}
                  fill
                  unoptimized={heroFlight.source === "viator"}
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-b border-navy/8 bg-mist-soft px-5 py-10 md:px-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <p className="max-w-3xl text-base leading-relaxed text-stone">{guide.whyFromAir}</p>

          {picks.length > 0 ? (
            <>
              <h2 className="mt-8 font-display text-xl text-navy md:text-2xl">Quick picks</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {picks.map((pick) => (
                  <li key={pick.label}>
                    <Link
                      href={flightResultsHref(pick.flight)}
                      className="block h-full rounded-lg border border-navy/10 bg-white px-4 py-4 transition-colors hover:border-teal"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-teal">
                        {pick.label}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-navy">
                        {pick.flight.title}
                      </p>
                      <p className="mt-1.5 text-xs text-stone">
                        {pick.flight.durationLabel} · {pick.flight.priceLabel}
                        {pick.flight.rating != null ? ` · ${pick.flight.rating.toFixed(1)} ★` : ""}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </section>

      {tableFlights.length > 0 ? (
        <section className="bg-white px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              {destination.shortLabel} helicopter flights at a glance
            </h2>
            <p className="mt-2 max-w-2xl text-stone">
              The {tableFlights.length} most-reviewed flights. Open any flight to see full details, or
              add it to compare.
            </p>
            <div className="mt-6 overflow-x-auto rounded-xl border border-navy/10">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Flight</th>
                    <th className="px-4 py-3 font-semibold">In the air</th>
                    <th className="px-4 py-3 font-semibold">Total trip</th>
                    <th className="px-4 py-3 font-semibold">Cabin</th>
                    <th className="px-4 py-3 font-semibold">Rating</th>
                    <th className="px-4 py-3 font-semibold">From</th>
                    <th className="px-4 py-3 font-semibold">
                      <span className="sr-only">Book</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/8">
                  {tableFlights.map((f) => (
                    <tr key={f.id} className="align-top">
                      <td className="max-w-[320px] px-4 py-3">
                        <Link
                          href={flightResultsHref(f)}
                          className="font-medium text-teal hover:underline"
                        >
                          {f.title}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-navy">{f.durationLabel}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-navy">
                        {f.experienceLabel ?? <span className="text-stone-light">—</span>}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-navy">{cabinLabel(f.cabin)}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-navy">
                        {f.rating != null ? (
                          <>
                            {f.rating.toFixed(1)}{" "}
                            <span className="text-stone">
                              {ratingWord(f.rating)}
                              {f.reviewCount != null
                                ? ` · ${f.reviewCount.toLocaleString("en-US")}`
                                : ""}
                            </span>
                          </>
                        ) : (
                          <span className="text-stone-light">Not rated yet</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-navy">
                        {f.priceLabel}
                      </td>
                      <td className="px-4 py-3">
                        <BookingButton flight={f} className="whitespace-nowrap px-3 py-2 text-xs" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-stone-light">{inventory.disclaimer}</p>
          </div>
        </section>
      ) : null}

      <section id="how-to-choose" className="scroll-mt-24 bg-mist px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              How to choose a {destination.shortLabel} helicopter flight
            </h2>
            <ChooseList guide={guide} />
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy md:text-3xl">Where flights depart</h2>
            <ul className="mt-6 grid gap-3">
              {guide.departures.map((d) => (
                <li key={d.name} className="rounded-lg border border-navy/10 bg-white px-4 py-4">
                  <p className="text-sm font-semibold text-navy">{d.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-stone">{d.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl text-navy md:text-3xl">
            {destination.shortLabel} helicopter tours: common questions
          </h2>
          <div className="mt-6 divide-y divide-navy/10 border-y border-navy/10">
            {guide.faqs.map((faq) => (
              <details key={faq.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
                  {faq.q}
                  <span className="text-teal transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {picks.length > 0 ? (
        <section className="bg-navy px-5 py-16 text-white md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Ready to choose your {destination.shortLabel} flight?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Start with the experience you want rather than comparing every listing at once. Always
              check current dates, prices and availability on the booking page.
            </p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {picks.map(({ label, flight }) => (
                <li key={flight.id}>
                  <a
                    href={viatorGoPath(flight.bookingUrl, flight.destination)}
                    target="_blank"
                    rel={VIATOR_LINK_REL}
                    className="flex items-center justify-between gap-4 rounded-sm border border-white/15 bg-white/5 px-5 py-4 transition-colors hover:border-teal-bright/50 hover:bg-white/10"
                  >
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-sky">
                        {label}
                      </span>
                      <span className="mt-1 block truncate font-medium text-white">{flight.title}</span>
                      <span className="mt-1 block text-sm text-white/55">
                        {flight.durationLabel} · From {flight.priceLabel}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-sky">Check availability →</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-white/45">
              We may earn a commission if you book through links on this page. This does not determine
              our rankings.
            </p>
          </div>
        </section>
      ) : null}
    </>
  );
}
