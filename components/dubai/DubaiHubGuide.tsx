import Link from "next/link";
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

function band(list: Flight[], min: number, max: number): Flight[] {
  return list.filter((f) => f.durationMinutes != null && f.durationMinutes >= min && f.durationMinutes <= max);
}

export function DubaiHubGuide({ flights }: Props) {
  const short = band(flights, 12, 15);
  const mid = band(flights, 16, 20);
  const extended = band(flights, 21, 30);
  const shortFrom = minPrice(short) ?? 198;
  const midFrom = minPrice(mid) ?? 320;
  const extFrom = minPrice(extended) ?? 219;

  const priceRows: Array<{ label: string; time: string; price: number | null }> = [
    { label: "Dubai Helicopter Experience with Sightseeing Options", time: "12 min", price: shortFrom },
    { label: "Ultimate Dubai Helicopter Tour with Optional Transfers", time: "12 min", price: null },
    { label: "15 Minute Helicopter Ride with Optional Transfer", time: "15 min", price: midFrom },
    { label: "Dubai Helicopter Tour with Optional Private Hotel Transfers", time: "22 min", price: extFrom },
    { label: "Dubai Helicopter The Vision Tour", time: "22 min", price: null },
    { label: "25 Minute Helicopter Ride with Optional Transfers", time: "25 min", price: minPrice(band(flights, 25, 25)) },
    {
      label: "Private Ultimate Dubai Helicopter Tour",
      time: "12 min",
      price: minPrice(flights.filter((f) => f.cabin === "private")),
    },
  ];

  const timeRows = flights.slice(0, 7);

  return (
    <div className="mx-auto max-w-6xl">
      <section id="which-tour" className="scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Which Dubai helicopter tour should you choose?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
          The most important decision is how much of Dubai you want to see from the air. Short
          12-minute flights often focus on Palm Jumeirah, Burj Al Arab and the coastline. Longer
          22–25-minute flights can cover more of the city, with some routes extending toward
          Downtown Dubai and the Burj Khalifa.
        </p>

        <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
          12 vs 17 vs 22–25 minutes: what&apos;s the difference?
        </h3>
        <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
              <tr>
                <th className="px-4 py-3 font-semibold" />
                <th className="px-4 py-3 font-semibold">Short scenic flight</th>
                <th className="px-4 py-3 font-semibold">Mid-length flight</th>
                <th className="px-4 py-3 font-semibold">Extended scenic flight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/8 bg-white text-navy">
              {[
                ["Flight time", "Around 12 min", "Around 15–17 min", "Around 22–25 min"],
                ["Typical focus", "Palm Jumeirah and coastline", "More coastal landmarks", "Wider city coverage"],
                ["Burj Khalifa views", "Route-dependent", "Route-dependent", "More likely on selected routes"],
                ["Best for", "First-time flyers, smaller budgets", "Balanced sightseeing", "Broader coverage"],
                ["Example from-price", money(shortFrom), money(midFrom), money(extFrom)],
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
          Prices are examples from individual Viator listings, not fixed rates for each duration.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          <span className="font-semibold text-navy">Our recommendation:</span> A 12-minute flight
          can be enough for Palm Jumeirah and the coastline. Choose a longer flight if you want
          additional landmarks — always verify the route.
        </p>
        <Link
          href="/dubai/helicopter-tour-prices"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare Dubai helicopter tour prices →
        </Link>
      </section>

      <section id="prices-guide" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          How much do Dubai helicopter tours cost?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Shared sightseeing flights in our comparison start around{" "}
          <strong className="font-semibold text-navy">{money(shortFrom)} per person</strong>, with
          longer and private experiences at higher prices.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
              <tr>
                <th className="px-4 py-3 font-semibold">Example experience</th>
                <th className="px-4 py-3 font-semibold">Flight time</th>
                <th className="px-4 py-3 font-semibold text-right">From-price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/8 bg-white">
              {priceRows.map((row) => (
                <tr key={row.label}>
                  <td className="max-w-[240px] px-4 py-3 text-navy">{row.label}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-navy">{row.time}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-navy">
                    {row.price != null ? money(row.price) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="mt-8 font-display text-lg text-navy">
          Why do similar Dubai helicopter tours have different prices?
        </h3>
        <ul className="mt-3 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-stone">
          <li>The exact route and landmarks covered.</li>
          <li>The departure helipad.</li>
          <li>Whether hotel transfers are included or optional.</li>
          <li>Shared seating versus an exclusive private charter.</li>
          <li>The operator and booking conditions.</li>
          <li>Additional services included in the package.</li>
        </ul>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          <span className="font-semibold text-navy">Our recommendation:</span> Compare the route,
          departure location and total booking price before paying more for a similar-duration flight.
        </p>
        <Link
          href="/dubai/helicopter-tour-prices"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare Dubai helicopter prices →
        </Link>
      </section>

      <section id="what-you-see" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          What will you see on a Dubai helicopter tour?
        </h2>
        <h3 className="mt-6 font-display text-lg text-navy">Palm Jumeirah</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          The palm-shaped layout is especially distinctive from above. Many shorter flights focus on
          this coastline — but not every tour is a confirmed Palm route.{" "}
          <Link href="/dubai/palm-jumeirah-helicopter-tours" className="text-teal hover:underline">
            Compare Palm Jumeirah routes →
          </Link>
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Burj Al Arab</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          A major coastal landmark on many routes. Confirm direction and coverage on the published
          itinerary.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Burj Khalifa and Downtown Dubai</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Some extended routes include Downtown. A 12-minute coastal flight should not be assumed to
          include Burj Khalifa unless the route states it.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Dubai Marina and JBR</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Selected tours include waterfront high-rises; coverage varies by route and duration.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">The World Islands and other coastal landmarks</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Some routes may include views toward The World Islands and other developments off the coast.
          These landmarks are not guaranteed on every flight — check the individual itinerary.
        </p>
      </section>

      <section id="twelve-min-worth" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Is a 12-minute Dubai helicopter tour worth it?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          A 12-minute flight can be a memorable introduction to Dubai from above — especially for
          Palm Jumeirah and coastal landmarks. Extended routes add time and potentially more
          sights when the itinerary includes them.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-navy">Choose a 12-minute flight if:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-stone">
              <li>Your main goal is Palm Jumeirah and nearby coastal landmarks.</li>
              <li>You want a relatively affordable experience.</li>
              <li>You don&apos;t need an extended sightseeing route.</li>
              <li>You prefer a short activity.</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-navy">Choose a 22–25-minute flight if:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-stone">
              <li>You want more time in the air.</li>
              <li>You&apos;re interested in a wider range of landmarks.</li>
              <li>Downtown Dubai is a priority and the route includes it.</li>
              <li>Sightseeing coverage matters more than the lowest price.</li>
            </ul>
          </div>
        </div>
        <Link
          href="/dubai/12-vs-25-minute-helicopter-tours"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare 12 vs 25 minute Dubai flights →
        </Link>
      </section>

      <section id="flight-time-vs-total" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">Flight time vs total experience</h2>
        {timeRows.length > 0 ? (
          <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
                <tr>
                  <th className="px-4 py-3 font-semibold">Listing</th>
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
      </section>

      <section id="departures" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Where do Dubai helicopter tours depart?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Departure helipads vary — including Atlantis and Palm Jumeirah area locations and other
          facilities. Confirm the meeting point and whether hotel transfers are included or
          optional. Private hotel transfers do not mean a private helicopter flight.
        </p>
      </section>

      <section id="shared-private" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Shared vs private Dubai helicopter tours
        </h2>
        <h3 className="mt-6 font-display text-lg text-navy">Shared helicopter flights</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Shared flights are generally the more affordable way to experience Dubai from above.
          Passengers book seats on a scheduled sightseeing route. Best for first-time visitors,
          couples and travelers prioritizing value.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Private helicopter flights</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          A private charter provides exclusive use of the helicopter for your group, subject to
          passenger and aircraft limits. Private does not necessarily mean a customized flight path
          or longer flying time — compare shared flights for standard sightseeing.
        </p>
      </section>

      <section id="when-to-fly" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          When is the best time to take a Dubai helicopter flight?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Cooler months can be more comfortable; summer heat and haze may affect visibility.
          Morning and afternoon lighting differ for photography. Allow flexibility for weather
          delays or cancellations.
        </p>
      </section>

      <section id="before-booking" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">What to check before booking</h2>
        <ol className="mt-4 max-w-3xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-stone">
          <li>Actual flight duration (12, 15, 22 or 25 minutes in the air).</li>
          <li>Published route — Palm, Burj Khalifa, Marina, etc.</li>
          <li>Departure helipad and arrival time.</li>
          <li>Hotel transfers — included, optional or not offered.</li>
          <li>Shared seat vs private charter pricing basis.</li>
          <li>Passenger ID, weight and seating policies.</li>
          <li>Total price including fees and extras.</li>
          <li>Weather cancellation policy.</li>
        </ol>
      </section>

      <section id="compare-cta" className="mt-14 scroll-mt-28 rounded-xl bg-navy-deep px-6 py-8 text-white md:px-10">
        <h2 className="font-display text-2xl md:text-3xl">Compare Dubai helicopter tours</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
          Use the flight listings above to compare routes, durations, prices, traveler ratings and
          experience types. Add up to three flights to your comparison before checking availability
          with the booking provider.
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
          Back to Dubai helicopter flights →
        </a>
      </section>
    </div>
  );
}
