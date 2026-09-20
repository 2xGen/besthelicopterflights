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

const category = getOahuCategory("private-helicopter-tours");
const sharedAlternative = getOahuTour("royal-crown");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "private helicopter tour oahu",
    "best private helicopter tours oahu",
    "oahu private helicopter",
    "private helicopter honolulu",
    "are private helicopter tours on oahu worth it",
    "private helicopter tour diamond head",
  ],
});

export default function OahuPrivateCategoryPage() {
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
              Looking for a shared flight? Compare our{" "}
              <Link href="/oahu" className="text-teal-bright hover:underline">
                Best Helicopter Tours on Oahu
              </Link>{" "}
              or see the{" "}
              <Link
                href="/oahu/doors-off-helicopter-tours"
                className="text-teal-bright hover:underline"
              >
                Best Doors-Off Helicopter Tours on Oahu
              </Link>
              .
            </p>
          </div>
        </section>

        <OahuCategoryQuickTable
          category={category}
          footnote="Only two products in our current research set meet our private or private specialty-charter criteria. We include a shared premium alternative below for travelers who want a strong full-island experience without private-charter pricing."
        />

        <OahuCategoryRankings category={category} />

        <section
          id="shared-alternative"
          className="scroll-mt-28 bg-mist px-5 py-14 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Don&apos;t need a private flight?
            </h2>
            <a
              href={viatorAffiliateUrl(sharedAlternative.viatorUrl)}
              target="_blank"
              rel={VIATOR_LINK_REL}
              className="group mt-10 grid gap-8 overflow-hidden rounded-sm border border-navy/10 bg-white p-5 transition-colors hover:border-teal md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-10 md:p-8"
            >
              <div className="relative aspect-[7/5] overflow-hidden rounded-sm bg-navy">
                <Image
                  src={sharedAlternative.image}
                  alt={sharedAlternative.fullName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-teal">
                  Shared premium alternative
                </p>
                <h3 className="mt-2 font-display text-2xl text-navy md:text-3xl">
                  {sharedAlternative.fullName}
                </h3>
                <p className="mt-2 text-sm text-stone">
                  Supplied by {sharedAlternative.supplier}
                </p>
                <p className="mt-4 text-base font-medium text-navy">
                  Best for: full-island sightseeing with doors on/off choice
                </p>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  If having the aircraft to yourself isn&apos;t essential,
                  Rainbow&apos;s Royal Crown 60-minute flight is worth comparing.
                  It offers a clear full-island circuit with a published doors-on
                  or doors-off option — without the cost structure of a private
                  charter.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-stone">
                  <li className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                    <span>Published duration about 60 minutes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                    <span>From {sharedAlternative.priceLabel} per person</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                    <span>
                      Useful when scenery and flight time matter more than
                      exclusive cabin use
                    </span>
                  </li>
                </ul>
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
              What does “private” mean on an Oahu helicopter tour?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                A private helicopter tour typically means your group has the
                aircraft to yourselves rather than joining a shared departure
                with other passengers. On Oahu, listings may also package private
                use with specialty extras — for example a romantic landing with
                leis and champagne — which changes both the experience and the
                pricing model.
              </p>
              <p>
                Always confirm on the live listing whether “private” means a
                full private charter versus a private-style seating product,
                whether pricing is per person or per group, and what passenger
                limits apply before booking.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              How much do private Oahu helicopter tours cost?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              In our current comparison, the private cabin experience starts at
              roughly{" "}
              <strong className="font-semibold text-navy">$415 per person</strong>
              , while the private romantic landing charter starts at about{" "}
              <strong className="font-semibold text-navy">
                $3,240 per group
              </strong>{" "}
              (up to 3). Shared full-island flights can start lower on a
              per-person basis. Prices vary by date, availability and booking
              channel. For the wider island picture, see{" "}
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

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Are private helicopter tours on Oahu worth it?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                A private charter can be worth the premium when privacy itself
                is the point: couples, families, small groups, or photographers
                who want the cabin without strangers. Specialty private products
                with landings can also make sense for proposals and celebrations
                where the ground moment is part of the itinerary.
              </p>
              <p>
                The scenery, however, is still Oahu from the air either way. If
                the main reason you&apos;re considering private is simply to see
                Diamond Head, Pearl Harbor or the North Shore, a strong shared
                doors-on/off flight may offer better value.
              </p>
              <p>
                If privacy, photography control or flying exclusively with your
                group matters, the premium can make more sense. If not, compare
                shared options on our{" "}
                <Link
                  href="/oahu/doors-off-helicopter-tours"
                  className="font-medium text-teal hover:underline"
                >
                  doors-off guide
                </Link>{" "}
                before paying for exclusivity you may not need.
              </p>
            </div>
          </div>
        </section>

        <OahuCategoryChooseGuide category={category} />

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <a
              href={viatorAffiliateUrl(sharedAlternative.viatorUrl)}
              target="_blank"
              rel={VIATOR_LINK_REL}
              className="block rounded-sm border border-navy/10 bg-white px-5 py-6 transition-colors hover:border-teal md:px-6"
            >
              <p className="text-sm font-semibold text-teal">
                Shared alternative
              </p>
              <h3 className="mt-2 font-display text-xl text-navy">
                {sharedAlternative.shortName}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">
                Choose this if you want a premium full-island hour and do not
                need a private cabin — especially when private-charter pricing is
                higher than your budget.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-teal">
                See current price &amp; availability on Viator →
              </span>
            </a>
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
                  href="/kauai/private-helicopter-tours"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Private Helicopter Tours on Kauai
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Compare Kauai private flights
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
