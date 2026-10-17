import Link from "next/link";
import { NEW_JERSEY_DEPARTURE } from "@/data/destination-categories";
import type { Flight } from "@/data/flights";

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

function isSpecialtyExperience(f: Flight): boolean {
  const text = `${f.title} ${f.operator}`;
  return (
    /foliage|fall colors|autumn|hudson valley|upstate new york|seasonal/i.test(text) ||
    ((f.priceFrom ?? 0) >= 2_500 && /charter|private|romantic|proposal/i.test(text))
  );
}

function coreSkylineFlights(flights: Flight[]): Flight[] {
  return flights.filter((f) => !isSpecialtyExperience(f));
}

function durationBucket(
  flights: Flight[],
  min: number,
  max: number,
  extra?: (f: Flight) => boolean,
): Flight[] {
  return flights.filter(
    (f) =>
      f.durationMinutes != null &&
      f.durationMinutes >= min &&
      f.durationMinutes <= max &&
      (extra ? extra(f) : true),
  );
}

function cheapestIn(
  flights: Flight[],
  predicate: (f: Flight) => boolean,
): number | null {
  return minPrice(flights.filter(predicate));
}

export function NewYorkHubGuide({ flights }: Props) {
  const core = coreSkylineFlights(flights);
  const short = durationBucket(core, 12, 15);
  const extended = durationBucket(core, 17, 20);
  const longer = durationBucket(core, 25, 30);
  const shortFrom = minPrice(short) ?? 269;
  const extendedFrom = minPrice(extended) ?? 309;
  const longerFrom = minPrice(longer) ?? 330;

  const manhattan = (f: Flight) => f.departure != null && f.departure !== NEW_JERSEY_DEPARTURE;
  const newJersey = (f: Flight) => f.departure === NEW_JERSEY_DEPARTURE;
  const nightOrSunset = (f: Flight) =>
    f.kind === "night" || /sunset|twilight|night/i.test(f.title);

  const priceRows: Array<{ label: string; price: number | null }> = [
    {
      label: "12–15-minute Manhattan sightseeing",
      price: cheapestIn(core, (f) => manhattan(f) && (f.durationMinutes ?? 0) <= 15),
    },
    {
      label: "17–20-minute Manhattan sightseeing",
      price: cheapestIn(
        core,
        (f) => manhattan(f) && (f.durationMinutes ?? 0) >= 17 && (f.durationMinutes ?? 0) <= 20,
      ),
    },
    {
      label: "25–30-minute New Jersey skyline flight",
      price: cheapestIn(
        core,
        (f) => newJersey(f) && (f.durationMinutes ?? 0) >= 25 && !/brooklyn/i.test(f.title),
      ),
    },
    {
      label: "25–30-minute Manhattan & Brooklyn flight",
      price: cheapestIn(
        core,
        (f) => manhattan(f) && (f.durationMinutes ?? 0) >= 25 && /brooklyn/i.test(f.title),
      ),
    },
    {
      label: "20–25-minute night skyline flight",
      price: cheapestIn(core, (f) => nightOrSunset(f) && (f.durationMinutes ?? 0) >= 20),
    },
    {
      label: "Private romantic helicopter charter",
      price: minPrice(flights.filter((f) => f.cabin === "private")),
    },
  ];

  const timeExamples = flights
    .filter((f) => f.durationMinutes != null)
    .slice(0, 8)
    .filter((f, i, arr) => {
      const key = f.durationLabel;
      return arr.findIndex((x) => x.durationLabel === key) === i;
    })
    .slice(0, 5);

  const specialty = flights.filter(isSpecialtyExperience);

  return (
    <div className="mx-auto max-w-6xl">
      <section id="which-flight" className="scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Which New York City helicopter tour should you choose?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
          The biggest decision isn&apos;t necessarily which helicopter operator to book. It&apos;s
          how long you want to fly, which part of the skyline you want to see, and where your flight
          departs.
        </p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone">
          A short helicopter tour can give you views of the Statue of Liberty and Lower Manhattan.
          Longer flights may continue along the Hudson River toward Midtown, Central Park and other
          landmarks, depending on the route.
        </p>

        <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
          12–15 vs 18–20 vs 25–30 minutes: what&apos;s the difference?
        </h3>
        <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
              <tr>
                <th className="px-4 py-3 font-semibold" />
                <th className="px-4 py-3 font-semibold">Short skyline flight</th>
                <th className="px-4 py-3 font-semibold">Extended Manhattan flight</th>
                <th className="px-4 py-3 font-semibold">Longer NYC flight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/8 bg-white text-navy">
              {[
                ["Flight time", "12–15 min", "18–20 min", "25–30 min"],
                [
                  "Typical highlights",
                  "Statue of Liberty, Lower Manhattan",
                  "Lower Manhattan, Midtown skyline",
                  "More of Manhattan and surrounding skyline",
                ],
                [
                  "Route coverage",
                  "Shorter sightseeing circuit",
                  "More time along the Hudson",
                  "Potentially wider sightseeing route",
                ],
                [
                  "Best for",
                  "First-time visitors, smaller budgets",
                  "Balanced sightseeing experience",
                  "Travelers wanting more time in the air",
                ],
                [
                  "Example from-price",
                  money(shortFrom),
                  money(extendedFrom),
                  money(longerFrom),
                ],
              ].map(([label, a, b, c]) => (
                <tr key={label}>
                  <th className="px-4 py-3 font-semibold text-stone">{label}</th>
                  <td className="px-4 py-3">{a}</td>
                  <td className="px-4 py-3">{b}</td>
                  <td className="px-4 py-3">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-stone-light">
          Prices are examples from our current Viator listings, not fixed rates. Individual routes
          and landmark coverage vary by operator.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          <span className="font-semibold text-navy">Our recommendation:</span> A 17–20-minute
          flight is a good starting point for most visitors. It offers more time to enjoy the
          Manhattan skyline without necessarily paying for a longer premium route. Choose a
          25–30-minute flight if the additional landmarks and route coverage matter to you.
        </p>
      </section>

      <section id="manhattan-vs-new-jersey" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Manhattan vs New Jersey helicopter departures
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
          Departure location is one of the most important details when comparing New York helicopter
          tours. Two flights with similar prices and durations can involve very different travel
          arrangements.
        </p>

        <h3 className="mt-8 font-display text-lg text-navy">Downtown Manhattan Heliport</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Many traditional Manhattan sightseeing tours depart from the Downtown Manhattan Heliport
          near the Financial District.
        </p>
        <p className="mt-3 text-sm font-semibold text-navy">Advantages:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-stone">
          <li>Convenient for visitors staying in Manhattan.</li>
          <li>Easy to combine with sightseeing in Lower Manhattan.</li>
          <li>Less additional ground travel for many tourists.</li>
        </ul>
        <p className="mt-3 text-sm font-semibold text-navy">Things to consider:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-stone">
          <li>Manhattan departures may have different operating restrictions and schedules.</li>
          <li>Check whether heliport fees are included in the advertised price.</li>
          <li>Confirm the actual departure location before booking.</li>
        </ul>

        <h3 className="mt-8 font-display text-lg text-navy">New Jersey heliports</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Other helicopter tours depart from New Jersey, including locations such as Linden and
          Kearny.
        </p>
        <p className="mt-3 text-sm font-semibold text-navy">Advantages:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-stone">
          <li>A selection of longer skyline routes.</li>
          <li>Night and sunset sightseeing options.</li>
          <li>Some flights may offer competitive prices for longer durations.</li>
        </ul>
        <p className="mt-3 text-sm font-semibold text-navy">Things to consider:</p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-stone">
          <li>Additional travel time from Manhattan.</li>
          <li>Transport costs to and from the heliport.</li>
          <li>The flight route may differ from tours departing Downtown Manhattan.</li>
        </ul>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          <span className="font-semibold text-navy">Our recommendation:</span> If you&apos;re
          staying in Manhattan and have limited time, a Manhattan departure may be more convenient.
          If you&apos;re interested in night flights or longer skyline routes, compare New Jersey
          departures too.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone">
          Always check the specific heliport address. &ldquo;New York City helicopter tour&rdquo;
          does not necessarily mean the flight departs from New York City.
        </p>
        <Link
          href="/new-york/helicopter-tours-from-new-jersey"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare New Jersey departures →
        </Link>
      </section>

      {specialty.length > 0 ? (
        <section id="specialty-flights" className="mt-14 scroll-mt-28">
          <h2 className="font-display text-2xl text-navy md:text-3xl">
            Specialty flights in our comparison
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone">
            Alongside standard Manhattan skyline tours, our current inventory includes seasonal or
            destination-specific experiences — such as autumn foliage routes or longer private
            charters outside the usual skyline circuit. These are not directly comparable to a
            typical 15-minute Statue of Liberty flight on price alone.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-stone">
            {specialty.slice(0, 6).map((f) => (
              <li key={f.id} className="rounded-lg border border-navy/10 bg-mist-soft px-4 py-3">
                <span className="font-medium text-navy">{f.title}</span>
                {f.priceFrom != null ? (
                  <span className="text-stone"> · from {money(f.priceFrom)}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section id="prices-guide" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          How much do New York City helicopter tours cost?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
          Prices vary depending on flight duration, departure location, operator and whether the
          helicopter is shared or privately chartered.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone">
          Our current Viator comparison includes:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
              <tr>
                <th className="px-4 py-3 font-semibold">Flight type</th>
                <th className="px-4 py-3 font-semibold text-right">Example advertised from-price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/8 bg-white">
              {priceRows.map((row) => (
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
          These are starting prices for individual listings, not guaranteed prices for all flights
          in each category. Private charter pricing may use a different passenger or group basis.
        </p>

        <h3 className="mt-8 font-display text-xl text-navy">
          Watch for heliport fees and additional charges
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone">
          The advertised flight price isn&apos;t always the final cost. Before booking, check
          whether the total includes heliport or facility fees, taxes and surcharges, ground
          transportation, weight-related charges and optional extras. A slightly cheaper flight
          departing New Jersey may not be cheaper overall once you account for transportation.
        </p>
        <Link
          href="/new-york/helicopter-tour-prices"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare New York helicopter tour prices →
        </Link>
      </section>

      {timeExamples.length > 0 ? (
        <section id="flight-time-vs-total" className="mt-14 scroll-mt-28">
          <h2 className="font-display text-2xl text-navy md:text-3xl">
            Flight time vs total experience
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone">
            A 15-minute helicopter tour means approximately 15 minutes of flying, not necessarily 15
            minutes from arrival to departure. You may also need time for check-in, identification
            checks, safety instructions, boarding and ground transportation. Our comparison separates
            actual flight duration from total activity time whenever the booking provider supplies
            both.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
                <tr>
                  <th className="px-4 py-3 font-semibold">Example listing</th>
                  <th className="px-4 py-3 font-semibold">Time in the air</th>
                  {timeExamples.some((f) => f.experienceLabel) ? (
                    <th className="px-4 py-3 font-semibold">Total experience</th>
                  ) : null}
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/8 bg-white">
                {timeExamples.map((f) => (
                  <tr key={f.id}>
                    <td className="max-w-[280px] px-4 py-3 font-medium text-navy">{f.title}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-navy">{f.durationLabel}</td>
                    {timeExamples.some((x) => x.experienceLabel) ? (
                      <td className="whitespace-nowrap px-4 py-3 text-navy">
                        {f.experienceLabel ?? "—"}
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-stone">
            Allow additional time beyond the advertised flight duration and follow the
            operator&apos;s required check-in instructions.
          </p>
        </section>
      ) : null}

      <section id="what-you-see" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          What will you see on a New York helicopter tour?
        </h2>

        <h3 className="mt-8 font-display text-lg text-navy">Statue of Liberty and Lower Manhattan</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Many shorter sightseeing flights focus on the southern end of Manhattan, where the Statue
          of Liberty, Ellis Island area and Financial District skyline are among the main highlights.
        </p>

        <h3 className="mt-8 font-display text-lg text-navy">Empire State Building and Midtown Manhattan</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Longer Manhattan sightseeing routes may include views toward Midtown, including the Empire
          State Building and other major skyscrapers. The exact route depends on the operator,
          airspace restrictions and conditions on the day.
        </p>

        <h3 className="mt-8 font-display text-lg text-navy">Central Park and Upper Manhattan</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Some extended routes continue farther north along the Hudson River. Do not assume every
          flight advertised as a Manhattan tour includes Central Park — check the route description
          before booking.
        </p>

        <h3 className="mt-8 font-display text-lg text-navy">Brooklyn and the East River</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Certain extended tours advertise Manhattan and Brooklyn sightseeing. If Brooklyn landmarks
          are a priority, choose a flight that explicitly includes them in its published itinerary.
        </p>
      </section>

      <section id="when-to-fly" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Daytime, sunset or night helicopter tour?
        </h2>
        <h3 className="mt-6 font-display text-lg text-navy">Daytime flights</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Daylight generally makes it easier to identify landmarks and photograph the skyline.{" "}
          <span className="font-semibold text-navy">Best for:</span> first-time visitors and
          sightseeing photography.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Sunset flights</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Sunset flights can offer changing light across the Manhattan skyline, depending on the
          route and weather.{" "}
          <span className="font-semibold text-navy">Best for:</span> couples, special occasions and
          photography.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Night flights</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          New York&apos;s illuminated skyline is a different experience after dark. Our comparison
          includes several night sightseeing flights, many departing New Jersey.{" "}
          <span className="font-semibold text-navy">Best for:</span> travelers who want to see the
          city lights rather than detailed daytime landmarks.
        </p>
        <Link
          href="/new-york/night-helicopter-tours"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare New York night helicopter tours →
        </Link>
      </section>

      <section id="private-flights" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Are private helicopter tours worth it?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          A private charter offers exclusive use of the helicopter for your group. Private does not
          automatically mean a fully customizable route — flight paths and operating permissions may
          still be restricted. For most visitors, a shared scenic flight offers better value;
          consider a private charter when exclusivity or a special occasion is the main priority.
        </p>
        <Link
          href="/new-york/private-helicopter-tours"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare private NYC helicopter tours →
        </Link>
      </section>

      <section id="before-booking" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">What to check before booking</h2>
        <ol className="mt-4 max-w-3xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-stone">
          <li>
            <span className="font-semibold text-navy">Departure heliport:</span> Confirm whether
            your flight leaves from Manhattan or New Jersey.
          </li>
          <li>
            <span className="font-semibold text-navy">Actual flight duration:</span> Compare minutes
            in the air rather than total activity time.
          </li>
          <li>
            <span className="font-semibold text-navy">Route coverage:</span> Check which landmarks
            are specifically included.
          </li>
          <li>
            <span className="font-semibold text-navy">Additional fees:</span> Confirm heliport
            fees, taxes and other charges.
          </li>
          <li>
            <span className="font-semibold text-navy">Passenger requirements:</span> Review
            identification, age, weight and seating policies.
          </li>
          <li>
            <span className="font-semibold text-navy">Weather policy:</span> Understand cancellation
            and rescheduling options.
          </li>
          <li>
            <span className="font-semibold text-navy">Transport arrangements:</span> Allow enough
            time to reach the heliport and check in.
          </li>
        </ol>
      </section>

      <section id="compare-cta" className="mt-14 scroll-mt-28 rounded-xl bg-navy-deep px-6 py-8 text-white md:px-10">
        <h2 className="font-display text-2xl md:text-3xl">Compare New York City helicopter tours</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
          Use the flight listings above to compare sightseeing routes, duration, advertised prices
          and traveler ratings. Add up to three flights to your comparison to see their differences
          side by side.
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
          Back to New York helicopter flight results →
        </a>
      </section>
    </div>
  );
}
