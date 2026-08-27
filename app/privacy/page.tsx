import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Best Helicopter Flights handles privacy, cookies, analytics, and search tools — including your choices under GDPR.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Header variant="solid" />
      <main className="flex-1 pt-[4.25rem]">
        <section className="bg-navy-deep px-5 pb-14 pt-12 text-white md:px-8 md:pb-20 md:pt-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-bright">
              Legal
            </p>
            <h1 className="mt-4 font-display text-3xl leading-tight md:text-5xl md:leading-[1.12]">
              Privacy Policy
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Last updated: 27 August 2026
            </p>
          </div>
        </section>

        <article className="bg-mist px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl space-y-12 text-base leading-relaxed text-stone md:text-lg">
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                Who we are
              </h2>
              <p>
                Best Helicopter Flights (
                <Link
                  href="https://besthelicopterflights.com"
                  className="text-teal hover:underline"
                >
                  besthelicopterflights.com
                </Link>
                ) is an independent research and comparison site for helicopter
                tours. The site is built and managed by{" "}
                <a
                  href="https://2xgen.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:underline"
                >
                  2xGen.com
                </a>
                .
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                What this policy covers
              </h2>
              <p>
                This page explains what data we process when you visit the site,
                which tools we use, and how you can control optional analytics.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                Essential operation
              </h2>
              <p>
                Serving pages and basic security (for example via our hosting
                provider) may involve technical processing that is necessary to
                deliver the website. We do not use advertising cookies on this
                site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                Optional analytics (Vercel Analytics)
              </h2>
              <p>
                If you choose <strong className="font-semibold text-navy">Accept analytics</strong>, we enable{" "}
                <strong className="font-semibold text-navy">Vercel Analytics</strong> to
                measure visits and page views so we can improve the site. Analytics
                is off by default and is not loaded until you accept.
              </p>
              <p>
                You can reject analytics, or change your choice later using{" "}
                <strong className="font-semibold text-navy">Cookie settings</strong> in
                the footer. Your choice is stored in your browser (local storage)
                so we remember your preference.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                Search tools (Google Search Console & Bing)
              </h2>
              <p>
                We use Google Search Console and Bing Webmaster Tools to
                understand how the site appears in search results and to submit
                sitemaps. These are webmaster / indexing tools. They do not set
                visitor-facing tracking cookies through our cookie banner, and
                they are not the same as on-site analytics scripts.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                Affiliate and third-party links
              </h2>
              <p>
                Tour links may go to third-party booking sites (for example
                Viator). Those sites have their own privacy practices and may
                set their own cookies after you leave our site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                Your choices (GDPR)
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Analytics is optional and requires a clear Accept action.
                </li>
                <li>Reject is always available and equally easy.</li>
                <li>
                  You can withdraw or change consent anytime via Cookie settings.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                Contact
              </h2>
              <p>
                For privacy questions, contact us via{" "}
                <a
                  href="https://2xgen.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:underline"
                >
                  2xGen.com
                </a>
                .
              </p>
              <p>
                <Link href="/about" className="text-teal hover:underline">
                  About Best Helicopter Flights
                </Link>
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
