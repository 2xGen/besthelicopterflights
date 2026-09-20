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

const category = getMauiCategory("private-helicopter-tours");
const sharedAlternative = getMauiTour("complete-island-60");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "private helicopter tour maui",
    "maui helicopter landing tour",
    "ulupalakua helicopter landing",
    "hana rainforest helicopter landing",
    "exclusive landing helicopter maui",
    "maui molokai spectacular landing",
  ],
});

export default function MauiPrivateCategoryPage() {
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
              Looking for a shared scenic flight? Compare our{" "}
              <Link href="/maui" className="text-teal-bright hover:underline">
                Best Helicopter Tours on Maui
              </Link>{" "}
              or see the{" "}
              <Link
                href="/maui/doors-off-helicopter-tours"
                className="text-teal-bright hover:underline"
              >
                Best Doors-Off Helicopter Tours on Maui
              </Link>
              .
            </p>
          </div>
        </section>

        <MauiCategoryQuickTable
          category={category}
          footnote="These products are exclusive-landing specialties on shared scenic flights — not full private charters of the entire aircraft. We include a shared full-island alternative below for travelers who want strong Maui coverage without a landing package."
        />
        <MauiCategoryRankings category={category} />

        <section
          id="shared-alternative"
          className="scroll-mt-28 bg-mist px-5 py-14 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Don&apos;t need a landing package?
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
                  Shared full-island alternative
                </p>
                <h3 className="mt-2 font-display text-2xl text-navy md:text-3xl">
                  {sharedAlternative.fullName}
                </h3>
                <p className="mt-2 text-sm text-stone">
                  Supplied by {sharedAlternative.supplier}
                </p>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  If you want East and West Maui in one published hour —
                  Haleakala, Hana coastline and West Maui valleys — without
                  paying for an exclusive landing stop, Complete Island is a
                  clearer shared scenic fit than a ranch or oceanfront landing
                  package.
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
              Exclusive landing vs private charter
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                On Maui, many “exclusive” experiences mean a private landing
                site during a shared scenic flight — not that your group
                charters the whole helicopter. Ulupalakua Ranch, oceanfront and
                Hana valley landings add ground time and a special pause; they
                still typically fly with other passengers unless the listing
                says otherwise.
              </p>
              <p>
                If cabin exclusivity is non-negotiable, verify private-charter
                language on the live product page or ask the operator directly.
                Our rankings focus on the exclusive-landing specialties that
                publish most clearly in current Viator listings.
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
                    Open-air West Maui &amp; Molokai
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/maui/helicopter-tour-prices"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Maui Helicopter Tour Prices
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    From-price matrix &amp; FAQ
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
