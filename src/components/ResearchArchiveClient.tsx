'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'

// ── Types ──────────────────────────────────────────────────────────────────────

type FilterCategory = 'All' | 'Reports' | 'White Papers' | 'Policy Briefs'

export type DocType = 'Report' | 'White Paper' | 'Policy Brief'

export interface CardDoc {
  id: string
  type: DocType
  year: number
  title: string
  desc: string
  pages: number
  href: string
  headerColor: string
  cornerColor: string
  rotation: number
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const FILTERS: FilterCategory[] = ['All', 'Reports', 'White Papers', 'Policy Briefs']

function matchesFilter(doc: CardDoc, filter: FilterCategory): boolean {
  if (filter === 'All') return true
  if (filter === 'Reports') return doc.type === 'Report'
  if (filter === 'White Papers') return doc.type === 'White Paper'
  return doc.type === 'Policy Brief'
}

// ── ResearchCard ───────────────────────────────────────────────────────────────

function ResearchCard({ doc, className }: { doc: CardDoc; className?: string }) {
  const isAvailable = doc.href !== '#'

  return (
    <motion.div
      layout
      className={className}
      initial={{ opacity: 0, y: 20, rotate: doc.rotation }}
      animate={{ opacity: 1, y: 0, rotate: doc.rotation }}
      exit={{ opacity: 0, scale: 0.96, rotate: doc.rotation }}
      whileHover={{ rotate: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href={isAvailable ? doc.href : undefined}
        target={isAvailable ? '_blank' : undefined}
        rel="noopener noreferrer"
        aria-disabled={!isAvailable}
        className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        style={{
          background: colors.cardSurface,
          minHeight: 280,
          cursor: isAvailable ? 'pointer' : 'default',
          textDecoration: 'none',
        }}
      >
        {/* Coloured header */}
        <div
          className="relative px-6 pt-6 pb-5 flex-shrink-0 overflow-hidden"
          style={{ background: doc.headerColor, minHeight: '48%' }}
        >
          {/* Corner diamond — slightly lighter overlay for depth */}
          <div
            aria-hidden="true"
            className="absolute -top-6 -right-6"
            style={{
              width: 110,
              height: 110,
              background: doc.cornerColor,
              transform: 'rotate(-30deg)',
              opacity: 0.55,
            }}
          />

          {/* Type + year eyebrow */}
          <p
            className="relative z-10 text-xs font-bold uppercase tracking-[0.18em] mb-3"
            style={{
              fontFamily: fonts.syne,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.4,
            }}
          >
            {doc.type} — {doc.year}
          </p>

          {/* Title */}
          <h3
            className="relative z-10 font-bold leading-snug"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(16px, 1.4vw, 19px)',
              color: colors.white,
              lineHeight: 1.35,
            }}
          >
            {doc.title}
          </h3>
        </div>

        {/* Paper body */}
        <div className="flex flex-col flex-1 px-6 pt-4 pb-4">
          <p
            className="flex-1 leading-relaxed"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 14,
              lineHeight: 1.65,
              color: 'rgba(26,26,20,0.65)',
            }}
          >
            {doc.desc}
          </p>

          <div
            className="flex items-center justify-between mt-5 pt-4"
            style={{ borderTop: '1px solid rgba(26,26,20,0.08)' }}
          >
            <span
              style={{
                fontFamily: fonts.syne,
                fontSize: 12,
                fontWeight: 700,
                color: 'rgba(26,26,20,0.35)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              {doc.pages} pages
            </span>

            {isAvailable && (
              <span
                className="flex items-center gap-1.5 font-bold transition-opacity duration-200 group-hover:opacity-70"
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 12,
                  color: colors.orange,
                  letterSpacing: '0.08em',
                }}
              >
                Read <span aria-hidden="true">→</span>
              </span>
            )}
          </div>
        </div>
      </a>
    </motion.div>
  )
}

// ── MoreCard ───────────────────────────────────────────────────────────────────

