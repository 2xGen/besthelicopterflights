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

const category = getBigIslandCategory("doors-off-helicopter-tours");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "big island doors off helicopter",
    "doors off helicopter tour big island",
    "kona doors off helicopter",
    "kilauea doors off helicopter",
    "rainbow helicopters doors off big island",
  ],
});

export default function BigIslandDoorsOffPage() {
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
            <p className="mt-4 max-w-2xl text-sm text-white/55">
              Looking for the broader island comparison? See{" "}
              <Link
                href="/big-island"
                className="text-teal-bright hover:underline"
              >
                Best Helicopter Tours on the Big Island
              </Link>
              .
            </p>
          </div>
        </section>

        <BigIslandCategoryQuickTable
          category={category}
          footnote="In our current Big Island set, doors-off products are published as doors-on or doors-off choices (primarily Rainbow Helicopters from Kona). Confirm the cabin configuration you want when booking. Active lava viewing is never guaranteed."
        />
        <BigIslandCategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What is a doors-off helicopter tour?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                A doors-off helicopter tour flies with the cabin doors removed
                (or configured open) so passengers get an open-air view of the
                landscape. On the Big Island, that can mean clearer sightlines
                for Kīlauea landscapes, Kohala cliffs or Kona coastline — and a
                more immersive ride than a standard enclosed doors-on flight.
              </p>
              <p>
                The tradeoff is more wind and exposure. Many Rainbow products in
                our set let you choose doors-on or doors-off on the same route
                family — useful when comparing immersion against comfort.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              How much does a doors-off helicopter tour on the Big Island cost?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Among the doors-on/off products in this comparison, listed
              from-prices currently span roughly{" "}
              <strong className="font-semibold text-navy">$590–$1,180</strong>{" "}
              per person. Shorter Kona coastal hops sit lower; the full
              105-minute Kīlauea circuit sits higher. See{" "}
              <Link
                href="/big-island/helicopter-tour-prices"
                className="font-medium text-teal hover:underline"
              >
                Big Island Helicopter Tour Prices
              </Link>{" "}
              for the wider matrix.
            </p>
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
                    Volcano-focused flights from Kona, Waikoloa &amp; Hilo
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/big-island/photography-helicopter-tours"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Big Island Helicopter Tours for Photography
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Camera-friendly flights &amp; formats
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
