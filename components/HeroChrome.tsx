import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/Header";

/** Soft brand glow on navy hero backgrounds — coral + teal, kept understated. */
export function HeroAtmosphere() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.26]"
        style={{
          background:
            "radial-gradient(60% 80% at 88% 0%, rgba(255,118,94,0.24), transparent 58%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 12% 85%, rgba(42,111,122,0.4), transparent 55%)",
        }}
      />
    </>
  );
}

/** Site positioning from homepage SEO — visible in every main hero, not competing with the H1. */
export function HeroSiteMark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`mb-4 inline-flex items-center gap-2.5 text-white/45 transition-colors hover:text-white/70 ${className}`}
      aria-label="Best Helicopter Flights — helicopter tours worldwide, compare flights and prices"
    >
      <LogoMark className="h-6 w-6 shrink-0 opacity-90" />
      <span className="text-[0.68rem] font-semibold uppercase leading-snug tracking-[0.13em] md:text-[0.72rem]">
        Helicopter tours worldwide · Compare flights &amp; prices
      </span>
    </Link>
  );
}

type HeroSectionProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function HeroSection({
  children,
  className = "px-5 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16",
  contentClassName = "max-w-6xl",
}: HeroSectionProps) {
  return (
    <section className={`relative overflow-hidden bg-navy-deep text-white ${className}`}>
      <HeroAtmosphere />
      <div className={`relative mx-auto ${contentClassName}`}>
        <HeroSiteMark />
        {children}
      </div>
    </section>
  );
}

/** Standard island / category page hero wrapper. */
export function CategoryHeroSection({
  children,
  contentClassName = "max-w-6xl",
}: {
  children: ReactNode;
  contentClassName?: string;
}) {
  return (
    <HeroSection contentClassName={contentClassName}>{children}</HeroSection>
  );
}
