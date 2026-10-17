import Link from "next/link";
import { capeTownRoute } from "@/data/destination-categories";
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

function durationBand(list: Flight[], min: number, max: number): Flight[] {
  return list.filter((f) => f.durationMinutes != null && f.durationMinutes >= min && f.durationMinutes <= max);
}

export function CapeTownHubGuide({ flights }: Props) {
  const cityHop = durationBand(flights, 12, 15);
  const atlantic = flights.filter((f) => capeTownRoute(f) === "atlantic");
  const twoOceans = flights.filter((f) => capeTownRoute(f) === "two-oceans");
  const capePoint = flights.filter((f) => capeTownRoute(f) === "cape-point");
  const huey = flights.filter((f) => /huey/i.test(f.title));

  const cityFrom = minPrice(cityHop) ?? minPrice(durationBand(flights, 12, 20)) ?? 165;
  const atlanticFrom = minPrice(atlantic.filter((f) => (f.durationMinutes ?? 0) >= 18)) ?? 243;
  const twoOceansFrom = minPrice(twoOceans) ?? 373;
  const capePointFrom = minPrice(capePoint.filter((f) => (f.durationMinutes ?? 0) >= 45)) ?? 632;

  const timeRows = flights
    .filter(
      (f) =>
        f.durationMinutes != null ||
        f.experienceLabel != null ||
        /city hopper|atlantic|two oceans|cape point|robben|pickup/i.test(f.title),
    )
    .slice(0, 8);

  return (
    <div className="mx-auto max-w-6xl">
      <section id="which-tour" className="scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Which Cape Town helicopter tour should you choose?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
          The biggest decision isn&apos;t which helicopter company to book. It&apos;s how far along
          Cape Town&apos;s coastline you want to fly. Short city flights focus on Table Mountain;
          Atlantic Coast routes continue toward Camps Bay and Hout Bay; Two Oceans flights explore
          more of the peninsula; extended flights can reach Cape Point.
        </p>

        <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
          12 vs 20 vs 25 vs 50 minutes: what&apos;s the difference?
        </h3>
        <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
              <tr>
                <th className="px-4 py-3 font-semibold" />
                <th className="px-4 py-3 font-semibold">City Hopper</th>
                <th className="px-4 py-3 font-semibold">Atlantic Coast</th>
                <th className="px-4 py-3 font-semibold">Two Oceans</th>
                <th className="px-4 py-3 font-semibold">Cape Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/8 bg-white text-navy">
              {[
                ["Flight time", "12–15 min", "18–20 min", "24–30 min", "Approx. 45–50 min"],
                ["Main attraction", "City & Table Mountain", "Atlantic coastline", "Wider peninsula", "Cape Point"],
                ["Example from-price", money(cityFrom), money(atlanticFrom), money(twoOceansFrom), money(capePointFrom)],
              ].map(([label, a, b, c, d]) => (
                <tr key={label}>
                  <th className="px-4 py-3 font-semibold text-stone">{label}</th>
                  <td className="px-4 py-3">{a}</td>
                  <td className="px-4 py-3">{b}</td>
                  <td className="px-4 py-3">{c}</td>
                  <td className="px-4 py-3">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-stone-light">
          Prices are examples from current listings, not fixed rates. Routes vary by operator.
        </p>
        <Link
          href="/cape-town/helicopter-tour-prices"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare Cape Town helicopter tour prices →
        </Link>
      </section>

      <section id="prices-guide" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          How much do Cape Town helicopter tours cost?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Shared sightseeing flights in our comparison start around{" "}
          <strong className="font-semibold text-navy">{money(cityFrom)} per person</strong>, with
          longer Cape Point experiences costing substantially more.
        </p>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm text-stone">
          <li>Flight duration and route coverage (Cape Point travels much farther than city hops).</li>
          <li>Included extras such as Champagne, boat cruises or transportation.</li>
          <li>Aircraft type — specialty experiences such as Huey flights are priced differently.</li>
        </ul>
        <Link
          href="/cape-town/helicopter-tour-prices"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare Cape Town helicopter prices →
        </Link>
      </section>

      <section id="what-you-see" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          What will you see on a Cape Town helicopter tour?
        </h2>
        <h3 className="mt-6 font-display text-lg text-navy">Table Mountain and the City Bowl</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Short city flights provide aerial views of Table Mountain and the city without a full
          peninsula excursion.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Camps Bay and the Twelve Apostles</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Atlantic Coast routes may pass Camps Bay and the Twelve Apostles.{" "}
          <Link href="/cape-town/atlantic-coast-helicopter-tours" className="text-teal hover:underline">
            Compare Atlantic Coast flights →
          </Link>
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Cape Point and the Cape of Good Hope</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Extended routes travel toward the southern end of the peninsula.{" "}
          <Link href="/cape-town/cape-point-helicopter-tours" className="text-teal hover:underline">
            Compare Cape Point flights →
          </Link>
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Robben Island</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Some tours offer aerial views of Robben Island. A helicopter sightseeing flight is not the
          same as visiting or landing on the island — check the itinerary.
        </p>
      </section>

      <section id="two-oceans-worth" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Is a Two Oceans helicopter tour worth it?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Compared with a short City Hopper, a Two Oceans tour generally covers more of the
          peninsula. Our comparison includes Two Oceans flights advertised from around{" "}
          {money(twoOceansFrom)} per person where listed.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone">
          “Two Oceans” is a tour name, not a guarantee of a precise dividing line between the Atlantic
          and Indian Oceans.
        </p>
        <Link
          href="/cape-town/two-oceans-helicopter-tours"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare Two Oceans helicopter tours →
        </Link>
      </section>

      <section id="cape-point-worth" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Is a Cape Point helicopter tour worth the extra cost?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Cape Point flights offer some of the longest sightseeing routes in our comparison — often
          from around {money(capePointFrom)} for extended peninsula coverage where flight time is
          stated.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          <span className="font-semibold text-navy">Our recommendation:</span> A 20–30-minute
          coastal flight can balance price and scenery. Choose Cape Point if the extended peninsula
          route is the main attraction.
        </p>
      </section>

      <section id="flight-time-vs-total" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">Flight time vs total experience</h2>
        {timeRows.length > 0 ? (
          <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
                <tr>
                  <th className="px-4 py-3 font-semibold">Listing</th>
                  <th className="px-4 py-3 font-semibold">In the air</th>
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
      </section>

      <section id="departures" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Where do Cape Town helicopter tours depart?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Many sightseeing flights depart from helipads near the V&A Waterfront. Confirm the meeting
          point, check-in time and whether hotel pickup is included in your selected booking option.
        </p>
      </section>

      <section id="doors-off" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Are doors-off helicopter tours available in Cape Town?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Nearly all Cape Town sightseeing flights in our comparison use enclosed cabins. Some
          marketing copy mentions &quot;open door&quot; experiences, but that does not necessarily
          mean the doors are removed in flight — confirm the aircraft configuration with the operator
          before booking.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Doors-off flying is a much bigger category on our Hawaii island comparisons, where several
          operators publish dedicated open-cabin products.
        </p>
      </section>

      {huey.length > 0 ? (
        <section id="huey" className="mt-14 scroll-mt-28">
          <h2 className="font-display text-2xl text-navy md:text-3xl">What about Huey helicopter flights?</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
            Our inventory includes specialty Huey experiences (from around{" "}
            {money(minPrice(huey) ?? 548)} where listed) aimed at travelers interested in the
            aircraft and adventure format rather than the lowest-priced sightseeing route.
          </p>
        </section>
      ) : null}

      <section id="when-to-fly" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          When is the best time to take a Cape Town helicopter flight?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Wind and cloud around Table Mountain can affect schedules year-round. Book early in your
          stay so you can reschedule if weather cancels a flight. Visibility matters more than a
          particular hour for photography.
        </p>
      </section>

      <section id="before-booking" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">What to check before booking</h2>
        <ol className="mt-4 max-w-3xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-stone">
          <li>Actual flight time vs total activity duration.</li>
          <li>Route coverage — Camps Bay, Hout Bay, Robben Island, Cape Point.</li>
          <li>Departure location and check-in time.</li>
          <li>Doors-off configuration if applicable.</li>
          <li>Weight limits, age rules and included extras.</li>
          <li>Weather cancellation policy.</li>
        </ol>
      </section>

      <section id="compare-cta" className="mt-14 scroll-mt-28 rounded-xl bg-navy-deep px-6 py-8 text-white md:px-10">
        <h2 className="font-display text-2xl md:text-3xl">Compare Cape Town helicopter tours</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
          Use the flight listings above to compare routes, durations, prices and traveler ratings. Add
          up to three flights to your comparison before checking availability with the booking
          provider.
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
          Back to Cape Town helicopter flights →
        </a>
      </section>
    </div>
  );
}
