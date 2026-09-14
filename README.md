# ShiftPlanner

ShiftPlanner is a weekly staff-planning demo built with React, TypeScript, Vite, Mantine, and Supabase.

## Demo setup

1. Copy `.env.example` to `.env.local` and add the Supabase project URL and publishable key.
2. Install dependencies with `npm ci`.
3. Start the app with `npm run dev`.
4. Create the first user in Supabase Authentication, then promote its matching `profiles` row to `owner` from a trusted database session.

## Database

The schema is recorded in `supabase/migrations`. It provides workers, stations, weekly assignments, Auth-backed role profiles, Row Level Security, database-level double-booking prevention, and unavailable-worker protection.

Signed-in users can view the planner. Managers, admins, and owners can manage workers, stations, and assignments.

## Verification

```sh
npm run lint
npm run build
```
