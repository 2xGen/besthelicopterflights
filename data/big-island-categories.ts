import { bigIslandTours, type BigIslandTour } from "@/data/big-island-tours";

export type BigIslandCategorySlug =
  | "doors-off-helicopter-tours"
  | "photography-helicopter-tours"
  | "helicopter-tour-prices"
  | "kilauea-volcano";

export type RankedBigIslandCategoryTour = {
  tourId: string;
  rank: number;
  award: string;
  why: string;
  chooseIf: string[];
  tableBestFor: string;
  tableDuration: string;
  tableFormat?: string;
  relatedLink?: {
    href: string;
    label: string;
  };
};

export type BigIslandCategory = {
  slug: BigIslandCategorySlug;
  path: string;
  navLabel: string;
  h1: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  rankingsHeading: string;
  rankingsIntro: string;
  ranked: RankedBigIslandCategoryTour[];
};

function tour(id: string): BigIslandTour {
  const found = bigIslandTours.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown Big Island tour id: ${id}`);
  return found;
}

export function getBigIslandTour(id: string): BigIslandTour {
  return tour(id);
}

export const bigIslandCategories: BigIslandCategory[] = [
  {
    slug: "doors-off-helicopter-tours",
    path: "/big-island/doors-off-helicopter-tours",
    navLabel: "Doors-off",
    h1: "Best Doors-Off Helicopter Tours on the Big Island",
    title: "Best Doors-Off Helicopter Tours on the Big Island (2026)",
    description:
      "Compare doors-off (and doors-on/off) helicopter tours on the Big Island. See Kīlauea, Kohala and Kona coastal flights with open-cabin options from Rainbow Helicopters.",
    eyebrow: "Big Island · Doors-off",
    intro:
      "Doors-off helicopter tours are one of the most immersive ways to see Hawaiʻi Island from the air. In our current research set, Rainbow Helicopters publishes the clearest doors-on or doors-off choices — from shorter Kona coastal hops to longer Kīlauea and Kohala circuits. We ranked those flights by published duration, volcano vs coast focus, format flexibility and value.",
    rankingsHeading: "Doors-off rankings",
    rankingsIntro:
      "We ranked these flights by how well they deliver a doors-off-capable Big Island experience — duration, route clarity, format choice and from-price — not by marketplace popularity. Active lava viewing is never guaranteed.",
    ranked: [
      {
        tourId: "kilauea-eruption-105",
        rank: 1,
        award: "Best Full-Length Doors-On/Off Volcano Circuit",
        tableBestFor: "Doors-on/off volcano deep dive",
        tableDuration: "105 min",
        tableFormat: "Doors on or off",
        why: "Rainbow’s 105-minute Kīlauea eruption tour earns the top doors-off-capable slot for published airtime to one of the world’s most active volcanoes, with Hāmākua and Kohala valleys on the return. For travelers who want open-cabin immersion and maximum volcano focus from Kona, the duration and format line up more clearly than shorter coastal options.",
        chooseIf: [
          "You want doors-off capability with a long Kīlauea circuit",
          "Volcano scenery is the primary reason you are flying",
          "About 105 minutes of flight time fits your schedule and budget",
        ],
        relatedLink: {
          href: "/big-island/kilauea-volcano",
          label: "Compare Kīlauea volcano helicopter tours",
        },
      },
      {
        tourId: "kohala-volcano-90",
        rank: 2,
        award: "Best Mid-Length Doors-On/Off Volcano + Waterfalls",
        tableBestFor: "Doors-on/off volcano + Kohala",
        tableDuration: "90 min",
        tableFormat: "Doors on or off",
        why: "The 90-minute Kohala Coast volcano and waterfalls flight ranks next when you want doors-on/off flexibility with summit geography and Pololū / Waipiʻo valleys — without committing to the longest Kīlauea listing.",
        chooseIf: [
          "You want doors-off optionality in about 90 minutes",
          "Kohala waterfall valleys matter alongside volcano scenery",
          "The full 105-minute Kīlauea product is more than you need",
        ],
      },
      {
        tourId: "kona-hualalai-60",
        rank: 3,
        award: "Best Hour Doors-On/Off Kona & Hualālai Flight",
        tableBestFor: "Mid-length Kona & Hualālai",
        tableDuration: "60 min",
        tableFormat: "Doors on or off",
        why: "Rainbow’s 60-minute Kona Coast / Hualālai tour ranks for travelers who want open-cabin capability focused on Kona coastline and Hualālai rather than a full island-crossing to Kīlauea.",
        chooseIf: [
          "Kona Coast and Hualālai are enough for this flight",
          "You want doors-on/off in about an hour",
          "You are not prioritizing Kīlauea park scenery",
        ],
      },
      {
        tourId: "kona-coastal-45",
        rank: 4,
        award: "Best Shorter Doors-On/Off Kona Coastal Hop",
        tableBestFor: "Shorter doors-on/off Kona coast",
        tableDuration: "45 min",
        tableFormat: "Doors on or off",
        why: "The 45-minute Coastal Sights Unseen flight ranks when schedule — not maximum volcano coverage — is the deciding factor. It still publishes doors-on or doors-off choice over classic Kona landmarks.",
        chooseIf: [
          "You want doors-off capability in about 45 minutes",
          "Kona coastal scenery is enough",
          "A lower mid-range from-price than longer Rainbow products matters",
        ],
      },
    ],
  },
  {
    slug: "photography-helicopter-tours",
    path: "/big-island/photography-helicopter-tours",
    navLabel: "Photography",
    h1: "Best Big Island Helicopter Tours for Photography",
    title: "Best Big Island Helicopter Tours for Photography (2026)",
    description:
      "Compare the best Big Island helicopter tours for photography — doors-on/off volcano flights, private window seats, Kohala valleys and landing stops ranked for aerial photo fit.",
    eyebrow: "Big Island · Photography",
    intro:
      "For aerial photography on Hawaiʻi Island, cabin format, volcano vs waterfall geography and published flight time can matter more than a tour’s marketing pitch. We compared photography-friendly helicopter tours using doors-on/off format, private seating, route coverage, duration and price.",
    rankingsHeading: "Best flights for aerial photos",
    rankingsIntro:
      "We ranked these options by what tends to matter most with a camera: view clarity, published flight time and landmark coverage — not by marketplace popularity alone. Active lava or glow shots are never guaranteed.",
    ranked: [
      {
        tourId: "kilauea-eruption-105",
        rank: 1,
        award: "Best Doors-On/Off Flight for Volcano Photos",
        tableBestFor: "Doors-on/off volcano deep dive",
        tableDuration: "105 min",
        tableFormat: "Doors on or off",
        why: "Maximum published airtime with an open-cabin option toward Kīlauea gives photographers more chances to recompose as light and clouds shift. Rainbow’s 105-minute listing ranks first when volcano subjects dominate the shot list.",
        chooseIf: [
          "You want open-air shooting available for volcano scenery",
          "Longer published flight time matters for composing shots",
          "Hāmākua / Kohala valleys are useful secondary subjects",
        ],
        relatedLink: {
          href: "/big-island/doors-off-helicopter-tours",
          label: "Compare doors-off helicopter tours on the Big Island",
        },
      },
      {
        tourId: "private-big-island-experience",
        rank: 2,
        award: "Best Private Window-Seat Circuit for Photos",
        tableBestFor: "Private full-island circuit",
        tableDuration: "120 min",
        tableFormat: "Private · window seats",
        why: "Mauna Loa’s private Big Island Experience ranks for groups that want cabin exclusivity and published window seating on a ~2-hour Kona-to-Kīlauea-to-Kohala circuit — useful when strangers sharing the cabin would hurt your shoot.",
        chooseIf: [
          "Every passenger wants strong window angles",
          "You want the cabin private for your group",
          "A full private island circuit fits better than a shared doors-off product",
        ],
      },
      {
        tourId: "kohala-volcano-90",
        rank: 3,
        award: "Best Mid-Length Doors-On/Off Photo Flight",
        tableBestFor: "Doors-on/off volcano + Kohala",
        tableDuration: "90 min",
        tableFormat: "Doors on or off",
        why: "Ninety minutes with doors-on/off choice covering volcano summits and Kohala waterfall valleys ranks when you want open-air options without the longest Kīlauea from-price.",
        chooseIf: [
          "You want doors-off-capable photos in about 90 minutes",
          "Kohala cliffs and falls are on the shot list",
          "Budget sits below the 105-minute eruption product",
        ],
      },
      {
        tourId: "exclusive-landing-spectacular",
        rank: 4,
        award: "Best Landing Flight for Ground + Air Photos",
        tableBestFor: "Island overview + waterfall landing",
        tableDuration: "140 min",
        tableFormat: "Shared + waterfall landing",
        why: "Blue Hawaiian’s Spectacular with exclusive landing adds published ground time at a remote waterfall after island-crossing aerials — ranked for dual-environment photography rather than doors-off format alone.",
        chooseIf: [
          "You want aerial plus landing-site photo opportunities",
          "Waikoloa departure logistics fit your stay",
          "A premium package price is acceptable for the landing",
        ],
      },
    ],
  },
  {
    slug: "kilauea-volcano",
    path: "/big-island/kilauea-volcano",
    navLabel: "Kīlauea",
    h1: "Best Kīlauea Volcano Helicopter Tours",
    title: "Best Kīlauea Volcano Helicopter Tours on the Big Island (2026)",
    description:
      "Compare Big Island helicopter tours that fly Kīlauea and Hawaii Volcanoes National Park — from Kona doors-on/off circuits to Hilo park specialists and Waikoloa island overviews.",
    eyebrow: "Big Island · Kīlauea",
    intro:
      "Looking for Kīlauea from the air? Depending on where you stay, that can mean a long Kona-based doors-on/off circuit, a private Mauna Loa island experience, a Waikoloa Spectacular crossing, or a shorter Hilo departure into Hawaii Volcanoes National Park. We ranked the clearest volcano-focused flights in our set by published route emphasis, duration, departure base and value. Active lava or glow viewing is never guaranteed.",
    rankingsHeading: "Kīlauea helicopter rankings",
    rankingsIntro:
      "We ranked these flights by how clearly they deliver Kīlauea / Volcanoes National Park aerial sightseeing — not by marketplace popularity. Conditions change daily; verify current activity language on the live listing.",
    ranked: [
      {
        tourId: "kilauea-eruption-105",
        rank: 1,
        award: "Best Dedicated Kīlauea Doors-On/Off Circuit from Kona",
        tableBestFor: "Doors-on/off volcano deep dive",
        tableDuration: "105 min",
        tableFormat: "Doors on or off",
        why: "Rainbow’s published Kīlauea Eruption product is the clearest volcano-first doors-on/off flight in our Kona set, with about 105 minutes covering the park approach plus Hāmākua / Kohala scenery on the return.",
        chooseIf: [
          "Kīlauea is the primary reason you are flying",
          "You want doors-on or doors-off choice from Kona",
          "A longer premium flight fits your schedule",
        ],
        relatedLink: {
          href: "/big-island/doors-off-helicopter-tours",
          label: "Compare doors-off helicopter tours on the Big Island",
        },
      },
      {
        tourId: "private-big-island-experience",
        rank: 2,
        award: "Best Private Circuit Including Kīlauea",
        tableBestFor: "Private full-island circuit",
        tableDuration: "120 min",
        tableFormat: "Private",
        why: "Mauna Loa’s private ~2-hour experience ranks for small groups who want cabin exclusivity on a Kona-to-Kīlauea saddle route with Hāmākua and Kohala valleys — at a clearer per-person from-price than ultra-premium romance packages.",
        chooseIf: [
          "You want a private cabin for your group",
          "Kīlauea plus waterfall valleys in one private circuit",
          "Window seating for every passenger matters",
        ],
      },
      {
        tourId: "big-island-spectacular",
        rank: 3,
        award: "Best Shared Waikoloa Island Overview with Kīlauea",
        tableBestFor: "Shared island overview from Waikoloa",
        tableDuration: "105 min flight",
        tableFormat: "Glass sightseeing",
        why: "Blue Hawaiian’s Spectacular is the classic shared Waikoloa product that includes published Kīlauea / Volcanoes National Park coverage plus Hāmākua and Kohala — ideal when you are staying on the Kohala resort side.",
        chooseIf: [
          "Waikoloa departure is more convenient than Kona or Hilo",
          "You want a shared Eco-Star island overview including the volcano",
          "Doors-off is not required",
        ],
      },
      {
        tourId: "volcanoes-safari",
        rank: 4,
        award: "Best Hilo Volcano Park Value Flight",
        tableBestFor: "Hilo volcano value",
        tableDuration: "55 min",
        tableFormat: "Glass sightseeing",
        why: "Safari Helicopters’ Volcanoes National Park Safari ranks for Hilo-side travelers who want a shorter, lower from-price park-focused flight without a full island-crossing from Kona or Waikoloa.",
        chooseIf: [
          "You are already on the Hilo side",
          "Hawaii Volcanoes National Park is the goal",
          "You want a mid-range from-price volcano specialist",
        ],
      },
      {
        tourId: "discover-hilo",
        rank: 5,
        award: "Best Blue Hawaiian Hilo Volcano Circuit",
        tableBestFor: "Hilo volcano & crater scenery",
        tableDuration: "50 min",
        tableFormat: "Eco-Star sightseeing",
        why: "Blue Hawaiian’s Discover Hilo (Circle of Fire) product ranks as the Eco-Star Hilo alternative for Kīlauea / Mauna Loa park landscapes when you prefer Blue Hawaiian’s Hilo base over Safari’s listing.",
        chooseIf: [
          "You want a Blue Hawaiian Hilo Eco-Star volcano flight",
          "About 50 minutes of park-focused flying is enough",
          "You are comparing Hilo operators side by side",
        ],
      },
    ],
  },
  {
    slug: "helicopter-tour-prices",
    path: "/big-island/helicopter-tour-prices",
    navLabel: "Prices",
    h1: "Big Island Helicopter Tour Prices",
    title: "Big Island Helicopter Tour Prices (2026 Guide)",
    description:
      "Compare Big Island helicopter tour prices. See from-prices across doors-off, private, Kīlauea, Kohala, Hilo and Kona flights, plus what drives cost differences.",
    eyebrow: "Big Island · Prices",
    intro:
      "Big Island helicopter tour prices vary widely by format — doors-on/off, private vs shared, flight duration, Kona vs Waikoloa vs Hilo departure, exclusive landings and specialty romance packages. Below we organize current from-prices from the tours in our research set so you can compare cost ranges before you book.",
    rankingsHeading: "Price standouts in our research set",
    rankingsIntro:
      "These picks answer common price questions — cheapest entry, volcano value, private waterfall benchmarks and premium doors-off volcano pricing — not a claim that cheaper is always better.",
    ranked: [
      {
        tourId: "private-kona-coast-30",
        rank: 1,
        award: "Cheapest Entry Price in Our Set",
        tableBestFor: "Private short Kona intro",
        tableDuration: "30 min",
        why: "At about $241 from, Mauna Loa’s private 30-minute Kona Coast flight is the lowest from-price in our Big Island set. It is a short coastal intro — not a Kīlauea or Kohala valley substitute.",
        chooseIf: ["You are price-shopping first for a short private coastal hop"],
      },
      {
        tourId: "volcanoes-safari",
        rank: 2,
        award: "Best-Priced Volcano Park Flight",
        tableBestFor: "Hilo volcano value",
        tableDuration: "55 min",
        why: "Around $406 from for Safari’s Hilo Volcanoes National Park Safari is a clear volcano specialty price point when you are already on the Hilo side.",
        chooseIf: ["You want Hilo-side volcano park focus without island-crossing pricing"],
        relatedLink: {
          href: "/big-island/kilauea-volcano",
          label: "Compare Kīlauea volcano helicopter tours",
        },
      },
      {
        tourId: "private-magical-waterfall",
        rank: 3,
        award: "Private Kohala Waterfall Price Benchmark",
        tableBestFor: "Private Kohala waterfall valleys",
        tableDuration: "75 min",
        why: "About $451 from for Mauna Loa’s private Magical Waterfall tour is a useful private waterfall benchmark — higher than short coastal hops, lower than long shared volcano circuits.",
        chooseIf: ["You are budgeting specifically for a private Kohala waterfall flight"],
      },
      {
        tourId: "kohala-waterfalls-valleys",
        rank: 4,
        award: "Shared Kohala Entry Benchmark",
        tableBestFor: "Shorter Kohala valleys from Waikoloa",
        tableDuration: "45 min",
        why: "Around $499 from places Blue Hawaiian’s Kohala Waterfalls & Valleys as an accessible Waikoloa shared entry — useful when comparing against landing packages and Spectacular pricing.",
        chooseIf: ["You want Kohala valleys without volcano island-crossing cost"],
      },
      {
        tourId: "kilauea-eruption-105",
        rank: 5,
        award: "Premium Doors-On/Off Volcano Price Benchmark",
        tableBestFor: "Doors-on/off volcano deep dive",
        tableDuration: "105 min",
        why: "About $1,180 from for Rainbow’s 105-minute Kīlauea doors-on/off product is the premium volcano benchmark in our set — useful when budgeting for maximum published volcano airtime.",
        chooseIf: ["You are budgeting for a long doors-on/off Kīlauea circuit"],
      },
    ],
  },
];

export function getBigIslandCategory(slug: BigIslandCategorySlug): BigIslandCategory {
  const found = bigIslandCategories.find((c) => c.slug === slug);
  if (!found) throw new Error(`Unknown Big Island category: ${slug}`);
  return found;
}

export function getBigIslandRankedTours(category: BigIslandCategory) {
  return category.ranked
    .slice()
    .sort((a, b) => a.rank - b.rank)
    .map((row) => ({
      ...row,
      tour: tour(row.tourId),
    }));
}

export const bigIslandCategoryNav = bigIslandCategories.map((c) => ({
  href: c.path,
  label: c.navLabel,
}));
