create table if not exists searches (
  id uuid primary key default gen_random_uuid(),
  city text not null,
  state text not null,
  niche text not null,
  radius_km numeric,
  limit_count integer,
  source text default 'google_places',
  created_at timestamptz default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  search_id uuid references searches(id),
  company_name text not null,
  city text not null,
  state text not null,
  niche text not null,
  category text,
  address text,
  phone text,
  website text,
  google_maps_url text,
  google_rating numeric,
  google_reviews integer,
  instagram text,
  facebook text,
  linkedin text,
  digital jsonb default '{}'::jsonb,
  score360 integer default 0,
  priority text,
  main_pain text,
  suggested_offer text,
  suggested_message text,
  qualification_reason text,
  status text default 'Novo',
  owner text,
  next_step text,
  next_step_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_leads_priority on leads(priority);
create index if not exists idx_leads_status on leads(status);
create index if not exists idx_leads_city_niche on leads(city, niche);
