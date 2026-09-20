import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  MauiCategoryChooseGuide,
  MauiCategoryQuickTable,
  MauiCategoryRankings,
} from "@/components/maui/MauiCategoryShared";
import { MauiCategoryNav } from "@/components/maui/MauiCategoryNav";
import { getMauiCategory, getMauiTour } from "@/data/maui-categories";
import { createPageMetadata } from "@/lib/seo";
import { VIATOR_LINK_REL, viatorAffiliateUrl } from "@/lib/viator";

const category = getMauiCategory("molokai");
const mauiOnlyAlternative = getMauiTour("hana-haleakala-air-maui");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "maui molokai helicopter tour",
    "molokai helicopter tour from maui",
    "molokai sea cliffs helicopter",
    "west maui molokai helicopter",
    "halawa valley helicopter",
    "kahiwa falls helicopter",
    "doors off molokai helicopter",
  ],
});

export default function MauiMolokaiCategoryPage() {
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
              Want Haleakala or Hana rainforest instead of Molokai cliffs? Start
              with{" "}
              <Link href="/maui" className="text-teal-bright hover:underline">
                Best Helicopter Tours on Maui
              </Link>
              .
            </p>
          </div>
        </section>

        <MauiCategoryQuickTable
          category={category}
          footnote="These flights depart Kahului on Maui and include published Molokai overflights — they are not Molokai-based helicopter tours. Weather and cloud cover over Molokai’s north shore can affect what you see on any given day."
        />
        <MauiCategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Why fly to Molokai from Maui?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                Molokai’s north shore is one of Hawaii’s most dramatic aerial
                subjects: sea cliffs that drop thousands of feet into the
                Pacific, remote valleys like Halawa, and waterfall country that
                is essentially inaccessible by road for most visitors. A
                helicopter from Kahului is often the practical way to see it.
              </p>
              <p>
                Most Molokai-inclusive products in our set also cover West Maui
                Mountains on the same flight — so you are usually booking a
                two-island circuit, not a Molokai-only charter. That is useful
                context when comparing against East Maui / Haleakala specialists.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What you typically see
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Based on published itineraries in our Maui set, Molokai-inclusive
              flights commonly highlight:
            </p>
            <ul className="mt-6 space-y-2 text-base leading-relaxed text-stone">
              {[
                "Molokai’s north-shore sea cliffs — among the tallest in the world",
                "Halawa Valley and remote north-shore waterfall country",
                "Crossing the Pailolo Channel between Maui and Molokai",
                "West Maui Mountains rainforest, ridgelines and coastline",
                "Optional extras on some products: doors-off cabin, exclusive landing, or Lanai as a third island",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Exact viewpoints depend on weather, routing and the specific
              product — always check the live Viator listing for current
              itinerary language.
            </p>
          </div>
        </section>

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Molokai circuit vs East Maui / Haleakala
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                Choose a Molokai-inclusive flight when sea cliffs, Halawa Valley
                and West Maui valleys are the reason you are flying. Choose an
                East Maui / Haleakala flight when crater cinder cones, Hana
                rainforest and the Road to Hana coastline are the priority.
              </p>
              <p>
                Complete Island products try to bridge both — but if Molokai
                cliffs are non-negotiable, a dedicated West Maui & Molokai
                circuit (especially doors-off) is usually the clearer fit than a
                Hana specialist.
              </p>
            </div>
          </div>
        </section>

        <section
          id="east-maui-alternative"
          className="scroll-mt-28 bg-mist-soft px-5 py-14 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Looking for East Maui instead?
            </h2>
            <a
              href={viatorAffiliateUrl(mauiOnlyAlternative.viatorUrl)}
              target="_blank"
              rel={VIATOR_LINK_REL}
              className="group mt-10 grid gap-8 overflow-hidden rounded-sm border border-navy/10 bg-white p-5 transition-colors hover:border-teal md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-10 md:p-8"
            >
              <div className="relative aspect-[7/5] overflow-hidden rounded-sm bg-navy">
                <Image
                  src={mauiOnlyAlternative.image}
                  alt={mauiOnlyAlternative.fullName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-teal">
                  East Maui alternative
                </p>
                <h3 className="mt-2 font-display text-2xl text-navy md:text-3xl">
                  {mauiOnlyAlternative.fullName}
                </h3>
                <p className="mt-2 text-sm text-stone">
                  Supplied by {mauiOnlyAlternative.supplier}
                </p>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  If Haleakala Crater and Hana rainforest matter more than
                  Molokai sea cliffs, Air Maui’s Hana / Haleakala flight is a
                  clearer East Maui specialist than a West Maui–Molokai circuit.
                </p>
                <span className="mt-7 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-navy-deep">
                  See current price &amp; availability on Viator →
                </span>
              </div>
            </a>
          </div>
        </section>

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              How much does a Maui–Molokai helicopter tour cost?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              In our current set, Molokai-inclusive from-prices span roughly{" "}
              <strong className="font-semibold text-navy">$368–$663</strong> —
              from doors-on 45-minute West Maui & Molokai flights up through
              doors-off (~$452) and premium landing packages. Compare the wider
              matrix on{" "}
              <Link
                href="/maui/helicopter-tour-prices"
                className="font-medium text-teal hover:underline"
              >
                Maui Helicopter Tour Prices
              </Link>
              .
            </p>
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
                Before you book a Maui helicopter tour that includes Molokai,
                check the live product page for:
              </p>
              <ul className="space-y-2 pl-1">
                {[
                  "Whether Molokai north-shore routing is weather-dependent",
                  "Doors-off vs doors-on cabin format (when relevant)",
                  "Published flight time vs total tour duration with landing",
                  "Weight limits, passenger caps and check-in at Kahului Heliport",
                  "Cancellation / reschedule policies for channel weather",
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
                  href="/maui/doors-off-helicopter-tours"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Doors-Off Helicopter Tours on Maui
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Open-air Molokai sea-cliff favorite
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
                    Compare companies that fly Molokai routes
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
