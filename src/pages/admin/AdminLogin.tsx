import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Loader2, AlertCircle } from 'lucide-react'
import { useAdminAuth } from '../../hooks/useAdmin'

export function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAdminAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      setErrorMsg((err as Error).message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '11px 14px',
    backgroundColor: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: 8,
    color: 'var(--color-text)',
    fontSize: 14,
    fontFamily: 'var(--font-family-mono)',
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.15s ease',
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(255,45,120,0.15))', border: '1px solid rgba(0,229,255,0.3)', marginBottom: 14 }}>
            <Zap size={26} color="var(--color-cyan)" fill="rgba(0,229,255,0.3)" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: 24, fontWeight: 800, color: 'var(--color-text)', margin: '0 0 6px' }}>Admin Login</h1>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>AIverse Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {errorMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', backgroundColor: 'rgba(239,68,68,0.06)' }}>
              <AlertCircle size={14} color="#FCA5A5" />
              <p style={{ margin: 0, fontSize: 13, color: '#FCA5A5', fontFamily: 'var(--font-family-mono)' }}>{errorMsg}</p>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-family-mono)', fontWeight: 600, color: 'var(--color-muted)', letterSpacing: '0.06em', marginBottom: 6 }}>EMAIL</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-family-mono)', fontWeight: 600, color: 'var(--color-muted)', letterSpacing: '0.06em', marginBottom: 6 }}>PASSWORD</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 20px', borderRadius: 10, border: '1px solid rgba(0,229,255,0.3)', background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.08))', color: 'var(--color-cyan)', fontSize: 14, fontFamily: 'var(--font-family-display)', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.15s ease', marginTop: 6 }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,229,255,0.22), rgba(0,229,255,0.12))' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.08))' }}
          >
            {loading ? <Loader2 size={15} style={{ animation: 'spin 0.8s linear infinite' }} /> : null}
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'var(--color-muted-2)', fontFamily: 'var(--font-family-mono)' }}>
          Create your admin account in Supabase Dashboard → Authentication → Users
        </p>
      </div>
    </div>
  )
}
