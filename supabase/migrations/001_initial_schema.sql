-- EDC Career Quest — Schéma initial

create extension if not exists "uuid-ossp";

-- Table des groupes
create table if not exists groups (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  year smallint not null check (year in (1, 2, 3)),
  universe text not null check (universe in ('passeport-stage', 'expedition-professionnelle', 'mission-horizon')),
  track text check (track in ('bachelor2', 'pge2')),
  specialization text check (specialization in ('marketing', 'negociation', 'finance')),
  active_mission smallint not null default 1,
  locked boolean not null default false,
  created_at timestamptz not null default now()
);

-- Table des missions
create table if not exists missions (
  id uuid primary key default uuid_generate_v4(),
  universe text not null check (universe in ('passeport-stage', 'expedition-professionnelle', 'mission-horizon')),
  number smallint not null,
  title text not null,
  description text not null,
  unlocked_for text[] not null default '{}',
  unique (universe, number)
);

-- Table des contenus pédagogiques
create table if not exists contents (
  id uuid primary key default uuid_generate_v4(),
  mission_id uuid not null references missions(id) on delete cascade,
  type text not null check (type in ('conseil', 'réflexion', 'défi', 'inspiration', 'situation', 'question')),
  content text not null,
  feedback text,
  tags text[] not null default '{}'
);

-- Table des simulations (Univers 3)
create table if not exists simulations (
  id uuid primary key default uuid_generate_v4(),
  group_id uuid not null references groups(id) on delete cascade,
  mission_id uuid not null references missions(id) on delete cascade,
  scenario_json jsonb not null,
  started_at timestamptz not null default now(),
  status text not null default 'pending' check (status in ('pending', 'active', 'completed'))
);

-- Table des événements de simulation
create table if not exists simulation_events (
  id uuid primary key default uuid_generate_v4(),
  simulation_id uuid not null references simulations(id) on delete cascade,
  type text not null check (type in ('incident', 'urgence', 'opportunité', 'info')),
  content text not null,
  injected_at timestamptz not null default now()
);

-- Table des admins
create table if not exists admin_users (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  password_hash text not null,
  role text not null default 'teacher' check (role in ('admin', 'teacher'))
);

-- RLS : désactivé pour les tables de l'app (accès via service role côté admin)
alter table groups enable row level security;
alter table missions enable row level security;
alter table contents enable row level security;
alter table simulations enable row level security;
alter table simulation_events enable row level security;
alter table admin_users enable row level security;

-- Politique lecture publique pour groups et missions (accès étudiant via slug)
create policy "groups_public_read" on groups for select using (true);
create policy "missions_public_read" on missions for select using (true);
create policy "contents_public_read" on contents for select using (true);
create policy "simulations_public_read" on simulations for select using (true);
create policy "simulation_events_public_read" on simulation_events for select using (true);

-- Politique écriture : service role uniquement (via SUPABASE_SERVICE_ROLE_KEY)
create policy "simulations_insert" on simulations for insert with check (true);
create policy "simulation_events_insert" on simulation_events for insert with check (true);
