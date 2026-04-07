import type { Metadata } from 'next'
import LegalPageScreen from '@/components/legal/LegalPageScreen'
import { client } from '@/lib/sanity/client'
import { pageByIdQuery } from '@/lib/sanity/queries'
import type { GenericPage } from '@/lib/sanity/types'
import { LEGAL_FALLBACKS } from '@/lib/legal-pages'

const fallback = LEGAL_FALLBACKS.terms

export const metadata: Metadata = {
  title: 'Terms of Use - Remade In',
  description: fallback.description,
}

export default async function TermsPage() {
  let page: GenericPage | null = null

  try {
    page = await client.fetch<GenericPage | null>(
      pageByIdQuery,
      { documentId: fallback.documentId },
      { next: { revalidate: 60 } },
    )
  } catch {}

  return <LegalPageScreen page={page} fallback={fallback} />
}
