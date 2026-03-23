import { useState } from 'react'
import { Check, X, ExternalLink, Loader2, Mail, Calendar } from 'lucide-react'
import { useAdminSubmissions, useApproveSubmission, useRejectSubmission } from '../../hooks/useAdmin'
import type { ToolSubmission } from '../../lib/types'

type Tab = 'pending' | 'approved' | 'rejected'

function SubmissionCard({ submission }: { submission: ToolSubmission }) {
  const approve = useApproveSubmission()
  const reject = useRejectSubmission()
  const [confirming, setConfirming] = useState(false)
  const loading = approve.isPending || reject.isPending

  const handleApprove = () => approve.mutate(submission)
  const handleReject = () => { setConfirming(false); reject.mutate(submission.id) }

  return (
    <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-family-display)', fontSize: 17, fontWeight: 800, color: 'var(--color-text)', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {submission.name}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            {submission.company && <span style={{ fontSize: 12, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>{submission.company}</span>}
            <span style={{ fontSize: 11, color: 'var(--color-muted-2)', fontFamily: 'var(--font-family-mono)', padding: '2px 8px', borderRadius: 10, backgroundColor: 'rgba(136,136,170,0.1)', border: '1px solid rgba(136,136,170,0.15)' }}>
              {submission.category}
            </span>
            <span style={{ fontSize: 11, color: 'var(--color-cyan)', fontFamily: 'var(--font-family-mono)' }}>
              {submission.pricing_model}
            </span>
          </div>
        </div>

        <a
          href={submission.website_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 7, border: '1px solid rgba(0,229,255,0.2)', backgroundColor: 'rgba(0,229,255,0.06)', color: 'var(--color-cyan)', fontSize: 12, fontFamily: 'var(--font-family-mono)', textDecoration: 'none', flexShrink: 0, transition: 'all 0.15s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.12)' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.06)' }}
        >
          <ExternalLink size={11} /> Visit
        </a>
      </div>

      {/* Description */}
      <p style={{ margin: 0, fontSize: 13.5, color: 'var(--color-muted)', lineHeight: 1.6 }}>{submission.description}</p>

      {/* Tags */}
      {submission.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {submission.tags.map((tag) => (
            <span key={tag} style={{ padding: '2px 8px', borderRadius: 5, backgroundColor: 'rgba(136,136,170,0.1)', border: '1px solid rgba(136,136,170,0.15)', color: 'var(--color-muted)', fontSize: 11, fontFamily: 'var(--font-family-mono)' }}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Meta */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 12, color: 'var(--color-muted-2)', fontFamily: 'var(--font-family-mono)' }}>
        {submission.submitter_email && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Mail size={11} /> {submission.submitter_email}
          </span>
        )}
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Calendar size={11} /> {new Date(submission.created_at).toLocaleDateString()}
        </span>
      </div>

      {/* Notes */}
      {submission.notes && (
        <div style={{ padding: '10px 12px', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)', fontStyle: 'italic' }}>"{submission.notes}"</p>
        </div>
      )}

      {/* Actions — only for pending */}
      {submission.status === 'pending' && (
        <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
          <button
            onClick={handleApprove}
            disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 8, border: '1px solid rgba(110,231,183,0.3)', backgroundColor: 'rgba(110,231,183,0.08)', color: '#6EE7B7', fontSize: 13, fontFamily: 'var(--font-family-mono)', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.15s ease', opacity: loading ? 0.7 : 1 }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = 'rgba(110,231,183,0.14)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(110,231,183,0.08)' }}
          >
            {approve.isPending ? <Loader2 size={13} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Check size={13} />}
            Approve & publish
          </button>

          {!confirming ? (
            <button
              onClick={() => setConfirming(true)}
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.25)', backgroundColor: 'transparent', color: '#FCA5A5', fontSize: 13, fontFamily: 'var(--font-family-mono)', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.15s ease' }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              <X size={13} /> Reject
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>Confirm reject?</span>
              <button onClick={handleReject} disabled={loading} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(239,68,68,0.4)', backgroundColor: 'rgba(239,68,68,0.12)', color: '#FCA5A5', fontSize: 12, fontFamily: 'var(--font-family-mono)', cursor: 'pointer' }}>
                {reject.isPending ? <Loader2 size={12} style={{ animation: 'spin 0.8s linear infinite' }} /> : 'Yes, reject'}
              </button>
              <button onClick={() => setConfirming(false)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-muted)', fontSize: 12, fontFamily: 'var(--font-family-mono)', cursor: 'pointer' }}>Cancel</button>
            </div>
          )}
        </div>
      )}

      {/* Status badges for approved/rejected */}
      {submission.status !== 'pending' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 12px', borderRadius: 8, backgroundColor: submission.status === 'approved' ? 'rgba(110,231,183,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${submission.status === 'approved' ? 'rgba(110,231,183,0.25)' : 'rgba(239,68,68,0.25)'}`, width: 'fit-content' }}>
          {submission.status === 'approved' ? <Check size={12} color="#6EE7B7" /> : <X size={12} color="#FCA5A5" />}
          <span style={{ fontSize: 12, color: submission.status === 'approved' ? '#6EE7B7' : '#FCA5A5', fontFamily: 'var(--font-family-mono)', fontWeight: 600 }}>
            {submission.status === 'approved' ? 'Approved & published' : 'Rejected'}
          </span>
        </div>
      )}
    </div>
  )
}

export function AdminSubmissions() {
  const [tab, setTab] = useState<Tab>('pending')
  const { data: submissions = [], isLoading } = useAdminSubmissions(tab)

  const tabs: { id: Tab; label: string }[] = [
    { id: 'pending', label: 'Pending' },
    { id: 'approved', label: 'Approved' },
    { id: 'rejected', label: 'Rejected' },
  ]

  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: 28, fontWeight: 800, color: 'var(--color-text)', margin: '0 0 6px' }}>Submissions</h1>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>Review tools submitted by the community</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24, borderBottom: '1px solid var(--color-border)', paddingBottom: 0 }}>
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{ padding: '8px 16px', borderRadius: '8px 8px 0 0', border: `1px solid ${tab === id ? 'var(--color-border)' : 'transparent'}`, borderBottom: tab === id ? '1px solid var(--color-surface)' : '1px solid transparent', backgroundColor: tab === id ? 'var(--color-surface)' : 'transparent', color: tab === id ? 'var(--color-text)' : 'var(--color-muted)', fontSize: 13, fontFamily: 'var(--font-family-mono)', fontWeight: tab === id ? 600 : 400, cursor: 'pointer', transition: 'all 0.12s ease', position: 'relative', bottom: -1 }}
          >
            {label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
          <Loader2 size={24} color="var(--color-cyan)" style={{ animation: 'spin 0.8s linear infinite' }} />
        </div>
      ) : submissions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)', fontSize: 14 }}>
          <p style={{ fontSize: 36, margin: '0 0 12px' }}>📭</p>
          No {tab} submissions
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {submissions.map((sub) => <SubmissionCard key={sub.id} submission={sub} />)}
        </div>
      )}
    </div>
  )
}
