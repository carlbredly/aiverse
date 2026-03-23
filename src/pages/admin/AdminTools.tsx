import { useState } from 'react'
import { Plus, Search, Pencil, Trash2, X, Check, Loader2, AlertCircle } from 'lucide-react'
import { useAdminTools, useAdminCreateTool, useAdminUpdateTool, useAdminDeleteTool } from '../../hooks/useAdmin'
import { CATEGORIES, PRICING_MODELS } from '../../lib/types'
import type { AiTool, Category, PricingModel } from '../../lib/types'

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  backgroundColor: 'var(--color-bg)',
  border: '1px solid var(--color-border)',
  borderRadius: 7,
  color: 'var(--color-text)',
  fontSize: 13,
  fontFamily: 'var(--font-family-mono)',
  outline: 'none',
  boxSizing: 'border-box' as const,
  transition: 'border-color 0.15s ease',
}

type FormData = {
  name: string; description: string; long_description: string; category: string; pricing_model: string
  website_url: string; logo_url: string; company: string; founded_year: string; tags: string; is_featured: boolean
  price_starting: string; country_code: string; lat: string; lng: string
}

const emptyForm: FormData = {
  name: '', description: '', long_description: '', category: '', pricing_model: '',
  website_url: '', logo_url: '', company: '', founded_year: '', tags: '',
  is_featured: false, price_starting: '', country_code: 'US', lat: '37.77', lng: '-122.41',
}

function toolToForm(tool: AiTool): FormData {
  return {
    name: tool.name, description: tool.description, long_description: tool.long_description,
    category: tool.category, pricing_model: tool.pricing_model,
    website_url: tool.website_url, logo_url: tool.logo_url, company: tool.company,
    founded_year: tool.founded_year ? String(tool.founded_year) : '',
    tags: tool.tags.join(', '), is_featured: tool.is_featured,
    price_starting: tool.price_starting != null ? String(tool.price_starting) : '',
    country_code: tool.country_code, lat: String(tool.lat), lng: String(tool.lng),
  }
}

