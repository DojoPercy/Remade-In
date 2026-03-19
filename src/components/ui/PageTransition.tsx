'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { animate } from 'framer-motion'
import { colors } from '@/lib/tokens'

export default function PageTransition() {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const isFirst = useRef(true)

  useEffect(() => {
    // Skip the very first render — no wipe on initial load
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    const el = overlayRef.current
    if (!el) return

    // 1. Slide in from right → covers screen
    animate(el, { x: ['100%', '0%'] }, { duration: 0.38, ease: [0.76, 0, 0.24, 1] })
      .then(() =>
        // 2. Brief pause, then slide out to left → reveals new page
        animate(el, { x: ['0%', '-100%'] }, { duration: 0.42, ease: [0.76, 0, 0.24, 1], delay: 0.08 })
      )
      .then(() =>
        // 3. Reset off-screen right (instant) ready for next transition
        animate(el, { x: '100%' }, { duration: 0 })
      )
  }, [pathname])

  return (
    <div
      ref={overlayRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: colors.charcoal,
        zIndex: 9998,
        transform: 'translateX(100%)',
        pointerEvents: 'none',
      }}
    />
  )
}
