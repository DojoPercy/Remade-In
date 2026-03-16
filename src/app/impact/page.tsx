import { colors } from '@/lib/tokens'
import Nav from '@/components/Nav'
import ImpactHero from '@/components/impact/ImpactHero'
import ImpactSnapshot from '@/components/impact/ImpactSnapshot'
import ImpactMap from '@/components/impact/ImpactMap'
import PartnerNetwork from '@/components/impact/PartnerNetwork'
import ImpactTimeline from '@/components/impact/ImpactTimeline'
import ImpactCalculator from '@/components/impact/ImpactCalculator'
import Methodology from '@/components/impact/Methodology'
import ImpactStories from '@/components/impact/ImpactStories'

export default function ImpactPage() {
  return (
    <>
      <Nav />

      <main style={{ backgroundColor: colors.charcoal }}>
        <ImpactHero />

        <ImpactSnapshot />

        <ImpactMap />

        <PartnerNetwork />

        <ImpactTimeline />

        <ImpactCalculator />

        <Methodology />

        <ImpactStories />
      </main>
    </>
  )
}
