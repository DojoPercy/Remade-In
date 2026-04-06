/**
 * TypeScript types that mirror the Sanity schema shapes.
 * These are hand-maintained for clarity. For auto-generated types,
 * run: `npx sanity@latest typegen generate` from the studio directory.
 */

// ── Primitives ────────────────────────────────────────────────────────────────

export interface SanitySlug {
  current: string
}

export interface SanityImageAsset {
  _id: string
  url: string
  metadata: {
    lqip: string // base64 blur placeholder
    dimensions: { width: number; height: number; aspectRatio: number }
  }
}

export interface SanityImage {
  asset: SanityImageAsset
  alt: string
  caption?: string
}

// ── Objects ───────────────────────────────────────────────────────────────────

export interface Seo {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
  noIndex?: boolean
}

// ── Documents ─────────────────────────────────────────────────────────────────

export interface SiteSettings {
  siteName: string
  tagline?: string
  logo?: SanityImage
  defaultSeo?: Seo
  mainNav: Array<{ label: string; href: string }>
  socialLinks: Array<{ platform: string; url: string }>
  contactEmail?: string
  footerText?: string
}

export interface WhatWeDoPillar {
  num: string
  title: string
  body: string
  icon?: string
  accentColor?: 'blue' | 'green' | 'peach'
}

export interface GlueColumn {
  num: string
  category?: string
  title: string
  desc?: string
  imgPosition?: string
}

export interface ImpactHeroStat {
  to: number
  suffix: string
  label: string
  note?: string
}

export interface ImpactSecondaryStat {
  display: string
  label: string
}

export interface DonationStat {
  value: string
  label: string
}

export interface HomePage {
  // Hero
  heroHeadline: string
  heroAccent: string
  heroTagline?: string
  heroSubheadline: string
  heroPrimaryCta?: string
  heroPrimaryCtaHref?: string
  heroSecondaryCta?: string
  heroSecondaryCtaHref?: string
  heroBackground?: SanityImage
  heroBadgeNumber?: number
  heroBadgeLabel?: string
  heroBadgeSubtext?: string
  heroBadgeLocation?: string
  heroSocialProof?: string[]
  // Ticker
  tickerItems: string[]
  // What We Do
  whatWeDoPillars?: WhatWeDoPillar[]
  // Mission & Vision
  missionVisionEyebrow?: string
  missionVisionImage?: SanityImage
  missionVisionImageCaption?: string
  visionText?: string
  missionText?: string
  // We Are The Glue
  glueSectionHeadline?: string
  glueSectionAccent?: string
  glueBody?: string
  glueColumns?: GlueColumn[]
  // Impact Teaser
  impactYear?: number
  impactEyebrow?: string
  impactHeadline?: string
  impactHeadlineAccent?: string
  impactHeadlineEnd?: string
  impactHeroStats?: ImpactHeroStat[]
  impactSecondaryStats?: ImpactSecondaryStat[]
  // Donation Banner
  donationEyebrow?: string
  donationHeadline?: string
  donationBody?: string
  donationPrimaryLabel?: string
  donationPrimaryHref?: string
  donationSecondaryLabel?: string
  donationStats?: DonationStat[]
  // Gallery
  galleryEyebrow?: string
  galleryHeadline?: string
  galleryAccent?: string
}

// ── Blueprint Page ─────────────────────────────────────────────────────────────

export interface BlueprintDownload {
  label: string
  description?: string
  /** Sanity-hosted file — use asset.url for the download link */
  file?: { asset: { url: string } }
  /** Fallback external URL (Google Drive, Dropbox, etc.) */
  externalHref?: string
  fileType: 'PDF' | 'ZIP' | 'PPTX' | 'XLSX'
  pages?: number
}

export interface BlueprintPage {
  heroHeadline?: string
  heroSubtitle?: string
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
  coverImage?: SanityImage
  downloads?: BlueprintDownload[]
}

// ── Gallery Image ──────────────────────────────────────────────────────────────

