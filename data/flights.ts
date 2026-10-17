import { bigIslandTours } from "@/data/big-island-tours";
import {
  destinationResultsPath,
  type DestinationSlug,
  type HawaiiIslandSlug,
} from "@/data/destinations";
import { kauaiTours } from "@/data/kauai-tours";
import { mauiTours } from "@/data/maui-tours";
import { oahuTours } from "@/data/oahu-tours";
import { classifyProduct, SIGHTSEEING_KINDS, type FlightKind } from "@/lib/flight-classification";
import { isVerifiedGrandCanyonLanding } from "@/lib/grand-canyon-landings";
import { inferDoorsFromListingText } from "@/lib/infer-doors";
import { isLasVegasLandingTour } from "@/lib/las-vegas-routes";

export type DoorsOption = "doors-off" | "doors-on" | "doors-optional" | "unknown";
export type CabinType = "private" | "shared" | "unknown";
export type PriceReliability = "verified-listing" | "indicative";

export type Flight = {
  id: string;
  slug: string;
  destination: DestinationSlug;
  title: string;
  shortName: string;
  operator: string;
  /** Departure area when known; otherwise null — confirm with provider */
  departure: string | null;
  kind: FlightKind;
  /** Airborne time; null when the listing doesn't state it. */
  durationLabel: string;
  durationMinutes: number | null;
  /** Whole-activity length (transfers, check-in, add-ons) when it differs from flight time. */
  experienceLabel: string | null;
  doors: DoorsOption;
  cabin: CabinType;
  routeHighlights: string[];
  priceFrom: number | null;
  priceLabel: string;
  priceReliability: PriceReliability;
  rating: number | null;
  reviewCount: number | null;
  reviewAttribution: string | null;
  /** Free-cancellation when known from research; otherwise null */
  freeCancellation: boolean | null;
  /** Passenger weight note when known */
  weightRestriction: string | null;
  image: string;
  productCode: string | null;
  bookingUrl: string;
  bestFor: string;
  summary: string;
  featured: boolean;
  rank?: number;
  source: "curated" | "viator";
  /** Bookable options with their own flight time and price; only on detail-enriched pages. */
  options?: FlightOption[];
  /** Landmarks named in the published route; only on detail-enriched pages. */
  landmarks?: string[];
  /** Where the flight lands when it includes a landing, else null; only on detail-enriched pages. */
  landing?: string | null;
  /** A sunset departure is offered (title or option); only on detail-enriched pages. */
  sunset?: boolean;
  /**
   * Park, government, fuel or heliport fees per the listing's inclusions/exclusions, with the
   * listed wording; undefined when the listing doesn't mention them. Only on detail-enriched pages.
   */
  fees?: { status: "included" | "extra"; note: string };
};

export type FlightOption = {
  code: string;
  title: string;
  minutes: number | null;
  /** USD from-price for this option, when the schedule lists one. */
  price: number | null;
  perGroup: boolean;
  transfers: boolean;
  private: boolean;
  /** Landmarks this option's own description lists; empty when it lists none. */
  landmarks: string[];
};

export type FlightSearchParams = {
  destination?: DestinationSlug | "all";
  duration?:
    | "any"
    | "short"
    | "medium"
    | "long"
    | "12-15"
    | "16-20"
    | "21-30"
    | "under-20"
    | "20-30"
    | "over-30";
  experience?:
    | "all"
    | "doors-off"
    | "private"
    | "shared"
    | "landing"
    | "night"
    | "best-value"
    | "longest";
  doors?: "any" | "yes" | "no";
  sort?: "recommended" | "price-asc" | "price-desc" | "duration-desc" | "rating-desc";
  /** "sightseeing" (default) hides transfers, day trips and packages. */
  type?: "sightseeing" | "all";
  q?: string;
};

export function isSightseeing(flight: Pick<Flight, "kind">): boolean {
  return SIGHTSEEING_KINDS.includes(flight.kind);
}

const RATING_PRIOR = 4.4;
const RATING_PRIOR_WEIGHT = 50;

/**
 * Rating shrunk toward a typical helicopter-tour score by review volume, so a 5.0 from
 * three reviews doesn't outrank a 4.8 from hundreds. Null when there's no rating.
 */
export function weightedRating(flight: Pick<Flight, "rating" | "reviewCount">): number | null {
  if (flight.rating == null) return null;
  const n = flight.reviewCount ?? 0;
  return (flight.rating * n + RATING_PRIOR * RATING_PRIOR_WEIGHT) / (n + RATING_PRIOR_WEIGHT);
}

export function kindLabel(kind: FlightKind): string {
  switch (kind) {
    case "night":
      return "Night flight";
    case "landing":
      return "Includes a landing";
    case "transfer":
      return "Helicopter transfer";
    case "package":
      return "Flight + other activity";
    case "day-trip":
      return "Day trip by helicopter";
    default:
      return "Sightseeing flight";
  }
}

