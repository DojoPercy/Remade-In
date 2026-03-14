'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'

// ── Tab data (static — content from the white paper) ──────────────────────────

const TABS = [
  {
    id: 'problem',
    label: 'The Problem',
    photo: '/Events/KantamantoHomecoming_By_6.jpg',
    photoCaption: 'Kantamanto Market, Accra',
    stats: [
      { value: '92M', unit: 'tonnes', detail: 'of textile waste generated globally each year' },
      { value: '<1%', unit: '', detail: 'of textiles are currently recycled back into clothing' },
      { value: '248K', unit: 'tonnes', detail: 'exported from the Netherlands annually' },
      { value: '40%', unit: '', detail: 'of Kantamanto imports end up in landfill or waterways' },
    ],
    body: [
      'The global fashion industry produces 92 million tonnes of textile waste each year. Less than 1% is recycled back into new clothing — the rest is incinerated, landfilled, or exported.',
      'The Netherlands alone exports 248,000 tonnes of used textiles annually. A significant share ends up in Kantamanto Market, Accra — one of the world\'s largest second-hand clothing hubs — where 40% of arrivals go directly to landfill.',
      'Recycling technology is real but not yet at scale. Fibre-to-fibre recycling requires 10–15 more years of development before it can handle volume. In the meantime, remanufacturing is the only viable solution.',
    ],
    cta: { label: 'Read the full white paper', href: '#downloads' },
  },
  {
    id: 'why',
    label: 'Why Remanufacturing',
    photo: '/Upcyclers/KSCxBenBreuer-34.jpg',
    photoCaption: 'Upcycling workshop — Amsterdam',
    stats: [
      { value: '15–20%', unit: '', detail: 'of energy required vs. producing new garments' },
      { value: '10.5kg', unit: 'CO₂', detail: 'avoided per garment remanufactured' },
      { value: '633L', unit: 'water', detail: 'saved per garment vs. new production' },
      { value: '10–15 yrs', unit: '', detail: 'before fibre-to-fibre recycling reaches scale' },
    ],
    body: [
      'Remanufacturing — sorting, repairing, redesigning, and reselling garments — uses just 15–20% of the energy required to produce new clothing. It extends the life of a garment without destroying the fibre.',
      'Each remanufactured garment avoids an estimated 10.5kg of CO₂ and saves 633 litres of water compared to manufacturing an equivalent new item.',
      'This is not a compromise. It is the most efficient, community-compatible, and immediately scalable intervention available while recycling technology matures.',
    ],
    cta: { label: 'See our 2025 impact numbers', href: '/#impact' },
  },
  {
    id: 'kantamanto',
    label: 'Proof: Kantamanto',
    photo: '/Events/250830-Fashion Week-Kantamanto Social Club_RT-4.jpg',
    photoCaption: 'Kantamanto Social Club · Amsterdam Fashion Week 2025',
    stats: [
      { value: '30,000', unit: '', detail: 'people employed in Kantamanto\'s remanufacturing ecosystem' },
      { value: '60%', unit: '', detail: 'of imports successfully recirculated through market expertise' },
      { value: '100s', unit: 'yrs', detail: 'of textile knowledge encoded in Kantamanto market practices' },
      { value: '€10,280', unit: '', detail: 'directly invested into Kantamanto by Remade In (2025)' },
    ],
    body: [
      'Kantamanto Market in Accra, Ghana employs approximately 30,000 people — mostly women — in a sophisticated remanufacturing economy. Traders, sorters, tailors, and sellers collectively achieve a 60% recirculation rate for incoming garments.',
      'This is not informal recycling. It is a highly skilled, knowledge-intensive industry built over generations. Practices like Asasa (creative upcycling) and zero-waste pattern cutting represent expertise that Dutch and European fashion could learn from — not just export to.',
      'Remade In was founded on this principle: that knowledge transfer must flow in both directions. In 2025, we directly invested €10,280 into Kantamanto workers and contributed to the "Kanta to the World" experience at Amsterdam Fashion Week.',
    ],
    cta: { label: 'Meet the community', href: '/#community' },
  },
  {
    id: 'dutch',
    label: 'The Dutch Opportunity',
    photo: '/Events/TSHRotterdam_KantamantoSocialClub_stehlestories-22.png',
    photoCaption: 'The Social Hub Rotterdam · Kantamanto Social Club',
    stats: [
      { value: '3', unit: 'pilot cities', detail: 'identified for Phase 1 hub development' },
      { value: '€2.9B', unit: '', detail: 'Dutch fashion market — one of Europe\'s most progressive' },
      { value: '2026', unit: '', detail: 'target year for EPR implementation — policy window is open' },
      { value: '1st', unit: '', detail: 'country in Europe with the infrastructure to lead at scale' },
    ],
    body: [
      'The Netherlands has an exceptional combination of assets: existing textile sorting infrastructure (Het Goed, RTT), a progressive sustainability policy environment, and geographic positioning as Europe\'s logistics hub.',
      'The EPR framework, expected to be implemented in 2026, will require brands to fund end-of-life textile processing. This creates both a mandate and a funding mechanism for community-led remanufacturing hubs.',
      'Amsterdam is already home to key partners including The Social Hub, DCW, Midzuid, Avans University of Applied Sciences, and Shared Bag. The ecosystem exists. The blueprint is the roadmap to connect it.',
    ],
    cta: { label: 'View our partners', href: '#downloads' },
  },
  {
    id: 'roadmap',
    label: '10-Year Roadmap',
    photo: '/Events/stehlestories_TSHAmsterdam_RethinkBlackFriday-17.jpg',
    photoCaption: 'The Social Hub Amsterdam — Rethink Black Friday event',
    milestones: [
      {
        year: '2025',
        phase: 'Foundation',
        items: ['White paper published & presented at AFW', 'Kantamanto investment + community partnership', '250 garments remanufactured (proof of concept)', 'Partner network established in Amsterdam'],
      },
      {
        year: '2027',
        phase: 'Phase 1 — Pilot Hubs',
        items: ['3 pilot remanufacturing hubs open', '10,000 garments/year capacity per hub', 'Digital Open Bale Tool launched', 'Vocational training programme live'],
      },
      {
        year: '2030',
        phase: 'Phase 2 — Regional Scale',
        items: ['12 active hubs across the Netherlands', '300,000 garments/year', 'Policy framework embedded in EPR legislation', 'Cross-border expansion: Belgium, Germany'],
      },
      {
        year: '2035',
        phase: 'Phase 3 — 1M Garments',
        items: ['1,000,000 garments remanufactured annually', 'EU model replicated in 5+ countries', 'Kantamanto exports reduced measurably', '2,500+ jobs created in Dutch remanufacturing'],
      },
    ],
    cta: { label: 'Explore partnership opportunities', href: '/partner' },
  },
  {
    id: 'policy',
    label: 'Policy Recommendations',
    photo: '/Events/DFFL_KH_Photo-45.jpg',
    photoCaption: 'Design for Future Living · Kantamanto',
    recommendations: [
      { area: 'EPR Reform', summary: 'Require EPR fees to fund community-led remanufacturing hubs, not just sorting & recycling infrastructure. Set remanufacturing targets alongside recycling targets.' },
      { area: 'Trade Policy', summary: 'Mandate digital product passports for textile exports. Create transparency requirements that reveal the destination and fate of exported "second-hand" clothing.' },
      { area: 'Tax Incentives', summary: 'Introduce VAT reductions for remanufactured garments. Make circular fashion economically competitive with fast fashion.' },
      { area: 'Standards & Certification', summary: 'Develop a "Remanufactured in Europe" quality certification. Establish grading standards that enable remanufactured goods to enter mainstream retail.' },
      { area: 'Public Procurement', summary: 'Enable public bodies to prioritise remanufactured textiles. Government as a first customer creates the demand signal the market needs.' },
    ],
    cta: { label: 'Download the policy brief', href: '#downloads' },
  },
  {
    id: 'invest',
    label: 'Investment',
    photo: '/Upcyclers/KSCxBenBreuer-6.jpg',
    photoCaption: 'Upcycling community · Amsterdam',
    tiers: [
      {
        audience: 'Foundations & Funders',
        color: colors.orange,
        options: [
          { name: 'Founding Partner', amount: '€500,000+', commitment: '3–5 years', perks: ['Hub naming rights', 'Advisory council board seat', 'Co-branded research outputs', 'Quarterly strategic meetings'] },
          { name: 'Program Partner', amount: '€150K – €500K', commitment: '2–3 years', perks: ['Specific hub or initiative', 'Quarterly impact reports', 'Co-designed evaluation framework'] },
          { name: 'Catalyst Grant', amount: '€50K – €150K', commitment: '1–2 years', perks: ['Research or pilot hub support', 'Annual impact reporting', 'Partner recognition'] },
        ],
      },
      {
        audience: 'Brands & Businesses',
        color: '#008D68',
        options: [
          { name: 'Strategic Partner', amount: '€100,000', commitment: '12 months', perks: ['10,000 garments/year', 'Co-branded impact reporting', 'Speaking opportunities'] },
          { name: 'Program Partner', amount: '€50,000', commitment: '12 months', perks: ['5,000 garments processed', 'Quarterly reports', 'Annual report inclusion'] },
          { name: 'Pilot Partner', amount: '€25,000', commitment: '12 months', perks: ['2,000 garments (proof of concept)', 'Case study development', 'Research access'] },
        ],
      },
    ],
    cta: { label: 'Submit a partnership inquiry', href: '/partner' },
  },
] as const

