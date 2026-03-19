import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

/**
 * HOME PAGE CONTENT
 * 
 * Edit everything visitors see on the front page:
 * - The hero banner at the top
 * - The scrolling ticker message
 * - The "We Are The Glue" section
 * - Impact stats and story
 * - Donation call-to-action
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero',     title: 'Hero Banner'           },
    { name: 'ticker',   title: 'Scrolling Message'     },
    { name: 'glue',     title: 'We Are The Glue'       },
    { name: 'impact',   title: 'Impact Stats'         },
    { name: 'donation', title: 'Support Banner'        },
  ],
  fields: [
    // ══════════════════════════════════════════════════════════════════════════
    // 🎯 HERO BANNER — Big eye-catching section at the top of the page
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'heroHeadline',
      title: 'Main Headline (Part 1)',
      type: 'string',
      group: 'hero',
      description: 'The first part of the big headline. Example: "Building our Circular Fashion"',
      placeholder: 'Building our Circular Fashion',
      validation: (Rule) => Rule.required().error('This field is required'),
    }),

    defineField({
      name: 'heroAccent',
      title: 'Highlighted Word (in orange)',
      type: 'string',
      group: 'hero',
      description: 'One important word that stands out in orange italic. Example: "Future"',
      placeholder: 'Future',
      validation: (Rule) => Rule.required().error('This field is required'),
    }),

    defineField({
      name: 'heroTagline',
      title: 'Headline Tagline (Part 2)',
      type: 'string',
      group: 'hero',
      description: 'Second line that completes the headline. Example: "— one Community at a Time"',
      placeholder: '— one Community at a Time',
      validation: (Rule) => Rule.required().error('This field is required'),
    }),

    defineField({
      name: 'heroSubheadline',
      title: 'Supporting Message',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: 'Smaller text explaining more about the mission. This appears below the main headline.',
      placeholder: 'Tell people more about what you do...',
      validation: (Rule) => Rule.required().error('This field is required'),
    }),

    defineField({
      name: 'heroPrimaryCta',
      title: 'Button Label — Main Action',
      type: 'string',
      group: 'hero',
      description: 'Large orange button text. Example: "See Why Remanufacturing"',
      placeholder: 'See Why Remanufacturing',
    }),

    defineField({
      name: 'heroSecondaryCta',
      title: 'Button Label — Secondary Action',
      type: 'string',
      group: 'hero',
      description: 'Smaller button text. Example: "Our Impact"',
      placeholder: 'Our Impact',
    }),

    defineField({
      name: 'heroBackground',
      title: 'Background Image',
      type: 'imageWithAlt',
      group: 'hero',
      description: 'Large banner image that appears behind the text. Needs alt text for accessibility.',
      validation: (Rule) => Rule.required().error('Please add a background image'),
    }),

    defineField({
      name: 'heroBadgeNumber',
      title: 'Big Impact Number',
      type: 'string',
      group: 'hero',
      description: 'The large stat in the blob badge. Example: "1,000,000"',
      placeholder: '1,000,000',
    }),

    defineField({
      name: 'heroBadgeLabel',
      title: 'What is that number? (e.g. "Garments")',
      type: 'string',
      group: 'hero',
      description: 'Label for the stat. Example: "Garments" or "Lives Changed"',
      placeholder: 'Garments',
    }),

    defineField({
      name: 'heroBadgeSubtext',
      title: 'Additional detail about the badge',
      type: 'string',
      group: 'hero',
      description: 'Extra context. Example: "Remanufactured in 5 years"',
      placeholder: 'Remanufactured in 5 years',
    }),

    defineField({
      name: 'heroBadgeLocation',
      title: 'Where? (e.g. "Starting in the Netherlands")',
      type: 'string',
      group: 'hero',
      description: 'Geographic or contextual information',
      placeholder: 'Starting in the Netherlands',
    }),

    defineField({
      name: 'heroSocialProof',
      title: 'Trust Tags (shown below buttons)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'hero',
      description: 'Short labels separated by dots. Shows why people should trust you. Example: "1,000,000 garments goal • Based in Netherlands • Justice-led"',
    }),

    // ══════════════════════════════════════════════════════════════════════════
    // 📜 SCROLLING MESSAGE — Ticker that loops across the page
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'tickerItems',
      title: 'Messages to Loop',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'ticker',
      description: 'Short messages that scroll continuously. Add as many as you want. Each message repeats.',
      placeholder: 'Add a message...',
      validation: (Rule) => Rule.required().min(1).error('Add at least one message'),
    }),

    // ══════════════════════════════════════════════════════════════════════════
    // 🤝 "WE ARE THE GLUE" — Problem/Solution section with 3 columns
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'glueHeadlineProblem',
      title: 'Headline Line 1 — The Problem',
      type: 'string',
      group: 'glue',
      description: 'What is the challenge? Example: "The Problem."',
      placeholder: 'The Problem.',
    }),

    defineField({
      name: 'glueHeadlineSolution',
      title: 'Headline Line 2 — The Solution',
      type: 'string',
      group: 'glue',
      description: 'What is your solution? Example: "The Solution."',
      placeholder: 'The Solution.',
    }),

    defineField({
      name: 'glueHeadlineAccent',
      title: 'Headline Line 3 — The Call to Action (orange)',
      type: 'string',
      group: 'glue',
      description: 'The invitation. This line appears in orange. Example: "The Invitation."',
      placeholder: 'The Invitation.',
    }),

    defineField({
      name: 'glueBody',
      title: 'Main Message',
      type: 'text',
      rows: 5,
      group: 'glue',
      description: 'Explain your approach. This appears as a paragraph below the headline.',
      placeholder: 'Tell your story...',
      validation: (Rule) => Rule.required().error('Please add a description'),
    }),

    defineField({
      name: 'glueColumns',
      title: 'Three Key Points (with images)',
      type: 'array',
      group: 'glue',
      validation: (Rule) => Rule.required().length(3).error('You must have exactly 3 columns'),
      of: [
        {
          type: 'object',
          name: 'glueColumn',
          fields: [
            defineField({
              name: 'num',
              title: 'Step Number',
              type: 'string',
              description: 'Example: "01", "02", "03"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Short headline for this point',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'desc',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'Explain this step in detail',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'num', subtitle: 'title' },
            prepare({ title, subtitle }) {
              return { title: `Step ${title} — ${subtitle}` }
            },
          },
        },
      ],
    }),

    // ══════════════════════════════════════════════════════════════════════════
    // 📊 IMPACT STATS — Shows the numbers that matter
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'impactYear',
      title: 'Report Year',
      type: 'number',
      group: 'impact',
      description: 'What year is this impact from? Example: 2025',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'impactHeroStats',
      title: 'Three Big Impact Numbers',
      type: 'array',
      group: 'impact',
      description: 'These are animated counters that visitors see. Put your most impressive metrics here.',
      of: [
        {
          type: 'object',
          name: 'impactHeroStat',
          fields: [
            defineField({
              name: 'to',
              title: 'Final Number (what the counter reaches)',
              type: 'number',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'suffix',
              title: 'Unit (e.g. "L", "kg", "tons")',
              type: 'string',
              description: 'What are we measuring? Example: "L" for liters, "kg" for kilograms, "%"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'What This Stat Means',
              type: 'string',
              description: 'Example: "Litres of water saved"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'note',
              title: 'Additional Context',
              type: 'string',
              description: 'Optional: Add context. Example: "through upcycling & reuse"',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'to' },
            prepare: (value: Record<string, unknown>) => ({
              title: String(value.title ?? ''),
              subtitle: `${value.suffix ?? ''} ${String(value.subtitle ?? '')}`,
            }),
          },
        },
      ],
    }),

    defineField({
      name: 'impactSecondaryStats',
      title: 'Supporting Stats (4 smaller numbers)',
      type: 'array',
      group: 'impact',
      description: 'Additional metrics shown in a smaller format. Use these for supporting data.',
      of: [
        {
          type: 'object',
          name: 'impactSecondaryStat',
          fields: [
            defineField({
              name: 'display',
              title: 'Text to Display',
              type: 'string',
              description: 'Example: "3,200+" or "12" or "€10,280"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'What This Number Means',
              type: 'string',
              description: 'Example: "Participants"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'display', subtitle: 'label' },
          },
        },
      ],
    }),

    // ══════════════════════════════════════════════════════════════════════════
    // 💝 SUPPORT BANNER — Donation/Partnership call to action
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'donationEyebrow',
      title: 'Small Label Above (e.g. "Support the Mission")',
      type: 'string',
      group: 'donation',
      description: 'Smaller text at the top',
      placeholder: 'Support the Mission',
    }),

    defineField({
      name: 'donationHeadline',
      title: 'Main Headline',
      type: 'string',
      group: 'donation',
      description: 'Big text asking for support. Example: "Help us reach 1,000,000 garments."',
      placeholder: 'Help us reach 1,000,000 garments.',
    }),

    defineField({
      name: 'donationBody',
      title: 'Supporting Message',
      type: 'text',
      rows: 4,
      group: 'donation',
      description: 'Why should people support? Explain the impact.',
      placeholder: 'Tell people why their support matters...',
    }),

    defineField({
      name: 'donationPrimaryLabel',
      title: 'Main Button Label',
      type: 'string',
      group: 'donation',
      description: 'Example: "Donate via Donorbox"',
      placeholder: 'Donate via Donorbox',
    }),

    defineField({
      name: 'donationPrimaryHref',
      title: 'Main Button Link',
      type: 'url',
      group: 'donation',
      description: 'Full URL where the button goes. Must start with https://',
    }),

    defineField({
      name: 'donationSecondaryLabel',
      title: 'Secondary Button Label',
      type: 'string',
      group: 'donation',
      description: 'Alternative action. Example: "Partner With Us"',
      placeholder: 'Partner With Us',
    }),

    defineField({
      name: 'donationStats',
      title: 'Stats for This Section',
      type: 'array',
      group: 'donation',
      description: 'Key numbers that show the scale of the need or effort',
      of: [
        {
          type: 'object',
          name: 'donationStat',
          fields: [
            defineField({
              name: 'value',
              title: 'The Number or Amount',
              type: 'string',
              description: 'Example: "€280K", "3", "5 yrs"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'What This Stat Represents',
              type: 'string',
              description: 'Example: "2026 fundraising target"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
