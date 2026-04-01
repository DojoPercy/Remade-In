'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import type { TeamMember } from '@/lib/sanity/types'
import SectionDivider from '@/components/ui/SectionDivider'

// ── Accent palette per co-founder slot ────────────────────────────────────────

const FOUNDER_PALETTES = [
  {
    cardBg:    '#2b2b22',
    gradient:  'linear-gradient(to bottom, transparent 30%, rgba(43,43,34,0.98) 75%)',
    badgeBg:   '#d8570f',
    badgeText: '#ffffff',
    tagBg:     'rgba(255,255,255,0.10)',
    tagText:   'rgba(255,255,255,0.60)',
    bioText:   'rgba(255,255,255,0.72)',
    linkText:  'rgba(255,255,255,0.50)',
    quoteBar:  '#d8570f',
  },
  {
    cardBg:    '#6776b6',
    gradient:  'linear-gradient(to bottom, transparent 30%, rgba(103,118,182,0.98) 75%)',
    badgeBg:   '#d8570f',
    badgeText: '#ffffff',
    tagBg:     'rgba(255,255,255,0.12)',
    tagText:   'rgba(255,255,255,0.65)',
    bioText:   'rgba(255,255,255,0.78)',
    linkText:  'rgba(255,255,255,0.55)',
    quoteBar:  '#ffffff',
  },
] as const

// ── LinkedIn icon ─────────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// ── Co-Founder Card ───────────────────────────────────────────────────────────

