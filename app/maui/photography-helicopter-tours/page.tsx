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

const category = getMauiCategory("photography-helicopter-tours");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "maui helicopter photography",
    "best maui helicopter tours for photography",
    "doors off helicopter photography maui",
    "haleakala helicopter photography",
    "molokai cliffs helicopter photos",
    "aerial photography maui helicopter",
  ],
});

export default function MauiPhotographyCategoryPage() {
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
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55">
              Many of the strongest photography options overlap with our{" "}
              <Link
                href="/maui/doors-off-helicopter-tours"
                className="text-teal-bright hover:underline"
              >
                doors-off Maui guide
              </Link>{" "}
              and{" "}
              <Link
                href="/maui/private-helicopter-tours"
                className="text-teal-bright hover:underline"
              >
                exclusive landing guide
              </Link>
              , but this comparison focuses specifically on what matters when
              you want to bring a camera.
            </p>
          </div>
        </section>

        <MauiCategoryQuickTable category={category} />
        <MauiCategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Maui helicopter photography: what actually matters?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Marketing claims are useful context, but they do not tell you
              whether a flight is set up for aerial photography. These factors
              usually matter more once you have a camera in hand.
            </p>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-stone">
              <li>
                <strong className="text-navy">Cabin format:</strong> Doors-off
                removes window glass and glare; doors-on Eco-Star glass is still
                strong when open cabin is not available.
              </li>
              <li>
                <strong className="text-navy">Route focus:</strong> West Maui /
                Molokai cliffs vs Haleakala / Hana rainforest produce very
                different shot lists — pick the geography first.
              </li>
              <li>
                <strong className="text-navy">Published duration:</strong> More
                airtime usually means more chances to recompose as light and
                clouds shift.
              </li>
              <li>
                <strong className="text-navy">Landing stops:</strong> Exclusive
                landings add ground-level frames, but shorten pure aerial time.
              </li>
              <li>
                <strong className="text-navy">Operator rules:</strong> Confirm
                camera / phone / strap policies on the live listing before you
                fly.
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Best subjects from the air on Maui
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                Photographers often book Maui flights for Molokai’s sea cliffs,
                West Maui waterfall valleys, Haleakala’s cinder cones, Hana
                rainforest coastline and — on landing products — ranch or valley
                ground perspectives you cannot get from a continuous overflights.
              </p>
              <p>
                Match the tour to the subject. Doors-off West Maui & Molokai is
                the open-air cliff play; Complete Island maximizes variety;
                Hana / Haleakala specializes East Maui; landing packages trade
                some airtime for exclusive ground moments.
              </p>
            </div>
          </div>
        </section>

        <MauiCategoryChooseGuide category={category} />

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
                  href="/maui/doors-off-helicopter-tours"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Doors-Off Helicopter Tours on Maui
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Open-air photography favorite
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/maui/helicopter-tour-operators"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Helicopter Tour Operators on Maui
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Compare Air Maui, Blue Hawaiian &amp; more
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
