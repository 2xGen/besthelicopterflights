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

const category = getCategory("photography-helicopter-tours");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "kauai helicopter photography",
    "best kauai helicopter tours for photography",
    "doors off helicopter photography kauai",
    "kauai aerial photography helicopter",
    "kauai helicopter tour camera",
  ],
});

export default function PhotographyCategoryPage() {
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
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55">
              Most of the strongest photography options overlap with our{" "}
              <Link
                href="/kauai/doors-off-helicopter-tours"
                className="text-teal-bright hover:underline"
              >
                doors-off Kauai guide
              </Link>
              , but this comparison focuses specifically on what matters when
              you want to bring a camera.
            </p>
          </div>
        </section>

        <CategoryQuickTable category={category} />
        <CategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Kauai helicopter photography: what actually matters?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Overall tour ratings are useful context, but they do not tell you
              whether a flight is set up for aerial photography. These factors
              usually matter more once you have a camera in hand.
            </p>

            <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
              Doors-off vs. doors-on
            </h3>
            <p className="mt-3 text-base leading-relaxed text-stone">
              Doors-off flights remove window glass from the equation, which can
              reduce reflections and give a clearer open-air view of cliffs,
              waterfalls and coastline. That is a real advantage for many
              shooters — but doors-off is not automatically better for every
              photographer. Wind, vibration and equipment security matter more
              in an open cabin, and some travelers prefer the stability of a
              doors-on flight for comfort or simpler phone photography.
            </p>

            <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
              Seat position
            </h3>
            <p className="mt-3 text-base leading-relaxed text-stone">
              Seat configuration can matter as much as the operator brand,
              especially when more than one person is shooting. Mauna Loa’s
              published all-window-seat positioning is particularly relevant
              here: if every passenger needs a usable angle, seating clarity
              can outweigh a slightly longer flight time on another product.
            </p>

            <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
              Flight duration
            </h3>
            <p className="mt-3 text-base leading-relaxed text-stone">
              A 60–75 minute published flight gives more time to compose shots
              and recover from missed frames. Duration alone does not guarantee
              better scenery, though — a shorter flight with strong route
              coverage can still outperform a longer but less relevant circuit
              for your shot list.
            </p>

            <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
              Route
            </h3>
            <p className="mt-3 text-base leading-relaxed text-stone">
              Evaluate Na Pali Coast, waterfall valleys and canyon scenery
              separately against what you want to photograph. A waterfall-first
              product, a private doors-off waterfall flight and an island-wide
              eco tour can all look different through a lens even when they
              share similar overall ratings.
            </p>

            <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
              Light and weather
            </h3>
            <p className="mt-3 text-base leading-relaxed text-stone">
              Cloud cover, rain and changing light can dramatically affect
              aerial photography on Kauai. Soft overcast can help with even
              canyon detail; harsh midday sun can flatten color; rain and mist
              can either ruin a shot list or create atmosphere. Operators may
              reschedule for weather, so build flexibility into your day if
              photography is the main reason you are flying.
            </p>

            <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
              Camera restrictions
            </h3>
            <p className="mt-3 text-base leading-relaxed text-stone">
              Do not assume every camera, strap or loose accessory is allowed.
              Check each operator’s current published restrictions on cameras,
              phone tethers, bags and other equipment on the live product page
              before you book — those terms can differ by operator and can
              change over time.
            </p>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              How much do photography-friendly Kauai helicopter tours cost?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              In this comparison, photography-friendly from-prices currently
              span roughly $221–$460+, with private doors-off options higher
              depending on the product. Compare the full island matrix on{" "}
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