function MoreCard({ count, rotation, className }: { count: number; rotation: number; className?: string }) {
  return (
    <motion.div
      layout
      className={className}
      initial={{ opacity: 0, y: 20, rotate: rotation }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      exit={{ opacity: 0, scale: 0.96, rotate: rotation }}
      whileHover={{ rotate: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        style={{ background: colors.charcoal, minHeight: 280 }}
      >
        {/* Top bar */}
        <div className="flex-shrink-0" style={{ background: 'rgba(255,255,255,0.06)', height: '48%' }}>
          <div className="flex items-end h-full px-7 pb-4">
            <span
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(48px, 5vw, 64px)',
                fontWeight: 900,
                color: 'rgba(255,255,255,0.08)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              +{count}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 px-6 pt-4 pb-4">
          <p
            className="flex-1 leading-relaxed"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 14,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            More reports, briefs, field notes, and community data — updated quarterly.
          </p>

          <div
            className="flex items-center justify-between mt-5 pt-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span
              style={{
                fontFamily: fonts.syne,
                fontSize: 12,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.25)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              In archive
            </span>
            <span
              className="font-bold transition-opacity duration-200 group-hover:opacity-70"
              style={{
                fontFamily: fonts.syne,
                fontSize: 12,
                color: colors.orange,
                letterSpacing: '0.08em',
              }}
            >
              Browse all →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Empty state ────────────────────────────────────────────────────────────────

function EmptyState({ filter }: { filter: FilterCategory }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col items-center justify-center py-20 text-center"
    >
      <p
        style={{
          fontFamily: fonts.bricolage,
          fontSize: 'clamp(36px, 4vw, 52px)',
          fontWeight: 900,
          color: 'rgba(26,26,20,0.06)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          marginBottom: 16,
        }}
      >
        —
      </p>
      <p
        style={{
          fontFamily: fonts.bricolage,
          fontSize: 15,
          color: 'rgba(26,26,20,0.4)',
          lineHeight: 1.6,
        }}
      >
        No {filter === 'All' ? 'documents' : filter.toLowerCase()} in the archive yet.
      </p>
    </motion.div>
  )
}

// ── Client component ───────────────────────────────────────────────────────────

export default function ResearchArchiveClient({
  docs,
  totalCount,
}: {
  docs: CardDoc[]
  totalCount: number
}) {
  const [active, setActive] = useState<FilterCategory>('All')
  const labelId = useId()

  const filtered = docs.filter((doc) => matchesFilter(doc, active))
  const showMoreCard = active === 'All'
  const moreCount = totalCount - docs.length

  return (
    <section
      id="research"
      className="px-8 md:px-20 pt-24 pb-28 md:pt-20 md:pb-24"
      style={{ background: colors.white }}
    >
      {/* ── Heading ── */}
      <h2
        className="font-extrabold mb-10"
        style={{
          fontFamily: fonts.bricolage,
          fontSize: 'clamp(40px, 5vw, 64px)',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
        }}
      >
        <span style={{ color: '#000000' }}>Research </span>
        <span style={{ color: colors.orange }}>Archive.</span>
      </h2>

      {/* ── Filter pills ── */}
      <div
        role="group"
        aria-labelledby={labelId}
        className="flex flex-wrap items-center gap-3 mb-14"
      >
        <span
          id={labelId}
          className="font-bold mr-1"
          style={{
            fontFamily: fonts.syne,
            fontSize: 12,
            color: 'rgba(26,26,20,0.35)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Filter
        </span>

        {FILTERS.map((filter) => {
          const isActive = active === filter
          return (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className="font-bold transition-all duration-200"
              style={{
                fontFamily: fonts.syne,
                fontSize: 12,
                letterSpacing: '0.1em',
                lineHeight: 1.4,
                borderRadius: 20,
                padding: '8px 18px',
                cursor: 'pointer',
                ...(isActive
                  ? { background: colors.charcoal, color: colors.white, border: '2px solid transparent' }
                  : { background: 'transparent', color: 'rgba(26,26,20,0.45)', border: '2px solid rgba(26,26,20,0.15)' }),
              }}
            >
              {filter}
            </button>
          )
        })}
      </div>

      {/* ── Card grid / slider ── */}
      {/* Mobile: horizontal snap scroll, 2 cards visible + peek of 3rd */}
      {/* Desktop (lg+): 4-column grid */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 -mx-8 px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-4 lg:overflow-visible lg:snap-none lg:gap-8 lg:mx-0 lg:px-0 lg:pb-0">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <EmptyState key="empty" filter={active} />
          ) : (
            <>
              {filtered.map((doc) => (
                <ResearchCard
                  key={doc.id}
                  doc={doc}
                  className="snap-start flex-none w-[42vw] min-w-[150px] lg:w-auto lg:min-w-0"
                />
              ))}
              {showMoreCard && moreCount > 0 && (
                <MoreCard
                  key="more"
                  count={moreCount}
                  rotation={2}
                  className="snap-start flex-none w-[42vw] min-w-[150px] lg:w-auto lg:min-w-0"
                />
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer ── */}
      <div
        className="mt-14 pt-5 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(26,26,20,0.08)' }}
      >
        <p
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 13,
            color: 'rgba(26,26,20,0.4)',
            lineHeight: 1.5,
          }}
        >
          Showing{' '}
          <span style={{ color: colors.charcoal, fontWeight: 700 }}>{filtered.length}</span>
          {' '}of {totalCount} documents — updated quarterly
        </p>

        <p
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 11,
            fontWeight: 700,
            color: 'rgba(26,26,20,0.15)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            transform: 'rotate(3deg)',
          }}
        >
          archive
        </p>
      </div>
    </section>
  )
}
