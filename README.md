# ShiftPlanner

ShiftPlanner is a weekly staff-planning demo built with React, TypeScript, Vite, Mantine, and Supabase.

## Demo setup

1. Copy `.env.example` to `.env.local` and add the Supabase project URL and publishable key.
2. Install dependencies with `npm ci`.
3. Start the app with `npm run dev`.
4. Sign in with an invited account. Existing owners invite people and assign trusted roles from **Team & Access**.

## Database

The schema is recorded in `supabase/migrations`. It provides workers, stations, weekly assignments, Auth-backed role profiles, Row Level Security, database-level double-booking prevention, and unavailable-worker protection.

Signed-in users can view the planner. Managers, admins, and owners can manage workers, stations, and assignments. Owners can invite accounts, change roles, disable access, cancel pending invitations, and optionally link a login to a worker record.

## Verification

```sh
npm test
npm run lint
npm run build
```
## Planner
Select a worker and click an empty cell, or drag a worker onto the grid. Click an assignment to edit its note, move it, or confirm removal. Use the week controls, station/worker search, and density switch to adjust your view. The first column and date header remain visible when scrolling.

Use **Share weekly plan** to send a text version through the phone share sheet, including WhatsApp. Use **Print A4** for a clean landscape printout of the complete weekly grid.

## Database setup
The migrations describe a fresh database plus follow-up integrity fixes. The existing hosted database has already received equivalent SQL changes; do not replay the baseline there without reconciling migration history. The optional supabase/seed.sql adds three labeled demo worker records and two stations. These are not login accounts. It preserves other records.

## Email configuration
In hosted Supabase Auth, allow the actual app origin with `/login` and `/reset-password` as redirect URLs. Include `http://localhost:5173/reset-password` and `https://gangarig.github.io/shift-planner/reset-password`. Hosted settings are separate from local `supabase/config.toml`. Use an appropriate email provider for recipients outside your Supabase team and disable public email sign-ups before using real employee data.

Invitations are sent by the protected `manage-team` Edge Function. Supabase administrative credentials stay server-side and are never included in the React bundle.

## Hosted demo

GitHub Actions deploys `main` to `https://gangarig.github.io/shift-planner/`.

## Scope and verification
See PRODUCT_CHECKLIST.md for this release's completed checklist and remaining production work. This is a single-company MVP. Invitation email delivery and a signed-in phone walkthrough still require manual confirmation.
