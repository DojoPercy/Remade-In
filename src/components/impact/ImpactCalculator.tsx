'use client'

import { useMemo, useState } from 'react'
import { colors, fonts } from '@/lib/tokens'

const FACTORS = {
  co2KgPerGarment: 2.5,
  waterLitresPerGarment: 200,
  wasteKgPerGarment: 0.1,
  costEurPerGarment: 8,
}

export default function ImpactCalculator() {
  const [garments, setGarments] = useState(1000)

  const results = useMemo(() => {
    const g = Math.max(0, garments)
    const co2 = g * FACTORS.co2KgPerGarment
    const water = g * FACTORS.waterLitresPerGarment
    const waste = g * FACTORS.wasteKgPerGarment
    const costBase = g * FACTORS.costEurPerGarment
    const costLow = Math.round(costBase * 0.8)
    const costHigh = Math.round(costBase * 1.2)
    return { co2, water, waste, costLow, costHigh }
  }, [garments])

  return (
    <section
      id="impact-calculator"
      className="px-8 md:px-20 pt-16 pb-24"
      style={{ backgroundColor: colors.charcoal }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.12em] mb-3"
          style={{ fontFamily: fonts.syne, color: colors.orange, fontSize: 12 }}
        >
          Impact Calculator
        </p>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-1/2">
            <h2
              className="font-extrabold mb-4"
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(28px, 4vw, 46px)',
                color: colors.white,
                letterSpacing: '-0.02em',
              }}
            >
              Calculate your impact potential.
            </h2>
            <p
              className="text-sm"
              style={{ fontFamily: fonts.bricolage, color: `${colors.cream}aa`, lineHeight: 1.8 }}
            >
              Estimates are based on current pilot averages and will be updated as
              third-party verification and new cohorts are added.
            </p>

            <div className="mt-8">
              <label
                htmlFor="garments-input"
                className="text-xs font-bold uppercase tracking-[0.12em]"
                style={{ fontFamily: fonts.syne, color: `${colors.cream}88`, fontSize: 12 }}
              >
                Number of garments
              </label>
              <input
                id="garments-input"
                type="number"
                min={0}
                value={garments}
                onChange={(e) => setGarments(Number(e.target.value))}
                className="mt-3 w-full rounded-xl px-4 py-3 text-base"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: colors.white,
                  border: '1px solid rgba(255,255,255,0.18)',
                  fontFamily: fonts.bricolage,
                }}
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="inline-flex items-center px-6 py-3 rounded-[6px] text-sm font-bold transition-opacity duration-200 hover:opacity-90"
                style={{
                  fontFamily: fonts.syne,
                  backgroundColor: colors.orange,
                  color: colors.cream,
                  letterSpacing: '0.06em',
                }}
              >
                Calculate Your Impact
              </button>
              <a
                href="#partner"
                className="inline-flex items-center px-6 py-3 rounded-[6px] text-sm font-bold border transition-all duration-200 hover:bg-white/10"
                style={{
                  fontFamily: fonts.syne,
                  borderColor: 'rgba(255,255,255,0.4)',
                  color: colors.white,
                  letterSpacing: '0.06em',
                }}
              >
                Contact us for partnership
              </a>
            </div>
          </div>

          <div
            className="lg:w-1/2 rounded-3xl border p-6"
            style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultCard label="CO2 Saved" value={`${results.co2.toLocaleString()} kg`} />
              <ResultCard label="Water Saved" value={`${results.water.toLocaleString()} L`} />
              <ResultCard label="Waste Diverted" value={`${results.waste.toLocaleString()} kg`} />
              <ResultCard label="Estimated Cost" value={`€${results.costLow.toLocaleString()}-€${results.costHigh.toLocaleString()}`} />
            </div>

            <p
              className="mt-6 text-xs"
              style={{ fontFamily: fonts.bricolage, color: `${colors.cream}88`, lineHeight: 1.6 }}
            >
              Assumptions (2025 pilot averages): 2.5kg CO2, 200L water, 0.1kg
              waste diverted, €8 cost per garment. Update as verified datasets
              are published.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(255,255,255,0.02)',
      }}
    >
      <p
        style={{
          fontFamily: fonts.syne,
          fontSize: 12,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: `${colors.cream}88`,
        }}
      >
        {label}
      </p>
      <p
        className="mt-2"
        style={{
          fontFamily: fonts.bricolage,
          fontSize: 20,
          fontWeight: 800,
          color: colors.white,
        }}
      >
        {value}
      </p>
    </div>
  )
}
