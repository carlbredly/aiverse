import type { PricingModel } from '../lib/types'

interface PricingBadgeProps {
  model: PricingModel
  priceStarting?: number | null
  size?: 'sm' | 'md'
}

const PRICING_STYLES: Record<PricingModel, { bg: string; text: string; border: string }> = {
  'Free': {
    bg: 'rgba(16, 185, 129, 0.12)',
    text: '#34D399',
    border: 'rgba(16, 185, 129, 0.3)',
  },
  'Freemium': {
    bg: 'rgba(0, 229, 255, 0.1)',
    text: '#00E5FF',
    border: 'rgba(0, 229, 255, 0.25)',
  },
  'Paid': {
    bg: 'rgba(99, 102, 241, 0.12)',
    text: '#A5B4FC',
    border: 'rgba(99, 102, 241, 0.3)',
  },
  'Open Source': {
    bg: 'rgba(251, 146, 60, 0.12)',
    text: '#FB923C',
    border: 'rgba(251, 146, 60, 0.3)',
  },
  'Enterprise': {
    bg: 'rgba(139, 92, 246, 0.12)',
    text: '#C4B5FD',
    border: 'rgba(139, 92, 246, 0.3)',
  },
}

const PRICING_ICONS: Record<PricingModel, string> = {
  'Free': '✦',
  'Freemium': '◈',
  'Paid': '$',
  'Open Source': '⬡',
  'Enterprise': '◆',
}

export function PricingBadge({ model, priceStarting, size = 'sm' }: PricingBadgeProps) {
  const styles = PRICING_STYLES[model]
  const icon = PRICING_ICONS[model]

  const padding = size === 'md' ? '5px 10px' : '3px 8px'
  const fontSize = size === 'md' ? '12px' : '11px'

  const label =
    model === 'Paid' && priceStarting != null
      ? `$${priceStarting}/mo`
      : model === 'Freemium' && priceStarting != null
      ? `Free · $${priceStarting}/mo`
      : model

  return (
    <span
      style={{
        backgroundColor: styles.bg,
        color: styles.text,
        border: `1px solid ${styles.border}`,
        padding,
        fontSize,
        fontFamily: 'var(--font-family-mono)',
        fontWeight: 500,
        borderRadius: '6px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: fontSize === '12px' ? '10px' : '9px' }}>{icon}</span>
      {label}
    </span>
  )
}
