// import { client } from '@/lib/sanity/client'
// import { blueprintPageQuery, partnersQuery } from '@/lib/sanity/queries'
// import type { BlueprintPage } from '@/lib/sanity/types'
// import type { Partner } from '@/components/HomePartners'

// import Nav from '@/components/Nav'
// import BlueprintHero from '@/components/BlueprintHero'
// import BlueprintCrisis from '@/components/BlueprintCrisis'
// import BlueprintEcosystem from '@/components/BlueprintEcosystem'
// import BlueprintRoadmap from '@/components/BlueprintRoadmap'
// import BlueprintAct from '@/components/BlueprintAct'
// import BlueprintDownloads from '@/components/BlueprintDownloads'
// import ResearchArchive from '@/components/ResearchArchive'
// import DonationBanner from '@/components/DonationBanner'
// import Footer from '@/components/Footer'

// export const metadata = {
//   title: 'The Blueprint — Remade In',
//   description:
//     'A Blueprint for Textile Remanufacturing in the Netherlands and Beyond. 2025–2035 vision for community-led systems change.',
// }

// export default async function Blueprint() {
//   let data: BlueprintPage | null = null
//   let partners: Partner[] = []

//   try {
//     const isr = { next: { revalidate: 60 } }
//     ;[data, partners] = await Promise.all([
//       client.fetch<BlueprintPage>(blueprintPageQuery, {}, isr),
//       client.fetch<Partner[]>(partnersQuery, {}, isr),
//     ])
//   } catch {
//     // CMS unavailable — all components use fallback data
//   }

//   return (
//     <>
//       <Nav />
//       <BlueprintHero data={data} />
//       <BlueprintCrisis />
//       <BlueprintEcosystem />
//       <BlueprintRoadmap partners={partners} />
//       <BlueprintAct />
//       <BlueprintDownloads data={data} />
//       <ResearchArchive />
//       <DonationBanner />
//       <Footer />
//     </>
//   )
// }


import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BlueprintComingSoon from '@/components/blueprintcomingsoon'

export const metadata = {
  title: 'The Blueprint — Remade In',
  description:
    'A Blueprint for Textile Remanufacturing in the Netherlands and Beyond. 2025–2035 vision for community-led systems change. Coming soon.',
}

export default function Blueprint() {
  return (
    <>
      <Nav />
      <BlueprintComingSoon />
      <Footer />
    </>
  )
}