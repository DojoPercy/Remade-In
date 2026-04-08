'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import type { TeamMember } from '@/lib/sanity/types'
import SectionDivider from '@/components/ui/SectionDivider'

// ── Blob shape pool ────────────────────────────────────────────────────────────

const BLOB_SHAPES = [
  '62% 38% 46% 54% / 60% 44% 56% 40%',
  '45% 55% 65% 35% / 55% 45% 35% 65%',
  '70% 30% 48% 52% / 48% 70% 30% 52%',
  '38% 62% 56% 44% / 44% 60% 40% 56%',
  '55% 45% 38% 62% / 62% 38% 58% 42%',
]

// Morph target — each blob subtly oscillates toward this alternate shape
const BLOB_MORPH_TARGETS = [
  '54% 46% 52% 48% / 52% 56% 44% 48%',
  '52% 48% 58% 42% / 48% 52% 42% 58%',
  '60% 40% 42% 58% / 55% 62% 38% 45%',
  '46% 54% 50% 50% / 50% 52% 48% 50%',
  '48% 52% 44% 56% / 55% 44% 52% 48%',
]

// Stagger the animation phase per blob so they don't all pulse together
const BLOB_DURATIONS = [7, 8.5, 7.8, 9.2, 8]

const ROLE_ACCENTS = [colors.orange, colors.blue, '#6776b6', '#d8570f']

// ── LinkedIn icon ─────────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// ── Animated blob wrapper ─────────────────────────────────────────────────────

