import {
  VIATOR_HELICOPTER_TAG_ID,
  type DestinationSlug,
  getDestination,
} from "@/data/destinations";
import { inferDoorsFromListingText } from "@/lib/infer-doors";
import { kindLabel, type Flight } from "@/data/flights";
import {
  classifyProduct,
  formatActivityDuration,
  formatMinuteRange,
  LISTING_IS_FLIGHT_MAX_MINUTES,
  SIGHTSEEING_KINDS,
  statedFlightMinutes,
  statesPrivateFlight,
  type FlightKind,
  type MinuteRange,
} from "@/lib/flight-classification";

const VIATOR_API_BASE =
  process.env.VIATOR_API_BASE_URL || "https://api.viator.com/partner";

type ViatorSearchResponse = {
  products?: ViatorProductSummary[];
  totalCount?: number;
};

type ViatorProductSummary = {
  productCode?: string;
  title?: string;
  description?: string;
  images?: Array<{
    isCover?: boolean;
    variants?: Array<{ height?: number; width?: number; url?: string }>;
  }>;
  reviews?: {
    totalReviews?: number;
    combinedAverageRating?: number;
  };
  duration?: {
    fixedDurationInMinutes?: number;
    variableDurationFromMinutes?: number;
    variableDurationToMinutes?: number;
  };
  pricing?: {
    summary?: { fromPrice?: number; fromPriceBeforeDiscount?: number };
    currency?: string;
  };
  productUrl?: string;
  flags?: string[];
  tags?: number[];
};

export function hasViatorApiKey(): boolean {
  return Boolean(process.env.VIATOR_API_KEY?.trim());
}

/**
 * Viator's image CDN rejects server-side fetches without a browser user-agent, so these
 * URLs are rendered unoptimized and must already be a sensible size for result cards.
 */
function pickImage(product: ViatorProductSummary): string {
  const cover =
    product.images?.find((img) => img.isCover) ?? product.images?.[0];
  const variants = (cover?.variants ?? []).filter((v) => v.url);
  const landscape = variants
    .filter((v) => (v.width ?? 0) > (v.height ?? 0) && (v.width ?? 0) >= 480)
    .sort((a, b) => (a.width ?? 0) - (b.width ?? 0));
  const preferred =
    landscape.find((v) => (v.width ?? 0) >= 674) ??
    landscape[landscape.length - 1] ??
    [...variants].sort((a, b) => (b.width ?? 0) - (a.width ?? 0))[0];
  return (preferred?.url || "").trim() || "/icon.svg";
}

function activityRange(product: ViatorProductSummary): MinuteRange | null {
  const fixed = product.duration?.fixedDurationInMinutes;
  if (fixed != null) return { from: fixed, to: fixed };
  const from = product.duration?.variableDurationFromMinutes;
  const to = product.duration?.variableDurationToMinutes;
  if (from != null) return { from, to: to ?? from };
  return null;
}

/** Viator's duration covers the whole activity, so flight time comes from the listing text where possible. */
function flightTiming(
  product: ViatorProductSummary,
  kind: FlightKind,
): Pick<Flight, "durationLabel" | "durationMinutes" | "experienceLabel"> {
  const activity = activityRange(product);
  const flight =
    statedFlightMinutes(product.title ?? "", product.description ?? "") ??
    (activity &&
    SIGHTSEEING_KINDS.includes(kind) &&
    activity.to <= LISTING_IS_FLIGHT_MAX_MINUTES
      ? activity
      : null);
  const experienceLabel =
    activity && (!flight || activity.to > flight.to + 10)
      ? formatActivityDuration(activity)
      : null;
  return {
    durationLabel: flight ? formatMinuteRange(flight) : "Flight time not stated",
    // The from-price applies to the shortest option, so price per minute must use the lower bound.
    durationMinutes: flight ? flight.from : null,
    experienceLabel,
  };
}

