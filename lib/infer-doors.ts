import { getDestination, type DestinationSlug } from "@/data/destinations";
import type { DoorsOption } from "@/data/flights";

/** Doors-off is a meaningful filter only on Hawaii island hubs (real inventory). */
export function destinationSupportsDoorsOffFilter(slug: DestinationSlug): boolean {
  return getDestination(slug)?.group === "hawaii";
}

/**
 * Infers doors configuration from listing text. Weak signals (e.g. "open door") only count
 * as doors-off for Hawaii; worldwide listings often use "open door" for enclosed sightseeing.
 */
export function inferDoorsFromListingText(
  text: string,
  destination?: DestinationSlug,
): DoorsOption {
  const lower = text.toLowerCase();
  const hawaii =
    destination === undefined
      ? true
      : getDestination(destination)?.group === "hawaii";

  if (
    /doors?[- ]?(on|off)\s*(or|\/|&)\s*(doors?[- ]?)?(on|off)/i.test(lower) ||
    /doors?[- ]?off\s+or\s+on/.test(lower) ||
    /door[- ]?off\s+or\s+on/.test(lower) ||
    /doors?[- ]?on\s+or\s+off/.test(lower) ||
    /doors?[- ]?on\/off/.test(lower)
  ) {
    return "doors-optional";
  }

  if (
    /\bdoors?[- ]?on\b/.test(lower) ||
    /enclosed cabin/.test(lower) ||
    /doors remain on/.test(lower) ||
    /with doors on/.test(lower)
  ) {
    return "doors-on";
  }

  const strongOff = /doors?[- ]?off|doorless|feet[- ]out/.test(lower);
  const hawaiiOpenAir =
    hawaii &&
    (lower.includes("open-cabin") ||
      lower.includes("open seating") ||
      lower.includes("open-air"));

  if (strongOff || hawaiiOpenAir) {
    return "doors-off";
  }

  return "unknown";
}
