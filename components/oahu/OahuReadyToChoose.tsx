import { featuredOahuTours } from "@/data/oahu-tours";
import { VIATOR_LINK_REL, viatorAffiliateUrl } from "@/lib/viator";

export function OahuReadyToChoose() {
  return (
    <section className="bg-navy px-5 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl leading-tight md:text-4xl">
          Ready to choose?
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
          Check current availability, dates and pricing on Viator for the tours
          in our featured Oahu comparison. Each link opens the exact product
          listing for that flight, so you can review dates, seats and current
          pricing in one step.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {featuredOahuTours.map((tour) => (
            <li key={tour.id}>
              <a
                href={viatorAffiliateUrl(tour.viatorUrl)}
                target="_blank"
                rel={VIATOR_LINK_REL}
                className="flex items-center justify-between gap-4 rounded-sm border border-white/15 bg-white/5 px-5 py-4 transition-colors hover:border-teal-bright/50 hover:bg-white/10"
              >
                <span>
                  <span className="block font-medium text-white">
                    {tour.shortName}
                  </span>
                  <span className="mt-1 block text-sm text-white/55">
                    From {tour.priceLabel}
                  </span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-teal-bright">
                  Check this tour on Viator →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-white/45">
          Affiliate disclosure: we may earn a commission if you book through
          these Viator links. That does not change our research ranking.
        </p>
      </div>
    </section>
  );
}
