import {
  departureRules,
  LANDING_TEXT,
  landingRules,
  landmarkRules,
} from "@/data/destination-categories";
import type { DestinationSlug } from "@/data/destinations";
import { isSightseeing, type Flight, type FlightOption } from "@/data/flights";
import { formatMinuteRange, statedFlightMinutes, statesPrivateFlight } from "@/lib/flight-classification";
import { resolveFlightSearch } from "@/lib/flight-search";
import {
  fetchViatorOptionPrices,
  fetchViatorProductDetails,
  type ViatorOptionPrices,
  type ViatorProductDetails,
} from "@/lib/viator-api";

const DETAIL_CONCURRENCY = 6;

const TRANSFER_OPTION = /transfer|pick ?-?up|drop ?-?off|transport/i;
const NO_TRANSFER =
  /\bno (?:hotel )?(?:transfers?|pick ?-?up)|(?:transfers?|pick ?-?up|drop ?-?off)[^.\n]{0,30}not (?:included|provided)|without (?:hotel )?transfers?/i;
const PRIVATE_OPTION =
  /\bprivate\b(?!\s+(?:[\w-]+\s+){0,3}(?:transfers?|pick ?-?up|car|vehicle|transport))|exclusive|whole helicopter/i;

function optionHasTransfers(title: string, description: string): boolean {
  if (TRANSFER_OPTION.test(title)) return true;
  return TRANSFER_OPTION.test(description) && !NO_TRANSFER.test(description);
}

async function mapLimited<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

/**
 * Sources are checked most-specific first: descriptions often mention other places in passing
 * ("views of New Jersey"), so they only decide when the title and meeting point don't.
 */
function detectDeparture(destination: DestinationSlug, sources: string[]): string | null {
  const rules = departureRules[destination] ?? [];
  for (const text of sources) {
    const rule = rules.find((r) => r.pattern.test(text));
    if (rule) return rule.label;
  }
  return null;
}

function detectLandmarks(destination: DestinationSlug, text: string): string[] {
  return (landmarkRules[destination] ?? []).filter((r) => r.pattern.test(text)).map((r) => r.name);
}

// Viator's private flag can describe a private transfer to a shared flight.
const SHARED_FLIGHT =
  /(?:your|scheduled) shared (?:helicopter )?flight|helicopter takes \d+(?:\s*-\s*\d+)? people|private vehicle, however/i;

function detectCabin(flight: Flight, details: ViatorProductDetails): Flight["cabin"] {
  const text = [flight.title, details.description, ...details.options.map((o) => o.title)].join("\n");
  if (SHARED_FLIGHT.test(text)) return "shared";
  if (!details.privateTour) return flight.cabin;
  return statesPrivateFlight(text) ? "private" : "unknown";
}

// "Parking fees" is a ground extra, not a flight fee.
const FLIGHT_FEE =
  /\bparks? fees?|national park|conservation|government fees?|aviation tax|fuel (?:levy|surcharge)|heliport fee|landing (?:and facility )?fees?|all fees/i;

function feeText(item: string): string {
  const short = item.replace(/\s*\b(?:which|that|payable|paid|to be paid)\b.*$/i, "").trim();
  return short.length > 48 ? `${short.slice(0, 45).trimEnd()}…` : short;
}

function detectFees(details: ViatorProductDetails): Flight["fees"] {
  const extra = details.exclusions.filter((e) => FLIGHT_FEE.test(e));
  if (extra.length) return { status: "extra", note: extra.slice(0, 3).map(feeText).join(", ") };
  const included = details.inclusions.filter((i) => FLIGHT_FEE.test(i));
  if (included.length) return { status: "included", note: included.slice(0, 3).map(feeText).join(", ") };
  return undefined;
}

const AIR_ONLY = /air[- ]only|no landing/i;
const SUNSET = /sunset|golden hour|twilight/i;

/**
 * Landing location, checked title first, then inclusions, itinerary and description. Null when the listing
 * doesn't describe a landing; "Location not stated" when it does but names no known spot.
 */
