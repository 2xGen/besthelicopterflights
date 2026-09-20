export type MauiTour = {
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
export const mauiTours: MauiTour[] = [
  {
    id: "doors-off-west-maui-molokai",
    shortName: "Doors-Off West Maui & Molokai",
    fullName: "Doors Off West Maui and Molokai 45 minute Helicopter Tour",
    supplier: "Air Maui Helicopter Tours",
    bestFor: "Doors-off West Maui & Molokai",
    duration: "45 min",
    durationMinutes: 45,
    rating: null,
    reviews: null,
    priceFrom: 451.99,
    priceLabel: "$452",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/cc/92/38/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Maui/Doors-Off-West-Maui-and-Molokai-Helicopter-Tour/d671-5069DOM",
    featured: true,
    rank: 1,
    rankReason:
      "Ranks first as Maui’s clearest doors-off specialty: a published 45-minute open-cabin flight over West Maui Mountains and Molokai’s north-shore sea cliffs — a format most Maui listings do not offer.",
    summary:
      "Air Maui positions this as a small-group (max 6) doors-off scenic flight from Kahului with rainforest valleys, waterfalls and Molokai sea-cliff views. Based on published format and route, it is the strongest pick when open-air photography and thrill — not maximum island coverage — is the goal.",
    facts: [
      "Doors-off cabin format",
      "Published flight time about 45 minutes",
      "West Maui Mountains and Molokai north shore",
      "From about $452 per person",
    ],
  },
  {
    id: "complete-island-60",
    shortName: "Complete Island 60-Min",
    fullName: "Complete Island 60-Minute Helicopter Tour",
    supplier: "Air Maui Helicopter Tours",
    bestFor: "Full-island sightseeing",
    duration: "60 min",
    durationMinutes: 60,
    rating: null,
    reviews: null,
    priceFrom: 513.33,
    priceLabel: "$513",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/cc/90/8b/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Maui/Maui-Helicopter-Tour-Complete-Island-Flight/d671-5069COMP60",
    featured: true,
    rank: 2,
    rankReason:
      "Ranks next for broad Maui coverage in a published hour: West Maui valleys, Haleakala Crater, Hana coastline and Molokai views — the clearest “see the whole island” scenic circuit in this set.",
    summary:
      "Air Maui’s Complete Island flight is published as a six-passenger A-Star circuit with pilot narration and 180-degree views. Based on listed duration and landmarks, it suits travelers who want East and West Maui in one flight rather than a doors-off or landing specialty.",
    facts: [
      "Full-island scenic circuit",
      "Published flight time about 60 minutes",
      "Haleakala, Hana rainforest and West Maui coverage",
      "From about $513 per person",
    ],
  },
  {
    id: "spectacular-landing",
    shortName: "Maui & Molokai Spectacular Landing",
    fullName:
      "Maui & Molokai Spectacular with Exclusive Landing Helicopter Tour",
    supplier: "Blue Hawaiian Helicopters – Maui",
    bestFor: "Premium landing experience",
    duration: "90 min",
    durationMinutes: 90,
    rating: null,
    reviews: null,
    priceFrom: 663,
    priceLabel: "$663",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/cc/8e/ba/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Maui/Maui-Spectacular-with-Exclusive-Landing-Helicopter-Tour/d671-376191P4",
    featured: true,
    rank: 3,
    rankReason:
      "Ranks as the premium landing pick: published ~90 minutes covering West Maui, Molokai, Haleakala and Hana-area rainforest with an exclusive Ulupalakua Ranch landing and complimentary drinks.",
    summary:
      "Blue Hawaiian’s Spectacular product pairs a longer scenic circuit with a published exclusive ranch landing. Based on itinerary scope and from-price, it is a celebration or once-in-a-trip upgrade — not the value play when you only need a standard West Maui / Molokai overflights.",
    facts: [
      "Exclusive Ulupalakua Ranch landing",
      "Published duration about 90 minutes",
      "West Maui, Molokai, Haleakala and Hana-area scenery",
      "From $663 per person",
    ],
  },
  {
    id: "hana-haleakala-air-maui",
    shortName: "Hana Rainforest & Haleakala",
    fullName: "Hana Rainforest and Haleakala Crater Helicopter Tour",
    supplier: "Air Maui Helicopter Tours",
    bestFor: "East Maui & Haleakala focus",
    duration: "45 min",
    durationMinutes: 45,
    rating: null,
    reviews: null,
    priceFrom: 368,
    priceLabel: "$368",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/cc/86/f1/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Maui/45-minute-Helicopter-Tour-over-Rainforests-and-Haleakala-Crater/d671-5069EAST45",
    featured: true,
    rank: 4,
    rankReason:
      "Ranks as the strongest East Maui specialist at a mid-low from-price: published 45 minutes over Haleakala Crater, Hana rainforest, valleys and rugged east coastline most road travelers never reach.",
    summary:
      "Air Maui’s Hana / Haleakala flight is aimed at travelers who want crater cinder cones and East Maui waterfall country rather than a West Maui–Molokai circuit. Based on published route and duration, it is a clear photography-friendly alternative to full-island or doors-off products.",
    facts: [
      "East Maui / Haleakala focus",
      "Published flight time about 45 minutes",
      "Departs Kahului Heliport",
      "From $368 per person",
    ],
  },
  {
    id: "deluxe-molokai-maui",
    shortName: "Deluxe Molokai & Maui",
    fullName: "Deluxe Helicopter Tour of Molokai and Maui",
    supplier: "Maverick Helicopters Maui",
    bestFor: "Two-island value circuit",
    duration: "55 min",
    durationMinutes: 55,
    rating: null,
    reviews: null,
    priceFrom: 404.12,
    priceLabel: "$404",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/cc/87/23/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Maui/Molokai-and-Maui-Helicopter-Tour/d671-7029OGGVOY",
    featured: true,
    rank: 5,
    rankReason:
      "Ranks as a strong two-island value pick: about 55 minutes covering Molokai sea cliffs, Kahiwa Falls, Halawa Valley and West Maui highlights at a lower from-price than many hour-plus circuits.",
    summary:
      "Maverick’s Deluxe Molokai and Maui tour is published with live pilot commentary and flexible morning/afternoon starts from Kahului. Based on listed landmarks and duration, it suits travelers who want Molokai’s north shore without paying for a landing package.",
    facts: [
      "Maui and Molokai two-island route",
      "Published flight time about 55 minutes",
      "Live pilot commentary",
      "From about $404 per person",
    ],
  },
  {
    id: "oceanfront-landing",
    shortName: "West Maui Oceanfront Landing",
    fullName:
      "West Maui and Molokai with Oceanfront Landing Helicopter Tour",
    supplier: "Air Maui Helicopter Tours",
    bestFor: "Oceanfront landing thrill",
    duration: "75 min",
    durationMinutes: 75,
    rating: null,
    reviews: null,
    priceFrom: 472.33,
    priceLabel: "$472",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/cc/98/a7/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Maui/West-Maui-and-Molokai-Helicopter-Tour-with-Oceanfront-Landing/d671-5069OFL",
    featured: false,
    rankReason:
      "Strong West Maui / Molokai circuit with a published private oceanfront landing — compare against the Ulupalakua Spectacular landing if ranch scenery matters more than waterfront pause.",
    summary:
      "Air Maui’s oceanfront-landing product combines West Maui ridges, Molokai sea cliffs and a published north-shore Maui landing stop. Based on duration and format, it is a mid-premium alternative when you want a landing without the highest Spectacular from-price.",
    facts: [
      "Oceanfront landing included",
      "Published duration about 75 minutes",
      "West Maui Mountains and Molokai cliffs",
      "From about $472 per person",
    ],
  },
  {
    id: "west-maui-molokai-60",
    shortName: "West Maui & Molokai 60-Min",
    fullName: "West Maui and Molokai 60-Minute Helicopter Tour",
    supplier: "Air Maui Helicopter Tours",
    bestFor: "Longer West Maui & Molokai",
    duration: "60 min",
    durationMinutes: 60,
    rating: null,
    reviews: null,
    priceFrom: 513.33,
    priceLabel: "$513",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/cc/97/43/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Maui/West-Maui-and-Molokai-60-minute-Helicopter-Tour/d671-5069WEST60",
    featured: false,
    rankReason:
      "Solid full-hour West Maui / Molokai focus with Halawa Valley and tall sea cliffs — compare against Complete Island if you also need Haleakala and Hana in the same flight.",
    summary:
      "This Air Maui hour-long product concentrates on West Maui Mountains and Molokai’s remote north shore, including published waterfall and sea-cliff viewpoints. Based on itinerary, choose it when Molokai cliffs matter more than East Maui crater scenery.",
    facts: [
      "West Maui and Molokai focus",
      "Published flight time about 60 minutes",
      "Halawa Valley and tall sea cliffs",
      "From about $513 per person",
    ],
  },
  {
    id: "waterfalls-west-maui-molokai",
    shortName: "Waterfalls West Maui & Molokai",
    fullName: "Waterfalls of West Maui and Molokai Helicopter Tour",
    supplier: "Blue Hawaiian Helicopters – Maui",
    bestFor: "Waterfall-focused scenic",
    duration: "50 min",
    durationMinutes: 50,
    rating: null,
    reviews: null,
    priceFrom: 499,
    priceLabel: "$499",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/cc/8e/ba/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Maui/Waterfalls-of-West-Maui-and-Molokai-Helicopter-Tour/d671-376191P1",
    featured: false,
    rankReason:
      "Blue Hawaiian waterfall-forward West Maui / Molokai circuit with state-certified pilot guides — a strong doors-on alternative to Air Maui’s West Maui family.",
    summary:
      "Blue Hawaiian positions this ~50-minute narrated flight for travelers short on time who still want West Maui valleys and Molokai waterfall country. Based on published aircraft and guide notes, it is a polished Eco-Star-style scenic option rather than a doors-off product.",
    facts: [
      "Waterfall and valley focus",
      "Published flight time about 50 minutes",
      "Aviation-grade headphones / pilot narration",
      "From $499 per person",
    ],
  },
  {
    id: "hawaiian-odyssey-three-island",
    shortName: "Maui, Molokai & Lanai Odyssey",
    fullName: "Hawaiian Odyssey: Maui, Molokai & Lanai Scenic Helicopter Tour",
    supplier: "Maverick Helicopters Maui",
    bestFor: "Three-island overview",
    duration: "65 min",
    durationMinutes: 65,
    rating: null,
    reviews: null,
    priceFrom: 529,
    priceLabel: "$529",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/cc/8a/44/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Maui/Sunset-Helicopter-Flight-Maui-Molokai-and-Lanai/d671-7029OGGSUN",
    featured: false,
    rankReason:
      "Unique three-island geography (Maui, Molokai and Lanai) in about 65 minutes — choose when interisland variety matters more than deep East Maui crater time.",
    summary:
      "Maverick’s Odyssey product is published as an Eco-Star flight covering Maui shores, Molokai cliffs and Lanai’s north shore with live commentary. Based on itinerary breadth, it answers “see neighboring islands” better than Hana-only or short West Maui hops.",
    facts: [
      "Maui, Molokai and Lanai coverage",
      "Published flight time about 65 minutes",
      "Live pilot commentary",
      "From $529 per person",
    ],
  },
  {
    id: "hana-rainforest-landing",
    shortName: "Hana Rainforest Landing",
    fullName: "Luxury Helicopter Experience with Hana Rainforest Landing",
    supplier: "Maverick Helicopters Maui",
    bestFor: "Hana landing experience",
    duration: "75 min · 40 min flight",
    durationMinutes: 40,
    rating: null,
    reviews: null,
    priceFrom: 405.53,
    priceLabel: "$406",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/31/c6/e7/e8/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Maui/Hana-Rainforest-Helicopter-Tour-with-Exclusive-Landing/d671-7029OGGHAN",
    featured: false,
    rankReason:
      "Hana rainforest circuit with a published Wailua Valley landing — strong mid-price landing alternative focused on East Maui rather than Ulupalakua ranch scenery.",
    summary:
      "Maverick’s Hana landing experience pairs a ~40-minute flight over north-coast cliffs and Jurassic Rock with a published stop on a former taro plantation in Wailua Valley. Based on format, it suits travelers who want ground time in rainforest country without a full Road to Hana day package.",
    facts: [
      "Exclusive Wailua Valley landing",
      "Published flight segment about 40 minutes",
      "Hana rainforest / north-coast scenery",
      "From about $406 per person",
    ],
  },
  {
    id: "hana-rainforest-blue",
    shortName: "Hana Rainforest Scenic",
    fullName: "Hana Rainforest Scenic Helicopter Tour",
    supplier: "Blue Hawaiian Helicopters – Maui",
    bestFor: "East Maui Eco-Star scenic",
    duration: "45–50 min",
    durationMinutes: 50,
    rating: null,
    reviews: null,
    priceFrom: 499,
    priceLabel: "$499",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/31/7a/33/20/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Maui/Hana-and-Haleakala-Scenic-Helicopter-Tour/d671-376191P3",
    featured: false,
    rankReason:
      "Blue Hawaiian East Maui scenic with Eco-Star seating — compare against Air Maui’s lower-priced Hana / Haleakala flight if operator preference and cabin style matter.",
    summary:
      "Blue Hawaiian’s Hana Rainforest Scenic flies Haleakala Crater, Oheʻo Gulch and Hana Town with aviation-grade headphones and first-class Eco-Star seating per the listing. Based on from-price, it sits above Air Maui’s East Maui option while offering a different aircraft experience.",
    facts: [
      "East / northeast Maui scenic",
      "Published flight time about 45–50 minutes",
      "Eco-Star seats and viewing windows",
      "From $499 per person",
    ],
  },
  {
    id: "west-maui-molokai-45",
    shortName: "West Maui & Molokai 45-Min",
    fullName: "West Maui and Molokai Special 45-Minute Helicopter Tour",
    supplier: "Air Maui Helicopter Tours",
    bestFor: "Shorter West Maui & Molokai",
    duration: "45 min",
    durationMinutes: 45,
    rating: null,
    reviews: null,
    priceFrom: 368,
    priceLabel: "$368",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/cc/91/13/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Maui/West-Maui-and-Molokai-Exclusive-45-Minute-Helicopter-Tour/d671-5069WEST45",
    featured: false,
    rankReason:
      "Accessible from-price doors-on West Maui / Molokai overview — the natural compare-to when you want this route family without doors-off pricing.",
    summary:
      "Air Maui’s 45-minute West Maui and Molokai special covers rainforest valleys and Molokai’s north shore in a small group capped at six. Based on published details, it is the doors-on sibling to the doors-off product when open cabin is not required.",
    facts: [
      "Doors-on West Maui / Molokai route",
      "Published flight time about 45 minutes",
      "Small group capped at six",
      "From $368 per person",
    ],
  },
  {
    id: "birds-eye-30",
    shortName: "Bird’s Eye View 30-Min",
    fullName: "Birds Eye View 30 Minute Maui Helicopter Tour",
    supplier: "Air Maui Helicopter Tours",
    bestFor: "Budget / shorter intro",
    duration: "30 min",
    durationMinutes: 30,
    rating: null,
    reviews: null,
    priceFrom: 315.99,
    priceLabel: "$316",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/31/36/cd/99/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Maui/Birds-Eye-View-30-Minute-Maui-Helicopter-Tour/d671-5069P63",
    featured: false,
    rankReason:
      "Lowest from-price in our Maui set for a shorter northwest / west coastline intro — not a substitute for full West Maui–Molokai or Complete Island coverage.",
    summary:
      "Air Maui’s Bird’s Eye View is positioned as a budget-friendlier 30-minute overview past Kahakuloa, Kaʻanapali and central Maui. Based on published itinerary scope, treat it as an introduction flight rather than a deep Molokai or Haleakala experience.",
    facts: [
      "Shorter introductory scenic",
      "Published flight time about 30 minutes",
      "Northwest and west Maui coastline focus",
      "From about $316 per person",
    ],
  },
  {
    id: "road-to-hana-heli",
    shortName: "Road to Hana + Helicopter",
    fullName: "Maui: Road to Hana Luxury Limo-Van Tour with Helicopter Flight",
    supplier: "Temptation Tours, Inc.",
    bestFor: "Ground + air combo day",
    duration: "6 hr day · 36 min flight",
    durationMinutes: 36,
    rating: null,
    reviews: null,
    priceFrom: 599,
    priceLabel: "$599",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/cc/98/4b/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Maui/Small-Group-Road-to-Hana-Luxury-Tour-and-Helicopter-Flight/d671-5501HASKY",
    featured: false,
    rankReason:
      "Different product type: luxury Road to Hana limo-van day with a helicopter return — compare only if you want ground stops plus air, not a pure scenic flight.",
    summary:
      "Temptation Tours packages a small-group luxury limo-van along the Road to Hana (Keʻanae, waterfalls, beachside lunch) with a published ~36-minute helicopter segment over Haleakala and the rugged coast. Based on itinerary, it is a full half-day combo — not interchangeable with Kahului-only scenic circuits.",
    facts: [
      "Limo-van Road to Hana + helicopter combo",
      "Published day about 6 hours · flight ~36 minutes",
      "Group size capped at six",
      "From $599 per person",
    ],
  },
];

export const featuredMauiTours = mauiTours
  .filter((tour) => tour.featured)
  .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
