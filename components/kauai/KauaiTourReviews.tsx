import Image from "next/image";
import { kauaiTours } from "@/data/kauai-tours";
import { VIATOR_LINK_REL, viatorAffiliateUrl } from "@/lib/viator";

export function KauaiTourReviews() {
  return (
    <section id="reviews" className="bg-mist-soft px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
          Tour-by-tour
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-navy md:text-4xl">
          Kauai helicopter tour mini-reviews
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
          Each write-up uses research language based on published operator
          information and traveler feedback patterns — not first-person flight
          claims.
        </p>

        <div className="mt-12 space-y-8">
          {kauaiTours.map((tour) => (
            <a
              key={tour.id}
              id={tour.id}
              href={viatorAffiliateUrl(tour.viatorUrl)}
              target="_blank"
              rel={VIATOR_LINK_REL}
              className="group scroll-mt-28 grid gap-8 overflow-hidden rounded-sm border border-navy/10 bg-white p-5 transition-colors hover:border-teal md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-10 md:p-8"
            >
              <div className="relative aspect-[7/5] overflow-hidden rounded-sm bg-navy">
                <Image
                  src={tour.image}
                  alt={tour.fullName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>

              <div>
                {tour.rank != null && (
                  <p className="text-sm font-semibold text-teal">
                    Ranked #{tour.rank} in our featured comparison
                  </p>
                )}
                <h3 className="mt-2 font-display text-2xl leading-tight text-navy md:text-3xl">
                  {tour.fullName}
                </h3>
                <p className="mt-2 text-sm text-stone">
                  Supplied by {tour.supplier}
                </p>
                <p className="mt-4 text-base font-medium text-navy">
                  Best for: {tour.bestFor.toLowerCase()}
                </p>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  {tour.summary}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-stone-light">
                  Why it ranks here: {tour.rankReason}
                </p>

                <ul className="mt-6 space-y-2">
                  {tour.facts.map((fact) => (
                    <li
                      key={fact}
                      className="flex gap-2 text-sm leading-relaxed text-navy/90"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-8 inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-navy-deep">
                  See current price &amp; availability on Viator →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
