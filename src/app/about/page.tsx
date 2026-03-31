import Nav from '@/components/Nav'
import MissionVision from '@/components/MissionVision'
import TeamSection from '@/components/TeamSection'
import DonationBanner from '@/components/DonationBanner'
import Footer from '@/components/Footer'
import { colors, fonts } from '@/lib/tokens'
import { client } from '@/lib/sanity/client'
import { teamMembersQuery } from '@/lib/sanity/queries'
import type { TeamMember } from '@/lib/sanity/types'

export const metadata = {
  title: 'About Us — Remade In',
  description:
    'Remade In builds the infrastructure to make textile remanufacturing accessible, scalable, and socially just — starting in Ghana and the Netherlands.',
}

export default async function AboutPage() {
  const teamMembers = await client.fetch<TeamMember[]>(teamMembersQuery)
  return (
    <>
      <Nav />

      {/* ── Hero ── */}
      <section
        className="px-8 md:px-20 pt-32 pb-16 md:pt-40 md:pb-24"
        style={{ backgroundColor: '#d0e2ff' }}
      >
        <p
          className="text-[13px] font-bold uppercase tracking-[0.28em] mb-6"
          style={{ fontFamily: fonts.syne, color: '#6776b6' }}
        >
          About Us
        </p>
        <h1
          className="font-extrabold leading-[1.0] max-w-3xl"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(42px, 7vw, 88px)',
            letterSpacing: '-0.03em',
            color: colors.dark,
          }}
        >
          We are the{' '}
          <em style={{ color: '#6776b6', fontStyle: 'italic' }}>connective tissue</em>{' '}
          of a new textile economy.
        </h1>
        <p
          className="mt-8 max-w-2xl"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            lineHeight: 1.75,
            color: `${colors.dark}88`,
          }}
        >
          Remade In is a Dutch foundation working at the intersection of fashion, justice, and systems change. We build the digital and physical infrastructure to make textile remanufacturing accessible, scalable, cost-effective, and socially just — starting with communities in Ghana and the Netherlands who already know how.
        </p>
      </section>

      {/* ── Story strip ── */}
      <section
        className="px-8 md:px-20 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
        style={{ backgroundColor: colors.white }}
      >
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.28em] mb-6"
            style={{ fontFamily: fonts.syne, color: colors.orange }}
          >
            Our Story
          </p>
          <h2
            className="font-extrabold leading-snug mb-6"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(28px, 3vw, 40px)',
              letterSpacing: '-0.02em',
              color: colors.dark,
            }}
          >
            Born out of frustration with a broken system.
          </h2>
          <p style={{ fontFamily: fonts.bricolage, fontSize: 16, lineHeight: 1.8, color: `${colors.dark}88` }}>
            The fashion industry generates 92 million tonnes of textile waste annually — and the communities bearing the greatest burden are those that had the least to do with creating it. Kantamanto Market in Accra, Ghana receives over 15 million garments every week. Sorters, seamstresses, and tailors there have built an entire remanufacturing economy out of necessity.
          </p>
          <p className="mt-4" style={{ fontFamily: fonts.bricolage, fontSize: 16, lineHeight: 1.8, color: `${colors.dark}88` }}>
            Remade In was founded to connect that expertise with the Dutch fashion system — and to prove that remanufacturing can be a first choice, not a last resort.
          </p>
        </div>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ aspectRatio: '4/3', backgroundColor: '#d0e2ff' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Upcyclers/KSCxBenBreuer-32.jpg"
            alt="Kantamanto Market remanufacturing"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <MissionVision />

      {/* ── Team ── */}
      <TeamSection members={teamMembers} />

      {/* ── Values strip ── */}
      <section
        className="px-8 md:px-20 py-16 md:py-24"
        style={{ backgroundColor: '#d0e2ff' }}
      >
        <p
          className="text-[13px] font-bold uppercase tracking-[0.28em] mb-10"
          style={{ fontFamily: fonts.syne, color: '#6776b6' }}
        >
          What We Stand For
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { title: 'Justice First', body: 'We centre the voices and labour of communities in the Global South who are most affected by textile waste — not as beneficiaries, but as experts and co-designers.' },
            { title: 'Remanufacture Over Recycle', body: 'Recycling still uses significant resources. Remanufacturing — repairing, redesigning, and restoring garments — is a higher-value, lower-impact intervention.' },
            { title: 'Radical Collaboration', body: 'No single actor can fix a global system alone. We build the infrastructure for brands, tailors, donors, policymakers, and communities to work together.' },
          ].map((v) => (
            <div key={v.title} className="flex flex-col">
              <div className="w-8 h-1 rounded-full mb-5" style={{ backgroundColor: '#6776b6' }} />
              <h3
                className="font-bold mb-3"
                style={{ fontFamily: fonts.bricolage, fontSize: 20, color: '#6776b6', letterSpacing: '-0.01em' }}
              >
                {v.title}
              </h3>
              <p style={{ fontFamily: fonts.bricolage, fontSize: 15, lineHeight: 1.75, color: `${colors.dark}88` }}>
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <DonationBanner />
      <Footer />
    </>
  )
}
