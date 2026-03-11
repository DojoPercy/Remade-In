import type { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import { CogIcon, HomeIcon, ArchiveIcon, UsersIcon, ImageIcon } from '@sanity/icons'

/**
 * Custom desk structure for Remade In Studio.
 *
 * Singletons (siteSettings, homePage) are pinned as fixed items
 * so editors can never accidentally create a second copy.
 */
export const structure = (
  S: StructureBuilder,
  _context: StructureResolverContext,
) =>
  S.list()
    .title('Remade In')
    .items([
      // ── Singleton: Site Settings ───────────────────────────────────────────
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),

      S.divider(),

      // ── Singleton: Home Page ───────────────────────────────────────────────
      S.listItem()
        .title('Home Page')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page'),
        ),

      S.divider(),

      // ── Research Archive ───────────────────────────────────────────────────
      S.listItem()
        .title('Research Archive')
        .icon(ArchiveIcon)
        .child(
          S.documentTypeList('researchDoc')
            .title('Research Documents')
            .defaultOrdering([
              { field: 'featured', direction: 'desc' },
              { field: 'publishedAt', direction: 'desc' },
            ]),
        ),

      // ── Community Voices ───────────────────────────────────────────────────
      S.listItem()
        .title('Community Voices')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('communityVoice')
            .title('Community Voices')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),

      // ── Gallery ───────────────────────────────────────────────────────────
      S.listItem()
        .title('Gallery')
        .icon(ImageIcon)
        .child(
          S.documentTypeList('galleryImage')
            .title('Gallery Images')
            .defaultOrdering([
              { field: 'order', direction: 'asc' },
              { field: 'gridArea', direction: 'asc' },
            ]),
        ),

      S.divider(),

      // Fallback: any remaining types not handled above
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['siteSettings', 'homePage', 'researchDoc', 'communityVoice', 'galleryImage'].includes(item.getId()!),
      ),
    ])
