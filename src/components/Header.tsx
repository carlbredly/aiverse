import { motion } from 'framer-motion'
import { Zap, Globe2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { Globe3D } from './Globe3D'
import { useToolsCount } from '../hooks/useTools'
import type { AiTool } from '../lib/types'

interface HeaderProps {
  searchValue: string
  onSearchChange: (value: string) => void
  tools?: AiTool[]
}

export function Header({ searchValue, onSearchChange, tools }: HeaderProps) {
  const { data: toolCount } = useToolsCount()
  const hasTools = tools && tools.length > 0

  return (
    <header
      style={{
        background: 'linear-gradient(180deg, rgba(0,229,255,0.04) 0%, transparent 100%)',
        borderBottom: '1px solid var(--color-border)',
        padding: '52px 24px 40px',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
        }}
      >
        {/* Logo + wordmark */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
        >
          {/* Icon */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                inset: -4,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,229,255,0.3) 0%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
            <div
              style={{
                position: 'relative',
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'linear-gradient(135deg, rgba(0,229,255,0.2) 0%, rgba(255,45,120,0.15) 100%)',
                border: '1px solid rgba(0,229,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Zap size={26} color="var(--color-cyan)" fill="rgba(0,229,255,0.3)" />
            </div>
          </div>

          {/* Site name */}
          <h1
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'clamp(42px, 7vw, 68px)',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #F0F0FF 0%, #8888AA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AI
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-cyan) 0%, rgba(0,229,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              verse
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'clamp(18px, 3vw, 22px)',
              fontWeight: 500,
              color: 'var(--color-muted)',
              margin: 0,
              textAlign: 'center',
              letterSpacing: '-0.01em',
            }}
          >
            Every AI tool.{' '}
            <span style={{ color: 'var(--color-text)' }}>One place.</span>
          </p>

          {/* Live counter */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 14px',
              borderRadius: 20,
              backgroundColor: 'rgba(0, 229, 255, 0.06)',
              border: '1px solid rgba(0, 229, 255, 0.15)',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: 'var(--color-cyan)',
                boxShadow: '0 0 8px var(--color-cyan)',
                animation: 'glow-pulse 2s ease-in-out infinite',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontFamily: 'var(--font-family-mono)',
                color: 'var(--color-muted)',
              }}
            >
              Tracking{' '}
              <strong style={{ color: 'var(--color-cyan)', fontWeight: 600 }}>
                {toolCount ?? '1000'}+
              </strong>{' '}
              AI tools across{' '}
              <strong style={{ color: 'var(--color-text)', fontWeight: 600 }}>10 categories</strong>
            </span>
          </div>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          style={{ width: '100%' }}
        >
          <SearchBar value={searchValue} onChange={onSearchChange} />
        </motion.div>

        {/* Globe widget — shown when tools are loaded */}
        {hasTools && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            style={{ width: '100%', maxWidth: 860 }}
          >
            {/* Section heading */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <Globe2 size={14} color="var(--color-cyan)" />
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-family-mono)',
                    fontWeight: 600,
                    color: 'var(--color-muted)',
                    letterSpacing: '0.08em',
                  }}
                >
                  AI TOOLS WORLD MAP
                </span>
              </div>
              <Link
                to="/globe"  
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-family-mono)',
                  color: 'var(--color-cyan)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  opacity: 0.8,
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.8' }}
              >
                Full screen →
              </Link>
            </div>

            {/* Globe container */}
            <div
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid rgba(0, 229, 255, 0.12)',
                boxShadow: '0 0 40px rgba(0, 229, 255, 0.06), 0 8px 32px rgba(0,0,0,0.5)',
              }}
            >
              <Globe3D
                tools={tools}
                compact={true}
                height={280}
              />
            </div> 
          </motion.div>
        )}
      </div>
    </header>
  )
}
