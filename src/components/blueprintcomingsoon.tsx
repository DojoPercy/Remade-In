'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease } },
})

export default function BlueprintComingSoon() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden flex flex-col"
      style={{
        backgroundColor: colors.blue,
        minHeight: 'calc(100svh - 66px)',
        paddingTop: 66,
      }}
    >
      {/* ── Background photo ── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/Events/250830-Fashion Week-Kantamanto Social Club_RT-17.jpg"
          alt="Kantamanto community"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* ── Blue gradient overlay ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: `linear-gradient(105deg, ${colors.blue}f5 32%, ${colors.blue}cc 50%, ${colors.blue}88 100%)`,
        }}
      />

      {/* ── Grain ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          zIndex: 3,
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '220px',
        }}
      />

      {/* ── Orange top accent line ── */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ zIndex: 10, backgroundColor: colors.orange }}
      />

      {/* ── Content ── */}
      <div
        className="relative flex flex-col justify-center flex-1 px-8 md:px-20 py-24 md:py-40"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <motion.div
            {...anim(0)}
            animate={inView ? anim(0).animate : anim(0).initial}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-8 h-px" style={{ backgroundColor: colors.orange }} />
            <p
              style={{
                fontFamily:    fonts.syne,
                fontSize:      13,
                fontWeight:    700,
                textTransform: 'uppercase',
                letterSpacing: '0.28em',
                color:         colors.orange,
              }}
            >
              The Blueprint · Coming Soon
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.1, ease } } : {}}
            style={{
              fontFamily:    fonts.bricolage,
              fontSize:      'clamp(36px, 5vw, 78px)',
              fontWeight:    900,
              lineHeight:    1.0,
              letterSpacing: '-0.03em',
              color:         '#ffffff',
              maxWidth:      '16ch',
              marginBottom:  24,
            }}
          >
            A Blueprint for Textile Remanufacturing.
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.2, ease } } : {}}
            style={{
              fontFamily: fonts.bricolage,
              fontSize:   'clamp(15px, 1.3vw, 18px)',
              lineHeight: 1.75,
              color:      'rgba(255,255,255,0.65)',
              maxWidth:   '44ch',
              marginBottom: 40,
            }}
          >
            Our 2025–2035 vision for community-led systems change in the Netherlands and beyond
            is being finalised. Check back tomorrow for the full launch.
          </motion.p>

          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.32, ease } } : {}}
            className="inline-flex items-center gap-3"
          >
            {/* Pulsing dot */}
            <span className="relative flex h-3 w-3">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ backgroundColor: colors.orange }}
              />
              <span
                className="relative inline-flex rounded-full h-3 w-3"
                style={{ backgroundColor: colors.orange }}
              />
            </span>
            <span
              style={{
                fontFamily:    fonts.syne,
                fontSize:      12,
                fontWeight:    700,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color:         'rgba(255,255,255,0.55)',
              }}
            >
              Coming Soon
            </span>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom fade into footer ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
        style={{
          zIndex: 5,
          background: `linear-gradient(to bottom, transparent, ${colors.blue}cc)`,
        }}
      />
    </section>
  )
}