'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { colors, fonts } from '@/lib/tokens'
import BlobButton from '@/components/ui/BlobButton'

const NAV_LINKS = [
  { label: 'The Blueprint', href: '/blueprint' },
  { label: 'About Us',      href: '/about'     },
  { label: 'Stories',       href: '/stories'   },
  { label: 'Partner With Us', href: '/partner' },
]

export default function Nav({ links }: { links?: { label: string; href: string }[] }) {
  const navLinks = links?.length ? links : NAV_LINKS
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const bg        = scrolled ? 'rgba(247,246,242,0.97)' : 'transparent'
  const border    = scrolled ? 'rgba(26,26,20,0.08)'    : 'transparent'
  const linkColor = scrolled ? `${colors.charcoal}88`   : `${colors.cream}88`
  const linkHover = scrolled ? colors.charcoal           : colors.cream
  const hamColor  = scrolled ? colors.charcoal           : colors.cream

  return (
    <>
      {/* ── Nav bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-20 border-b transition-[background-color,border-color] duration-300"
        style={{
          height: 66,
          backgroundColor: bg,
          borderColor: border,
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
        }}
      >
        <a href="/" className="flex-shrink-0">
          <Image
            src={scrolled ? '/images/logos/Remadein_Logo_Black.png' : '/images/logos/Remadein_Logo_White.png'}
            alt="Remade In"
            width={140}
            height={28}
            className="h-6 md:h-7 w-auto object-contain transition-opacity duration-300"
            priority
          />
        </a>

        <nav
          className="hidden md:flex items-center gap-7"
          style={{ fontFamily: fonts.bricolage, fontSize: 15 }}
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="relative group pb-0.5 transition-colors duration-200"
              style={{ color: linkColor }}
              onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
              onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
            >
              {label}
              <span
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: colors.orange }}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <BlobButton href="https://buy.stripe.com/aFaaEX6j82rady26My48000" variant="solid" size="sm">
            Donate
          </BlobButton>

          {/* Hamburger — mobile only */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1.5 transition-colors duration-300"
            style={{ color: hamColor }}
          >
            <span className="block h-0.5 bg-current transition-all duration-300 origin-center" />
            <span className="block h-0.5 bg-current transition-all duration-300" />
            <span className="block h-0.5 bg-current transition-all duration-300 origin-center" />
          </button>
        </div>
      </header>

      {/* ── Mobile menu overlay — outside header to avoid backdropFilter containing-block bug ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col px-8 pb-10 md:hidden"
          style={{ backgroundColor: colors.white, paddingTop: 24 }}
        >
          {/* Top row: logo + close button */}
          <div className="flex items-center justify-between mb-10" style={{ height: 42 }}>
            <a href="/" onClick={() => setMenuOpen(false)}>
              <Image
                src="/images/logos/Remadein_Logo_Black.png"
                alt="Remade In"
                width={120}
                height={24}
                className="h-6 w-auto object-contain"
              />
            </a>
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="flex flex-col justify-center gap-[5px] w-9 h-9 p-1.5"
              style={{ color: colors.charcoal }}
            >
              <span className="block h-0.5 bg-current rotate-45 translate-y-[7px] origin-center" />
              <span className="block h-0.5 bg-current opacity-0" />
              <span className="block h-0.5 bg-current -rotate-45 -translate-y-[7px] origin-center" />
            </button>
          </div>

          <nav className="flex flex-col gap-8 flex-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-bold"
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 'clamp(24px, 6vw, 32px)',
                  color: colors.charcoal,
                  lineHeight: 1.1,
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          <BlobButton href="#donate" variant="solid" onClick={() => setMenuOpen(false)}>
            Donate
          </BlobButton>
        </div>
      )}
    </>
  )
}
