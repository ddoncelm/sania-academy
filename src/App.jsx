import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import LessonShell from './pages/LessonShell'
import { progressService } from './services/academy'

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [completedLessons, setCompletedLessons] = useState([])
  const [currentLesson, setCurrentLesson] = useState(null) // { lessonId, file, moduleColor }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user) loadProgress()
  }, [user])

  const loadProgress = async () => {
    try {
      const ids = await progressService.getAll(user.id)
      setCompletedLessons(ids)
    } catch (e) {
      console.error('Error cargando progreso:', e)
    }
  }

  const handleLessonComplete = async (lessonId) => {
    if (!user || completedLessons.includes(lessonId)) return
    try {
      await progressService.markComplete(user.id, lessonId)
      setCompletedLessons(prev => [...prev, lessonId])
    } catch (e) {
      console.error('Error guardando progreso:', e)
    }
  }

  const openLesson = (lessonId, file, moduleColor) => {
    setCurrentLesson({ lessonId, file, moduleColor })
  }

  const closeLesson = () => setCurrentLesson(null)

  if (loading) return <Loader />

  if (!user) return <AuthPage onAuth={setUser} />

  if (currentLesson) return (
    <LessonShell
      lessonId={currentLesson.lessonId}
      file={currentLesson.file}
      moduleColor={currentLesson.moduleColor}
      isCompleted={completedLessons.includes(currentLesson.lessonId)}
      onComplete={() => handleLessonComplete(currentLesson.lessonId)}
      onClose={closeLesson}
    />
  )

  return (
    <Dashboard
      user={user}
      completedLessons={completedLessons}
      onOpenLesson={openLesson}
      onLogout={() => supabase.auth.signOut()}
    />
  )
}

function Loader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: '#0C0D12', flexDirection: 'column', gap: 16
    }}>
      <div style={{
        width: 40, height: 40, border: '3px solid #1e2335',
        borderTop: '3px solid #2196F3', borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
