import { supabase } from '../lib/supabase.js'

/**
 * Marca una lección como completada en Supabase.
 * Si ya existe, no hace nada (upsert con ignoreDuplicates).
 */
export async function markLessonComplete(userId, lessonId) {
  const { error } = await supabase
    .from('progress')
    .upsert(
      { user_id: userId, lesson_id: lessonId, completed_at: new Date().toISOString() },
      { onConflict: 'user_id,lesson_id', ignoreDuplicates: true }
    )
  if (error) console.error('Error guardando progreso:', error)
}

/**
 * Devuelve un Set con los lesson_id completados por el usuario.
 */
export async function getCompletedLessons(userId) {
  const { data, error } = await supabase
    .from('progress')
    .select('lesson_id')
    .eq('user_id', userId)

  if (error) {
    console.error('Error cargando progreso:', error)
    return new Set()
  }
  return new Set(data.map(r => r.lesson_id))
}
