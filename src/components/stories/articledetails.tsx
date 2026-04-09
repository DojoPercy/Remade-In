'use client' // keep if the parent page needs it, otherwise remove

import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { imageUrl } from '@/lib/sanity/image'
import { colors, fonts } from '@/lib/tokens'
import type { StoryArticle } from '@/lib/sanity/types'

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ── Portable Text component map ───────────────────────────────────────────────
// Covers every block type Sanity's default rich-text editor can produce.

const ptComponents: PortableTextComponents = {

  // ── Block styles ────────────────────────────────────────────────────────────
  block: {
    normal: ({ children }) => (
      <p style={{ marginBottom: 24 }}>{children}</p>
    ),
    h2: ({ children }) => (
      <h2 style={{
        fontFamily:    fonts.bricolage,
        fontSize:      'clamp(22px, 2.5vw, 30px)',
        fontWeight:    800,
        color:         colors.charcoal,
        letterSpacing: '-0.015em',
        marginTop:     48,
        marginBottom:  16,
        lineHeight:    1.2,
      }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{
        fontFamily:  fonts.bricolage,
        fontSize:    'clamp(18px, 2vw, 24px)',
        fontWeight:  700,
        color:       colors.charcoal,
        marginTop:   36,
        marginBottom: 12,
        lineHeight:  1.25,
      }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 style={{
        fontFamily:  fonts.bricolage,
        fontSize:    'clamp(16px, 1.6vw, 20px)',
        fontWeight:  700,
        color:       colors.charcoal,
        marginTop:   28,
        marginBottom: 8,
      }}>
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{
        borderLeft:   `3px solid ${colors.orange}`,
        paddingLeft:  24,
        marginLeft:   0,
        marginTop:    32,
        marginBottom: 32,
        fontStyle:    'italic',
        color:        `${colors.charcoal}88`,
        fontSize:     'clamp(18px, 1.6vw, 22px)',
        lineHeight:   1.7,
      }}>
        {children}
      </blockquote>
    ),
  },

  // ── Lists ────────────────────────────────────────────────────────────────────
  list: {
    bullet: ({ children }) => (
      <ul style={{
        marginBottom: 24,
        marginTop:    8,
        paddingLeft:  24,
        listStyleType: 'disc',
      }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol style={{
        marginBottom: 24,
        marginTop:    8,
        paddingLeft:  24,
        listStyleType: 'decimal',
      }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ marginBottom: 8, paddingLeft: 4 }}>{children}</li>
    ),
    number: ({ children }) => (
      <li style={{ marginBottom: 8, paddingLeft: 4 }}>{children}</li>
    ),
  },

  // ── Inline marks ─────────────────────────────────────────────────────────────
  marks: {
    strong: ({ children }) => (
      <strong style={{ fontWeight: 700, color: colors.charcoal }}>{children}</strong>
    ),
    em: ({ children }) => (
      <em style={{ fontStyle: 'italic' }}>{children}</em>
    ),
    underline: ({ children }) => (
      <span style={{ textDecoration: 'underline' }}>{children}</span>
    ),
    // Strikethrough
    'strike-through': ({ children }) => (
      <span style={{ textDecoration: 'line-through', opacity: 0.55 }}>{children}</span>
    ),
    // Highlight — Sanity uses a custom "highlight" mark if you've added it;
    // this renders it as a warm amber wash matching the brand palette.
    highlight: ({ children }) => (
      <mark style={{
        backgroundColor: `${colors.orange}28`,
        color:           colors.charcoal,
        borderRadius:    2,
        padding:         '1px 3px',
      }}>
        {children}
      </mark>
    ),
    // Inline links
    link: ({ value, children }) => {
      const href    = value?.href ?? '#'
      const isExt   = href.startsWith('http')
      return (
        <a
          href={href}
          {...(isExt ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          style={{
            color:          colors.orange,
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            fontWeight:     500,
          }}
        >
          {children}
        </a>
      )
    },
  },

  // ── Custom types (images, etc.) ───────────────────────────────────────────────
  types: {
    // Sanity image blocks inside body content
    image: ({ value }) => {
      if (!value?.asset) return null
      const src = imageUrl(value, 1200, 700)
      const alt = value.alt ?? ''
      return (
        <figure style={{ margin: '40px 0' }}>
          <div
            className="relative w-full overflow-hidden"
            style={{ borderRadius: 8, aspectRatio: '16 / 9' }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption style={{
              fontFamily:    fonts.syne,
              fontSize:      11,
              color:         `${colors.charcoal}55`,
              letterSpacing: '0.06em',
              marginTop:     10,
              textAlign:     'center',
            }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

// ── ArticleDetail ─────────────────────────────────────────────────────────────

export function ArticleDetail({ story }: { story: StoryArticle }) {
  const cover = story.coverImage?.asset?.url
    ? imageUrl(story.coverImage, 1400, 700)
    : null

  return (
    <main>
      {/* Cover */}
      {cover && (
        <div className="relative w-full" style={{ height: 'clamp(300px, 50vw, 560px)' }}>
          <Image
            src={cover}
            alt={story.coverImage?.alt ?? story.title}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(26,26,20,0.7) 100%)' }}
          />
        </div>
      )}

      {/* Header + Body */}
      // change to
<section
  className="px-8 md:px-20 py-16 md:py-20"
  style={{ backgroundColor: colors.white }}
>
  <div className="max-w-3xl mx-auto">
        <a
          href="/stories"
          className="inline-flex items-center gap-2 mb-8"
          style={{
            fontFamily:    fonts.syne,
            fontSize:      11,
            fontWeight:    700,
            color:         `${colors.charcoal}55`,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
          }}
        >
          ← Stories
        </a>

        {story.category && (
          <p style={{
            fontFamily:    fonts.syne,
            fontSize:      10,
            fontWeight:    700,
            color:         colors.orange,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            marginBottom:  16,
          }}>
            {story.category}
          </p>
        )}

        <h1 style={{
          fontFamily:    fonts.bricolage,
          fontSize:      'clamp(32px, 5vw, 64px)',
          fontWeight:    900,
          lineHeight:    1.08,
          letterSpacing: '-0.025em',
          color:         colors.charcoal,
          maxWidth:      '18ch',
          marginBottom:  24,
        }}>
          {story.title}
        </h1>

        <div
          className="flex items-center gap-6"
          style={{
            borderTop:    `1px solid ${colors.charcoal}12`,
            paddingTop:   16,
            marginBottom: 48,
          }}
        >
          {story.author && (
            <span style={{
              fontFamily:    fonts.syne,
              fontSize:      11,
              fontWeight:    700,
              color:         `${colors.charcoal}66`,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
            }}>
              {story.author}
            </span>
          )}
          <span style={{
            fontFamily:    fonts.syne,
            fontSize:      11,
            color:         `${colors.charcoal}44`,
            letterSpacing: '0.1em',
          }}>
            {fmtDate(story.publishedAt)}
          </span>
        </div>

        {/* Body */}
        <div
          className="max-w-2xl"
          style={{
            fontFamily: fonts.bricolage,
            fontSize:   'clamp(16px, 1.4vw, 19px)',
            lineHeight: 1.8,
            color:      `${colors.charcoal}dd`,
          }}
        >
          {/* Excerpt as lede */}
          {story.excerpt && (
            <p style={{
              fontSize:     'clamp(18px, 1.6vw, 22px)',
              fontWeight:   500,
              color:        colors.charcoal,
              lineHeight:   1.6,
              marginBottom: 32,
            }}>
              {story.excerpt}
            </p>
          )}

          {/* Full rich text body */}
          {Array.isArray(story.body) && story.body.length > 0 && (
            <PortableText value={story.body as any} components={ptComponents} />
          )}
        </div>
        </div>
      </section>
    </main>
  )
}