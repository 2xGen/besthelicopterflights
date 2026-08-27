import Image from "next/image";
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
import { getCategory, getTour } from "@/data/kauai-categories";
import { createPageMetadata } from "@/lib/seo";
import { VIATOR_LINK_REL, viatorAffiliateUrl } from "@/lib/viator";

const category = getCategory("private-helicopter-tours");
const jackHarter = getTour("luxury-doors-off");

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
  keywords: [
    "private helicopter tour kauai",
    "best private helicopter tours kauai",
    "kauai private helicopter",
    "private doors off helicopter kauai",
    "are private helicopter tours on kauai worth it",
  ],
});

export default function PrivateCategoryPage() {
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
              Looking for a shared flight? Compare our{" "}
              <Link href="/kauai" className="text-teal-bright hover:underline">
                Best Helicopter Tours on Kauai
              </Link>{" "}
              or see the{" "}
              <Link
                href="/kauai/doors-off-helicopter-tours"
                className="text-teal-bright hover:underline"
              >
                Best Doors-Off Helicopter Tours on Kauai
              </Link>
              .
            </p>
          </div>
        </section>

        <CategoryQuickTable
          category={category}
          footnote="Only two products in our current research set meet our private or private-style criteria. We include a shared premium alternative below for travelers who want a similar doors-off experience without private-charter pricing."
        />

        <CategoryRankings category={category} />

        <section
          id="shared-alternative"
          className="scroll-mt-28 bg-mist px-5 py-14 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Don&apos;t need a private flight?
            </h2>
            <a
              href={viatorAffiliateUrl(jackHarter.viatorUrl)}
              target="_blank"
              rel={VIATOR_LINK_REL}
              className="group mt-10 grid gap-8 overflow-hidden rounded-sm border border-navy/10 bg-white p-5 transition-colors hover:border-teal md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-10 md:p-8"
            >
              <div className="relative aspect-[7/5] overflow-hidden rounded-sm bg-navy">
                <Image
                  src={jackHarter.image}
                  alt={jackHarter.fullName}
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
                  {jackHarter.fullName}
                </h3>
                <p className="mt-2 text-sm text-stone">
                  Supplied by {jackHarter.supplier}
                </p>
                <p className="mt-4 text-base font-medium text-navy">
                  Best for: premium shared doors-off experience
                </p>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  If having the aircraft to yourself isn&apos;t essential, Jack
                  Harter&apos;s 60-minute doors-off flight is worth comparing. It
                  offers a full hour of open-air flying without the cost
                  structure of a private charter.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-stone">
                  <li className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                    <span>Published duration 60 minutes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                    <span>From {jackHarter.priceLabel} per person</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                    <span>
                      Useful when scenery and doors-off time matter more than
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
              What does “private” mean on a Kauai helicopter tour?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                A private helicopter tour typically means your group has the
                aircraft to yourselves rather than joining a shared departure
                with other passengers. On Kauai, some listings also use
                private-style language around seating configuration — for
                example all-window seats — without necessarily meaning a full
                private charter.
              </p>
              <p>
                Always confirm on the live listing whether “private” means a
                full private charter versus a private-style seating product, and
                check passenger minimums or exclusive-use rules before booking.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              How much do private Kauai helicopter tours cost?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              In our current comparison, the private and private-style options
              start at roughly $384–$425 per person, while shared doors-off
              flights can start lower. Prices vary by date, availability and
              booking channel. For the full island price picture, see{" "}
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

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Are private helicopter tours on Kauai worth it?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
              <p>
                A private charter can be worth the premium when privacy itself
                is the point: couples, families, small groups, or photographers
                who want the cabin without strangers. Based on published product
                formats, private flights can also feel more flexible for pacing
                and group logistics than a shared departure.
              </p>
              <p>
                The scenery, however, is still Kauai from the air either way. If
                the main reason you&apos;re considering private is simply to see
                the Na Pali Coast, Waimea Canyon country or waterfall valleys, a
                highly rated shared doors-off flight may offer better value.
              </p>
              <p>
                If privacy, photography control or flying exclusively with your
                group matters, the premium can make more sense. If not, compare
                shared options on our{" "}
                <Link
                  href="/kauai/doors-off-helicopter-tours"
                  className="font-medium text-teal hover:underline"
                >
                  doors-off guide
                </Link>{" "}
                before paying for exclusivity you may not need.
              </p>
            </div>
          </div>
        </section>

        <CategoryChooseGuide category={category} />

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <a
              href={viatorAffiliateUrl(jackHarter.viatorUrl)}
              target="_blank"
              rel={VIATOR_LINK_REL}
              className="block rounded-sm border border-navy/10 bg-white px-5 py-6 transition-colors hover:border-teal md:px-6"
            >
              <p className="text-sm font-semibold text-teal">
                Shared alternative
              </p>
              <h3 className="mt-2 font-display text-xl text-navy">
                {jackHarter.shortName}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">
                Choose this if you want a premium doors-off hour and do not need
                a private cabin — especially when private-charter pricing is
                higher than your budget.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-teal">
                See current price &amp; availability on Viator →
              </span>
            </a>
          </div>
        </section>

        <KauaiRelatedCategories excludeHref={category.path} />
      </main>
      <Footer />
    </>
  );
}
