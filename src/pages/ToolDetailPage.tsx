import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Heart, Calendar, Building2, Tag, Globe2, Send, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { CategoryBadge } from '../components/CategoryBadge'
import { PricingBadge } from '../components/PricingBadge'
import { useUpvote } from '../hooks/useUpvote'
import { useRelatedTools } from '../hooks/useTools'
import { useToolBySlug, trackToolClick } from '../hooks/useAdmin'
import type { AiTool } from '../lib/types'
import { getToolSlug } from '../lib/slug'

function ToolLogo({ tool, size = 80 }: { tool: AiTool; size?: number }) {
  const [imgError, setImgError] = useState(false)
  const initials = tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  const colors = ['#8B5CF6', '#EC4899', '#00E5FF', '#F97316', '#EF4444', '#10B981', '#F59E0B', '#6366F1', '#FF2D78', '#14B8A6']
  const bgColor = colors[tool.name.charCodeAt(0) % colors.length]
  const radius = size * 0.18

  if (!tool.logo_url || imgError) {
    return (
      <div style={{ width: size, height: size, borderRadius: radius, backgroundColor: `${bgColor}22`, border: `1.5px solid ${bgColor}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-family-display)', fontSize: size * 0.3, fontWeight: 800, color: bgColor }}>{initials}</span>
      </div>
    )
  }
  return (
    <div style={{ width: size, height: size, borderRadius: radius, backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: size * 0.1 }}>
      <img src={tool.logo_url} alt={tool.name} onError={() => setImgError(true)} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  )
}

function RelatedCard({ tool }: { tool: AiTool }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={() => navigate(`/tool/${getToolSlug(tool)}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 10, border: `1px solid ${hovered ? 'rgba(0,229,255,0.22)' : 'var(--color-border)'}`, backgroundColor: hovered ? 'rgba(0,229,255,0.04)' : 'var(--color-surface)', cursor: 'pointer', transition: 'all 0.15s ease' }}
    >
      <ToolLogo tool={tool} size={40} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 700, color: 'var(--color-text)', fontFamily: 'var(--font-family-display)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tool.name}</p>
        <p style={{ margin: 0, fontSize: 11, color: 'var(--color-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tool.description.slice(0, 70)}…</p>
      </div>
      <CategoryBadge category={tool.category} size="sm" />
    </div>
  )
}

function MetaCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ padding: '12px 16px', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, color: 'var(--color-muted)' }}>
        {icon}
        <span style={{ fontSize: 10, fontFamily: 'var(--font-family-mono)', fontWeight: 600, letterSpacing: '0.06em' }}>{label.toUpperCase()}</span>
      </div>
      <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--color-text)', fontFamily: 'var(--font-family-display)' }}>{value}</p>
    </div>
  )
}

