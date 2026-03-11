import { defineField, defineType } from 'sanity'

/**
 * Call-to-action object.
 * Supports both internal document references and external URLs.
 */
export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'External URL', value: 'external' },
          { title: 'Internal Page', value: 'internal' },
          { title: 'Email', value: 'email' },
        ],
        layout: 'radio',
      },
      initialValue: 'external',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).custom((val, ctx) => {
          const parent = ctx.parent as { linkType?: string }
          if (parent?.linkType === 'external' && !val) return 'URL is required for external links.'
          return true
        }),
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Page',
      type: 'reference',
      to: [{ type: 'researchDoc' }],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      hidden: ({ parent }) => parent?.linkType !== 'email',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType === 'internal',
    }),
    defineField({
      name: 'variant',
      title: 'Button Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Filled)', value: 'primary' },
          { title: 'Secondary (Outlined)', value: 'secondary' },
          { title: 'Ghost', value: 'ghost' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'linkType' },
  },
})
