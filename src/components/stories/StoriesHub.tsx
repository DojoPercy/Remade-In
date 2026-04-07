'use client'

import { useState, useEffect, useRef, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { colors, fonts } from '@/lib/tokens'
import type { StoryItem, StoriesHubData } from '@/lib/sanity/types'
import { loadMoreStories } from '@/app/stories/actions'
import SectionDivider from '@/components/ui/SectionDivider'

// ── Constants ─────────────────────────────────────────────────────────────────

const TYPE_OPTIONS = [
  { label: 'All',       value: ''               },
  { label: 'Articles',  value: 'article'        },
  { label: 'Videos',    value: 'video'          },
  { label: 'News',      value: 'newsItem'       },
  { label: 'Events',    value: 'event'          },
  { label: 'Community', value: 'communityVoice' },
]

const TYPE_META: Record<string, { label: string; accent: string; surface: string; dark: boolean }> = {
  article:        { label: 'Article',   accent: colors.blue,   surface: '#6776b618', dark: false },
  video:          { label: 'Video',     accent: colors.orange, surface: '#d8570f18', dark: false },
  newsItem:       { label: 'News',      accent: colors.blue,   surface: '#6776b618', dark: false },
  event:          { label: 'Event',     accent: colors.green,  surface: '#cbd18333', dark: false },
  communityVoice: { label: 'Community', accent: colors.peach,  surface: '#f8cab840', dark: false },
}
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ── Helpers ───────────────────────────────────────────────────────────────────

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)
  return m ? m[1] : null
}

function fmtDate(iso: string) {
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }
  catch { return '' }
}

function getHref(item: StoryItem): string | null {
  if (item._type === 'newsItem')       return item.externalUrl ?? null
  if (item._type === 'communityVoice') return null
  return item.slug ? `/stories/${item.slug}` : null
}

function getTypeMeta(type: string) {
  return TYPE_META[type] ?? TYPE_META.article
}

// ── Type badge ────────────────────────────────────────────────────────────────

function TypeBadge({ type, dark }: { type: string; dark?: boolean }) {
  const m = getTypeMeta(type)
  return (
    <span style={{
      fontFamily:      fonts.syne,
      fontSize:        9,
      fontWeight:      700,
      textTransform:   'uppercase',
      letterSpacing:   '0.16em',
      color:           dark ? '#ffffff' : colors.charcoal,
      backgroundColor: dark ? `${colors.white}12` : m.accent,
      borderRadius:    4,
      padding:         '4px 9px',
      display:         'inline-block',
      flexShrink:      0,
    }}>
      {m.label}
    </span>
  )
}

// ── Image area ────────────────────────────────────────────────────────────────

