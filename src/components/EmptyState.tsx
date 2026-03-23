import { Search, SlidersHorizontal, X } from 'lucide-react'

interface EmptyStateProps {
  onClearFilters: () => void
  hasFilters: boolean
}

export function EmptyState({ onClearFilters, hasFilters }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
      }}
    >
      {/* Illustration */}
      <div
        style={{
          position: 'relative',
          width: 96,
          height: 96,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {hasFilters ? (
            <SlidersHorizontal size={36} color="var(--color-muted-2)" />
          ) : (
            <Search size={36} color="var(--color-muted-2)" />
          )}
        </div>
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-family-display)',
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--color-text)',
          margin: '0 0 8px 0',
        }}
      >
        No tools found
      </h3>

      <p
        style={{
          color: 'var(--color-muted)',
          fontSize: 15,
          lineHeight: 1.6,
          maxWidth: 360,
          margin: '0 0 28px 0',
        }}
      >
        {hasFilters
          ? 'No AI tools match your current filters. Try adjusting your search or clearing some filters.'
          : 'No AI tools have been added yet. Check back soon.'}
      </p>

      {hasFilters && (
        <button
          onClick={onClearFilters}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            borderRadius: 8,
            backgroundColor: 'rgba(0, 229, 255, 0.08)',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            color: 'var(--color-cyan)',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.14)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.08)'
          }}
        >
          <X size={15} />
          Clear all filters
        </button>
      )}
    </div>
  )
}