function mapProduct(
  destination: DestinationSlug,
  product: ViatorProductSummary,
): Flight | null {
  if (!product.productCode || !product.title || !product.productUrl) return null;
  const kind = classifyProduct(product.title);
  if (!kind) return null;

  const flags = product.flags ?? [];
  const price = product.pricing?.summary?.fromPrice ?? null;
  // Viator has no doors-off tag or flag; this is inferred from listing text only.
  const text = `${product.title} ${product.description ?? ""}`;
  const doors = inferDoorsFromListingText(text, destination);

  return {
    id: `viator-${destination}-${product.productCode}`,
    slug: `${destination}-${product.productCode.toLowerCase()}`,
    destination,
    title: product.title.trim(),
    shortName: product.title.trim().slice(0, 48),
    operator: "See provider on booking page",
    departure: null,
    kind,
    ...flightTiming(product, kind),
    doors,
    cabin: flags.includes("PRIVATE_TOUR") ? (statesPrivateFlight(text) ? "private" : "unknown") : "shared",
    routeHighlights: [kindLabel(kind)],
    priceFrom: price,
    priceLabel: price != null ? `$${Math.round(price)}` : "See price",
    priceReliability: "verified-listing",
    rating: product.reviews?.combinedAverageRating ?? null,
    reviewCount: product.reviews?.totalReviews ?? null,
    reviewAttribution:
      product.reviews?.totalReviews != null
        ? "Viator / Tripadvisor combined rating"
        : null,
    freeCancellation: flags.includes("FREE_CANCELLATION") ? true : null,
    weightRestriction: null,
    image: pickImage(product),
    productCode: product.productCode,
    bookingUrl: product.productUrl.trim(),
    bestFor: flags.includes("PRIVATE_TOUR") ? "Private experience" : kindLabel(kind),
    summary: (product.description ?? "").replace(/\s+/g, " ").trim().slice(0, 280),
    featured: false,
    source: "viator",
  };
}

export type ViatorSearchInput = {
  destination: DestinationSlug;
  durationFrom?: number;
  durationTo?: number;
  lowestPrice?: number;
  highestPrice?: number;
  startDate?: string;
  endDate?: string;
  count?: number;
  start?: number;
  privateOnly?: boolean;
};

/**
 * Live Viator /products/search for helicopter tours (tag 12026).
 * Requires VIATOR_API_KEY. Returns [] when key is missing or the call fails.
 */
export async function searchViatorHelicopters(
  input: ViatorSearchInput,
): Promise<{ flights: Flight[]; totalCount: number; live: boolean }> {
  if (!hasViatorApiKey()) {
    return { flights: [], totalCount: 0, live: false };
  }

  const dest = getDestination(input.destination);
  if (!dest) return { flights: [], totalCount: 0, live: false };

  const results = await Promise.all(
    dest.viatorDestinationIds.map((viatorId) =>
      searchViatorDestination(input, viatorId),
    ),
  );
  if (results.every((r) => !r.ok)) {
    return { flights: [], totalCount: 0, live: false };
  }

  const seen = new Set<string>();
  const flights: Flight[] = [];
  for (const product of results.flatMap((r) => r.products)) {
    if (dest.keepListing && !dest.keepListing(product.title ?? "", product.description ?? "")) {
      continue;
    }
    const flight = mapProduct(input.destination, product);
    if (!flight || seen.has(flight.id)) continue;
    seen.add(flight.id);
    flights.push(flight);
  }

  return {
    flights,
    totalCount:
      dest.viatorDestinationIds.length === 1 && !dest.keepListing
        ? (results[0].totalCount ?? flights.length)
        : flights.length,
    live: true,
  };
}

