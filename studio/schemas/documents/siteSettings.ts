import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

/**
 * Singleton document — only one instance exists (documentId: 'siteSettings').
 * Controls global settings: branding, SEO defaults, navigation, social links.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      description: 'Fallback SEO values used when a page does not define its own.',
    }),
    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() }),
            defineField({ name: 'href', type: 'string', title: 'URL / Anchor', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: ['Instagram', 'LinkedIn', 'Twitter / X', 'GitHub', 'Behance', 'Dribbble', 'YouTube'],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'url', type: 'url', title: 'URL', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      description: 'Optional copy shown in the site footer.',
    }),
  ],
  preview: {
    select: { title: 'siteName' },
    prepare({ title }) {
      return { title: title ?? 'Site Settings' }
    },
  },
})
