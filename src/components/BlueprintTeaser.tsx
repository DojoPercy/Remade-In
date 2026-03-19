'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import BlobButton from '@/components/ui/BlobButton'
import SectionDivider from '@/components/ui/SectionDivider'

// ── Data ───────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '<1%',    label: 'of textile waste\never returned to fibre' },
  { value: '92M',   label: 'tonnes of fashion\nwaste annually' },
  { value: '15–20%', label: 'energy vs making\na garment new' },
  { value: '2035',  label: 'target: 1 million\ngarments remanufactured' },
]

const QUOTE =
  'The fashion industry cannot recycle its way out of a crisis it created through overconsumption. The answer is remanufacturing — at scale, with community at the centre.'

// ── Helpers ────────────────────────────────────────────────────────────────────

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ── Blueprint grid background ──────────────────────────────────────────────────

const GRID_STYLE: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(249,232,208,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(249,232,208,0.04) 1px, transparent 1px)
  `,
  backgroundSize: '48px 48px',
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function BlueprintTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgX = useTransform(scrollYProgress, [0, 1], ['0%', '-4%'])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: colors.charcoal, ...GRID_STYLE }}
    >
      {/* ── Parallax "BLUEPRINT" editorial mark ── */}
      <motion.span
        aria-hidden
        style={{ x: bgX }}
        className="pointer-events-none select-none absolute left-0 top-0 font-black leading-none whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease }}
      >
        <span
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(120px, 16vw, 220px)',
            color: 'rgba(255,255,255,0.028)',
            letterSpacing: '-0.05em',
            lineHeight: 0.85,
          }}
        >
          BLUE
          <br />
          PRINT
        </span>
      </motion.span>

      {/* ── Top label row ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease, delay: 0 }}
        className="relative z-10 flex items-center gap-4 px-8 md:px-20 pt-20"
      >
        {/* Orange rule */}
        <div className="w-8 h-px shrink-0" style={{ backgroundColor: colors.orange }} />
        <span
          className="font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: fonts.syne, fontSize: 10, color: colors.orange }}
        >
          A 10-Year Roadmap
        </span>
        {/* Doc annotation */}
        <span
          className="ml-auto font-bold uppercase tracking-[0.14em] hidden sm:block"
          style={{ fontFamily: fonts.syne, fontSize: 9, color: `${colors.cream}22` }}
        >
          REF: RI-WP-2024 · ver 1.3
        </span>
      </motion.div>

      {/* ── Headline ── */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease, delay: 0.08 }}
        className="relative z-10 px-8 md:px-20 mt-6"
        style={{
          fontFamily: fonts.bricolage,
          fontSize: 'clamp(36px, 5.5vw, 78px)',
          fontWeight: 900,
          lineHeight: 0.94,
          letterSpacing: '-0.028em',
          color: colors.cream,
          maxWidth: '16ch',
        }}
      >
        A Blueprint for{' '}
        <em style={{ color: colors.orange, fontStyle: 'italic' }}>
          Textile Remanufacturing.
        </em>
      </motion.h2>

      {/* ── Full-bleed stats band ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.18 }}
        className="relative z-10 mt-14 md:mt-20 w-full"
        style={{ borderTop: `1px solid ${colors.cream}10`, borderBottom: `1px solid ${colors.cream}10` }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="relative flex flex-col justify-center px-8 md:px-10 py-10 md:py-14"
              style={{
                borderRight: i < STATS.length - 1 ? `1px solid ${colors.cream}10` : undefined,
              }}
            >
              {/* Diagonal slash — purely decorative */}
              <span
                aria-hidden
                className="absolute top-3 right-3 font-black leading-none pointer-events-none select-none hidden md:block"
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 11,
                  color: `${colors.cream}18`,
                  letterSpacing: '0.06em',
                }}
              >
                {String(i + 1).padStart(2, '0')} /
              </span>

              {/* Stat value */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease, delay: 0.22 + i * 0.08 }}
                className="font-black block"
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 'clamp(34px, 4vw, 58px)',
                  color: colors.orange,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {s.value}
              </motion.span>

              {/* Label — pre-wrap preserves the \n line break */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.08 }}
                className="mt-2 block whitespace-pre-line"
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 10,
                  fontWeight: 700,
                  color: `${colors.cream}55`,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  lineHeight: 1.6,
                }}
              >
                {s.label}
              </motion.span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Full-bleed quote strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.42 }}
        className="relative z-10 mt-0 px-8 md:px-20 py-14 md:py-16"
        style={{
          background: `linear-gradient(105deg, ${colors.orange}12 0%, transparent 60%)`,
          borderBottom: `1px solid ${colors.cream}08`,
        }}
      >
        {/* Annotation cross-hair corners */}
        <span
          aria-hidden
          className="absolute top-4 left-8 md:left-20 text-[10px] font-bold"
          style={{ fontFamily: fonts.syne, color: `${colors.orange}40`, letterSpacing: '0.1em' }}
        >
          + EXTRACT
        </span>

        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
          {/* Opening mark */}
          <span
            aria-hidden
            className="font-black leading-none shrink-0"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(60px, 8vw, 100px)',
              color: colors.orange,
              lineHeight: 0.7,
              opacity: 0.55,
              marginTop: 4,
            }}
          >
            &ldquo;
          </span>

          <div className="flex-1">
            <p
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(17px, 1.8vw, 24px)',
                fontWeight: 700,
                color: colors.cream,
                lineHeight: 1.55,
                letterSpacing: '-0.012em',
                maxWidth: '62ch',
              }}
            >
              {QUOTE}
            </p>

            <p
              className="mt-5"
              style={{
                fontFamily: fonts.syne,
                fontSize: 9,
                fontWeight: 700,
                color: `${colors.cream}35`,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Remade In White Paper · 2024
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── CTAs ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease, delay: 0.54 }}
        className="relative z-10 px-8 md:px-20 pt-12 pb-0 flex flex-col sm:flex-row gap-4 items-start"
      >
        <BlobButton href="/blueprint" variant="solid">
          Read Full Blueprint <span aria-hidden style={{ fontSize: 16 }}>→</span>
        </BlobButton>

        <BlobButton href="/blueprint#download" variant="ghost">
          Download Executive Summary <span aria-hidden style={{ fontSize: 11, opacity: 0.55 }}>PDF</span>
        </BlobButton>
      </motion.div>

      <SectionDivider fill={colors.cream} direction="left" height={56} />
    </section>
  )
}
