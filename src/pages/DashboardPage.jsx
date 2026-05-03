import { useState } from 'react'
import { MODULES, TOTAL_LESSONS } from '../services/lessons.js'
import ModuleCard from '../components/ModuleCard.jsx'
import LessonViewer from '../components/LessonViewer.jsx'
import Header from '../components/Header.jsx'
import { useProgress } from '../hooks/useProgress.js'
import { useAuth } from '../hooks/useAuth.js'

export default function DashboardPage() {
  const { user, signOut }           = useAuth()
  const { completed, complete }     = useProgress(user?.id)
  const [activeLesson, setActive]   = useState(null) // { lesson, module }

  const totalDone = completed.size
  const pct       = Math.round((totalDone / TOTAL_LESSONS) * 100)

  if (activeLesson) {
    return (
      <div style={{ background: '#0C0D12', minHeight: '100vh' }}>
        <Header user={user} completed={completed} onSignOut={signOut} />
        <LessonViewer
          lesson={activeLesson.lesson}
          module={activeLesson.module}
          onComplete={complete}
          onBack={() => setActive(null)}
        />
      </div>
    )
  }

  return (
    <div style={{ background: '#0C0D12', minHeight: '100vh', fontFamily: "'Sora', sans-serif" }}>
      <Header user={user} completed={completed} onSignOut={signOut} />

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Bienvenida */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ color: '#fff', margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: 700 }}>
            Bienvenido, <span style={{ color: '#00B8D4' }}>{user?.email?.split('@')[0]}</span>
          </h1>
          <p style={{ color: '#B0BEC5', margin: 0, fontSize: '0.9rem' }}>
            {totalDone === 0
              ? 'Empieza por cualquier lección que te interese. No hay orden obligatorio.'
              : `Llevas ${totalDone} de ${TOTAL_LESSONS} lecciones completadas. Sigue así.`
            }
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem', marginBottom: '2.5rem'
        }}>
          {[
            { label: 'Lecciones completadas', value: totalDone, color: '#2196F3' },
            { label: 'Progreso total',         value: `${pct}%`,  color: '#00B8D4' },
            { label: 'Módulos disponibles',    value: MODULES.length, color: '#4CAF50' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: '#13141c', border: '1px solid #1e2335',
              borderRadius: '12px', padding: '1.25rem',
              borderTop: `3px solid ${stat.color}`
            }}>
              <div style={{ color: stat.color, fontSize: '1.8rem', fontWeight: 700 }}>
                {stat.value}
              </div>
              <div style={{ color: '#B0BEC5', fontSize: '0.78rem', marginTop: '0.2rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Módulos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {MODULES.map(mod => (
            <ModuleCard
              key={mod.id}
              module={mod}
              completed={completed}
              onSelectLesson={(lesson, module) => setActive({ lesson, module })}
            />
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '3rem', paddingBottom: '2rem' }}>
          <a href="mailto:doncel.project@gmail.com" style={{ color: '#2196F3', textDecoration: 'none', fontSize: '0.8rem' }}>
            Desarrollado por DoncelProject · doncel.project@gmail.com
          </a>
        </div>
      </main>
    </div>
  )
}
