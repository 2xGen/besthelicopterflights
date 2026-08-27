"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type HeaderProps = {
  variant?: "overlay" | "solid";
};

const homeLinks = [
  { href: "/kauai", label: "Kauai" },
  { href: "/about", label: "About" },
  { href: "/#how-we-compare", label: "How we compare" },
];

export function Header({ variant = "overlay" }: HeaderProps) {
  const pathname = usePathname();
  const onKauai = pathname === "/kauai" || pathname.startsWith("/kauai/");
  const [scrolled, setScrolled] = useState(variant === "solid");

  useEffect(() => {
    if (variant === "solid") {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || variant === "solid"
          ? "bg-navy-deep/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:gap-6 md:px-8 md:py-4">
        <Link
          href="/"
          className="min-w-0 font-display text-base tracking-tight text-white sm:text-lg md:text-xl"
        >
          Best Helicopter Flights
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 text-sm text-white/80 sm:flex"
        >
          {homeLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {onKauai ? (
          <Link
            href="/about"
            className="shrink-0 rounded-sm border border-white/30 px-3 py-2 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10 sm:hidden"
          >
            About
          </Link>
        ) : (
          <Link
            href="/kauai"
            className="shrink-0 rounded-sm bg-teal px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-bright sm:hidden"
          >
            Kauai
          </Link>
        )}
      </div>
    </header>
  );
}
