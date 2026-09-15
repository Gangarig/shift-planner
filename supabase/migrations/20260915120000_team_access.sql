alter table public.profiles
  add column if not exists worker_id uuid references public.workers(id) on delete set null;

create unique index if not exists profiles_worker_id_key
  on public.profiles (worker_id)
  where worker_id is not null;

comment on column public.profiles.worker_id is
  'Optional link between a login account and a schedulable worker record.';

-- Profiles are changed only by the trusted manage-team Edge Function.
revoke insert, update, delete on public.profiles from anon, authenticated;
