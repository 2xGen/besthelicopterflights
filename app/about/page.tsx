import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Why We Built Best Helicopter Flights",
  description:
    "Best Helicopter Flights is an independent research site that compares helicopter tours — starting with Kauai — so travelers can choose the right flight with clearer information.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Header variant="solid" />
      <main className="flex-1 min-w-0 w-full max-w-full pt-[4.25rem]">
        <section className="bg-navy-deep px-5 pb-14 pt-12 text-white md:px-8 md:pb-20 md:pt-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-bright">
              About
            </p>
            <h1 className="mt-4 font-display text-3xl leading-tight md:text-5xl md:leading-[1.12]">
              Why We Built Best Helicopter Flights
            </h1>
          </div>
        </section>

        <article className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl space-y-14 text-base leading-relaxed text-stone md:text-lg">
            <section className="space-y-5">
              <p>
                You know that moment when a helicopter flies overhead?
              </p>
              <p>
                You look up. You follow it until it disappears behind a
                building, a mountain or the horizon.
              </p>
              <p>
                We have always been fascinated by that feeling — and by the idea
                of seeing places from a perspective that you simply cannot get
                from the ground.
              </p>
              <p>
                That is why we built{" "}
                <strong className="font-semibold text-navy">
                  Best Helicopter Flights
                </strong>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl leading-tight text-navy md:text-3xl">
                Helicopter tours are more accessible than we thought
              </h2>
              <div className="mt-5 space-y-5">
                <p>
                  For a long time, we assumed helicopter flights were something
                  reserved for celebrities, wealthy travelers or very special
                  occasions.
                </p>
                <p>Then we started looking into them.</p>
                <p>
                  We found scenic flights, doors-off adventures, private
                  charters and waterfall tours at a much wider range of prices
                  than we expected.
                </p>
                <p>
                  A helicopter tour can still be an expensive experience. But
                  for many travelers, it is a realistic bucket-list experience
                  rather than an impossible luxury.
                </p>
                <p>
                  The difficult part is figuring out{" "}
                  <strong className="font-semibold text-navy">
                    which flight is actually worth booking.
                  </strong>
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl leading-tight text-navy md:text-3xl">
                So we started comparing them
              </h2>
              <div className="mt-5 space-y-5">
                <p>
                  Helicopter tours are surprisingly difficult to compare.
                </p>
                <p>
                  One flight might be 60 minutes while another is 45. One might
                  be doors-off. Another might offer all-window seating. Some are
                  private. Others focus on waterfalls, coastlines or specific
                  departure locations.
                </p>
                <p>
                  And marketplace listings can make it difficult to understand
                  those differences at a glance.
                </p>
                <p>
                  So we built a research site around the comparison.
                </p>
                <p>We look at things like:</p>
                <ul className="space-y-2 pl-1">
                  {[
                    "Published flight duration",
                    "Doors-off vs. doors-on format",
                    "Private vs. shared experiences",
                    "Seating configuration",
                    "Route and sightseeing focus",
                    "Traveler ratings and review volume",
                    "Published pricing",
                    "Departure locations",
                    "Booking and cancellation information",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  We then organize that information around the questions
                  travelers actually ask.
                </p>
                <ul className="space-y-3 border-l-2 border-teal/40 pl-5">
                  <li>
                    <Link
                      href="/kauai/doors-off-helicopter-tours"
                      className="font-medium text-navy hover:text-teal"
                    >
                      What is the best doors-off flight?
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/kauai/waterfall-helicopter-tours"
                      className="font-medium text-navy hover:text-teal"
                    >
                      Which tour is best for waterfalls?
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/kauai/photography-helicopter-tours"
                      className="font-medium text-navy hover:text-teal"
                    >
                      What is the best option for photography?
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/kauai/private-helicopter-tours"
                      className="font-medium text-navy hover:text-teal"
                    >
                      Is a private helicopter tour worth the extra cost?
                    </Link>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl leading-tight text-navy md:text-3xl">
                We are not helicopter operators
              </h2>
              <div className="mt-5 space-y-5">
                <p>
                  We want to be clear about what we are — and what we are not.
                </p>
                <p>
                  We are{" "}
                  <strong className="font-semibold text-navy">
                    not pilots, helicopter operators or travel agents.
                  </strong>
                </p>
                <p>
                  We don’t operate the aircraft, choose the routes or control
                  the prices.
                </p>
                <p>
                  We are independent researchers and helicopter enthusiasts who
                  compare publicly available information and traveler feedback
                  to make the decision easier.
                </p>
                <p>
                  When something is important to verify — such as current
                  pricing, availability, weight restrictions or cancellation
                  terms — we direct travelers to the live booking listing rather
                  than pretending that information is permanent.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl leading-tight text-navy md:text-3xl">
                We don’t believe there is one “best” helicopter tour
              </h2>
              <div className="mt-5 space-y-5">
                <p>
                  The best helicopter flight depends on what you want from it.
                </p>
                <p>
                  A photographer may want doors-off and all-window seating.
                </p>
                <p>
                  A couple celebrating a special occasion may prefer a private
                  charter.
                </p>
                <p>
                  Someone visiting Kauai for the waterfalls may care more about
                  the route than the cabin.
                </p>
                <p>
                  And another traveler may simply want the longest flight they
                  can get for their budget.
                </p>
                <p>
                  That’s why our rankings are organized around{" "}
                  <strong className="font-semibold text-navy">
                    different traveler needs
                  </strong>
                  , rather than simply declaring one tour the winner.
                </p>
                <p>Our goal is not to tell you what to book.</p>
                <p>
                  It is to help you understand your options well enough to
                  decide for yourself.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl leading-tight text-navy md:text-3xl">
                Starting with Kauai
              </h2>
              <div className="mt-5 space-y-5">
                <p>
                  Kauai is our first destination because it is almost impossible
                  to think of a better place to experience from the air.
                </p>
                <p>
                  Dramatic cliffs, deep valleys, remote waterfalls and the Na
                  Pali Coast make the island particularly interesting for
                  helicopter sightseeing.
                </p>
                <p>
                  We are starting with Kauai and plan to expand the research to
                  additional destinations over time.
                </p>
                <p className="pt-2">
                  <Link
                    href="/kauai"
                    className="inline-flex rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-deep"
                  >
                    Explore the Best Helicopter Tours on Kauai →
                  </Link>
                </p>
              </div>
            </section>

            <section className="rounded-sm border border-navy/10 bg-white px-6 py-8 md:px-8">
              <h2 className="font-display text-2xl leading-tight text-navy md:text-3xl">
                Independent research
              </h2>
              <div className="mt-5 space-y-5">
                <p>
                  Best Helicopter Flights is an independent research and
                  comparison site.
                </p>
                <p>
                  We may earn a commission when travelers book through links to
                  our partner booking platforms. This does not change the price
                  paid by the traveler.
                </p>
                <p>
                  We are not affiliated with the helicopter operators we cover
                  unless explicitly stated.
                </p>
                <p>
                  Our information is based on publicly available product
                  information and traveler feedback and can change over time.
                  Always check the live booking listing for the latest price,
                  availability and terms before booking.
                </p>
                <p>
                  Best Helicopter Flights is part of the{" "}
                  <strong className="font-semibold text-navy">2xGen</strong>{" "}
                  network of independent travel research websites.
                </p>
                <p>
                  <a
                    href="https://2xgen.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-teal hover:text-teal-bright"
                  >
                    Visit 2xGen.com →
                  </a>
                </p>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
