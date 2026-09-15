# ShiftPlanner market-readiness gates

## Ready now: controlled company pilot

- Authenticated, role-protected planner with owner-managed invitations.
- Database-enforced worker availability, public-holiday closure, and double-booking protection.
- Multiple workers per station, daily notes, preferred stations, manual overrides, sharing, and A4 printing.
- RLS on every exposed table, immediate disabled-account blocking, protected audit records, and restricted function access.
- Clean CI checks, pinned dependencies, zero known production dependency vulnerabilities, and recoverable error/404 screens.

## Required before using real employee data

- Enable Supabase leaked-password protection and disable public sign-up in the hosted Auth settings.
- Configure production SMTP, branded Auth email templates, the final Site URL, and exact redirect URLs.
- Move from the Supabase Free plan if uninterrupted availability and downloadable backups are required; define backup restore testing and retention.
- Complete a signed-in phone/desktop walkthrough for invitations, password reset, every role, drag/drop, touch assignment, sharing, and printing.
- Add privacy information, an employee-data retention policy, support contact, terms appropriate to the business, and the required processor agreements. Obtain legal review rather than treating repository text as legal advice.
- Choose a production domain/host and add monitoring for frontend errors, Edge Function failures, database health, and deployment failures.

## Required before selling as a multi-company SaaS

- Add organization/workspace membership and an organization ID to every business record and audit event.
- Rewrite and penetration-test RLS so users can access only their own organization; scope invitations and owner actions to that organization.
- Add organization onboarding, deletion/export, billing/entitlements, support administration, and tenant-aware rate limits.
- Use separate preview/staging and production environments with migration promotion and rollback procedures.
- Perform accessibility, browser/device, load, recovery, and independent security testing.

The current database is intentionally single-company. It is appropriate for a controlled pilot, but it must not host unrelated customer companies until tenant isolation is implemented and verified.
