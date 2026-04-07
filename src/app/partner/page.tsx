import Image from 'next/image'
import { Shirt, TrendingUp, Landmark, Scissors, type LucideIcon } from 'lucide-react'
import Nav from '@/components/Nav'
import DonationBanner from '@/components/DonationBanner'
import Footer from '@/components/Footer'
import PartnerForm from '@/components/PartnerForm'
import SectionDivider from '@/components/ui/SectionDivider'
import { colors, fonts } from '@/lib/tokens'
import { client } from '@/lib/sanity/client'
import { homePageQuery, partnerPageQuery } from '@/lib/sanity/queries'
import type { HomePage, PartnerPage } from '@/lib/sanity/types'

export const metadata = {
  title: 'Partner With Us — Remade In',
  description:
    'Join Remade In as a brand, investor, institution, or tailor. Help us build a justice-led textile remanufacturing ecosystem.',
}

const ICON_MAP: Record<string, LucideIcon> = {
  Shirt,
  TrendingUp,
  Landmark,
  Scissors,
}

const FALLBACK_PARTNERSHIP_TYPES = [
  { label: 'Brands & Retailers',       iconName: 'Shirt',       body: 'Integrate remanufacturing into your production model. We connect you to skilled tailors in Kantamanto and the Netherlands, provide co-branded storytelling, and help you meet circular economy targets with real, measurable impact.' },
  { label: 'Investors & Funders',       iconName: 'TrendingUp',  body: 'Fund the Open Bale Digital Tool, our regional remanufacturing hubs, or the 1M Garment Movement. We offer transparent impact reporting and early access to our findings. Every euro stretches further in a community-led model.' },
  { label: 'Institutions & Policy Makers', iconName: 'Landmark', body: 'We work with governments, municipalities, and academic institutions to pilot circular textile infrastructure. Our Blueprint provides a ready-made framework for policy and procurement decisions.' },
  { label: 'Tailors & Makers',          iconName: 'Scissors',    body: 'Whether you are based in Accra or Amsterdam, we want to work with you. Join our network of skilled remanufacturers, access training and tools, and be part of a new economic model that values your expertise.' },
]

export default async function PartnerPage() {
  let homeData: HomePage | null = null
  let partnerData: PartnerPage | null = null
  try {
    const isr = { next: { revalidate: 60 } }
    ;[homeData, partnerData] = await Promise.all([
      client.fetch<HomePage>(homePageQuery, {}, isr),
      client.fetch<PartnerPage>(partnerPageQuery, {}, isr),
    ])
  } catch {}

  const heroEyebrow       = partnerData?.heroEyebrow        ?? 'Partner With Us'
  const heroHeadlineBefore = partnerData?.heroHeadlineBefore ?? 'There is a role'
  const heroAccent        = partnerData?.heroAccent          ?? 'for you'
  const heroHeadlineAfter = partnerData?.heroHeadlineAfter   ?? 'in this.'
  const heroSubheadline   = partnerData?.heroSubheadline     ?? 'Whether you are a brand, a tailor, a donor, or a policy maker — radical collaboration is how we fix a broken system.'
  const heroBgSrc         = partnerData?.heroBackground?.asset?.url ?? '/images/hero_bg.png'
  const typesEyebrow      = partnerData?.typesEyebrow        ?? 'Ways to Partner'
  const partnershipTypes  = partnerData?.partnershipTypes?.length ? partnerData.partnershipTypes : FALLBACK_PARTNERSHIP_TYPES

  return (
    <>
      <Nav />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden min-h-[60svh] md:min-h-[72svh] flex flex-col"
        style={{ backgroundColor: colors.blue, paddingTop: 66 }}
      >
        {/* Background photo */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
          <Image
            src={heroBgSrc}
            alt="Textile remanufacturing"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background: `linear-gradient(105deg, ${colors.blue}f2 35%, ${colors.blue}cc 55%, ${colors.blue}66 100%)`,
          }}
        />

        {/* Grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            zIndex: 2,
            opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2020/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '220px',
          }}
        />

        {/* Orange top accent */}
        <div className="absolute top-0 left-0 w-full h-1 z-10" style={{ backgroundColor: colors.orange }} />

        {/* Content */}
        <div
          className="relative flex flex-col justify-end flex-1 px-8 md:px-20 pt-10 pb-24 md:pb-36"
          style={{ zIndex: 10 }}
        >
          <p
            className="mb-6 text-[15px] font-bold uppercase tracking-[0.28em]"
            style={{ fontFamily: fonts.syne, color: colors.orange }}
          >
            {heroEyebrow}
          </p>
          <h1
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(36px, 5.5vw, 82px)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              maxWidth: '18ch',
            }}
          >
            {heroHeadlineBefore}{' '}
            <em style={{ color: colors.orange, fontStyle: 'italic' }}>{heroAccent}</em>{' '}
            {heroHeadlineAfter}
          </h1>
          <p
            className="mt-6 max-w-xl"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            {heroSubheadline}
          </p>
        </div>

        <SectionDivider fill={colors.white} direction="right" height={56} />
      </section>

      {/* ── Partnership types ── */}
      <section
        className="px-8 md:px-20 py-16 md:py-24"
        style={{ backgroundColor: colors.white }}
      >
        <p
          className="text-[15px] font-bold uppercase tracking-[0.28em] mb-12"
          style={{ fontFamily: fonts.syne, color: colors.orange }}
        >
          {typesEyebrow}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partnershipTypes.map(({ label, iconName, body }) => {
            const Icon = ICON_MAP[iconName] ?? Shirt
            return (
            <div
              key={label}
              className="flex flex-col rounded-2xl p-8"
              style={{ backgroundColor: colors.lightBlue }}
            >
              <div
                className="flex items-center justify-center rounded-xl mb-6 self-start"
                style={{ width: 48, height: 48, backgroundColor: colors.blue }}
              >
                <Icon size={22} color="#ffffff" strokeWidth={1.75} />
              </div>
              <h3
                className="font-bold mb-4"
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 22,
                  color: colors.blue,
                  letterSpacing: '-0.01em',
                }}
              >
                {label}
              </h3>
              <p
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: `${colors.dark}88`,
                }}
              >
                {body}
              </p>
            </div>
          )})}
        </div>
      </section>

      {/* ── Contact form ── */}
      <section
        id="partner"
        className="relative overflow-hidden px-8 md:px-20 py-16 md:py-24"
        style={{ backgroundColor: colors.blue }}
      >
        {/* Subtle grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative max-w-2xl">
          <p
            className="text-[15px] font-bold uppercase tracking-[0.28em] mb-4"
            style={{ fontFamily: fonts.syne, color: colors.orange }}
          >
            Get in Touch
          </p>
          <h2
            className="font-extrabold mb-10"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(28px, 3vw, 42px)',
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            Tell us about your interest.
          </h2>

          <PartnerForm />
        </div>

        <SectionDivider fill={colors.orange} direction="right" height={60} />
      </section>

      <DonationBanner data={homeData} />
      <Footer />
    </>
  )
}
