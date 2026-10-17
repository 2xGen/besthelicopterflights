import Link from "next/link";
import {
  LAS_VEGAS_DEPARTURE,
  SOUTH_RIM_DEPARTURE,
} from "@/data/destination-categories";
import type { Flight } from "@/data/flights";
import { isVerifiedGrandCanyonLanding } from "@/lib/grand-canyon-landings";

type Props = {
  flights: Flight[];
};

function money(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function minPrice(list: Flight[]): number | null {
  const prices = list.map((f) => f.priceFrom).filter((p): p is number => p != null);
  return prices.length ? Math.min(...prices) : null;
}

export function GrandCanyonHubGuide({ flights }: Props) {
  const south = flights.filter((f) => f.departure === SOUTH_RIM_DEPARTURE);
  const vegasAir = flights.filter(
    (f) => f.departure === LAS_VEGAS_DEPARTURE && !isVerifiedGrandCanyonLanding(f),
  );
  const southFrom = minPrice(south) ?? 269;
  const vegasFrom = minPrice(vegasAir) ?? 409;

  const timeRows = flights
    .filter((f) => f.durationMinutes != null || f.experienceLabel)
    .slice(0, 6);

  const priceExamples: Array<{ label: string; price: number | null }> = [
    {
      label: "North Canyon scenic flight, 25–30 min",
      price: minPrice(
        south.filter((f) => (f.durationMinutes ?? 0) >= 25 && (f.durationMinutes ?? 0) <= 30),
      ),
    },
    {
      label: "South Rim scenic flight, 25 min",
      price: minPrice(south.filter((f) => (f.durationMinutes ?? 0) <= 27)),
    },
    {
      label: "South Rim scenic flight, 45 min",
      price: minPrice(south.filter((f) => (f.durationMinutes ?? 0) >= 40)),
    },
    {
      label: "West Rim aerial sightseeing tour",
      price: minPrice(vegasAir.filter((f) => f.kind !== "landing")),
    },
    {
      label: "West Rim tour with Champagne toast",
      price: minPrice(
        flights.filter(
          (f) =>
            f.departure === LAS_VEGAS_DEPARTURE &&
            /champagne/i.test(f.title) &&
            isVerifiedGrandCanyonLanding(f),
        ),
      ),
    },
    {
      label: "Deluxe canyon landing tour from Las Vegas",
      price: minPrice(flights.filter(isVerifiedGrandCanyonLanding)),
    },
    {
      label: "Sunset Grand Canyon tour from Las Vegas",
      price: minPrice(flights.filter((f) => f.sunset === true)),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <section id="which-tour" className="scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Which Grand Canyon helicopter tour should you choose?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
          The most important decision is whether you want to fly over the South Rim or visit the West
          Rim from Las Vegas. These are different experiences, with different departure airports,
          flight durations, prices and landing opportunities.
        </p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone">
          If you&apos;re already visiting Grand Canyon National Park, a scenic flight from Tusayan
          is often the simplest option. If you&apos;re staying in Las Vegas, a West Rim tour can
          combine a helicopter journey across the desert with views of the canyon, and some packages
          include a landing.
        </p>

        <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
          South Rim vs West Rim: what&apos;s the difference?
        </h3>
        <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
              <tr>
                <th className="px-4 py-3 font-semibold" />
                <th className="px-4 py-3 font-semibold">South Rim helicopter tours</th>
                <th className="px-4 py-3 font-semibold">West Rim helicopter tours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/8 bg-white text-navy">
              {[
                ["Typical departure", "Tusayan, Arizona", "Las Vegas area, Nevada"],
                [
                  "Main experience",
                  "Scenic flights over Grand Canyon National Park",
                  "Desert flight and West Rim sightseeing",
                ],
                ["Flight duration", "Commonly 25–50 minutes", "Varies; some return flights ~90 min"],
                [
                  "Canyon landing",
                  "Not on standard national park sightseeing flights",
                  "Available on selected tours",
                ],
                [
                  "Best for",
                  "Visitors already exploring the national park",
                  "Travelers staying in Las Vegas",
                ],
                ["Example from-price", money(southFrom), money(vegasFrom)],
              ].map(([label, a, b]) => (
                <tr key={label}>
                  <th className="px-4 py-3 font-semibold text-stone">{label}</th>
                  <td className="px-4 py-3">{a}</td>
                  <td className="px-4 py-3">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-stone-light">
          Prices are examples from our compared Viator listings, not fixed rates. Routes, transfers
          and inclusions vary by operator.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          <span className="font-semibold text-navy">Our recommendation:</span> Choose the South Rim
          if you&apos;re already visiting Grand Canyon National Park and want a scenic helicopter
          experience without a lengthy excursion. Choose the West Rim from Las Vegas if convenience
          from the city or a canyon landing is your priority.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          <li>
            <Link
              href="/grand-canyon/south-rim-helicopter-tours"
              className="inline-block rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal-bright"
            >
              Compare South Rim helicopter tours →
            </Link>
          </li>
          <li>
            <Link
              href="/grand-canyon/helicopter-tours-from-las-vegas"
              className="inline-block rounded-full border border-navy/15 px-4 py-2 text-sm font-semibold text-teal hover:bg-mist-soft"
            >
              Compare flights from Las Vegas →
            </Link>
          </li>
        </ul>
      </section>

      <section id="how-long" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          How long is a Grand Canyon helicopter tour?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Grand Canyon tours vary considerably in duration because some begin close to the canyon,
          while others start in Las Vegas. A 25-minute flight from Tusayan is a short scenic
          experience. A West Rim tour departing Las Vegas can involve a much longer helicopter
          journey, and some packages add ground activities, hotel transfers or a canyon landing.
        </p>

        <h3 className="mt-8 font-display text-xl text-navy">Flight time vs total experience</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          The total activity duration isn&apos;t necessarily the amount of time you spend flying.
        </p>
        {timeRows.length > 0 ? (
          <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
                <tr>
                  <th className="px-4 py-3 font-semibold">Example listing</th>
                  <th className="px-4 py-3 font-semibold">Time in the air</th>
                  <th className="px-4 py-3 font-semibold">Listed total experience</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/8 bg-white">
                {timeRows.map((f) => (
                  <tr key={f.id}>
                    <td className="max-w-[280px] px-4 py-3 font-medium text-navy">{f.title}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-navy">
                      {f.durationMinutes != null ? f.durationLabel : "Not stated"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-navy">
                      {f.experienceLabel ?? "Not stated"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <p className="mt-3 text-sm text-stone">
          The listed total experience may include transfers, check-in, ground activities and other
          elements. Always confirm the actual helicopter flight time and itinerary before booking.
        </p>
      </section>

      <section id="prices-guide" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          How much do Grand Canyon helicopter tours cost?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Prices depend on departure location, flight duration, landing options and included
          activities. Our current Viator comparison includes the following examples:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
              <tr>
                <th className="px-4 py-3 font-semibold">Experience</th>
                <th className="px-4 py-3 font-semibold text-right">Example advertised from-price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/8 bg-white">
              {priceExamples.map((row) => (
                <tr key={row.label}>
                  <td className="px-4 py-3 text-navy">{row.label}</td>
                  <td className="px-4 py-3 text-right font-medium text-navy">
                    {row.price != null ? money(row.price) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-stone-light">
          These are starting prices for specific listings, not guaranteed prices for all tours of
          that type.
        </p>
        <h3 className="mt-8 font-display text-lg text-navy">
          Why are some Grand Canyon helicopter tours more expensive?
        </h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-stone">
          <li>A landing and time spent on the ground.</li>
          <li>Longer helicopter flight time.</li>
          <li>Hotel transfers and transportation arrangements.</li>
          <li>Optional Skywalk, Hummer or other sightseeing activities.</li>
          <li>Sunset departure times or special packages.</li>
          <li>Different booking inclusions and additional fees.</li>
        </ul>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          <span className="font-semibold text-navy">Our recommendation:</span> Compare the actual
          itinerary rather than choosing only by advertised price.
        </p>
        <Link
          href="/grand-canyon/helicopter-tour-prices"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare Grand Canyon helicopter tour prices →
        </Link>
      </section>

      <section id="landings" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Can you land inside the Grand Canyon?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Yes, selected West Rim helicopter tours offer landings within the canyon area. These
          experiences differ from standard scenic flights, which remain airborne throughout the
          sightseeing route.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">West Rim helicopter landing tours</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Some West Rim packages include a landing below the rim or on a bluff, with time outside
          the helicopter. Check exactly where the landing takes place, how long you&apos;re on the
          ground and what is included in the booking price.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">South Rim helicopter flights</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Standard sightseeing flights operating over Grand Canyon National Park do not include
          landings on the canyon floor. If landing inside the canyon is essential, focus on verified
          West Rim landing tours rather than standard South Rim sightseeing flights.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone">
          <span className="font-semibold text-navy">Important:</span> A tour described as including
          a landing may stop outside the canyon itself (for example at Valley of Fire). We only
          list verified canyon-area landings on our landing tours page.
        </p>
        <Link
          href="/grand-canyon/helicopter-landing-tours"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare Grand Canyon helicopter landing tours →
        </Link>
      </section>

      <section id="what-you-see" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          What will you see from a Grand Canyon helicopter?
        </h2>
        <h3 className="mt-6 font-display text-lg text-navy">Grand Canyon South Rim and North Canyon</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Flights departing Tusayan offer aerial views of Grand Canyon National Park and its vast
          system of cliffs, ridges and side canyons.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Grand Canyon West Rim</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          West Rim flights offer a different perspective, often as part of a longer journey from Las
          Vegas.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Hoover Dam and Lake Mead</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Many routes from the Las Vegas area travel near Hoover Dam and Lake Mead. Coverage depends
          on the operator&apos;s published route.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Colorado River</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Certain routes provide views of the Colorado River between steep canyon walls. Check the
          advertised sightseeing route if this is a priority.
        </p>
      </section>

      <section id="departures" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Where do Grand Canyon helicopter tours depart?
        </h2>
        <h3 className="mt-6 font-display text-lg text-navy">Tusayan, Arizona — South Rim</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Scenic helicopter flights commonly depart from Grand Canyon National Park Airport, near the
          South Rim entrance.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Las Vegas and Henderson, Nevada</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Many West Rim tours depart from airports or heliports in the Las Vegas area. Some packages
          include hotel transfers; others require independent transportation.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Boulder City, Nevada</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Some West Rim tours operate from Boulder City. Confirm whether transfers are included and
          allow sufficient time for check-in.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          <span className="font-semibold text-navy">Our recommendation:</span> Check the exact
          departure airport before comparing prices.
        </p>
      </section>

      <section id="landing-worth-it" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Is a Grand Canyon helicopter landing worth it?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          A landing tour can be worthwhile if you want more than aerial sightseeing. Landing packages
          are generally more expensive, and a landing does not necessarily mean more flight time.
        </p>
      </section>

      <section id="sunset" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Are sunset Grand Canyon helicopter tours worth it?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Sunset flights can provide dramatic lighting, but timing, route direction and weather
          affect what you see. A sunset tour may cost more than a comparable daytime experience.
        </p>
        <Link
          href="/grand-canyon/sunset-helicopter-tours"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare Grand Canyon sunset helicopter tours →
        </Link>
      </section>

      <section id="when-to-fly" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          When is the best time to take a Grand Canyon helicopter tour?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Spring and autumn often bring moderate temperatures; summer offers long daylight but heat
          and storms; winter can bring snow at the South Rim. Allow flexibility in case weather
          affects your booking.
        </p>
      </section>

      <section id="before-booking" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">What to check before booking</h2>
        <ol className="mt-4 max-w-3xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-stone">
          <li>West Rim or South Rim — visit the part of the canyon you actually want to see.</li>
          <li>Departure airport — Tusayan, Las Vegas, Henderson or Boulder City.</li>
          <li>Actual flight time — a four-hour excursion is not four hours in the helicopter.</li>
          <li>Landing location — below the rim, elsewhere in the canyon area, or outside the canyon.</li>
          <li>Hotel transfers — included or not.</li>
          <li>Additional charges — fees, taxes and optional activities.</li>
          <li>Passenger requirements — weight, seating and ID.</li>
          <li>Cancellation policy — weather-related rescheduling terms.</li>
        </ol>
      </section>

      <section id="compare-cta" className="mt-14 scroll-mt-28 rounded-xl bg-navy-deep px-6 py-8 text-white md:px-10">
        <h2 className="font-display text-2xl md:text-3xl">Compare Grand Canyon helicopter tours</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
          Use the flight listings above to compare departure locations, actual flight durations,
          landing options, prices and traveler ratings. Add up to three flights to your comparison
          before checking availability with the booking provider.
        </p>
        <p className="mt-4 text-xs text-white/50">
          Best Helicopter Flights is an independent comparison platform. Bookings are completed
          through Viator or the tour provider, and we may earn a commission at no additional cost to
          you.
        </p>
        <a
          href="#results"
          className="mt-6 inline-block rounded-sm bg-teal px-5 py-3 text-sm font-semibold text-white hover:bg-teal-bright"
        >
          Back to Grand Canyon helicopter flights →
        </a>
      </section>
    </div>
  );
}
