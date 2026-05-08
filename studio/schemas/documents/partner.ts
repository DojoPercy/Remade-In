import { defineField, defineType } from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',

  groups: [
    { name: 'content', title: 'Partner Info', default: true },
    { name: 'visibility', title: 'Visibility' },
  ],

  fields: [
    defineField({
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().error('Name is required'),
    }),

    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      group: 'content',
      description: 'Link to the partner\'s website.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'imageWithAlt',
      group: 'content',
      options: { hotspot: true },
      description: 'Partner logo. Works best on a white or transparent background.',
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'visibility',
      initialValue: 99,
      description: 'Lower numbers appear first.',
      validation: (Rule) => Rule.min(0).integer(),
    }),

    defineField({
      name: 'active',
      title: 'Show on Website',
      type: 'boolean',
      group: 'visibility',
      initialValue: true,
      description: 'Toggle off to hide without deleting.',
    }),
  ],

  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'name',
      media: 'logo',
      active: 'active',
    },
    prepare({ title, media, active }) {
      return {
        title: active ? title : `${title} (hidden)`,
        subtitle: 'Partner',
        media,
      }
    },
  },
})
