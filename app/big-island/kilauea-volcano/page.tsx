import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  BigIslandCategoryChooseGuide,
  BigIslandCategoryQuickTable,
  BigIslandCategoryRankings,
} from "@/components/big-island/BigIslandCategoryShared";
import { BigIslandCategoryNav } from "@/components/big-island/BigIslandCategoryNav";
import {
  getBigIslandCategory,
  getBigIslandTour,
} from "@/data/big-island-categories";
import { createPageMetadata } from "@/lib/seo";
import { VIATOR_LINK_REL, viatorAffiliateUrl } from "@/lib/viator";

const category = getBigIslandCategory("kilauea-volcano");
const kohalaAlternative = getBigIslandTour("kohala-waterfalls-valleys");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "kilauea helicopter tour",
    "kilauea volcano helicopter",
    "hawaii volcanoes national park helicopter",
    "big island volcano helicopter tour",
    "hilo volcano helicopter",
    "kona kilauea helicopter",
  ],
});

export default function BigIslandKilaueaPage() {
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
              Want Kohala waterfalls without a volcano crossing? Start with{" "}
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
          footnote="Active lava, glow or eruption viewing is never guaranteed. Routes and what you see depend on weather, park conditions and the day’s volcanic activity — always check the live product page."
        />
        <BigIslandCategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Why fly Kīlauea by helicopter?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                Kīlauea and Hawaii Volcanoes National Park are among the most
                requested aerial subjects on Hawaiʻi Island. A helicopter can
                cover crater landscapes, lava fields and approaches that take
                hours by road — especially if you are staying on the Kona or
                Kohala side.
              </p>
              <p>
                Departure base matters. Kona and Waikoloa flights typically
                cross more of the island to reach the park; Hilo departures are
                closer to volcano country but may cover less west-side scenery.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Kona vs Waikoloa vs Hilo for volcano flights
            </h2>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-stone">
              <li>
                <strong className="text-navy">Kona:</strong> Best for Rainbow
                doors-on/off Kīlauea circuits and Mauna Loa private island
                experiences — longer published airtime, higher from-prices.
              </li>
              <li>
                <strong className="text-navy">Waikoloa:</strong> Best for Blue
                Hawaiian Spectacular shared overviews when Kohala resort
                logistics matter.
              </li>
              <li>
                <strong className="text-navy">Hilo:</strong> Best for shorter
                park-focused value flights (Safari, Blue Hawaiian Discover Hilo)
                when you are already on the east side.
              </li>
            </ul>
          </div>
        </section>

        <section
          id="kohala-alternative"
          className="scroll-mt-28 bg-mist px-5 py-14 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Looking for waterfall valleys instead?
            </h2>
            <a
              href={viatorAffiliateUrl(kohalaAlternative.viatorUrl)}
              target="_blank"
              rel={VIATOR_LINK_REL}
              className="group mt-10 grid gap-8 overflow-hidden rounded-sm border border-navy/10 bg-white p-5 transition-colors hover:border-teal md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-10 md:p-8"
            >
              <div className="relative aspect-[7/5] overflow-hidden rounded-sm bg-navy">
                <Image
                  src={kohalaAlternative.image}
                  alt={kohalaAlternative.fullName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-teal">
                  Kohala alternative
                </p>
                <h3 className="mt-2 font-display text-2xl text-navy md:text-3xl">
                  {kohalaAlternative.fullName}
                </h3>
                <p className="mt-2 text-sm text-stone">
                  Supplied by {kohalaAlternative.supplier}
                </p>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  If Waipiʻo, Pololū and Kohala waterfall valleys matter more
                  than Kīlauea park scenery, this shorter Waikoloa flight is a
                  clearer fit than an island-crossing volcano product.
                </p>
                <span className="mt-7 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-navy-deep">
                  See current price &amp; availability on Viator →
                </span>
              </div>
            </a>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              How much does a Kīlauea helicopter tour cost?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              In our current set, volcano-focused from-prices span roughly{" "}
              <strong className="font-semibold text-navy">$406–$1,180</strong> —
              from Hilo park specialists up through long Kona doors-on/off
              circuits. Compare the wider matrix on{" "}
              <Link
                href="/big-island/helicopter-tour-prices"
                className="font-medium text-teal hover:underline"
              >
                Big Island Helicopter Tour Prices
              </Link>
              .
            </p>
          </div>
        </section>

        <BigIslandCategoryChooseGuide category={category} />

        <section className="bg-navy px-5 py-14 text-white md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl">
              What to know before booking
            </h2>
            <ul className="mt-6 space-y-2 text-base leading-relaxed text-white/75">
              {[
                "Whether lava, glow or eruption language is guaranteed (it usually is not)",
                "Departure base and total day logistics from your hotel",
                "Doors-on vs doors-off configuration when both are offered",
                "Published flight time vs total tour duration",
                "Weather, cloud cover and cancellation / reschedule policies",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-bright" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
                    Open-cabin volcano &amp; coastal options
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
                    Island-hop packages from Oahu
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
