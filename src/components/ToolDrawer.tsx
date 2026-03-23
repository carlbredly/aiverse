import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  X,
  Heart,
  Calendar,
  Building2,
  Tag,
  ExternalLink,
  Maximize2,
} from 'lucide-react'
import type { AiTool } from '../lib/types'
import { CategoryBadge } from './CategoryBadge'
import { PricingBadge } from './PricingBadge'
import { useUpvote } from '../hooks/useUpvote'
import { useRelatedTools } from '../hooks/useTools'
import { getToolSlug } from '../lib/slug'

interface ToolDrawerProps {
  tool: AiTool | null
  onClose: () => void
}

function LogoLarge({ tool }: { tool: AiTool }) {
  const [imgError, setImgError] = useState(false)

  const initials = tool.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const colors = [
    '#8B5CF6', '#EC4899', '#00E5FF', '#F97316',
    '#EF4444', '#10B981', '#F59E0B', '#6366F1',
    '#FF2D78', '#14B8A6',
  ]
  const colorIndex = tool.name.charCodeAt(0) % colors.length
  const bgColor = colors[colorIndex]

  if (!tool.logo_url || imgError) {
    return (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 14,
          backgroundColor: `${bgColor}22`,
          border: `1px solid ${bgColor}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: 'var(--font-family-display)', fontSize: 22, fontWeight: 800, color: bgColor }}>
          {initials}
        </span>
      </div>
    )
  }

  return (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 14,
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
        padding: 10,
      }}
    >
      <img
        src={tool.logo_url}
        alt={tool.name}
        onError={() => setImgError(true)}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  )
}

function RelatedToolCard({ tool, onSelect }: { tool: AiTool; onSelect: (t: AiTool) => void }) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  const initials = tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  const colors = ['#8B5CF6', '#EC4899', '#00E5FF', '#F97316', '#EF4444', '#10B981', '#F59E0B', '#6366F1', '#FF2D78', '#14B8A6']
  const bgColor = colors[tool.name.charCodeAt(0) % colors.length]

  return (
    <div
      onClick={() => onSelect(tool)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        borderRadius: 10,
        border: `1px solid ${hovered ? 'rgba(0,229,255,0.2)' : 'var(--color-border)'}`,
        backgroundColor: hovered ? 'rgba(0,229,255,0.04)' : 'var(--color-surface)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          backgroundColor: !tool.logo_url || imgError ? `${bgColor}22` : 'var(--color-bg)',
          border: `1px solid ${!tool.logo_url || imgError ? `${bgColor}44` : 'var(--color-border)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
          padding: !tool.logo_url || imgError ? 0 : 5,
        }}
      >
        {!tool.logo_url || imgError ? (
          <span style={{ fontFamily: 'var(--font-family-display)', fontSize: 12, fontWeight: 700, color: bgColor }}>
            {initials}
          </span>
        ) : (
          <img src={tool.logo_url} alt={tool.name} onError={() => setImgError(true)} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--color-text)', fontFamily: 'var(--font-family-display)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {tool.name}
        </p>
        <p style={{ margin: 0, fontSize: 11, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {tool.description.slice(0, 55)}…
        </p>
      </div>
    </div>
  )
}

export function ToolDrawer({ tool, onClose }: ToolDrawerProps) {
  const { upvote, hasUpvoted, isPending } = useUpvote()
  const { data: relatedTools } = useRelatedTools(tool?.category ?? '', tool?.id ?? '')

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (tool) {
      window.addEventListener('keydown', handler)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [tool, onClose])

  const alreadyUpvoted = tool ? hasUpvoted(tool.id) : false

  return (
    <AnimatePresence>
      {tool && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 50,
            }}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 520,
              backgroundColor: 'var(--color-surface)',
              borderLeft: '1px solid var(--color-border)',
              zIndex: 51,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* Top gradient accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: 'linear-gradient(90deg, var(--color-cyan), var(--color-pink))',
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 34,
                height: 34,
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'
                e.currentTarget.style.color = 'var(--color-text)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg)'
                e.currentTarget.style.color = 'var(--color-muted)'
              }}
            >
              <X size={16} />
            </button>

            {/* View full page button */}
            <Link
              to={`/tool/${getToolSlug(tool)}`}
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 16,
                right: 58,
                height: 34,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '0 10px',
                borderRadius: 8,
                border: '1px solid rgba(0,229,255,0.2)',
                backgroundColor: 'rgba(0,229,255,0.06)',
                color: 'var(--color-cyan)',
                fontSize: 11,
                fontFamily: 'var(--font-family-mono)',
                textDecoration: 'none',
                zIndex: 2,
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.12)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.06)' }}
            >
              <Maximize2 size={11} /> Full page
            </Link>

            {/* Content */}
            <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, paddingRight: 40 }}>
                <LogoLarge tool={tool} />
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-family-display)',
                      fontSize: 24,
                      fontWeight: 800,
                      color: 'var(--color-text)',
                      margin: '0 0 4px 0',
                      lineHeight: 1.2,
                    }}
                  >
                    {tool.name}
                  </h2>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>
                    {tool.company}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <CategoryBadge category={tool.category} size="md" />
                <PricingBadge model={tool.pricing_model} priceStarting={tool.price_starting} size="md" />
              </div>

              {/* Short description */}
              <p style={{ margin: 0, fontSize: 15, color: 'var(--color-text)', lineHeight: 1.7 }}>
                {tool.description}
              </p>

              {/* Long description */}
              {tool.long_description && (
                <div
                  style={{
                    padding: '16px 18px',
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 10,
                  }}
                >
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.75 }}>
                    {tool.long_description}
                  </p>
                </div>
              )}

              {/* Metadata grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 10,
                }}
              >
                {tool.founded_year && (
                  <MetaItem icon={<Calendar size={13} />} label="Founded" value={String(tool.founded_year)} />
                )}
                <MetaItem icon={<Building2 size={13} />} label="Company" value={tool.company} />
                {tool.price_starting != null && (
                  <MetaItem
                    icon={<span style={{ fontSize: 13, fontWeight: 600 }}>$</span>}
                    label="Starting at"
                    value={`$${tool.price_starting}/mo`}
                  />
                )}
                <MetaItem
                  icon={<Heart size={13} />}
                  label="Upvotes"
                  value={tool.upvotes.toLocaleString()}
                />
              </div>

              {/* Tags */}
              {tool.tags.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <Tag size={13} color="var(--color-muted)" />
                    <span style={{ fontSize: 12, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)', fontWeight: 500, letterSpacing: '0.05em' }}>
                      TAGS
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 6,
                          backgroundColor: 'rgba(136, 136, 170, 0.1)',
                          border: '1px solid rgba(136, 136, 170, 0.15)',
                          color: 'var(--color-muted)',
                          fontSize: 12,
                          fontFamily: 'var(--font-family-mono)',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 10 }}>
                <a
                  href={tool.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '11px 20px',
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, rgba(0,229,255,0.15) 0%, rgba(0,229,255,0.08) 100%)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    color: 'var(--color-cyan)',
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: 'var(--font-family-display)',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,229,255,0.22) 0%, rgba(0,229,255,0.12) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,229,255,0.15) 0%, rgba(0,229,255,0.08) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.3)'
                  }}
                >
                  <ExternalLink size={15} />
                  Visit Website
                </a>

                <button
                  onClick={() => !alreadyUpvoted && !isPending && upvote(tool.id)}
                  disabled={alreadyUpvoted || isPending}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '11px 18px',
                    borderRadius: 10,
                    border: `1px solid ${alreadyUpvoted ? 'rgba(255,45,120,0.35)' : 'var(--color-border)'}`,
                    backgroundColor: alreadyUpvoted ? 'rgba(255,45,120,0.1)' : 'transparent',
                    color: alreadyUpvoted ? 'var(--color-pink)' : 'var(--color-muted)',
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: 'var(--font-family-mono)',
                    cursor: alreadyUpvoted ? 'default' : 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!alreadyUpvoted) {
                      e.currentTarget.style.borderColor = 'rgba(255,45,120,0.3)'
                      e.currentTarget.style.backgroundColor = 'rgba(255,45,120,0.08)'
                      e.currentTarget.style.color = 'var(--color-pink)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!alreadyUpvoted) {
                      e.currentTarget.style.borderColor = 'var(--color-border)'
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = 'var(--color-muted)'
                    }
                  }}
                >
                  <Heart size={14} fill={alreadyUpvoted ? 'var(--color-pink)' : 'none'} />
                  {alreadyUpvoted ? 'Upvoted' : 'Upvote'}
                </button>
              </div>

              {/* Related tools */}
              {relatedTools && relatedTools.length > 0 && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 12,
                      paddingBottom: 10,
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: 'var(--color-muted)',
                        fontFamily: 'var(--font-family-mono)',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                      }}
                    >
                      SIMILAR TOOLS IN {tool.category.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {relatedTools.map((related) => (
                      <RelatedToolCard key={related.id} tool={related} onSelect={() => {}} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div
      style={{
        padding: '10px 14px',
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4, color: 'var(--color-muted)' }}>
        {icon}
        <span style={{ fontSize: 10, fontFamily: 'var(--font-family-mono)', fontWeight: 600, letterSpacing: '0.06em' }}>
          {label.toUpperCase()}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--color-text)', fontFamily: 'var(--font-family-display)' }}>
        {value}
      </p>
    </div>
  )
}
