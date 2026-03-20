// Documents
import { siteSettings }  from './documents/siteSettings'
import { homePage }       from './documents/homePage'
import { blueprintPage }  from './documents/blueprintPage'
import { impactPage }     from './documents/impactPage'
import { researchDoc }    from './documents/researchDoc'
import { communityVoice } from './documents/communityVoice'
import { galleryImage }   from './documents/galleryImage'
import { partner }        from './documents/partner'
import { article }        from './documents/article'
import { video }          from './documents/video'
import { newsItem }       from './documents/newsItem'
import { event }          from './documents/event'
import { page }           from './documents/page'
import { post }           from './documents/post'
import { project }        from './documents/project'
import { service }        from './documents/service'

// Objects
import { seo }          from './objects/seo'
import { imageWithAlt } from './objects/imageWithAlt'
import { cta }          from './objects/cta'
import { hero }         from './objects/hero'
import { portableText } from './objects/portableText'

/**
 * All schema types registered with Sanity.
 * Objects must appear before documents that reference them.
 */
export const schemaTypes = [
  // Objects
  seo,
  imageWithAlt,
  cta,
  hero,
  portableText,

  // Singleton documents
  siteSettings,
  homePage,
  blueprintPage,
  impactPage,

  // Collection documents
  researchDoc,
  communityVoice,
  galleryImage,
  partner,

  // Stories
  article,
  video,
  newsItem,
  event,

  // Generic (legacy)
  page,
  post,
  project,
  service,
]
