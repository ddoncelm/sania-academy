import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { inviteService, profileService } from '../services/academy'

export default function AuthPage({ onAuth }) {
  const [mode, setMode] = useState('login') // login | register
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!email || !password) return setError('Introduce tu email y contraseña')
    setLoading(true); setError('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Email o contraseña incorrectos')
    else onAuth(data.user)
    setLoading(false)
  }

  const handleRegister = async () => {
    if (!name.trim()) return setError('Introduce tu nombre completo')
    if (!email.trim()) return setError('Introduce tu email')
    if (!password || password.length < 8) return setError('La contraseña debe tener al menos 8 caracteres')
    if (!inviteCode.trim()) return setError('Introduce el código de invitación')

    setLoading(true); setError('')

    // Validación nominal + expiración
    const { valid, error: inviteError } = await inviteService.validate(inviteCode, email)
    if (!valid) {
      setError(inviteError)
      setLoading(false); return
    }

    // Crear cuenta en Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({ email, password })
    if (authError) {
      setError(authError.message === 'User already registered'
        ? 'Ya existe una cuenta con ese email. Usa la pestaña Acceder.'
        : authError.message)
      setLoading(false); return
    }

    // Guardar perfil y marcar invitación como usada
    await profileService.upsert(data.user.id, { full_name: name.trim() })
    await inviteService.markUsed(inviteCode, data.user.id)

    onAuth(data.user)
    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') mode === 'login' ? handleLogin() : handleRegister()
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-brand">
          <div className="brand-icon">⚕</div>
          <div className="brand-name">SanIA<span>Academy</span></div>
          <div className="brand-sub">DoncelProject · Formación en IA para sanitarios</div>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button className={mode === 'login' ? 'active' : ''}
            onClick={() => { setMode('login'); setError('') }}>
            Acceder
          </button>
          <button className={mode === 'register' ? 'active' : ''}
            onClick={() => { setMode('register'); setError('') }}>
            Registrarse
          </button>
        </div>

        {/* Campos */}
        <div className="auth-fields">
          {mode === 'register' && (
            <div className="field">
              <label>Nombre completo</label>
              <input type="text" placeholder="Dra. Ana García López"
                value={name} onChange={e => setName(e.target.value)} onKeyDown={handleKey} />
            </div>
          )}
          <div className="field">
            <label>Email profesional</label>
            <input type="email" placeholder="nombre@hospital.es"
              value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleKey} />
          </div>
          <div className="field">
            <label>Contraseña</label>
            <input type="password"
              placeholder={mode === 'register' ? 'Mínimo 8 caracteres' : '••••••••'}
              value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleKey} />
          </div>
          {mode === 'register' && (
            <div className="field">
              <label>Código de invitación</label>
              <input type="text" placeholder="SANIA-XXXX-XX"
                value={inviteCode}
                onChange={e => setInviteCode(e.target.value.toUpperCase())}
                onKeyDown={handleKey}
                style={{ fontFamily: 'monospace', letterSpacing: 2 }} />
              <div className="field-hint">
                El código es de uso único y está vinculado a tu email. Válido 48 horas desde su emisión.
              </div>
            </div>
          )}
        </div>

        {error && <div className="auth-error">{error}</div>}

        <button className="auth-btn" disabled={loading}
          onClick={mode === 'login' ? handleLogin : handleRegister}>
          {loading
            ? <span className="spinner" />
            : mode === 'login' ? 'Acceder a la Academia' : 'Crear cuenta'}
        </button>

        {mode === 'login' && (
          <div className="auth-note">
            ¿Primera vez? Necesitas un código de invitación para registrarte.
          </div>
        )}

        <div className="auth-footer">
          Desarrollado por <a href="mailto:doncel.project@gmail.com">DoncelProject</a>
        </div>
      </div>

      <style>{`
        .auth-wrap {
          min-height: 100vh;
          background: #0C0D12;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }
        .auth-wrap::before {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(33,150,243,0.06) 0%, transparent 70%);
          top: -100px; left: -100px;
          pointer-events: none;
        }
        .auth-wrap::after {
          content: '';
          position: absolute;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(0,184,212,0.05) 0%, transparent 70%);
          bottom: -50px; right: -50px;
          pointer-events: none;
        }
        .auth-card {
          background: #13151e;
          border: 1px solid #1e2335;
          border-radius: 20px;
          padding: 36px 32px;
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 1;
        }
        .auth-brand { text-align: center; margin-bottom: 28px; }
        .brand-icon { font-size: 36px; margin-bottom: 8px; }
        .brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 24px; font-weight: 700; color: #fff; letter-spacing: -0.5px;
        }
        .brand-name span { color: #2196F3; }
        .brand-sub { font-size: 11px; color: #546E7A; margin-top: 4px; letter-spacing: 0.3px; }
        .auth-tabs {
          display: flex; background: #0C0D12;
          border-radius: 10px; padding: 4px; margin-bottom: 24px;
        }
        .auth-tabs button {
          flex: 1; padding: 8px; background: transparent; border: none;
          border-radius: 8px; color: #546E7A; font-size: 13px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .auth-tabs button.active { background: #1e2335; color: #fff; font-weight: 500; }
        .auth-fields { display: flex; flex-direction: column; gap: 14px; }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field label { font-size: 11px; color: #B0BEC5; text-transform: uppercase; letter-spacing: 0.7px; }
        .field input {
          background: #0C0D12; border: 1px solid #1e2335; border-radius: 8px;
          padding: 10px 12px; color: #fff; font-size: 13px;
          font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s;
        }
        .field input:focus { border-color: #2196F3; }
        .field input::placeholder { color: #37474F; }
        .field-hint { font-size: 11px; color: #37474F; line-height: 1.5; margin-top: 2px; }
        .auth-error {
          background: rgba(244,67,54,0.08); border: 1px solid rgba(244,67,54,0.2);
          border-radius: 8px; padding: 10px 14px; font-size: 12px;
          color: #EF9A9A; margin-top: 12px; line-height: 1.5;
        }
        .auth-btn {
          width: 100%; margin-top: 20px; padding: 13px;
          background: #2196F3; border: none; border-radius: 10px;
          color: #fff; font-size: 14px; font-weight: 600;
          font-family: 'Syne', sans-serif; cursor: pointer;
          transition: all 0.2s; display: flex; align-items: center;
          justify-content: center; gap: 8px; letter-spacing: 0.3px;
        }
        .auth-btn:hover:not(:disabled) { background: #1976D2; transform: translateY(-1px); }
        .auth-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.8s linear infinite; display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg) } }
        .auth-note {
          text-align: center; font-size: 11px; color: #37474F;
          margin-top: 14px; line-height: 1.5;
        }
        .auth-footer {
          text-align: center; font-size: 11px; color: #37474F; margin-top: 24px;
        }
        .auth-footer a { color: #546E7A; text-decoration: none; }
        .auth-footer a:hover { color: #2196F3; }
      `}</style>
    </div>
  )
}
