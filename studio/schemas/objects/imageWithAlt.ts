import { defineField, defineType } from 'sanity'

/**
 * Image with required alt text.
 * Use this everywhere instead of a bare `image` type to enforce accessibility.
 */
export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true, // enables focal-point cropping in the Studio
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for screen readers and SEO.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // Only required when the image itself is present
          const parent = context.parent as { asset?: unknown } | undefined
          if (parent?.asset && !value) return 'Alt text is required when an image is set.'
          return true
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed below the image.',
    }),
  ],
  preview: {
    select: { title: 'alt', media: 'asset' },
    prepare({ title, media }) {
      return { title: title ?? 'No alt text', media }
    },
  },
})
