'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import { colors, fonts } from '@/lib/tokens'

interface TimelineEntry {
  year: number
  quarter?: string
  garments: number
  isProjection: boolean
  notes?: string
}

interface Props {
  data?: TimelineEntry[]
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

function logBar(value: number, max: number): number {
  if (value <= 0 || max <= 0) return 0
  return (Math.log10(value + 1) / Math.log10(max + 1)) * 100
}

export default function ImpactTimeline({ data }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [expandedKey, setExpandedKey] = useState<string | null>(null)

  const timeline = data || [
    { year: 2023, garments: 50, isProjection: false, notes: 'Research phase + pilot design completed' },
    { year: 2024, garments: 120, isProjection: false, notes: 'Community pilots launched across Kantamanto' },
    { year: 2025, quarter: 'Q1', garments: 250, isProjection: false, notes: 'Impact reporting + scale plan published' },
    { year: 2026, garments: 500, isProjection: true, notes: 'Regional hub activation begins' },
    { year: 2030, garments: 250000, isProjection: true, notes: 'Multi-city network across West Africa and Europe' },
    { year: 2035, garments: 1000000, isProjection: true, notes: '1M garments — the long-term target' },
  ]

  const maxGarments = Math.max(...timeline.map((t) => t.garments))

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-8 md:px-20 pt-20 pb-0"
      style={{ backgroundColor: colors.charcoal }}
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 95% 60%, ${colors.amber}06 0, transparent 50%)`,
        }}
      />

      <div className="relative">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-8 h-px shrink-0" style={{ backgroundColor: colors.orange }} />
          <span
            className="font-bold uppercase tracking-[0.22em]"
            style={{ fontFamily: fonts.syne, fontSize: 10, color: colors.orange }}
          >
            Impact Over Time
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease, delay: 0.08 }}
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.028em',
            color: colors.cream,
            maxWidth: '20ch',
          }}
        >
          From pilot to scale — with{' '}
          <em style={{ color: colors.orange, fontStyle: 'normal' }}>transparent milestones.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
          className="mt-4 mb-14 text-sm"
          style={{
            fontFamily: fonts.syne,
            color: `${colors.cream}44`,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontSize: 10,
          }}
        >
          Bar widths use a log scale · click any row for context
        </motion.p>

        {/* Timeline rows — tabular style */}
        <div style={{ borderTop: `1px solid ${colors.white}14` }}>
          {timeline.map((entry, idx) => {
            const key = `${entry.year}${entry.quarter ?? ''}`
            const isFuture = entry.isProjection
            const barPct = logBar(entry.garments, maxGarments)

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.24 + idx * 0.07, ease }}
                style={{ borderBottom: `1px solid ${colors.white}14` }}
              >
                <button
                  onClick={() => setExpandedKey(expandedKey === key ? null : key)}
                  className="w-full text-left group py-7"
                  aria-expanded={expandedKey === key}
                >
                  <div className="flex items-center gap-6">
                    {/* Year + quarter */}
                    <div style={{ minWidth: 96 }}>
                      <span
                        style={{
                          fontFamily: fonts.bricolage,
                          fontSize: 24,
                          fontWeight: 900,
                          color: isFuture ? `${colors.cream}55` : colors.cream,
                          display: 'block',
                          lineHeight: 1,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {entry.year}
                      </span>
                      {entry.quarter && (
                        <span
                          style={{
                            fontFamily: fonts.syne,
                            fontSize: 10,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: colors.orange,
                          }}
                        >
                          {entry.quarter}
                        </span>
                      )}
                    </div>

                    {/* Bar */}
                    <div
                      className="flex-1 h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: `${colors.white}08` }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${barPct}%` } : {}}
                        transition={{ delay: 0.28 + idx * 0.07 + 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{
                          background: isFuture
                            ? `linear-gradient(90deg, ${colors.orange}44, ${colors.orange}14)`
                            : `linear-gradient(90deg, ${colors.orange}, ${colors.blue})`,
                        }}
                      />
                    </div>

                    {/* Garment count */}
                    <span
                      style={{
                        fontFamily: fonts.bricolage,
                        fontSize: 18,
                        fontWeight: 900,
                        color: isFuture ? `${colors.cream}55` : colors.cream,
                        minWidth: 110,
                        textAlign: 'right',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {entry.garments.toLocaleString()}
                    </span>

                    {/* Status badge */}
                    <div style={{ minWidth: 80, textAlign: 'right' }}>
                      <span
                        style={{
                          fontFamily: fonts.syne,
                          fontSize: 9,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.14em',
                          color: isFuture ? `${colors.orange}66` : `${colors.blue}cc`,
                        }}
                      >
                        {isFuture ? 'Projected' : 'Actual'}
                      </span>
                    </div>

                    {/* Expand chevron */}
                    {entry.notes && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="shrink-0"
                        style={{
                          color: `${colors.cream}30`,
                          transform: expandedKey === key ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.25s',
                        }}
                      >
                        <path d="M2.5 5l4.5 4.5L11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>

                  {/* Expandable notes */}
                  <AnimatePresence>
                    {expandedKey === key && entry.notes && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        style={{
                          overflow: 'hidden',
                          fontFamily: fonts.bricolage,
                          fontSize: 14,
                          color: `${colors.cream}88`,
                          lineHeight: 1.6,
                          paddingTop: 12,
                          paddingLeft: 102,
                        }}
                      >
                        {entry.notes}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="mt-16" style={{ borderTop: `1px solid ${colors.white}08` }} />
    </section>
  )
}
