import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const communityVoice = defineType({
  name: 'communityVoice',
  title: 'Community Voice',
  type: 'document',
  icon: UsersIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'name', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),

    // ── Quote ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'The key quote shown on the homepage carousel. Keep it under 200 characters.',
      validation: (Rule) => Rule.required().max(400),
    }),

    // ── Photo ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'imageWithAlt',
      group: 'content',
      description: 'Portrait-style photo. Will be displayed in a blob mask — tighter crops work best.',
      options: { hotspot: true },
    }),

    // ── Location ──────────────────────────────────────────────────────────────
    defineField({
      name: 'market',
      title: 'Market / Hub',
      type: 'string',
      group: 'content',
      initialValue: 'Kantamanto Market',
      description: 'Shown on the dark badge (e.g. "Kantamanto Market")',
    }),
    defineField({
      name: 'location',
      title: 'City, Country',
      type: 'string',
      group: 'content',
      initialValue: 'Accra, Ghana',
      description: 'Shown on the orange badge (e.g. "Accra, Ghana")',
    }),

    // ── Settings ──────────────────────────────────────────────────────────────
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'settings',
      initialValue: 99,
      description: 'Lower numbers appear first in the carousel.',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'active',
      title: 'Show on Homepage',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      description: 'Toggle off to hide from the Community Voice carousel without deleting.',
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
