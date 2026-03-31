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
    heroPrimaryCtaHref,
    heroSecondaryCtaHref,

    tickerItems,

    whatWeDoPillars[] {
      num,
      title,
      body,
      icon,
      accentColor
    },

    missionVisionEyebrow,
    missionVisionImage { ${imageFragment} },
    missionVisionImageCaption,
    visionText,
    missionText,

    glueSectionHeadline,
    glueSectionAccent,
    glueBody,
    glueColumns[] {
      num,
      category,
      title,
      desc,
      imgPosition
    },

    impactYear,
    impactEyebrow,
    impactHeadline,
    impactHeadlineAccent,
    impactHeadlineEnd,
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

// ── Partners ──────────────────────────────────────────────────────────────────

/** All active partners ordered by display order */
export const partnersQuery = groq`
  *[_type == "partner" && active == true] | order(order asc, name asc) {
    _id,
    name,
    url,
    logo { ${imageFragment} }
  }
`

// ── Team Members ─────────────────────────────────────────────────────────────

/**
 * Active team members — co-founders first, then core team, then advisors.
 * Within each type, ordered by the `order` field ascending.
 */
export const teamMembersQuery = groq`
  *[_type == "teamMember" && active == true] | order(
    select(memberType == "cofounder" => 0, memberType == "team" => 1, 2),
    order asc
  ) {
    _id,
    name,
    slug,
    role,
    memberType,
    photo { ${imageFragment} },
    shortBio,
    connectionToMission,
    location,
    expertise,
    linkedin,
    twitter
  }
`

// ── Stories ───────────────────────────────────────────────────────────────────

/** All stories across all four types, for the hub page */
export const storiesQuery = groq`
  {
    "articles": *[_type == "article"] | order(featured desc, publishedAt desc) {
      _type, _id, title, slug, category,
      coverImage { ${imageFragment} },
      excerpt, author, publishedAt, featured, tags
    },
    "videos": *[_type == "video"] | order(featured desc, publishedAt desc) {
      _type, _id, title, slug, videoUrl,
      thumbnail { ${imageFragment} },
      caption, duration, publishedAt, featured, tags
    },
    "news": *[_type == "newsItem"] | order(featured desc, publishedAt desc) {
      _type, _id, title, slug, source, excerpt, externalUrl, publishedAt, featured
    },
    "events": *[_type == "event"] | order(featured desc, date desc) {
      _type, _id, title, slug, date, endDate, location, isOnline,
      coverImage { ${imageFragment} },
      description, registrationUrl, featured, tags,
      "publishedAt": date
    },
    "communityVoices": *[_type == "communityVoice" && active == true] | order(order asc) {
      _type, _id, name, slug, quote,
      photo { ${imageFragment} },
      market, location,
      "publishedAt": _createdAt
    }
  }
`

/** Single story by slug — checks all types that have detail pages */
export const storyBySlugQuery = groq`
  coalesce(
    *[_type == "article" && slug.current == $slug][0] {
      _type, _id, title, slug, category,
      coverImage { ${imageFragment} },
      excerpt, body, author, publishedAt, featured, tags
    },
    *[_type == "video" && slug.current == $slug][0] {
      _type, _id, title, slug, videoUrl,
      thumbnail { ${imageFragment} },
      caption, duration, publishedAt, featured, tags
    },
    *[_type == "event" && slug.current == $slug][0] {
      _type, _id, title, slug, date, endDate, location, isOnline,
      coverImage { ${imageFragment} },
      description, body, registrationUrl, featured, tags,
      "publishedAt": date
    }
  )
`

// ── Stories Hub (paginated, unified) ──────────────────────────────────────────

const STORY_TYPES = `["article","video","newsItem","event","communityVoice"]`

/** Unified hub query — supports type filter, text search, and offset-based pagination */
export const storiesHubQuery = groq`
  {
    "items": *[
      _type in ${STORY_TYPES}
      && ($type == "" || $type == "all" || _type == $type)
      && ($q    == "" || title match ($q + "*") || name match ($q + "*"))
    ] | order(featured desc, coalesce(publishedAt, date, _createdAt) desc)
    [$offset...$end] {
      _type, _id, featured,
      "slug":     coalesce(slug.current, null),
      "date":     coalesce(publishedAt, date, _createdAt),
      "title":    select(_type == "communityVoice" => name, title),
      "imageUrl": select(
        _type == "article"        => coverImage.asset->url,
        _type == "video"          => thumbnail.asset->url,
        _type == "event"          => coverImage.asset->url,
        _type == "communityVoice" => photo.asset->url,
        null
      ),
      "excerpt": select(
        _type == "article"        => excerpt,
        _type == "newsItem"       => excerpt,
        _type == "event"          => description,
        _type == "video"          => caption,
        _type == "communityVoice" => quote,
        null
      ),
      category, author, videoUrl, duration,
      source, externalUrl, location, isOnline, registrationUrl,
      name, quote, market,
    },
    "total": count(*[
      _type in ${STORY_TYPES}
      && ($type == "" || $type == "all" || _type == $type)
      && ($q    == "" || title match ($q + "*") || name match ($q + "*"))
    ])
  }
`

// ── Impact Page (singleton) ────────────────────────────────────────────────────

export const impactPageQuery = groq`
  *[_type == "impactPage"][0] {
    heroMetrics {
      currentGarments,
      targetGarments,
      lastUpdated
    },
    snapshot2025[] | order(order asc) {
      metric,
      value,
      unit,
      icon,
      order
    },
    timeline[] | order(year asc, quarter asc) {
      year,
      quarter,
      garments,
      isProjection,
      notes
    },
    featuredPartners[] -> {
      _id,
      name,
      url,
      logo { ${imageFragment} }
    },
    partnerNetworkDescription,
    calculator {
      carbonPerGarment,
      waterPerGarment,
      costPerGarment,
      sources[]
    },
    communityStories[] | order(order asc) {
      title,
      image { ${imageFragment} },
      community,
      quote,
      narrative,
      order
    },
    methodology,
    limitations,
    impactReportPdf { asset->{ url } },
    externalVerification
  }
`

