import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,

  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'details', title: 'Event Details' },
    { name: 'visibility', title: 'Visibility' },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Event Name',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().error('Event name is required'),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'imageWithAlt',
      group: 'content',
      options: { hotspot: true },
    }),

    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Brief overview shown on the card and event detail page.',
      validation: (Rule) => Rule.max(400),
    }),

    defineField({
      name: 'body',
      title: 'Full Description',
      type: 'portableText',
      group: 'content',
      description: 'Longer event details with rich text, links, and images.',
    }),

    defineField({
      name: 'date',
      title: 'Event Date & Time',
      type: 'datetime',
      group: 'details',
      validation: (Rule) => Rule.required().error('Event date is required'),
    }),

    defineField({
      name: 'endDate',
      title: 'End Date & Time (optional)',
      type: 'datetime',
      group: 'details',
      description: 'Leave blank for single-day events.',
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'details',
      placeholder: 'e.g., Accra, Ghana',
      description: 'Physical location. Leave blank if online-only.',
    }),

    defineField({
      name: 'isOnline',
      title: 'Online Event',
      type: 'boolean',
      group: 'details',
      initialValue: false,
      description: 'Check if this event is fully virtual.',
    }),

    defineField({
      name: 'registrationUrl',
      title: 'Registration Link',
      type: 'url',
      group: 'details',
      description: 'External URL for sign-ups. Shown as a CTA button.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'details',
      options: { layout: 'tags' },
    }),

    defineField({
      name: 'featured',
      title: 'Feature This Event',
      type: 'boolean',
      group: 'visibility',
      initialValue: false,
      description: 'Pin to the top of the Stories hub.',
    }),
  ],

  orderings: [
    {
      title: 'Soonest First',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'Most Recent First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'coverImage',
      featured: 'featured',
    },
    prepare({ title, date, media, featured }) {
      const dateStr = date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'No date'
      return {
        title: featured ? `[Featured] ${title}` : title,
        subtitle: dateStr,
        media,
      }
    },
  },
})
