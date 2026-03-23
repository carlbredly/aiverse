export function SkeletonCard() {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      {/* Header: logo + title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div
          className="shimmer"
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="shimmer" style={{ height: 16, borderRadius: 4, width: '60%' }} />
          <div className="shimmer" style={{ height: 12, borderRadius: 4, width: '40%' }} />
        </div>
      </div>

      {/* Badges row */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <div className="shimmer" style={{ height: 22, borderRadius: 6, width: 90 }} />
        <div className="shimmer" style={{ height: 22, borderRadius: 6, width: 70 }} />
      </div>

      {/* Description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div className="shimmer" style={{ height: 12, borderRadius: 4, width: '100%' }} />
        <div className="shimmer" style={{ height: 12, borderRadius: 4, width: '80%' }} />
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '6px' }}>
        <div className="shimmer" style={{ height: 20, borderRadius: 4, width: 55 }} />
        <div className="shimmer" style={{ height: 20, borderRadius: 4, width: 70 }} />
        <div className="shimmer" style={{ height: 20, borderRadius: 4, width: 50 }} />
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '12px',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div className="shimmer" style={{ height: 28, borderRadius: 6, width: 70 }} />
        <div className="shimmer" style={{ height: 28, borderRadius: 6, width: 60 }} />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
