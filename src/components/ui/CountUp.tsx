'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useInView, animate } from 'framer-motion'

// ── Types ──────────────────────────────────────────────────────────────────────

interface CountUpProps {
  /** Target number to count up to */
  to: number
  /** Animation duration in seconds. Default: 2 */
  duration?: number
  /** Custom easing. Default: easeOut */
  ease?: string | number[]
  /**
   * Format the rounded integer before display.
   * Default: locale string with commas (e.g. 1,000,000)
   */
  format?: (value: number) => string
  className?: string
}

// ── Component ──────────────────────────────────────────────────────────────────

/**
 * CountUp — scroll-triggered animated number counter.
 *
 * Counts from 0 to `to` when the element enters the viewport.
 * Built entirely on Framer Motion — no extra dependencies.
 *
 * Usage:
 *   <CountUp to={1000000} duration={2.2} />
 */
export default function CountUp({
  to,
  duration = 2,
  ease = 'easeOut',
  format = (n) => n.toLocaleString(),
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  const count = useMotionValue(0)
  // Round to integer and apply formatter
  const display = useTransform(count, (v) => format(Math.round(v)))

  useEffect(() => {
    if (!isInView) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controls = animate(count, to, { duration, ease } as any)
    return () => controls.stop()
  }, [isInView, to, duration, ease, count])

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}
