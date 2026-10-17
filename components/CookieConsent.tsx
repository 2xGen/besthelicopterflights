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
      className="fixed bottom-0 right-0 z-[100] w-full max-w-md p-3 md:p-5"
    >
      <div className="rounded-xl border border-navy/10 bg-white p-4 text-navy shadow-[0_12px_40px_rgba(15,29,51,0.18)] md:p-5">
        <h2 id="cookie-consent-title" className="text-base">
          Cookies & analytics
        </h2>
        <p
          id="cookie-consent-desc"
          className="mt-1.5 text-sm leading-relaxed text-stone"
        >
          We use optional analytics (Vercel Analytics) to improve the site. It
          only runs if you accept. See our{" "}
          <Link
            href="/privacy"
            className="font-medium text-teal underline-offset-2 hover:underline"
          >
            Privacy Policy
          </Link>
          . You can change this later via Cookie settings in the footer.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => {
              writeConsent(false);
              setVisible(false);
            }}
            className="order-2 flex-1 rounded-lg border border-navy/15 px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-navy/40 sm:order-1"
          >
            Reject analytics
          </button>
          <button
            type="button"
            onClick={() => {
              writeConsent(true);
              setVisible(false);
            }}
            className="order-1 flex-1 rounded-lg bg-teal px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-teal-bright sm:order-2"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}