export function ToolDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: tool, isLoading, isError } = useToolBySlug(slug ?? '')
  const { upvote, hasUpvoted, isPending: upvotePending } = useUpvote()
  const { data: relatedTools } = useRelatedTools(tool?.category ?? '', tool?.id ?? '')

  const alreadyUpvoted = tool ? hasUpvoted(tool.id) : false

  // Track click
  useEffect(() => {
    if (tool?.id) void trackToolClick(tool.id)
  }, [tool?.id])

  // SEO: update page title
  useEffect(() => {
    if (tool) document.title = `${tool.name} — AIverse`
    return () => { document.title = 'AIverse' }
  }, [tool])

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '2px solid var(--color-border)', borderTopColor: 'var(--color-cyan)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
          <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)', fontSize: 13 }}>Loading tool…</p>
        </div>
      </div>
    )
  }

  if (isError || !tool) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <p style={{ fontSize: 48 }}>🔍</p>
        <h2 style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-text)', margin: 0 }}>Tool not found</h2>
        <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)', fontSize: 13 }}>The tool "{slug}" doesn't exist in the directory.</p>
        <Link to="/" style={{ color: 'var(--color-cyan)', fontFamily: 'var(--font-family-mono)', fontSize: 13, textDecoration: 'none' }}>← Back to directory</Link>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Top gradient accent */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--color-cyan), var(--color-pink))' }} />

      {/* Nav bar */}
      <nav style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', padding: '0 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-muted)', fontSize: 13, fontFamily: 'var(--font-family-mono)', cursor: 'pointer', transition: 'all 0.15s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'; e.currentTarget.style.color = 'var(--color-text)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-muted)' }}
          >
            <ArrowLeft size={14} /> Back
          </button>
          <Link to="/" style={{ fontFamily: 'var(--font-family-display)', fontSize: 16, fontWeight: 800, background: 'linear-gradient(135deg, var(--color-cyan), var(--color-pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textDecoration: 'none' }}>
            AIverse
          </Link>
          <Link to="/submit" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: '1px solid rgba(0,229,255,0.2)', backgroundColor: 'rgba(0,229,255,0.06)', color: 'var(--color-cyan)', fontSize: 12, fontFamily: 'var(--font-family-mono)', textDecoration: 'none', transition: 'all 0.15s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.12)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.06)' }}
          >
            <Send size={12} /> Submit a tool
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}>

          {/* Hero */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
            <ToolLogo tool={tool} size={88} />
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 800, color: 'var(--color-text)', margin: 0, lineHeight: 1.1 }}>
                  {tool.name}
                </h1>
                {tool.is_featured && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 20, backgroundColor: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)' }}>
                    <Star size={10} fill="rgba(251,191,36,0.9)" color="rgba(251,191,36,0.9)" />
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-family-mono)', fontWeight: 600, color: '#FCD34D', letterSpacing: '0.05em' }}>FEATURED</span>
                  </span>
                )}
              </div>
              <p style={{ margin: '0 0 12px', fontSize: 14, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>
                by {tool.company}{tool.founded_year ? ` · Founded ${tool.founded_year}` : ''}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <CategoryBadge category={tool.category} size="md" />
                <PricingBadge model={tool.pricing_model} priceStarting={tool.price_starting} size="md" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
            <a
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.08))', border: '1px solid rgba(0,229,255,0.3)', color: 'var(--color-cyan)', fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-family-display)', textDecoration: 'none', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,229,255,0.22), rgba(0,229,255,0.12))'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.5)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.08))'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)' }}
            >
              <ExternalLink size={15} /> Visit Website
            </a>
            <button
              onClick={() => !alreadyUpvoted && !upvotePending && upvote(tool.id)}
              disabled={alreadyUpvoted || upvotePending}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 10, border: `1px solid ${alreadyUpvoted ? 'rgba(255,45,120,0.35)' : 'var(--color-border)'}`, backgroundColor: alreadyUpvoted ? 'rgba(255,45,120,0.1)' : 'transparent', color: alreadyUpvoted ? 'var(--color-pink)' : 'var(--color-muted)', fontSize: 14, fontFamily: 'var(--font-family-mono)', cursor: alreadyUpvoted ? 'default' : 'pointer', transition: 'all 0.15s ease' }}
              onMouseEnter={(e) => { if (!alreadyUpvoted) { e.currentTarget.style.borderColor = 'rgba(255,45,120,0.3)'; e.currentTarget.style.backgroundColor = 'rgba(255,45,120,0.08)'; e.currentTarget.style.color = 'var(--color-pink)' } }}
              onMouseLeave={(e) => { if (!alreadyUpvoted) { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-muted)' } }}
            >
              <Heart size={14} fill={alreadyUpvoted ? 'var(--color-pink)' : 'none'} />
              {alreadyUpvoted ? 'Upvoted' : 'Upvote'} · {tool.upvotes.toLocaleString()}
            </button>
            <button
              onClick={() => { navigator.clipboard.writeText(window.location.href) }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 18px', borderRadius: 10, border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-muted)', fontSize: 13, fontFamily: 'var(--font-family-mono)', cursor: 'pointer', transition: 'all 0.15s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'; e.currentTarget.style.color = 'var(--color-text)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-muted)' }}
            >
              <Globe2 size={13} /> Share
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(0, 280px)', gap: 28, alignItems: 'start' }}>
            {/* Main column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

              {/* Short description */}
              <section>
                <p style={{ margin: 0, fontSize: 17, color: 'var(--color-text)', lineHeight: 1.75 }}>{tool.description}</p>
              </section>

              {/* Long description */}
              {tool.long_description && (
                <section>
                  <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: 16, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 12px' }}>About {tool.name}</h2>
                  <div style={{ padding: '18px 20px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12 }}>
                    <p style={{ margin: 0, fontSize: 14.5, color: 'var(--color-muted)', lineHeight: 1.8 }}>{tool.long_description}</p>
                  </div>
                </section>
              )}

              {/* Tags */}
              {tool.tags.length > 0 && (
                <section>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
                    <Tag size={13} color="var(--color-muted)" />
                    <span style={{ fontSize: 12, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)', fontWeight: 600, letterSpacing: '0.06em' }}>TAGS</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {tool.tags.map((tag) => (
                      <Link key={tag} to={`/?tags=${tag}`} style={{ padding: '5px 12px', borderRadius: 6, backgroundColor: 'rgba(136,136,170,0.1)', border: '1px solid rgba(136,136,170,0.15)', color: 'var(--color-muted)', fontSize: 12, fontFamily: 'var(--font-family-mono)', textDecoration: 'none', transition: 'all 0.15s ease' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)'; e.currentTarget.style.color = 'var(--color-cyan)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(136,136,170,0.15)'; e.currentTarget.style.color = 'var(--color-muted)' }}
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Related tools */}
              {relatedTools && relatedTools.length > 0 && (
                <section>
                  <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: 16, fontWeight: 700, color: 'var(--color-text)', margin: '0 0 14px' }}>
                    Similar tools in {tool.category}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {relatedTools.map((t) => <RelatedCard key={t.id} tool={t} />)}
                  </div>
                </section>
              )}
            </div>

            {/* Side column — meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tool.founded_year && <MetaCard icon={<Calendar size={13} />} label="Founded" value={String(tool.founded_year)} />}
              <MetaCard icon={<Building2 size={13} />} label="Company" value={tool.company || '—'} />
              {tool.price_starting != null && <MetaCard icon={<span style={{ fontSize: 13, fontWeight: 700 }}>$</span>} label="Starting at" value={`$${tool.price_starting}/mo`} />}
              <MetaCard icon={<Heart size={13} />} label="Upvotes" value={tool.upvotes.toLocaleString()} />
              {tool.click_count != null && <MetaCard icon={<ExternalLink size={13} />} label="Visits tracked" value={tool.click_count.toLocaleString()} />}

              {/* Back to category */}
              <Link
                to={`/?categories=${encodeURIComponent(tool.category)}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 16px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-muted)', fontSize: 12, fontFamily: 'var(--font-family-mono)', textDecoration: 'none', transition: 'all 0.15s ease', marginTop: 4 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.25)'; e.currentTarget.style.color = 'var(--color-cyan)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)' }}
              >
                Browse all {tool.category} tools →
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
