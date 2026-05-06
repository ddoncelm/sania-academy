import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import LOGO_B64 from '../lib/logo.js'

export default function LoginPage() {
  const { sendOtp } = useAuth()

  const [step, setStep]       = useState('email')
  const [email, setEmail]     = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSendLink(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error: err } = await sendOtp(email)
      if (err) {
        setError('Este email no tiene acceso. Contacta con el administrador.')
      } else {
        setStep('sent')
      }
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '0.7rem 1rem',
    background: '#0C0D12', border: '1px solid #1e2335',
    borderRadius: '8px', color: '#fff',
    fontFamily: 'inherit', fontSize: '0.9rem',
    outline: 'none', boxSizing: 'border-box'
  }

  const btnPrimary = (disabled) => ({
    width: '100%', padding: '0.8rem',
    background: disabled ? '#1e2335' : 'linear-gradient(135deg, #2196F3, #00B8D4)',
    border: 'none', borderRadius: '8px',
    color: '#fff', fontFamily: 'inherit',
    fontSize: '0.95rem', fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s'
  })

  return (
    <div style={{
      minHeight: '100vh', background: '#0C0D12',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Sora', sans-serif", padding: '1rem'
    }}>
      <div style={{
        width: '100%', maxWidth: '420px',
        background: '#13141c', border: '1px solid #1e2335',
        borderRadius: '16px', padding: '2.5rem'
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <a href="mailto:doncel.project@gmail.com">
            <img src={LOGO_B64} alt="DoncelProject" style={{ width: 110, marginBottom: '1rem' }} />
          </a>
          <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.3rem' }}>
            SaludIA<span style={{ color: '#00B8D4' }}>.Academy</span>
          </div>
          <p style={{ color: '#B0BEC5', fontSize: '0.82rem', margin: 0 }}>
            IA práctica para sanitarios
          </p>
        </div>

        {/* PASO 1 — Email */}
        {step === 'email' && (
          <form onSubmit={handleSendLink}>
            <p style={{ color: '#B0BEC5', fontSize: '0.85rem', marginBottom: '1.2rem', lineHeight: 1.5 }}>
              Introduce tu email y te enviaremos un enlace de acceso seguro.
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: '#B0BEC5', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                style={inputStyle}
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(244,67,54,0.1)', border: '1px solid rgba(244,67,54,0.3)',
                borderRadius: '8px', padding: '0.7rem 1rem',
                color: '#ef9a9a', fontSize: '0.85rem', marginBottom: '1rem'
              }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={btnPrimary(loading)}>
              {loading ? 'Enviando...' : 'Enviar enlace de acceso'}
            </button>
          </form>
        )}

        {/* PASO 2 — Enlace enviado */}
        {step === 'sent' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(0,184,212,0.1)', border: '1px solid rgba(0,184,212,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00B8D4" strokeWidth="1.8">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Revisa tu correo
              </div>
            </div>

            <div style={{
              background: 'rgba(0,184,212,0.08)', border: '1px solid rgba(0,184,212,0.2)',
              borderRadius: '8px', padding: '0.9rem 1rem', marginBottom: '1.5rem'
            }}>
              <p style={{ color: '#80DEEA', margin: 0, fontSize: '0.85rem', lineHeight: 1.6 }}>
                Hemos enviado un enlace de acceso a <strong>{email}</strong>.<br />
                Haz clic en el enlace del email para entrar.<br />
                <span style={{ color: '#4a9ead', fontSize: '0.8rem' }}>
                  Revisa también la carpeta de spam.
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => { setStep('email'); setError('') }}
              style={btnPrimary(false)}
            >
              Volver a enviar
            </button>
          </div>
        )}

        {/* Footer */}
        <p style={{ textAlign: 'center', color: '#4a5568', fontSize: '0.75rem', marginTop: '2rem' }}>
          Acceso restringido · Contacta con{' '}
          <a href="mailto:doncel.project@gmail.com" style={{ color: '#2196F3', textDecoration: 'none' }}>
            DoncelProject
          </a>
        </p>
      </div>
    </div>
  )
}
