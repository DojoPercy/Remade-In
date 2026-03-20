'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { imageUrl } from '@/lib/sanity/image'
import { colors, fonts } from '@/lib/tokens'

interface Partner {
  _id: string
  name: string
  url?: string
  logo?: {
    asset?: { url: string }
    alt?: string
  }
}

interface Props {
  data?: Partner[]
  description?: string
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function PartnerNetwork({ data, description }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const partners = data || []
  if (partners.length === 0) return null

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease } } : {},
  })

  return (
    <section
      id="partners"
      ref={ref}
      className="relative overflow-hidden px-8 md:px-20 pt-20 pb-0"
      style={{ backgroundColor: colors.charcoal }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 90% 40%, ${colors.blue}06 0, transparent 50%)`,
        }}
      />

      <div className="relative">
        {/* Eyebrow */}
        <motion.div {...anim(0)} className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px shrink-0" style={{ backgroundColor: colors.orange }} />
          <span
            className="font-bold uppercase tracking-[0.22em]"
            style={{ fontFamily: fonts.syne, fontSize: 10, color: colors.orange }}
          >
            Strategic Partners
          </span>
        </motion.div>

        {/* Heading + description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.h2
            {...anim(0.08)}
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.028em',
              color: colors.cream,
              maxWidth: '22ch',
            }}
          >
            Collaborators powering the{' '}
            <em style={{ color: colors.orange, fontStyle: 'normal' }}>remanufacturing ecosystem.</em>
          </motion.h2>

          {description && (
            <motion.p
              {...anim(0.16)}
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 15,
                fontWeight: 500,
                lineHeight: 1.7,
                color: `${colors.cream}88`,
                maxWidth: '36ch',
              }}
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Partner grid — tabular style */}
        <div
          className="grid grid-cols-2"
          style={{
            gridTemplateColumns: `repeat(${Math.min(partners.length, 4)}, 1fr)`,
            borderTop: `1px solid ${colors.white}14`,
            borderLeft: `1px solid ${colors.white}14`,
          }}
        >
          {partners.map((partner, idx) => {
            const logoSrc = partner.logo?.asset?.url
              ? imageUrl({ asset: { url: partner.logo.asset.url }, alt: partner.logo.alt || partner.name }, 400, 200)
              : null

            const card = (
              <motion.div
                key={partner._id}
                {...anim(0.2 + idx * 0.06)}
                className="group flex flex-col items-center justify-center py-12 px-8 text-center"
                style={{
                  borderRight: `1px solid ${colors.white}14`,
                  borderBottom: `1px solid ${colors.white}14`,
                  minHeight: 180,
                }}
              >
                {/* Slot number */}
                <span
                  aria-hidden
                  className="absolute top-3 right-4 hidden md:block"
                  style={{
                    fontFamily: fonts.bricolage,
                    fontSize: 11,
                    color: `${colors.cream}14`,
                    letterSpacing: '0.06em',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')} /
                </span>

                {logoSrc ? (
                  <Image
                    src={logoSrc}
                    alt={partner.logo?.alt || partner.name}
                    width={180}
                    height={72}
                    className="max-h-14 w-auto object-contain group-hover:opacity-100 transition-opacity duration-300"
                    style={{ filter: 'brightness(0.8) saturate(0.7)', opacity: 0.85 }}
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: fonts.bricolage,
                      fontSize: 20,
                      fontWeight: 800,
                      color: `${colors.cream}cc`,
                      lineHeight: 1.2,
                    }}
                  >
                    {partner.name}
                  </span>
                )}
              </motion.div>
            )

            return partner.url ? (
              <a
                key={partner._id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block"
              >
                {card}
              </a>
            ) : (
              <div key={partner._id} className="relative">
                {card}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-16" style={{ borderTop: `1px solid ${colors.white}08` }} />
    </section>
  )
}