type RawTour = {
  id: string;
  shortName: string;
  fullName: string;
  supplier: string;
  bestFor: string;
  duration: string;
  durationMinutes: number | null;
  rating: number | null;
  reviews: number | null;
  priceFrom: number;
  priceLabel: string;
  image: string;
  viatorUrl: string;
  featured: boolean;
  rank?: number;
  summary: string;
  facts: string[];
};

function extractProductCode(viatorUrl: string): string | null {
  const match = viatorUrl.match(/\/d\d+-([^/?#]+)/i);
  return match?.[1] ?? null;
}

/** Summaries compare against other tours, so format inference uses only the tour's own attributes. */
function attributes(tour: RawTour): string {
  return `${tour.fullName} ${tour.shortName} ${tour.bestFor} ${tour.facts.join(" ")}`.toLowerCase();
}

function inferDoors(tour: RawTour): DoorsOption {
  return inferDoorsFromListingText(attributes(tour));
}

function inferCabin(tour: RawTour): CabinType {
  const text = attributes(tour);
  if (text.includes("private charter") || text.includes("private ") || text.includes("private-style")) {
    return "private";
  }
  if (text.includes("shared") || text.includes("sightseeing")) {
    return "shared";
  }
  return "unknown";
}

function inferDeparture(
  destination: DestinationSlug,
  tour: RawTour,
): string | null {
  const text = attributes(tour);
  if (destination === "kauai") {
    if (text.includes("princeville")) return "Departs Princeville";
    if (text.includes("lihue") || text.includes("lihuʻe") || text.includes("lihu'e"))
      return "Departs Lihue";
  }
  if (destination === "maui" && text.includes("kahului")) return "Departs Kahului";
  if (destination === "oahu" && text.includes("honolulu")) return "Departs Honolulu";
  if (destination === "big-island") {
    if (text.includes("hilo")) return "Departs Hilo";
    if (text.includes("kona")) return "Departs Kona";
  }
  return null;
}

function routeFromBestFor(tour: RawTour): string[] {
  const highlights: string[] = [];
  const text = attributes(tour);
  const extras: Array<[RegExp, string]> = [
    [/na pali|napali/, "Na Pali Coast"],
    [/waimea/, "Waimea Canyon"],
    [/waterfall/, "Waterfalls"],
    [/molokai/, "Molokai"],
    [/haleakala/, "Haleakala"],
    [/kilauea|kīlauea/, "Kīlauea volcano"],
    [/kohala/, "Kohala valleys"],
    [/diamond head/, "Diamond Head"],
    [/north shore/, "North Shore"],
    [/pearl harbor/, "Pearl Harbor"],
  ];
  for (const [re, label] of extras) {
    if (re.test(text) && !highlights.some((h) => h.toLowerCase().includes(label.toLowerCase()))) {
      highlights.push(label);
    }
  }
  return highlights.slice(0, 4);
}

function toFlight(destination: HawaiiIslandSlug, tour: RawTour): Flight {
  return {
    id: `${destination}-${tour.id}`,
    slug: `${destination}-${tour.id}`,
    destination,
    title: tour.fullName,
    shortName: tour.shortName,
    operator: tour.supplier,
    departure: inferDeparture(destination, tour),
    kind: classifyProduct(tour.fullName, { verifiedHelicopter: true }) ?? "scenic",
    durationLabel: tour.duration,
    durationMinutes: tour.durationMinutes,
    experienceLabel: null,
    doors: inferDoors(tour),
    cabin: inferCabin(tour),
    routeHighlights: routeFromBestFor(tour),
    priceFrom: tour.priceFrom,
    priceLabel: tour.priceLabel,
    priceReliability: "indicative",
    rating: tour.rating,
    reviewCount: tour.reviews,
    reviewAttribution:
      tour.rating != null && tour.reviews != null
        ? "Viator listing data at research time"
        : null,
    freeCancellation: null,
    weightRestriction: null,
    image: tour.image,
    productCode: extractProductCode(tour.viatorUrl),
    bookingUrl: tour.viatorUrl,
    bestFor: tour.bestFor,
    summary: tour.summary,
    featured: tour.featured,
    rank: tour.rank,
    source: "curated",
  };
}

export const flights: Flight[] = [
  ...kauaiTours.map((t) => toFlight("kauai", t)),
  ...oahuTours.map((t) => toFlight("oahu", t)),
  ...mauiTours.map((t) => toFlight("maui", t)),
  ...bigIslandTours.map((t) => toFlight("big-island", t)),
];

export function getFlightBySlug(slug: string): Flight | undefined {
  return flights.find((f) => f.slug === slug);
}

/** Flights have no standalone pages; this opens the flight's expanded card on its destination results page. */
export function flightResultsHref(flight: Pick<Flight, "destination" | "slug">): string {
  return `${destinationResultsPath(flight.destination, { flight: flight.slug })}#flight-${flight.slug}`;
}

export function getFlightsByIds(ids: string[]): Flight[] {
  const set = new Set(ids);
  return flights.filter((f) => set.has(f.id) || set.has(f.slug));
}

function matchesDuration(
  flight: Flight,
  duration: FlightSearchParams["duration"],
): boolean {
  if (!duration || duration === "any") return true;
  const mins = flight.durationMinutes;
  if (mins == null) return false;
  if (duration === "12-15") return mins >= 12 && mins <= 15;
  if (duration === "16-20") return mins >= 16 && mins <= 20;
  if (duration === "21-30") return mins >= 21 && mins <= 30;
  if (duration === "under-20") return mins < 20;
  if (duration === "20-30") return mins >= 20 && mins <= 30;
  if (duration === "over-30") return mins > 30;
  if (duration === "short") return mins < 45;
  if (duration === "medium") return mins >= 45 && mins <= 60;
  if (duration === "long") return mins > 60;
  return true;
}

function matchesExperience(
  flight: Flight,
  experience: FlightSearchParams["experience"],
): boolean {
  if (!experience || experience === "all") return true;
  if (experience === "doors-off")
    return flight.doors === "doors-off" || flight.doors === "doors-optional";
  if (experience === "private") return flight.cabin === "private";
  if (experience === "shared")
    return flight.cabin !== "private" && flight.kind !== "landing";
  if (experience === "night") return flight.kind === "night";
  if (experience === "landing") {
    if (flight.destination === "grand-canyon") return isVerifiedGrandCanyonLanding(flight);
    if (flight.destination === "las-vegas") return isLasVegasLandingTour(flight);
    return flight.kind === "landing" || flight.landing != null;
  }
  if (experience === "best-value") return true;
  if (experience === "longest") return true;
  return true;
}

function matchesDoors(
  flight: Flight,
  doors: FlightSearchParams["doors"],
): boolean {
  if (!doors || doors === "any") return true;
  if (doors === "yes")
    return flight.doors === "doors-off" || flight.doors === "doors-optional";
  if (doors === "no")
    return flight.doors === "doors-on" || flight.doors === "unknown";
  return true;
}

export function searchFlights(params: FlightSearchParams = {}): Flight[] {
  return filterAndSortFlights(flights, params);
}

export function filterAndSortFlights(
  source: Flight[],
  params: FlightSearchParams = {},
): Flight[] {
  let results = [...source];

  if (params.destination && params.destination !== "all") {
    results = results.filter((f) => f.destination === params.destination);
  }

  if (params.q?.trim()) {
    const q = params.q.trim().toLowerCase();
    results = results.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.operator.toLowerCase().includes(q) ||
        f.bestFor.toLowerCase().includes(q) ||
        f.routeHighlights.some((h) => h.toLowerCase().includes(q)),
    );
  }

  results = results.filter(
    (f) =>
      (params.type === "all" || isSightseeing(f)) &&
      matchesDuration(f, params.duration) &&
      matchesExperience(f, params.experience) &&
      matchesDoors(f, params.doors),
  );

  const sort = params.sort ?? "recommended";
  if (params.experience === "best-value" || sort === "price-asc") {
    results.sort((a, b) => (a.priceFrom ?? 9999) - (b.priceFrom ?? 9999));
  } else if (params.experience === "longest" || sort === "duration-desc") {
    results.sort(
      (a, b) => (b.durationMinutes ?? 0) - (a.durationMinutes ?? 0),
    );
  } else if (sort === "price-desc") {
    results.sort((a, b) => (b.priceFrom ?? 0) - (a.priceFrom ?? 0));
  } else if (sort === "rating-desc") {
    results.sort((a, b) => (weightedRating(b) ?? 0) - (weightedRating(a) ?? 0));
  } else {
    results.sort((a, b) => {
      const as = isSightseeing(a) ? 0 : 1;
      const bs = isSightseeing(b) ? 0 : 1;
      if (as !== bs) return as - bs;
      const ar = a.rank ?? 99;
      const br = b.rank ?? 99;
      if (ar !== br) return ar - br;
      return (
        (b.reviewCount ?? 0) - (a.reviewCount ?? 0) ||
        (weightedRating(b) ?? 0) - (weightedRating(a) ?? 0)
      );
    });
  }

  return results;
}

export function doorsLabel(doors: DoorsOption): string {
  switch (doors) {
    case "doors-off":
      return "Doors-off";
    case "doors-on":
      return "Doors-on";
    case "doors-optional":
      return "Doors on or off";
    default:
      return "Doors format varies";
  }
}

export function ratingWord(rating: number): string {
  if (rating >= 4.8) return "Exceptional";
  if (rating >= 4.6) return "Excellent";
  if (rating >= 4.3) return "Very good";
  if (rating >= 4.0) return "Good";
  return "Rated";
}

export function cabinLabel(cabin: CabinType): string {
  switch (cabin) {
    case "private":
      return "Private flight";
    case "shared":
      return "Shared / scenic flight";
    default:
      return "Cabin type varies";
  }
}
