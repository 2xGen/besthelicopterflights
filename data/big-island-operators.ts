import { bigIslandTours, type BigIslandTour } from "@/data/big-island-tours";

function getTour(id: string): BigIslandTour {
  const found = bigIslandTours.find((tour) => tour.id === id);
  if (!found) throw new Error(`Unknown Big Island tour id: ${id}`);
  return found;
}

export type BigIslandOperator = {
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

export const bigIslandOperators: BigIslandOperator[] = [
  {
    id: "rainbow",
    name: "Rainbow Helicopters",
    shortName: "Rainbow Helicopters",
    summary:
      "Rainbow Helicopters is the clearest doors-on/off operator in our Big Island set, with Kona-based products ranging from 45-minute coastal hops to 90- and 105-minute volcano / Kohala circuits, plus a specialty romantic coffee-landing charter.",
    bestKnownFor:
      "Kona doors-on/off volcano and coastal flights",
    chooseIf: [
      "You want doors-on or doors-off flexibility from Kona",
      "A dedicated Kīlauea doors-on/off circuit is on your shortlist",
      "You are comparing shorter coastal hops against longer volcano flights",
    ],
    tourIds: [
      "kilauea-eruption-105",
      "kohala-volcano-90",
      "kona-hualalai-60",
      "kona-coastal-45",
      "romantic-kona-coffee-landing",
    ],
  },
  {
    id: "mauna-loa",
    name: "Mauna Loa Helicopter Tours - Big Island of Hawaii",
    shortName: "Mauna Loa Big Island",
    summary:
      "Mauna Loa appears in our set with private-focused Kona products: a full ~2-hour Big Island Experience including Kīlauea, a private Magical Waterfall Kohala circuit, and a short all-window Kona Coast hop.",
    bestKnownFor: "Private Kona circuits including Kīlauea and Kohala waterfalls",
    chooseIf: [
      "You want a private cabin rather than a shared departure",
      "Window seating for your group matters",
      "You are comparing private volcano vs private waterfall specialties",
    ],
    tourIds: [
      "private-big-island-experience",
      "private-magical-waterfall",
      "private-kona-coast-30",
    ],
  },
  {
    id: "blue-hawaiian-waikoloa",
    name: "Blue Hawaiian Helicopters – Waikoloa",
    shortName: "Blue Hawaiian Waikoloa",
    summary:
      "Blue Hawaiian’s Waikoloa base covers the Spectacular island overview, exclusive waterfall landings, and shorter Kohala valleys products — especially convenient for Kohala / Waikoloa resort stays.",
    bestKnownFor:
      "Waikoloa Spectacular, Kohala valleys and exclusive landings",
    chooseIf: [
      "Waikoloa departure logistics fit your stay",
      "You want a large established Eco-Star sightseeing brand",
      "Exclusive waterfall landing packages are on your shortlist",
    ],
    tourIds: [
      "big-island-spectacular",
      "exclusive-landing-spectacular",
      "kohala-landing",
      "kohala-waterfalls-valleys",
    ],
  },
  {
    id: "blue-hawaiian-hilo",
    name: "Blue Hawaiian Helicopters – Hilo",
    shortName: "Blue Hawaiian Hilo",
    summary:
      "Blue Hawaiian’s Hilo products in our set focus on volcano park scenery (Discover Hilo / Circle of Fire) and Hāmākua / Kohala waterfall valleys — useful when you are already on the east side.",
    bestKnownFor: "Hilo volcano and waterfall Eco-Star flights",
    chooseIf: [
      "Hilo departure is more convenient than Kona or Waikoloa",
      "You want Blue Hawaiian’s Eco-Star experience on the Hilo side",
      "You are comparing Hilo volcano vs Hilo waterfall specialists",
    ],
    tourIds: ["discover-hilo", "hilo-waterfalls"],
  },
  {
    id: "safari",
    name: "Safari Helicopters",
    shortName: "Safari Helicopters",
    summary:
      "Safari Helicopters appears with a Hilo Volcanoes National Park Safari — positioned as a family-run, park-focused flight at a clearer value from-price than many island-crossing products.",
    bestKnownFor: "Hilo Volcanoes National Park Safari",
    chooseIf: [
      "You specifically want a Hilo park-focused volcano flight",
      "A mid-range from-price volcano specialist fits better than Kona crossings",
      "You are comparing Safari against Blue Hawaiian Hilo",
    ],
    tourIds: ["volcanoes-safari"],
  },
];

export const bigIslandOperatorComparisons: OperatorComparison[] = [
  {
    id: "rainbow-vs-blue-waikoloa",
    title: "Rainbow Helicopters vs Blue Hawaiian (Waikoloa)",
    intro:
      "This comparison helps travelers decide between Kona doors-on/off volcano circuits and Waikoloa Eco-Star island overviews with optional landings.",
    left: {
      name: "Rainbow Helicopters",
      fitsIf: [
        "Doors-on or doors-off flexibility matters",
        "Kona departure is convenient",
        "You want a dedicated Kīlauea doors-on/off listing",
      ],
    },
    right: {
      name: "Blue Hawaiian Waikoloa",
      fitsIf: [
        "Waikoloa / Kohala resort departure is convenient",
        "You prefer Eco-Star glass sightseeing",
        "Exclusive waterfall landing packages appeal",
      ],
    },
    closing:
      "Choose Rainbow when cabin format and Kona doors-on/off volcano depth are the decision; choose Blue Hawaiian Waikoloa when departure base and Spectacular / landing framing matter more.",
  },
  {
    id: "rainbow-vs-mauna-loa",
    title: "Rainbow Helicopters vs Mauna Loa",
    intro:
      "Both can cover Kīlauea from Kona, but Rainbow emphasizes doors-on/off shared products while Mauna Loa emphasizes private cabin experiences.",
    left: {
      name: "Rainbow Helicopters",
      fitsIf: [
        "Shared doors-on/off sightseeing is enough",
        "You want multiple duration options in one doors-on/off family",
        "Open cabin matters more than private exclusivity",
      ],
    },
    right: {
      name: "Mauna Loa",
      fitsIf: [
        "Private cabin use is non-negotiable",
        "Window seating for your group matters",
        "You want a private volcano or private waterfall specialty",
      ],
    },
    closing:
      "Choose Rainbow for doors-on/off shared volcano value; choose Mauna Loa when private cabin exclusivity is the point.",
  },
  {
    id: "blue-hilo-vs-safari",
    title: "Blue Hawaiian Hilo vs Safari Helicopters",
    intro:
      "Both serve Hilo-side volcano seekers, with different brand and product emphasis in our set.",
    left: {
      name: "Blue Hawaiian Hilo",
      fitsIf: [
        "You want Eco-Star Discover Hilo / Circle of Fire framing",
        "You may also compare a Hilo waterfall specialist from the same brand",
        "A large established brand matters",
      ],
    },
    right: {
      name: "Safari Helicopters",
      fitsIf: [
        "You want a park-focused Safari listing at a clear value from-price",
        "Family-run operator positioning appeals",
        "Volcanoes National Park is the sole goal of the flight",
      ],
    },
    closing:
      "Compare live itineraries and from-prices side by side — both can answer a Hilo volcano search, but product framing and inclusions differ.",
  },
];

export function getBigIslandOperatorTours(
  operator: BigIslandOperator,
): BigIslandTour[] {
  return operator.tourIds.map((id) => getTour(id));
}

export const BIG_ISLAND_OPERATORS_PATH =
  "/big-island/helicopter-tour-operators";
