import { mauiTours, type MauiTour } from "@/data/maui-tours";

function getTour(id: string): MauiTour {
  const found = mauiTours.find((tour) => tour.id === id);
  if (!found) throw new Error(`Unknown Maui tour id: ${id}`);
  return found;
}

export type MauiOperator = {
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

export const mauiOperators: MauiOperator[] = [
  {
    id: "air-maui",
    name: "Air Maui Helicopter Tours",
    shortName: "Air Maui",
    summary:
      "Air Maui is the broadest operator in our Maui set, with doors-off and doors-on West Maui / Molokai flights, Complete Island and Hana / Haleakala circuits, oceanfront landing and a shorter Bird’s Eye intro — all departing Kahului Heliport.",
    bestKnownFor:
      "Doors-off West Maui & Molokai, Complete Island and Hana / Haleakala flights",
    chooseIf: [
      "You want Maui’s clearest published doors-off option",
      "You are comparing multiple West Maui / Molokai durations",
      "Kahului Heliport departure fits your logistics",
    ],
    tourIds: [
      "doors-off-west-maui-molokai",
      "complete-island-60",
      "hana-haleakala-air-maui",
      "oceanfront-landing",
      "west-maui-molokai-60",
      "west-maui-molokai-45",
      "birds-eye-30",
    ],
  },
  {
    id: "blue-hawaiian",
    name: "Blue Hawaiian Helicopters – Maui",
    shortName: "Blue Hawaiian Maui",
    summary:
      "Blue Hawaiian appears in our Maui set with Eco-Star-style scenic products: the premium Maui & Molokai Spectacular ranch landing, a waterfall-focused West Maui / Molokai circuit, and a Hana Rainforest Scenic flight.",
    bestKnownFor:
      "Spectacular exclusive landing and Eco-Star West Maui / Hana scenery",
    chooseIf: [
      "You want a large established sightseeing brand",
      "Exclusive Ulupalakua Ranch landing is on your shortlist",
      "Doors-off is not essential",
    ],
    tourIds: [
      "spectacular-landing",
      "waterfalls-west-maui-molokai",
      "hana-rainforest-blue",
    ],
  },
  {
    id: "maverick",
    name: "Maverick Helicopters Maui",
    shortName: "Maverick Maui",
    summary:
      "Maverick’s Maui products in our set emphasize two- and three-island geography plus a Hana rainforest landing: Deluxe Molokai & Maui, the Maui–Molokai–Lanai Odyssey, and the Wailua Valley landing experience.",
    bestKnownFor:
      "Two- and three-island circuits and Hana rainforest landing",
    chooseIf: [
      "You want Molokai or Lanai coverage beyond West Maui alone",
      "A Hana valley landing fits better than Ulupalakua ranch",
      "Live pilot commentary on Eco-Star aircraft matters",
    ],
    tourIds: [
      "deluxe-molokai-maui",
      "hawaiian-odyssey-three-island",
      "hana-rainforest-landing",
    ],
  },
  {
    id: "temptation",
    name: "Temptation Tours, Inc.",
    shortName: "Temptation Tours",
    summary:
      "Temptation Tours appears with a different product type: a luxury Road to Hana limo-van day with a helicopter return segment. Compare it only if ground stops plus air — not a pure Kahului scenic flight — is the goal.",
    bestKnownFor: "Road to Hana limo-van + helicopter combo day",
    chooseIf: [
      "You specifically want Road to Hana ground stops plus a flight",
      "A half-day combo package fits your schedule",
      "A pure scenic helicopter circuit is not enough on its own",
    ],
    tourIds: ["road-to-hana-heli"],
  },
];

export const mauiOperatorComparisons: OperatorComparison[] = [
  {
    id: "air-maui-vs-blue-hawaiian",
    title: "Air Maui vs Blue Hawaiian",
    intro:
      "This is one of the most useful company-level comparisons on Maui because the operators often serve different priorities: doors-off and broad Air Maui route depth versus Blue Hawaiian’s Eco-Star scenic and Spectacular landing framing.",
    left: {
      name: "Air Maui",
      fitsIf: [
        "You want doors-off capability",
        "You are comparing multiple West Maui / Molokai durations",
        "Complete Island or Hana / Haleakala Air Maui products appeal",
        "Oceanfront landing is on your shortlist",
      ],
    },
    right: {
      name: "Blue Hawaiian",
      fitsIf: [
        "You want a conventional Eco-Star glass experience",
        "Ulupalakua Ranch Spectacular landing is the goal",
        "You prefer a large established sightseeing brand",
        "Doors-off isn’t essential",
      ],
    },
    closing:
      "Neither company is universally “better.” Choose Air Maui when doors-off or route-family depth is the decision, and Blue Hawaiian when Spectacular landing or Eco-Star brand framing matters more.",
  },
  {
    id: "air-maui-vs-maverick",
    title: "Air Maui vs Maverick",
    intro:
      "Both cover Maui and Molokai scenery, but Air Maui leads on doors-off and Complete Island depth in our set, while Maverick stands out for three-island geography and a Hana valley landing.",
    left: {
      name: "Air Maui",
      fitsIf: [
        "Doors-off is a priority",
        "You want Complete Island or Hana / Haleakala Air Maui options",
        "You prefer comparing several durations from one Kahului operator",
      ],
    },
    right: {
      name: "Maverick",
      fitsIf: [
        "Maui–Molokai–Lanai three-island coverage matters",
        "You want a Hana rainforest / Wailua Valley landing",
        "Deluxe two-island value at a mid from-price appeals",
      ],
    },
    closing:
      "Choose Air Maui for doors-off and deepest same-operator route menu; choose Maverick when Lanai coverage or a Hana landing is the differentiator.",
  },
  {
    id: "blue-hawaiian-vs-maverick",
    title: "Blue Hawaiian vs Maverick",
    intro:
      "Both emphasize polished Eco-Star-style sightseeing with landing specialties, but the landing destinations and island scope differ.",
    left: {
      name: "Blue Hawaiian",
      fitsIf: [
        "Ulupalakua Ranch Spectacular landing is the goal",
        "West Maui waterfall circuits or Hana Scenic Eco-Star appeal",
        "You want a large Blue Hawaiian brand experience",
      ],
    },
    right: {
      name: "Maverick",
      fitsIf: [
        "Three-island Odyssey (Maui, Molokai, Lanai) matters",
        "Hana / Wailua Valley landing fits better than ranch landing",
        "Deluxe Molokai & Maui value is enough without Spectacular pricing",
      ],
    },
    closing:
      "Blue Hawaiian wins the Spectacular ranch-landing argument in our set; Maverick wins three-island geography and Hana valley landing. Pick based on which specialty matters more.",
  },
];

export function getMauiOperatorTours(operator: MauiOperator): MauiTour[] {
  return operator.tourIds.map((id) => getTour(id));
}

export const MAUI_OPERATORS_PATH = "/maui/helicopter-tour-operators";
