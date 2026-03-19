import { client } from '@/lib/sanity/client'
import { galleryImagesQuery } from '@/lib/sanity/queries'
import type { GalleryImage } from '@/lib/sanity/types'
import { imageUrl } from '@/lib/sanity/image'
import { colors, fonts } from '@/lib/tokens'
import SectionDivider from '@/components/ui/SectionDivider'
import GalleryStrip, { type CellData } from '@/components/GalleryStrip'

// ── Static fallback ─────────────────────────────────────────────────────────────

const FALLBACK: Record<string, CellData> = {
  a: { src: '/Events/250830-Fashion Week-Kantamanto Social Club_RT-17.jpg', alt: 'Kantamanto Social Club at Fashion Week 2025', location: 'The Netherlands', position: '50% 30%'    },
  b: { src: '/Events/DFFL_KH_Photo-3.jpg',                                  alt: 'Craftspeople at the remanufacturing hub',     location: 'Ghana',           position: '50% center' },
  c: { src: '/Events/TSHRotterdam_KantamantoSocialClub_stehlestories-22.png',alt: 'Kantamanto Social Club event',               location: 'The Netherlands', position: '50% top'    },
  d: { src: '/Events/EDIT X STUDIO BAYBEE-8940.jpg',                        alt: 'Studio workshop — Edit × Studio Baybee',     location: 'The Netherlands', position: '50% center' },
  e: { src: '/Events/stehlestories_TSHAmsterdam_RethinkBlackFriday-06.jpg', alt: 'Rethink Black Friday community event',       location: 'The Netherlands', position: '50% 40%'    },
}

// ── Camera icon ─────────────────────────────────────────────────────────────────

function CameraIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

// ── Server component ────────────────────────────────────────────────────────────

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
            src:      imageUrl(img.image, 800),
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

  return (
    <section
      className="relative pt-28 pb-0"
      style={{ backgroundColor: colors.cream }}
    >
      {/* ── Header ── */}
      <div className="px-8 md:px-20 mb-16">
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
            fontSize: 'clamp(24px, 3vw, 38px)',
            color: colors.charcoal,
            letterSpacing: '-0.025em',
          }}
        >
          People, places{' '}
          <em style={{ color: colors.orange, fontStyle: 'italic' }}>&amp; real moments.</em>
        </h2>
      </div>

      {/* ── Scroll-animated strip ── */}
      <GalleryStrip cells={cells} />

      <SectionDivider fill={colors.cream} direction="right" height={52} />
    </section>
  )
}
