import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Globe2, Maximize2, X } from 'lucide-react'
import type { AiTool, Category, CountryCluster } from '../lib/types'
import { CATEGORY_COLORS, buildClusters } from '../lib/globe-utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GlobeInstance = any

interface Globe3DProps {
  tools: AiTool[]
  compact?: boolean
  /** Full-viewport decorative globe: no UI chrome, no pointer interaction */
  backgroundOnly?: boolean
  selectedCategory?: Category | null
  height?: number
}

function GlobeTooltip({
  cluster,
  position,
}: {
  cluster: CountryCluster | null
  position: { x: number; y: number }
}) {
  if (!cluster) return null

  const topCategories = Object.entries(
    cluster.tools.reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + 1
      return acc
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x + 14,
        top: position.y - 10,
        pointerEvents: 'none',
        zIndex: 100,
        backgroundColor: 'rgba(17,17,24,0.97)',
        border: '1px solid rgba(0,229,255,0.25)',
        borderRadius: 10,
        padding: '10px 14px',
        minWidth: 180,
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: '#F0F0FF', fontFamily: 'system-ui' }}>
        {cluster.country_name}
      </p>
      <p style={{ margin: '0 0 8px', fontSize: 11, color: '#00E5FF', fontFamily: 'monospace' }}>
        {cluster.count} AI tool{cluster.count !== 1 ? 's' : ''}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {topCategories.map(([cat, count]) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: CATEGORY_COLORS[cat] ?? '#8888AA', flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: '#8888AA', fontFamily: 'monospace' }}>
              {cat} ({count})
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Globe3D({
  tools,
  compact = false,
  backgroundOnly = false,
  selectedCategory,
  height,
}: Globe3DProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [GlobeEl, setGlobeEl] = useState<React.ComponentType<any> | null>(null)
  const globeRef = useRef<GlobeInstance>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(800)
  const [hoveredCluster, setHoveredCluster] = useState<CountryCluster | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const navigate = useNavigate()

  const containerHeight =
    height ?? (backgroundOnly ? window.innerHeight : compact ? 280 : window.innerHeight)

  const clusters = useMemo(() => buildClusters(tools, selectedCategory), [tools, selectedCategory])

  const pointsData = useMemo(
    () =>
      clusters.map((c) => ({
        ...c,
        color: selectedCategory ? (CATEGORY_COLORS[selectedCategory] ?? '#00E5FF') : '#00E5FF',
        altitude: Math.min(0.02 + c.count * 0.004, 0.25),
        radius: Math.min(0.3 + c.count * 0.015, 1.4),
      })),
    [clusters, selectedCategory]
  )

  // Dynamically load react-globe.gl as a React component
  useEffect(() => {
    import('react-globe.gl')
      .then((mod) => {
        // IMPORTANT: wrap in arrow function so React doesn't call it during setState
        setGlobeEl(() => mod.default as React.ComponentType<GlobeInstance>)
      })
      .catch((err) => {
        console.warn('[AIverse] Globe failed to load:', err)
      })
  }, [])

  // Set camera position + controls once globe is mounted
  useEffect(() => {
    if (!GlobeEl || !globeRef.current) return

    const timer = setTimeout(() => {
      try {
        const altitude = backgroundOnly ? 2.15 : compact ? 2.5 : 2.0
        globeRef.current?.pointOfView?.({ lat: 20, lng: 15, altitude }, 0)
        const controls = globeRef.current?.controls?.()
        if (controls) {
          controls.autoRotate = true
          controls.autoRotateSpeed = backgroundOnly ? 0.35 : compact ? 1.2 : 0.5
          controls.enableZoom = !compact && !backgroundOnly
          controls.enablePan = false
          controls.minDistance = compact || backgroundOnly ? 240 : 150
          controls.maxDistance = compact || backgroundOnly ? 360 : 500
        }
      } catch (err) {
        console.warn('[AIverse] Globe controls setup failed:', err)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [GlobeEl, compact, backgroundOnly])

  // Responsive width
  useEffect(() => {
    const update = () => {
      if (wrapperRef.current) setWidth(wrapperRef.current.clientWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const handlePointClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (point: any) => {
      if (backgroundOnly) return
      const cluster = point as CountryCluster
      // Always navigate to ?country=XX — the receiving page shows the panel/list
      navigate(`/globe?country=${cluster.country_code}`)
    },
    [navigate, backgroundOnly]
  )

  const handlePointHover = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (point: any, _prev: any, evt: MouseEvent) => {
      if (backgroundOnly) {
        setHoveredCluster(null)
        return
      }
      setHoveredCluster(point ?? null)
      if (evt && wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect()
        setTooltipPos({ x: evt.clientX - rect.left, y: evt.clientY - rect.top })
      }
    },
    [backgroundOnly]
  )

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        width: '100%',
        height: containerHeight,
        overflow: 'hidden',
        borderRadius: compact && !backgroundOnly ? 12 : 0,
        backgroundColor: '#0A0A0F',
      }}
    >
      {/* Loading state */}
      {!GlobeEl && (
        <div
          style={{
            position: 'absolute', inset: 0, display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 12, backgroundColor: '#0A0A0F', zIndex: 1,
          }}
        >
          <Globe2 size={40} color="rgba(0,229,255,0.4)" />
          <p style={{ fontSize: 13, color: '#8888AA', fontFamily: 'monospace', margin: 0 }}>
            Loading 3D globe…
          </p>
        </div>
      )}

      {/* Globe rendered as a JSX React component */}
      {GlobeEl && (
        <GlobeEl
          ref={globeRef}
          width={width}
          height={containerHeight}
          backgroundColor="#0A0A0F"
          globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
          atmosphereColor="rgba(0,229,255,0.12)"
          atmosphereAltitude={0.15}
          pointsData={pointsData}
          pointLat="lat"
          pointLng="lng"
          pointAltitude="altitude"
          pointRadius="radius"
          pointColor="color"
          pointsMerge={false}
          pointResolution={8}
          onPointClick={handlePointClick}
          onPointHover={handlePointHover}
          enablePointerInteraction={!backgroundOnly}
        />
      )}

      {/* Compact mode overlays */}
      {compact && GlobeEl && !backgroundOnly && (
        <>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, background: 'linear-gradient(transparent, rgba(10,10,15,0.9))', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', backgroundColor: 'rgba(10,10,15,0.8)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: 20, backdropFilter: 'blur(8px)' }}>
            <Globe2 size={12} color="#00E5FF" />
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#8888AA' }}>
              <strong style={{ color: '#00E5FF' }}>{clusters.length}</strong> countries
              {' · '}
              <strong style={{ color: '#F0F0FF' }}>{tools.length}</strong> tools
            </span>
          </div>
          <button
            onClick={() => navigate('/globe')}
            style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, backgroundColor: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.25)', color: '#00E5FF', fontSize: 12, fontFamily: 'monospace', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.15s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.15)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.08)' }}
          >
            <Maximize2 size={11} />
            Explore world map
          </button>
        </>
      )}

      {/* Full mode back button */}
      {!compact && GlobeEl && !backgroundOnly && (
        <button
          onClick={() => navigate('/')}
          style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 8, backgroundColor: 'rgba(10,10,15,0.8)', border: '1px solid rgba(0,229,255,0.2)', color: '#00E5FF', fontSize: 13, fontFamily: 'monospace', cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 20, transition: 'all 0.15s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.5)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.2)' }}
        >
          <X size={13} />
          Back to directory
        </button>
      )}

      {/* Hover tooltip */}
      {hoveredCluster && GlobeEl && !backgroundOnly && (
        <GlobeTooltip cluster={hoveredCluster} position={tooltipPos} />
      )}
    </div>
  )
}
