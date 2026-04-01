'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const STATS = [
  { value: '92M',    unit: 'tonnes', label: 'of textile waste generated globally each year' },
  { value: '<1%',    unit: '',       label: 'of textiles are recycled back into new clothing' },
  { value: '30,000', unit: 'people', label: 'employed in Kantamanto\'s remanufacturing ecosystem' },
]

export default function BlueprintCrisis() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease } } : {},
  })

  return (
    <section
      ref={ref}
      className="px-8 md:px-20 py-24 md:py-32"
      style={{ backgroundColor: colors.white }}
    >
      {/* Opening statement */}
      <motion.div {...anim(0)} className="mb-16 md:mb-20">
        <p
          className="mb-4 text-[15px] font-bold uppercase tracking-[0.28em]"
          style={{ fontFamily: fonts.syne, color: colors.orange }}
        >
          The Crisis
        </p>
        <h2
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(26px, 3.8vw, 54px)',
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            color: colors.ink,
            maxWidth: 760,
          }}
        >
          40% of clothing exported from the Netherlands to Ghana{' '}
          <em style={{ color: colors.orange, fontStyle: 'normal' }}>goes directly to landfill.</em>
        </h2>
        <p
          className="mt-6 max-w-xl"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(15px, 1.3vw, 17px)',
            lineHeight: 1.78,
            color: `${colors.ink}65`,
          }}
        >
          The global fashion system is exporting its waste problem. What Europe calls
          &ldquo;second-hand donation&rdquo; lands in Kantamanto Market, Accra — and
          nearly half of it is unwearable on arrival.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        {...anim(0.12)}
        className="grid grid-cols-1 sm:grid-cols-3 gap-px mb-16"
        style={{ backgroundColor: `${colors.ink}10` }}
      >
        {STATS.map((s) => (
          <div
            key={s.value}
            className="flex flex-col gap-2 p-8"
            style={{ backgroundColor: colors.white }}
          >
            <div className="flex items-baseline gap-2 flex-wrap">
              <span
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 'clamp(44px, 5vw, 72px)',
                  fontWeight: 800,
                  color: colors.ink,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {s.value}
              </span>
              {s.unit && (
                <span
                  style={{
                    fontFamily: fonts.syne,
                    fontSize: 12,
                    fontWeight: 700,
                    color: `${colors.ink}45`,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.1em',
                  }}
                >
                  {s.unit}
                </span>
              )}
            </div>
            <p
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 14,
                lineHeight: 1.6,
                color: `${colors.ink}55`,
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Bridge + community voice */}
      <motion.div
        {...anim(0.22)}
        className="flex flex-col md:flex-row md:items-start gap-8 pt-10"
        style={{ borderTop: `1px solid ${colors.ink}10` }}
      >
        <p
          className="flex-1"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(17px, 1.5vw, 22px)',
            fontWeight: 700,
            lineHeight: 1.45,
            color: colors.ink,
            maxWidth: 560,
          }}
        >
          Fibre-to-fibre recycling won&apos;t be ready for 10–15 years.
          Remanufacturing is the only solution that works{' '}
          <em style={{ color: colors.orange, fontStyle: 'normal' }}>right now</em> — and
          Kantamanto has been proving it for generations.
        </p>

        <blockquote
          className="shrink-0 p-6 rounded-[10px] max-w-sm"
          style={{
            backgroundColor: `${colors.lightBlue}35`,
            border: `1px solid ${colors.lightBlue}`,
          }}
        >
          <p
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 15,
              fontStyle: 'italic',
              lineHeight: 1.72,
              color: colors.charcoal,
            }}
          >
            &ldquo;Every garment that passes through my hands is someone&apos;s
            discarded dream — and my opportunity to give it a second life.&rdquo;
          </p>
          <footer className="mt-4 flex items-center gap-3">
            <div style={{ width: 20, height: 1, backgroundColor: colors.orange, flexShrink: 0 }} />
            <p
              style={{
                fontFamily: fonts.syne,
                fontSize: 9,
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.2em',
                color: `${colors.charcoal}45`,
              }}
            >
              Kwame Darko · Kantamanto Market, Accra
            </p>
          </footer>
        </blockquote>
      </motion.div>
    </section>
  )
}
