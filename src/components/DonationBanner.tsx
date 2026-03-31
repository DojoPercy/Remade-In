'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import BlobButton from '@/components/ui/BlobButton'
import SectionDivider from '@/components/ui/SectionDivider'
import type { HomePage } from '@/lib/sanity/types'

// ── Fallback data ──────────────────────────────────────────────────────────────

const FALLBACK_STATS = [
  { value: '€280K', label: '2026 fundraising target' },
  { value: '3',     label: 'Core pilot projects'    },
  { value: '5 yrs', label: 'To 1M garments'         },
]

// ── Variants ───────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
})

// ── Component ──────────────────────────────────────────────────────────────────

export default function DonationBanner({ data }: { data?: HomePage | null }) {
  const eyebrow       = data?.donationEyebrow       ?? 'Support the Mission'
  const headline      = data?.donationHeadline      ?? 'Help us reach 1,000,000 garments.'
  const body          = data?.donationBody          ?? 'Every contribution funds the Open Bale Digital Tool, Design Systems for Textile Remanufacturing, and the 1M Garment Movement. Join the radical collaboration that turns a fragmented system into a global, community-led blueprint for circularity.'
  const primaryLabel  = data?.donationPrimaryLabel  ?? 'Donate via Donorbox'
  const primaryHref   = data?.donationPrimaryHref   ?? 'https://buy.stripe.com/aFaaEX6j82rady26My48000'
  const secondaryLabel = data?.donationSecondaryLabel ?? 'Partner With Us'
  const stats         = data?.donationStats?.length  ? data.donationStats : FALLBACK_STATS

  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const anim = (delay: number) => ({
    initial: fadeUp(delay).initial,
    animate: inView ? fadeUp(delay).animate : fadeUp(delay).initial,
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-8 md:px-20 pb-20 md:pb-24"
      style={{ backgroundColor: colors.orange }}
    >
      {/* ── Watermark circle ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 560,
          height: 560,
          border: '80px solid rgba(0,0,0,0.06)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-60 top-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 820,
          height: 820,
          border: '60px solid rgba(0,0,0,0.04)',
        }}
      />

      {/* ── Inner content ── */}
      <div className="relative pt-14 md:pt-20 pb-0">

        {/* Row 1 — eyebrow */}
        <motion.p
          {...anim(0)}
          className="text-xs font-bold uppercase tracking-[0.3em] mb-6"
          style={{ fontFamily: fonts.syne, color: 'rgba(255,255,255,0.65)' }}
        >
          {eyebrow}
        </motion.p>

        {/* Row 2 — headline */}
        <motion.h2
          {...anim(0.08)}
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(36px, 6.5vw, 88px)',
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            color: colors.white,
          }}
        >
          {headline}
        </motion.h2>

        {/* Row 3 — body + CTAs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-10 mb-14">
          <motion.p
            {...anim(0.18)}
            className="max-w-md"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(15px, 1.3vw, 17px)',
              lineHeight: 1.72,
              color: 'rgba(255,255,255,0.82)',
            }}
          >
            {body}
          </motion.p>

          <motion.div
            {...anim(0.26)}
            className="flex flex-wrap gap-3 flex-shrink-0"
          >
            <BlobButton href={primaryHref} variant="dark" external>
              {primaryLabel}
            </BlobButton>
            <BlobButton href="#partner" variant="ghost">
              {secondaryLabel}
            </BlobButton>
          </motion.div>
        </div>
      </div>

      {/* Row 4 — stats strip (full-width, border-top) */}
      <motion.div
        {...anim(0.34)}
        className="relative -mx-8 md:-mx-20 flex flex-col md:flex-row"
        style={{ borderTop: '1px solid rgba(255,255,255,0.18)' }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.value}
            className={`flex-1 px-8 md:px-20 py-8 flex flex-col gap-1.5 ${i > 0 ? 'border-t md:border-t-0 md:border-l' : ''}`}
            style={{ borderColor: 'rgba(255,255,255,0.18)' }}
          >
            <span
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 900,
                color: colors.white,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: fonts.syne,
                fontSize: 11,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.55)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      <SectionDivider fill={colors.blue} direction="left" height={60} />
    </section>
  )
}
