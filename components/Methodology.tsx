const criteria = [
  {
    number: "01",
    title: "Traveler feedback",
    body: "Review volume, ratings and recurring themes in traveler feedback.",
  },
  {
    number: "02",
    title: "Route & experience",
    body: "What travelers actually see and experience, including flight duration, scenery and route coverage.",
  },
  {
    number: "03",
    title: "Value",
    body: "Price relative to duration, route and experience.",
  },
  {
    number: "04",
    title: "Booking terms",
    body: "Cancellation policies, weight restrictions, additional fees and other important conditions.",
  },
  {
    number: "05",
    title: "Operator information",
    body: "Published information about the operator, aircraft, locations and experience.",
  },
];

export function Methodology() {
  return (
    <section
      id="how-we-compare"
      className="bg-navy px-5 py-20 text-white md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-bright">
          Methodology
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
          How we compare helicopter tours
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
          We research each tour using publicly available operator information,
          traveler reviews, route details, pricing, cancellation policies and
          other booking information. We look for consistent patterns across
          sources rather than relying on a single review or rating.
        </p>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {criteria.map((item, index) => (
            <li
              key={item.number}
              className="animate-reveal-up border-t border-white/15 pt-6"
              style={{ animationDelay: `${0.08 * index}s` }}
            >
              <span className="font-display text-sm text-teal-bright">
                {item.number}
              </span>
              <h3 className="mt-3 font-display text-xl text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {item.body}
              </p>
            </li>
          ))}
        </ol>

        <aside className="mt-16 max-w-3xl border-l-2 border-teal pl-6">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-bright">
            How we write
          </p>
          <p className="mt-3 text-base leading-relaxed text-white/80">
            Based on traveler reviews and operator-published information — never
            as if we personally flew every route. You will see language like
            “Travelers consistently report…” and “According to the operator’s
            published information…” so the research stays clear and trustworthy.
          </p>
        </aside>
      </div>
    </section>
  );
}
