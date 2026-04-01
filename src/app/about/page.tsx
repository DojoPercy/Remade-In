import { client } from '@/lib/sanity/client'
import { teamMembersQuery, homePageQuery } from '@/lib/sanity/queries'
import type { TeamMember, HomePage } from '@/lib/sanity/types'

import Nav from '@/components/Nav'
import AboutHero from '@/components/AboutHero'
import AboutStory from '@/components/AboutStory'
import MissionVision from '@/components/MissionVision'
import TeamSection from '@/components/TeamSection'
import AboutValues from '@/components/AboutValues'
import DonationBanner from '@/components/DonationBanner'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'About Us — Remade In',
  description:
    'Remade In builds the infrastructure to make textile remanufacturing accessible, scalable, and socially just — starting with communities in Ghana and the Netherlands.',
}

export default async function AboutPage() {
  let homeData: HomePage | null = null
  let teamMembers: TeamMember[] = []

  try {
    const isr = { next: { revalidate: 60 } }
    ;[homeData, teamMembers] = await Promise.all([
      client.fetch<HomePage>(homePageQuery, {}, isr),
      client.fetch<TeamMember[]>(teamMembersQuery, {}, isr),
    ])
  } catch {
    // CMS unavailable — sections fall back to static content
  }

  return (
    <>
      <Nav />
      <AboutHero />
      <AboutStory />
      <MissionVision data={homeData} />
      <TeamSection members={teamMembers} />
      <AboutValues />
      <DonationBanner data={homeData} />
      <Footer />
    </>
  )
}
