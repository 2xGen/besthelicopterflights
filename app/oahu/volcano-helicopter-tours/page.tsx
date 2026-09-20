import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  OahuCategoryChooseGuide,
  OahuCategoryQuickTable,
  OahuCategoryRankings,
} from "@/components/oahu/OahuCategoryShared";
import { OahuCategoryNav } from "@/components/oahu/OahuCategoryNav";
import { getOahuCategory, getOahuTour } from "@/data/oahu-categories";
import { createPageMetadata } from "@/lib/seo";
import { VIATOR_LINK_REL, viatorAffiliateUrl } from "@/lib/viator";

const category = getOahuCategory("volcano-helicopter-tours");
const oahuOnlyAlternative = getOahuTour("royal-crown");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "oahu volcano helicopter tour",
    "oahu to big island helicopter",
    "hilo volcano helicopter from oahu",
    "kilauea helicopter tour from oahu",
    "hawaii volcanoes national park day trip oahu",
    "oahu volcano day trip helicopter",
  ],
});

export default function OahuVolcanoCategoryPage() {
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
              Want Diamond Head, Pearl Harbor or North Shore from the air
              instead? Start with{" "}
              <Link href="/oahu" className="text-teal-bright hover:underline">
                Best Helicopter Tours on Oahu
              </Link>
              .
            </p>
          </div>
        </section>

        <OahuCategoryQuickTable
          category={category}
          footnote="This is a different product type than Oahu-only scenic flights: a full-day island-hop to Hawaiʻi Island with a published Big Island helicopter segment. Active-lava viewing is not guaranteed and depends on conditions."
        />
        <OahuCategoryRankings category={category} />

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What is an Oahu volcano helicopter day trip?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                Oahu itself is not an active-volcano sightseeing destination in
                the way Hawaiʻi Island is. Travelers searching for “volcano
                helicopter tours from Oahu” are usually looking for a day trip
                that flies or ferries them to the Big Island for Hawaii
                Volcanoes National Park — often with a helicopter flyover over
                volcanic terrain, waterfalls and rainforest.
              </p>
              <p>
                That makes volcano packages a different decision from booking a
                Honolulu doors-on/off circuit. You are paying for interisland
                logistics, guided park time and a Big Island helicopter segment
                — not primarily for Waikiki or Diamond Head aerial views.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              What is typically included?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Based on the published Polynesian Adventure Tours listing in our
              set, the Oahu-to-Hilo volcano adventure is positioned as an
              all-inclusive-style day with:
            </p>
            <ul className="mt-6 space-y-2 text-base leading-relaxed text-stone">
              {[
                "Interisland travel between Oahu and Hilo",
                "Guided Hawaii Volcanoes National Park sightseeing",
                "A published ~45-minute Big Island helicopter segment",
                "Lunch and related day-trip logistics per the live listing",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Always verify current inclusions, meeting points and weather
              contingencies on the live Viator product page — especially
              language about whether a Kīlauea fly-over is guaranteed.
            </p>
          </div>
        </section>

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Volcano day trip vs Oahu-only helicopter tour
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                Choose a volcano day trip when active-volcano landscape is the
                reason you are flying. Choose an Oahu-only helicopter tour when
                you want Diamond Head, Pearl Harbor, Windward cliffs or North
                Shore surf from the air without leaving the island for a full
                day.
              </p>
              <p>
                Price is another separator: volcano packages typically sit well
                above shared Oahu scenic from-prices because they bundle
                interisland travel and a full itinerary, not just a 30–65 minute
                local flight.
              </p>
            </div>
          </div>
        </section>

        <section
          id="oahu-only-alternative"
          className="scroll-mt-28 bg-mist-soft px-5 py-14 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Looking for Oahu scenery instead?
            </h2>
            <a
              href={viatorAffiliateUrl(oahuOnlyAlternative.viatorUrl)}
              target="_blank"
              rel={VIATOR_LINK_REL}
              className="group mt-10 grid gap-8 overflow-hidden rounded-sm border border-navy/10 bg-white p-5 transition-colors hover:border-teal md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-10 md:p-8"
            >
              <div className="relative aspect-[7/5] overflow-hidden rounded-sm bg-navy">
                <Image
                  src={oahuOnlyAlternative.image}
                  alt={oahuOnlyAlternative.fullName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-teal">
                  Oahu-only alternative
                </p>
                <h3 className="mt-2 font-display text-2xl text-navy md:text-3xl">
                  {oahuOnlyAlternative.fullName}
                </h3>
                <p className="mt-2 text-sm text-stone">
                  Supplied by {oahuOnlyAlternative.supplier}
                </p>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  If you want a full-hour Honolulu circuit with doors-on or
                  doors-off flexibility — Diamond Head, Windward Coast, Sacred
                  Falls, North Shore and Pearl Harbor — Royal Crown is a clearer
                  Oahu-only fit than a Big Island volcano day trip.
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
              How much does an Oahu volcano helicopter day trip cost?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              In our current set, the Oahu-to-Hilo volcano adventure lists from
              about{" "}
              <strong className="font-semibold text-navy">$1,054 per person</strong>
              . That is a full-day package price — not comparable to a $300–$600
              Oahu-only scenic from-price. Compare the wider matrix on{" "}
              <Link
                href="/oahu/helicopter-tour-prices"
                className="font-medium text-teal hover:underline"
              >
                Oahu Helicopter Tour Prices
              </Link>
              .
            </p>
          </div>
        </section>

        <OahuCategoryChooseGuide category={category} />

        <section className="bg-navy px-5 py-14 text-white md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl">
              What to know before booking
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/75">
              <p>
                Before you book an Oahu volcano helicopter day trip, check the
                live product page for:
              </p>
              <ul className="space-y-2 pl-1">
                {[
                  "Whether a Kīlauea / lava fly-over is guaranteed or weather-dependent",
                  "Interisland flight or transfer timing and meeting points",
                  "Park entry logistics and walking expectations",
                  "Lunch, admission and cancellation terms",
                  "Total day length and return-to-Oahu timing",
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
                  href="/oahu/helicopter-tour-prices"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Oahu Helicopter Tour Prices
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    From-price matrix &amp; FAQ
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/oahu/helicopter-tour-operators"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Helicopter Tour Operators on Oahu
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Compare companies including day-trip operators
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
