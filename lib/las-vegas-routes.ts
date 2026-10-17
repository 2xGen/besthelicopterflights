import type { Flight } from "@/data/flights";

export function isStripFlight(f: Flight): boolean {
  return f.destination === "las-vegas" && /\bstrip\b/i.test(f.title);
}

export function isRedRockFlight(f: Flight): boolean {
  return f.destination === "las-vegas" && /red rock/i.test(f.title);
}

export function isHooverDamFlight(f: Flight): boolean {
  return f.destination === "las-vegas" && /hoover dam/i.test(f.title);
}

export function isValleyOfFireFlight(f: Flight): boolean {
  return f.destination === "las-vegas" && /valley of fire/i.test(f.title);
}

/** Desert landing experiences (Red Rock, Valley of Fire, etc.) — not generic Strip air-only flights. */
export function isLasVegasLandingTour(f: Flight): boolean {
  if (f.destination !== "las-vegas") return false;
  if (/air[- ]only|no landing/i.test(f.title)) return false;
  if (f.landing != null && f.landing !== "Location not stated") return true;
  return f.kind === "landing";
}
