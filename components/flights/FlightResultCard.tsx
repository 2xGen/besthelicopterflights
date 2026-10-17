"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { cabinLabel, doorsLabel, kindLabel, ratingWord, type Flight } from "@/data/flights";
import { BookingButton } from "@/components/flights/BookingButton";
import {
  COMPARE_MAX,
  readCompareIds,
  toggleCompareId,
} from "@/components/flights/compare-store";

type Props = {
  flight: Flight;
  defaultExpanded?: boolean;
};

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-success" aria-hidden="true">
      <path d="M4.5 10.5 8 14l7.5-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DetailItem({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="rounded-lg bg-mist px-3 py-2.5">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.06em] text-stone">
        {label}
      </dt>
      <dd className={`mt-0.5 text-sm ${muted ? "text-stone-light" : "font-medium text-navy"}`}>
        {value}
      </dd>
    </div>
  );
}

export function FlightResultCard({ flight, defaultExpanded = false }: Props) {
  const [selected, setSelected] = useState(false);
  const [compareFull, setCompareFull] = useState(false);
  const [expanded, setExpanded] = useState(defaultExpanded);
  const detailsId = useId();

  useEffect(() => {
    const sync = () => {
      const ids = readCompareIds();
      setSelected(ids.includes(flight.id));
      setCompareFull(ids.length >= COMPARE_MAX);
    };
    sync();
    window.addEventListener("bhf-compare-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bhf-compare-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, [flight.id]);

  function onCompare() {
    const next = toggleCompareId(flight.id);
    setSelected(next.includes(flight.id));
  }

  const compareDisabled = compareFull && !selected;
  const features = [
    ...(flight.kind !== "scenic" ? [kindLabel(flight.kind)] : []),
    flight.durationMinutes != null
      ? flight.durationLabel.replace(" min", " min flight")
      : flight.durationLabel,
    ...(flight.experienceLabel ? [`${flight.experienceLabel} total experience`] : []),
    doorsLabel(flight.doors),
    cabinLabel(flight.cabin),
    ...(flight.freeCancellation ? ["Free cancellation"] : []),
  ];

  return (
    <article
      id={`flight-${flight.slug}`}
      className={`scroll-mt-32 overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-[0_8px_30px_rgba(15,29,51,0.10)] ${
        selected ? "border-teal ring-1 ring-teal" : "border-navy/10"
      }`}
    >
      <div className="grid md:grid-cols-[230px_minmax(0,1fr)_220px]">
        <div className="relative aspect-[16/10] bg-mist-soft md:m-3 md:aspect-auto md:min-h-[190px] md:overflow-hidden md:rounded-lg">
          <Image
            src={flight.image}
            unoptimized={flight.source === "viator"}
            alt={flight.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 230px"
          />
        </div>

        <div className="min-w-0 px-4 pb-2 pt-4 md:px-2 md:py-4">
          <h3 className="text-lg leading-snug text-navy md:text-xl">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls={detailsId}
              className="text-left text-teal hover:underline"
            >
              {flight.title}
            </button>
          </h3>
          <p className="mt-1 text-sm text-stone">
            <span className="font-medium text-navy">{flight.operator}</span>
            {flight.departure ? ` · ${flight.departure}` : ""}
          </p>

          {flight.routeHighlights.length > 0 ? (
            <p className="mt-2 text-sm text-stone">
              {flight.routeHighlights.slice(0, 3).join(" · ")}
            </p>
          ) : null}

          <ul className="mt-3 grid gap-1.5 text-sm text-navy sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-1.5">
                <Check />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {flight.bestFor ? (
              <span className="rounded-md bg-mist-soft px-2 py-1 text-xs font-semibold text-navy-deep">
                Best for: {flight.bestFor}
              </span>
            ) : null}
            <button
              type="button"
              onClick={onCompare}
              disabled={compareDisabled}
              aria-pressed={selected}
              title={compareDisabled ? `You can compare up to ${COMPARE_MAX} flights` : undefined}
              className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                selected
                  ? "border-teal bg-teal text-white"
                  : "border-navy/20 text-navy hover:border-teal hover:text-teal"
              }`}
            >
              {selected ? "✓ Added to compare" : "+ Add to compare"}
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-navy/8 p-4 md:border-l md:border-t-0">
          {flight.rating != null ? (
            <div className="flex items-start justify-end gap-2 text-right">
              <div>
                <p className="text-sm font-semibold text-navy">
                  {ratingWord(flight.rating)}
                </p>
                {flight.reviewCount != null ? (
                  <p className="text-xs text-stone">
                    {flight.reviewCount.toLocaleString("en-US")} reviews
                  </p>
                ) : null}
              </div>
              <span className="flex h-9 min-w-9 items-center justify-center rounded-md rounded-bl-none bg-navy-deep px-1.5 text-sm font-bold text-white">
                {flight.rating.toFixed(1)}
              </span>
            </div>
          ) : (
            <p className="text-right text-xs text-stone">No rating listed yet</p>
          )}

          <div className="text-right">
            <p className="text-xs text-stone">From, per person</p>
            <p className="font-display text-2xl text-navy">{flight.priceLabel}</p>
            <p className="text-[11px] leading-snug text-stone-light">
              {flight.priceReliability === "verified-listing"
                ? "Provider price via Viator"
                : "Indicative price"}
            </p>
            <BookingButton flight={flight} className="mt-3 w-full" />
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls={detailsId}
              className="mt-2 flex w-full items-center justify-center gap-1 text-sm font-semibold text-teal hover:underline"
            >
              {expanded ? "Hide details" : "Show details"}
              <svg
                viewBox="0 0 20 20"
                className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        id={detailsId}
        hidden={!expanded}
        className="border-t border-navy/8 bg-white px-4 pb-5 pt-4 md:px-5"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <h4 className="text-base text-navy">About this flight</h4>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              {flight.summary}
            </p>
            {flight.routeHighlights.length > 0 ? (
              <>
                <h4 className="mt-5 text-base text-navy">Route highlights</h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {flight.routeHighlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full bg-mist-soft px-3 py-1 text-xs font-medium text-navy"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <div>
            <h4 className="text-base text-navy">Flight details</h4>
            <dl className="mt-2 grid grid-cols-2 gap-2">
              <DetailItem
                label="Flight time"
                value={flight.durationLabel}
                muted={flight.durationMinutes == null}
              />
              {flight.experienceLabel ? (
                <DetailItem label="Total experience" value={flight.experienceLabel} />
              ) : null}
              <DetailItem label="Doors" value={doorsLabel(flight.doors)} muted={flight.doors === "unknown"} />
              <DetailItem label="Cabin" value={cabinLabel(flight.cabin)} muted={flight.cabin === "unknown"} />
              <DetailItem label="Operator" value={flight.operator} />
              <DetailItem
                label="Departure"
                value={flight.departure ?? "Shown on booking page"}
                muted={!flight.departure}
              />
              <DetailItem
                label="Weight limits"
                value={flight.weightRestriction ?? "Shown on booking page"}
                muted={!flight.weightRestriction}
              />
              <DetailItem
                label="Cancellation"
                value={flight.freeCancellation ? "Free cancellation" : "Shown on booking page"}
                muted={!flight.freeCancellation}
              />
              <DetailItem
                label="Reviews"
                value={
                  flight.rating != null
                    ? `${flight.rating.toFixed(1)}${flight.reviewCount != null ? ` · ${flight.reviewCount.toLocaleString("en-US")}` : ""}`
                    : "Not listed"
                }
                muted={flight.rating == null}
              />
            </dl>
            {flight.reviewAttribution ? (
              <p className="mt-2 text-[11px] text-stone-light">
                Ratings: {flight.reviewAttribution}.
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-mist px-4 py-3">
          <p className="text-xs text-stone">
            Final price, availability, passenger restrictions and cancellation
            terms are confirmed by the provider before you pay.
          </p>
          <BookingButton flight={flight} className="shrink-0 px-4" />
        </div>
      </div>
    </article>
  );
}
