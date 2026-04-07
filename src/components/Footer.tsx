import Image from 'next/image'
import { colors, fonts } from '@/lib/tokens'
import NewsletterForm from '@/components/NewsletterForm'
import { client } from '@/lib/sanity/client'
import { siteSettingsQuery } from '@/lib/sanity/queries'
import type { SiteSettings } from '@/lib/sanity/types'

// ── Static nav lists ──────────────────────────────────────────────────────────

const PAGES = [
  { label: 'Home',           href: '/' },
  { label: 'The Blueprint',  href: '/blueprint' },
  { label: 'Partner With Us', href: '/partner' },
]

const RESEARCH = [
  { label: 'White Paper (Full)',   href: '/blueprint' },
  { label: 'Executive Summary',   href: '/blueprint#downloads' },
]

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy',  href: '/cookies' },
  { label: 'Terms of Use',   href: '/terms' },
]

const FALLBACK_COLUMNS = [
  { heading: 'Pages',    links: PAGES },
  { heading: 'Research', links: RESEARCH },
  { heading: 'Legal',    links: LEGAL },
]

// ── Fallback social links (used when CMS is empty) ────────────────────────────

const FALLBACK_SOCIALS = [
  { platform: 'Instagram', url: 'https://www.instagram.com/remadein.nl' },
  { platform: 'LinkedIn',  url: 'https://www.linkedin.com/company/remadein' },
  { platform: 'Twitter / X', url: 'https://x.com/remadeinnl' },
]

// ── Platform → SVG icon map ───────────────────────────────────────────────────

function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase()

  if (p.includes('instagram'))
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    )

  if (p.includes('linkedin'))
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )

  if (p.includes('twitter') || p.includes('x'))
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )

  if (p.includes('youtube'))
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M22.54 6.42A2.78 2.78 0 0 0 20.59 4.46C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    )

  // Generic globe fallback
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function Divider() {
  return <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.82)' }} />
}

function FooterCol({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p
        className="mb-5 text-[10px] font-bold tracking-[0.25em] uppercase"
        style={{ fontFamily: fonts.syne, color: colors.white }}
      >
        {heading}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="footer-link text-[14px] leading-snug"
              style={{ fontFamily: fonts.bricolage }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

export default async function Footer() {
  let settings: SiteSettings | null = null
  try {
    settings = await client.fetch<SiteSettings>(
      siteSettingsQuery,
      {},
      { next: { revalidate: 60 } },
    )
  } catch {
    // CMS unavailable — fall back to hardcoded values
  }

  const socials = settings?.socialLinks?.length ? settings.socialLinks : FALLBACK_SOCIALS
  const footerText = settings?.footerText ?? 'Remanufacturing the global fashion system — from the ground up, with the communities who already know how.'
  const year = new Date().getFullYear()
  const footerColumns = settings?.footerColumns?.filter((column) => column.heading && column.links?.length) ?? []
  const newsletterEyebrow = settings?.footerNewsletterEyebrow ?? 'Stay in the loop'
  const newsletterText = settings?.footerNewsletterText ?? 'Research updates, events, and investment briefs â€” straight to your inbox.'
  const footerCopyright = settings?.footerCopyright ?? `© ${year} Remade In Foundation. All rights reserved.`
  const footerLocations = settings?.footerLocations ?? 'The Netherlands · Ghana'

  return (
    <footer style={{ backgroundColor: colors.blue }}>
      <div className="px-8 md:px-20 pt-16 pb-12">

        {/* Row 1: Logo + mission left / nav columns right */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-14">

          {/* Brand column */}
          <div className="max-w-sm">
            <a href="/" className="inline-block mb-6">
              <Image
                src="/images/logos/Remadein_Logo_White.png"
                alt="Remade In"
                width={148}
                height={30}
                className="h-7 w-auto object-contain"
              />
            </a>
            <p
              className="text-[15px] leading-[1.75]"
              style={{ fontFamily: fonts.bricolage, color: 'rgba(255,255,255,0.65)' }}
            >
              {footerText}
            </p>

            {/* Social row — driven by CMS */}
            <div className="flex gap-4 mt-8">
              {socials.map(({ platform, url }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="footer-social"
                >
                  <SocialIcon platform={platform} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-14 gap-y-10">
            {(footerColumns.length ? footerColumns : FALLBACK_COLUMNS).map((column) => (
              <FooterCol key={column.heading} heading={column.heading} links={column.links} />
            ))}
          </div>
        </div>

        {/* Newsletter strip */}
        <div
          className="mt-14 rounded-[10px] px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.28em] mb-1"
              style={{ fontFamily: fonts.syne, color: colors.white }}
            >
              {newsletterEyebrow}
            </p>
            <p
              className="text-[15px]"
              style={{ fontFamily: fonts.bricolage, color: 'rgba(255,255,255,0.75)' }}
            >
              {newsletterText}
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-12 mb-8">
          <Divider />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p
            className="text-[12px]"
            style={{ fontFamily: fonts.syne, color: 'rgba(255,255,255,0.35)' }}
          >
            {footerCopyright}
          </p>
          <p
            className="text-[12px]"
            style={{ fontFamily: fonts.syne, color: 'rgba(255,255,255,0.28)' }}
          >
            {footerLocations}
          </p>
        </div>
      </div>
    </footer>
  )
}
