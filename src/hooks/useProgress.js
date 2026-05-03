import { useState, useEffect, useCallback } from 'react'
import { getCompletedLessons, markLessonComplete } from '../services/progress.js'

export function useProgress(userId) {
  const [completed, setCompleted] = useState(new Set())
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    getCompletedLessons(userId).then(set => {
      setCompleted(set)
      setLoading(false)
    })
  }, [userId])

  const complete = useCallback(async (lessonId) => {
    if (!userId || completed.has(lessonId)) return
    await markLessonComplete(userId, lessonId)
    setCompleted(prev => new Set([...prev, lessonId]))
  }, [userId, completed])

  return { completed, loading, complete }
}
