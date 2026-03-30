'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import { imageUrl } from '@/lib/sanity/image'

interface Partner {
  _id: string
  name: string
  url?: string
  logo?: { asset?: { url: string }; alt?: string }
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const PHASES = [
  {
    year: '2025',
    count: '250',
    countLabel: 'garments',
    phase: 'Foundation',
    countSize: 'clamp(24px, 2.2vw, 32px)',
    summary: 'Proof of concept — 250 garments remanufactured, research published at AFW.',
  },
  {
    year: '2027',
    count: '10,000',
    countLabel: 'per hub / yr',
    phase: 'Pilot Hubs',
    countSize: 'clamp(32px, 3.2vw, 46px)',
    summary: '3 community remanufacturing hubs open across the Netherlands.',
  },
  {
    year: '2030',
    count: '300,000',
    countLabel: 'per year',
    phase: 'Regional Scale',
    countSize: 'clamp(40px, 4.2vw, 62px)',
    summary: '12 active hubs, EPR policy embedded, expanding into Belgium & Germany.',
  },
  {
    year: '2035',
    count: '1,000,000',
    countLabel: 'annually',
    phase: '1M Garments',
    countSize: 'clamp(50px, 6vw, 86px)',
    summary: 'EU model in 5+ countries. 2,500+ jobs. Kantamanto exports measurably reduced.',
  },
]

const FALLBACK_PARTNERS = [
  'The Social Hub', 'Het Goed', 'RTT', 'DCW', 'Avans University', 'Shared Bag',
]

export default function BlueprintRoadmap({ partners = [] }: { partners?: Partner[] }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease } } : {},
  })

  return (
    <section
      ref={ref}
      className="px-8 md:px-20 py-24 md:py-32"
      style={{ backgroundColor: colors.cream }}
    >
      {/* Header */}
      <motion.div {...anim(0)} className="mb-16">
        <p
          className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em]"
          style={{ fontFamily: fonts.syne, color: colors.orange }}
        >
          The Plan
        </p>
        <h2
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(26px, 3.5vw, 50px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: colors.ink,
            maxWidth: 600,
          }}
        >
          From 250 garments today to{' '}
          <em style={{ color: colors.orange, fontStyle: 'normal' }}>1,000,000 by 2035.</em>
        </h2>
        <p
          className="mt-4 max-w-lg"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            lineHeight: 1.75,
            color: `${colors.ink}58`,
          }}
        >
          A 10-year roadmap in three phases — from proof-of-concept pilot hubs to a
          European model for community-led remanufacturing.
        </p>

        {/* Dutch context strip */}
        <div
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2 pt-5"
          style={{ borderTop: `1px solid ${colors.ink}18` }}
        >
          {[
            { label: 'Dutch fashion market', value: '€2.9B' },
            { label: 'EPR legislation', value: '2026' },
            { label: 'Pilot cities identified', value: '3' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 15,
                  fontWeight: 800,
                  color: colors.orange,
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.12em',
                  color: `${colors.ink}40`,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Scale visualization ── */}
      <motion.div
        {...anim(0.1)}
        className="mb-16 overflow-x-auto"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div
          className="flex items-end min-w-[560px]"
          style={{ borderBottom: `1px solid ${colors.ink}10`, paddingBottom: 16 }}
        >
          {PHASES.map((phase, i) => (
            <div
              key={phase.year}
              className="flex-1 flex flex-col items-start pr-4"
              style={{
                borderRight: i < PHASES.length - 1 ? `1px solid ${colors.ink}07` : 'none',
              }}
            >
              {/* Year */}
              <span
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.18em',
                  color: colors.orange,
                  marginBottom: 6,
                  display: 'block',
                }}
              >
                {phase.year}
              </span>

              {/* Count — typography scale communicates growth */}
              <span
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: phase.countSize,
                  fontWeight: 800,
                  color: colors.ink,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  display: 'block',
                }}
              >
                {phase.count}
              </span>

              {/* Unit */}
              <span
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.12em',
                  color: `${colors.ink}38`,
                  marginTop: 5,
                  display: 'block',
                }}
              >
                {phase.countLabel}
              </span>
            </div>
          ))}
        </div>
        <p
          className="mt-3 text-[9px] font-bold uppercase tracking-[0.18em]"
          style={{ fontFamily: fonts.syne, color: `${colors.ink}28` }}
        >
          Garments remanufactured →
        </p>
      </motion.div>

      {/* ── Phase cards ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {PHASES.map((phase, i) => (
          <motion.div
            key={phase.year}
            initial={{ opacity: 0, y: 28 }}
            animate={
              inView
                ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 + i * 0.08, ease } }
                : {}
            }
            className="relative flex flex-col p-6 rounded-[10px]"
            style={{
              backgroundColor: `${colors.lightBlue}22`,
              border: `1px solid ${colors.lightBlue}55`,
            }}
          >
            {/* Top accent — intensity grows with each phase */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[10px]"
              style={{ backgroundColor: colors.orange, opacity: 0.28 + i * 0.18 }}
            />

            <p
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 15,
                fontWeight: 700,
                color: colors.ink,
                lineHeight: 1.3,
                marginBottom: 8,
              }}
            >
              {phase.phase}
            </p>
            <p
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 13,
                lineHeight: 1.6,
                color: `${colors.ink}60`,
              }}
            >
              {phase.summary}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div {...anim(0.5)} className="mt-10">
        <a
          href="/partner"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] transition-opacity duration-200 hover:opacity-70"
          style={{ fontFamily: fonts.syne, color: colors.orange }}
        >
          Explore partnership opportunities →
        </a>
      </motion.div>

      {/* Partner logos */}
      <motion.div
        {...anim(0.6)}
        className="mt-10 pt-8"
        style={{ borderTop: `1px solid ${colors.ink}18` }}
      >
        <p
          className="mb-5 text-[9px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: fonts.syne, color: `${colors.ink}30` }}
        >
          Partners
        </p>

        {partners.length > 0 ? (
          <div className="flex flex-wrap items-center gap-6">
            {partners.map((p) => {
              const logoSrc = p.logo?.asset?.url
                ? imageUrl({ asset: { url: p.logo.asset.url }, alt: p.logo.alt || p.name }, 240, 96)
                : null

              const inner = logoSrc ? (
                <Image
                  src={logoSrc}
                  alt={p.logo?.alt || p.name}
                  width={120}
                  height={40}
                  className="max-h-9 w-auto object-contain transition-all duration-300"
                  style={{ filter: 'grayscale(1) opacity(0.45)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0) opacity(1)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(1) opacity(0.45)'
                  }}
                />
              ) : (
                <span
                  style={{
                    fontFamily: fonts.bricolage,
                    fontSize: 13,
                    fontWeight: 700,
                    color: `${colors.ink}40`,
                    whiteSpace: 'nowrap' as const,
                  }}
                >
                  {p.name}
                </span>
              )

              return p.url ? (
                <a
                  key={p._id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${p.name}`}
                >
                  {inner}
                </a>
              ) : (
                <div key={p._id}>{inner}</div>
              )
            })}
          </div>
        ) : (
          /* Fallback text names when CMS is unavailable */
          <div className="flex flex-wrap gap-2">
            {FALLBACK_PARTNERS.map((name) => (
              <span
                key={name}
                className="px-3 py-1 rounded-full text-[10px] font-bold"
                style={{
                  fontFamily: fonts.syne,
                  backgroundColor: `${colors.lightBlue}55`,
                  color: colors.charcoal,
                  border: `1px solid ${colors.lightBlue}`,
                }}
              >
                {name}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}
