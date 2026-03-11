import { colors, fonts } from '@/lib/tokens'

const FALLBACK_ITEMS = [
  'Remanufacturing uses 15–20% of the energy of new production',
  'Remanufacture First. Recycle Later. Never Export.',
  '1,000,000 garments. Five years. Starting in the Netherlands.',
  'Circularity must scale justice, not extraction.',
  'Remade In',
  'Building our Circular Fashion Future',
]

export default function Ticker({ items }: { items?: string[] }) {
  const list = items?.length ? items : FALLBACK_ITEMS
  const doubled = [...list, ...list]
  return (
    <div
      className="relative overflow-hidden flex items-center"
      style={{
        backgroundColor: colors.orange,
        height: 68,
        transform: 'skewY(0deg)',
        zIndex: 20,
        top: -18,
        marginBottom: -18,
      }}
      aria-hidden="true"
    >
      <div
        className="ticker-track flex items-center whitespace-nowrap"
        style={{ transform: 'skewY(2deg)' }}
      >
        {(doubled as string[]).map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-10">
            <span
              className="text-[15px] font-bold tracking-wide"
              style={{ fontFamily: fonts.bricolage, color: colors.cream }}
            >
              {item}
            </span>
            <span style={{ color: `${colors.amber}aa`, fontSize: 18 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
