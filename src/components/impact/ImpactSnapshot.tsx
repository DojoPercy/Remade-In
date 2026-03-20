'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import CountUp from '@/components/ui/CountUp'

interface Metric {
  metric: string
  value: number
  unit?: string
  icon?: string
  order: number
}

interface Props {
  data?: Metric[]
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const GRID_STYLE: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(${colors.white}08 1px, transparent 1px),
    linear-gradient(90deg, ${colors.white}08 1px, transparent 1px)
  `,
  backgroundSize: '80px 80px',
}

// Default hero (big 3) and secondary metrics when no CMS data
const DEFAULT_HERO: Metric[] = [
  { metric: 'Water Saved', value: 500000, unit: 'L', icon: '💧', order: 0 },
  { metric: 'CO₂ Emissions Avoided', value: 6250, unit: 'kg', icon: '🌍', order: 1 },
  { metric: 'Textile Waste Diverted', value: 250, unit: 'kg', icon: '♻️', order: 2 },
]

const DEFAULT_SECONDARY: Metric[] = [
  { metric: 'Events Hosted', value: 12, unit: '', icon: '', order: 3 },
  { metric: 'Participants Reached', value: 3200, unit: '+', icon: '', order: 4 },
  { metric: 'Social Engagements', value: 250000, unit: '+', icon: '', order: 5 },
  { metric: 'Community Investment', value: 10280, unit: '€', icon: '', order: 6 },
]

export default function ImpactSnapshot({ data }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const sorted = data ? [...data].sort((a, b) => a.order - b.order) : null
  const heroMetrics = sorted ? sorted.slice(0, 3) : DEFAULT_HERO
  const secondaryMetrics = sorted ? sorted.slice(3) : DEFAULT_SECONDARY

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease } } : {},
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-8 md:px-20 pt-20 pb-0"
      style={{ backgroundColor: colors.charcoal, ...GRID_STYLE }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 85% 20%, ${colors.orange}08 0, transparent 50%)`,
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div {...anim(0)} className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px shrink-0" style={{ backgroundColor: colors.orange }} />
              <span
                className="font-bold uppercase tracking-[0.22em]"
                style={{ fontFamily: fonts.syne, fontSize: 10, color: colors.orange }}
              >
                2025 Impact Snapshot
              </span>
            </motion.div>
            <motion.h2
              {...anim(0.08)}
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: colors.cream,
              }}
            >
              Transparent metrics for
              <br />
              <em style={{ color: colors.orange, fontStyle: 'normal' }}>partners</em> and communities.
            </motion.h2>
          </div>

          <motion.p
            {...anim(0.16)}
            className="max-w-xs"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 15,
              fontWeight: 500,
              lineHeight: 1.7,
              color: `${colors.cream}99`,
            }}
          >
            Every figure is traceable to a pilot dataset. Quarterly updates published so the
            community can hold us accountable.
          </motion.p>
        </div>

        {/* Hero stats — 3 columns */}
        <motion.div
          {...anim(0.2)}
          className="grid grid-cols-1 md:grid-cols-3 mb-px"
          style={{ borderTop: `1px solid ${colors.white}14`, borderBottom: `1px solid ${colors.white}14` }}
        >
          {heroMetrics.map((stat, i) => (
            <div
              key={stat.metric}
              className={`py-10 flex flex-col gap-3 ${i > 0 ? 'border-t md:border-t-0 md:border-l' : ''} md:pr-10 ${i > 0 ? 'md:pl-10' : ''}`}
              style={{ borderColor: `${colors.white}14` }}
            >
              {/* Slot index annotation */}
              <span
                aria-hidden
                className="hidden md:block"
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 11,
                  color: `${colors.cream}18`,
                  letterSpacing: '0.06em',
                }}
              >
                {String(i + 1).padStart(2, '0')} /
              </span>

              {/* Number */}
              <div
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 'clamp(48px, 5.5vw, 76px)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: colors.cream,
                }}
              >
                <CountUp
                  to={stat.value}
                  duration={2.2}
                  format={(n) => n.toLocaleString()}
                />
                <span style={{ color: colors.orange }}>{stat.unit}</span>
              </div>

              {/* Label */}
              <p
                className="font-bold"
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 12,
                  color: `${colors.cream}cc`,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {stat.metric}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Secondary stats — 4 columns */}
        {secondaryMetrics.length > 0 && (
          <motion.div
            {...anim(0.3)}
            className="grid grid-cols-2 md:grid-cols-4 mt-px"
            style={{ borderBottom: `1px solid ${colors.white}14` }}
          >
            {secondaryMetrics.map((stat, i) => (
              <div
                key={stat.metric}
                className={`py-8 flex flex-col gap-1.5 ${i > 0 ? 'border-t sm:border-t-0 sm:border-l' : ''} sm:pr-8 ${i > 0 ? 'sm:pl-8' : ''}`}
                style={{ borderColor: `${colors.white}14` }}
              >
                <span
                  style={{
                    fontFamily: fonts.bricolage,
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    fontWeight: 900,
                    color: colors.orange,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {stat.unit === '€'
                    ? `€${stat.value.toLocaleString()}`
                    : `${stat.value.toLocaleString()}${stat.unit ?? ''}`}
                </span>
                <span
                  style={{
                    fontFamily: fonts.syne,
                    fontSize: 10,
                    fontWeight: 700,
                    color: `${colors.cream}55`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  {stat.metric}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Marquee ticker */}
        <div className="relative mt-0 overflow-hidden" style={{ borderTop: `1px solid ${colors.white}08` }}>
          <div
            className="ticker-track flex whitespace-nowrap py-5"
            style={{
              fontFamily: fonts.syne,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: `${colors.cream}28`,
            }}
          >
            {[...Array(2)].map((_, ri) => (
              <span key={ri} className="flex items-center">
                {[
                  '500,000L Water Saved',
                  '6,250kg CO₂ Avoided',
                  '250kg Textile Diverted',
                  '12 Events Hosted',
                  '3,200+ Participants',
                  '€10,280 Invested',
                  'Justice-Led Model',
                  'Kantamanto → Netherlands',
                ].map((item) => (
                  <span key={item} className="flex items-center">
                    <span className="px-8">{item}</span>
                    <span style={{ color: colors.orange }}>·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
