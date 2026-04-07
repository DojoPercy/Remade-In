'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import type { AboutPage } from '@/lib/sanity/types'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const FALLBACK_PARAGRAPHS = [
  'The fashion industry generates 92 million tonnes of textile waste annually — and the communities bearing the greatest burden are those that had the least to do with creating it. Kantamanto Market in Accra, Ghana receives over 15 million garments every week. Sorters, seamstresses, and tailors there have built an entire remanufacturing economy out of necessity.',
  'Remade In was founded to connect that expertise with the Dutch fashion system — and to prove that remanufacturing can be a first choice, not a last resort.',
]

export default function AboutStory({ data }: { data?: AboutPage | null }) {
  const eyebrow    = data?.storyEyebrow   ?? 'Our Story'
  const headline   = data?.storyHeadline  ?? 'Born out of frustration with a broken system.'
  const paragraphs = data?.storyBodyParagraphs?.length ? data.storyBodyParagraphs : FALLBACK_PARAGRAPHS
  const imgSrc     = data?.storyImage?.asset?.url ?? '/Upcyclers/KSCxBenBreuer-32.jpg'
  const imgAlt     = data?.storyImage?.alt ?? 'Kantamanto Market remanufacturing'

  return (
    <section
      className="px-8 md:px-20 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
      style={{ backgroundColor: colors.white }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65, ease }}
      >
        <p
          className="text-[15px] font-bold uppercase tracking-[0.28em] mb-6"
          style={{ fontFamily: fonts.syne, color: colors.orange }}
        >
          {eyebrow}
        </p>
        <h2
          className="font-extrabold leading-snug mb-6"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(28px, 3vw, 40px)',
            letterSpacing: '-0.02em',
            color: colors.dark,
          }}
        >
          {headline}
        </h2>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={i > 0 ? 'mt-4' : ''}
            style={{ fontFamily: fonts.bricolage, fontSize: 16, lineHeight: 1.8, color: `${colors.dark}88` }}
          >
            {p}
          </p>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, delay: 0.12, ease }}
        className="relative rounded-2xl overflow-hidden"
        style={{ aspectRatio: '4/3' }}
      >
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </section>
  )
}
