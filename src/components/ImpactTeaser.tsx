'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import type { HomePage } from '@/lib/sanity/types'
import CountUp from '@/components/ui/CountUp'
import SectionDivider from '@/components/ui/SectionDivider'

// ── Fallback data ──────────────────────────────────────────────────────────────

const FALLBACK_HERO_STATS = [
  { to: 500000, suffix: 'L',  label: 'Litres of water saved',  note: 'through upcycling & reuse' },
  { to: 6250,   suffix: 'kg', label: 'CO₂ emissions avoided',  note: 'in 2025 alone'             },
  { to: 250,    suffix: 'kg', label: 'Textile waste diverted',  note: 'from landfill & export'   },
]

const FALLBACK_SECONDARY_STATS = [
  { display: '12',      label: 'Events hosted'             },
  { display: '3,200+',  label: 'Participants'               },
  { display: '250K+',   label: 'Social engagements in 2025' },
  { display: '€10,280', label: 'Invested into Kantamanto'   },
]

// ── Helpers ────────────────────────────────────────────────────────────────────

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease } },
})

// ── Component ──────────────────────────────────────────────────────────────────

export default function ImpactTeaser({ data }: { data?: HomePage | null }) {
  const heroStats      = data?.impactHeroStats?.length      ? data.impactHeroStats      : FALLBACK_HERO_STATS
  const secondaryStats = data?.impactSecondaryStats?.length ? data.impactSecondaryStats : FALLBACK_SECONDARY_STATS
  const year           = data?.impactYear           ?? 2025
  const eyebrow        = data?.impactEyebrow        ?? 'Our Impact'
  const headlinePre    = data?.impactHeadline        ?? 'Turning waste'
  const headlineAccent = data?.impactHeadlineAccent  ?? 'measurable'
  const headlineEnd    = data?.impactHeadlineEnd     ?? 'impact.'

  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const anim = (delay: number) => ({
    initial: fadeUp(delay).initial,
    animate: inView ? fadeUp(delay).animate : fadeUp(delay).initial,
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-8 md:px-20 pt-14 pb-20 md:pt-28 md:pb-36"
      style={{ backgroundColor: '#6776b6' }}
    >
      {/* ── Subtle grid lines ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${colors.white}08 1px, transparent 1px), linear-gradient(90deg, ${colors.white}08 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              {...anim(0)}
              className="text-[15px] font-bold uppercase tracking-[0.28em] mb-4"
              style={{ fontFamily: fonts.syne, color: '#cbd183' }}
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              {...anim(0.08)}
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: colors.white,
              }}
            >
              {headlinePre}<br />
              into <em style={{ color: '#cbd183', fontStyle: 'normal' }}>{headlineAccent}</em> {headlineEnd}
            </motion.h2>
          </div>

        
        </div>

        {/* ── Hero stats — 3 columns ── */}
        <motion.div
          {...anim(0.2)}
          className="grid grid-cols-1 md:grid-cols-3 mb-px"
          style={{ borderTop: `1px solid ${colors.white}18`, borderBottom: `1px solid ${colors.white}18` }}
        >
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-10 flex flex-col gap-3 ${i > 0 ? 'border-t md:border-t-0 md:border-l' : ''} md:pr-10 ${i > 0 ? 'md:pl-10' : ''}`}
              style={{ borderColor: `${colors.white}18` }}
            >
              {/* Number */}
              <div
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 'clamp(52px, 6vw, 80px)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: colors.white,
                }}
              >
                ~<CountUp
                  to={stat.to}
                  duration={2.2}
                  format={(n) => n.toLocaleString()}
                />
                <span style={{ color: '#cbd183' }}>{stat.suffix}</span>
              </div>

              {/* Label */}
              <p
                className="font-bold"
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 13,
                  color: colors.white,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {stat.label}
              </p>

              {/* Note */}
              <p
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 13,
                  color: `${colors.white}88`,
                  lineHeight: 1.5,
                }}
              >
                {stat.note}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Secondary stats ── */}
        <motion.div
          {...anim(0.3)}
          className="grid grid-cols-2 md:grid-cols-4 mt-px"
          style={{ borderBottom: `1px solid ${colors.white}18` }}
        >
          {secondaryStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 flex flex-col gap-1.5 ${i > 0 ? 'border-t sm:border-t-0 sm:border-l' : ''} sm:pr-8 ${i > 0 ? 'sm:pl-8' : ''}`}
              style={{ borderColor: `${colors.white}18` }}
            >
              <span
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 'clamp(24px, 2.5vw, 32px)',
                  fontWeight: 900,
                  color: '#cbd183',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {stat.display}
              </span>
              <span
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 11,
                  fontWeight: 700,
                  color: `${colors.white}66`,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* ── Marquee ticker ──
      <div className="relative mt-16 overflow-hidden" style={{ borderTop: `1px solid ${colors.white}10` }}>
        <div
          className="ticker-track flex whitespace-nowrap py-5 gap-0"
          style={{ fontFamily: 'var(--font-syne)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: `${colors.cream}28` }}
        >
          {[...Array(2)].map((_, ri) => (
            <span key={ri} className="flex items-center gap-0">
              {['500,000L Water Saved', '6,250kg CO₂ Avoided', '250kg Textile Diverted', '12 Events Hosted', '3,200+ Participants', '€10,280 Invested', 'Justice-Led Model', 'Kantamanto → Netherlands'].map((item) => (
                <span key={item} className="flex items-center">
                  <span className="px-8">{item}</span>
                  <span style={{ color: '#cbd183' }}>·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div> */}

      {/* ── Ramp into ResearchArchive ── */}
      <SectionDivider fill={colors.white} direction="right" height={52} />
    </section>
  )
}
