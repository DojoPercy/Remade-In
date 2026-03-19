import { client } from '@/lib/sanity/client'
import { homePageQuery, siteSettingsQuery } from '@/lib/sanity/queries'
import type { HomePage, SiteSettings } from '@/lib/sanity/types'
import { colors } from '@/lib/tokens'

import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import MissionVision from '@/components/MissionVision'
import WeAreTheGlue from '@/components/WeAreTheGlue'
import BlueprintTeaser from '@/components/BlueprintTeaser'
import CommunityVoice from '@/components/CommunityVoice'
import ImpactTeaser from '@/components/ImpactTeaser'
import ResearchArchive from '@/components/ResearchArchive'
import DonationBanner from '@/components/DonationBanner'
import Footer from '@/components/Footer'

export default async function Home() {
  let homeData: HomePage | null = null
  let siteData: SiteSettings | null = null

  try {
    const isr = { next: { revalidate: 60 } }
    ;[homeData, siteData] = await Promise.all([
      client.fetch<HomePage>(homePageQuery, {}, isr),
      client.fetch<SiteSettings>(siteSettingsQuery, {}, isr),
    ])
  } catch {
    // CMS unavailable — all sections fall back to static data
  }

  return (
    <>
      <Nav links={siteData?.mainNav} />

      <div style={{ backgroundColor: colors.charcoal }}>
        <Hero data={homeData} />
      </div>

      <Gallery />
      <MissionVision />
      <WeAreTheGlue data={homeData} />
      <BlueprintTeaser />
      <CommunityVoice />
      <ImpactTeaser data={homeData} />
      <ResearchArchive />
      <DonationBanner data={homeData} />
      <Footer />
    </>
  )
}