async function searchViatorDestination(
  input: ViatorSearchInput,
  viatorDestinationId: string,
): Promise<{ ok: boolean; products: ViatorProductSummary[]; totalCount?: number }> {
  const body = {
    filtering: {
      destination: viatorDestinationId,
      // Multiple tags are ANDed by Viator; adding any tag here narrows results.
      tags: [VIATOR_HELICOPTER_TAG_ID],
      ...(input.privateOnly ? { flags: ["PRIVATE_TOUR"] } : {}),
      ...(input.lowestPrice != null ? { lowestPrice: input.lowestPrice } : {}),
      ...(input.highestPrice != null ? { highestPrice: input.highestPrice } : {}),
      // Date ranges trigger an availability lookup that is slow and can 500 on large destinations.
      ...(input.startDate && input.endDate
        ? { startDate: input.startDate, endDate: input.endDate }
        : {}),
      ...(input.durationFrom != null || input.durationTo != null
        ? {
            durationInMinutes: {
              from: input.durationFrom ?? 15,
              to: input.durationTo ?? 360,
            },
          }
        : {}),
    },
    sorting: {
      sort: "TRAVELER_RATING",
      order: "DESCENDING",
    },
    pagination: {
      start: input.start ?? 1,
      count: input.count ?? 30,
    },
    currency: "USD",
  };

  try {
    const response = await fetch(`${VIATOR_API_BASE}/products/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json;version=2.0",
        "Accept-Language": "en-US",
        "exp-api-key": process.env.VIATOR_API_KEY!,
      },
      body: JSON.stringify(body),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(
        "[viator] search failed",
        viatorDestinationId,
        response.status,
        await response.text().catch(() => ""),
      );
      return { ok: false, products: [] };
    }

    const data = (await response.json()) as ViatorSearchResponse;
    return { ok: true, products: data.products ?? [], totalCount: data.totalCount };
  } catch (error) {
    console.error("[viator] search error", viatorDestinationId, error);
    return { ok: false, products: [] };
  }
}

export type ViatorProductOption = { code: string; title: string; description: string };

export type ViatorProductDetails = {
  operator: string | null;
  meetingPoint: string;
  description: string;
  inclusions: string[];
  exclusions: string[];
  /** Pass-by and stop descriptions from the published itinerary. */
  itinerary: string;
  privateTour: boolean;
  options: ViatorProductOption[];
};

type ViatorProductContent = {
  description?: string;
  supplier?: { name?: string };
  logistics?: { start?: Array<{ description?: string }> };
  inclusions?: Array<{ otherDescription?: string; description?: string }>;
  exclusions?: Array<{ otherDescription?: string; description?: string }>;
  itinerary?: { privateTour?: boolean; itineraryItems?: Array<{ description?: string }> };
  productOptions?: Array<{ productOptionCode?: string; title?: string; description?: string }>;
};

export async function fetchViatorProductDetails(
  productCode: string,
): Promise<ViatorProductDetails | null> {
  if (!hasViatorApiKey()) return null;
  try {
    const response = await fetch(
      `${VIATOR_API_BASE}/products/${encodeURIComponent(productCode)}`,
      {
        headers: {
          Accept: "application/json;version=2.0",
          "Accept-Language": "en-US",
          "exp-api-key": process.env.VIATOR_API_KEY!,
        },
        next: { revalidate: 86400 },
      },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as ViatorProductContent;
    const texts = (items: ViatorProductContent["inclusions"]) =>
      (items ?? []).map((i) => (i.otherDescription ?? i.description ?? "").trim()).filter(Boolean);
    return {
      operator: data.supplier?.name?.trim() || null,
      meetingPoint: (data.logistics?.start ?? []).map((s) => s.description ?? "").join("\n"),
      description: data.description ?? "",
      inclusions: texts(data.inclusions),
      exclusions: texts(data.exclusions),
      itinerary: (data.itinerary?.itineraryItems ?? [])
        .map((item) => item.description ?? "")
        .join("\n"),
      privateTour: data.itinerary?.privateTour === true,
      options: (data.productOptions ?? [])
        .filter((o) => o.productOptionCode)
        .map((o) => ({
          code: o.productOptionCode!,
          title: (o.title ?? "").trim(),
          description: o.description ?? "",
        })),
    };
  } catch (error) {
    console.error("[viator] product details error", productCode, error);
    return null;
  }
}

export type ViatorOptionPrices = {
  /** Lowest price across options, in the supplier's currency (same currency as `prices`). */
  fromPrice: number | null;
  prices: Record<string, { price: number; perGroup: boolean }>;
};

type ViatorPricingDetail = {
  ageBand?: string;
  pricingPackageType?: string;
  price?: { original?: { recommendedRetailPrice?: number } };
};

type ViatorSchedule = {
  summary?: { fromPrice?: number };
  bookableItems?: Array<{
    productOptionCode?: string;
    seasons?: Array<{
      startDate?: string;
      endDate?: string;
      pricingRecords?: Array<{ pricingDetails?: ViatorPricingDetail[] }>;
    }>;
  }>;
};

/**
 * Per-option retail prices from the availability schedule. Prices are in the supplier's currency;
 * callers convert with the ratio between the search from-price and `fromPrice`.
 */
export async function fetchViatorOptionPrices(
  productCode: string,
): Promise<ViatorOptionPrices | null> {
  if (!hasViatorApiKey()) return null;
  try {
    const response = await fetch(
      `${VIATOR_API_BASE}/availability/schedules/${encodeURIComponent(productCode)}`,
      {
        headers: {
          Accept: "application/json;version=2.0",
          "Accept-Language": "en-US",
          "exp-api-key": process.env.VIATOR_API_KEY!,
        },
        next: { revalidate: 21600 },
      },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as ViatorSchedule;
    const today = new Date().toISOString().slice(0, 10);
    const prices: ViatorOptionPrices["prices"] = {};
    for (const item of data.bookableItems ?? []) {
      if (!item.productOptionCode) continue;
      const seasons = item.seasons ?? [];
      const season =
        seasons.find((s) => (s.startDate ?? "") <= today && (!s.endDate || s.endDate >= today)) ??
        seasons.find((s) => (s.startDate ?? "") > today);
      let best: { price: number; perGroup: boolean } | null = null;
      for (const record of season?.pricingRecords ?? []) {
        const details = record.pricingDetails ?? [];
        const detail =
          details.find((d) => d.ageBand === "ADULT") ??
          details.find((d) => d.ageBand === "TRAVELER") ??
          details[0];
        const price = detail?.price?.original?.recommendedRetailPrice;
        if (price == null || (best && best.price <= price)) continue;
        best = { price, perGroup: detail?.pricingPackageType === "UNIT" };
      }
      if (best) prices[item.productOptionCode] = best;
    }
    return { fromPrice: data.summary?.fromPrice ?? null, prices };
  } catch (error) {
    console.error("[viator] schedule error", productCode, error);
    return null;
  }
}

/** Current product page URL for an active Viator product, or null if unknown/inactive. */
export async function fetchViatorProductUrl(productCode: string): Promise<string | null> {
  if (!hasViatorApiKey()) return null;
  try {
    const response = await fetch(
      `${VIATOR_API_BASE}/products/${encodeURIComponent(productCode)}`,
      {
        headers: {
          Accept: "application/json;version=2.0",
          "Accept-Language": "en-US",
          "exp-api-key": process.env.VIATOR_API_KEY!,
        },
        next: { revalidate: 86400 },
      },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as { status?: string; productUrl?: string };
    if (data.status !== "ACTIVE" || !data.productUrl) return null;
    return data.productUrl.trim();
  } catch (error) {
    console.error("[viator] product lookup error", productCode, error);
    return null;
  }
}

export async function fetchViatorDestinations(): Promise<unknown> {
  if (!hasViatorApiKey()) return null;
  const response = await fetch(`${VIATOR_API_BASE}/destinations`, {
    headers: {
      Accept: "application/json;version=2.0",
      "Accept-Language": "en-US",
      "exp-api-key": process.env.VIATOR_API_KEY!,
    },
    next: { revalidate: 604800 },
  });
  if (!response.ok) return null;
  return response.json();
}

export async function fetchViatorTags(): Promise<unknown> {
  if (!hasViatorApiKey()) return null;
  const response = await fetch(`${VIATOR_API_BASE}/products/tags`, {
    headers: {
      Accept: "application/json;version=2.0",
      "Accept-Language": "en-US",
      "exp-api-key": process.env.VIATOR_API_KEY!,
    },
    next: { revalidate: 604800 },
  });
  if (!response.ok) return null;
  return response.json();
}
