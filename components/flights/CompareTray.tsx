"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { flights as curatedFlights, type Flight } from "@/data/flights";
import {
  readCompareIds,
  writeCompareIds,
} from "@/components/flights/compare-store";

type Props = {
  /** Extra flights from the current results page (includes live Viator rows) */
  catalog?: Flight[];
};

export function CompareTray({ catalog = [] }: Props) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setIds(readCompareIds());
    sync();
    window.addEventListener("bhf-compare-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bhf-compare-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const byId = useMemo(() => {
    const map = new Map<string, Flight>();
    for (const f of curatedFlights) map.set(f.id, f);
    for (const f of catalog) map.set(f.id, f);
    return map;
  }, [catalog]);

  const selected = ids
    .map((id) => byId.get(id))
    .filter((f): f is Flight => Boolean(f));

  if (selected.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/10 bg-white px-4 py-3 shadow-[0_-8px_30px_rgba(15,29,51,0.12)] md:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-navy">
            {selected.length} of 3 flights selected
          </p>
          <p className="mt-0.5 truncate text-sm text-stone">
            {selected.map((f) => f.shortName).join(" · ")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => writeCompareIds([])}
            className="rounded-lg border border-navy/15 px-3.5 py-2.5 text-sm font-medium text-navy transition-colors hover:border-navy/40"
          >
            Clear
          </button>
          <Link
            href={`/compare?ids=${selected.map((f) => f.slug).join(",")}`}
            className="rounded-lg bg-teal px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-teal-bright"
          >
            {selected.length < 2 ? "Select one more to compare" : "Compare side-by-side"}
          </Link>
        </div>
      </div>
    </div>
  );
}
