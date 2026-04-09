'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const PRINCIPLES = [
  {
    label: 'Justice First',
    text: 'We centre the communities in the Global South who are most affected by textile waste.',
    bg: '#d0e2ff',
    textColor: colors.charcoal,
    rotate: 0.6,
    delay: 0.2,
  },
  {
    label: 'Radical Collaboration',
    text: 'We build with, not for. System change happens through shared value across brands, manufacturers, funders, policymakers, and communities.',
    bg: '#cbd183',
    textColor: colors.charcoal,
    rotate: -0.8,
    delay: 0.3,
  },
  {
    label: 'Remanufacturing Futures',
    text: 'Drawing from inherited knowledge and emerging innovation, we remake what already exists.',
    bg: '#f8cab8',
    textColor: colors.charcoal,
    rotate: 0.5,
    delay: 0.4,
  },
]

export default function MissionVision() {
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
        What we stand for
      </motion.p>

      {/* 3 Styled Principle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {PRINCIPLES.map((block) => (
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
            {/* Label */}
            <span
              className="self-start inline-flex items-center px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.22em] mb-auto"
              style={{
                fontFamily: fonts.syne,
                backgroundColor: `${colors.charcoal}12`,
                color: block.textColor,
                backdropFilter: 'blur(4px)',
              }}
            >
              {block.label}
            </span>

            {/* Text */}
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
              {block.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}