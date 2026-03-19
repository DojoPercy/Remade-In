'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'

export interface CellData {
  src: string
  alt: string
  location: string
  position: string
}

const SLOTS = [
  { key: 'a', rotate: -2,   accent: colors.orange },
  { key: 'b', rotate:  1.5, accent: colors.blue   },
  { key: 'c', rotate: -1,   accent: colors.orange },
  { key: 'd', rotate:  2,   accent: colors.blue   },
  { key: 'e', rotate: -1.5, accent: colors.orange },
]

// ── Modern photo card ──────────────────────────────────────────────────────────

function PhotoCard({
  src, alt, location, position, rotate, accent,
}: CellData & { rotate: number; accent: string }) {
  return (
    <motion.div
      className="group relative flex-shrink-0 overflow-hidden"
      style={{
        width: 'clamp(180px, 21vw, 300px)',
        aspectRatio: '3/4',
        borderRadius: 10,
        rotate,
        boxShadow: '0 20px 50px rgba(0,0,0,0.18), 0 4px 14px rgba(0,0,0,0.10)',
      }}
      whileHover={{ rotate: 0, y: -10, boxShadow: '0 28px 64px rgba(0,0,0,0.22), 0 6px 18px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Accent stripe */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 3, backgroundColor: accent, zIndex: 3,
        }}
      />

      {/* Photo */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ objectPosition: position }}
        sizes="(max-width: 768px) 55vw, 300px"
      />

      {/* Bottom gradient */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.08) 45%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* Location label */}
      <div style={{ position: 'absolute', bottom: 14, left: 14, zIndex: 2 }}>
        <span
          className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: fonts.syne, color: 'rgba(255,255,255,0.82)' }}
        >
          <span
            style={{
              width: 5, height: 5, borderRadius: '50%',
              display: 'inline-block', backgroundColor: accent, flexShrink: 0,
            }}
          />
          {location}
        </span>
      </div>
    </motion.div>
  )
}

// ── Strip ──────────────────────────────────────────────────────────────────────

export default function GalleryStrip({ cells }: { cells: Record<string, CellData> }) {
  const ref = useRef<HTMLDivElement>(null)
  const constraintsRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Single row drifts left as you scroll through the section
  const x = useTransform(scrollYProgress, [0, 1], ['6%', '-22%'])

  // Blob parallaxes independently
  const blobX = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])
  const blobY = useTransform(scrollYProgress, [0, 1], ['0px', '50px'])

  return (
    // Outer wrapper: no overflow-hidden so the blob bleeds freely
    <div ref={ref} className="relative pb-24 pt-2">
      {/* Blob — lives outside the clipping container, bleeds into next section */}
      <div style={{ position: 'absolute', top: '40%', left: '30%', zIndex: 0, pointerEvents: 'none' }}>
        <motion.div
          className="blob-a"
          style={{
            width: 560,
            height: 560,
            marginTop: -280,
            marginLeft: -280,
            backgroundColor: colors.orange,
            opacity: 0.055,
            x: blobX,
            y: blobY,
          }}
        />
      </div>

      {/* Inner wrapper: overflow-hidden only on the card row */}
      <div className="overflow-hidden" ref={constraintsRef}>
        <motion.div
          className="flex gap-5 items-end"
          drag="x"
          dragConstraints={constraintsRef}
          dragMomentum={true}
          dragElastic={{ left: 0.05, right: 0.05 }}
          style={{ x, cursor: 'grab', position: 'relative', zIndex: 1 }}
          whileDrag={{ cursor: 'grabbing' }}
        >
          {SLOTS.map(({ key, rotate, accent }) => {
            const cell = cells[key]
            if (!cell) return null
            return <PhotoCard key={key} {...cell} rotate={rotate} accent={accent} />
          })}
        </motion.div>
      </div>
    </div>
  )
}