function ImageArea({ item, large }: { item: StoryItem; large?: boolean }) {
  const { accent, dark } = getTypeMeta(item._type)
  const ytId   = item.videoUrl ? getYouTubeId(item.videoUrl) : null
  const imgSrc = item.imageUrl ?? (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null)

  // Event: calendar date overlay
  if (item._type === 'event') {
    const d      = new Date(item.date)
    const isPast = d < new Date()
    const day    = d.toLocaleDateString('en-GB', { day: '2-digit' })
    const month  = d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: `${colors.charcoal}06` }}>
        {imgSrc && <Image src={imgSrc} alt={item.title} fill className="object-cover opacity-30" />}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${colors.white} 0%, transparent 60%)` }} />
        <div className="relative flex flex-col items-center">
          <span style={{ fontFamily: fonts.bricolage, fontSize: large ? 88 : 60, fontWeight: 900, color: isPast ? `${colors.charcoal}22` : accent, lineHeight: 1, letterSpacing: '-0.04em' }}>
            {day}
          </span>
          <span style={{ fontFamily: fonts.syne, fontSize: 12, fontWeight: 700, color: isPast ? `${colors.charcoal}44` : accent, letterSpacing: '0.18em' }}>
            {month}
          </span>
        </div>
        {isPast && (
          <span className="absolute top-3 right-3" style={{ fontFamily: fonts.syne, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', backgroundColor: `${colors.charcoal}14`, color: `${colors.charcoal}55`, borderRadius: 4, padding: '3px 8px' }}>
            Past
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: dark ? `${colors.white}06` : `${colors.charcoal}06` }}>
      {imgSrc
        ? <Image src={imgSrc} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span style={{ fontFamily: fonts.bricolage, fontSize: 72, fontWeight: 900, color: dark ? `${colors.white}04` : `${colors.charcoal}06`, lineHeight: 1 }}>
              {getTypeMeta(item._type).label[0]}
            </span>
          </div>
        )
      }
      <div className="absolute inset-0" style={{ background: dark ? `linear-gradient(to top, ${colors.blue} 0%, transparent 55%)` : 'linear-gradient(to top, rgba(26,26,20,0.16) 0%, transparent 50%)' }} />

      {/* Video play button */}
      {item._type === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="group-hover:scale-110 transition-transform duration-300"
            style={{ width: 54, height: 54, borderRadius: '50%', backgroundColor: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 24px ${accent}66` }}>
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden>
              <path d="M1.5 1.5L14.5 9L1.5 16.5V1.5Z" fill="white" />
            </svg>
          </div>
        </div>
      )}
      {item._type === 'video' && item.duration && (
        <span className="absolute bottom-3 right-3" style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, backgroundColor: 'rgba(0,0,0,0.7)', color: colors.cream, padding: '3px 8px', borderRadius: 4, letterSpacing: '0.06em' }}>
          {item.duration}
        </span>
      )}
    </div>
  )
}

// ── Card content ──────────────────────────────────────────────────────────────

