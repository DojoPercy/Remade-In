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

export interface GlueColumn {
  num: string
  title: string
  desc: string
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
  heroTagline: string
  heroSubheadline: string
  heroPrimaryCta?: string
  heroSecondaryCta?: string
  heroBackground?: SanityImage
  heroBadgeNumber?: string
  heroBadgeLabel?: string
  heroBadgeSubtext?: string
  heroBadgeLocation?: string
  heroSocialProof?: string[]
  // Ticker
  tickerItems: string[]
  // We Are The Glue
  glueHeadlineProblem?: string
  glueHeadlineSolution?: string
  glueHeadlineAccent?: string
  glueBody: string
  glueColumns: GlueColumn[]
  // Impact Teaser
  impactYear?: number
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
