import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  CategoryChooseGuide,
  CategoryQuickTable,
  CategoryRankings,
} from "@/components/kauai/CategoryShared";
import { KauaiCategoryNav } from "@/components/kauai/KauaiCategoryNav";
import { KauaiRelatedCategories } from "@/components/kauai/KauaiRelatedCategories";
import { getCategory } from "@/data/kauai-categories";
import { createPageMetadata } from "@/lib/seo";

const category = getCategory("doors-off-helicopter-tours");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "kauai doors off helicopter tours",
    "best doors off helicopter tour kauai",
    "kauai doors off helicopter tour",
    "doors off helicopter tour kauai",
    "doors off helicopter kauai",
    "best doors off helicopter tours kauai",
    "kauai helicopter tours doors off",
    "kauai doors off helicopter rides",
  ],
});

export default function DoorsOffCategoryPage() {
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
            <p className="mt-4 max-w-2xl text-sm text-white/55">
              Looking for the broader island comparison? See{" "}
              <Link href="/kauai" className="text-teal-bright hover:underline">
                Best Helicopter Tours on Kauai
              </Link>
              .
            </p>
          </div>
        </section>

        <CategoryQuickTable category={category} />
        <CategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What is a doors-off helicopter tour?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                A doors-off helicopter tour flies with the cabin doors removed
                (or configured open) so passengers get an open-air view of the
                landscape. On Kauai, that usually means clearer sightlines for
                cliffs, valleys and waterfalls — and a more immersive doors-off
                helicopter ride than a standard enclosed doors-on flight.
              </p>
              <p>
                Travelers often describe doors-off helicopter tours as closer to
                “flying” than looking out a window. The tradeoff is more wind and
                exposure, which is why many visitors compare doors-off vs
                doors-on before booking a Kauai helicopter tour.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Why choose a doors-off helicopter tour in Kauai?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                Kauai rewards aerial viewing: stretches of the Na Pali Coast,
                Waimea Canyon country and remote waterfall valleys are hard to
                reach by road. A doors-off helicopter flight can make those
                views feel immediate — especially for photography — because
                there is no window glass between you and the scenery.
              </p>
              <p>
                Based on traveler feedback patterns across doors-off products,
                reviewers frequently mention unobstructed views, waterfall
                photography and the feeling of open-air flying. Wind is part of
                the experience; travelers who want a more sheltered ride often
                compare{" "}
                <Link
                  href="/kauai/helicopter-tour-prices"
                  className="font-medium text-teal hover:underline"
                >
                  doors-on price options
                </Link>{" "}
                as well.
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
            <div className="mt-8 overflow-x-auto rounded-sm border border-navy/10 bg-white">
              <table className="min-w-[520px] w-full border-collapse text-left text-sm">
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
                    ["Photography", "Excellent for many shooters", "Good, with glass/reflection considerations"],
                    ["Wind", "Higher exposure", "Lower exposure"],
                    ["Comfort", "More exposed", "More sheltered"],
                    ["Best for", "Photography / immersion", "Comfort / mixed groups"],
                  ].map(([label, off, on]) => (
                    <tr key={label} className="border-b border-navy/8 last:border-0">
                      <td className="px-4 py-3 font-medium text-navy">{label}</td>
                      <td className="px-4 py-3">{off}</td>
                      <td className="px-4 py-3">{on}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-stone">
              Prefer a doors-on flight? Compare{" "}
              <Link
                href="/kauai"
                className="font-medium text-teal hover:underline"
              >
                all Kauai helicopter tours
              </Link>{" "}
              including Air Kauai’s Ohana doors-on option on the main rankings
              page.
            </p>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              How much does a doors-off helicopter tour in Kauai cost?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                Among the doors-off helicopter tours in this comparison,
                listed from-prices currently span roughly{" "}
                <strong className="font-semibold text-navy">$221–$460+</strong>{" "}
                per person. Private doors-off experiences can price differently
                from shared flights, and “from” rates change with dates, demand
                and booking channel.
              </p>
              <p>
                For a wider island price picture — including waterfall,
                eco-sightseeing and doors-on products — see our{" "}
                <Link
                  href="/kauai/helicopter-tour-prices"
                  className="font-medium text-teal hover:underline"
                >
                  Kauai Helicopter Tour Prices
                </Link>{" "}
                guide.
              </p>
            </div>
          </div>
        </section>

        <CategoryChooseGuide category={category} />

        <section className="bg-navy px-5 py-14 text-white md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl">
              What to know before booking
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/75">
              <p>
                Before you book a Kauai doors-off helicopter tour, check the
                operator’s current published terms on the live product page for:
              </p>
              <ul className="space-y-2 pl-1">
                {[
                  "Weight restrictions and passenger limits",
                  "Seating arrangements and whether all seats are window/open-air",
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

        <KauaiRelatedCategories excludeHref={category.path} />
      </main>
      <Footer />
    </>
  );
}
