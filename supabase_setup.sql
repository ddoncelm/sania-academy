-- Ejecutar en Supabase → SQL Editor

-- Tabla de progreso
create table if not exists public.progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  lesson_id    text not null,
  completed_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

-- RLS: cada usuario solo ve y escribe su propio progreso
alter table public.progress enable row level security;

create policy "usuario lee su progreso"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "usuario escribe su progreso"
  on public.progress for insert
  with check (auth.uid() = user_id);

-- Índice para consultas rápidas por usuario
create index if not exists progress_user_idx on public.progress(user_id);
