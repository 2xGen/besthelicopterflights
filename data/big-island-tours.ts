export type BigIslandTour = {
  id: string;
  shortName: string;
  fullName: string;
  supplier: string;
  bestFor: string;
  duration: string;
  durationMinutes: number | null;
  rating: number | null;
  reviews: number | null;
  priceFrom: number;
  priceLabel: string;
  image: string;
  viatorUrl: string;
  featured: boolean;
  rank?: number;
  rankReason: string;
  summary: string;
  facts: string[];
};

/**
 * Rankings are research-led (published route/experience fit, duration, value
 * and format clarity) — not Viator listing order. Traveler ratings were not
 * consistently available for this set at research time.
 */
export const bigIslandTours: BigIslandTour[] = [
  {
    id: "kilauea-eruption-105",
    shortName: "Kilauea Eruption 105-Min",
    fullName: "Kilauea Volcano Eruption 105 Min Helicopter Tour Doors Off or On",
    supplier: "Rainbow Helicopters",
    bestFor: "Doors-on/off volcano deep dive",
    duration: "105 min",
    durationMinutes: 105,
    rating: null,
    reviews: null,
    priceFrom: 1180,
    priceLabel: "$1,180",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/33/5e/61/bb/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/Kilauea-Volcano-Eruption-105-Min-Helicopter-Tour-Doors-Off-On/d669-28456P16",
    featured: true,
    rank: 1,
    rankReason:
      "Ranks first for travelers who want maximum published airtime to Kīlauea with a doors-on or doors-off choice — plus Hāmākua / Kohala waterfall valleys on the return — from Kona.",
    summary:
      "Rainbow’s 105-minute Kīlauea eruption flight is positioned as a front-row volcano circuit from Kailua-Kona, continuing along the Hāmākua and Kohala coasts. Based on published duration and format flexibility, it is the clearest doors-on/off deep-dive when active-volcano viewing is the primary goal.",
    facts: [
      "Doors-on or doors-off format",
      "Published flight time about 105 minutes",
      "Kīlauea, Mauna Loa / Mauna Kea and Kohala valleys",
      "From $1,180 per person",
    ],
  },
  {
    id: "private-big-island-experience",
    shortName: "Private Big Island Experience",
    fullName: "Private Big Island Experience: 3 of 4 Window Seats",
    supplier: "Mauna Loa Helicopter Tours - Big Island of Hawaii",
    bestFor: "Private full-island circuit",
    duration: "120 min",
    durationMinutes: 120,
    rating: null,
    reviews: null,
    priceFrom: 671.48,
    priceLabel: "$671",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/d1/d3/c8/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/The-Big-Island-Experience/d669-110657P2",
    featured: true,
    rank: 2,
    rankReason:
      "Ranks as the strongest private comprehensive pick: about two hours from Kona via the Mauna Kea–Mauna Loa saddle to Kīlauea, then Hilo / Hāmākua and Kohala valleys — at a clearer per-person from-price than ultra-premium romance packages.",
    summary:
      "Mauna Loa’s private Big Island Experience is published with 3-of-4 window seating and pilot narration covering volcanoes, coastline and waterfall valleys. Based on listed duration and private format, it suits small groups who want cabin exclusivity without the romantic coffee-landing price tier.",
    facts: [
      "Private helicopter experience · window seats",
      "Published flight time about 2 hours",
      "Departs Kona International Airport area",
      "From about $671 per person",
    ],
  },
  {
    id: "big-island-spectacular",
    shortName: "Big Island Spectacular",
    fullName: "Big Island Spectacular Helicopter Tour",
    supplier: "Blue Hawaiian Helicopters – Waikoloa",
    bestFor: "Shared island overview from Waikoloa",
    duration: "105 min flight",
    durationMinutes: 105,
    rating: 4.8,
    reviews: 132,
    priceFrom: 883,
    priceLabel: "$883",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/d1/c9/9f/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/Big-Island-Spectacular-Helicopter-Tour/d669-190952P3",
    featured: true,
    rank: 3,
    rankReason:
      "Ranks as the clearest shared Waikoloa island overview: published ~105 minutes covering Kīlauea / Volcanoes National Park, Hāmākua rainforest and Kohala waterfall valleys without requiring a private charter.",
    summary:
      "Blue Hawaiian’s Spectacular product is the classic Waikoloa-based “see the Big Island” Eco-Star circuit. Based on published route and traveler review volume in our research snapshot, it suits visitors staying on the Kohala / Waikoloa side who want volcano plus waterfall geography in one shared flight.",
    facts: [
      "Shared Eco-Star sightseeing from Waikoloa",
      "Published flight time about 105 minutes",
      "Kīlauea, Hāmākua Coast and Kohala valleys",
      "From $883 per person",
    ],
  },
  {
    id: "kohala-volcano-90",
    shortName: "Kohala Coast Volcano 90-Min",
    fullName:
      "Kohala Coast Volcano Waterfalls-90 Min Heli Tour-Doors Off or On",
    supplier: "Rainbow Helicopters",
    bestFor: "Doors-on/off volcano + Kohala waterfalls",
    duration: "90 min",
    durationMinutes: 90,
    rating: null,
    reviews: null,
    priceFrom: 895,
    priceLabel: "$895",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/d6/3f/96/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/Kohala-Coast-Volcano-Waterfalls-90-Min-Heli-Tour-Doors-Off-or-On/d669-28456P10",
    featured: true,
    rank: 4,
    rankReason:
      "Ranks for doors-on/off flexibility with a published 90-minute route linking Mauna Loa / Mauna Kea / Hualālai geography to Pololū, Waimanu and Waipiʻo waterfall valleys — strong when open cabin matters but the full 105-minute Kīlauea product is more than you need.",
    summary:
      "Rainbow’s Kohala Coast volcano and waterfalls flight is positioned as a Pele-and-Kamehameha narrative circuit from Kona. Based on published landmarks and format choice, it is a clear mid-premium doors-on/off alternative between shorter coastal hops and the longest Kīlauea eruption listing.",
    facts: [
      "Doors-on or doors-off format",
      "Published flight time about 90 minutes",
      "Volcano summits plus Kohala / Waipiʻo valleys",
      "From $895 per person",
    ],
  },
  {
    id: "volcanoes-safari",
    shortName: "Volcanoes National Park Safari",
    fullName: "Big Island, Hawaii: Volcanoes National Park Safari",
    supplier: "Safari Helicopters",
    bestFor: "Hilo volcano value",
    duration: "55 min",
    durationMinutes: 55,
    rating: null,
    reviews: null,
    priceFrom: 405.7,
    priceLabel: "$406",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2f/d0/71/3c/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/Volcanoes-National-Park-Safari/d669-248255P3",
    featured: true,
    rank: 5,
    rankReason:
      "Ranks as the strongest Hilo-side volcano value in our set: about 55 minutes into Hawaii Volcanoes National Park from Hilo Airport at a lower from-price than Kona-based island-wide circuits.",
    summary:
      "Safari Helicopters’ Volcanoes National Park Safari is published as a family-run Hilo departure focused on park volcanoes, lava flows and nearby forest. Based on meeting point and duration, choose it when you are already on the Hilo side and volcano park scenery — not a full Kohala waterfall circuit — is the goal.",
    facts: [
      "Hilo Airport departure",
      "Published flight time about 55 minutes",
      "Hawaii Volcanoes National Park focus",
      "From about $406 per person",
    ],
  },
  {
    id: "exclusive-landing-spectacular",
    shortName: "Spectacular + Exclusive Landing",
    fullName: "Exclusive Landing with Spectacular Big Island Helicopter Tour",
    supplier: "Blue Hawaiian Helicopters – Waikoloa",
    bestFor: "Island overview + waterfall landing",
    duration: "140 min",
    durationMinutes: 140,
    rating: null,
    reviews: null,
    priceFrom: 1149.67,
    priceLabel: "$1,150",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/d1/c9/77/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/Exclusive-Landing-with-Spectacular-Big-Island-Helicopter-Tour/d669-190952P4",
    featured: false,
    rankReason:
      "Premium Waikoloa Spectacular with published Laupāhoehoe Nui waterfall landing — choose when ground time at a remote falls matters as much as the volcano circuit.",
    summary:
      "Blue Hawaiian’s exclusive-landing Spectacular pairs the island overview route with a published waterfall landing stop. Based on total duration and from-price, it is a celebration upgrade over the standard Spectacular rather than a budget volcano play.",
    facts: [
      "Exclusive waterfall landing included",
      "Published duration about 2 hours 20 minutes",
      "Departs Waikoloa",
      "From about $1,150 per person",
    ],
  },
  {
    id: "kona-coastal-45",
    shortName: "Kona Coastal Sights 45-Min",
    fullName: "Kona Coastal Sights Unseen - 45Min Helicopter Tour - Doors Off/On",
    supplier: "Rainbow Helicopters",
    bestFor: "Shorter doors-on/off Kona coast",
    duration: "45 min",
    durationMinutes: 45,
    rating: null,
    reviews: null,
    priceFrom: 590,
    priceLabel: "$590",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/d6/45/07/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/Coastal-Sights-Unseen-45Min-Helicopter-Tour-Doors-Off-or-On/d669-28456P11",
    featured: false,
    rankReason:
      "Useful shorter doors-on/off Kona Coast and Hualālai circuit — not a substitute for Kīlauea or Kohala valley deep dives.",
    summary:
      "Rainbow’s 45-minute Coastal Sights Unseen flight covers Kaloko fishponds, Kailua Bay, Kealakekua / Captain Cook, Hualālai and Makalawena. Based on published itinerary, treat it as a Kona-side overview when time is limited.",
    facts: [
      "Doors-on or doors-off format",
      "Published flight time about 45 minutes",
      "Kona Coast and Hualālai focus",
      "From $590 per person",
    ],
  },
  {
    id: "kona-hualalai-60",
    shortName: "Kona Coast Hualalai 60-Min",
    fullName:
      "Kona Coast Hualalai Volcano-60Min Helicopter Tour-Door Off or On",
    supplier: "Rainbow Helicopters",
    bestFor: "Mid-length Kona & Hualālai",
    duration: "60 min",
    durationMinutes: 60,
    rating: null,
    reviews: null,
    priceFrom: 640,
    priceLabel: "$640",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/d6/49/9f/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/Kona-Coast-Hualalai-Volcano-60Min-Helicopter-Tour-Door-Off-or-On/d669-28456P13",
    featured: false,
    rankReason:
      "Mid-length doors-on/off Kona Coast and Hualālai flight — compare against the 45-minute coastal hop and longer Kohala / Kīlauea products.",
    summary:
      "Rainbow’s 60-minute Kona Coast / Hualālai tour extends coastal and coffee-farm scenery with Place of Refuge and north-coast bays. Based on duration, it sits between the short coastal hop and Rainbow’s longer volcano / Kohala circuits.",
    facts: [
      "Doors-on or doors-off format",
      "Published flight time about 60 minutes",
      "Kona Coast, Hualālai and north-coast bays",
      "From $640 per person",
    ],
  },
  {
    id: "hilo-waterfalls",
    shortName: "Hilo Waterfalls Experience",
    fullName: "Hilo Waterfalls Experience Helicopter Tour",
    supplier: "Blue Hawaiian Helicopters – Hilo",
    bestFor: "Hilo-side waterfall valleys",
    duration: "60 min",
    durationMinutes: 60,
    rating: null,
    reviews: null,
    priceFrom: 563,
    priceLabel: "$563",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/d6/4c/f8/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/Hilo-Waterfalls-Experience-Helicopter-Tour/d669-3388P3",
    featured: false,
    rankReason:
      "Strong Hilo departure for Hāmākua and Kohala waterfall valleys — choose when waterfalls matter more than a Kīlauea-first routing.",
    summary:
      "Blue Hawaiian’s Hilo Waterfalls Experience flies historic Hilo to the Hāmākua Coast and Kohala valleys including Waipiʻo and Waimanu. Based on published focus, it is a waterfall specialist rather than a volcano-park deep dive.",
    facts: [
      "Hilo departure",
      "Published flight time about 60 minutes",
      "Hāmākua Coast and Kohala waterfall valleys",
      "From $563 per person",
    ],
  },
  {
    id: "discover-hilo",
    shortName: "Discover Hilo / Circle of Fire",
    fullName: "Big Island: Discover Hilo Helicopter Tour",
    supplier: "Blue Hawaiian Helicopters – Hilo",
    bestFor: "Hilo volcano & crater scenery",
    duration: "50 min",
    durationMinutes: 50,
    rating: null,
    reviews: null,
    priceFrom: 519,
    priceLabel: "$519",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/d1/cd/b0/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/Circle-of-Fire-Helicopter-Tour/d669-3388P1",
    featured: false,
    rankReason:
      "Classic Hilo Eco-Star volcano circuit toward Kīlauea and Mauna Loa landscapes — compare against Safari’s park-focused value product.",
    summary:
      "Blue Hawaiian’s Discover Hilo (Circle of Fire) product is published as a ~50-minute Eco-Star flight above Volcanoes National Park scenery from Hilo. Based on itinerary language, active glow viewing is conditions-dependent.",
    facts: [
      "Hilo Eco-Star departure",
      "Published flight time about 50 minutes",
      "Kīlauea / Mauna Loa park landscapes",
      "From $519 per person",
    ],
  },
  {
    id: "kohala-waterfalls-valleys",
    shortName: "Kohala Waterfalls & Valleys",
    fullName: "Kohala Waterfalls & Valleys Helicopter Tour",
    supplier: "Blue Hawaiian Helicopters – Waikoloa",
    bestFor: "Shorter Kohala valleys from Waikoloa",
    duration: "45 min",
    durationMinutes: 45,
    rating: null,
    reviews: null,
    priceFrom: 499,
    priceLabel: "$499",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/d1/c9/16/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/Kohala-Valleys-and-Waterfalls-Adventure-Helicopter-Tour/d669-190952P1",
    featured: false,
    rankReason:
      "Accessible Waikoloa short flight for Kohala cliffs and Waipiʻo — not a Kīlauea island-crossing product.",
    summary:
      "Blue Hawaiian’s Kohala Waterfalls & Valleys tour is a ~45-minute Waikoloa departure focused on Kohala Mountains, Pololū and Waipiʻo. Based on published scope, choose it when waterfall valleys — not active volcano park time — are the priority.",
    facts: [
      "Waikoloa departure",
      "Published flight time about 45 minutes",
      "Kohala Coast valleys and waterfalls",
      "From $499 per person",
    ],
  },
  {
    id: "kohala-landing",
    shortName: "Kohala Waterfalls Landing",
    fullName: "Kohala Waterfalls with Exclusive Landing Helicopter Tour",
    supplier: "Blue Hawaiian Helicopters – Waikoloa",
    bestFor: "Kohala landing experience",
    duration: "70 min",
    durationMinutes: 70,
    rating: null,
    reviews: null,
    priceFrom: 765.67,
    priceLabel: "$766",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/d1/ca/5e/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/Kohala-Waterfalls-with-Exclusive-Landing-Helicopter-Tour/d669-190952P2",
    featured: false,
    rankReason:
      "Kohala circuit with published Laupāhoehoe Nui waterfall landing — a landing specialty without the full Spectacular island-crossing price.",
    summary:
      "Blue Hawaiian’s Kohala landing product adds 20–25 minutes on the ground near a ~1,200-ft waterfall after flying Kohala valleys. Based on format, it suits travelers who want exclusive landing thrills without booking the longer Spectacular + landing package.",
    facts: [
      "Exclusive waterfall landing",
      "Published duration about 70 minutes",
      "Departs Waikoloa",
      "From about $766 per person",
    ],
  },
  {
    id: "private-kona-coast-30",
    shortName: "Private Kona Coast 30-Min",
    fullName: "Private Kona Coast Helicopter Tour: All Window Seats",
    supplier: "Mauna Loa Helicopter Tours - Big Island of Hawaii",
    bestFor: "Private short Kona intro",
    duration: "30 min",
    durationMinutes: 30,
    rating: null,
    reviews: null,
    priceFrom: 240.64,
    priceLabel: "$241",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/33/f1/fa/d9/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/Kona-Coast-Tour-Only-190/d669-110657P4",
    featured: false,
    rankReason:
      "Lowest from-price private option in our set for a short Kona Coast hop — not a volcano or Kohala valley substitute.",
    summary:
      "Mauna Loa’s private 30-minute Kona Coast flight is published with all-window seats for a quick coastal overview (south toward Captain Cook or north toward Kua / Kiholo / Hapuna). Based on duration, treat it as an intro or whale-season coastal hop.",
    facts: [
      "Private · all window seats",
      "Published flight time about 30 minutes",
      "Kona Coast focus",
      "From about $241 per person",
    ],
  },
  {
    id: "private-magical-waterfall",
    shortName: "Private Magical Waterfall",
    fullName: "Private Magical Waterfall Tour",
    supplier: "Mauna Loa Helicopter Tours - Big Island of Hawaii",
    bestFor: "Private Kohala waterfall valleys",
    duration: "75 min",
    durationMinutes: 75,
    rating: null,
    reviews: null,
    priceFrom: 450.81,
    priceLabel: "$451",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/33/f2/05/f1/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/Magical-Waterfall-Tour/d669-110657P1",
    featured: false,
    rankReason:
      "Private doors-on Kohala seven-valley waterfall circuit from Kona — strong when private cabin and Waipiʻo / Waimanu matter more than Kīlauea.",
    summary:
      "Mauna Loa’s Private Magical Waterfall Tour is published as a doors-on-only flight covering Kohala’s windward valleys including Waipiʻo and Waimanu. Based on format notes, it is a private waterfall specialty rather than a doors-off or volcano-park product.",
    facts: [
      "Private · doors-on only",
      "Published flight time about 75 minutes",
      "Seven Kohala windward valleys",
      "From about $451 per person",
    ],
  },
  {
    id: "romantic-kona-coffee-landing",
    shortName: "Romantic Kona Coffee Landing",
    fullName: "Romantic Kona Coffee & Landing: Private Helicopter Tour",
    supplier: "Rainbow Helicopters",
    bestFor: "Private romance / coffee landing",
    duration: "65 min · 45 min flight",
    durationMinutes: 45,
    rating: null,
    reviews: null,
    priceFrom: 4340,
    priceLabel: "$4,340/group",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/d6/5d/b2/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Big-Island-of-Hawaii/Romantic-Kona-Coffee-and-Landing/d669-28456P14",
    featured: false,
    rankReason:
      "Specialty private romance charter with coffee-farm landing — priced per group (up to 3), not comparable to shared per-person sightseeing from-prices.",
    summary:
      "Rainbow’s Romantic Kona Coffee & Landing pairs a private Kona Coast scenic with a published ~20-minute coffee-farm landing, tasting and optional leis/chocolates. Based on format and group pricing, it is a proposal or celebration product — not a substitute for standard volcano sightseeing.",
    facts: [
      "Private charter with coffee-farm landing",
      "Published flight segment about 45 minutes",
      "From $4,340 per group (up to 3)",
      "Departs Rainbow Helicopters, Kona area",
    ],
  },
];

export const featuredBigIslandTours = bigIslandTours
  .filter((tour) => tour.featured)
  .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
