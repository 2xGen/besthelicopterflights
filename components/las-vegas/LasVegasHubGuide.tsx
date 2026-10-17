import Link from "next/link";
import type { Flight } from "@/data/flights";
import {
  isHooverDamFlight,
  isLasVegasLandingTour,
  isRedRockFlight,
  isStripFlight,
  isValleyOfFireFlight,
} from "@/lib/las-vegas-routes";

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

export function LasVegasHubGuide({ flights }: Props) {
  const strip = flights.filter(isStripFlight);
  const redRock = flights.filter(isRedRockFlight);
  const hoover = flights.filter(isHooverDamFlight);
  const stripFrom = minPrice(strip) ?? 99;
  const redRockFrom = minPrice(redRock.filter((f) => !isLasVegasLandingTour(f))) ?? 229;
  const hooverFrom = minPrice(hoover) ?? 219;

  const priceRows: Array<{ label: string; price: number | null }> = [
    { label: "Las Vegas Strip night flight", price: minPrice(strip.filter((f) => f.kind === "night")) },
    { label: "Las Vegas Strip night flight, 10 min", price: minPrice(strip.filter((f) => (f.durationMinutes ?? 0) <= 12)) },
    { label: "Hoover Dam and Las Vegas Strip, 35 min", price: hooverFrom },
    { label: "Red Rock Canyon air-only, 30 min", price: minPrice(redRock.filter((f) => /air[- ]only/i.test(f.title))) },
    {
      label: "Red Rock Canyon with landing and Champagne toast",
      price: minPrice(redRock.filter(isLasVegasLandingTour)),
    },
    {
      label: "Sunset Red Rock Canyon with Champagne toast",
      price: minPrice(redRock.filter((f) => /sunset/i.test(f.title))),
    },
    {
      label: "Valley of Fire with landing",
      price: minPrice(flights.filter(isValleyOfFireFlight)),
    },
    {
      label: "Private Las Vegas Strip night flight",
      price: minPrice(strip.filter((f) => f.cabin === "private")),
    },
  ];

  const timeRows = flights.slice(0, 8);

  const redRockRows = redRock.map((f) => ({
    title: f.title,
    price: f.priceFrom,
  }));

  return (
    <div className="mx-auto max-w-6xl">
      <section id="which-tour" className="scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Which Las Vegas helicopter tour should you choose?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
          The biggest decision is whether you want to see the Las Vegas Strip from above or explore
          the desert landscapes surrounding the city. Short Strip flights are usually the most
          affordable option, especially at night. Longer scenic flights can include Red Rock Canyon,
          Hoover Dam or Valley of Fire, with some packages offering a landing.
        </p>

        <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
          Las Vegas Strip vs Red Rock Canyon vs Hoover Dam
        </h3>
        <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
              <tr>
                <th className="px-4 py-3 font-semibold" />
                <th className="px-4 py-3 font-semibold">Strip helicopter flight</th>
                <th className="px-4 py-3 font-semibold">Red Rock Canyon flight</th>
                <th className="px-4 py-3 font-semibold">Hoover Dam scenic flight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/8 bg-white text-navy">
              {[
                ["Typical flight time", "Around 10 minutes", "Around 30 minutes (air-only)", "Around 35 minutes"],
                ["Main attraction", "Illuminated Las Vegas Strip", "Red sandstone cliffs", "Hoover Dam and landscape"],
                ["Best time", "Particularly popular at night", "Daytime or sunset", "Daytime"],
                ["Landing options", "Usually air-only", "On selected tours", "Check itinerary"],
                ["Best for", "First-time visitors, smaller budgets", "Couples, photography", "More than the Strip"],
                ["Example from-price", money(stripFrom), money(redRockFrom), money(hooverFrom)],
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
          Prices are examples from our current Viator listings, not fixed rates.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          <span className="font-semibold text-navy">Our recommendation:</span> Choose a Strip night
          flight for a memorable experience without spending several hundred dollars. Choose Red
          Rock Canyon for natural scenery or a landing. Consider Hoover Dam for a longer route
          combining city and landmark views.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          <li>
            <Link
              href="/las-vegas/strip-helicopter-tours"
              className="inline-block rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal-bright"
            >
              Compare Las Vegas Strip flights →
            </Link>
          </li>
          <li>
            <Link
              href="/las-vegas/red-rock-canyon-helicopter-tours"
              className="inline-block rounded-full border border-navy/15 px-4 py-2 text-sm font-semibold text-teal hover:bg-mist-soft"
            >
              Compare Red Rock Canyon flights →
            </Link>
          </li>
        </ul>
      </section>

      <section id="prices-guide" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          How much do Las Vegas helicopter tours cost?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Las Vegas helicopter sightseeing can be considerably more affordable than a full Grand
          Canyon excursion. Short Strip night flights in our comparison start around{" "}
          <strong className="font-semibold text-navy">{money(stripFrom)} per person</strong>.
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
        <h3 className="mt-8 font-display text-lg text-navy">Why do Las Vegas helicopter prices vary?</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-stone">
          <li>Flight duration — a 10-minute Strip flight vs a longer desert route.</li>
          <li>Landing experiences and specialty packages.</li>
          <li>Private vs shared seating.</li>
          <li>Sunset, Champagne and optional extras.</li>
          <li>Ground transfers and additional fees.</li>
        </ul>
      </section>

      <section id="how-long" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          How long is a Las Vegas helicopter ride?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Many Strip flights advertise approximately 10 minutes in the air. Red Rock Canyon and Hoover
          Dam routes are often around 30–35 minutes when flight time is stated.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Flight time vs total experience</h3>
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
          A two-hour activity does not mean two hours in the helicopter. Check actual flying time and
          what the remaining experience includes.
        </p>
      </section>

      <section id="strip-worth-it" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Is a Las Vegas Strip helicopter tour worth it?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          A Strip flight shows Las Vegas from a perspective you cannot get from street level. Most
          Strip flights are relatively short — the experience is about seeing the city from above.
        </p>
        <Link
          href="/las-vegas/strip-helicopter-tours"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare Las Vegas Strip helicopter tours →
        </Link>
      </section>

      <section id="day-vs-night" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Daytime vs nighttime Las Vegas helicopter tours
        </h2>
        <h3 className="mt-6 font-display text-lg text-navy">Night helicopter flights</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Night flights are distinctive in Las Vegas — the illuminated Strip against the desert. Our
          comparison includes several Strip night flights from around $99–$100.
        </p>
        <h3 className="mt-6 font-display text-lg text-navy">Daytime helicopter flights</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Daytime routes toward Red Rock Canyon, Hoover Dam and Valley of Fire suit landscape
          photography and longer scenic flying.
        </p>
        <Link
          href="/las-vegas/night-helicopter-tours"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare Las Vegas night helicopter tours →
        </Link>
      </section>

      <section id="red-rock" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">Red Rock Canyon helicopter tours</h2>
        {redRockRows.length > 0 ? (
          <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
            <table className="w-full min-w-[400px] text-left text-sm">
              <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
                <tr>
                  <th className="px-4 py-3 font-semibold">Experience</th>
                  <th className="px-4 py-3 font-semibold text-right">Advertised from-price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/8 bg-white">
                {redRockRows.map((row) => (
                  <tr key={row.title}>
                    <td className="px-4 py-3 text-navy">{row.title}</td>
                    <td className="px-4 py-3 text-right font-medium text-navy">
                      {row.price != null ? money(row.price) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <Link
          href="/las-vegas/red-rock-canyon-helicopter-tours"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare Red Rock Canyon helicopter tours →
        </Link>
      </section>

      <section id="hoover-valley" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Hoover Dam and Valley of Fire helicopter tours
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Hoover Dam routes combine Strip sightseeing with the dam and surrounding landscape when
          stated in the itinerary. Valley of Fire tours in our inventory include landing experiences
          advertised from higher price points — check each listing for route and ground time.
        </p>
      </section>

      <section id="vs-grand-canyon" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Las Vegas helicopter tour vs Grand Canyon helicopter tour
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Not every helicopter tour from Las Vegas visits the Grand Canyon. Strip and desert flights
          are local sightseeing; Grand Canyon tours are separate, longer excursions to the West Rim.
        </p>
        <Link
          href="/grand-canyon/helicopter-tours-from-las-vegas"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare Grand Canyon helicopter tours from Las Vegas →
        </Link>
      </section>

      <section id="departures" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Where do Las Vegas helicopter tours depart?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Departures vary between Strip-area heliports, Henderson and other Las Vegas-area
          facilities. Confirm the meeting point, check-in time and whether hotel transfers are
          included before booking.
        </p>
      </section>

      <section id="private" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Are private Las Vegas helicopter tours worth it?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Private flights offer exclusive use of the aircraft. Shared Strip flights are usually
          better value for straightforward sightseeing unless exclusivity is the main goal.
        </p>
      </section>

      <section id="when-to-fly" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          When is the best time to take a Las Vegas helicopter tour?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Strip sightseeing is especially popular at night. Desert routes benefit from daylight for
          landscape views. All flights depend on weather and operational conditions.
        </p>
      </section>

      <section id="before-booking" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">What to check before booking</h2>
        <ol className="mt-4 max-w-3xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-stone">
          <li>Actual flight duration vs total activity time.</li>
          <li>Day or night — city lights vs desert scenery.</li>
          <li>Departure heliport and required arrival time.</li>
          <li>Landing location and time on the ground.</li>
          <li>Hotel transfers and additional charges.</li>
          <li>Private vs shared pricing basis.</li>
          <li>Weather cancellation policy.</li>
        </ol>
      </section>

      <section id="compare-cta" className="mt-14 scroll-mt-28 rounded-xl bg-navy-deep px-6 py-8 text-white md:px-10">
        <h2 className="font-display text-2xl md:text-3xl">Compare Las Vegas helicopter tours</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
          Use the flight listings above to compare routes, flight durations, prices, landing options
          and traveler ratings. Add up to three flights to your comparison before checking
          availability with the booking provider.
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
          Back to Las Vegas helicopter flights →
        </a>
      </section>
    </div>
  );
}
