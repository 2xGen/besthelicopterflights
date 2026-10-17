import Link from "next/link";
import type { DestinationGuide } from "@/data/destination-guides";
import type { Flight } from "@/data/flights";

type Props = {
  guide: DestinationGuide;
  flights: Flight[];
  destinationLabel: string;
};

function money(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function minPrice(list: Flight[]): number | null {
  const prices = list.map((f) => f.priceFrom).filter((p): p is number => p != null);
  return prices.length ? Math.min(...prices) : null;
}

/** Listings where total activity time differs from stated flight time. */
function flightVsTotalExamples(flights: Flight[], limit = 5): Flight[] {
  return flights
    .filter((f) => f.durationMinutes != null && f.experienceLabel)
    .slice(0, limit);
}

export function VictoriaFallsHubGuide({ guide, flights, destinationLabel }: Props) {
  const short = flights.filter((f) => f.durationMinutes != null && f.durationMinutes <= 15);
  const extended = flights.filter(
    (f) => f.durationMinutes != null && f.durationMinutes >= 22 && f.durationMinutes <= 30,
  );
  const shortFrom = minPrice(short) ?? 172;
  const longFrom = minPrice(extended) ?? 340;
  const timeExamples = flightVsTotalExamples(flights);

  return (
    <div className="mx-auto max-w-6xl">
      <section id="which-flight" className="scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Which Victoria Falls helicopter flight should you choose?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
          The biggest decision isn&apos;t which helicopter company to book. It&apos;s how much
          flying time you want.
        </p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone">
          Most Victoria Falls sightseeing flights fall into two categories: short 12–15-minute
          circuits focused on the waterfall itself, and longer 22–30-minute flights that explore
          more of the Zambezi River and Batoka Gorge.
        </p>

        <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
          12–15 minutes vs 25 minutes: what&apos;s the difference?
        </h3>
        <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
              <tr>
                <th className="px-4 py-3 font-semibold" />
                <th className="px-4 py-3 font-semibold">Short scenic flight</th>
                <th className="px-4 py-3 font-semibold">Extended scenic flight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/8 bg-white text-navy">
              {[
                ["Flight time", "12–15 minutes", "Approximately 22–30 minutes"],
                ["Main attraction", "Victoria Falls", "Victoria Falls and surrounding landscape"],
                [
                  "Typical route",
                  "Waterfall and nearby gorge",
                  "Waterfall, additional gorge sections and upstream river",
                ],
                [
                  "Wildlife viewing",
                  "Possible, but limited",
                  "More opportunity, never guaranteed",
                ],
                [
                  "Best for",
                  "First-time visitors and smaller budgets",
                  "Photography and travelers wanting a longer experience",
                ],
                [
                  "Example from-price",
                  money(shortFrom),
                  money(longFrom),
                ],
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
          Prices are examples from our compared Viator listings, not fixed rates. Route coverage
          varies by operator.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          <span className="font-semibold text-navy">Our recommendation:</span> Choose a 12–15-minute
          flight if your main goal is seeing Victoria Falls from above. The longer flight is worth
          considering if you specifically want more time exploring the Batoka Gorge and Zambezi
          landscape.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          <li>
            <Link
              href="/victoria-falls/flight-of-angels"
              className="inline-block rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal-bright"
            >
              Compare short flights →
            </Link>
          </li>
          <li>
            <Link
              href="/victoria-falls/12-vs-25-minute-helicopter-flights"
              className="inline-block rounded-full border border-navy/15 px-4 py-2 text-sm font-semibold text-teal hover:bg-mist-soft"
            >
              Compare flight durations →
            </Link>
          </li>
        </ul>
      </section>

      {timeExamples.length > 0 ? (
        <section id="flight-time-vs-total" className="mt-14 scroll-mt-28">
          <h2 className="font-display text-2xl text-navy md:text-3xl">
            Flight time vs total experience
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone">
            A listing&apos;s total activity time often includes hotel transfers, check-in and a
            safety briefing — not time in the helicopter. These examples from our current comparison
            show both where the listing states them.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-mist text-xs uppercase tracking-[0.06em] text-stone">
                <tr>
                  <th className="px-4 py-3 font-semibold">Listing</th>
                  <th className="px-4 py-3 font-semibold">In the air</th>
                  <th className="px-4 py-3 font-semibold">Total experience</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/8 bg-white">
                {timeExamples.map((f) => (
                  <tr key={f.id}>
                    <td className="max-w-[280px] px-4 py-3 font-medium text-navy">{f.title}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-navy">{f.durationLabel}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-navy">{f.experienceLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section id="prices-guide" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          How much do Victoria Falls helicopter tours cost?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
          The price depends primarily on flight duration, operator, departure location and whether
          the experience is shared or private.
        </p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone">
          In our current comparison, short sightseeing flights start around{" "}
          <strong className="font-semibold text-navy">{money(shortFrom)} per person</strong>, while
          several 24–25-minute flights are advertised around{" "}
          <strong className="font-semibold text-navy">{money(longFrom)}–$340 per person</strong>.
          However, the advertised booking price may not be the final amount.
        </p>

        <h3 className="mt-8 font-display text-xl text-navy">
          Watch for additional park and government fees
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone">
          Some helicopter operators charge separate park, government or fuel levies at check-in.
          These fees may not be included in the online booking price.
        </p>
        <p className="mt-3 text-sm font-semibold text-navy">Before booking, check:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-stone">
          <li>Whether park or government fees are included.</li>
          <li>Whether hotel pickup and return transfers are provided.</li>
          <li>Whether the price is per passenger or for an entire private helicopter.</li>
          <li>Whether photos, videos or other extras cost more.</li>
          <li>The cancellation and weather-rescheduling conditions.</li>
        </ul>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          We show the provider&apos;s advertised starting price. Always check the full amount
          payable before completing your booking.
        </p>
        <Link
          href="/victoria-falls/helicopter-tour-prices"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Compare Victoria Falls helicopter prices →
        </Link>
      </section>

      <section id="what-you-see" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          What will you see from the helicopter?
        </h2>

        <h3 className="mt-8 font-display text-lg text-navy">Victoria Falls and the Zambezi River</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          The main attraction is the waterfall itself. From above, you can see how the Zambezi River
          spreads across the falls before dropping into the narrow gorge system below. The view
          changes throughout the year: during high water, heavy spray can obscure parts of the
          falls; when levels are lower, more rock formations and individual channels may be visible.
        </p>

        <h3 className="mt-8 font-display text-lg text-navy">Batoka Gorge</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          The Batoka Gorge stretches downstream from Victoria Falls. Its dramatic bends and steep
          rock walls are among the main reasons to consider a longer helicopter flight. Not every
          short circuit travels far along the gorge, so compare the published route rather than
          choosing on flight duration alone.
        </p>

        <h3 className="mt-8 font-display text-lg text-navy">Zambezi National Park and wildlife</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone">
          Some extended routes include additional flying over the upstream Zambezi and surrounding
          parkland. You may see wildlife from the air, but sightings depend on the route,
          conditions and animal movements — they should never be treated as guaranteed.
        </p>
      </section>

      <section id="zimbabwe-zambia" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">Flying from Zimbabwe or Zambia</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Victoria Falls helicopter flights operate from both sides of the border.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {guide.departures.map((d) => (
            <li key={d.name} className="rounded-lg border border-navy/10 bg-white px-4 py-4">
              <p className="text-sm font-semibold text-navy">{d.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-stone">{d.note}</p>
            </li>
          ))}
        </ul>
        <Link
          href="/victoria-falls/zimbabwe-vs-zambia-helicopter-tours"
          className="mt-5 inline-block text-sm font-semibold text-teal hover:underline"
        >
          Zimbabwe vs Zambia helicopter tours →
        </Link>
      </section>

      <section id="when-to-fly" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          When is the best time to take a helicopter flight?
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          Victoria Falls is a year-round destination, but the appearance of the waterfall changes
          with the Zambezi&apos;s seasonal water levels.
        </p>
        <ul className="mt-4 max-w-3xl space-y-3 text-sm leading-relaxed text-stone">
          <li>
            <span className="font-semibold text-navy">High-water periods:</span> The waterfall can
            be especially dramatic, although dense spray may hide sections of the falls from view.
          </li>
          <li>
            <span className="font-semibold text-navy">Lower-water periods:</span> More of the gorge
            walls and rock formations may be visible, providing a different photographic
            perspective.
          </li>
        </ul>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
          For photography, consider the position of the sun, cloud cover and the direction of the
          helicopter&apos;s route. Flights are weather-dependent — allow some flexibility in your
          itinerary if a helicopter flight is one of your priorities.
        </p>
      </section>

      <section id="before-booking" className="mt-14 scroll-mt-28">
        <h2 className="font-display text-2xl text-navy md:text-3xl">What to check before booking</h2>
        <ol className="mt-4 max-w-3xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-stone">
          <li>
            <span className="font-semibold text-navy">Actual flight time:</span> A 60-minute activity
            may include only 12–15 minutes in the helicopter.
          </li>
          <li>
            <span className="font-semibold text-navy">Departure location:</span> Confirm which side
            of the border your helicopter leaves from.
          </li>
          <li>
            <span className="font-semibold text-navy">Seat arrangements:</span> Check whether window
            seating is guaranteed or allocated at check-in.
          </li>
          <li>
            <span className="font-semibold text-navy">Weight restrictions:</span> Operators may apply
            passenger weight limits or additional-seat requirements.
          </li>
          <li>
            <span className="font-semibold text-navy">Total cost:</span> Confirm park fees, fuel
            levies, transfers and other charges.
          </li>
          <li>
            <span className="font-semibold text-navy">Cancellation policy:</span> Check what happens
            if weather prevents the flight.
          </li>
        </ol>
      </section>

      <section id="compare-cta" className="mt-14 scroll-mt-28 rounded-xl bg-navy-deep px-6 py-8 text-white md:px-10">
        <h2 className="font-display text-2xl md:text-3xl">Compare Victoria Falls helicopter tours</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
          Use the comparison tool above to filter flights by duration, price, ratings and experience.
          You can compare up to three flights side by side before checking availability with the
          booking provider.
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
          Back to {destinationLabel} flight results →
        </a>
      </section>
    </div>
  );
}

