import type { DestinationSlug } from "@/data/destinations";
import type { FlightSearchParams } from "@/data/flights";

export type DestinationGuide = {
  slug: DestinationSlug;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  heading: string;
  /** When set, used as the page H1 on the hub instead of “Helicopter flights in {name}”. */
  hubH1?: string;
  intro: string[];
  whyFromAir: string;
  imageAlt: string;
  /**
   * Hub layout: `intro-first` puts destination intro and search above results and drops the
   * duplicate summary table and bottom booking-card strip (used on editorial hub pages).
   */
  hubLayout?: "default" | "intro-first";
  choose: Array<{ want: string; lookFor: string; filter?: Partial<FlightSearchParams>; href?: string }>;
  departures: Array<{ name: string; note: string }>;
  faqs: Array<{ q: string; a: string }>;
};

export const destinationGuides: Record<string, DestinationGuide> = {
  "grand-canyon": {
    slug: "grand-canyon",
    metaTitle: "Grand Canyon Helicopter Tours (2026) – Compare Prices",
    metaDescription:
      "Compare Grand Canyon helicopter tours from Las Vegas and the South Rim. Explore canyon landings, flight durations, prices and traveler reviews.",
    keywords: [
      "grand canyon helicopter tour",
      "grand canyon helicopter tour from las vegas",
      "west rim helicopter tour",
      "south rim helicopter tour",
      "grand canyon helicopter landing tour",
    ],
    eyebrow: "Grand Canyon · Arizona / Nevada, USA",
    heading: "Grand Canyon Helicopter Tours – Compare Flights & Prices",
    hubH1: "Grand Canyon Helicopter Tours – Compare Flights & Prices",
    hubLayout: "intro-first",
    intro: [
      "Grand Canyon helicopter tours offer two very different experiences: scenic flights departing from Tusayan near the South Rim, and longer trips from Las Vegas to the West Rim, some with a landing inside the canyon.",
      "Compare flights by departure location, actual time in the air, landing options, price and traveler ratings. We show helicopter flight time separately from total trip duration whenever the provider supplies both.",
    ],
    whyFromAir:
      "West Rim vs South Rim is the first fork: Tusayan flights suit national park visitors; Las Vegas departures suit West Rim sightseeing and verified landing tours.",
    imageAlt: "Helicopter flight over the Grand Canyon",
    choose: [
      {
        want: "South Rim scenic flights",
        lookFor: "25–45 minute flights from Tusayan over Grand Canyon National Park — no canyon-floor landings.",
        href: "/grand-canyon/south-rim-helicopter-tours",
      },
      {
        want: "West Rim from Las Vegas",
        lookFor: "Desert crossing, Hoover Dam views and West Rim sightseeing from Las Vegas-area airports.",
        href: "/grand-canyon/helicopter-tours-from-las-vegas",
      },
      {
        want: "A verified canyon landing",
        lookFor: "West Rim tours with a named landing below the rim or on a bluff — not Valley of Fire or unstated locations.",
        href: "/grand-canyon/helicopter-landing-tours",
      },
      {
        want: "Sunset departures",
        lookFor: "Late-afternoon and sunset flights — compare total trip length and flight time separately.",
        href: "/grand-canyon/sunset-helicopter-tours",
      },
      {
        want: "Prices by trip type",
        lookFor: "From-prices grouped by South Rim, West Rim air-only and landing tours.",
        href: "/grand-canyon/helicopter-tour-prices",
      },
    ],
    departures: [
      {
        name: "Las Vegas Strip & Henderson heliports",
        note: "Many Grand Canyon West Rim flights. Many listings include hotel pickup from the Strip.",
      },
      {
        name: "Boulder City, Nevada",
        note: "Some West Rim flights depart Boulder City, around 40–50 minutes’ drive from the Strip — check whether transport is included.",
      },
      {
        name: "Tusayan, Arizona (South Rim)",
        note: "Grand Canyon National Park Airport, minutes from the South Rim entrance. Shorter scenic flights without landings.",
      },
    ],
    faqs: [
      {
        q: "How much does a Grand Canyon helicopter tour cost?",
        a: "Our current comparison includes shorter South Rim sightseeing flights from around $269 per person and West Rim aerial tours from around $409. Landing and sunset packages can cost considerably more. Prices vary by date, operator and inclusions.",
      },
      {
        q: "Is the West Rim or South Rim better for a helicopter tour?",
        a: "The South Rim is often more convenient if you're already visiting Grand Canyon National Park. The West Rim is a popular choice for visitors departing Las Vegas, particularly those interested in landing tours.",
      },
      {
        q: "How long is a Grand Canyon helicopter tour from Las Vegas?",
        a: "Total excursion durations vary. Some listings advertise approximately 2.5–4.5 hours, while packages with additional ground activities may take longer. The actual helicopter flight time is usually much shorter than the total experience.",
      },
      {
        q: "Can helicopters land at the bottom of the Grand Canyon?",
        a: "Selected West Rim tours offer landings below the rim. Standard South Rim sightseeing flights over Grand Canyon National Park do not include canyon-floor landings. Confirm the specific landing location before booking.",
      },
      {
        q: "Do Grand Canyon helicopter tours include hotel pickup?",
        a: "Some Las Vegas-area packages include hotel transfers, while others require you to travel independently to the departure airport. Check each listing's transportation inclusions.",
      },
      {
        q: "Can you fly over the Grand Canyon without landing?",
        a: "Yes. Both South Rim and West Rim operators offer air-only sightseeing flights.",
      },
      {
        q: "Is a 25-minute Grand Canyon helicopter flight worth it?",
        a: "A 25-minute flight from Tusayan can provide a memorable overview of the canyon without requiring a lengthy excursion. Longer flights may cover additional areas, but the route matters as much as duration.",
      },
      {
        q: "Are Grand Canyon helicopter flights cancelled because of weather?",
        a: "Yes. Wind, visibility and other operational conditions can affect flights. Check the provider's cancellation and rescheduling policy before booking.",
      },
    ],
  },
  "las-vegas": {
    slug: "las-vegas",
    metaTitle: "Las Vegas Helicopter Tours (2026) – Strip & Night Flights",
    metaDescription:
      "Compare Las Vegas helicopter tours from $99. Explore night flights over the Strip, Red Rock Canyon, Hoover Dam and scenic landing experiences.",
    keywords: [
      "las vegas helicopter tour",
      "las vegas strip helicopter ride",
      "las vegas helicopter night tour",
      "red rock canyon helicopter tour",
      "cheap helicopter ride las vegas",
    ],
    eyebrow: "Las Vegas · Nevada, USA",
    heading: "Las Vegas Helicopter Tours – Compare Flights & Prices",
    hubH1: "Las Vegas Helicopter Tours – Compare Flights & Prices",
    hubLayout: "intro-first",
    intro: [
      "Las Vegas helicopter tours range from short nighttime flights over the illuminated Strip to longer scenic routes above Red Rock Canyon, Hoover Dam and the surrounding desert. Some experiences include a landing, while others focus entirely on sightseeing from the air.",
      "Compare helicopter flights by route, actual flying time, landing options, price and traveler ratings. We show flight time separately from total trip duration whenever the provider lists both.",
    ],
    whyFromAir:
      "Strip night flights vs desert scenic routes are the main fork — city lights from above, or Red Rock and Hoover Dam landscapes a short flight away.",
    imageAlt: "Helicopter flight over the Las Vegas Strip",
    choose: [
      {
        want: "The Strip at night",
        lookFor: "Short night flights over the illuminated Strip — often the most affordable helicopter experience in Las Vegas.",
        href: "/las-vegas/strip-helicopter-tours",
      },
      {
        want: "After-dark experiences",
        lookFor: "All night flights compared by flight time, shared or private cabin and price.",
        href: "/las-vegas/night-helicopter-tours",
      },
      {
        want: "Red Rock Canyon scenery",
        lookFor: "Air-only and landing tours west of the Strip, including sunset and Champagne packages.",
        href: "/las-vegas/red-rock-canyon-helicopter-tours",
      },
      {
        want: "Desert landing tours",
        lookFor: "Flights with time outside the helicopter at Red Rock, Valley of Fire or similar locations.",
        filter: { experience: "landing" },
      },
      {
        want: "The Grand Canyon instead",
        lookFor: "West Rim helicopter excursions from Las Vegas — a separate, longer comparison.",
        href: "/grand-canyon/helicopter-tours-from-las-vegas",
      },
    ],
    departures: [
      {
        name: "Las Vegas Strip heliports",
        note: "Many short Strip sightseeing flights operate from terminals near the southern Strip. Exact addresses vary by operator.",
      },
      {
        name: "Henderson and other area airports",
        note: "Some scenic tours depart from other Las Vegas-area facilities — factor travel time and transfers.",
      },
      {
        name: "Hotel pickup",
        note: "Included on some listings; optional or not offered on others. Check before booking.",
      },
    ],
    faqs: [
      {
        q: "How much is a helicopter ride in Las Vegas?",
        a: "Our current comparison includes Strip night flights from around $99 per person. Red Rock Canyon tours start higher, and Grand Canyon excursions from Las Vegas are priced separately on our Grand Canyon pages.",
      },
      {
        q: "How long is a Las Vegas Strip helicopter ride?",
        a: "Many Strip flights advertise approximately 10 minutes in the air. Total activity time including check-in is often longer.",
      },
      {
        q: "Is a Las Vegas Strip helicopter tour worth it?",
        a: "For many visitors, a short night flight over the Strip is a memorable and relatively affordable aerial experience. Longer desert routes suit travelers who want more time in the air.",
      },
      {
        q: "Is it better to fly the Strip at night or during the day?",
        a: "Night is popular for the illuminated Strip. Daytime and sunset routes toward Red Rock Canyon, Hoover Dam and Valley of Fire suit desert scenery and photography.",
      },
      {
        q: "Can I see the Grand Canyon on a Las Vegas helicopter tour?",
        a: "Only on a dedicated Grand Canyon flight, not on standard Strip or Red Rock sightseeing tours. Compare West Rim tours on our Grand Canyon section.",
      },
      {
        q: "Do Las Vegas helicopter tours include hotel pickup?",
        a: "Some listings include transportation from selected hotels; others require you to reach the heliport independently.",
      },
      {
        q: "Are Las Vegas helicopter flights cancelled because of weather?",
        a: "Yes. Wind, visibility and other conditions can affect operations. Check the provider's rescheduling policy before booking.",
      },
    ],
  },
  "new-york": {
    slug: "new-york",
    metaTitle: "New York City Helicopter Tours – Compare Flights & Prices",
    metaDescription:
      "Compare New York City helicopter tours by price, duration, route and departure location. Explore Manhattan skyline flights, private tours and more.",
    keywords: [
      "new york helicopter tour",
      "nyc helicopter tour",
      "manhattan helicopter tour",
      "statue of liberty helicopter tour",
      "nyc helicopter tour at night",
      "private helicopter tour nyc",
    ],
    eyebrow: "New York City · USA",
    heading: "New York City Helicopter Tours – Compare Flights & Prices",
    hubH1: "New York City Helicopter Tours – Compare Flights & Prices",
    hubLayout: "intro-first",
    intro: [
      "See Manhattan from above, from the Statue of Liberty and Brooklyn Bridge to Central Park and the Empire State Building. New York helicopter tours range from short 12–15 minute skyline flights to longer routes that cover more of Manhattan and the surrounding area.",
      "Compare helicopter flights by duration, route, departure location, price and traveler ratings. Some flights depart from Manhattan, while others leave from New Jersey — an important difference when comparing prices and travel time.",
    ],
    whyFromAir:
      "Manhattan vs New Jersey departure is often the most practical booking decision: similar-looking listings can involve very different ground travel, fees and schedules.",
    imageAlt: "Helicopter flying past the Manhattan skyline",
    choose: [
      {
        want: "Manhattan convenience",
        lookFor: "Flights that depart Downtown Manhattan — verify the heliport address on the listing.",
        filter: { duration: "short", sort: "recommended" },
      },
      {
        want: "Night or sunset skyline",
        lookFor: "After-dark and golden-hour flights — many depart New Jersey; compare travel time too.",
        href: "/new-york/night-helicopter-tours",
      },
      {
        want: "New Jersey departures only",
        lookFor: "Side-by-side comparison of Linden, Kearny and other NJ heliports vs Manhattan tours.",
        href: "/new-york/helicopter-tours-from-new-jersey",
      },
      {
        want: "Prices by flight time",
        lookFor: "From-prices grouped by minutes in the air, with heliport fees called out where listed.",
        href: "/new-york/helicopter-tour-prices",
      },
      {
        want: "A private charter",
        lookFor: "Exclusive aircraft for your group — priced per flight, not per seat on shared tours.",
        href: "/new-york/private-helicopter-tours",
      },
    ],
    departures: [
      {
        name: "Downtown Manhattan Heliport",
        note: "Many Manhattan sightseeing tours use this East River heliport near the Financial District. Schedules, fees and day-of-week rules vary by operator — confirm on your chosen listing.",
      },
      {
        name: "New Jersey heliports",
        note: "Includes departures in areas such as Linden and Kearny. Factor ground transport from Manhattan and verify the meeting address before booking.",
      },
    ],
    faqs: [
      {
        q: "How long is a New York City helicopter tour?",
        a: "Many sightseeing flights last approximately 12–30 minutes in the air. Some extended or specialty flights last longer. Check-in and transportation are separate from flying time.",
      },
      {
        q: "How much does a New York helicopter tour cost?",
        a: "Our current comparison includes shared sightseeing flights advertised from around $265–$269 per person, with longer routes and private charters costing considerably more. Additional heliport or facility fees may apply.",
      },
      {
        q: "Is a 15-minute New York helicopter tour worth it?",
        a: "A 15-minute flight can be worthwhile if you mainly want aerial views of the Statue of Liberty and Lower Manhattan. Consider a longer route if seeing more of Midtown or Upper Manhattan matters to you.",
      },
      {
        q: "Where do New York City helicopter tours depart from?",
        a: "Depending on the operator, sightseeing flights may depart from Downtown Manhattan or New Jersey heliports such as Linden and Kearny. Always verify the departure address on the booking page.",
      },
      {
        q: "Can you take a helicopter tour in New York on a Sunday?",
        a: "Sunday availability depends on the departure heliport and operator. Some Manhattan and New Jersey schedules differ — check the current timetable for your chosen flight rather than assuming daily departures.",
      },
      {
        q: "Can you fly over Central Park?",
        a: "Some longer sightseeing routes provide views toward Central Park, but not every helicopter tour travels far enough north. The published route is the best way to confirm expected landmarks.",
      },
      {
        q: "Are New York helicopter tours safe?",
        a: "Commercial sightseeing flights are subject to aviation safety regulations. Standards, aircraft, operators and weather conditions vary. Review the operator's credentials and follow all safety instructions.",
      },
      {
        q: "Can helicopter tours be cancelled because of weather?",
        a: "Yes. Poor visibility, strong winds and other operational conditions may cause delays or cancellations. Check the provider's rescheduling and refund policy before booking.",
      },
    ],
  },
  dubai: {
    slug: "dubai",
    metaTitle: "Dubai Helicopter Tours (2026) – Compare Flights & Prices",
    metaDescription:
      "Compare Dubai helicopter tours by duration, route and price. Explore 12–25 minute flights, Palm Jumeirah, Burj Al Arab and private options.",
    keywords: [
      "dubai helicopter tour",
      "helicopter ride dubai",
      "dubai helicopter tour price",
      "private helicopter tour dubai",
      "palm jumeirah helicopter tour",
      "burj khalifa helicopter tour",
    ],
    eyebrow: "Dubai · United Arab Emirates",
    heading: "Dubai Helicopter Tours – Compare Flights & Prices",
    hubH1: "Dubai Helicopter Tours – Compare Flights & Prices",
    hubLayout: "intro-first",
    intro: [
      "Dubai helicopter tours range from short 12-minute sightseeing flights over the coastline to longer 22–25-minute routes that may include Downtown Dubai and the Burj Khalifa. The biggest difference is how many landmarks your flight covers — not simply which helicopter company you choose.",
      "Compare flights by duration, sightseeing route, price, traveler ratings and hotel transfer options. We show actual flight time separately from total experience length whenever the provider supplies both.",
    ],
    whyFromAir:
      "Flight length drives what you see: 12-minute coastal circuits vs 22–25-minute routes that may reach Downtown — compare routes, not just prices.",
    imageAlt: "Helicopter view over Dubai’s skyline",
    choose: [
      {
        want: "Lowest-price sightseeing",
        lookFor: "12–15 minute shared flights — often the cheapest way to see the Palm and coastline.",
        filter: { duration: "12-15", sort: "price-asc" },
      },
      {
        want: "12 vs 25 minutes",
        lookFor: "Side-by-side comparison of short coastal flights and extended routes with live step-up prices.",
        href: "/dubai/12-vs-25-minute-helicopter-tours",
      },
      {
        want: "Confirmed Palm Jumeirah routes",
        lookFor: "Only flights whose published route names Palm Jumeirah — not every Dubai tour qualifies.",
        href: "/dubai/palm-jumeirah-helicopter-tours",
      },
      {
        want: "Prices by flight time",
        lookFor: "From-prices grouped by 12, 15, 22 and 25-minute options where listed.",
        href: "/dubai/helicopter-tour-prices",
      },
      {
        want: "Extended city coverage",
        lookFor: "21–30 minute flights — verify Burj Khalifa and Downtown on the route description.",
        filter: { duration: "21-30" },
      },
    ],
    departures: [
      {
        name: "Atlantis / Palm Jumeirah area",
        note: "Some products depart from Atlantis Dubai or nearby helipads — convenient for Palm stays; confirm the exact address.",
      },
      {
        name: "Other Dubai helipads",
        note: "Operators use different facilities across the city. Factor travel time from your hotel.",
      },
      {
        name: "Hotel transfers",
        note: "Optional on many listings — private transfers are not the same as a private helicopter.",
      },
    ],
    faqs: [
      {
        q: "How much does a helicopter tour in Dubai cost?",
        a: "Our current comparison includes shared sightseeing flights advertised from around $198 per person. Longer and private flights can cost substantially more.",
      },
      {
        q: "How long is a Dubai helicopter tour?",
        a: "Many sightseeing flights last approximately 12–25 minutes in the air. Total experience time may be longer because of check-in and transfers.",
      },
      {
        q: "Is a 12-minute Dubai helicopter ride worth it?",
        a: "A 12-minute flight can be worthwhile for Palm Jumeirah and coastal landmarks. Choose a longer route if you want additional sightseeing coverage.",
      },
      {
        q: "Can you see Burj Khalifa on a Dubai helicopter tour?",
        a: "Some extended routes include views toward Downtown Dubai and Burj Khalifa. Not every short coastal flight includes this landmark — check the specific route.",
      },
      {
        q: "Where do Dubai helicopter tours depart from?",
        a: "Departure locations vary by operator, including Atlantis Dubai and other helipads. Your booking confirmation should identify the meeting point.",
      },
      {
        q: "Are hotel transfers included in Dubai helicopter tours?",
        a: "Some packages include transfers; others offer them as an optional extra. Check the selected booking option.",
      },
      {
        q: "Can you book a private helicopter tour in Dubai?",
        a: "Yes, although private experiences generally cost more than shared flights. Confirm whether the price is per passenger or for the aircraft.",
      },
      {
        q: "Do you need identification for a Dubai helicopter flight?",
        a: "Operators commonly require valid identification. Follow the requirements on your booking confirmation.",
      },
      {
        q: "Can Dubai helicopter tours be cancelled because of weather?",
        a: "Yes. Poor visibility, wind or other conditions can cause delays or cancellations. Review the operator's refund and rescheduling policy before booking.",
      },
    ],
  },
  "cape-town": {
    slug: "cape-town",
    metaTitle: "Cape Town Helicopter Tours (2026) – Compare Prices",
    metaDescription:
      "Compare Cape Town helicopter tours by route, flight time and price. Table Mountain, Atlantic Coast, Two Oceans and Cape Point flights from the V&A Waterfront.",
    keywords: [
      "cape town helicopter tour",
      "helicopter flip cape town",
      "cape point helicopter tour",
      "table mountain helicopter tour",
      "two oceans helicopter tour",
      "v&a waterfront helicopter",
    ],
    eyebrow: "Cape Town · South Africa",
    heading: "Cape Town Helicopter Tours – Compare Flights & Prices",
    hubH1: "Cape Town Helicopter Tours – Compare Flights & Prices",
    hubLayout: "intro-first",
    intro: [
      "Cape Town helicopter tours range from short 12–15-minute flights around the city and Table Mountain to longer coastal routes over Camps Bay, Hout Bay and the Cape Peninsula. Extended 45–50-minute flights can reach Cape Point and the Cape of Good Hope.",
      "Compare flights by route, actual time in the air, price and traveler ratings. We show flight duration separately from total experience length whenever the provider states both.",
    ],
    whyFromAir:
      "Route length matters more than operator name: city hops, Atlantic Coast, Two Oceans and Cape Point flights cover very different distances — compare minutes in the air and the published route.",
    imageAlt: "Helicopter view of Table Mountain and the Cape Town coastline",
    choose: [
      {
        want: "Lowest-price city flight",
        lookFor: "Under-20-minute City Hopper–style flights over Table Mountain and the nearby coast.",
        filter: { duration: "under-20", sort: "price-asc" },
      },
      {
        want: "Two Oceans route",
        lookFor: "Peninsula flights that cross toward False Bay — compare live prices and flight times.",
        href: "/cape-town/two-oceans-helicopter-tours",
      },
      {
        want: "Cape Point coverage",
        lookFor: "Extended 45–50-minute routes toward Cape Point and the Cape of Good Hope.",
        href: "/cape-town/cape-point-helicopter-tours",
        filter: { duration: "over-30" },
      },
      {
        want: "Atlantic Coast (Camps Bay & Hout Bay)",
        lookFor: "Coastal flights that stay on the Atlantic seaboard without a full peninsula crossing.",
        href: "/cape-town/atlantic-coast-helicopter-tours",
      },
      {
        want: "Prices by route",
        lookFor: "From-prices grouped by city, Atlantic Coast, Two Oceans and Cape Point routes.",
        href: "/cape-town/helicopter-tour-prices",
      },
    ],
    departures: [
      {
        name: "V&A Waterfront",
        note: "Most sightseeing flights depart from helipads near the V&A Waterfront. Confirm the exact terminal and check-in time on your booking.",
      },
      {
        name: "Hotel pickup",
        note: "Some packages include transfers; others require you to reach the helipad independently.",
      },
    ],
    faqs: [
      {
        q: "How much does a helicopter tour in Cape Town cost?",
        a: "Our current comparison includes short city sightseeing flights advertised from around $165 per person. Longer Two Oceans and Cape Point experiences generally cost more.",
      },
      {
        q: "How long is a Cape Town helicopter tour?",
        a: "Cape Town sightseeing flights commonly range from approximately 12 minutes for short city routes to around 45–50 minutes for extended peninsula experiences. Total activity time may be longer.",
      },
      {
        q: "Is a 12-minute Cape Town helicopter ride worth it?",
        a: "A 12-minute flight can be worthwhile if your main goal is seeing the city, Table Mountain and nearby coastline from above. Consider a longer flight if you want more of the Cape Peninsula.",
      },
      {
        q: "What is a Two Oceans helicopter tour?",
        a: "A Two Oceans helicopter tour is a longer Cape Town sightseeing route exploring more of the peninsula than a short city flight. The exact route varies by operator.",
      },
      {
        q: "Can you see Table Mountain from a helicopter?",
        a: "Many Cape Town sightseeing routes offer views of Table Mountain, although visibility depends on weather and the flight path.",
      },
      {
        q: "Can you fly to Cape Point by helicopter?",
        a: "Yes. Selected extended sightseeing flights travel toward Cape Point and the Cape of Good Hope. Check whether the tour is aerial sightseeing only or includes any landing.",
      },
      {
        q: "Where do Cape Town helicopter tours depart from?",
        a: "Many depart from helipads near the V&A Waterfront. Confirm the exact departure terminal and check-in instructions on the booking page.",
      },
      {
        q: "Are doors-off helicopter flights available in Cape Town?",
        a: "Some listings advertise doors-off experiences. Availability and aircraft configuration must be confirmed with the operator before booking.",
      },
      {
        q: "Can Cape Town helicopter tours be cancelled because of weather?",
        a: "Yes. Wind, cloud and poor visibility can affect operations. Check the provider's refund and rescheduling policy before booking.",
      },
    ],
  },
  "victoria-falls": {
    slug: "victoria-falls",
    metaTitle: "Victoria Falls Helicopter Tours (2026) – Compare Prices",
    metaDescription:
      "Compare Victoria Falls helicopter tours, from 12–15 minute scenic flights to longer Zambezi routes. Explore prices, reviews, departure points and flight options.",
    keywords: [
      "victoria falls helicopter tour",
      "victoria falls helicopter flight",
      "flight of the angels victoria falls",
      "victoria falls helicopter price",
      "livingstone helicopter flight",
      "zambezi helicopter flight",
    ],
    eyebrow: "Victoria Falls · Zimbabwe / Zambia",
    heading: "Victoria Falls Helicopter Tours – Compare Flights & Prices",
    hubH1: "Victoria Falls Helicopter Tours – Compare Flights & Prices",
    hubLayout: "intro-first",
    intro: [
      "The biggest decision isn’t which helicopter company to book — it’s how much flying time you want. Most Victoria Falls sightseeing flights are either a short 12–15 minute circuit over the waterfall or a longer 22–30 minute route that explores more of the Batoka Gorge and the Zambezi River.",
      "Use the comparison below to filter by duration, price and ratings. We show flight time in the air separately from total trip length whenever the listing states both.",
    ],
    whyFromAir:
      "From the ground, spray and the gorge walls hide most of the falls. From the air you see the full width of the curtain of water and the zig-zag gorges below it.",
    imageAlt: "Helicopter view over Victoria Falls and the Zambezi gorges",
    choose: [
      {
        want: "The falls on a budget",
        lookFor: "12–15 minute flights — often sold as ‘Flight of the Angels’.",
        filter: { duration: "short", sort: "price-asc" },
      },
      {
        want: "Gorges and upstream river",
        lookFor: "Flights of around 22–30 minutes over the Batoka Gorge and Zambezi National Park.",
        filter: { duration: "medium", sort: "price-asc" },
      },
      {
        want: "To compare prices and fees",
        lookFor: "Our prices page groups flights by length and flags park and fuel fees many operators charge at check-in.",
        href: "/victoria-falls/helicopter-tour-prices",
      },
    ],
    departures: [
      {
        name: "Victoria Falls, Zimbabwe",
        note: "Many tours depart from helipads near Victoria Falls town. This is usually the most convenient choice if you’re staying in Zimbabwe.",
      },
      {
        name: "Livingstone, Zambia",
        note: "Helicopter sightseeing is also available from the Zambian side. If you’re staying in Zambia, look for local departures rather than crossing into Zimbabwe. Our currently compared inventory primarily features Zimbabwe departures.",
      },
    ],
    faqs: [
      {
        q: "How long is a Victoria Falls helicopter flight?",
        a: "Most standard scenic flights last approximately 12–15 minutes in the air. Longer sightseeing options commonly last around 22–30 minutes. The total activity, including check-in and transfers, can take considerably longer.",
      },
      {
        q: "Is the 25-minute Victoria Falls helicopter flight worth it?",
        a: "It can be worth the extra cost if you want to explore more of the Batoka Gorge and Zambezi River. If your priority is simply seeing Victoria Falls from above, the shorter flight may offer better value.",
      },
      {
        q: "How much does a helicopter flight over Victoria Falls cost?",
        a: "Our compared Viator listings include short flights advertised from around $170 per person and longer options around $328–$340. Some operators charge additional park or fuel fees at check-in, so check the final booking total.",
      },
      {
        q: "Is it better to fly from Zimbabwe or Zambia?",
        a: "Both countries offer aerial sightseeing over Victoria Falls. The more convenient departure generally depends on where you’re staying, the available flights and whether crossing the border would be necessary.",
      },
      {
        q: "Are government or park fees included?",
        a: "Not always. Some operators collect additional fees separately at check-in. Check the individual listing’s inclusions and exclusions before booking.",
      },
      {
        q: "Can I get a window seat?",
        a: "Some operators advertise window seating or window-seat guarantees. Check the aircraft and seating policy for the specific flight rather than assuming every booking includes one.",
      },
      {
        q: "Can helicopter flights be cancelled because of weather?",
        a: "Yes. Poor visibility, wind and other weather conditions can affect operations. Check the provider’s cancellation and rescheduling policy before booking.",
      },
    ],
  },
};

export function getDestinationGuide(slug: string): DestinationGuide | undefined {
  return destinationGuides[slug];
}
