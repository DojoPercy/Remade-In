'use client'

import { motion } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import SectionDivider from '@/components/ui/SectionDivider'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const VALUES = [
  {
    title: 'Justice First',
    body: 'We centre the voices and labour of communities in the Global South who are most affected by textile waste — not as beneficiaries, but as experts and co-designers.',
  },
  {
    title: 'Remanufacture Over Recycle',
    body: 'Recycling still uses significant resources. Remanufacturing — repairing, redesigning, and restoring garments — is a higher-value, lower-impact intervention.',
  },
  {
    title: 'Radical Collaboration',
    body: 'No single actor can fix a global system alone. We build the infrastructure for brands, tailors, donors, policymakers, and communities to work together.',
  },
]

export default function AboutValues() {
  return (
    <section
      className="relative overflow-hidden px-8 md:px-20 py-16 md:py-24"
      style={{ backgroundColor: colors.lightBlue }}
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease }}
        className="text-[13px] font-bold uppercase tracking-[0.28em] mb-10"
        style={{ fontFamily: fonts.syne, color: colors.blue }}
      >
        What We Stand For
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease }}
            className="flex flex-col"
          >
            <div className="w-8 h-1 rounded-full mb-5" style={{ backgroundColor: colors.blue }} />
            <h3
              className="font-bold mb-3"
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 20,
                color: colors.blue,
                letterSpacing: '-0.01em',
              }}
            >
              {v.title}
            </h3>
            <p style={{ fontFamily: fonts.bricolage, fontSize: 15, lineHeight: 1.75, color: `${colors.dark}88` }}>
              {v.body}
            </p>
          </motion.div>
        ))}
      </div>

      <SectionDivider fill={colors.orange} direction="left" height={60} />
    </section>
  )
}
