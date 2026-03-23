import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Heart, Star } from 'lucide-react'
import type { AiTool } from '../lib/types'
import { CategoryBadge } from './CategoryBadge'
import { PricingBadge } from './PricingBadge'
import { useUpvote } from '../hooks/useUpvote'

interface ToolCardProps {
  tool: AiTool
  index: number
  onClick: (tool: AiTool) => void
  searchTerm?: string
}

function highlightText(text: string, term: string): React.ReactNode {
  if (!term.trim()) return text
  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        style={{
          backgroundColor: 'rgba(0, 229, 255, 0.2)',
          color: 'var(--color-cyan)',
          borderRadius: 2,
          padding: '0 1px',
        }}
      >
        {part}
      </mark>
    ) : (
      part
    )
  )
}

function LogoImage({ tool }: { tool: AiTool }) {
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
          width: 44,
          height: 44,
          borderRadius: 10,
          backgroundColor: `${bgColor}22`,
          border: `1px solid ${bgColor}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: 15,
            fontWeight: 700,
            color: bgColor,
          }}
        >
          {initials}
        </span>
      </div>
    )
  }

  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
        padding: 6,
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

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: Math.min(i * 0.05, 0.5),
      duration: 0.35,
      ease: 'easeOut' as const,
    },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

export function ToolCard({ tool, index, onClick, searchTerm = '' }: ToolCardProps) {
  const { upvote, hasUpvoted, isPending } = useUpvote()
  const [isHovered, setIsHovered] = useState(false)
  const alreadyUpvoted = hasUpvoted(tool.id)

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!alreadyUpvoted && !isPending) {
      upvote(tool.id)
    }
  }

  const handleVisit = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(tool.website_url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      onClick={() => onClick(tool)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: 'rgba(17, 17, 24, 0.7)',
        backdropFilter: 'blur(10px)',
        border: tool.is_featured
          ? '1px solid rgba(251, 191, 36, 0.3)'
          : `1px solid ${isHovered ? 'rgba(0, 229, 255, 0.25)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-card)',
        padding: '18px 20px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: isHovered
          ? tool.is_featured
            ? '0 0 24px rgba(251, 191, 36, 0.1), 0 4px 24px rgba(0,0,0,0.4)'
            : 'var(--shadow-glow-cyan)'
          : 'var(--shadow-card)',
      }}
    >
      {/* Featured badge */}
      {tool.is_featured && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '3px 8px',
            borderRadius: 20,
            backgroundColor: 'rgba(251, 191, 36, 0.12)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            animation: 'glow-pulse 2.5s ease-in-out infinite',
          }}
        >
          <Star size={10} fill="rgba(251, 191, 36, 0.9)" color="rgba(251, 191, 36, 0.9)" />
          <span
            style={{
              fontSize: 10,
              fontFamily: 'var(--font-family-mono)',
              fontWeight: 600,
              color: '#FCD34D',
              letterSpacing: '0.05em',
            }}
          >
            FEATURED
          </span>
        </div>
      )}

      {/* Header: logo + name + company */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, paddingRight: tool.is_featured ? 80 : 0 }}>
        <LogoImage tool={tool} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--color-text)',
              margin: 0,
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {highlightText(tool.name, searchTerm)}
          </h3>
          <span
            style={{
              fontSize: 12,
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-family-mono)',
            }}
          >
            {highlightText(tool.company, searchTerm)}
          </span>
        </div>
      </div>

      {/* Badges */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <CategoryBadge category={tool.category} />
        <PricingBadge model={tool.pricing_model} priceStarting={tool.price_starting} />
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 13.5,
          color: 'var(--color-muted)',
          lineHeight: 1.6,
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flex: 1,
        }}
      >
        {highlightText(tool.description, searchTerm)}
      </p>

      {/* Tags */}
      {tool.tags.length > 0 && (
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                padding: '2px 7px',
                borderRadius: 4,
                backgroundColor: 'rgba(136, 136, 170, 0.1)',
                border: '1px solid rgba(136, 136, 170, 0.12)',
                color: 'var(--color-muted)',
                fontSize: 11,
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              #{tag}
            </span>
          ))}
          {tool.tags.length > 3 && (
            <span
              style={{
                padding: '2px 7px',
                borderRadius: 4,
                color: 'var(--color-muted-2)',
                fontSize: 11,
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              +{tool.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer: upvote + visit */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 12,
          borderTop: '1px solid var(--color-border)',
          marginTop: 'auto',
        }}
      >
        <button
          onClick={handleUpvote}
          disabled={alreadyUpvoted || isPending}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 8,
            border: `1px solid ${alreadyUpvoted ? 'rgba(255, 45, 120, 0.3)' : 'var(--color-border)'}`,
            backgroundColor: alreadyUpvoted ? 'rgba(255, 45, 120, 0.1)' : 'transparent',
            color: alreadyUpvoted ? 'var(--color-pink)' : 'var(--color-muted)',
            fontSize: 13,
            fontFamily: 'var(--font-family-mono)',
            fontWeight: 500,
            cursor: alreadyUpvoted ? 'default' : 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            if (!alreadyUpvoted) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 45, 120, 0.08)'
              e.currentTarget.style.borderColor = 'rgba(255, 45, 120, 0.25)'
              e.currentTarget.style.color = 'var(--color-pink)'
            }
          }}
          onMouseLeave={(e) => {
            if (!alreadyUpvoted) {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.color = 'var(--color-muted)'
            }
          }}
        >
          <Heart
            size={13}
            fill={alreadyUpvoted ? 'var(--color-pink)' : 'none'}
          />
          {tool.upvotes.toLocaleString()}
        </button>

        <button
          onClick={handleVisit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 12px',
            borderRadius: 8,
            border: '1px solid rgba(0, 229, 255, 0.2)',
            backgroundColor: 'rgba(0, 229, 255, 0.06)',
            color: 'var(--color-cyan)',
            fontSize: 12,
            fontFamily: 'var(--font-family-mono)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.12)'
            e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.06)'
            e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.2)'
          }}
        >
          Visit
          <ArrowUpRight size={12} />
        </button>
      </div>
    </motion.div>
  )
}
