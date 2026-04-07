import type { ReactNode } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SectionDivider from '@/components/ui/SectionDivider'
import type { GenericPage } from '@/lib/sanity/types'
import type { LegalFallbackPage } from '@/lib/legal-pages'
import { colors, fonts } from '@/lib/tokens'
import { imageUrl } from '@/lib/sanity/image'

type TocItem = {
  id: string
  title: string
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getPlainText(block: any) {
  if (!Array.isArray(block?.children)) return ''
  return block.children.map((child: any) => child?.text ?? '').join('').trim()
}

function getTocItems(blocks: unknown[] | undefined, fallback: LegalFallbackPage): TocItem[] {
  const fromCms = (blocks ?? [])
    .filter((block: any) => block?._type === 'block' && ['h2', 'h3'].includes(block?.style))
    .map((block: any) => {
      const title = getPlainText(block)
      return title ? { id: slugify(title), title } : null
    })
    .filter(Boolean) as TocItem[]

  if (fromCms.length) return fromCms
  return fallback.sections.map((section) => ({ id: slugify(section.title), title: section.title }))
}

function renderMarkedText(children: any[] = [], markDefs: any[] = []) {
  const defs = new Map(markDefs.map((def: any) => [def._key, def]))

  return children.map((child: any, index: number) => {
    if (child?._type !== 'span') return null

    let content: ReactNode = child.text ?? ''

    for (const mark of child.marks ?? []) {
      const def = defs.get(mark)
      if (mark === 'strong') content = <strong key={`${index}-${mark}`}>{content}</strong>
      else if (mark === 'em') content = <em key={`${index}-${mark}`}>{content}</em>
      else if (mark === 'underline') content = <span key={`${index}-${mark}`} style={{ textDecoration: 'underline' }}>{content}</span>
      else if (mark === 'code') content = (
        <code
          key={`${index}-${mark}`}
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '0.92em',
            padding: '0.08rem 0.32rem',
            borderRadius: 6,
            backgroundColor: `${colors.dark}10`,
          }}
        >
          {content}
        </code>
      )
      else if (mark === 'strike-through') content = <span key={`${index}-${mark}`} style={{ textDecoration: 'line-through' }}>{content}</span>
      else if (def?._type === 'link' && def.href) {
        content = (
          <a
            key={`${index}-${mark}`}
            href={def.href}
            target={def.blank ? '_blank' : undefined}
            rel={def.blank ? 'noopener noreferrer' : undefined}
            style={{ color: colors.blue, textDecoration: 'underline', textDecorationThickness: 1.5 }}
          >
            {content}
          </a>
        )
      }
    }

    return <span key={child._key ?? index}>{content}</span>
  })
}

