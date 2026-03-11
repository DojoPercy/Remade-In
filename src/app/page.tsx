import { client } from '@/lib/sanity/client'
import { homePageQuery, siteSettingsQuery } from '@/lib/sanity/queries'
import type { HomePage, SiteSettings } from '@/lib/sanity/types'
import { colors } from '@/lib/tokens'

import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import WeAreTheGlue from '@/components/WeAreTheGlue'
import ImpactTeaser from '@/components/ImpactTeaser'
import Gallery from '@/components/Gallery'
import CommunityVoice from '@/components/CommunityVoice'
import ResearchArchive from '@/components/ResearchArchive'
import DonationBanner from '@/components/DonationBanner'

export default async function Home() {
  // Fetch shared homepage + site settings in parallel with ISR caching
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

      {/* Hero and Ticker share a dark background */}
      <div style={{ backgroundColor: colors.charcoal }}>
        <Hero data={homeData} />
        <Ticker items={homeData?.tickerItems} />
      </div>

      <WeAreTheGlue data={homeData} />
      <ImpactTeaser data={homeData} />
      <Gallery />
      <CommunityVoice />
      <ResearchArchive />
      <DonationBanner data={homeData} />
    </>
  )
}
