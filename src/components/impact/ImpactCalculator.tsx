'use client'

import { useMemo, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'

interface Calculator {
  carbonPerGarment: number
  waterPerGarment: number
  costPerGarment?: number
  sources?: string[]
}

interface Props {
  data?: Calculator
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const GRID_STYLE: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(${colors.white}08 1px, transparent 1px),
    linear-gradient(90deg, ${colors.white}08 1px, transparent 1px)
  `,
  backgroundSize: '80px 80px',
}

function sliderToGarments(v: number): number {
  return Math.round(Math.pow(10, (v / 100) * 6))
}

function garmentsToSlider(g: number): number {
  if (g <= 0) return 0
  return (Math.log10(g) / 6) * 100
}

const SLIDER_LABELS = ['1', '1K', '10K', '100K', '1M']

export default function ImpactCalculator({ data }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [garments, setGarments] = useState(1000)
  const [sliderVal, setSliderVal] = useState(garmentsToSlider(1000))

  const factors = data || { carbonPerGarment: 10.5, waterPerGarment: 633, costPerGarment: 8 }

  const results = useMemo(() => {
    const g = Math.max(0, garments)
    return {
      co2: g * factors.carbonPerGarment,
      water: g * factors.waterPerGarment,
      cost: factors.costPerGarment ? g * factors.costPerGarment : 0,
    }
  }, [garments, factors])

  function handleSlider(v: number) {
    setSliderVal(v)
    setGarments(sliderToGarments(v))
  }

  function handleInput(v: number) {
    const clamped = Math.max(0, v)
    setGarments(clamped)
    setSliderVal(garmentsToSlider(clamped))
  }

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease } } : {},
  })

  return (
    <section
      id="impact-calculator"
      ref={ref}
      className="relative overflow-hidden px-8 md:px-20 pt-20 pb-0"
      style={{ backgroundColor: colors.charcoal, ...GRID_STYLE }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 10% 80%, ${colors.orange}07 0, transparent 50%)`,
        }}
      />

      <div className="relative">
        {/* Eyebrow */}
        <motion.div {...anim(0)} className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px shrink-0" style={{ backgroundColor: colors.orange }} />
          <span
            className="font-bold uppercase tracking-[0.22em]"
            style={{ fontFamily: fonts.syne, fontSize: 10, color: colors.orange }}
          >
            Impact Calculator
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-0" style={{ borderTop: `1px solid ${colors.white}14` }}>
          {/* Left — input */}
          <motion.div
            {...anim(0.08)}
            className="lg:w-1/2 py-12 lg:pr-16"
            style={{ borderRight: `1px solid ${colors.white}14` }}
          >
            <h2
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: '-0.028em',
                color: colors.cream,
                marginBottom: 20,
              }}
            >
              Calculate your{' '}
              <em style={{ color: colors.orange, fontStyle: 'normal' }}>impact potential.</em>
            </h2>
            <p
              className="text-base mb-10"
              style={{ fontFamily: fonts.bricolage, color: `${colors.cream}88`, lineHeight: 1.8 }}
            >
              Adjust the slider or enter a count to estimate environmental impact. Estimates are
              based on verified pilot averages.
            </p>

            <label
              htmlFor="garments-input"
              className="text-xs font-bold uppercase tracking-[0.2em] block mb-3"
              style={{ fontFamily: fonts.syne, color: colors.orange, fontSize: 10 }}
            >
              Number of garments
            </label>

            {/* Number input */}
            <input
              id="garments-input"
              type="number"
              min={0}
              value={garments}
              onChange={(e) => handleInput(Number(e.target.value))}
              className="w-full px-5 py-4 text-lg transition-colors duration-200 focus:outline-none mb-5"
              style={{
                backgroundColor: `${colors.white}04`,
                color: colors.cream,
                border: `1px solid ${colors.white}14`,
                borderBottom: `2px solid ${colors.orange}`,
                fontFamily: fonts.bricolage,
                fontWeight: 700,
              }}
            />

            {/* Log-scale slider */}
            <input
              type="range"
              min={0}
              max={100}
              step={0.5}
              value={sliderVal}
              onChange={(e) => handleSlider(Number(e.target.value))}
              className="w-full h-1.5 cursor-pointer appearance-none rounded-full mb-2"
              style={{
                accentColor: colors.orange,
                background: `linear-gradient(90deg, ${colors.orange} ${sliderVal}%, rgba(255,255,255,0.1) ${sliderVal}%)`,
              }}
            />
            <div
              className="flex justify-between"
              style={{ fontFamily: fonts.syne, fontSize: 9, color: `${colors.cream}40`, letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {SLIDER_LABELS.map((l) => <span key={l}>{l}</span>)}
            </div>

            {data?.sources && (
              <p
                className="mt-8 text-xs"
                style={{ fontFamily: fonts.syne, color: `${colors.cream}44`, letterSpacing: '0.06em' }}
              >
                <span className="font-bold uppercase">Sources:</span> {data.sources.join(', ')}
              </p>
            )}
          </motion.div>

          {/* Right — results */}
          <motion.div {...anim(0.16)} className="lg:w-1/2 py-12 lg:pl-16 flex flex-col gap-0">
            {/* Result rows — tabular */}
            {[
              {
                label: 'CO₂ Avoided',
                value: results.co2.toLocaleString('en-US', { maximumFractionDigits: 0 }),
                unit: 'kg',
                show: true,
              },
              {
                label: 'Water Saved',
                value: results.water.toLocaleString('en-US', { maximumFractionDigits: 0 }),
                unit: 'L',
                show: true,
              },
              {
                label: 'Implementation Cost',
                value: `€${results.cost.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
                unit: '',
                show: !!(factors.costPerGarment && results.cost > 0),
              },
            ]
              .filter((r) => r.show)
              .map((row, i) => (
                <div
                  key={row.label}
                  className="py-8 flex flex-col gap-2"
                  style={{
                    borderBottom: `1px solid ${colors.white}14`,
                    borderTop: i === 0 ? `1px solid ${colors.white}14` : undefined,
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.syne,
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.16em',
                      color: `${colors.cream}44`,
                    }}
                  >
                    {row.label}
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span
                      style={{
                        fontFamily: fonts.bricolage,
                        fontSize: 'clamp(32px, 4vw, 52px)',
                        fontWeight: 900,
                        color: colors.orange,
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                      }}
                    >
                      {row.value}
                    </span>
                    {row.unit && (
                      <span
                        style={{
                          fontFamily: fonts.syne,
                          fontSize: 14,
                          color: `${colors.cream}55`,
                          textTransform: 'uppercase',
                          fontWeight: 700,
                        }}
                      >
                        {row.unit}
                      </span>
                    )}
                  </div>
                </div>
              ))}

            {/* Footnote */}
            <p
              className="mt-6 text-sm"
              style={{ fontFamily: fonts.bricolage, color: `${colors.cream}66`, lineHeight: 1.7 }}
            >
              Estimates based on <strong style={{ color: `${colors.cream}99` }}>verified pilot data</strong>.
              Figures will be updated as the program scales and receives independent audits.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mt-0" style={{ borderTop: `1px solid ${colors.white}08` }} />
    </section>
  )
}
