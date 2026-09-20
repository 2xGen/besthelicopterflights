import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  BigIslandCategoryChooseGuide,
  BigIslandCategoryRankings,
} from "@/components/big-island/BigIslandCategoryShared";
import { BigIslandCategoryNav } from "@/components/big-island/BigIslandCategoryNav";
import {
  getBigIslandCategory,
  getBigIslandTour,
} from "@/data/big-island-categories";
import { bigIslandTours } from "@/data/big-island-tours";
import { createPageMetadata } from "@/lib/seo";
import { VIATOR_LINK_REL, viatorAffiliateUrl } from "@/lib/viator";

const category = getBigIslandCategory("helicopter-tour-prices");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "big island helicopter tour prices",
    "how much is a helicopter tour big island",
    "kilauea helicopter tour cost",
    "kona helicopter tour price",
    "cheap helicopter tour big island",
  ],
});

/** Exclude group-priced romance charter from per-person range headline. */
const perPersonTours = bigIslandTours.filter(
  (t) => t.id !== "romantic-kona-coffee-landing",
);
const sortedByPrice = [...perPersonTours].sort(
  (a, b) => a.priceFrom - b.priceFrom,
);
const allSorted = [...bigIslandTours].sort(
  (a, b) => a.priceFrom - b.priceFrom,
);

function pricePerMinute(priceFrom: number, minutes: number | null) {
  if (!minutes) return null;
  return priceFrom / minutes;
}

function formatPerMinute(value: number | null) {
  if (value == null) return "—";
  return `~$${value.toFixed(2)}`;
}

const faqs = [
  {
    q: "How much does a helicopter tour cost on the Big Island?",
    a: "Across the per-person tours we currently track, listed from-prices span roughly $241–$1,180. Specialty group romance packages are priced separately. Where you land depends on duration, doors-on/off format, private vs shared, departure base and whether Kīlauea is included.",
  },
  {
    q: "What is the cheapest helicopter tour on the Big Island?",
    a: "In our current set, the lowest listed from-price is about $241 for Mauna Loa’s private 30-minute Kona Coast hop. Confirm duration and route before treating it as equivalent to a volcano circuit.",
  },
  {
    q: "How much is a Kīlauea helicopter tour?",
    a: "Volcano-focused products in our set range from about $406 (Hilo park Safari) to about $1,180 (Rainbow’s 105-minute doors-on/off Kīlauea circuit). See our Kīlauea guide for departure-base differences.",
  },
  {
    q: "Are doors-off helicopter tours more expensive?",
    a: "Doors-on/off Rainbow products sit across mid to premium bands. Longer volcano circuits cost more than shorter Kona coastal hops — format alone does not explain the full price gap.",
  },
];

