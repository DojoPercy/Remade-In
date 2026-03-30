'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, easeInOut } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import SectionDivider from '@/components/ui/SectionDivider'
import BlobButton from './ui/BlobButton'


// ── Types ──────────────────────────────────────────────────────────────────────

export interface VoiceItem {
  id: string
  name: string
  slug: string
  quote: string
  photoSrc: string
  market: string
  location: string
}

// ── Variants ───────────────────────────────────────────────────────────────────

const fadeSlide = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.55, ease: easeInOut } },
  exit:    { opacity: 0, x: -24, transition: { duration: 0.35, ease: easeInOut } },
}

const imgVariant = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeInOut } },
  exit:    { opacity: 0, scale: 0.97, transition: { duration: 0.35 } },
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function CommunityVoiceCarousel({ voices }: { voices: VoiceItem[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const voice = voices[active]

  useEffect(() => {
    if (paused || voices.length < 2) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % voices.length)
    }, 9000)
    return () => window.clearInterval(id)
  }, [paused, voices.length])

  return (
    <section
      className="relative overflow-hidden px-8 md:px-20 py-24 md:py-32"
      style={{ backgroundColor: colors.cream }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Decorative blob — top right ── */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[480px] h-[420px] origin-center z-0"
        style={{
          backgroundColor: `${colors.orange}18`,
          borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
          transform: 'translate(30%, -20%) rotate(-31deg)',
        }}
      />

      {/* ── Main layout ── */}
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">

        {/* ── Left — blob image ── */}
        <div className="relative flex-shrink-0 w-full max-w-[340px] md:w-[420px] h-[340px] md:h-[480px]">

          <AnimatePresence mode="wait">
            <motion.div
              key={voice.photoSrc}
              {...imgVariant}
              className="absolute inset-0"
              style={{
                borderRadius: '62% 38% 46% 54% / 60% 44% 56% 40%',
                overflow: 'hidden',
              }}
            >
              <Image
                src={voice.photoSrc}
                alt={voice.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 340px, 420px"
              />
            </motion.div>
          </AnimatePresence>

          {/* Badge — market (bottom-left, tilted -6deg) */}
          <div
            className="absolute bottom-10 -left-4 flex items-center px-4 py-2.5 rounded-[50px] shadow-lg z-10"
            style={{ backgroundColor: colors.charcoal, transform: 'rotate(-6deg)' }}
          >
            <span
              className="text-sm font-bold capitalize whitespace-nowrap"
              style={{ fontFamily: fonts.syne, color: colors.white }}
            >
              {voice.market}
            </span>
          </div>

          {/* Badge — location (top-right, tilted +6.4deg) */}
          <div
            className="absolute top-8 -right-6 flex items-center px-4 py-2.5 rounded-[50px] shadow-lg z-10"
            style={{ backgroundColor: colors.orange, transform: 'rotate(6.4deg)' }}
          >
            <span
              className="text-sm font-bold capitalize whitespace-nowrap"
              style={{ fontFamily: fonts.syne, color: colors.white }}
            >
              {voice.location}
            </span>
          </div>
        </div>

        {/* ── Right — quote content ── */}
        <div className="flex-1 min-w-0 md:pt-4">

          <p
            className="text-sm font-bold uppercase tracking-[0.12em] mb-3"
            style={{ fontFamily: fonts.syne, color: colors.orange, fontSize: 12 }}
          >
            Community Voice
          </p>
          <div className="mb-6 h-0.5 w-14" style={{ backgroundColor: colors.orange }} />

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={`quote-${active}`}
              {...fadeSlide}
              className="mb-8"
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(22px, 2.4vw, 30px)',
                fontWeight: 700,
                lineHeight: 1.38,
                color: colors.ink,
              }}
            >
              <span style={{ color: colors.orange }}>&ldquo; </span>
              {voice.quote}
              <span style={{ color: colors.orange }}> &rdquo;</span>
            </motion.blockquote>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`name-${active}`}
              {...fadeSlide}
              className="font-bold capitalize mb-6"
              style={{ fontFamily: fonts.syne, fontSize: 16, color: colors.ink }}
            >
              {voice.name}
            </motion.p>
          </AnimatePresence>
 <BlobButton href={`#${voice.slug}`} variant="solid">
           Read {voice.name.split(' ')[0]}&apos;s Story
          </BlobButton>
        

          {/* Dot navigation */}
          <div className="flex items-center gap-2.5 mt-10">
            {voices.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300 focus:outline-none"
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: i === active ? colors.charcoal : `${colors.charcoal}33`,
                  transform: i === active ? 'scale(1)' : 'scale(0.85)',
                }}
                aria-label={`View ${voices[i].name}`}
              />
            ))}
          </div>
        </div>
      </div>

      <SectionDivider fill={colors.charcoal} direction="right" height={52} />
    </section>
  )
}
