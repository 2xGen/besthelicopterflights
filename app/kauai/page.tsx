import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { KauaiCategoryNav } from "@/components/kauai/KauaiCategoryNav";
import { KauaiComparisonTable } from "@/components/kauai/KauaiComparisonTable";
import {
  KauaiAnswerSections,
  KauaiChooseGuide,
  KauaiFeaturedTourWriteups,
  KauaiMoreTours,
} from "@/components/kauai/KauaiHubGuide";
import { KauaiReadyToChoose } from "@/components/kauai/KauaiReadyToChoose";
import { KAUAI_FEATURED_IMAGE } from "@/data/images";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Best Kauai Helicopter Tours (2026): Compare Prices & Flights",
  description:
    "Compare the best helicopter tours on Kauai, including doors-off, private and waterfall flights. See prices, flight times, ratings and which tour fits you.",
  path: "/kauai",
  keywords: [
    "kauai helicopter tours",
    "best helicopter tours kauai",
    "best kauai helicopter tours",
    "helicopter tours kauai",
    "helicopter tours in kauai",
    "helicopter tour kauai",
    "kauai helicopter tours prices",
    "private helicopter tour kauai",
  ],
});

const quickPicks = [
  {
    label: "Private experience",
    tour: "Kauai Private Doors-Off by Aliʻi",
    href: "#private-doors-off",
  },
  {
    label: "Overall sightseeing",
    tour: "Kauai Eco Adventure by Blue Hawaiian",
    href: "#eco-adventure",
  },
  {
    label: "Waterfalls",
    tour: "Deluxe Waterfall Safari by Safari Helicopters",
    href: "#waterfall-safari",
  },
  {
    label: "60-minute doors-off",
    tour: "Kauai Luxury Doors-Off by Jack Harter",
    href: "#luxury-doors-off",
  },
  {
    label: "All-window-seat experience",
    tour: "Kauai Experience by Mauna Loa",
    href: "#kauai-experience",
  },
];

export default function KauaiPage() {
  return (
    <>
      <Header variant="solid" />
      <main className="flex-1 min-w-0 w-full max-w-full pt-[4.25rem]">
        <KauaiCategoryNav currentPath="/kauai" />

        <section className="relative overflow-hidden bg-navy-deep px-5 pb-12 pt-10 text-white md:px-8 md:pb-20 md:pt-16">
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
                Kauai · Hawaii
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-3xl leading-tight md:mt-4 md:text-5xl md:leading-[1.12]">
                Best Helicopter Tours on Kauai: Compared &amp; Ranked
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:mt-6 md:text-lg">
                The best Kauai helicopter tour depends on what matters most to
                you: a private flight, doors-off views, waterfalls, a longer
                flight or a more affordable sightseeing option.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
                We compared Kauai helicopter tours using traveler ratings and
                review volume, published flight times, routes, experience type,
                prices and booking terms. Our current comparison includes
                flights from Aliʻi Kauai Air Tours &amp; Charters, Blue Hawaiian
                Helicopters, Safari Helicopters, Jack Harter Helicopters, Mauna
                Loa Helicopters and Air Kauai.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 md:mt-9 md:gap-4">
                <Link
                  href="/kauai/doors-off-helicopter-tours"
                  className="rounded-sm bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-bright"
                >
                  Compare the best doors-off tours →
                </Link>
                <Link
                  href="/kauai/helicopter-tour-operators"
                  className="rounded-sm border border-white/35 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Compare Kauai helicopter operators →
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/15 bg-navy shadow-[0_28px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                <Image
                  src={KAUAI_FEATURED_IMAGE}
                  alt="Aerial view of Kauai’s green cliffs, coastline and turquoise ocean"
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
            <p className="max-w-3xl text-base leading-relaxed text-stone">
              Kauai is particularly well suited to helicopter sightseeing. Large
              sections of the Na Pali Coast, deep valleys, waterfalls and rugged
              interior are difficult or impossible to reach by road, making the
              view from the air very different from a standard island sightseeing
              tour.
            </p>

            <h2 className="mt-8 font-display text-xl text-navy md:text-2xl">
              Quick picks
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quickPicks.map((pick) => (
                <li key={pick.label}>
                  <a
                    href={pick.href}
                    className="block border border-navy/10 bg-white px-4 py-4 transition-colors hover:border-teal"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-teal">
                      {pick.label}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-snug text-navy">
                      {pick.tour}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <KauaiComparisonTable />
        <KauaiChooseGuide />
        <KauaiFeaturedTourWriteups />
        <KauaiMoreTours />
        <KauaiAnswerSections />
        <KauaiReadyToChoose />
      </main>
      <Footer />
    </>
  );
}
