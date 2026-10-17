import type { DestinationSlug } from "@/data/destinations";
import { isSightseeing, type Flight, type FlightSearchParams } from "@/data/flights";
import { isVerifiedGrandCanyonLanding } from "@/lib/grand-canyon-landings";

export { isVerifiedGrandCanyonLanding, NON_CANYON_LANDING_LABELS } from "@/lib/grand-canyon-landings";

/** Below this many matching flights a category page is noindexed (it stays a useful filter view). */
export const MIN_INDEXABLE_CATEGORY_FLIGHTS = 3;

export type CategoryView =
  | "list"
  | "prices"
  | "operators"
  | "landmark"
  | "duration-compare"
  | "landing";

export type DurationBucket = { label: string; min: number; max: number; suits: string[] };

export type DestinationCategory = {
  destination: DestinationSlug;
  slug: string;
  navLabel: string;
  /** Set to false to keep the page as a noindexed filter view and out of the sitemap. */
  indexable?: boolean;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  intro: string[];
  view: CategoryView;
  /** Applied to sightseeing flights; omit to include all of them. */
  match?: (flight: Flight) => boolean;
  sort?: FlightSearchParams["sort"];
  /** Departure-based category: compares price per minute against the other departure point. */
  departureFocus?: { label: string; name: string; otherName: string };
  /** Prices view: flight-time bands (minutes, max exclusive). Defaults suit 15–60 minute flights. */
  priceBands?: Array<{ label: string; min: number; max?: number }>;
  /** Prices view heading; defaults to "Prices by trip type" / "Prices by flight time". */
  priceHeading?: string;
  /** Prices view: group by trip type instead of flight time (first match wins). */
  priceGroups?: Array<{ label: string; note?: string; match: (flight: Flight) => boolean }>;
  /** Landing view: the air-only flights landing flights are compared against. */
  landingCompare?: { label: string; match: (flight: Flight) => boolean };
  /**
   * Landmark view: the landmark the page is about, plus nearby landmarks to show coverage for.
   * `phrase` completes "N of M flights …" (default "include {name}"); `compareWith` adds a price
   * comparison against another group of flights.
   */
  landmarkFocus?: {
    name: string;
    also: string[];
    phrase?: string;
    label?: string;
    compareWith?: { label: string; match: (flight: Flight) => boolean };
  };
  /** Non-sightseeing listings (packages, day trips) shown separately below the flights. */
  packages?: { heading: string; intro: string; match: (flight: Flight) => boolean };
  /** Duration-compare view: the two flight-time groups compared side by side. */
  durationCompare?: { short: DurationBucket; long: DurationBucket };
  tips: Array<{ title: string; body: string }>;
  faqs: Array<{ q: string; a: string }>;
};

/** First pill in a destination's category nav; defaults to "All flights". */
export const categoryNavAllLabel: Partial<Record<DestinationSlug, string>> = {
  dubai: "All Dubai",
  "grand-canyon": "All Grand Canyon",
  "las-vegas": "All Las Vegas",
  "cape-town": "All Cape Town",
  "victoria-falls": "All Flights",
};

/** Cross-link at the end of a destination's category nav, for destinations that share inventory. */
export const categoryNavRelated: Partial<Record<DestinationSlug, { href: string; label: string }>> = {
  "grand-canyon": { href: "/las-vegas", label: "Las Vegas Strip flights →" },
  "las-vegas": {
    href: "/grand-canyon/helicopter-tours-from-las-vegas",
    label: "Grand Canyon from Vegas →",
  },
};

