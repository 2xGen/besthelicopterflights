/**
 * Builds a Viator product URL, optionally appending affiliate params.
 * Set NEXT_PUBLIC_VIATOR_PID (and optionally NEXT_PUBLIC_VIATOR_MCID) in env.
 */
export function viatorAffiliateUrl(productUrl: string): string {
  const pid = process.env.NEXT_PUBLIC_VIATOR_PID;
  if (!pid) return productUrl;

  const url = new URL(productUrl);
  url.searchParams.set("pid", pid);
  url.searchParams.set(
    "mcid",
    process.env.NEXT_PUBLIC_VIATOR_MCID || "42383",
  );
  url.searchParams.set("medium", "link");
  return url.toString();
}
