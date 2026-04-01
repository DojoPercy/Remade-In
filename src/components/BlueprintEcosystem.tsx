'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ── Data ──────────────────────────────────────────────────────────────────────

interface Stakeholder {
  id: string
  label: string
  role: string
  photo: string
  isHub?: boolean
  isDesigner?: boolean
  gridCol: number
  benefits: string[]
}

const MAIN_NODES: Stakeholder[] = [
  {
    id: 'communities',
    label: 'End Communities',
    role: 'Origin of materials & voice',
    photo: '/Events/KantamantoHomecoming_By_6.jpg',
    gridCol: 1,
    benefits: [
      'Gain a voice in what they wear',
      'Access higher quality clothing at lower cost',
      'Ethically sourced, locally processed garments',
    ],
  },
  {
    id: 'sorters',
    label: 'Sorters',
    role: 'Processing & categorisation',
    photo: '/Events/250830-Fashion Week-Kantamanto Social Club_RT-4.jpg',
    gridCol: 3,
    benefits: [
      'Sort smarter with design knowledge and visual patterns',
      'Increase margins through better categorisation decisions',
      'Simple, guided processes reduce expertise required',
    ],
  },
  {
    id: 'atelier',
    label: 'Social Sewing Atelier',
    role: 'Production hub — engine of the system',
    photo: '/Upcyclers/KSCxBenBreuer-34.jpg',
    gridCol: 5,
    isHub: true,
    benefits: [
      'Stable, local production opportunities',
      'Access to higher-value small-batch manufacturing models',
      'Dignified employment within the circular economy',
    ],
  },
  {
    id: 'brands',
    label: 'Brands & Retailers',
    role: 'Market & distribution',
    photo: '/Events/TSHRotterdam_KantamantoSocialClub_stehlestories-22.png',
    gridCol: 7,
    benefits: [
      'New customers through story-driven, unique products',
      'Lower costs via distributed manufacturing',
      'Transparent, fully traceable production chain',
      'Test smaller batches with significantly less risk',
      'Coordinated design feedback reduces sampling time',
    ],
  },
  {
    id: 'consumers',
    label: 'Consumers',
    role: 'End market',
    photo: '/Events/stehlestories_TSHAmsterdam_RethinkBlackFriday-17.jpg',
    gridCol: 9,
    benefits: [
      'Access unique garments with verified provenance',
      'Join a community contributing to a transparent ecosystem',
      'Align purchasing with environmental and ethical values',
    ],
  },
]

const DESIGNERS: Stakeholder = {
  id: 'designers',
  label: 'Designers',
  role: 'Creative direction & design intelligence',
  photo: '/Upcyclers/KSCxBenBreuer-125.jpg',
  gridCol: 5,
  isDesigner: true,
  benefits: [
    'Central creative influence over the entire system',
    'Connect production with brand and community needs',
    'Design intelligence embedded into every garment',
  ],
}

const ALL_NODES = [DESIGNERS, ...MAIN_NODES]

// ── Node card ─────────────────────────────────────────────────────────────────

function NodeCard({
  node,
  isSelected,
  onClick,
}: {
  node: Stakeholder
  isSelected: boolean
  onClick: () => void
}) {
  const bg = node.isHub
    ? colors.orange
    : node.isDesigner
    ? colors.blue
    : colors.lightBlue

  const textColor = node.isHub || node.isDesigner ? '#ffffff' : colors.charcoal
  const roleColor =
    node.isHub || node.isDesigner ? 'rgba(255,255,255,0.52)' : `${colors.charcoal}55`

  const ringColor = node.isHub
    ? 'rgba(255,255,255,0.5)'
    : node.isDesigner
    ? 'rgba(255,255,255,0.45)'
    : colors.charcoal

  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-all duration-200 focus:outline-none"
      style={{
        backgroundColor: bg,
        borderRadius: 12,
        padding: '14px 14px 16px',
        boxShadow: isSelected
          ? `0 0 0 2.5px ${colors.ink}, 0 10px 28px rgba(0,0,0,0.2)`
          : '0 2px 8px rgba(0,0,0,0.08)',
        transform: isSelected ? 'translateY(-3px)' : 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {/* Circular photo thumbnail */}
      <div
        className="relative mb-3"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `2px solid ${ringColor}`,
          flexShrink: 0,
        }}
      >
        <Image
          src={node.photo}
          alt=""
          fill
          className="object-cover object-top"
          sizes="36px"
          aria-hidden
        />
      </div>

      <p
        style={{
          fontFamily: fonts.syne,
          fontSize: 9,
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.13em',
          color: roleColor,
          marginBottom: 4,
          lineHeight: 1.4,
        }}
      >
        {node.role}
      </p>
      <p
        style={{
          fontFamily: fonts.bricolage,
          fontSize: 13,
          fontWeight: 700,
          lineHeight: 1.3,
          color: textColor,
        }}
      >
        {node.label}
      </p>
    </button>
  )
}

