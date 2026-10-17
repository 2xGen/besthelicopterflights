import Link from "next/link";
import { FlightFinder } from "@/components/flights/FlightFinder";
import { FlightResultsList } from "@/components/flights/FlightResultsList";
import {
  destinationResultsPath,
  getDestination,
  type DestinationSlug,
} from "@/data/destinations";
import {
  filterAndSortFlights,
  searchFlights,
  type FlightSearchParams,
} from "@/data/flights";
import { destinationSupportsDoorsOffFilter } from "@/lib/infer-doors";
import { resolveFlightSearch } from "@/lib/flight-search";
import { HeroAtmosphere, HeroSiteMark } from "@/components/HeroChrome";
import { VIATOR_LINK_REL, viatorGoPath } from "@/lib/viator";

type Props = {
  destination: DestinationSlug;
  destinationName: string;
  searchParams?: Record<string, string | string[] | undefined>;
  /** When false, only the filter sidebar and results list render (hero lives on the hub intro). */
  includeHero?: boolean;
  headline?: string;
  subheadline?: string;
};

type FilterKey = "duration" | "experience" | "doors";

function filterGroupsFor(destination: DestinationSlug): Array<{
  key: FilterKey;
  label: string;
  options: Array<{ value: string; label: string }>;
}> {
  const experienceOptions =
    destination === "grand-canyon"
      ? [
          { value: "landing", label: "Landing tours" },
          { value: "shared", label: "Shared / scenic" },
        ]
      : destination === "las-vegas"
        ? [
            { value: "night", label: "Night flights" },
            { value: "landing", label: "Landing tours" },
            { value: "private", label: "Private flight" },
            { value: "shared", label: "Shared / scenic" },
          ]
        : destination === "dubai"
          ? [
              { value: "private", label: "Private flight" },
              { value: "shared", label: "Shared / scenic" },
              { value: "best-value", label: "Best value" },
              { value: "longest", label: "Longest flight" },
            ]
          : destination === "cape-town"
            ? [
                { value: "shared", label: "Shared / scenic" },
                { value: "best-value", label: "Best value" },
                { value: "longest", label: "Longest flight" },
              ]
            : [
                ...(destinationSupportsDoorsOffFilter(destination)
                  ? [{ value: "doors-off" as const, label: "Doors-off" }]
                  : []),
                { value: "private", label: "Private flight" },
                { value: "shared", label: "Shared / scenic" },
              ];
  const durationOptions =
    destination === "dubai"
      ? [
          { value: "12-15", label: "12–15 min" },
          { value: "16-20", label: "16–20 min" },
          { value: "21-30", label: "21–30 min" },
        ]
      : destination === "cape-town"
        ? [
            { value: "under-20", label: "Under 20 min" },
            { value: "20-30", label: "20–30 min" },
            { value: "over-30", label: "Over 30 min" },
          ]
        : [
            { value: "short", label: "Under 45 min" },
            { value: "medium", label: "45–60 min" },
            { value: "long", label: "Over 60 min" },
          ];
  return [
    {
      key: "duration",
      label: "Flight duration",
      options: durationOptions,
    },
    {
      key: "experience",
      label: "Experience",
      options: experienceOptions,
    },
  ];
}

