-- Run this in the Supabase SQL Editor for the project:
-- https://jpkuzhlcjxqoitalpgnr.supabase.co
--
-- This upgrades older Galaxy tables to match the current app code so
-- gallery items, AdAvatar items, QR settings, and profile media can
-- persist across browsers and devices.

alter table if exists public.gallery
  add column if not exists thumb_url text,
  add column if not exists storage_path text,
  add column if not exists thumb_storage_path text,
  add column if not exists created_at timestamptz default timezone('utc', now()),
  add column if not exists title_source text default 'manual';

alter table if exists public.adavatar
  add column if not exists thumb_url text,
  add column if not exists storage_path text,
  add column if not exists thumb_storage_path text,
  add column if not exists created_at timestamptz default timezone('utc', now()),
  add column if not exists title_source text default 'manual';

alter table if exists public.settings
  add column if not exists qr_url text,
  add column if not exists logo_storage_path text,
  add column if not exists partners_json jsonb default '[]'::jsonb;

alter table if exists public.about
  add column if not exists avatar_storage_path text;

alter table if exists public.messages
  add column if not exists phone text,
  add column if not exists preferred_contact text default 'whatsapp';

-- Backfill newer fields from older data when possible.
update public.gallery
set
  thumb_url = coalesce(nullif(thumb_url, ''), url),
  created_at = coalesce(created_at, timezone('utc', now())),
  title_source = coalesce(nullif(title_source, ''), 'manual');

update public.adavatar
set
  created_at = coalesce(created_at, timezone('utc', now())),
  title_source = coalesce(nullif(title_source, ''), 'manual');

update public.settings
set
  qr_url = coalesce(qr_url, ''),
  partners_json = coalesce(partners_json, '[]'::jsonb);

update public.about
set
  avatar_storage_path = coalesce(avatar_storage_path, '');

update public.messages
set
  phone = coalesce(phone, ''),
  preferred_contact = coalesce(nullif(preferred_contact, ''), 'whatsapp');

-- Ensure the single-row object tables still have a row the app can update.
insert into public.settings (id)
select 1
where not exists (
  select 1 from public.settings where id = 1
);

insert into public.about (id)
select 1
where not exists (
  select 1 from public.about where id = 1
);
