import { featuredKauaiTours } from "@/data/kauai-tours";
import { viatorAffiliateUrl } from "@/lib/viator";

function formatReviews(count: number | null) {
  if (count == null) return "—";
  return count.toLocaleString("en-US");
}

export function KauaiComparisonTable() {
  return (
    <section id="comparison" className="bg-mist px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
          Compared &amp; ranked
        </p>
        <h2 className="mt-4 font-display text-3xl leading-tight text-navy md:text-4xl">
          Best Kauai helicopter tours
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-stone md:text-lg">
          This ranking is based on traveler feedback (rating and review volume),
          published route and duration details, value relative to experience and
          how clearly each tour fits a traveler need — not Viator’s default
          listing order. “Best for” labels explain why each tour earns its
          place.
        </p>

        <div className="mt-10 overflow-x-auto rounded-sm border border-navy/10 bg-white">
          <table className="min-w-[720px] w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-navy/10 bg-mist-soft text-xs uppercase tracking-[0.08em] text-stone">
                <th className="px-4 py-3 font-semibold">Rank</th>
                <th className="px-4 py-3 font-semibold">Tour</th>
                <th className="px-4 py-3 font-semibold">Best for</th>
                <th className="px-4 py-3 font-semibold">Duration</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 font-semibold">Reviews</th>
                <th className="px-4 py-3 font-semibold">From</th>
                <th className="px-4 py-3 font-semibold">
                  <span className="sr-only">Availability</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {featuredKauaiTours.map((tour) => (
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
                  <td className="px-4 py-4 text-navy">
                    {tour.rating != null ? tour.rating.toFixed(1) : "—"}
                  </td>
                  <td className="px-4 py-4 text-stone">
                    {formatReviews(tour.reviews)}
                  </td>
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

        <p className="mt-4 text-xs leading-relaxed text-stone-light">
          Ratings, review counts and from-prices reflect publicly listed Viator
          product data at research time and can change. We may earn a commission
          when you book through Viator links on this page.
        </p>
      </div>
    </section>
  );
}
