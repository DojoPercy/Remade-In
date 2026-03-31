'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Globe,
  Recycle,
  Megaphone,
  Users,
  Leaf,
  Handshake,
  Shirt,
  Heart,
  type LucideIcon,
} from 'lucide-react'
import { colors, fonts } from '@/lib/tokens'
import type { HomePage } from '@/lib/sanity/types'

// ── Icon map ──────────────────────────────────────────────────────────────────

const ICONS: Record<string, LucideIcon> = {
  globe:      Globe,
  recycle:    Recycle,
  megaphone:  Megaphone,
  users:      Users,
  leaf:       Leaf,
  handshake:  Handshake,
  shirt:      Shirt,
  heart:      Heart,
}

// ── Accent color map ──────────────────────────────────────────────────────────

const ACCENT_COLORS: Record<string, string> = {
  blue:  colors.blue,
  green: colors.green,
  peach: colors.peach,
}

// ── Fallback data ─────────────────────────────────────────────────────────────

const FALLBACK_PILLARS = [
  {
    num: '01',
    title: 'Global Responsibility',
    body: 'We collaborate with communities that are directly affected by the global textile waste crisis, saving textiles that would otherwise end up in landfill, ensuring your feedstock is sourced in a way that is fair and mindful of people and the environment.',
    icon: 'globe',
    accentColor: 'blue' as const,
  },
  {
    num: '02',
    title: 'Upcycling to Remanufacturing',
    body: 'We operationalise and commercialise upcycling.* By bringing together relevant stakeholders around shared economic and environmental goals, we reduce the risks of adopting new circular production models.',
    icon: 'recycle',
    accentColor: 'green' as const,
  },
  {
    num: '03',
    title: 'Outreach & Engagement',
    body: 'We create demand for remanufactured garments through collective marketing strategies and community engagement to accelerate market adoption.',
    icon: 'megaphone',
    accentColor: 'peach' as const,
  },
]

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function WhatWeDo({ data }: { data?: HomePage | null }) {
  const pillars = data?.whatWeDoPillars?.length ? data.whatWeDoPillars : FALLBACK_PILLARS

  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="px-8 md:px-20 py-14 md:py-32"
      style={{ backgroundColor: '#d0e2ff' }}
    >
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease }}
        className="text-[15px] font-bold uppercase tracking-[0.28em] mb-14"
        style={{ color: '#6776b6', fontFamily: fonts.apfel }}
      >
        What We Do
      </motion.p>

      {/* Three pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {pillars.map((pillar, i) => {
          const accent = ACCENT_COLORS[pillar.accentColor ?? 'blue'] ?? colors.blue
          const Icon = ICONS[pillar.icon ?? ''] ?? Globe

          return (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: i * 0.14 }}
              className="flex flex-col"
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center rounded-xl mb-7"
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: 'rgba(255,255,255,0.55)',
                }}
              >
                <Icon size={22} color={accent} strokeWidth={1.8} />
              </div>

              {/* Title */}
              <h3
                className="font-bold leading-snug mb-5"
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 'clamp(22px, 2vw, 30px)',
                  color: colors.dark,
                  letterSpacing: '-0.02em',
                }}
              >
                {pillar.title}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontFamily: fonts.apfel,
                  fontSize: 15,
                  color: `${colors.dark}99`,
                  lineHeight: 1.8,
                }}
              >
                {pillar.body}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
