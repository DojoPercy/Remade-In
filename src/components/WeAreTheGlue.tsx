'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import type { HomePage } from '@/lib/sanity/types'
import SectionDivider from '@/components/ui/SectionDivider'

// ── Card data ──────────────────────────────────────────────────────────────────

const COLUMNS = [
  {
    num: '01', category: 'The Problem',
    image: '/images/pro copy.jpg', imgPosition: '30% center',
    title: '1.1 billion people bear the environmental and economic costs of textile waste.',
    desc: 'Discarded clothing leads to dumping, burning, landfill overflow. Circularity has scaled extraction, not justice.',
    bg: '#1A1A14', textColor: '#F9E8D0', dimText: 'rgba(249,232,208,0.45)',
    numColor: 'rgba(249,232,208,0.05)', stickerBg: '#D75711', stickerText: '#ffffff',
  },
  {
    num: '02', category: 'The Solution',
    image: '/images/sol.jpg', imgPosition: '60% center',
    title: 'Remanufacture First. Regional hubs + community-centred processing.',
    desc: 'We restore garments at 15–20% of the energy of new production, creating skilled local employment.',
    bg: '#D75711', textColor: '#ffffff', dimText: 'rgba(255,255,255,0.65)',
    numColor: 'rgba(255,255,255,0.06)', stickerBg: '#1A1A14', stickerText: '#F9E8D0',
  },
  {
    num: '03', category: 'The Invitation',
    image: '/images/inv.jpg', imgPosition: '80% center',
    title: 'Partner with us. Fund, collaborate, or join the movement.',
    desc: "Whether you're a brand, a tailor, a donor, or a policy maker — there is a role for you.",
    bg: '#6776B7', textColor: '#ffffff', dimText: 'rgba(255,255,255,0.65)',
    numColor: 'rgba(255,255,255,0.06)', stickerBg: '#D75711', stickerText: '#ffffff',
  },
]

// ── Shared card markup ─────────────────────────────────────────────────────────

