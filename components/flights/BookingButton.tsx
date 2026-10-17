import type { Flight } from "@/data/flights";
import { VIATOR_LINK_REL, viatorGoPath } from "@/lib/viator";

type Props = {
  flight: Pick<Flight, "bookingUrl" | "destination">;
  className?: string;
};

export function BookingButton({ flight, className = "" }: Props) {
  return (
    <a
      href={viatorGoPath(flight.bookingUrl, flight.destination)}
      target="_blank"
      rel={VIATOR_LINK_REL}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-teal px-3 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-teal-bright ${className}`}
    >
      Check availability &amp; book
      <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden="true">
        <path
          d="M11 3h6v6M17 3l-8 8M15 12v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
