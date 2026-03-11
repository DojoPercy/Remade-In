import { defineField, defineType } from 'sanity'

/**
 * Hero section object.
 * Used by pages that need a full-width intro section.
 */
export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small label shown above the headline.',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'cta',
      title: 'Primary CTA',
      type: 'cta',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'cta',
    }),
    defineField({
      name: 'image',
      title: 'Background / Feature Image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'theme',
      title: 'Colour Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Dark (Warm Paper)', value: 'dark' },
          { title: 'Light (Sky Blue / Cream)', value: 'light' },
          { title: 'Brand Orange', value: 'orange' },
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'eyebrow', media: 'image.asset' },
  },
})
