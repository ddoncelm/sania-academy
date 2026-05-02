import { supabase } from '../lib/supabase'

// ── PROGRESO ──────────────────────────────────────────────
export const progressService = {
  async getAll(userId) {
    const { data, error } = await supabase
      .from('academy_progress')
      .select('lesson_id')
      .eq('user_id', userId)
    if (error) throw error
    return data.map(r => r.lesson_id)
  },

  async markComplete(userId, lessonId) {
    const { error } = await supabase
      .from('academy_progress')
      .upsert({ user_id: userId, lesson_id: lessonId, completed_at: new Date().toISOString() })
    if (error) throw error
  }
}

// ── CERTIFICADOS ─────────────────────────────────────────
export const certificateService = {
  async getAll(userId) {
    const { data, error } = await supabase
      .from('academy_certificates')
      .select('*')
      .eq('user_id', userId)
    if (error) throw error
    return data
  },

  async create(userId, moduleId, moduleTitle, verificationCode) {
    const { data, error } = await supabase
      .from('academy_certificates')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        module_title: moduleTitle,
        verification_code: verificationCode,
        issued_at: new Date().toISOString()
      })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async verify(code) {
    const { data, error } = await supabase
      .from('academy_certificates')
      .select('*, profiles(full_name)')
      .eq('verification_code', code)
      .single()
    if (error) return null
    return data
  }
}

// ── INVITACIONES — nominal + expiración 48h ───────────────
export const inviteService = {
  /**
   * Valida un código de invitación comprobando:
   * 1. Que el código existe
   * 2. Que el email coincide (insensible a mayúsculas)
   * 3. Que no ha expirado (48h desde creación)
   * 4. Que no ha sido usado ya
   */
  async validate(code, email) {
    const normalizedEmail = email.toLowerCase().trim()
    const normalizedCode = code.toUpperCase().trim()

    const { data, error } = await supabase
      .from('academy_invites')
      .select('*')
      .eq('code', normalizedCode)
      .single()

    // Código no existe
    if (error || !data) {
      return { valid: false, error: 'Código de invitación no válido.', invite: null }
    }

    // Ya usado
    if (data.used) {
      return { valid: false, error: 'Este código ya ha sido utilizado.', invite: null }
    }

    // Email no coincide
    if (data.email_asignado.toLowerCase().trim() !== normalizedEmail) {
      return {
        valid: false,
        error: 'El email no coincide con la invitación. Usa el email al que te enviaron el código.',
        invite: null
      }
    }

    // Expirado
    if (new Date(data.expires_at) < new Date()) {
      return {
        valid: false,
        error: 'El código ha expirado (validez 48 horas). Contacta con el administrador para obtener uno nuevo.',
        invite: null
      }
    }

    return { valid: true, error: null, invite: data }
  },

  async markUsed(code, userId) {
    await supabase
      .from('academy_invites')
      .update({
        used: true,
        used_by: userId,
        used_at: new Date().toISOString()
      })
      .eq('code', code.toUpperCase().trim())
  }
}

// ── PERFIL ────────────────────────────────────────────────
export const profileService = {
  async get(userId) {
    const { data } = await supabase
      .from('academy_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    return data
  },

  async upsert(userId, fields) {
    await supabase
      .from('academy_profiles')
      .upsert({ user_id: userId, ...fields })
  }
}