/** Landmarks detected in published route text (title, itinerary, option and tour descriptions). */
export const landmarkRules: Partial<Record<DestinationSlug, Array<{ name: string; pattern: RegExp }>>> = {
  dubai: [
    { name: "Palm Jumeirah", pattern: /palm jumeirah|\bthe palm\b|palm island/i },
    { name: "Atlantis", pattern: /atlantis/i },
    { name: "Burj Al Arab", pattern: /burj al arab|bur al arab/i },
    { name: "Burj Khalifa", pattern: /burj khalifa/i },
    { name: "The World Islands", pattern: /world islands/i },
    { name: "Dubai Marina", pattern: /\bmarina\b/i },
    { name: "Ain Dubai", pattern: /ain dubai|bluewaters/i },
    { name: "Dubai Creek", pattern: /dubai creek|old dubai|deira/i },
    { name: "Dubai Frame", pattern: /dubai frame/i },
  ],
  "cape-town": [
    { name: "Robben Island", pattern: /robben island/i },
    { name: "Table Mountain", pattern: /table mountain/i },
    { name: "Lion's Head", pattern: /lion[’']?s head/i },
    {
      name: "Atlantic Seaboard",
      pattern: /atlantic (?:sea ?board|coast)|atlantico|clifton|camps bay|sea point|twelve apostles|12 apostles|hout bay/i,
    },
    { name: "Clifton & Camps Bay", pattern: /clifton|camps bay/i },
    { name: "Twelve Apostles", pattern: /twelve apostles|12 apostles/i },
    { name: "Hout Bay", pattern: /hout bay/i },
    { name: "Chapman's Peak", pattern: /chapman[’']?s peak/i },
    { name: "Two Oceans", pattern: /two oceans|false bay|indian ocean|half peninsula|muizenberg|sun valley/i },
    { name: "Cape Point", pattern: /cape point|cape of good hope|full peninsula/i },
    { name: "Boulders Beach", pattern: /boulders/i },
  ],
  "victoria-falls": [
    { name: "Batoka Gorge", pattern: /batoka|gorges?\b/i },
    { name: "Upper Zambezi islands", pattern: /upper zambezi|long island|upstream|islands? (?:of|on|in) the (?:upper )?zambezi/i },
    { name: "Zambezi National Park", pattern: /zambezi national park|national park|game (?:flight|viewing|park)|\bgame\b/i },
    { name: "Wildlife spotting", pattern: /wildlife|elephants?|buffalo|hippos?|giraffes?|crocodiles?/i },
    { name: "Livingstone Island", pattern: /livingstone island/i },
  ],
};

export type CapeTownRoute = "cape-point" | "two-oceans" | "robben-island" | "atlantic";

const CAPE_POINT_TITLE = /cape point|cape of good hope|full peninsula/i;
const TWO_OCEANS_TITLE = /two oceans|half peninsula/i;
const ATLANTIC_TITLE = /atlantic|atlantico|camps bay|hout bay|clifton|twelve apostles|12 apostles/i;

/**
 * Furthest route a Cape Town flight covers. The title decides first: some descriptions are copied
 * from another route (an "Atlantic Coast to Hout Bay" listing describing a Two Oceans flight).
 */
export function capeTownRoute(flight: Pick<Flight, "title" | "landmarks">): CapeTownRoute | null {
  const t = flight.title;
  if (CAPE_POINT_TITLE.test(t)) return "cape-point";
  if (TWO_OCEANS_TITLE.test(t)) return "two-oceans";
  if (/robben island/i.test(t)) return "robben-island";
  if (ATLANTIC_TITLE.test(t)) return "atlantic";
  const l = flight.landmarks ?? [];
  if (l.includes("Cape Point")) return "cape-point";
  if (l.includes("Two Oceans")) return "two-oceans";
  if (l.includes("Atlantic Seaboard")) return "atlantic";
  return null;
}

const ROBBEN_TITLE = /robben island/i;

/** Flight lengths a listing sells: each option's stated minutes, else the listing's flight time. */
function flightMinutes(f: Flight): number[] {
  const options = (f.options ?? []).map((o) => o.minutes).filter((m): m is number => m != null);
  return options.length ? options : f.durationMinutes != null ? [f.durationMinutes] : [];
}

const SHORT_FLIGHT_MAX = 15;

const ZIMBABWE_DEPARTURE_LABEL = "Departs Zimbabwe (Victoria Falls)";
const ZAMBIA_DEPARTURE_LABEL = "Departs Zambia (Livingstone)";

/** Departure labels detected from listing title, description and meeting-point text. */
export const departureRules: Partial<Record<DestinationSlug, Array<{ pattern: RegExp; label: string }>>> = {
  "new-york": [
    { pattern: /new jersey|\bnj\b|kearny|linden|jersey city|meadowlands|weehawken/i, label: "Departs New Jersey" },
    {
      pattern: /downtown manhattan heliport|pier 6|east river|staten island ferry|wall street|financial district|west 30th/i,
      label: "Departs Manhattan",
    },
  ],
  "grand-canyon": [
    { pattern: /las vegas|boulder city|henderson|\bthe strip\b/i, label: "Departs Las Vegas" },
    { pattern: /tusayan|grand canyon (?:national park )?airport|south rim/i, label: "Departs South Rim (Tusayan)" },
    { pattern: /western ranch|grand canyon west airport/i, label: "Departs Grand Canyon West" },
  ],
  "victoria-falls": [
    {
      pattern: /depart\w*[^.]{0,30}(?:livingstone|zambia)|livingstone (?:hotels?|accommodation|helipad)|baobab ridge|\(zambia\)/i,
      label: ZAMBIA_DEPARTURE_LABEL,
    },
    {
      pattern:
        /\(zimbabwe\)|-zimbabwe|zimbabwean side|victoria falls,? zimbabwe|zimbabwe accommodation|victoria falls (?:town|hotels)|within victoria falls|elephant hills/i,
      label: ZIMBABWE_DEPARTURE_LABEL,
    },
  ],
};

export const NEW_JERSEY_DEPARTURE = "Departs New Jersey";
export const LAS_VEGAS_DEPARTURE = "Departs Las Vegas";
export const SOUTH_RIM_DEPARTURE = "Departs South Rim (Tusayan)";

/** Landing locations, checked in order; used only when the listing describes a landing. */
export const landingRules: Partial<Record<DestinationSlug, Array<{ name: string; pattern: RegExp }>>> = {
  "grand-canyon": [
    {
      name: "Below the rim",
      pattern: /canyon floor|below the (?:canyon )?rim|bottom of the canyon|\d,?\d{3} (?:feet|ft) (?:below|down)/i,
    },
    { name: "Bluff below the rim", pattern: /\bbluff\b/i },
    { name: "Western ranch", pattern: /western ranch/i },
    /** Checked last — some Las Vegas-area tours land at Valley of Fire, not in the canyon. */
    { name: "Valley of Fire", pattern: /valley of fire/i },
  ],
  "las-vegas": [
    { name: "Red Rock Canyon overlook", pattern: /red rock/i },
    { name: "Valley of Fire", pattern: /valley of fire/i },
  ],
};

export const LANDING_TEXT =
  /\blanding\b(?! (?:back|at the airport))|\blands? (?:on|at|in|below)(?! the airport)|touch(?:es)? down|descend[^.]{0,60}below the rim|\bpicnic\b/i;

export const destinationCategories: DestinationCategory[] = [
  {
    destination: "new-york",
    slug: "night-helicopter-tours",
    navLabel: "Night flights",
    metaTitle: "NYC Night Helicopter Tours (2026): Compare Night & Sunset Flights",
    metaDescription:
      "Compare New York night and sunset helicopter tours: departure heliports, flight times, private or shared flights and prices, side by side.",
    keywords: [
      "nyc night helicopter tour",
      "new york helicopter tour at night",
      "night helicopter tour nyc",
      "sunset helicopter tour nyc",
      "manhattan night helicopter flight",
    ],
    eyebrow: "New York City · Night flights",
    h1: "NYC Night & Sunset Helicopter Tours: Compared",
    intro: [
      "Night and sunset flights show Manhattan at its most dramatic: the skyline lit up, the bridges traced in lights and the Statue of Liberty floodlit against the harbor.",
      "Below we compare every night and sunset helicopter flight currently listed for New York by flight time, departure point, cabin type, rating and price.",
    ],
    view: "list",
    match: (f) => f.kind === "night" || /sunset|twilight|golden hour/i.test(f.title),
    sort: "rating-desc",
    tips: [
      {
        title: "Sunset or after dark?",
        body: "Sunset flights are timed around sunset, so you see the city change from daylight to lights in one flight. Night flights depart after dark for the full lit-up skyline. Both shift with the season, so check departure times for your date.",
      },
      {
        title: "Check the departure heliport",
        body: "Many night and sunset flights depart New Jersey rather than Manhattan. Factor the travel time from your hotel into the evening.",
      },
      {
        title: "Getting better night photos",
        body: "Window reflections are the main problem at night. Dark clothing and holding your phone close to the glass reduce glare noticeably.",
      },
    ],
    faqs: [
      {
        q: "Are night helicopter tours in NYC worth it?",
        a: "If seeing the skyline lit up is the goal, yes — it’s a very different view from a daytime flight. If you want the clearest views of landmarks and photos without reflections, a daytime or sunset flight is the safer choice.",
      },
      {
        q: "How long are NYC night helicopter tours?",
        a: "Most night and sunset flights in current listings are around 20–40 minutes in the air. Each flight above shows its stated flight time.",
      },
      {
        q: "Where do NYC night helicopter tours depart from?",
        a: "Most night and sunset flights depart heliports in New Jersey. The listing shows the exact meeting point.",
      },
    ],
  },
  {
    destination: "new-york",
    slug: "private-helicopter-tours",
    navLabel: "Private",
    metaTitle: "Private Helicopter Tours NYC (2026): Compare Private Flights",
    metaDescription:
      "Compare private New York helicopter tours over Manhattan: flight times, departure points, ratings and prices for private sightseeing flights and charters.",
    keywords: [
      "private helicopter tour nyc",
      "private helicopter tour new york",
      "private helicopter ride manhattan",
      "nyc private helicopter charter",
    ],
    eyebrow: "New York City · Private flights",
    h1: "Private Helicopter Tours in New York: Compared",
    intro: [
      "A private helicopter tour gives your group the whole aircraft: no strangers in the next seat, more say over timing and the best chance of a window for everyone.",
      "We list private sightseeing flights only here. Proposals, transfers and full-day private trips are excluded so the comparison stays like for like.",
    ],
    view: "list",
    match: (f) => f.cabin === "private",
    sort: "price-asc",
    tips: [
      {
        title: "Per person or per aircraft?",
        body: "Private flights are often priced for the whole aircraft rather than per person. Check the booking page — for a group, a private flight can cost less per head than it first appears.",
      },
      {
        title: "Shared flights can be the better value",
        body: "If you’re traveling alone or as a couple, a shared flight covers the same skyline route for a fraction of the price.",
      },
      {
        title: "Special occasions",
        body: "Proposal and celebration packages are listed separately on the main New York page under ‘also show day trips and packages’.",
      },
    ],
    faqs: [
      {
        q: "How much is a private helicopter tour in NYC?",
        a: "Private sightseeing flights in current listings start from a few thousand dollars per aircraft, depending on flight length and departure point. Each flight above shows its current from-price.",
      },
      {
        q: "Is a private NYC helicopter tour worth it?",
        a: "For couples celebrating, families or groups that would fill most of the seats, often yes. For solo travelers, shared flights are far cheaper per person.",
      },
      {
        q: "Can I choose the route on a private flight?",
        a: "Private flights follow set routes in the same airspace as shared tours, but you get the aircraft to yourselves. Ask the operator about options when booking.",
      },
    ],
  },
  {
    destination: "new-york",
    slug: "helicopter-tour-prices",
    navLabel: "Prices",
    metaTitle: "NYC Helicopter Tour Prices (2026): Compare Costs by Flight Time",
    metaDescription:
      "How much is a helicopter tour in New York? Compare NYC helicopter tour prices by flight time, departure point and private or shared flight, including price per minute.",
    keywords: [
      "nyc helicopter tour price",
      "new york helicopter tour cost",
      "how much is a helicopter tour in nyc",
      "cheap helicopter tour nyc",
      "manhattan helicopter tour price",
    ],
    eyebrow: "New York City · Prices",
    h1: "NYC Helicopter Tour Prices: What a Flight Costs",
    intro: [
      "New York helicopter tour prices depend mostly on how long you’re in the air, where you depart from and whether the flight is shared or private.",
      "The tables below use current from-prices for every sightseeing flight we compare, grouped by flight time, with the price per minute of flying so you can compare value fairly.",
    ],
    view: "prices",
    sort: "price-asc",
    tips: [
      {
        title: "Compare price per minute",
        body: "A cheaper flight isn’t always better value. A 12-minute flight and a 30-minute flight can differ by far less than the extra flying time suggests.",
      },
      {
        title: "Look for extra fees",
        body: "Some NYC tours add a heliport or fuel fee payable on the day. Check the exclusions on the booking page before comparing totals.",
      },
      {
        title: "Shared vs private",
        body: "Private flights are usually priced for the whole aircraft, so compare them per person for your group size.",
      },
    ],
    faqs: [
      {
        q: "How much is a helicopter tour in New York?",
        a: "Shared sightseeing flights in current listings start at a few hundred dollars per person, rising with flight time. Private flights cost considerably more but are often priced for the whole aircraft.",
      },
      {
        q: "What is the cheapest helicopter tour in NYC?",
        a: "The cheapest options are usually the shortest shared flights. The table above is sorted by price within each flight-time group.",
      },
      {
        q: "Are there extra fees on NYC helicopter tours?",
        a: "Some tours charge a heliport or fuel fee on top of the ticket price. The booking page lists what’s included and excluded.",
      },
    ],
  },
  {
    destination: "new-york",
    slug: "helicopter-tours-from-new-jersey",
    navLabel: "From New Jersey",
    metaTitle: "NYC Helicopter Tours from New Jersey (2026): Compare Flights",
    metaDescription:
      "Compare New York helicopter tours departing New Jersey: Manhattan skyline and night flights from Kearny and Linden, with flight times and prices.",
    keywords: [
      "helicopter tour from new jersey",
      "nyc helicopter tour from nj",
      "kearny helicopter tour",
      "linden helicopter tour",
      "new jersey helicopter ride manhattan",
    ],
    eyebrow: "New York City · New Jersey departures",
    h1: "NYC Helicopter Tours from New Jersey: Compared",
    intro: [
      "Many Manhattan skyline flights don’t depart Manhattan at all: they leave from heliports in New Jersey, across the Hudson River.",
      "Below we compare every New York sightseeing flight with a New Jersey departure by flight time, cabin type, rating and price — and how they stack up against Manhattan departures.",
    ],
    view: "list",
    match: (f) => f.departure === NEW_JERSEY_DEPARTURE,
    sort: "rating-desc",
    departureFocus: { label: NEW_JERSEY_DEPARTURE, name: "New Jersey", otherName: "Manhattan" },
    tips: [
      {
        title: "Why fly from New Jersey?",
        body: "New Jersey departures may suit travelers who want night or sunset flights or longer skyline routes. Compare ground travel time from Manhattan against the convenience of a Downtown Manhattan heliport.",
      },
      {
        title: "Plan the journey",
        body: "Heliports in Kearny and Linden are outside Manhattan. Check the meeting point and allow time for a taxi, rideshare or train before check-in.",
      },
      {
        title: "Same skyline, different start",
        body: "Flights still cross the Hudson to the Statue of Liberty and Manhattan — the departure point mostly changes the journey to the heliport, not the views.",
      },
    ],
    faqs: [
      {
        q: "Do New Jersey helicopter tours fly over Manhattan?",
        a: "Yes. Tours departing New Jersey cross the Hudson River for views of the Statue of Liberty and the Manhattan skyline.",
      },
      {
        q: "How do I get to a New Jersey helicopter tour from Manhattan?",
        a: "Most travelers use a taxi or rideshare; some heliports are reachable by train plus a short ride. The booking page shows the exact address.",
      },
      {
        q: "Are New Jersey helicopter tours open on Sundays?",
        a: "Schedules vary by heliport and operator. Check the booking calendar for your date rather than assuming the same days apply as Manhattan departures.",
      },
    ],
  },
  {
    destination: "new-york",
    slug: "helicopter-tour-operators",
    navLabel: "Operators",
    metaTitle: "NYC Helicopter Tour Operators (2026): Compare Companies",
    metaDescription:
      "Compare New York helicopter tour companies side by side: number of flights, departure points, flight times, ratings, review volume and prices.",
    keywords: [
      "nyc helicopter tour companies",
      "best helicopter tour company nyc",
      "new york helicopter operators",
      "manhattan helicopter tour companies",
    ],
    eyebrow: "New York City · Operators",
    h1: "New York Helicopter Tour Operators: Compared",
    intro: [
      "Several companies run sightseeing flights over Manhattan, from the Downtown Manhattan Heliport and from New Jersey.",
      "We group every New York sightseeing flight we compare by operator, so you can see each company’s departure points, flight times, prices and traveler ratings at a glance.",
    ],
    view: "operators",
    tips: [
      {
        title: "Ratings need volume",
        body: "We rank operators by review-weighted ratings, so a company with hundreds of strong reviews ranks above one with a perfect score from a handful.",
      },
      {
        title: "Same operator, different products",
        body: "Operators often sell the same route at several lengths or as shared and private versions. Compare flight time and price within each operator.",
      },
      {
        title: "We don’t rate safety",
        body: "Operator rankings reflect listing data and traveler reviews, not an independent safety audit.",
      },
    ],
    faqs: [
      {
        q: "Which helicopter tour company is best in NYC?",
        a: "It depends on your departure point, budget and flight length. The comparison above ranks operators by review-weighted ratings and shows each company’s flights and prices.",
      },
      {
        q: "Do all NYC helicopter tours depart from Manhattan?",
        a: "No. Some operators fly from the Downtown Manhattan Heliport, others from New Jersey. Each operator’s departure points are listed above.",
      },
    ],
  },
  {
    destination: "dubai",
    slug: "helicopter-tour-prices",
    navLabel: "Prices",
    metaTitle: "Dubai Helicopter Tour Prices (2026): Compare Flights & Costs",
    metaDescription:
      "How much is a helicopter tour in Dubai? Compare live prices for 12, 17, 22, 25 and 30-minute flights, price per minute and what hotel transfers add.",
    keywords: [
      "dubai helicopter tour price",
      "dubai helicopter ride cost",
      "how much is a helicopter tour in dubai",
      "cheap helicopter tour dubai",
      "12 minute helicopter tour dubai price",
    ],
    eyebrow: "Dubai · Prices",
    h1: "Dubai Helicopter Tour Prices: Compare Flights & Costs",
    intro: [
      "Most Dubai helicopter listings sell several flight lengths — often 12, 17, 22, 25 or 30 minutes — and the advertised from-price only applies to the shortest one.",
      "We compare the price of each flight-time option separately, flight only, so a 25-minute flight is never shown at a 12-minute price. Hotel transfers are compared on their own.",
    ],
    view: "prices",
    sort: "price-asc",
    priceBands: [
      { label: "Under 15 min", min: 0, max: 15 },
      { label: "15–19 min", min: 15, max: 20 },
      { label: "20–29 min", min: 20, max: 30 },
      { label: "30 min or longer", min: 30 },
    ],
    tips: [
      {
        title: "The from-price is the shortest flight",
        body: "A listing ‘from $200’ usually means its 12-minute option. Choose your flight length on the booking page to see the price that applies to you.",
      },
      {
        title: "Transfers are an extra",
        body: "Many listings offer the same flight with or without hotel pickup. If you can get to the helipad yourself, the flight-only option is cheaper.",
      },
      {
        title: "Same flight, different sellers",
        body: "Several tour companies resell flights from the same helicopter operator under generic titles. Compare flight time, transfers and price rather than the listing name.",
      },
    ],
    faqs: [
      {
        q: "How much is a helicopter tour in Dubai?",
        a: "Shared 12-minute flights in current listings start at around $200 per person. Longer 22–25 minute flights cost roughly double. The tables above show live prices for each flight length.",
      },
      {
        q: "What is the cheapest helicopter ride in Dubai?",
        a: "The shortest shared flight, usually 12 minutes, booked without hotel transfers. The ‘Under 15 min’ table lists every current option from cheapest.",
      },
      {
        q: "Are hotel transfers included?",
        a: "Sometimes. Some listings include pickup, others offer it as a separate option at a higher price. Each row shows whether the price includes transfers.",
      },
      {
        q: "Is the price per person?",
        a: "Shared flights are priced per person. Private flights are listed separately because they are usually priced for the whole helicopter.",
      },
    ],
  },
  {
    destination: "dubai",
    slug: "palm-jumeirah-helicopter-tours",
    navLabel: "Palm Jumeirah",
    metaTitle: "Palm Jumeirah Helicopter Tours (2026): Compare Scenic Flights",
    metaDescription:
      "Compare Dubai helicopter tours whose published route includes Palm Jumeirah, with Atlantis and Burj Al Arab coverage, flight times and the cheapest option for each.",
    keywords: [
      "palm jumeirah helicopter tour",
      "helicopter ride over palm jumeirah",
      "atlantis helicopter tour dubai",
      "burj al arab helicopter tour",
      "palm jumeirah helicopter price",
    ],
    eyebrow: "Dubai · Palm Jumeirah",
    h1: "Palm Jumeirah Helicopter Tours: Compare Scenic Flights",
    intro: [
      "The Palm’s fronds and crescent only really make sense from the air — which is why it features on most Dubai helicopter routes, usually with Atlantis at its tip and Burj Al Arab along the coast.",
      "We only list flights whose published route names Palm Jumeirah, and show which also name Atlantis and Burj Al Arab. Where a listing describes its options separately, we show the cheapest option that covers the Palm.",
    ],
    view: "landmark",
    match: (f) => f.landmarks?.includes("Palm Jumeirah") ?? false,
    sort: "price-asc",
    landmarkFocus: { name: "Palm Jumeirah", also: ["Atlantis", "Burj Al Arab", "The World Islands"] },
    tips: [
      {
        title: "The shortest flights may skip Atlantis",
        body: "Some 12-minute routes cover the Palm’s trunk and fronds but turn back before Atlantis. If Atlantis matters, check the option’s highlights.",
      },
      {
        title: "Sit on the right side",
        body: "Seats are usually allocated at check-in. Window seats on the sea side give the best view of the Palm’s shape.",
      },
      {
        title: "Clearer air in winter",
        body: "Summer heat haze can soften views over the Gulf. Morning flights in the cooler months tend to give the sharpest views of the Palm.",
      },
    ],
    faqs: [
      {
        q: "Do all Dubai helicopter tours fly over Palm Jumeirah?",
        a: "Most do, but not all. We only list flights whose published route names Palm Jumeirah.",
      },
      {
        q: "Can you see Atlantis on a 12-minute helicopter tour?",
        a: "On some routes, yes; others turn before the tip of the Palm. The table shows which flights list Atlantis.",
      },
      {
        q: "How long is a Palm Jumeirah helicopter tour?",
        a: "Routes including the Palm typically run 12 to 30 minutes in the air. Longer options add the World Islands, Dubai Marina or Downtown.",
      },
    ],
  },
  {
    destination: "dubai",
    slug: "12-vs-25-minute-helicopter-tours",
    navLabel: "12 vs 25 minutes",
    metaTitle: "Dubai Helicopter Tours: 12 vs 25 Minutes Compared (2026)",
    metaDescription:
      "Is a 25-minute Dubai helicopter tour worth it over a 12-minute flight? Compare live prices, the extra landmarks you see and which flight suits you.",
    keywords: [
      "dubai helicopter tour 12 vs 25 minutes",
      "12 minute helicopter tour dubai",
      "25 minute helicopter tour dubai",
      "is a 25 minute helicopter tour worth it",
      "dubai helicopter tour how long",
    ],
    eyebrow: "Dubai · Flight length",
    h1: "Dubai Helicopter Tours: 12 vs 25 Minutes Compared",
    intro: [
      "The most common choice when booking a Dubai helicopter flight is how long to fly. The 12-minute flight covers the coastline icons; 22–25 minute flights add more of the city.",
      "Below we compare both side by side using live prices for each flight-time option, flight only, including what the longer flights add to the route.",
    ],
    view: "duration-compare",
    durationCompare: {
      short: {
        label: "12 minutes",
        min: 12,
        max: 12,
        suits: [
          "A first helicopter flight on a budget",
          "Seeing Burj Al Arab and the Palm in one hop",
          "Short stays with a packed schedule",
        ],
      },
      long: {
        label: "22–25 minutes",
        min: 22,
        max: 25,
        suits: [
          "Photographers wanting time to frame shots",
          "Seeing the World Islands, Marina and Downtown too",
          "Special occasions where the flight is the highlight",
        ],
      },
    },
    tips: [
      {
        title: "Most of the extra time is new sights",
        body: "Longer routes don’t just fly slower: they continue to areas the 12-minute flight skips, typically the World Islands, Dubai Marina or Downtown.",
      },
      {
        title: "Price per minute stays similar",
        body: "In Dubai, longer flights cost roughly the same per minute in the air as the 12-minute flight, so you pay for the extra sights rather than getting a bulk discount.",
      },
      {
        title: "Check-in takes longer than the flight",
        body: "Whatever you book, plan for check-in and a safety briefing on top of the flight time.",
      },
    ],
    faqs: [
      {
        q: "Is a 12-minute helicopter tour in Dubai worth it?",
        a: "For most first-timers, yes: it covers the classic coastline sights like Burj Al Arab and the Palm. If you want more of the city or time for photos, a longer flight is better value per minute.",
      },
      {
        q: "What do you see on a 25-minute Dubai helicopter tour?",
        a: "Routes vary by listing, but longer flights typically add the World Islands, Dubai Marina and Downtown to the coastline sights. Each comparison card lists what the longer option adds.",
      },
      {
        q: "How much more does a 25-minute flight cost?",
        a: "In current listings the longer flight typically costs about twice the 12-minute price. The cards above show the step-up for each listing.",
      },
    ],
  },
  {
    destination: "dubai",
    slug: "private-helicopter-tours",
    navLabel: "Private",
    indexable: false,
    metaTitle: "Private Helicopter Tours in Dubai (2026): Compare Flights & Prices",
    metaDescription:
      "Compare private Dubai helicopter tours: flight times, routes and prices for flights where your group has the helicopter to itself.",
    keywords: ["private helicopter tour dubai", "dubai private helicopter ride"],
    eyebrow: "Dubai · Private flights",
    h1: "Private Helicopter Tours in Dubai: Compare Flights & Prices",
    intro: [
      "Private flights give your group the whole helicopter. Few Dubai listings are clearly private today, so we list only flights the listing itself marks as private.",
    ],
    view: "list",
    match: (f) => f.cabin === "private",
    sort: "price-asc",
    tips: [
      {
        title: "Usually priced per helicopter",
        body: "Private flights are typically priced for the aircraft, so divide by your group size to compare with shared seats.",
      },
      {
        title: "Ask about the route",
        body: "Private flights usually follow the same approved routes as shared tours, but timing is more flexible.",
      },
      {
        title: "Shared can be better value",
        body: "For one or two people, a shared flight covers the same sights for far less.",
      },
    ],
    faqs: [
      {
        q: "How much is a private helicopter tour in Dubai?",
        a: "Private flights in current listings start from several hundred dollars and rise steeply with flight time. Each flight above shows its current from-price.",
      },
    ],
  },
  {
    destination: "dubai",
    slug: "helicopter-tour-operators",
    navLabel: "Operators",
    metaTitle: "Dubai Helicopter Tour Companies (2026): Compare Sellers & Flights",
    metaDescription:
      "Compare the companies selling Dubai helicopter tours: flight lengths, prices, transfers, ratings and review volume side by side.",
    keywords: [
      "dubai helicopter tour companies",
      "best helicopter tour company dubai",
      "helidubai tours",
      "dubai helicopter operators",
    ],
    eyebrow: "Dubai · Companies",
    h1: "Dubai Helicopter Tour Companies: Compared",
    intro: [
      "Dubai helicopter tours are sold by a handful of helicopter operators and many tour companies that resell their flights, often under near-identical titles like ‘Helicopter Tour in Dubai’.",
      "We group every Dubai sightseeing flight we compare by the company selling it, so you can compare flight lengths, prices and traveler ratings — and spot overlapping offers.",
    ],
    view: "operators",
    tips: [
      {
        title: "Resellers vs operators",
        body: "A tour company may sell the same flight as the operator, sometimes bundled with transfers. Compare flight time and what’s included, not the listing name.",
      },
      {
        title: "Ratings need volume",
        body: "We rank by review-weighted ratings, so a company with hundreds of reviews ranks above one with a perfect score from a handful.",
      },
      {
        title: "We don’t rate safety",
        body: "Rankings reflect listing data and traveler reviews, not an independent safety audit.",
      },
    ],
    faqs: [
      {
        q: "Which company is best for a helicopter tour in Dubai?",
        a: "It depends on flight length, transfers and budget. The comparison above ranks companies by review-weighted ratings and shows each one’s flights and prices.",
      },
      {
        q: "Why do so many Dubai listings look the same?",
        a: "Many tour companies resell flights from the same helicopter operators. The flight may be identical; transfers, price and customer service differ.",
      },
    ],
  },
  {
    destination: "grand-canyon",
    slug: "helicopter-tours-from-las-vegas",
    navLabel: "From Las Vegas",
    metaTitle: "Grand Canyon Helicopter Tours from Las Vegas (2026) – Compare",
    metaDescription:
      "Compare Grand Canyon helicopter tours from Las Vegas: West Rim air-only flights, canyon landings and sunset tours, with time in the air, total trip length, ratings and prices.",
    keywords: [
      "grand canyon helicopter tour from las vegas",
      "las vegas to grand canyon helicopter",
      "west rim helicopter tour from las vegas",
      "grand canyon helicopter tour with hotel pickup",
    ],
    eyebrow: "Grand Canyon · From Las Vegas",
    h1: "Grand Canyon Helicopter Tours from Las Vegas: Compared",
    intro: [
      "Helicopters from Las Vegas fly over Lake Mead and Hoover Dam to Grand Canyon West, roughly 45 minutes to an hour each way — the West Rim on Hualapai land, outside the national park.",
      "We compare every Grand Canyon sightseeing flight departing the Las Vegas area by landing, time in the air, total trip length, rating and price. Combinations with the Skywalk, boat rides or ranches are excluded so the comparison stays like for like.",
    ],
    view: "list",
    match: (f) => f.departure === LAS_VEGAS_DEPARTURE,
    sort: "rating-desc",
    tips: [
      {
        title: "Trip length isn’t flight time",
        body: "A Grand Canyon tour from Las Vegas takes 3–4.5 hours including transfers and check-in, but roughly 90 minutes to 2 hours of that is flying. We show both where the listing states them.",
      },
      {
        title: "Air-only or landing?",
        body: "Air-only flights are the quickest and cheapest way to see the canyon. Landing tours add time on the ground below the rim or on a bluff, usually with a Champagne toast.",
      },
      {
        title: "Strip or Boulder City?",
        body: "Some flights check in at Boulder City, 40–50 minutes’ drive from the Strip. Check whether hotel transport is included.",
      },
    ],
    faqs: [
      {
        q: "How long is the helicopter flight from Las Vegas to the Grand Canyon?",
        a: "About 45 minutes to an hour each way. Whole tours, including hotel pickup and check-in, usually take 3–4.5 hours.",
      },
      {
        q: "Which part of the Grand Canyon do Las Vegas helicopter tours visit?",
        a: "Grand Canyon West, the West Rim. The South Rim is too far for a helicopter round trip from Las Vegas; South Rim flights depart Tusayan, Arizona.",
      },
      {
        q: "Is a helicopter tour from Las Vegas worth it?",
        a: "If you have one day and want to see the canyon, yes: driving to the West Rim takes around 2.5 hours each way. The flight also passes Hoover Dam and Lake Mead.",
      },
    ],
  },
  {
    destination: "grand-canyon",
    slug: "south-rim-helicopter-tours",
    navLabel: "South Rim",
    metaTitle: "Grand Canyon South Rim Helicopter Tours (2026) – Compare Flights",
    metaDescription:
      "Compare Grand Canyon South Rim helicopter tours from Tusayan, Arizona: 25 and 45-minute flights, routes, ratings and prices side by side.",
    keywords: [
      "grand canyon south rim helicopter tour",
      "tusayan helicopter tour",
      "grand canyon national park helicopter tour",
      "south rim helicopter tour price",
    ],
    eyebrow: "Grand Canyon · South Rim",
    h1: "Grand Canyon South Rim Helicopter Tours: Compared",
    intro: [
      "If you’re already visiting Grand Canyon National Park, you don’t need Las Vegas: scenic flights depart Grand Canyon National Park Airport in Tusayan, minutes from the South Rim entrance.",
      "South Rim flights are shorter and simpler — typically 25 or 45 minutes in the air, with no landings. We compare every one by flight time, route, rating and price.",
    ],
    view: "list",
    match: (f) => f.departure === SOUTH_RIM_DEPARTURE,
    sort: "price-asc",
    tips: [
      {
        title: "25 or 45 minutes?",
        body: "Shorter flights cross to the North Rim and back. Longer flights continue east over the Dragon Corridor, the canyon’s widest and deepest section.",
      },
      {
        title: "No landings at the South Rim",
        body: "National park rules don’t allow helicopter landings inside the canyon. For a landing, you need a West Rim tour from Las Vegas.",
      },
      {
        title: "Fly early",
        body: "Morning flights often have calmer air and softer light for photos, before afternoon heat builds.",
      },
    ],
    faqs: [
      {
        q: "Where do South Rim helicopter tours depart from?",
        a: "Grand Canyon National Park Airport in Tusayan, Arizona, just south of the park entrance.",
      },
      {
        q: "How much is a South Rim helicopter tour?",
        a: "Current listings start at around $270–$380 per person, depending mainly on flight length. Each flight above shows its current from-price.",
      },
      {
        q: "Can you land in the Grand Canyon on a South Rim tour?",
        a: "No. South Rim flights are scenic flights only. Landings are offered at the West Rim, outside the national park.",
      },
    ],
  },
  {
    destination: "grand-canyon",
    slug: "helicopter-landing-tours",
    navLabel: "Landing tours",
    metaTitle: "Grand Canyon Helicopter Landing Tours (2026) – Compare Options",
    metaDescription:
      "Compare Grand Canyon helicopter tours with a landing: where each one lands, time on the ground, flight time, total trip length and price versus air-only flights.",
    keywords: [
      "grand canyon helicopter tour with landing",
      "grand canyon helicopter landing tour",
      "land in the grand canyon helicopter",
      "grand canyon champagne helicopter tour",
    ],
    eyebrow: "Grand Canyon · Landing tours",
    h1: "Grand Canyon Helicopter Landing Tours: Compared",
    intro: [
      "A landing tour sets down at the canyon — on the canyon floor beside the Colorado River, on a bluff, or at a nearby ranch — usually with time to walk around and a Champagne toast.",
      "Landings are only possible at the West Rim, on Hualapai land outside the national park. We list each tour’s landing location as the listing describes it and compare the price with air-only flights.",
    ],
    view: "landing",
    // Landings aren't permitted inside the national park, so South Rim flights never qualify.
    match: (f) => isVerifiedGrandCanyonLanding(f),
    sort: "rating-desc",
    landingCompare: {
      label: "Air-only flights from Las Vegas",
      match: (f) => f.departure === LAS_VEGAS_DEPARTURE && f.landing == null,
    },
    tips: [
      {
        title: "Below the rim vs on the rim",
        body: "Canyon-floor landings descend thousands of feet below the rim to the Colorado River. Bluff and ranch landings stay higher up with wide views across the canyon.",
      },
      {
        title: "Time on the ground",
        body: "Most landings allow around 20–30 minutes on the ground. The total trip, including transfers from Las Vegas, is typically 3.5–4.5 hours.",
      },
      {
        title: "Not at the South Rim",
        body: "Helicopters can’t land inside Grand Canyon National Park, so South Rim flights are air-only.",
      },
    ],
    faqs: [
      {
        q: "Can you land in the Grand Canyon by helicopter?",
        a: "Yes, at the West Rim, which is on Hualapai tribal land outside the national park. Tours from Las Vegas land on the canyon floor, on a bluff or at a ranch.",
      },
      {
        q: "How much more does a landing tour cost?",
        a: "In current listings, landing tours from Las Vegas typically cost more than air-only flights. The comparison above shows the difference using live prices.",
      },
      {
        q: "How long do you spend on the ground?",
        a: "Usually around 20–30 minutes, depending on the tour. The booking page lists the schedule.",
      },
    ],
  },
  {
    destination: "grand-canyon",
    slug: "sunset-helicopter-tours",
    navLabel: "Sunset tours",
    metaTitle: "Grand Canyon Sunset Helicopter Tours (2026) – Compare Flights",
    metaDescription:
      "Compare Grand Canyon sunset helicopter tours from Las Vegas: landings, Champagne toasts, flight times and prices for sunset departures.",
    keywords: [
      "grand canyon sunset helicopter tour",
      "sunset helicopter tour grand canyon from las vegas",
      "grand canyon helicopter tour at sunset",
    ],
    eyebrow: "Grand Canyon · Sunset tours",
    h1: "Grand Canyon Sunset Helicopter Tours: Compared",
    intro: [
      "Sunset tours time the canyon visit for the late-afternoon light, when the rock walls turn deep red and orange, and often return over the Strip as the lights come on.",
      "We list Grand Canyon flights that offer a sunset departure, either as the tour itself or as a sunset option on the booking page.",
    ],
    view: "list",
    match: (f) => f.sunset === true,
    sort: "rating-desc",
    tips: [
      {
        title: "Times change with the season",
        body: "Sunset departures shift through the year. Check the departure time for your date on the booking page.",
      },
      {
        title: "Some listings sell sunset as an option",
        body: "Several tours offer daytime and sunset departures under one listing. Choose the sunset option when booking.",
      },
      {
        title: "Combine with the Strip at night",
        body: "Return flights often arrive back in Las Vegas around dusk, giving you views of the Strip lighting up.",
      },
    ],
    faqs: [
      {
        q: "Is a sunset Grand Canyon helicopter tour worth it?",
        a: "For photography and atmosphere, many travelers think so: the canyon colors are strongest in late-afternoon light. Daytime flights give more even light and more departure times.",
      },
      {
        q: "Do sunset tours cost more?",
        a: "Often slightly. Compare the sunset option’s price on the booking page with the daytime option of the same tour.",
      },
    ],
  },
  {
    destination: "grand-canyon",
    slug: "helicopter-tour-prices",
    navLabel: "Prices",
    metaTitle: "Grand Canyon Helicopter Tour Prices (2026) – Compare Costs",
    metaDescription:
      "How much is a Grand Canyon helicopter tour? Compare live prices for South Rim flights, West Rim air-only flights from Las Vegas and landing tours.",
    keywords: [
      "grand canyon helicopter tour price",
      "grand canyon helicopter tour cost",
      "how much is a helicopter tour of the grand canyon",
      "cheap grand canyon helicopter tour",
    ],
    eyebrow: "Grand Canyon · Prices",
    h1: "Grand Canyon Helicopter Tour Prices: What a Flight Costs",
    intro: [
      "Grand Canyon helicopter prices depend mostly on where you start: short South Rim flights from Tusayan cost far less than a round trip from Las Vegas, and landings add more on top.",
      "We group current from-prices by trip type, so you compare like with like, with the price per minute of flying where the listing states its flight time.",
    ],
    view: "prices",
    sort: "price-asc",
    priceGroups: [
      {
        label: "South Rim flights (from Tusayan)",
        note: "25–45 minutes in the air, no landing",
        match: (f) => f.departure === SOUTH_RIM_DEPARTURE,
      },
      {
        label: "West Rim air-only (from Las Vegas)",
        note: "Round trip from Las Vegas, no landing",
        match: (f) => f.departure === LAS_VEGAS_DEPARTURE && f.landing == null,
      },
      {
        label: "With a landing (from Las Vegas)",
        note: "Round trip with time on the ground",
        match: (f) => isVerifiedGrandCanyonLanding(f),
      },
      { label: "Other departures", match: () => true },
    ],
    tips: [
      {
        title: "Starting point drives the price",
        body: "A South Rim flight is a short hop; a Las Vegas tour includes a flight of roughly an hour each way across the desert. Compare within a trip type, not across them.",
      },
      {
        title: "Check what’s included",
        body: "Hotel transfers, park or tribal fees and fuel surcharges vary by listing. The booking page shows the final price.",
      },
      {
        title: "Sunset and landings cost more",
        body: "Landing tours and sunset departures usually carry a premium over air-only daytime flights.",
      },
    ],
    faqs: [
      {
        q: "How much is a Grand Canyon helicopter tour?",
        a: "In current listings, South Rim flights start at around $270 per person and West Rim tours from Las Vegas at around $400–$500. Landing tours cost more.",
      },
      {
        q: "What is the cheapest way to fly over the Grand Canyon?",
        a: "A short South Rim flight from Tusayan, if you’re already at the national park. From Las Vegas, an air-only West Rim flight is the cheapest helicopter option.",
      },
      {
        q: "Are Grand Canyon helicopter tours priced per person?",
        a: "Shared tours are priced per person. Private flights are listed separately because they’re usually priced for the whole aircraft.",
      },
    ],
  },
  {
    destination: "grand-canyon",
    slug: "helicopter-tour-operators",
    navLabel: "Operators",
    metaTitle: "Grand Canyon Helicopter Tour Companies (2026) – Compare Operators",
    metaDescription:
      "Compare Grand Canyon helicopter tour companies side by side: departures from Las Vegas and the South Rim, flights, ratings, review volume and prices.",
    keywords: [
      "grand canyon helicopter tour companies",
      "best grand canyon helicopter tour company",
      "maverick vs papillon",
      "grand canyon helicopter operators",
    ],
    eyebrow: "Grand Canyon · Operators",
    h1: "Grand Canyon Helicopter Tour Operators: Compared",
    intro: [
      "A few large operators fly most Grand Canyon helicopter tours, from Las Vegas and from Tusayan at the South Rim.",
      "We group every Grand Canyon sightseeing flight we compare by company, so you can see each operator’s departure points, flights, prices and traveler ratings at a glance.",
    ],
    view: "operators",
    tips: [
      {
        title: "Ratings need volume",
        body: "We rank operators by review-weighted ratings, so a company with thousands of strong reviews ranks above one with a perfect score from a handful.",
      },
      {
        title: "Same company, two bases",
        body: "Some operators fly from both Las Vegas and the South Rim under separate listings. Check the departure before you book.",
      },
      {
        title: "We don’t rate safety",
        body: "Rankings reflect listing data and traveler reviews, not an independent safety audit.",
      },
    ],
    faqs: [
      {
        q: "Which Grand Canyon helicopter company is best?",
        a: "It depends on your departure point, budget and whether you want a landing. The comparison above ranks companies by review-weighted ratings and shows each one’s flights and prices.",
      },
    ],
  },
  {
    destination: "las-vegas",
    slug: "strip-helicopter-tours",
    navLabel: "Strip flights",
    metaTitle: "Las Vegas Strip Helicopter Tours (2026) – Compare Prices",
    metaDescription:
      "Compare Las Vegas Strip helicopter tours by night and day: flight times, private or shared, hotel pickup, ratings and prices side by side.",
    keywords: [
      "las vegas strip helicopter tour",
      "las vegas strip helicopter ride",
      "helicopter ride over the strip",
      "cheap helicopter ride las vegas strip",
    ],
    eyebrow: "Las Vegas · Strip flights",
    h1: "Las Vegas Strip Helicopter Tours: Compared",
    intro: [
      "A Strip flight is the shortest, cheapest way into a helicopter in Las Vegas: a few minutes over the casinos, the Bellagio fountains and the Sphere.",
      "We compare every Strip helicopter flight currently listed — night and day, shared and private — by flight time, rating and price. Dinner and wedding packages are excluded.",
    ],
    view: "list",
    match: (f) => /\bstrip\b/i.test(f.title),
    sort: "price-asc",
    tips: [
      {
        title: "Short flight, longer evening",
        body: "Strip flights are typically 10–15 minutes in the air, but plan for an hour or more with check-in and the safety video.",
      },
      {
        title: "Night or day?",
        body: "Night is the classic choice for the lights. Daytime flights often add Hoover Dam and Lake Mead.",
      },
      {
        title: "Check transport",
        body: "Some listings include hotel pickup; others are cheaper if you make your own way to the heliport.",
      },
    ],
    faqs: [
      {
        q: "How much is a helicopter ride over the Las Vegas Strip?",
        a: "Shared Strip flights start at around $100 per person in current listings. Private flights cost several hundred dollars for the aircraft.",
      },
      {
        q: "How long is a Las Vegas Strip helicopter ride?",
        a: "Around 10–15 minutes in the air on most shared flights.",
      },
    ],
  },
  {
    destination: "las-vegas",
    slug: "night-helicopter-tours",
    navLabel: "Night flights",
    metaTitle: "Las Vegas Night Helicopter Tours (2026) – Compare Flights",
    metaDescription:
      "Compare Las Vegas night helicopter tours over the Strip: flight times, shared or private, ratings and prices from around $100.",
    keywords: [
      "las vegas helicopter night tour",
      "las vegas night helicopter ride",
      "helicopter night flight las vegas strip",
      "las vegas strip helicopter tour at night",
    ],
    eyebrow: "Las Vegas · Night flights",
    h1: "Las Vegas Night Helicopter Tours: Compared",
    intro: [
      "Seeing the Strip lit up from the air is the most popular helicopter experience in Las Vegas — and at around $100, one of the cheapest anywhere.",
      "We compare every night flight over Las Vegas by flight time, shared or private cabin, traveler rating and price, kept separate from $500+ Grand Canyon excursions.",
    ],
    view: "list",
    match: (f) => f.kind === "night",
    sort: "price-asc",
    tips: [
      {
        title: "Book the first night slot",
        body: "Early-evening departures catch the last light over the desert as the Strip comes on.",
      },
      {
        title: "Reduce reflections",
        body: "Dark clothing and holding your phone close to the window cut glare in night photos.",
      },
      {
        title: "Private for celebrations",
        body: "Private night flights give your group the whole aircraft. Wedding and dinner packages are on the main Las Vegas page under ‘also show packages’.",
      },
    ],
    faqs: [
      {
        q: "How much is a night helicopter ride in Las Vegas?",
        a: "Shared night flights start at around $100 per person in current listings. Private night flights start at several hundred dollars for the aircraft.",
      },
      {
        q: "What time do Las Vegas night helicopter flights depart?",
        a: "After dark, with several departures each evening. Times shift with the season — check the booking page for your date.",
      },
    ],
  },
  {
    destination: "las-vegas",
    slug: "red-rock-canyon-helicopter-tours",
    navLabel: "Red Rock Canyon",
    metaTitle: "Red Rock Canyon Helicopter Tours from Las Vegas (2026)",
    metaDescription:
      "Compare Red Rock Canyon helicopter tours from Las Vegas: air-only flights, landings with a Champagne toast and sunset flights, with prices and ratings.",
    keywords: [
      "red rock canyon helicopter tour",
      "red rock canyon helicopter landing",
      "red rock canyon sunset helicopter",
      "las vegas helicopter tour red rock",
    ],
    eyebrow: "Las Vegas · Red Rock Canyon",
    h1: "Red Rock Canyon Helicopter Tours from Las Vegas",
    intro: [
      "Red Rock Canyon’s sandstone cliffs are a short flight west of the Strip — a scenic alternative for travelers without the time or budget for the Grand Canyon.",
      "We compare air-only flights, landings and sunset flights by rating and price.",
    ],
    view: "list",
    match: (f) => /red rock/i.test(f.title),
    sort: "price-asc",
    tips: [
      {
        title: "Landing or air-only?",
        body: "Landing tours touch down on a desert overlook for photos and a toast; air-only flights are shorter and cheaper.",
      },
      {
        title: "Sunset flights",
        body: "Sunset departures light the red rock at its most intense and return over the Strip as it lights up.",
      },
      {
        title: "Much shorter than the Grand Canyon",
        body: "Red Rock flights take about an hour including check-in, versus 3–4 hours for a Grand Canyon tour.",
      },
    ],
    faqs: [
      {
        q: "How long is a Red Rock Canyon helicopter tour?",
        a: "About an hour including check-in and any landing. Each listing shows its details.",
      },
      {
        q: "Red Rock Canyon or Grand Canyon by helicopter?",
        a: "Red Rock is shorter and cheaper and fits into an afternoon. The Grand Canyon is the bigger spectacle but takes most of a morning or afternoon.",
      },
    ],
  },
  {
    destination: "las-vegas",
    slug: "helicopter-tour-operators",
    navLabel: "Operators",
    metaTitle: "Las Vegas Helicopter Tour Companies (2026) – Compare Operators",
    metaDescription:
      "Compare Las Vegas helicopter tour companies for Strip, night and Red Rock Canyon flights: ratings, review volume, flights and prices.",
    keywords: [
      "las vegas helicopter tour companies",
      "best helicopter tour las vegas strip",
      "las vegas helicopter operators",
    ],
    eyebrow: "Las Vegas · Operators",
    h1: "Las Vegas Helicopter Tour Operators: Compared",
    intro: [
      "A few operators fly most Strip and Red Rock Canyon helicopter tours.",
      "We group every Las Vegas sightseeing flight we compare by company, with each operator’s flights, prices and traveler ratings. Grand Canyon flights are compared on the Grand Canyon operators page.",
    ],
    view: "operators",
    tips: [
      {
        title: "Ratings need volume",
        body: "We rank operators by review-weighted ratings, so thousands of strong reviews count for more than a perfect score from a handful.",
      },
      {
        title: "Compare the same flight",
        body: "Operators sell Strip flights at different lengths and with or without transport. Compare like with like.",
      },
      {
        title: "We don’t rate safety",
        body: "Rankings reflect listing data and traveler reviews, not an independent safety audit.",
      },
    ],
    faqs: [
      {
        q: "Which Las Vegas helicopter company is best?",
        a: "It depends on the flight you want and your budget. The comparison above ranks companies by review-weighted ratings and shows each one’s flights and prices.",
      },
    ],
  },
  {
    destination: "cape-town",
    slug: "helicopter-tour-prices",
    navLabel: "Prices",
    metaTitle: "Cape Town Helicopter Tour Prices (2026) – Compare Costs",
    metaDescription:
      "How much is a helicopter tour in Cape Town? Compare live prices for city and Atlantic Coast flips, Robben Island, Two Oceans and Cape Point flights, with price per minute.",
    keywords: [
      "cape town helicopter tour price",
      "helicopter flip cape town price",
      "how much is a helicopter ride in cape town",
      "cheap helicopter flight cape town",
    ],
    eyebrow: "Cape Town · Prices",
    h1: "Cape Town Helicopter Tour Prices: Compare Costs",
    intro: [
      "Cape Town helicopter prices rise with the route: short city and Atlantic Coast flips cost the least, Two Oceans flights cross the peninsula to False Bay, and full-peninsula flights to Cape Point cost the most.",
      "We group current from-prices by route so you compare like with like, with the price per minute of flying where the listing states its flight time. Listings that only give a total trip time are shown without a per-minute price.",
    ],
    view: "prices",
    sort: "price-asc",
    priceGroups: [
      {
        label: "City & Atlantic Coast",
        note: "Short flips over the city, Camps Bay and the Twelve Apostles",
        match: (f) => capeTownRoute(f) === "atlantic",
      },
      {
        label: "Robben Island flyovers",
        note: "Circling the island, some continuing along the coast",
        match: (f) => capeTownRoute(f) === "robben-island",
      },
      {
        label: "Two Oceans",
        note: "Across the peninsula to False Bay and back",
        match: (f) => capeTownRoute(f) === "two-oceans",
      },
      {
        label: "Cape Point & full peninsula",
        note: "Down the coast to Cape Point and back",
        match: (f) => capeTownRoute(f) === "cape-point",
      },
      { label: "Other flights", match: () => true },
    ],
    tips: [
      {
        title: "Compare price per minute",
        body: "Longer routes cost more in total, but not always more per minute. The per-minute column shows what each extra minute in the air actually costs.",
      },
      {
        title: "Flight time vs trip time",
        body: "Some listings state the whole outing, including hotel pickup and check-in, rather than the time in the air. We only show a flight time where the listing states one.",
      },
      {
        title: "Book early in your stay",
        body: "Wind and low cloud ground flights fairly often. Booking early in your trip leaves time to rebook.",
      },
    ],
    faqs: [
      {
        q: "How much is a helicopter flip in Cape Town?",
        a: "Short shared city and Atlantic Coast flights start at around $165–$250 per person in current listings. Two Oceans flights cost roughly $320–$620 and Cape Point flights from around $630.",
      },
      {
        q: "What is the cheapest helicopter ride in Cape Town?",
        a: "A 12-minute shared city flip from the V&A Waterfront. The City & Atlantic Coast table lists the current options from cheapest.",
      },
      {
        q: "Are Cape Town helicopter prices per person?",
        a: "Shared flights are priced per person. Private flights are listed separately because they are usually priced for the whole helicopter.",
      },
    ],
  },
  {
    destination: "cape-town",
    slug: "two-oceans-helicopter-tours",
    navLabel: "Two Oceans",
    metaTitle: "Two Oceans Helicopter Tours Cape Town (2026) – Compare Flights",
    metaDescription:
      "Compare Cape Town Two Oceans helicopter tours across the peninsula to False Bay: flight times, routes, ratings and prices, and how they compare with Cape Point flights.",
    keywords: [
      "two oceans helicopter tour cape town",
      "cape town two oceans helicopter flight",
      "half peninsula helicopter tour",
      "atlantic and indian ocean helicopter flight",
    ],
    eyebrow: "Cape Town · Two Oceans",
    h1: "Two Oceans Helicopter Tours in Cape Town: Compared",
    intro: [
      "A Two Oceans flight follows the Atlantic coast past Camps Bay and the Twelve Apostles, then crosses the peninsula to False Bay — the side traditionally called the Indian Ocean — before returning over Table Mountain.",
      "We list flights whose route crosses to False Bay but turns back before Cape Point, and compare them with full-peninsula flights so you can see what the longer route costs.",
    ],
    view: "landmark",
    match: (f) => capeTownRoute(f) === "two-oceans",
    sort: "price-asc",
    landmarkFocus: {
      name: "Two Oceans",
      label: "Two Oceans flights",
      phrase: "cross the peninsula to False Bay without continuing to Cape Point",
      also: ["Table Mountain", "Twelve Apostles", "Hout Bay", "Chapman's Peak", "Robben Island"],
      compareWith: {
        label: "Cape Point & full peninsula",
        match: (f) => capeTownRoute(f) === "cape-point",
      },
    },
    tips: [
      {
        title: "Two oceans, one coastline",
        body: "The Atlantic and Indian Oceans officially meet further east, but False Bay’s warmer water gives the name. You see both coastlines on one flight.",
      },
      {
        title: "Check the flight time",
        body: "Two Oceans flights run roughly 24–36 minutes depending on the operator and whether Robben Island is added.",
      },
      {
        title: "Same route, different sellers",
        body: "Tour companies sometimes resell an operator’s Two Oceans flight with transfers added. Compare the flight time and what’s included.",
      },
    ],
    faqs: [
      {
        q: "How long is a Two Oceans helicopter flight?",
        a: "About 24–30 minutes in the air on most listings, or around 36 minutes when combined with Robben Island.",
      },
      {
        q: "Two Oceans or Cape Point?",
        a: "Two Oceans covers both coastlines in about half the flight time. Cape Point continues to the tip of the peninsula for roughly 1.5–2 times the price, though slightly less per minute in the air. The comparison above shows both with live prices.",
      },
    ],
  },
  {
    destination: "cape-town",
    slug: "robben-island-helicopter-tours",
    navLabel: "Robben Island",
    metaTitle: "Robben Island Helicopter Tours (2026) – Compare Flights",
    metaDescription:
      "Compare Robben Island helicopter flights from the V&A Waterfront: scenic flyovers and longer combination routes, with flight times and prices — kept separate from tours that visit the island.",
    keywords: [
      "robben island helicopter tour",
      "robben island helicopter flight",
      "helicopter over robben island",
      "robben island and cape point helicopter",
    ],
    eyebrow: "Cape Town · Robben Island",
    h1: "Robben Island Helicopter Tours: Compare Flights",
    intro: [
      "Robben Island, where Nelson Mandela was imprisoned for 18 years, lies in Table Bay about 11 km from the V&A Waterfront. A helicopter circles it in minutes — but scenic flights don’t land on the island.",
      "We compare flyovers and the longer routes that combine the island with the coast, Two Oceans or Cape Point. Packages that include a ferry trip or a guided visit on the island are a different experience, so we list them separately below.",
    ],
    view: "landmark",
    match: (f) => ROBBEN_TITLE.test(f.title),
    sort: "price-asc",
    landmarkFocus: {
      name: "Robben Island",
      phrase: "fly over Robben Island",
      also: ["Table Mountain", "Clifton & Camps Bay", "Twelve Apostles", "Two Oceans", "Cape Point"],
    },
    packages: {
      heading: "Robben Island visits with a helicopter flight",
      intro:
        "These packages set foot on the island — by ferry or by landing — with a guided tour, and add a helicopter flight. They take most of a day and aren’t comparable with a flyover on price.",
      match: (f) => ROBBEN_TITLE.test(f.title),
    },
    tips: [
      {
        title: "Flyovers don’t land",
        body: "Scenic flights circle the island and return. To walk the prison, book a ferry tour from the Nelson Mandela Gateway or a package that includes the visit.",
      },
      {
        title: "Book the ferry well ahead",
        body: "Island visits sell out days or weeks ahead in summer. A flyover is the fallback if the ferry is full or cancelled for weather.",
      },
      {
        title: "Combination routes",
        body: "Longer flights add the Atlantic coast, Two Oceans or Cape Point after the island. Compare the cost per minute.",
      },
    ],
    faqs: [
      {
        q: "Can a helicopter land on Robben Island?",
        a: "Scenic flights don’t. A small number of private packages land and include a guided visit; they’re listed separately on this page.",
      },
      {
        q: "How long is a Robben Island helicopter flight?",
        a: "Around 18–20 minutes for a flyover from the V&A Waterfront, and 27–36 minutes when combined with the coast or Two Oceans. The Cape Point combination is longer; that listing doesn’t state its flight time.",
      },
      {
        q: "Is a helicopter flight a substitute for the Robben Island tour?",
        a: "Not for the history: the ferry tour includes the prison with a former political prisoner as guide. A flight gives the view of the island and coastline in a fraction of the time.",
      },
    ],
  },
  {
    destination: "cape-town",
    slug: "cape-point-helicopter-tours",
    navLabel: "Cape Point",
    metaTitle: "Cape Point Helicopter Tours (2026) – Compare Routes & Prices",
    metaDescription:
      "Compare Cape Point and full-peninsula helicopter tours from Cape Town: flight times, routes via Chapman’s Peak and Boulders Beach, ratings and prices versus shorter Two Oceans flights.",
    keywords: [
      "cape point helicopter tour",
      "cape of good hope helicopter flight",
      "full peninsula helicopter tour cape town",
      "cape point helicopter price",
    ],
    eyebrow: "Cape Town · Cape Point",
    h1: "Cape Point Helicopter Tours: Compare Routes & Prices",
    intro: [
      "Cape Point flights follow the whole peninsula: the Atlantic coast and Chapman’s Peak on the way down, Cape Point and the Cape of Good Hope at the tip, and False Bay past Boulders Beach on the way back.",
      "They are the longest and most expensive scenic flights in Cape Town. We compare each one by flight time, route and price, and against shorter Two Oceans flights so you can judge whether the full peninsula is worth the extra.",
    ],
    view: "landmark",
    match: (f) => capeTownRoute(f) === "cape-point",
    sort: "price-asc",
    landmarkFocus: {
      name: "Cape Point",
      label: "Cape Point flights",
      phrase: "fly to Cape Point",
      also: ["Twelve Apostles", "Chapman's Peak", "Two Oceans", "Boulders Beach", "Robben Island"],
      compareWith: {
        label: "Two Oceans (turns back before Cape Point)",
        match: (f) => capeTownRoute(f) === "two-oceans",
      },
    },
    tips: [
      {
        title: "Is the longer route worth it?",
        body: "A Cape Point flight costs about twice a Two Oceans flight for about twice the flying. If the tip of Africa’s peninsula is the goal, it’s the only way to see it in under an hour.",
      },
      {
        title: "Wind matters most here",
        body: "The peninsula’s tip is the windiest part of the route. Long flights are the first to be rescheduled in strong south-easterlies.",
      },
      {
        title: "Shared flights may need a minimum",
        body: "Some shared full-peninsula flights only depart with a minimum number of passengers. Check the listing.",
      },
    ],
    faqs: [
      {
        q: "How long is a Cape Point helicopter flight?",
        a: "Around 48–50 minutes in the air where the listing states it. Some listings give only the total activity time, which includes check-in and the safety briefing.",
      },
      {
        q: "Do Cape Point helicopter tours land?",
        a: "Scenic flights return to the Waterfront without landing. Full-day packages that drive to Cape Point are listed on the main Cape Town page under packages.",
      },
      {
        q: "How much is a Cape Point helicopter tour?",
        a: "Current shared listings start at around $630 per person. Each flight above shows its live from-price.",
      },
    ],
  },
  {
    destination: "cape-town",
    slug: "atlantic-coast-helicopter-tours",
    navLabel: "Atlantic Coast",
    metaTitle: "Cape Town Atlantic Coast Helicopter Tours (2026) – Compare",
    metaDescription:
      "Compare Cape Town Atlantic Coast helicopter flights over Clifton, Camps Bay, the Twelve Apostles and Hout Bay: flight times, routes, ratings and prices.",
    keywords: [
      "cape town atlantic coast helicopter tour",
      "camps bay helicopter flight",
      "hout bay helicopter tour",
      "twelve apostles helicopter flight",
      "helicopter flip cape town",
    ],
    eyebrow: "Cape Town · Atlantic Coast",
    h1: "Cape Town Atlantic Coast Helicopter Tours: Compared",
    intro: [
      "The Atlantic seaboard is Cape Town’s classic helicopter flip: Cape Town Stadium, Lion’s Head, the beaches of Clifton and Camps Bay and the Twelve Apostles, with longer flights continuing to Hout Bay.",
      "We list flights that stay on the Atlantic side — from 12-minute city flips to 20-minute Hout Bay routes — and show which highlights each route names. Flights that cross to False Bay are on the Two Oceans page.",
    ],
    view: "landmark",
    match: (f) => capeTownRoute(f) === "atlantic",
    sort: "price-asc",
    landmarkFocus: {
      name: "Atlantic Seaboard",
      phrase: "stay on the Atlantic seaboard",
      also: ["Table Mountain", "Lion's Head", "Clifton & Camps Bay", "Twelve Apostles", "Hout Bay"],
      compareWith: {
        label: "Two Oceans",
        match: (f) => capeTownRoute(f) === "two-oceans",
      },
    },
    tips: [
      {
        title: "12 minutes or 20?",
        body: "Short flips turn around at Camps Bay or the Twelve Apostles. Around 18–20 minutes gets you to Hout Bay and back.",
      },
      {
        title: "Window seats",
        body: "Seats are usually allocated at check-in by weight. Flying south from the Waterfront, the coast is on the right on the way out and on the left on the way back.",
      },
      {
        title: "Afternoon light",
        body: "The Atlantic seaboard faces west, so late-afternoon flights light the beaches and the Twelve Apostles best.",
      },
    ],
    faqs: [
      {
        q: "What do you see on an Atlantic Coast helicopter flight?",
        a: "Typically Cape Town Stadium, Lion’s Head, Clifton and Camps Bay beaches and the Twelve Apostles; longer routes continue to Hout Bay. The table shows which highlights each route lists.",
      },
      {
        q: "How long is an Atlantic Coast helicopter flight?",
        a: "Around 12–20 minutes in the air on current listings.",
      },
    ],
  },
  {
    destination: "cape-town",
    slug: "private-helicopter-tours",
    navLabel: "Private",
    indexable: false,
    metaTitle: "Private Helicopter Tours Cape Town (2026) – Compare Prices",
    metaDescription:
      "Compare private Cape Town helicopter flights where your group has the helicopter to itself: routes, flight times and prices.",
    keywords: ["private helicopter tour cape town", "private helicopter flight cape town"],
    eyebrow: "Cape Town · Private flights",
    h1: "Private Helicopter Tours in Cape Town: Compare Prices",
    intro: [
      "Private flights give your group the whole helicopter. Some listings marked private only include a private transfer to a shared flight, so we list only flights the listing itself presents as private.",
    ],
    view: "list",
    match: (f) => f.cabin === "private",
    sort: "price-asc",
    tips: [
      {
        title: "Private transfer isn’t a private flight",
        body: "Check the description: several listings pair a private hotel pickup with a seat on a shared flight.",
      },
      {
        title: "Usually priced per helicopter",
        body: "Divide by your group size to compare with shared seats.",
      },
      {
        title: "Shared can be better value",
        body: "For one or two people, a shared flight covers the same route for far less.",
      },
    ],
    faqs: [
      {
        q: "How much is a private helicopter flight in Cape Town?",
        a: "It depends on the route and group size. Each flight above shows its current from-price; check whether it’s per person or per helicopter.",
      },
    ],
  },
  {
    destination: "cape-town",
    slug: "helicopter-tour-operators",
    navLabel: "Operators",
    metaTitle: "Cape Town Helicopter Tour Companies (2026) – Compare Operators",
    metaDescription:
      "Compare Cape Town helicopter tour companies side by side: routes, flight times, ratings, review volume and prices for operators and resellers.",
    keywords: [
      "cape town helicopter companies",
      "best helicopter tour cape town",
      "sport helicopters vs cape town helicopters",
      "cape town helicopter operators",
    ],
    eyebrow: "Cape Town · Operators",
    h1: "Cape Town Helicopter Tour Operators: Compared",
    intro: [
      "A few helicopter operators fly from the V&A Waterfront, and several tour companies resell their flights, sometimes with hotel transfers added.",
      "We group every Cape Town sightseeing flight we compare by the company selling it, with each one’s routes, flight times, prices and traveler ratings.",
    ],
    view: "operators",
    tips: [
      {
        title: "Operators vs resellers",
        body: "Resold flights can cost noticeably more than booking the same route with the operator. Compare flight time and inclusions, not the listing name.",
      },
      {
        title: "Ratings need volume",
        body: "We rank by review-weighted ratings, so hundreds of strong reviews count for more than a perfect score from a handful.",
      },
      {
        title: "We don’t rate safety",
        body: "Rankings reflect listing data and traveler reviews, not an independent safety audit.",
      },
    ],
    faqs: [
      {
        q: "Which helicopter company is best in Cape Town?",
        a: "It depends on the route and budget. The comparison above ranks companies by review-weighted ratings and shows each one’s flights and prices.",
      },
    ],
  },
  {
    destination: "victoria-falls",
    slug: "helicopter-tour-prices",
    navLabel: "Prices",
    metaTitle: "Victoria Falls Helicopter Tour Prices (2026) – Compare Costs",
    metaDescription:
      "How much is a helicopter flight over Victoria Falls? Compare live prices for 12–15 and 25-minute flights, price per minute, and which listings add park, government or fuel fees.",
    keywords: [
      "victoria falls helicopter flight price",
      "victoria falls helicopter ride cost",
      "flight of angels price",
      "how much is a helicopter ride over victoria falls",
    ],
    eyebrow: "Victoria Falls · Prices",
    h1: "Victoria Falls Helicopter Tour Prices: Compare Costs",
    intro: [
      "Most Victoria Falls listings sell a 12–15 minute flight over the falls and a longer flight of around 25 minutes, and the advertised from-price is the short one.",
      "We compare each flight length separately, so a 25-minute flight is never shown at a 12-minute price, and show which listings exclude park, government or fuel fees that are paid on the day.",
    ],
    view: "prices",
    sort: "price-asc",
    priceBands: [
      { label: "12–15 min", min: 0, max: 16 },
      { label: "16–21 min", min: 16, max: 22 },
      { label: "22–27 min", min: 22, max: 28 },
      { label: "28 min or longer", min: 28 },
    ],
    tips: [
      {
        title: "Check the fees line",
        body: "Several operators charge a government or national park fee and a fuel levy at check-in, which can add tens of dollars per person. Compare totals, not headline prices.",
      },
      {
        title: "The from-price is the short flight",
        body: "A listing ‘from $172’ is the 12–13 minute flight. Choose your flight length on the booking page to see its price.",
      },
      {
        title: "Transfers are usually included",
        body: "Most listings include pickup from hotels in Victoria Falls town. Staying further out can cost extra.",
      },
    ],
    faqs: [
      {
        q: "How much is a helicopter flight over Victoria Falls?",
        a: "Shared 12–15 minute flights start at around $170 per person in current listings, and 25-minute flights at around $330. Some listings add government, park or fuel fees on the day.",
      },
      {
        q: "Are park fees included in Victoria Falls helicopter prices?",
        a: "It varies by listing. Some exclude a government or national park fee and a fuel levy, others include them. Each row above shows what the listing states.",
      },
      {
        q: "What is the cheapest helicopter flight at Victoria Falls?",
        a: "A shared 12–13 minute Flight of Angels. The 12–15 min table lists current options from cheapest.",
      },
    ],
  },
  {
    destination: "victoria-falls",
    slug: "flight-of-angels",
    navLabel: "Flight of Angels",
    metaTitle: "Flight of Angels Victoria Falls (2026) – Compare Helicopter Tours",
    metaDescription:
      "Compare Flight of Angels helicopter flights over Victoria Falls: 12–15 minute flights by seller, flight time, fees, ratings and live prices.",
    keywords: [
      "flight of angels victoria falls",
      "flight of the angels helicopter",
      "victoria falls 12 minute helicopter flight",
      "flight of angels price",
    ],
    eyebrow: "Victoria Falls · Flight of Angels",
    h1: "Flight of Angels, Victoria Falls: Compare Helicopter Tours",
    intro: [
      "The ‘Flight of Angels’ takes its name from David Livingstone’s line that the falls were ‘scenes so lovely they must have been gazed upon by angels in their flight’. It has become the common name for the short 12–15 minute helicopter flight over the falls.",
      "Below we compare every short flight currently listed. They’re sold by several operators and tour companies, so routes, aircraft and inclusions differ — check the seller and what each listing states.",
    ],
    view: "prices",
    sort: "price-asc",
    match: (f) => flightMinutes(f).some((m) => m <= SHORT_FLIGHT_MAX),
    priceHeading: "Short flights compared",
    priceBands: [{ label: "12–15 minute flights", min: 0, max: SHORT_FLIGHT_MAX + 1 }],
    tips: [
      {
        title: "Same name, different sellers",
        body: "Tour companies resell flights from the helicopter operators. Two listings can be the same flight at different prices, or different flights with the same name.",
      },
      {
        title: "Both directions over the falls",
        body: "Pilots usually fly circuits in both directions so passengers on each side get a view. Window seats are guaranteed on some listings.",
      },
      {
        title: "When the spray is highest",
        body: "From around March to May the spray can hide parts of the falls even from the air; late in the dry season the falls are thinner but clearer.",
      },
    ],
    faqs: [
      {
        q: "How long is the Flight of Angels?",
        a: "Around 12–15 minutes in the air. With pickup and check-in, allow about an hour.",
      },
      {
        q: "Is Flight of Angels one operator?",
        a: "No. It’s a common name for the short flight, used by several operators and resellers. Each listing above shows the company selling it.",
      },
      {
        q: "How much is the Flight of Angels?",
        a: "Current shared listings start at around $170 per person, before any fees the listing excludes.",
      },
    ],
  },
  {
    destination: "victoria-falls",
    slug: "12-vs-25-minute-helicopter-flights",
    navLabel: "12 vs 25 minutes",
    metaTitle: "Victoria Falls Helicopter Flights – 12 vs 25 Minutes (2026)",
    metaDescription:
      "Is the 25-minute Victoria Falls helicopter flight worth it? Compare live prices for 12–15 and 22–27 minute flights side by side, and what the longer route adds.",
    keywords: [
      "victoria falls 12 vs 25 minute helicopter",
      "25 minute helicopter flight victoria falls",
      "victoria falls helicopter which flight",
      "zambezi spectacular flight",
    ],
    eyebrow: "Victoria Falls · Flight length",
    h1: "Victoria Falls Helicopter Flights: 12 vs 25 Minutes",
    intro: [
      "The short flight concentrates on the falls themselves. Longer flights of around 25 minutes typically add the Batoka Gorge, the upper Zambezi and the Zambezi National Park, where you may spot wildlife — depending on the route.",
      "We compare both side by side using live prices for each flight length, and show what the longer option’s route adds where the listing describes it.",
    ],
    view: "duration-compare",
    durationCompare: {
      short: {
        label: "12–15 minutes",
        min: 12,
        max: SHORT_FLIGHT_MAX,
        suits: [
          "Seeing the falls from the air on a budget",
          "A tight schedule between other activities",
          "First-time or nervous flyers",
        ],
      },
      long: {
        label: "22–27 minutes",
        min: 22,
        max: 27,
        suits: [
          "Seeing the gorges and the upper Zambezi too",
          "Wildlife spotting over the national park",
          "Photographers who want more time",
        ],
      },
    },
    tips: [
      {
        title: "The extra time is mostly new scenery",
        body: "Longer routes repeat the falls circuits, then continue down the Batoka Gorge and upriver over the national park.",
      },
      {
        title: "Fees rise with length",
        body: "Where listings charge park fees and fuel levies separately, the 25-minute flight often carries higher fees too.",
      },
      {
        title: "Wildlife isn’t guaranteed",
        body: "Elephants, hippos and buffalo are often seen, but sightings depend on the season and time of day.",
      },
    ],
    faqs: [
      {
        q: "Is the 25-minute Victoria Falls helicopter flight worth it?",
        a: "If you want the gorges, the upper river and a chance of wildlife, yes. If the falls are the priority, the short flight covers them well for considerably less.",
      },
      {
        q: "How much more is the 25-minute flight?",
        a: "On listings that sell both, the longer flight typically costs around $150 more — roughly 1.5 to 2 times the short-flight price, before any fees. The side-by-side cards show the difference on each listing.",
      },
    ],
  },
  {
    destination: "victoria-falls",
    slug: "zimbabwe-vs-zambia-helicopter-tours",
    navLabel: "Zimbabwe vs Zambia",
    indexable: false,
    metaTitle: "Victoria Falls Helicopter Tours – Zimbabwe vs Zambia (2026)",
    metaDescription:
      "Zimbabwe or Zambia for a Victoria Falls helicopter flight? Compare departure points, transfers, prices and whether you need to cross the border.",
    keywords: [
      "victoria falls helicopter zimbabwe or zambia",
      "livingstone helicopter flight",
      "victoria falls helicopter zimbabwe side",
    ],
    eyebrow: "Victoria Falls · Zimbabwe vs Zambia",
    h1: "Victoria Falls Helicopter Tours: Zimbabwe vs Zambia",
    intro: [
      "Victoria Falls sits on the border, with Victoria Falls town in Zimbabwe and Livingstone in Zambia. Helicopters from both sides circle the same falls, usually in both directions so each side of the aircraft gets a view.",
      "We group listings by the departure they state. Today the listings we compare depart from the Zimbabwe side or don’t state a side, so this page doesn’t yet offer a balanced comparison with Zambian departures.",
    ],
    view: "prices",
    sort: "price-asc",
    priceHeading: "Prices by departure side",
    priceGroups: [
      { label: "Departs Zimbabwe", note: "Victoria Falls town", match: (f) => f.departure === ZIMBABWE_DEPARTURE_LABEL },
      { label: "Departs Zambia", note: "Livingstone", match: (f) => f.departure === ZAMBIA_DEPARTURE_LABEL },
      { label: "Side not stated", note: "Check the meeting point on the listing", match: () => true },
    ],
    tips: [
      {
        title: "Fly from the side you’re staying on",
        body: "Hotel pickups only cover their own side. Crossing the border on the day adds immigration queues at both posts and possibly a visa.",
      },
      {
        title: "Crossing anyway?",
        body: "If you plan to visit both sides, a visa that covers both countries, such as the KAZA UniVisa where it’s available, can make crossing simpler. Check current rules before you travel.",
      },
      {
        title: "Same falls, same view",
        body: "Flights from both sides circle the whole falls. The departure mainly changes the transfer, not what you see.",
      },
    ],
    faqs: [
      {
        q: "Is it better to take a helicopter flight from Zimbabwe or Zambia?",
        a: "Neither side has a better view from the air: flights circle the whole falls. Choose the side you’re staying on to avoid a border crossing.",
      },
      {
        q: "Do I need to cross the border for a helicopter flight?",
        a: "Not if you book a flight that departs on your side and includes pickup there. The listings above state their departure where known.",
      },
    ],
  },
  {
    destination: "victoria-falls",
    slug: "private-helicopter-tours",
    navLabel: "Private",
    indexable: false,
    metaTitle: "Private Victoria Falls Helicopter Tours (2026) – Compare Prices",
    metaDescription:
      "Compare private helicopter flights over Victoria Falls, where the helicopter itself is booked for your group: flight times and prices.",
    keywords: ["private helicopter flight victoria falls", "victoria falls private helicopter"],
    eyebrow: "Victoria Falls · Private flights",
    h1: "Private Victoria Falls Helicopter Tours: Compare Prices",
    intro: [
      "Several Victoria Falls listings are marked private because the guide or transfer is private, not the helicopter. We only list flights where the listing says the flight itself is private.",
    ],
    view: "list",
    match: (f) => f.cabin === "private",
    sort: "price-asc",
    tips: [
      {
        title: "Private tour ≠ private helicopter",
        body: "A private guided walk or transfer often comes with a seat on a shared flight. Ask the seller if the helicopter is exclusive.",
      },
      {
        title: "Compare per person",
        body: "Private flights may be priced per person or per aircraft. Check the booking page.",
      },
      {
        title: "Window seats without going private",
        body: "Some shared listings guarantee every passenger a window seat.",
      },
    ],
    faqs: [
      {
        q: "Can you book a private helicopter flight at Victoria Falls?",
        a: "Yes, but few listings confirm the helicopter itself is private. Each flight above says so in its listing.",
      },
    ],
  },
  {
    destination: "victoria-falls",
    slug: "helicopter-tour-operators",
    navLabel: "Operators",
    metaTitle: "Victoria Falls Helicopter Companies (2026) – Compare Operators",
    metaDescription:
      "Compare the companies selling Victoria Falls helicopter flights: operators and resellers, flight lengths, fees, ratings, review volume and prices.",
    keywords: [
      "victoria falls helicopter companies",
      "best helicopter flight victoria falls",
      "chikopokopo helicopters",
      "victoria falls helicopter operators",
    ],
    eyebrow: "Victoria Falls · Companies",
    h1: "Victoria Falls Helicopter Companies: Compared",
    intro: [
      "A few helicopter operators fly over Victoria Falls, and many tour companies resell their flights, often with transfers included.",
      "We group every Victoria Falls sightseeing flight we compare by the company selling it, with each one’s flight lengths, prices and traveler ratings.",
    ],
    view: "operators",
    tips: [
      {
        title: "Operators vs resellers",
        body: "A reseller’s price can be higher or lower than the operator’s for the same flight. Compare flight time, fees and inclusions.",
      },
      {
        title: "Ratings need volume",
        body: "We rank by review-weighted ratings, so thousands of strong reviews count for more than a perfect score from a handful.",
      },
      {
        title: "We don’t rate safety",
        body: "Rankings reflect listing data and traveler reviews, not an independent safety audit.",
      },
    ],
    faqs: [
      {
        q: "Which helicopter company is best at Victoria Falls?",
        a: "It depends on flight length and budget. The comparison above ranks companies by review-weighted ratings and shows each one’s flights and prices.",
      },
    ],
  },
];

export function isCategoryIndexable(category: DestinationCategory, flightCount: number): boolean {
  return category.indexable !== false && flightCount >= MIN_INDEXABLE_CATEGORY_FLIGHTS;
}

export function categoriesFor(destination: DestinationSlug): DestinationCategory[] {
  return destinationCategories.filter((c) => c.destination === destination);
}

export function getDestinationCategory(
  destination: DestinationSlug,
  slug: string,
): DestinationCategory | undefined {
  return destinationCategories.find((c) => c.destination === destination && c.slug === slug);
}

export function categoryPath(category: Pick<DestinationCategory, "destination" | "slug">): string {
  return `/${category.destination}/${category.slug}`;
}

export function categoryFlights(category: DestinationCategory, flights: Flight[]): Flight[] {
  return flights.filter((f) => isSightseeing(f) && (category.match?.(f) ?? true));
}
