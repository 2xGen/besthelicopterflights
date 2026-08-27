import { kauaiTours, type KauaiTour } from "@/data/kauai-tours";

function getTour(id: string): KauaiTour {
  const found = kauaiTours.find((tour) => tour.id === id);
  if (!found) throw new Error(`Unknown tour id: ${id}`);
  return found;
}

export type KauaiOperator = {
  id: string;
  name: string;
  shortName: string;
  summary: string;
  bestKnownFor: string;
  chooseIf: string[];
  tourIds: string[];
};

export type OperatorComparison = {
  id: string;
  title: string;
  intro: string;
  left: {
    name: string;
    fitsIf: string[];
  };
  right: {
    name: string;
    fitsIf: string[];
  };
  closing: string;
};

export const kauaiOperators: KauaiOperator[] = [
  {
    id: "jack-harter",
    name: "Jack Harter Helicopters – Tours",
    shortName: "Jack Harter Helicopters",
    summary:
      "Jack Harter is especially relevant if doors-off flying is central to your Kauai helicopter decision. In our research set, the operator appears with a full-hour doors-off adventure and a lower from-price Heart of the Island doors-off option.",
    bestKnownFor: "Doors-off flight options, including a clear 60-minute product",
    chooseIf: [
      "Open-air / doors-off flying is a priority",
      "You want to compare a full-hour doors-off flight",
      "Photography access matters more than a conventional enclosed cabin",
    ],
    tourIds: ["luxury-doors-off", "heart-of-island"],
  },
  {
    id: "blue-hawaiian",
    name: "Blue Hawaiian Helicopters – Kauai",
    shortName: "Blue Hawaiian Helicopters",
    summary:
      "Blue Hawaiian is a large, widely known sightseeing operator on Kauai. In our set, the Eco Adventure is positioned for broader island coverage, while the Princeville departure product is useful when North Shore logistics matter.",
    bestKnownFor: "Established island sightseeing and multiple departure contexts",
    chooseIf: [
      "You want a conventional sightseeing framing from a large operator",
      "Doors-off is not essential",
      "You want to compare departure locations, including Princeville",
    ],
    tourIds: ["eco-adventure", "discover-princeville"],
  },
  {
    id: "safari",
    name: "Safari Helicopters",
    shortName: "Safari Helicopters",
    summary:
      "Safari Helicopters stands out in our set for waterfall-forward and specialty products — including a dedicated Deluxe Waterfall Safari and a Jurassic Canyon landing option.",
    bestKnownFor: "Waterfall safari and canyon-landing specialty products",
    chooseIf: [
      "Waterfalls are a primary reason you are flying",
      "You want to compare a landing experience against aerial-only flights",
      "You are choosing by product specialty more than by doors-off format",
    ],
    tourIds: ["waterfall-safari", "jurassic-canyon"],
  },
  {
    id: "alii",
    name: "Aliʻi Kauai Air Tours & Charters",
    shortName: "Aliʻi Kauai Air Tours",
    summary:
      "Aliʻi is the clearest private-charter fit in our current Kauai set. The private doors-off waterfall product combines exclusive cabin use with a longer published flight time and a very strong listed traveler rating.",
    bestKnownFor: "Private doors-off charter experience",
    chooseIf: [
      "You want a true private flight rather than a shared cabin",
      "Waterfalls and doors-off both matter",
      "You are booking for a couple, family or small group that wants exclusivity",
    ],
    tourIds: ["private-doors-off"],
  },
  {
    id: "mauna-loa",
    name: "Mauna Loa Helicopters Kauai",
    shortName: "Mauna Loa Helicopters",
    summary:
      "Mauna Loa appears in our set with a doors-off experience that emphasizes all-window seating — especially useful when every passenger wants a usable view angle.",
    bestKnownFor: "Doors-off with all-window seating positioning",
    chooseIf: [
      "Seat configuration is as important as flight time",
      "You want doors-off without stepping up to the highest private from-price",
      "Multiple people in your group care about photo angles",
    ],
    tourIds: ["kauai-experience"],
  },
  {
    id: "air-kauai",
    name: "Air Kauai Helicopters",
    shortName: "Air Kauai Helicopters",
    summary:
      "Air Kauai gives travelers another Kauai operator to compare, with both a doors-off adventure and an Ohana doors-on product in our research set.",
    bestKnownFor: "Doors-off and doors-on options from the same operator",
    chooseIf: [
      "You want another operator beyond the biggest-name brands",
      "You are comparing doors-off vs doors-on within one company",
      "You want additional price points in the mid-range",
    ],
    tourIds: ["air-kauai-doors-off", "air-kauai-ohana"],
  },
];

