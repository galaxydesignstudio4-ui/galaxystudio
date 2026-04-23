alter table public.services enable row level security;
alter table public.portfolio enable row level security;
alter table public.gallery enable row level security;
alter table public.adavatar enable row level security;
alter table public.testimonials enable row level security;
alter table public.team enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;
alter table public.settings enable row level security;
alter table public.about enable row level security;

drop policy if exists "services public read" on public.services;
drop policy if exists "services authenticated insert" on public.services;
drop policy if exists "services authenticated update" on public.services;
drop policy if exists "services authenticated delete" on public.services;
create policy "services public read" on public.services
  for select to anon, authenticated
  using (true);
create policy "services authenticated insert" on public.services
  for insert to authenticated
  with check (true);
create policy "services authenticated update" on public.services
  for update to authenticated
  using (true)
  with check (true);
create policy "services authenticated delete" on public.services
  for delete to authenticated
  using (true);

drop policy if exists "portfolio public read" on public.portfolio;
drop policy if exists "portfolio authenticated insert" on public.portfolio;
drop policy if exists "portfolio authenticated update" on public.portfolio;
drop policy if exists "portfolio authenticated delete" on public.portfolio;
create policy "portfolio public read" on public.portfolio
  for select to anon, authenticated
  using (true);
create policy "portfolio authenticated insert" on public.portfolio
  for insert to authenticated
  with check (true);
create policy "portfolio authenticated update" on public.portfolio
  for update to authenticated
  using (true)
  with check (true);
create policy "portfolio authenticated delete" on public.portfolio
  for delete to authenticated
  using (true);

drop policy if exists "gallery public read" on public.gallery;
drop policy if exists "gallery authenticated insert" on public.gallery;
drop policy if exists "gallery authenticated update" on public.gallery;
drop policy if exists "gallery authenticated delete" on public.gallery;
create policy "gallery public read" on public.gallery
  for select to anon, authenticated
  using (true);
create policy "gallery authenticated insert" on public.gallery
  for insert to authenticated
  with check (true);
create policy "gallery authenticated update" on public.gallery
  for update to authenticated
  using (true)
  with check (true);
create policy "gallery authenticated delete" on public.gallery
  for delete to authenticated
  using (true);

drop policy if exists "adavatar public read" on public.adavatar;
drop policy if exists "adavatar authenticated insert" on public.adavatar;
drop policy if exists "adavatar authenticated update" on public.adavatar;
drop policy if exists "adavatar authenticated delete" on public.adavatar;
create policy "adavatar public read" on public.adavatar
  for select to anon, authenticated
  using (true);
create policy "adavatar authenticated insert" on public.adavatar
  for insert to authenticated
  with check (true);
create policy "adavatar authenticated update" on public.adavatar
  for update to authenticated
  using (true)
  with check (true);
create policy "adavatar authenticated delete" on public.adavatar
  for delete to authenticated
  using (true);

drop policy if exists "testimonials public read" on public.testimonials;
drop policy if exists "testimonials authenticated insert" on public.testimonials;
drop policy if exists "testimonials authenticated update" on public.testimonials;
drop policy if exists "testimonials authenticated delete" on public.testimonials;
create policy "testimonials public read" on public.testimonials
  for select to anon, authenticated
  using (true);
create policy "testimonials authenticated insert" on public.testimonials
  for insert to authenticated
  with check (true);
create policy "testimonials authenticated update" on public.testimonials
  for update to authenticated
  using (true)
  with check (true);
create policy "testimonials authenticated delete" on public.testimonials
  for delete to authenticated
  using (true);

drop policy if exists "team public read" on public.team;
drop policy if exists "team authenticated insert" on public.team;
drop policy if exists "team authenticated update" on public.team;
drop policy if exists "team authenticated delete" on public.team;
create policy "team public read" on public.team
  for select to anon, authenticated
  using (true);
create policy "team authenticated insert" on public.team
  for insert to authenticated
  with check (true);
create policy "team authenticated update" on public.team
  for update to authenticated
  using (true)
  with check (true);
create policy "team authenticated delete" on public.team
  for delete to authenticated
  using (true);

drop policy if exists "notifications public read" on public.notifications;
drop policy if exists "notifications authenticated insert" on public.notifications;
drop policy if exists "notifications authenticated update" on public.notifications;
drop policy if exists "notifications authenticated delete" on public.notifications;
create policy "notifications public read" on public.notifications
  for select to anon, authenticated
  using (true);
create policy "notifications authenticated insert" on public.notifications
  for insert to authenticated
  with check (true);
create policy "notifications authenticated update" on public.notifications
  for update to authenticated
  using (true)
  with check (true);
create policy "notifications authenticated delete" on public.notifications
  for delete to authenticated
  using (true);

drop policy if exists "settings public read" on public.settings;
drop policy if exists "settings authenticated insert" on public.settings;
drop policy if exists "settings authenticated update" on public.settings;
drop policy if exists "settings authenticated delete" on public.settings;
create policy "settings public read" on public.settings
  for select to anon, authenticated
  using (true);
create policy "settings authenticated insert" on public.settings
  for insert to authenticated
  with check (true);
create policy "settings authenticated update" on public.settings
  for update to authenticated
  using (true)
  with check (true);
create policy "settings authenticated delete" on public.settings
  for delete to authenticated
  using (true);

drop policy if exists "about public read" on public.about;
drop policy if exists "about authenticated insert" on public.about;
drop policy if exists "about authenticated update" on public.about;
drop policy if exists "about authenticated delete" on public.about;
create policy "about public read" on public.about
  for select to anon, authenticated
  using (true);
create policy "about authenticated insert" on public.about
  for insert to authenticated
  with check (true);
create policy "about authenticated update" on public.about
  for update to authenticated
  using (true)
  with check (true);
create policy "about authenticated delete" on public.about
  for delete to authenticated
  using (true);

drop policy if exists "messages public insert" on public.messages;
drop policy if exists "messages authenticated read" on public.messages;
drop policy if exists "messages authenticated update" on public.messages;
drop policy if exists "messages authenticated delete" on public.messages;
create policy "messages public insert" on public.messages
  for insert to anon, authenticated
  with check (true);
create policy "messages authenticated read" on public.messages
  for select to authenticated
  using (true);
create policy "messages authenticated update" on public.messages
  for update to authenticated
  using (true)
  with check (true);
create policy "messages authenticated delete" on public.messages
  for delete to authenticated
  using (true);

drop policy if exists "storage public read galaxy buckets" on storage.objects;
drop policy if exists "storage authenticated insert galaxy buckets" on storage.objects;
drop policy if exists "storage authenticated update galaxy buckets" on storage.objects;
drop policy if exists "storage authenticated delete galaxy buckets" on storage.objects;
create policy "storage public read galaxy buckets" on storage.objects
  for select to anon, authenticated
  using (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos')
  );
create policy "storage authenticated insert galaxy buckets" on storage.objects
  for insert to authenticated
  with check (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos')
  );
create policy "storage authenticated update galaxy buckets" on storage.objects
  for update to authenticated
  using (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos')
  )
  with check (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos')
  );
create policy "storage authenticated delete galaxy buckets" on storage.objects
  for delete to authenticated
  using (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos')
  );
