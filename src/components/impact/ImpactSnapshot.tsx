import { colors, fonts } from '@/lib/tokens'

const SNAPSHOT = [
  { label: 'Textile Waste Diverted', value: '~250kg' },
  { label: 'CO2 Emissions Avoided', value: '~6,250kg' },
  { label: 'Water Saved', value: '~500,000 Litres' },
  { label: 'Community Investment', value: '€10,280' },
  { label: 'Events Hosted', value: '12 events' },
  { label: 'Participants Reached', value: '3,200+' },
  { label: 'Social Engagement', value: '250,000+' },
  { label: 'Research Accepted', value: '1 of 2 proposals' },
]

export default function ImpactSnapshot() {
  return (
    <section
      className="px-8 md:px-20 pt-16 pb-24"
      style={{ backgroundColor: colors.charcoal }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.12em] mb-3"
          style={{ fontFamily: fonts.syne, color: colors.orange, fontSize: 12 }}
        >
          2025 Impact Snapshot
        </p>
        <h2
          className="font-extrabold mb-10"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(28px, 4vw, 46px)',
            color: colors.cream,
            letterSpacing: '-0.02em',
          }}
        >
          Transparent metrics for partners and communities.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SNAPSHOT.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border p-5"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              <p
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 20,
                  fontWeight: 800,
                  color: colors.white,
                }}
              >
                {item.value}
              </p>
              <p
                className="mt-2 text-sm"
                style={{
                  fontFamily: fonts.syne,
                  color: `${colors.cream}aa`,
                  letterSpacing: '0.02em',
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