function GlueCard({ col }: { col: typeof COLUMNS[number] }) {
  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-[10px]"
      style={{ backgroundColor: col.bg }}
    >
      {/* Watermark number */}
      <span
        aria-hidden
        className="absolute bottom-4 right-4 font-black leading-none select-none pointer-events-none"
        style={{
          fontFamily: fonts.bricolage,
          fontSize: 'clamp(80px, 10vw, 120px)',
          color: col.numColor,
          letterSpacing: '-0.05em',
          lineHeight: 1,
        }}
      >
        {col.num}
      </span>

      {/* Sticker badge */}
      <div
        className="absolute top-4 right-4 z-10 flex items-center justify-center"
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          backgroundColor: col.stickerBg,
          transform: 'rotate(12deg)',
          boxShadow: '0 3px 10px rgba(0,0,0,0.25)',
        }}
      >
        <span
          style={{
            fontFamily: fonts.syne,
            fontSize: 9,
            fontWeight: 900,
            color: col.stickerText,
            textAlign: 'center',
            lineHeight: 1.2,
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
          }}
        >
          {col.num}
        </span>
      </div>

      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ height: 200 }}>
        <Image
          src={col.image}
          alt={col.category}
          fill
          className="object-cover"
          style={{ objectPosition: col.imgPosition }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, transparent 40%, ${col.bg}cc 100%)` }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col px-6 pt-4 pb-8">
        <p
          className="font-bold uppercase mb-3"
          style={{
            fontFamily: fonts.syne,
            fontSize: 10,
            color: col.dimText,
            letterSpacing: '0.22em',
          }}
        >
          {col.category}
        </p>

        <h3
          className="font-extrabold leading-snug mb-3"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(16px, 1.5vw, 19px)',
            color: col.textColor,
            lineHeight: 1.3,
          }}
        >
          {col.title}
        </h3>

        <p
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 13,
            color: col.dimText,
            lineHeight: 1.7,
          }}
        >
          {col.desc}
        </p>
      </div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────────

export default function WeAreTheGlue({ data }: { data?: HomePage | null }) {
  const columns = data?.glueColumns?.length
    ? data.glueColumns.map((col, i) => ({ ...COLUMNS[i], ...col }))
    : COLUMNS

  const outerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // Card scroll-driven transforms
  const opacity0 = useTransform(scrollYProgress, [0.05, 0.2], [0, 1])
  const y0 = useTransform(scrollYProgress, [0.05, 0.2], [50, 0])

  const opacity1 = useTransform(scrollYProgress, [0.35, 0.5], [0, 1])
  const y1 = useTransform(scrollYProgress, [0.35, 0.5], [50, 0])

  const opacity2 = useTransform(scrollYProgress, [0.65, 0.8], [0, 1])
  const y2 = useTransform(scrollYProgress, [0.65, 0.8], [50, 0])

  const cardMotion = [
    { opacity: opacity0, y: y0 },
    { opacity: opacity1, y: y1 },
    { opacity: opacity2, y: y2 },
  ]

  // Active step derived from scroll progress
  const stepValue = useTransform(
    scrollYProgress,
    [0, 0.33, 0.34, 0.66, 0.67, 1],
    [0, 0, 1, 1, 2, 2]
  )

  useMotionValueEvent(stepValue, 'change', (v) => {
    setActiveStep(Math.round(v))
  })

  const sectionHeader = (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-20">
      {/* Left: label + headline */}
      <div className="flex-1">
        {/* Label row */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className="font-bold uppercase tracking-[0.28em]"
            style={{ fontFamily: fonts.syne, fontSize: 11, color: colors.orange }}
          >
            We Are The Glue
          </span>
          <div className="flex-1 h-px max-w-[48px]" style={{ backgroundColor: colors.orange }} />
        </div>

        {/* Headline — each line on its own row */}
        <h2
          className="font-extrabold tracking-tight leading-[0.93]"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(40px, 4.5vw, 68px)',
            color: colors.charcoal,
          }}
        >
          The Problem.<br />
          The Solution.<br />
          <em style={{ color: colors.orange, fontStyle: 'italic' }}>The Invitation.</em>
        </h2>
      </div>

      {/* Right: description + pull stat */}
      <div className="md:max-w-[340px] shrink-0">
        <p
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 14,
            color: `${colors.charcoal}80`,
            lineHeight: 1.85,
            fontWeight: 500,
          }}
        >
          The fashion industry generates 92 million tonnes of waste annually.
          Remanufacturing restores garments, creates dignified work, and closes
          the loop between the Global North and South.
        </p>
        <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${colors.charcoal}14` }}>
          <span
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(28px, 3vw, 38px)',
              fontWeight: 900,
              color: colors.charcoal,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            92M
          </span>
          <span
            className="block mt-1"
            style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, color: `${colors.charcoal}55`, letterSpacing: '0.14em', textTransform: 'uppercase' }}
          >
            Tonnes of textile waste per year
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* ── Desktop: pinned scroll sequence (md+) ── */}
      <div
        ref={outerRef}
        id="about"
        className="hidden md:block"
        style={{ height: '280vh' }}
      >
        {/* Sticky panel */}
        <div
          className="sticky top-0 flex flex-col justify-center px-20"
          style={{ height: '100svh', backgroundColor: colors.white }}
        >
          {sectionHeader}

          {/* Three-column card grid */}
          <div className="grid grid-cols-3 gap-5 mt-10">
            {columns.map((col, i) => (
              <motion.div
                key={col.num}
                style={{ opacity: cardMotion[i].opacity, y: cardMotion[i].y }}
              >
                <GlueCard col={col} />
              </motion.div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex gap-3 mt-8 items-center">
            {[0, 1, 2].map((step) => {
              const isActive = activeStep === step
              return (
                <div
                  key={step}
                  style={{
                    width: isActive ? 8 : 7,
                    height: isActive ? 8 : 7,
                    borderRadius: '50%',
                    backgroundColor: isActive
                      ? colors.orange
                      : `${colors.charcoal}33`,
                    transition: 'background-color 0.3s, width 0.3s, height 0.3s',
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked layout (below md) ── */}
      <div
        id="about"
        className="md:hidden px-8 py-20"
        style={{ backgroundColor: colors.white }}
      >
        {sectionHeader}

        <div className="flex flex-col gap-6 mt-10">
          {columns.map((col, i) => (
            <motion.div
              key={col.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.12,
              }}
            >
              <GlueCard col={col} />
            </motion.div>
          ))}
        </div>
      </div>

      <SectionDivider fill={colors.charcoal} direction="left" height={60} />
    </>
  )
}
