import { useNavigate } from 'react-router-dom'
import { Wrench, Inbox, TrendingUp, Heart, Calendar, Mail, Loader2, ArrowRight } from 'lucide-react'
import { useAdminStats } from '../../hooks/useAdmin'
import { getToolSlug } from '../../lib/slug'
import type { AiTool } from '../../lib/types'

function StatCard({ icon, label, value, color, onClick }: { icon: React.ReactNode; label: string; value: string | number; color: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{ padding: '20px 22px', backgroundColor: 'var(--color-surface)', border: `1px solid ${color}22`, borderRadius: 12, cursor: onClick ? 'pointer' : 'default', transition: 'all 0.15s ease' }}
      onMouseEnter={(e) => { if (onClick) { e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.backgroundColor = `${color}08` } }}
      onMouseLeave={(e) => { if (onClick) { e.currentTarget.style.borderColor = `${color}22`; e.currentTarget.style.backgroundColor = 'var(--color-surface)' } }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color }}>
        {icon}
        <span style={{ fontSize: 11, fontFamily: 'var(--font-family-mono)', fontWeight: 600, letterSpacing: '0.06em' }}>{label.toUpperCase()}</span>
      </div>
      <p style={{ margin: 0, fontSize: 32, fontWeight: 800, color, fontFamily: 'var(--font-family-display)', lineHeight: 1 }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  )
}

function TopToolRow({ tool, rank }: { tool: AiTool; rank: number }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/tool/${getToolSlug(tool)}`)}
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 8, border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.15s ease' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.22)'; e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.04)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.backgroundColor = 'transparent' }}
    >
      <span style={{ width: 22, textAlign: 'center', fontSize: 11, color: 'var(--color-muted-2)', fontFamily: 'var(--font-family-mono)', fontWeight: 700 }}>#{rank}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--color-text)', fontFamily: 'var(--font-family-display)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tool.name}</p>
        <p style={{ margin: 0, fontSize: 11, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>{tool.category}</p>
      </div>
      <span style={{ fontSize: 12, color: 'var(--color-pink)', fontFamily: 'var(--font-family-mono)', fontWeight: 600 }}>♥ {tool.upvotes.toLocaleString()}</span>
    </div>
  )
}

export function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
        <Loader2 size={28} color="var(--color-cyan)" style={{ animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: 28, fontWeight: 800, color: 'var(--color-text)', margin: '0 0 6px' }}>Dashboard</h1>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>AIverse admin overview</p>
      </div>

      {/* Stat grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 36 }}>
        <StatCard icon={<Wrench size={14} />} label="Total Tools" value={stats?.totalTools ?? 0} color="#00E5FF" onClick={() => navigate('/admin/tools')} />
        <StatCard icon={<Heart size={14} />} label="Total Upvotes" value={stats?.totalUpvotes ?? 0} color="#FF2D78" />
        <StatCard icon={<Calendar size={14} />} label="New (7 days)" value={stats?.newLast7Days ?? 0} color="#6EE7B7" />
        <StatCard icon={<Inbox size={14} />} label="Pending" value={stats?.pendingSubmissions ?? 0} color="#FCD34D" onClick={() => navigate('/admin/submissions')} />
        <StatCard icon={<Mail size={14} />} label="Newsletter" value={stats?.newsletterSubs ?? 0} color="#A78BFA" />
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 36 }}>
        {[
          { label: 'Manage tools', desc: 'Add, edit, or delete tools', path: '/admin/tools', color: '#00E5FF' },
          { label: 'Review submissions', desc: `${stats?.pendingSubmissions ?? 0} pending`, path: '/admin/submissions', color: '#FCD34D' },
        ].map(({ label, desc, path, color }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderRadius: 10, border: `1px solid ${color}22`, backgroundColor: `${color}06`, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.backgroundColor = `${color}10` }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${color}22`; e.currentTarget.style.backgroundColor = `${color}06` }}
          >
            <div>
              <p style={{ margin: '0 0 3px', fontSize: 14, fontWeight: 700, color: 'var(--color-text)', fontFamily: 'var(--font-family-display)' }}>{label}</p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>{desc}</p>
            </div>
            <ArrowRight size={16} color={color} />
          </button>
        ))}
      </div>

      {/* Top tools */}
      {stats && stats.topTools.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <TrendingUp size={14} color="var(--color-pink)" />
            <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: 16, fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>Top 5 Most Upvoted</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {stats.topTools.map((tool, i) => (
              <TopToolRow key={tool.id} tool={tool} rank={i + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
