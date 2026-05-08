import { defineField, defineType, defineArrayMember } from 'sanity'

export const impactPage = defineType({
  name: 'impactPage',
  title: 'Impact Page',
  type: 'document',

  groups: [
    { name: 'hero', title: 'Hero Metrics', default: true },
    { name: 'snapshot', title: '2025 Snapshot' },
    { name: 'timeline', title: 'Timeline' },
    { name: 'partners', title: 'Partners' },
    { name: 'calculator', title: 'Calculator' },
    { name: 'stories', title: 'Community Stories' },
    { name: 'methodology', title: 'Methodology' },
  ],

  fields: [
    // ── Hero Metrics ────────────────────────────────────────────────────────
    defineField({
      name: 'heroMetrics',
      title: 'Hero Garment Counter',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'currentGarments', title: 'Current Garments', type: 'number' }),
        defineField({ name: 'targetGarments', title: 'Target Garments', type: 'number' }),
        defineField({ name: 'lastUpdated', title: 'Last Updated', type: 'date' }),
      ],
    }),

    // ── Snapshot Stats ──────────────────────────────────────────────────────
    defineField({
      name: 'snapshot2025',
      title: 'Snapshot Stats',
      type: 'array',
      group: 'snapshot',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'metric', title: 'Metric Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'unit', title: 'Unit', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon Name', type: 'string' }),
            defineField({ name: 'order', title: 'Order', type: 'number' }),
          ],
          preview: { select: { title: 'metric', subtitle: 'value' } },
        }),
      ],
    }),

    // ── Timeline ────────────────────────────────────────────────────────────
    defineField({
      name: 'timeline',
      title: 'Garment Timeline',
      type: 'array',
      group: 'timeline',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'year', title: 'Year', type: 'number' }),
            defineField({ name: 'quarter', title: 'Quarter (1-4)', type: 'number' }),
            defineField({ name: 'garments', title: 'Garments Count', type: 'number' }),
            defineField({ name: 'isProjection', title: 'Is Projection?', type: 'boolean', initialValue: false }),
            defineField({ name: 'notes', title: 'Notes', type: 'string' }),
          ],
          preview: {
            select: { year: 'year', quarter: 'quarter', garments: 'garments' },
            prepare({ year, quarter, garments }) {
              return { title: `${year} Q${quarter}`, subtitle: garments?.toLocaleString() }
            },
          },
        }),
      ],
    }),

    // ── Partners ────────────────────────────────────────────────────────────
    defineField({
      name: 'featuredPartners',
      title: 'Featured Partners',
      type: 'array',
      group: 'partners',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'partner' }] })],
    }),

    defineField({
      name: 'partnerNetworkDescription',
      title: 'Partner Network Description',
      type: 'text',
      rows: 3,
      group: 'partners',
    }),

    // ── Impact Calculator ───────────────────────────────────────────────────
    defineField({
      name: 'calculator',
      title: 'Impact Calculator Settings',
      type: 'object',
      group: 'calculator',
      fields: [
        defineField({ name: 'carbonPerGarment', title: 'kg CO₂ per Garment', type: 'number' }),
        defineField({ name: 'waterPerGarment', title: 'Litres Water per Garment', type: 'number' }),
        defineField({ name: 'costPerGarment', title: 'USD Cost per Garment', type: 'number' }),
        defineField({
          name: 'sources',
          title: 'Data Sources',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
        }),
      ],
    }),

    // ── Community Stories ───────────────────────────────────────────────────
    defineField({
      name: 'communityStories',
      title: 'Community Stories',
      type: 'array',
      group: 'stories',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'image', title: 'Image', type: 'imageWithAlt', options: { hotspot: true } }),
            defineField({ name: 'community', title: 'Community', type: 'string' }),
            defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
            defineField({ name: 'narrative', title: 'Narrative', type: 'text', rows: 4 }),
            defineField({ name: 'order', title: 'Order', type: 'number' }),
          ],
          preview: { select: { title: 'title', media: 'image' } },
        }),
      ],
    }),

    // ── Methodology ─────────────────────────────────────────────────────────
    defineField({
      name: 'methodology',
      title: 'Methodology',
      type: 'text',
      rows: 5,
      group: 'methodology',
    }),

    defineField({
      name: 'limitations',
      title: 'Limitations',
      type: 'text',
      rows: 4,
      group: 'methodology',
    }),

    defineField({
      name: 'impactReportPdf',
      title: 'Impact Report PDF',
      type: 'file',
      group: 'methodology',
      options: { accept: 'application/pdf' },
    }),

    defineField({
      name: 'externalVerification',
      title: 'External Verification URL',
      type: 'url',
      group: 'methodology',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Impact Page', subtitle: 'Singleton' }
    },
  },
})
