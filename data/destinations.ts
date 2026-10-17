export type HawaiiIslandSlug = "kauai" | "oahu" | "maui" | "big-island";

export type DestinationSlug =
  | HawaiiIslandSlug
  | "grand-canyon"
  | "las-vegas"
  | "new-york"
  | "dubai"
  | "cape-town"
  | "victoria-falls"
  | "niagara-falls"
  | "rio-de-janeiro"
  | "queenstown"
  | "great-barrier-reef";

export type Destination = {
  slug: DestinationSlug;
  name: string;
  shortLabel: string;
  /** Shown after the short label in search, e.g. "Kauai, Hawaii". */
  region: string;
  group: "hawaii" | "worldwide";
  /**
   * Viator destination ids queried for helicopter inventory. Results from all ids are
   * merged and de-duplicated by product code.
   */
  viatorDestinationIds: string[];
  /** Viator's own helicopter category page, used as an affiliate fallback when the API is unavailable. */
  viatorBrowseUrl: string;
  /**
   * indexed: has its own SEO landing page and sitemap entry.
   * search-only: reachable through search at /search?destination=…, noindex.
   */
  seo: "indexed" | "search-only";
  /** planned destinations are configured but not yet offered in search. */
  status: "live" | "planned";
  highlights: string;
  blurb: string;
  /** Destinations sharing a Viator destination keep only the listings that are about them. */
  keepListing?: (title: string, description: string) => boolean;
};

const GRAND_CANYON_ROUTE = /grand canyon|west rim|south rim|north rim|north canyon|tusayan|skywalk/i;
const LAS_VEGAS_ROUTE = /las vegas|\bvegas\b|\bstrip\b|red rock|valley of fire|hoover dam/i;

/**
 * Viator's Las Vegas destination lists Grand Canyon excursions alongside Strip and Red Rock
 * flights. The title decides; the description only when the title names neither area.
 */
export function isGrandCanyonListing(title: string, description: string): boolean {
  if (GRAND_CANYON_ROUTE.test(title)) return true;
  if (LAS_VEGAS_ROUTE.test(title)) return false;
  return GRAND_CANYON_ROUTE.test(description);
}

/** Helicopter Tours category tag — safe for front-end filtering (Viator tag docs). */
export const VIATOR_HELICOPTER_TAG_ID = 12026;

