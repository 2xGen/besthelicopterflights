import { oahuTours, type OahuTour } from "@/data/oahu-tours";

export type OahuCategorySlug =
  | "doors-off-helicopter-tours"
  | "private-helicopter-tours"
  | "photography-helicopter-tours"
  | "helicopter-tour-prices"
  | "volcano-helicopter-tours";

export type RankedOahuCategoryTour = {
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

export type OahuCategory = {
  slug: OahuCategorySlug;
  path: string;
  navLabel: string;
  h1: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  rankingsHeading: string;
  rankingsIntro: string;
  ranked: RankedOahuCategoryTour[];
};

function tour(id: string): OahuTour {
  const found = oahuTours.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown Oahu tour id: ${id}`);
  return found;
}

export function getOahuTour(id: string): OahuTour {
  return tour(id);
}

export const oahuCategories: OahuCategory[] = [
  {
    slug: "doors-off-helicopter-tours",
    path: "/oahu/doors-off-helicopter-tours",
    navLabel: "Doors-off",
    h1: "Best Doors-Off Helicopter Tours on Oahu",
    title: "Best Doors-Off Helicopter Tours on Oahu (2026)",
    description:
      "Compare the best doors-off (and doors-on/off) helicopter tours on Oahu. We compare routes, flight times, prices and formats so you can choose the right open-air flight.",
    eyebrow: "Oahu · Doors-off",
    intro:
      "Doors-off helicopter tours are one of the most immersive ways to see Oahu from the air. On this island, several Rainbow Helicopters products publish a doors-on or doors-off choice — so you can compare open-air immersion against a more sheltered cabin on the same route family. We ranked the clearest doors-off-capable flights by published duration, landmark coverage, format flexibility and value.",
    rankingsHeading: "Doors-off rankings",
    rankingsIntro:
      "We ranked these flights by how well they deliver a doors-off-capable Oahu experience — duration, route clarity, format choice and from-price — not by marketplace popularity.",
    ranked: [
      {
        tourId: "royal-crown",
        rank: 1,
        award: "Best Full-Hour Doors-On/Off Circuit",
        tableBestFor: "Full-island sightseeing",
        tableDuration: "60 min",
        tableFormat: "Doors on or off",
        why: "Rainbow’s Royal Crown earns the top doors-off-capable slot because it publishes a clear full-hour Honolulu circuit with an explicit doors-on or doors-off choice. For travelers who want Diamond Head, Windward Coast, Sacred Falls, North Shore and Pearl Harbor in one open-air-capable flight, the published duration and landmark coverage line up more clearly than shorter options.",
        chooseIf: [
          "You want a full hour of Oahu sightseeing with a doors-off option",
          "Honolulu Airport–area departure fits your logistics",
          "Maximum island coverage matters more than the lowest from-price",
        ],
      },
      {
        tourId: "path-to-pali",
        rank: 2,
        award: "Best Shorter Doors-On/Off Landmark Flight",
        tableBestFor: "Shorter landmark flight",
        tableDuration: "30 min",
        tableFormat: "Doors on or off",
        why: "Path to Pali Passage ranks next when schedule — not a full-hour loop — is the deciding factor. The published 30-minute doors-on or doors-off route still covers classic South Shore and Pali landmarks (Diamond Head, Hanauma Bay, Mt. Olomana, Nuʻuanu Pali and Pearl Harbor) without committing to Royal Crown’s longer airtime.",
        chooseIf: [
          "You want doors-off capability in about 30 minutes",
          "Classic Honolulu / Pali landmarks are enough",
          "You may want a private-flight upgrade on the same listing",
        ],
      },
      {
        tourId: "last-minute-single",
        rank: 3,
        award: "Best Last-Minute / Solo Doors-On/Off Option",
        tableBestFor: "Solo / last-minute value",
        tableDuration: "20–60 min",
        tableFormat: "Doors on or off",
        why: "The last-minute single-passenger listing is included for solo travelers chasing discounted inventory with a published doors-off or doors-on option. Duration can vary (about 20–60 minutes), so verify the exact flight length on the live product page before treating it as equivalent to the fixed 60-minute Royal Crown.",
        chooseIf: [
          "You are traveling solo and watching for discounted single seats",
          "Flexibility on exact flight length is acceptable",
          "You still want a doors-on/off Rainbow Helicopters option",
        ],
      },
    ],
  },
  {
    slug: "private-helicopter-tours",
    path: "/oahu/private-helicopter-tours",
    navLabel: "Private",
    h1: "Best Private Helicopter Tours on Oahu",
    title: "Best Private Helicopter Tours on Oahu (2026)",
    description:
      "Compare private helicopter tours on Oahu. We compare private cabin and private romantic-landing flights by published duration, format, price and booking details.",
    eyebrow: "Oahu · Private",
    intro:
      "Private helicopter tours on Oahu are ideal for travelers who want to fly with their own group rather than share the aircraft with other passengers. We compared private and private-style options using published duration, price, seating configuration, specialty inclusions and operator information.",
    rankingsHeading: "Private and private-style picks",
    rankingsIntro:
      "Only products that qualify as a private helicopter experience or a clearly private specialty charter appear in this ranking. Shared doors-on/off flights are covered separately below.",
    ranked: [
      {
        tourId: "private-all-window",
        rank: 1,
        award: "Best Private Cabin Value",
        tableFormat: "Private · all window seats",
        tableBestFor: "Private cabin value",
        tableDuration: "55 min",
        why: "Mauna Loa’s private Oahu experience leads this category because it combines a published private helicopter format with all-window seating and about 55 minutes of flight time at a clearer per-person from-price than ultra-premium specialty charters. For couples, families or small groups who want the cabin to themselves without a romantic-landing package, the published format and value line up most clearly.",
        chooseIf: [
          "You want a private cabin at a per-person from-price",
          "All-window seating matters for every passenger",
          "You want ~55 minutes covering Waikiki, Makapuʻu, North Shore and Pearl Harbor",
        ],
      },
      {
        tourId: "romantic-landing",
        rank: 2,
        award: "Best Private Romance / Landing Charter",
        tableFormat: "Private charter + landing",
        tableBestFor: "Private romance / landing",
        tableDuration: "45 min flight",
        why: "Rainbow’s private romantic landing charter ranks as the specialty celebration pick: a published private scenic circuit plus an exclusive landing with leis, chocolates and champagne per the listing. It is priced per group (up to 3), so compare it only when the landing experience itself — not just private sightseeing — is the point.",
        chooseIf: [
          "You want a proposal, anniversary or celebration landing experience",
          "Group pricing (up to 3) fits better than per-person sightseeing rates",
          "An exclusive ground moment matters as much as the aerial circuit",
        ],
      },
    ],
  },
  {
    slug: "photography-helicopter-tours",
    path: "/oahu/photography-helicopter-tours",
    navLabel: "Photography",
    h1: "Best Oahu Helicopter Tours for Photography",
    title: "Best Oahu Helicopter Tours for Photography (2026)",
    description:
      "Compare the best Oahu helicopter tours for photography. We compare doors-on/off options, seating, duration and landmark coverage that matter for aerial photos.",
    eyebrow: "Oahu · Photography",
    intro:
      "For aerial photography on Oahu, unobstructed views, seat positioning and flight time can matter more than a tour’s overall marketing pitch. We compared photography-friendly helicopter tours using doors-on/off format, seating configuration, route coverage, published duration and price.",
    rankingsHeading: "Best flights for aerial photos",
    rankingsIntro:
      "We ranked these options by what tends to matter most with a camera: view clarity, seat positioning, published flight time and landmark coverage — not by marketplace popularity alone.",
    ranked: [
      {
        tourId: "royal-crown",
        rank: 1,
        award: "Best Full-Hour Doors-On/Off for Photos",
        tableBestFor: "Full-hour doors on/off",
        tableDuration: "60 min",
        tableFormat: "Doors on or off",
        why: "A clear 60-minute Honolulu circuit with a published doors-on or doors-off choice gives photographers more airtime for Diamond Head, Windward cliffs, Sacred Falls, North Shore and Pearl Harbor. Rainbow’s Royal Crown ranks first in this photography set for that duration-plus-format combination.",
        chooseIf: [
          "You want more published flight time for composing shots",
          "Open-air shooting is an option you want available",
          "A full-island landmark list matters for your shot plan",
        ],
        relatedLink: {
          href: "/oahu/doors-off-helicopter-tours",
          label: "Compare doors-off helicopter tours on Oahu",
        },
      },
      {
        tourId: "private-all-window",
        rank: 2,
        award: "Best Private All-Window Flight for Photos",
        tableBestFor: "Private all-window seats",
        tableDuration: "55 min",
        tableFormat: "Private · all window",
        why: "Mauna Loa’s private all-window seating is especially relevant for photography groups where every seat needs a usable angle — and strangers are not sharing the cabin. It ranks for seating clarity and private control rather than being the longest flight.",
        chooseIf: [
          "Every passenger wants a strong photo angle",
          "You want the cabin private for your group",
          "All-window seating is non-negotiable",
        ],
        relatedLink: {
          href: "/oahu/private-helicopter-tours",
          label: "Compare private helicopter tours on Oahu",
        },
      },
      {
        tourId: "path-to-pali",
        rank: 3,
        award: "Best Shorter Doors-On/Off Photo Flight",
        tableBestFor: "Shorter landmark photos",
        tableDuration: "30 min",
        tableFormat: "Doors on or off",
        why: "Path to Pali Passage ranks next when you want doors-on/off capability without a full hour. The published 30-minute landmark circuit still covers classic South Shore and Pali subjects — useful when schedule, not maximum airtime, constrains the shoot.",
        chooseIf: [
          "You want doors-off-capable photos in about 30 minutes",
          "Diamond Head / Pali landmarks are enough for the shot list",
          "You may want a private-flight upgrade on the same listing",
        ],
      },
      {
        tourId: "complete-island",
        rank: 4,
        award: "Best Long Glass Sightseeing Circuit for Photos",
        tableBestFor: "Longest scenic circuit",
        tableDuration: "65 min",
        tableFormat: "Glass sightseeing",
        why: "Blue Hawaiian’s Complete Island flight is the longest published scenic circuit in our set (~65 minutes), including west-side landmarks many shorter flights skip. It is ranked for airtime and coverage through a conventional glass cabin — a strong doors-on photography alternative when open-air flying is not required.",
        chooseIf: [
          "You want maximum published scenic airtime",
          "Doors-off is not essential for your camera setup",
          "West Oahu / full-island coverage matters",
        ],
      },
    ],
  },
  {
    slug: "helicopter-tour-prices",
    path: "/oahu/helicopter-tour-prices",
    navLabel: "Prices",
    h1: "Oahu Helicopter Tour Prices",
    title: "Oahu Helicopter Tour Prices (2026 Guide)",
    description:
      "Compare Oahu helicopter tour prices. See from-prices across doors-on/off, private, North Shore and full-island flights, plus what drives cost differences.",
    eyebrow: "Oahu · Prices",
    intro:
      "Oahu helicopter tour prices vary widely by format — doors-on vs doors-off, private vs shared, flight duration, departure base and specialty packages like romantic landings or volcano day trips. Below we organize current from-prices from the tours in our Oahu research set so you can compare cost ranges before you book.",
    rankingsHeading: "Price standouts in our research set",
    rankingsIntro:
      "These picks answer common price questions — cheapest entry, North Shore value, private benchmarks and full-island pricing — not a claim that cheaper is always better.",
    ranked: [
      {
        tourId: "last-minute-single",
        rank: 1,
        award: "Cheapest Entry Price in Our Set",
        tableBestFor: "Solo / last-minute value",
        tableDuration: "20–60 min",
        why: "At about $319 from, Rainbow’s last-minute single-passenger listing is the lowest from-price in our Oahu set. Duration can vary, so confirm the exact flight length before treating it as equivalent to a fixed 60-minute circuit.",
        chooseIf: ["You are price-shopping first and traveling solo"],
      },
      {
        tourId: "discover-north-shore",
        rank: 2,
        award: "Best-Priced North Shore Specialty Flight",
        tableBestFor: "North Shore focus",
        tableDuration: "30 min",
        why: "Around $397 from for a dedicated Turtle Bay North Shore flight is a clear specialty price point when surf coastline — not a full Honolulu circuit — is the goal.",
        chooseIf: ["You want North Shore focus without full-island pricing"],
      },
      {
        tourId: "private-all-window",
        rank: 3,
        award: "Private Cabin Price Benchmark",
        tableBestFor: "Private cabin value",
        tableDuration: "55 min",
        why: "About $415 from for Mauna Loa’s private all-window experience is a useful per-person private benchmark — higher than some shared short flights, lower than ultra-premium group specialty charters.",
        chooseIf: ["You are budgeting specifically for a private cabin"],
        relatedLink: {
          href: "/oahu/private-helicopter-tours",
          label: "Compare private helicopter tours on Oahu",
        },
      },
      {
        tourId: "path-to-pali",
        rank: 4,
        award: "Mid-Range Doors-On/Off Landmark Flight",
        tableBestFor: "Shorter landmark flight",
        tableDuration: "30 min",
        why: "Around $440 from places Path to Pali in the mid-range for a published 30-minute doors-on or doors-off Honolulu landmark circuit — useful when comparing shorter open-air-capable flights against the full-hour Royal Crown.",
        chooseIf: ["You want doors-on/off flexibility without the highest shared from-price"],
      },
      {
        tourId: "royal-crown",
        rank: 5,
        award: "Full-Hour Doors-On/Off Price Benchmark",
        tableBestFor: "Full-island sightseeing",
        tableDuration: "60 min",
        why: "About $540 from for Rainbow’s Royal Crown is a clear full-hour doors-on/off benchmark — typically below the longest glass full-island options while delivering a published hour of landmark coverage.",
        chooseIf: ["You are budgeting for a full-hour Honolulu circuit"],
      },
    ],
  },
  {
    slug: "volcano-helicopter-tours",
    path: "/oahu/volcano-helicopter-tours",
    navLabel: "Volcano",
    h1: "Oahu Volcano Helicopter Day Trips",
    title: "Oahu to Big Island Volcano Helicopter Day Trips (2026)",
    description:
      "Compare Oahu volcano helicopter day trips to the Big Island. See the Hilo volcano package with helicopter flyover, inclusions, pricing and when it beats an Oahu-only scenic flight.",
    eyebrow: "Oahu · Volcano",
    intro:
      "Looking for volcanoes from Oahu? That usually means an island-hop day trip to Hawaiʻi Island — not a Diamond Head sightseeing flight. We researched the published Oahu-to-Hilo volcano adventure in our set so you can compare it against Oahu-only helicopter tours before you book.",
    rankingsHeading: "Volcano day-trip pick",
    rankingsIntro:
      "Only one product in our current Oahu research set is a true volcano day trip from Oahu. It is ranked here as the clear fit for that intent — not as a substitute for Oahu aerial sightseeing.",
    ranked: [
      {
        tourId: "volcano-day-trip",
        rank: 1,
        award: "Best Oahu–Hilo Volcano Day Trip With Helicopter",
        tableBestFor: "Big Island volcano day trip",
        tableDuration: "12 hr day · 45 min flight",
        tableFormat: "Island-hop package",
        why: "Polynesian Adventure Tours’ full-day Oahu-to-Hilo package is the only volcano-focused product in our Oahu set. It combines interisland transport, Hawaii Volcanoes National Park sightseeing and a published ~45-minute Big Island helicopter segment. Choose it when active-volcano terrain is the goal — not when you want Diamond Head or Pearl Harbor from the air over Oahu.",
        chooseIf: [
          "You specifically want Kīlauea / Mauna Loa volcano scenery",
          "A full-day island-hop package fits your schedule",
          "Oahu-only aerial sightseeing is not the primary goal",
        ],
      },
    ],
  },
];

export function getOahuCategory(slug: OahuCategorySlug): OahuCategory {
  const found = oahuCategories.find((c) => c.slug === slug);
  if (!found) throw new Error(`Unknown Oahu category: ${slug}`);
  return found;
}

export function getOahuRankedTours(category: OahuCategory) {
  return category.ranked
    .slice()
    .sort((a, b) => a.rank - b.rank)
    .map((row) => ({
      ...row,
      tour: tour(row.tourId),
    }));
}

export const oahuCategoryNav = oahuCategories.map((c) => ({
  href: c.path,
  label: c.navLabel,
}));
