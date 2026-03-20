import { client }          from '@/lib/sanity/client'
import { storiesHubQuery } from '@/lib/sanity/queries'
import type { StoriesHubData } from '@/lib/sanity/types'
import Nav        from '@/components/Nav'
import Footer     from '@/components/Footer'
import StoriesHub from '@/components/stories/StoriesHub'

export const metadata = {
  title:       'Stories — Remade In',
  description: 'Field notes, videos, events, and news from the remanufacturing movement.',
}

const PAGE = 12

export default async function StoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>
}) {
  const { type = '', q = '' } = await searchParams

  let data: StoriesHubData = { items: [], total: 0 }

  try {
    data = await client.fetch<StoriesHubData>(
      storiesHubQuery,
      { type, q, offset: 0, end: PAGE },
      { next: { revalidate: 60 } },
    )
  } catch {
    // CMS unavailable — hub renders with empty state fallback
  }

  return (
    <>
      <Nav />
      <StoriesHub initialData={data} type={type} q={q} />
      <Footer />
    </>
  )
}