function ToolModal({ tool, onClose }: { tool: AiTool | null; onClose: () => void }) {
  const [form, setForm] = useState<FormData>(tool ? toolToForm(tool) : emptyForm)
  const [error, setError] = useState('')
  const create = useAdminCreateTool()
  const update = useAdminUpdateTool()
  const isEdit = !!tool
  const pending = create.isPending || update.isPending

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setForm((f) => ({ ...f, [key]: val }))
  }

  const handleSave = async () => {
    setError('')
    if (!form.name.trim() || !form.description.trim() || !form.category || !form.pricing_model || !form.website_url.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      long_description: form.long_description.trim(),
      category: form.category as Category,
      pricing_model: form.pricing_model as PricingModel,
      website_url: form.website_url.trim(),
      logo_url: form.logo_url.trim(),
      company: form.company.trim(),
      founded_year: form.founded_year ? Number(form.founded_year) : null,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      is_featured: form.is_featured,
      price_starting: form.price_starting ? Number(form.price_starting) : null,
      country_code: form.country_code || 'US',
      lat: Number(form.lat) || 37.77,
      lng: Number(form.lng) || -122.41,
    }
    try {
      if (isEdit) {
        await update.mutateAsync({ id: tool.id, ...payload })
      } else {
        await create.mutateAsync(payload)
      }
      onClose()
    } catch (e) {
      setError((e as Error).message || 'Save failed')
    }
  }

  const F = ({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) => (
    <div>
      <label style={{ display: 'block', fontSize: 10, fontFamily: 'var(--font-family-mono)', fontWeight: 600, color: 'var(--color-muted)', letterSpacing: '0.06em', marginBottom: 4 }}>
        {label.toUpperCase()}{req && <span style={{ color: 'var(--color-pink)', marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  )

  const inp = (key: keyof FormData, placeholder = '', type = 'text') => (
    <input type={type} placeholder={placeholder} value={String(form[key])} onChange={set(key)} style={inputStyle}
      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }}
      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }} />
  )

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 20px', overflowY: 'auto' }}>
      <div style={{ width: '100%', maxWidth: 680, backgroundColor: 'var(--color-surface)', borderRadius: 14, border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
        {/* Modal header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: 18, fontWeight: 800, color: 'var(--color-text)', margin: 0 }}>
            {isEdit ? `Edit: ${tool.name}` : 'Add New Tool'}
          </h2>
          <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-muted)', cursor: 'pointer' }}>
            <X size={14} />
          </button>
        </div>

        {/* Form body */}
        <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto', maxHeight: '70vh' }}>
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', backgroundColor: 'rgba(239,68,68,0.06)' }}>
              <AlertCircle size={14} color="#FCA5A5" />
              <span style={{ fontSize: 12, color: '#FCA5A5', fontFamily: 'var(--font-family-mono)' }}>{error}</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <F label="Name" req>{inp('name', 'ChatGPT')}</F>
            <F label="Company" >{inp('company', 'OpenAI')}</F>
          </div>
          <F label="Short description" req>
            <textarea value={form.description} onChange={set('description')} placeholder="1–2 sentence description" style={{ ...inputStyle, resize: 'vertical', minHeight: 68 }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }} />
          </F>
          <F label="Long description">
            <textarea value={form.long_description} onChange={set('long_description')} placeholder="Detailed description (optional)" style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }} />
          </F>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <F label="Category" req>
              <select value={form.category} onChange={set('category')} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">Select…</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </F>
            <F label="Pricing model" req>
              <select value={form.pricing_model} onChange={set('pricing_model')} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">Select…</option>
                {PRICING_MODELS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </F>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
            <F label="Website URL" req>{inp('website_url', 'https://...')}</F>
            <F label="Price starting ($)">{inp('price_starting', '20', 'number')}</F>
            <F label="Founded year">{inp('founded_year', '2022', 'number')}</F>
          </div>
          <F label="Logo URL">{inp('logo_url', 'https://.../logo.png')}</F>
          <F label="Tags (comma-separated)">{inp('tags', 'chatbot, writing, api')}</F>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <F label="Country code">{inp('country_code', 'US')}</F>
            <F label="Latitude">{inp('lat', '37.77', 'number')}</F>
            <F label="Longitude">{inp('lng', '-122.41', 'number')}</F>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={form.is_featured} onChange={set('is_featured')} style={{ width: 16, height: 16, accentColor: 'var(--color-cyan)', cursor: 'pointer' }} />
            <span style={{ fontSize: 13, fontFamily: 'var(--font-family-mono)', color: 'var(--color-text)' }}>Mark as featured</span>
          </label>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '16px 24px', borderTop: '1px solid var(--color-border)' }}>
          <button onClick={onClose} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-muted)', fontSize: 13, fontFamily: 'var(--font-family-mono)', cursor: 'pointer' }}>Cancel</button>
          <button
            onClick={handleSave}
            disabled={pending}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 8, border: '1px solid rgba(0,229,255,0.3)', backgroundColor: 'rgba(0,229,255,0.1)', color: 'var(--color-cyan)', fontSize: 13, fontFamily: 'var(--font-family-mono)', fontWeight: 600, cursor: pending ? 'not-allowed' : 'pointer', opacity: pending ? 0.7 : 1 }}
          >
            {pending ? <Loader2 size={13} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Check size={13} />}
            {isEdit ? 'Save changes' : 'Add tool'}
          </button>
        </div>
      </div>
    </div>
  )
}

