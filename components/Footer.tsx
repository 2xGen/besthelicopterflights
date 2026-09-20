import { CookieSettingsButton } from "@/components/CookieSettingsButton";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-deep px-5 py-14 text-white md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <p className="font-display text-xl text-white">
            Best Helicopter Flights
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Independent research and comparisons of helicopter tours. We help
            travelers choose with clearer information — before they book.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
          <a href="/about" className="hover:text-white">
            About
          </a>
          <a href="/kauai" className="hover:text-white">
            Kauai tours
          </a>
          <a href="/oahu" className="hover:text-white">
            Oahu tours
          </a>
          <a href="/maui" className="hover:text-white">
            Maui tours
          </a>
          <a href="/big-island" className="hover:text-white">
            Big Island tours
          </a>
          <a href="/privacy" className="hover:text-white">
            Privacy
          </a>
          <CookieSettingsButton />
          <a href="/#how-we-compare" className="hover:text-white">
            How we compare
          </a>
        </nav>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-8">
        <p className="text-xs leading-relaxed text-white/45">
          Best Helicopter Flights is an independent research and curation site.
          We are not a helicopter operator, pilot service, or travel agency, and
          we are not affiliated with the tour operators we cover. Information is
          based on publicly available sources and traveler feedback, which may
          change over time.
        </p>
        <p className="mt-4 text-xs text-white/40">
          © {new Date().getFullYear()} Best Helicopter Flights · Built and
          managed by{" "}
          <a
            href="https://2xgen.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 underline-offset-2 transition-colors hover:text-white hover:underline"
          >
            2xGen.com
          </a>
        </p>
      </div>
    </footer>
  );
}
