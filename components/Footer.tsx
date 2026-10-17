import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { LogoMark } from "@/components/Header";

const columns = [
  {
    title: "Destinations",
    links: [
      { href: "/kauai", label: "Kauai helicopter flights" },
      { href: "/oahu", label: "Oahu helicopter flights" },
      { href: "/maui", label: "Maui helicopter flights" },
      { href: "/big-island", label: "Big Island helicopter flights" },
      { href: "/grand-canyon", label: "Grand Canyon" },
      { href: "/las-vegas", label: "Las Vegas" },
      { href: "/new-york", label: "New York City" },
      { href: "/dubai", label: "Dubai" },
      { href: "/cape-town", label: "Cape Town" },
      { href: "/victoria-falls", label: "Victoria Falls" },
    ],
  },
  {
    title: "Popular searches",
    links: [
      { href: "/kauai/doors-off-helicopter-tours", label: "Doors-off flights Kauai" },
      { href: "/maui/doors-off-helicopter-tours", label: "Doors-off flights Maui" },
      { href: "/big-island/kilauea-volcano", label: "Kīlauea volcano flights" },
      { href: "/oahu/private-helicopter-tours", label: "Private flights Oahu" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "How it works" },
      { href: "/compare", label: "Compare flights" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-white px-5 pb-10 pt-12 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.3fr_1fr_1fr_0.8fr]">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display text-lg text-navy">
              BestHelicopterFlights
            </span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-stone">
            Find and compare helicopter flights by island, duration, experience
            and price — then book with trusted providers.
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-sm font-semibold text-navy">{col.title}</p>
            <ul className="mt-3 grid gap-2 text-sm text-stone">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-teal">
                    {link.label}
                  </Link>
                </li>
              ))}
              {col.title === "Company" ? (
                <li>
                  <CookieSettingsButton />
                </li>
              ) : null}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-navy/8 pt-6">
        <p className="text-xs leading-relaxed text-stone-light">
          Best Helicopter Flights is an independent comparison platform. We are
          not a helicopter operator or travel agency. Bookings are completed
          with Viator or the operator; we may earn a commission at no extra cost
          to you. Prices and details can change — always confirm on the booking
          page.
        </p>
        <p className="mt-3 text-xs text-stone-light">
          © {new Date().getFullYear()} Best Helicopter Flights · Built and
          managed by{" "}
          <a
            href="https://2xgen.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:text-teal hover:underline"
          >
            2xGen.com
          </a>
        </p>
      </div>
    </footer>
  );
}
