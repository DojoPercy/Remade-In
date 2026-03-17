'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import type { HomePage } from '@/lib/sanity/types'
import SplitText from '@/components/ui/SplitText'
import CountUp from '@/components/ui/CountUp'

// ── Reusable fade-up ──────────────────────────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})

const FALLBACK_SOCIAL_PROOF = [
  'Kantamanto Market, Ghana',
  'Amsterdam Fashion Week 2025',
  'Justice-led model',
]

// ── #10 — Accent word with typewriter correction ───────────────────────────────

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
            style={{
              color: colors.orange,
              fontStyle: 'italic',
              display: 'inline-block',
              position: 'relative',
            }}
          >
            {word}
            {/* Strike-through line */}
            {(phase === 'strike' || phase === 'exit') && (
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '50%',
                  height: 3,
                  backgroundColor: colors.cream,
                  transformOrigin: 'left center',
                  borderRadius: 2,
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

// ── #7 — Stacked polaroid photo cluster ───────────────────────────────────────

const CLUSTER = [
  {
    src: '/Events/_V8A0330.jpg',
    alt: 'Kantamanto community event',
    label: 'Accra, GH',
    style: { bottom: 0, right: 32, transform: 'rotate(7deg)', zIndex: 1 },
  },
  {
    src: '/Events/DFFL_KH_Photo-3.jpg',
    alt: 'Craftspeople at the hub',
    label: 'Kantamanto',
    style: { bottom: 24, right: 64, transform: 'rotate(-5deg)', zIndex: 2 },
  },
  {
    src: '/Events/250830-Fashion Week-Kantamanto Social Club_RT-17.jpg',
    alt: 'Amsterdam Fashion Week 2025',
    label: 'Amsterdam, NL',
    style: { bottom: 12, right: 4, transform: 'rotate(2deg)', zIndex: 3 },
  },
]

function PhotoCluster() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="absolute hidden lg:block"
      style={{ bottom: 32, right: 32, zIndex: 12, width: 220, height: 300 }}
    >
      {CLUSTER.map((photo, i) => (
        <motion.div
          key={i}
          whileHover={{ rotate: 0, scale: 1.06, zIndex: 20, transition: { duration: 0.25 } }}
          className="absolute bg-white"
          style={{
            width: 140,
            padding: '7px 7px 28px',
            boxShadow: '0 8px 28px rgba(0,0,0,0.45)',
            ...photo.style,
          }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5' }}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="140px"
            />
          </div>
          <p
            style={{
              fontFamily: fonts.syne,
              fontSize: 8,
              fontWeight: 700,
              color: `${colors.charcoal}70`,
              textAlign: 'center',
              marginTop: 6,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            {photo.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero({ data }: { data?: HomePage | null }) {
  // #9 — Parallax scroll
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 700], [0, 90])

  const subheadline  = data?.heroSubheadline  ?? 'Drawing from Kantamanto Market in Ghana — a thriving remanufacturing hub — and insights from Amsterdam Fashion Week 2025, this blueprint shows how the Netherlands can lead Europe in textile remanufacturing over the next decade.'
  const primaryCta   = data?.heroPrimaryCta   ?? 'See the Blueprint'
  const secondaryCta = data?.heroSecondaryCta ?? 'Our 2025 Impact'
  const socialProof  = data?.heroSocialProof?.length ? data.heroSocialProof : FALLBACK_SOCIAL_PROOF
  const headline     = data?.heroHeadline     ?? 'Building our Circular Fashion'
  const accent       = data?.heroAccent       ?? 'Future'
  const tagline      = data?.heroTagline      ?? '— one Community at a Time'

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: colors.charcoal, paddingTop: 66 }}
    >
      {/* Layer 0 — Photography with parallax */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div
          className="absolute left-0 right-0"
          style={{ top: -60, bottom: -60, y: bgY }}
        >
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
      <div
        className="absolute inset-0"
        style={{ zIndex: 1, backgroundColor: `${colors.charcoal}a6` }}
      />

      {/* Layer 2 — Grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          zIndex: 2,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '220px',
        }}
      />

      {/* Layer 3 — Blobs */}
      <div
        className="blob-a absolute pointer-events-none"
        style={{ zIndex: 1, width: 520, height: 520, top: -120, right: -100, backgroundColor: colors.orange, opacity: 0.05 }}
      />
      <div
        className="blob-b absolute pointer-events-none hidden sm:block"
        style={{ zIndex: 1, width: 300, height: 300, bottom: 80, left: '38%', backgroundColor: colors.amber, opacity: 0.035 }}
      />

      {/* Layer 4 — Content */}
      <div
        className="relative flex flex-col justify-start flex-1 px-8 md:px-20 pt-28 pb-24 md:pt-24 md:pb-20"
        style={{ zIndex: 10 }}
      >
        {/* ── Headline ── */}
        <h1
          className="font-extrabold mb-6 max-w-4xl"
          style={{
            fontFamily: fonts.bricolage,
            color: colors.white,
            fontSize: 'clamp(28px, 7vw, 76px)',
            lineHeight: 0.96,
            letterSpacing: '-0.025em',
          }}
        >
          <SplitText text={headline} onMount delay={0.2} stagger={0.08} />
          {' '}
          {/* #10 — Typewriter correction: "Future" → strikethrough → "Now" */}
          <AccentWord word={accent} replacement="Now" />
          <br />
          <SplitText text={tagline} onMount delay={0.82} stagger={0.07} />
        </h1>

        {/* ── Subheadline ── */}
        <motion.p
          {...fadeUp(0.52)}
          className="mb-10 max-w-lg text-sm md:text-base"
          style={{ color: `${colors.white}88`, lineHeight: 1.88 }}
        >
          {subheadline}
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div {...fadeUp(0.68)} className="flex flex-col sm:flex-row gap-3 mb-8">
          <motion.a
            href="/blueprint"
            whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${colors.orange}55` }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center px-8 py-4 rounded-sm text-sm font-bold tracking-wide"
            style={{ fontFamily: fonts.syne, backgroundColor: colors.orange, color: colors.cream, boxShadow: `0 4px 20px ${colors.orange}44` }}
          >
            {primaryCta}
          </motion.a>
          <motion.a
            href="#impact"
            whileHover={{ borderColor: colors.cream, color: colors.cream }}
            className="inline-flex items-center justify-center px-8 py-4 rounded-sm text-sm font-bold tracking-wide border transition-colors duration-200"
            style={{ fontFamily: fonts.syne, borderColor: `${colors.cream}55`, color: `${colors.cream}bb` }}
          >
            {secondaryCta}
          </motion.a>
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
                <span
                  className="rounded-full flex-shrink-0 inline-block"
                  style={{ width: 3, height: 3, backgroundColor: 'rgba(255,255,255,0.18)' }}
                />
              )}
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* #7 — Stacked photo cluster (desktop only, bottom-right) */}
      <PhotoCluster />

      {/* ── Impact blob badge ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 160, damping: 20 }}
        className="absolute top-20 right-10 md:right-16 hidden sm:flex flex-col items-center justify-center z-10 select-none blob-a"
        style={{
          width: 290,
          height: 290,
          backgroundColor: colors.orange,
          boxShadow: `0 0 55px ${colors.orange}77, 0 0 110px ${colors.orange}30, 0 16px 40px rgba(0,0,0,0.3)`,
        }}
      >
        <span
          className="text-center font-extrabold leading-none"
          style={{ fontFamily: fonts.bricolage, fontSize: 46, color: '#ffffff', letterSpacing: '-0.03em' }}
        >
          <CountUp to={1000000} duration={2.2} />
        </span>
        <span className="text-center font-bold mt-1.5" style={{ fontFamily: fonts.bricolage, fontSize: 15, color: '#ffffff' }}>
          Garments
        </span>
        <span className="text-center font-semibold mt-2 leading-snug" style={{ fontFamily: fonts.bricolage, fontSize: 11.5, color: 'rgba(255,255,255,0.65)' }}>
          Remanufactured in 5 years
        </span>
        <div className="mt-4 mx-auto" style={{ width: 36, height: 1, backgroundColor: 'rgba(255,255,255,0.25)' }} />
        <span
          className="text-center font-semibold mt-3 leading-tight"
          style={{ fontFamily: fonts.bricolage, fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          Starting in the<br />Netherlands
        </span>
      </motion.div>
    </section>
  )
}
