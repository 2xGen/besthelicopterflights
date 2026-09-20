import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  OahuCategoryChooseGuide,
  OahuCategoryRankings,
} from "@/components/oahu/OahuCategoryShared";
import { OahuCategoryNav } from "@/components/oahu/OahuCategoryNav";
import { getOahuCategory, getOahuTour } from "@/data/oahu-categories";
import { oahuTours } from "@/data/oahu-tours";
import { createPageMetadata } from "@/lib/seo";
import { VIATOR_LINK_REL, viatorAffiliateUrl } from "@/lib/viator";

const category = getOahuCategory("helicopter-tour-prices");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "oahu helicopter tour prices",
    "how much is a helicopter tour oahu",
    "oahu doors off helicopter tour price",
    "cheap helicopter tour oahu",
    "cheapest helicopter tour honolulu",
    "private helicopter tour oahu price",
  ],
});

/** Per-person sightseeing set (excludes group-priced romantic charter). */
const perPersonTours = oahuTours.filter((t) => t.id !== "romantic-landing");
const sortedByPrice = [...perPersonTours].sort(
  (a, b) => a.priceFrom - b.priceFrom,
);
const allSorted = [...oahuTours].sort((a, b) => a.priceFrom - b.priceFrom);

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
    q: "How much does a helicopter tour cost in Oahu?",
    a: "Across the per-person tours we currently track, listed from-prices span roughly $319–$1,054. Where you land in that range depends on format (doors-on/off), duration, private vs shared, departure base and specialty packages like volcano day trips.",
  },
  {
    q: "What is the cheapest helicopter tour on Oahu?",
    a: "In our current research set, the lowest listed from-price is about $319 for Rainbow’s last-minute single-passenger doors-on/off listing. Always confirm published duration before choosing on price alone.",
  },
  {
    q: "How much is a private helicopter tour in Oahu?",
    a: "In this comparison, Mauna Loa’s private all-window experience lists from about $415 per person. Rainbow’s romantic landing charter is priced separately at about $3,240 per group (up to 3) — see our private Oahu guide for the distinction.",
  },
  {
    q: "Are doors-off helicopter tours more expensive?",
    a: "Not always as a simple surcharge. On Oahu, several Rainbow products publish doors-on or doors-off as a choice on the same route family. Full-hour doors-on/off circuits sit higher than shorter landmark flights; last-minute single seats can undercut both.",
  },
  {
    q: "Are Oahu helicopter tours worth the price?",
    a: "That depends on what you are paying for. Many travelers book for Diamond Head, Pearl Harbor, Windward cliffs or North Shore views that are hard to stitch together by road in one outing. Whether a specific flight is “worth it” depends on duration, format, route fit and your budget.",
  },
  {
    q: "Is it cheaper to book a helicopter tour in Oahu in advance?",
    a: "Pricing and availability can change by date and demand. We show publicly listed from-prices, which are starting rates — not a guarantee for your preferred date. Check the live Viator product page for current availability and the price for your travel dates.",
  },
];

export default function OahuPricesCategoryPage() {
  const min = sortedByPrice[0];
  const maxPerPersonScenic = sortedByPrice.find((t) => t.id === "air-adventure")
    ?? sortedByPrice[sortedByPrice.length - 2];
  const volcano = getOahuTour("volcano-day-trip");
  const cheapestDoorsCapable = getOahuTour("last-minute-single");
  const privateTour = getOahuTour("private-all-window");
  const romantic = getOahuTour("romantic-landing");
  const northShore = getOahuTour("discover-north-shore");
  const fullHour = getOahuTour("royal-crown");

  return (
    <>
      <Header variant="solid" />
      <main className="flex-1 min-w-0 w-full max-w-full pt-[4.25rem]">
        <OahuCategoryNav currentPath={category.path} />

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
              {min.priceLabel}–{volcano.priceLabel}
              <span className="mt-2 block font-sans text-base font-normal text-white/70 md:text-lg">
                listed from-prices across the per-person Oahu tours we currently
                track (specialty group charters priced separately)
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
                label: "Cheapest doors-on/off capable",
                value: cheapestDoorsCapable.priceLabel,
                note: cheapestDoorsCapable.shortName,
              },
              {
                label: "North Shore specialty",
                value: northShore.priceLabel,
                note: northShore.shortName,
              },
              {
                label: "Private cabin benchmark",
                value: privateTour.priceLabel,
                note: privateTour.shortName,
              },
              {
                label: "Full-hour doors on/off",
                value: fullHour.priceLabel,
                note: fullHour.shortName,
              },
              {
                label: "Volcano day trip",
                value: volcano.priceLabel,
                note: volcano.shortName,
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
          <p className="mx-auto mt-6 max-w-6xl text-sm text-stone">
            Private romantic landing charter: from {romantic.priceLabel} (up to
            3) — not comparable to per-person sightseeing from-prices. Typical
            shared full-island glass circuits also sit near{" "}
            {maxPerPersonScenic.priceLabel}.
          </p>
        </section>

        <section className="bg-mist px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              Oahu helicopter tour prices compared
            </h2>
            <p className="mt-3 max-w-3xl text-base text-stone">
              All Oahu helicopter tours in our research set, sorted by listed
              from-price. Price per published flight minute is shown only where
              duration is known — it is a comparison aid, not a measure of
              scenic value.
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

        <OahuCategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What drives Oahu helicopter tour prices?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone">
              “From” prices are starting prices, not necessarily the price you
              will pay for your preferred date. These factors commonly explain
              why two Oahu flights can look very different on paper:
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
                <strong className="text-navy">Departure base:</strong> Turtle Bay
                / North Shore departures may price differently than Honolulu
                Airport–area flights because of logistics.
              </li>
              <li>
                <strong className="text-navy">Specialty:</strong> Romantic
                landings and Oahu–Hilo volcano day trips sit in different price
                structures than standard scenic flights.
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
                href="/oahu/doors-off-helicopter-tours"
                className="font-medium text-teal hover:underline"
              >
                doors-off
              </Link>
              ,{" "}
              <Link
                href="/oahu/private-helicopter-tours"
                className="font-medium text-teal hover:underline"
              >
                private
              </Link>
              ,{" "}
              <Link
                href="/oahu/photography-helicopter-tours"
                className="font-medium text-teal hover:underline"
              >
                photography
              </Link>
              , or{" "}
              <Link
                href="/oahu/volcano-helicopter-tours"
                className="font-medium text-teal hover:underline"
              >
                volcano day trips
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Oahu helicopter tour prices FAQ
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

        <OahuCategoryChooseGuide category={category} />

        <section className="border-t border-navy/8 bg-mist px-5 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              More helicopter guides
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <li>
                <Link
                  href="/oahu"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Helicopter Tours on Oahu
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Full island comparison &amp; rankings
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/oahu/volcano-helicopter-tours"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Oahu Volcano Helicopter Day Trips
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Big Island volcano packages from Oahu
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/kauai/helicopter-tour-prices"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Kauai Helicopter Tour Prices
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Compare Kauai from-prices
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
