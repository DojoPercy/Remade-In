'use client'
import Image from 'next/image'
import { colors, fonts } from '@/lib/tokens'

const PAGES = [
  { label: 'Home', href: '/' },
  { label: 'The Blueprint', href: '/blueprint' },
  { label: 'Impact', href: '/#impact' },
  { label: 'Research', href: '/#research' },
  { label: 'Community', href: '/#community' },
  { label: 'Partner With Us', href: '/partner' },
]

const RESEARCH = [
  { label: 'White Paper (Full)', href: '/blueprint' },
  { label: 'Executive Summary', href: '/blueprint#downloads' },
  { label: 'Kantamanto Report', href: '/blueprint#downloads' },
  { label: 'Impact Data 2024', href: '/blueprint#downloads' },
]

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Terms of Use', href: '/terms' },
]

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/remadein.nl',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/remadein',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/remadeinnl',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

// ── Divider line ──────────────────────────────────────────────────────────────

function Divider() {
  return <div style={{ height: 1, backgroundColor: 'rgba(249,232,208,0.08)' }} />
}

// ── Footer column ─────────────────────────────────────────────────────────────

function FooterCol({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p
        className="mb-5 text-[10px] font-bold tracking-[0.25em] uppercase"
        style={{ fontFamily: fonts.syne, color: colors.orange }}
      >
        {heading}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-[14px] leading-snug transition-colors duration-200"
              style={{ fontFamily: fonts.bricolage, color: `${colors.cream}70` }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.cream)}
              onMouseLeave={(e) => (e.currentTarget.style.color = `${colors.cream}70`)}
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

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: colors.charcoal }}>
      {/* Top orange rule */}
      <div style={{ height: 3, backgroundColor: colors.orange }} />

      {/* Main body */}
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
              style={{ fontFamily: fonts.bricolage, color: `${colors.cream}65` }}
            >
              Remanufacturing the global fashion system — from the ground up, with the communities who already know how.
            </p>

            {/* Social row */}
            <div className="flex gap-4 mt-8">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center rounded-full border transition-all duration-200"
                  style={{
                    width: 40,
                    height: 40,
                    color: `${colors.cream}55`,
                    borderColor: `${colors.cream}18`,
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.cream
                    e.currentTarget.style.borderColor = `${colors.cream}45`
                    e.currentTarget.style.backgroundColor = `${colors.cream}08`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = `${colors.cream}55`
                    e.currentTarget.style.borderColor = `${colors.cream}18`
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-14 gap-y-10">
            <FooterCol heading="Pages" links={PAGES} />
            <FooterCol heading="Research" links={RESEARCH} />
            <FooterCol heading="Legal" links={LEGAL} />
          </div>
        </div>

        {/* Newsletter / CTA strip */}
        <div
          className="mt-14 rounded-[10px] px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ backgroundColor: `${colors.cream}07`, border: `1px solid ${colors.cream}10` }}
        >
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.28em] mb-1"
              style={{ fontFamily: fonts.syne, color: colors.orange }}
            >
              Stay in the loop
            </p>
            <p
              className="text-[15px]"
              style={{ fontFamily: fonts.bricolage, color: `${colors.cream}75` }}
            >
              Research updates, events, and investment briefs — straight to your inbox.
            </p>
          </div>
          <a
            href="mailto:hello@remadein.nl?subject=Newsletter%20Sign-Up"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-sm text-[13px] font-bold tracking-wide transition-opacity duration-200 hover:opacity-90"
            style={{ fontFamily: fonts.syne, backgroundColor: colors.orange, color: colors.cream }}
          >
            Get Updates
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* Divider */}
        <div className="mt-12 mb-8">
          <Divider />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p
            className="text-[12px]"
            style={{ fontFamily: fonts.syne, color: `${colors.cream}30` }}
          >
            © {year} Remade In Foundation. All rights reserved.
          </p>
          <p
            className="text-[12px]"
            style={{ fontFamily: fonts.syne, color: `${colors.cream}25` }}
          >
            Amsterdam · Accra · Rotterdam
          </p>
        </div>
      </div>
    </footer>
  )
}
