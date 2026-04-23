Use one of these SQL files in the Supabase SQL Editor:

1. `supabase-policies-recommended.sql`
This is the secure option.
It gives public read access, lets anyone submit contact messages, and requires the `authenticated` role for admin writes.
Use this if you will add real Supabase Auth or move admin writes behind a trusted server.

2. `supabase-policies-browser-only.sql`
This matches the current app architecture more closely because the admin panel only uses a local browser password and an anon key.
It allows anon writes to content tables and storage so the current admin UI can persist changes.
This is not safe for production because anyone with the public app can hit those tables directly.

Important:

- Your current local admin password is not Supabase Auth.
- If you apply the recommended script without adding Supabase Auth, public reads and contact messages will work, but admin writes to Supabase will not.
- Public buckets still need to exist in Storage with these ids:
  `portfolio-images`, `gallery-media`, `avatars`, `logos`
