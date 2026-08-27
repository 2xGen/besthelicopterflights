import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  CategoryChooseGuide,
  CategoryRankings,
} from "@/components/kauai/CategoryShared";
import { KauaiCategoryNav } from "@/components/kauai/KauaiCategoryNav";
import { KauaiRelatedCategories } from "@/components/kauai/KauaiRelatedCategories";
import { getCategory, getTour } from "@/data/kauai-categories";
import { kauaiTours } from "@/data/kauai-tours";
import { createPageMetadata } from "@/lib/seo";
import { viatorAffiliateUrl } from "@/lib/viator";

const category = getCategory("helicopter-tour-prices");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "kauai helicopter tour prices",
    "how much is a helicopter tour kauai",
    "kauai doors off helicopter tour price",
    "cheap helicopter tour kauai",
    "cheapest helicopter tour kauai",
    "private helicopter tour kauai price",
  ],
});

const sortedByPrice = [...kauaiTours].sort(
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
    q: "How much does a helicopter tour cost in Kauai?",
    a: "Across the tours we currently track, listed from-prices span roughly $221–$579 per person. Where you land in that range depends on format (doors-off vs doors-on), duration, private vs shared, and specialty products like canyon landings.",
  },
  {
    q: "What is the cheapest helicopter tour on Kauai?",
    a: "In our current research set, the lowest listed from-price is about $221 for Jack Harter’s Heart of the Island doors-off tour. Always confirm published duration and route coverage before choosing on price alone.",
  },
  {
    q: "How much is a private helicopter tour in Kauai?",
    a: "In this comparison, the private Aliʻi doors-off charter lists from about $425 per person. Private-style all-window options can start lower — see our private Kauai guide for the distinction.",
  },
  {
    q: "Are doors-off helicopter tours more expensive?",
    a: "Not always. Doors-off from-prices in our set start around $221 and run into the mid–high $400s, while some doors-on and specialty flights sit elsewhere in the range. Format is one price driver among several — not a simple premium surcharge on every product.",
  },
  {
    q: "Are Kauai helicopter tours worth the price?",
    a: "That depends on what you are paying for. Many travelers book because remote Na Pali, canyon and waterfall scenery is hard to reach by road. Whether a specific flight is “worth it” depends on duration, format, route fit and your budget — which is why we compare product-level from-prices rather than a single average.",
  },
  {
    q: "Is it cheaper to book a helicopter tour in Kauai in advance?",
    a: "Pricing and availability can change by date and demand. We show publicly listed from-prices, which are starting rates — not a guarantee for your preferred date. Check the live Viator product page for current availability and the price for your travel dates.",
  },
];

export default function PricesCategoryPage() {
  const min = sortedByPrice[0];
  const max = sortedByPrice[sortedByPrice.length - 1];
  const cheapestDoorsOff = getTour("heart-of-island");
  const waterfall = getTour("waterfall-safari");
  const privateTour = getTour("private-doors-off");
  const mostExpensive = max;
  const midTypicalLow = getTour("waterfall-safari");
  const midTypicalHigh = getTour("luxury-doors-off");

  return (
    <>
      <Header variant="solid" />
      <main className="flex-1 pt-[4.25rem]">
        <KauaiCategoryNav currentPath={category.path} />

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
                listed from-prices across the Kauai tours we currently track
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
                label: "Cheapest doors-off",
                value: cheapestDoorsOff.priceLabel,
                note: cheapestDoorsOff.shortName,
              },
              {
                label: "Typical mid-range examples",
                value: `${midTypicalLow.priceLabel}–${midTypicalHigh.priceLabel}`,
                note: "Waterfall safari to full-hour doors-off",
              },
              {
                label: "Private benchmark",
                value: privateTour.priceLabel,
                note: privateTour.shortName,
              },
              {
                label: "Waterfall safari from",
                value: waterfall.priceLabel,
                note: waterfall.shortName,
              },
              {
                label: "Highest in our set",
                value: mostExpensive.priceLabel,
                note: mostExpensive.shortName,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-sm border border-navy/10 bg-white px-5 py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-teal">
                  {item.label}
                </p>
                <p className="mt-2 font-display text-2xl text-navy">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-stone">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-mist px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              Kauai helicopter tour prices compared
            </h2>
            <p className="mt-3 max-w-3xl text-base text-stone">
              All Kauai helicopter tours in our research set, sorted by listed
              from-price. Price per published flight minute is shown only where
              duration is known — it is a comparison aid, not a measure of
              scenic value.
            </p>
            <div className="mt-8 overflow-x-auto rounded-sm border border-navy/10 bg-white">
              <table className="min-w-[780px] w-full border-collapse text-left text-sm">
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
                  {sortedByPrice.map((tour) => (
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
                          rel="sponsored noopener noreferrer"
                          className="whitespace-nowrap text-sm font-semibold text-teal hover:text-teal-bright"
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

        <CategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What drives Kauai helicopter tour prices?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone">
              “From” prices are starting prices, not necessarily the price you
              will pay for your preferred date. These factors commonly explain
              why two Kauai flights can look very different on paper:
            </p>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-stone">
              <li>
                <strong className="text-navy">Format:</strong> Doors-off vs
                doors-on changes the experience — and often the price band.
              </li>
              <li>
                <strong className="text-navy">Private vs shared:</strong>{" "}
                Exclusive cabin use usually sits above shared sightseeing, even
                when the scenery overlaps.
              </li>
              <li>
                <strong className="text-navy">Duration:</strong> Longer published
                flight times usually cost more than shorter overview flights.
              </li>
              <li>
                <strong className="text-navy">Aircraft / seating:</strong>{" "}
                All-window or specialty seating configurations can affect
                pricing versus standard shared layouts.
              </li>
              <li>
                <strong className="text-navy">Specialty:</strong> Canyon landings
                and private waterfall products can sit above standard scenic
                rates.
              </li>
              <li>
                <strong className="text-navy">Departure base:</strong>{" "}
                Princeville departures may price differently than other
                heliports because of logistics.
              </li>
              <li>
                <strong className="text-navy">Date and demand:</strong> Live
                prices move with seasonality, remaining seats and booking
                channel.
              </li>
            </ul>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Dig into specific intents next:{" "}
              <Link
                href="/kauai/doors-off-helicopter-tours"
                className="font-medium text-teal hover:underline"
              >
                doors-off
              </Link>
              ,{" "}
              <Link
                href="/kauai/private-helicopter-tours"
                className="font-medium text-teal hover:underline"
              >
                private
              </Link>
              ,{" "}
              <Link
                href="/kauai/waterfall-helicopter-tours"
                className="font-medium text-teal hover:underline"
              >
                waterfalls
              </Link>
              , or{" "}
              <Link
                href="/kauai/photography-helicopter-tours"
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
              Kauai helicopter tour prices FAQ
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

        <CategoryChooseGuide category={category} />
        <KauaiRelatedCategories excludeHref={category.path} />
      </main>
      <Footer />
    </>
  );
}
