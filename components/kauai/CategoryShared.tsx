import Image from "next/image";
import type { KauaiCategory } from "@/data/kauai-categories";
import { getRankedTours } from "@/data/kauai-categories";
import { viatorAffiliateUrl } from "@/lib/viator";

type Props = {
  category: KauaiCategory;
};

export function CategoryQuickTable({
  category,
  footnote,
}: Props & { footnote?: string }) {
  const rows = getRankedTours(category);
  const showFormat = rows.some((row) => row.tableFormat);

  return (
    <section className="bg-mist px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          Quick comparison
        </h2>
        <div className="mt-8 overflow-x-auto rounded-sm border border-navy/10 bg-white">
          <table className="min-w-[640px] w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-navy/10 bg-mist-soft text-xs uppercase tracking-[0.08em] text-stone">
                <th className="px-4 py-3 font-semibold">Tour</th>
                {showFormat && (
                  <th className="px-4 py-3 font-semibold">Format</th>
                )}
                <th className="px-4 py-3 font-semibold">Best for</th>
                <th className="px-4 py-3 font-semibold">Duration</th>
                <th className="px-4 py-3 font-semibold">From</th>
                <th className="px-4 py-3 font-semibold">
                  <span className="sr-only">Availability</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ tour, tableBestFor, tableDuration, tableFormat }) => (
                <tr
                  key={tour.id}
                  className="border-b border-navy/8 last:border-0"
                >
                  <td className="px-4 py-4">
                    <a
                      href={`#rank-${tour.id}`}
                      className="font-medium text-navy hover:text-teal"
                    >
                      {tour.shortName}
                    </a>
                    <p className="mt-0.5 text-xs text-stone-light">
                      {tour.supplier}
                    </p>
                  </td>
                  {showFormat && (
                    <td className="px-4 py-4 text-stone">
                      {tableFormat ?? "—"}
                    </td>
                  )}
                  <td className="px-4 py-4 text-stone">{tableBestFor}</td>
                  <td className="px-4 py-4 text-stone">{tableDuration}</td>
                  <td className="px-4 py-4 font-medium text-navy">
                    {tour.priceLabel}
                  </td>
                  <td className="px-4 py-4">
                    <a
                      href={viatorAffiliateUrl(tour.viatorUrl)}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="whitespace-nowrap text-sm font-semibold text-teal hover:text-teal-bright"
                    >
                      Check availability →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {footnote && (
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone">
            {footnote}
          </p>
        )}
        <p className="mt-4 text-xs text-stone-light">
          From-prices and durations reflect publicly listed product data at
          research time and can change. We may earn a commission through Viator
          links.
        </p>
      </div>
    </section>
  );
}

export function CategoryRankings({ category }: Props) {
  const rows = getRankedTours(category);

  return (
    <section className="bg-mist-soft px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl leading-tight text-navy md:text-4xl">
          {category.rankingsHeading}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
          {category.rankingsIntro}
        </p>

        <div className="mt-12 space-y-8">
          {rows.map(({ tour, rank, award, why, chooseIf, relatedLink }) => (
            <article
              key={tour.id}
              id={`rank-${tour.id}`}
              className="group relative scroll-mt-28 grid gap-8 overflow-hidden rounded-sm border border-navy/10 bg-white p-5 transition-colors hover:border-teal md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-10 md:p-8"
            >
              <a
                href={viatorAffiliateUrl(tour.viatorUrl)}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="absolute inset-0 z-0"
                aria-label={`See current price and availability for ${tour.fullName} on Viator`}
              />
              <div className="relative aspect-[7/5] overflow-hidden rounded-sm bg-navy">
                <Image
                  src={tour.image}
                  alt={tour.fullName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="relative z-10 pointer-events-none">
                <p className="text-sm font-semibold text-teal">
                  #{rank} — {award}
                </p>
                <h3 className="mt-2 font-display text-2xl text-navy md:text-3xl">
                  {tour.fullName}
                </h3>
                <p className="mt-2 text-sm text-stone">
                  Supplied by {tour.supplier}
                </p>
                <p className="mt-5 text-base leading-relaxed text-stone">
                  {why}
                </p>
                {relatedLink && (
                  <p className="pointer-events-auto mt-3 text-sm">
                    <a
                      href={relatedLink.href}
                      className="font-medium text-teal hover:text-teal-bright"
                    >
                      {relatedLink.label} →
                    </a>
                  </p>
                )}
                <div className="mt-5">
                  <p className="text-sm font-semibold text-navy">
                    Choose this if:
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {chooseIf.map((item) => (
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
                <span className="mt-7 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-navy-deep">
                  See current price &amp; availability on Viator →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategoryChooseGuide({ category }: Props) {
  const rows = getRankedTours(category);

  return (
    <section className="bg-mist px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl text-navy md:text-4xl">
          Which option is best for you?
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {rows.map(({ tour, award, chooseIf }) => (
            <a
              key={tour.id}
              href={viatorAffiliateUrl(tour.viatorUrl)}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="rounded-sm border border-navy/10 bg-white px-5 py-6 transition-colors hover:border-teal"
            >
              <p className="text-sm font-semibold text-teal">{award}</p>
              <h3 className="mt-2 font-display text-xl text-navy">
                {tour.shortName}
              </h3>
              <ul className="mt-4 space-y-2">
                {chooseIf.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-stone">
                    {item}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex text-sm font-semibold text-teal">
                See current price &amp; availability on Viator →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
