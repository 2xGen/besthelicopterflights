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

const category = getOahuCategory("photography-helicopter-tours");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "oahu helicopter photography",
    "best oahu helicopter tours for photography",
    "doors off helicopter photography oahu",
    "oahu aerial photography helicopter",
    "honolulu helicopter tour camera",
    "diamond head helicopter photography",
  ],
});

export default function OahuPhotographyCategoryPage() {
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
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55">
              Many of the strongest photography options overlap with our{" "}
              <Link
                href="/oahu/doors-off-helicopter-tours"
                className="text-teal-bright hover:underline"
              >
                doors-off Oahu guide
              </Link>{" "}
              and{" "}
              <Link
                href="/oahu/private-helicopter-tours"
                className="text-teal-bright hover:underline"
              >
                private tours guide
              </Link>
              , but this comparison focuses specifically on what matters when
              you want to bring a camera.
            </p>
          </div>
        </section>

        <OahuCategoryQuickTable category={category} />
        <OahuCategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Oahu helicopter photography: what actually matters?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Marketing claims are useful context, but they do not tell you
              whether a flight is set up for aerial photography. These factors
              usually matter more once you have a camera in hand.
            </p>

            <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
              Doors-off vs. doors-on
            </h3>
            <p className="mt-3 text-base leading-relaxed text-stone">
              Doors-off flights remove window glass from the equation, which can
              reduce reflections and give a clearer open-air view of Diamond
              Head, Windward cliffs and coastline. That is a real advantage for
              many shooters — but doors-off is not automatically better for every
              photographer. Wind, vibration and equipment security matter more
              in an open cabin, and some travelers prefer the stability of a
              doors-on or glass Eco-Star cabin for comfort or simpler phone
              photography.
            </p>

            <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
              Seat position
            </h3>
            <p className="mt-3 text-base leading-relaxed text-stone">
              Seat configuration can matter as much as the operator brand,
              especially when more than one person is shooting. Mauna Loa’s
              published all-window-seat private experience is particularly
              relevant here: if every passenger needs a usable angle, seating
              clarity can outweigh a slightly longer shared flight on another
              product.
            </p>

            <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
              Flight duration
            </h3>
            <p className="mt-3 text-base leading-relaxed text-stone">
              A 55–65 minute published flight gives more time to compose shots
              and recover from missed frames. Duration alone does not guarantee
              better scenery, though — a shorter Path to Pali-style circuit with
              strong landmark coverage can still outperform a longer but less
              relevant route for your shot list.
            </p>

            <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
              Route
            </h3>
            <p className="mt-3 text-base leading-relaxed text-stone">
              Evaluate Diamond Head, Pearl Harbor, Windward beaches, Sacred
              Falls and North Shore surf separately against what you want to
              photograph. A North Shore–focused Turtle Bay flight and a
              Honolulu full-island circuit can look very different through a lens
              even at similar from-prices.
            </p>

            <h3 className="mt-10 font-display text-xl text-navy md:text-2xl">
              Light and weather
            </h3>
            <p className="mt-3 text-base leading-relaxed text-stone">
              Cloud cover, trade showers and changing light can dramatically
              affect aerial photography on Oahu. Soft overcast can help with
              even ridge detail; harsh midday sun can flatten color; mist over
              the Koʻolau can either ruin a shot list or create atmosphere.
              Operators may reschedule for weather, so build flexibility into
              your day if photography is the main reason you are flying.
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
              How much do photography-friendly Oahu helicopter tours cost?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              In this comparison, photography-friendly from-prices currently
              span roughly{" "}
              <strong className="font-semibold text-navy">$415–$579</strong> per
              person for the ranked flights, with shorter doors-on/off landmark
              options and last-minute seats available lower on the broader Oahu
              set. Compare the full island matrix on{" "}
              <Link
                href="/oahu"
                className="font-medium text-teal hover:underline"
              >
                Best Helicopter Tours on Oahu
              </Link>
              .
            </p>
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
                  href="/oahu/doors-off-helicopter-tours"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Doors-Off Helicopter Tours on Oahu
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Open-air and doors-on/off options
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/kauai/photography-helicopter-tours"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Kauai Helicopter Tours for Photography
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Compare Kauai photo flights
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
