import { colors, fonts } from '@/lib/tokens'

const MILESTONES = [
  { year: '2023', label: 'Research + pilot design', status: 'past' },
  { year: '2024', label: 'Community pilots launched', status: 'past' },
  { year: '2025', label: 'Impact reporting + scale plan', status: 'current' },
  { year: '2026', label: 'Regional hubs activation', status: 'future' },
  { year: '2030', label: 'Multi-city remanufacturing network', status: 'future' },
  { year: '2035', label: '1M garments target achieved', status: 'future' },
]

export default function ImpactTimeline() {
  return (
    <section
      className="px-8 md:px-20 pt-16 pb-24"
      style={{ backgroundColor: colors.charcoal }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.12em] mb-3"
          style={{ fontFamily: fonts.syne, color: `${colors.cream}88`, fontSize: 12 }}
        >
          Impact Over Time
        </p>
        <h2
          className="font-extrabold mb-10"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(28px, 4vw, 46px)',
            color: colors.white,
            letterSpacing: '-0.02em',
          }}
        >
          From pilot to scale -- with transparent milestones.
        </h2>

        <div
          className="rounded-3xl border p-6"
          style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)' }}
        >
          <div className="flex flex-col gap-6">
            {MILESTONES.map((milestone, index) => {
              const isFuture = milestone.status === 'future'
              const isCurrent = milestone.status === 'current'
              return (
                <div key={milestone.year} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 18,
                        height: 18,
                        backgroundColor: isCurrent ? colors.orange : isFuture ? 'rgba(255,255,255,0.2)' : colors.cream,
                        border: isFuture ? '1px dashed rgba(255,255,255,0.4)' : 'none',
                      }}
                    />
                    {index < MILESTONES.length - 1 && (
                      <span
                        aria-hidden="true"
                        style={{
                          width: 2,
                          height: 44,
                          marginTop: 6,
                          background: isFuture ? 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.35) 4px, transparent 4px, transparent 8px)' : 'rgba(255,255,255,0.15)',
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: fonts.syne,
                        fontSize: 12,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: isCurrent ? colors.orange : `${colors.cream}88`,
                      }}
                    >
                      {milestone.year}
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        fontFamily: fonts.bricolage,
                        color: colors.white,
                        fontWeight: 700,
                      }}
                    >
                      {milestone.label}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <p
            className="mt-8 text-sm"
            style={{ fontFamily: fonts.bricolage, color: `${colors.cream}99`, lineHeight: 1.7 }}
          >
            Projections beyond 2025 are modeled scenarios. They will be updated as
            funding commitments and capacity expand.
          </p>
        </div>
      </div>
    </section>
  )
}