type TabId = typeof TABS[number]['id']

// ── Helpers ────────────────────────────────────────────────────────────────────

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

function TabPhoto({ src, caption }: { src: string; caption: string }) {
  return (
    <div className="relative rounded-[8px] overflow-hidden" style={{ aspectRatio: '4/3' }}>
      <Image
        src={src}
        alt={caption}
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 45vw"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(26,26,20,0.7) 0%, transparent 50%)' }}
      />
      <p
        className="absolute bottom-4 left-4 right-4"
        style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(249,232,208,0.7)' }}
      >
        {caption}
      </p>
    </div>
  )
}

function StatCard({ value, unit, detail }: { value: string; unit: string; detail: string }) {
  return (
    <div
      className="flex flex-col gap-1.5 p-5 rounded-[6px]"
      style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(249,232,208,0.1)' }}
    >
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 900, color: colors.orange, lineHeight: 1 }}>
          {value}
        </span>
        {unit && (
          <span style={{ fontFamily: fonts.syne, fontSize: 12, fontWeight: 700, color: 'rgba(249,232,208,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {unit}
          </span>
        )}
      </div>
      <p style={{ fontFamily: fonts.bricolage, fontSize: 13, lineHeight: 1.55, color: 'rgba(249,232,208,0.5)' }}>
        {detail}
      </p>
    </div>
  )
}

function TabCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] transition-opacity duration-200 hover:opacity-70"
      style={{ fontFamily: fonts.syne, color: colors.orange }}
    >
      {label}
      <span aria-hidden="true">→</span>
    </a>
  )
}

// ── Component ──────────────────────────────────────────────────────────────────

const AUTO_MS = 6000

export default function BlueprintTabs() {
  const [active, setActive] = useState<TabId>('problem')
  const [autoPlay, setAutoPlay] = useState(true)
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // Auto-advance through tabs once section is in view
  useEffect(() => {
    if (!autoPlay || !inView) return
    const interval = setInterval(() => {
      setActive((cur) => {
        const idx = TABS.findIndex((t) => t.id === cur)
        return TABS[(idx + 1) % TABS.length].id
      })
    }, AUTO_MS)
    return () => clearInterval(interval)
  }, [autoPlay, inView])

  function handleTabClick(id: TabId) {
    setActive(id)
    setAutoPlay(false)
    if (resumeRef.current) clearTimeout(resumeRef.current)
    // Resume auto-play after 12s of inactivity
    resumeRef.current = setTimeout(() => setAutoPlay(true), 12000)
  }

  const tab = TABS.find((t) => t.id === active)!

  return (
    <section
      ref={ref}
      className="px-8 md:px-20 py-24"
      style={{ backgroundColor: colors.charcoal }}
      id="explore"
    >
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.5 } } : {}}
        className="mb-10 text-xs font-bold uppercase tracking-[0.3em]"
        style={{ fontFamily: fonts.syne, color: 'rgba(249,232,208,0.35)' }}
      >
        Explore the Blueprint
      </motion.p>

      {/* Tab bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.08 } } : {}}
        className="flex flex-wrap gap-2 mb-4"
        role="tablist"
        aria-label="Blueprint sections"
      >
        {TABS.map((t) => {
          const isActive = t.id === active
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabClick(t.id)}
              className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-[0.06em] transition-all duration-200"
              style={{
                fontFamily: fonts.syne,
                backgroundColor: isActive ? colors.orange : 'rgba(249,232,208,0.06)',
                color: isActive ? colors.white : 'rgba(249,232,208,0.45)',
                border: isActive ? `1px solid ${colors.orange}` : '1px solid rgba(249,232,208,0.1)',
              }}
            >
              {t.label}
            </button>
          )
        })}
      </motion.div>

      {/* Auto-play progress bar */}
      <div className="relative h-px mb-12" style={{ backgroundColor: 'rgba(249,232,208,0.08)' }}>
        {autoPlay && (
          <motion.div
            key={active}
            className="absolute top-0 left-0 h-full"
            style={{ backgroundColor: colors.orange }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
          />
        )}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
        >

          {/* ── Stats + body + photo tabs (Problem, Why, Kantamanto, Dutch) ── */}
          {'stats' in tab && (
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left: stats grid */}
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-3">
                  {tab.stats.map((s) => (
                    <StatCard key={s.value} {...s} />
                  ))}
                </div>
                <TabPhoto src={tab.photo} caption={tab.photoCaption} />
              </div>

              {/* Right: body + CTA */}
              <div className="flex flex-col gap-5 md:pt-2">
                {tab.body.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: fonts.bricolage,
                      fontSize: 'clamp(15px, 1.3vw, 17px)',
                      lineHeight: 1.78,
                      color: 'rgba(249,232,208,0.7)',
                    }}
                  >
                    {para}
                  </p>
                ))}
                <div className="mt-4">
                  <TabCta label={tab.cta.label} href={tab.cta.href} />
                </div>
              </div>
            </div>
          )}

          {/* ── Roadmap tab ── */}
          {'milestones' in tab && (
            <div>
              {/* Top photo */}
              <div className="mb-10 rounded-[8px] overflow-hidden relative" style={{ height: 260 }}>
                <Image
                  src={tab.photo}
                  alt={tab.photoCaption}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(26,26,20,0.8) 0%, rgba(26,26,20,0.2) 60%, transparent 100%)' }} />
                <div className="absolute inset-0 flex flex-col justify-center px-10">
                  <p style={{ fontFamily: fonts.syne, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(249,232,208,0.5)', marginBottom: 8 }}>
                    The 10-Year Journey
                  </p>
                  <p style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 900, color: colors.cream, lineHeight: 1.2, maxWidth: 400 }}>
                    From 250 garments today to 1,000,000 by 2035
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {tab.milestones.map((m, i) => (
                  <div
                    key={m.year}
                    className="relative p-6 rounded-[6px]"
                    style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(249,232,208,0.1)' }}
                  >
                    <div
                      className="absolute top-0 left-0 w-full h-1 rounded-t-[6px]"
                      style={{ backgroundColor: `rgba(232,51,10,${0.4 + i * 0.2})` }}
                    />
                    <span style={{ fontFamily: fonts.bricolage, fontSize: 38, fontWeight: 900, color: colors.orange, lineHeight: 1 }}>
                      {m.year}
                    </span>
                    <p style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(249,232,208,0.4)', marginTop: 4, marginBottom: 14 }}>
                      {m.phase}
                    </p>
                    <ul className="space-y-2">
                      {m.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span style={{ color: colors.orange, marginTop: 2, flexShrink: 0, lineHeight: 1.6 }}>—</span>
                          <span style={{ fontFamily: fonts.bricolage, fontSize: 13, lineHeight: 1.55, color: 'rgba(249,232,208,0.6)' }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <TabCta label={tab.cta.label} href={tab.cta.href} />
            </div>
          )}

          {/* ── Policy tab ── */}
          {'recommendations' in tab && (
            <div className="grid md:grid-cols-[1fr_340px] gap-12 items-start">
              <div>
                <div className="grid sm:grid-cols-2 gap-5 mb-10">
                  {tab.recommendations.map((r) => (
                    <div
                      key={r.area}
                      className="p-5 rounded-[6px]"
                      style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(249,232,208,0.1)' }}
                    >
                      <p style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: colors.orange, marginBottom: 10 }}>
                        {r.area}
                      </p>
                      <p style={{ fontFamily: fonts.bricolage, fontSize: 14, lineHeight: 1.65, color: 'rgba(249,232,208,0.62)' }}>
                        {r.summary}
                      </p>
                    </div>
                  ))}
                </div>
                <TabCta label={tab.cta.label} href={tab.cta.href} />
              </div>
              <TabPhoto src={tab.photo} caption={tab.photoCaption} />
            </div>
          )}

          {/* ── Investment tab ── */}
          {'tiers' in tab && (
            <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
              <div>
                <div className="grid lg:grid-cols-2 gap-8 mb-10">
                  {tab.tiers.map((tier) => (
                    <div key={tier.audience}>
                      <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: fonts.syne, color: 'rgba(249,232,208,0.35)' }}>
                        {tier.audience}
                      </p>
                      <div className="flex flex-col gap-4">
                        {tier.options.map((opt) => (
                          <div
                            key={opt.name}
                            className="p-5 rounded-[6px]"
                            style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(249,232,208,0.1)' }}
                          >
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div>
                                <p style={{ fontFamily: fonts.bricolage, fontSize: 16, fontWeight: 700, color: colors.cream }}>{opt.name}</p>
                                <p style={{ fontFamily: fonts.syne, fontSize: 10, color: 'rgba(249,232,208,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{opt.commitment}</p>
                              </div>
                              <span className="shrink-0 px-3 py-1 rounded-full text-xs font-bold" style={{ fontFamily: fonts.syne, backgroundColor: `${tier.color}22`, color: tier.color, border: `1px solid ${tier.color}44` }}>
                                {opt.amount}
                              </span>
                            </div>
                            <ul className="flex flex-wrap gap-2">
                              {opt.perks.map((perk) => (
                                <li key={perk} className="px-2.5 py-1 rounded-full text-xs" style={{ fontFamily: fonts.bricolage, backgroundColor: 'rgba(249,232,208,0.06)', color: 'rgba(249,232,208,0.55)' }}>
                                  {perk}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <TabCta label={tab.cta.label} href={tab.cta.href} />
              </div>
              <TabPhoto src={tab.photo} caption={tab.photoCaption} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
