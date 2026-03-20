import { client } from '@/lib/sanity/client'
import { impactPageQuery } from '@/lib/sanity/queries'
import { colors } from '@/lib/tokens'
import Nav from '@/components/Nav'
import ImpactHero from '@/components/impact/ImpactHero'
import ImpactSnapshot from '@/components/impact/ImpactSnapshot'
import PartnerNetwork from '@/components/impact/PartnerNetwork'
import ImpactTimeline from '@/components/impact/ImpactTimeline'
import ImpactCalculator from '@/components/impact/ImpactCalculator'
import Methodology from '@/components/impact/Methodology'
import ImpactStories from '@/components/impact/ImpactStories'

export default async function ImpactPage() {
  let impactData = null

  try {
    impactData = await client.fetch(impactPageQuery, {}, { next: { revalidate: 60 } })
  } catch (error) {
    console.error('Failed to fetch impact page data:', error)
  }

  return (
    <>
      <Nav />

      <main style={{ backgroundColor: colors.charcoal }}>
        {impactData ? (
          <>
            <ImpactHero data={impactData.heroMetrics} />
            <ImpactSnapshot data={impactData.snapshot2025} />
            <PartnerNetwork data={impactData.featuredPartners} description={impactData.partnerNetworkDescription} />
            <ImpactTimeline data={impactData.timeline} />
            <ImpactCalculator data={impactData.calculator} />
            <ImpactStories data={impactData.communityStories} />
            <Methodology
              methodology={impactData.methodology}
              limitations={impactData.limitations}
              reportPdf={impactData.impactReportPdf}
              externalVerification={impactData.externalVerification}
            />
          </>
        ) : (
          /* Fallback — renders default UI using each component's hardcoded placeholders */
          <>
            <ImpactHero />
            <ImpactSnapshot />
            <ImpactTimeline />
            <ImpactCalculator />
            <ImpactStories />
            <Methodology />
          </>
        )}
      </main>
    </>
  )
}
