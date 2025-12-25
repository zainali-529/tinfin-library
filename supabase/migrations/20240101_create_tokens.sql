-- Create tokens table
create table public.tokens (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  token_hash text not null, -- We store the hash of the full token signature or the jti
  jti text not null, -- Unique identifier for the token
  last_used_at timestamp with time zone null,
  created_at timestamp with time zone not null default now(),
  expires_at timestamp with time zone not null,
  revoked boolean not null default false,
  constraint tokens_pkey primary key (id)
);

-- Add RLS policies
alter table public.tokens enable row level security;

create policy "Users can view their own tokens" on public.tokens
  for select using (auth.uid() = user_id);

create policy "Users can delete (revoke) their own tokens" on public.tokens
  for delete using (auth.uid() = user_id);

-- (Optional) Index for faster lookups
create index tokens_jti_idx on public.tokens (jti);
create index tokens_user_id_idx on public.tokens (user_id);
