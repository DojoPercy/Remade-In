'use client'

import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'

// ── Variants ───────────────────────────────────────────────────────────────────

const containerVariants = (delayChildren: number, stagger: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

const wordVariants = {
  hidden: { y: '105%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

// ── Types ──────────────────────────────────────────────────────────────────────

interface SplitTextProps {
  text: string
  className?: string
  style?: CSSProperties
  /** Delay (seconds) before the first word starts animating. Default: 0 */
  delay?: number
  /** Stagger interval (seconds) between each word. Default: 0.09 */
  stagger?: number
  /** Trigger on mount (true) or when element enters viewport (false). Default: false */
  onMount?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────────

/**
 * SplitText — word-by-word sliding reveal.
 *
 * Each word slides up from behind an `overflow: hidden` mask,
 * creating an editorial "curtain lift" effect with zero extra dependencies.
 *
 * Usage:
 *   <SplitText text="Building our Circular Fashion" delay={0.25} />
 */
export default function SplitText({
  text,
  className,
  style,
  delay = 0,
  stagger = 0.09,
  onMount = false,
}: SplitTextProps) {
  const words = text.split(' ')

  const animateProps = onMount
    ? { initial: 'hidden', animate: 'visible' }
    : { initial: 'hidden', whileInView: 'visible', viewport: { once: true } }

  return (
    <motion.span
      className={className}
      style={{ display: 'inline', ...style }}
      variants={containerVariants(delay, stagger)}
      {...animateProps}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.15em' }}
        >
          <motion.span
            style={{ display: 'inline-block', marginRight:'5px' }}
            variants={wordVariants}
          >
            {word}
          </motion.span>
          {/* Preserve space between words */}
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </motion.span>
  )
}
