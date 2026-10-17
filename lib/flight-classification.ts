export type FlightKind = "scenic" | "night" | "landing" | "transfer" | "package" | "day-trip";

/** Kinds that compete in sightseeing results, quick picks and "longest flight" style labels. */
export const SIGHTSEEING_KINDS: readonly FlightKind[] = ["scenic", "night", "landing"];

const HELICOPTER_WORDS = /helicop|\bheli\b|chopper|flight of the angels/i;
// Titles with none of these (e.g. "Cape Point & Penguins from Cape Town") are ground tours with a flight add-on.
const FLIGHT_WORDS = /helicop|\bheli|chopper|flight|\bfly|flying|aerial|\bair\b|\bsky/i;
const NON_HELICOPTER = /balloon|yacht|gyrocopter|gyroplane|cruise|seaplane|airplane|\bplane\b|microlight|paraglid|skydiv|zip ?line/i;

const TRANSFER = /airport|helicopter transfer|heli[- ]?taxi|shuttle|transfer (?:to|from|between)/i;
const PACKAGE =
  /proposal|engagement|wedding|dinner|\bdate\b|picnic|\bspa\b|golf|race ?car|driving experience|shopping|vineyard|winery|\bwine\b|tasting|food|desert safari|game (?:drive|viewing)|aquarium|observat|\bdeck\b|lunch|breakfast|brunch|combo|\b(?:speed ?)?boat\b|ranch|raft|kayak|\bcave\b|museum|admission|guided (?:tour|walk)|walking tour|\bcruise\b|\bsharks?\b|cage div|big (?:five|5)\b|\bland,? sea\b|gocar|\bby (?:luxury )?(?:car|van|vehicle|bus|coach|ground)\b/i;
// "Helicopter Tour and Boulders Beach Penguins Tour": a second, separate activity.
const SECOND_ACTIVITY =
  /heli\w*\s+(?:tour|flight|ride)s?\s+(?:and|&|\+|with)\s+.*\b(?:tour|visit|excursion|experience)\b/i;
const DAY_TRIP = /day trip|full[- ]day|half[- ]day|\d+[- ]days?\b|excursion|getaway|overnight|olympic|insider tour/i;
const LANDING = /landing|lands (?:on|at|in)|touch ?down|canyon floor/i;
// "with Optional Dinner" / "with Free Boat Cruise" are add-ons, not what the product is.
const OPTIONAL_EXTRA = /\b(?:optional|complimentary|free)\s+\S+(?:\s+\S+)?/gi;
const NIGHT = /night|after[- ]dark|city lights|evening/i;

/**
 * Viator's helicopter tag also covers balloons, yachts and multi-activity packages, and its
 * duration is the whole activity. Kind is read from the title only: descriptions routinely
 * mention hotel transfers and add-ons that don't describe the product itself.
 * Returns null for products that aren't helicopter experiences.
 */
export function classifyProduct(
  fullTitle: string,
  { verifiedHelicopter = false }: { verifiedHelicopter?: boolean } = {},
): FlightKind | null {
  const title = fullTitle.replace(OPTIONAL_EXTRA, "");
  if (!verifiedHelicopter) {
    if (!HELICOPTER_WORDS.test(fullTitle) && NON_HELICOPTER.test(fullTitle)) return null;
    if (!FLIGHT_WORDS.test(title)) return "package";
  }
  if (TRANSFER.test(title)) return "transfer";
  if (PACKAGE.test(title) || SECOND_ACTIVITY.test(title)) return "package";
  if (DAY_TRIP.test(title)) return "day-trip";
  if (LANDING.test(title)) {
    if (
      /valley of fire/i.test(title) &&
      !/canyon floor|below the (?:canyon )?rim|bottom of the canyon|private bluff|grand canyon west/i.test(
        title,
      )
    ) {
      return NIGHT.test(title) ? "night" : "scenic";
    }
    return "landing";
  }
  if (NIGHT.test(title)) return "night";
  return "scenic";
}

// "Private transportation" or "private guide" describe the ground part, not the helicopter.
const PRIVATE_FLIGHT =
  /\bprivate\b(?!\s+(?:[\w-]+\s+){0,2}(?:transfers?|transport\w*|pick ?-?ups?|car|vehicle|guide|driver|lunch|walk\w*))|exclusive (?:use|helicopter|flight|charter)|to yourselves|whole (?:helicopter|aircraft)/i;

/**
 * Viator's private flag means only your group takes part, which on resold flights can cover just
 * the transfer. A flight counts as private only when the listing says so about the flight.
 */
export function statesPrivateFlight(text: string): boolean {
  return PRIVATE_FLIGHT.test(text);
}

export type MinuteRange = { from: number; to: number };

function plausible(range: MinuteRange): MinuteRange | null {
  return range.from >= 5 && range.to <= 180 && range.from <= range.to ? range : null;
}

const TITLE_RANGE = /(\d{1,3})\s*(?:-|–|to)\s*(\d{1,3})[\s-]*min/i;
const TITLE_SINGLE = /(\d{1,3})[\s-]*(?:minutes?|mins?)\b/i;
const DESCRIPTION_FLIGHT =
  /(\d{1,3})(?:\s*(?:-|–|to)\s*(\d{1,3}))?[\s-]*(?:minutes?|mins?)\s+(?:of\s+)?(?:scenic\s+|private\s+|shared\s+)?(?:helicopter\s+)?(?:flight|ride|tour|flying|airtime|in the air)/i;

const EACH_WAY = /^[^\n|]{0,40}\beach way\b/i;

/** Round trips state "45-minute flight each way"; the airborne total is double. */
function stated(text: string, match: RegExpMatchArray, from: number, to: number): MinuteRange | null {
  const rest = text.slice((match.index ?? 0) + match[0].length);
  const factor = EACH_WAY.test(rest) ? 2 : 1;
  return plausible({ from: from * factor, to: to * factor });
}

/** Airborne time stated in the listing text, e.g. "12-Minute Helicopter Tour" or "20-25 Min". */
export function statedFlightMinutes(title: string, description: string): MinuteRange | null {
  const range = title.match(TITLE_RANGE);
  if (range) return stated(title, range, Number(range[1]), Number(range[2]));
  const single = title.match(TITLE_SINGLE);
  if (single) return stated(title, single, Number(single[1]), Number(single[1]));
  const desc = description.match(DESCRIPTION_FLIGHT);
  if (desc) {
    const from = Number(desc[1]);
    return stated(description, desc, from, desc[2] ? Number(desc[2]) : from);
  }
  return null;
}

/** Listings this short are the flight itself; longer ones include transfers, check-in or add-ons. */
export const LISTING_IS_FLIGHT_MAX_MINUTES = 45;

export function formatMinuteRange(range: MinuteRange): string {
  return range.from === range.to ? `${range.from} min` : `${range.from}–${range.to} min`;
}

function formatHours(minutes: number): string {
  const hours = minutes / 60;
  return Number.isInteger(hours) ? `${hours} hr` : `${hours.toFixed(1)} hr`;
}

export function formatActivityDuration(range: MinuteRange): string {
  if (range.to < 90) return formatMinuteRange(range);
  return range.from === range.to
    ? formatHours(range.from)
    : `${formatHours(range.from).replace(" hr", "")}–${formatHours(range.to)}`;
}
