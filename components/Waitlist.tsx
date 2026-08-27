"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "You’re on the list.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section
      id="waitlist"
      className="bg-mist px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl rounded-sm border border-navy/10 bg-white px-6 py-10 shadow-[0_20px_50px_-30px_rgba(11,31,42,0.35)] md:px-10 md:py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
            Updates
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-navy md:text-4xl">
            Get notified as we expand beyond Kauai
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone">
            Kauai rankings are live. Leave your email for Maui, Oahu and Big
            Island comparisons as they launch — no spam.
          </p>

          {status === "success" ? (
            <p
              className="mt-8 rounded-sm bg-mist-soft px-4 py-3 text-base font-medium text-navy"
              role="status"
            >
              {message}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
                disabled={status === "loading"}
                className="min-w-0 flex-1 rounded-sm border border-navy/15 bg-mist px-4 py-3 text-base text-navy outline-none transition focus:border-teal disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-sm bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-deep disabled:opacity-60"
              >
                {status === "loading" ? "Joining…" : "Notify me"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm text-red-700" role="alert">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
