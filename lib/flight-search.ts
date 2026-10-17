import { destinations, type DestinationSlug } from "@/data/destinations";
import {
  filterAndSortFlights,
  getFlightBySlug,
  searchFlights,
  type Flight,
  type FlightSearchParams,
} from "@/data/flights";
import { hasViatorApiKey, searchViatorHelicopters } from "@/lib/viator-api";

export type FlightSearchResult = {
  flights: Flight[];
  source: "curated" | "viator" | "mixed";
  live: boolean;
  totalCount: number;
  disclaimer: string;
};

/**
 * Prefer live Viator helicopter inventory when API key is present.
 * Always falls back to curated research inventory so SEO/product UX never blanks out.
 */
export async function resolveFlightSearch(
  params: FlightSearchParams,
): Promise<FlightSearchResult> {
  const curated = searchFlights(params);
  const curatedDisclaimer =
    "Prices and details are from our research set and Viator listings at the time of review. Confirm current price, availability and terms with the provider before booking.";

  const dest = params.destination;
  if (!dest || dest === "all" || !hasViatorApiKey()) {
    return {
      flights: curated,
      source: "curated",
      live: false,
      totalCount: curated.length,
      disclaimer: curatedDisclaimer,
    };
  }

  // Fetched unfiltered (one cached request per destination): Viator filters duration on the
  // whole activity, while our duration filter and labels use flight time.
  const live = await searchViatorHelicopters({
    destination: dest as DestinationSlug,
    count: 50,
  });

  if (!live.live || live.flights.length === 0) {
    return {
      flights: curated,
      source: "curated",
      live: false,
      totalCount: curated.length,
      disclaimer: curatedDisclaimer,
    };
  }

  // Keep curated enrichment for known product codes when available
  const curatedByCode = new Map(
    searchFlights({ destination: dest, type: "all" })
      .filter((f) => f.productCode)
      .map((f) => [f.productCode!, f] as const),
  );
  const enriched = live.flights.map((f) => {
    if (!f.productCode) return f;
    const match = curatedByCode.get(f.productCode);
    if (!match) return f;
    return {
      ...f,
      operator: match.operator,
      departure: match.departure ?? f.departure,
      kind: match.kind,
      durationLabel: match.durationLabel,
      durationMinutes: match.durationMinutes,
      doors: match.doors !== "unknown" ? match.doors : f.doors,
      cabin: match.cabin !== "unknown" ? match.cabin : f.cabin,
      routeHighlights: match.routeHighlights,
      bestFor: match.bestFor,
      summary: match.summary || f.summary,
      weightRestriction: match.weightRestriction,
      featured: match.featured,
      rank: match.rank,
    };
  });
  const flights = filterAndSortFlights(enriched, params);

  return {
    flights,
    source: "mixed",
    live: true,
    totalCount: flights.length,
    disclaimer:
      "Live results from Viator helicopter inventory. Prices shown are provider from-prices via the Viator Partner API — always confirm availability and final price on the booking page.",
  };
}

function destinationForSlug(slug: string): DestinationSlug | undefined {
  return [...destinations]
    .sort((a, b) => b.slug.length - a.slug.length)
    .find((d) => slug.startsWith(`${d.slug}-`))?.slug;
}

/**
 * Resolves compare selections. Curated flights resolve directly; live-only flights are
 * re-fetched from their destination's (cached) Viator search.
 */
export async function resolveFlightsBySlugs(slugs: string[]): Promise<Flight[]> {
  const liveByDestination = new Map<DestinationSlug, Promise<FlightSearchResult>>();

  const resolved = await Promise.all(
    slugs.map(async (slug) => {
      const curated = getFlightBySlug(slug);
      if (curated) return curated;
      const destination = destinationForSlug(slug);
      if (!destination || !hasViatorApiKey()) return undefined;
      if (!liveByDestination.has(destination)) {
        liveByDestination.set(destination, resolveFlightSearch({ destination, type: "all" }));
      }
      const result = await liveByDestination.get(destination)!;
      return result.flights.find((f) => f.slug === slug);
    }),
  );

  return resolved.filter((f): f is Flight => Boolean(f));
}
