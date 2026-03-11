'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Why Remanufacturing', href: '#why' },
  { label: 'Impact', href: '#impact' },
  { label: 'Research & Stories', href: '#research' },
  { label: 'Partnerships', href: '#partnerships' },
]

export default function Nav({ links }: { links?: { label: string; href: string }[] }) {
  const navLinks = links?.length ? links : NAV_LINKS
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.1)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-20 border-b"
      style={{
        height: 66,
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        backgroundColor: scrolled ? 'transparent' : 'transparent',
        borderColor: scrolled ? 'rgba(255,255,255,0.07)' : 'transparent',
        transition: 'background-color 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease',
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
          className="flex items-center justify-center rounded-full transition-colors duration-200"
          style={{ width: 36, height: 36, color: `${colors.cream}88` }}
          onMouseEnter={(e) => (e.currentTarget.style.color = colors.cream)}
          onMouseLeave={(e) => (e.currentTarget.style.color = `${colors.cream}88`)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
      </div>
    </header>
  )
}