// ── Arrow ─────────────────────────────────────────────────────────────────────

function FlowArrow() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <svg width="28" height="14" viewBox="0 0 28 14" fill="none" aria-hidden>
        <line x1="0" y1="7" x2="20" y2="7" stroke={colors.orange} strokeWidth="1.5" />
        <polyline
          points="14,2 20,7 14,12"
          stroke={colors.orange}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function BlueprintEcosystem() {
  const [selected, setSelected] = useState<string>('atelier')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const activeNode = ALL_NODES.find((n) => n.id === selected)!

  return (
    <section
      ref={ref}
      className="px-8 md:px-20 py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: `${colors.lightBlue}40` }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.55, ease } } : {}}
        className="mb-16"
      >
        <p
          className="mb-3 text-[15px] font-bold uppercase tracking-[0.28em]"
          style={{ fontFamily: fonts.syne, color: colors.orange }}
        >
          The System
        </p>
        <h2
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(26px, 3.5vw, 50px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: colors.ink,
            maxWidth: 600,
          }}
        >
          Six Stakeholders.{' '}
          <em style={{ color: colors.orange, fontStyle: 'italic' }}>One Circular Loop.</em>
        </h2>
        <p
          className="mt-4 max-w-lg"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            lineHeight: 1.75,
            color: `${colors.ink}60`,
          }}
        >
          The blueprint maps a living ecosystem — from discarded garments to finished
          products, connecting communities, skills, and markets. Select any stakeholder
          to see what they gain.
        </p>
      </motion.div>

      {/* ── Desktop diagram (lg+) ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1, ease } } : {}}
        className="hidden lg:block mb-10"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 44px 1fr 44px 1fr 44px 1fr 44px 1fr',
            gridTemplateRows: 'auto 36px auto',
          }}
        >
          {/* Designers — row 1, col 5 */}
          <div style={{ gridColumn: 5, gridRow: 1 }}>
            <NodeCard
              node={DESIGNERS}
              isSelected={selected === 'designers'}
              onClick={() => setSelected('designers')}
            />
          </div>

          {/* Dashed connector — row 2, col 5 */}
          <div
            style={{
              gridColumn: 5,
              gridRow: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 0,
                height: '100%',
                borderLeft: `2px dashed ${colors.orange}`,
                opacity: 0.4,
              }}
            />
          </div>

          {/* Main flow nodes — row 3 */}
          {MAIN_NODES.map((node) => (
            <div key={node.id} style={{ gridColumn: node.gridCol, gridRow: 3 }}>
              <NodeCard
                node={node}
                isSelected={selected === node.id}
                onClick={() => setSelected(node.id)}
              />
            </div>
          ))}

          {/* Arrows — row 3, even cols */}
          {[2, 4, 6, 8].map((col) => (
            <div
              key={col}
              style={{ gridColumn: col, gridRow: 3, display: 'flex', alignItems: 'center' }}
            >
              <FlowArrow />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-5">
          <div style={{ width: 28, height: 1, backgroundColor: `${colors.ink}18` }} />
          <p
            style={{
              fontFamily: fonts.syne,
              fontSize: 9,
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.22em',
              color: `${colors.ink}28`,
            }}
          >
            Material & value flow →
          </p>
        </div>
      </motion.div>

      {/* ── Mobile accordion ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1, ease } } : {}}
        className="lg:hidden flex flex-col gap-2 mb-10"
      >
        {ALL_NODES.map((node) => {
          const isOpen = selected === node.id
          const bg = node.isHub
            ? colors.orange
            : node.isDesigner
            ? colors.blue
            : colors.lightBlue
          const activeText = node.isHub || node.isDesigner ? '#ffffff' : colors.charcoal
          const activeRole =
            node.isHub || node.isDesigner ? 'rgba(255,255,255,0.52)' : `${colors.charcoal}55`

          return (
            <div key={node.id}>
              <button
                onClick={() => setSelected(node.id)}
                className="w-full flex items-center gap-3 p-4 rounded-[10px] text-left focus:outline-none transition-all duration-200"
                style={{
                  backgroundColor: isOpen ? bg : `${colors.lightBlue}28`,
                  border: `1px solid ${isOpen ? 'transparent' : `${colors.lightBlue}55`}`,
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    position: 'relative',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: `2px solid ${isOpen ? 'rgba(255,255,255,0.4)' : colors.lightBlue}`,
                  }}
                >
                  <Image
                    src={node.photo}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="36px"
                    aria-hidden
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    style={{
                      fontFamily: fonts.bricolage,
                      fontSize: 15,
                      fontWeight: 700,
                      color: isOpen ? activeText : colors.ink,
                    }}
                  >
                    {node.label}
                  </p>
                  <p
                    style={{
                      fontFamily: fonts.syne,
                      fontSize: 10,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.12em',
                      color: isOpen ? activeRole : `${colors.ink}45`,
                      marginTop: 1,
                    }}
                  >
                    {node.role}
                  </p>
                </div>

                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <polyline
                    points="3,5 8,11 13,5"
                    stroke={isOpen ? activeText : colors.ink}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isOpen && (
                <div
                  className="mt-1 rounded-[10px] overflow-hidden"
                  style={{
                    border: `1px solid ${colors.lightBlue}`,
                  }}
                >
                  {/* Photo strip */}
                  <div className="relative w-full" style={{ height: 160 }}>
                    <Image
                      src={node.photo}
                      alt={node.label}
                      fill
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, rgba(208,225,255,0.9) 0%, transparent 50%)',
                      }}
                    />
                  </div>

                  {/* Benefits */}
                  <div
                    className="p-4"
                    style={{ backgroundColor: colors.white }}
                  >
                    <ul className="flex flex-col gap-2.5">
                      {node.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5"
                          style={{
                            fontFamily: fonts.bricolage,
                            fontSize: 14,
                            lineHeight: 1.6,
                            color: colors.ink,
                          }}
                        >
                          <span
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: '50%',
                              backgroundColor: colors.orange,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: 2,
                            }}
                          >
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                              <polyline
                                points="1,3 3,5 7,1"
                                stroke="white"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </motion.div>

      {/* ── Benefit panel — desktop ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease } }}
          exit={{ opacity: 0, y: -6, transition: { duration: 0.18 } }}
          className="hidden lg:flex rounded-[14px] overflow-hidden"
          style={{
            border: `1px solid ${colors.lightBlue}`,
            minHeight: 220,
          }}
        >
          {/* Photo — left column */}
          <div
            className="relative shrink-0"
            style={{ width: 240 }}
          >
            <Image
              src={activeNode.photo}
              alt={activeNode.label}
              fill
              className="object-cover object-center"
              sizes="240px"
            />
            {/* Subtle gradient fade into panel */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, transparent 55%, ${colors.lightBlue}70 100%)`,
              }}
            />
          </div>

          {/* Content — right */}
          <div
            className="flex-1 flex flex-col md:flex-row gap-8 p-8"
            style={{ backgroundColor: colors.white }}
          >
            {/* Label */}
            <div className="md:w-52 shrink-0">
              <p
                style={{
                  fontFamily: fonts.syne,
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.2em',
                  color: colors.orange,
                  marginBottom: 8,
                }}
              >
                {activeNode.role}
              </p>
              <h3
                style={{
                  fontFamily: fonts.bricolage,
                  fontSize: 'clamp(18px, 1.8vw, 26px)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: colors.charcoal,
                  letterSpacing: '-0.02em',
                }}
              >
                {activeNode.label}
              </h3>
            </div>

            {/* Benefits */}
            <ul className="flex-1 grid sm:grid-cols-2 gap-3 content-start">
              {activeNode.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3"
                  style={{
                    fontFamily: fonts.bricolage,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: colors.charcoal,
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: colors.orange,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <polyline
                        points="1,3 3,5 7,1"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
