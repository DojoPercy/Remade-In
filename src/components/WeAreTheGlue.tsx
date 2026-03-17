import Image from 'next/image'
import { colors, fonts } from '@/lib/tokens'
import type { HomePage } from '@/lib/sanity/types'
import SectionDivider from '@/components/ui/SectionDivider'

// ── Card data ──────────────────────────────────────────────────────────────────

const COLUMNS = [
  {
    num: '01',
    category: 'The Problem',
    image: '/images/pro.jpg',
    imgPosition: '30% center',
    title: '92M tonnes of textile waste annually. Recycling 10–15 years away.',
    desc: 'Circularity has scaled extraction, not justice. 1.1 billion people bear the cost.',
    // Dark card
    bg:          '#1A1A14',
    textColor:   '#F9E8D0',
    dimText:     'rgba(249,232,208,0.45)',
    numColor:    'rgba(249,232,208,0.05)',
    stickerBg:   '#E8330A',
    stickerText: '#ffffff',
    rotate:      '-rotate-[1.5deg]',
  },
  {
    num: '02',
    category: 'The Solution',
    image: '/images/sol.jpg',
    imgPosition: '60% center',
    title: 'Remanufacture First. Regional hubs + community-centred processing.',
    desc: 'We restore garments at 15–20% of the energy of new production, creating skilled local employment.',
    // Orange card
    bg:          '#E8330A',
    textColor:   '#ffffff',
    dimText:     'rgba(255,255,255,0.55)',
    numColor:    'rgba(255,255,255,0.06)',
    stickerBg:   '#1A1A14',
    stickerText: '#F9E8D0',
    rotate:      'rotate-[0.5deg]',
  },
  {
    num: '03',
    category: 'The Invitation',
    image: '/images/inv.jpg',
    imgPosition: '80% center',
    title: 'Partner with us. Fund, collaborate, or join the movement.',
    desc: "Whether you're a brand, a tailor, a donor, or a policy maker — there is a role for you.",
    // Warm card
    bg:          '#F3EDE2',
    textColor:   '#1A1A14',
    dimText:     'rgba(26,26,20,0.5)',
    numColor:    'rgba(26,26,20,0.05)',
    stickerBg:   '#E8330A',
    stickerText: '#ffffff',
    rotate:      'rotate-[1.8deg]',
  },
]

// ── Section ────────────────────────────────────────────────────────────────────

export default function WeAreTheGlue({ data }: { data?: HomePage | null }) {
  const columns = data?.glueColumns?.length
    ? data.glueColumns.map((col, i) => ({ ...COLUMNS[i], ...col }))
    : COLUMNS

  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 md:py-20 px-8 md:px-20"
      style={{ backgroundColor: colors.white, color: colors.charcoal }}
    >
      {/* ── Section header ── */}
      <p
        className="text-[11px] font-bold uppercase tracking-[0.28em] mb-8"
        style={{ color: colors.orange, fontFamily: fonts.syne }}
      >
        We Are The Glue
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end mb-16 md:mb-20">
        <h2
          className="font-extrabold leading-[0.92] tracking-tight"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(44px, 6vw, 80px)',
            color: colors.charcoal,
          }}
        >
          The Problem.<br />
          The Solution.<br />
          <em style={{ color: colors.orange, fontStyle: 'italic' }}>The Invitation.</em>
        </h2>

        <p
          className="text-sm leading-relaxed"
          style={{ color: `${colors.charcoal}70`, lineHeight: 1.9, maxWidth: 440 }}
        >
          The fashion industry generates 92 million tonnes of waste annually. We cannot recycle
          our way out of a crisis we created through overconsumption. Remanufacturing restores
          garments, creates dignified work, and closes the loop between Amsterdam and Kantamanto.
          This is the problem. We are the solution. And we need you.
        </p>
      </div>

      {/* ── Three story cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-5 items-start">
        {columns.map((col, i) => (
          <div
            key={col.num}
            className={`
              relative flex flex-col overflow-hidden rounded-[10px]
              transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
              hover:rotate-0 hover:-translate-y-2
              ${col.rotate}
              ${i === 1 ? 'md:mt-8' : ''}
            `}
            style={{ backgroundColor: col.bg }}
          >
            {/* Watermark number */}
            <span
              aria-hidden
              className="absolute bottom-4 right-4 font-black leading-none select-none pointer-events-none"
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(80px, 10vw, 120px)',
                color: col.numColor,
                letterSpacing: '-0.05em',
                lineHeight: 1,
              }}
            >
              {col.num}
            </span>

            {/* Sticker badge */}
            <div
              className="absolute top-4 right-4 z-10 flex items-center justify-center"
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                backgroundColor: col.stickerBg,
                transform: 'rotate(-12deg)',
                boxShadow: '0 3px 10px rgba(0,0,0,0.25)',
              }}
            >
              <span
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 9,
                  fontWeight: 900,
                  color: col.stickerText,
                  textAlign: 'center',
                  lineHeight: 1.2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                }}
              >
                {col.num}
              </span>
            </div>

            {/* Photo */}
            <div className="relative w-full overflow-hidden" style={{ height: 200 }}>
              <Image
                src={col.image}
                alt={col.category}
                fill
                className="object-cover"
                style={{ objectPosition: col.imgPosition }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Colour overlay to blend image into card */}
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, transparent 40%, ${col.bg}cc 100%)` }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col px-6 pt-4 pb-8">
              {/* Category label */}
              <p
                className="font-bold uppercase mb-3"
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 10,
                  color: col.dimText,
                  letterSpacing: '0.22em',
                }}
              >
                {col.category}
              </p>

              {/* Title */}
              <h3
                className="font-extrabold leading-snug mb-3"
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 'clamp(16px, 1.5vw, 19px)',
                  color: col.textColor,
                  lineHeight: 1.3,
                }}
              >
                {col.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 13,
                  color: col.dimText,
                  lineHeight: 1.7,
                }}
              >
                {col.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <SectionDivider fill={colors.charcoal} direction="left" height={60} />
    </section>
  )
}
