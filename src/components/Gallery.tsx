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

// ── Per-slot: rotation class + vertical nudge ──────────────────────────────────

const SLOTS: Record<string, { rotate: string; nudge: string }> = {
  a: { rotate: '-rotate-[2deg]',   nudge: ''      },
  b: { rotate: 'rotate-[1.5deg]',  nudge: 'mt-10' },
  c: { rotate: '-rotate-[1deg]',   nudge: '-mt-3' },
  d: { rotate: 'rotate-[2.5deg]',  nudge: 'mt-8'  },
  e: { rotate: '-rotate-[1.5deg]', nudge: 'mt-1'  },
}

// ── Polaroid card ──────────────────────────────────────────────────────────────

function PolaroidCard({
  src,
  alt,
  location,
  position,
  rotate,
  className = '',
}: CellData & { rotate: string; className?: string }) {
  return (
    <div
      className={`
        group relative bg-white
        p-2.5 pb-9
        shadow-[0_6px_28px_rgba(0,0,0,0.28)]
        transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:rotate-0 hover:z-10
        ${rotate} ${className}
      `}
    >
      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/5' }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          style={{ objectPosition: position }}
          sizes="(max-width: 768px) 65vw, 28vw"
        />
      </div>

      {/* Location caption — handwritten feel */}
      <div className="absolute bottom-2 left-0 right-0 px-2 text-center">
        <span
          className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: fonts.syne, color: `${colors.charcoal}65` }}
        >
          <span
            className="rounded-full shrink-0"
            style={{ width: 5, height: 5, display: 'inline-block', backgroundColor: colors.orange }}
          />
          {location}
        </span>
      </div>
    </div>
  )
}

// ── Camera icon ────────────────────────────────────────────────────────────────

function CameraIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
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
            src:      imageUrl(img.image, 1000),
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

  const slots = Object.entries(cells)

  return (
    <section
      className="relative overflow-hidden px-8 md:px-20 pt-20 pb-28"
      style={{ backgroundColor: colors.charcoal }}
    >

      {/* ── Header ── */}
      <div className="flex items-end justify-between mb-10 md:mb-12">
        <div>
          <p
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] mb-4"
            style={{ color: colors.orange, fontFamily: fonts.syne }}
          >
            <CameraIcon />
            In The Field
          </p>
          <h2
            className="font-extrabold leading-none"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(30px, 4vw, 52px)',
              color: colors.cream,
              letterSpacing: '-0.025em',
            }}
          >
            People, places<br />
            <em style={{ color: colors.orange, fontStyle: 'italic' }}>&amp; real moments.</em>
          </h2>
        </div>

        <a
          href="#"
          className="hidden md:inline-flex items-center gap-2 text-[12px] font-bold pb-0.5 border-b opacity-50 hover:opacity-100 transition-opacity duration-200"
          style={{ fontFamily: fonts.syne, color: colors.cream, borderColor: `${colors.cream}20` }}
        >
          View all →
        </a>
      </div>

      {/* ── Desktop: staggered 2-row polaroid layout ── */}
      <div className="hidden md:flex flex-col gap-5">
        {/* Row 1: A (wide) + B */}
        <div className="flex gap-5 items-start">
          <PolaroidCard {...cells.a} rotate={SLOTS.a.rotate} className={`flex-[1.55] min-w-0 ${SLOTS.a.nudge}`} />
          <PolaroidCard {...cells.b} rotate={SLOTS.b.rotate} className={`flex-[1] min-w-0 ${SLOTS.b.nudge}`} />
        </div>
        {/* Row 2: C + D + E */}
        <div className="flex gap-5 items-start">
          <PolaroidCard {...cells.c} rotate={SLOTS.c.rotate} className={`flex-[1] min-w-0 ${SLOTS.c.nudge}`} />
          <PolaroidCard {...cells.d} rotate={SLOTS.d.rotate} className={`flex-[1] min-w-0 ${SLOTS.d.nudge}`} />
          <PolaroidCard {...cells.e} rotate={SLOTS.e.rotate} className={`flex-[1.4] min-w-0 ${SLOTS.e.nudge}`} />
        </div>
      </div>

      {/* ── Mobile: horizontal snap-scroll ── */}
      <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-8 px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {slots.map(([key, cell]) => (
          <PolaroidCard
            key={key}
            {...cell}
            rotate={SLOTS[key]?.rotate ?? ''}
            className="snap-start flex-none w-[62vw] min-w-[200px]"
          />
        ))}
      </div>

      {/* ── Footer strip ── */}
      <div
        className="flex items-center justify-between mt-8 pt-4 text-[10px] uppercase tracking-[0.1em]"
        style={{
          borderTop: `1px solid ${colors.cream}0d`,
          color: `${colors.cream}28`,
          fontFamily: fonts.syne,
        }}
      >
        <span>Amsterdam · Rotterdam · Accra</span>
        <span>{slots.length.toString().padStart(2, '0')} photographs</span>
      </div>

      <SectionDivider fill="#F3BFA2" direction="right" height={60} />
    </section>
  )
}
