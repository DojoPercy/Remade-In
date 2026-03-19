import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

/**
 * GLOBAL SITE SETTINGS
 * 
 * Edit the things that appear on EVERY page:
 * - Logo and branding
 * - Navigation menu
 * - Social media links
 * - Contact information
 * - Default SEO settings
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,

  groups: [
    { name: 'branding', title: 'Branding' },
    { name: 'navigation', title: 'Navigation Menu' },
    { name: 'social', title: 'Social & Contact' },
    { name: 'seo', title: 'Search Optimization' },
  ],

  fields: [
    // ══════════════════════════════════════════════════════════════════════════
    // 🎨 BRANDING — Logo and company identity
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'siteName',
      title: 'Organization Name',
      type: 'string',
      group: 'branding',
      description: 'Your company or organization name. This appears in browser tab titles.',
      placeholder: 'e.g., Remade In',
      validation: (Rule) => Rule.required().error('Your organization name is required'),
    }),

    defineField({
      name: 'tagline',
      title: 'Tagline (Optional)',
      type: 'string',
      group: 'branding',
      description: 'A short phrase that describes what you do. Often shown next to your logo.',
      placeholder: 'e.g., Building Circular Fashion',
    }),

    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      group: 'branding',
      description: 'Upload your logo. This appears in the header and footer of every page.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text (for accessibility)',
          type: 'string',
          description: 'Describe the logo. Example: "Remade In logo"',
          validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
        }),
      ],
    }),

    // ══════════════════════════════════════════════════════════════════════════
    // 📍 NAVIGATION MENU — Links at the top of every page
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'mainNav',
      title: 'Main Navigation Links',
      type: 'array',
      group: 'navigation',
      description: 'These links appear in the header navigation menu at the top of every page. Reorder them by dragging.',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Link Text',
              description: 'What the link says. Example: "Our Impact" or "Contact"',
              placeholder: 'e.g., About Us',
              validation: (Rule) => Rule.required().error('Link text is required'),
            }),
            defineField({
              name: 'href',
              type: 'string',
              title: 'Where Does It Go?',
              description: 'Full URL (for external sites) or anchor (for pages). Examples: "https://example.com" or "/impact" or "#contact"',
              placeholder: 'e.g., /about or #section-name',
              validation: (Rule) => Rule.required().error('Link destination is required'),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),

    // ══════════════════════════════════════════════════════════════════════════
    // 💬 SOCIAL & CONTACT — Where people can reach you
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'contactEmail',
      title: 'Public Contact Email',
      type: 'string',
      group: 'social',
      description: 'Email address shown in the footer. People can use this to reach you.',
      placeholder: 'contact@example.com',
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social Media Accounts',
      type: 'array',
      group: 'social',
      description: 'Links to your social media profiles. These appear as icons in the footer.',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              title: 'Which Platform?',
              options: {
                list: [
                  { title: 'Instagram', value: 'Instagram' },
                  { title: 'LinkedIn', value: 'LinkedIn' },
                  { title: 'Twitter / X', value: 'Twitter / X' },
                  { title: 'YouTube', value: 'YouTube' },
                  { title: 'GitHub', value: 'GitHub' },
                  { title: 'Behance', value: 'Behance' },
                  { title: 'Dribbble', value: 'Dribbble' },
                ],
              },
              validation: (Rule) => Rule.required().error('Select a platform'),
            }),
            defineField({
              name: 'url',
              type: 'url',
              title: 'Profile URL',
              description: 'Full link to your profile. Example: https://instagram.com/yourhandle',
              placeholder: 'https://instagram.com/yourhandle',
              validation: (Rule) => Rule.required().error('Enter a valid URL'),
            }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        },
      ],
    }),

    defineField({
      name: 'footerText',
      title: 'Footer Copyright Message',
      type: 'string',
      group: 'social',
      description: 'Short message shown at the very bottom of every page. Often a copyright notice. Example: "© 2025 Remade In. All rights reserved."',
      placeholder: '© 2025 Your Organization. All rights reserved.',
    }),

    // ══════════════════════════════════════════════════════════════════════════
    // 🔍 SEARCH OPTIMIZATION — Helps Google find your site
    // ══════════════════════════════════════════════════════════════════════════

    defineField({
      name: 'defaultSeo',
      title: 'Default SEO Tags',
      type: 'seo',
      group: 'seo',
      description: 'These settings are used as a backup if a page doesn\'t have its own SEO settings. SEO helps Google and search engines understand your site.',
    }),
  ],

  preview: {
    select: { title: 'siteName' },
    prepare({ title }) {
      return { title: title ? `${title} Settings` : 'Site Settings' }
    },
  },
})
