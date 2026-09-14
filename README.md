# ShiftPlanner

ShiftPlanner is a weekly staff-planning demo built with React, TypeScript, Vite, Mantine, and Supabase.

## Demo setup

1. Copy `.env.example` to `.env.local` and add the Supabase project URL and publishable key.
2. Install dependencies with `npm ci`.
3. Start the app with `npm run dev`.
4. Register through the app and confirm the email. An administrator must assign a trusted profile role before management access is available. Existing owners can sign in normally.

## Database

The schema is recorded in `supabase/migrations`. It provides workers, stations, weekly assignments, Auth-backed role profiles, Row Level Security, database-level double-booking prevention, and unavailable-worker protection.

Signed-in users can view the planner. Managers, admins, and owners can manage workers, stations, and assignments.

## Verification

```sh
npm test
npm run lint
npm run build
```
## Planner
Select a worker and click an empty cell, or drag a worker onto the grid. Click an assignment to edit its note, move it, or confirm removal. Use the week controls, station/worker search, and density switch to adjust your view. The first column and date header remain visible when scrolling.

## Database setup
The migrations describe a fresh database plus follow-up integrity fixes. The existing hosted database has already received equivalent SQL changes; do not replay the baseline there without reconciling migration history. The optional supabase/seed.sql adds three labeled demo worker records and two stations. These are not login accounts. It preserves other records.

## Email configuration
In hosted Supabase Auth, allow the actual app origin with /login and /reset-password as redirect URLs (for example http://localhost:5173/login and http://localhost:5173/reset-password). Hosted settings are separate from local supabase/config.toml. Use an appropriate email provider for recipients outside your Supabase team.

## Scope and verification
See PRODUCT_CHECKLIST.md for this release's completed checklist and remaining production work. This is a single-company MVP. Browser interaction and email delivery must still be checked in your local session.
