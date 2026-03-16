import Image from 'next/image'
import { colors, fonts } from '@/lib/tokens'
import type { HomePage } from '@/lib/sanity/types'
import SectionDivider from '@/components/ui/SectionDivider'

const COLUMNS = [
  {
    num: '01',
    category: 'The Problem',
    
    image: '/images/pro.jpg',
    imgPosition: '30% center',
    title: '92M tonnes of textile waste annually. Recycling 10–15 years away.',
    desc: 'Circularity has scaled extraction, not justice. 1.1 billion people bear the cost.',
  },
  {
    num: '02',
    category: 'The Solution',
    image: '/images/sol.jpg',
    imgPosition: '60% center',
    title: 'Remanufacture First. Regional hubs + community-centred processing.',
    desc: 'We restore garments at 15–20% of the energy of new production, creating skilled local employment.',
  },
  {
    num: '03',
    category: 'The Invitation',
    image: '/images/inv.jpg',
    imgPosition: '80% center',
    title: 'Partner with us. Fund, collaborate, or join the movement.',
    desc: "Whether you're a brand, a tailor, a donor, or a policy maker — there is a role for you.",
  },
]

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
      {/* Eyebrow */}
      <p
        className="text-xs font-bold uppercase tracking-[0.12em] mb-10"
        style={{ color: `${colors.charcoal}55`, fontFamily: fonts.syne, fontSize: 12 }}
      >
        We Are The Glue
      </p>

      {/* Headline + body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-16">
        <h2
          className="font-extrabold leading-[0.92] tracking-tight"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(48px, 6vw, 80px)',
            color: colors.charcoal,
          }}
        >
          The Problem.<br />
          The Solution.<br />
          <em style={{ color: colors.orange, fontStyle: 'italic' }}>The Invitation.</em>
        </h2>

        <p
          className="text-sm leading-relaxed"
          style={{ color: `${colors.charcoal}77`, lineHeight: 1.9, maxWidth: 440 }}
        >
          The fashion industry generates 92 million tonnes of waste annually. We cannot recycle
          our way out of a crisis we created through overconsumption. Remanufacturing restores
          garments, creates dignified work, and closes the loop between Amsterdam and Kantamanto.
          This is the problem. We are the solution. And we need you.
        </p>
      </div>

      {/* Three cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div
            key={col.num}
            className="w-full rounded-[10px] border flex flex-col overflow-hidden"
            style={{ backgroundColor: '#ffffff', borderColor: 'rgba(168,162,158,0.2)' }}
          >
            {/* Image */}
            <div className="relative w-full overflow-hidden rounded-t-[10px] border-b" style={{ height: 176, borderColor: 'rgba(168,162,158,0.2)' }}>
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover"
                style={{ objectPosition: col.imgPosition }}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-5 pb-6 pt-2">
              {/* Large decorative number */}
              <p
                className="font-extrabold leading-none mb-1"
                style={{ fontFamily: fonts.syne, fontSize: 56, color: '#fee2e2' }}
              >
                {col.num}
              </p>

              {/* Category label */}
              <p
                className="font-medium uppercase mb-2"
                style={{ fontFamily: fonts.bricolage, fontSize: 12, color: '#b45309', letterSpacing: '0.12em' }}
              >
                {col.category}
              </p>

              {/* Title */}
              <h3
                className="font-extrabold leading-snug mb-3"
                style={{ fontFamily: fonts.bricolage, fontSize: 18, color: '#000000' }}
              >
                {col.title}
              </h3>

              {/* Description */}
              <p
                className="leading-relaxed"
                style={{ fontFamily: fonts.bricolage, fontSize: 13, color: '#737373', lineHeight: 1.65 }}
              >
                {col.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Ramp into Gallery's charcoal — white → charcoal diagonal */}
      <SectionDivider fill={colors.charcoal} direction="left" height={60} />
    </section>
  )
}
