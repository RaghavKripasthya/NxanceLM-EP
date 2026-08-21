create or replace function public.waitlist_count()
returns bigint
language sql
security definer
set search_path = public
stable
as $$
  select count(*)::bigint from public.waitlist;
$$;

grant execute on function public.waitlist_count() to anon, authenticated;
