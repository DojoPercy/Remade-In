'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const STATS = [
  { value: '€2.9B',  label: 'Dutch fashion market',    note: 'One of Europe\'s most progressive' },
  { value: '2026',   label: 'EPR implementation',       note: 'Policy window is open right now'  },
  { value: '3',      label: 'Pilot cities identified',  note: 'Phase 1 hub locations'            },
]

const PARTNERS = [
  'The Social Hub',
  'Het Goed',
  'RTT',
  'DCW',
  'Midzuid',
  'Avans University',
  'Shared Bag',
]

export default function BlueprintDutchContext() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease } } : {},
  })

  return (
    <section
      ref={ref}
      className="px-8 md:px-20 py-20 md:py-28"
      style={{ backgroundColor: colors.cream }}
    >
      <motion.p
        {...anim(0)}
        className="mb-10 text-[11px] font-bold uppercase tracking-[0.28em]"
        style={{ fontFamily: fonts.syne, color: colors.orange }}
      >
        The Netherlands Opportunity
      </motion.p>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* Left: stat cards */}
        <motion.div {...anim(0.06)} className="flex flex-col gap-4">
          {STATS.map((s) => (
            <div
              key={s.value}
              className="flex items-center gap-5 p-5 rounded-[10px]"
              style={{
                backgroundColor: 'rgba(255,255,255,0.65)',
                border: `1px solid rgba(26,26,20,0.07)`,
              }}
            >
              <span
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 'clamp(26px, 2.8vw, 38px)',
                  fontWeight: 800,
                  color: colors.orange,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  flexShrink: 0,
                  minWidth: 72,
                }}
              >
                {s.value}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: fonts.bricolage,
                    fontSize: 15,
                    fontWeight: 700,
                    color: colors.ink,
                    lineHeight: 1.3,
                  }}
                >
                  {s.label}
                </p>
                <p
                  style={{
                    fontFamily: fonts.bricolage,
                    fontSize: 13,
                    color: `${colors.ink}50`,
                    marginTop: 2,
                  }}
                >
                  {s.note}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Right: description + partners */}
        <motion.div {...anim(0.12)} className="flex flex-col gap-5">
          <p
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(15px, 1.3vw, 17px)',
              lineHeight: 1.78,
              color: `${colors.ink}68`,
            }}
          >
            The Netherlands has an exceptional combination of assets: existing textile
            sorting infrastructure, a progressive policy environment, and geographic
            positioning as Europe&apos;s logistics hub.
          </p>
          <p
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(15px, 1.3vw, 17px)',
              lineHeight: 1.78,
              color: `${colors.ink}68`,
            }}
          >
            The EPR framework expected in 2026 creates both a mandate and a funding
            mechanism for community-led remanufacturing hubs. The ecosystem already
            exists. The blueprint is the roadmap to connect it.
          </p>

          {/* Partner pills */}
          <div className="mt-3">
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: fonts.syne, color: `${colors.ink}38` }}
            >
              Partners include
            </p>
            <div className="flex flex-wrap gap-2">
              {PARTNERS.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    fontFamily: fonts.syne,
                    backgroundColor: `${colors.lightBlue}55`,
                    color: colors.charcoal,
                    border: `1px solid ${colors.lightBlue}`,
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <a
            href="#downloads"
            className="self-start mt-2 text-xs font-bold uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-70"
            style={{ fontFamily: fonts.syne, color: colors.orange }}
          >
            View the full partner network →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