const sortOptions: Array<{ value: NonNullable<FlightSearchParams["sort"]>; label: string }> = [
  { value: "recommended", label: "Our top picks" },
  { value: "price-asc", label: "Lowest price" },
  { value: "duration-desc", label: "Longest flight" },
  { value: "rating-desc", label: "Top rated" },
];

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export async function DestinationFlightResults({
  destination,
  destinationName,
  searchParams = {},
  includeHero = true,
  headline,
  subheadline,
}: Props) {
  const params: FlightSearchParams = {
    destination,
    duration:
      (first(searchParams.duration) as FlightSearchParams["duration"]) || "any",
    experience:
      (first(searchParams.experience) as FlightSearchParams["experience"]) ||
      "all",
    doors: (first(searchParams.doors) as FlightSearchParams["doors"]) || "any",
    sort:
      (first(searchParams.sort) as FlightSearchParams["sort"]) || "recommended",
    type: first(searchParams.type) === "all" ? "all" : "sightseeing",
  };

  const result = await resolveFlightSearch(params);
  const dest = getDestination(destination);
  const regionLabel = dest?.region ?? "Hawaii";
  const noInventory =
    result.flights.length === 0 &&
    !result.live &&
    searchFlights({ destination }).length === 0;

  function hrefWith(changes: Partial<Record<FilterKey | "sort" | "type", string | null>>) {
    const qs = new URLSearchParams();
    const merged: Record<string, string | undefined> = {
      duration: params.duration,
      experience: params.experience,
      doors: params.doors,
      sort: params.sort,
      type: params.type,
    };
    for (const [k, v] of Object.entries(changes)) merged[k] = v ?? undefined;
    const defaults: Record<string, string> = {
      duration: "any",
      experience: "all",
      doors: "any",
      sort: "recommended",
      type: "sightseeing",
    };
    for (const [k, v] of Object.entries(merged)) {
      if (v && v !== defaults[k]) qs.set(k, v);
    }
    return `${destinationResultsPath(destination, qs)}#results`;
  }

  const facetBase = result.live
    ? (await resolveFlightSearch({ destination, type: "all" })).flights
    : null;

  function countFor(key: FilterKey, value: string): number {
    const facetParams = { ...params, [key]: value };
    return facetBase
      ? filterAndSortFlights(facetBase, facetParams).length
      : searchFlights(facetParams).length;
  }

  const otherExperiences = facetBase
    ? filterAndSortFlights(facetBase, { ...params, type: "all" }).length -
      filterAndSortFlights(facetBase, { ...params, type: "sightseeing" }).length
    : 0;

  const filterGroups = filterGroupsFor(destination);
  const activeFilters = filterGroups.flatMap((g) =>
    g.options
      .filter((o) => params[g.key] === o.value)
      .map((o) => ({ key: g.key, label: o.label })),
  );

  const pageTitle = headline ?? `Helicopter flights in ${destinationName}`;
  const pageSub =
    subheadline ??
    "Compare routes, flight times, doors-off and private options — then book with the provider.";

  return (
    <>
      {includeHero ? (
        <section className="relative overflow-hidden bg-navy-deep px-5 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8">
          <HeroAtmosphere />
          <div className="relative mx-auto max-w-6xl">
            <HeroSiteMark className="mb-3" />
            <nav aria-label="Breadcrumb" className="text-sm text-sky">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2 text-white/40">/</span>
              <span className="text-white/90">{regionLabel}</span>
              <span className="mx-2 text-white/40">/</span>
              <span className="text-white">{destinationName}</span>
            </nav>
            <h1 className="mt-3 text-2xl text-white md:text-4xl">{pageTitle}</h1>
            <p className="mt-2 text-sm text-white/75 md:text-base">{pageSub}</p>
            <div className="mt-6">
              <FlightFinder
                initialDestination={destination}
                initialDuration={params.duration}
                initialExperience={params.experience}
                hideDestination
                hideDoorsOffOption={!destinationSupportsDoorsOffFilter(destination)}
              />
            </div>
          </div>
        </section>
      ) : null}

      <section
        id="results"
        className={`scroll-mt-24 bg-mist px-5 pb-28 md:px-8 ${includeHero ? "pt-8 md:pt-10" : "pt-6 md:pt-8"}`}
      >
        {noInventory ? (
          <div className="mx-auto max-w-3xl rounded-xl border border-navy/10 bg-white px-6 py-10 text-center">
            <p className="font-display text-xl text-navy">
              Live {destinationName} flights are temporarily unavailable
            </p>
            <p className="mx-auto mt-2 max-w-lg text-sm text-stone">
              We couldn’t load current helicopter inventory for {destinationName}{" "}
              right now. You can browse every helicopter flight for this
              destination on Viator, or try again in a few minutes.
            </p>
            {dest ? (
              <a
                href={viatorGoPath(dest.viatorBrowseUrl, dest.slug)}
                target="_blank"
                rel={VIATOR_LINK_REL}
                className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-teal px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-teal-bright"
              >
                Browse {destinationName} helicopter flights on Viator
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        ) : (
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="h-fit rounded-xl border border-navy/10 bg-white lg:sticky lg:top-[7.5rem]">
            <div className="flex items-center justify-between border-b border-navy/8 px-4 py-3">
              <p className="font-display text-base text-navy">Filter by</p>
              {activeFilters.length > 0 ? (
                <Link
                  href={hrefWith({ duration: null, experience: null, doors: null })}
                  className="text-sm font-semibold text-teal hover:underline"
                >
                  Clear all
                </Link>
              ) : null}
            </div>
            <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-1">
              {filterGroups.map((group) => (
                <div
                  key={group.key}
                  className="border-b border-navy/8 px-4 py-4 last:border-b-0"
                >
                  <p className="text-sm font-semibold text-navy">
                    {group.label}
                  </p>
                  <ul className="mt-2.5 grid gap-1">
                    {group.options.map((option) => {
                      const active = params[group.key] === option.value;
                      const count = countFor(group.key, option.value);
                      if (count === 0 && !active) {
                        return (
                          <li
                            key={option.value}
                            className="flex cursor-not-allowed items-center gap-2.5 px-1 py-1.5 text-sm text-stone-light"
                            title={`No ${option.label.toLowerCase()} flights listed for ${destinationName}`}
                          >
                            <span className="h-[18px] w-[18px] shrink-0 rounded border border-navy/15 bg-mist" />
                            <span className="flex-1">{option.label}</span>
                            <span className="text-xs">0</span>
                          </li>
                        );
                      }
                      return (
                        <li key={option.value}>
                          <Link
                            href={hrefWith({
                              [group.key]: active ? null : option.value,
                            })}
                            scroll={false}
                            className="flex items-center gap-2.5 rounded-md px-1 py-1.5 text-sm text-navy hover:bg-mist"
                          >
                            <span
                              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border ${
                                active
                                  ? "border-teal bg-teal text-white"
                                  : "border-navy/30 bg-white"
                              }`}
                            >
                              {active ? (
                                <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                                  <path d="M2.5 6.2 5 8.5l4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                              ) : null}
                            </span>
                            <span className="flex-1">{option.label}</span>
                            <span className="text-xs text-stone-light">{count}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-display text-lg text-navy md:text-xl">
                {destinationName}: {result.flights.length} flight
                {result.flights.length === 1 ? "" : "s"} found
              </p>
              <div className="flex flex-wrap gap-1.5">
                {sortOptions.map((option) => {
                  const active = params.sort === option.value;
                  return (
                    <Link
                      key={option.value}
                      href={hrefWith({ sort: option.value })}
                      scroll={false}
                      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                        active
                          ? "border-teal bg-teal/10 text-teal"
                          : "border-navy/15 bg-white text-navy hover:border-navy/40"
                      }`}
                    >
                      {option.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {params.type === "all" ? (
              <p className="mt-3 text-sm text-stone">
                Showing every helicopter experience, including transfers, day
                trips and flight packages.{" "}
                <Link
                  href={hrefWith({ type: null })}
                  scroll={false}
                  className="font-semibold text-teal hover:underline"
                >
                  Show sightseeing flights only
                </Link>
              </p>
            ) : otherExperiences > 0 ? (
              <p className="mt-3 text-sm text-stone">
                Showing sightseeing flights.{" "}
                <Link
                  href={hrefWith({ type: "all" })}
                  scroll={false}
                  className="font-semibold text-teal hover:underline"
                >
                  Also show {otherExperiences} transfer
                  {otherExperiences === 1 ? "" : "s"}, day trips and flight
                  packages
                </Link>
              </p>
            ) : null}

            {activeFilters.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {activeFilters.map((f) => (
                  <Link
                    key={f.key}
                    href={hrefWith({ [f.key]: null })}
                    scroll={false}
                    className="flex items-center gap-1.5 rounded-full bg-navy-deep px-3 py-1 text-xs font-semibold text-white"
                  >
                    {f.label}
                    <span aria-hidden="true">×</span>
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="mt-5">
              <FlightResultsList
                flights={result.flights}
                emptyHref={hrefWith({ duration: null, experience: null, doors: null })}
                expandedSlug={first(searchParams.flight)}
              />
            </div>

            <p className="mt-6 text-xs leading-relaxed text-stone-light">
              {result.disclaimer}
            </p>
          </div>
        </div>
        )}
      </section>
    </>
  );
}
