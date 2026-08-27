# Best Helicopter Flights

Independent research and comparisons of helicopter tours — starting with Hawaii.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Deployed on Vercel

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Waitlist env vars

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `WAITLIST_TO_EMAIL` | Where signup notifications are sent |
| `WAITLIST_FROM_EMAIL` | From address (must be a verified Resend domain/sender) |

Without these vars, the waitlist form still validates and succeeds locally; signups are logged to the server console.

## Deploy on Vercel

1. Push this repo to GitHub (or import the folder in Vercel).
2. Create a new Vercel project pointing at this directory.
3. Add the Resend env vars above in **Project → Settings → Environment Variables**.
4. Deploy, then attach the custom domain `besthelicopterflights.com`.

## Brand notes

- Beachhead destination: **Hawaii** (Kauai rankings first).
- Positioning: researcher and curator — not a pilot, operator, or travel agency.
- Island pages are intentionally not created yet; homepage teasers say “coming soon.”
