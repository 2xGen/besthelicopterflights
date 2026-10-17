import type { Flight } from "@/data/flights";
import { CompareTray } from "@/components/flights/CompareTray";
import { FlightResultCard } from "@/components/flights/FlightResultCard";

type Props = {
  flights: Flight[];
  emptyHref: string;
  expandedSlug?: string;
};

export function FlightResultsList({ flights, emptyHref, expandedSlug }: Props) {
  return (
    <>
      {flights.length === 0 ? (
        <div className="rounded-xl border border-navy/10 bg-white px-6 py-10 text-center">
          <p className="font-display text-lg text-navy">
            No flights match these filters
          </p>
          <p className="mt-2 text-sm text-stone">
            Try a different duration or experience.
          </p>
          <a
            href={emptyHref}
            className="mt-5 inline-block rounded-lg bg-teal px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-bright"
          >
            Clear all filters
          </a>
        </div>
      ) : (
        <div className="grid gap-4">
          {flights.map((flight) => (
            <FlightResultCard
              key={flight.id}
              flight={flight}
              defaultExpanded={flight.slug === expandedSlug}
            />
          ))}
        </div>
      )}
      <CompareTray catalog={flights} />
    </>
  );
}
