import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BigIslandCategoryNav } from "@/components/big-island/BigIslandCategoryNav";
import {
  BIG_ISLAND_OPERATORS_PATH,
  bigIslandOperatorComparisons,
  bigIslandOperators,
  getBigIslandOperatorTours,
} from "@/data/big-island-operators";
import { createPageMetadata } from "@/lib/seo";
import { VIATOR_LINK_REL, viatorAffiliateUrl } from "@/lib/viator";

export const metadata = createPageMetadata({
  title: "Best Helicopter Tour Operators on the Big Island (2026)",
  description:
    "Compare Big Island helicopter tour operators — Rainbow, Mauna Loa, Blue Hawaiian Waikoloa & Hilo, and Safari Helicopters — plus head-to-head comparisons.",
  path: BIG_ISLAND_OPERATORS_PATH,
  keywords: [
    "big island helicopter operators",
    "best helicopter company big island",
    "rainbow helicopters big island",
    "blue hawaiian big island",
    "mauna loa helicopters big island",
    "safari helicopters hilo",
  ],
});

export default function BigIslandOperatorsPage() {
  return (
    <>
      <Header variant="solid" />
      <main className="flex-1 min-w-0 w-full max-w-full pt-[4.25rem]">
        <BigIslandCategoryNav currentPath={BIG_ISLAND_OPERATORS_PATH} />

        <section className="bg-navy-deep px-5 pb-14 pt-12 text-white md:px-8 md:pb-20 md:pt-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-bright">
              Big Island · Operators
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-5xl md:leading-[1.12]">
              Best Helicopter Tour Operators on the Big Island
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              This page answers a different question than our tour rankings:
              which helicopter company should you book with on Hawaiʻi Island?
              We compare the operators in our research set by the products they
              offer, what they are best known for, and when each company is the
              clearer fit.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55">
              Looking for the best tour for a specific need? Start with{" "}
              <Link
                href="/big-island"
                className="text-teal-bright hover:underline"
              >
                Best Helicopter Tours on the Big Island
              </Link>{" "}
              or browse{" "}
              <Link
                href="/big-island/doors-off-helicopter-tours"
                className="text-teal-bright hover:underline"
              >
                doors-off
              </Link>
              ,{" "}
              <Link
                href="/big-island/kilauea-volcano"
                className="text-teal-bright hover:underline"
              >
                Kīlauea
              </Link>
              , or{" "}
              <Link
                href="/big-island/photography-helicopter-tours"
                className="text-teal-bright hover:underline"
              >
                photography
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="bg-mist px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-navy md:text-3xl">
              Big Island helicopter companies at a glance
            </h2>
            <div className="mt-8 hidden overflow-hidden rounded-sm border border-navy/10 bg-white md:block">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-navy/10 bg-mist-soft text-xs uppercase tracking-[0.08em] text-stone">
                    <th className="px-4 py-3 font-semibold">Operator</th>
                    <th className="px-4 py-3 font-semibold">Best known for</th>
                    <th className="px-4 py-3 font-semibold">Tours in our set</th>
                  </tr>
                </thead>
                <tbody>
                  {bigIslandOperators.map((operator) => (
                    <tr
                      key={operator.id}
                      className="border-b border-navy/8 last:border-0"
                    >
                      <td className="px-4 py-4">
                        <a
                          href={`#${operator.id}`}
                          className="font-medium text-navy hover:text-teal"
                        >
                          {operator.shortName}
                        </a>
                      </td>
                      <td className="px-4 py-4 text-stone">
                        {operator.bestKnownFor}
                      </td>
                      <td className="px-4 py-4 text-stone">
                        {getBigIslandOperatorTours(operator)
                          .map((tour) => tour.shortName)
                          .join(" · ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-8 space-y-3 md:hidden">
              {bigIslandOperators.map((operator) => (
                <li
                  key={operator.id}
                  className="border border-navy/10 bg-white px-4 py-4"
                >
                  <a
                    href={`#${operator.id}`}
                    className="font-medium text-navy hover:text-teal"
                  >
                    {operator.shortName}
                  </a>
                  <p className="mt-2 text-sm text-stone">
                    {operator.bestKnownFor}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl leading-tight text-navy md:text-4xl">
              Big Island helicopter tour operators
            </h2>
            <div className="mt-10 space-y-8">
              {bigIslandOperators.map((operator) => {
                const tours = getBigIslandOperatorTours(operator);
                return (
                  <article
                    key={operator.id}
                    id={operator.id}
                    className="scroll-mt-28 rounded-sm border border-navy/10 bg-white px-5 py-8 md:px-8 md:py-10"
                  >
                    <h3 className="font-display text-2xl text-navy md:text-3xl">
                      {operator.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-teal">
                      Best known for: {operator.bestKnownFor}
                    </p>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
                      {operator.summary}
                    </p>
                    <div className="mt-5">
                      <p className="text-sm font-semibold text-navy">
                        Choose this operator if:
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {operator.chooseIf.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-sm leading-relaxed text-stone"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                      {tours.map((tour) => (
                        <a
                          key={tour.id}
                          href={viatorAffiliateUrl(tour.viatorUrl)}
                          target="_blank"
                          rel={VIATOR_LINK_REL}
                          className="group overflow-hidden rounded-sm border border-navy/10 bg-mist transition-colors hover:border-teal"
                        >
                          <div className="relative aspect-[16/10]">
                            <Image
                              src={tour.image}
                              alt={tour.fullName}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              sizes="(max-width: 768px) 100vw, 40vw"
                            />
                          </div>
                          <div className="px-5 py-5">
                            <h4 className="font-display text-lg text-navy">
                              {tour.fullName}
                            </h4>
                            <p className="mt-2 text-sm text-stone">
                              {tour.bestFor} · {tour.duration} · from{" "}
                              {tour.priceLabel}
                            </p>
                            <span className="mt-4 inline-flex text-sm font-semibold text-teal group-hover:text-teal-bright">
                              See current price &amp; availability on Viator →
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-navy md:text-4xl">
              Operator comparisons
            </h2>
            <div className="mt-12 space-y-14">
              {bigIslandOperatorComparisons.map((comparison) => (
                <article
                  key={comparison.id}
                  id={comparison.id}
                  className="scroll-mt-28 border-t border-navy/10 pt-10"
                >
                  <h3 className="font-display text-2xl text-navy md:text-3xl">
                    {comparison.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-stone">
                    {comparison.intro}
                  </p>
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {[comparison.left, comparison.right].map((side) => (
                      <div
                        key={side.name}
                        className="rounded-sm border border-navy/10 bg-white px-5 py-6"
                      >
                        <p className="font-display text-xl text-navy">
                          {side.name} may be the better fit if:
                        </p>
                        <ul className="mt-4 space-y-2">
                          {side.fitsIf.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2 text-sm leading-relaxed text-stone"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-base leading-relaxed text-stone">
                    {comparison.closing}
                  </p>
                </article>
              ))}
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
                  href="/big-island/kilauea-volcano"
                  className="block rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
                >
                  <span className="font-medium text-navy">
                    Best Kīlauea Volcano Helicopter Tours
                  </span>
                  <span className="mt-1 block text-sm text-stone">
                    Volcano-focused rankings
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
                    Compare Maui companies
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
