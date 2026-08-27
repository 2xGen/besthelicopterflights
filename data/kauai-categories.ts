import { kauaiTours, type KauaiTour } from "@/data/kauai-tours";

export type CategorySlug =
  | "doors-off-helicopter-tours"
  | "private-helicopter-tours"
  | "waterfall-helicopter-tours"
  | "photography-helicopter-tours"
  | "helicopter-tour-prices";

export type RankedCategoryTour = {
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

export type KauaiCategory = {
  slug: CategorySlug;
  path: string;
  navLabel: string;
  h1: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  rankingsHeading: string;
  rankingsIntro: string;
  ranked: RankedCategoryTour[];
};

function tour(id: string): KauaiTour {
  const found = kauaiTours.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown tour id: ${id}`);
  return found;
}

export function getTour(id: string): KauaiTour {
  return tour(id);
}

export const kauaiCategories: KauaiCategory[] = [
  {
    slug: "doors-off-helicopter-tours",
    path: "/kauai/doors-off-helicopter-tours",
    navLabel: "Doors-off",
    h1: "Best Doors-Off Helicopter Tours on Kauai",
    title: "Best Doors-Off Helicopter Tours on Kauai (2026)",
    description:
      "Compare the best doors-off helicopter tours on Kauai. We compare routes, flight times, prices, reviews and operators to help you choose the right flight.",
    eyebrow: "Kauai · Doors-off",
    intro:
      "Doors-off helicopter tours are one of the most immersive ways to see Kauai from the air. We compared the island’s leading doors-off flights based on traveler reviews, flight duration, route, price, seating configuration and published booking terms.",
    rankingsHeading: "Doors-off rankings",
    rankingsIntro:
      "We ranked these flights by how well they deliver an open-air experience — duration, seating, traveler feedback and value — not by marketplace popularity.",
    ranked: [
      {
        tourId: "private-doors-off",
        rank: 1,
        award: "Best Private Doors-Off Experience",
        tableBestFor: "Private experience",
        tableDuration: "75 min",
        why: "Aliʻi’s private doors-off charter earns the top doors-off slot because it combines a perfect listed traveler rating, a large review base and a longer published flight time — not simply because it is private. For travelers who want open-air waterfall viewing without sharing the cabin, the published format and feedback patterns line up more clearly than shared doors-off products.",
        chooseIf: [
          "You want a private cabin rather than a shared flight",
          "A longer published flight time matters for waterfalls and coastlines",
          "You are comparing premium doors-off options and care about review consistency",
        ],
      },
      {
        tourId: "luxury-doors-off",
        rank: 2,
        award: "Best 60-Minute Doors-Off Tour",
        tableBestFor: "Full-hour doors-off",
        tableDuration: "60 min",
        why: "Jack Harter’s full-hour doors-off adventure is the clearest pick when published flight time is the deciding factor. A dedicated 60-minute doors-off product is easier to evaluate against shorter shared flights, and traveler ratings remain strong for the open-air format.",
        chooseIf: [
          "You specifically want a full hour of doors-off flying",
          "Photography time in the air matters more than a private cabin",
          "You want a well-known Kauai doors-off operator with a clear duration claim",
        ],
      },
      {
        tourId: "kauai-experience",
        rank: 3,
        award: "Best Doors-Off Tour With All Window Seats",
        tableBestFor: "All-window seating",
        tableDuration: "55 min",
        why: "Mauna Loa’s doors-off experience is ranked for seating configuration: the published all-window-seat positioning is particularly useful when every passenger wants an unobstructed open-air view. It also sits at a lower from-price than the longer private Aliʻi charter.",
        chooseIf: [
          "All-window seating is a must",
          "You want doors-off immersion without the highest private from-price",
          "A mid-length ~55-minute published flight fits your schedule",
        ],
      },
      {
        tourId: "air-kauai-doors-off",
        rank: 4,
        award: "Best Alternative Doors-Off Flight",
        tableBestFor: "Doors-off option",
        tableDuration: "See listing",
        why: "Air Kauai’s doors-off adventure is a strong alternative when you want another operator to compare on route notes, seat layout and booking terms. It expands the doors-off set beyond Jack Harter, Mauna Loa and Aliʻi so you are not choosing from a single brand.",
        chooseIf: [
          "You want another doors-off operator to compare side by side",
          "You are checking seat configuration and booking terms carefully",
          "You prefer a mid-range from-price among doors-off options",
        ],
      },
      {
        tourId: "heart-of-island",
        rank: 5,
        award: "Best Lower-Priced Doors-Off Option",
        tableBestFor: "Lower price",
        tableDuration: "See listing",
        why: "Jack Harter’s Heart of the Island doors-off tour is included for travelers whose first filter is price. The from-price is the lowest in this doors-off set — but you should verify published duration and route coverage against the 60-minute Jack Harter adventure before booking on price alone.",
        chooseIf: [
          "Price is your biggest consideration",
          "You still want a doors-off cabin rather than doors-on",
          "You are willing to compare duration carefully against longer flights",
        ],
      },
    ],
  },
  {
    slug: "private-helicopter-tours",
    path: "/kauai/private-helicopter-tours",
    navLabel: "Private",
    h1: "Best Private Helicopter Tours on Kauai",
    title: "Best Private Helicopter Tours on Kauai (2026)",
    description:
      "Compare private helicopter tours on Kauai. We compare private and private-style doors-off flights by reviews, duration, price and published booking details.",
    eyebrow: "Kauai · Private",
    intro:
      "Private helicopter tours on Kauai are ideal for travelers who want to fly with their own group rather than share the aircraft with other passengers. We compared private and private-style options using traveler reviews, published duration, price, seating configuration and operator information.",
    rankingsHeading: "Private and private-style picks",
    rankingsIntro:
      "Only products that qualify as a private charter or a clearly private-style seating format appear in this ranking. Shared flights are covered separately below.",
    ranked: [
      {
        tourId: "private-doors-off",
        rank: 1,
        award: "Best Overall Private Charter",
        tableFormat: "Private charter",
        tableBestFor: "Best overall",
        tableDuration: "75 min",
        why: "Aliʻi’s private doors-off tour leads this category because it combines a true private charter format with a 75-minute published flight and a strong traveler rating and review base.",
        chooseIf: [
          "You want a fully private experience",
          "Doors-off photography is part of the plan",
          "You are booking for a couple, family or small group that wants the cabin to themselves",
        ],
      },
      {
        tourId: "kauai-experience",
        rank: 2,
        award: "Best Private-Style All-Window Flight",
        tableFormat: "Private-style / all-window",
        tableBestFor: "All-window seating",
        tableDuration: "55 min",
        why: "Mauna Loa’s all-window-seat configuration makes it particularly relevant for travelers who prioritize an unobstructed view for every passenger. It is ranked as private-style — not as a confirmed full private charter — and sits at a lower from-price than the longer Aliʻi private product.",
        chooseIf: [
          "All-window seats matter as much as exclusivity",
          "You want a private-style option under the top private from-price",
          "A ~55-minute published flight is enough",
        ],
      },
    ],
  },
  {
    slug: "waterfall-helicopter-tours",
    path: "/kauai/waterfall-helicopter-tours",
    navLabel: "Waterfalls",
    h1: "Best Kauai Helicopter Tours for Waterfalls",
    title: "Best Kauai Helicopter Tours for Waterfalls (2026)",
    description:
      "Compare the best Kauai helicopter tours for waterfalls. We compare waterfall-focused routes, durations, prices and traveler feedback.",
    eyebrow: "Kauai · Waterfalls",
    intro:
      "Kauai’s remote waterfall valleys are a major reason travelers book helicopter sightseeing. We compared tours that emphasize waterfalls or waterfall-heavy positioning using published route focus, traveler feedback, duration and price.",
    rankingsHeading: "Waterfall-focused rankings",
    rankingsIntro:
      "We rank these tours by how well they fit travelers whose main priority is seeing Kauai’s waterfalls. We consider the published route focus first, then traveler feedback, duration, price and experience format.",
    ranked: [
      {
        tourId: "waterfall-safari",
        rank: 1,
        award: "Best Dedicated Waterfall Safari",
        tableBestFor: "Waterfall focus",
        tableDuration: "55 min",
        why: "Safari Helicopters’ Deluxe Waterfall Safari is the clearest waterfall-specialist product in our set: the published waterfall positioning, strong review volume and relatively accessible from-price make it the category lead for travelers who primarily want cascades and lush valleys.",
        chooseIf: [
          "Waterfalls are your top scenic priority",
          "You want a dedicated waterfall product rather than a general island tour",
          "Value relative to a ~55-minute flight matters",
        ],
      },
      {
        tourId: "private-doors-off",
        rank: 2,
        award: "Best Private Waterfall Flight",
        tableBestFor: "Private waterfalls",
        tableDuration: "75 min",
        why: "Aliʻi’s private doors-off “Ultimate Waterfalls” product ranks next when you want waterfall emphasis plus a private cabin and longer published flight time. Traveler ratings are exceptionally strong across a large review base.",
        chooseIf: [
          "You want waterfalls and a private doors-off cabin",
          "A longer published flight is worth the higher from-price",
          "You are booking a special occasion or small group",
        ],
        relatedLink: {
          href: "/kauai/private-helicopter-tours",
          label: "Compare private helicopter tours on Kauai",
        },
      },
      {
        tourId: "eco-adventure",
        rank: 3,
        award: "Best Island-Wide Tour Including Waterfalls",
        tableBestFor: "Island overview",
        tableDuration: "50 min",
        why: "Blue Hawaiian’s Eco Adventure is not a waterfall-specialist product, but its island-wide sightseeing positioning makes it a strong option for travelers who want waterfalls alongside other major Kauai scenery.",
        chooseIf: [
          "You want waterfalls as part of a broader island sightseeing experience",
          "You prefer a well-known eco-sightseeing framing",
          "A dedicated waterfall safari feels too narrow for your trip",
        ],
      },
      {
        tourId: "jurassic-canyon",
        rank: 4,
        award: "Best Canyon Landing Alternative",
        tableBestFor: "Canyon landing",
        tableDuration: "See listing",
        why: "Safari’s Jurassic Canyon Landing tour is included for travelers who want waterfall scenery plus a landing experience — not because a landing is inherently better for waterfalls. Compare landing inclusions carefully against pure aerial waterfall flights.",
        chooseIf: [
          "A canyon landing is specifically on your wishlist",
          "You want waterfall scenery plus a landing, not aerial-only flying",
          "You will verify landing inclusions on the live listing before booking",
        ],
      },
    ],
  },
  {
    slug: "photography-helicopter-tours",
    path: "/kauai/photography-helicopter-tours",
    navLabel: "Photography",
    h1: "Best Kauai Helicopter Tours for Photography",
    title: "Best Kauai Helicopter Tours for Photography (2026)",
    description:
      "Compare the best Kauai helicopter tours for photography. We compare unobstructed views, seating, duration, route coverage and published tour details that matter for aerial photos.",
    eyebrow: "Kauai · Photography",
    intro:
      "For aerial photography on Kauai, unobstructed views, seat positioning and flight time can make a bigger difference than a tour’s overall rating. We compared photography-friendly helicopter tours using doors-off format, seating configuration, route coverage, published duration, traveler feedback and price.",
    rankingsHeading: "Best flights for aerial photos",
    rankingsIntro:
      "We ranked these options by what tends to matter most with a camera: view clarity, seat positioning, published flight time and route coverage — not by overall marketplace popularity alone.",
    ranked: [
      {
        tourId: "luxury-doors-off",
        rank: 1,
        award: "Best Full-Hour Doors-Off for Photos",
        tableBestFor: "Full-hour doors-off",
        tableDuration: "60 min",
        why: "A clear 60-minute doors-off product gives photographers more published airtime for Na Pali, canyons and waterfalls without committing to a private charter price. Jack Harter’s luxury doors-off adventure is ranked first in this photography set for that duration advantage.",
        chooseIf: [
          "You want more published flight time for composing shots",
          "A shared premium flight is acceptable",
          "Open-air shooting matters more than a private cabin",
        ],
      },
      {
        tourId: "kauai-experience",
        rank: 2,
        award: "Best All-Window Doors-Off for Photos",
        tableBestFor: "All-window seats",
        tableDuration: "55 min",
        why: "Mauna Loa’s all-window-seat doors-off format is especially relevant for photography groups where every seat needs a usable angle. It is ranked for seating clarity, not for being the longest flight — a useful tradeoff against Jack Harter’s full-hour option.",
        chooseIf: [
          "Every passenger wants a strong photo angle",
          "All-window seating is non-negotiable",
          "You want doors-off without the top private from-price",
        ],
      },
      {
        tourId: "private-doors-off",
        rank: 3,
        award: "Best Private Doors-Off for Photos",
        tableBestFor: "Private doors-off",
        tableDuration: "75 min",
        why: "Aliʻi’s private doors-off charter ranks highly for photographers who want control of the cabin and a longer published flight. It is especially useful for couples or small groups shooting together without strangers in frame or in the way.",
        chooseIf: [
          "You want the cabin private for your group",
          "Longer published flight time helps your shot list",
          "Budget allows a premium private from-price",
        ],
        relatedLink: {
          href: "/kauai/private-helicopter-tours",
          label: "Compare private helicopter tours on Kauai",
        },
      },
      {
        tourId: "air-kauai-doors-off",
        rank: 4,
        award: "Best Alternative Doors-Off Photo Flight",
        tableBestFor: "Doors-off alternative",
        tableDuration: "See listing",
        why: "Air Kauai’s doors-off adventure gives photographers another operator and price point to compare when evaluating seat layout, route notes and booking terms.",
        chooseIf: [
          "You want another doors-off operator to compare",
          "You are comparing operators beyond Jack Harter and Mauna Loa",
          "You want another doors-off option without choosing the highest-priced flight",
        ],
      },
      {
        tourId: "heart-of-island",
        rank: 5,
        award: "Best Budget Doors-Off for Photos",
        tableBestFor: "Lower price doors-off",
        tableDuration: "See listing",
        why: "Heart of the Island is the lowest from-price doors-off option in our set — useful as a budget photography entry point if you verify duration and route coverage before expecting the same coverage as a 60-minute flight.",
        chooseIf: [
          "You want doors-off photos on a tighter budget",
          "You will confirm duration on the live listing",
          "You accept a potentially shorter route for a lower from-price",
        ],
      },
    ],
  },
  {
    slug: "helicopter-tour-prices",
    path: "/kauai/helicopter-tour-prices",
    navLabel: "Prices",
    h1: "Kauai Helicopter Tour Prices",
    title: "Kauai Helicopter Tour Prices (2026 Guide)",
    description:
      "Compare Kauai helicopter tour prices. See from-prices across doors-off, private, waterfall and sightseeing flights, plus what drives cost differences.",
    eyebrow: "Kauai · Prices",
    intro:
      "Kauai helicopter tour prices vary widely by format — doors-off vs doors-on, private vs shared, flight duration and specialty add-ons like canyon landings. Below we organize current from-prices from the tours in our Kauai research set so you can compare cost ranges before you book.",
    rankingsHeading: "Price standouts in our research set",
    rankingsIntro:
      "These picks answer common price questions — cheapest doors-off, waterfall value, doors-on entry and private benchmarks — not a claim that cheaper is always better.",
    ranked: [
      {
        tourId: "heart-of-island",
        rank: 1,
        award: "Cheapest Doors-Off Helicopter Tour",
        tableBestFor: "Budget doors-off",
        tableDuration: "See listing",
        why: "At about $221 from, this is the lowest doors-off from-price in our set — useful as a price floor when comparing open-cabin options. Confirm published duration before treating it as equivalent to longer doors-off flights.",
        chooseIf: ["You are price-shopping doors-off first"],
      },
      {
        tourId: "waterfall-safari",
        rank: 2,
        award: "Best Value Waterfall Tour",
        tableBestFor: "Waterfall value",
        tableDuration: "55 min",
        why: "Around $336 from for a dedicated waterfall safari is one of the clearer value positions among mid-priced scenic flights with strong review volume.",
        chooseIf: ["You want waterfall focus without private pricing"],
      },
      {
        tourId: "air-kauai-ohana",
        rank: 3,
        award: "Cheapest Doors-On Option",
        tableBestFor: "Doors-on value",
        tableDuration: "See listing",
        why: "Air Kauai’s Ohana doors-on tour sits near the lower mid-range and is useful when comparing enclosed-cabin comfort against doors-off premiums.",
        chooseIf: ["You prefer doors-on and want a lower from-price"],
      },
      {
        tourId: "kauai-experience",
        rank: 4,
        award: "Mid-Range Doors-Off Option",
        tableBestFor: "All-window doors-off",
        tableDuration: "55 min",
        why: "Around $384 from places Mauna Loa’s doors-off experience in the mid-range — typically below private charter pricing while still offering open-air seating.",
        chooseIf: ["You want doors-off without top-tier private pricing"],
      },
      {
        tourId: "private-doors-off",
        rank: 5,
        award: "Private Helicopter Price Benchmark",
        tableBestFor: "Private doors-off",
        tableDuration: "75 min",
        why: "About $425 from for Aliʻi’s private doors-off charter is a useful private benchmark — higher than many shared flights, justified by private cabin use and longer published duration in our comparison.",
        chooseIf: ["You are budgeting specifically for a private flight"],
      },
    ],
  },
];

export function getCategory(slug: CategorySlug): KauaiCategory {
  const category = kauaiCategories.find((c) => c.slug === slug);
  if (!category) throw new Error(`Unknown category: ${slug}`);
  return category;
}

export function getRankedTours(category: KauaiCategory) {
  return category.ranked.map((entry) => ({
    ...entry,
    tour: getTour(entry.tourId),
  }));
}

export const categoryNav = [
  ...kauaiCategories.map((c) => ({
    href: c.path,
    label: c.navLabel,
  })),
  {
    href: "/kauai/helicopter-tour-operators",
    label: "Operators",
  },
];

export const kauaiGuideLinks = [
  ...kauaiCategories.map((c) => ({
    href: c.path,
    title: c.h1,
    label: `${c.navLabel} guide`,
  })),
  {
    href: "/kauai/helicopter-tour-operators",
    title: "Best Helicopter Tour Operators on Kauai",
    label: "Operators guide",
  },
];
