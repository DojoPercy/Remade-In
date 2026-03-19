'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'

const NAV_LINKS = [
  { label: 'The Blueprint', href: '/blueprint' },
  { label: 'Impact', href: 'impact' },
  { label: 'Research', href: '#research' },
  { label: 'Community', href: '#community' },
  { label: 'Partner With Us', href: '/partner' },
]

export default function Nav({ links }: { links?: { label: string; href: string }[] }) {
  const navLinks = links?.length ? links : NAV_LINKS
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-20 border-b"
      style={{
        height: 66,
        backgroundColor: colors.charcoal,
        borderColor: 'rgba(255,255,255,0.07)',
      }}
    >
      <a href="/" className="flex-shrink-0">
        <Image
          src="/images/logos/Remadein_Logo_White.png"
          alt="Remade In"
          width={140}
          height={28}
          className="h-7 w-auto object-contain"
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
            style={{ color: `${colors.cream}88` }}
            onMouseEnter={(e) => (e.currentTarget.style.color = colors.cream)}
            onMouseLeave={(e) => (e.currentTarget.style.color = `${colors.cream}88`)}
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
        <button
          aria-label="Search"
          className="hidden md:flex items-center justify-center rounded-full transition-colors duration-200"
          style={{ width: 36, height: 36, color: `${colors.cream}88` }}
          onMouseEnter={(e) => (e.currentTarget.style.color = colors.cream)}
          onMouseLeave={(e) => (e.currentTarget.style.color = `${colors.cream}88`)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        <motion.a
          href="#donate"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="text-[13px] font-bold px-5 py-2.5 rounded-sm tracking-wide"
          style={{
            fontFamily: fonts.syne,
            backgroundColor: colors.orange,
            color: colors.cream,
            boxShadow: `0 4px 18px ${colors.orange}55`,
          }}
        >
          Donate
        </motion.a>

        {/* Hamburger — mobile only */}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1.5"
          style={{ color: colors.cream }}
        >
          <span className={`block h-0.5 bg-current transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block h-0.5 bg-current transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col px-8 pb-10 md:hidden"
          style={{ backgroundColor: colors.charcoal, paddingTop: 90 }}
        >
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
                  color: colors.cream,
                  lineHeight: 1.1,
                }}
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#donate"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center py-4 rounded-sm text-sm font-bold tracking-wide"
            style={{ fontFamily: fonts.syne, backgroundColor: colors.orange, color: colors.cream }}
          >
            Donate
          </a>
        </div>
      )}
    </header>
  )
}
