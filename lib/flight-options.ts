import type { Flight, FlightOption } from "@/data/flights";

/** One comparable price: a flight length at its lowest price for one listing. */
export type PricePoint = {
  flight: Flight;
  minutes: number | null;
  price: number | null;
  transfers: boolean;
  private: boolean;
  perGroup: boolean;
  landmarks: string[];
  /** Listing sells more options than this one (shown so the price isn't mistaken for all of them). */
  optionCount: number;
};

function cheapest<T extends { price: number | null }>(items: T[]): T | undefined {
  return [...items].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))[0];
}

export function isPrivatePoint(point: PricePoint): boolean {
  return point.private || point.flight.cabin === "private";
}

/**
 * Flight-only price per flight length for a listing. Options with transfers are used only for
 * lengths that have no flight-only option, and are flagged.
 */
export function pricePoints(flight: Flight): PricePoint[] {
  const priced = (flight.options ?? []).filter((o) => o.price != null && o.minutes != null);
  const optionCount = flight.options?.length ?? 1;
  if (priced.length === 0) {
    return [
      {
        flight,
        minutes: flight.durationMinutes,
        price: flight.priceFrom,
        transfers: false,
        private: false,
        perGroup: false,
        landmarks: [],
        optionCount,
      },
    ];
  }
  const byKey = new Map<string, FlightOption[]>();
  for (const o of priced) {
    const key = `${o.minutes}-${o.private}`;
    byKey.set(key, [...(byKey.get(key) ?? []), o]);
  }
  return [...byKey.values()].map((group) => {
    const option = cheapest(group.filter((o) => !o.transfers)) ?? cheapest(group)!;
    return {
      flight,
      minutes: option.minutes,
      price: option.price,
      transfers: option.transfers,
      private: option.private,
      perGroup: option.perGroup,
      landmarks: group.flatMap((o) => o.landmarks).filter((l, i, all) => all.indexOf(l) === i),
      optionCount,
    };
  });
}

export function pricePerMinute(point: Pick<PricePoint, "price" | "minutes">): number | null {
  return point.price != null && point.minutes ? point.price / point.minutes : null;
}

export function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** Typical extra cost of hotel transfers, from listings selling the same length with and without. */
export function typicalTransferCost(flights: Flight[]): number | null {
  const diffs: number[] = [];
  for (const f of flights) {
    const options = (f.options ?? []).filter((o) => o.price != null && o.minutes != null && !o.private);
    for (const minutes of new Set(options.map((o) => o.minutes))) {
      const same = options.filter((o) => o.minutes === minutes);
      const without = cheapest(same.filter((o) => !o.transfers));
      const withTransfers = cheapest(same.filter((o) => o.transfers));
      if (without?.price != null && withTransfers?.price != null && withTransfers.price > without.price) {
        diffs.push(withTransfers.price - without.price);
      }
    }
  }
  return median(diffs);
}

/**
 * Cheapest option that covers a landmark. `perOption` is false when the option doesn't describe
 * its own route and the listing-level route is relied on instead.
 */
export function cheapestCovering(
  flight: Flight,
  landmark: string,
): { point: PricePoint; perOption: boolean } | null {
  const points = pricePoints(flight).filter((p) => !isPrivatePoint(p) || flight.cabin === "private");
  const covering = cheapest(points.filter((p) => p.landmarks.includes(landmark)));
  if (covering) return { point: covering, perOption: true };
  if (!flight.landmarks?.includes(landmark)) return null;
  const undescribed = cheapest(points.filter((p) => p.landmarks.length === 0));
  return undescribed ? { point: undescribed, perOption: false } : null;
}
