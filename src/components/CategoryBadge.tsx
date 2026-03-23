import type { Category } from '../lib/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

const CATEGORY_STYLES: Record<Category, { bg: string; text: string; dot: string }> = {
  'Text Generation': {
    bg: 'rgba(139, 92, 246, 0.15)',
    text: '#A78BFA',
    dot: '#8B5CF6',
  },
  'Image Generation': {
    bg: 'rgba(236, 72, 153, 0.15)',
    text: '#F472B6',
    dot: '#EC4899',
  },
  'Code': {
    bg: 'rgba(0, 229, 255, 0.12)',
    text: '#67E8F9',
    dot: '#00E5FF',
  },
  'Audio': {
    bg: 'rgba(251, 146, 60, 0.15)',
    text: '#FB923C',
    dot: '#F97316',
  },
  'Video': {
    bg: 'rgba(248, 113, 113, 0.15)',
    text: '#F87171',
    dot: '#EF4444',
  },
  'Productivity': {
    bg: 'rgba(52, 211, 153, 0.15)',
    text: '#6EE7B7',
    dot: '#10B981',
  },
  'Search': {
    bg: 'rgba(251, 191, 36, 0.15)',
    text: '#FCD34D',
    dot: '#F59E0B',
  },
  'Data': {
    bg: 'rgba(99, 102, 241, 0.15)',
    text: '#818CF8',
    dot: '#6366F1',
  },
  'Multimodal': {
    bg: 'rgba(255, 45, 120, 0.15)',
    text: '#FF6BA8',
    dot: '#FF2D78',
  },
  'Agent': {
    bg: 'rgba(20, 184, 166, 0.15)',
    text: '#2DD4BF',
    dot: '#14B8A6',
  },
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const styles = CATEGORY_STYLES[category] ?? {
    bg: 'rgba(136, 136, 170, 0.15)',
    text: '#8888AA',
    dot: '#8888AA',
  }

  const padding = size === 'md' ? '5px 10px' : '3px 8px'
  const fontSize = size === 'md' ? '12px' : '11px'

  return (
    <span
      style={{
        backgroundColor: styles.bg,
        color: styles.text,
        padding,
        fontSize,
        fontFamily: 'var(--font-family-mono)',
        fontWeight: 500,
        borderRadius: '6px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: styles.dot,
          flexShrink: 0,
        }}
      />
      {category}
    </span>
  )
}

export { CATEGORY_STYLES }
