'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const STATS = [
  { value: '30,000', label: 'people employed in Kantamanto\'s remanufacturing ecosystem' },
  { value: '60%',    label: 'of incoming garments successfully recirculated' },
  { value: '€10,280', label: 'directly invested by Remade In in 2025' },
]

export default function BlueprintKantamanto() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease } } : {},
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-8 md:px-20 py-24 md:py-32"
      style={{ backgroundColor: colors.charcoal }}
    >
      {/* Background photography */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Events/KantamantoHomecoming_By_6.jpg"
          alt="Kantamanto Market, Accra"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${colors.charcoal}f2 0%, ${colors.charcoal}cc 45%, ${colors.charcoal}88 100%)`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Eyebrow */}
        <motion.p
          {...anim(0)}
          className="mb-6 text-[15px] font-bold uppercase tracking-[0.28em]"
          style={{ fontFamily: fonts.syne, color: colors.orange }}
        >
          Proof of Concept
        </motion.p>

        {/* Headline */}
        <motion.h2
          {...anim(0.08)}
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(26px, 4vw, 60px)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: colors.cream,
            maxWidth: 680,
          }}
        >
          Kantamanto has been proving this model{' '}
          <em style={{ color: colors.orange, fontStyle: 'italic' }}>for generations.</em>
        </motion.h2>

        {/* Stats */}
        <motion.div
          {...anim(0.16)}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-14 pb-14"
          style={{ borderBottom: `1px solid rgba(249,232,208,0.1)` }}
        >
          {STATS.map((s) => (
            <div key={s.value}>
              <span
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 'clamp(32px, 3.8vw, 54px)',
                  fontWeight: 800,
                  color: colors.orange,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  display: 'block',
                }}
              >
                {s.value}
              </span>
              <p
                className="mt-2"
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: `rgba(249,232,208,0.55)`,
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Body + quote */}
        <motion.div
          {...anim(0.24)}
          className="grid md:grid-cols-2 gap-10 mt-14 items-start"
        >
          {/* Description */}
          <div className="flex flex-col gap-5">
            <p
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(15px, 1.3vw, 17px)',
                lineHeight: 1.78,
                color: `rgba(249,232,208,0.62)`,
              }}
            >
              Kantamanto Market in Accra employs approximately 30,000 people in a
              sophisticated remanufacturing economy — traders, sorters, tailors, and
              sellers who collectively achieve a 60% recirculation rate for all incoming
              garments.
            </p>
            <p
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(15px, 1.3vw, 17px)',
                lineHeight: 1.78,
                color: `rgba(249,232,208,0.62)`,
              }}
            >
              This is not informal recycling. It is a highly skilled, knowledge-intensive
              industry built over generations. Remade In was founded on one principle:
              knowledge must flow in both directions.
            </p>
            <a
              href="#downloads"
              className="self-start mt-2 text-xs font-bold uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-70"
              style={{ fontFamily: fonts.syne, color: colors.orange }}
            >
              Read the Kantamanto Report →
            </a>
          </div>

          {/* Community voice */}
          <blockquote
            className="p-7 rounded-[12px]"
            style={{
              backgroundColor: 'rgba(249,232,208,0.05)',
              border: `1px solid rgba(249,232,208,0.1)`,
            }}
          >
            <p
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(16px, 1.5vw, 20px)',
                fontStyle: 'italic',
                lineHeight: 1.65,
                color: colors.cream,
              }}
            >
              &ldquo;Every garment that passes through my hands is someone&apos;s
              discarded dream — and my opportunity to give it a second life.&rdquo;
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <div
                style={{
                  width: 24,
                  height: 1,
                  backgroundColor: colors.orange,
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.14em',
                  color: `rgba(249,232,208,0.38)`,
                }}
              >
                Kwame Darko · Kantamanto Market, Accra
              </p>
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
