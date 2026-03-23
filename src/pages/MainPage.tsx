import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Send } from 'lucide-react'
import { Header } from '../components/Header'
import { FilterBar } from '../components/FilterBar'
import { ToolCard } from '../components/ToolCard'
import { ToolDrawer } from '../components/ToolDrawer'
import { SkeletonGrid } from '../components/SkeletonCard'
import { EmptyState } from '../components/EmptyState'
import { NewsletterForm } from '../components/NewsletterForm'
import { useTools, useAllTags, useURLSync } from '../hooks/useTools'
import type { AiTool, FilterState } from '../lib/types'

const DEFAULT_FILTERS: FilterState = {
  search: '',
  categories: [],
  pricingModels: [],
  tags: [],
  sortBy: 'upvotes',
}

export function MainPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null)

  useURLSync(filters, setFilters)

  const { data: tools, isLoading, isError } = useTools(filters)
  const { data: allTags = [] } = useAllTags()

  const hasActiveFilters =
    filters.search.trim().length > 0 ||
    filters.categories.length > 0 ||
    filters.pricingModels.length > 0 ||
    filters.tags.length > 0

  const clearAllFilters = () => setFilters(DEFAULT_FILTERS)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Header / Hero */}
      <Header
        searchValue={filters.search}
        onSearchChange={(val) => setFilters((f) => ({ ...f, search: val }))}
        tools={tools}
      />

      {/* Filter bar (sticky) */}
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        resultCount={tools?.length ?? 0}
        allTags={allTags}
        isLoading={isLoading}
      />

      {/* Main content */}
      <main
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '32px 24px 80px',
        }}
      >
        {isError && (
          <div
            style={{
              padding: '20px 24px',
              marginBottom: 24,
              borderRadius: 10,
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#FCA5A5',
              fontSize: 14,
              fontFamily: 'var(--font-family-mono, monospace)',
            }}
          >
            <p style={{ margin: '0 0 8px', fontWeight: 700 }}>⚠ Could not load tools from Supabase</p>
            <p style={{ margin: '0 0 8px', color: '#8888AA', fontSize: 13 }}>
              Possible causes:
            </p>
            <ul style={{ margin: 0, paddingLeft: 18, color: '#8888AA', fontSize: 13, lineHeight: 1.8 }}>
              <li>The table <code style={{ color: '#FCA5A5' }}>ai_tools</code> does not exist yet — run <code style={{ color: '#FCA5A5' }}>supabase/schema.sql</code> in Supabase SQL Editor</li>
              <li>The table is empty — run <code style={{ color: '#FCA5A5' }}>supabase/seed.sql</code></li>
              <li>Wrong credentials in <code style={{ color: '#FCA5A5' }}>.env.local</code></li>
              <li>RLS policy blocking reads — check "Allow public read" policy exists</li>
            </ul>
          </div>
        )}

        {isLoading ? (
          <SkeletonGrid count={12} />
        ) : tools && tools.length > 0 ? (
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 16,
            }}
          >
            <AnimatePresence mode="popLayout">
              {tools.map((tool, index) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  index={index}
                  onClick={setSelectedTool}
                  searchTerm={filters.search}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          !isLoading && (
            <EmptyState
              hasFilters={hasActiveFilters}
              onClearFilters={clearAllFilters}
            />
          )
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          padding: '40px 24px 32px',
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          {/* Newsletter section */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
              padding: '28px 32px',
              borderRadius: 14,
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              background: 'linear-gradient(135deg, rgba(0,229,255,0.03) 0%, rgba(255,45,120,0.02) 100%)',
            }}
          >
            <NewsletterForm />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 8,
                paddingLeft: 'max(0px, 24px)',
                borderLeft: '1px solid var(--color-border)',
              }}
            >
              {[
                { label: '1 000+', desc: 'AI tools tracked' },
                { label: 'Weekly', desc: 'New tools & updates' },
                { label: '0', desc: 'Spam emails, ever' },
              ].map(({ label, desc }) => (
                <div key={desc} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: 'var(--color-cyan)',
                      fontFamily: 'var(--font-family-display)',
                      minWidth: 52,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: 'var(--color-muted)',
                      fontFamily: 'var(--font-family-mono)',
                    }}
                  >
                    {desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Branding + links row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
          {/* Branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 18,
                fontWeight: 800,
                background: 'linear-gradient(135deg, var(--color-cyan), var(--color-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              AIverse
            </span>
            <span
              style={{
                fontSize: 13,
                color: 'var(--color-muted)',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              — Every AI tool. One place.
            </span>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a
              href="#submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid rgba(0, 229, 255, 0.2)',
                backgroundColor: 'rgba(0, 229, 255, 0.06)',
                color: 'var(--color-cyan)',
                fontSize: 13,
                fontWeight: 500,
                fontFamily: 'var(--font-family-mono)',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.12)'
                e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.06)'
                e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.2)'
              }}
            >
              <Send size={13} />
              Submit a tool
            </a>

            <a
              href="https://github.com/carlbredly"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'var(--color-muted)',
                fontSize: 13,
                fontFamily: 'var(--font-family-mono)',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)' }}
            >
              <Github size={15} />
              GitHub
            </a>

            <span
              style={{
                fontSize: 12,
                color: 'var(--color-muted-2)',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              
            </span>
          </div>
          </div>{/* end branding+links row */}
        </div>{/* end footer inner column */}
      </footer>

      {/* Tool detail drawer */}
      <ToolDrawer
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
      />
    </div>
  )
}