function AnimatedBlob({
  shapeA,
  shapeB,
  duration,
  children,
  style,
}: {
  shapeA: string
  shapeB: string
  duration: number
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      animate={{ borderRadius: [shapeA, shapeB, shapeA] }}
      transition={{
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
      style={{ ...style, overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  )
}

// ── Profile Card (grid cell) ──────────────────────────────────────────────────

function ProfileCard({ member, index }: { member: TeamMember; index: number }) {
  const blobIdx    = index % BLOB_SHAPES.length
  const shapeA     = BLOB_SHAPES[blobIdx]
  const shapeB     = BLOB_MORPH_TARGETS[blobIdx]
  const duration   = BLOB_DURATIONS[blobIdx]
  const accent     = ROLE_ACCENTS[index % ROLE_ACCENTS.length]

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
      className="flex flex-col"
    >
      {/* ── Blob image ── */}
      <div className="relative w-full mx-auto mb-7" style={{ maxWidth: 260, aspectRatio: '4/4.5' }}>

        {/* Glow behind blob — also morphs in sync */}
        <AnimatedBlob
          shapeA={shapeA}
          shapeB={shapeB}
          duration={duration}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(ellipse at 50% 50%, ${accent}28 0%, transparent 70%)`,
            transform: 'scale(1.12)',
          }}
        >
          <div />
        </AnimatedBlob>

        {/* Blob image container */}
        <AnimatedBlob
          shapeA={shapeA}
          shapeB={shapeB}
          duration={duration}
          style={{ position: 'absolute', inset: 0 }}
        >
          {member.photo ? (
            <Image
              src={member.photo.asset.url}
              alt={member.photo.alt || member.name}
              fill
              className="object-cover object-top"
              sizes="260px"
              placeholder={member.photo.asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={member.photo.asset.metadata?.lqip ?? undefined}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: `${accent}20` }}
            >
              <span
                className="font-black"
                style={{ fontFamily: fonts.bricolage, fontSize: 64, color: accent, opacity: 0.35 }}
              >
                {member.name.charAt(0)}
              </span>
            </div>
          )}
        </AnimatedBlob>

        {/* Role badge — bottom-left, tilted */}
        <div
          className="absolute bottom-6 left-0 flex items-center px-3 py-2 rounded-[50px] shadow-lg z-10"
          style={{ backgroundColor: colors.charcoal, transform: 'rotate(-6deg)' }}
        >
          <span
            className="font-bold capitalize whitespace-nowrap text-xs"
            style={{ fontFamily: fonts.syne, color: colors.white }}
          >
            {member.role}
          </span>
        </div>

        {/* Name badge — top-right, tilted */}
        <div
          className="absolute top-6 right-0 flex items-center px-3 py-2 rounded-[50px] shadow-lg z-10"
          style={{ backgroundColor: accent, transform: 'rotate(6.4deg)' }}
        >
          <span
            className="font-bold capitalize whitespace-nowrap text-xs"
            style={{ fontFamily: fonts.syne, color: colors.white }}
          >
            {member.name}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
    </motion.article>
  )
}

// ── Group label divider ───────────────────────────────────────────────────────

function GroupLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="h-px flex-1" style={{ backgroundColor: `${colors.dark}14` }} />
      <p
        className="text-[11px] font-bold uppercase tracking-[0.28em] flex-shrink-0"
        style={{ fontFamily: fonts.syne, color: `${colors.dark}44` }}
      >
        {label}
      </p>
      <div className="h-px flex-1" style={{ backgroundColor: `${colors.dark}14` }} />
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function TeamSection({ members }: { members: TeamMember[] }) {
  const cofounders = members.filter((m) => m.memberType === 'cofounder')
  const coreTeam   = members.filter((m) => m.memberType === 'team')
  const advisors   = members.filter((m) => m.memberType === 'advisor')

  let globalIdx = 0

  return (
    <section
      className="relative overflow-hidden px-8 md:px-20 py-20 md:py-32"
      style={{ backgroundColor: colors.white }}
    >
      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20 md:mb-28"
      >
        <p
          className="text-[15px] font-bold uppercase tracking-[0.28em] mb-6"
          style={{ fontFamily: fonts.syne, color: colors.orange }}
        >
          The People
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <h2
            className="font-extrabold leading-[0.95] max-w-2xl"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(36px, 4.5vw, 68px)',
              letterSpacing: '-0.03em',
              color: colors.dark,
            }}
          >
            Behind every system<br />
            <em style={{ color: colors.blue, fontStyle: 'italic' }}>are people who care.</em>
          </h2>
          <p
            className="max-w-xs md:text-right"
            style={{ fontFamily: fonts.bricolage, fontSize: 15, lineHeight: 1.75, color: `${colors.dark}66` }}
          >
            A small, mission-driven team working at the intersection of fashion, justice, and systems change.
          </p>
        </div>
      </motion.div>

      {/* ── Co-founders ── */}
      {cofounders.length > 0 && (
        <div className="mb-24">
          <GroupLabel label="Co-Founders" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
            {cofounders.map((member) => (
              <ProfileCard key={member._id} member={member} index={globalIdx++} />
            ))}
          </div>
        </div>
      )}

      {/* ── Core team ── */}
      {coreTeam.length > 0 && (
        <div className="mb-24">
          <GroupLabel label="Core Team" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
            {coreTeam.map((member) => (
              <ProfileCard key={member._id} member={member} index={globalIdx++} />
            ))}
          </div>
        </div>
      )}

      {/* ── Advisory board ── */}
      {advisors.length > 0 && (
        <div className="mb-24">
          <GroupLabel label="Advisory Board" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
            {advisors.map((member) => (
              <ProfileCard key={member._id} member={member} index={globalIdx++} />
            ))}
          </div>
        </div>
      )}

      {/* ── We're Hiring ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row sm:items-center gap-5 p-7 rounded-2xl"
        style={{ backgroundColor: colors.lightBlue }}
      >
        <div className="flex-1">
          <p
            className="font-extrabold leading-snug"
            style={{ fontFamily: fonts.bricolage, fontSize: 18, color: colors.dark, letterSpacing: '-0.01em' }}
          >
            Want to join the movement?
          </p>
          <p
            className="mt-1"
            style={{ fontFamily: fonts.bricolage, fontSize: 14, lineHeight: 1.7, color: `${colors.dark}77` }}
          >
            We&apos;re occasionally looking for passionate people to grow with us.
          </p>
        </div>
        <a
          href="mailto:info@remade-in.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-80 flex-shrink-0"
          style={{ backgroundColor: colors.dark, color: '#ffffff', fontFamily: fonts.syne }}
        >
          Get in Touch
        </a>
      </motion.div>

      <SectionDivider fill={colors.lightBlue} direction="right" height={56} />
    </section>
  )
}