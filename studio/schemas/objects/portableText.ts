import { defineArrayMember, defineType } from 'sanity'

/**
 * Rich text content type.
 * Shared across documents so the editor experience is consistent site-wide.
 * Includes custom marks (highlight, internal link) and custom blocks (imageWithAlt).
 */
export const portableText = defineType({
  name: 'portableText',
  title: 'Content',
  type: 'array',
  of: [
    // Standard block (paragraphs, headings, lists)
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ],
        annotations: [
          // External URL link
          {
            name: 'link',
            type: 'object',
            title: 'External Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) =>
                  Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
              },
              {
                name: 'blank',
                type: 'boolean',
                title: 'Open in new tab',
                initialValue: false,
              },
            ],
          },
          // Internal page reference link
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal Link',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Page',
                to: [{ type: 'page' }, { type: 'project' }, { type: 'post' }],
              },
            ],
          },
        ],
      },
    }),

    // Inline image block
    defineArrayMember({ type: 'imageWithAlt' }),

    // CTA block inside rich text
    defineArrayMember({ type: 'cta' }),
  ],
})
