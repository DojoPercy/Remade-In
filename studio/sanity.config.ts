import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { structure } from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: 'remade-in',
  title: 'Remade In Studio',

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],

  schema: {
    types: schemaTypes,
    // Enforce that singleton documents can only have one instance
    templates: (prev) =>
      prev.filter(
        ({ schemaType }) => !['siteSettings', 'homePage', 'blueprintPage'].includes(schemaType),
      ),
  },
})
