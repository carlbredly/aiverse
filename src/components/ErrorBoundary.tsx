import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[AIverse] Render error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div
          style={{
            minHeight: '100vh',
            backgroundColor: '#0A0A0F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            style={{
              maxWidth: 520,
              width: '100%',
              backgroundColor: '#111118',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 12,
              padding: '28px 32px',
            }}
          >
            <h2
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 20,
                fontWeight: 700,
                color: '#F87171',
                margin: '0 0 12px',
              }}
            >
              Something went wrong
            </h2>
            <p style={{ color: '#8888AA', fontSize: 14, margin: '0 0 16px', lineHeight: 1.6 }}>
              The app encountered an error. Check the browser console for details.
            </p>
            {this.state.error && (
              <pre
                style={{
                  backgroundColor: '#0A0A0F',
                  border: '1px solid rgba(239,68,68,0.2)',
                  borderRadius: 8,
                  padding: '12px 14px',
                  fontSize: 12,
                  color: '#FCA5A5',
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  margin: '0 0 20px',
                }}
              >
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '9px 20px',
                borderRadius: 8,
                border: '1px solid rgba(0,229,255,0.3)',
                backgroundColor: 'rgba(0,229,255,0.08)',
                color: '#00E5FF',
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
