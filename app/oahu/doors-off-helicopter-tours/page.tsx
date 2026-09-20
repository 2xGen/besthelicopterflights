import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  OahuCategoryChooseGuide,
  OahuCategoryQuickTable,
  OahuCategoryRankings,
} from "@/components/oahu/OahuCategoryShared";
import { OahuCategoryNav } from "@/components/oahu/OahuCategoryNav";
import { getOahuCategory } from "@/data/oahu-categories";
import { createPageMetadata } from "@/lib/seo";

const category = getOahuCategory("doors-off-helicopter-tours");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "oahu doors off helicopter tours",
    "best doors off helicopter tour oahu",
    "oahu doors off helicopter tour",
    "doors off helicopter tour honolulu",
    "doors off helicopter oahu",
    "best doors off helicopter tours oahu",
    "oahu helicopter tours doors off",
    "rainbow helicopters doors off",
  ],
});

export default function OahuDoorsOffCategoryPage() {
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
            <p className="mt-4 max-w-2xl text-sm text-white/55">
              Looking for the broader island comparison? See{" "}
              <Link href="/oahu" className="text-teal-bright hover:underline">
                Best Helicopter Tours on Oahu
              </Link>
              .
            </p>
          </div>
        </section>

        <OahuCategoryQuickTable
          category={category}
          footnote="On Oahu, the doors-off products in this set are published as doors-on or doors-off choices rather than doors-off-only flights. Confirm the cabin configuration you want when booking."
        />
        <OahuCategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What is a doors-off helicopter tour?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                A doors-off helicopter tour flies with the cabin doors removed
                (or configured open) so passengers get an open-air view of the
                landscape. On Oahu, that usually means clearer sightlines for
                Diamond Head, Windward cliffs, coastline and Pearl Harbor — and
                a more immersive ride than a standard enclosed doors-on flight.
              </p>
              <p>
                Travelers often describe doors-off helicopter tours as closer to
                “flying” than looking out a window. The tradeoff is more wind and
                exposure, which is why many visitors compare doors-off vs
                doors-on before booking an Oahu helicopter tour.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Why choose a doors-off helicopter tour in Oahu?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                Oahu packs famous landmarks into a compact island. A doors-off
                helicopter flight can make Diamond Head, the Koʻolau ridges,
                Sacred Falls and the North Shore feel immediate — especially for
                photography — because there is no window glass between you and
                the scenery.
              </p>
              <p>
                Based on published product formats in our set, several Honolulu
                flights let you choose doors-on or doors-off on the same route
                family. That flexibility is useful when one traveler wants
                open-air immersion and another prefers a more sheltered cabin —
                or when you want to compare both options before locking a
                booking.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Doors-off vs. doors-on helicopter tours
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
              Neither format is universally “better.” The right choice depends
              on photography goals, comfort preferences and who is flying with
              you.
            </p>
            <div className="mt-8 space-y-3 md:hidden">
              {[
                ["Views", "Unobstructed open-air sightlines", "Through windows"],
                [
                  "Photography",
                  "Excellent for many shooters",
                  "Good, with glass/reflection considerations",
                ],
                ["Wind", "Higher exposure", "Lower exposure"],
                ["Comfort", "More exposed", "More sheltered"],
                ["Best for", "Photography / immersion", "Comfort / mixed groups"],
              ].map(([label, off, on]) => (
                <div
                  key={label}
                  className="border border-navy/10 bg-white px-4 py-4"
                >
                  <p className="font-medium text-navy">{label}</p>
                  <dl className="mt-3 space-y-2 text-sm text-stone">
                    <div>
                      <dt className="text-xs uppercase tracking-[0.08em] text-stone-light">
                        Doors-off
                      </dt>
                      <dd className="mt-0.5">{off}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.08em] text-stone-light">
                        Doors-on
                      </dt>
                      <dd className="mt-0.5">{on}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
            <div className="mt-8 hidden overflow-hidden rounded-sm border border-navy/10 bg-white md:block">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-navy/10 bg-mist-soft text-xs uppercase tracking-[0.08em] text-stone">
                    <th className="px-4 py-3 font-semibold" />
                    <th className="px-4 py-3 font-semibold">Doors-Off</th>
                    <th className="px-4 py-3 font-semibold">Doors-On</th>
                  </tr>
                </thead>
                <tbody className="text-stone">
                  {[
                    ["Views", "Unobstructed open-air sightlines", "Through windows"],
                    [
                      "Photography",
                      "Excellent for many shooters",
                      "Good, with glass/reflection considerations",
                    ],
                    ["Wind", "Higher exposure", "Lower exposure"],
                    ["Comfort", "More exposed", "More sheltered"],
                    [
                      "Best for",
                      "Photography / immersion",
                      "Comfort / mixed groups",
                    ],
                  ].map(([label, off, on]) => (
                    <tr
                      key={label}
                      className="border-b border-navy/8 last:border-0"
                    >
                      <td className="px-4 py-3 font-medium text-navy">
                        {label}
                      </td>
                      <td className="px-4 py-3">{off}</td>
                      <td className="px-4 py-3">{on}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-stone">
              Prefer to compare every Oahu product type? See{" "}
              <Link
                href="/oahu"
                className="font-medium text-teal hover:underline"
              >
                all Oahu helicopter tours
              </Link>{" "}
              including private, North Shore and full-island options.
            </p>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              How much does a doors-off helicopter tour in Oahu cost?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                Among the doors-off-capable helicopter tours in this comparison,
                listed from-prices currently span roughly{" "}
                <strong className="font-semibold text-navy">$319–$540</strong>{" "}
                per person. Shorter landmark flights and last-minute single seats
                sit lower; the full-hour Royal Crown circuit sits higher. “From”
                rates change with dates, demand and booking channel.
              </p>
              <p>
                For the wider island picture — including private charters, Turtle
                Bay departures and specialty products — see our{" "}
                <Link
                  href="/oahu"
                  className="font-medium text-teal hover:underline"
                >
                  Best Helicopter Tours on Oahu
                </Link>{" "}
                comparison.
              </p>
            </div>
          </div>
        </section>

        <OahuCategoryChooseGuide category={category} />

        <section className="bg-navy px-5 py-14 text-white md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl">
              What to know before booking
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/75">
              <p>
                Before you book an Oahu doors-off helicopter tour, check the
                operator’s current published terms on the live product page for:
              </p>
              <ul className="space-y-2 pl-1">
                {[
                  "Whether your booking is doors-off or doors-on (when both are offered)",
                  "Weight restrictions and passenger limits",
                  "Weather and cancellation / reschedule policies",
                  "Check-in timing and departure location",
                  "Photography rules (loose items, straps, phones)",
                  "Guidance on motion sickness and what to wear for wind exposure",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-bright" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                We intentionally point you to each Viator product listing for
                those details rather than inventing generic rules — booking
                terms can differ by operator and change over time.
              </p>
            </div>
          </div>
        </section>

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
                  href="/oahu/private-helicopter-tours"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Private Helicopter Tours on Oahu
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Private cabin &amp; romantic landing options
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/kauai/doors-off-helicopter-tours"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Doors-Off Helicopter Tours on Kauai
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Compare Kauai open-air flights
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
