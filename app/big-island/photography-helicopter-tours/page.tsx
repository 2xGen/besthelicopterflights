import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  BigIslandCategoryChooseGuide,
  BigIslandCategoryQuickTable,
  BigIslandCategoryRankings,
} from "@/components/big-island/BigIslandCategoryShared";
import { BigIslandCategoryNav } from "@/components/big-island/BigIslandCategoryNav";
import { getBigIslandCategory } from "@/data/big-island-categories";
import { createPageMetadata } from "@/lib/seo";

const category = getBigIslandCategory("photography-helicopter-tours");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "big island helicopter photography",
    "kilauea helicopter photography",
    "doors off helicopter photography big island",
    "aerial photography hawaii helicopter",
    "kohala helicopter photos",
  ],
});

export default function BigIslandPhotographyPage() {
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
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55">
              Many of the strongest photography options overlap with our{" "}
              <Link
                href="/big-island/doors-off-helicopter-tours"
                className="text-teal-bright hover:underline"
              >
                doors-off guide
              </Link>{" "}
              and{" "}
              <Link
                href="/big-island/kilauea-volcano"
                className="text-teal-bright hover:underline"
              >
                Kīlauea volcano guide
              </Link>
              , but this comparison focuses on what matters when you bring a
              camera.
            </p>
          </div>
        </section>

        <BigIslandCategoryQuickTable category={category} />
        <BigIslandCategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Big Island helicopter photography: what actually matters?
            </h2>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-stone">
              <li>
                <strong className="text-navy">Cabin format:</strong> Doors-off
                removes window glass and glare; private window seats help when
                every passenger needs an angle.
              </li>
              <li>
                <strong className="text-navy">Subject first:</strong> Kīlauea /
                park landscapes vs Kohala waterfall valleys produce very
                different shot lists.
              </li>
              <li>
                <strong className="text-navy">Published duration:</strong> More
                airtime usually means more chances to recompose.
              </li>
              <li>
                <strong className="text-navy">Landing stops:</strong> Exclusive
                landings add ground-level frames but shorten pure aerial time.
              </li>
              <li>
                <strong className="text-navy">Conditions:</strong> Active lava or
                glow shots are never guaranteed — plan for landscape and
                crater scenery.
              </li>
            </ul>
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
                  href="/big-island/doors-off-helicopter-tours"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Doors-Off Helicopter Tours
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Open-air photography favorites
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/big-island/helicopter-tour-operators"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Helicopter Tour Operators
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Compare Rainbow, Blue Hawaiian &amp; more
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
