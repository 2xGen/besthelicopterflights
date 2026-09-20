import Image from "next/image";
import Link from "next/link";
import { featuredKauaiTours, kauaiTours } from "@/data/kauai-tours";
import { VIATOR_LINK_REL, viatorAffiliateUrl } from "@/lib/viator";

function getTour(id: string) {
  const tour = kauaiTours.find((t) => t.id === id);
  if (!tour) throw new Error(`Unknown Kauai tour: ${id}`);
  return tour;
}

const chooseRows = [
  {
    want: "A private helicopter experience",
    start: "Aliʻi Kauai Private Doors-Off",
    href: "#private-doors-off",
  },
  {
    want: "Traditional island sightseeing",
    start: "Blue Hawaiian Eco Adventure",
    href: "#eco-adventure",
  },
  {
    want: "Waterfalls and valleys",
    start: "Safari Helicopters Deluxe Waterfall Safari",
    href: "#waterfall-safari",
  },
  {
    want: "A full hour with the doors off",
    start: "Jack Harter Luxury Doors-Off",
    href: "#luxury-doors-off",
  },
  {
    want: "Doors-off with all window seats",
    start: "Mauna Loa Kauai Experience",
    href: "#kauai-experience",
  },
  {
    want: "A lower-priced doors-off flight",
    start: "Jack Harter Heart of the Island",
    href: "#heart-of-island",
  },
  {
    want: "A North Shore departure",
    start: "Blue Hawaiian from Princeville",
    href: "#discover-princeville",
  },
  {
    want: "A canyon landing",
    start: "Safari Helicopters Jurassic Canyon Landing",
    href: "#jurassic-canyon",
  },
  {
    want: "A doors-on experience",
    start: "Air Kauai Ohana",
    href: "#air-kauai-ohana",
  },
] as const;

const featuredCopy: Record<
  string,
  {
    why: string[];
    considerIf: string;
    body: string[];
    extraLink?: { href: string; label: string };
  }
> = {
  "private-doors-off": {
    body: [
      "Aliʻi’s private doors-off tour stands out for travelers who want to experience Kauai without sharing the helicopter with another group. Its published 75-minute duration is also longer than most of the sightseeing flights in this comparison.",
      "The combination of private flying, doors-off views and a longer flight makes it particularly relevant for couples, families or small groups prioritizing waterfalls, coastline views and photography.",
    ],
    why: [
      "Private rather than shared flight",
      "Doors-off format",
      "Longer published flight time",
      "Very strong traveler rating and review volume",
    ],
    considerIf:
      "keeping the per-person price down matters more than having a private aircraft.",
  },
  "eco-adventure": {
    body: [
      "Blue Hawaiian’s Eco Adventure is the option we would compare first for a more traditional Kauai sightseeing flight.",
      "It has the largest review volume among our featured choices and is designed around broad scenic coverage rather than a niche such as doors-off photography or a private charter.",
    ],
    why: [
      "Broad Kauai sightseeing focus",
      "Large traveler review base",
      "Established helicopter operator",
      "Good fit if doors-off flying isn’t important",
    ],
    considerIf:
      "you specifically want doors-off flying, a private experience or a longer flight.",
  },
  "waterfall-safari": {
    body: [
      "The Deluxe Waterfall Safari is one of the first tours to compare if waterfalls and Kauai’s green interior are your main priorities.",
      "Its published 55-minute flight time sits in the middle of this comparison, while its from-price is lower than several of the premium and private alternatives.",
    ],
    why: [
      "Waterfall-focused positioning",
      "Approximately 55-minute flight",
      "Strong traveler feedback",
      "Competitive price within this comparison",
    ],
    considerIf: "doors-off flying or a private cabin is essential.",
  },
  "luxury-doors-off": {
    body: [
      "Jack Harter’s 60-minute flight is one of the strongest options to compare if you’ve already decided you want the doors off.",
      "The full-hour published duration is particularly relevant for photography and travelers who want more open-air flight time rather than simply choosing the cheapest doors-off option.",
    ],
    why: [
      "Doors-off",
      "Full 60-minute published flight",
      "Strong traveler ratings",
      "Well suited to open-air photography",
    ],
    considerIf:
      "price matters more than flight duration. Jack Harter also offers a lower-priced Heart of the Island doors-off option.",
    extraLink: {
      href: "/kauai/doors-off-helicopter-tours",
      label: "Compare all Kauai doors-off tours",
    },
  },
  "kauai-experience": {
    body: [
      "Mauna Loa is particularly interesting when seating configuration matters. Its published all-window-seat format means the experience is designed around unobstructed views rather than putting some passengers away from a window.",
      "At about 55 minutes, it also provides substantial flight time while currently sitting below the price of some other premium doors-off choices in our comparison.",
    ],
    why: [
      "Doors-off format",
      "All-window-seat positioning",
      "Approximately 55 minutes",
      "Lower from-price than some premium alternatives",
    ],
    considerIf:
      "you specifically want the longest private experience or a full 60-minute Jack Harter flight.",
  },
};

