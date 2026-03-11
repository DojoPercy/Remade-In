// ── Primitive tokens ───────────────────────────────────────────────────────────
// Single source of truth for every color used across the site.
// Semantic names: charcoal/cream/white describe what they ARE, not a wrong hue.

export const colors = {
  // Brand action
  orange:      '#E8330A',  // primary CTA, accents, underlines — deep orange-red
  amber:       '#FFD012',  // ticker separator — golden yellow

  // Neutral surfaces (two dark, two light)
  charcoal:    '#1A1A14',  // dark sections — near-black with green undertone
  cream:       '#F9E8D0',  // warm light — text on dark bg, CommunityVoice section bg
  white:       '#fefefe',  // pure light sections — WeAreTheGlue, ResearchArchive

  // Component-level
  cardSurface: '#F3EDE2',  // research/archive card paper body — warm off-white
} as const

export type ColorKey = keyof typeof colors

export const fonts = {
  syne:      'var(--font-syne), sans-serif',
  bricolage: 'var(--font-bricolage), sans-serif',
} as const
