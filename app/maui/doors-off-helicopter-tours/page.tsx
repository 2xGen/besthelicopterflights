import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  MauiCategoryChooseGuide,
  MauiCategoryQuickTable,
  MauiCategoryRankings,
} from "@/components/maui/MauiCategoryShared";
import { MauiCategoryNav } from "@/components/maui/MauiCategoryNav";
import { getMauiCategory } from "@/data/maui-categories";
import { createPageMetadata } from "@/lib/seo";

const category = getMauiCategory("doors-off-helicopter-tours");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "maui doors off helicopter tours",
    "best doors off helicopter tour maui",
    "doors off helicopter maui",
    "air maui doors off",
    "west maui molokai doors off",
    "doors off helicopter tour kahului",
  ],
});

export default function MauiDoorsOffCategoryPage() {
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
            <p className="mt-4 max-w-2xl text-sm text-white/55">
              Looking for the broader island comparison? See{" "}
              <Link href="/maui" className="text-teal-bright hover:underline">
                Best Helicopter Tours on Maui
              </Link>
              .
            </p>
          </div>
        </section>

        <MauiCategoryQuickTable
          category={category}
          footnote="In our current Maui set, only Air Maui’s West Maui & Molokai product is published as doors-off. The other ranked flights are doors-on alternatives on related routes — useful when open cabin is unavailable or not preferred."
        />
        <MauiCategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What is a doors-off helicopter tour?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                A doors-off helicopter tour flies with the cabin doors removed
                (or configured open) so passengers get an open-air view of the
                landscape. On Maui, that usually means clearer sightlines for
                West Maui valleys, waterfalls and Molokai’s towering sea cliffs —
                and a more immersive ride than a standard enclosed doors-on
                flight.
              </p>
              <p>
                Travelers often describe doors-off flights as closer to “flying”
                than looking out a window. The tradeoff is more wind and
                exposure, which is why many visitors compare doors-off vs
                doors-on before booking a Maui helicopter tour.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Why choose a doors-off helicopter tour in Maui?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                Much of Maui’s most dramatic terrain is hard to reach by road.
                A doors-off flight can make West Maui ridgelines and Molokai’s
                north-shore cliffs feel immediate — especially for photography —
                because there is no window glass between you and the scenery.
              </p>
              <p>
                Based on published products in our set, Maui has fewer
                doors-off listings than Oahu. That makes Air Maui’s open-cabin
                West Maui & Molokai flight the clear starting point when doors-off
                is non-negotiable, with doors-on siblings available when comfort
                or inventory matters more.
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
              Prefer to compare every Maui product type? See{" "}
              <Link
                href="/maui"
                className="font-medium text-teal hover:underline"
              >
                all Maui helicopter tours
              </Link>{" "}
              including landings, Hana / Haleakala and full-island options.
            </p>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              How much does a doors-off helicopter tour in Maui cost?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                In our current set, Maui’s doors-off flight lists from about{" "}
                <strong className="font-semibold text-navy">$452</strong> per
                person. Closely related doors-on West Maui / Molokai flights sit
                lower (from about $368) or higher for longer durations. “From”
                rates change with dates, demand and booking channel.
              </p>
              <p>
                For the wider island picture — including landings, East Maui and
                combo days — see{" "}
                <Link
                  href="/maui/helicopter-tour-prices"
                  className="font-medium text-teal hover:underline"
                >
                  Maui Helicopter Tour Prices
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <MauiCategoryChooseGuide category={category} />

        <section className="bg-navy px-5 py-14 text-white md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl">
              What to know before booking
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/75">
              <p>
                Before you book a Maui doors-off helicopter tour, check the
                operator’s current published terms on the live product page for:
              </p>
              <ul className="space-y-2 pl-1">
                {[
                  "Whether your booking is doors-off (vs a doors-on sibling product)",
                  "Weight restrictions and passenger limits",
                  "Weather and cancellation / reschedule policies",
                  "Check-in timing and Kahului Heliport meeting point",
                  "Photography rules (loose items, straps, phones)",
                  "Guidance on motion sickness and what to wear for wind exposure",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-bright" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
                  href="/maui/photography-helicopter-tours"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Maui Helicopter Tours for Photography
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Camera-friendly flights &amp; formats
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/oahu/doors-off-helicopter-tours"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Doors-Off Helicopter Tours on Oahu
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Compare Oahu open-air flights
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
