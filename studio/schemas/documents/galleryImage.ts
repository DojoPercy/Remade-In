import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'

/**
 * Gallery image entries for the "In The Field" homepage section.
 * Each document maps to one cell in the asymmetric 5-image grid.
 */
export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location Label',
      type: 'string',
      description: 'Shown on hover (e.g. "Amsterdam, NL" or "Kantamanto, GH").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gridArea',
      title: 'Grid Area',
      type: 'string',
      description: 'Which slot in the 5-image grid: a (large top-left), b (portrait top-right), c (small bottom-left), d (small bottom-centre), e (wide bottom-right).',
      options: {
        list: [
          { title: 'a — Large landscape (top-left)',   value: 'a' },
          { title: 'b — Portrait (top-right)',          value: 'b' },
          { title: 'c — Small square (bottom-left)',   value: 'c' },
          { title: 'd — Small square (bottom-centre)', value: 'd' },
          { title: 'e — Wide landscape (bottom-right)',value: 'e' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'objectPosition',
      title: 'Focal Position',
      type: 'string',
      description: 'CSS object-position (e.g. "50% 30%", "top", "center"). Controls which part of the image is visible.',
      initialValue: '50% center',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Use to reorder within the same grid area.',
      initialValue: 99,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide this image without deleting it.',
      initialValue: true,
    }),
  ],

  orderings: [
    {
      title: 'Grid Order',
      name: 'gridOrder',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'gridArea', direction: 'asc' },
      ],
    },
  ],

  preview: {
    select: {
      title:    'location',
      subtitle: 'gridArea',
      media:    'image',
    },
    prepare(value: Record<string, unknown>) {
      return {
        title:    (value.title as string) ?? 'Untitled',
        subtitle: value.subtitle ? `Grid: ${value.subtitle as string}` : '',
        media:    value.media as never,
      }
    },
  },
})
