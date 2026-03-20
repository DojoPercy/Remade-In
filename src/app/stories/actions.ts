'use server'

import { client }          from '@/lib/sanity/client'
import { storiesHubQuery } from '@/lib/sanity/queries'
import type { StoriesHubData } from '@/lib/sanity/types'

const PAGE = 12

export async function loadMoreStories(
  type:   string,
  q:      string,
  offset: number,
): Promise<StoriesHubData> {
  return client.fetch<StoriesHubData>(
    storiesHubQuery,
    { type: type ?? '', q: q ?? '', offset, end: offset + PAGE },
    { cache: 'no-store' },
  )
}
