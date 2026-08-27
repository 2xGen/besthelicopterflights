export type KauaiTour = {
  id: string;
  shortName: string;
  fullName: string;
  supplier: string;
  bestFor: string;
  duration: string;
  /** Published flight minutes when known — used for $/min comparisons */
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
 * Rankings are research-led (feedback volume/rating, route/experience fit,
 * value, and published tour details) — not Viator listing order.
 */
export const kauaiTours: KauaiTour[] = [
  {
    id: "private-doors-off",
    shortName: "Kauai Private Doors-Off",
    fullName: "Kauai Private Doors Off Helicopter Tour: Ultimate Waterfalls",
    supplier: "Aliʻi Kauai Air Tours & Charters",
    bestFor: "Private experience",
    duration: "75 min",
    durationMinutes: 75,
    rating: 5.0,
    reviews: 1765,
    priceFrom: 425,
    priceLabel: "$425",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/ed/08/a7/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Kauai/Kauai-Private-Helicopter-Tour/d670-106191P10",
    featured: true,
    rank: 1,
    rankReason:
      "Ranks first for private charters: a perfect 5.0 traveler rating across a large review base, plus a longer published flight time that supports a more complete doors-off waterfall circuit.",
    summary:
      "Based on traveler reviews, published duration and the private charter format, this tour stands out for groups who want a doors-off flight without sharing the cabin. Reviewers frequently mention waterfall views and the flexibility of a private experience.",
    facts: [
      "Private charter · doors-off format",
      "Published duration about 75 minutes",
      "Traveler rating 5.0 from 1,765 reviews (Viator listing data)",
      "From $425 per person",
    ],
  },
  {
    id: "eco-adventure",
    shortName: "Kauai Eco Adventure",
    fullName: "Kauai Eco Adventure Helicopter Tour",
    supplier: "Blue Hawaiian Helicopters – Kauai",
    bestFor: "Overall sightseeing",
    duration: "50 min",
    durationMinutes: 50,
    rating: 4.8,
    reviews: 2057,
    priceFrom: 489,
    priceLabel: "$489",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/31/7a/31/2c/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Kauai/Kauai-ECO-Adventure-Helicopter-Tour/d670-23786P2",
    featured: true,
    rank: 2,
    rankReason:
      "Ranks high for island-wide sightseeing because it combines a strong 4.8 rating with the largest review volume in this comparison set — useful when you want a proven, broadly covered Kauai route.",
    summary:
      "Our comparison is based on traveler feedback volume, rating consistency and Blue Hawaiian’s published eco-adventure positioning. Travelers consistently report wide scenic coverage; this is a strong pick when you want a well-reviewed overall Kauai overview rather than a niche doors-off or landing product.",
    facts: [
      "Island sightseeing focus",
      "Published duration about 50 minutes",
      "Traveler rating 4.8 from 2,057 reviews (Viator listing data)",
      "From $489 per person",
    ],
  },
  {
    id: "waterfall-safari",
    shortName: "Deluxe Waterfall Safari",
    fullName: "Kauai Deluxe Waterfall Safari: Helicopter Tour",
    supplier: "Safari Helicopters",
    bestFor: "Waterfalls",
    duration: "55 min",
    durationMinutes: 55,
    rating: 4.8,
    reviews: 955,
    priceFrom: 335.7,
    priceLabel: "$336",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/ed/0e/c0/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Kauai/Deluxe-Waterfall-Safari/d670-248255P1",
    featured: true,
    rank: 3,
    rankReason:
      "Ranks as the waterfall specialist: strong traveler ratings, solid review volume and one of the lower from-prices in the set relative to a 55-minute published flight.",
    summary:
      "According to the operator’s published waterfall-safari positioning and traveler feedback patterns, this tour is particularly popular with visitors prioritizing cascades and lush valleys. Reviewers frequently mention waterfall scenery; value looks favorable versus longer or private options in this set.",
    facts: [
      "Waterfall-focused route positioning",
      "Published duration about 55 minutes",
      "Traveler rating 4.8 from 955 reviews (Viator listing data)",
      "From about $336 per person",
    ],
  },
  {
    id: "luxury-doors-off",
    shortName: "Kauai Luxury Doors-Off",
    fullName: "Kauai Luxury 60-Minute Doors-Off Helicopter Adventure",
    supplier: "Jack Harter Helicopters – Tours",
    bestFor: "Doors-off",
    duration: "60 min",
    durationMinutes: 60,
    rating: 4.8,
    reviews: 412,
    priceFrom: 460,
    priceLabel: "$460",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/ee/a7/34/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Kauai/Doors-Off-Helicopter-tour-Kauai-FULL-60-mins/d670-441243P1",
    featured: true,
    rank: 4,
    rankReason:
      "Ranks as the full-hour doors-off pick: a clear 60-minute published adventure with strong ratings for travelers who want open-air photography time without booking a private charter.",
    summary:
      "Based on traveler reviews and the published 60-minute doors-off format, this tour stands out for open-air sightseeing with Jack Harter. Travelers consistently report immersive doors-off views; it sits above shorter doors-off options when flight time is the priority.",
    facts: [
      "Doors-off luxury adventure format",
      "Published duration 60 minutes",
      "Traveler rating 4.8 from 412 reviews (Viator listing data)",
      "From $460 per person",
    ],
  },
  {
    id: "kauai-experience",
    shortName: "Kauai Experience",
    fullName:
      "Private Kauaʻi Helicopter Experience: Doors-Off ALL WINDOW SEATS",
    supplier: "Mauna Loa Helicopters Kauai",
    bestFor: "Doors-off",
    duration: "55 min",
    durationMinutes: 55,
    rating: 4.8,
    reviews: 482,
    priceFrom: 384,
    priceLabel: "$384",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2f/45/fc/7d/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Kauai/Kauai-The-Kauai-Experience/d670-71933P1",
    featured: true,
    rank: 5,
    rankReason:
      "Ranks as a strong doors-off value play: private-style window seats, solid ratings and a lower from-price than the longer private Aliʻi charter.",
    summary:
      "Based on the published doors-off all-window-seat format and traveler feedback, this Mauna Loa experience is particularly popular with photographers and small groups who want open views without stepping up to the highest private price tier in this comparison.",
    facts: [
      "Doors-off · all window seats",
      "Published duration about 55 minutes",
      "Traveler rating 4.8 from 482 reviews (Viator listing data)",
      "From $384 per person",
    ],
  },
  {
    id: "jurassic-canyon",
    shortName: "Jurassic Canyon Landing",
    fullName: "Kauai Exclusive Helicopter Tour: Jurassic Canyon Landing",
    supplier: "Safari Helicopters",
    bestFor: "Canyon landing",
    duration: "See listing",
    durationMinutes: null,
    rating: null,
    reviews: null,
    priceFrom: 395.7,
    priceLabel: "$396",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/ed/09/73/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Kauai/Kauai-Olokele-Canyon-Helicopter-Tour-with-Canyon-Landing/d670-248255P2",
    featured: false,
    rankReason:
      "Included for travelers who specifically want a published canyon-landing experience — a different product type than pure aerial sightseeing.",
    summary:
      "According to the operator’s published Olokele Canyon landing product details, this Safari Helicopters tour is aimed at travelers who want more than a continuous scenic circuit. Compare landing inclusions, total flight time and price carefully against non-landing waterfall or doors-off flights.",
    facts: [
      "Includes a canyon landing (per Viator product listing)",
      "Operated by Safari Helicopters",
      "From about $396 per person",
    ],
  },
  {
    id: "heart-of-island",
    shortName: "Heart of the Island",
    fullName: "Kauai: Heart of the Island Doors-Off Helicopter Tour",
    supplier: "Jack Harter Helicopters – Tours",
    bestFor: "Doors-off value",
    duration: "See listing",
    durationMinutes: null,
    rating: null,
    reviews: null,
    priceFrom: 221,
    priceLabel: "$221",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/31/0d/cb/d6/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Kauai/Doors-Off-Heart-of-the-Island-Kauai-Helicopter-Tour/d670-441243P4",
    featured: false,
    rankReason:
      "Notable entry-level doors-off option on price — verify published duration and route coverage before choosing it over longer Jack Harter or private flights.",
    summary:
      "Based on the published doors-off “Heart of the Island” positioning and from-price, this Jack Harter option can suit travelers prioritizing open-air flying at a lower entry cost. Compare duration and route depth against the 60-minute luxury doors-off adventure from the same operator.",
    facts: [
      "Doors-off format",
      "Operated by Jack Harter Helicopters",
      "From $221 per person",
    ],
  },
  {
    id: "discover-princeville",
    shortName: "Discover Kauai (Princeville)",
    fullName: "Discover Kauai Helicopter Tour from Princeville",
    supplier: "Blue Hawaiian Helicopters – Kauai",
    bestFor: "North Shore departure",
    duration: "See listing",
    durationMinutes: null,
    rating: null,
    reviews: null,
    priceFrom: 579,
    priceLabel: "$579",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/ee/a5/6d/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Kauai/Discover-Kauai-Helicopter-Tour-from-Princeville/d670-394743P2",
    featured: false,
    rankReason:
      "Best fit when departure logistics matter: Princeville base for North Shore stays, at a higher from-price than Blue Hawaiian’s Eco Adventure.",
    summary:
      "According to the operator’s published Princeville departure details, this tour is especially relevant if you are staying on Kauai’s North Shore and want to avoid a long transfer to other heliports. Compare route coverage and price against the Eco Adventure listing from the same operator.",
    facts: [
      "Departs from Princeville",
      "Operated by Blue Hawaiian Helicopters – Kauai",
      "From $579 per person",
    ],
  },
  {
    id: "air-kauai-doors-off",
    shortName: "Air Kauai Doors-Off",
    fullName: "Air Kauai: Doors-Off Helicopter Adventure",
    supplier: "Air Kauai Helicopters",
    bestFor: "Doors-off",
    duration: "See listing",
    durationMinutes: null,
    rating: null,
    reviews: null,
    priceFrom: 402.09,
    priceLabel: "$402",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/ed/0e/9c/caption.jpg?w=700&h=500&s=1",
    viatorUrl: "https://www.viator.com/tours/Kauai/Doors-Off/d670-310009P1",
    featured: false,
    rankReason:
      "Another doors-off contender to compare on route, seat configuration and booking terms alongside Jack Harter and Mauna Loa options.",
    summary:
      "Based on the published doors-off adventure listing, Air Kauai is a relevant operator to compare if open-cabin flying is your priority. Reviewers’ themes and exact route notes should be checked on the live Viator product page alongside cancellation and weight policies.",
    facts: [
      "Doors-off adventure format",
      "Operated by Air Kauai Helicopters",
      "From about $402 per person",
    ],
  },
  {
    id: "air-kauai-ohana",
    shortName: "Air Kauai Ohana",
    fullName: "Air Kauai: Ohana (Doors-On) Helicopter Tour",
    supplier: "Air Kauai Helicopters",
    bestFor: "Doors-on comfort",
    duration: "See listing",
    durationMinutes: null,
    rating: null,
    reviews: null,
    priceFrom: 348.62,
    priceLabel: "$349",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/ed/0c/9f/caption.jpg?w=700&h=500&s=1",
    viatorUrl: "https://www.viator.com/tours/Kauai/Amazing/d670-310009P3",
    featured: false,
    rankReason:
      "Useful doors-on alternative for travelers who prefer a enclosed cabin — compare comfort vs. the doors-off photography tradeoff.",
    summary:
      "According to the operator’s published Ohana doors-on product details, this tour suits travelers who want scenic Kauai flying without a doors-off cabin. Based on typical traveler preferences, doors-on options are often chosen for comfort, conversation and less wind exposure.",
    facts: [
      "Doors-on (enclosed) format",
      "Operated by Air Kauai Helicopters",
      "From about $349 per person",
    ],
  },
];

export const featuredKauaiTours = kauaiTours
  .filter((tour) => tour.featured)
  .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
