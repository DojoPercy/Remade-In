'use client'

import { useState } from 'react'
import { colors, fonts } from '@/lib/tokens'

const REGIONS = [
  {
    id: 'amsterdam',
    name: 'Amsterdam, NL',
    status: 'Active hub',
    detail: 'Pilot remanufacturing and partner coordination.',
    position: { top: '32%', left: '56%' },
  },
  {
    id: 'rotterdam',
    name: 'Rotterdam, NL',
    status: 'Partner city',
    detail: 'Community events and regional intake.',
    position: { top: '42%', left: '60%' },
  },
  {
    id: 'kantamanto',
    name: 'Kantamanto, GH',
    status: 'Core ecosystem',
    detail: 'Primary community of makers and skills exchange.',
    position: { top: '72%', left: '38%' },
  },
  {
    id: 'future',
    name: 'Future hubs',
    status: 'Aspirational',
    detail: 'Target cities in West Europe and West Africa.',
    position: { top: '60%', left: '72%' },
  },
]

export default function ImpactMap() {
  const [active, setActive] = useState(REGIONS[0])

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
          Geographic Reach
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
          Connected hubs, shared accountability.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8">
          <div
            className="relative rounded-3xl border overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
              borderColor: 'rgba(255,255,255,0.08)',
              minHeight: 360,
            }}
          >
            {/* Map backdrop */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08) 0, transparent 45%),
                  radial-gradient(circle at 70% 65%, rgba(255,255,255,0.07) 0, transparent 50%)`,
              }}
            />

            {/* Connection line */}
            <svg className="absolute inset-0" viewBox="0 0 600 400" preserveAspectRatio="none">
              <path
                d="M340 120 C 360 160, 380 190, 410 210 C 430 224, 430 240, 410 250 C 340 280, 280 310, 230 330"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                strokeDasharray="6 8"
              />
            </svg>

            {REGIONS.map((region) => {
              const isActive = active.id === region.id
              const isFuture = region.id === 'future'
              return (
                <button
                  key={region.id}
                  onClick={() => setActive(region)}
                  className="absolute flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold"
                  style={{
                    top: region.position.top,
                    left: region.position.left,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: isActive
                      ? colors.orange
                      : isFuture
                        ? 'rgba(255,255,255,0.12)'
                        : 'rgba(26,26,20,0.8)',
                    color: isActive ? colors.white : colors.cream,
                    fontFamily: fonts.syne,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    border: isActive ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${isFuture ? '' : 'pulse-dot'}`}
                    style={{
                      backgroundColor: isActive ? colors.white : colors.orange,
                      opacity: isFuture ? 0.4 : 1,
                    }}
                  />
                  {region.name}
                </button>
              )
            })}
          </div>

          <div
            className="rounded-3xl border p-6"
            style={{
              borderColor: 'rgba(255,255,255,0.08)',
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.12em]"
              style={{ fontFamily: fonts.syne, color: `${colors.cream}88`, fontSize: 12 }}
            >
              Region Details
            </p>
            <h3
              className="mt-4"
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 24,
                color: colors.white,
                fontWeight: 800,
              }}
            >
              {active.name}
            </h3>
            <p
              className="mt-2"
              style={{ fontFamily: fonts.syne, color: colors.orange, fontSize: 13, letterSpacing: '0.08em' }}
            >
              {active.status}
            </p>
            <p
              className="mt-4 text-sm"
              style={{ fontFamily: fonts.bricolage, color: `${colors.cream}aa`, lineHeight: 1.7 }}
            >
              {active.detail}
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {REGIONS.map((region) => (
                <button
                  key={`list-${region.id}`}
                  onClick={() => setActive(region)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors"
                  style={{
                    fontFamily: fonts.bricolage,
                    backgroundColor: active.id === region.id ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                    color: active.id === region.id ? colors.white : `${colors.cream}cc`,
                  }}
                >
                  <span>{region.name}</span>
                  <span style={{ fontSize: 12, color: `${colors.cream}88` }}>{region.status}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
