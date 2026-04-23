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
drop policy if exists "services public insert" on public.services;
drop policy if exists "services public update" on public.services;
drop policy if exists "services public delete" on public.services;
create policy "services public read" on public.services
  for select to anon, authenticated
  using (true);
create policy "services public insert" on public.services
  for insert to anon, authenticated
  with check (true);
create policy "services public update" on public.services
  for update to anon, authenticated
  using (true)
  with check (true);
create policy "services public delete" on public.services
  for delete to anon, authenticated
  using (true);

drop policy if exists "portfolio public read" on public.portfolio;
drop policy if exists "portfolio public insert" on public.portfolio;
drop policy if exists "portfolio public update" on public.portfolio;
drop policy if exists "portfolio public delete" on public.portfolio;
create policy "portfolio public read" on public.portfolio
  for select to anon, authenticated
  using (true);
create policy "portfolio public insert" on public.portfolio
  for insert to anon, authenticated
  with check (true);
create policy "portfolio public update" on public.portfolio
  for update to anon, authenticated
  using (true)
  with check (true);
create policy "portfolio public delete" on public.portfolio
  for delete to anon, authenticated
  using (true);

drop policy if exists "gallery public read" on public.gallery;
drop policy if exists "gallery public insert" on public.gallery;
drop policy if exists "gallery public update" on public.gallery;
drop policy if exists "gallery public delete" on public.gallery;
create policy "gallery public read" on public.gallery
  for select to anon, authenticated
  using (true);
create policy "gallery public insert" on public.gallery
  for insert to anon, authenticated
  with check (true);
create policy "gallery public update" on public.gallery
  for update to anon, authenticated
  using (true)
  with check (true);
create policy "gallery public delete" on public.gallery
  for delete to anon, authenticated
  using (true);

drop policy if exists "adavatar public read" on public.adavatar;
drop policy if exists "adavatar public insert" on public.adavatar;
drop policy if exists "adavatar public update" on public.adavatar;
drop policy if exists "adavatar public delete" on public.adavatar;
create policy "adavatar public read" on public.adavatar
  for select to anon, authenticated
  using (true);
create policy "adavatar public insert" on public.adavatar
  for insert to anon, authenticated
  with check (true);
create policy "adavatar public update" on public.adavatar
  for update to anon, authenticated
  using (true)
  with check (true);
create policy "adavatar public delete" on public.adavatar
  for delete to anon, authenticated
  using (true);

drop policy if exists "testimonials public read" on public.testimonials;
drop policy if exists "testimonials public insert" on public.testimonials;
drop policy if exists "testimonials public update" on public.testimonials;
drop policy if exists "testimonials public delete" on public.testimonials;
create policy "testimonials public read" on public.testimonials
  for select to anon, authenticated
  using (true);
create policy "testimonials public insert" on public.testimonials
  for insert to anon, authenticated
  with check (true);
create policy "testimonials public update" on public.testimonials
  for update to anon, authenticated
  using (true)
  with check (true);
create policy "testimonials public delete" on public.testimonials
  for delete to anon, authenticated
  using (true);

drop policy if exists "team public read" on public.team;
drop policy if exists "team public insert" on public.team;
drop policy if exists "team public update" on public.team;
drop policy if exists "team public delete" on public.team;
create policy "team public read" on public.team
  for select to anon, authenticated
  using (true);
create policy "team public insert" on public.team
  for insert to anon, authenticated
  with check (true);
create policy "team public update" on public.team
  for update to anon, authenticated
  using (true)
  with check (true);
create policy "team public delete" on public.team
  for delete to anon, authenticated
  using (true);

drop policy if exists "notifications public read" on public.notifications;
drop policy if exists "notifications public insert" on public.notifications;
drop policy if exists "notifications public update" on public.notifications;
drop policy if exists "notifications public delete" on public.notifications;
create policy "notifications public read" on public.notifications
  for select to anon, authenticated
  using (true);
create policy "notifications public insert" on public.notifications
  for insert to anon, authenticated
  with check (true);
create policy "notifications public update" on public.notifications
  for update to anon, authenticated
  using (true)
  with check (true);
create policy "notifications public delete" on public.notifications
  for delete to anon, authenticated
  using (true);

drop policy if exists "settings public read" on public.settings;
drop policy if exists "settings public insert" on public.settings;
drop policy if exists "settings public update" on public.settings;
drop policy if exists "settings public delete" on public.settings;
create policy "settings public read" on public.settings
  for select to anon, authenticated
  using (true);
create policy "settings public insert" on public.settings
  for insert to anon, authenticated
  with check (true);
create policy "settings public update" on public.settings
  for update to anon, authenticated
  using (true)
  with check (true);
create policy "settings public delete" on public.settings
  for delete to anon, authenticated
  using (true);

drop policy if exists "about public read" on public.about;
drop policy if exists "about public insert" on public.about;
drop policy if exists "about public update" on public.about;
drop policy if exists "about public delete" on public.about;
create policy "about public read" on public.about
  for select to anon, authenticated
  using (true);
create policy "about public insert" on public.about
  for insert to anon, authenticated
  with check (true);
create policy "about public update" on public.about
  for update to anon, authenticated
  using (true)
  with check (true);
create policy "about public delete" on public.about
  for delete to anon, authenticated
  using (true);

drop policy if exists "messages public read" on public.messages;
drop policy if exists "messages public insert" on public.messages;
drop policy if exists "messages public update" on public.messages;
drop policy if exists "messages public delete" on public.messages;
create policy "messages public read" on public.messages
  for select to anon, authenticated
  using (true);
create policy "messages public insert" on public.messages
  for insert to anon, authenticated
  with check (true);
create policy "messages public update" on public.messages
  for update to anon, authenticated
  using (true)
  with check (true);
create policy "messages public delete" on public.messages
  for delete to anon, authenticated
  using (true);

drop policy if exists "storage public read galaxy buckets" on storage.objects;
drop policy if exists "storage public insert galaxy buckets" on storage.objects;
drop policy if exists "storage public update galaxy buckets" on storage.objects;
drop policy if exists "storage public delete galaxy buckets" on storage.objects;
create policy "storage public read galaxy buckets" on storage.objects
  for select to anon, authenticated
  using (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos')
  );
create policy "storage public insert galaxy buckets" on storage.objects
  for insert to anon, authenticated
  with check (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos')
  );
create policy "storage public update galaxy buckets" on storage.objects
  for update to anon, authenticated
  using (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos')
  )
  with check (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos')
  );
create policy "storage public delete galaxy buckets" on storage.objects
  for delete to anon, authenticated
  using (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos')
  );
