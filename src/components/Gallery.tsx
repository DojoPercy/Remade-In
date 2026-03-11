import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { galleryImagesQuery } from '@/lib/sanity/queries'
import type { GalleryImage } from '@/lib/sanity/types'
import { imageUrl } from '@/lib/sanity/image'
import { colors, fonts } from '@/lib/tokens'
import SectionDivider from '@/components/ui/SectionDivider'

// ── Types ──────────────────────────────────────────────────────────────────────

interface CellData {
  src: string
  alt: string
  location: string
  position: string
}

// ── Static fallback ────────────────────────────────────────────────────────────

const FALLBACK: Record<string, CellData> = {
  a: { src: '/Events/250830-Fashion Week-Kantamanto Social Club_RT-17.jpg', alt: 'Kantamanto Social Club at Amsterdam Fashion Week 2025', location: 'Amsterdam, NL',   position: '50% 30%'    },
  b: { src: '/Events/DFFL_KH_Photo-3.jpg',                                  alt: 'Craftspeople at the Kantamanto remanufacturing hub',    location: 'Kantamanto, GH', position: '50% center' },
  c: { src: '/Events/TSHRotterdam_KantamantoSocialClub_stehlestories-22.png',alt: 'Kantamanto Social Club at TSH Rotterdam',               location: 'Rotterdam, NL',  position: '50% top'    },
  d: { src: '/Events/EDIT X STUDIO BAYBEE-8940.jpg',                        alt: 'Studio workshop — Edit × Studio Baybee collaboration',  location: 'Amsterdam, NL',  position: '50% center' },
  e: { src: '/Events/stehlestories_TSHAmsterdam_RethinkBlackFriday-06.jpg', alt: 'Rethink Black Friday event at TSH Amsterdam',           location: 'Amsterdam, NL',  position: '50% 40%'    },
}

// ── Sub-component ──────────────────────────────────────────────────────────────

function GalleryCell({
  src,
  alt,
  location,
  position,
  className = '',
}: CellData & { className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        style={{ objectPosition: position }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to top, ${colors.charcoal}b8 0%, ${colors.charcoal}1a 45%, transparent 100%)`,
          opacity: 0.6,
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `${colors.charcoal}2e` }}
      />
      <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1.5 rounded-full"
          style={{
            fontFamily: fonts.syne,
            backgroundColor: `${colors.charcoal}99`,
            color: colors.cream,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <span className="rounded-full inline-block" style={{ width: 5, height: 5, backgroundColor: colors.orange }} />
          {location}
        </span>
      </div>
    </div>
  )
}

// ── Server component ───────────────────────────────────────────────────────────

export default async function Gallery() {
  let cells = FALLBACK

  try {
    const images = await client.fetch<GalleryImage[]>(
      galleryImagesQuery, {},
      { next: { revalidate: 3600 } },
    )
    if (images?.length) {
      const mapped: Record<string, CellData> = { ...FALLBACK }
      for (const img of images) {
        if (img.gridArea && img.image) {
          mapped[img.gridArea] = {
            src:      imageUrl(img.image, 1200),
            alt:      img.image.alt ?? img.location,
            location: img.location,
            position: img.objectPosition ?? '50% center',
          }
        }
      }
      cells = mapped
    }
  } catch {
    // CMS unavailable — use fallback silently
  }

  const totalShown = Object.keys(cells).length

  return (
    <section
      className="relative overflow-hidden px-8 md:px-20 pt-20 pb-24"
      style={{ backgroundColor: colors.charcoal }}
    >
      {/* ── Header ── */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-[0.28em] mb-3"
            style={{ color: `${colors.cream}44`, fontFamily: fonts.syne }}
          >
            In The Field
          </p>
          <h2
            className="font-extrabold leading-none tracking-tight"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(32px, 4vw, 52px)',
              color: colors.cream,
              letterSpacing: '-0.025em',
            }}
          >
            Where the work<br />
            <em style={{ color: colors.orange, fontStyle: 'italic' }}>happens.</em>
          </h2>
        </div>

        <a
          href="#"
          className="hidden md:inline-flex items-center gap-2 text-sm font-bold transition-colors duration-200 pb-0.5 border-b"
          style={{ fontFamily: fonts.syne, color: `${colors.cream}66`, borderColor: `${colors.cream}22` }}
        >
          View all photographs
          <span style={{ fontSize: 16 }}>→</span>
        </a>
      </div>

      {/* ── Grid ── */}
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: '480px 380px' }}
      >
        <GalleryCell {...cells.a} className="col-start-1 col-end-9 row-start-1 row-end-2" />
        <GalleryCell {...cells.b} className="col-start-9 col-end-13 row-start-1 row-end-2" />
        <GalleryCell {...cells.c} className="col-start-1 col-end-4 row-start-2 row-end-3" />
        <GalleryCell {...cells.d} className="col-start-4 col-end-7 row-start-2 row-end-3" />
        <GalleryCell {...cells.e} className="col-start-7 col-end-13 row-start-2 row-end-3" />
      </div>

      {/* ── Footer meta ── */}
      <div
        className="flex items-center justify-between mt-4 pt-4 text-[11px]"
        style={{
          borderTop: `1px solid ${colors.cream}0f`,
          color: `${colors.cream}33`,
          fontFamily: fonts.syne,
          letterSpacing: '0.06em',
        }}
      >
        <span>SHOWING {String(totalShown).padStart(2, '0')} OF 14 PHOTOGRAPHS</span>
        <span>AMSTERDAM · ROTTERDAM · ACCRA</span>
      </div>

      <SectionDivider fill={colors.cream} direction="right" height={60} />
    </section>
  )
}
