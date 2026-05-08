import { defineField, defineType, defineArrayMember } from 'sanity'

export const blueprintPage = defineType({
  name: 'blueprintPage',
  title: 'Blueprint Page',
  type: 'document',

  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'downloads', title: 'Downloads' },
  ],

  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      group: 'hero',
    }),

    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),

    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary CTA Label',
      type: 'string',
      group: 'hero',
      placeholder: 'e.g., Download Now',
    }),

    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
      group: 'hero',
      placeholder: 'e.g., Learn More',
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'imageWithAlt',
      group: 'hero',
      options: { hotspot: true },
    }),

    defineField({
      name: 'downloads',
      title: 'Downloadable Files',
      type: 'array',
      group: 'downloads',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({ name: 'file', title: 'File (PDF)', type: 'file', options: { accept: 'application/pdf,.pdf,.zip,.pptx,.xlsx' } }),
            defineField({ name: 'externalHref', title: 'External Link (fallback)', type: 'url', validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }) }),
            defineField({
              name: 'fileType',
              title: 'File Type',
              type: 'string',
              options: {
                list: [
                  { title: 'PDF', value: 'PDF' },
                  { title: 'ZIP', value: 'ZIP' },
                  { title: 'PPTX', value: 'PPTX' },
                  { title: 'XLSX', value: 'XLSX' },
                ],
              },
              initialValue: 'PDF',
            }),
            defineField({ name: 'pages', title: 'Number of Pages', type: 'number' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'fileType' },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: { title: 'heroHeadline' },
    prepare({ title }) {
      return { title: title ?? 'Blueprint Page', subtitle: 'Singleton' }
    },
  },
})
