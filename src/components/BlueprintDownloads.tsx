'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import type { BlueprintPage, BlueprintDownload } from '@/lib/sanity/types'

const FALLBACK_DOWNLOADS: BlueprintDownload[] = [
  {
    label: 'Full White Paper',
    description: 'Complete 13-page research document with methodology, findings, and roadmap.',
    fileType: 'PDF',
    pages: 13,
  },
  {
    label: 'Executive Summary',
    description: 'Key findings and recommendations distilled into 2 pages for quick sharing.',
    fileType: 'PDF',
    pages: 2,
  },
  {
    label: 'Policy Brief',
    description: 'EPR reform recommendations and trade policy analysis for policymakers.',
    fileType: 'PDF',
    pages: 4,
  },
]

/** Resolve the best available download URL for a document */
function resolveHref(doc: BlueprintDownload): string {
  return doc.file?.asset?.url ?? doc.externalHref ?? '#'
}

export default function BlueprintDownloads({ data }: { data?: BlueprintPage | null }) {
  const downloads = data?.downloads?.length ? data.downloads : FALLBACK_DOWNLOADS

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="downloads"
      className="px-8 md:px-20 py-24"
      style={{ backgroundColor: colors.cream }}
    >
      <div ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.5 } } : {}}
          className="mb-14"
        >
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: fonts.syne, color: colors.orange }}
          >
            Download Centre
          </p>
          <h2
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: colors.charcoal,
            }}
          >
            Take the research with you
          </h2>
          <p
            className="mt-4 max-w-lg"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(15px, 1.3vw, 17px)',
              lineHeight: 1.7,
              color: 'rgba(26,26,20,0.6)',
            }}
          >
            All research outputs are free to download, share, and cite. If you use our findings, please reference: The Circle Club et al. (2025).
          </p>
        </motion.div>

        {/* Download cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloads.map((doc, i) => (
            <motion.a
              key={doc.label}
              href={resolveHref(doc)}
              download={doc.file?.asset?.url ? true : undefined}
              target={!doc.file?.asset?.url && resolveHref(doc) !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.1 + i * 0.1 } } : {}}
              className="group relative flex flex-col justify-between rounded-[8px] overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: colors.white,
                border: '1px solid rgba(26,26,20,0.1)',
                boxShadow: '0 2px 12px rgba(26,26,20,0.06)',
                minHeight: 220,
              }}
            >
              {/* Coloured top bar */}
              <div className="h-1.5 w-full" style={{ backgroundColor: colors.orange }} />

              <div className="flex flex-col gap-3 p-6 flex-1">
                {/* Badges */}
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{ fontFamily: fonts.syne, backgroundColor: `${colors.orange}15`, color: colors.orange }}
                  >
                    {doc.fileType}
                  </span>
                  {doc.pages && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.12em]"
                      style={{ fontFamily: fonts.syne, backgroundColor: 'rgba(26,26,20,0.06)', color: 'rgba(26,26,20,0.45)' }}
                    >
                      {doc.pages} {doc.pages === 1 ? 'page' : 'pages'}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: fonts.bricolage,
                    fontSize: 20,
                    fontWeight: 800,
                    lineHeight: 1.25,
                    color: colors.charcoal,
                  }}
                >
                  {doc.label}
                </h3>

                {/* Description */}
                {doc.description && (
                  <p
                    style={{
                      fontFamily: fonts.bricolage,
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: 'rgba(26,26,20,0.55)',
                    }}
                  >
                    {doc.description}
                  </p>
                )}
              </div>

              {/* Footer link */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderTop: '1px solid rgba(26,26,20,0.08)' }}
              >
                {(() => {
                  const href = resolveHref(doc)
                  const ready = href !== '#'
                  return (
                    <>
                      <span
                        className="text-xs font-bold uppercase tracking-[0.1em] transition-colors duration-200"
                        style={{ fontFamily: fonts.syne, color: ready ? colors.orange : 'rgba(26,26,20,0.3)' }}
                      >
                        {ready ? 'Download →' : 'Coming soon'}
                      </span>
                      {ready && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill={colors.orange} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-0.5">
                          <path d="M8 12L3 7h3V2h4v5h3L8 12zM2 14h12v-1.5H2V14z" />
                        </svg>
                      )}
                    </>
                  )
                })()}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Citation box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } } : {}}
          className="mt-14 p-8 rounded-[8px]"
          style={{ backgroundColor: 'rgba(26,26,20,0.05)', border: '1px solid rgba(26,26,20,0.1)' }}
        >
          <p
            className="mb-2 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ fontFamily: fonts.syne, color: 'rgba(26,26,20,0.4)' }}
          >
            How to cite
          </p>
          <p
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 14,
              lineHeight: 1.7,
              color: 'rgba(26,26,20,0.6)',
              fontStyle: 'italic',
            }}
          >
            The Circle Club, Remade In, &amp; partners. (2025). <strong style={{ fontStyle: 'normal', color: colors.charcoal }}>A Blueprint for Textile Remanufacturing in the Netherlands and Beyond.</strong> Amsterdam Fashion Week 2025.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
