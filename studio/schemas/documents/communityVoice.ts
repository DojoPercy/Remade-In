import { defineField, defineType } from 'sanity'

export const communityVoice = defineType({
  name: 'communityVoice',
  title: 'Community Voice',
  type: 'document',

  groups: [
    { name: 'content', title: 'Story & Quote', default: true },
    { name: 'settings', title: 'Visibility & Order' },
  ],
  fields: [
    // ══════════════════════════════════════════════════════════════════════════
    // PERSON & STORY
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'name',
      title: 'Person\'s Name',
      type: 'string',
      group: 'content',
      placeholder: 'e.g., Ama Osei',
      validation: (Rule) => Rule.required().error('Name is required'),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug (auto-generated)',
      type: 'slug',
      group: 'content',
      options: { source: 'name', maxLength: 64 },
      description: 'Auto-created from the name. Used in URLs.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'quote',
      title: 'Their Quote or Story',
      type: 'text',
      rows: 4,
      group: 'content',
      placeholder: 'What did this person share with us? What\'s their story?',
      description: 'The key message shown in the carousel. Keep it under 400 characters.',
      validation: (Rule) => Rule.required().max(400).error('Quote must be under 400 characters'),
    }),

    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'imageWithAlt',
      group: 'content',
      description: 'Portrait photo of the person. Works best if the face is centered and crops tightly.',
      options: { hotspot: true },
    }),

    defineField({
      name: 'market',
      title: 'Hub or Organization',
      type: 'string',
      group: 'content',
      placeholder: 'e.g., Kantamanto Market',
      initialValue: 'Kantamanto Market',
      description: 'Where is this person from? Shown on the dark badge.',
    }),

    defineField({
      name: 'location',
      title: 'City & Country',
      type: 'string',
      group: 'content',
      placeholder: 'e.g., Accra, Ghana',
      initialValue: 'Accra, Ghana',
      description: 'Shown on the orange badge for location context.',
    }),

    // ══════════════════════════════════════════════════════════════════════════
    // DISPLAY SETTINGS
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'order',
      title: 'Order in Carousel',
      type: 'number',
      group: 'settings',
      initialValue: 99,
      placeholder: '1, 2, 3...',
      description: 'Lower numbers appear first. Use 1, 2, 3, etc. to reorder.',
      validation: (Rule) => Rule.min(0).integer().error('Must be a whole number'),
    }),

    defineField({
      name: 'active',
      title: 'Show on Website',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      description: 'Toggle OFF to temporarily hide this voice. It won\'t be deleted, just hidden.',
    }),
  ],

  orderings: [
    {
      name: 'displayOrder',
      title: 'Display Order',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'photo',
      active: 'active',
    },
    prepare({ title, subtitle, media, active }) {
      return {
        title: active ? title : `${title} (hidden)`,
        subtitle,
        media,
      }
    },
  },
})
