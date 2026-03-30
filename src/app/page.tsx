import { client } from '@/lib/sanity/client'
import { homePageQuery, siteSettingsQuery, partnersQuery } from '@/lib/sanity/queries'
import type { HomePage, SiteSettings } from '@/lib/sanity/types'
import type { Partner } from '@/components/HomePartners'
import { colors } from '@/lib/tokens'

import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import MissionVision from '@/components/MissionVision'
import WeAreTheGlue from '@/components/WeAreTheGlue'
import BlueprintTeaser from '@/components/BlueprintTeaser'
import CommunityVoice from '@/components/CommunityVoice'
import ImpactTeaser from '@/components/ImpactTeaser'
import HomePartners from '@/components/HomePartners'
import WhatWeDo from '@/components/WhatWeDo'
import DonationBanner from '@/components/DonationBanner'
import Footer from '@/components/Footer'

export default async function Home() {
  let homeData: HomePage | null = null
  let siteData: SiteSettings | null = null
  let partnersData: Partner[] = []

  try {
    const isr = { next: { revalidate: 60 } }
    ;[homeData, siteData, partnersData] = await Promise.all([
      client.fetch<HomePage>(homePageQuery, {}, isr),
      client.fetch<SiteSettings>(siteSettingsQuery, {}, isr),
      client.fetch<Partner[]>(partnersQuery, {}, isr),
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

      <WhatWeDo data={homeData} />
      <Gallery />
      <WeAreTheGlue data={homeData} />
      <CommunityVoice />
      <ImpactTeaser data={homeData} />
      <HomePartners data={partnersData} />
      <DonationBanner data={homeData} />
      <Footer />
    </>
  )
}
