import { colors, fonts } from '@/lib/tokens'

export default function Methodology() {
  return (
    <section
      className="px-8 md:px-20 pt-16 pb-24"
      style={{ backgroundColor: colors.charcoal }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-[0.12em] mb-3"
            style={{ fontFamily: fonts.syne, color: `${colors.cream}88`, fontSize: 12 }}
          >
            Methodology & Transparency
          </p>
          <h2
            className="font-extrabold mb-4"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(28px, 4vw, 46px)',
              color: colors.white,
              letterSpacing: '-0.02em',
            }}
          >
            How we measure impact.
          </h2>
          <p
            className="text-sm"
            style={{ fontFamily: fonts.bricolage, color: `${colors.cream}aa`, lineHeight: 1.8 }}
          >
            We publish assumptions, data sources, and limitations so partners can
            trust the numbers. Every figure is traceable to a dataset, and
            quarterly updates are published to keep the community informed.
          </p>

          <ul className="mt-6 text-sm" style={{ fontFamily: fonts.bricolage, color: `${colors.cream}aa`, lineHeight: 1.8 }}>
            <li>Measurement categories: waste diverted, CO2 avoided, water saved, community investment.</li>
            <li>Calculation references: The Circle Club et al., 2025 (pilot baselines).</li>
            <li>Verification: third-party review pending; transparency updates posted quarterly.</li>
            <li>Limitations: early-stage sampling, evolving supply chain coverage.</li>
          </ul>
        </div>

        <div
          className="rounded-3xl border p-6"
          style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)' }}
        >
          <h3
            className="font-bold mb-3"
            style={{ fontFamily: fonts.bricolage, fontSize: 20, color: colors.white }}
          >
            Impact Report
          </h3>
          <p
            className="text-sm"
            style={{ fontFamily: fonts.bricolage, color: `${colors.cream}aa`, lineHeight: 1.6 }}
          >
            Download the full methodology, sources, and audited outcomes for 2025.
          </p>
          <a
            href="#"
            className="mt-6 inline-flex items-center px-6 py-3 rounded-[6px] text-sm font-bold transition-opacity duration-200 hover:opacity-90"
            style={{
              fontFamily: fonts.syne,
              backgroundColor: colors.orange,
              color: colors.cream,
              letterSpacing: '0.06em',
            }}
          >
            Download Impact Report (PDF)
          </a>

          <div className="mt-6 border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <p
              className="text-xs font-bold uppercase tracking-[0.12em] mb-2"
              style={{ fontFamily: fonts.syne, color: `${colors.cream}88`, fontSize: 12 }}
            >
              Data Notes
            </p>
            <p
              className="text-xs"
              style={{ fontFamily: fonts.bricolage, color: `${colors.cream}88`, lineHeight: 1.6 }}
            >
              Contact us if you need raw datasets or verification protocols. We
              prioritize community consent before public release.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
