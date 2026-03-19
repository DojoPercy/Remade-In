'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
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

// ── Accent word with typewriter correction ────────────────────────────────────

type CorrectionPhase = 'in' | 'strike' | 'exit' | 'done'

function AccentWord({ word, replacement }: { word: string; replacement: string }) {
  const [phase, setPhase] = useState<CorrectionPhase>('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('strike'), 3000)
    const t2 = setTimeout(() => setPhase('exit'),   3700)
    const t3 = setTimeout(() => setPhase('done'),   4100)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <span style={{ position: 'relative', display: 'inline-block', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="wait">
        {phase !== 'done' ? (
          <motion.em
            key="original"
            initial={{ opacity: 0, y: '105%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-20%', transition: { duration: 0.3 } }}
            transition={{ duration: 0.65, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: colors.orange, fontStyle: 'italic', display: 'inline-block', position: 'relative' }}
          >
            {word}
            {(phase === 'strike' || phase === 'exit') && (
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
                style={{
                  position: 'absolute', left: 0, right: 0, top: '50%',
                  height: 3, backgroundColor: colors.cream,
                  transformOrigin: 'left center', borderRadius: 2,
                }}
              />
            )}
          </motion.em>
        ) : (
          <motion.em
            key="replacement"
            initial={{ opacity: 0, y: '105%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: colors.orange, fontStyle: 'italic', display: 'inline-block' }}
          >
            {replacement}
          </motion.em>
        )}
      </AnimatePresence>
    </span>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero({ data }: { data?: HomePage | null }) {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 700], [0, 90])

  const primaryCta  = data?.heroPrimaryCta  ?? 'See the Blueprint'
  const socialProof = data?.heroSocialProof?.length ? data.heroSocialProof : FALLBACK_SOCIAL_PROOF
  const headline    = data?.heroHeadline    ?? 'Building our Circular Fashion'
  const accent      = data?.heroAccent      ?? 'Future'
  const tagline     = data?.heroTagline     ?? '— one Community at a Time'

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden flex flex-col"
      style={{ backgroundColor: colors.charcoal, paddingTop: 66 }}
    >
      {/* Layer 0 — Photography with parallax */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div className="absolute left-0 right-0" style={{ top: -60, bottom: -60, y: bgY }}>
          <Image
            src="/images/hero_bg.png"
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
      <div className="blob-a absolute pointer-events-none" style={{ zIndex: 1, width: 520, height: 520, top: -120, right: -100, backgroundColor: colors.orange, opacity: 0.05 }} />
      <div className="blob-b absolute pointer-events-none hidden sm:block" style={{ zIndex: 1, width: 300, height: 300, bottom: 80, left: '38%', backgroundColor: colors.amber, opacity: 0.035 }} />

      {/* ── Impact blob badge — top-right corner ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 160, damping: 20 }}
        className="absolute hidden sm:flex flex-col items-center justify-center select-none blob-a z-10"
        style={{
          width: 260,
          height: 260,
          top: 80,
          right: 48,
          backgroundColor: colors.orange,
          boxShadow: `0 0 55px ${colors.orange}77, 0 0 110px ${colors.orange}30, 0 16px 40px rgba(0,0,0,0.3)`,
        }}
      >
        <span
          className="text-center font-extrabold leading-none"
          style={{ fontFamily: fonts.bricolage, fontSize: 42, color: '#ffffff', letterSpacing: '-0.03em' }}
        >
          <CountUp to={1000000} duration={2.2} />
        </span>
        <span className="text-center font-bold mt-1.5" style={{ fontFamily: fonts.bricolage, fontSize: 14, color: '#ffffff' }}>
          Garments
        </span>
        <span className="text-center font-semibold mt-2 leading-snug" style={{ fontFamily: fonts.bricolage, fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>
          Remanufactured in 5 years
        </span>
        <div className="mt-4 mx-auto" style={{ width: 32, height: 1, backgroundColor: 'rgba(255,255,255,0.25)' }} />
        <span
          className="text-center font-semibold mt-3 leading-tight"
          style={{ fontFamily: fonts.bricolage, fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          Starting in the<br />Netherlands
        </span>
      </motion.div>

      {/* Layer 4 — Content */}
      <div
        className="relative flex flex-col justify-start flex-1 px-8 md:px-20 pt-12 pb-16 md:pt-24 md:pb-20"
        style={{ zIndex: 10 }}
      >
        {/* ── Headline ── */}
        <h1
          className="font-extrabold max-w-3xl leading-[1.08] md:leading-[0.97]"
          style={{
            fontFamily: fonts.bricolage,
            color: colors.white,
            fontSize: 'clamp(30px, 8.5vw, 88px)',
            letterSpacing: '-0.025em',
          }}
        >
          <SplitText text={headline} onMount delay={0.2} stagger={0.08} />
          {' '}
          <AccentWord word={accent} replacement="Now" />
          {' '}
          <SplitText text={tagline} onMount delay={0.82} stagger={0.07} />
        </h1>

        {/* Whitespace gap before CTA */}
        <div className="mt-8 md:mt-14" />

        {/* ── CTA ── */}
        <motion.div {...fadeUp(0.68)} className="flex flex-col sm:flex-row gap-3 mb-10">
          <BlobButton href="/blueprint" variant="solid">
            {primaryCta}
          </BlobButton>
        </motion.div>

        {/* ── Social proof ── */}
        <motion.div
          {...fadeUp(0.84)}
          className="flex flex-wrap items-center gap-4 border-t pt-5 text-[11px]"
          style={{ borderColor: 'rgba(255,255,255,0.07)', color: `${colors.cream}55`, fontFamily: fonts.bricolage, letterSpacing: '0.04em' }}
        >
          {socialProof.map((item: string, i: number) => (
            <span key={item} className="flex items-center gap-4">
              {i > 0 && (
                <span className="rounded-full flex-shrink-0 inline-block" style={{ width: 3, height: 3, backgroundColor: 'rgba(255,255,255,0.18)' }} />
              )}
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
