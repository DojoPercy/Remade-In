'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import BlobButton from '@/components/ui/BlobButton'
import SectionDivider from '@/components/ui/SectionDivider'

interface Props {
  methodology?: any
  limitations?: string
  reportPdf?: { asset?: { url: string } }
  externalVerification?: string
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const PRINCIPLES = [
  { num: '01', title: 'Traceable data', body: 'Every figure links to a pilot dataset, field record, or verified supply chain event.' },
  { num: '02', title: 'Honest limitations', body: 'We publish what we don\'t know alongside what we do. Early-stage data has uncertainty — we say so.' },
  { num: '03', title: 'Quarterly updates', body: 'Impact numbers are refreshed every quarter. Projections are labelled clearly.' },
  { num: '04', title: 'Independent audit path', body: 'Third-party verification is in progress. We\'ll publish the audit report when complete.' },
]

export default function Methodology({ limitations, reportPdf, externalVerification }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const pdfUrl = reportPdf?.asset?.url
  const limitationsText = limitations || 'Early-stage sampling, evolving supply chain coverage, pilot-based calculations. Projections carry an estimated ±20% margin at current scale.'

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease } } : {},
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-8 md:px-20 pt-20 pb-32"
      style={{ backgroundColor: colors.charcoal }}
    >
      {/* Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 80% 90%, ${colors.blue}06 0, transparent 50%)`,
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
            Methodology & Transparency
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          {...anim(0.08)}
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.028em',
            color: colors.cream,
            maxWidth: '18ch',
            marginBottom: 64,
          }}
        >
          How we{' '}
          <em style={{ color: colors.orange, fontStyle: 'normal' }}>measure impact.</em>
        </motion.h2>

        {/* Principles grid — tabular */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-0"
          style={{ borderTop: `1px solid ${colors.white}14`, borderLeft: `1px solid ${colors.white}14` }}
        >
          {PRINCIPLES.map((p, idx) => (
            <motion.div
              key={p.num}
              {...anim(0.12 + idx * 0.07)}
              className="flex flex-col gap-4 p-8"
              style={{
                borderRight: `1px solid ${colors.white}14`,
                borderBottom: `1px solid ${colors.white}14`,
              }}
            >
              <span
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 11,
                  color: `${colors.cream}25`,
                  letterSpacing: '0.06em',
                }}
              >
                {p.num} /
              </span>
              <h3
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 17,
                  fontWeight: 800,
                  color: colors.cream,
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 13,
                  color: `${colors.cream}77`,
                  lineHeight: 1.7,
                }}
              >
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Limitations + Report row */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ borderLeft: `1px solid ${colors.white}14`, borderBottom: `1px solid ${colors.white}14` }}
        >
          {/* Data limitations */}
          <motion.div
            {...anim(0.4)}
            className="p-8 flex flex-col gap-4"
            style={{ borderRight: `1px solid ${colors.white}14` }}
          >
            <p
              style={{
                fontFamily: fonts.syne,
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: `${colors.cream}44`,
              }}
            >
              Data Limitations
            </p>
            <p
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 14,
                color: `${colors.cream}88`,
                lineHeight: 1.7,
              }}
            >
              {limitationsText}
            </p>
          </motion.div>

          {/* Verification + Report */}
          <motion.div
            {...anim(0.46)}
            className="p-8 flex flex-col gap-6"
          >
            <div>
              <p
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: `${colors.cream}44`,
                  marginBottom: 8,
                }}
              >
                Verification Status
              </p>
              <p
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 14,
                  color: `${colors.cream}88`,
                  lineHeight: 1.6,
                }}
              >
                {externalVerification || 'Internal tracking active. Third-party audit in progress — report will be published upon completion.'}
              </p>
            </div>

            {pdfUrl && (
              <div className="mt-auto">
                <BlobButton href={pdfUrl} variant="solid" size="sm" external>
                  Download Impact Report <span aria-hidden style={{ fontSize: 11, opacity: 0.7 }}>PDF</span>
                </BlobButton>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <SectionDivider fill={colors.charcoal} direction="left" height={0} />
    </section>
  )
}
