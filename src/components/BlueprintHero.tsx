'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import type { BlueprintPage } from '@/lib/sanity/types'
import { imageUrl } from '@/lib/sanity/image'
import BlobButton from '@/components/ui/BlobButton'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const FALLBACK_PHOTO = '/Events/250830-Fashion Week-Kantamanto Social Club_RT-17.jpg'

export default function BlueprintHero({ data }: { data?: BlueprintPage | null }) {
  const headline     = data?.heroHeadline    ?? 'A Blueprint for Textile Remanufacturing in the Netherlands and Beyond'
  const primaryLabel = data?.primaryCtaLabel ?? 'Download Full PDF'
  const secondaryLabel = data?.secondaryCtaLabel ?? 'Executive Summary'

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
      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(${colors.white}06 1px, transparent 1px), linear-gradient(90deg, ${colors.white}06 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Orange top line */}
      <div className="absolute top-0 left-0 w-full h-1 z-10" style={{ backgroundColor: colors.orange }} />

      <div className="relative z-10 grid md:grid-cols-[1fr_420px] lg:grid-cols-[1fr_500px] min-h-screen">

        {/* Left: Text */}
        <div className="flex flex-col justify-center px-8 md:px-20 pt-28 pb-16 md:pb-0">

          {/* Eyebrow + meta in one line */}
          <motion.p
            {...anim(0)}
            className="mb-8 text-[11px] font-bold uppercase tracking-[0.28em]"
            style={{ fontFamily: fonts.syne, color: colors.orange }}
          >
            The Blueprint · March 2025 · Amsterdam Fashion Week
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...anim(0.1)}
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(28px, 4vw, 62px)',
              fontWeight: 900,
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              color: colors.cream,
              maxWidth: '14ch',
            }}
          >
            {headline}
          </motion.h1>

          {/* CTAs */}
          <motion.div {...anim(0.22)} className="mt-10 flex flex-wrap gap-3">
            <BlobButton href="#downloads" variant="solid">
              {primaryLabel}
            </BlobButton>
            <BlobButton href="#downloads" variant="ghost">
              {secondaryLabel}
            </BlobButton>
          </motion.div>
        </div>

        {/* Right: Photo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.15, ease } } : {}}
          className="relative hidden md:block"
        >
          {/* Gradient fade on left edge */}
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
