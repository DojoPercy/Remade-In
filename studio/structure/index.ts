import type { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import {
  CogIcon,
  HomeIcon,
  BookIcon,
  ArchiveIcon,
  UsersIcon,
  ImageIcon,
  DocumentsIcon,
} from '@sanity/icons'

/**
 * STUDIO STRUCTURE — How the editor is organized
 *
 * This creates a logical menu that clients find intuitive:
 * 1. Quick-change items (Home, Settings)
 * 2. Collections (Research, Voices, Gallery)
 * 3. Organized by frequency of use
 */
export const structure = (
  S: StructureBuilder,
  _context: StructureResolverContext,
) =>
  S.list()
    .title('Content Manager')
    .items([
      // ════════════════════════════════════════════════════════════════════════
      // ESSENTIALS — The two things editors change most
      // ════════════════════════════════════════════════════════════════════════

      S.listItem()
        .title('Home Page')
        .description('Edit the main sections visitors see when they first arrive')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Manage Home Page'),
        ),

      S.listItem()
        .title('Website Settings')
        .description('Logo, navigation menu, social links, contact info')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Edit Global Settings'),
        ),

      S.divider(),

      // ════════════════════════════════════════════════════════════════════════
      // CONTENT COLLECTIONS — Items you add/remove/reorder
      // ════════════════════════════════════════════════════════════════════════

      S.listItem()
        .title('Blueprint Page')
        .description('Manage the Blueprint section with guides and downloads')
        .icon(BookIcon)
        .child(
          S.document()
            .schemaType('blueprintPage')
            .documentId('blueprintPage')
            .title('Edit Blueprint Page'),
        ),

      S.listItem()
        .title('Research Archive')
        .description('Add or update research documents and studies')
        .icon(ArchiveIcon)
        .child(
          S.documentTypeList('researchDoc')
            .title('Research Documents')
            .defaultOrdering([
              { field: 'featured', direction: 'desc' },
              { field: 'publishedAt', direction: 'desc' },
            ])
            .filterBySearchParam('type:research'),
        ),

      S.listItem()
        .title('Community Voices')
        .description('Stories and testimonials from your community')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('communityVoice')
            .title('Community Stories')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),

      S.listItem()
        .title('Gallery')
        .description('Upload and organize photos from events and activities')
        .icon(ImageIcon)
        .child(
          S.documentTypeList('galleryImage')
            .title('Gallery Images')
            .defaultOrdering([
              { field: 'order', direction: 'asc' },
              { field: 'gridArea', direction: 'asc' },
            ]),
        ),

      S.listItem()
        .title('Partners')
        .description('Organizations and individuals you work with')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('partner')
            .title('Partners')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),

      S.divider(),

      // ════════════════════════════════════════════════════════════════════════
      // OTHER CONTENT — Less frequently edited
      // ════════════════════════════════════════════════════════════════════════

      S.listItem()
        .title('All Other Content')
        .description('Other items in the system')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Other Content')
            .items(
              S.documentTypeListItems()
                .filter(
                  (item) =>
                    item.getId() &&
                    ![
                      'siteSettings',
                      'homePage',
                      'blueprintPage',
                      'researchDoc',
                      'communityVoice',
                      'galleryImage',
                      'partner',
                    ].includes(item.getId()!),
                )
                .map((item) =>
                  item.child
                    ? item.child(
                        S.documentTypeList(item.getId()!)
                          .title(item.getDisplayName() as string)
                          .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
                      )
                    : item,
                ),
            ),
        ),
    ])
