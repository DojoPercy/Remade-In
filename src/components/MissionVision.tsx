'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import type { HomePage } from '@/lib/sanity/types'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const BLOCKS = [
  {
    num: '01',
    label: 'Vision',
    text: 'A justice-led textile economy where remanufacturing is the norm, shifting value and power back to the communities most impacted by textile waste.',
    bg: colors.lightBlue,
    textColor: colors.charcoal,
    numColor: `${colors.charcoal}08`,
    rotate: 0.6,
    delay: 0.1,
  },
  {
    num: '02',
    label: 'Mission',
    text: 'Remade In builds the digital & connects the physical infrastructure to make textile remanufacturing accessible, scalable, cost-effective & socially just.',
    bg: colors.charcoal,
    textColor: colors.cream,
    numColor: 'rgba(249,232,208,0.055)',
    rotate: -0.8,
    delay: 0.2,
  },
]

export default function MissionVision({ data }: { data?: HomePage | null } = {}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="px-8 md:px-20 py-14 md:py-32"
      style={{ backgroundColor: colors.white }}
    >
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease }}
        className="text-[15px] font-bold uppercase tracking-[0.28em] mb-14"
        style={{ color: colors.orange, fontFamily: fonts.syne }}
      >
        {data?.missionVisionEyebrow ?? 'Our Purpose'}
      </motion.p>

      {/* Grid: image + two cards */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-5 md:gap-6 items-stretch">

        {/* Image panel */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0, ease }}
          className="relative overflow-hidden rounded-[14px] min-h-[280px] md:min-h-0"
        >
          <Image
            src={data?.missionVisionImage?.asset?.url ?? '/Upcyclers/KSCxBenBreuer-32.jpg'}
            alt="Community remanufacturing at Kantamanto"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Subtle gradient overlay at bottom */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(24,48,40,0.55) 0%, transparent 55%)' }}
          />
          <div className="absolute bottom-5 left-5 right-5">
            <p
              style={{
                fontFamily: fonts.syne,
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(249,232,208,0.7)',
              }}
            >
              {data?.missionVisionImageCaption ?? 'Kantamanto Market · Accra, Ghana'}
            </p>
          </div>
        </motion.div>

        {/* Vision + Mission cards */}
        {BLOCKS.map((block) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: block.delay, ease }}
            whileHover={{ rotate: 0, y: -8, transition: { duration: 0.4, ease } }}
            className="relative overflow-hidden flex flex-col"
            style={{
              backgroundColor: block.bg,
              borderRadius: 14,
              padding: 'clamp(28px, 4vw, 44px)',
              rotate: block.rotate,
              minHeight: 'clamp(260px, 30vw, 360px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            }}
          >
            {/* Ghost number */}
            <span
              aria-hidden
              className="absolute bottom-2 right-4 font-extrabold leading-none select-none pointer-events-none"
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(110px, 13vw, 160px)',
                color: block.numColor,
                lineHeight: 1,
              }}
            >
              {block.num}
            </span>

            {/* Label pill */}
            <span
              className="self-start inline-flex items-center px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.22em] mb-auto"
              style={{
                fontFamily: fonts.syne,
                backgroundColor: block.bg === colors.lightBlue ? `${colors.charcoal}12` : 'rgba(255,255,255,0.14)',
                color: block.textColor,
                backdropFilter: 'blur(4px)',
              }}
            >
              {block.label}
            </span>

            {/* Statement */}
            <p
              className="relative z-10 mt-10"
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(17px, 1.8vw, 22px)',
                fontWeight: 700,
                lineHeight: 1.45,
                color: block.textColor,
                letterSpacing: '-0.01em',
              }}
            >
              {block.label === 'Vision'
                ? (data?.visionText ?? block.text)
                : (data?.missionText ?? block.text)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