function PortableBody({ blocks, accent }: { blocks: unknown[]; accent: string }) {
  const rendered: ReactNode[] = []

  for (let i = 0; i < blocks.length; i += 1) {
    const block: any = blocks[i]

    if (block?._type === 'block' && block?.listItem) {
      const listType = block.listItem === 'number' ? 'ol' : 'ul'
      const items: any[] = [block]

      while (i + 1 < blocks.length) {
        const next: any = blocks[i + 1]
        if (next?._type === 'block' && next?.listItem === block.listItem) {
          items.push(next)
          i += 1
          continue
        }
        break
      }

      const ListTag = listType as 'ol' | 'ul'
      rendered.push(
        <ListTag
          key={block._key ?? i}
          style={{
            marginTop: 18,
            marginBottom: 30,
            paddingLeft: 24,
            color: `${colors.dark}d8`,
            display: 'grid',
            gap: 12,
            listStyleType: listType === 'ol' ? 'decimal' : 'disc',
          }}
        >
          {items.map((item, itemIndex) => (
            <li key={item._key ?? itemIndex}>{renderMarkedText(item.children, item.markDefs)}</li>
          ))}
        </ListTag>,
      )
      continue
    }

    if (block?._type === 'imageWithAlt' && block?.asset) {
      const src = imageUrl(block, 1400, 900)
      rendered.push(
        <figure key={block._key ?? i} style={{ marginTop: 32, marginBottom: 32 }}>
          <div className="relative overflow-hidden rounded-[24px]" style={{ aspectRatio: '16 / 9', backgroundColor: `${colors.dark}08` }}>
            <Image
              src={src}
              alt={block.alt ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>
          {block.caption && (
            <figcaption style={{ marginTop: 12, fontFamily: fonts.syne, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: `${colors.dark}66` }}>
              {block.caption}
            </figcaption>
          )}
        </figure>,
      )
      continue
    }

    if (block?._type === 'cta' && block?.label && block?.href) {
      rendered.push(
        <div key={block._key ?? i} style={{ marginTop: 28, marginBottom: 28 }}>
          <a
            href={block.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              borderRadius: 999,
              padding: '0.9rem 1.2rem',
              backgroundColor: accent,
              color: colors.white,
              fontFamily: fonts.syne,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            {block.label}
          </a>
        </div>,
      )
      continue
    }

    if (block?._type !== 'block') continue

    const text = getPlainText(block)
    if (!text) continue
    const id = ['h2', 'h3'].includes(block.style) ? slugify(text) : undefined

    if (block.style === 'h2') {
      rendered.push(
        <h2
          key={block._key ?? i}
          id={id}
          style={{
            scrollMarginTop: 120,
            marginTop: 52,
            marginBottom: 16,
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: colors.dark,
          }}
        >
          {renderMarkedText(block.children, block.markDefs)}
        </h2>,
      )
      continue
    }

    if (block.style === 'h3' || block.style === 'h4') {
      rendered.push(
        <h3
          key={block._key ?? i}
          id={id}
          style={{
            scrollMarginTop: 120,
            marginTop: 34,
            marginBottom: 12,
            fontFamily: fonts.bricolage,
            fontSize: block.style === 'h3' ? 'clamp(22px, 2.2vw, 28px)' : 'clamp(18px, 1.8vw, 22px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: colors.dark,
          }}
        >
          {renderMarkedText(block.children, block.markDefs)}
        </h3>,
      )
      continue
    }

    if (block.style === 'blockquote') {
      rendered.push(
        <blockquote
          key={block._key ?? i}
          style={{
            marginTop: 32,
            marginBottom: 32,
            padding: '1.2rem 0 1.2rem 1.4rem',
            borderLeft: `4px solid ${accent}`,
            color: `${colors.dark}a8`,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            fontStyle: 'italic',
          }}
        >
          {renderMarkedText(block.children, block.markDefs)}
        </blockquote>,
      )
      continue
    }

    rendered.push(
      <p
        key={block._key ?? i}
        style={{
          marginBottom: 20,
          color: `${colors.dark}d8`,
          fontSize: 'clamp(15px, 1.2vw, 17px)',
          lineHeight: 1.88,
        }}
      >
        {renderMarkedText(block.children, block.markDefs)}
      </p>,
    )
  }

  return <>{rendered}</>
}

function FallbackBody({ fallback, accent }: { fallback: LegalFallbackPage; accent: string }) {
  return (
    <>
      {fallback.sections.map((section) => (
        <section key={section.title} id={slugify(section.title)} style={{ scrollMarginTop: 120, marginBottom: 44 }}>
          <h2
            style={{
              marginBottom: 16,
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: colors.dark,
            }}
          >
            {section.title}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              style={{
                marginBottom: 20,
                color: `${colors.dark}d8`,
                fontSize: 'clamp(15px, 1.2vw, 17px)',
                lineHeight: 1.88,
              }}
            >
              {paragraph}
            </p>
          ))}
          {section.bullets?.length ? (
            <ul
              style={{
                marginTop: 10,
                paddingLeft: 24,
                display: 'grid',
                gap: 12,
                color: `${colors.dark}d8`,
              }}
            >
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          <div style={{ marginTop: 26, height: 1, backgroundColor: `${accent}22` }} />
        </section>
      ))}
    </>
  )
}

export default function LegalPageScreen({
  page,
  fallback,
}: {
  page: GenericPage | null
  fallback: LegalFallbackPage
}) {
  const hero = page?.hero
  const title = hero?.headline ?? page?.title ?? fallback.title
  const eyebrow = hero?.eyebrow ?? fallback.eyebrow
  const intro = hero?.subheadline ?? fallback.intro
  const updatedAt = page?._updatedAt ? formatDate(page._updatedAt) : formatDate(fallback.updatedAt)
  const accent = fallback.accent
  const tocItems = getTocItems(page?.content, fallback)
  const heroImage = hero?.image?.asset ? imageUrl(hero.image, 1200, 900) : null

  return (
    <>
      <Nav />

      <section
        className="relative overflow-hidden px-8 md:px-20 pt-32 pb-16"
        style={{ backgroundColor: accent }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${colors.white}10 1px, transparent 1px), linear-gradient(90deg, ${colors.white}10 1px, transparent 1px)`,
            backgroundSize: '88px 88px',
          }}
        />
        {heroImage && (
          <div className="absolute inset-y-0 right-0 hidden lg:block w-[42%] opacity-20">
            <Image src={heroImage} alt={hero?.image?.alt ?? title} fill className="object-cover" sizes="42vw" priority />
          </div>
        )}
        <div
          aria-hidden
          className="absolute -right-20 -top-12 h-[320px] w-[320px] rounded-full"
          style={{ backgroundColor: `${colors.white}12` }}
        />

        <div className="relative max-w-4xl">
          <p
            className="mb-5 uppercase"
            style={{
              fontFamily: fonts.syne,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.24em',
              color: colors.white,
            }}
          >
            {eyebrow}
          </p>
          <h1
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(40px, 6vw, 82px)',
              fontWeight: 900,
              lineHeight: 0.96,
              letterSpacing: '-0.04em',
              color: colors.white,
              maxWidth: '11ch',
            }}
          >
            {title}
          </h1>
          <p
            className="mt-6 max-w-2xl"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(16px, 1.5vw, 20px)',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.78)',
            }}
          >
            {intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span
              style={{
                borderRadius: 999,
                padding: '0.55rem 0.9rem',
                backgroundColor: `${colors.white}16`,
                color: colors.white,
                fontFamily: fonts.syne,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Last updated {updatedAt}
            </span>
            <a
              href={`mailto:${fallback.contactEmail}`}
              style={{
                borderRadius: 999,
                padding: '0.55rem 0.9rem',
                backgroundColor: colors.white,
                color: accent,
                fontFamily: fonts.syne,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Contact {fallback.contactEmail}
            </a>
          </div>
        </div>

        <SectionDivider fill={colors.white} direction="right" height={54} />
      </section>

      <section className="px-8 md:px-20 py-14" style={{ backgroundColor: colors.white }}>
        <div className="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-8 xl:gap-12">
          <aside className="xl:sticky xl:top-24 self-start">
            <div
              className="rounded-[28px] p-6"
              style={{ backgroundColor: fallback.surface, border: `1px solid ${accent}1f` }}
            >
              <p
                className="mb-4 uppercase"
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: accent,
                }}
              >
                At a glance
              </p>
              <div className="grid grid-cols-2 gap-3">
                {fallback.summaryCards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-[20px] p-4"
                    style={{ backgroundColor: colors.white, border: `1px solid ${accent}18` }}
                  >
                    <p style={{ fontFamily: fonts.bricolage, fontSize: 20, fontWeight: 900, color: colors.dark, letterSpacing: '-0.02em' }}>
                      {card.value}
                    </p>
                    <p style={{ marginTop: 6, fontFamily: fonts.syne, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: `${colors.dark}88` }}>
                      {card.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-5 rounded-[28px] p-6"
              style={{ backgroundColor: colors.white, border: `1px solid ${colors.dark}12` }}
            >
              <p
                className="mb-4 uppercase"
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: accent,
                }}
              >
                On this page
              </p>
              <nav className="flex flex-col gap-3">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    style={{
                      fontFamily: fonts.bricolage,
                      fontSize: 15,
                      color: `${colors.dark}bb`,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>

            <div
              className="mt-5 rounded-[28px] p-6"
              style={{ backgroundColor: colors.dark, color: colors.white }}
            >
              <p
                className="uppercase"
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: `${colors.white}88`,
                }}
              >
                {fallback.contactLabel}
              </p>
              <a
                href={`mailto:${fallback.contactEmail}`}
                style={{
                  display: 'inline-block',
                  marginTop: 14,
                  fontFamily: fonts.bricolage,
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: colors.white,
                }}
              >
                {fallback.contactEmail}
              </a>
              <div style={{ marginTop: 16, display: 'grid', gap: 4, color: 'rgba(255,255,255,0.68)', fontFamily: fonts.bricolage, fontSize: 15, lineHeight: 1.6 }}>
                {fallback.contactAddress.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
          </aside>

          <div
            className="rounded-[32px] overflow-hidden"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.dark}12`,
              boxShadow: '0 24px 80px rgba(43,43,34,0.06)',
            }}
          >
            <div className="px-6 md:px-10 py-5" style={{ backgroundColor: fallback.surface, borderBottom: `1px solid ${accent}20` }}>
              <p style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent }}>
                Website policy
              </p>
            </div>
            <article
              className="px-6 md:px-10 py-8 md:py-10"
              style={{
                fontFamily: fonts.bricolage,
              }}
            >
              {page?.content?.length
                ? <PortableBody blocks={page.content} accent={accent} />
                : <FallbackBody fallback={fallback} accent={accent} />}
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
