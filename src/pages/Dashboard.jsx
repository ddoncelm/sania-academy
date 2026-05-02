import { useState } from 'react'
import { MODULES, isModuleUnlocked, getModuleProgress, getTotalLessons, getTotalHours } from '../lib/courseData'
import ModuleCard from '../components/ModuleCard'
import ModuleDetail from '../components/ModuleDetail'

export default function Dashboard({ user, completedLessons, onOpenLesson, onLogout }) {
  const [selectedModule, setSelectedModule] = useState(null)

  const totalLessons = getTotalLessons()
  const totalHours = getTotalHours()
  const totalCompleted = completedLessons.length
  const globalPercent = Math.round((totalCompleted / totalLessons) * 100)

  const userName = user.email?.split('@')[0] || 'Alumno'

  if (selectedModule) {
    return (
      <ModuleDetail
        module={selectedModule}
        completedLessons={completedLessons}
        isUnlocked={isModuleUnlocked(selectedModule.id, completedLessons)}
        onOpenLesson={onOpenLesson}
        onBack={() => setSelectedModule(null)}
      />
    )
  }

  return (
    <div className="dash-wrap">
      {/* Header */}
      <header className="dash-header">
        <div className="dash-logo">
          <span className="logo-icon">⚕</span>
          <div>
            <div className="logo-name">SanIA<span>Academy</span></div>
            <div className="logo-sub">DoncelProject</div>
          </div>
        </div>
        <div className="dash-user">
          <div className="user-info">
            <div className="user-name">{userName}</div>
            <div className="user-email">{user.email}</div>
          </div>
          <button className="logout-btn" onClick={onLogout} title="Cerrar sesión">
            ↗
          </button>
        </div>
      </header>

      {/* Hero — progreso global */}
      <div className="dash-hero">
        <div className="hero-left">
          <div className="hero-greeting">Bienvenido de nuevo</div>
          <div className="hero-title">Tu progreso en el curso</div>
          <div className="hero-stats">
            <div className="hstat">
              <div className="hstat-val">{totalCompleted}</div>
              <div className="hstat-label">lecciones completadas</div>
            </div>
            <div className="hstat-sep" />
            <div className="hstat">
              <div className="hstat-val">{totalLessons - totalCompleted}</div>
              <div className="hstat-label">pendientes</div>
            </div>
            <div className="hstat-sep" />
            <div className="hstat">
              <div className="hstat-val">{totalHours}h</div>
              <div className="hstat-label">de formación</div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="progress-ring-wrap">
            <svg viewBox="0 0 100 100" className="progress-ring">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#1e2335" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#2196F3" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - globalPercent / 100)}`}
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div className="ring-label">
              <div className="ring-pct">{globalPercent}%</div>
              <div className="ring-sub">completado</div>
            </div>
          </div>
        </div>
      </div>

      {/* Módulos */}
      <div className="dash-section-title">Módulos del curso</div>
      <div className="modules-grid">
        {MODULES.map(mod => (
          <ModuleCard
            key={mod.id}
            module={mod}
            progress={getModuleProgress(mod.id, completedLessons)}
            isUnlocked={isModuleUnlocked(mod.id, completedLessons)}
            onClick={() => setSelectedModule(mod)}
          />
        ))}
      </div>

      <footer className="dash-footer">
        Desarrollado por <a href="mailto:doncel.project@gmail.com">DoncelProject</a> · doncel.project@gmail.com
      </footer>

      <style>{`
        .dash-wrap {
          min-height: 100vh;
          background: #0C0D12;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px 40px;
        }
        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px solid #1e2335;
          margin-bottom: 32px;
        }
        .dash-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .logo-icon { font-size: 24px; }
        .logo-name {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
        }
        .logo-name span { color: #2196F3; }
        .logo-sub { font-size: 10px; color: #546E7A; letter-spacing: 0.5px; }
        .dash-user { display: flex; align-items: center; gap: 12px; }
        .user-info { text-align: right; }
        .user-name { font-size: 13px; font-weight: 500; color: #fff; }
        .user-email { font-size: 11px; color: #546E7A; }
        .logout-btn {
          background: #1e2335;
          border: 1px solid #2a2d3a;
          border-radius: 8px;
          color: #B0BEC5;
          width: 32px; height: 32px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }
        .logout-btn:hover { background: #2a2d3a; color: #fff; }

        .dash-hero {
          background: #13151e;
          border: 1px solid #1e2335;
          border-radius: 16px;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 36px;
          gap: 20px;
        }
        .hero-greeting { font-size: 12px; color: #546E7A; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .hero-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 600; margin-bottom: 20px; }
        .hero-stats { display: flex; align-items: center; gap: 20px; }
        .hstat-val { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 700; color: #2196F3; }
        .hstat-label { font-size: 11px; color: #546E7A; margin-top: 2px; }
        .hstat-sep { width: 1px; height: 36px; background: #1e2335; }

        .progress-ring-wrap { position: relative; width: 100px; height: 100px; flex-shrink: 0; }
        .progress-ring { width: 100%; height: 100%; }
        .ring-label {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }
        .ring-pct { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: #fff; }
        .ring-sub { font-size: 9px; color: #546E7A; }

        .dash-section-title {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #B0BEC5;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }
        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 14px;
        }
        .dash-footer {
          text-align: center;
          font-size: 11px;
          color: #37474F;
          margin-top: 48px;
          padding-top: 20px;
          border-top: 1px solid #1e2335;
        }
        .dash-footer a { color: #546E7A; text-decoration: none; }
        .dash-footer a:hover { color: #2196F3; }
        @media (max-width: 600px) {
          .dash-hero { flex-direction: column; }
          .hero-stats { flex-wrap: wrap; gap: 12px; }
          .modules-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
