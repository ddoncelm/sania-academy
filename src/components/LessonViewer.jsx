import { useEffect, useRef } from 'react'

export default function LessonViewer({ lesson, module, onComplete, onBack }) {
  const iframeRef = useRef(null)

  // Escucha el postMessage que emiten las lecciones al completarse
  useEffect(() => {
    function handleMessage(e) {
      if (e.data?.type === 'LESSON_COMPLETE') {
        onComplete(lesson.id)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [lesson.id, onComplete])

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)',
      fontFamily: "'Sora', sans-serif"
    }}>
      {/* Barra superior de la lección */}
      <div style={{
        background: '#13141c', borderBottom: '1px solid #1e2335',
        padding: '0.75rem 1.5rem',
        display: 'flex', alignItems: 'center', gap: '1rem'
      }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: '1px solid #1e2335',
          borderRadius: '6px', color: '#B0BEC5', padding: '0.35rem 0.75rem',
          fontFamily: 'inherit', fontSize: '0.8rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px'
        }}>
          ← Volver
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
          <span style={{
            background: `${module.color}22`, color: module.color,
            fontSize: '0.7rem', fontWeight: 600, padding: '2px 8px',
            borderRadius: '4px', flexShrink: 0
          }}>
            {lesson.id.replace('_', '.')}
          </span>
          <span style={{
            color: '#fff', fontSize: '0.85rem', fontWeight: 500,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
          }}>
            {lesson.title}
          </span>
        </div>

        <span style={{ color: '#4a5568', fontSize: '0.8rem', flexShrink: 0 }}>
          {lesson.duration} min
        </span>
      </div>

      {/* Iframe de la lección */}
      <iframe
        ref={iframeRef}
        src={`/lessons/${lesson.file}`}
        style={{
          flex: 1, width: '100%', border: 'none',
          background: '#0C0D12'
        }}
        title={lesson.title}
      />
    </div>
  )
}
