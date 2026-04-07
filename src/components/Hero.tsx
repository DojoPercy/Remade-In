'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import type { HomePage } from '@/lib/sanity/types'
import SplitText from '@/components/ui/SplitText'
import CountUp from '@/components/ui/CountUp'
import BlobButton from '@/components/ui/BlobButton'

// ── Reusable fade-up ──────────────────────────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})

const FALLBACK_SOCIAL_PROOF = [
  'Ghana',
  'The Netherlands',
  'Justice-led model',
]

// ── Accent word: strikes through then reveals "future" ───────────────────────

type AccentPhase = 'in' | 'exit' | 'done'

function AccentWord({ accent, color }: { accent: string; color: string }) {
  const [phase, setPhase] = useState<AccentPhase>('in')

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase('exit'), 3000)
    const doneTimer = setTimeout(() => setPhase('done'), 3400)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <motion.span
      layout
      transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
      style={{
        position: 'relative',
        display: 'inline-flex',
        whiteSpace: 'nowrap',
        verticalAlign: 'bottom',
        minHeight: '1.1em',
      }}
    >
      <AnimatePresence mode="wait">
        {phase !== 'done' ? (
          <motion.em
            key="original"
            initial={{ opacity: 0, y: '105%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-20%', transition: { duration: 0.3 } }}
            transition={{ duration: 0.65, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
            style={{ color, fontStyle: 'italic', display: 'inline-block' }}
          >
            {accent}
          </motion.em>
        ) : (
          <motion.em
            key="replacement"
            initial={{ opacity: 0, y: '105%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ color, fontStyle: 'italic', display: 'inline-block' }}
          >
            now
          </motion.em>
        )}
      </AnimatePresence>
    </motion.span>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero({ data }: { data?: HomePage | null }) {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 700], [0, 90])

  const bgSrc       = data?.heroBackground?.asset?.url ?? '/images/hero_bg.png'
  const headline    = data?.heroHeadline    ?? 'Remanufacturing our circular fashion future'
  const accent      = data?.heroAccent      ?? 'now'
  const tagline     = data?.heroTagline     ?? null
  const primaryCta  = data?.heroPrimaryCta  ?? 'See the Blueprint'
  const primaryHref = data?.heroPrimaryCtaHref ?? '/blueprint'
  const badgeTarget = data?.heroBadgeNumber ?? 1000000
  const badgeLabel  = data?.heroBadgeLabel  ?? 'Garments'
  const badgeSubtext = data?.heroBadgeSubtext ?? 'Remanufactured in 5 years'
  const badgeLoc    = data?.heroBadgeLocation ?? 'Starting in the Netherlands'
  const socialProof = data?.heroSocialProof?.length ? data.heroSocialProof : FALLBACK_SOCIAL_PROOF

  return (
    <section
      className="relative min-h-[75svh] md:min-h-[100svh] overflow-hidden flex flex-col"
      style={{ backgroundColor: colors.charcoal, paddingTop: 66 }}
    >
      {/* Layer 0 — Photography with parallax */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div className="absolute left-0 right-0" style={{ top: -60, bottom: -60, y: bgY }}>
          <Image
            src={bgSrc}
            alt="Craftsperson at a sewing machine"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </div>

      {/* Layer 1 — Dark overlay */}
      <div className="absolute inset-0" style={{ zIndex: 1, backgroundColor: `${colors.charcoal}a6` }} />

      {/* Layer 2 — Grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          zIndex: 2, opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '220px',
        }}
      />

      {/* Layer 3 — Blobs */}
      <div className="blob-a absolute pointer-events-none" style={{ zIndex: 1, width: 700, height: 700, top: -160, right: -120, backgroundColor: colors.orange, opacity: 0.06 }} />
      <div className="blob-b absolute pointer-events-none hidden sm:block" style={{ zIndex: 1, width: 420, height: 420, bottom: 60, left: '35%', backgroundColor: colors.amber, opacity: 0.04 }} />

      {/* ── Impact blob badge — top-right corner ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 160, damping: 20 }}
        className="absolute hidden sm:flex flex-col items-center justify-center select-none blob-a z-10"
        style={{
          width: 340,
          height: 340,
          top: '48%',
          right: '8%',
          backgroundColor: colors.orange,
          boxShadow: `0 0 80px ${colors.orange}88, 0 0 160px ${colors.orange}35, 0 24px 60px rgba(0,0,0,0.35)`,
        }}
      >
        <span
          className="text-center font-extrabold leading-none"
          style={{ fontFamily: fonts.bricolage, fontSize: 58, color: '#ffffff', letterSpacing: '-0.03em' }}
        >
          <CountUp to={badgeTarget} duration={2.2} />
        </span>
        <span className="text-center font-bold mt-2" style={{ fontFamily: fonts.bricolage, fontSize: 18, color: '#ffffff' }}>
          {badgeLabel}
        </span>
        <span className="text-center font-semibold mt-2 leading-snug" style={{ fontFamily: fonts.bricolage, fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
          {badgeSubtext}
        </span>
        <span
          className="text-center font-semibold mt-3 leading-tight"
          style={{ fontFamily: fonts.bricolage, fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          {badgeLoc}
        </span>
      </motion.div>

      {/* Layer 4 — Content */}
      <div
        className="relative flex flex-col justify-center md:justify-start flex-1 px-8 md:px-20 pt-4 pb-10 md:pt-14 md:pb-20"
        style={{ zIndex: 10 }}
      >
        {/* ── Headline ── */}
        <h1
          className="font-extrabold max-w-3xl leading-[1.05] md:leading-[0.95] mb-8 md:mb-14"
          style={{
            fontFamily: fonts.bricolage,
            color: colors.white,
            fontSize: 'clamp(42px, 8vw, 90px)',
            letterSpacing: '-0.03em',
          }}
        >
          <SplitText text={headline} onMount delay={0.2} stagger={0.08} />
          {' '}
          <AccentWord accent={accent} color={colors.orange} />
          {tagline && (
            <>&nbsp;&nbsp;<SplitText text={tagline} onMount delay={0.82} stagger={0.07} /></>
          )}
        </h1>

        {data?.heroSubheadline && (
          <motion.p
            {...fadeUp(0.55)}
            className="max-w-lg mb-6 -mt-6 md:-mt-10"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              lineHeight: 1.72,
              color: `${colors.white}88`,
            }}
          >
            {data.heroSubheadline}
          </motion.p>
        )}

        {/* ── CTA ── */}
        <motion.div {...fadeUp(0.68)} className="flex flex-col sm:flex-row gap-3">
          <BlobButton href={primaryHref} variant="solid">
            {primaryCta}
          </BlobButton>
          {data?.heroSecondaryCta && (
            <BlobButton href={data?.heroSecondaryCtaHref ?? '/impact'} variant="ghost">
              {data.heroSecondaryCta}
            </BlobButton>
          )}
        </motion.div>

      </div>
    </section>
  )
}
