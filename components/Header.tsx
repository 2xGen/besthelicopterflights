"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { readCompareIds } from "@/components/flights/compare-store";
import { destinations, type Destination } from "@/data/destinations";

type NavGroup = { id: "hawaii" | "worldwide"; label: string; items: Destination[] };

const navGroups: NavGroup[] = [
  {
    id: "hawaii",
    label: "Hawaii",
    items: destinations.filter((d) => d.group === "hawaii" && d.status === "live"),
  },
  {
    id: "worldwide",
    label: "Worldwide",
    items: destinations.filter(
      (d) => d.group === "worldwide" && d.status === "live" && d.seo === "indexed",
    ),
  },
];

function itemDetail(d: Destination): string {
  return d.group === "hawaii" ? d.highlights : `${d.region} · ${d.highlights}`;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        d="m5 7.5 5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#ff765e" />
      <path
        d="M6 9.5h20M16 9.5v3.5"
        stroke="#123f46"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 18.5c0-3 2.6-5.5 6.5-5.5h3.2c2.4 0 4.3 1.9 4.3 4.3v.4c0 1.5-1.2 2.8-2.8 2.8H12.3c-1.5 0-2.8-.9-2.8-2Z"
        fill="#123f46"
      />
      <path
        d="M9.5 17H5.5M12 24h9M14 20.5 13 24M19 20.5l1 3.5"
        stroke="#123f46"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compareCount, setCompareCount] = useState(0);

  useEffect(() => {
    const sync = () => setCompareCount(readCompareIds().length);
    sync();
    window.addEventListener("bhf-compare-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bhf-compare-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const [menu, setMenu] = useState<NavGroup["id"] | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menu) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const groupActive = (group: NavGroup) =>
    group.items.some((d) => isActive(`/${d.slug}`));

  return (
    <header className="fixed inset-x-0 top-0 z-50 max-w-full bg-nav text-white shadow-[0_1px_0_rgba(255,255,255,0.06)]">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="flex min-w-0 items-center">
          <span className="truncate font-display text-[1.05rem] tracking-tight md:text-lg">
            BestHelicopterFlights
          </span>
        </Link>

        <nav
          ref={navRef}
          aria-label="Primary"
          className="hidden items-center gap-1 text-sm font-medium md:flex"
        >
          {navGroups.map((group) => {
            const expanded = menu === group.id;
            return (
              <div key={group.id} className="relative">
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`nav-${group.id}`}
                  onClick={() => setMenu(expanded ? null : group.id)}
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 transition-colors ${
                    expanded || groupActive(group)
                      ? "bg-white/15 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {group.label}
                  <Chevron open={expanded} />
                </button>
                {expanded ? (
                  <ul
                    id={`nav-${group.id}`}
                    className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-stone-light bg-white p-2 text-navy shadow-[0_18px_40px_-12px_rgba(16,41,45,0.35)]"
                  >
                    {group.items.map((d) => {
                      const active = isActive(`/${d.slug}`);
                      return (
                        <li key={d.slug}>
                          <Link
                            href={`/${d.slug}`}
                            onClick={() => setMenu(null)}
                            aria-current={active ? "page" : undefined}
                            className={`block rounded-lg px-3 py-2.5 transition-colors ${
                              active ? "bg-mist-soft" : "hover:bg-mist"
                            }`}
                          >
                            <span className="block font-semibold">{d.shortLabel}</span>
                            <span className="block truncate text-xs font-normal text-stone">
                              {itemDetail(d)}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            );
          })}
          <Link
            href="/about"
            className="rounded-full px-3.5 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            How it works
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/compare"
            className="flex items-center gap-2 rounded-full border border-white/30 px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-white/10"
          >
            Compare
            {compareCount > 0 ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-sun px-1.5 text-xs font-bold text-navy">
                {compareCount}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto border-t border-white/10 bg-nav px-5 pb-4 pt-2 md:hidden"
        >
          {navGroups.map((group) => (
            <div key={group.id} className="pt-2">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-white/50">
                {group.label}
              </p>
              <ul className="grid grid-cols-2 gap-1">
                {group.items.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/${d.slug}`}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(`/${d.slug}`) ? "page" : undefined}
                      className={`block rounded-lg px-3 py-2.5 text-[0.95rem] font-medium leading-snug hover:bg-white/10 ${
                        isActive(`/${d.slug}`) ? "bg-white/15 text-white" : "text-white/90"
                      }`}
                    >
                      {d.shortLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="mt-2 block border-t border-white/10 px-3 pb-1 pt-4 text-base font-medium text-white/90 hover:text-white"
          >
            How it works
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
