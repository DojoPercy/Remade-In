import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01', // pin a date — never use "latest" in production
  useCdn: process.env.NODE_ENV === 'production',
  /**
   * Set `perspective` to `'published'` for public-facing queries.
   * Switch to `'previewDrafts'` in preview/draft mode.
   */
  perspective: 'published',
})

/**
 * A write-capable client used only in server actions / API routes.
 * Requires SANITY_API_TOKEN with Editor permissions.
 */
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
