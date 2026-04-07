import { notFound }                    from 'next/navigation'
import Image                            from 'next/image'
import { client }                       from '@/lib/sanity/client'
import { communityVoiceBySlugQuery }    from '@/lib/sanity/queries'
import { imageUrl }                     from '@/lib/sanity/image'
import type { CommunityVoice }          from '@/lib/sanity/types'
import { colors, fonts }                from '@/lib/tokens'
import Nav                              from '@/components/Nav'
import Footer                           from '@/components/Footer'
import BlobButton                       from '@/components/ui/BlobButton'

// ── Portable text renderer ────────────────────────────────────────────────────

function StoryBody({ blocks }: { blocks: unknown[] }) {
  return (
    <div
      className="max-w-2xl"
      style={{
        fontFamily: fonts.bricolage,
        fontSize: 'clamp(16px, 1.4vw, 19px)',
        lineHeight: 1.85,
        color: `${colors.dark}dd`,
      }}
    >
      {blocks.map((block: any, i: number) => {
        if (block._type !== 'block' || !Array.isArray(block.children)) return null
        const text = block.children.map((c: any) => c.text ?? '').join('')
        if (!text) return null

        if (block.style === 'h2')
          return (
            <h2
              key={i}
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(22px, 2.5vw, 30px)',
                fontWeight: 800,
                color: colors.dark,
                letterSpacing: '-0.015em',
                marginTop: 48,
                marginBottom: 16,
              }}
            >
              {text}
            </h2>
          )

        if (block.style === 'h3')
          return (
            <h3
              key={i}
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(18px, 2vw, 24px)',
                fontWeight: 700,
                color: colors.dark,
                marginTop: 36,
                marginBottom: 12,
              }}
            >
              {text}
            </h3>
          )

        if (block.style === 'blockquote')
          return (
            <blockquote
              key={i}
              style={{
                borderLeft: `3px solid ${colors.orange}`,
                paddingLeft: 24,
                marginLeft: 0,
                marginTop: 32,
                marginBottom: 32,
                fontStyle: 'italic',
                color: `${colors.dark}88`,
                fontSize: 'clamp(18px, 1.6vw, 22px)',
              }}
            >
              {text}
            </blockquote>
          )

        return (
          <p key={i} style={{ marginBottom: 24 }}>
            {text}
          </p>
        )
      })}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function CommunityVoiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let voice: CommunityVoice | null = null

  try {
    voice = await client.fetch<CommunityVoice | null>(
      communityVoiceBySlugQuery,
      { slug },
      { next: { revalidate: 60 } },
    )
  } catch {}

  if (!voice) notFound()

  const photoSrc = voice.photo?.asset
    ? imageUrl(voice.photo, 900, 1000)
    : null

  return (
    <>
      <Nav />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden px-8 md:px-20 pt-32 pb-20 md:pt-44 md:pb-32"
        style={{ backgroundColor: colors.cream }}
      >
        {/* Decorative blob */}
        <div
          className="pointer-events-none absolute top-0 right-0 w-[520px] h-[460px] z-0"
          style={{
            backgroundColor: `${colors.orange}15`,
            borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
            transform: 'translate(30%, -20%) rotate(-28deg)',
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-14 md:gap-24">

          {/* Blob image */}
          {photoSrc && (
            <div
              className="relative flex-shrink-0 w-full max-w-[280px] md:w-[360px]"
              style={{ aspectRatio: '4/4.8' }}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: '62% 38% 46% 54% / 60% 44% 56% 40%',
                  background: `radial-gradient(ellipse at 50% 50%, ${colors.orange}28 0%, transparent 70%)`,
                  transform: 'scale(1.12)',
                }}
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ borderRadius: '62% 38% 46% 54% / 60% 44% 56% 40%' }}
              >
                <Image
                  src={photoSrc}
                  alt={voice.photo?.alt || voice.name}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 280px, 360px"
                  placeholder={voice.photo?.asset?.metadata?.lqip ? 'blur' : 'empty'}
                  blurDataURL={voice.photo?.asset?.metadata?.lqip ?? undefined}
                />
              </div>

              {/* Market pill — bottom left */}
              <div
                className="absolute bottom-6 left-0 flex items-center px-3 py-2 rounded-[50px] shadow-lg z-10"
                style={{ backgroundColor: colors.charcoal, transform: 'rotate(-6deg)' }}
              >
                <span
                  className="font-bold capitalize whitespace-nowrap text-xs"
                  style={{ fontFamily: fonts.syne, color: colors.white }}
                >
                  {voice.market}
                </span>
              </div>

              {/* Location pill — top right */}
              <div
                className="absolute top-6 right-0 flex items-center px-3 py-2 rounded-[50px] shadow-lg z-10"
                style={{ backgroundColor: colors.orange, transform: 'rotate(6.4deg)' }}
              >
                <span
                  className="font-bold capitalize whitespace-nowrap text-xs"
                  style={{ fontFamily: fonts.syne, color: colors.white }}
                >
                  {voice.location}
                </span>
              </div>
            </div>
          )}

          {/* Text block */}
          <div className="flex-1 min-w-0 md:pt-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 mb-8"
              style={{
                fontFamily: fonts.syne,
                fontSize: 11,
                fontWeight: 700,
                color: `${colors.dark}55`,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
              }}
            >
              ← Back
            </a>

            <p
              className="font-bold uppercase tracking-[0.22em] mb-3"
              style={{ fontFamily: fonts.syne, fontSize: 11, color: colors.orange }}
            >
              Community Voice
            </p>
            <div className="mb-4 h-0.5 w-12" style={{ backgroundColor: colors.orange }} />

            <h1
              className="font-extrabold leading-[0.95] mb-3"
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(40px, 5vw, 72px)',
                letterSpacing: '-0.03em',
                color: colors.dark,
              }}
            >
              {voice.name}
            </h1>

            {voice.role && (
              <p
                className="font-bold uppercase tracking-[0.16em] mb-8"
                style={{ fontFamily: fonts.syne, fontSize: 11, color: `${colors.dark}55` }}
              >
                {voice.role}
              </p>
            )}

            {/* Pull quote */}
            <blockquote
              className="mb-8"
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(20px, 2.2vw, 28px)',
                fontWeight: 700,
                lineHeight: 1.38,
                color: colors.dark,
              }}
            >
              <span style={{ color: colors.orange }}>&ldquo;</span>
              {voice.quote}
              <span style={{ color: colors.orange }}>&rdquo;</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── Full story ── */}
      {Array.isArray(voice.story) && voice.story.length > 0 && (
        <section
          className="px-8 md:px-20 py-16 md:py-24"
          style={{ backgroundColor: colors.white }}
        >
          <StoryBody blocks={voice.story} />
        </section>
      )}

      {/* ── Gallery ── */}
      {Array.isArray(voice.gallery) && voice.gallery.length > 0 && (
        <section
          className="px-8 md:px-20 py-12 md:py-20"
          style={{ backgroundColor: colors.lightBlue }}
        >
          <p
            className="text-[11px] font-bold uppercase tracking-[0.28em] mb-8"
            style={{ fontFamily: fonts.syne, color: colors.blue }}
          >
            Gallery
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {voice.gallery.map((img, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden"
                style={{ aspectRatio: '3/4' }}
              >
                <Image
                  src={imageUrl(img, 600, 800)}
                  alt={img.alt || `${voice.name} — photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section
        className="px-8 md:px-20 py-16 md:py-20 flex flex-col sm:flex-row sm:items-center gap-6"
        style={{ backgroundColor: colors.cream }}
      >
        <div className="flex-1">
          <p
            className="font-extrabold leading-snug mb-1"
            style={{ fontFamily: fonts.bricolage, fontSize: 20, color: colors.dark, letterSpacing: '-0.01em' }}
          >
            These are the people remaking the system.
          </p>
          <p
            style={{ fontFamily: fonts.bricolage, fontSize: 15, lineHeight: 1.7, color: `${colors.dark}77` }}
          >
            Support the community behind the work.
          </p>
        </div>
        <BlobButton href="/partner" variant="solid">
          Get Involved
        </BlobButton>
      </section>

      <Footer />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let voice: CommunityVoice | null = null
  try {
    voice = await client.fetch<CommunityVoice | null>(
      communityVoiceBySlugQuery,
      { slug },
      { next: { revalidate: 60 } },
    )
  } catch {}

  if (!voice) return {}
  return {
    title: `${voice.name} — Community Voice | Remade In`,
    description: voice.quote,
  }
}
