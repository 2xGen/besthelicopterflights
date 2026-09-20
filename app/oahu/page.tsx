import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { OahuCategoryNav } from "@/components/oahu/OahuCategoryNav";
import { OahuComparisonTable } from "@/components/oahu/OahuComparisonTable";
import { OahuReadyToChoose } from "@/components/oahu/OahuReadyToChoose";
import { OahuTourReviews } from "@/components/oahu/OahuTourReviews";
import { OAHU_FEATURED_IMAGE } from "@/data/images";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Best Helicopter Tours on Oahu: Compared & Ranked",
  description:
    "Independent comparison of Oahu helicopter tours — Diamond Head, Pearl Harbor, North Shore and full-island flights ranked using published routes, durations, formats and pricing.",
  path: "/oahu",
  keywords: [
    "best helicopter tours Oahu",
    "Oahu helicopter comparison",
    "Honolulu helicopter tour",
    "Diamond Head helicopter",
    "North Shore helicopter tour",
  ],
});

export default function OahuPage() {
  return (
    <>
      <Header variant="solid" />
      <main className="flex-1 min-w-0 w-full max-w-full pt-[4.25rem]">
        <OahuCategoryNav currentPath="/oahu" />

        <section className="relative overflow-hidden bg-navy-deep px-5 pb-12 pt-10 text-white md:px-8 md:pb-24 md:pt-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(42,111,122,0.45), transparent 60%)",
            }}
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-bright">
                Oahu · Hawaii
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-3xl leading-tight md:mt-4 md:text-5xl md:leading-[1.12]">
                Best Helicopter Tours on Oahu: Compared &amp; Ranked
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:mt-6 md:text-lg">
                Oahu packs iconic landmarks into a compact island: Diamond Head,
                Pearl Harbor, Windward cliffs, Sacred Falls and the North Shore
                surf coast are all easier to compare from the air than from
                traffic-bound roads. From Honolulu and Turtle Bay departures,
                travelers can weigh doors-on or doors-off flights, private
                cabins, shorter landmark hops and full-island circuits.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
                We research each option using publicly available operator
                information, published routes, durations, formats and pricing —
                then rank by fit and evidence, not by marketplace sort order.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 md:mt-9 md:gap-4">
                <Link
                  href="/oahu/doors-off-helicopter-tours"
                  className="rounded-sm bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-bright"
                >
                  Best doors-off tours
                </Link>
                <Link
                  href="/oahu/helicopter-tour-operators"
                  className="rounded-sm border border-white/35 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Compare operators
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/15 bg-navy shadow-[0_28px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                <Image
                  src={OAHU_FEATURED_IMAGE}
                  alt="Aerial helicopter view over Oahu coastline and landmarks"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-navy/8 bg-mist-soft px-5 py-10 md:px-8 md:py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-xl text-navy md:text-2xl">
              How this Oahu ranking works
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
              We do not call a tour “best overall” simply because it appears
              first on Viator. Each featured placement is justified by published
              experience type (doors-on/off, private, North Shore focus,
              specialty landing), duration, departure base and price relative to
              what the flight offers. Additional Oahu products are included
              below — including last-minute single seats, a romantic landing
              charter and an Oahu-to-Hilo volcano day trip — so you can compare
              niche options that answer different search intents. Use the
              category bar above for doors-off, private, photography, prices,
              volcano day trips and operators.
            </p>
          </div>
        </section>

        <OahuComparisonTable />
        <OahuTourReviews />
        <OahuReadyToChoose />
      </main>
      <Footer />
    </>
  );
}
