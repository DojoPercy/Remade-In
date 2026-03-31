'use client'

import Image from 'next/image'
import { colors, fonts } from '@/lib/tokens'
import SectionDivider from '@/components/ui/SectionDivider'
import { imageUrl } from '@/lib/sanity/image'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface Partner {
  _id: string
  name: string
  url?: string
  logo?: {
    asset?: { url: string }
    alt?: string
  }
}

interface Props {
  data?: Partner[]
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function HomePartners({ data }: Props) {
  const partners = data ?? []
  if (partners.length === 0) return null

  // Duplicate for seamless loop
  const track = [...partners, ...partners]

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: colors.white }}
    >
      {/* ── Label row ── */}
      <div
        className="flex items-center px-8 md:px-20 py-5"
        style={{ borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
      >
        <div className="w-6 h-px shrink-0 mr-4" style={{ backgroundColor: colors.orange }} />
        <span
          style={{
            fontFamily: fonts.syne,
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: colors.orange,
          }}
        >
          Trusted Partners
        </span>
      </div>

      {/* ── Auto-scrolling logo strip ── */}
      <div
        className="relative overflow-hidden"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
      >
        {/* Left fade mask */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 120,
            background: `linear-gradient(90deg, ${colors.white}, transparent)`,
          }}
        />
        {/* Right fade mask */}
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 120,
            background: `linear-gradient(270deg, ${colors.white}, transparent)`,
          }}
        />

        <div className="ticker-track flex items-center" style={{ gap: 0 }}>
          {track.map((partner, idx) => {
            const logoSrc = partner.logo?.asset?.url
              ? imageUrl(
                  { asset: { url: partner.logo.asset.url }, alt: partner.logo.alt || partner.name },
                  240,
                  100,
                )
              : null

            const item = (
              <div
                className="group flex items-center justify-center shrink-0 px-14 py-10"
                style={{
                  borderRight: '1px solid rgba(0,0,0,0.07)',
                  minWidth: 240,
                }}
              >
                {logoSrc ? (
                  <Image
                    src={logoSrc}
                    alt={partner.logo?.alt || partner.name}
                    width={160}
                    height={64}
                    className="max-h-16 w-auto object-contain"
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: fonts.bricolage,
                      fontSize: 14,
                      fontWeight: 700,
                      color: 'rgba(0,0,0,0.35)',
                      whiteSpace: 'nowrap',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {partner.name}
                  </span>
                )}
              </div>
            )

            return partner.url ? (
              <a
                key={`${partner._id}-${idx}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block shrink-0"
                aria-label={`Visit ${partner.name}`}
              >
                {item}
              </a>
            ) : (
              <div key={`${partner._id}-${idx}`} className="shrink-0">
                {item}
              </div>
            )
          })}
        </div>
      </div>

      <SectionDivider fill={colors.orange} direction="right" height={56} />
    </section>
  )
}