export interface GalleryImage {
  _id: string
  image: SanityImage
  location: string
  gridArea: 'a' | 'b' | 'c' | 'd' | 'e'
  objectPosition?: string
  order?: number
}

// ── Community Voice ───────────────────────────────────────────────────────────

export interface CommunityVoice {
  _id: string
  name: string
  slug: SanitySlug
  quote: string
  photo?: SanityImage
  market: string
  location: string
}

// ── Partners ─────────────────────────────────────────────────────────────────

export interface Partner {
  _id: string
  name: string
  role: string
  website?: string
  logoImage?: SanityImage
  logoSvg?: { asset: { url: string } }
  order?: number
  active?: boolean
}

// ── Team Members ─────────────────────────────────────────────────────────────

export interface TeamMember {
  _id: string
  name: string
  slug: SanitySlug
  role: string
  memberType: 'cofounder' | 'team' | 'advisor'
  photo?: SanityImage
  shortBio: string
  connectionToMission?: string
  location?: string
  expertise?: string[]
  linkedin?: string
  twitter?: string
}

// ── Research Archive ──────────────────────────────────────────────────────────

export type ResearchDocType = 'Report' | 'White Paper' | 'Policy Brief'

export interface ResearchDoc {
  _id: string
  title: string
  slug: SanitySlug
  docType: ResearchDocType
  year: number
  description: string
  pages: number
  file?: { asset: { url: string } }
  externalHref?: string
  headerColor?: string
  rotation?: number
  publishedAt: string
  featured: boolean
}

// ── Stories ───────────────────────────────────────────────────────────────────

export interface StoryArticle {
  _type: 'article'
  _id: string
  title: string
  slug: SanitySlug
  category: string
  coverImage?: SanityImage
  excerpt: string
  body?: unknown[]
  author?: string
  publishedAt: string
  featured: boolean
  tags?: string[]
}

export interface StoryVideo {
  _type: 'video'
  _id: string
  title: string
  slug: SanitySlug
  videoUrl: string
  thumbnail?: SanityImage
  caption?: string
  duration?: string
  publishedAt: string
  featured: boolean
  tags?: string[]
}

export interface StoryNews {
  _type: 'newsItem'
  _id: string
  title: string
  slug: SanitySlug
  source: string
  excerpt?: string
  externalUrl?: string
  publishedAt: string
  featured: boolean
}

export interface StoryEvent {
  _type: 'event'
  _id: string
  title: string
  slug: SanitySlug
  date: string
  endDate?: string
  location?: string
  isOnline: boolean
  coverImage?: SanityImage
  description?: string
  body?: unknown[]
  registrationUrl?: string
  publishedAt: string
  featured: boolean
  tags?: string[]
}

export interface StoryCommunityVoice {
  _type: 'communityVoice'
  _id: string
  name: string
  slug: SanitySlug
  quote: string
  photo?: SanityImage
  market: string
  location: string
  publishedAt: string
}

export type AnyStory = StoryArticle | StoryVideo | StoryNews | StoryEvent | StoryCommunityVoice

export interface StoriesData {
  articles:        StoryArticle[]
  videos:          StoryVideo[]
  news:            StoryNews[]
  events:          StoryEvent[]
  communityVoices: StoryCommunityVoice[]
}

// ── Stories Hub (paginated, unified) ──────────────────────────────────────────

export interface StoryItem {
  _type:    string
  _id:      string
  featured: boolean
  slug:     string | null
  date:     string
  title:    string
  imageUrl: string | null
  excerpt:  string | null
  // article / video / event
  category?:        string
  author?:          string
  videoUrl?:        string
  duration?:        string
  // newsItem
  source?:          string
  externalUrl?:     string
  // event
  location?:        string
  isOnline?:        boolean
  registrationUrl?: string
  // communityVoice
  name?:    string
  quote?:   string
  market?:  string
}

export interface StoriesHubData {
  items: StoryItem[]
  total: number
}
