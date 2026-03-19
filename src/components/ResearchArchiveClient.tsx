'use client'

import { useState } from 'react'
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

// ── Config ─────────────────────────────────────────────────────────────────────

const FILTERS: FilterCategory[] = ['All', 'Reports', 'White Papers', 'Policy Briefs']

// Book heights vary like a real shelf
const BOOK_HEIGHTS = [268, 238, 284, 250, 262, 278, 226, 256, 244]

// Library classification sticker labels
const TYPE_STICKER: Record<DocType, string> = {
  'Report':       'RPT',
  'White Paper':  'W·P',
  'Policy Brief': 'P·B',
}

function matchesFilter(doc: CardDoc, filter: FilterCategory): boolean {
  if (filter === 'All') return true
  if (filter === 'Reports') return doc.type === 'Report'
  if (filter === 'White Papers') return doc.type === 'White Paper'
  return doc.type === 'Policy Brief'
}

// ── Book card ──────────────────────────────────────────────────────────────────

function BookCard({
  doc,
  index,
  height,
  className = '',
}: {
  doc: CardDoc
  index: number
  height: number
  className?: string
}) {
  const isAvailable = doc.href !== '#'

  return (
    <motion.div
      key={doc.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
      // Spotlight: when shelf is hovered, this card dims unless directly hovered
      className={`group-hover/shelf:opacity-40 hover:!opacity-100 hover:-translate-y-3 transition-[opacity,transform] duration-300 ${className}`}
    >
      <a
        href={isAvailable ? doc.href : undefined}
        target={isAvailable ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="relative flex flex-col justify-between overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        style={{
          width: 148,
          height,
          background: doc.headerColor,
          cursor: isAvailable ? 'pointer' : 'default',
          textDecoration: 'none',
          padding: '14px 14px 12px',
        }}
      >
        {/* Patchwork corner accent — diagonal square */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -28,
            right: -28,
            width: 80,
            height: 80,
            background: doc.cornerColor,
            transform: 'rotate(30deg)',
            opacity: 0.35,
          }}
        />

        {/* Second patchwork patch — bottom left */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: -20,
            left: -16,
            width: 56,
            height: 56,
            background: 'rgba(0,0,0,0.12)',
            transform: 'rotate(15deg)',
            borderRadius: 4,
          }}
        />

        {/* Year */}
        <span
          className="relative z-10"
          style={{
            fontFamily: fonts.syne,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          {doc.year}
        </span>

        {/* Title */}
        <h3
          className="relative z-10 flex-1 flex items-end py-3"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 15,
            fontWeight: 800,
            color: colors.white,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}
        >
          {doc.title}
        </h3>

        {/* Bottom: pages + classification sticker */}
        <div className="relative z-10 flex items-end justify-between">
          <span
            style={{
              fontFamily: fonts.syne,
              fontSize: 9,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {doc.pages}p
          </span>

          {/* Library classification sticker */}
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.18)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: fonts.syne,
                fontSize: 7,
                fontWeight: 900,
                color: 'rgba(255,255,255,0.9)',
                textAlign: 'center',
                lineHeight: 1.2,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {TYPE_STICKER[doc.type]}
            </span>
          </div>
        </div>

        {/* Availability indicator */}
        {!isAvailable && (
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-1.5"
            style={{ background: 'rgba(0,0,0,0.28)' }}
          >
            <span style={{ fontFamily: fonts.syne, fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Coming soon
            </span>
          </div>
        )}
      </a>
    </motion.div>
  )
}

// ── "More" book ────────────────────────────────────────────────────────────────

function MoreBook({ count, className = '' }: { count: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`group-hover/shelf:opacity-40 hover:!opacity-100 hover:-translate-y-3 transition-[opacity,transform] duration-300 ${className}`}
    >
      <div
        className="relative flex flex-col justify-between overflow-hidden rounded-sm"
        style={{
          width: 148,
          height: 256,
          background: colors.charcoal,
          border: `2px dashed rgba(255,255,255,0.12)`,
          padding: '14px 14px 12px',
          cursor: 'pointer',
        }}
      >
        {/* Big count */}
        <span
          className="absolute bottom-10 left-4 font-black leading-none"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 64,
            color: 'rgba(255,255,255,0.06)',
            letterSpacing: '-0.05em',
          }}
        >
          +{count}
        </span>

        <span
          style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.25)' }}
        >
          Archive
        </span>

        <p
          style={{ fontFamily: fonts.bricolage, fontSize: 12, lineHeight: 1.6, color: 'rgba(255,255,255,0.28)' }}
        >
          More reports, briefs &amp; field notes
        </p>

        <div className="flex items-center justify-between">
          <span style={{ fontFamily: fonts.syne, fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Browse →
          </span>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: `${colors.orange}22`,
              border: `1.5px solid ${colors.orange}44`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontFamily: fonts.syne, fontSize: 7, fontWeight: 900, color: colors.orange, textAlign: 'center', lineHeight: 1.2, letterSpacing: '0.04em' }}>
              ALL
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Wooden shelf ───────────────────────────────────────────────────────────────

