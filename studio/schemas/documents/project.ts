import { defineField, defineType } from 'sanity'
import { ProjectsIcon } from '@sanity/icons'

/**
 * Portfolio project — the primary content type for Remade In.
 * Featured projects are highlighted on the home page.
 */
export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
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
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Pin this project to the home page work section.',
      initialValue: false,
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Web Design', value: 'web-design' },
          { title: 'Development', value: 'development' },
          { title: 'Branding', value: 'branding' },
          { title: 'E-commerce', value: 'ecommerce' },
          { title: 'Full Build', value: 'full-build' },
        ],
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'One or two sentences — shown on project cards.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'imageWithAlt' }],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
    }),
    defineField({
      name: 'body',
      title: 'Project Write-up',
      type: 'portableText',
      description: 'Full case study content.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
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
      subtitle: 'client',
      media: 'coverImage.asset',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle,
        media,
      }
    },
  },
})
