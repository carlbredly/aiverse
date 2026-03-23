import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom'
import { Zap, LayoutDashboard, Wrench, Inbox, LogOut, Globe } from 'lucide-react'
import { supabase } from '../../lib/supabase'

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      end={to.endsWith('dashboard')}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 14px',
        borderRadius: 8,
        border: isActive ? '1px solid rgba(0,229,255,0.25)' : '1px solid transparent',
        backgroundColor: isActive ? 'rgba(0,229,255,0.08)' : 'transparent',
        color: isActive ? 'var(--color-cyan)' : 'var(--color-muted)',
        fontSize: 13,
        fontFamily: 'var(--font-family-mono)',
        fontWeight: isActive ? 600 : 400,
        textDecoration: 'none',
        transition: 'all 0.15s ease',
      })}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        if (!el.style.backgroundColor.includes('0.08')) {
          el.style.backgroundColor = 'rgba(255,255,255,0.04)'
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        if (!el.style.backgroundColor.includes('0.08')) {
          el.style.backgroundColor = 'transparent'
        }
      }}
    >
      {icon}
      {label}
    </NavLink>
  )
}

export function AdminLayout() {
  const [session, setSession] = useState<boolean | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(!!data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(!!s))
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin')
  }

  // Still loading auth state
  if (session === null) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, border: '2px solid var(--color-border)', borderTopColor: 'var(--color-cyan)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  if (!session) return <Navigate to="/admin" replace />

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Sidebar */}
      <aside style={{ width: 220, flexShrink: 0, backgroundColor: 'var(--color-surface)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', padding: '20px 12px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, padding: '0 6px' }}>
          <Zap size={18} color="var(--color-cyan)" />
          <span style={{ fontFamily: 'var(--font-family-display)', fontSize: 16, fontWeight: 800, background: 'linear-gradient(135deg, var(--color-cyan), var(--color-pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AIverse</span>
          <span style={{ fontSize: 10, color: 'var(--color-muted-2)', fontFamily: 'var(--font-family-mono)', marginLeft: 2 }}>Admin</span>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          <NavItem to="/admin/dashboard" icon={<LayoutDashboard size={14} />} label="Dashboard" />
          <NavItem to="/admin/tools" icon={<Wrench size={14} />} label="Tools" />
          <NavItem to="/admin/submissions" icon={<Inbox size={14} />} label="Submissions" />
          <div style={{ margin: '8px 0', borderTop: '1px solid var(--color-border)' }} />
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderRadius: 8, color: 'var(--color-muted)', fontSize: 13, fontFamily: 'var(--font-family-mono)', textDecoration: 'none', transition: 'color 0.15s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)' }}
          >
            <Globe size={14} /> View site
          </NavLink>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 8, border: 'none', backgroundColor: 'transparent', color: 'var(--color-muted)', fontSize: 13, fontFamily: 'var(--font-family-mono)', cursor: 'pointer', transition: 'all 0.15s ease', width: '100%' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#FCA5A5' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-muted)' }}
        >
          <LogOut size={14} /> Sign out
        </button>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '32px 32px 60px' }}>
        <Outlet />
      </main>
    </div>
  )
}