function detectLanding(flight: Flight, details: ViatorProductDetails): string | null {
  if (AIR_ONLY.test(flight.title)) return null;
  const sources = [flight.title, details.inclusions.join("\n"), details.itinerary, details.description];
  if (flight.kind !== "landing" && !sources.some((s) => LANDING_TEXT.test(s))) return null;
  const rules = landingRules[flight.destination] ?? [];
  for (const text of sources) {
    const rule = rules.find((r) => r.pattern.test(text));
    if (rule) return rule.name;
  }
  return "Location not stated";
}

function buildOptions(
  flight: Flight,
  details: ViatorProductDetails,
  schedule: ViatorOptionPrices | null,
): FlightOption[] {
  // Schedules are in the supplier's currency; the search from-price is the same amount in USD.
  const rate =
    flight.priceFrom != null && schedule?.fromPrice ? flight.priceFrom / schedule.fromPrice : null;
  const single = details.options.length === 1;
  return details.options.map((o) => {
    const scheduled = schedule?.prices[o.code];
    const price =
      scheduled && rate != null
        ? Math.round(scheduled.price * rate)
        : single
          ? flight.priceFrom
          : null;
    return {
      code: o.code,
      title: o.title,
      minutes: statedFlightMinutes(o.title, o.description)?.from ?? null,
      price,
      perGroup: scheduled?.perGroup ?? false,
      transfers: optionHasTransfers(o.title, o.description),
      private: PRIVATE_OPTION.test(o.title),
      // A single option is the whole listing; its route is the listing's route.
      landmarks: single ? [] : detectLandmarks(flight.destination, `${o.title}\n${o.description}`),
    };
  });
}

function enrich(
  flight: Flight,
  details: ViatorProductDetails | null,
  schedule: ViatorOptionPrices | null,
): Flight {
  if (!details) return flight;
  const inclusions = details.inclusions.join("\n");
  const options = buildOptions(flight, details, schedule);
  const optionMinutes = options.map((o) => o.minutes).filter((m): m is number => m != null);
  // Search summaries often give one leg of a round trip; inclusions say "each way".
  const roundTrip = /\beach way\b/i.test(inclusions) ? statedFlightMinutes(inclusions, "") : null;
  const stated =
    optionMinutes.length > 0
      ? { from: Math.min(...optionMinutes), to: Math.max(...optionMinutes) }
      : (roundTrip ??
        (flight.durationMinutes == null
          ? statedFlightMinutes(inclusions, details.description)
          : null));
  const routeText = [
    flight.title,
    details.itinerary,
    ...options.map((o) => `${o.title}\n${details.options.find((d) => d.code === o.code)?.description ?? ""}`),
    details.description,
  ].join("\n");

  return {
    ...flight,
    operator: flight.source === "viator" && details.operator ? details.operator : flight.operator,
    departure:
      flight.departure ??
      detectDeparture(flight.destination, [
        flight.title,
        details.meetingPoint,
        inclusions,
        flight.summary,
        details.description,
      ]),
    cabin: detectCabin(flight, details),
    options,
    landmarks: detectLandmarks(flight.destination, routeText),
    landing: detectLanding(flight, details),
    sunset: SUNSET.test(flight.title) || details.options.some((o) => SUNSET.test(o.title)),
    fees: detectFees(details),
    ...(stated
      ? { durationLabel: formatMinuteRange(stated), durationMinutes: stated.from }
      : {}),
  };
}

/**
 * Sightseeing inventory for a destination with operator, departure, flight-time options and
 * landmarks filled in from Viator product details, plus per-option prices for listings that sell
 * several flight lengths. Requests are cached, so this is cheap after the first load.
 */
export async function resolveDetailedSightseeing(destination: DestinationSlug): Promise<Flight[]> {
  const { flights, live } = await resolveFlightSearch({ destination, type: "sightseeing" });
  if (!live) return flights;
  const sightseeing = flights.filter(isSightseeing);
  return mapLimited(sightseeing, DETAIL_CONCURRENCY, async (f) => {
    if (!f.productCode) return f;
    const details = await fetchViatorProductDetails(f.productCode);
    const schedule =
      details && details.options.length > 1 ? await fetchViatorOptionPrices(f.productCode) : null;
    return enrich(f, details, schedule);
  });
}
