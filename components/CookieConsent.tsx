"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, writeConsent } from "@/lib/consent";

/**
 * GDPR-style consent banner: analytics off until Accept.
 * Reject is equally available; preferences can be reopened from the footer.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => setVisible(readConsent() === null);

    sync();

    const onOpen = () => setVisible(true);
    const onConsent = () => setVisible(false);

    window.addEventListener("bh-open-cookie-settings", onOpen);
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => {
      window.removeEventListener("bh-open-cookie-settings", onOpen);
      window.removeEventListener(CONSENT_EVENT, onConsent);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[100] p-4 md:p-6"
    >
      <div className="mx-auto max-w-3xl border border-white/10 bg-navy-deep p-5 text-white shadow-[0_-8px_40px_rgba(6,20,28,0.35)] md:p-6">
        <h2
          id="cookie-consent-title"
          className="font-display text-lg leading-snug md:text-xl"
        >
          Cookies & analytics
        </h2>
        <p
          id="cookie-consent-desc"
          className="mt-3 text-sm leading-relaxed text-white/70 md:text-[0.9375rem]"
        >
          We use optional analytics (Vercel Analytics) to understand visits and
          improve the site. It only runs if you accept. Essential site
          operation does not require analytics cookies. Search Console and Bing
          Webmaster Tools are used for search indexing and do not set cookies
          through this banner. See our{" "}
          <Link
            href="/privacy"
            className="text-teal-bright underline-offset-2 hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          for details. You can change this later via Cookie settings in the
          footer.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              writeConsent(false);
              setVisible(false);
            }}
            className="order-2 border border-white/25 px-5 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/50 hover:bg-white/5 sm:order-1"
          >
            Reject analytics
          </button>
          <button
            type="button"
            onClick={() => {
              writeConsent(true);
              setVisible(false);
            }}
            className="order-1 bg-teal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-bright sm:order-2"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}

