import { useRef, useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const PLACEHOLDER_CYCLE = [
  'Search GPT-4, Midjourney, Claude...',
  'Search Cursor, Copilot, Runway...',
  'Search ElevenLabs, Suno, Whisper...',
  'Search LangChain, AutoGPT, Mistral...',
  'Search Perplexity, Gemini, DALL-E...',
]

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [displayPlaceholder, setDisplayPlaceholder] = useState('')
  const [isTypingPlaceholder, setIsTypingPlaceholder] = useState(true)
  const [isFocused, setIsFocused] = useState(false)

  // Animated placeholder cycling
  useEffect(() => {
    if (value) return

    const target = PLACEHOLDER_CYCLE[placeholderIndex]
    let charIndex = 0
    let timeoutId: ReturnType<typeof setTimeout>

    if (isTypingPlaceholder) {
      const type = () => {
        if (charIndex <= target.length) {
          setDisplayPlaceholder(target.slice(0, charIndex))
          charIndex++
          timeoutId = setTimeout(type, 40)
        } else {
          timeoutId = setTimeout(() => setIsTypingPlaceholder(false), 2200)
        }
      }
      timeoutId = setTimeout(type, 400)
    } else {
      const erase = () => {
        if (charIndex >= 0) {
          setDisplayPlaceholder(target.slice(0, charIndex))
          charIndex--
          timeoutId = setTimeout(erase, 22)
        } else {
          setPlaceholderIndex((i) => (i + 1) % PLACEHOLDER_CYCLE.length)
          setIsTypingPlaceholder(true)
        }
      }
      charIndex = target.length
      timeoutId = setTimeout(erase, 300)
    }

    return () => clearTimeout(timeoutId)
  }, [placeholderIndex, isTypingPlaceholder, value])

  // Global "/" keyboard shortcut to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        onChange('')
        inputRef.current?.blur()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onChange])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 680,
        margin: '0 auto',
      }}
    >
      {/* Glow backdrop */}
      {isFocused && (
        <div
          style={{
            position: 'absolute',
            inset: -1,
            borderRadius: 14,
            background: 'rgba(0, 229, 255, 0.06)',
            boxShadow: '0 0 0 1px rgba(0, 229, 255, 0.3), 0 0 30px rgba(0, 229, 255, 0.08)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--color-surface)',
          border: `1px solid ${isFocused ? 'rgba(0, 229, 255, 0.35)' : 'var(--color-border)'}`,
          borderRadius: 12,
          transition: 'border-color 0.2s ease',
          zIndex: 1,
        }}
      >
        <Search
          size={18}
          style={{
            position: 'absolute',
            left: 18,
            color: isFocused ? 'var(--color-cyan)' : 'var(--color-muted-2)',
            transition: 'color 0.2s ease',
            flexShrink: 0,
            pointerEvents: 'none',
          }}
        />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={displayPlaceholder}
          spellCheck={false}
          style={{
            width: '100%',
            padding: '14px 48px 14px 50px',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--color-text)',
            fontSize: 16,
            fontFamily: 'var(--font-family-body)',
          }}
        />

        {/* Right slot: shortcut hint or clear button */}
        <div
          style={{
            position: 'absolute',
            right: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {value ? (
            <button
              onClick={() => {
                onChange('')
                inputRef.current?.focus()
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                borderRadius: 6,
                backgroundColor: 'rgba(136, 136, 170, 0.15)',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-muted)',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(136, 136, 170, 0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(136, 136, 170, 0.15)'
              }}
            >
              <X size={13} />
            </button>
          ) : (
            <kbd
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px 7px',
                borderRadius: 5,
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-muted-2)',
                fontSize: 12,
                fontFamily: 'var(--font-family-mono)',
                lineHeight: 1.5,
                opacity: isFocused ? 0 : 0.7,
                transition: 'opacity 0.2s ease',
              }}
            >
              /
            </kbd>
          )}
        </div>
      </div>
    </div>
  )
}
