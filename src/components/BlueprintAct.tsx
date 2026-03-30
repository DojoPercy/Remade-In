'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const PARTNERS = [
  {
    audience: 'Foundations & Funders',
    amount: '€50K – €500K+',
    commitment: '2–5 year partnership',
    outcome:
      'Fund a community remanufacturing hub. Co-design impact measurement. Name on our published research and hub infrastructure.',
    cta: { label: 'Submit a Funding Inquiry', href: '/partner' },
  },
  {
    audience: 'Brands & Businesses',
    amount: '€25K – €100K',
    commitment: '12-month pilot',
    outcome:
      '2,000–10,000 garments remanufactured. Full traceability and impact reporting. A brand story that is genuinely true.',
    cta: { label: 'Submit a Partnership Inquiry', href: '/partner' },
  },
]

export default function BlueprintAct() {
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
      style={{ backgroundColor: colors.charcoal }}
    >
      <motion.div {...anim(0)} className="mb-14">
        <p
          className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em]"
          style={{ fontFamily: fonts.syne, color: colors.orange }}
        >
          Get Involved
        </p>
        <h2
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(26px, 3.5vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: colors.cream,
            maxWidth: 560,
          }}
        >
          Ways to be{' '}
          <em style={{ color: colors.orange, fontStyle: 'italic' }}>part of this.</em>
        </h2>
        <p
          className="mt-5 max-w-lg"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            lineHeight: 1.75,
            color: 'rgba(249,232,208,0.5)',
          }}
        >
          We are looking for partners who want to build this with us — not just fund it.
          Every investment creates real garments, real jobs, and real data.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {PARTNERS.map((p, i) => (
          <motion.div
            key={p.audience}
            initial={{ opacity: 0, y: 20 }}
            animate={
              inView
                ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.12 + i * 0.1, ease } }
                : {}
            }
            className="flex flex-col p-8 rounded-[12px]"
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(249,232,208,0.08)',
            }}
          >
            <p
              style={{
                fontFamily: fonts.syne,
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.2em',
                color: 'rgba(249,232,208,0.3)',
                marginBottom: 16,
              }}
            >
              {p.audience}
            </p>

            <div className="flex items-start justify-between gap-4 mb-5">
              <span
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 'clamp(22px, 2.2vw, 32px)',
                  fontWeight: 800,
                  color: colors.orange,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {p.amount}
              </span>
              <span
                className="shrink-0 px-3 py-1 rounded-full text-[10px] font-bold"
                style={{
                  fontFamily: fonts.syne,
                  backgroundColor: 'rgba(249,232,208,0.06)',
                  color: 'rgba(249,232,208,0.45)',
                  border: '1px solid rgba(249,232,208,0.12)',
                }}
              >
                {p.commitment}
              </span>
            </div>

            <p
              className="flex-1 mb-8"
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(14px, 1.2vw, 16px)',
                lineHeight: 1.72,
                color: 'rgba(249,232,208,0.6)',
              }}
            >
              {p.outcome}
            </p>

            <a
              href={p.cta.href}
              className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] text-xs font-bold uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-80"
              style={{
                fontFamily: fonts.syne,
                backgroundColor: colors.orange,
                color: '#ffffff',
              }}
            >
              {p.cta.label}
            </a>
          </motion.div>
        ))}
      </div>

      {/* Policy note */}
      <motion.p
        {...anim(0.35)}
        className="mt-10 pt-8"
        style={{ borderTop: '1px solid rgba(249,232,208,0.08)' }}
        style={{
          fontFamily: fonts.bricolage,
          fontSize: 14,
          lineHeight: 1.7,
          color: 'rgba(249,232,208,0.3)',
        }}
      >
        Policymaker? Our policy brief covers EPR reform, trade transparency, and tax
        incentives for remanufacturing.{' '}
        <a
          href="#downloads"
          className="transition-opacity duration-200 hover:opacity-70"
          style={{ color: colors.orange, textDecoration: 'underline', textUnderlineOffset: 3 }}
        >
          Download the Policy Brief →
        </a>
      </motion.p>
    </section>
  )
}
