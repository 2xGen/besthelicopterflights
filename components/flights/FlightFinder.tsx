"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  destinationResultsPath,
  getSearchableDestination,
  searchableDestinations,
} from "@/data/destinations";

const destinationGroups = [
  { label: "Hawaii", items: searchableDestinations.filter((d) => d.group === "hawaii") },
  { label: "Worldwide", items: searchableDestinations.filter((d) => d.group === "worldwide") },
];

type Props = {
  initialDestination?: string;
  initialDuration?: string;
  initialExperience?: string;
  /** Hide the destination picker when the page is already scoped to one destination. */
  hideDestination?: boolean;
  /** Hide doors-off when the current destination has no doors-off inventory. */
  hideDoorsOffOption?: boolean;
  /** Destination-specific experience options instead of doors-off. */
  experienceVariant?: "default" | "grand-canyon" | "las-vegas" | "cape-town";
  /** Destination-specific duration bands instead of generic under-45 min buckets. */
  durationVariant?: "default" | "dubai" | "cape-town";
};

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="relative flex min-w-0 items-center gap-3 rounded-lg bg-white px-4 py-2.5 focus-within:ring-2 focus-within:ring-teal">
      <span className="shrink-0 text-stone-light">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-stone">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}

const selectClass =
  "w-full cursor-pointer appearance-none bg-transparent pr-6 text-[15px] font-semibold text-navy outline-none";

const icons = {
  pin: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 14 10l6.5 2-6.5 2-2 6.5-2-6.5-6.5-2L10 10l2-6.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

function Chevron() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-light"
      aria-hidden="true"
    >
      <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function FlightFinder({
  initialDestination = "kauai",
  initialDuration = "any",
  initialExperience = "all",
  hideDestination = false,
  hideDoorsOffOption = false,
  experienceVariant = "default",
  durationVariant = "default",
}: Props) {
  const router = useRouter();
  const [destination, setDestination] = useState(initialDestination);
  const [duration, setDuration] = useState(initialDuration);
  const [experience, setExperience] = useState(initialExperience);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (duration !== "any") params.set("duration", duration);
    if (experience !== "all") params.set("experience", experience);
    const dest = getSearchableDestination(destination);
    if (!dest) return;
    router.push(`${destinationResultsPath(dest.slug, params)}#results`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`grid w-full gap-1 rounded-xl bg-sun p-1 shadow-[0_12px_40px_rgba(6,20,50,0.25)] ${
        hideDestination ? "md:grid-cols-[1fr_1fr_auto]" : "md:grid-cols-[1.2fr_1fr_1fr_auto]"
      }`}
    >
      {!hideDestination ? (
        <Field label="Where do you want to fly?" icon={icons.pin}>
          <select
            className={selectClass}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            {destinationGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.items.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.shortLabel}, {d.region}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <Chevron />
        </Field>
      ) : null}

      <Field label="Flight duration" icon={icons.clock}>
        <select
          className={selectClass}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="any">Any duration</option>
          {durationVariant === "dubai" ? (
            <>
              <option value="12-15">12–15 min</option>
              <option value="16-20">16–20 min</option>
              <option value="21-30">21–30 min</option>
            </>
          ) : durationVariant === "cape-town" ? (
            <>
              <option value="under-20">Under 20 min</option>
              <option value="20-30">20–30 min</option>
              <option value="over-30">Over 30 min</option>
            </>
          ) : (
            <>
              <option value="short">Under 45 min</option>
              <option value="medium">45–60 min</option>
              <option value="long">Over 60 min</option>
            </>
          )}
        </select>
        <Chevron />
      </Field>

      <Field label="Experience" icon={icons.spark}>
        <select
          className={selectClass}
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="all">All flights</option>
          {experienceVariant === "grand-canyon" ? (
            <option value="landing">Landing tours</option>
          ) : experienceVariant === "las-vegas" ? (
            <>
              <option value="night">Night flights</option>
              <option value="landing">Landing tours</option>
              <option value="private">Private flight</option>
            </>
          ) : !hideDoorsOffOption ? (
            <option value="doors-off">Doors-off</option>
          ) : null}
          {experienceVariant === "default" ? (
            <option value="private">Private flight</option>
          ) : null}
          <option value="shared">Shared / scenic</option>
          <option value="best-value">Best value</option>
          {experienceVariant !== "las-vegas" ? (
            <option value="longest">Longest flight</option>
          ) : null}
        </select>
        <Chevron />
      </Field>

      <button
        type="submit"
        className="rounded-lg bg-teal px-7 py-4 text-base font-bold text-white transition-colors hover:bg-teal-bright"
      >
        Search flights
      </button>
    </form>
  );
}
