import type { Flight } from "@/data/flights";

const SOUTH_RIM = "Departs South Rim (Tusayan)";

/** Landings outside the canyon experience — not shown on landing-tour category pages. */
export const NON_CANYON_LANDING_LABELS = new Set<string>(["Valley of Fire"]);

export function isVerifiedGrandCanyonLanding(f: Flight): boolean {
  if (f.destination !== "grand-canyon") return false;
  if (f.departure === SOUTH_RIM) return false;
  if (f.landing == null || f.landing === "Location not stated") return false;
  if (NON_CANYON_LANDING_LABELS.has(f.landing)) return false;
  return true;
}
