// ModuleCard — tarjeta de módulo en el dashboard

export default function ModuleCard({ module, progress, isUnlocked, onClick }) {
  const { color, colorDim, icon, title, hours, id } = module
  const { completed, total, percent } = progress

  return (
    <div className={`mcard ${!isUnlocked ? 'locked' : ''}`} onClick={onClick}
      style={{ '--mc': color, '--mcd': colorDim }}>

      <div className="mcard-top">
        <div className="mcard-icon" style={{ background: colorDim, color }}>{icon}</div>
        <div className="mcard-meta">
          <div className="mcard-num">Módulo {id}</div>
          <div className="mcard-hours">{hours}h · {total} lecciones</div>
        </div>
        {!isUnlocked && <div className="mcard-lock">🔒</div>}
        {isUnlocked && percent === 100 && <div className="mcard-done" style={{ color }}>✓</div>}
      </div>

      <div className="mcard-title">{title}</div>

      <div className="mcard-progress">
        <div className="mcard-bar">
          <div className="mcard-fill" style={{ width: `${percent}%`, background: color }} />
        </div>
        <div className="mcard-pct" style={{ color: percent > 0 ? color : '#37474F' }}>
          {completed}/{total}
        </div>
      </div>

      {!isUnlocked && (
        <div className="mcard-locked-msg">Completa el módulo anterior para desbloquear</div>
      )}

      <style>{`
        .mcard {
          background: #13151e;
          border: 1px solid #1e2335;
          border-radius: 14px;
          padding: 18px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .mcard::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--mc);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .mcard:hover:not(.locked)::before { opacity: 1; }
        .mcard:hover:not(.locked) {
          border-color: var(--mc);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .mcard.locked { opacity: 0.55; cursor: not-allowed; }
        .mcard-top { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .mcard-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .mcard-meta { flex: 1; }
        .mcard-num { font-size: 10px; color: #546E7A; text-transform: uppercase; letter-spacing: 0.7px; }
        .mcard-hours { font-size: 11px; color: #B0BEC5; margin-top: 1px; }
        .mcard-lock { font-size: 14px; }
        .mcard-done { font-size: 18px; font-weight: 700; }
        .mcard-title {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
          margin-bottom: 14px;
        }
        .mcard-progress { display: flex; align-items: center; gap: 10px; }
        .mcard-bar {
          flex: 1; height: 4px;
          background: #1e2335; border-radius: 4px; overflow: hidden;
        }
        .mcard-fill { height: 100%; border-radius: 4px; transition: width 0.8s ease; }
        .mcard-pct { font-size: 11px; font-family: 'Syne', sans-serif; font-weight: 600; min-width: 36px; text-align: right; }
        .mcard-locked-msg {
          font-size: 10px; color: #37474F;
          margin-top: 10px; text-align: center;
          font-style: italic;
        }
      `}</style>
    </div>
  )
}