function CardContent({ item, large, dark }: { item: StoryItem; large?: boolean; dark?: boolean }) {
  const accent    = getTypeMeta(item._type).accent
  const textMain  = dark ? '#ffffff'                 : colors.charcoal
  const textMuted = dark ? 'rgba(255,255,255,0.45)'  : `${colors.charcoal}55`
  const textBody  = dark ? 'rgba(255,255,255,0.72)'  : `${colors.charcoal}77`
  const divider   = dark ? 'rgba(255,255,255,0.12)'  : `${colors.charcoal}08`
  const pad       = large ? '2.5rem' : '1.5rem'

  return (
    <div className="flex flex-col flex-1 gap-3" style={{ padding: pad }}>
      {/* Badge + date */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <TypeBadge type={item._type} dark={dark} />
        <span style={{ fontFamily: fonts.syne, fontSize: 10, color: textMuted, letterSpacing: '0.08em' }}>
          {fmtDate(item.date)}
        </span>
      </div>

      {/* Sub-label */}
      {(item.category || item.source || item.market) && (
        <p style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.18em' }}>
          {item.category ?? item.source ?? item.market}
        </p>
      )}

      {/* Community voice: pull quote layout */}
      {item._type === 'communityVoice' ? (
        <div className="flex gap-3 flex-1">
          <span aria-hidden style={{ fontFamily: fonts.bricolage, fontSize: large ? 52 : 34, color: accent, lineHeight: 0.8, opacity: 0.45, flexShrink: 0 }}>
            &ldquo;
          </span>
          <p style={{ fontFamily: fonts.bricolage, fontSize: large ? 19 : 14, color: textBody, lineHeight: 1.75, fontStyle: 'italic' }}>
            {item.quote ?? item.excerpt}
          </p>
        </div>
      ) : (
        <>
          <h3 style={{
            fontFamily:    fonts.bricolage,
            fontSize:      large ? 'clamp(22px,2.6vw,36px)' : 'clamp(16px,1.5vw,20px)',
            fontWeight:    900,
            color:         textMain,
            lineHeight:    1.12,
            letterSpacing: '-0.018em',
          }}>
            {item.title}
          </h3>
          {item.excerpt && (
            <p style={{
              fontFamily:           fonts.bricolage,
              fontSize:             large ? 15 : 13,
              color:                textBody,
              lineHeight:           1.75,
              display:              '-webkit-box',
              WebkitLineClamp:      large ? 4 : 2,
              WebkitBoxOrient:      'vertical',
              overflow:             'hidden',
            }}>
              {item.excerpt}
            </p>
          )}
        </>
      )}

      {/* Footer row */}
      <div className="flex items-center gap-3 flex-wrap mt-auto pt-3" style={{ borderTop: `1px solid ${divider}` }}>
        {item._type === 'communityVoice' && (
          <span style={{ fontFamily: fonts.syne, fontSize: 11, fontWeight: 700, color: textMain, letterSpacing: '0.07em' }}>
            {item.name}
            {item.location && <span style={{ color: textMuted, fontWeight: 400 }}>{' '}·{' '}{item.location}</span>}
          </span>
        )}
        {item.author && (
          <span style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            {item.author}
          </span>
        )}
        {item._type === 'event' && item.location && (
          <span style={{ fontFamily: fonts.syne, fontSize: 10, color: textMuted, letterSpacing: '0.08em' }}>
            {item.location}
          </span>
        )}
        {item._type === 'event' && item.isOnline && (
          <span style={{ fontFamily: fonts.syne, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', backgroundColor: `${colors.blue}18`, color: colors.blue, borderRadius: 4, padding: '3px 8px' }}>
            Online
          </span>
        )}
        {item._type === 'event' && item.registrationUrl && new Date(item.date) >= new Date() && (
          <span style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.14em', marginLeft: 'auto' }}>
            Register →
          </span>
        )}
        {item._type === 'newsItem' && item.externalUrl && (
          <svg className="ml-auto" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        )}
      </div>
    </div>
  )
}

// ── Unified story card ────────────────────────────────────────────────────────
// size='hero'      idx=0          col-span-3  horizontal, large
// size='spotlight' idx%5===4      col-span-2  horizontal, medium
// size='standard'  everything else col-span-1  vertical

function StoryCard({ item, size }: { item: StoryItem; size: 'hero' | 'spotlight' | 'standard' }) {
  const typeMeta = getTypeMeta(item._type)
  const dark    = typeMeta.dark
  const href    = getHref(item)
  const isExt   = item._type === 'newsItem' && !!item.externalUrl
  const isHoriz = size !== 'standard'
  const isLarge = size === 'hero'

  // Tailwind classes for image column in horizontal cards
  const imgColClass = isLarge
    ? 'relative w-full h-[220px] flex-shrink-0 md:w-[42%] md:h-auto md:self-stretch'
    : 'relative w-full h-[220px] flex-shrink-0 md:w-[38%] md:h-auto md:self-stretch'

  // Standard card: fixed-height image on top
  const imgStdClass = 'relative w-full'
  const imgStdH     = 210

  const wrapClass = isHoriz
    ? 'group flex flex-col md:flex-row overflow-hidden'
    : 'group flex flex-col overflow-hidden'
  const cardStyle = {
    borderRadius:    12,
    textDecoration:  'none' as const,
    height:          '100%',
    backgroundColor: dark ? typeMeta.accent : typeMeta.surface,
    border:          `1px solid ${typeMeta.accent}22`,
  }

  const content = isHoriz ? (
    <>
      <div className={imgColClass}>
        <ImageArea item={item} large={isLarge} />
      </div>
      <CardContent item={item} large={isLarge} dark={dark} />
    </>
  ) : (
    <>
      <div className={imgStdClass} style={{ height: imgStdH, position: 'relative' }}>
        <ImageArea item={item} large={false} />
      </div>
      <CardContent item={item} large={false} dark={dark} />
    </>
  )

  if (href) {
    return (
      <a href={href} className={wrapClass} style={cardStyle}
        {...(isExt ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </a>
    )
  }
  return <div className={wrapClass} style={cardStyle}>{content}</div>
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center py-32 gap-3">
      <p style={{ fontFamily: fonts.bricolage, fontSize: 17, color: `${colors.charcoal}44` }}>
        No stories match your filter.
      </p>
      <p style={{ fontFamily: fonts.syne, fontSize: 11, color: `${colors.charcoal}33`, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Try a different type or clear your search.
      </p>
    </div>
  )
}

// ── Main hub component ────────────────────────────────────────────────────────

export default function StoriesHub({
  initialData,
  type,
  q,
}: {
  initialData: StoriesHubData
  type: string
  q:    string
}) {
  const router = useRouter()
  const [extraItems,    setExtraItems]    = useState<StoryItem[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [searchVal,     setSearchVal]     = useState(q)
  const searchRef  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [, startT] = useTransition()

  useEffect(() => { setExtraItems([]) }, [type, q])
  useEffect(() => { setSearchVal(q)   }, [q])

  const allItems = [...initialData.items, ...extraItems]
  const isAllView = !type || type === 'all'
  const featuredItem = isAllView && !q ? allItems.find(item => item.featured) ?? null : null
  const gridItems = featuredItem ? allItems.filter(item => item._id !== featuredItem._id) : allItems
  const hasMore  = allItems.length < initialData.total

  // ── URL helpers ─────────────────────────────────────────────────────────────

  function pushParams(newType: string, newQ: string) {
    const p = new URLSearchParams()
    if (newType) p.set('type', newType)
    if (newQ)    p.set('q',    newQ)
    const qs = p.toString()
    startT(() => { router.push(`/stories${qs ? `?${qs}` : ''}`) })
  }

  function handleTypeChange(val: string) { pushParams(val, q) }

  function handleSearchChange(val: string) {
    setSearchVal(val)
    clearTimeout(searchRef.current)
    searchRef.current = setTimeout(() => { pushParams(type, val) }, 380)
  }

  async function handleLoadMore() {
    setIsLoadingMore(true)
    try {
      const { items } = await loadMoreStories(type, q, allItems.length)
      setExtraItems(prev => [...prev, ...items])
    } finally {
      setIsLoadingMore(false)
    }
  }

  // ── Grid helpers ────────────────────────────────────────────────────────────

  function cardSize(idx: number): 'hero' | 'spotlight' | 'standard' {
    if (idx === 0)     return 'hero'
    if (idx % 5 === 4) return 'spotlight'
    return 'standard'
  }

  function colClass(idx: number): string {
    if (idx === 0)     return 'md:col-span-3'
    if (idx % 5 === 4) return 'md:col-span-2'
    return 'md:col-span-1'
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-8 md:px-20 pt-32 pb-16"
        style={{ backgroundColor: colors.blue }}
      >
        {/* Grid texture */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          backgroundImage: `linear-gradient(${colors.white}08 1px, transparent 1px), linear-gradient(90deg, ${colors.white}08 1px, transparent 1px)`,
          backgroundSize:  '80px 80px',
        }} />
        {/* Watermark */}
        <span aria-hidden className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2" style={{
          fontFamily:    fonts.bricolage,
          fontSize:      'clamp(100px,15vw,190px)',
          fontWeight:    900,
          color:         `${colors.white}04`,
          lineHeight:    1,
          letterSpacing: '-0.05em',
        }}>
          STORIES
        </span>

        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: colors.orange }} />
            <span style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: colors.orange }}>
              Stories
            </span>
          </div>

          <h1 style={{
            fontFamily:    fonts.bricolage,
            fontSize:      'clamp(36px,5vw,68px)',
            fontWeight:    900,
            lineHeight:    1.06,
            letterSpacing: '-0.028em',
            color:         '#ffffff',
            maxWidth:      '15ch',
            marginBottom:  16,
          }}>
            Every story{' '}
            <em style={{ color: colors.orange, fontStyle: 'normal' }}>shapes the movement.</em>
          </h1>

          <p style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(14px,1.2vw,17px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', maxWidth: '46ch', marginBottom: 40 }}>
            Field notes, interviews, event recaps, videos and press coverage from the global remanufacturing community.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-10" style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 24 }}>
            <div>
              <span style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(20px,2.6vw,32px)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {initialData.total}
              </span>
              <span style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginTop: 4 }}>
                Stories published
              </span>
            </div>
            {[
              { value: 'event',          label: 'Events'          },
              { value: 'communityVoice', label: 'Community voices'},
            ].map(({ value, label }) => (
              <div key={value}>
                <span style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(20px,2.6vw,32px)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {initialData.items.filter(i => i._type === value).length}
                  {initialData.total > initialData.items.length ? '+' : ''}
                </span>
                <span style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginTop: 4 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <SectionDivider fill={colors.white} direction="right" height={52} />
      </section>

      {/* ── Grid section ──────────────────────────────────────────────────── */}
      <section className="px-8 md:px-20 py-14" style={{ backgroundColor: colors.white }}>

        {featuredItem && (
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px" style={{ backgroundColor: colors.orange }} />
              <span style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: colors.orange }}>
                Featured story
              </span>
            </div>
            <StoryCard item={featuredItem} size="hero" />
          </div>
        )}

        {/* ── Controls ── */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {/* Type tabs */}
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-1 min-w-0 pb-px">
            {TYPE_OPTIONS.map(({ label, value }) => {
              const isActive = type === value
              const accent = value ? getTypeMeta(value).accent : colors.orange
              return (
                <button
                  key={value}
                  onClick={() => handleTypeChange(value)}
                  aria-pressed={isActive}
                  className="shrink-0 transition-all duration-200"
                  style={{
                    fontFamily:    fonts.syne,
                    fontSize:      11,
                    fontWeight:    700,
                    letterSpacing: '0.1em',
                    borderRadius:  20,
                    padding:       '7px 16px',
                    cursor:        'pointer',
                    border:        'none',
                    ...(isActive
                      ? { background: accent,        color: colors.white }
                      : { background: `${accent}16`, color: accent       }),
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Search */}
          <div className="relative shrink-0">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={`${colors.charcoal}44`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="search"
              value={searchVal}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Search stories…"
              style={{
                fontFamily:      fonts.syne,
                fontSize:        11,
                letterSpacing:   '0.06em',
                padding:         '8px 12px 8px 30px',
                borderRadius:    20,
                border:          `1px solid ${colors.charcoal}14`,
                backgroundColor: `${colors.charcoal}06`,
                color:           colors.charcoal,
                outline:         'none',
                width:           188,
              }}
            />
          </div>

          {/* Total count */}
          <span style={{ fontFamily: fonts.syne, fontSize: 10, color: `${colors.charcoal}33`, letterSpacing: '0.1em', flexShrink: 0 }}>
            {initialData.total} {initialData.total === 1 ? 'story' : 'stories'}
          </span>
        </div>

        {/* ── Editorial grid ── */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${type}-${q}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {gridItems.length === 0 ? (
              <EmptyState />
            ) : (
              gridItems.map((item, idx) => (
                <motion.div
                  key={`${item._type}-${item._id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.36, delay: Math.min(idx * 0.03, 0.25), ease }}
                  className={colClass(idx)}
                >
                  <StoryCard item={item} size={cardSize(idx)} />
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Load More ── */}
        {hasMore && (
          <div className="flex items-center justify-center pt-14 gap-5">
            <div style={{ height: 1, flex: 1, backgroundColor: `${colors.charcoal}0d` }} />
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              style={{
                fontFamily:      fonts.syne,
                fontSize:        11,
                fontWeight:      700,
                letterSpacing:   '0.14em',
                textTransform:   'uppercase',
                padding:         '12px 32px',
                borderRadius:    24,
                border:          `2px solid ${colors.charcoal}18`,
                backgroundColor: 'transparent',
                color:           isLoadingMore ? `${colors.charcoal}44` : colors.charcoal,
                cursor:          isLoadingMore ? 'wait' : 'pointer',
                transition:      'all 0.2s ease',
              }}
            >
              {isLoadingMore
                ? 'Loading…'
                : `Load more · ${initialData.total - allItems.length} remaining`
              }
            </button>
            <div style={{ height: 1, flex: 1, backgroundColor: `${colors.charcoal}0d` }} />
          </div>
        )}

      </section>
    </>
  )
}
