import { client }           from '@/lib/sanity/client'
import { storyBySlugQuery } from '@/lib/sanity/queries'
import { imageUrl }         from '@/lib/sanity/image'
import { colors, fonts }    from '@/lib/tokens'
import type { AnyStory, StoryArticle, StoryVideo, StoryEvent } from '@/lib/sanity/types'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'
import Image  from 'next/image'
import BlobButton from '@/components/ui/BlobButton'
import { notFound } from 'next/navigation'
import { ArticleDetail } from '@/components/stories/articledetails'

// ── Video embed helpers ──────────────────────────────────────────────────────

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)
  return m ? m[1] : null
}

function getVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/([0-9]+)/)
  return m ? m[1] : null
}

function getEmbedUrl(url: string): string {
  const yt = getYouTubeId(url)
  if (yt) return `https://www.youtube.com/embed/${yt}?autoplay=0&rel=0`
  const vi = getVimeoId(url)
  if (vi) return `https://player.vimeo.com/video/${vi}`
  return url
}

// ── Date helpers ─────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ── Article detail ────────────────────────────────────────────────────────────

// function ArticleDetail({ story }: { story: StoryArticle }) {
//   const cover = story.coverImage?.asset?.url
//     ? imageUrl(story.coverImage, 1400, 700)
//     : null

//   return (
//     <main>
//       {/* Cover */}
//       {cover && (
//         <div className="relative w-full" style={{ height: 'clamp(300px, 50vw, 560px)' }}>
//           <Image src={cover} alt={story.coverImage?.alt ?? story.title} fill className="object-cover" priority />
//           <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(26,26,20,0.7) 100%)' }} />
//         </div>
//       )}

//       {/* Header */}
//       <section className="px-8 md:px-20 py-16 md:py-20" style={{ backgroundColor: colors.white }}>
//         <a
//           href="/stories"
//           className="inline-flex items-center gap-2 mb-8"
//           style={{ fontFamily: fonts.syne, fontSize: 11, fontWeight: 700, color: `${colors.charcoal}55`, textTransform: 'uppercase', letterSpacing: '0.16em' }}
//         >
//           ← Stories
//         </a>

//         <p style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, color: colors.orange, textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 16 }}>
//           {story.category}
//         </p>

//         <h1 style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.025em', color: colors.charcoal, maxWidth: '18ch', marginBottom: 24 }}>
//           {story.title}
//         </h1>

//         <div className="flex items-center gap-6" style={{ borderTop: `1px solid ${colors.charcoal}12`, paddingTop: 16, marginBottom: 48 }}>
//           {story.author && (
//             <span style={{ fontFamily: fonts.syne, fontSize: 11, fontWeight: 700, color: `${colors.charcoal}66`, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
//               {story.author}
//             </span>
//           )}
//           <span style={{ fontFamily: fonts.syne, fontSize: 11, color: `${colors.charcoal}44`, letterSpacing: '0.1em' }}>
//             {fmtDate(story.publishedAt)}
//           </span>
//         </div>

//         {/* Body — plain paragraphs from blocks */}
//         <div className="max-w-2xl" style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.8, color: `${colors.charcoal}dd` }}>
//           {story.excerpt && (
//             <p className="mb-8" style={{ fontSize: 'clamp(18px, 1.6vw, 22px)', fontWeight: 500, color: colors.charcoal, lineHeight: 1.6 }}>
//               {story.excerpt}
//             </p>
//           )}
//           {Array.isArray(story.body) && story.body.map((block: any, i: number) => {
//             if (block._type === 'block' && Array.isArray(block.children)) {
//               const text = block.children.map((c: any) => c.text ?? '').join('')
//               if (!text) return null
//               if (block.style === 'h2') return <h2 key={i} style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 800, color: colors.charcoal, letterSpacing: '-0.015em', marginTop: 48, marginBottom: 16 }}>{text}</h2>
//               if (block.style === 'h3') return <h3 key={i} style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 700, color: colors.charcoal, marginTop: 36, marginBottom: 12 }}>{text}</h3>
//               if (block.style === 'blockquote') return <blockquote key={i} style={{ borderLeft: `3px solid ${colors.orange}`, paddingLeft: 24, marginLeft: 0, marginTop: 32, marginBottom: 32, fontStyle: 'italic', color: `${colors.charcoal}88`, fontSize: 'clamp(18px, 1.6vw, 22px)' }}>{text}</blockquote>
//               return <p key={i} style={{ marginBottom: 24 }}>{text}</p>
//             }
//             return null
//           })}
//         </div>
//       </section>
//     </main>
//   )
// }

// ── Video detail ──────────────────────────────────────────────────────────────

