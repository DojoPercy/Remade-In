import { defineField, defineType } from 'sanity'
import { EditIcon } from '@sanity/icons'

/**
 * Blog / insights post.
 * References the siteSettings author info; can be extended with a
 * dedicated `author` document type if multiple authors are needed.
 */
export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: EditIcon,
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
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown in post listings and OG tags.',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          'Design',
          'Development',
          'Strategy',
          'Process',
          'Case Study',
          'News',
        ],
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
          options: { disableNew: true },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Publish Date, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'coverImage.asset',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'Draft',
        media,
      }
    },
  },
})
