// SectionDivider — diagonal blending wedge between adjacent sections.
// Sits at the bottom of a section and "ramps" into the next section's colour.
// Usage: place as the last child inside a `relative overflow-hidden` section.

interface SectionDividerProps {
  /** The colour of the NEXT section (what we're ramping into) */
  fill: string
  /** Height of the wedge in px. Default: 56 */
  height?: number
  /** Which corner the ramp rises from. Default: 'left' (/ shape) */
  direction?: 'left' | 'right'
}

export default function SectionDivider({
  fill,
  height = 56,
  direction = 'left',
}: SectionDividerProps) {
  const points =
    direction === 'left'
      ? `0 ${height}, 100% 0, 100% ${height}` // /  shape
      : `0 0, 100% ${height}, 100% ${height}, 0 ${height}` // \  shape

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 right-0"
      style={{ height }}
    >
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <polygon points={points} fill={fill} />
      </svg>
    </div>
  )
}
