import type { Flight } from "@/data/flights";

const PLACEHOLDER_OPERATOR = /^see provider/i;

export function isKnownOperator(name: string | undefined | null): name is string {
  const trimmed = name?.trim();
  return Boolean(trimmed && !PLACEHOLDER_OPERATOR.test(trimmed));
}

/** Flight and operator counts for hub “Currently comparing …” copy (same list as default #results). */
export function inventoryComparisonStats(flights: Flight[]) {
  const flightCount = flights.length;
  const operatorCount = new Set(
    flights.map((f) => f.operator).filter(isKnownOperator),
  ).size;
  return { flightCount, operatorCount };
}

export function formatInventoryComparisonLine(stats: {
  flightCount: number;
  operatorCount: number;
}): string {
  if (stats.flightCount <= 0) return "";
  const flights =
    stats.flightCount === 1
      ? "Currently comparing 1 flight"
      : `Currently comparing ${stats.flightCount} flights`;
  const operators =
    stats.operatorCount > 1 ? ` from ${stats.operatorCount} operators` : "";
  return `${flights}${operators}.`;
}

export function minFromPrice(flights: Flight[]): number | null {
  const prices = flights.map((f) => f.priceFrom).filter((p): p is number => p != null);
  return prices.length ? Math.round(Math.min(...prices)) : null;
}

/** Meta descriptions that mention live inventory size and from-price. */
export function sightseeingMetaDescription(input: {
  placeName: string;
  productLabel: string;
  flights: Flight[];
  trailing: string;
  fallback: string;
}): string {
  const { flightCount } = inventoryComparisonStats(input.flights);
  const minPrice = minFromPrice(input.flights);
  if (flightCount === 0 || minPrice == null) return input.fallback;
  const tourWord = flightCount === 1 ? input.productLabel.replace(/s$/, "") : input.productLabel;
  return `Compare ${flightCount} ${input.placeName} ${tourWord} from $${minPrice}. ${input.trailing}`;
}
