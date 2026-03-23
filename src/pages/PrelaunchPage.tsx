import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Sparkles } from 'lucide-react'
import { getLaunchDate } from '../lib/launch'
import { NewsletterForm } from '../components/NewsletterForm'
import { Globe3D } from '../components/Globe3D'
import { useGlobeTools } from '../hooks/useTools'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return useMemo(() => {
    const diff = Math.max(0, target.getTime() - now)
    const s = Math.floor(diff / 1000)
    const days = Math.floor(s / 86400)
    const hours = Math.floor((s % 86400) / 3600)
    const minutes = Math.floor((s % 3600) / 60)
    const seconds = s % 60
    return { days, hours, minutes, seconds, totalMs: diff }
  }, [now, target])
}

function useViewportHeight() {
  const [h, setH] = useState(() => (typeof window !== 'undefined' ? window.innerHeight : 800))
  useEffect(() => {
    const onResize = () => setH(window.innerHeight)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return h
}

function CountBox({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        minWidth: 76,
        padding: '14px 12px',
        borderRadius: 12,
        backgroundColor: 'rgba(17, 17, 24, 0.85)',
        border: '1px solid rgba(0, 229, 255, 0.18)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-family-display)',
          fontSize: 28,
          fontWeight: 800,
          color: 'var(--color-cyan)',
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 10,
          fontFamily: 'var(--font-family-mono)',
          color: 'var(--color-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
        }}
      >
        {label}
      </div>
    </div>
  )
}

export function PrelaunchPage() {
  const launchAt = useMemo(() => getLaunchDate(), [])
  const { days, hours, minutes, seconds, totalMs } = useCountdown(launchAt)
  const vh = useViewportHeight()
  const { data: globeTools = [] } = useGlobeTools()

  const launchLabel = launchAt.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  useEffect(() => {
    document.title = 'Coming Soon — AIverse'
    return () => {
      document.title = 'AIverse'
    }
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 3D globe — background layer (behind site gradients) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.48,
        }}
      >
        <Globe3D tools={globeTools} compact backgroundOnly height={vh} />
      </div>

      {/* Existing AIverse background treatments (unchanged) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,229,255,0.12), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(255,45,120,0.06), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          height: 2,
          background: 'linear-gradient(90deg, var(--color-cyan), var(--color-pink))',
          position: 'relative',
          zIndex: 3,
        }}
      />

      <main
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 640,
          margin: '0 auto',
          padding: 'clamp(32px, 8vw, 72px) 24px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 28,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
        >
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                inset: -6,
                borderRadius: 18,
                background: 'radial-gradient(circle, rgba(0,229,255,0.25) 0%, transparent 70%)',
                filter: 'blur(12px)',
              }}
            />
            <div
              style={{
                position: 'relative',
                width: 64,
                height: 64,
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(0,229,255,0.22) 0%, rgba(255,45,120,0.14) 100%)',
                border: '1px solid rgba(0,229,255,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Zap size={32} color="var(--color-cyan)" fill="rgba(0,229,255,0.25)" />
            </div>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'clamp(40px, 10vw, 56px)',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #F0F0FF 0%, #8888AA 55%, var(--color-cyan) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AI
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-cyan), var(--color-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              verse
            </span>
          </h1>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 999,
              backgroundColor: 'rgba(255, 45, 120, 0.08)',
              border: '1px solid rgba(255, 45, 120, 0.22)',
            }}
          >
            <Sparkles size={14} color="var(--color-pink)" />
            <span
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-family-mono)',
                fontWeight: 600,
                color: 'var(--color-pink)',
                letterSpacing: '0.06em',
              }}
            >
              PRE-LAUNCH
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
          style={{
            margin: 0,
            fontSize: 'clamp(16px, 3.5vw, 18px)',
            color: 'var(--color-muted)',
            lineHeight: 1.65,
            maxWidth: 480,
          }}
        >
          The full AI tools directory goes live on{' '}
          <strong style={{ color: 'var(--color-text)' }}>March 30</strong>. You’ll get search, filters,
          our 3D globe, and more — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          style={{ width: '100%' }}
        >
          <p
            style={{
              margin: '0 0 14px',
              fontSize: 11,
              fontFamily: 'var(--font-family-mono)',
              color: 'var(--color-muted-2)',
              letterSpacing: '0.08em',
            }}
          >
            OFFICIAL OPENING — MARCH 30
          </p>
          <p
            style={{
              margin: '0 0 20px',
              fontSize: 14,
              color: 'var(--color-cyan)',
              fontFamily: 'var(--font-family-mono)',
            }}
          >
            {launchLabel}
          </p>

          {totalMs > 0 ? (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <CountBox value={String(days)} label="Days" />
              <CountBox value={pad(hours)} label="Hours" />
              <CountBox value={pad(minutes)} label="Minutes" />
              <CountBox value={pad(seconds)} label="Seconds" />
            </div>
          ) : (
            <p style={{ color: 'var(--color-cyan)', fontFamily: 'var(--font-family-mono)', fontSize: 14 }}>
              We’re live — refresh the page.
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          style={{
            width: '100%',
            maxWidth: 520,
            marginTop: 8,
            padding: '24px 22px',
            borderRadius: 14,
            border: '1px solid var(--color-border)',
            background:
              'linear-gradient(135deg, rgba(0,229,255,0.04) 0%, rgba(255,45,120,0.03) 100%)',
            textAlign: 'left' as const,
          }}
        >
          <NewsletterForm />
        </motion.div>
      </main>
    </div>
  )
}
