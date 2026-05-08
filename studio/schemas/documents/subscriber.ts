import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const subscriber = defineType({
  name: 'subscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  icon: EnvelopeIcon,
  // Read-only in the studio — entries are created by the website form, not manually.
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      readOnly: true,
    }),

    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      readOnly: true,
      description: 'Where on the site they signed up (e.g. "footer").',
    }),

    defineField({
      name: 'unsubscribed',
      title: 'Unsubscribed',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle on to mark as unsubscribed. Does not delete the record.',
    }),
  ],

  orderings: [
    {
      title: 'Newest First',
      name: 'subscribedAtDesc',
      by: [{ field: 'subscribedAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'email',
      subtitle: 'subscribedAt',
      unsubscribed: 'unsubscribed',
    },
    prepare({ title, subtitle, unsubscribed }) {
      const date = subtitle
        ? new Date(subtitle).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : '—'
      return {
        title: unsubscribed ? `[Unsubscribed] ${title}` : title,
        subtitle: date,
      }
    },
  },
})
