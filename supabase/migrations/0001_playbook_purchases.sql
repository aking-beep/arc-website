-- ===========================================================================
-- ARC AI Product Playbook — purchases and entitlements.
--
-- Run once against the Supabase project, then create the private bucket named
-- in PLAYBOOK_STORAGE_BUCKET and upload each playbook's PDF and ZIP to the
-- paths in PLAYBOOK_DEFINE_*, PLAYBOOK_BUILD_*, and PLAYBOOK_SHIP_*.
--
-- Deliberately one table. V1 has no accounts, so there is nothing to join to:
-- a purchase is the entitlement.
-- ===========================================================================

create extension if not exists pgcrypto;

create table if not exists public.playbook_purchases (
  id uuid primary key default gen_random_uuid(),

  -- Paddle identity. The transaction id is the idempotency key: Paddle retries
  -- webhooks, and a unique index is the only race-free way to make a retry a
  -- no-op. The event id is kept for support, not for deduplication — the same
  -- transaction can arrive under more than one event.
  paddle_event_id       text not null,
  paddle_transaction_id text not null,

  email         text,
  price_id      text,
  currency      text,
  -- Minor units as a string, exactly as Paddle reports them. Never parsed into
  -- a float, never recomputed.
  amount_minor  text,

  -- SHA-256 of the entitlement token, hex. The token itself is emailed to the
  -- buyer and never stored anywhere. A leak of this table grants nothing.
  token_hash    text not null,

  download_count       integer not null default 0,
  -- Null means no limit. The default is generous on purpose: there are no
  -- accounts in V1, so one buyer legitimately uses the link on a laptop, a
  -- phone, and again months later. The limit stops a link being posted
  -- publicly; it does not ration normal use.
  download_limit       integer default 25,
  first_downloaded_at  timestamptz,
  last_downloaded_at   timestamptz,

  -- Support levers. Revocation is for a link that got shared; expiry is unused
  -- by default because "free updates to this edition" is easier to honour when
  -- the link keeps working.
  revoked_at   timestamptz,
  expires_at   timestamptz,

  purchased_at timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

create unique index if not exists playbook_purchases_transaction_key
  on public.playbook_purchases (paddle_transaction_id);

create unique index if not exists playbook_purchases_token_hash_key
  on public.playbook_purchases (token_hash);

create index if not exists playbook_purchases_email_idx
  on public.playbook_purchases (lower(email));

-- Nothing in the browser ever talks to this table; the application uses the
-- service-role key from the server after checking the entitlement itself.
-- RLS on with no policies means an anon or authenticated key sees nothing,
-- which is the intended posture.
alter table public.playbook_purchases enable row level security;

-- ---------------------------------------------------------------------------
-- Download counting.
--
-- A function rather than a read-modify-write in application code: two parallel
-- downloads would otherwise both read the same count and both store count + 1,
-- and the limit would be unenforceable.
-- ---------------------------------------------------------------------------
create or replace function public.playbook_record_download(p_token_hash text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  update public.playbook_purchases
     set download_count      = download_count + 1,
         first_downloaded_at = coalesce(first_downloaded_at, now()),
         last_downloaded_at  = now()
   where token_hash = p_token_hash
     and revoked_at is null
   returning download_count into v_count;

  return coalesce(v_count, 0);
end;
$$;

revoke all on function public.playbook_record_download(text) from public, anon, authenticated;
