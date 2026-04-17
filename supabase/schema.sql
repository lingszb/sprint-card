-- sprites 表
create table public.sprites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rarity text not null check (rarity in ('N','R','SR','SSR','UR')),
  image_url text not null,
  description text,
  element text,
  created_at timestamptz not null default now()
);

-- gacha_pulls 表
create table public.gacha_pulls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  sprite_id uuid not null references public.sprites(id),
  rarity text not null,
  pulled_at timestamptz not null default now()
);

create index idx_gacha_pulls_user_id on public.gacha_pulls(user_id);
create index idx_sprites_rarity on public.sprites(rarity);

alter table public.sprites enable row level security;
alter table public.gacha_pulls enable row level security;

create policy "sprites_select_authenticated"
  on public.sprites for select to authenticated using (true);

create policy "pulls_select_own"
  on public.gacha_pulls for select to authenticated
  using (auth.uid() = user_id);
