import { useState, useRef } from 'react'
import { Mail, ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react'
import { useNewsletter } from '../hooks/useNewsletter'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [validationError, setValidationError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { subscribe, isPending, result, reset } = useNewsletter()

  const status = isPending ? 'loading' : (result?.status ?? 'idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError('')

    if (!email.trim()) {
      setValidationError('Please enter your email address.')
      inputRef.current?.focus()
      return
    }
    if (!isValidEmail(email)) {
      setValidationError('Please enter a valid email address.')
      inputRef.current?.focus()
      return
    }

    subscribe(email, {
      onSuccess: () => setEmail(''),
    })
  }

  const handleReset = () => {
    reset()
    setEmail('')
    setValidationError('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const isSuccess = status === 'success'
  const isAlready = status === 'already'
  const isError = status === 'error'
  const showFeedback = isSuccess || isAlready || isError

  return (
    <div>
      {/* Heading */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Mail size={14} color="var(--color-cyan)" />
        <span
          style={{
            fontSize: 12,
            fontFamily: 'var(--font-family-mono)',
            fontWeight: 600,
            color: 'var(--color-muted)',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
          }}
        >
          Stay updated
        </span>
      </div>
      <p
        style={{
          margin: '0 0 14px',
          fontSize: 14,
          color: 'var(--color-text)',
          fontFamily: 'var(--font-family-display)',
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
        Weekly picks of the best new AI tools.{' '}
        <span style={{ color: 'var(--color-muted)' }}>No spam, ever.</span>
      </p>

      {/* Feedback state */}
      {showFeedback ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '11px 16px',
            borderRadius: 10,
            border: `1px solid ${isSuccess ? 'rgba(110,231,183,0.3)' : isAlready ? 'rgba(0,229,255,0.25)' : 'rgba(239,68,68,0.3)'}`,
            backgroundColor: isSuccess
              ? 'rgba(110,231,183,0.06)'
              : isAlready
              ? 'rgba(0,229,255,0.06)'
              : 'rgba(239,68,68,0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            {isSuccess ? (
              <Check size={14} color="#6EE7B7" />
            ) : isAlready ? (
              <Check size={14} color="var(--color-cyan)" />
            ) : (
              <AlertCircle size={14} color="#FCA5A5" />
            )}
            <span
              style={{
                fontSize: 13,
                fontFamily: 'var(--font-family-mono)',
                color: isSuccess ? '#6EE7B7' : isAlready ? 'var(--color-cyan)' : '#FCA5A5',
              }}
            >
              {result?.message}
            </span>
          </div>
          {(isAlready || isError) && (
            <button
              onClick={handleReset}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontFamily: 'var(--font-family-mono)',
                color: 'var(--color-muted)',
                padding: '2px 6px',
                borderRadius: 4,
                transition: 'color 0.15s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)' }}
            >
              Try again
            </button>
          )}
        </div>
      ) : (
        /* Input form */
        <form onSubmit={handleSubmit} noValidate>
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'stretch',
            }}
          >
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                ref={inputRef}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setValidationError('') }}
                disabled={isPending}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: 'var(--color-bg)',
                  border: `1px solid ${validationError ? 'rgba(239,68,68,0.5)' : 'var(--color-border)'}`,
                  borderRadius: 8,
                  color: 'var(--color-text)',
                  fontSize: 13,
                  fontFamily: 'var(--font-family-mono)',
                  outline: 'none',
                  transition: 'border-color 0.15s ease',
                  boxSizing: 'border-box',
                  opacity: isPending ? 0.6 : 1,
                }}
                onFocus={(e) => {
                  if (!validationError) e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'
                }}
                onBlur={(e) => {
                  if (!validationError) e.currentTarget.style.borderColor = 'var(--color-border)'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '10px 18px',
                borderRadius: 8,
                border: '1px solid rgba(0,229,255,0.3)',
                backgroundColor: isPending ? 'rgba(0,229,255,0.06)' : 'rgba(0,229,255,0.1)',
                color: 'var(--color-cyan)',
                fontSize: 13,
                fontFamily: 'var(--font-family-mono)',
                fontWeight: 600,
                cursor: isPending ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!isPending) e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.18)'
              }}
              onMouseLeave={(e) => {
                if (!isPending) e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.1)'
              }}
            >
              {isPending ? (
                <Loader2 size={14} style={{ animation: 'spin 0.8s linear infinite' }} />
              ) : (
                <ArrowRight size={14} />
              )}
              {isPending ? 'Subscribing…' : 'Subscribe'}
            </button>
          </div>

          {validationError && (
            <p
              style={{
                margin: '6px 0 0',
                fontSize: 11,
                color: '#FCA5A5',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              {validationError}
            </p>
          )}
        </form>
      )}
    </div>
  )
}