export default function BigIslandPricesPage() {
  const min = sortedByPrice[0];
  const max = sortedByPrice[sortedByPrice.length - 1];
  const kilauea = getBigIslandTour("kilauea-eruption-105");
  const safari = getBigIslandTour("volcanoes-safari");
  const spectacular = getBigIslandTour("big-island-spectacular");
  const privateTour = getBigIslandTour("private-big-island-experience");
  const romantic = getBigIslandTour("romantic-kona-coffee-landing");

  return (
    <>
      <Header variant="solid" />
      <main className="flex-1 min-w-0 w-full max-w-full pt-[4.25rem]">
        <BigIslandCategoryNav currentPath={category.path} />

        <section className="bg-navy-deep px-5 pb-14 pt-12 text-white md:px-8 md:pb-20 md:pt-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-bright">
              {category.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-5xl md:leading-[1.12]">
              {category.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              {category.intro}
            </p>
            <p className="mt-8 max-w-2xl font-display text-3xl leading-snug text-white md:text-4xl">
              {min.priceLabel}–{max.priceLabel}
              <span className="mt-2 block font-sans text-base font-normal text-white/70 md:text-lg">
                listed from-prices across the per-person Big Island tours we
                currently track (specialty group charters priced separately)
              </span>
            </p>
          </div>
        </section>

        <section className="border-b border-navy/8 bg-mist-soft px-5 py-12 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: "Cheapest in our set",
                value: min.priceLabel,
                note: min.shortName,
              },
              {
                label: "Hilo volcano value",
                value: safari.priceLabel,
                note: safari.shortName,
              },
              {
                label: "Private full-island",
                value: privateTour.priceLabel,
                note: privateTour.shortName,
              },
              {
                label: "Waikoloa Spectacular",
                value: spectacular.priceLabel,
                note: spectacular.shortName,
              },
              {
                label: "Kīlauea doors on/off",
                value: kilauea.priceLabel,
                note: kilauea.shortName,
              },
              {
                label: "Romantic coffee landing",
                value: romantic.priceLabel,
                note: romantic.shortName,
              },
            ].map((card) => (
              <div
                key={card.label}
                className="border border-navy/10 bg-white px-5 py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-stone-light">
                  {card.label}
                </p>
                <p className="mt-2 font-display text-3xl text-navy">
                  {card.value}
                </p>
                <p className="mt-2 text-sm text-stone">{card.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-mist px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              Big Island helicopter tour prices compared
            </h2>
            <p className="mt-3 max-w-3xl text-base text-stone">
              All Big Island helicopter tours in our research set, sorted by
              listed from-price. Price per published flight minute is shown only
              where duration is known.
            </p>

            <ul className="mt-8 space-y-3 md:hidden">
              {allSorted.map((tour) => (
                <li
                  key={tour.id}
                  className="border border-navy/10 bg-white px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-navy">{tour.shortName}</p>
                      <p className="mt-0.5 text-xs text-stone-light">
                        {tour.supplier}
                      </p>
                    </div>
                    <p className="shrink-0 font-medium text-navy">
                      {tour.priceLabel}
                    </p>
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-stone">
                    <div>
                      <dt className="text-xs uppercase tracking-[0.08em] text-stone-light">
                        Type
                      </dt>
                      <dd className="mt-0.5">{tour.bestFor}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.08em] text-stone-light">
                        Duration
                      </dt>
                      <dd className="mt-0.5">{tour.duration}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-xs uppercase tracking-[0.08em] text-stone-light">
                        Price / published min
                      </dt>
                      <dd className="mt-0.5">
                        {formatPerMinute(
                          pricePerMinute(tour.priceFrom, tour.durationMinutes),
                        )}
                      </dd>
                    </div>
                  </dl>
                  <a
                    href={viatorAffiliateUrl(tour.viatorUrl)}
                    target="_blank"
                    rel={VIATOR_LINK_REL}
                    className="mt-4 inline-block text-sm font-semibold text-teal hover:text-teal-bright"
                  >
                    Check price →
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 hidden overflow-hidden rounded-sm border border-navy/10 bg-white md:block">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-navy/10 bg-mist-soft text-xs uppercase tracking-[0.08em] text-stone">
                    <th className="px-4 py-3 font-semibold">Tour</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Duration</th>
                    <th className="px-4 py-3 font-semibold">From</th>
                    <th className="px-4 py-3 font-semibold">
                      Price / published min
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      <span className="sr-only">Book</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allSorted.map((tour) => (
                    <tr
                      key={tour.id}
                      className="border-b border-navy/8 last:border-0"
                    >
                      <td className="px-4 py-4">
                        <p className="font-medium text-navy">{tour.shortName}</p>
                        <p className="mt-0.5 text-xs text-stone-light">
                          {tour.supplier}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-stone">{tour.bestFor}</td>
                      <td className="px-4 py-4 text-stone">{tour.duration}</td>
                      <td className="px-4 py-4 font-medium text-navy">
                        {tour.priceLabel}
                      </td>
                      <td className="px-4 py-4 text-stone">
                        {formatPerMinute(
                          pricePerMinute(tour.priceFrom, tour.durationMinutes),
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <a
                          href={viatorAffiliateUrl(tour.viatorUrl)}
                          target="_blank"
                          rel={VIATOR_LINK_REL}
                          className="text-sm font-semibold text-teal hover:text-teal-bright"
                        >
                          Check price →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-stone-light">
              “From” prices are publicly listed starting rates — not necessarily
              the price for your preferred date. We may earn a commission if you
              book through Viator.
            </p>
          </div>
        </section>

        <BigIslandCategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What drives Big Island helicopter tour prices?
            </h2>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-stone">
              {[
                ["Format", "Doors-off vs doors-on and private vs shared cabins"],
                ["Duration", "Longer published flight times usually cost more"],
                [
                  "Route",
                  "Kīlauea island-crossings price differently than short Kona or Kohala hops",
                ],
                [
                  "Departure base",
                  "Kona, Waikoloa and Hilo logistics change product structure",
                ],
                [
                  "Landings",
                  "Exclusive waterfall stops sit above standard overflights",
                ],
                [
                  "Date and demand",
                  "Live prices move with seasonality and remaining seats",
                ],
              ].map(([label, text]) => (
                <li key={label}>
                  <strong className="text-navy">{label}:</strong> {text}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Dig into specific intents:{" "}
              <Link
                href="/big-island/doors-off-helicopter-tours"
                className="font-medium text-teal hover:underline"
              >
                doors-off
              </Link>
              ,{" "}
              <Link
                href="/big-island/kilauea-volcano"
                className="font-medium text-teal hover:underline"
              >
                Kīlauea
              </Link>
              , or{" "}
              <Link
                href="/big-island/photography-helicopter-tours"
                className="font-medium text-teal hover:underline"
              >
                photography
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Big Island helicopter tour prices FAQ
            </h2>
            <div className="mt-10 space-y-8">
              {faqs.map((item) => (
                <div key={item.q}>
                  <h3 className="font-display text-xl text-navy">{item.q}</h3>
                  <p className="mt-3 text-base leading-relaxed text-stone">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BigIslandCategoryChooseGuide category={category} />

        <section className="border-t border-navy/8 bg-mist px-5 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              More helicopter guides
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <li>
                <Link
                  href="/big-island"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Helicopter Tours on the Big Island
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Full island comparison &amp; rankings
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/big-island/kilauea-volcano"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Kīlauea Volcano Helicopter Tours
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Volcano-focused rankings
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/maui/helicopter-tour-prices"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Maui Helicopter Tour Prices
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Compare Maui from-prices
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
