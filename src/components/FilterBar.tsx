import { useState, useRef, useEffect } from 'react'
import { X, ChevronDown, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import type { Category, FilterState, PricingModel, SortOption } from '../lib/types'
import { CATEGORIES, PRICING_MODELS, SORT_OPTIONS } from '../lib/types'
import { CATEGORY_STYLES } from './CategoryBadge'

interface FilterBarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  resultCount: number
  allTags: string[]
  isLoading: boolean
}

export function FilterBar({
  filters,
  onFiltersChange,
  resultCount,
  allTags,
  isLoading,
}: FilterBarProps) {
  const [showTagDropdown, setShowTagDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [tagSearch, setTagSearch] = useState('')
  const tagDropdownRef = useRef<HTMLDivElement>(null)
  const sortDropdownRef = useRef<HTMLDivElement>(null)

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.pricingModels.length > 0 ||
    filters.tags.length > 0

  const filteredTags = allTags.filter((t) =>
    t.toLowerCase().includes(tagSearch.toLowerCase())
  )

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(e.target as Node)) {
        setShowTagDropdown(false)
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target as Node)) {
        setShowSortDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleCategory = (cat: Category) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat]
    onFiltersChange({ ...filters, categories: next })
  }

  const togglePricing = (model: PricingModel) => {
    const next = filters.pricingModels.includes(model)
      ? filters.pricingModels.filter((m) => m !== model)
      : [...filters.pricingModels, model]
    onFiltersChange({ ...filters, pricingModels: next })
  }

  const toggleTag = (tag: string) => {
    const next = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag]
    onFiltersChange({ ...filters, tags: next })
  }

  const clearAll = () => {
    onFiltersChange({
      ...filters,
      categories: [],
      pricingModels: [],
      tags: [],
    })
  }

  const currentSort = SORT_OPTIONS.find((s) => s.value === filters.sortBy)

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Category pills row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            overflowX: 'auto',
            padding: '12px 0 10px',
            scrollbarWidth: 'none',
          }}
        >
          <SlidersHorizontal size={15} color="var(--color-muted)" style={{ flexShrink: 0 }} />

          {CATEGORIES.map((cat) => {
            const active = filters.categories.includes(cat)
            const catStyle = CATEGORY_STYLES[cat]
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: `1px solid ${active ? catStyle.dot : 'var(--color-border)'}`,
                  backgroundColor: active ? catStyle.bg : 'transparent',
                  color: active ? catStyle.text : 'var(--color-muted)',
                  fontSize: 12,
                  fontFamily: 'var(--font-family-mono)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.borderColor = catStyle.dot
                    e.currentTarget.style.color = catStyle.text
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                    e.currentTarget.style.color = 'var(--color-muted)'
                  }
                }}
              >
                {cat}
              </button>
            )
          })}

          {/* Divider */}
          <div style={{ width: 1, height: 20, backgroundColor: 'var(--color-border)', flexShrink: 0 }} />

          {/* Pricing pills */}
          {PRICING_MODELS.map((model) => {
            const active = filters.pricingModels.includes(model)
            const colors: Record<PricingModel, string> = {
              Free: '#34D399',
              Freemium: '#00E5FF',
              Paid: '#A5B4FC',
              'Open Source': '#FB923C',
              Enterprise: '#C4B5FD',
            }
            const color = colors[model]
            return (
              <button
                key={model}
                onClick={() => togglePricing(model)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: `1px solid ${active ? color : 'var(--color-border)'}`,
                  backgroundColor: active ? `${color}18` : 'transparent',
                  color: active ? color : 'var(--color-muted)',
                  fontSize: 12,
                  fontFamily: 'var(--font-family-mono)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.borderColor = color
                    e.currentTarget.style.color = color
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                    e.currentTarget.style.color = 'var(--color-muted)'
                  }
                }}
              >
                {model}
              </button>
            )
          })}

          {/* Tags dropdown */}
          <div style={{ position: 'relative', flexShrink: 0 }} ref={tagDropdownRef}>
            <button
              onClick={() => {
                setShowTagDropdown((v) => !v)
                setShowSortDropdown(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '5px 12px',
                borderRadius: 20,
                border: `1px solid ${filters.tags.length > 0 ? 'var(--color-cyan)' : 'var(--color-border)'}`,
                backgroundColor: filters.tags.length > 0 ? 'var(--color-cyan-dim)' : 'transparent',
                color: filters.tags.length > 0 ? 'var(--color-cyan)' : 'var(--color-muted)',
                fontSize: 12,
                fontFamily: 'var(--font-family-mono)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Tags {filters.tags.length > 0 && `(${filters.tags.length})`}
              <ChevronDown
                size={12}
                style={{
                  transition: 'transform 0.2s',
                  transform: showTagDropdown ? 'rotate(180deg)' : 'none',
                }}
              />
            </button>

            {showTagDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  width: 260,
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 10,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  zIndex: 100,
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--color-border)' }}>
                  <input
                    type="text"
                    placeholder="Search tags..."
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 6,
                      color: 'var(--color-text)',
                      fontSize: 12,
                      fontFamily: 'var(--font-family-mono)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div
                  style={{
                    maxHeight: 240,
                    overflowY: 'auto',
                    padding: '6px',
                  }}
                >
                  {filteredTags.length === 0 ? (
                    <p style={{ color: 'var(--color-muted)', fontSize: 12, padding: '8px 6px' }}>
                      No tags found
                    </p>
                  ) : (
                    filteredTags.map((tag) => {
                      const selected = filters.tags.includes(tag)
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            width: '100%',
                            padding: '6px 8px',
                            borderRadius: 6,
                            border: 'none',
                            backgroundColor: selected ? 'rgba(0,229,255,0.1)' : 'transparent',
                            color: selected ? 'var(--color-cyan)' : 'var(--color-text)',
                            fontSize: 12,
                            fontFamily: 'var(--font-family-mono)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={(e) => {
                            if (!selected) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                          }}
                          onMouseLeave={(e) => {
                            if (!selected) e.currentTarget.style.backgroundColor = 'transparent'
                          }}
                        >
                          <span
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: 4,
                              border: `1px solid ${selected ? 'var(--color-cyan)' : 'var(--color-border)'}`,
                              backgroundColor: selected ? 'var(--color-cyan)' : 'transparent',
                              flexShrink: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 9,
                              color: '#000',
                            }}
                          >
                            {selected && '✓'}
                          </span>
                          {tag}
                        </button>
                      )
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom row: active chips + result count + sort */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '8px 0 12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Active filter chips + result count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 13,
                color: 'var(--color-muted)',
                fontFamily: 'var(--font-family-mono)',
                whiteSpace: 'nowrap',
              }}
            >
              {isLoading ? '...' : `${resultCount} tool${resultCount !== 1 ? 's' : ''}`}
            </span>

            {/* Active category chips */}
            {filters.categories.map((cat) => (
              <ActiveChip
                key={cat}
                label={cat}
                onRemove={() => toggleCategory(cat)}
                color={CATEGORY_STYLES[cat]?.text ?? 'var(--color-muted)'}
              />
            ))}

            {/* Active pricing chips */}
            {filters.pricingModels.map((model) => (
              <ActiveChip
                key={model}
                label={model}
                onRemove={() => togglePricing(model)}
                color="var(--color-cyan)"
              />
            ))}

            {/* Active tag chips */}
            {filters.tags.map((tag) => (
              <ActiveChip
                key={tag}
                label={`#${tag}`}
                onRemove={() => toggleTag(tag)}
                color="var(--color-pink)"
              />
            ))}

            {hasActiveFilters && (
              <button
                onClick={clearAll}
                style={{
                  fontSize: 12,
                  color: 'var(--color-muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px 6px',
                  borderRadius: 4,
                  fontFamily: 'var(--font-family-mono)',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)' }}
              >
                Clear all
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div style={{ position: 'relative', flexShrink: 0 }} ref={sortDropdownRef}>
            <button
              onClick={() => {
                setShowSortDropdown((v) => !v)
                setShowTagDropdown(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                fontSize: 12,
                fontFamily: 'var(--font-family-mono)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-hover)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
            >
              <ArrowUpDown size={12} />
              {currentSort?.label}
              <ChevronDown size={12} style={{ transform: showSortDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {showSortDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  width: 180,
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 10,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  zIndex: 100,
                  overflow: 'hidden',
                  padding: '4px',
                }}
              >
                {SORT_OPTIONS.map((opt) => {
                  const active = filters.sortBy === opt.value
                  return (
                    <button
                      key={opt.value}
                      onClick={() => {
                        onFiltersChange({ ...filters, sortBy: opt.value as SortOption })
                        setShowSortDropdown(false)
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: 6,
                        border: 'none',
                        backgroundColor: active ? 'rgba(0,229,255,0.1)' : 'transparent',
                        color: active ? 'var(--color-cyan)' : 'var(--color-text)',
                        fontSize: 13,
                        fontFamily: 'var(--font-family-mono)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                      }}
                      onMouseLeave={(e) => {
                        if (!active) e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ActiveChip({
  label,
  onRemove,
  color,
}: {
  label: string
  onRemove: () => void
  color: string
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 8px',
        borderRadius: 20,
        backgroundColor: `${color}18`,
        border: `1px solid ${color}44`,
        color,
        fontSize: 11,
        fontFamily: 'var(--font-family-mono)',
        fontWeight: 500,
      }}
    >
      {label}
      <button
        onClick={onRemove}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color,
          padding: 0,
          lineHeight: 1,
          opacity: 0.7,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7' }}
      >
        <X size={11} />
      </button>
    </span>
  )
}
