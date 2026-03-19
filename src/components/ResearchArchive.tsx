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

/**
 * Lightens a hex color by mixing it with white at the given ratio (0–1).
 * Used to derive a distinct cornerColor from the headerColor.
 */
function lighten(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.round(((n >> 16) & 0xff) + (255 - ((n >> 16) & 0xff)) * amount)
  const g = Math.round(((n >> 8) & 0xff) + (255 - ((n >> 8) & 0xff)) * amount)
  const b = Math.round((n & 0xff) + (255 - (n & 0xff)) * amount)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

function normalise(doc: CmsDoc): CardDoc {
  const header = doc.headerColor ?? colors.orange
  return {
    id:          doc._id,
    type:        doc.docType,
    year:        doc.year,
    title:       doc.title,
    desc:        doc.description,
    pages:       doc.pages,
    href:        doc.file?.asset?.url ?? doc.externalHref ?? '#',
    headerColor: header,
    cornerColor: lighten(header, 0.25),
    rotation:    doc.rotation ?? 0,
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
      docs = cmsDocs.map(normalise)
      totalCount = cmsCount ?? cmsDocs.length
    }
  } catch {
    // CMS unavailable — render fallback silently
  }

  return <ResearchArchiveClient docs={docs} totalCount={totalCount} />
}
