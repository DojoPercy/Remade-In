import { defineField, defineType } from 'sanity'
import { EditIcon } from '@sanity/icons'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: EditIcon,

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
      description: 'Auto-generated from the title. Used in the article URL.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Culture', value: 'Culture' },
          { title: 'Impact', value: 'Impact' },
          { title: 'Community', value: 'Community' },
          { title: 'Research', value: 'Research' },
          { title: 'News', value: 'News' },
          { title: 'Story', value: 'Story' },
          { title: 'Policy', value: 'Policy' },
        ],
      },
      description: 'Shown as a label on the article card and detail page.',
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'imageWithAlt',
      group: 'content',
      options: { hotspot: true },
      description: 'Hero image shown at the top of the article.',
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Short summary shown on the stories hub card. Keep under 300 characters.',
      validation: (Rule) => Rule.max(300),
    }),

    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'portableText',
      group: 'content',
      description: 'Full article content. Use the toolbar to add headings, bold, links, images, and quotes.',
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'meta',
      placeholder: 'e.g., Remade In Team',
      description: 'Byline shown on the article detail page.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
      description: 'Publication date and time.',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'meta',
      options: { layout: 'tags' },
      description: 'Optional tags for filtering and search.',
    }),

    defineField({
      name: 'featured',
      title: 'Feature This Article',
      type: 'boolean',
      group: 'visibility',
      initialValue: false,
      description: 'Check to pin this article to the top of the Stories hub.',
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
      subtitle: 'category',
      media: 'coverImage',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: featured ? `[Featured] ${title}` : title,
        subtitle: subtitle ?? 'Article',
        media,
      }
    },
  },
})
