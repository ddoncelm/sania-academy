export default function ModuleCard({ module, completed, onSelectLesson }) {
  const total    = module.lessons.length
  const done     = module.lessons.filter(l => completed.has(l.id)).length
  const pct      = Math.round((done / total) * 100)

  return (
    <div style={{
      background: '#13141c', border: '1px solid #1e2335',
      borderRadius: '14px', overflow: 'hidden',
      fontFamily: "'Sora', sans-serif"
    }}>
      {/* Cabecera del módulo */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderLeft: `4px solid ${module.color}`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
              <span style={{
                background: `${module.color}22`, color: module.color,
                fontSize: '0.7rem', fontWeight: 600, padding: '2px 8px',
                borderRadius: '4px', letterSpacing: '0.5px'
              }}>
                MÓDULO {module.id}
              </span>
              <span style={{ color: '#4a5568', fontSize: '0.75rem' }}>{module.duration}</span>
            </div>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.4 }}>
              {module.title}
            </h3>
            <p style={{ color: '#B0BEC5', margin: '0.4rem 0 0', fontSize: '0.8rem', lineHeight: 1.5 }}>
              {module.description}
            </p>
          </div>
          {/* Progreso circular */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ position: 'relative', width: 52, height: 52 }}>
              <svg width="52" height="52" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="26" cy="26" r="21" fill="none" stroke="#1e2335" strokeWidth="4" />
                <circle cx="26" cy="26" r="21" fill="none" stroke={module.color} strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 21}`}
                  strokeDashoffset={`${2 * Math.PI * 21 * (1 - pct / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
              </svg>
              <span style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '0.7rem', fontWeight: 700
              }}>{pct}%</span>
            </div>
            <span style={{ color: '#4a5568', fontSize: '0.7rem' }}>{done}/{total}</span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div style={{ marginTop: '1rem', height: '4px', background: '#0C0D12', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            width: `${pct}%`, height: '100%',
            background: module.color, borderRadius: '2px',
            transition: 'width 0.5s ease'
          }} />
        </div>
      </div>

      {/* Lista de lecciones */}
      <div style={{ padding: '0.5rem 0' }}>
        {module.lessons.map((lesson, idx) => {
          const isDone = completed.has(lesson.id)
          return (
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson, module)}
              style={{
                width: '100%', padding: '0.65rem 1.5rem',
                background: 'transparent', border: 'none',
                display: 'flex', alignItems: 'center', gap: '12px',
                cursor: 'pointer', textAlign: 'left',
                borderBottom: idx < module.lessons.length - 1 ? '1px solid #0C0D12' : 'none',
                transition: 'background 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#0C0D12'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Indicador completado */}
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: isDone ? `${module.color}33` : '#0C0D12',
                border: `2px solid ${isDone ? module.color : '#1e2335'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', color: module.color,
                transition: 'all 0.3s'
              }}>
                {isDone ? '✓' : ''}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  color: isDone ? '#B0BEC5' : '#fff',
                  fontSize: '0.82rem', fontWeight: isDone ? 400 : 500,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                }}>
                  <span style={{ color: '#4a5568', marginRight: '6px', fontSize: '0.75rem' }}>
                    {lesson.id.replace('_', '.')}
                  </span>
                  {lesson.title}
                </div>
              </div>

              <span style={{ color: '#4a5568', fontSize: '0.75rem', flexShrink: 0 }}>
                {lesson.duration} min
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
