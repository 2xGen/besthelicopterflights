import { oahuTours, type OahuTour } from "@/data/oahu-tours";

function getTour(id: string): OahuTour {
  const found = oahuTours.find((tour) => tour.id === id);
  if (!found) throw new Error(`Unknown Oahu tour id: ${id}`);
  return found;
}

export type OahuOperator = {
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

export const oahuOperators: OahuOperator[] = [
  {
    id: "rainbow",
    name: "Rainbow Helicopters",
    shortName: "Rainbow Helicopters",
    summary:
      "Rainbow Helicopters is the broadest Honolulu-based operator in our Oahu set, with doors-on/off landmark and full-island flights, last-minute single-seat inventory, and a specialty private romantic landing charter.",
    bestKnownFor:
      "Honolulu doors-on/off circuits, last-minute seats and private landing specialty",
    chooseIf: [
      "You want a Honolulu Airport–area departure",
      "Doors-on or doors-off flexibility matters",
      "You are comparing short landmark flights against a full-hour circuit",
    ],
    tourIds: [
      "royal-crown",
      "path-to-pali",
      "last-minute-single",
      "romantic-landing",
    ],
  },
  {
    id: "blue-hawaiian",
    name: "Blue Hawaiian Helicopters",
    shortName: "Blue Hawaiian Helicopters",
    summary:
      "Blue Hawaiian appears in our set with both a Complete Island Honolulu-area circuit and Turtle Bay–based products (Air Adventure and Discover North Shore). That makes it especially useful when departure base — Waikiki/HNL logistics versus North Shore stays — shapes the booking.",
    bestKnownFor:
      "Full-island glass sightseeing and Turtle Bay / North Shore departures",
    chooseIf: [
      "You want a large established sightseeing brand",
      "North Shore or Turtle Bay departure logistics matter",
      "Doors-off is not essential",
    ],
    tourIds: ["complete-island", "air-adventure", "discover-north-shore"],
  },
  {
    id: "mauna-loa",
    name: "Mauna Loa Helicopter Tours",
    shortName: "Mauna Loa Helicopter Tours",
    summary:
      "Mauna Loa is the clearest private all-window seating fit in our current Oahu set. The private helicopter experience is positioned for small groups who want cabin exclusivity and usable photo angles for every passenger.",
    bestKnownFor: "Private helicopter experience with all-window seating",
    chooseIf: [
      "You want a private cabin rather than a shared departure",
      "All-window seating is a priority",
      "You are booking for a couple, family or small photography group",
    ],
    tourIds: ["private-all-window"],
  },
  {
    id: "polynesian-adventure",
    name: "Polynesian Adventure Tours",
    shortName: "Polynesian Adventure Tours",
    summary:
      "Polynesian Adventure Tours appears with a different product type: a full-day Oahu-to-Hilo volcano day trip that includes a Big Island helicopter segment. Compare it only if an island-hop volcano itinerary — not Oahu-only sightseeing — is the goal.",
    bestKnownFor: "Oahu–Hilo volcano day trip with helicopter segment",
    chooseIf: [
      "You specifically want a Big Island volcano day from Oahu",
      "A full-day package with interisland logistics fits your schedule",
      "Oahu-only aerial sightseeing is not the primary goal",
    ],
    tourIds: ["volcano-day-trip"],
  },
];

export const oahuOperatorComparisons: OperatorComparison[] = [
  {
    id: "rainbow-vs-blue-hawaiian",
    title: "Rainbow Helicopters vs Blue Hawaiian",
    intro:
      "This is one of the most useful company-level comparisons on Oahu because the operators often serve different priorities: doors-on/off Honolulu circuits versus glass sightseeing and Turtle Bay departure options.",
    left: {
      name: "Rainbow Helicopters",
      fitsIf: [
        "You want doors-on or doors-off flexibility",
        "Honolulu Airport–area departure is convenient",
        "You are comparing 30-minute vs 60-minute landmark circuits",
        "Photography access via an open cabin matters",
      ],
    },
    right: {
      name: "Blue Hawaiian",
      fitsIf: [
        "You want a conventional glass sightseeing experience",
        "You prefer a large established sightseeing brand",
        "Turtle Bay / North Shore departure logistics matter",
        "Doors-off isn’t essential",
      ],
    },
    closing:
      "Neither company is universally “better.” Choose Rainbow when cabin format and Honolulu doors-on/off flexibility are the decision, and Blue Hawaiian when operator scale, glass sightseeing framing or North Shore departure base matter more.",
  },
  {
    id: "rainbow-vs-mauna-loa",
    title: "Rainbow Helicopters vs Mauna Loa",
    intro:
      "This comparison helps travelers decide between shared doors-on/off sightseeing and a private all-window cabin experience.",
    left: {
      name: "Rainbow Helicopters",
      fitsIf: [
        "A shared full-island or landmark flight is enough",
        "You want doors-on/off choice without private-charter pricing",
        "You are comparing multiple shared Rainbow products",
      ],
    },
    right: {
      name: "Mauna Loa",
      fitsIf: [
        "You want a private cabin for your group",
        "All-window seating is particularly important",
        "Photography control without strangers matters",
      ],
    },
    closing:
      "Choose Rainbow for shared doors-on/off sightseeing value; choose Mauna Loa when private cabin exclusivity and all-window seating are the point.",
  },
  {
    id: "blue-hawaiian-vs-mauna-loa",
    title: "Blue Hawaiian vs Mauna Loa",
    intro:
      "Both can cover iconic Oahu landmarks, but the published product emphasis differs: shared glass sightseeing (including Turtle Bay options) versus a private all-window experience.",
    left: {
      name: "Blue Hawaiian",
      fitsIf: [
        "You want shared sightseeing from a large brand",
        "North Shore / Turtle Bay departure is useful",
        "A longer glass circuit matters more than a private cabin",
      ],
    },
    right: {
      name: "Mauna Loa",
      fitsIf: [
        "Private cabin use is non-negotiable",
        "Every passenger needs a window angle",
        "You are booking a small group for photos or exclusivity",
      ],
    },
    closing:
      "Blue Hawaiian wins the shared sightseeing / departure-base argument in our set; Mauna Loa wins the private all-window argument. Pick based on which constraint matters more.",
  },
];

export function getOahuOperatorTours(operator: OahuOperator): OahuTour[] {
  return operator.tourIds.map((id) => getTour(id));
}

export const OAHU_OPERATORS_PATH = "/oahu/helicopter-tour-operators";
