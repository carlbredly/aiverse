import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Send, Check, AlertCircle, Loader2, Plus, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSubmitTool } from '../hooks/useAdmin'
import { CATEGORIES, PRICING_MODELS } from '../lib/types'
import type { Category, PricingModel } from '../lib/types'

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  backgroundColor: 'var(--color-bg)',
  border: '1px solid var(--color-border)',
  borderRadius: 8,
  color: 'var(--color-text)',
  fontSize: 14,
  fontFamily: 'var(--font-family-mono)',
  outline: 'none',
  boxSizing: 'border-box' as const,
  transition: 'border-color 0.15s ease',
}

const labelStyle = {
  display: 'block' as const,
  fontSize: 12,
  fontFamily: 'var(--font-family-mono)',
  fontWeight: 600 as const,
  color: 'var(--color-muted)',
  letterSpacing: '0.06em',
  marginBottom: 6,
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label style={labelStyle}>{label.toUpperCase()}{required && <span style={{ color: 'var(--color-pink)', marginLeft: 4 }}>*</span>}</label>
      {children}
    </div>
  )
}

export function SubmitToolPage() {
  const { mutate, isPending, isSuccess, isError, error } = useSubmitTool()

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '' as Category | '',
    pricing_model: '' as PricingModel | '',
    website_url: '',
    logo_url: '',
    company: '',
    founded_year: '',
    submitter_email: '',
    notes: '',
  })
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((e2) => { const n = { ...e2 }; delete n[key]; return n })
  }

  const addTag = () => {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, '-')
    if (t && !tags.includes(t) && tags.length < 8) {
      setTags((prev) => [...prev, t])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.description.trim()) e.description = 'Required'
    if (!form.category) e.category = 'Required'
    if (!form.pricing_model) e.pricing_model = 'Required'
    if (!form.website_url.trim()) e.website_url = 'Required'
    else if (!/^https?:\/\/.+/.test(form.website_url)) e.website_url = 'Must start with https://'
    if (form.submitter_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.submitter_email)) {
      e.submitter_email = 'Invalid email'
    }
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    mutate({
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category as Category,
      pricing_model: form.pricing_model as PricingModel,
      website_url: form.website_url.trim(),
      logo_url: form.logo_url.trim(),
      company: form.company.trim(),
      founded_year: form.founded_year ? Number(form.founded_year) : null,
      tags,
      submitter_email: form.submitter_email.trim(),
      notes: form.notes.trim(),
    })
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--color-cyan), var(--color-pink))' }} />

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', padding: '0 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--color-muted)', fontSize: 13, fontFamily: 'var(--font-family-mono)', textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Back to directory
          </Link>
          <Link to="/" style={{ fontFamily: 'var(--font-family-display)', fontSize: 16, fontWeight: 800, background: 'linear-gradient(135deg, var(--color-cyan), var(--color-pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textDecoration: 'none' }}>AIverse</Link>
        </div>
      </nav>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}>

          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 800, color: 'var(--color-text)', margin: '0 0 10px' }}>
              Submit an AI Tool
            </h1>
            <p style={{ margin: 0, fontSize: 15, color: 'var(--color-muted)', lineHeight: 1.6 }}>
              Found an AI tool missing from the directory? Submit it here — our team will review and add it within 48h.
            </p>
          </div>

          {/* Success state */}
          {isSuccess ? (
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: '32px', borderRadius: 14, border: '1px solid rgba(110,231,183,0.3)', backgroundColor: 'rgba(110,231,183,0.06)', textAlign: 'center' }}>
              <Check size={40} color="#6EE7B7" style={{ margin: '0 auto 16px' }} />
              <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: 22, fontWeight: 800, color: 'var(--color-text)', margin: '0 0 8px' }}>Submission received!</h2>
              <p style={{ color: '#6EE7B7', fontFamily: 'var(--font-family-mono)', fontSize: 14, margin: '0 0 24px' }}>Thank you — we'll review and add it to the directory within 48h.</p>
              <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 8, border: '1px solid rgba(0,229,255,0.3)', backgroundColor: 'rgba(0,229,255,0.08)', color: 'var(--color-cyan)', fontFamily: 'var(--font-family-mono)', fontSize: 13, textDecoration: 'none' }}>
                Back to directory →
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Global error */}
              {isError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', backgroundColor: 'rgba(239,68,68,0.06)' }}>
                  <AlertCircle size={16} color="#FCA5A5" />
                  <p style={{ margin: 0, fontSize: 13, color: '#FCA5A5', fontFamily: 'var(--font-family-mono)' }}>
                    {(error as Error)?.message ?? 'Submission failed. Please try again.'}
                  </p>
                </div>
              )}

              {/* Required fields */}
              <div style={{ padding: '24px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <p style={{ margin: '0 0 4px', fontSize: 12, color: 'var(--color-muted-2)', fontFamily: 'var(--font-family-mono)', letterSpacing: '0.06em' }}>REQUIRED INFORMATION</p>

                <Field label="Tool name" required>
                  <input style={{ ...inputStyle, borderColor: errors.name ? 'rgba(239,68,68,0.5)' : undefined }} placeholder="e.g. ChatGPT" value={form.name} onChange={set('name')} onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }} onBlur={(e) => { e.currentTarget.style.borderColor = errors.name ? 'rgba(239,68,68,0.5)' : 'var(--color-border)' }} />
                  {errors.name && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#FCA5A5', fontFamily: 'var(--font-family-mono)' }}>{errors.name}</p>}
                </Field>

                <Field label="Website URL" required>
                  <input style={{ ...inputStyle, borderColor: errors.website_url ? 'rgba(239,68,68,0.5)' : undefined }} placeholder="https://example.com" value={form.website_url} onChange={set('website_url')} onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }} onBlur={(e) => { e.currentTarget.style.borderColor = errors.website_url ? 'rgba(239,68,68,0.5)' : 'var(--color-border)' }} />
                  {errors.website_url && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#FCA5A5', fontFamily: 'var(--font-family-mono)' }}>{errors.website_url}</p>}
                </Field>

                <Field label="Short description (1–2 sentences)" required>
                  <textarea
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 80, borderColor: errors.description ? 'rgba(239,68,68,0.5)' : undefined }}
                    placeholder="What does this tool do?"
                    value={form.description}
                    onChange={set('description')}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = errors.description ? 'rgba(239,68,68,0.5)' : 'var(--color-border)' }}
                  />
                  {errors.description && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#FCA5A5', fontFamily: 'var(--font-family-mono)' }}>{errors.description}</p>}
                </Field>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="Category" required>
                    <select style={{ ...inputStyle, cursor: 'pointer', borderColor: errors.category ? 'rgba(239,68,68,0.5)' : undefined }} value={form.category} onChange={set('category')}>
                      <option value="">Select…</option>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.category && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#FCA5A5', fontFamily: 'var(--font-family-mono)' }}>{errors.category}</p>}
                  </Field>
                  <Field label="Pricing model" required>
                    <select style={{ ...inputStyle, cursor: 'pointer', borderColor: errors.pricing_model ? 'rgba(239,68,68,0.5)' : undefined }} value={form.pricing_model} onChange={set('pricing_model')}>
                      <option value="">Select…</option>
                      {PRICING_MODELS.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    {errors.pricing_model && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#FCA5A5', fontFamily: 'var(--font-family-mono)' }}>{errors.pricing_model}</p>}
                  </Field>
                </div>
              </div>

              {/* Optional fields */}
              <div style={{ padding: '24px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <p style={{ margin: '0 0 4px', fontSize: 12, color: 'var(--color-muted-2)', fontFamily: 'var(--font-family-mono)', letterSpacing: '0.06em' }}>OPTIONAL DETAILS</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="Company name">
                    <input style={inputStyle} placeholder="e.g. OpenAI" value={form.company} onChange={set('company')} onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }} onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }} />
                  </Field>
                  <Field label="Founded year">
                    <input style={inputStyle} type="number" placeholder="e.g. 2022" min="1990" max="2026" value={form.founded_year} onChange={set('founded_year')} onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }} onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }} />
                  </Field>
                </div>

                <Field label="Logo URL">
                  <input style={inputStyle} placeholder="https://example.com/logo.png" value={form.logo_url} onChange={set('logo_url')} onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }} onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }} />
                </Field>

                <Field label="Tags (max 8)">
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      style={{ ...inputStyle, flex: 1 }}
                      placeholder="Add a tag and press Enter"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
                    />
                    <button type="button" onClick={addTag} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-muted)', cursor: 'pointer', flexShrink: 0 }}>
                      <Plus size={14} />
                    </button>
                  </div>
                  {tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                      {tags.map((tag) => (
                        <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 6, backgroundColor: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', color: 'var(--color-cyan)', fontSize: 12, fontFamily: 'var(--font-family-mono)' }}>
                          #{tag}
                          <button type="button" onClick={() => removeTag(tag)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', display: 'flex' }}><X size={10} /></button>
                        </span>
                      ))}
                    </div>
                  )}
                </Field>

                <Field label="Notes for reviewers">
                  <textarea
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }}
                    placeholder="Anything you'd like to tell us about this tool…"
                    value={form.notes}
                    onChange={set('notes')}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
                  />
                </Field>

                <Field label="Your email (optional — for status updates)">
                  <input style={{ ...inputStyle, borderColor: errors.submitter_email ? 'rgba(239,68,68,0.5)' : undefined }} type="email" placeholder="you@example.com" value={form.submitter_email} onChange={set('submitter_email')} onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }} onBlur={(e) => { e.currentTarget.style.borderColor = errors.submitter_email ? 'rgba(239,68,68,0.5)' : 'var(--color-border)' }} />
                  {errors.submitter_email && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#FCA5A5', fontFamily: 'var(--font-family-mono)' }}>{errors.submitter_email}</p>}
                </Field>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, border: '1px solid rgba(0,229,255,0.3)', background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.08))', color: 'var(--color-cyan)', fontSize: 15, fontFamily: 'var(--font-family-display)', fontWeight: 700, cursor: isPending ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease', opacity: isPending ? 0.7 : 1 }}
                onMouseEnter={(e) => { if (!isPending) e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,229,255,0.22), rgba(0,229,255,0.12))' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.08))' }}
              >
                {isPending ? <Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Send size={15} />}
                {isPending ? 'Submitting…' : 'Submit for review'}
              </button>
            </form>
          )}
        </motion.div>
      </main>
    </div>
  )
}
