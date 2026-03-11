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
      name: 'href',
      title: 'Document URL',
      type: 'url',
      description: 'Direct link to the PDF or external page.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'headerColor',
      title: 'Card Header Colour',
      type: 'string',
      description: 'Hex colour for the card top half. Defaults are set per type if left blank.',
      options: {
        list: [
          { title: 'Red (Report)', value: '#FF3800' },
          { title: 'Pink (Report variant)', value: '#EB3A69' },
          { title: 'Green (White Paper)', value: '#008D68' },
          { title: 'Blue (Policy Brief)', value: '#0A3BFF' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'rotation',
      title: 'Card Tilt (degrees)',
      type: 'number',
      description: 'Slight rotation applied to the card for visual texture. Keep between -3 and 3.',
      initialValue: 0,
      validation: (Rule) => Rule.min(-3).max(3),
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
