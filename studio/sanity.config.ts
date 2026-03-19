import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'
import { structure } from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: 'remade-in',
  title: 'Remade In – Content Editor',

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
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
