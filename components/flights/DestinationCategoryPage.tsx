import Link from "next/link";
import { BookingButton } from "@/components/flights/BookingButton";
import { HeroAtmosphere, HeroSiteMark } from "@/components/HeroChrome";
import { DestinationCategoryNav } from "@/components/flights/DestinationCategoryNav";
import { FlightResultsList } from "@/components/flights/FlightResultsList";
import {
  categoriesFor,
  categoryPath,
  type DestinationCategory,
  type DurationBucket,
} from "@/data/destination-categories";
import { getDestination } from "@/data/destinations";
import {
  cabinLabel,
  filterAndSortFlights,
  flightResultsHref,
  ratingWord,
  weightedRating,
  type Flight,
} from "@/data/flights";
import {
  cheapestCovering,
  isPrivatePoint,
  median,
  pricePerMinute,
  pricePoints,
  typicalTransferCost,
  type PricePoint,
} from "@/lib/flight-options";

type Props = {
  category: DestinationCategory;
  /** Sightseeing inventory for the destination (see resolveDetailedSightseeing). */
  inventory: Flight[];
  /** Flights matching the category. */
  flights: Flight[];
  /** Non-sightseeing listings matching `category.packages`. */
  packages?: Flight[];
};

function money(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function flightPerMinute(f: Flight): number | null {
  return pricePerMinute({ price: f.priceFrom, minutes: f.durationMinutes });
}

function averagePerMinute(flights: Flight[]): number | null {
  return median(flights.map(flightPerMinute).filter((v): v is number => v != null));
}

const DEFAULT_PRICE_BANDS: NonNullable<DestinationCategory["priceBands"]> = [
  { label: "Under 20 min", min: 0, max: 20 },
  { label: "20–29 min", min: 20, max: 30 },
  { label: "30–44 min", min: 30, max: 45 },
  { label: "45 min or longer", min: 45 },
];
const NOT_STATED_BAND = "Flight time not stated";
const PRIVATE_BAND = "Private flights";

type OperatorGroup = {
  name: string;
  flights: Flight[];
  rating: number | null;
  reviews: number;
  score: number;
};

function knownOperator(f: Flight): string | null {
  return f.operator.startsWith("See provider") ? null : f.operator;
}

function sellerLine(f: Flight): string {
  return [knownOperator(f), f.departure].filter(Boolean).join(" · ");
}

function groupByOperator(flights: Flight[]): OperatorGroup[] {
  const groups = new Map<string, Flight[]>();
  for (const f of flights) {
    const name = knownOperator(f);
    if (name) groups.set(name, [...(groups.get(name) ?? []), f]);
  }
  return [...groups.entries()]
    .map(([name, list]) => {
      const rated = list.filter((f) => f.rating != null && f.reviewCount);
      const reviews = rated.reduce((sum, f) => sum + (f.reviewCount ?? 0), 0);
      const rating = reviews
        ? rated.reduce((sum, f) => sum + (f.rating ?? 0) * (f.reviewCount ?? 0), 0) / reviews
        : null;
      return {
        name,
        flights: filterAndSortFlights(list, { sort: "price-asc" }),
        rating,
        reviews,
        score: weightedRating({ rating, reviewCount: reviews }) ?? 0,
      };
    })
    .sort((a, b) => b.score - a.score || b.flights.length - a.flights.length);
}

/** Range of bookable flight lengths, counting every option a listing sells. */
function minuteRange(flights: Flight[]): string | null {
  const mins = flights.flatMap((f) => {
    const options = (f.options ?? []).map((o) => o.minutes).filter((m): m is number => m != null);
    return options.length ? options : f.durationMinutes != null ? [f.durationMinutes] : [];
  });
  if (mins.length === 0) return null;
  const lo = Math.min(...mins);
  const hi = Math.max(...mins);
  return lo === hi ? `${lo} min` : `${lo}–${hi} min`;
}

function RatingCell({ flight }: { flight: Flight }) {
  if (flight.rating == null) return <span className="text-stone-light">Not rated yet</span>;
  return (
    <>
      {flight.rating.toFixed(1)}{" "}
      <span className="text-stone">
        {ratingWord(flight.rating)}
        {flight.reviewCount != null ? ` · ${flight.reviewCount.toLocaleString("en-US")}` : ""}
      </span>
    </>
  );
}

function FlightCell({ flight, note }: { flight: Flight; note?: string | null }) {
  const seller = sellerLine(flight);
  return (
    <td className="max-w-[320px] px-4 py-3">
      <Link href={flightResultsHref(flight)} className="font-medium text-teal hover:underline">
        {flight.title}
      </Link>
      {seller ? <p className="mt-0.5 text-xs text-stone">{seller}</p> : null}
      {note ? <p className="mt-0.5 text-xs text-stone-light">{note}</p> : null}
    </td>
  );
}

function feeNote(flight: Flight): string | null {
  if (!flight.fees) return null;
  return flight.fees.status === "extra" ? `Not included: ${flight.fees.note}` : `Includes ${flight.fees.note}`;
}

function pointNote(point: PricePoint): string | null {
  const notes = [
    point.transfers ? "Includes hotel transfers" : null,
    point.perGroup ? "Priced per group" : null,
    point.optionCount > 1 && point.minutes != null
      ? `${point.minutes}-min option of ${point.optionCount}`
      : null,
    feeNote(point.flight),
  ].filter(Boolean);
  return notes.length ? notes.join(" · ") : null;
}

function pointMinutes(point: PricePoint): string {
  return point.minutes != null ? `${point.minutes} min` : point.flight.durationLabel;
}

const TABLE = "w-full min-w-[760px] text-left text-sm";
const TABLE_WRAP = "mt-3 overflow-x-auto rounded-xl border border-navy/10 bg-white";
const THEAD = "bg-mist text-xs uppercase tracking-[0.06em] text-stone";
const TH = "px-4 py-3 font-semibold";

function PriceView({ flights, category }: { flights: Flight[]; category: DestinationCategory }) {
  const points = flights.flatMap(pricePoints);
  const shared = points.filter((p) => !isPrivatePoint(p));
  const groups = category.priceGroups;
  const bands: Array<{ label: string; note?: string; points: PricePoint[] }> = [
    ...(groups
      ? groups.map((group) => ({
          label: group.label,
          note: group.note,
          points: shared.filter((p) => groups.find((g) => g.match(p.flight)) === group),
        }))
      : [
          ...(category.priceBands ?? DEFAULT_PRICE_BANDS).map((band) => ({
            label: band.label,
            points: shared.filter(
              (p) =>
                p.minutes != null && p.minutes >= band.min && (band.max == null || p.minutes < band.max),
            ),
          })),
          { label: NOT_STATED_BAND, points: shared.filter((p) => p.minutes == null) },
        ]),
    { label: PRIVATE_BAND, points: points.filter(isPrivatePoint) },
  ]
    .map((band) => ({
      ...band,
      points: [...band.points].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity)),
    }))
    .filter((band) => band.points.length > 0);
  const transferCost = typicalTransferCost(flights);
  const splitsOptions = flights.some((f) => (f.options?.length ?? 0) > 1);
  const feesExtra = flights.filter((f) => f.fees?.status === "extra").length;
  const feesIncluded = flights.filter((f) => f.fees?.status === "included").length;

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          {category.priceHeading ?? `Prices by ${groups ? "trip type" : "flight time"}`}
        </h2>
        <p className="mt-2 max-w-2xl text-stone">
          Shared flights, priced per person
          {splitsOptions ? ", with each flight-length option compared separately" : ""}. Private
          flights are listed separately because most are priced for the whole aircraft.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {bands
            .filter((band) => band.label !== NOT_STATED_BAND)
            .map((band) => {
              const prices = band.points.map((p) => p.price).filter((p): p is number => p != null);
              const perMinute = median(
                band.points.map(pricePerMinute).filter((v): v is number => v != null),
              );
              const listings = new Set(band.points.map((p) => p.flight.id)).size;
              return (
                <li key={band.label} className="rounded-lg border border-navy/10 bg-white px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-teal">
                    {band.label}
                  </p>
                  {band.note ? <p className="mt-1 text-xs text-stone">{band.note}</p> : null}
                  <p className="mt-2 font-display text-2xl text-navy">
                    {prices.length ? `From ${money(Math.min(...prices))}` : "—"}
                  </p>
                  <p className="mt-1 text-sm text-stone">
                    {listings} listing{listings === 1 ? "" : "s"}
                    {median(prices) != null ? ` · typical ${money(median(prices)!)}` : ""}
                  </p>
                  {band.label === PRIVATE_BAND ? (
                    <p className="mt-1 text-xs text-stone-light">Usually priced per aircraft</p>
                  ) : perMinute != null ? (
                    <p className="mt-1 text-xs text-stone-light">
                      ≈ {money(perMinute)} per minute of flying
                    </p>
                  ) : null}
                </li>
              );
            })}
        </ul>
        {transferCost != null ? (
          <p className="mt-4 max-w-2xl rounded-lg bg-white px-4 py-3 text-sm text-stone">
            <span className="font-semibold text-navy">Hotel transfers:</span> where a listing sells
            the same flight with and without pickup, adding transfers typically costs{" "}
            {money(transferCost)} more per person. Prices below are flight only unless marked.
          </p>
        ) : null}
        {feesExtra > 0 ? (
          <p className="mt-3 max-w-2xl rounded-lg bg-white px-4 py-3 text-sm text-stone">
            <span className="font-semibold text-navy">Fees on top:</span> {feesExtra} of{" "}
            {flights.length} listings exclude park, government or fuel fees from the price, usually
            payable at check-in{feesIncluded > 0 ? `; ${feesIncluded} say these fees are included` : ""}.
            Each row shows what the listing states; listings without a note don’t mention fees.
          </p>
        ) : null}
      </div>

      {bands.map((band) => (
        <div key={band.label}>
          <h3 className="font-display text-xl text-navy">{band.label}</h3>
          <div className={TABLE_WRAP}>
            <table className={TABLE}>
              <thead className={THEAD}>
                <tr>
                  <th className={TH}>Flight</th>
                  <th className={TH}>Flight time</th>
                  <th className={TH}>Cabin</th>
                  <th className={TH}>From</th>
                  <th className={TH}>Per minute</th>
                  <th className={TH}>Rating</th>
                  <th className={TH}>
                    <span className="sr-only">Book</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/8">
                {band.points.map((p) => {
                  const perMinute = pricePerMinute(p);
                  return (
                    <tr key={`${p.flight.id}-${p.minutes}-${p.private}`} className="align-top">
                      <FlightCell flight={p.flight} note={pointNote(p)} />
                      <td className="whitespace-nowrap px-4 py-3 text-navy">{pointMinutes(p)}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-navy">
                        {isPrivatePoint(p) ? "Private" : cabinLabel(p.flight.cabin)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-navy">
                        {p.price != null ? money(p.price) : p.flight.priceLabel}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-navy">
                        {perMinute != null && !isPrivatePoint(p) ? (
                          money(perMinute)
                        ) : (
                          <span className="text-stone-light">—</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-navy">
                        <RatingCell flight={p.flight} />
                      </td>
                      <td className="px-4 py-3">
                        <BookingButton flight={p.flight} className="whitespace-nowrap px-3 py-2 text-xs" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function LandmarkView({
  flights,
  inventory,
  focus,
  destinationName,
}: {
  flights: Flight[];
  inventory: Flight[];
  focus: NonNullable<DestinationCategory["landmarkFocus"]>;
  destinationName: string;
}) {
  const rows = flights
    .map((f) => ({ flight: f, cover: cheapestCovering(f, focus.name) }))
    .sort((a, b) => (a.cover?.point.price ?? Infinity) - (b.cover?.point.price ?? Infinity));
  const alsoCounts = focus.also.map((name) => ({
    name,
    count: flights.filter((f) => f.landmarks?.includes(name)).length,
  }));
  const shared = (list: Flight[]) => list.filter((f) => f.cabin !== "private");
  const comparison = focus.compareWith
    ? [
        { label: focus.label ?? `${focus.name} flights`, ...routeSummary(shared(flights)) },
        { label: focus.compareWith.label, ...routeSummary(shared(inventory.filter(focus.compareWith.match))) },
      ].filter((side) => side.count > 0)
    : [];

  return (
    <div>
      {comparison.length === 2 ? (
        <div className="mb-10">
          <h2 className="font-display text-2xl text-navy md:text-3xl">
            {comparison[0].label} vs {comparison[1].label}
          </h2>
          <p className="mt-2 max-w-2xl text-stone">
            Shared flights, flight-only from-prices per person; listings sold only with hotel
            transfers are counted but left out of the prices. Per-minute prices use only listings
            that state their flight time.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {comparison.map((side) => (
              <li key={side.label} className="rounded-lg border border-navy/10 bg-white px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-teal">{side.label}</p>
                <p className="mt-2 font-display text-2xl text-navy">
                  {side.from != null ? `From ${money(side.from)}` : "—"}
                </p>
                <p className="mt-1 text-sm text-stone">
                  {side.count} flight{side.count === 1 ? "" : "s"}
                  {side.typical != null ? ` · typical ${money(side.typical)}` : ""}
                  {side.minutes ? ` · ${side.minutes} in the air` : ""}
                </p>
                {side.perMinute != null ? (
                  <p className="mt-1 text-xs text-stone-light">≈ {money(side.perMinute)} per minute of flying</p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <h2 className="font-display text-2xl text-navy md:text-3xl">
        {flights.length} of {inventory.length} {destinationName} flights{" "}
        {focus.phrase ?? `include ${focus.name}`}
      </h2>
      <p className="mt-2 max-w-2xl text-stone">
        Based on each listing’s published route. Where options list their own highlights, the
        table shows the cheapest option that includes {focus.name} and what that option covers.{" "}
        Across full listings,{" "}
        {alsoCounts
          .filter((a) => a.count > 0)
          .map((a) => `${a.count} also name ${a.name}`)
          .join(", ")}
        .
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <thead className={THEAD}>
            <tr>
              <th className={TH}>Flight</th>
              <th className={TH}>Cheapest option with {focus.name}</th>
              <th className={TH}>Also on that route</th>
              <th className={TH}>Rating</th>
              <th className={TH}>
                <span className="sr-only">Book</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/8">
            {rows.map(({ flight, cover }) => (
              <tr key={flight.id} className="align-top">
                <FlightCell flight={flight} note={flight.cabin === "private" ? "Private flight" : null} />
                <td className="whitespace-nowrap px-4 py-3 text-navy">
                  {cover ? (
                    <>
                      <span className="font-semibold">
                        {cover.point.price != null ? money(cover.point.price) : flight.priceLabel}
                      </span>{" "}
                      <span className="text-stone">· {pointMinutes(cover.point)}</span>
                      <p className="mt-0.5 text-xs text-stone-light">
                        {cover.perOption ? "Listed in this option’s route" : "Route listed for the tour"}
                        {cover.point.transfers ? " · incl. transfers" : ""}
                      </p>
                    </>
                  ) : (
                    <span className="text-stone-light">See listing</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <ul className="flex flex-wrap gap-1.5">
                    {focus.also.map((name) => {
                      const route = cover?.perOption ? cover.point.landmarks : flight.landmarks;
                      const on = route?.includes(name);
                      return (
                        <li
                          key={name}
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            on ? "bg-teal/10 font-medium text-teal" : "bg-mist text-stone-light line-through"
                          }`}
                        >
                          <span className="sr-only">{on ? "Includes " : "Not listed: "}</span>
                          {name}
                        </li>
                      );
                    })}
                  </ul>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-navy">
                  <RatingCell flight={flight} />
                </td>
                <td className="px-4 py-3">
                  <BookingButton flight={flight} className="whitespace-nowrap px-3 py-2 text-xs" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function priceSummary(flights: Flight[]) {
  const prices = flights.map((f) => f.priceFrom).filter((p): p is number => p != null);
  return {
    count: flights.length,
    from: prices.length ? Math.min(...prices) : null,
    typical: median(prices),
  };
}

/** Prices from listings sold without hotel transfers, so a pickup surcharge doesn't skew the typical price. */
function routeSummary(flights: Flight[]) {
  const flightOnly = flights.filter((f) => !pricePoints(f).every((p) => p.transfers));
  return {
    ...priceSummary(flightOnly),
    count: flights.length,
    perMinute: averagePerMinute(flightOnly),
    minutes: minuteRange(flights),
  };
}

function PackagesTable({
  packages,
  config,
}: {
  packages: Flight[];
  config: NonNullable<DestinationCategory["packages"]>;
}) {
  const sorted = [...packages].sort((a, b) => (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity));
  return (
    <div className="mt-12">
      <h2 className="font-display text-2xl text-navy md:text-3xl">{config.heading}</h2>
      <p className="mt-2 max-w-2xl text-stone">{config.intro}</p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <thead className={THEAD}>
            <tr>
              <th className={TH}>Package</th>
              <th className={TH}>Total trip</th>
              <th className={TH}>Cabin</th>
              <th className={TH}>From</th>
              <th className={TH}>Rating</th>
              <th className={TH}>
                <span className="sr-only">Book</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/8">
            {sorted.map((f) => (
              <tr key={f.id} className="align-top">
                <FlightCell flight={f} />
                <td className="whitespace-nowrap px-4 py-3 text-navy">
                  {f.experienceLabel ?? <span className="text-stone-light">See listing</span>}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-navy">{cabinLabel(f.cabin)}</td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-navy">{f.priceLabel}</td>
                <td className="whitespace-nowrap px-4 py-3 text-navy">
                  <RatingCell flight={f} />
                </td>
                <td className="px-4 py-3">
                  <BookingButton flight={f} className="whitespace-nowrap px-3 py-2 text-xs" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LandingView({
  flights,
  inventory,
  compare,
  sort,
}: {
  flights: Flight[];
  inventory: Flight[];
  compare: DestinationCategory["landingCompare"];
  sort: DestinationCategory["sort"];
}) {
  const sorted = filterAndSortFlights(flights, { sort: sort ?? "recommended" });
  const landing = priceSummary(flights);
  const baseline = compare ? priceSummary(inventory.filter(compare.match)) : null;
  const premium =
    landing.typical != null && baseline?.typical != null ? landing.typical - baseline.typical : null;
  const cards = [
    { label: "With a landing", ...landing },
    ...(compare && baseline && baseline.count > 0 ? [{ label: compare.label, ...baseline }] : []),
  ];

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="font-display text-2xl text-navy md:text-3xl">Landing vs air-only</h2>
        <p className="mt-2 max-w-2xl text-stone">
          From-prices per person in current listings.
          {premium != null && premium > 0
            ? ` A landing typically adds about ${money(premium)} over an air-only flight.`
            : ""}
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {cards.map((card) => (
            <li key={card.label} className="rounded-lg border border-navy/10 bg-white px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-teal">{card.label}</p>
              <p className="mt-2 font-display text-2xl text-navy">
                {card.from != null ? `From ${money(card.from)}` : "—"}
              </p>
              <p className="mt-1 text-sm text-stone">
                {card.count} flight{card.count === 1 ? "" : "s"}
                {card.typical != null ? ` · typical ${money(card.typical)}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-xl text-navy">Where each tour lands</h3>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <thead className={THEAD}>
              <tr>
                <th className={TH}>Flight</th>
                <th className={TH}>Lands at</th>
                <th className={TH}>Flight time</th>
                <th className={TH}>Total trip</th>
                <th className={TH}>From</th>
                <th className={TH}>Rating</th>
                <th className={TH}>
                  <span className="sr-only">Book</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/8">
              {sorted.map((f) => (
                <tr key={f.id} className="align-top">
                  <FlightCell flight={f} note={f.sunset ? "Sunset departure available" : null} />
                  <td className="px-4 py-3 text-navy">{f.landing}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-navy">{f.durationLabel}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-navy">
                    {f.experienceLabel ?? <span className="text-stone-light">—</span>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-navy">{f.priceLabel}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-navy">
                    <RatingCell flight={f} />
                  </td>
                  <td className="px-4 py-3">
                    <BookingButton flight={f} className="whitespace-nowrap px-3 py-2 text-xs" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function bucketPoints(points: PricePoint[], bucket: DurationBucket): PricePoint[] {
  return points.filter((p) => p.minutes != null && p.minutes >= bucket.min && p.minutes <= bucket.max);
}

/** Every priced shared option as its own point, keeping flight-only and with-transfer variants. */
function optionPoints(flight: Flight): PricePoint[] {
  return (flight.options ?? [])
    .filter((o) => o.price != null && o.minutes != null && !o.private && flight.cabin !== "private")
    .map((o) => ({
      flight,
      minutes: o.minutes,
      price: o.price,
      transfers: o.transfers,
      private: false,
      perGroup: o.perGroup,
      landmarks: o.landmarks,
      optionCount: flight.options!.length,
    }));
}

function cheapestPoint(points: PricePoint[]): PricePoint | undefined {
  return [...points].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))[0];
}

function landmarkCoverage(points: PricePoint[]): Array<{ name: string; count: number; of: number }> {
  const described = points.filter((p) => p.landmarks.length > 0);
  const counts = new Map<string, number>();
  for (const p of described) for (const l of p.landmarks) counts.set(l, (counts.get(l) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, of: described.length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

function DurationCompareView({
  flights,
  compare,
}: {
  flights: Flight[];
  compare: NonNullable<DestinationCategory["durationCompare"]>;
}) {
  const points = flights
    .flatMap(pricePoints)
    .filter((p) => !isPrivatePoint(p) && p.price != null && p.minutes != null);
  const flightOnly = points.filter((p) => !p.transfers);
  // Where most listings bundle hotel pickup, flight-only prices would leave out most of the market.
  const useFlightOnly = flightOnly.length >= points.length / 2;
  const base = useFlightOnly ? flightOnly : points;
  const sides = [compare.short, compare.long].map((bucket) => {
    const list = bucketPoints(base, bucket);
    const prices = list.map((p) => p.price!);
    return {
      bucket,
      listings: new Set(list.map((p) => p.flight.id)).size,
      from: prices.length ? Math.min(...prices) : null,
      typical: median(prices),
      perMinute: median(list.map(pricePerMinute).filter((v): v is number => v != null)),
      coverage: landmarkCoverage(list),
    };
  });

  const pairs = flights
    .map((flight) => {
      // Compare like with like: both flight-only, or else both including transfers.
      const pair = [false, true]
        .map((transfers) => {
          const own = optionPoints(flight).filter((p) => p.transfers === transfers);
          return {
            short: cheapestPoint(bucketPoints(own, compare.short)),
            long: cheapestPoint(bucketPoints(own, compare.long)),
          };
        })
        .find((p) => p.short && p.long);
      if (!pair) return null;
      const short = pair.short!;
      const long = pair.long!;
      const adds =
        short.landmarks.length && long.landmarks.length
          ? long.landmarks.filter((l) => !short.landmarks.includes(l))
          : [];
      return { flight, short, long, adds, stepUp: long.price! - short.price! };
    })
    .filter((p): p is NonNullable<typeof p> => p != null)
    .sort((a, b) => (b.flight.reviewCount ?? 0) - (a.flight.reviewCount ?? 0));
  const typicalStepUp = median(pairs.map((p) => p.stepUp));

  return (
    <div className="grid gap-10">
      <div>
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          {compare.short.label} vs {compare.long.label}
        </h2>
        <p className="mt-2 max-w-2xl text-stone">
          {useFlightOnly
            ? "Shared flights, flight-only prices per person for each flight-length option."
            : "Shared flights, prices per person for each flight-length option as listed — most include hotel transfers."}
          {typicalStepUp != null
            ? ` On listings that sell both, the longer flight typically costs ${money(typicalStepUp)} more.`
            : ""}
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {sides.map((side) => (
            <section key={side.bucket.label} className="rounded-xl border border-navy/10 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-teal">
                {side.bucket.label}
              </p>
              <p className="mt-2 font-display text-3xl text-navy">
                {side.from != null ? `From ${money(side.from)}` : "—"}
              </p>
              <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-stone">Typical</dt>
                  <dd className="font-semibold text-navy">
                    {side.typical != null ? money(side.typical) : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-stone">Per minute</dt>
                  <dd className="font-semibold text-navy">
                    {side.perMinute != null ? money(side.perMinute) : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-stone">Listings</dt>
                  <dd className="font-semibold text-navy">{side.listings}</dd>
                </div>
              </dl>
              {side.coverage.length ? (
                <>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.06em] text-stone">
                    Route highlights listed
                  </p>
                  <ul className="mt-2 grid gap-1 text-sm text-navy">
                    {side.coverage.map((c) => (
                      <li key={c.name} className="flex justify-between gap-3">
                        <span>{c.name}</span>
                        <span className="text-stone">
                          {c.count} of {c.of} options
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.06em] text-stone">
                Best for
              </p>
              <ul className="mt-2 grid gap-1 text-sm text-navy">
                {side.bucket.suits.map((s) => (
                  <li key={s}>✓ {s}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      {pairs.length ? (
        <div>
          <h2 className="font-display text-2xl text-navy md:text-3xl">
            Same listing, both lengths: {pairs.length} side by side
          </h2>
          <p className="mt-2 max-w-2xl text-stone">
            What the longer option costs on each listing, and what its route adds where the
            options describe their routes.
          </p>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {pairs.map(({ flight, short, long, adds, stepUp }) => {
              const seller = sellerLine(flight);
              return (
                <li key={flight.id} className="flex flex-col rounded-xl border border-navy/10 bg-white p-5">
                  <Link href={flightResultsHref(flight)} className="font-semibold text-teal hover:underline">
                    {flight.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-stone">
                    {[seller, flight.rating != null ? `${flight.rating.toFixed(1)} ★ (${(flight.reviewCount ?? 0).toLocaleString("en-US")})` : null]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[short, long].map((p) => (
                      <div key={p.minutes} className="rounded-lg bg-mist px-3 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-stone">
                          {p.minutes} min
                        </p>
                        <p className="mt-1 font-display text-2xl text-navy">{money(p.price!)}</p>
                        <p className="text-xs text-stone">
                          {money(pricePerMinute(p)!)}/min{p.transfers ? " · incl. transfers" : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-navy">
                    <span className="font-semibold">+{money(stepUp)}</span> for{" "}
                    {long.minutes! - short.minutes!} more minutes in the air
                  </p>
                  {adds.length ? (
                    <p className="mt-1 text-sm text-stone">Adds: {adds.join(", ")}</p>
                  ) : null}
                  <div className="mt-auto pt-4">
                    <BookingButton flight={flight} className="px-3 py-2 text-xs" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function OperatorView({ flights }: { flights: Flight[] }) {
  const groups = groupByOperator(flights);
  return (
    <div>
      <h2 className="font-display text-2xl text-navy md:text-3xl">
        {groups.length} companies compared
      </h2>
      <p className="mt-2 max-w-2xl text-stone">
        Ranked by review-weighted traveler rating across each company’s sightseeing flights.
      </p>
      <ol className="mt-6 grid gap-4">
        {groups.map((group, index) => {
          const prices = group.flights.map((f) => f.priceFrom).filter((p): p is number => p != null);
          const departures = [...new Set(group.flights.map((f) => f.departure).filter(Boolean))];
          const range = minuteRange(group.flights);
          return (
            <li key={group.name} className="rounded-xl border border-navy/10 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-teal">
                    #{index + 1}
                  </p>
                  <h3 className="mt-1 font-display text-xl text-navy">{group.name}</h3>
                  <p className="mt-1 text-sm text-stone">
                    {group.flights.length} listing{group.flights.length === 1 ? "" : "s"}
                    {range ? ` · ${range} in the air` : ""}
                    {prices.length
                      ? ` · from ${money(Math.min(...prices))}`
                      : ""}
                    {departures.length ? ` · ${departures.join(", ")}` : ""}
                  </p>
                </div>
                {group.rating != null ? (
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <p className="text-sm font-semibold text-navy">{ratingWord(group.rating)}</p>
                      <p className="text-xs text-stone">
                        {group.reviews.toLocaleString("en-US")} review{group.reviews === 1 ? "" : "s"}
                      </p>
                    </div>
                    <span className="flex h-9 min-w-9 items-center justify-center rounded-md rounded-bl-none bg-navy-deep px-1.5 text-sm font-bold text-white">
                      {group.rating.toFixed(1)}
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-stone">No reviews listed yet</p>
                )}
              </div>
              <ul className="mt-4 divide-y divide-navy/8 border-t border-navy/8">
                {group.flights.map((f) => (
                  <li key={f.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <Link href={flightResultsHref(f)} className="font-medium text-teal hover:underline">
                        {f.title}
                      </Link>
                      <p className="mt-0.5 text-xs text-stone">
                        {f.durationLabel} · {cabinLabel(f.cabin)} · From {f.priceLabel}
                        {f.rating != null ? ` · ${f.rating.toFixed(1)} ★` : ""}
                      </p>
                    </div>
                    <BookingButton flight={f} className="shrink-0 px-3 py-2 text-xs" />
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function CategoryResults({
  category,
  inventory,
  flights,
  destinationName,
}: Props & { destinationName: string }) {
  if (category.view === "prices") return <PriceView flights={flights} category={category} />;
  if (category.view === "operators") return <OperatorView flights={flights} />;
  if (category.view === "landmark" && category.landmarkFocus) {
    return (
      <LandmarkView
        flights={flights}
        inventory={inventory}
        focus={category.landmarkFocus}
        destinationName={destinationName}
      />
    );
  }
  if (category.view === "landing") {
    return (
      <LandingView
        flights={flights}
        inventory={inventory}
        compare={category.landingCompare}
        sort={category.sort}
      />
    );
  }
  if (category.view === "duration-compare" && category.durationCompare) {
    return <DurationCompareView flights={flights} compare={category.durationCompare} />;
  }
  const sorted = filterAndSortFlights(flights, { sort: category.sort ?? "recommended" });
  return <FlightResultsList flights={sorted} emptyHref={`/${category.destination}`} />;
}

export function DestinationCategoryPage({ category, inventory, flights, packages = [] }: Props) {
  const destination = getDestination(category.destination)!;
  const path = categoryPath(category);
  const prices = flights.map((f) => f.priceFrom).filter((p): p is number => p != null);
  const range = minuteRange(flights);
  const related = categoriesFor(category.destination).filter((c) => c.slug !== category.slug);

  const focus = category.departureFocus;
  const sharedOnly = (list: Flight[]) => list.filter((f) => f.cabin !== "private");
  const departureComparison = focus
    ? {
        focus: averagePerMinute(sharedOnly(flights)),
        other: averagePerMinute(
          sharedOnly(inventory.filter((f) => f.departure && f.departure !== focus.label)),
        ),
      }
    : null;

  const stats = [
    `${flights.length} flight${flights.length === 1 ? "" : "s"}`,
    ...(prices.length ? [`From ${money(Math.min(...prices))}`] : []),
    ...(range ? [`${range} in the air`] : []),
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: category.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DestinationCategoryNav
        destination={category.destination}
        destinationName={destination.name}
        currentPath={path}
      />

      <section className="relative overflow-hidden bg-navy-deep px-5 pb-10 pt-8 text-white md:px-8 md:pb-14 md:pt-12">
        <HeroAtmosphere />
        <div className="relative mx-auto max-w-6xl">
          <HeroSiteMark className="mb-3" />
          <nav aria-label="Breadcrumb" className="text-sm text-sky">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <Link href={`/${category.destination}`} className="hover:text-white">
              {destination.name}
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white">{category.navLabel}</span>
          </nav>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-sky">
            {category.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl leading-tight md:text-5xl md:leading-[1.12]">
            {category.h1}
          </h1>
          {category.intro.map((p, i) => (
            <p
              key={i}
              className={`max-w-2xl text-base leading-relaxed ${
                i === 0 ? "mt-5 text-white/85 md:text-lg" : "mt-3 text-white/70"
              }`}
            >
              {p}
            </p>
          ))}
          {flights.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {stats.map((s) => (
                <li key={s} className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white">
                  {s}
                </li>
              ))}
            </ul>
          ) : null}
          {focus && departureComparison?.focus != null && departureComparison.other != null ? (
            <p className="mt-4 max-w-2xl text-sm text-white/70">
              Shared flights from {focus.name} work out at a typical{" "}
              {money(departureComparison.focus)} per minute of flying, compared with{" "}
              {money(departureComparison.other)} from {focus.otherName} in our comparison.
            </p>
          ) : null}
        </div>
      </section>

      <section id="results" className="scroll-mt-28 bg-mist px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-6xl">
          {flights.length === 0 ? (
            <div className="rounded-xl border border-navy/10 bg-white px-6 py-10 text-center">
              <p className="font-display text-xl text-navy">No matching flights listed right now</p>
              <p className="mx-auto mt-2 max-w-lg text-sm text-stone">
                Live inventory changes daily. Compare every {destination.name} helicopter flight
                instead.
              </p>
              <Link
                href={`/${category.destination}`}
                className="mt-6 inline-flex rounded-lg bg-teal px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-bright"
              >
                All {destination.name} flights
              </Link>
            </div>
          ) : (
            <CategoryResults
              category={category}
              inventory={inventory}
              flights={flights}
              destinationName={destination.name}
            />
          )}
          {category.packages && packages.length > 0 ? (
            <PackagesTable packages={packages} config={category.packages} />
          ) : null}
          <p className="mt-6 text-xs leading-relaxed text-stone-light">
            Live from-prices, ratings and flight details from Viator listings. Always confirm
            availability, inclusions and the final price on the booking page.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl text-navy md:text-3xl">What to know</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {category.tips.map((tip) => (
              <li key={tip.title} className="rounded-lg border border-navy/10 bg-mist px-5 py-5">
                <p className="font-semibold text-navy">{tip.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone">{tip.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-mist px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl text-navy md:text-3xl">Common questions</h2>
          <div className="mt-6 divide-y divide-navy/10 border-y border-navy/10">
            {category.faqs.map((faq) => (
              <details key={faq.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
                  {faq.q}
                  <span className="text-teal transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl md:text-3xl">More ways to compare {destination.name} flights</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            <li>
              <Link
                href={`/${category.destination}`}
                className="inline-block rounded-full border border-white/25 px-4 py-2 text-sm font-medium hover:bg-white/10"
              >
                All {destination.name} flights
              </Link>
            </li>
            {related.map((c) => (
              <li key={c.slug}>
                <Link
                  href={categoryPath(c)}
                  className="inline-block rounded-full border border-white/25 px-4 py-2 text-sm font-medium hover:bg-white/10"
                >
                  {c.navLabel}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs text-white/45">
            We may earn a commission if you book through links on this page. This does not
            determine our rankings, and we don’t independently verify operator safety.
          </p>
        </div>
      </section>
    </>
  );
}
