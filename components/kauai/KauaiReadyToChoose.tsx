import { featuredKauaiTours } from "@/data/kauai-tours";
import { VIATOR_LINK_REL, viatorGoPath } from "@/lib/viator";

const pickLabels: Record<string, string> = {
  "private-doors-off": "Choose private",
  "eco-adventure": "Choose overall sightseeing",
  "waterfall-safari": "Choose waterfalls",
  "luxury-doors-off": "Choose 60-minute doors-off",
  "kauai-experience": "Choose all-window-seat doors-off",
};

export function KauaiReadyToChoose() {
  return (
    <section className="bg-navy px-5 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl leading-tight md:text-4xl">
          Ready to compare Kauai helicopter tours?
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
          Start with the type of experience you want rather than trying to
          compare every available flight at once. Check current dates, prices
          and availability before booking, as tour details can change.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {featuredKauaiTours.map((tour) => (
            <li key={tour.id}>
              <a
                href={viatorGoPath(tour.viatorUrl)}
                target="_blank"
                rel={VIATOR_LINK_REL}
                className="flex items-center justify-between gap-4 rounded-sm border border-white/15 bg-white/5 px-5 py-4 transition-colors hover:border-teal-bright/50 hover:bg-white/10"
              >
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-sky">
                    {pickLabels[tour.id] ?? "Compare"}
                  </span>
                  <span className="mt-1 block font-medium text-white">
                    {tour.shortName}
                  </span>
                  <span className="mt-1 block text-sm text-white/55">
                    From {tour.priceLabel}
                  </span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-sky">
                  Check on Viator →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-white/45">
          We may earn a commission if you book through Viator links on this
          page. This does not determine our rankings.
        </p>
      </div>
    </section>
  );
}