const moreTours = [
  {
    id: "jurassic-canyon",
    bestLabel: "Canyon landing",
    body: "Safari Helicopters offers this experience for travelers who want a landing incorporated into the tour rather than spending the entire experience in the air. Compare the actual flight time, landing duration and total price with conventional sightseeing flights before deciding whether the landing is worth the additional cost to you.",
  },
  {
    id: "heart-of-island",
    bestLabel: "Lower-priced doors-off option",
    body: "This Jack Harter flight is worth comparing if you want doors-off flying but don’t necessarily need the longer 60-minute experience. Its advertised from-price is substantially lower than the full-hour Jack Harter flight in our current comparison. Check the current duration and route carefully when comparing the two.",
  },
  {
    id: "discover-princeville",
    bestLabel: "North Shore departure",
    body: "Travelers staying around Princeville and Kauai’s North Shore should pay particular attention to departure location. This Blue Hawaiian flight departs from Princeville, which may make it more convenient than traveling across the island simply to reach another heliport.",
  },
  {
    id: "air-kauai-doors-off",
    bestLabel: "Another doors-off option to compare",
    body: "Air Kauai provides another open-cabin option worth comparing with Jack Harter, Mauna Loa and Aliʻi. Pay particular attention to current flight duration, seating configuration, route, weight restrictions and cancellation terms when comparing doors-off flights.",
  },
  {
    id: "air-kauai-ohana",
    bestLabel: "Doors-on comfort",
    body: "Not everyone wants an open helicopter cabin. Air Kauai’s Ohana tour provides an enclosed alternative for travelers who prefer less wind exposure and a more sheltered sightseeing experience.",
  },
] as const;

type FaqItem = {
  q: string;
  a: string;
  link?: { href: string; label: string };
};

