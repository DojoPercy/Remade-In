'use client'

import { useState } from 'react'
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

function typeLabel(type: DocType): string {
  if (type === 'Policy Brief') return 'POLICY BRIEF'
  return type.toUpperCase()
}

function matchesFilter(doc: CardDoc, filter: FilterCategory): boolean {
  if (filter === 'All') return true
  if (filter === 'Reports') return doc.type === 'Report'
  if (filter === 'White Papers') return doc.type === 'White Paper'
  return doc.type === 'Policy Brief'
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function ResearchCard({ doc }: { doc: CardDoc }) {
  return (
    <div style={{ transform: `rotate(${doc.rotation}deg)` }}>
      <div
        className="flex flex-col rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl cursor-pointer"
        style={{ background: colors.cardSurface, height: 353 }}
      >
        {/* Colored header */}
        <div
          className="relative px-8 pt-10 pb-6 flex-shrink-0"
          style={{ background: doc.headerColor, height: '55%' }}
        >
          {/* Corner diamond */}
          <div
            className="absolute -top-6 -right-6"
            style={{
              width: 118,
              height: 117,
              background: doc.cornerColor,
              transform: 'rotate(-30deg)',
            }}
          />

          <p
            className="relative z-10 font-bold"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 13,
              color: 'rgba(255,255,255,0.65)',
              textTransform: 'capitalize',
              lineHeight: '18.59px',
            }}
          >
            {typeLabel(doc.type)}{' '}
            <span style={{ fontSize: 16 }}>— {doc.year}</span>
          </p>

          <h3
            className="relative z-10 font-bold mt-3"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 17,
              color: colors.white,
              textTransform: 'capitalize',
              lineHeight: '24.31px',
              maxWidth: 194,
            }}
          >
            {doc.title}
          </h3>
        </div>

        {/* Paper body */}
        <div className="flex flex-col flex-1 px-8 pt-5 pb-5">
          <p
            className="flex-1 font-bold leading-snug"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 12,
              color: 'rgba(0,0,0,0.72)',
              textTransform: 'capitalize',
              letterSpacing: 0.6,
            }}
          >
            {doc.desc}
          </p>

          <div className="flex items-center justify-between mt-4">
            <span
              className="font-bold"
              style={{ fontFamily: fonts.bricolage, fontSize: 12, color: '#000000', textTransform: 'capitalize' }}
            >
              {doc.pages} pages
            </span>
            <a
              href={doc.href}
              className="font-bold transition-opacity hover:opacity-60"
              style={{ fontFamily: fonts.bricolage, fontSize: 12, color: colors.orange, textTransform: 'capitalize' }}
            >
              Read
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function MoreCard({ count, rotation }: { count: number; rotation: number }) {
  return (
    <div style={{ transform: `rotate(${rotation}deg)` }}>
      <div
        className="flex flex-col rounded-2xl overflow-hidden cursor-pointer"
        style={{ height: 353 }}
      >
        <div className="flex-shrink-0" style={{ background: colors.charcoal, height: '55%' }} />
        <div className="flex flex-col flex-1 px-8 pt-8 pb-5" style={{ background: colors.charcoal }}>
          <div className="flex-1">
            <span className="font-bold" style={{ fontFamily: fonts.bricolage, color: colors.white, fontSize: 24 }}>
              {count}{' '}
              <span style={{ fontSize: 20 }}>More</span>
            </span>
          </div>
          <p
            className="font-bold mb-4 leading-snug"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 12,
              color: 'rgba(106,103,103,0.72)',
              letterSpacing: 2.64,
              textTransform: 'capitalize',
            }}
          >
            Reports, briefs, field notes and community data updated quarterly.
          </p>
          <a
            href="#"
            className="font-bold self-end transition-opacity hover:opacity-70"
            style={{ fontFamily: fonts.bricolage, fontSize: 14, color: colors.orange, textTransform: 'capitalize' }}
          >
            Browse all
          </a>
        </div>
      </div>
    </div>
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
  const row1 = filtered.slice(0, 4)
  const row2 = filtered.slice(4, 7)
  const showMoreCard = active === 'All'
  const moreCount = totalCount - docs.length

  return (
    <section
      id="research"
      className="px-8 md:px-20 pt-20 pb-0"
      style={{ background: colors.white }}
    >
      {/* ── Heading ── */}
      <h2
        className="font-extrabold mb-10"
        style={{
          fontFamily: fonts.bricolage,
          fontSize: 'clamp(40px, 5vw, 64px)',
          lineHeight: 1.43,
          textTransform: 'capitalize',
        }}
      >
        <span style={{ color: '#000000' }}>Research </span>
        <span style={{ color: colors.orange }}>Archive.</span>
      </h2>

      {/* ── Filter pills ── */}
      <div className="flex flex-wrap items-center gap-3 mb-16">
        <span
          className="font-light mr-1"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 13,
            color: '#5E5B55',
            letterSpacing: 2.21,
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
              className="font-bold uppercase tracking-[2.21px] transition-colors duration-200"
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 13,
                lineHeight: '18.59px',
                borderRadius: 20,
                padding: '9px 20px',
                cursor: 'pointer',
                ...(isActive
                  ? { background: colors.charcoal, color: colors.white, border: 'none' }
                  : { background: 'transparent', color: '#5E5B55', border: '2px solid #D6D1C6' }),
              }}
            >
              {filter}
            </button>
          )
        })}
      </div>

      {/* ── Card rows ── */}
      <div className="flex flex-col gap-12">
        {row1.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
            {row1.map((doc) => (
              <ResearchCard key={doc.id} doc={doc} />
            ))}
          </div>
        )}

        {(row2.length > 0 || showMoreCard) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
            {row2.map((doc) => (
              <ResearchCard key={doc.id} doc={doc} />
            ))}
            {showMoreCard && moreCount > 0 && <MoreCard count={moreCount} rotation={3} />}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="mt-16 pt-6 relative" style={{ borderTop: '2px solid rgba(214,209,198,0.17)' }}>
        <div className="flex items-center justify-between mb-0">
          <p
            className="font-bold"
            style={{ fontFamily: fonts.bricolage, fontSize: 14, color: 'rgba(0,0,0,0.51)', textTransform: 'capitalize' }}
          >
            Showing{' '}
            <span style={{ color: '#000000' }}>{docs.length}</span>
            {' '}of {totalCount} documents — updated quarterly
          </p>
          <span
            className="font-bold inline-block"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 14,
              color: 'rgba(0,0,0,0.25)',
              textTransform: 'capitalize',
              transform: 'rotate(3deg)',
            }}
          >
            in archive
          </span>
        </div>

        <p
          className="font-extrabold uppercase text-center select-none pointer-events-none"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(64px, 10vw, 128px)',
            fontWeight: 800,
            color: 'rgba(0,0,0,0.04)',
            lineHeight: 1,
          }}
        >
          archive
        </p>
      </div>
    </section>
  )
}