function FounderCard({ member, index }: { member: TeamMember; index: number }) {
  const pal = FOUNDER_PALETTES[index % FOUNDER_PALETTES.length]

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.18 }}
      className="relative flex flex-col rounded-[14px] overflow-hidden"
      style={{ backgroundColor: pal.cardBg }}
    >
      {/* ── Photo ── */}
      <div className="relative w-full overflow-hidden" style={{ height: 360 }}>
        {member.photo ? (
          <>
            <Image
              src={member.photo.asset.url}
              alt={member.photo.alt || member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder={member.photo.asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={member.photo.asset.metadata?.lqip ?? undefined}
            />
            {/* Gradient fade into card */}
            <div className="absolute inset-0" style={{ background: pal.gradient }} />
          </>
        ) : (
          <div className="w-full h-full" style={{ background: `${pal.cardBg}99` }} />
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col px-7 pt-5 pb-9 gap-4">
        {/* Location badge */}
        {member.location && (
          <span
            className="self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.20em]"
            style={{
              backgroundColor: pal.badgeBg,
              color: pal.badgeText,
              fontFamily: fonts.syne,
            }}
          >
            {member.location}
          </span>
        )}

        {/* Role + Name */}
        <div>
          <p
            className="font-bold uppercase tracking-[0.18em]"
            style={{ fontFamily: fonts.syne, fontSize: 10, color: 'rgba(255,255,255,0.50)' }}
          >
            {member.role}
          </p>
          <h3
            className="font-extrabold leading-[1.0] mt-1.5"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(28px, 2.8vw, 38px)',
              letterSpacing: '-0.025em',
              color: '#ffffff',
            }}
          >
            {member.name}
          </h3>
        </div>

        {/* Short bio */}
        {member.shortBio && (
          <p style={{ fontFamily: fonts.bricolage, fontSize: 15, lineHeight: 1.8, color: pal.bioText }}>
            {member.shortBio}
          </p>
        )}

        {/* Mission quote */}
        {member.connectionToMission && (
          <div className="flex gap-3 items-start mt-1">
            <div className="flex-shrink-0 w-0.5 rounded-full self-stretch" style={{ backgroundColor: pal.quoteBar }} />
            <p
              className="italic"
              style={{ fontFamily: fonts.bricolage, fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)' }}
            >
              &ldquo;{member.connectionToMission}&rdquo;
            </p>
          </div>
        )}

        {/* Expertise tags */}
        {member.expertise && member.expertise.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {member.expertise.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.10em]"
                style={{ backgroundColor: pal.tagBg, color: pal.tagText, fontFamily: fonts.syne }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Social links */}
        <div className="flex gap-4 mt-1">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-100"
              style={{ fontFamily: fonts.syne, color: pal.linkText, opacity: 0.7 }}
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          )}
          {member.twitter && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-100"
              style={{ fontFamily: fonts.syne, color: pal.linkText, opacity: 0.7 }}
            >
              &#64;
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

// ── Core Team / Advisor Card ──────────────────────────────────────────────────

function CompactCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="flex gap-4 items-start p-5 rounded-2xl"
      style={{ backgroundColor: colors.lightBlue }}
    >
      {/* Avatar */}
      {member.photo ? (
        <div
          className="relative flex-shrink-0 rounded-xl overflow-hidden"
          style={{ width: 68, height: 68 }}
        >
          <Image
            src={member.photo.asset.url}
            alt={member.photo.alt || member.name}
            fill
            className="object-cover"
            sizes="68px"
          />
        </div>
      ) : (
        <div
          className="flex-shrink-0 rounded-xl flex items-center justify-center"
          style={{ width: 68, height: 68, backgroundColor: colors.blue + '22' }}
        >
          <span
            className="font-black"
            style={{ fontFamily: fonts.bricolage, fontSize: 22, color: colors.blue }}
          >
            {member.name.charAt(0)}
          </span>
        </div>
      )}

      {/* Info */}
      <div className="min-w-0">
        <p
          className="font-bold uppercase tracking-[0.12em]"
          style={{ fontFamily: fonts.syne, fontSize: 10, color: colors.orange }}
        >
          {member.role}
        </p>
        <h4
          className="font-extrabold mt-0.5 leading-snug"
          style={{ fontFamily: fonts.bricolage, fontSize: 17, color: colors.dark, letterSpacing: '-0.01em' }}
        >
          {member.name}
        </h4>
        {member.shortBio && (
          <p
            className="mt-1.5"
            style={{ fontFamily: fonts.bricolage, fontSize: 13, lineHeight: 1.7, color: `${colors.dark}88` }}
          >
            {member.shortBio}
          </p>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-bold uppercase tracking-[0.1em]"
            style={{ fontFamily: fonts.syne, color: colors.blue }}
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        )}
      </div>
    </motion.article>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function TeamSection({ members }: { members: TeamMember[] }) {
  const cofounders = members.filter((m) => m.memberType === 'cofounder')
  const coreTeam   = members.filter((m) => m.memberType === 'team')
  const advisors   = members.filter((m) => m.memberType === 'advisor')

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
        className="mb-14 md:mb-20"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {cofounders.map((member, i) => (
            <FounderCard key={member._id} member={member} index={i} />
          ))}
        </div>
      )}

      {/* ── Core team ── */}
      {coreTeam.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ backgroundColor: `${colors.dark}14` }} />
            <p
              className="text-[11px] font-bold uppercase tracking-[0.28em] flex-shrink-0"
              style={{ fontFamily: fonts.syne, color: `${colors.dark}44` }}
            >
              Core Team
            </p>
            <div className="h-px flex-1" style={{ backgroundColor: `${colors.dark}14` }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {coreTeam.map((member, i) => (
              <CompactCard key={member._id} member={member} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Advisory board ── */}
      {advisors.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ backgroundColor: `${colors.dark}14` }} />
            <p
              className="text-[11px] font-bold uppercase tracking-[0.28em] flex-shrink-0"
              style={{ fontFamily: fonts.syne, color: `${colors.dark}44` }}
            >
              Advisory Board
            </p>
            <div className="h-px flex-1" style={{ backgroundColor: `${colors.dark}14` }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {advisors.map((member, i) => (
              <CompactCard key={member._id} member={member} index={i} />
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
        className="flex flex-col sm:flex-row sm:items-center gap-5 mt-4 p-7 rounded-2xl"
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
          style={{
            backgroundColor: colors.dark,
            color: '#ffffff',
            fontFamily: fonts.syne,
          }}
        >
          Get in Touch
        </a>
      </motion.div>

      <SectionDivider fill={colors.lightBlue} direction="right" height={56} />
    </section>
  )
}
