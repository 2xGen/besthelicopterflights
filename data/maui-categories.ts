import { mauiTours, type MauiTour } from "@/data/maui-tours";

export type MauiCategorySlug =
  | "doors-off-helicopter-tours"
  | "private-helicopter-tours"
  | "photography-helicopter-tours"
  | "molokai"
  | "helicopter-tour-prices";

export type RankedMauiCategoryTour = {
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

export type MauiCategory = {
  slug: MauiCategorySlug;
  path: string;
  navLabel: string;
  h1: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  rankingsHeading: string;
  rankingsIntro: string;
  ranked: RankedMauiCategoryTour[];
};

function tour(id: string): MauiTour {
  const found = mauiTours.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown Maui tour id: ${id}`);
  return found;
}

export function getMauiTour(id: string): MauiTour {
  return tour(id);
}

export const mauiCategories: MauiCategory[] = [
  {
    slug: "doors-off-helicopter-tours",
    path: "/maui/doors-off-helicopter-tours",
    navLabel: "Doors-off",
    h1: "Best Doors-Off Helicopter Tours on Maui",
    title: "Best Doors-Off Helicopter Tours on Maui (2026)",
    description:
      "Compare doors-off helicopter tours on Maui. See Air Maui’s open-cabin West Maui & Molokai flight, plus doors-on alternatives on the same route family.",
    eyebrow: "Maui · Doors-off",
    intro:
      "Doors-off helicopter tours are one of the most immersive ways to see Maui and Molokai from the air. In our current research set, Air Maui publishes the clearest doors-off product on Maui — a 45-minute open-cabin flight over West Maui Mountains and Molokai’s north-shore sea cliffs. We also compare closely related doors-on West Maui / Molokai flights so you can weigh open-air immersion against a more sheltered cabin.",
    rankingsHeading: "Doors-off rankings",
    rankingsIntro:
      "We ranked these flights by how well they deliver a doors-off or doors-off-adjacent West Maui / Molokai experience — format clarity, published duration, route fit and value — not by marketplace popularity.",
    ranked: [
      {
        tourId: "doors-off-west-maui-molokai",
        rank: 1,
        award: "Best Doors-Off Flight on Maui",
        tableBestFor: "Doors-off West Maui & Molokai",
        tableDuration: "45 min",
        tableFormat: "Doors-off",
        why: "Air Maui’s doors-off West Maui and Molokai tour earns the top slot because it is the only published doors-off product in our Maui set. For travelers who want open-air immersion over rainforest valleys, waterfalls and Molokai sea cliffs, the format and route line up more clearly than any doors-on alternative.",
        chooseIf: [
          "Open-air / doors-off cabin is non-negotiable",
          "West Maui Mountains and Molokai cliffs are the priority",
          "About 45 minutes of flight time fits your schedule",
        ],
      },
      {
        tourId: "west-maui-molokai-45",
        rank: 2,
        award: "Best Doors-On Sibling on the Same Route Family",
        tableBestFor: "Shorter West Maui & Molokai",
        tableDuration: "45 min",
        tableFormat: "Doors-on",
        why: "Air Maui’s 45-minute West Maui and Molokai special ranks next when you want the same route family without doors-off exposure. It is the natural compare-to for mixed groups where one traveler wants immersion and another prefers a sheltered cabin — or when doors-off inventory is unavailable.",
        chooseIf: [
          "You want West Maui / Molokai without doors-off wind exposure",
          "A lower from-price than doors-off matters",
          "About 45 minutes is enough airtime",
        ],
      },
      {
        tourId: "west-maui-molokai-60",
        rank: 3,
        award: "Best Longer Doors-On West Maui & Molokai Circuit",
        tableBestFor: "Longer West Maui & Molokai",
        tableDuration: "60 min",
        tableFormat: "Doors-on",
        why: "The 60-minute West Maui and Molokai flight ranks for travelers who want more published airtime over Halawa Valley and tall sea cliffs without needing a doors-off cabin. Compare it against Complete Island if you also need Haleakala and Hana in the same flight.",
        chooseIf: [
          "You want a full hour focused on West Maui and Molokai",
          "Doors-off is not required",
          "Molokai cliffs matter more than East Maui crater coverage",
        ],
      },
      {
        tourId: "oceanfront-landing",
        rank: 4,
        award: "Best Landing Alternative to Doors-Off Thrill",
        tableBestFor: "Oceanfront landing thrill",
        tableDuration: "75 min",
        tableFormat: "Doors-on + landing",
        why: "Air Maui’s oceanfront-landing product is included for travelers who want extra thrill and a ground pause without flying doors-off. It pairs West Maui / Molokai scenery with a published private oceanfront landing — a different kind of immersion than an open cabin.",
        chooseIf: [
          "A landing stop matters more than doors-off cabin format",
          "You still want West Maui and Molokai scenery",
          "About 75 minutes total experience fits better than 45",
        ],
        relatedLink: {
          href: "/maui/private-helicopter-tours",
          label: "Compare exclusive landing tours on Maui",
        },
      },
    ],
  },
  {
    slug: "private-helicopter-tours",
    path: "/maui/private-helicopter-tours",
    navLabel: "Private",
    h1: "Best Private-Style & Exclusive Landing Helicopter Tours on Maui",
    title: "Best Private-Style Helicopter Tours on Maui (2026)",
    description:
      "Compare exclusive landing and private-style helicopter tours on Maui — Ulupalakua ranch landing, oceanfront landing and Hana rainforest landing options.",
    eyebrow: "Maui · Private / Landings",
    intro:
      "True private charters are less common in published Maui Viator listings than exclusive landing specialties. In our current set, the clearest “private-style” experiences are shared scenic flights that include an exclusive landing stop — at Ulupalakua Ranch, an oceanfront site, or a Hana rainforest valley. We ranked those landing products by published experience type, duration, scenery focus and value.",
    rankingsHeading: "Exclusive landing and private-style picks",
    rankingsIntro:
      "These rankings focus on exclusive landing specialties — not shared doors-off or standard West Maui overflights. Shared scenic flights are covered on the Maui hub and doors-off guide.",
    ranked: [
      {
        tourId: "spectacular-landing",
        rank: 1,
        award: "Best Premium Exclusive Landing Experience",
        tableFormat: "Shared + ranch landing",
        tableBestFor: "Premium landing experience",
        tableDuration: "90 min",
        why: "Blue Hawaiian’s Maui & Molokai Spectacular leads this category for published scope: about 90 minutes covering West Maui, Molokai, Haleakala and Hana-area rainforest with an exclusive Ulupalakua Ranch landing and complimentary drinks. Choose it when the landing celebration itself — not just aerial sightseeing — is the point.",
        chooseIf: [
          "You want the longest landing package in our set",
          "Ranch / dual-ocean vistas matter as much as the flight",
          "A premium from-price fits the occasion",
        ],
      },
      {
        tourId: "oceanfront-landing",
        rank: 2,
        award: "Best Oceanfront Landing Value",
        tableFormat: "Shared + oceanfront landing",
        tableBestFor: "Oceanfront landing thrill",
        tableDuration: "75 min",
        why: "Air Maui’s West Maui and Molokai oceanfront landing ranks next for travelers who want a landing thrill at a clearer mid-range from-price than the Spectacular package. Published itinerary covers Molokai cliffs plus a private north-shore Maui waterfront stop.",
        chooseIf: [
          "Oceanfront pause matters more than ranch scenery",
          "You want West Maui / Molokai focus with a landing",
          "You prefer a mid-premium from-price vs Spectacular",
        ],
      },
      {
        tourId: "hana-rainforest-landing",
        rank: 3,
        award: "Best Hana Rainforest Landing",
        tableFormat: "Shared + valley landing",
        tableBestFor: "Hana landing experience",
        tableDuration: "75 min · 40 min flight",
        why: "Maverick’s Hana rainforest landing ranks for East Maui exclusivity: a published ~40-minute flight over north-coast cliffs and Jurassic Rock with a Wailua Valley ground stop. Choose it when rainforest landing — not West Maui / Molokai cliffs — is the goal.",
        chooseIf: [
          "Hana / Wailua Valley ground time is the priority",
          "East Maui scenery matters more than Molokai sea cliffs",
          "You want a landing without Spectacular pricing",
        ],
      },
    ],
  },
  {
    slug: "photography-helicopter-tours",
    path: "/maui/photography-helicopter-tours",
    navLabel: "Photography",
    h1: "Best Maui Helicopter Tours for Photography",
    title: "Best Maui Helicopter Tours for Photography (2026)",
    description:
      "Compare the best Maui helicopter tours for photography — doors-off, East Maui / Haleakala, full-island and landing flights ranked for aerial photo fit.",
    eyebrow: "Maui · Photography",
    intro:
      "For aerial photography on Maui, cabin format, landmark variety and published flight time can matter more than a tour’s marketing pitch. We compared photography-friendly helicopter tours using doors-off vs glass cabins, route coverage (West Maui / Molokai vs Hana / Haleakala), duration and price.",
    rankingsHeading: "Best flights for aerial photos",
    rankingsIntro:
      "We ranked these options by what tends to matter most with a camera: view clarity, published flight time and landmark coverage — not by marketplace popularity alone.",
    ranked: [
      {
        tourId: "doors-off-west-maui-molokai",
        rank: 1,
        award: "Best Doors-Off Flight for Photos",
        tableBestFor: "Open-air West Maui & Molokai",
        tableDuration: "45 min",
        tableFormat: "Doors-off",
        why: "Doors-off is the clearest photography differentiator in our Maui set: no window glass between the lens and Molokai sea cliffs or West Maui valleys. Air Maui’s 45-minute open-cabin flight ranks first when unobstructed sightlines are the priority.",
        chooseIf: [
          "You want open-air shooting without window glare",
          "West Maui / Molokai subjects dominate the shot list",
          "About 45 minutes of airtime is enough",
        ],
        relatedLink: {
          href: "/maui/doors-off-helicopter-tours",
          label: "Compare doors-off helicopter tours on Maui",
        },
      },
      {
        tourId: "complete-island-60",
        rank: 2,
        award: "Best Full-Island Circuit for Shot Variety",
        tableBestFor: "Full-island sightseeing",
        tableDuration: "60 min",
        tableFormat: "Glass sightseeing",
        why: "Air Maui’s Complete Island hour ranks next for photographers who want East and West Maui in one flight — Haleakala Crater, Hana coastline and West Maui valleys. It is ranked for landmark variety through a conventional cabin, not for doors-off format.",
        chooseIf: [
          "You want maximum landmark variety in one flight",
          "Doors-off is not essential for your camera setup",
          "Haleakala and Hana matter as much as West Maui",
        ],
      },
      {
        tourId: "hana-haleakala-air-maui",
        rank: 3,
        award: "Best East Maui / Haleakala Photo Flight",
        tableBestFor: "East Maui & Haleakala focus",
        tableDuration: "45 min",
        tableFormat: "Glass sightseeing",
        why: "Air Maui’s Hana Rainforest and Haleakala tour ranks for crater cinder cones, waterfall valleys and rugged east coastline most road travelers never reach. It is the clearest East Maui specialist when Molokai cliffs are not on the shot list.",
        chooseIf: [
          "Haleakala Crater and Hana rainforest are the subjects",
          "You want East Maui focus without a full-island circuit",
          "A mid-low from-price matters",
        ],
      },
      {
        tourId: "hana-rainforest-landing",
        rank: 4,
        award: "Best Landing Flight for Ground + Air Photos",
        tableBestFor: "Hana landing experience",
        tableDuration: "75 min · 40 min flight",
        tableFormat: "Shared + valley landing",
        why: "Maverick’s Hana landing experience adds published ground time in Wailua Valley after north-coast aerials — useful when you want both aerial and on-foot rainforest frames in one booking. Ranked for dual-environment photography rather than maximum airtime.",
        chooseIf: [
          "You want aerial plus landing-site photo opportunities",
          "Hana / Jurassic Rock subjects matter",
          "A shorter flight segment with ground time fits better",
        ],
        relatedLink: {
          href: "/maui/private-helicopter-tours",
          label: "Compare exclusive landing tours on Maui",
        },
      },
    ],
  },
  {
    slug: "molokai",
    path: "/maui/molokai",
    navLabel: "Molokai",
    h1: "Best Maui Helicopter Tours to Molokai",
    title: "Best Maui Helicopter Tours to Molokai (2026)",
    description:
      "Compare Maui helicopter tours that fly to Molokai — doors-off sea cliffs, two-island circuits, waterfall routes, three-island overviews and landing packages from Kahului.",
    eyebrow: "Maui · Molokai",
    intro:
      "Looking for Molokai from Maui? That usually means a Kahului helicopter flight across the Pailolo Channel to Molokai’s remote north shore — home to some of the world’s tallest sea cliffs, Halawa Valley and waterfall country most visitors never see by road. We ranked the clearest Molokai-inclusive flights in our Maui research set by format, published duration, cliff/waterfall focus and value.",
    rankingsHeading: "Molokai helicopter rankings",
    rankingsIntro:
      "We ranked these flights by how well they deliver a Molokai experience from Maui — sea-cliff coverage, format clarity, duration and value — not by marketplace popularity.",
    ranked: [
      {
        tourId: "doors-off-west-maui-molokai",
        rank: 1,
        award: "Best Doors-Off Molokai Sea-Cliff Flight",
        tableBestFor: "Doors-off West Maui & Molokai",
        tableDuration: "45 min",
        tableFormat: "Doors-off",
        why: "Air Maui’s doors-off West Maui and Molokai tour leads this category because open-cabin immersion over Molokai’s north-shore cliffs is uniquely clear in our set. For travelers who want the tallest sea cliffs without window glass, the published format and route line up more strongly than doors-on alternatives.",
        chooseIf: [
          "Molokai sea cliffs are the primary reason you are flying",
          "Doors-off photography / immersion matters",
          "About 45 minutes of flight time fits your schedule",
        ],
        relatedLink: {
          href: "/maui/doors-off-helicopter-tours",
          label: "Compare doors-off helicopter tours on Maui",
        },
      },
      {
        tourId: "deluxe-molokai-maui",
        rank: 2,
        award: "Best Two-Island Molokai Value Circuit",
        tableBestFor: "Two-island value circuit",
        tableDuration: "55 min",
        tableFormat: "Glass sightseeing",
        why: "Maverick’s Deluxe Molokai and Maui ranks next for published Molokai depth at a mid from-price: sea cliffs, Kahiwa Falls, Halawa Valley and West Maui highlights in about 55 minutes. It is the strongest doors-on value pick when open cabin is not required.",
        chooseIf: [
          "You want Molokai north-shore coverage without doors-off pricing",
          "Halawa Valley and tall falls are on the shot list",
          "A mid from-price two-island circuit fits better than landing packages",
        ],
      },
      {
        tourId: "west-maui-molokai-60",
        rank: 3,
        award: "Best Full-Hour West Maui & Molokai Focus",
        tableBestFor: "Longer West Maui & Molokai",
        tableDuration: "60 min",
        tableFormat: "Glass sightseeing",
        why: "Air Maui’s 60-minute West Maui and Molokai flight ranks for travelers who want more published airtime over Halawa Valley and Molokai’s isolated north shore without committing to a landing package or Complete Island East Maui coverage.",
        chooseIf: [
          "You want a full hour focused on West Maui and Molokai",
          "Molokai cliffs matter more than Haleakala / Hana",
          "Doors-off is not required",
        ],
      },
      {
        tourId: "hawaiian-odyssey-three-island",
        rank: 4,
        award: "Best Three-Island Overview Including Molokai",
        tableBestFor: "Three-island overview",
        tableDuration: "65 min",
        tableFormat: "Glass sightseeing",
        why: "Maverick’s Odyssey ranks when Molokai is part of a broader geography ask: Maui, Molokai and Lanai in about 65 minutes. Choose it when neighboring-island variety — not maximum Molokai cliff immersion — is the decision.",
        chooseIf: [
          "You want Maui, Molokai and Lanai in one flight",
          "Interisland overview matters more than a doors-off Molokai focus",
          "Live Eco-Star commentary appeals",
        ],
      },
      {
        tourId: "spectacular-landing",
        rank: 5,
        award: "Best Molokai Circuit With Exclusive Landing",
        tableBestFor: "Premium landing experience",
        tableDuration: "90 min",
        tableFormat: "Shared + ranch landing",
        why: "Blue Hawaiian’s Spectacular pairs West Maui / Molokai scenery with an exclusive Ulupalakua Ranch landing. It ranks here for travelers who want Molokai cliffs plus a premium ground pause — not for the lowest Molokai-only from-price.",
        chooseIf: [
          "Molokai scenery plus a ranch landing fits the occasion",
          "A longer ~90-minute package is acceptable",
          "Premium from-price is fine for the landing experience",
        ],
        relatedLink: {
          href: "/maui/private-helicopter-tours",
          label: "Compare exclusive landing tours on Maui",
        },
      },
    ],
  },
  {
    slug: "helicopter-tour-prices",
    path: "/maui/helicopter-tour-prices",
    navLabel: "Prices",
    h1: "Maui Helicopter Tour Prices",
    title: "Maui Helicopter Tour Prices (2026 Guide)",
    description:
      "Compare Maui helicopter tour prices. See from-prices across doors-off, West Maui / Molokai, Hana, landing packages and combo days, plus what drives cost differences.",
    eyebrow: "Maui · Prices",
    intro:
      "Maui helicopter tour prices vary widely by format — doors-off vs doors-on, flight duration, East Maui vs West Maui / Molokai focus, exclusive landings and combo day packages. Below we organize current from-prices from the tours in our Maui research set so you can compare cost ranges before you book.",
    rankingsHeading: "Price standouts in our research set",
    rankingsIntro:
      "These picks answer common price questions — cheapest entry, doors-off cost, East Maui value, landing benchmarks and full-island pricing — not a claim that cheaper is always better.",
    ranked: [
      {
        tourId: "birds-eye-30",
        rank: 1,
        award: "Cheapest Entry Price in Our Set",
        tableBestFor: "Budget / shorter intro",
        tableDuration: "30 min",
        why: "At about $316 from, Air Maui’s Bird’s Eye View is the lowest from-price in our Maui set. It is a shorter northwest / west coastline intro — not equivalent to a West Maui–Molokai or Complete Island circuit.",
        chooseIf: ["You are price-shopping first for a short intro flight"],
      },
      {
        tourId: "hana-haleakala-air-maui",
        rank: 2,
        award: "Best-Priced East Maui Specialty Flight",
        tableBestFor: "East Maui & Haleakala focus",
        tableDuration: "45 min",
        why: "Around $368 from for Air Maui’s Hana / Haleakala flight is a clear specialty price point when crater and East Maui rainforest — not Molokai cliffs — are the goal.",
        chooseIf: ["You want East Maui focus without full-island pricing"],
      },
      {
        tourId: "doors-off-west-maui-molokai",
        rank: 3,
        award: "Doors-Off Price Benchmark",
        tableBestFor: "Doors-off West Maui & Molokai",
        tableDuration: "45 min",
        why: "About $452 from for Maui’s only doors-off product in our set is the open-cabin benchmark — typically above doors-on 45-minute siblings on the same route family.",
        chooseIf: ["You are budgeting specifically for doors-off"],
        relatedLink: {
          href: "/maui/doors-off-helicopter-tours",
          label: "Compare doors-off helicopter tours on Maui",
        },
      },
      {
        tourId: "oceanfront-landing",
        rank: 4,
        award: "Mid-Range Landing Package Benchmark",
        tableBestFor: "Oceanfront landing thrill",
        tableDuration: "75 min",
        why: "Around $472 from places Air Maui’s oceanfront landing in the mid-range for exclusive-landing specialties — useful when comparing against Spectacular’s higher ranch-landing from-price.",
        chooseIf: ["You want a landing without the highest premium rate"],
      },
      {
        tourId: "complete-island-60",
        rank: 5,
        award: "Full-Island Hour Price Benchmark",
        tableBestFor: "Full-island sightseeing",
        tableDuration: "60 min",
        why: "About $513 from for Air Maui’s Complete Island is a clear full-hour island-wide benchmark — useful when comparing East+West coverage against West Maui–only or landing packages.",
        chooseIf: ["You are budgeting for a full-hour Maui circuit"],
      },
    ],
  },
];

export function getMauiCategory(slug: MauiCategorySlug): MauiCategory {
  const found = mauiCategories.find((c) => c.slug === slug);
  if (!found) throw new Error(`Unknown Maui category: ${slug}`);
  return found;
}

export function getMauiRankedTours(category: MauiCategory) {
  return category.ranked
    .slice()
    .sort((a, b) => a.rank - b.rank)
    .map((row) => ({
      ...row,
      tour: tour(row.tourId),
    }));
}

export const mauiCategoryNav = mauiCategories.map((c) => ({
  href: c.path,
  label: c.navLabel,
}));
