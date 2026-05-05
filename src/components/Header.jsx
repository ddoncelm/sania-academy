import { TOTAL_LESSONS } from '../services/lessons.js'
import LOGO_B64 from '../lib/logo.js'

export default function Header({ user, completed, onSignOut }) {
  const pct = Math.round((completed.size / TOTAL_LESSONS) * 100)

  return (
    <header style={{
      background: '#13141c', borderBottom: '1px solid #1e2335',
      padding: '0 1.5rem', height: '60px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
      fontFamily: "'Sora', sans-serif"
    }}>
      {/* Logo DoncelProject */}
      <a href="mailto:doncel.project@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <img src={LOGO_B64} alt="DoncelProject" style={{ height: 32 }} />
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
          SaludIA<span style={{ color: '#00B8D4' }}>.Academy</span>
        </span>
      </a>

      {/* Progreso global */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, maxWidth: '300px', margin: '0 2rem' }}>
        <div style={{ flex: 1, height: '6px', background: '#1e2335', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{
            width: `${pct}%`, height: '100%',
            background: 'linear-gradient(90deg, #2196F3, #00B8D4)',
            borderRadius: '3px', transition: 'width 0.5s ease'
          }} />
        </div>
        <span style={{ color: '#B0BEC5', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
          {completed.size}/{TOTAL_LESSONS} ({pct}%)
        </span>
      </div>

      {/* Usuario */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: '#B0BEC5', fontSize: '0.8rem' }}>
          {user?.email?.split('@')[0]}
        </span>
        <button onClick={onSignOut} style={{
          padding: '0.35rem 0.8rem', background: 'transparent',
          border: '1px solid #1e2335', borderRadius: '6px',
          color: '#B0BEC5', fontFamily: 'inherit', fontSize: '0.8rem',
          cursor: 'pointer'
        }}>
          Salir
        </button>
      </div>
    </header>
  )
}
