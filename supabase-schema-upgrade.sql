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
  add column if not exists avatar_storage_path text,
  add column if not exists home_branch_label text,
  add column if not exists home_branch_title text,
  add column if not exists home_branch_intro text,
  add column if not exists about_branch_label text,
  add column if not exists about_branch_title text,
  add column if not exists about_branch_intro text,
  add column if not exists parent_badge text,
  add column if not exists parent_name text,
  add column if not exists parent_short text,
  add column if not exists parent_focus text,
  add column if not exists parent_description text,
  add column if not exists design_badge text,
  add column if not exists design_name text,
  add column if not exists design_short text,
  add column if not exists design_focus text,
  add column if not exists design_description text,
  add column if not exists design_logo_url text,
  add column if not exists design_logo_storage_path text,
  add column if not exists tech_badge text,
  add column if not exists tech_name text,
  add column if not exists tech_short text,
  add column if not exists tech_focus text,
  add column if not exists tech_description text,
  add column if not exists tech_logo_url text,
  add column if not exists tech_logo_storage_path text;

alter table if exists public.messages
  add column if not exists phone text,
  add column if not exists preferred_contact text default 'whatsapp';

alter table if exists public.notifications
  add column if not exists audience text default 'both',
  add column if not exists source text default 'system',
  add column if not exists created_at timestamptz default timezone('utc', now());

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
  avatar_storage_path = coalesce(avatar_storage_path, ''),
  home_branch_label = coalesce(home_branch_label, 'Studio Branches'),
  home_branch_title = coalesce(home_branch_title, 'One parent studio. Two focused branches.'),
  home_branch_intro = coalesce(home_branch_intro, 'Galaxy Studio leads the vision, then each branch takes a clear path so clients immediately know where design work lives and where technical delivery lives.'),
  about_branch_label = coalesce(about_branch_label, 'Branch Structure'),
  about_branch_title = coalesce(about_branch_title, 'The Galaxy Studio Tree'),
  about_branch_intro = coalesce(about_branch_intro, 'Galaxy Studio is the parent brand. Under it, we are building focused branches so clients can clearly see where creative design work lives and where development and technical delivery live.'),
  parent_badge = coalesce(parent_badge, 'Parent Studio'),
  parent_name = coalesce(parent_name, 'Galaxy Studio'),
  parent_short = coalesce(parent_short, 'G'),
  parent_focus = coalesce(parent_focus, 'Main brand umbrella'),
  parent_description = coalesce(parent_description, 'The central identity connecting our creative, design, development, and future specialist branches.'),
  design_badge = coalesce(design_badge, 'Branch 01'),
  design_name = coalesce(design_name, 'Galaxy Design Studio'),
  design_short = coalesce(design_short, 'D'),
  design_focus = coalesce(design_focus, 'Design and visual communication'),
  design_description = coalesce(design_description, 'Graphic design, branding, logo systems, ads, video editing, motion work, 3D visuals, and creative campaign assets.'),
  design_logo_url = coalesce(design_logo_url, ''),
  design_logo_storage_path = coalesce(design_logo_storage_path, ''),
  tech_badge = coalesce(tech_badge, 'Branch 02'),
  tech_name = coalesce(tech_name, 'Galaxy Tech Studio'),
  tech_short = coalesce(tech_short, 'T'),
  tech_focus = coalesce(tech_focus, 'Development and technical solutions'),
  tech_description = coalesce(tech_description, 'Websites, digital product development, technical builds, and architectural work that need structured planning and execution.'),
  tech_logo_url = coalesce(tech_logo_url, ''),
  tech_logo_storage_path = coalesce(tech_logo_storage_path, '');

update public.messages
set
  phone = coalesce(phone, ''),
  preferred_contact = coalesce(nullif(preferred_contact, ''), 'whatsapp');

update public.notifications
set
  audience = coalesce(nullif(audience, ''), 'both'),
  source = coalesce(nullif(source, ''), 'system'),
  created_at = coalesce(created_at, timezone('utc', now()));

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
