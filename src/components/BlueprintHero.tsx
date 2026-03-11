'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import type { BlueprintPage } from '@/lib/sanity/types'
import { imageUrl } from '@/lib/sanity/image'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Fallback hero photo — Kantamanto/AFW event shot
const FALLBACK_PHOTO = '/Events/250830-Fashion Week-Kantamanto Social Club_RT-17.jpg'

export default function BlueprintHero({ data }: { data?: BlueprintPage | null }) {
  const headline       = data?.heroHeadline      ?? 'A Blueprint for Textile Remanufacturing in the Netherlands and Beyond'
  const subtitle       = data?.heroSubtitle      ?? '2025–2035 Vision: Community-Led Systems Change'
  const primaryLabel   = data?.primaryCtaLabel   ?? 'Download Full PDF'
  const secondaryLabel = data?.secondaryCtaLabel ?? 'Download Executive Summary'

  // Resolve photo — CMS image wins, else local fallback
  const photoSrc = data?.coverImage
    ? imageUrl(data.coverImage, 900, 1100)
    : FALLBACK_PHOTO

  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView
      ? { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease } }
      : { opacity: 0, y: 28 },
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: colors.charcoal }}
    >
      {/* ── Subtle grid overlay ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(${colors.white}06 1px, transparent 1px), linear-gradient(90deg, ${colors.white}06 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Orange top line ── */}
      <div className="absolute top-0 left-0 w-full h-1 z-10" style={{ backgroundColor: colors.orange }} />

      <div className="relative z-10 grid md:grid-cols-[1fr_420px] lg:grid-cols-[1fr_500px] min-h-[90vh]">

        {/* ── Left: Text ── */}
        <div className="flex flex-col justify-center px-8 md:px-20 pt-28 pb-16 md:pb-0">
          {/* Eyebrow */}
          <motion.p
            {...anim(0)}
            className="mb-6 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: fonts.syne, color: colors.orange }}
          >
            White Paper · 2025
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...anim(0.08)}
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(32px, 4.5vw, 68px)',
              fontWeight: 900,
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              color: colors.cream,
            }}
          >
            {headline}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...anim(0.18)}
            className="mt-5 max-w-lg"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(16px, 1.4vw, 19px)',
              lineHeight: 1.65,
              color: 'rgba(249,232,208,0.58)',
            }}
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div {...anim(0.28)} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#downloads"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[5px] text-sm font-bold uppercase tracking-[0.07em] transition-opacity duration-200 hover:opacity-90"
              style={{ fontFamily: fonts.syne, backgroundColor: colors.orange, color: colors.white }}
            >
              <DownloadIcon />
              {primaryLabel}
            </a>
            <a
              href="#downloads"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[5px] text-sm font-bold uppercase tracking-[0.07em] border-2 transition-all duration-200 hover:bg-white/10"
              style={{ fontFamily: fonts.syne, borderColor: 'rgba(249,232,208,0.35)', color: colors.cream }}
            >
              <DownloadIcon />
              {secondaryLabel}
            </a>
          </motion.div>

          {/* Meta strip */}
          <motion.div
            {...anim(0.38)}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-3 pt-6"
            style={{ borderTop: '1px solid rgba(249,232,208,0.1)' }}
          >
            {[
              { label: 'Pages', value: '13' },
              { label: 'Published', value: 'March 2025' },
              { label: 'Presented at', value: 'AFW 2025' },
              { label: 'Authors', value: 'The Circle Club et al.' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(249,232,208,0.35)' }}>
                  {label}
                </span>
                <span style={{ fontFamily: fonts.bricolage, fontSize: 14, fontWeight: 600, color: 'rgba(249,232,208,0.7)' }}>
                  {value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Photo ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.15, ease } } : {}}
          className="relative hidden md:block"
        >
          {/* Gradient fade into charcoal on the left edge */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
            style={{ background: `linear-gradient(to right, ${colors.charcoal}, transparent)` }}
          />

          <Image
            src={photoSrc}
            alt="Community remanufacturing at Kantamanto Market"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 0px, 500px"
          />

          {/* Caption badge */}
          <div
            className="absolute bottom-6 left-8 z-20 px-4 py-2 rounded-full backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(26,26,20,0.7)', border: '1px solid rgba(249,232,208,0.15)' }}
          >
            <p style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(249,232,208,0.7)' }}>
              Kantamanto Market · Accra, Ghana
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 12L3 7h3V2h4v5h3L8 12zM2 14h12v-1.5H2V14z" />
    </svg>
  )
}