export const destinations: Destination[] = [
  {
    slug: "kauai",
    name: "Kauai",
    shortLabel: "Kauai",
    region: "Hawaii",
    group: "hawaii",
    viatorDestinationIds: ["670"],
    viatorBrowseUrl: "https://www.viator.com/Kauai-tours/Helicopter-Tours/d670-g1-c2",
    seo: "indexed",
    status: "live",
    highlights: "Na Pali Coast, Waimea Canyon, waterfalls",
    blurb:
      "Dramatic coastlines, deep valleys and waterfall circuits that are hard to reach by road.",
  },
  {
    slug: "oahu",
    name: "Oahu",
    shortLabel: "Oahu",
    region: "Hawaii",
    group: "hawaii",
    viatorDestinationIds: ["672", "59070"],
    viatorBrowseUrl: "https://www.viator.com/Oahu-tours/Helicopter-Tours/d672-g1-c2",
    seo: "indexed",
    status: "live",
    highlights: "Diamond Head, Pearl Harbor, North Shore",
    blurb:
      "Island circuits covering Honolulu landmarks, windward cliffs and North Shore scenery.",
  },
  {
    slug: "maui",
    name: "Maui",
    shortLabel: "Maui",
    region: "Hawaii",
    group: "hawaii",
    viatorDestinationIds: ["671"],
    viatorBrowseUrl: "https://www.viator.com/Maui-tours/Helicopter-Tours/d671-g1-c2",
    seo: "indexed",
    status: "live",
    highlights: "West Maui, Molokai, Haleakala",
    blurb:
      "West Maui valleys, Molokai sea cliffs, Hana rainforest and Haleakala crater routes.",
  },
  {
    slug: "big-island",
    name: "Hawaii Big Island",
    shortLabel: "Big Island",
    region: "Hawaii",
    group: "hawaii",
    viatorDestinationIds: ["669"],
    viatorBrowseUrl:
      "https://www.viator.com/Big-Island-of-Hawaii-tours/Helicopter-Tours/d669-g1-c2",
    seo: "indexed",
    status: "live",
    highlights: "Volcanoes, Kona, Kohala waterfalls",
    blurb:
      "Kīlauea volcano flights, Kohala waterfalls and Kona coastal routes from Hilo or Kona.",
  },
  {
    slug: "grand-canyon",
    name: "Grand Canyon",
    shortLabel: "Grand Canyon",
    region: "Arizona, USA",
    group: "worldwide",
    // Las Vegas lists most Grand Canyon flights departing the city; d815 covers Tusayan / South Rim departures.
    viatorDestinationIds: ["684", "815"],
    viatorBrowseUrl: "https://www.viator.com/Las-Vegas-tours/Helicopter-Tours/d684-g1-c2",
    seo: "indexed",
    status: "live",
    highlights: "West Rim from Las Vegas, South Rim, canyon landings",
    blurb:
      "Compare West Rim flights from Las Vegas with Tusayan South Rim flights and canyon landings.",
    keepListing: isGrandCanyonListing,
  },
  {
    slug: "las-vegas",
    name: "Las Vegas",
    shortLabel: "Las Vegas",
    region: "Nevada, USA",
    group: "worldwide",
    viatorDestinationIds: ["684"],
    viatorBrowseUrl: "https://www.viator.com/Las-Vegas-tours/Helicopter-Tours/d684-g1-c2",
    seo: "indexed",
    status: "live",
    highlights: "Strip night flights, Red Rock Canyon, Valley of Fire",
    blurb:
      "Short Strip flights by night or day, plus Red Rock Canyon and Valley of Fire landings.",
    keepListing: (title, description) => !isGrandCanyonListing(title, description),
  },
  {
    slug: "new-york",
    name: "New York City",
    shortLabel: "New York City",
    region: "USA",
    group: "worldwide",
    viatorDestinationIds: ["687"],
    viatorBrowseUrl:
      "https://www.viator.com/New-York-City-tours/Helicopter-Tours/d687-g1-c2",
    seo: "indexed",
    status: "live",
    highlights: "Manhattan skyline, Statue of Liberty, Downtown and New Jersey heliports",
    blurb:
      "Short skyline hops to extended Manhattan circuits, departing Downtown Manhattan or New Jersey.",
  },
  {
    slug: "dubai",
    name: "Dubai",
    shortLabel: "Dubai",
    region: "UAE",
    group: "worldwide",
    viatorDestinationIds: ["828"],
    viatorBrowseUrl: "https://www.viator.com/Dubai-tours/Helicopter-Tours/d828-g1-c2",
    seo: "indexed",
    status: "live",
    highlights: "Burj Khalifa, Palm Jumeirah, Dubai Marina",
    blurb:
      "Choose between 12-minute landmark flights and longer private sightseeing routes.",
  },
  {
    slug: "cape-town",
    name: "Cape Town",
    shortLabel: "Cape Town",
    region: "South Africa",
    group: "worldwide",
    viatorDestinationIds: ["318"],
    viatorBrowseUrl: "https://www.viator.com/Cape-Town-tours/Helicopter-Tours/d318-g1-c2",
    seo: "indexed",
    status: "live",
    highlights: "Table Mountain, Twelve Apostles, Cape Point",
    blurb:
      "Coastal routes from the V&A Waterfront, from short city loops to Cape Point flights.",
  },
  {
    slug: "victoria-falls",
    name: "Victoria Falls",
    shortLabel: "Victoria Falls",
    region: "Zimbabwe / Zambia",
    group: "worldwide",
    viatorDestinationIds: ["5309"],
    viatorBrowseUrl:
      "https://www.viator.com/Victoria-Falls-tours/Helicopter-Tours/d5309-g1-c2",
    seo: "indexed",
    status: "live",
    highlights: "Flight of the Angels, Zambezi gorges, game-viewing extensions",
    blurb:
      "12–13 minute falls flights versus 25-minute flights that add the gorges and game areas.",
  },
  {
    slug: "niagara-falls",
    name: "Niagara Falls",
    shortLabel: "Niagara Falls",
    region: "Canada / USA",
    group: "worldwide",
    viatorDestinationIds: ["773"],
    viatorBrowseUrl:
      "https://www.viator.com/Niagara-Falls-and-Around-tours/Helicopter-Tours/d773-g1-c2",
    seo: "search-only",
    status: "planned",
    highlights: "Horseshoe Falls, Niagara Gorge",
    blurb: "Short falls flights and private options on the Canadian side.",
  },
  {
    slug: "rio-de-janeiro",
    name: "Rio de Janeiro",
    shortLabel: "Rio de Janeiro",
    region: "Brazil",
    group: "worldwide",
    viatorDestinationIds: ["712"],
    viatorBrowseUrl:
      "https://www.viator.com/Rio-de-Janeiro-tours/Helicopter-Tours/d712-g1-c2",
    seo: "search-only",
    status: "planned",
    highlights: "Christ the Redeemer, Sugarloaf, Copacabana",
    blurb: "6-minute Sugarloaf hops through to 30-minute city and coast flights.",
  },
  {
    slug: "queenstown",
    name: "Queenstown",
    shortLabel: "Queenstown",
    region: "New Zealand",
    group: "worldwide",
    viatorDestinationIds: ["407"],
    viatorBrowseUrl: "https://www.viator.com/Queenstown-tours/Helicopter-Tours/d407-g1-c2",
    seo: "search-only",
    status: "planned",
    highlights: "The Remarkables, glacier landings, Milford Sound",
    blurb: "Alpine landings, glacier flights and Milford Sound fly-cruise combinations.",
  },
  {
    slug: "great-barrier-reef",
    name: "Great Barrier Reef (Cairns)",
    shortLabel: "Great Barrier Reef",
    region: "Australia",
    group: "worldwide",
    viatorDestinationIds: ["754"],
    viatorBrowseUrl:
      "https://www.viator.com/Cairns-and-the-Tropical-North-tours/Helicopter-Tours/d754-g1-c2",
    seo: "search-only",
    status: "planned",
    highlights: "Green Island, Arlington Reef, reef-edge flights",
    blurb: "Reef scenic flights from Cairns, from 30-minute loops to reef-edge routes.",
  },
];

export const searchableDestinations = destinations.filter((d) => d.status === "live");

/** Live destinations with SEO landing pages (sitemap + canonical hubs). */
export const indexedDestinations = destinations.filter(
  (d) => d.status === "live" && d.seo === "indexed",
);

export const hawaiiIslands = destinations.filter((d) => d.group === "hawaii");

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getSearchableDestination(slug: string | null | undefined): Destination | undefined {
  return searchableDestinations.find((d) => d.slug === slug);
}

/** Results URL for a destination: its SEO landing page, or the noindex search page. */
export function destinationResultsPath(
  slug: DestinationSlug,
  query?: URLSearchParams | Record<string, string>,
): string {
  const dest = getDestination(slug);
  const qs = new URLSearchParams(query);
  if (dest?.seo === "indexed") {
    const s = qs.toString();
    return `/${slug}${s ? `?${s}` : ""}`;
  }
  const params = new URLSearchParams({ destination: slug });
  qs.forEach((v, k) => params.set(k, v));
  return `/search?${params.toString()}`;
}
