import { client } from '@/lib/sanity/client'
import { allResearchDocsQuery, researchDocCountQuery } from '@/lib/sanity/queries'
import type { ResearchDoc as CmsDoc } from '@/lib/sanity/types'
import { colors } from '@/lib/tokens'
import ResearchArchiveClient, { type CardDoc } from './ResearchArchiveClient'

// ── Static fallback ────────────────────────────────────────────────────────────

// Book colours — brand palette only: orange, blue, charcoal
const O = { headerColor: colors.orange,   cornerColor: '#B8440D' }
const B = { headerColor: colors.blue,     cornerColor: '#4F5E9E' }
const D = { headerColor: colors.charcoal, cornerColor: '#2E2E26' }

// Derive style from docType (schema has no headerColor/rotation fields)
const TYPE_STYLE: Record<string, { headerColor: string; cornerColor: string }> = {
  'Report':       O,
  'White Paper':  B,
  'Policy Brief': D,
}
const ROTATIONS = [-2, 2, -1, 3, 1, -2, 1, -3, 2]

const FALLBACK_DOCS: CardDoc[] = [
  { id: 'r1',  type: 'Report',       year: 2024, title: 'Community Impact Assessment',   desc: 'Economic outcomes, labour conditions, and community voice from frontline textile workers.',     pages: 20, href: '#', ...O, rotation: -2 },
  { id: 'wp1', type: 'White Paper',  year: 2024, title: 'Textile Remanufacturing',        desc: 'The case for remanufacturing as the primary circularity strategy for post-consumer garments.', pages: 28, href: '#', ...B, rotation:  2 },
  { id: 'pb1', type: 'Policy Brief', year: 2024, title: 'EPR Reform & Trade Policy',      desc: 'Recommendations for Extended Producer Responsibility reform in the Netherlands and EU.',        pages: 12, href: '#', ...D, rotation: -1 },
  { id: 'pb2', type: 'Policy Brief', year: 2024, title: 'Tax Incentives Brief',            desc: 'Proposed incentive structures for brands and governments to prioritise remanufacturing.',      pages: 10, href: '#', ...B, rotation:  3 },
  { id: 'r2',  type: 'Report',       year: 2024, title: 'Kantamanto Market Study',         desc: 'On-the-ground research into the economic ecosystem and waste volumes at Kantamanto Market.',   pages: 24, href: '#', ...O, rotation:  1 },
  { id: 'wp2', type: 'White Paper',  year: 2024, title: 'Digital Infrastructure',          desc: 'Blueprint for the Open Bale Digital Tool and garment traceability systems.',                  pages: 18, href: '#', ...D, rotation: -2 },
  { id: 'pb3', type: 'Policy Brief', year: 2024, title: 'Standards & Certification',       desc: 'Proposed certification framework for remanufactured garments in European markets.',            pages: 14, href: '#', ...B, rotation:  1 },
]

const FALLBACK_TOTAL = 20

// ── Normalise CMS → CardDoc ────────────────────────────────────────────────────


function normalise(doc: CmsDoc, index: number): CardDoc {
  const style = TYPE_STYLE[doc.docType] ?? O
  return {
    id:          doc._id,
    type:        doc.docType,
    year:        doc.year,
    title:       doc.title,
    desc:        doc.description,
    pages:       doc.pages,
    href:        doc.file?.asset?.url ?? doc.externalHref ?? '#',
    headerColor: style.headerColor,
    cornerColor: style.cornerColor,
    rotation:    ROTATIONS[index % ROTATIONS.length],
  }
}

// ── Server component ───────────────────────────────────────────────────────────

export default async function ResearchArchive() {
  let docs: CardDoc[] = FALLBACK_DOCS
  let totalCount = FALLBACK_TOTAL

  try {
    const isr = { next: { revalidate: 60 } }
    const [cmsDocs, cmsCount] = await Promise.all([
      client.fetch<CmsDoc[]>(allResearchDocsQuery, {}, isr),
      client.fetch<number>(researchDocCountQuery, {}, isr),
    ])
    if (cmsDocs?.length) {
      docs = cmsDocs.map((doc, i) => normalise(doc, i))
      totalCount = cmsCount ?? cmsDocs.length
    }
  } catch {
    // CMS unavailable — render fallback silently
  }

  return <ResearchArchiveClient docs={docs} totalCount={totalCount} />
}
