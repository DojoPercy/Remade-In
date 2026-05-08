import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const newsItem = defineType({
  name: 'newsItem',
  title: 'News Item',
  type: 'document',
  icon: DocumentIcon,

  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'visibility', title: 'Visibility' },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().error('Headline is required'),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'source',
      title: 'Source / Publication',
      type: 'string',
      group: 'content',
      placeholder: 'e.g., The Guardian, BBC Africa',
      description: 'Name of the outlet that published this piece.',
      validation: (Rule) => Rule.required().error('Source is required'),
    }),

    defineField({
      name: 'excerpt',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Brief summary shown on the Stories hub card. Keep under 300 characters.',
      validation: (Rule) => Rule.max(300),
    }),

    defineField({
      name: 'externalUrl',
      title: 'External Article URL',
      type: 'url',
      group: 'content',
      description: 'Link to the original article. Clicking the card opens this URL.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'featured',
      title: 'Feature This Item',
      type: 'boolean',
      group: 'visibility',
      initialValue: false,
      description: 'Pin to the top of the Stories hub.',
    }),
  ],

  orderings: [
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      source: 'source',
      featured: 'featured',
    },
    prepare({ title, source, featured }) {
      return {
        title: featured ? `[Featured] ${title}` : title,
        subtitle: source ?? 'News',
      }
    },
  },
})
