export function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="border-b border-navy/8 bg-mist px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
            What we do
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-navy md:text-4xl">
            Independent research and comparisons of helicopter tours
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-stone">
            Best Helicopter Flights is a research product — not a pilot service,
            helicopter operator, or travel agency. We help travelers compare
            helicopter experiences before booking.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-6 border-l border-navy/10 pl-0 md:pl-10">
          <p className="text-base leading-relaxed text-stone">
            Our comparisons are based on publicly available operator
            information, traveler reviews, route details, pricing, cancellation
            policies and other booking information.
          </p>
          <p className="text-base leading-relaxed text-stone">
            We look for consistent patterns across sources rather than relying
            on a single review or rating — so you can make a clearer choice with
            less noise.
          </p>
        </div>
      </div>
    </section>
  );
}
