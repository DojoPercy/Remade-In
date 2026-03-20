'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { imageUrl } from '@/lib/sanity/image'
import { colors, fonts } from '@/lib/tokens'

interface Story {
  title: string
  image?: {
    asset?: { url: string }
    alt?: string
  }
  community?: string
  quote?: string
  order: number
}

interface Props {
  data?: Story[]
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const DEFAULT_STORIES: Story[] = [
  {
    title: 'Ama: From Seller to Creator',
    community: 'Kantamanto Market, Accra',
    quote: 'When we open the bale, it is just not enough. Remanufacturing gives me a way to keep working with dignity.',
    order: 0,
  },
  {
    title: 'Abena: Breaking the Cycle',
    community: 'Community Maker, Kumasi',
    quote: 'Remanufacturing gave me a skill, a voice, and a way to provide for my family without destroying the planet.',
    order: 1,
  },
  {
    title: 'Kwame: Every Stitch Counts',
    community: 'Repair Lead, Tema',
    quote: "Every garment that passes through my hands is someone's discarded dream — and my chance to give it a second life.",
    order: 2,
  },
]

export default function ImpactStories({ data }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const stories = (data && data.length > 0) ? data : DEFAULT_STORIES

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-8 md:px-20 pt-20 pb-0"
      style={{ backgroundColor: colors.charcoal }}
    >
      {/* Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 5% 60%, ${colors.blue}07 0, transparent 50%)`,
        }}
      />

      <div className="relative">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-8 h-px shrink-0" style={{ backgroundColor: colors.orange }} />
          <span
            className="font-bold uppercase tracking-[0.22em]"
            style={{ fontFamily: fonts.syne, fontSize: 10, color: colors.orange }}
          >
            Community Impact Stories
          </span>
        </motion.div>

        {/* Heading + annotation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease, delay: 0.08 }}
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.028em',
              color: colors.cream,
              maxWidth: '18ch',
            }}
          >
            The people{' '}
            <em style={{ color: colors.orange, fontStyle: 'normal' }}>behind the metrics.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 15,
              fontWeight: 500,
              lineHeight: 1.7,
              color: `${colors.cream}88`,
              maxWidth: '36ch',
            }}
          >
            Numbers tell one story. The people who make remanufacturing possible tell another.
          </motion.p>
        </div>

        {/* Story cards — tabular with full borders */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ borderTop: `1px solid ${colors.white}14`, borderLeft: `1px solid ${colors.white}14` }}
        >
          {stories.map((story, idx) => {
            const imageUrlStr = story.image?.asset?.url
              ? imageUrl(
                  { asset: { url: story.image.asset.url }, alt: story.image.alt || story.title },
                  400,
                  500,
                )
              : null

            return (
              <motion.div
                key={`${story.title}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease, delay: 0.24 + idx * 0.08 }}
                className="group flex flex-col"
                style={{
                  borderRight: `1px solid ${colors.white}14`,
                  borderBottom: `1px solid ${colors.white}14`,
                }}
              >
                {/* Image or placeholder */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: 280, backgroundColor: `${colors.white}03` }}
                >
                  {imageUrlStr ? (
                    <Image
                      src={imageUrlStr}
                      alt={story.image?.alt || story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    /* No-image state — clean abstract placeholder with index */
                    <div
                      className="absolute inset-0 flex items-end p-6"
                      style={{
                        background: `linear-gradient(135deg, ${colors.orange}08 0%, transparent 60%)`,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: fonts.bricolage,
                          fontSize: 96,
                          fontWeight: 900,
                          color: `${colors.cream}08`,
                          lineHeight: 1,
                          letterSpacing: '-0.05em',
                        }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${colors.charcoal}88 0%, transparent 60%)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-8">
                  {story.community && (
                    <p
                      className="mb-3"
                      style={{
                        fontFamily: fonts.syne,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.16em',
                        color: colors.orange,
                      }}
                    >
                      {story.community}
                    </p>
                  )}

                  <h3
                    className="mb-5"
                    style={{
                      fontFamily: fonts.bricolage,
                      fontSize: 20,
                      fontWeight: 800,
                      color: colors.cream,
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {story.title}
                  </h3>

                  {story.quote && (
                    <div className="flex gap-3 flex-1">
                      {/* Large quote mark */}
                      <span
                        aria-hidden
                        style={{
                          fontFamily: fonts.bricolage,
                          fontSize: 48,
                          color: colors.orange,
                          lineHeight: 0.8,
                          opacity: 0.5,
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        &ldquo;
                      </span>
                      <p
                        style={{
                          fontFamily: fonts.bricolage,
                          fontSize: 14,
                          color: `${colors.cream}cc`,
                          lineHeight: 1.7,
                          fontStyle: 'italic',
                        }}
                      >
                        {story.quote}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="mt-16" style={{ borderTop: `1px solid ${colors.white}08` }} />
    </section>
  )
}