const faqs: FaqItem[] = [
  {
    q: "What is the best helicopter tour in Kauai?",
    a: "There isn’t one best flight for every traveler. In our comparison, Aliʻi stands out for a private doors-off experience, Blue Hawaiian for traditional overall sightseeing, Safari Helicopters for a waterfall-focused flight and Jack Harter for a full-hour doors-off option. The best choice depends primarily on whether you prioritize privacy, open-air views, flight duration, specific scenery or price.",
  },
  {
    q: "How much does a helicopter tour in Kauai cost?",
    a: "The tours currently included in our comparison range from roughly $221 to $579+ per person based on advertised from-prices. Prices change according to the tour, date, duration and availability, so check the live booking page before making a decision.",
    link: {
      href: "/kauai/helicopter-tour-prices",
      label: "See the full Kauai helicopter tour price comparison",
    },
  },
  {
    q: "Are there doors-off helicopter tours in Kauai?",
    a: "Yes. Several operators offer doors-off experiences, including products from Jack Harter, Mauna Loa, Aliʻi and Air Kauai in our current comparison.",
    link: {
      href: "/kauai/doors-off-helicopter-tours",
      label: "See our dedicated Kauai doors-off helicopter tour comparison",
    },
  },
  {
    q: "Is doors-off or doors-on better in Kauai?",
    a: "Doors-off is particularly attractive for unobstructed photography and a more immersive open-air experience. Doors-on generally offers greater comfort, less wind exposure and a more traditional sightseeing flight. Neither is universally better.",
  },
  {
    q: "How long is a Kauai helicopter tour?",
    a: "Many popular Kauai sightseeing flights advertise approximately 50–75 minutes in the air, although duration varies significantly between products. Check whether the advertised activity duration represents actual flight time or includes check-in and other ground activities.",
  },
  {
    q: "Are private helicopter tours available in Kauai?",
    a: "Yes. Private helicopter experiences are available on Kauai, including doors-off options. Private flights can be particularly attractive to couples, families and small groups who don’t want to share the aircraft with other travelers.",
    link: {
      href: "/kauai/private-helicopter-tours",
      label: "Compare private helicopter tours in Kauai",
    },
  },
  {
    q: "Can you see the Na Pali Coast by helicopter?",
    a: "The Na Pali Coast is featured in Kauai aerial sightseeing, but exact routes depend on the tour, operator and conditions on the day. Check the published itinerary if Na Pali Coast views are one of your main reasons for booking.",
  },
  {
    q: "Are Kauai helicopter tours worth it?",
    a: "A helicopter tour provides access to aerial views of parts of Kauai that are difficult or impossible to experience from the road. Whether the cost is worthwhile depends on your budget and priorities, particularly because many flights cost several hundred dollars per person. If you’re deciding between tours, compare flight time, route, cabin configuration and price rather than choosing solely by rating.",
  },
];

