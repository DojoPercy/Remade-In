import { defineField, defineType } from 'sanity'

/**
 * Reusable SEO object.
 * Embed in any document that needs per-page meta control.
 */
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Overrides the page title in search results. Max 60 chars.',
      validation: (Rule) => Rule.max(60).warning('Keep meta title under 60 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Short summary shown in search results. Max 160 chars.',
      validation: (Rule) => Rule.max(160).warning('Keep meta description under 160 characters.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG / Social Share Image',
      type: 'image',
      description: 'Recommended: 1200×630px. Falls back to site default.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      initialValue: false,
      description: 'Sets noindex, nofollow when enabled.',
    }),
  ],
})
