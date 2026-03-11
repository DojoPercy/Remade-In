import { defineField, defineType } from 'sanity'
import { ComponentIcon } from '@sanity/icons'

/**
 * Service offered by Remade In.
 * Ordered manually via the `order` field.
 */
export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
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
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 99,
    }),
    defineField({
      name: 'icon',
      title: 'Icon / Emoji',
      type: 'string',
      description: 'A single emoji or short label used as the visual icon.',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Shown on service cards. Max 160 chars.',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'features',
      title: "What's Included",
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet-point list of deliverables / features.',
    }),
    defineField({
      name: 'body',
      title: 'Full Description',
      type: 'portableText',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'cta',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'shortDescription' },
  },
})
