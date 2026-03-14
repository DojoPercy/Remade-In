import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

/**
 * A single entry in the Research Archive.
 * Covers reports, white papers, and policy briefs.
 */
export const researchDoc = defineType({
  name: 'researchDoc',
  title: 'Research Document',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'docType',
      title: 'Document Type',
      type: 'string',
      options: {
        list: [
          { title: 'Report', value: 'Report' },
          { title: 'White Paper', value: 'White Paper' },
          { title: 'Policy Brief', value: 'Policy Brief' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(2020).max(2040),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Shown on the archive card. Keep to 2–3 sentences.',
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'pages',
      title: 'Page Count',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'file',
      title: 'Upload Document',
      type: 'file',
      description: 'Upload the PDF directly to Sanity CDN. Preferred over an external URL.',
      options: { accept: 'application/pdf,.pdf' },
    }),
    defineField({
      name: 'externalHref',
      title: 'External URL (fallback)',
      type: 'url',
      description: 'Use only if the file is hosted on Google Drive, Dropbox, etc.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Featured documents appear first in the archive.',
      initialValue: false,
    }),
  ],

  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Featured first',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      docType: 'docType',
      year: 'year',
      featured: 'featured',
    },
    prepare({ title, docType, year, featured }) {
      return {
        title: `${featured ? '★ ' : ''}${title}`,
        subtitle: `${docType ?? '—'} · ${year ?? '—'}`,
      }
    },
  },
})
