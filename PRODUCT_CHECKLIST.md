# ShiftPlanner MVP checklist

This release keeps the existing dashboard, planner, workers, stations, and settings layout.

- [x] Planner: dated week navigation, readable grid, compact/comfortable density, station search.
- [x] Scheduling: click or drag to assign, move existing assignments, edit notes, confirm removal, show conflicts.
- [x] Data: verify returned rows on writes; show errors; preserve forms after failed saves.
- [x] Security: close legacy public worker access and check role-based database writes.
- [x] Authentication: prevent stale profile requests from restoring a signed-out session.
- [x] Design: neutral surfaces, readable text, one blue accent, restrained status colors.
- [x] Demo data: remove unused mock modules; provide explicitly labeled database sample workers.
- [x] Verification: build, lint, scheduling/date tests, database permission checks.

## Product boundaries

Current product serves one company with one worker per station per day, Monday through Friday. Worker records are separate from login accounts. No extra login accounts or shared passwords are required for sample workers.

Future product work: company membership and tenant isolation, invitations and role administration, time-based shifts, per-date leave approvals, audit history, and production email delivery. These are not claimed as complete by this MVP.
## Verified this release

Eight automated scheduling/date checks passed. Live database rollback tests passed for owner CRUD, rejected writes, date integrity, double-booking, note editing, and atomic selected-week cleanup. Lint and production build pass.

Browser interaction and visual QA remain unverified: the browser tool cannot pass its administrator policy check. End-to-end signup/email recovery also require the configured email provider and redirect URLs.

Demo workers and stations are labeled Demo. Existing database records have been preserved; removed local mock files remain recoverable from Git history.

