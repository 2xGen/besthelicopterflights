import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroAtmosphere, HeroSiteMark } from "@/components/HeroChrome";
import { BookingButton } from "@/components/flights/BookingButton";
import { CompareRemoveButton } from "@/components/flights/CompareRemoveButton";
import { destinationResultsPath, searchableDestinations } from "@/data/destinations";
import {
  cabinLabel,
  doorsLabel,
  flightResultsHref,
  ratingWord,
  type Flight,
} from "@/data/flights";
import { resolveFlightsBySlugs } from "@/lib/flight-search";
import { createPageMetadata } from "@/lib/seo";
export const metadata = {
  ...createPageMetadata({
    title: "Compare Helicopter Flights Side-by-Side",
    description:
      "Compare Hawaii helicopter flights by duration, doors format, cabin type, price and operator before you book.",
    path: "/compare",
  }),
  robots: { index: false, follow: true },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const MAX = 3;

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function pricePerMinute(f: Flight): number | null {
  if (f.priceFrom == null || !f.durationMinutes) return null;
  return f.priceFrom / f.durationMinutes;
}

/** Index of the single best value, or -1 when tied/missing so nothing is highlighted misleadingly. */
function bestIndex(values: Array<number | null>, prefer: "min" | "max"): number {
  const known = values
    .map((v, i) => ({ v, i }))
    .filter((x): x is { v: number; i: number } => x.v != null);
  if (known.length < 2) return -1;
  const target =
    prefer === "min"
      ? Math.min(...known.map((x) => x.v))
      : Math.max(...known.map((x) => x.v));
  const winners = known.filter((x) => x.v === target);
  return winners.length === 1 ? winners[0].i : -1;
}

type Cell = { text: string; known: boolean };

type Row = {
  label: string;
  icon: ReactNode;
  cells: Cell[];
  best: number;
  bestNote?: string;
};

const iconClass = "h-4 w-4 shrink-0 text-stone-light";
const icons = {
  clock: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  door: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
      <path d="M6 20V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="14.5" cy="12.5" r="1" fill="currentColor" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
      <circle cx="9" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5M16 6a3 3 0 0 1 0 5.6M17.5 14.7c1.6.6 2.7 2 3 4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
      <path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8-9 9-8-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1.3" fill="currentColor" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
      <path d="m12 4 2.4 5 5.4.7-4 3.7 1 5.4L12 16.2 7.2 18.8l1-5.4-4-3.7 5.4-.7L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
      <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
      <path d="M5 20V6l7-2v16M12 9h7v11M3 20h18M8 9h1M8 13h1M15 13h1M15 16h1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

function buildRows(flights: Flight[]): { rows: Row[]; unknownLabels: string[] } {
  const all: Row[] = [
    {
      label: "Flight time",
      icon: icons.clock,
      cells: flights.map((f) => ({
        text: f.experienceLabel
          ? `${f.durationLabel} (${f.experienceLabel} total)`
          : f.durationLabel,
        known: f.durationMinutes != null,
      })),
      best: bestIndex(flights.map((f) => f.durationMinutes), "max"),
      bestNote: "Longest",
    },
    {
      label: "Price per flight minute",
      icon: icons.tag,
      cells: flights.map((f) => {
        const ppm = pricePerMinute(f);
        return { text: ppm != null ? `$${ppm.toFixed(2)}` : "—", known: ppm != null };
      }),
      best: bestIndex(flights.map(pricePerMinute), "min"),
      bestNote: "Best value",
    },
    {
      label: "Doors",
      icon: icons.door,
      cells: flights.map((f) => ({
        text: f.doors === "unknown" ? "Not specified" : doorsLabel(f.doors),
        known: f.doors !== "unknown",
      })),
      best: -1,
    },
    {
      label: "Cabin",
      icon: icons.users,
      cells: flights.map((f) => ({
        text: f.cabin === "unknown" ? "Not specified" : cabinLabel(f.cabin),
        known: f.cabin !== "unknown",
      })),
      best: -1,
    },
    {
      label: "Best for",
      icon: icons.route,
      cells: flights.map((f) => ({ text: f.bestFor, known: Boolean(f.bestFor) })),
      best: -1,
    },
    {
      label: "Route highlights",
      icon: icons.route,
      cells: flights.map((f) => ({
        text: f.routeHighlights.length ? f.routeHighlights.join(", ") : "Not specified",
        known: f.routeHighlights.length > 0,
      })),
      best: -1,
    },
    {
      label: "Operator",
      icon: icons.building,
      cells: flights.map((f) => ({ text: f.operator, known: true })),
      best: -1,
    },
    {
      label: "Departure",
      icon: icons.pin,
      cells: flights.map((f) => ({
        text: f.departure ?? "Not specified",
        known: f.departure != null,
      })),
      best: -1,
    },
    {
      label: "Reviews",
      icon: icons.star,
      cells: flights.map((f) => ({
        text:
          f.reviewCount != null
            ? `${f.reviewCount.toLocaleString("en-US")} reviews`
            : "Not listed",
        known: f.reviewCount != null,
      })),
      best: bestIndex(flights.map((f) => f.reviewCount), "max"),
      bestNote: "Most reviewed",
    },
    {
      label: "Free cancellation",
      icon: icons.tag,
      cells: flights.map((f) => ({
        text: f.freeCancellation ? "Yes" : "Not specified",
        known: f.freeCancellation != null,
      })),
      best: -1,
    },
    {
      label: "Weight limits",
      icon: icons.users,
      cells: flights.map((f) => ({
        text: f.weightRestriction ?? "Not specified",
        known: f.weightRestriction != null,
      })),
      best: -1,
    },
  ];

  const rows = all.filter((r) => r.cells.some((c) => c.known));
  const unknownLabels = all
    .filter((r) => !r.cells.some((c) => c.known))
    .map((r) => r.label.toLowerCase());
  return { rows, unknownLabels };
}

function Verdict({ label, flight }: { label: string; flight: Flight | undefined }) {
  if (!flight) return null;
  return (
    <div className="rounded-xl border border-navy/10 bg-white px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.06em] text-success">
        {label}
      </p>
      <p className="mt-1 line-clamp-1 text-sm font-semibold text-navy">
        {flight.shortName}
      </p>
    </div>
  );
}

export default async function ComparePage({ searchParams }: Props) {
  const sp = await searchParams;
  const ids = (first(sp.ids) || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, MAX);
  const selected = await resolveFlightsBySlugs(ids);

  const { rows, unknownLabels } = buildRows(selected);
  const priceBest = bestIndex(selected.map((f) => f.priceFrom), "min");
  const ratingBest = bestIndex(selected.map((f) => f.rating), "max");
  const durationBest = bestIndex(selected.map((f) => f.durationMinutes), "max");
  const valueBest = bestIndex(selected.map(pricePerMinute), "min");
  const emptySlots = Math.max(0, MAX - selected.length);
  const islandForMore =
    searchableDestinations.find((d) => d.slug === selected[0]?.destination) ??
    searchableDestinations[0];
  const gridCols =
    "grid-cols-[150px_repeat(var(--cols),minmax(220px,1fr))] md:grid-cols-[190px_repeat(var(--cols),minmax(0,1fr))]";
  const colStyle = { "--cols": selected.length + emptySlots } as CSSProperties;

  return (
    <>
      <Header />
      <main className="flex-1 min-w-0 w-full max-w-full pt-[4.25rem]">
        <section className="relative overflow-hidden bg-navy-deep px-5 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8">
          <HeroAtmosphere />
          <div className="relative mx-auto max-w-6xl">
            <HeroSiteMark className="mb-3" />
            <nav aria-label="Breadcrumb" className="text-sm text-sky">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2 text-white/40">/</span>
              <span className="text-white">Compare flights</span>
            </nav>
            <h1 className="mt-3 text-2xl text-white md:text-4xl">
              Compare helicopter flights
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/75 md:text-base">
              {selected.length >= 2
                ? `Comparing ${selected.length} flights side-by-side. Winning values are highlighted in green.`
                : "Line up flight time, doors format, cabin type and price — then book the one that fits."}
            </p>
          </div>
        </section>

        <section className="px-5 pb-16 pt-8 md:px-8 md:pt-10">
          <div className="mx-auto max-w-6xl">
            {selected.length === 0 ? (
              <div className="rounded-xl border border-navy/10 bg-white px-6 py-12 text-center">
                <p className="font-display text-xl text-navy">
                  No flights selected yet
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm text-stone">
                  Add up to three flights to compare from any destination’s
                  results, then come back here to see them side-by-side.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {searchableDestinations.map((d) => (
                    <Link
                      key={d.slug}
                      href={`${destinationResultsPath(d.slug)}#results`}
                      className="rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-teal hover:text-teal"
                    >
                      {d.shortLabel} flights
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {selected.length >= 2 ? (
                  <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
                    <Verdict label="Lowest price" flight={selected[priceBest]} />
                    <Verdict label="Longest flight" flight={selected[durationBest]} />
                    <Verdict label="Best value per minute" flight={selected[valueBest]} />
                    <Verdict label="Highest rated" flight={selected[ratingBest]} />
                  </div>
                ) : null}

                <div className="overflow-x-auto rounded-xl border border-navy/10 bg-white">
                  <div className={`grid min-w-max md:min-w-0 ${gridCols}`} style={colStyle}>
                    <div className="sticky left-0 z-10 border-b border-r border-navy/8 bg-white p-4">
                      <p className="font-display text-base text-navy">
                        {selected.length} of {MAX} selected
                      </p>
                      <p className="mt-1 text-xs text-stone">
                        Prices are from-prices per person.
                      </p>
                    </div>

                    {selected.map((f, i) => (
                      <div
                        key={f.id}
                        className="flex flex-col border-b border-r border-navy/8 p-3 last:border-r-0"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-mist-soft">
                          <Image
                            src={f.image}
                            unoptimized={f.source === "viator"}
                            alt={f.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 220px, 320px"
                          />
                          <CompareRemoveButton
                            flightId={f.id}
                            remainingSlugs={selected
                              .filter((x) => x.id !== f.id)
                              .map((x) => x.slug)}
                          />
                        </div>
                        <Link
                          href={flightResultsHref(f)}
                          className="mt-3 line-clamp-2 font-display text-base leading-snug text-teal hover:underline"
                        >
                          {f.title}
                        </Link>
                        <p className="mt-1 text-xs text-stone">{f.operator}</p>

                        {f.rating != null ? (
                          <p
                            className={`mt-3 flex items-center gap-2 text-sm ${
                              ratingBest === i ? "font-semibold" : ""
                            }`}
                          >
                            <span className="rounded-md rounded-bl-none bg-navy-deep px-1.5 py-0.5 text-xs font-bold text-white">
                              {f.rating.toFixed(1)}
                            </span>
                            <span className="text-navy">{ratingWord(f.rating)}</span>
                          </p>
                        ) : (
                          <p className="mt-3 text-xs text-stone">No rating listed</p>
                        )}

                        <div className="mt-auto pt-4">
                          <p className="text-xs text-stone">From, per person</p>
                          <p className="flex items-baseline gap-2">
                            <span className="font-display text-2xl text-navy">
                              {f.priceLabel}
                            </span>
                            {priceBest === i ? (
                              <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-bold text-success">
                                Lowest
                              </span>
                            ) : null}
                          </p>
                          <BookingButton
                            flight={f}
                            className="mt-3 w-full"
                          />
                        </div>
                      </div>
                    ))}

                    {Array.from({ length: emptySlots }).map((_, i) => (
                      <Link
                        key={`empty-${i}`}
                        href={`${destinationResultsPath(islandForMore.slug)}#results`}
                        className="m-3 flex min-h-[220px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-navy/15 text-center text-sm text-stone transition-colors hover:border-teal hover:text-teal"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mist-soft text-xl font-bold text-teal">
                          +
                        </span>
                        <span className="mt-2 font-semibold">Add a flight</span>
                        <span className="mt-0.5 text-xs">
                          Browse {islandForMore.shortLabel} flights
                        </span>
                      </Link>
                    ))}

                    {rows.map((row, rowIndex) => (
                      <div key={row.label} className="contents">
                        <div
                          className={`sticky left-0 z-10 flex items-center gap-2 border-r border-navy/8 px-4 py-3 text-sm font-medium text-stone ${
                            rowIndex % 2 === 0 ? "bg-mist" : "bg-white"
                          }`}
                        >
                          {row.icon}
                          {row.label}
                        </div>
                        {row.cells.map((cell, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-2 border-r border-navy/8 px-4 py-3 text-sm last:border-r-0 ${
                              rowIndex % 2 === 0 ? "bg-mist" : "bg-white"
                            } ${
                              row.best === i
                                ? "font-semibold text-success"
                                : cell.known
                                  ? "text-navy"
                                  : "text-stone-light"
                            }`}
                          >
                            {cell.text}
                            {row.best === i && row.bestNote ? (
                              <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-bold">
                                {row.bestNote}
                              </span>
                            ) : null}
                          </div>
                        ))}
                        {Array.from({ length: emptySlots }).map((_, i) => (
                          <div
                            key={`pad-${i}`}
                            className={rowIndex % 2 === 0 ? "bg-mist" : "bg-white"}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {unknownLabels.length > 0 ? (
                  <div className="mt-4 flex gap-3 rounded-xl border border-sun/50 bg-sun/10 px-4 py-3 text-sm text-navy">
                    <span aria-hidden="true" className="font-bold">
                      i
                    </span>
                    <p>
                      Not published for these flights:{" "}
                      <span className="font-semibold">
                        {unknownLabels.join(", ")}
                      </span>
                      . Check them on the booking page before you pay.
                    </p>
                  </div>
                ) : null}

                <p className="mt-4 text-xs leading-relaxed text-stone-light">
                  Comparison uses researched tour attributes and indicative
                  listing prices. Prices and policies change — confirm
                  everything on the provider booking page.
                </p>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
