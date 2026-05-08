import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  icon: PlayIcon,

  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Metadata' },
    { name: 'visibility', title: 'Visibility' },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().error('Title is required'),
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
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      group: 'content',
      description: 'YouTube or Vimeo URL. Example: https://www.youtube.com/watch?v=...',
      validation: (Rule) =>
        Rule.required().uri({ scheme: ['http', 'https'] }).error('Enter a valid video URL'),
    }),

    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'imageWithAlt',
      group: 'content',
      options: { hotspot: true },
      description: 'Custom thumbnail shown on the card. If blank, YouTube thumbnail is used.',
    }),

    defineField({
      name: 'caption',
      title: 'Caption / Description',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Shown below the video player on the detail page.',
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      group: 'meta',
      placeholder: 'e.g., 5:32',
      description: 'Optional runtime label shown on the card.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'meta',
      options: { layout: 'tags' },
    }),

    defineField({
      name: 'featured',
      title: 'Feature This Video',
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
      media: 'thumbnail',
      featured: 'featured',
    },
    prepare({ title, media, featured }) {
      return {
        title: featured ? `[Featured] ${title}` : title,
        subtitle: 'Video',
        media,
      }
    },
  },
})
