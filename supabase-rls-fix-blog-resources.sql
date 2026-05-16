-- Run this in the Supabase SQL Editor for the current project.
-- This fixes row-level security for the newer Galaxy content tables
-- and allows the resources storage bucket used by the admin UI.

alter table public.blog_posts enable row level security;
alter table public.blog_comments enable row level security;
alter table public.resources enable row level security;
alter table public.users enable row level security;
alter table public.subscribers enable row level security;

drop policy if exists "blog posts public read" on public.blog_posts;
drop policy if exists "blog posts authenticated insert" on public.blog_posts;
drop policy if exists "blog posts authenticated update" on public.blog_posts;
drop policy if exists "blog posts authenticated delete" on public.blog_posts;
create policy "blog posts public read" on public.blog_posts
  for select to anon, authenticated
  using (true);
create policy "blog posts authenticated insert" on public.blog_posts
  for insert to authenticated
  with check (true);
create policy "blog posts authenticated update" on public.blog_posts
  for update to authenticated
  using (true)
  with check (true);
create policy "blog posts authenticated delete" on public.blog_posts
  for delete to authenticated
  using (true);

drop policy if exists "blog comments public read" on public.blog_comments;
drop policy if exists "blog comments public insert" on public.blog_comments;
drop policy if exists "blog comments authenticated update" on public.blog_comments;
drop policy if exists "blog comments authenticated delete" on public.blog_comments;
create policy "blog comments public read" on public.blog_comments
  for select to anon, authenticated
  using (true);
create policy "blog comments public insert" on public.blog_comments
  for insert to anon, authenticated
  with check (true);
create policy "blog comments authenticated update" on public.blog_comments
  for update to authenticated
  using (true)
  with check (true);
create policy "blog comments authenticated delete" on public.blog_comments
  for delete to authenticated
  using (true);

drop policy if exists "resources public read" on public.resources;
drop policy if exists "resources authenticated insert" on public.resources;
drop policy if exists "resources authenticated update" on public.resources;
drop policy if exists "resources authenticated delete" on public.resources;
create policy "resources public read" on public.resources
  for select to anon, authenticated
  using (true);
create policy "resources authenticated insert" on public.resources
  for insert to authenticated
  with check (true);
create policy "resources authenticated update" on public.resources
  for update to authenticated
  using (true)
  with check (true);
create policy "resources authenticated delete" on public.resources
  for delete to authenticated
  using (true);

drop policy if exists "users public self insert" on public.users;
drop policy if exists "users public self read" on public.users;
drop policy if exists "users public self update" on public.users;
drop policy if exists "users authenticated delete" on public.users;
create policy "users public self insert" on public.users
  for insert to anon, authenticated
  with check (true);
create policy "users public self read" on public.users
  for select to anon, authenticated
  using (true);
create policy "users public self update" on public.users
  for update to anon, authenticated
  using (true)
  with check (true);
create policy "users authenticated delete" on public.users
  for delete to authenticated
  using (true);

drop policy if exists "subscribers public insert" on public.subscribers;
drop policy if exists "subscribers authenticated read" on public.subscribers;
drop policy if exists "subscribers authenticated update" on public.subscribers;
drop policy if exists "subscribers authenticated delete" on public.subscribers;
create policy "subscribers public insert" on public.subscribers
  for insert to anon, authenticated
  with check (true);
create policy "subscribers authenticated read" on public.subscribers
  for select to authenticated
  using (true);
create policy "subscribers authenticated update" on public.subscribers
  for update to authenticated
  using (true)
  with check (true);
create policy "subscribers authenticated delete" on public.subscribers
  for delete to authenticated
  using (true);

drop policy if exists "storage public read galaxy buckets" on storage.objects;
drop policy if exists "storage authenticated insert galaxy buckets" on storage.objects;
drop policy if exists "storage authenticated update galaxy buckets" on storage.objects;
drop policy if exists "storage authenticated delete galaxy buckets" on storage.objects;
create policy "storage public read galaxy buckets" on storage.objects
  for select to anon, authenticated
  using (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos', 'resources')
  );
create policy "storage authenticated insert galaxy buckets" on storage.objects
  for insert to authenticated
  with check (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos', 'resources')
  );
create policy "storage authenticated update galaxy buckets" on storage.objects
  for update to authenticated
  using (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos', 'resources')
  )
  with check (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos', 'resources')
  );
create policy "storage authenticated delete galaxy buckets" on storage.objects
  for delete to authenticated
  using (
    bucket_id in ('portfolio-images', 'gallery-media', 'avatars', 'logos', 'resources')
  );
