import { useEffect, useRef, useState } from 'react'

export default function LessonShell({ lessonId, file, moduleColor, isCompleted, onComplete, onClose }) {
  const iframeRef = useRef(null)
  const [justCompleted, setJustCompleted] = useState(false)

  useEffect(() => {
    const handler = (event) => {
      if (event.data?.type === 'LESSON_COMPLETE') {
        if (!isCompleted) {
          onComplete()
          setJustCompleted(true)
        }
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [isCompleted, onComplete])

  const lessonUrl = `/lessons/${file}`

  return (
    <div className="shell-wrap">
      {/* Barra superior */}
      <div className="shell-bar" style={{ borderBottomColor: moduleColor }}>
        <button className="shell-back" onClick={onClose}>
          ← Volver al módulo
        </button>
        <div className="shell-status">
          {(isCompleted || justCompleted) && (
            <div className="shell-done" style={{ color: moduleColor }}>
              ✓ Lección completada
            </div>
          )}
        </div>
        <div className="shell-id" style={{ color: moduleColor }}>
          Lección {lessonId.replace('_', '.')}
        </div>
      </div>

      {/* iframe */}
      <iframe
        ref={iframeRef}
        src={lessonUrl}
        className="shell-iframe"
        title={`Lección ${lessonId}`}
        sandbox="allow-scripts allow-same-origin allow-forms"
      />

      <style>{`
        .shell-wrap {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #0C0D12;
        }
        .shell-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          background: #13151e;
          border-bottom: 2px solid;
          flex-shrink: 0;
          gap: 16px;
        }
        .shell-back {
          background: transparent;
          border: none;
          color: #B0BEC5;
          font-size: 12px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .shell-back:hover { color: #fff; }
        .shell-status { flex: 1; text-align: center; }
        .shell-done {
          font-size: 12px;
          font-weight: 500;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.3px;
        }
        .shell-id {
          font-size: 11px;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          white-space: nowrap;
        }
        .shell-iframe {
          flex: 1;
          border: none;
          width: 100%;
          background: #0C0D12;
        }
      `}</style>
    </div>
  )
}
