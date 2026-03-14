import { groq } from 'next-sanity'

// ── Fragments ─────────────────────────────────────────────────────────────────

const imageFragment = groq`
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt,
  caption
`

const seoFragment = groq`
  seo {
    metaTitle,
    metaDescription,
    ogImage { ${imageFragment} },
    noIndex
  }
`

// ── Site Settings ─────────────────────────────────────────────────────────────

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    logo { ${imageFragment} },
    defaultSeo { ${seoFragment} },
    mainNav,
    socialLinks,
    contactEmail,
    footerText
  }
`

// ── Home Page (singleton) ─────────────────────────────────────────────────────

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroHeadline,
    heroAccent,
    heroTagline,
    heroSubheadline,
    heroPrimaryCta,
    heroSecondaryCta,
    heroBackground { ${imageFragment} },
    heroBadgeNumber,
    heroBadgeLabel,
    heroBadgeSubtext,
    heroBadgeLocation,
    heroSocialProof,

    tickerItems,

    glueHeadlineProblem,
    glueHeadlineSolution,
    glueHeadlineAccent,
    glueBody,
    glueColumns[] {
      num,
      title,
      desc,
      imgPosition
    },

    impactYear,
    impactHeroStats[] {
      to,
      suffix,
      label,
      note
    },
    impactSecondaryStats[] {
      display,
      label
    },

    donationEyebrow,
    donationHeadline,
    donationBody,
    donationPrimaryLabel,
    donationPrimaryHref,
    donationSecondaryLabel,
    donationStats[] {
      value,
      label
    }
  }
`

// ── Blueprint Page (singleton) ────────────────────────────────────────────────

export const blueprintPageQuery = groq`
  *[_type == "blueprintPage"][0] {
    heroHeadline,
    heroSubtitle,
    primaryCtaLabel,
    secondaryCtaLabel,
    coverImage { ${imageFragment} },
    downloads[] {
      label,
      description,
      file { asset->{ url } },
      externalHref,
      fileType,
      pages
    }
  }
`

// ── Gallery ────────────────────────────────────────────────────────────────────

/** Active gallery images ordered by slot order */
export const galleryImagesQuery = groq`
  *[_type == "galleryImage" && active == true] | order(order asc) {
    _id,
    image { ${imageFragment} },
    location,
    gridArea,
    objectPosition
  }
`

// ── Research Archive ──────────────────────────────────────────────────────────

/** All research documents — featured first, then newest */
export const allResearchDocsQuery = groq`
  *[_type == "researchDoc"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    docType,
    year,
    description,
    pages,
    file { asset->{ url } },
    externalHref,
    headerColor,
    rotation,
    publishedAt,
    featured
  }
`

/** Research documents filtered by type */
export const researchDocsByTypeQuery = groq`
  *[_type == "researchDoc" && docType == $docType] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    docType,
    year,
    description,
    pages,
    file { asset->{ url } },
    externalHref,
    headerColor,
    rotation,
    publishedAt,
    featured
  }
`

/** Total count of all research documents */
export const researchDocCountQuery = groq`
  count(*[_type == "researchDoc"])
`

// ── Community Voices ──────────────────────────────────────────────────────────

/** All active community voices ordered by display order */
export const communityVoicesQuery = groq`
  *[_type == "communityVoice" && active == true] | order(order asc) {
    _id,
    name,
    slug,
    quote,
    photo { ${imageFragment} },
    market,
    location
  }
`
