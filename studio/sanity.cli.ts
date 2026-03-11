import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  /**
   * Auto-updates Studio when schema changes are detected.
   * Set to false to disable.
   */
  autoUpdatesEnabled: true,
})
