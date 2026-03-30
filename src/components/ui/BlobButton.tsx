'use client'

import { useRef } from 'react'
import { motion, useSpring, easeInOut } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'

// ── Types ──────────────────────────────────────────────────────────────────────

type Variant = 'solid' | 'ghost' | 'dark'
type Size    = 'sm' | 'md'

interface BlobButtonProps {
  children:   React.ReactNode
  href?:      string
  onClick?:   () => void
  variant?:   Variant
  size?:      Size
  external?:  boolean
  className?: string
  style?:     React.CSSProperties
  disabled?:  boolean
}

// Always a perfect pill — organic life comes from subtle scaleY/scaleX breathing

// ── Variant styles ─────────────────────────────────────────────────────────────

const VARIANTS: Record<Variant, {
  bg: string; color: string; border?: string; shadow: string; hoverShadow: string
}> = {
  solid: {
    bg:          colors.orange,
    color:       '#ffffff',
    shadow:      `0 4px 20px ${colors.orange}44`,
    hoverShadow: `0 8px 32px ${colors.orange}60`,
  },
  ghost: {
    bg:          'transparent',
    color:       `${colors.cream}cc`,
    border:      `1.5px solid ${colors.cream}30`,
    shadow:      'none',
    hoverShadow: 'none',
  },
  dark: {
    bg:          colors.charcoal,
    color:       '#ffffff',
    shadow:      '0 4px 20px rgba(0,0,0,0.25)',
    hoverShadow: '0 8px 28px rgba(0,0,0,0.35)',
  },
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-[12px]',
  md: 'px-8 py-4 text-[13px]',
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function BlobButton({
  children,
  href,
  onClick,
  variant  = 'solid',
  size     = 'md',
  external = false,
  className = '',
  style,
  disabled,
}: BlobButtonProps) {
  const v = VARIANTS[variant]

  // Magnetic pull only
  const ref = useRef<HTMLElement>(null)
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.5 })
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.5 })

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    x.set((e.clientX - cx) * 0.35)
    y.set((e.clientY - cy) * 0.35)
  }
  function onMouseLeave() {
    x.set(0); y.set(0)
  }

  const sharedMotionProps = {
    style: {
      x, y,
      borderRadius:    '9999px',
      fontFamily:      fonts.apfel,
      fontWeight:      700,
      letterSpacing:   '0.04em',
      backgroundColor: v.bg,
      color:           v.color,
      border:          v.border,
      boxShadow:       v.shadow,
      cursor:          disabled ? 'not-allowed' : 'pointer',
      opacity:         disabled ? 0.5 : 1,
      display:         'inline-flex',
      alignItems:      'center',
      justifyContent:  'center',
      gap:             8,
      whiteSpace:      'nowrap' as const,
      ...style,
    },
    className: `${SIZE_CLASSES[size]} font-bold tracking-wide ${className}`,
    // Pill shape always; subtle squish cycle gives the "alive" feel
    animate: {
      scaleY: [1, 1.06, 0.96, 1.04, 1],
      scaleX: [1, 0.97, 1.03, 0.98, 1],
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: easeInOut,
      times: [0, 0.25, 0.5, 0.75, 1],
    },
    whileTap: { scale: 0.95 },
    onMouseMove,
    onMouseLeave,
  }

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...sharedMotionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      disabled={disabled}
      {...sharedMotionProps}
    >
      {children}
    </motion.button>
  )
}
