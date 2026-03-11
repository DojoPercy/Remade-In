import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

/**
 * Singleton document — only one instance (documentId: 'homePage').
 * Controls all editable content on the homepage:
 *   - Hero section
 *   - Ticker strip
 *   - We Are The Glue section
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero',     title: 'Hero'              },
    { name: 'ticker',   title: 'Ticker'             },
    { name: 'glue',     title: 'We Are The Glue'    },
    { name: 'impact',   title: 'Impact Teaser'       },
    { name: 'donation', title: 'Donation Banner'     },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────────

    defineField({
      name: 'heroHeadline',
      title: 'Headline',
      type: 'string',
      group: 'hero',
      description: 'Main headline before the accented word.',
      initialValue: 'Building our Circular Fashion',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroAccent',
      title: 'Headline Accent Word',
      type: 'string',
      group: 'hero',
      description: 'The word rendered in orange italic (e.g. "Future").',
      initialValue: 'Future',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTagline',
      title: 'Headline Tagline',
      type: 'string',
      group: 'hero',
      description: 'The second line of the headline (e.g. "— one Community at a Time").',
      initialValue: '— one Community at a Time',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Primary CTA Label',
      type: 'string',
      group: 'hero',
      initialValue: 'See Why Remanufacturing',
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Secondary CTA Label',
      type: 'string',
      group: 'hero',
      initialValue: 'Our Impact',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Background Image',
      type: 'imageWithAlt',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroBadgeNumber',
      title: 'Badge — Number',
      type: 'string',
      group: 'hero',
      description: 'Large stat displayed in the blob badge (e.g. "1,000,000").',
      initialValue: '1,000,000',
    }),
    defineField({
      name: 'heroBadgeLabel',
      title: 'Badge — Label',
      type: 'string',
      group: 'hero',
      initialValue: 'Garments',
    }),
    defineField({
      name: 'heroBadgeSubtext',
      title: 'Badge — Subtext',
      type: 'string',
      group: 'hero',
      initialValue: 'Remanufactured in 5 years',
    }),
    defineField({
      name: 'heroBadgeLocation',
      title: 'Badge — Location Line',
      type: 'string',
      group: 'hero',
      initialValue: 'Starting in the Netherlands',
    }),
    defineField({
      name: 'heroSocialProof',
      title: 'Social Proof Tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'hero',
      description: 'Short labels shown as a dot-separated row below the CTAs.',
      initialValue: [
        '1,000,000 garments goal',
        'Based in the Netherlands',
        'Circular fashion pioneers',
        'Justice-led model',
      ],
    }),

    // ── Ticker ─────────────────────────────────────────────────────────────────

    defineField({
      name: 'tickerItems',
      title: 'Ticker Items',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'ticker',
      description: 'Scrolling marquee text — items repeat automatically.',
      validation: (Rule) => Rule.required().min(1),
    }),

    // ── We Are The Glue ────────────────────────────────────────────────────────

    defineField({
      name: 'glueHeadlineProblem',
      title: 'Headline — Line 1 (Problem)',
      type: 'string',
      group: 'glue',
      initialValue: 'The Problem.',
    }),
    defineField({
      name: 'glueHeadlineSolution',
      title: 'Headline — Line 2 (Solution)',
      type: 'string',
      group: 'glue',
      initialValue: 'The Solution.',
    }),
    defineField({
      name: 'glueHeadlineAccent',
      title: 'Headline — Line 3 Accent (orange italic)',
      type: 'string',
      group: 'glue',
      initialValue: 'The Invitation.',
    }),
    defineField({
      name: 'glueBody',
      title: 'Body Copy',
      type: 'text',
      rows: 5,
      group: 'glue',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'glueColumns',
      title: 'Three Columns',
      type: 'array',
      group: 'glue',
      validation: (Rule) => Rule.required().length(3),
      of: [
        {
          type: 'object',
          name: 'glueColumn',
          fields: [
            defineField({ name: 'num', title: 'Number', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'desc', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
            defineField({
              name: 'imgPosition',
              title: 'Image Focal Position',
              type: 'string',
              description: 'CSS object-position value (e.g. "30% center").',
              initialValue: '50% center',
            }),
          ],
          preview: {
            select: { title: 'num', subtitle: 'title' },
            prepare({ title, subtitle }) {
              return { title: `${title} — ${subtitle}` }
            },
          },
        },
      ],
    }),

    // ── Impact Teaser ──────────────────────────────────────────────────────────

    defineField({
      name: 'impactYear',
      title: 'Impact Year',
      type: 'number',
      group: 'impact',
      description: 'The reporting year shown in the eyebrow (e.g. 2025).',
      initialValue: 2025,
    }),
    defineField({
      name: 'impactHeroStats',
      title: 'Hero Stats',
      type: 'array',
      group: 'impact',
      description: 'Three large animated counter stats.',
      of: [
        {
          type: 'object',
          name: 'impactHeroStat',
          fields: [
            defineField({ name: 'to',     title: 'Counter Target', type: 'number', validation: (Rule) => Rule.required() }),
            defineField({ name: 'suffix', title: 'Unit Suffix (e.g. "L", "kg")', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'label',  title: 'Label',  type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'note',   title: 'Note',   type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'to' },
            prepare: (value: Record<string, unknown>) => ({ title: String(value.title ?? ''), subtitle: String(value.subtitle ?? '') }),
          },
        },
      ],
      initialValue: [
        { _type: 'impactHeroStat', to: 500000, suffix: 'L',  label: 'Litres of water saved',    note: 'through upcycling & reuse' },
        { _type: 'impactHeroStat', to: 6250,   suffix: 'kg', label: 'CO₂ emissions avoided',    note: 'in 2025 alone'             },
        { _type: 'impactHeroStat', to: 250,    suffix: 'kg', label: 'Textile waste diverted',   note: 'from landfill & export'    },
      ],
    }),
    defineField({
      name: 'impactSecondaryStats',
      title: 'Secondary Stats',
      type: 'array',
      group: 'impact',
      description: 'Four smaller supporting stats shown in the bottom strip.',
      of: [
        {
          type: 'object',
          name: 'impactSecondaryStat',
          fields: [
            defineField({ name: 'display', title: 'Display Value (e.g. "3,200+")', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'label',   title: 'Label',                         type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: 'display', subtitle: 'label' },
          },
        },
      ],
      initialValue: [
        { _type: 'impactSecondaryStat', display: '12',      label: 'Events hosted'              },
        { _type: 'impactSecondaryStat', display: '3,200+',  label: 'Participants'                },
        { _type: 'impactSecondaryStat', display: '250K+',   label: 'Social engagements in 2025'  },
        { _type: 'impactSecondaryStat', display: '€10,280', label: 'Invested into Kantamanto'    },
      ],
    }),

    // ── Donation Banner ────────────────────────────────────────────────────────

    defineField({
      name: 'donationEyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      group: 'donation',
      initialValue: 'Support the Mission',
    }),
    defineField({
      name: 'donationHeadline',
      title: 'Headline',
      type: 'string',
      group: 'donation',
      initialValue: 'Help us reach 1,000,000 garments.',
    }),
    defineField({
      name: 'donationBody',
      title: 'Body Copy',
      type: 'text',
      rows: 4,
      group: 'donation',
    }),
    defineField({
      name: 'donationPrimaryLabel',
      title: 'Primary CTA Label',
      type: 'string',
      group: 'donation',
      initialValue: 'Donate via Donorbox',
    }),
    defineField({
      name: 'donationPrimaryHref',
      title: 'Primary CTA URL',
      type: 'url',
      group: 'donation',
    }),
    defineField({
      name: 'donationSecondaryLabel',
      title: 'Secondary CTA Label',
      type: 'string',
      group: 'donation',
      initialValue: 'Partner With Us',
    }),
    defineField({
      name: 'donationStats',
      title: 'Stats',
      type: 'array',
      group: 'donation',
      of: [
        {
          type: 'object',
          name: 'donationStat',
          fields: [
            defineField({ name: 'value', title: 'Value (e.g. "€280K")', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'label', title: 'Label',                type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
      initialValue: [
        { _type: 'donationStat', value: '€280K', label: '2026 fundraising target' },
        { _type: 'donationStat', value: '3',     label: 'Core pilot projects'     },
        { _type: 'donationStat', value: '5 yrs', label: 'To 1M garments'          },
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
