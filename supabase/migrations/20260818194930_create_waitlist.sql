create table public.waitlist (
  id bigint generated always as identity primary key,
  email text not null,
  created_at timestamptz not null default now(),
  constraint waitlist_email_length check (char_length(email) <= 320)
);

create unique index waitlist_email_lower_idx on public.waitlist (lower(email));

alter table public.waitlist enable row level security;

create policy "anon_can_insert_waitlist"
on public.waitlist
for insert
to anon, authenticated
with check (
  email is not null
  and char_length(email) between 3 and 320
);

grant insert on table public.waitlist to anon, authenticated;
