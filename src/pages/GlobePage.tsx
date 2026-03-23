import { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Globe2, Search, X, ArrowUpRight, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
import { Globe3D } from '../components/Globe3D'
import { CATEGORY_COLORS, COUNTRY_NAMES, buildClusters } from '../lib/globe-utils'
import { ToolDrawer } from '../components/ToolDrawer'
import { CategoryBadge } from '../components/CategoryBadge'
import { useGlobeTools } from '../hooks/useTools'
import type { AiTool, Category, CountryCluster } from '../lib/types'
import { CATEGORIES } from '../lib/types'

// ── Responsive hook ──────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth)
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return width
}

// ── MiniToolCard ─────────────────────────────────────────────────────────────
function MiniToolCard({ tool, onClick }: { tool: AiTool; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  const initials = tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  const colors = ['#8B5CF6', '#EC4899', '#00E5FF', '#F97316', '#EF4444', '#10B981', '#F59E0B', '#6366F1', '#FF2D78', '#14B8A6']
  const bgColor = colors[tool.name.charCodeAt(0) % colors.length]

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '10px 12px',
        borderRadius: 8,
        border: `1px solid ${hovered ? 'rgba(0,229,255,0.25)' : 'var(--color-border)'}`,
        backgroundColor: hovered ? 'rgba(0,229,255,0.04)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      <div
        style={{
          width: 34, height: 34, borderRadius: 8, flexShrink: 0, overflow: 'hidden',
          backgroundColor: !tool.logo_url || imgError ? `${bgColor}22` : 'var(--color-bg)',
          border: `1px solid ${!tool.logo_url || imgError ? `${bgColor}44` : 'var(--color-border)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: !tool.logo_url || imgError ? 0 : 4,
        }}
      >
        {!tool.logo_url || imgError ? (
          <span style={{ fontFamily: 'var(--font-family-display)', fontSize: 11, fontWeight: 700, color: bgColor }}>
            {initials}
          </span>
        ) : (
          <img src={tool.logo_url} alt={tool.name} onError={() => setImgError(true)} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: '0 0 2px', fontSize: 12, fontWeight: 700, color: 'var(--color-text)', fontFamily: 'var(--font-family-display)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {tool.name}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
          <CategoryBadge category={tool.category} size="sm" />
        </div>
        <p style={{ margin: 0, fontSize: 10, color: 'var(--color-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {tool.description.slice(0, 60)}…
        </p>
      </div>

      <ArrowUpRight size={13} color="var(--color-muted-2)" style={{ flexShrink: 0 }} />
    </div>
  )
}

// ── CountryPanel ─────────────────────────────────────────────────────────────
function CountryPanel({
  cluster,
  onToolClick,
  onClose,
}: {
  cluster: CountryCluster
  onToolClick: (t: AiTool) => void
  onClose: () => void
}) {
  const [search, setSearch] = useState('')

  const filtered = cluster.tools.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  )

  const categoryBreakdown = Object.entries(
    cluster.tools.reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + 1
      return acc
    }, {})
  ).sort((a, b) => b[1] - a[1])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--color-border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--color-text)', fontFamily: 'var(--font-family-display)' }}>
              {cluster.country_name}
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-cyan)', fontFamily: 'var(--font-family-mono)' }}>
              {cluster.count} AI tools
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={13} />
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
          {categoryBreakdown.slice(0, 5).map(([cat, count]) => (
            <span
              key={cat}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '2px 8px', borderRadius: 12,
                backgroundColor: `${CATEGORY_COLORS[cat] ?? '#8888AA'}18`,
                border: `1px solid ${CATEGORY_COLORS[cat] ?? '#8888AA'}33`,
                color: CATEGORY_COLORS[cat] ?? '#8888AA',
                fontSize: 10, fontFamily: 'var(--font-family-mono)',
              }}
            >
              {cat} · {count}
            </span>
          ))}
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={12} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted-2)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Filter tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '7px 10px 7px 30px',
              backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)',
              borderRadius: 7, color: 'var(--color-text)', fontSize: 12,
              fontFamily: 'var(--font-family-mono)', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.length === 0 ? (
          <p style={{ color: 'var(--color-muted)', fontSize: 12, textAlign: 'center', padding: '20px 0' }}>
            No matching tools
          </p>
        ) : (
          filtered.map((tool) => (
            <MiniToolCard key={tool.id} tool={tool} onClick={() => onToolClick(tool)} />
          ))
        )}
      </div>
    </div>
  )
}

// ── CategoryPanel ─────────────────────────────────────────────────────────────
function CategoryPanel({
  tools,
  clusters,
  selectedCategory,
  setSelectedCategory,
  totalByCategory,
}: {
  tools: AiTool[]
  clusters: CountryCluster[]
  selectedCategory: Category | null
  setSelectedCategory: (c: Category | null) => void
  totalByCategory: Record<string, number>
}) {
  const [catSearch, setCatSearch] = useState('')

  const filteredCategories = CATEGORIES.filter((c) =>
    c.toLowerCase().includes(catSearch.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid var(--color-border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Globe2 size={18} color="#00E5FF" />
          <span style={{ fontFamily: 'var(--font-family-display)', fontSize: 18, fontWeight: 800, background: 'linear-gradient(135deg, #00E5FF, #FF2D78)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            AIverse
          </span>
          <span style={{ fontSize: 11, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>
            World Map
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
          <StatBox label="AI Tools" value={String(tools.length)} color="#00E5FF" />
          <StatBox label="Countries" value={String(clusters.length)} color="#FF2D78" />
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={12} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted-2)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Filter categories..."
            value={catSearch}
            onChange={(e) => setCatSearch(e.target.value)}
            style={{
              width: '100%', padding: '7px 10px 7px 30px',
              backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)',
              borderRadius: 7, color: 'var(--color-text)', fontSize: 12,
              fontFamily: 'var(--font-family-mono)', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
        <button
          onClick={() => setSelectedCategory(null)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', padding: '8px 10px', borderRadius: 8, marginBottom: 4,
            border: `1px solid ${selectedCategory === null ? 'rgba(0,229,255,0.4)' : 'transparent'}`,
            backgroundColor: selectedCategory === null ? 'rgba(0,229,255,0.08)' : 'transparent',
            cursor: 'pointer', transition: 'all 0.15s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#00E5FF', boxShadow: '0 0 6px #00E5FF' }} />
            <span style={{ fontSize: 13, color: selectedCategory === null ? '#00E5FF' : 'var(--color-text)', fontFamily: 'var(--font-family-mono)', fontWeight: selectedCategory === null ? 600 : 400 }}>
              All categories
            </span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>
            {tools.length}
          </span>
        </button>

        {filteredCategories.map((cat) => {
          const active = selectedCategory === cat
          const color = CATEGORY_COLORS[cat] ?? '#8888AA'
          const count = totalByCategory[cat] ?? 0
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(active ? null : cat)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '8px 10px', borderRadius: 8, marginBottom: 4,
                border: `1px solid ${active ? `${color}55` : 'transparent'}`,
                backgroundColor: active ? `${color}12` : 'transparent',
                cursor: 'pointer', transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)' }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, boxShadow: active ? `0 0 8px ${color}` : 'none', flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: active ? color : 'var(--color-text)', fontFamily: 'var(--font-family-mono)', fontWeight: active ? 600 : 400, textAlign: 'left' }}>
                  {cat}
                </span>
              </div>
              <span style={{ fontSize: 11, color: active ? color : 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-border)', flexShrink: 0 }}>
        <p style={{ margin: '0 0 8px', fontSize: 10, color: 'var(--color-muted-2)', fontFamily: 'var(--font-family-mono)', letterSpacing: '0.06em' }}>
          CLICK A POINT ON THE GLOBE TO EXPLORE
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <LegendItem color="#00E5FF" label="Point = country cluster" />
          <LegendItem color="#FF2D78" label="Larger = more tools" />
          <LegendItem color="#FCD34D" label="Height = density" />
        </div>
      </div>
    </div>
  )
}

// ── GlobePage ─────────────────────────────────────────────────────────────────
export function GlobePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  // Mobile: controls visibility of the bottom sheet panel
  const [panelOpen, setPanelOpen] = useState(false)

  const { data: tools = [], isLoading } = useGlobeTools()

  const windowWidth = useWindowWidth()
  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth < 1100

  const sidebarWidth = isTablet ? 240 : 300

  const selectedCountryCode = searchParams.get('country')

  const clusters = useMemo(() => buildClusters(tools, selectedCategory), [tools, selectedCategory])

  const selectedCluster = useMemo(
    () => clusters.find((c) => c.country_code === selectedCountryCode) ?? null,
    [clusters, selectedCountryCode]
  )

  const totalByCategory = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const t of tools) counts[t.category] = (counts[t.category] ?? 0) + 1
    return counts
  }, [tools])

  const handleCountryClose = useCallback(() => {
    setSearchParams({})
    if (isMobile) setPanelOpen(false)
  }, [setSearchParams, isMobile])

  // Auto-open panel when a country is selected on mobile
  useEffect(() => {
    if (isMobile && selectedCountryCode) setPanelOpen(true)
  }, [isMobile, selectedCountryCode])

  const panelContent = selectedCluster ? (
    <CountryPanel
      cluster={selectedCluster}
      onToolClick={(t) => { setSelectedTool(t); if (isMobile) setPanelOpen(false) }}
      onClose={handleCountryClose}
    />
  ) : (
    <CategoryPanel
      tools={tools}
      clusters={clusters}
      selectedCategory={selectedCategory}
      setSelectedCategory={(c) => { setSelectedCategory(c); if (isMobile) setPanelOpen(false) }}
      totalByCategory={totalByCategory}
    />
  )

  // ── Desktop / Tablet layout ──
  if (!isMobile) {
    return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#0A0A0F' }}>
        {/* Sidebar */}
        <div
          style={{
            width: sidebarWidth, flexShrink: 0,
            borderRight: '1px solid var(--color-border)',
            display: 'flex', flexDirection: 'column',
            backgroundColor: 'var(--color-surface)', zIndex: 10,
          }}
        >
          {panelContent}
        </div>

        {/* Globe */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {isLoading ? <GlobeLoader toolCount={tools.length} /> : (
            <Globe3D
              tools={tools}
              compact={false}
              selectedCategory={selectedCategory}
              height={window.innerHeight}
            />
          )}
          <CategoryActiveBadge category={selectedCategory} onClear={() => setSelectedCategory(null)} />
        </div>

        <ToolDrawer tool={selectedTool} onClose={() => setSelectedTool(null)} />
      </div>
    )
  }

  // ── Mobile layout ──
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100dvh', overflow: 'hidden', backgroundColor: '#0A0A0F' }}>
      {/* Globe: full screen */}
      {isLoading ? (
        <GlobeLoader toolCount={tools.length} />
      ) : (
        <div style={{ position: 'absolute', inset: 0 }}>
          <Globe3D
            tools={tools}
            compact={false}
            selectedCategory={selectedCategory}
            height={window.innerHeight}
          />
        </div>
      )}

      {/* Top bar (mobile) */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 14px',
          background: 'linear-gradient(to bottom, rgba(10,10,15,0.9), transparent)',
          zIndex: 20, pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, pointerEvents: 'auto' }}>
          <Globe2 size={16} color="#00E5FF" />
          <span style={{ fontFamily: 'var(--font-family-display)', fontSize: 16, fontWeight: 800, background: 'linear-gradient(135deg, #00E5FF, #FF2D78)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            AIverse
          </span>
          <span style={{ fontSize: 10, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>
            World Map
          </span>
        </div>

        {selectedCategory && (
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px',
              borderRadius: 16, backgroundColor: 'rgba(10,10,15,0.85)',
              border: `1px solid ${CATEGORY_COLORS[selectedCategory] ?? '#00E5FF'}55`,
              backdropFilter: 'blur(8px)', pointerEvents: 'auto',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: CATEGORY_COLORS[selectedCategory], boxShadow: `0 0 6px ${CATEGORY_COLORS[selectedCategory]}` }} />
            <span style={{ fontSize: 11, color: CATEGORY_COLORS[selectedCategory], fontFamily: 'var(--font-family-mono)' }}>
              {selectedCategory}
            </span>
            <button onClick={() => setSelectedCategory(null)} style={{ display: 'flex', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-muted)' }}>
              <X size={11} />
            </button>
          </div>
        )}
      </div>

      {/* Floating toggle button (bottom-left) */}
      <button
        onClick={() => setPanelOpen((v) => !v)}
        style={{
          position: 'absolute', bottom: panelOpen ? 'calc(60vh + 12px)' : 24, left: 14,
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '10px 16px', borderRadius: 24,
          backgroundColor: 'rgba(10,10,15,0.92)',
          border: '1px solid rgba(0,229,255,0.3)',
          color: '#00E5FF', fontSize: 13, fontFamily: 'var(--font-family-mono)',
          cursor: 'pointer', backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          zIndex: 30, transition: 'bottom 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <SlidersHorizontal size={14} />
        {selectedCluster ? selectedCluster.country_name : selectedCategory ? selectedCategory : 'Filters'}
        {panelOpen ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
      </button>

      {/* Bottom sheet overlay (mobile) */}
      {panelOpen && (
        <div
          onClick={() => setPanelOpen(false)}
          style={{ position: 'absolute', inset: 0, zIndex: 39, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* Bottom sheet panel */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '62vh',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          borderRadius: '16px 16px 0 0',
          zIndex: 40,
          display: 'flex', flexDirection: 'column',
          transform: panelOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          overflow: 'hidden',
        }}
      >
        {/* Drag handle */}
        <div
          style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px', flexShrink: 0, cursor: 'pointer' }}
          onClick={() => setPanelOpen(false)}
        >
          <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.15)' }} />
        </div>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          {panelContent}
        </div>
      </div>

      <ToolDrawer tool={selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function GlobeLoader({ toolCount }: { toolCount: number }) {
  return (
    <div
      style={{
        position: 'absolute', inset: 0, display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 12, backgroundColor: '#0A0A0F',
      }}
    >
      <Globe2 size={48} color="rgba(0,229,255,0.4)" style={{ animation: 'glow-pulse 1.5s ease-in-out infinite' }} />
      <p style={{ fontSize: 14, color: '#8888AA', fontFamily: 'var(--font-family-mono)', margin: 0 }}>
        Loading {toolCount ? `${toolCount} AI tools…` : 'globe data…'}
      </p>
    </div>
  )
}

function CategoryActiveBadge({ category, onClear }: { category: Category | null; onClear: () => void }) {
  if (!category) return null
  return (
    <div
      style={{
        position: 'absolute', top: 16, right: 16, zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px',
        borderRadius: 20, backgroundColor: 'rgba(10,10,15,0.85)',
        border: `1px solid ${CATEGORY_COLORS[category] ?? '#00E5FF'}55`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: CATEGORY_COLORS[category], boxShadow: `0 0 8px ${CATEGORY_COLORS[category]}` }} />
      <span style={{ fontSize: 12, fontFamily: 'var(--font-family-mono)', color: CATEGORY_COLORS[category] }}>
        {category}
      </span>
      <button
        onClick={onClear}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', padding: 0 }}
      >
        <X size={12} />
      </button>
    </div>
  )
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ padding: '8px 10px', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 8 }}>
      <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color, fontFamily: 'var(--font-family-display)', lineHeight: 1.1 }}>
        {value}
      </p>
      <p style={{ margin: '2px 0 0', fontSize: 10, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>
        {label}
      </p>
    </div>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
      <span style={{ fontSize: 10, color: 'var(--color-muted-2)', fontFamily: 'var(--font-family-mono)' }}>
        {label}
      </span>
    </div>
  )
}

// Unused export kept for compatibility
export { COUNTRY_NAMES }
