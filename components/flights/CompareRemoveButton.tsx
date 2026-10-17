"use client";

import { useRouter } from "next/navigation";
import {
  readCompareIds,
  writeCompareIds,
} from "@/components/flights/compare-store";

type Props = {
  flightId: string;
  remainingSlugs: string[];
};

export function CompareRemoveButton({ flightId, remainingSlugs }: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="Remove from comparison"
      onClick={() => {
        writeCompareIds(readCompareIds().filter((id) => id !== flightId));
        router.push(
          remainingSlugs.length
            ? `/compare?ids=${remainingSlugs.join(",")}`
            : "/compare",
        );
      }}
      className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-navy shadow-sm transition-colors hover:bg-white hover:text-teal"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
        <path
          d="M5.5 5.5l9 9M14.5 5.5l-9 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
