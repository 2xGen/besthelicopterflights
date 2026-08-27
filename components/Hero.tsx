import Image from "next/image";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=2400&q=80"
          alt="Aerial view of Hawaiian coastline and turquoise ocean"
          fill
          priority
          className="object-cover object-center animate-fade-in"
          sizes="100vw"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-80 animate-fade-in"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=2400&q=80"
          aria-hidden="true"
        >
          <source
            src="https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Microsites%20OG/compressed-video.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy/30" />
        <div className="absolute inset-0 bg-navy-deep/25" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
        <p
          className="animate-fade-rise font-display text-2xl text-white md:text-3xl lg:text-4xl"
          style={{ animationDelay: "0.05s" }}
        >
          Best Helicopter Flights
        </p>
        <h1
          className="animate-fade-rise mt-5 max-w-3xl font-display text-3xl leading-tight text-white md:text-5xl md:leading-[1.12]"
          style={{ animationDelay: "0.18s" }}
        >
          The Best Helicopter Tours in Hawaii: Researched, Compared &amp; Ranked
        </h1>
        <p
          className="animate-fade-rise mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"
          style={{ animationDelay: "0.32s" }}
        >
          We compare helicopter tours using traveler reviews, routes, pricing,
          operator information and booking terms so you can find the right
          flight for your trip without researching dozens of listings yourself.
        </p>
        <div
          className="animate-fade-rise mt-9 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="/kauai"
            className="rounded-sm bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-bright"
          >
            See Kauai tours compared &amp; ranked
          </a>
          <a
            href="#how-we-compare"
            className="rounded-sm border border-white/35 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
          >
            See how we compare
          </a>
        </div>
      </div>
    </section>
  );
}
