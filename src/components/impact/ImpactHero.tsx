import { colors, fonts } from '@/lib/tokens'

const TOTAL_GARMENTS = 1_000_000
const CURRENT_GARMENTS = 250
const PROGRESS_PCT = (CURRENT_GARMENTS / TOTAL_GARMENTS) * 100

export default function ImpactHero() {
  const progressAngle = PROGRESS_PCT * 3.6
  return (
    <section
      className="relative overflow-hidden px-8 md:px-20 pt-28 pb-20 md:pt-32"
      style={{ backgroundColor: colors.charcoal }}
    >
      {/* Background texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 30%, ${colors.orange}14 0, transparent 42%), radial-gradient(circle at 80% 5%, ${colors.amber}10 0, transparent 48%)`,
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.12em] mb-4"
          style={{ fontFamily: fonts.syne, color: `${colors.cream}88`, fontSize: 12 }}
        >
          Impact Transparency
        </p>

        <div className="flex flex-col lg:flex-row gap-10 lg:items-center justify-between">
          <div className="max-w-xl">
            <h1
              className="font-extrabold mb-6"
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(36px, 6vw, 72px)',
                lineHeight: 0.96,
                color: colors.white,
                letterSpacing: '-0.02em',
              }}
            >
              Progress to
              <span style={{ color: colors.orange }}> 1,000,000</span> garments.
            </h1>
            <p
              className="text-sm md:text-base"
              style={{ color: `${colors.cream}aa`, lineHeight: 1.8 }}
            >
              This page tracks our verified results in real time. Built for funders,
              partners, and the communities we serve -- with clear data, assumptions,
              and progress markers.
            </p>
          </div>

          {/* Progress gauge */}
          <div className="flex items-center gap-6">
            <div
              className="relative flex items-center justify-center"
              style={{
                width: 220,
                height: 220,
                borderRadius: '50%',
                background: `conic-gradient(${colors.orange} ${progressAngle}deg, rgba(255,255,255,0.08) 0deg)`,
              }}
            >
              <div
                className="flex flex-col items-center justify-center text-center"
                style={{
                  width: 170,
                  height: 170,
                  borderRadius: '50%',
                  backgroundColor: colors.charcoal,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.bricolage,
                    fontSize: 28,
                    fontWeight: 800,
                    color: colors.white,
                  }}
                >
                  {CURRENT_GARMENTS.toLocaleString()}
                </span>
                <span
                  style={{
                    fontFamily: fonts.syne,
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: `${colors.cream}88`,
                  }}
                >
                  of {TOTAL_GARMENTS.toLocaleString()}
                </span>
                <span
                  className="mt-2"
                  style={{
                    fontFamily: fonts.bricolage,
                    fontSize: 12,
                    color: `${colors.cream}88`,
                  }}
                >
                  {PROGRESS_PCT.toFixed(3)}%
                </span>
              </div>
            </div>

            <div className="hidden sm:flex flex-col gap-4">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-[0.12em]"
                  style={{ fontFamily: fonts.syne, color: `${colors.cream}66`, fontSize: 12 }}
                >
                  Updated
                </p>
                <p
                  style={{
                    fontFamily: fonts.bricolage,
                    fontSize: 16,
                    color: colors.white,
                    fontWeight: 700,
                  }}
                >
                  January 2025
                </p>
              </div>
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-[0.12em]"
                  style={{ fontFamily: fonts.syne, color: `${colors.cream}66`, fontSize: 12 }}
                >
                  Next update
                </p>
                <p
                  style={{
                    fontFamily: fonts.bricolage,
                    fontSize: 16,
                    color: colors.white,
                    fontWeight: 700,
                  }}
                >
                  April 2025
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-10 h-px"
          style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.02))' }}
        />
      </div>
    </section>
  )
}
