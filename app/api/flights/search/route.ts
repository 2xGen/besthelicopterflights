import { NextResponse } from "next/server";
import { getSearchableDestination } from "@/data/destinations";
import type { FlightSearchParams } from "@/data/flights";
import { resolveFlightSearch } from "@/lib/flight-search";

export const runtime = "nodejs";

function asDestination(value: string | null): FlightSearchParams["destination"] {
  return getSearchableDestination(value)?.slug ?? "all";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const params: FlightSearchParams = {
    destination: asDestination(searchParams.get("destination")),
    duration: (searchParams.get("duration") as FlightSearchParams["duration"]) || "any",
    experience:
      (searchParams.get("experience") as FlightSearchParams["experience"]) ||
      "all",
    doors: (searchParams.get("doors") as FlightSearchParams["doors"]) || "any",
    sort: (searchParams.get("sort") as FlightSearchParams["sort"]) || "recommended",
    q: searchParams.get("q") || undefined,
  };

  const result = await resolveFlightSearch(params);
  return NextResponse.json(result);
}
