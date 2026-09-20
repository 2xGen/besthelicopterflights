import { featuredOahuTours } from "@/data/oahu-tours";
import { VIATOR_LINK_REL, viatorAffiliateUrl } from "@/lib/viator";

export function OahuComparisonTable() {
  return (
    <section
      id="comparison"
      className="min-w-0 max-w-full bg-mist px-5 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
          Compared &amp; ranked
        </p>
        <h2 className="mt-4 font-display text-3xl leading-tight text-navy md:text-4xl">
          Best Oahu helicopter tours
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-stone md:text-lg">
          This ranking is based on published route and duration details, format
          clarity (doors-on/off, private, specialty), departure base and value
          relative to experience — not Viator’s default listing order. “Best
          for” labels explain why each tour earns its place.
        </p>

        <ul className="mt-10 space-y-3 md:hidden">
          {featuredOahuTours.map((tour) => (
            <li
              key={tour.id}
              className="border border-navy/10 bg-white px-4 py-4"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-display text-lg text-teal">#{tour.rank}</p>
                <p className="font-medium text-navy">{tour.priceLabel}</p>
              </div>
              <a
                href={`#${tour.id}`}
                className="mt-1 block font-medium text-navy hover:text-teal"
              >
                {tour.shortName}
              </a>
              <p className="mt-0.5 text-xs text-stone-light">{tour.supplier}</p>
              <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-stone">
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-stone-light">
                    Best for
                  </dt>
                  <dd className="mt-0.5">{tour.bestFor}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-stone-light">
                    Duration
                  </dt>
                  <dd className="mt-0.5">{tour.duration}</dd>
                </div>
              </dl>
              <a
                href={viatorAffiliateUrl(tour.viatorUrl)}
                target="_blank"
                rel={VIATOR_LINK_REL}
                className="mt-4 inline-block text-sm font-semibold text-teal hover:text-teal-bright"
              >
                Check availability →
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 hidden overflow-hidden rounded-sm border border-navy/10 bg-white md:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-navy/10 bg-mist-soft text-xs uppercase tracking-[0.08em] text-stone">
                <th className="px-4 py-3 font-semibold">Rank</th>
                <th className="px-4 py-3 font-semibold">Tour</th>
                <th className="px-4 py-3 font-semibold">Best for</th>
                <th className="px-4 py-3 font-semibold">Duration</th>
                <th className="px-4 py-3 font-semibold">From</th>
                <th className="px-4 py-3 font-semibold">
                  <span className="sr-only">Availability</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {featuredOahuTours.map((tour) => (
                <tr
                  key={tour.id}
                  className="border-b border-navy/8 last:border-0"
                >
                  <td className="px-4 py-4 font-display text-lg text-teal">
                    {tour.rank}
                  </td>
                  <td className="px-4 py-4">
                    <a
                      href={`#${tour.id}`}
                      className="font-medium text-navy hover:text-teal"
                    >
                      {tour.shortName}
                    </a>
                    <p className="mt-0.5 text-xs text-stone-light">
                      {tour.supplier}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-stone">{tour.bestFor}</td>
                  <td className="px-4 py-4 text-stone">{tour.duration}</td>
                  <td className="px-4 py-4 font-medium text-navy">
                    {tour.priceLabel}
                  </td>
                  <td className="px-4 py-4">
                    <a
                      href={viatorAffiliateUrl(tour.viatorUrl)}
                      target="_blank"
                      rel={VIATOR_LINK_REL}
                      className="text-sm font-semibold text-teal hover:text-teal-bright"
                    >
                      Check availability →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-stone-light">
          From-prices and durations reflect publicly listed Viator product data
          at research time and can change. We may earn a commission when you
          book through Viator links on this page.
        </p>
      </div>
    </section>
  );
}
