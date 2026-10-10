-- Extra download links for a purchase the buyer already paid for.
--
-- The original token hash on playbook_purchases stays put, so the link in
-- the first email keeps working. A recovery request mints a new token, stores
-- only its hash here, and emails that new link. Revocation still lives on
-- the purchase row.

create table if not exists public.playbook_access_tokens (
  id uuid primary key default gen_random_uuid(),
  purchase_id uuid not null references public.playbook_purchases (id) on delete cascade,
  token_hash text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists playbook_access_tokens_hash_key
  on public.playbook_access_tokens (token_hash);

create index if not exists playbook_access_tokens_purchase_idx
  on public.playbook_access_tokens (purchase_id);

alter table public.playbook_access_tokens enable row level security;
