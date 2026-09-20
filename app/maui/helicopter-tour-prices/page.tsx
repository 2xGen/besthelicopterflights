import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  MauiCategoryChooseGuide,
  MauiCategoryRankings,
} from "@/components/maui/MauiCategoryShared";
import { MauiCategoryNav } from "@/components/maui/MauiCategoryNav";
import { getMauiCategory, getMauiTour } from "@/data/maui-categories";
import { mauiTours } from "@/data/maui-tours";
import { createPageMetadata } from "@/lib/seo";
import { VIATOR_LINK_REL, viatorAffiliateUrl } from "@/lib/viator";

const category = getMauiCategory("helicopter-tour-prices");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "maui helicopter tour prices",
    "how much is a helicopter tour maui",
    "maui doors off helicopter tour price",
    "cheap helicopter tour maui",
    "maui molokai helicopter cost",
    "blue hawaiian maui price",
  ],
});

const sortedByPrice = [...mauiTours].sort(
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
    q: "How much does a helicopter tour cost in Maui?",
    a: "Across the tours we currently track, listed from-prices span roughly $316–$663. Where you land in that range depends on format (doors-off vs doors-on), duration, East Maui vs West Maui / Molokai focus, exclusive landings and combo day packages.",
  },
  {
    q: "What is the cheapest helicopter tour on Maui?",
    a: "In our current research set, the lowest listed from-price is about $316 for Air Maui’s Bird’s Eye View 30-minute intro flight. Always confirm published duration and route before choosing on price alone.",
  },
  {
    q: "How much is a doors-off helicopter tour in Maui?",
    a: "Air Maui’s doors-off West Maui & Molokai flight lists from about $452 per person in our set — typically above doors-on 45-minute siblings on the same route family.",
  },
  {
    q: "How much do exclusive landing helicopter tours cost on Maui?",
    a: "In this comparison, landing specialties range from about $406 (Hana rainforest landing) and $472 (oceanfront landing) up to about $663 for Blue Hawaiian’s Spectacular ranch landing package.",
  },
  {
    q: "Are Maui helicopter tours worth the price?",
    a: "That depends on what you are paying for. Many travelers book for West Maui valleys, Molokai sea cliffs, Hana rainforest or Haleakala views that are hard to stitch together by road. Whether a specific flight is “worth it” depends on duration, format, route fit and your budget.",
  },
  {
    q: "Is it cheaper to book a helicopter tour in Maui in advance?",
    a: "Pricing and availability can change by date and demand. We show publicly listed from-prices, which are starting rates — not a guarantee for your preferred date. Check the live Viator product page for current availability and the price for your travel dates.",
  },
];

export default function MauiPricesCategoryPage() {
  const min = sortedByPrice[0];
  const max = sortedByPrice[sortedByPrice.length - 1];
  const doorsOff = getMauiTour("doors-off-west-maui-molokai");
  const complete = getMauiTour("complete-island-60");
  const spectacular = getMauiTour("spectacular-landing");
  const hana = getMauiTour("hana-haleakala-air-maui");
  const oceanfront = getMauiTour("oceanfront-landing");

  return (
    <>
      <Header variant="solid" />
      <main className="flex-1 min-w-0 w-full max-w-full pt-[4.25rem]">
        <MauiCategoryNav currentPath={category.path} />

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
                listed from-prices across the Maui helicopter tours we currently
                track
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
                label: "East Maui specialty",
                value: hana.priceLabel,
                note: hana.shortName,
              },
              {
                label: "Doors-off benchmark",
                value: doorsOff.priceLabel,
                note: doorsOff.shortName,
              },
              {
                label: "Oceanfront landing",
                value: oceanfront.priceLabel,
                note: oceanfront.shortName,
              },
              {
                label: "Full-island hour",
                value: complete.priceLabel,
                note: complete.shortName,
              },
              {
                label: "Premium ranch landing",
                value: spectacular.priceLabel,
                note: spectacular.shortName,
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
              Maui helicopter tour prices compared
            </h2>
            <p className="mt-3 max-w-3xl text-base text-stone">
              All Maui helicopter tours in our research set, sorted by listed
              from-price. Price per published flight minute is shown only where
              duration is known — it is a comparison aid, not a measure of
              scenic value.
            </p>

            <ul className="mt-8 space-y-3 md:hidden">
              {sortedByPrice.map((tour) => (
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

        <MauiCategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What drives Maui helicopter tour prices?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone">
              “From” prices are starting prices, not necessarily the price you
              will pay for your preferred date. These factors commonly explain
              why two Maui flights can look very different on paper:
            </p>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-stone">
              <li>
                <strong className="text-navy">Format:</strong> Doors-off vs
                doors-on changes the experience — and often the price band.
              </li>
              <li>
                <strong className="text-navy">Duration:</strong> Longer published
                flight times usually cost more than shorter overview flights.
              </li>
              <li>
                <strong className="text-navy">Route focus:</strong> West Maui /
                Molokai, East Maui / Haleakala and three-island circuits price
                differently based on coverage.
              </li>
              <li>
                <strong className="text-navy">Landings:</strong> Exclusive ranch,
                oceanfront or Hana valley stops sit above standard overflights.
              </li>
              <li>
                <strong className="text-navy">Combo days:</strong> Road to Hana +
                helicopter packages bundle ground logistics, not just flight
                time.
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
                href="/maui/doors-off-helicopter-tours"
                className="font-medium text-teal hover:underline"
              >
                doors-off
              </Link>
              ,{" "}
              <Link
                href="/maui/private-helicopter-tours"
                className="font-medium text-teal hover:underline"
              >
                exclusive landings
              </Link>
              , or{" "}
              <Link
                href="/maui/photography-helicopter-tours"
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
              Maui helicopter tour prices FAQ
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

        <MauiCategoryChooseGuide category={category} />

        <section className="border-t border-navy/8 bg-mist px-5 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              More helicopter guides
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <li>
                <Link
                  href="/maui"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Helicopter Tours on Maui
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Full island comparison &amp; rankings
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/maui/helicopter-tour-operators"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Helicopter Tour Operators on Maui
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Compare companies side by side
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/oahu/helicopter-tour-prices"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Oahu Helicopter Tour Prices
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Compare Oahu from-prices
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
