import { defineField, defineType } from 'sanity'

/**
 * GALLERY IMAGE
 * 
 * Add a photo to the gallery on the homepage.
 * The gallery displays 5 images in a beautiful asymmetric layout.
 */
export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',


  groups: [
    { name: 'content', title: 'Photo & Info', default: true },
    { name: 'layout', title: 'Position in Grid' },
    { name: 'settings', title: 'Visibility' },
  ],

  fields: [
    // ══════════════════════════════════════════════════════════════════════════
    // PHOTO
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'image',
      title: 'Photo',
      type: 'imageWithAlt',
      group: 'content',
      description: 'Upload a high-quality photo from your events or work.',
      validation: (Rule) => Rule.required().error('Photo is required'),
    }),

    defineField({
      name: 'location',
      title: 'Location Label',
      type: 'string',
      group: 'content',
      placeholder: 'e.g., Amsterdam, NL or Kantamanto, GH',
      description: 'Shown when visitors hover over the photo.',
      validation: (Rule) => Rule.required().error('Location is required'),
    }),

    // ══════════════════════════════════════════════════════════════════════════
    // POSITION IN GALLERY
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'gridArea',
      title: 'Which Slot in the Gallery?',
      type: 'string',
      group: 'layout',
      description: 'The gallery has 5 different spaces. Choose where this image goes:',
      options: {
        list: [
          { title: 'a — Large landscape (top-left)',    value: 'a' },
          { title: 'b — Portrait (top-right)',           value: 'b' },
          { title: 'c — Small square (bottom-left)',    value: 'c' },
          { title: 'd — Small square (bottom-centre)',  value: 'd' },
          { title: 'e — Wide landscape (bottom-right)', value: 'e' },
        ],
      },
      validation: (Rule) => Rule.required().error('Select a grid position'),
    }),

    defineField({
      name: 'order',
      title: 'Order (if using the same grid slot)',
      type: 'number',
      group: 'layout',
      initialValue: 99,
      placeholder: '1, 2, 3...',
      description: 'If you have multiple images for the same slot, lower numbers appear first.',
      validation: (Rule) => Rule.min(0).integer(),
    }),

    // ══════════════════════════════════════════════════════════════════════════
    // VISIBILITY
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'active',
      title: 'Show on Website',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      description: 'Toggle OFF to hide this image. It won\'t be deleted, just hidden.',
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
      title: 'location',
      subtitle: 'gridArea',
      media: 'image',
    },
    prepare(value: Record<string, unknown>) {
      return {
        title: (value.title as string) ?? 'Untitled',
        subtitle: value.subtitle ? `Slot: ${value.subtitle as string}` : '',
        media: value.media as never,
      }
    },
  },
})