function DeleteConfirm({ tool, onConfirm, onCancel }: { tool: AiTool; onConfirm: () => void; onCancel: () => void }) {
  const del = useAdminDeleteTool()
  const handle = async () => {
    await del.mutateAsync(tool.id)
    onConfirm()
  }
  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 400, backgroundColor: 'var(--color-surface)', borderRadius: 14, border: '1px solid rgba(239,68,68,0.25)', padding: 28, textAlign: 'center' }}>
        <p style={{ fontSize: 40, margin: '0 0 16px' }}>🗑️</p>
        <h3 style={{ fontFamily: 'var(--font-family-display)', fontSize: 18, fontWeight: 800, color: 'var(--color-text)', margin: '0 0 8px' }}>Delete "{tool.name}"?</h3>
        <p style={{ margin: '0 0 24px', fontSize: 13, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button onClick={onCancel} style={{ padding: '9px 20px', borderRadius: 8, border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-muted)', fontSize: 13, fontFamily: 'var(--font-family-mono)', cursor: 'pointer' }}>Cancel</button>
          <button onClick={handle} disabled={del.isPending} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.35)', backgroundColor: 'rgba(239,68,68,0.1)', color: '#FCA5A5', fontSize: 13, fontFamily: 'var(--font-family-mono)', fontWeight: 600, cursor: del.isPending ? 'not-allowed' : 'pointer' }}>
            {del.isPending ? <Loader2 size={13} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Trash2 size={13} />}
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export function AdminTools() {
  const [search, setSearch] = useState('')
  const [editTool, setEditTool] = useState<AiTool | null | 'new'>(null)
  const [deleteTool, setDeleteTool] = useState<AiTool | null>(null)
  const { data: tools = [], isLoading } = useAdminTools(search)

  return (
    <div style={{ maxWidth: 1000 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: 28, fontWeight: 800, color: 'var(--color-text)', margin: '0 0 4px' }}>Tools</h1>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>{tools.length} tools in directory</p>
        </div>
        <button
          onClick={() => setEditTool('new')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 8, border: '1px solid rgba(0,229,255,0.3)', backgroundColor: 'rgba(0,229,255,0.1)', color: 'var(--color-cyan)', fontSize: 13, fontFamily: 'var(--font-family-mono)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.16)' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.1)' }}
        >
          <Plus size={14} /> Add tool
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted-2)', pointerEvents: 'none' }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tools…"
          style={{ ...inputStyle, paddingLeft: 36, fontSize: 14 }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
          <Loader2 size={24} color="var(--color-cyan)" style={{ animation: 'spin 0.8s linear infinite' }} />
        </div>
      ) : (
        <div style={{ border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: 12, padding: '10px 16px', backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
            {['Name', 'Category', 'Pricing', 'Upvotes', 'Actions'].map((h) => (
              <span key={h} style={{ fontSize: 10, fontFamily: 'var(--font-family-mono)', fontWeight: 600, color: 'var(--color-muted-2)', letterSpacing: '0.06em' }}>{h.toUpperCase()}</span>
            ))}
          </div>
          {tools.map((tool, i) => (
            <div
              key={tool.id}
              style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: 12, padding: '11px 16px', alignItems: 'center', borderTop: i === 0 ? 'none' : '1px solid var(--color-border)', transition: 'background 0.12s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--color-text)', fontFamily: 'var(--font-family-display)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tool.name}</p>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tool.company}</p>
              </div>
              <span style={{ fontSize: 11, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tool.category}</span>
              <span style={{ fontSize: 11, color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)' }}>{tool.pricing_model}</span>
              <span style={{ fontSize: 12, color: 'var(--color-pink)', fontFamily: 'var(--font-family-mono)', fontWeight: 600 }}>♥ {tool.upvotes}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => setEditTool(tool)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 6, border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-muted)', fontSize: 11, fontFamily: 'var(--font-family-mono)', cursor: 'pointer', transition: 'all 0.12s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)'; e.currentTarget.style.color = 'var(--color-cyan)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)' }}
                >
                  <Pencil size={10} /> Edit
                </button>
                <button onClick={() => setDeleteTool(tool)} style={{ display: 'flex', alignItems: 'center', padding: '5px 8px', borderRadius: 6, border: '1px solid transparent', backgroundColor: 'transparent', color: 'var(--color-muted-2)', cursor: 'pointer', transition: 'all 0.12s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; e.currentTarget.style.color = '#FCA5A5'; e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'var(--color-muted-2)'; e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          ))}
          {tools.length === 0 && (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--color-muted)', fontFamily: 'var(--font-family-mono)', fontSize: 13 }}>
              No tools found{search ? ` for "${search}"` : ''}
            </div>
          )}
        </div>
      )}

      {editTool !== null && (
        <ToolModal
          tool={editTool === 'new' ? null : editTool}
          onClose={() => setEditTool(null)}
        />
      )}
      {deleteTool && (
        <DeleteConfirm tool={deleteTool} onConfirm={() => setDeleteTool(null)} onCancel={() => setDeleteTool(null)} />
      )}
    </div>
  )
}
