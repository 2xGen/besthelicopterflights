import { Resend } from "resend";
import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;

function isRateLimited(ip: string) {
  const now = Date.now();
  const last = recentSubmissions.get(ip);
  if (last && now - last < RATE_LIMIT_MS) {
    return true;
  }
  recentSubmissions.set(ip, now);
  return false;
}

export async function POST(request: Request) {
  let body: { email?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const email = body.email?.trim().toLowerCase() ?? "";

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Please wait a moment before trying again." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.WAITLIST_TO_EMAIL;
  const fromEmail =
    process.env.WAITLIST_FROM_EMAIL || "Best Helicopter Flights <onboarding@resend.dev>";

  if (apiKey && toEmail) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject: "New Kauai waitlist signup",
        text: `New waitlist signup for Kauai rankings:\n\n${email}\n`,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { message: "Could not save your email. Please try again." },
          { status: 502 },
        );
      }
    } catch (error) {
      console.error("Waitlist email failed:", error);
      return NextResponse.json(
        { message: "Could not save your email. Please try again." },
        { status: 502 },
      );
    }
  } else {
    console.info(
      `[waitlist] Signup accepted (Resend env not configured): ${email}`,
    );
  }

  return NextResponse.json({ message: "You’re on the list." });
}
