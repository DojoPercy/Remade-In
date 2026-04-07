'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import SectionDivider from '@/components/ui/SectionDivider'
import type { AboutPage } from '@/lib/sanity/types'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const FALLBACK_PHOTO = '/Events/250830-Fashion Week-Kantamanto Social Club_RT-17.jpg'

export default function AboutHero({ data }: { data?: AboutPage | null }) {
  const eyebrow       = data?.heroEyebrow        ?? 'About Us'
  const headlineBefore = data?.heroHeadlineBefore ?? 'We are the'
  const accent        = data?.heroAccent          ?? 'connective tissue'
  const headlineAfter = data?.heroHeadlineAfter   ?? 'of a new textile economy.'
  const subheadline   = data?.heroSubheadline     ?? 'A Dutch foundation working at the intersection of fashion, justice, and systems change — building the infrastructure to make textile remanufacturing accessible, scalable, and socially just.'
  const bgSrc         = data?.heroBackground?.asset?.url ?? FALLBACK_PHOTO
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
      style={{ backgroundColor: '#d8570f', paddingTop: 66 }}
    >
      {/* Layer 0: Photo with parallax */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div className="absolute left-0 right-0" style={{ top: -60, bottom: -60, y: bgY }}>
          <Image
            src={bgSrc}
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
          background: `linear-gradient(105deg, #d8570ff2 35%, #d8570fcc 52%, #d8570f66 100%)`,
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

      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 z-10" style={{ backgroundColor: colors.lightBlue }} />

      {/* Content */}
      <div
        className="relative flex flex-col justify-end flex-1 px-8 md:px-20 pt-10 pb-24 md:pb-36"
        style={{ zIndex: 10 }}
      >
        <motion.p
          {...anim(0)}
          className="mb-6 text-[15px] font-bold uppercase tracking-[0.28em]"
          style={{ fontFamily: fonts.syne, color: colors.lightBlue }}
        >
          {eyebrow}
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
            maxWidth: '22ch',
          }}
        >
          {headlineBefore}{' '}
          <em style={{ color: colors.lightBlue, fontStyle: 'italic' }}>{accent}</em>{' '}
          {headlineAfter}
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
          {subheadline}
        </motion.p>
      </div>

      <SectionDivider fill={colors.white} direction="right" height={56} />
    </section>
  )
}