function WoodenShelf() {
  return (
    <div style={{ position: 'relative', marginTop: 1 }}>
      {/* Shelf surface */}
      <div style={{
        height: 14,
        background: 'linear-gradient(to bottom, #C8924A 0%, #9B6B22 60%, #7A5018 100%)',
        boxShadow: '0 6px 20px rgba(90, 50, 10, 0.35)',
        borderRadius: '0 0 2px 2px',
      }} />
      {/* Shelf shadow */}
      <div style={{
        height: 8,
        background: 'linear-gradient(to bottom, rgba(90,50,10,0.18), transparent)',
      }} />
    </div>
  )
}

// ── Sticker badge (header decoration) ─────────────────────────────────────────

function StickerBadge() {
  return (
    <div
      style={{
        width: 62,
        height: 62,
        borderRadius: '50%',
        background: colors.orange,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'rotate(-14deg)',
        flexShrink: 0,
        boxShadow: `0 4px 14px ${colors.orange}55`,
      }}
    >
      <span
        style={{
          fontFamily: fonts.syne,
          fontSize: 8,
          fontWeight: 900,
          color: colors.white,
          textAlign: 'center',
          lineHeight: 1.25,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        Know-<br />ledge<br />Base
      </span>
    </div>
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
      <p style={{ fontFamily: fonts.bricolage, fontSize: 15, color: 'rgba(26,26,20,0.4)', lineHeight: 1.6 }}>
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

  const filtered = docs.filter((doc) => matchesFilter(doc, active))
  const showMoreCard = active === 'All'
  const moreCount = totalCount - docs.length

  return (
    <section
      id="research"
      className="px-8 md:px-20 pt-20 pb-24"
      style={{ backgroundColor: colors.cream }}
    >
      {/* ── Section header ── */}
      <div className="flex items-start gap-5 mb-10">
        <StickerBadge />
        <div>
          <h2
            className="font-extrabold leading-none"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(36px, 5vw, 64px)',
              letterSpacing: '-0.025em',
              color: colors.charcoal,
            }}
          >
            Research{' '}
            <em style={{ color: colors.orange, fontStyle: 'italic' }}>Archive.</em>
          </h2>
        </div>
      </div>

      {/* ── Filter pills ── */}
      <div
        className="flex items-center gap-2 mb-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1"
      >
        <span
          className="shrink-0 font-bold mr-2"
          style={{ fontFamily: fonts.syne, fontSize: 10, color: 'rgba(26,26,20,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}
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
              className="shrink-0 font-bold transition-all duration-200"
              style={{
                fontFamily: fonts.syne,
                fontSize: 11,
                letterSpacing: '0.1em',
                borderRadius: 20,
                padding: '7px 16px',
                cursor: 'pointer',
                ...(isActive
                  ? { background: colors.orange, color: colors.white, border: '2px solid transparent' }
                  : { background: 'transparent', color: 'rgba(26,26,20,0.45)', border: '2px solid rgba(26,26,20,0.1)' }),
              }}
            >
              {filter}
            </button>
          )
        })}
      </div>

      {/* ── Desktop bookshelf ── */}
      <div className="hidden md:block">
        {filtered.length === 0 ? (
          <EmptyState filter={active} />
        ) : (
          <>
            {/* The shelf — named group for spotlight hover */}
            <div className="group/shelf flex flex-wrap items-end gap-3">
              <AnimatePresence mode="sync" initial={false}>
                {filtered.map((doc, i) => (
                  <BookCard
                    key={doc.id}
                    doc={doc}
                    index={i}
                    height={BOOK_HEIGHTS[i % BOOK_HEIGHTS.length]}
                  />
                ))}
                {showMoreCard && moreCount > 0 && (
                  <MoreBook key="more" count={moreCount} />
                )}
              </AnimatePresence>
            </div>
            <WoodenShelf />
          </>
        )}
      </div>

      {/* ── Mobile: horizontal book scroll ── */}
      <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-3 pb-4 -mx-8 px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <AnimatePresence mode="sync" initial={false}>
          {filtered.length === 0 ? (
            <EmptyState key="empty" filter={active} />
          ) : (
            <>
              {filtered.map((doc, i) => (
                <BookCard
                  key={doc.id}
                  doc={doc}
                  index={i}
                  height={240}
                  className="snap-start flex-none"
                />
              ))}
              {showMoreCard && moreCount > 0 && (
                <MoreBook key="more" count={moreCount} className="snap-start flex-none" />
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer ── */}
      <div
        className="mt-10 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
        style={{ borderTop: '1px solid rgba(160,110,50,0.12)' }}
      >
        <p style={{ fontFamily: fonts.bricolage, fontSize: 13, color: 'rgba(26,26,20,0.38)', lineHeight: 1.5 }}>
          Showing{' '}
          <strong style={{ color: colors.charcoal }}>{filtered.length}</strong>
          {' '}of {totalCount} documents
        </p>
        <p style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, color: 'rgba(26,26,20,0.18)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          Updated quarterly
        </p>
      </div>
    </section>
  )
}