export const operatorComparisons: OperatorComparison[] = [
  {
    id: "jack-harter-vs-blue-hawaiian",
    title: "Jack Harter vs Blue Hawaiian",
    intro:
      "This is one of the most useful company-level comparisons on Kauai because the operators often serve different priorities: open-air doors-off flying versus broader conventional sightseeing.",
    left: {
      name: "Jack Harter",
      fitsIf: [
        "You specifically want doors-off",
        "Photography is important",
        "You want a 60-minute doors-off experience",
        "Open-air flying is the priority",
      ],
    },
    right: {
      name: "Blue Hawaiian",
      fitsIf: [
        "You want a conventional sightseeing experience",
        "You prioritize a large established operator",
        "You want to compare different departure locations",
        "Doors-off isn’t essential",
      ],
    },
    closing:
      "Neither company is universally “better.” Choose Jack Harter when the cabin format and open-air experience are the decision, and Blue Hawaiian when operator scale and conventional island sightseeing framing matter more.",
  },
  {
    id: "safari-vs-jack-harter",
    title: "Safari Helicopters vs Jack Harter",
    intro:
      "Safari and Jack Harter often answer different product intents: waterfall/specialty routes versus doors-off open-air flying.",
    left: {
      name: "Safari Helicopters",
      fitsIf: [
        "Waterfalls are your main scenic goal",
        "You want a dedicated waterfall safari product",
        "You are considering a canyon-landing specialty flight",
      ],
    },
    right: {
      name: "Jack Harter",
      fitsIf: [
        "Doors-off immersion is the priority",
        "You want a clear full-hour open-air option",
        "Photography access matters more than waterfall branding",
      ],
    },
    closing:
      "If the question is “waterfalls first,” start with Safari. If the question is “doors-off first,” start with Jack Harter — then compare live route notes and pricing.",
  },
  {
    id: "blue-hawaiian-vs-safari",
    title: "Blue Hawaiian vs Safari Helicopters",
    intro:
      "Both operators can show dramatic Kauai scenery, but the published product emphasis differs: broad island sightseeing versus waterfall-focused and specialty options.",
    left: {
      name: "Blue Hawaiian",
      fitsIf: [
        "You want broader island coverage",
        "You prefer a large established sightseeing brand",
        "Waterfalls are part of the trip, not the only goal",
      ],
    },
    right: {
      name: "Safari Helicopters",
      fitsIf: [
        "You want a waterfall-specialist product",
        "You are comparing a landing experience",
        "Cascade scenery is the main reason you are booking",
      ],
    },
    closing:
      "Choose Blue Hawaiian for a wider sightseeing frame; choose Safari when waterfall emphasis or a specialty landing product is the clearer fit.",
  },
  {
    id: "mauna-loa-vs-jack-harter",
    title: "Mauna Loa vs Jack Harter",
    intro:
      "This comparison is especially useful for doors-off shoppers deciding between seating configuration and published flight time.",
    left: {
      name: "Mauna Loa",
      fitsIf: [
        "All-window seating is particularly important",
        "Every passenger needs a usable view angle",
        "You want doors-off without the longest full-hour product",
      ],
    },
    right: {
      name: "Jack Harter",
      fitsIf: [
        "A clear 60-minute doors-off flight is the priority",
        "You want more published airtime for photography",
        "You are comparing a full-hour open-air adventure",
      ],
    },
    closing:
      "Mauna Loa wins the seating-configuration argument in our set; Jack Harter wins the clear full-hour doors-off argument. Pick based on which constraint matters more for your group.",
  },
];

export function getOperatorTours(operator: KauaiOperator): KauaiTour[] {
  return operator.tourIds.map((id) => getTour(id));
}

export const OPERATORS_PATH = "/kauai/helicopter-tour-operators";
export const OPERATORS_NAV = {
  href: OPERATORS_PATH,
  label: "Operators",
  h1: "Best Helicopter Tour Operators on Kauai",
};
