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

const category = getCategory("waterfall-helicopter-tours");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "kauai helicopter waterfall tour",
    "best kauai helicopter tours for waterfalls",
    "waterfall helicopter tour kauai",
    "kauai waterfall safari helicopter",
    "best time to see waterfalls in kauai",
    "kauai waterfalls helicopter tour",
  ],
});

export default function WaterfallCategoryPage() {
  return (
    <>
      <Header variant="solid" />
      <main className="flex-1 min-w-0 w-full max-w-full pt-[4.25rem]">
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
              For open-air waterfall photography, also compare{" "}
              <Link
                href="/kauai/doors-off-helicopter-tours"
                className="text-teal-bright hover:underline"
              >
                doors-off helicopter tours on Kauai
              </Link>
              . For privacy with waterfall routes, see{" "}
              <Link
                href="/kauai/private-helicopter-tours"
                className="text-teal-bright hover:underline"
              >
                private helicopter tours
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
              Why are Kauai helicopter tours good for seeing waterfalls?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                Many of Kauai’s most dramatic cascades sit in remote valleys
                that are difficult or impossible to reach by road. From the air,
                travelers can see waterfall scenery that remains inaccessible on
                foot for most visitors — and a single helicopter route can cover
                multiple valleys in one outing.
              </p>
              <p>
                That is why waterfall helicopter tours are such a common Kauai
                search. Dedicated waterfall safari products emphasize cascades
                in the published route focus. Broader island sightseeing flights
                may still include waterfalls, but as part of a wider circuit
                rather than a waterfall-first itinerary.
              </p>
              <p>
                Rainfall also matters. Kauai’s wetter months and windward
                valleys often produce stronger flows, while drier periods —
                including parts of summer on some sides of the island — can mean
                thinner falls. Seasonal conditions vary by location and recent
                weather, so a helicopter tour is a way to see waterfall country,
                not a guarantee that every cascade is at peak volume on your
                flight day.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              How much is a Kauai waterfall helicopter tour?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              In this comparison, listed prices range from about $336 per person
              for the Deluxe Waterfall Safari to $425 for the private Aliʻi
              waterfall flight, while the canyon-landing option is around $396.
              These are published from-prices and can change with dates and
              availability.
            </p>
            <p className="mt-4 text-base leading-relaxed text-stone">
              See the full comparison on{" "}
              <Link
                href="/kauai/helicopter-tour-prices"
                className="font-medium text-teal hover:underline"
              >
                Kauai Helicopter Tour Prices
              </Link>
              .
            </p>
          </div>
        </section>

        <CategoryChooseGuide category={category} />
        <KauaiRelatedCategories excludeHref={category.path} />
      </main>
      <Footer />
    </>
  );
}
