import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { blueprintPageQuery } from '@/lib/sanity/queries'
import type { BlueprintPage } from '@/lib/sanity/types'
import { colors, fonts } from '@/lib/tokens'

import Nav from '@/components/Nav'
import BlueprintHero from '@/components/BlueprintHero'
import BlueprintTabs from '@/components/BlueprintTabs'
import BlueprintDownloads from '@/components/BlueprintDownloads'
import DonationBanner from '@/components/DonationBanner'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'The Blueprint — Remade In',
  description: 'A Blueprint for Textile Remanufacturing in the Netherlands and Beyond. 2025–2035 vision for community-led systems change.',
}

// ── Key takeaways (static — executive summary on-page) ─────────────────────────

const TAKEAWAYS = [
  {
    num: '01',
    heading: 'Remanufacturing must come before recycling',
    body: 'Fibre-to-fibre recycling technology is 10–15 years from scale. Remanufacturing extends garment life now, using 15–20% of the energy required to produce new clothing.',
  },
  {
    num: '02',
    heading: 'Kantamanto proves it works — at scale',
    body: '30,000 people are employed in Kantamanto\'s remanufacturing ecosystem. A 60% recirculation rate demonstrates what is achievable when communities lead the process.',
  },
  {
    num: '03',
    heading: 'The Netherlands has everything it needs',
    body: 'Existing sorting infrastructure, a progressive EPR policy window, geographic position as Europe\'s logistics hub, and a growing ecosystem of willing partners.',
  },
  {
    num: '04',
    heading: '1,000,000 garments by 2035 is achievable',
    body: 'Our 10-year roadmap phases three pilot hubs (2027) into regional scale (2030) into the 1M garment milestone — with clear investment requirements at each stage.',
  },
]

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function Blueprint() {
  let data: BlueprintPage | null = null

  try {
    data = await client.fetch<BlueprintPage>(
      blueprintPageQuery,
      {},
      { next: { revalidate: 60 } },
    )
  } catch {
    // CMS unavailable — fallbacks render automatically
  }

  return (
    <>
      <Nav />

      <BlueprintHero data={data} />

      {/* ── Executive Summary ── */}
      <section
        className="px-8 md:px-20 py-24"
        style={{ backgroundColor: colors.white }}
      >
        <div>
          <p
            className="mb-10 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: fonts.syne, color: colors.orange }}
          >
            Executive Summary — 4 Key Takeaways
          </p>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {TAKEAWAYS.map((t) => (
              <div key={t.num} className="flex gap-6">
                <span
                  className="shrink-0"
                  style={{ fontFamily: fonts.syne, fontSize: 12, fontWeight: 700, color: colors.orange, letterSpacing: '0.1em', lineHeight: 2 }}
                >
                  {t.num}
                </span>
                <div>
                  <h3
                    className="mb-2"
                    style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(17px, 1.6vw, 21px)', fontWeight: 800, lineHeight: 1.25, color: colors.charcoal }}
                  >
                    {t.heading}
                  </h3>
                  <p
                    style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: 1.74, color: 'rgba(26,26,20,0.58)' }}
                  >
                    {t.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pull quote */}
          <div
            className="mt-14 p-8 rounded-[8px]"
            style={{ backgroundColor: `${colors.orange}10`, border: `1px solid ${colors.orange}25` }}
          >
            <p
              style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(15px, 1.3vw, 18px)', fontStyle: 'italic', lineHeight: 1.7, color: colors.charcoal }}
            >
              &ldquo;We believe in a circular fashion future that centres the knowledge, labour, and leadership of the communities who already live it — and in building systems that make remanufacturing the first choice, not the last resort.&rdquo;
            </p>
            <p
              className="mt-4"
              style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(26,26,20,0.35)' }}
            >
              — Remade In, Blueprint White Paper, 2025
            </p>
          </div>
        </div>
      </section>

      {/* ── Full-bleed photo strip ── */}
      <div className="relative overflow-hidden" style={{ height: 340 }}>
        <Image
          src="/Events/_V8A0330.jpg"
          alt="Amsterdam Fashion Week 2025 — Kantamanto Social Club"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(26,26,20,0.78) 0%, rgba(26,26,20,0.25) 55%, rgba(26,26,20,0.45) 100%)' }}
        />
        <div className="absolute inset-0 flex items-center px-8 md:px-20">
          <div>
            <p style={{ fontFamily: fonts.syne, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(249,232,208,0.45)', marginBottom: 12 }}>
              Amsterdam Fashion Week 2025
            </p>
            <p
              style={{ fontFamily: fonts.bricolage, fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: 900, color: colors.cream, lineHeight: 1.2, maxWidth: 560, letterSpacing: '-0.02em' }}
            >
              Presented to policymakers, brands, and community leaders
            </p>
          </div>
        </div>
      </div>

      <BlueprintTabs />

      <BlueprintDownloads data={data} />

      <DonationBanner />
      <Footer />
    </>
  )
}
