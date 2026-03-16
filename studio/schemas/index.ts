// Documents
import { siteSettings } from './documents/siteSettings'
import { homePage } from './documents/homePage'
import { blueprintPage } from './documents/blueprintPage'
import { researchDoc } from './documents/researchDoc'
import { communityVoice } from './documents/communityVoice'
import { galleryImage } from './documents/galleryImage'
import { partner } from './documents/partner'

// Objects
import { seo } from './objects/seo'
import { imageWithAlt } from './objects/imageWithAlt'
import { cta } from './objects/cta'

/**
 * All schema types registered with Sanity.
 * Objects must appear before documents that reference them.
 */
export const schemaTypes = [
  // Objects
  seo,
  imageWithAlt,
  cta,

  // Documents
  siteSettings,
  homePage,
  blueprintPage,
  researchDoc,
  communityVoice,
  galleryImage,
  partner,
]
