'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import type { BlueprintPage } from '@/lib/sanity/types'
import { imageUrl } from '@/lib/sanity/image'
import BlobButton from '@/components/ui/BlobButton'
import SectionDivider from '@/components/ui/SectionDivider'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const FALLBACK_PHOTO = '/Events/250830-Fashion Week-Kantamanto Social Club_RT-17.jpg'

export default function BlueprintHero({ data }: { data?: BlueprintPage | null }) {
  const headline      = data?.heroHeadline     ?? 'A Blueprint for Textile Remanufacturing in the Netherlands and Beyond'
  const subtitle      = data?.heroSubtitle     ?? null
  const primaryLabel  = data?.primaryCtaLabel  ?? 'Download Full PDF'
  const secondaryLabel = data?.secondaryCtaLabel ?? 'Executive Summary'

  const photoSrc = data?.coverImage
    ? imageUrl(data.coverImage, 1600, 900)
    : FALLBACK_PHOTO

  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })

  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 700], [0, 90])

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView
      ? { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease } }
      : { opacity: 0, y: 28 },
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden min-h-[85svh] md:min-h-screen flex flex-col"
      style={{ backgroundColor: colors.blue, paddingTop: 66 }}
    >

      {/* ── Layer 0: Photo with parallax ── */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div className="absolute left-0 right-0" style={{ top: -60, bottom: -60, y: bgY }}>
          <Image
            src={photoSrc}
            alt="Community remanufacturing at Kantamanto Market"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </motion.div>
      </div>

      {/* ── Layer 1: Blue gradient overlay — solid on left for readability, opens right ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: `linear-gradient(105deg, ${colors.blue}f2 30%, ${colors.blue}cc 40%, ${colors.blue}77 90%)`,
        }}
      />

      {/* ── Layer 3: Grain ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          zIndex: 3,
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '220px',
        }}
      />

      {/* ── Orange top accent line ── */}
      <div className="absolute top-0 left-0 w-full h-1 z-10" style={{ backgroundColor: colors.orange }} />

      {/* ── Content ── */}
      <div
        className="relative flex flex-col justify-center flex-1 px-8 md:px-20 pt-10 pb-24 md:pt-16 md:pb-32"
        style={{ zIndex: 10 }}
      >
        {/* Eyebrow */}
        <motion.p
          {...anim(0)}
          className="mb-8 text-[11px] font-bold uppercase tracking-[0.28em]"
          style={{ fontFamily: fonts.syne, color: colors.orange }}
        >
          The Blueprint · March 2025 · Amsterdam Fashion Week
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...anim(0.12)}
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(32px, 5vw, 78px)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            maxWidth: '16ch',
          }}
        >
          {headline}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            {...anim(0.22)}
            className="mt-6 max-w-lg"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTAs */}
        <motion.div {...anim(0.3)} className="mt-10 flex flex-wrap gap-3">
          <BlobButton href="#downloads" variant="solid">
            {primaryLabel}
          </BlobButton>
          <BlobButton href="#downloads" variant="ghost">
            {secondaryLabel}
          </BlobButton>
        </motion.div>
      </div>

      {/* ── Caption badge — bottom right ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1, transition: { duration: 0.8, delay: 0.55 } } : {}}
        className="absolute bottom-10 right-8 z-10 px-4 py-2 rounded-full backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(43,43,34,0)',
          border: '1px solid rgba(255,255,255,0.14)',
        }}
      >
      </motion.div>

      {/* ── Ramp into BlueprintCrisis (white) ── */}
      <SectionDivider fill={colors.white} direction="right" height={56} />
    </section>
  )
}
