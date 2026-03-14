import { client } from '@/lib/sanity/client'
import { allResearchDocsQuery, researchDocCountQuery } from '@/lib/sanity/queries'
import type { ResearchDoc as CmsDoc } from '@/lib/sanity/types'
import { colors } from '@/lib/tokens'
import ResearchArchiveClient, { type CardDoc } from './ResearchArchiveClient'

// ── Static fallback ────────────────────────────────────────────────────────────

const FALLBACK_DOCS: CardDoc[] = [
  { id: 'r1',  type: 'Report',       year: 2024, title: 'Community Impact Assessment', desc: 'Impact on frontline textile communities in Kantamanto Market. Economic outcomes, labour conditions, community voice.', pages: 20, href: '#', headerColor: colors.orange, cornerColor: '#C72A08', rotation: -2 },
  { id: 'wp1', type: 'White Paper',  year: 2024, title: 'Textile Remanufacturing',      desc: 'Impact on frontline textile communities in Kantamanto Market. Economic outcomes, labour conditions, community voice.', pages: 20, href: '#', headerColor: '#008D68',     cornerColor: '#039C7B', rotation:  2 },
  { id: 'pb1', type: 'Policy Brief', year: 2024, title: 'Community Impact Assessment', desc: 'Impact on frontline textile communities in Kantamanto Market. Economic outcomes, labour conditions, community voice.', pages: 20, href: '#', headerColor: '#0A3BFF',     cornerColor: '#2A4FFF', rotation: -1 },
  { id: 'pb2', type: 'Policy Brief', year: 2024, title: 'Community Impact Assessment', desc: 'Impact on frontline textile communities in Kantamanto Market. Economic outcomes, labour conditions, community voice.', pages: 20, href: '#', headerColor: '#0A3BFF',     cornerColor: '#2A4FFF', rotation:  3 },
  { id: 'r2',  type: 'Report',       year: 2024, title: 'Community Impact Assessment', desc: 'Impact on frontline textile communities in Kantamanto Market. Economic outcomes, labour conditions, community voice.', pages: 20, href: '#', headerColor: '#EB3A69',     cornerColor: '#DB3863', rotation:  1 },
  { id: 'wp2', type: 'White Paper',  year: 2024, title: 'Textile Remanufacturing',      desc: 'Impact on frontline textile communities in Kantamanto Market. Economic outcomes, labour conditions, community voice.', pages: 20, href: '#', headerColor: '#008D68',     cornerColor: '#039C7B', rotation: -2 },
  { id: 'pb3', type: 'Policy Brief', year: 2024, title: 'Community Impact Assessment', desc: 'Impact on frontline textile communities in Kantamanto Market. Economic outcomes, labour conditions, community voice.', pages: 20, href: '#', headerColor: '#0A3BFF',     cornerColor: '#2A4FFF', rotation:  1 },
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
