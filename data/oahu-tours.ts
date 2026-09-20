export type OahuTour = {
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
export const oahuTours: OahuTour[] = [
  {
    id: "royal-crown",
    shortName: "Royal Crown 60-Min",
    fullName: "Oahu: 60 Min Royal Crown Helicopter Tour - Doors Off or On",
    supplier: "Rainbow Helicopters",
    bestFor: "Full-island sightseeing",
    duration: "60 min",
    durationMinutes: 60,
    rating: null,
    reviews: null,
    priceFrom: 540,
    priceLabel: "$540",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/b7/b6/01/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Honolulu/Royal-Crown-of-Oahu-60-Min-Helicopter-Tour/d59070-28456P1",
    featured: true,
    rank: 1,
    rankReason:
      "Ranks first for travelers who want a clear full-hour Oahu circuit from Honolulu with a published doors-on or doors-off choice — Diamond Head, Windward Coast, Sacred Falls, North Shore and Pearl Harbor in one flight.",
    summary:
      "According to the operator’s published Royal Crown itinerary, this Rainbow Helicopters flight is positioned as a full-island scenic loop with flexible departure times and an optional doors-off cabin. Based on published duration and landmark coverage, it is the clearest “see Oahu from the air” pick in our Honolulu-departure set.",
    facts: [
      "Doors-on or doors-off format",
      "Published flight time about 60 minutes",
      "Departs Rainbow Helicopters, Honolulu Airport area",
      "From $540 per person",
    ],
  },
  {
    id: "complete-island",
    shortName: "Complete Island Oahu",
    fullName: "Complete Island Oahu Helicopter Tour",
    supplier: "Blue Hawaiian Helicopters – Oahu",
    bestFor: "Longest scenic circuit",
    duration: "65 min",
    durationMinutes: 65,
    rating: null,
    reviews: null,
    priceFrom: 579,
    priceLabel: "$579",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/31/7a/26/43/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Oahu/Complete-Island-Oahu-Helicopter-Tour/d672-201919P2",
    featured: true,
    rank: 2,
    rankReason:
      "Ranks next for published airtime: about 65 minutes covering Pearl Harbor, Diamond Head, Hanauma Bay, Windward beaches, Sacred Falls, North Shore and the leeward coast — the longest scenic circuit in this comparison set.",
    summary:
      "Blue Hawaiian’s Complete Island product is published as a small-group (max 6) full-island sightseeing flight. Based on the listed route and duration, it suits travelers who want broad Oahu coverage — including west-side landmarks many shorter flights skip — rather than a doors-off specialty format.",
    facts: [
      "Small-group scenic format (max 6 published)",
      "Published flight time about 65 minutes",
      "Island-wide landmark coverage including West Oahu",
      "From $579 per person",
    ],
  },
  {
    id: "path-to-pali",
    shortName: "Path to Pali Passage",
    fullName: "Path to Pali Passage - 30 Min Helicopter Tour - Doors Off or On",
    supplier: "Rainbow Helicopters",
    bestFor: "Shorter landmark flight",
    duration: "30 min",
    durationMinutes: 30,
    rating: null,
    reviews: null,
    priceFrom: 440,
    priceLabel: "$440",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/b7/cc/c6/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Honolulu/Path-to-Pali-Passage-30-Min-Helicopter-Tour/d59070-28456P3",
    featured: true,
    rank: 3,
    rankReason:
      "Ranks as the strongest shorter Honolulu flight when time is limited: a published 30-minute doors-on or doors-off route covering Diamond Head, Hanauma Bay, Mt. Olomana, Nuʻuanu Pali and Pearl Harbor.",
    summary:
      "Rainbow’s Path to Pali Passage is positioned for travelers who want classic South Shore and Pali landmarks without committing to a full-hour circuit. Based on published format options and route notes, it is a clear fit when schedule — not maximum island coverage — is the deciding factor.",
    facts: [
      "Doors-on or doors-off choice",
      "Published flight time about 30 minutes",
      "Private-flight upgrade available per listing",
      "From $440 per person",
    ],
  },
  {
    id: "private-all-window",
    shortName: "Private All Window Seats",
    fullName: "Oʻahu Private Helicopter Experience: All Window Seats",
    supplier: "Mauna Loa Helicopter Tours",
    bestFor: "Private cabin value",
    duration: "55 min",
    durationMinutes: 55,
    rating: null,
    reviews: null,
    priceFrom: 415.08,
    priceLabel: "$415",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/30/33/b9/b2/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Oahu/45-Minute-Open-Seating-Helicopter-Tour-Over-Oahu/d672-56499P11",
    featured: true,
    rank: 4,
    rankReason:
      "Ranks as the clearest private-style pick on from-price in our set: published all-window seating, about 55 minutes of flight time, and a lower per-person starting rate than longer shared full-island options.",
    summary:
      "Mauna Loa’s private Oahu experience is published with dedicated pilot commentary and all-window seating from Honolulu. Based on listed duration and landmark coverage (Waikiki, Makapuʻu, Kāneʻohe Bay, North Shore, Pearl Harbor), it suits small groups who want cabin exclusivity without the ultra-premium romantic-landing price tier.",
    facts: [
      "Private helicopter experience · all window seats",
      "Published flight time about 55 minutes",
      "Departs Honolulu Airport area",
      "From about $415 per person",
    ],
  },
  {
    id: "discover-north-shore",
    shortName: "Discover North Shore",
    fullName: "Discover North Shore Helicopter Tour",
    supplier: "Blue Hawaiian Helicopters - Turtle Bay",
    bestFor: "North Shore focus",
    duration: "30 min",
    durationMinutes: 30,
    rating: null,
    reviews: null,
    priceFrom: 397,
    priceLabel: "$397",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/31/7a/26/3c/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Oahu/Discover-North-Shore-Helicopter-Tour/d672-5488668P4",
    featured: true,
    rank: 5,
    rankReason:
      "Ranks as the North Shore specialist: a published 30-minute Turtle Bay departure focused on surf coastline, Haleʻiwa, Koʻolau views and Sacred Falls — not a full-island replacement.",
    summary:
      "Blue Hawaiian’s Turtle Bay North Shore flight is aimed at travelers staying on or prioritizing the North Shore. Based on published meeting point and itinerary, large winter surf viewing depends on swell conditions — compare it against full-island Honolulu departures if you need Diamond Head and Pearl Harbor in the same flight.",
    facts: [
      "North Shore–focused route",
      "Published flight time about 30 minutes",
      "Departs Turtle Bay / Kahuku area",
      "From $397 per person",
    ],
  },
  {
    id: "air-adventure",
    shortName: "Oahu Air Adventure",
    fullName: "Oahu Air Adventure Helicopter Tour",
    supplier: "Blue Hawaiian Helicopters - Turtle Bay",
    bestFor: "Turtle Bay island circuit",
    duration: "50 min",
    durationMinutes: 50,
    rating: null,
    reviews: null,
    priceFrom: 579,
    priceLabel: "$579",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/31/7a/26/42/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Oahu/Oahu-Air-Adventure-Helicopter-Tour/d672-5488668P3",
    featured: false,
    rankReason:
      "Strong Turtle Bay–based island overview with Eco-Star glass viewing — compare departure logistics against Honolulu-based full-island flights at similar from-prices.",
    summary:
      "This Blue Hawaiian Turtle Bay product is published as a ~50-minute Eco-Star sightseeing flight covering Pearl Harbor, Diamond Head, Windward beaches, Sacred Falls and the North Shore. Based on meeting-point logistics, it is especially relevant if you are already on the North Shore rather than staying in Waikiki or near HNL.",
    facts: [
      "Eco-Star glass sightseeing format",
      "Published flight time about 50 minutes",
      "Departs Turtle Bay / Kahuku area",
      "From $579 per person",
    ],
  },
  {
    id: "last-minute-single",
    shortName: "Last-Minute Single Seat",
    fullName: "Last Minute Single Passenger Helicopter Tour of Oahu Door Off/On",
    supplier: "Rainbow Helicopters",
    bestFor: "Solo / last-minute value",
    duration: "20–60 min",
    durationMinutes: null,
    rating: null,
    reviews: null,
    priceFrom: 319,
    priceLabel: "$319",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/d6/3d/69/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Oahu/Last-Minute-Single-Passenger-Helicopter-Tour-of-Oahu-Doors-Off-On/d672-28456P17",
    featured: false,
    rankReason:
      "Included for solo travelers chasing discounted single-seat inventory — published duration varies (about 20–60 minutes), so verify the exact flight length before treating it as equivalent to the Royal Crown.",
    summary:
      "Rainbow’s last-minute single-passenger listing is positioned for spontaneous or solo travelers at a lower from-price. Based on published details, seats and exact flight length can vary — compare the live product page carefully against fixed-duration doors-on/off options from the same operator.",
    facts: [
      "Single-passenger / last-minute pricing",
      "Published duration ranges about 20–60 minutes",
      "Doors-off or doors-on options noted on listing",
      "From $319 per person",
    ],
  },
  {
    id: "romantic-landing",
    shortName: "Private Romantic Landing",
    fullName: "Private 45 Minute Helicopter Tour with Romantic Landing",
    supplier: "Rainbow Helicopters",
    bestFor: "Private romance / landing",
    duration: "45 min flight",
    durationMinutes: 45,
    rating: null,
    reviews: null,
    priceFrom: 3240,
    priceLabel: "$3,240/group",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/b7/c8/f7/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Honolulu/Private-60-Minute-Helicopter-Tour-with-Kualoa-Ranch-Landing/d59070-28456P8",
    featured: false,
    rankReason:
      "Specialty private charter with a published romantic landing experience — priced per group (up to 3), not comparable to shared per-person sightseeing from-prices.",
    summary:
      "This Rainbow private flight pairs a scenic Oahu circuit with a published exclusive landing that includes leis, chocolates and champagne per the listing. Based on format and from-price, it is a celebration or proposal product — not a substitute for standard shared sightseeing when budget is the primary filter.",
    facts: [
      "Private charter with romantic landing",
      "Published flight time about 45 minutes",
      "From $3,240 per group (up to 3)",
      "Departs Rainbow Helicopters, Honolulu",
    ],
  },
  {
    id: "volcano-day-trip",
    shortName: "Oahu to Hilo Volcano Day Trip",
    fullName: "Day Trip from Oahu to Hilo: Active Volcanoes & Helicopter Tour",
    supplier: "Polynesian Adventure Tours",
    bestFor: "Big Island volcano day trip",
    duration: "12 hr day · 45 min flight",
    durationMinutes: 45,
    rating: null,
    reviews: null,
    priceFrom: 1053.68,
    priceLabel: "$1,054",
    image:
      "https://dynamic-media.tacdn.com/media/photo-o/2e/b7/ba/f0/caption.jpg?w=700&h=500&s=1",
    viatorUrl:
      "https://www.viator.com/tours/Oahu/Volcano-Adventure-Full-Day-Helicopter-Flyaway/d672-2360P47",
    featured: false,
    rankReason:
      "Included as a different product type: a full-day Oahu–Hilo island-hop with a Big Island helicopter segment — not an Oahu-only aerial sightseeing tour.",
    summary:
      "Polynesian Adventure Tours packages interisland transport, Hawaii Volcanoes National Park sightseeing and a published ~45-minute Big Island helicopter segment. Based on itinerary scope, compare it only if you specifically want a volcano day trip from Oahu — not if your goal is Diamond Head or North Shore from the air over Oahu itself.",
    facts: [
      "Full-day Oahu–Hilo island-hop package",
      "Helicopter segment about 45 minutes (conditions apply)",
      "Includes park sightseeing and lunch per listing",
      "From about $1,054 per person",
    ],
  },
];

export const featuredOahuTours = oahuTours
  .filter((tour) => tour.featured)
  .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
