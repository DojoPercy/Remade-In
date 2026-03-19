import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

/**
 * RESEARCH DOCUMENT
 * 
 * Add reports, white papers, and policy briefs to your archive.
 * These appear on the Research page for download.
 */
export const researchDoc = defineType({
  name: 'researchDoc',
  title: 'Research Document',
  type: 'document',
  icon: DocumentTextIcon,

  groups: [
    { name: 'basic', title: 'Document Info', default: true },
    { name: 'file', title: 'File Upload' },
    { name: 'sharing', title: 'Visibility' },
  ],

  fields: [
    // ══════════════════════════════════════════════════════════════════════════
    // BASIC INFO
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      group: 'basic',
      placeholder: 'e.g., "Circular Fashion in Ghana: 2025 Report"',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug (auto-generated)',
      type: 'slug',
      group: 'basic',
      options: { source: 'title', maxLength: 96 },
      description: 'Auto-created from the title. Used in URLs.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'docType',
      title: 'What Type of Document?',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: '📊 Report', value: 'Report' },
          { title: '📄 White Paper', value: 'White Paper' },
          { title: '📋 Policy Brief', value: 'Policy Brief' },
        ],
        layout: 'radio',
      },
      description: 'Helps visitors quickly understand what they\'re downloading.',
      validation: (Rule) => Rule.required().error('Select a document type'),
    }),

    defineField({
      name: 'year',
      title: 'Year Published',
      type: 'number',
      group: 'basic',
      placeholder: '2025',
      description: 'Example: 2025',
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(2000)
          .max(2040)
          .error('Enter a year between 2000 and 2040'),
    }),

    defineField({
      name: 'pages',
      title: 'Number of Pages',
      type: 'number',
      group: 'basic',
      placeholder: '42',
      description: 'How many pages is this document? Shown on the card.',
      validation: (Rule) =>
        Rule.required()
          .integer()
          .positive()
          .error('Must be a positive number'),
    }),

    defineField({
      name: 'description',
      title: 'Summary (2–3 sentences)',
      type: 'text',
      rows: 3,
      group: 'basic',
      placeholder: 'What\'s this document about? Who should read it? What will they learn?',
      description: 'Short preview shown on the archive card. Keep under 280 characters.',
      validation: (Rule) =>
        Rule.required()
          .max(280)
          .error('Keep summary under 280 characters'),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'date',
      group: 'basic',
      options: { dateFormat: 'YYYY-MM-DD' },
      description: 'When was this first published?',
      validation: (Rule) => Rule.required().error('Publication date is required'),
    }),

    // ══════════════════════════════════════════════════════════════════════════
    // FILE UPLOAD
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'file',
      title: 'Attach PDF File',
      type: 'file',
      group: 'file',
      description: 'Upload the PDF here. This is the BEST option — fast & reliable.',
      options: { accept: 'application/pdf,.pdf' },
    }),

    defineField({
      name: 'externalHref',
      title: 'OR External Link (fallback)',
      type: 'url',
      group: 'file',
      placeholder: 'https://drive.google.com/file/d/...',
      description:
        'Use ONLY if hosting on Google Drive, Dropbox, etc. If both are filled, the PDF file takes priority.',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }),
    }),

    // ══════════════════════════════════════════════════════════════════════════
    // VISIBILITY SETTINGS
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'featured',
      title: 'Feature This Document',
      type: 'boolean',
      group: 'sharing',
      initialValue: false,
      description: 'Check to show this at the TOP of the Research Archive. Use for your most important documents.',
    }),
  ],

  orderings: [
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Featured First',
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
        title: `${featured ? '[Featured] ' : ''}${title}`,
        subtitle: `${docType ?? '—'} · ${year ?? '—'}`,
      }
    },
  },
})
