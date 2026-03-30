// ── Primitive tokens ───────────────────────────────────────────────────────────
// Single source of truth for every color used across the site.
// Brand guide 2026.

export const colors = {
  // Primary brand colors
  blue:      '#6776b6',  // primary — headings, accents, can be used as background
  orange:    '#d8570f',  // primary — CTAs, highlight words; NOT for backgrounds
  dark:      '#2b2b22',  // primary — text and dark UI elements

  // Secondary brand colors (for backgrounds, boxes, shapes)
  lightBlue: '#d0e2ff',  // soft blue background / card surface
  green:     '#cbd183',  // secondary — especially for environmental topics
  peach:     '#f8cab8',  // secondary — warm background / boxes
  yellow:    '#f9dd79',  // secondary — accent background / boxes

  // Aliases kept for backward compat — map to nearest brand color
  charcoal:    '#2b2b22',  // → dark
  ink:         '#2b2b22',  // → dark
  cream:       '#f8cab8',  // → peach
  white:       '#ffffff',  // clean white surfaces
  amber:       '#f9dd79',  // → yellow
  cardSurface: '#d0e2ff',  // → lightBlue
} as const

export type ColorKey = keyof typeof colors

export const fonts = {
  apfel:     'var(--font-apfel), sans-serif',    // body text, subheadings
  bricolage: 'var(--font-bricolage), sans-serif', // headings, quotes
  // backward compat alias
  syne:      'var(--font-apfel), sans-serif',
} as const
