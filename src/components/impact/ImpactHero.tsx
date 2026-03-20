'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import BlobButton from '@/components/ui/BlobButton'

interface HeroMetrics {
  currentGarments: number
  targetGarments: number
  lastUpdated: string
}

interface Props {
  data?: HeroMetrics
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const GRID_STYLE: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(${colors.white}08 1px, transparent 1px),
    linear-gradient(90deg, ${colors.white}08 1px, transparent 1px)
  `,
  backgroundSize: '80px 80px',
}

export default function ImpactHero({ data }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgX = useTransform(scrollYProgress, [0, 1], ['0%', '-4%'])

  const metrics = data || {
    currentGarments: 250,
    targetGarments: 1_000_000,
    lastUpdated: '2025-01-01',
  }

  const PROGRESS_PCT = Math.min((metrics.currentGarments / metrics.targetGarments) * 100, 100)
  const circumference = 2 * Math.PI * 108
  const progressAngle = PROGRESS_PCT * 3.6

  const lastUpdatedDate = new Date(metrics.lastUpdated)
  const formattedDate = lastUpdatedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  const nextUpdate = new Date(lastUpdatedDate)
  nextUpdate.setMonth(nextUpdate.getMonth() + 3)
  const formattedNextUpdate = nextUpdate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease } } : {},
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-8 md:px-20 pt-28 pb-0 md:pt-32"
      style={{ backgroundColor: colors.charcoal, ...GRID_STYLE }}
    >
      {/* Radial glow accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 15% 40%, ${colors.orange}10 0, transparent 52%), radial-gradient(ellipse at 80% 10%, ${colors.amber}07 0, transparent 48%)`,
        }}
      />

      {/* Editorial watermark */}
      <motion.span
        aria-hidden
        style={{ x: bgX }}
        className="pointer-events-none select-none absolute right-0 top-0 font-black leading-none whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, ease }}
      >
        <span
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(100px, 14vw, 200px)',
            color: 'rgba(255,255,255,0.022)',
            letterSpacing: '-0.05em',
            lineHeight: 0.85,
          }}
        >
          IM
          <br />
          PACT
        </span>
      </motion.span>

      <div className="relative max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.div {...anim(0)} className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px shrink-0" style={{ backgroundColor: colors.orange }} />
          <span
            className="font-bold uppercase tracking-[0.22em]"
            style={{ fontFamily: fonts.syne, fontSize: 10, color: colors.orange }}
          >
            Impact Transparency · 2025
          </span>
          <span
            className="ml-auto font-bold uppercase tracking-[0.14em] hidden sm:block"
            style={{ fontFamily: fonts.syne, fontSize: 9, color: `${colors.cream}20` }}
          >
            REF: RI-IP-2025 · ver 1.0
          </span>
        </motion.div>

        {/* Main layout — headline + gauge */}
        <div className="flex flex-col lg:flex-row gap-10 lg:items-start justify-between">
          <div className="max-w-2xl">
            <motion.h1
              {...anim(0.08)}
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(40px, 6vw, 78px)',
                fontWeight: 900,
                lineHeight: 0.94,
                letterSpacing: '-0.028em',
                color: colors.cream,
              }}
            >
              Progress toward{' '}
              <em style={{ color: colors.orange, fontStyle: 'normal' }}>
                {metrics.targetGarments.toLocaleString()}
              </em>{' '}
              garments.
            </motion.h1>

            <motion.p
              {...anim(0.16)}
              className="mt-6 text-base"
              style={{
                fontFamily: fonts.bricolage,
                color: `${colors.cream}99`,
                lineHeight: 1.8,
                maxWidth: '52ch',
              }}
            >
              Verified results, published openly. Built for funders, partners, and the communities
              we serve — with clear data, honest assumptions, and traceable progress markers.
            </motion.p>

            <motion.div {...anim(0.24)} className="mt-10">
              <BlobButton href="#impact-calculator" variant="solid" size="md">
                Calculate your impact <span aria-hidden>→</span>
              </BlobButton>
            </motion.div>
          </div>

          {/* Progress gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="flex flex-col items-center gap-0 lg:pt-4 shrink-0"
          >
            <div className="relative flex items-center justify-center" style={{ width: 240, height: 240 }}>
              <svg
                className="absolute inset-0"
                viewBox="0 0 240 240"
                style={{ filter: `drop-shadow(0 0 28px ${colors.orange}18)` }}
              >
                {/* Track */}
                <circle cx="120" cy="120" r="108" fill="none" stroke={`${colors.orange}15`} strokeWidth="2" />
                {/* Progress arc */}
                <circle
                  cx="120"
                  cy="120"
                  r="108"
                  fill="none"
                  stroke={colors.orange}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${(progressAngle / 360) * circumference} ${circumference}`}
                  style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: '120px 120px',
                    transition: 'stroke-dasharray 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
                {/* Quarter tick marks */}
                {[90, 180, 270].map((angle) => {
                  const rad = (angle - 90) * (Math.PI / 180)
                  const x1 = 120 + 100 * Math.cos(rad)
                  const y1 = 120 + 100 * Math.sin(rad)
                  const x2 = 120 + 108 * Math.cos(rad)
                  const y2 = 120 + 108 * Math.sin(rad)
                  return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`${colors.cream}20`} strokeWidth="1" />
                })}
              </svg>

              {/* Inner circle */}
              <div
                className="relative flex flex-col items-center justify-center text-center z-10"
                style={{
                  width: 188,
                  height: 188,
                  borderRadius: '50%',
                  backgroundColor: colors.charcoal,
                  border: `1px solid ${colors.cream}10`,
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.bricolage,
                    fontSize: 30,
                    fontWeight: 900,
                    color: colors.cream,
                    lineHeight: 1,
                  }}
                >
                  {metrics.currentGarments.toLocaleString()}
                </span>
                <span
                  style={{
                    fontFamily: fonts.syne,
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: `${colors.cream}55`,
                    marginTop: 6,
                  }}
                >
                  of {metrics.targetGarments.toLocaleString()}
                </span>
                <span
                  className="mt-3"
                  style={{ fontFamily: fonts.bricolage, fontSize: 14, fontWeight: 700, color: colors.orange }}
                >
                  {PROGRESS_PCT.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Meta labels */}
            <div
              className="grid grid-cols-2 w-full"
              style={{ borderTop: `1px solid ${colors.white}14`, borderLeft: `1px solid ${colors.white}14`, borderRight: `1px solid ${colors.white}14` }}
            >
              {[
                { label: 'Last Updated', value: formattedDate },
                { label: 'Next Update', value: formattedNextUpdate },
              ].map(({ label, value }, i) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 px-5 py-4"
                  style={{
                    borderRight: i === 0 ? `1px solid ${colors.white}14` : undefined,
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.syne,
                      fontSize: 9,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.16em',
                      color: `${colors.cream}44`,
                    }}
                  >
                    {label}
                  </span>
                  <span style={{ fontFamily: fonts.bricolage, fontSize: 15, fontWeight: 700, color: colors.white }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom rule */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-16"
        style={{ borderTop: `1px solid ${colors.white}10` }}
      />
    </section>
  )
}