function VideoDetail({ story }: { story: StoryVideo }) {
  const embedUrl = getEmbedUrl(story.videoUrl)
  const ytId = getYouTubeId(story.videoUrl)
  const thumbSrc = story.thumbnail?.asset?.url
    ? imageUrl(story.thumbnail, 1400, 700)
    : ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null

  return (
    <main>
      {/* Player */}
      <section style={{ backgroundColor: colors.charcoal, paddingTop: 80 }}>
        <div className="px-8 md:px-20 pb-8">
          <a
            href="/stories"
            style={{ fontFamily: fonts.syne, fontSize: 11, fontWeight: 700, color: `${colors.cream}55`, textTransform: 'uppercase', letterSpacing: '0.16em', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}
          >
            ← Stories
          </a>
          <p style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, color: colors.orange, textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 16 }}>Video</p>
          <h1 style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', color: colors.cream, maxWidth: '20ch', marginBottom: 32 }}>
            {story.title}
          </h1>
        </div>

        {/* 16:9 embed */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={story.title}
            style={{ border: 'none' }}
          />
        </div>
      </section>

    {/* Caption */}
{story.caption && (
  <section
    className="px-6 md:px-16 lg:px-24 py-14 md:py-20"
    style={{ backgroundColor: colors.white }}
  >
    <div className="max-w-3xl mx-auto">
      
      {/* Meta Info */}
      <div
        className="flex items-center gap-4 mb-8 pb-4"
        style={{
          borderBottom: `1px solid ${colors.charcoal}08`,
        }}
      >
        <span
          className="px-3 py-1 rounded-full"
          style={{
            fontFamily: fonts.syne,
            fontSize: 11,
            color: `${colors.charcoal}66`,
            backgroundColor: `${colors.charcoal}08`,
            letterSpacing: '0.08em',
          }}
        >
          {fmtDate(story.publishedAt)}
        </span>

        {story.duration && (
          <span
            className="px-3 py-1 rounded-full"
            style={{
              fontFamily: fonts.syne,
              fontSize: 11,
              fontWeight: 700,
              color: colors.orange,
              backgroundColor: `${colors.orange}15`,
              letterSpacing: '0.08em',
            }}
          >
            {story.duration}
          </span>
        )}
      </div>

      {/* Caption Text */}
      <p
        className="leading-relaxed"
        style={{
          fontFamily: fonts.bricolage,
          fontSize: 'clamp(16px, 1.3vw, 20px)',
          lineHeight: 1.9,
          color: `${colors.charcoal}dd`,
        }}
      >
        {story.caption}
      </p>
    </div>
  </section>
)}
    </main>
  )
}

// ── Event detail ──────────────────────────────────────────────────────────────

function EventDetail({ story }: { story: StoryEvent }) {
  const cover = story.coverImage?.asset?.url
    ? imageUrl(story.coverImage, 1400, 600)
    : null

  const eventDate = new Date(story.date)
  const isPast = eventDate < new Date()
  const day   = eventDate.toLocaleDateString('en-GB', { day: '2-digit' })
  const month = eventDate.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()
  const year  = eventDate.toLocaleDateString('en-GB', { year: 'numeric' })
  const time  = eventDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-8 md:px-20 pt-28 pb-20" style={{ backgroundColor: colors.charcoal }}>
        {cover && (
          <>
            <Image src={cover} alt={story.coverImage?.alt ?? story.title} fill className="object-cover opacity-20" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(26,26,20,0.6) 0%, rgba(26,26,20,0.95) 100%)' }} />
          </>
        )}
        <div className="relative">
          <a
            href="/stories"
            style={{ fontFamily: fonts.syne, fontSize: 11, fontWeight: 700, color: `${colors.cream}55`, textTransform: 'uppercase', letterSpacing: '0.16em', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}
          >
            ← Stories
          </a>

          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
            {/* Date block */}
            <div
              className="shrink-0 flex flex-col items-center justify-center"
              style={{ width: 96, height: 96, backgroundColor: colors.orange, borderRadius: 8 }}
            >
              <span style={{ fontFamily: fonts.bricolage, fontSize: 28, fontWeight: 900, color: colors.white, lineHeight: 1 }}>{day}</span>
              <span style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em' }}>{month} {year}</span>
            </div>

            <div>
              <p style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, color: colors.orange, textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 12 }}>
                {isPast ? 'Past Event' : 'Upcoming Event'}
              </p>
              <h1 style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.025em', color: colors.cream, maxWidth: '20ch', marginBottom: 16 }}>
                {story.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <span style={{ fontFamily: fonts.syne, fontSize: 11, fontWeight: 700, color: `${colors.cream}77`, letterSpacing: '0.1em' }}>
                  {time}
                </span>
                {story.location && (
                  <span style={{ fontFamily: fonts.syne, fontSize: 11, fontWeight: 700, color: `${colors.cream}77`, letterSpacing: '0.1em' }}>
                    · {story.location}
                  </span>
                )}
                {story.isOnline && (
                  <span style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, backgroundColor: `${colors.blue}22`, color: colors.blue, borderRadius: 4, padding: '4px 10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Online
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description + CTA */}
      <section className="px-8 md:px-20 py-16" style={{ backgroundColor: colors.white }}>
        {story.description && (
          <p className="max-w-2xl mb-10" style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.8, color: `${colors.charcoal}cc` }}>
            {story.description}
          </p>
        )}
        {story.registrationUrl && !isPast && (
          <BlobButton href={story.registrationUrl} variant="solid" external>
            Register Now
          </BlobButton>
        )}
      </section>
    </main>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let story: AnyStory | null = null

  try {
    story = await client.fetch<AnyStory | null>(
      storyBySlugQuery,
      { slug },
      { next: { revalidate: 60 } },
    )
  } catch {
    // CMS unavailable
  }

  if (!story) notFound()

  return (
    <>
      <Nav />
      {story._type === 'article'  && <ArticleDetail story={story as StoryArticle} />}
      {story._type === 'video'    && <VideoDetail   story={story as StoryVideo}   />}
      {story._type === 'event'    && <EventDetail   story={story as StoryEvent}   />}
      <Footer />
    </>
  )
}
