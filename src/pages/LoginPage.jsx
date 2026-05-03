import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'

export default function LoginPage() {
  const { signIn, signUp } = useAuth()
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode]       = useState('login') // 'login' | 'register'
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error: err } = mode === 'login'
        ? await signIn(email, password)
        : await signUp(email, password)
      if (err) setError(err.message)
    } finally {
      setLoading(false)
    }
  }

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
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '0.5rem'
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '10px',
              background: 'linear-gradient(135deg, #2196F3, #00B8D4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem'
            }}>⚕</div>
            <span style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 700 }}>
              SaludIA<span style={{ color: '#00B8D4' }}>.Academy</span>
            </span>
          </div>
          <p style={{ color: '#B0BEC5', fontSize: '0.85rem', margin: 0 }}>
            IA práctica para sanitarios
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', background: '#0C0D12', borderRadius: '8px',
          padding: '4px', marginBottom: '1.5rem'
        }}>
          {['login', 'register'].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, padding: '0.5rem', border: 'none', borderRadius: '6px',
              cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem',
              background: mode === m ? '#2196F3' : 'transparent',
              color: mode === m ? '#fff' : '#B0BEC5',
              transition: 'all 0.2s'
            }}>
              {m === 'login' ? 'Acceder' : 'Registrarse'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#B0BEC5', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>
              Correo electrónico
            </label>
            <input
              type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%', padding: '0.7rem 1rem', background: '#0C0D12',
                border: '1px solid #1e2335', borderRadius: '8px',
                color: '#fff', fontFamily: 'inherit', fontSize: '0.9rem',
                outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#B0BEC5', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>
              Contraseña
            </label>
            <input
              type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              required minLength={6}
              style={{
                width: '100%', padding: '0.7rem 1rem', background: '#0C0D12',
                border: '1px solid #1e2335', borderRadius: '8px',
                color: '#fff', fontFamily: 'inherit', fontSize: '0.9rem',
                outline: 'none', boxSizing: 'border-box'
              }}
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

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '0.8rem',
            background: loading ? '#1e2335' : 'linear-gradient(135deg, #2196F3, #00B8D4)',
            border: 'none', borderRadius: '8px',
            color: '#fff', fontFamily: 'inherit', fontSize: '0.95rem',
            fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}>
            {loading ? 'Cargando...' : mode === 'login' ? 'Acceder' : 'Crear cuenta'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#4a5568', fontSize: '0.75rem', marginTop: '2rem' }}>
          <a href="mailto:doncel.project@gmail.com" style={{ color: '#2196F3', textDecoration: 'none' }}>
            DoncelProject
          </a>
          {' · '}doncel.project@gmail.com
        </p>
      </div>
    </div>
  )
}
