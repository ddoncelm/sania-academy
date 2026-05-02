import { certificateService } from '../services/academy'
import { getModuleProgress } from '../lib/courseData'
import { generateCertificate } from '../utils/certificate'
import { useState } from 'react'

export default function ModuleDetail({ module, completedLessons, isUnlocked, onOpenLesson, onBack }) {
  const { color, colorDim, icon, title, id, lessons, hours } = module
  const { completed, total, percent } = getModuleProgress(id, completedLessons)
  const [certLoading, setCertLoading] = useState(false)
  const [certDone, setCertDone] = useState(false)

  const isModuleComplete = percent === 100

  const handleCertificate = async () => {
    setCertLoading(true)
    try {
      const code = `SANIA-M${id}-${Date.now().toString(36).toUpperCase()}`
      generateCertificate({ moduleTitle: title, moduleId: id, verificationCode: code, color })
      setCertDone(true)
    } catch (e) {
      console.error(e)
    }
    setCertLoading(false)
  }

  const canOpenLesson = (index) => {
    if (!isUnlocked) return false
    if (index === 0) return true
    // Dentro del módulo todas abiertas (solo bloqueo entre módulos)
    return true
  }

  return (
    <div className="md-wrap">
      {/* Cabecera */}
      <div className="md-header">
        <button className="md-back" onClick={onBack}>← Volver</button>
        <div className="md-header-content">
          <div className="md-icon" style={{ background: colorDim, color }}>{icon}</div>
          <div>
            <div className="md-mod-num">Módulo {id} · {hours}h</div>
            <div className="md-title">{title}</div>
          </div>
        </div>

        {/* Progreso del módulo */}
        <div className="md-progress-bar">
          <div className="md-progress-fill" style={{ width: `${percent}%`, background: color }} />
        </div>
        <div className="md-progress-label">
          <span style={{ color }}>{completed} completadas</span>
          <span style={{ color: '#546E7A' }}>{total - completed} restantes</span>
        </div>

        {/* Botón certificado */}
        {isModuleComplete && (
          <button className="cert-btn" onClick={handleCertificate} disabled={certLoading}
            style={{ borderColor: color, color: certDone ? '#A5D6A7' : color }}>
            {certLoading ? '⏳ Generando...' : certDone ? '✓ Certificado descargado' : `🎓 Descargar certificado Módulo ${id}`}
          </button>
        )}

        {!isUnlocked && (
          <div className="md-locked-notice">
            🔒 Completa el módulo anterior para acceder a este contenido
          </div>
        )}
      </div>

      {/* Lista de lecciones */}
      <div className="lessons-list">
        {lessons.map((lesson, index) => {
          const isDone = completedLessons.includes(lesson.id)
          const canOpen = canOpenLesson(index)

          return (
            <div key={lesson.id}
              className={`lesson-row ${isDone ? 'done' : ''} ${!canOpen ? 'disabled' : ''}`}
              onClick={() => canOpen && onOpenLesson(lesson.id, lesson.file, color)}
              style={{ '--lc': color }}>

              <div className="lesson-status">
                {isDone
                  ? <span className="ls-done" style={{ color }}>✓</span>
                  : <span className="ls-num" style={{ borderColor: canOpen ? color : '#1e2335', color: canOpen ? color : '#37474F' }}>
                      {index + 1}
                    </span>
                }
              </div>

              <div className="lesson-info">
                <div className="lesson-title" style={{ color: canOpen ? '#fff' : '#37474F' }}>
                  {lesson.title}
                </div>
                <div className="lesson-meta">
                  <span>⏱ {lesson.duration} min</span>
                  {isDone && <span className="l-tag-done" style={{ color, background: colorDim }}>Completada</span>}
                </div>
              </div>

              {canOpen && !isDone && (
                <div className="lesson-arrow" style={{ color }}>→</div>
              )}
            </div>
          )
        })}
      </div>

      <style>{`
        .md-wrap {
          min-height: 100vh;
          background: #0C0D12;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px 40px;
        }
        .md-back {
          background: transparent;
          border: none;
          color: #546E7A;
          font-size: 13px;
          cursor: pointer;
          padding: 20px 0 16px;
          display: block;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.2s;
        }
        .md-back:hover { color: #fff; }
        .md-header {
          background: #13151e;
          border: 1px solid #1e2335;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 20px;
        }
        .md-header-content { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .md-icon {
          width: 48px; height: 48px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; flex-shrink: 0;
        }
        .md-mod-num { font-size: 11px; color: #546E7A; text-transform: uppercase; letter-spacing: 0.7px; margin-bottom: 4px; }
        .md-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 600; line-height: 1.3; }
        .md-progress-bar {
          height: 6px; background: #1e2335; border-radius: 6px;
          overflow: hidden; margin-bottom: 8px;
        }
        .md-progress-fill { height: 100%; border-radius: 6px; transition: width 1s ease; }
        .md-progress-label { display: flex; justify-content: space-between; font-size: 11px; }
        .cert-btn {
          width: 100%;
          margin-top: 16px;
          padding: 11px;
          background: transparent;
          border: 1.5px solid;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          transition: all 0.2s;
          letter-spacing: 0.3px;
        }
        .cert-btn:hover:not(:disabled) { opacity: 0.8; }
        .cert-btn:disabled { cursor: not-allowed; opacity: 0.6; }
        .md-locked-notice {
          margin-top: 16px;
          background: rgba(239,83,80,0.07);
          border: 1px solid rgba(239,83,80,0.2);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 12px;
          color: #EF9A9A;
          text-align: center;
        }
        .lessons-list { display: flex; flex-direction: column; gap: 8px; }
        .lesson-row {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #13151e;
          border: 1px solid #1e2335;
          border-radius: 12px;
          padding: 14px 16px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .lesson-row:hover:not(.disabled) {
          border-color: var(--lc);
          background: #16192a;
        }
        .lesson-row.done { border-color: rgba(var(--lc), 0.2); }
        .lesson-row.disabled { cursor: not-allowed; }
        .lesson-status { flex-shrink: 0; }
        .ls-done { font-size: 18px; font-weight: 700; }
        .ls-num {
          width: 26px; height: 26px;
          border: 1.5px solid;
          border-radius: 50%;
          font-size: 11px;
          font-weight: 600;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
        }
        .lesson-info { flex: 1; }
        .lesson-title { font-size: 13px; font-weight: 500; margin-bottom: 4px; line-height: 1.4; }
        .lesson-meta { display: flex; align-items: center; gap: 10px; font-size: 11px; color: #546E7A; }
        .l-tag-done {
          font-size: 10px; font-weight: 500;
          padding: 2px 8px; border-radius: 8px;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .lesson-arrow { font-size: 16px; flex-shrink: 0; }
      `}</style>
    </div>
  )
}
