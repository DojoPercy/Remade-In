'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import SectionDivider from '@/components/ui/SectionDivider'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const PHOTO = '/Events/250830-Fashion Week-Kantamanto Social Club_RT-17.jpg'

export default function AboutHero() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 600], [0, 80])

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView
      ? { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease } }
      : { opacity: 0, y: 28 },
  })

  return (
    <section
      ref={ref}
      className="relative min-h-[75svh] md:min-h-[85svh] overflow-hidden flex flex-col"
      style={{ backgroundColor: colors.blue, paddingTop: 66 }}
    >
      {/* Layer 0: Photo with parallax */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div className="absolute left-0 right-0" style={{ top: -60, bottom: -60, y: bgY }}>
          <Image
            src={PHOTO}
            alt="Remade In community at work"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </motion.div>
      </div>

      {/* Layer 1: Blue gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: `linear-gradient(105deg, ${colors.blue}f2 35%, ${colors.blue}cc 52%, ${colors.blue}66 100%)`,
        }}
      />

      {/* Layer 2: Grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          zIndex: 2,
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '220px',
        }}
      />

      {/* Orange top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 z-10" style={{ backgroundColor: colors.orange }} />

      {/* Content */}
      <div
        className="relative flex flex-col justify-end flex-1 px-8 md:px-20 pt-10 pb-24 md:pb-36"
        style={{ zIndex: 10 }}
      >
        <motion.p
          {...anim(0)}
          className="mb-6 text-[11px] font-bold uppercase tracking-[0.28em]"
          style={{ fontFamily: fonts.syne, color: colors.orange }}
        >
          About Us
        </motion.p>

        <motion.h1
          {...anim(0.12)}
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(36px, 5.5vw, 82px)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            maxWidth: '16ch',
          }}
        >
          We are the{' '}
          <em style={{ color: colors.orange, fontStyle: 'italic' }}>connective tissue</em>{' '}
          of a new textile economy.
        </motion.h1>

        <motion.p
          {...anim(0.24)}
          className="mt-6 max-w-xl"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(15px, 1.3vw, 18px)',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          A Dutch foundation working at the intersection of fashion, justice, and systems change —
          building the infrastructure to make textile remanufacturing accessible, scalable, and socially just.
        </motion.p>
      </div>

      <SectionDivider fill={colors.white} direction="right" height={56} />
    </section>
  )
}