export function KauaiChooseGuide() {
  return (
    <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl text-navy md:text-4xl">
          Which Kauai helicopter tour should you choose?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
          There isn’t one Kauai helicopter flight that is right for everyone.
          These are the options we would compare first depending on what you
          want from the experience.
        </p>

        <ul className="mt-8 space-y-3 md:hidden">
          {chooseRows.map((row) => (
            <li
              key={row.want}
              className="border border-navy/10 bg-white px-4 py-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-stone-light">
                If you want…
              </p>
              <p className="mt-1 font-medium text-navy">{row.want}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-stone-light">
                Start by comparing…
              </p>
              <a
                href={row.href}
                className="mt-1 block text-sm font-medium text-teal hover:text-teal-bright"
              >
                {row.start}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 hidden overflow-hidden rounded-sm border border-navy/10 bg-white md:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-navy/10 bg-mist text-xs uppercase tracking-[0.08em] text-stone">
                <th className="px-4 py-3 font-semibold">If you want…</th>
                <th className="px-4 py-3 font-semibold">
                  Start by comparing…
                </th>
              </tr>
            </thead>
            <tbody>
              {chooseRows.map((row) => (
                <tr
                  key={row.want}
                  className="border-b border-navy/8 last:border-0"
                >
                  <td className="px-4 py-3 text-stone">{row.want}</td>
                  <td className="px-4 py-3">
                    <a
                      href={row.href}
                      className="font-medium text-navy hover:text-teal"
                    >
                      {row.start}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone">
          If open-air flying is your priority, see our full{" "}
          <Link
            href="/kauai/doors-off-helicopter-tours"
            className="font-medium text-teal hover:underline"
          >
            Best Doors-Off Helicopter Tours on Kauai
          </Link>{" "}
          comparison.
        </p>
      </div>
    </section>
  );
}

export function KauaiFeaturedTourWriteups() {
  return (
    <section id="top-tours" className="bg-mist px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl leading-tight text-navy md:text-4xl">
          Our top Kauai helicopter tours
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
          These five flights are our featured picks for the most common Kauai
          search intents — private, overall sightseeing, waterfalls, full-hour
          doors-off and all-window-seat doors-off.
        </p>

        <div className="mt-12 space-y-10">
          {featuredKauaiTours.map((tour) => {
            const copy = featuredCopy[tour.id];
            return (
              <article
                key={tour.id}
                id={tour.id}
                className="scroll-mt-28 overflow-hidden rounded-sm border border-navy/10 bg-white"
              >
                <div className="grid gap-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-stretch">
                  <div className="relative aspect-[7/5] bg-navy md:aspect-auto md:min-h-[280px]">
                    <Image
                      src={tour.image}
                      alt={tour.fullName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                  <div className="p-5 md:p-8">
                    <p className="text-sm font-semibold text-teal">
                      #{tour.rank} — Best for: {tour.bestFor}
                    </p>
                    <h3 className="mt-2 font-display text-2xl leading-tight text-navy md:text-3xl">
                      {tour.fullName}
                    </h3>
                    <dl className="mt-4 grid gap-2 text-sm text-stone sm:grid-cols-2">
                      <div>
                        <dt className="text-xs uppercase tracking-[0.08em] text-stone-light">
                          Operator
                        </dt>
                        <dd className="mt-0.5 text-navy">{tour.supplier}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.08em] text-stone-light">
                          Published flight time
                        </dt>
                        <dd className="mt-0.5 text-navy">
                          About {tour.duration.replace(" min", " minutes")}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.08em] text-stone-light">
                          Traveler rating
                        </dt>
                        <dd className="mt-0.5 text-navy">
                          {tour.rating != null
                            ? `${tour.rating.toFixed(1)} from ${tour.reviews?.toLocaleString("en-US")} reviews`
                            : "See listing"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.08em] text-stone-light">
                          From
                        </dt>
                        <dd className="mt-0.5 font-medium text-navy">
                          {tour.priceLabel} per person
                        </dd>
                      </div>
                    </dl>

                    {copy?.body.map((p) => (
                      <p
                        key={p}
                        className="mt-4 text-base leading-relaxed text-stone"
                      >
                        {p}
                      </p>
                    ))}

                    {copy && (
                      <>
                        <p className="mt-5 text-sm font-semibold text-navy">
                          Why consider it
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {copy.why.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2 text-sm leading-relaxed text-stone"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-4 text-sm leading-relaxed text-stone">
                          <strong className="font-semibold text-navy">
                            Consider another tour if:
                          </strong>{" "}
                          {copy.considerIf}
                        </p>
                        {copy.extraLink && (
                          <p className="mt-3 text-sm">
                            <Link
                              href={copy.extraLink.href}
                              className="font-medium text-teal hover:text-teal-bright"
                            >
                              {copy.extraLink.label} →
                            </Link>
                          </p>
                        )}
                      </>
                    )}

                    <a
                      href={viatorAffiliateUrl(tour.viatorUrl)}
                      target="_blank"
                      rel={VIATOR_LINK_REL}
                      className="mt-7 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-deep"
                    >
                      See current price &amp; availability on Viator →
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function KauaiMoreTours() {
  return (
    <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl text-navy md:text-4xl">
          More Kauai helicopter tours worth comparing
        </h2>
        <p className="mt-4 text-base leading-relaxed text-stone">
          The five flights above are our featured picks, but several other Kauai
          helicopter tours make sense for specific travelers.
        </p>

        <div className="mt-10 space-y-10">
          {moreTours.map((item) => {
            const tour = getTour(item.id);
            return (
              <article key={item.id} id={item.id} className="scroll-mt-28">
                <h3 className="font-display text-2xl text-navy">
                  {tour.fullName}
                </h3>
                <p className="mt-2 text-sm font-semibold text-teal">
                  Best for: {item.bestLabel}
                </p>
                <p className="mt-3 text-base leading-relaxed text-stone">
                  {item.body}
                </p>
                <a
                  href={viatorAffiliateUrl(tour.viatorUrl)}
                  target="_blank"
                  rel={VIATOR_LINK_REL}
                  className="mt-4 inline-block text-sm font-semibold text-teal hover:text-teal-bright"
                >
                  See current price &amp; availability on Viator →
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function KauaiAnswerSections() {
  return (
    <>
      <section
        id="prices"
        className="scroll-mt-28 bg-mist px-5 py-14 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            How much do helicopter tours in Kauai cost?
          </h2>
          <p className="mt-6 text-base leading-relaxed text-stone">
            Based on the tours currently included in our comparison, advertised
            Kauai helicopter tour prices range from roughly{" "}
            <strong className="font-semibold text-navy">
              $221 to $579+ per person
            </strong>
            .
          </p>
          <p className="mt-4 text-base leading-relaxed text-stone">
            That doesn’t mean the cheapest flight is automatically the best
            value. Prices vary according to factors including:
          </p>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-stone">
            {[
              "Flight duration",
              "Private vs. shared flights",
              "Doors-off vs. doors-on configuration",
              "Departure location",
              "Aircraft and seating configuration",
              "Landings or other inclusions",
              "Date and availability",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-base leading-relaxed text-stone">
            For example, a shorter shared doors-off flight may cost considerably
            less than a 60- or 75-minute experience, while private charters can
            be priced differently from standard per-seat tours.
          </p>
          <p className="mt-4 text-base leading-relaxed text-stone">
            Always compare <strong className="font-semibold text-navy">actual flight time and what’s included</strong>,
            rather than the headline price alone.
          </p>
          <p className="mt-6 text-base">
            <Link
              href="/kauai/helicopter-tour-prices"
              className="font-semibold text-teal hover:underline"
            >
              See our complete Kauai helicopter tour price comparison →
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Doors-off vs. doors-on helicopter tours in Kauai
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
            One of the biggest decisions you’ll make is whether to fly with the
            doors on or off.
          </p>

          <div className="mt-8 hidden overflow-hidden rounded-sm border border-navy/10 bg-white md:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-navy/10 bg-mist text-xs uppercase tracking-[0.08em] text-stone">
                  <th className="px-4 py-3 font-semibold" />
                  <th className="px-4 py-3 font-semibold">Doors-off</th>
                  <th className="px-4 py-3 font-semibold">Doors-on</th>
                </tr>
              </thead>
              <tbody className="text-stone">
                {[
                  ["Views", "Open, unobstructed", "Through helicopter windows"],
                  [
                    "Photography",
                    "No window reflections",
                    "Possible glass reflections",
                  ],
                  ["Wind exposure", "High", "Low"],
                  ["Comfort", "More exposed", "More sheltered"],
                  ["Experience", "More immersive", "More traditional"],
                  [
                    "Best for",
                    "Photography and adventure",
                    "General sightseeing and comfort",
                  ],
                ].map(([label, off, on]) => (
                  <tr
                    key={label}
                    className="border-b border-navy/8 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-navy">{label}</td>
                    <td className="px-4 py-3">{off}</td>
                    <td className="px-4 py-3">{on}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-stone md:mt-8">
            <p>
              A <strong className="font-semibold text-navy">doors-off helicopter tour</strong>{" "}
              makes the most sense if unobstructed views and photography are
              priorities and you don’t mind wind and exposure.
            </p>
            <p>
              A <strong className="font-semibold text-navy">doors-on flight</strong>{" "}
              is usually the more comfortable choice if you simply want to see
              Kauai from the air without the open-cabin experience.
            </p>
            <p>
              Still deciding? See our{" "}
              <Link
                href="/kauai/doors-off-helicopter-tours"
                className="font-medium text-teal hover:underline"
              >
                Best Doors-Off Helicopter Tours on Kauai
              </Link>{" "}
              comparison.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Private vs. shared Kauai helicopter tours
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
            <p>
              A private helicopter tour gives your group the aircraft rather
              than placing you on a shared sightseeing flight with other
              travelers.
            </p>
            <p>
              The biggest advantage isn’t necessarily that the scenery is
              different. It’s the experience itself: privacy, group
              configuration and, depending on the product, potentially more
              flexibility.
            </p>
            <p>
              Shared tours usually make more sense when value matters more than
              exclusivity.
            </p>
            <p>
              For couples, families and small groups comparing premium
              experiences, calculate the{" "}
              <strong className="font-semibold text-navy">
                total price for your group
              </strong>{" "}
              rather than looking only at the advertised per-person price.
            </p>
            <p>
              <Link
                href="/kauai/private-helicopter-tours"
                className="font-semibold text-teal hover:underline"
              >
                Compare private helicopter tours in Kauai →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            What can you see on a Kauai helicopter tour?
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
            <p>
              Routes differ by operator, weather and flight, but Kauai’s
              geography is the main reason helicopter sightseeing is so popular.
            </p>
            <p>
              Depending on the route and conditions, flights may provide aerial
              views of areas associated with:
            </p>
            <ul className="space-y-2">
              {[
                "Na Pali Coast",
                "Waimea Canyon",
                "Waterfalls and remote valleys",
                "Kauai’s mountainous interior",
                "North Shore coastline",
                "Areas difficult to access by road or hiking trail",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              Don’t choose a flight based only on a list of landmarks. Weather
              can affect routing, and two tours mentioning the same scenery can
              differ significantly in flight duration and how much of the island
              they cover.
            </p>
            <p>
              Check the current operator itinerary before booking if seeing a
              particular location is especially important to you.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Where do Kauai helicopter tours depart from?
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
            <p>
              Departure point matters more than many visitors initially realize.
            </p>
            <p>
              Not every Kauai helicopter tour leaves from the same place. If
              you’re staying on the North Shore, for example, a Princeville
              departure may be considerably more convenient than traveling
              farther across the island for another flight.
            </p>
            <p>Before booking, check:</p>
            <ul className="space-y-2">
              {[
                "Exact departure location",
                "Required check-in time",
                "Driving time from your accommodation",
                "Parking instructions",
                "Whether transportation is included",
                "How early you need to arrive",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              Don’t assume the tour’s advertised duration includes check-in and
              safety briefing time.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            How long are Kauai helicopter tours?
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
            <p>
              Many of the main Kauai sightseeing flights in our current
              comparison advertise roughly{" "}
              <strong className="font-semibold text-navy">
                50 to 75 minutes of flight time
              </strong>
              , although shorter options also exist.
            </p>
            <p>
              Flight duration matters because an extra 10 or 20 minutes can make
              a meaningful difference on an island sightseeing circuit.
            </p>
            <p>
              When comparing two similarly priced tours, look at the{" "}
              <strong className="font-semibold text-navy">
                published flight time
              </strong>
              , not simply the total activity duration shown by a booking
              platform.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            What should you consider when choosing a Kauai helicopter tour?
          </h2>
          <p className="mt-6 text-base leading-relaxed text-stone">
            Price and reviews are useful, but they shouldn’t be the only factors
            you compare.
          </p>
          <p className="mt-4 text-base leading-relaxed text-stone">
            Pay attention to:
          </p>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-stone">
            {[
              "Operator and aircraft information",
              "Doors-on or doors-off configuration",
              "Published flight duration",
              "Departure location",
              "Passenger and weight restrictions",
              "Seating arrangements",
              "Weather and cancellation policies",
              "Check-in requirements",
              "Route and sightseeing focus",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-display text-2xl text-navy">
            What is the safest helicopter tour in Kauai?
          </h3>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-stone">
            <p>
              We don’t label one Kauai helicopter tour as the “safest” based on
              marketplace ratings or traveler reviews.
            </p>
            <p>
              Safety should be evaluated using appropriate operator, aircraft and
              aviation information rather than a simple online review score.
              Before booking, review the operator’s published safety information
              and passenger requirements, and pay attention to weather-related
              operating and cancellation policies.
            </p>
            <p>
              A tour being ranked highly on this page does{" "}
              <strong className="font-semibold text-navy">not</strong> constitute
              a safety ranking.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Frequently asked questions about Kauai helicopter tours
          </h2>
          <div className="mt-10 space-y-8">
            {faqs.map((item) => (
              <div key={item.q}>
                <h3 className="font-display text-xl text-navy">{item.q}</h3>
                <p className="mt-3 text-base leading-relaxed text-stone">
                  {item.a}
                  {item.link && (
                    <>
                      {" "}
                      <Link
                        href={item.link.href}
                        className="font-medium text-teal hover:underline"
                      >
                        {item.link.label} →
                      </Link>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
