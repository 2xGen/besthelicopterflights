"use client";

const STORAGE_KEY = "bhf-compare";
const MAX_COMPARE = 3;

export function readCompareIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_COMPARE) : [];
  } catch {
    return [];
  }
}

export function writeCompareIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(ids.slice(0, MAX_COMPARE)),
  );
  window.dispatchEvent(new Event("bhf-compare-change"));
}

export function toggleCompareId(id: string): string[] {
  const current = readCompareIds();
  const next = current.includes(id)
    ? current.filter((x) => x !== id)
    : current.length >= MAX_COMPARE
      ? current
      : [...current, id];
  writeCompareIds(next);
  return next;
}

export const COMPARE_MAX = MAX_COMPARE;
