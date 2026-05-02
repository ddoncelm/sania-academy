-- ================================================================
-- SanIA DoncelProject Academy — Setup Supabase
-- Ejecutar en: Supabase → SQL Editor → New query
-- ================================================================

-- 1. PROGRESO DE LECCIONES
CREATE TABLE IF NOT EXISTS academy_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE academy_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios_ven_su_progreso" ON academy_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "usuarios_guardan_su_progreso" ON academy_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "usuarios_actualizan_su_progreso" ON academy_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- 2. CERTIFICADOS
CREATE TABLE IF NOT EXISTS academy_certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  module_id INTEGER NOT NULL,
  module_title TEXT NOT NULL,
  verification_code TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

ALTER TABLE academy_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios_ven_sus_certificados" ON academy_certificates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "usuarios_crean_sus_certificados" ON academy_certificates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Verificación pública de certificados (sin auth)
CREATE POLICY "verificacion_publica" ON academy_certificates
  FOR SELECT USING (true);

-- 3. PERFILES
CREATE TABLE IF NOT EXISTS academy_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  specialty TEXT,
  institution TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE academy_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios_ven_su_perfil" ON academy_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "usuarios_editan_su_perfil" ON academy_profiles
  FOR ALL USING (auth.uid() = user_id);

-- 4. INVITACIONES
CREATE TABLE IF NOT EXISTS academy_invites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_by UUID REFERENCES auth.users(id),
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

ALTER TABLE academy_invites ENABLE ROW LEVEL SECURITY;

-- Solo lectura pública para validar código (sin exponer datos sensibles)
CREATE POLICY "validacion_invitacion" ON academy_invites
  FOR SELECT USING (true);

-- Solo service_role puede crear/actualizar invitaciones
-- (lo haces desde el dashboard de Supabase directamente)

-- ================================================================
-- INSERTAR CÓDIGOS DE INVITACIÓN DE PRUEBA
-- Cambia los códigos o añade los tuyos
-- ================================================================

INSERT INTO academy_invites (code, notes) VALUES
  ('SANIA-2024-A1', 'Acceso alumno 1'),
  ('SANIA-2024-A2', 'Acceso alumno 2'),
  ('SANIA-2024-A3', 'Acceso alumno 3'),
  ('SANIA-TEST-01', 'Código de prueba personal'),
  ('DONCEL-DEMO-01', 'Demo interna')
ON CONFLICT (code) DO NOTHING;

-- ================================================================
-- VERIFICAR QUE TODO SE CREÓ BIEN
-- ================================================================
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name LIKE 'academy_%'
ORDER BY table_name;
