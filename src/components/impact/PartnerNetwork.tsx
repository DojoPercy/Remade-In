import { colors, fonts } from '@/lib/tokens'

const PARTNERS = [
  { name: 'The Social Hub', role: 'Program host + community convening' },
  { name: 'Het Goed', role: 'Circular supply chain partner' },
  { name: 'RTT', role: 'Remanufacturing pilot + training support' },
  { name: 'DCW', role: 'Local workforce development partner' },
  { name: 'MidZuid', role: 'Skills pathway + youth engagement' },
  { name: 'Avans', role: 'Research collaboration + evaluation' },
  { name: 'Shared Bag', role: 'Logistics + reverse supply chain' },
]

export default function PartnerNetwork() {
  return (
    <section
      id="partner"
      className="px-8 md:px-20 pt-16 pb-24"
      style={{ backgroundColor: colors.charcoal }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.12em] mb-3"
          style={{ fontFamily: fonts.syne, color: colors.orange, fontSize: 12 }}
        >
          Partner Network
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <h2
            className="font-extrabold"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(28px, 4vw, 46px)',
              color: colors.white,
              letterSpacing: '-0.02em',
            }}
          >
            Collaborators powering the remanufacturing ecosystem.
          </h2>
          <a
            href="#partner"
            className="inline-flex items-center px-6 py-3 rounded-[6px] text-sm font-bold transition-opacity duration-200 hover:opacity-90"
            style={{
              fontFamily: fonts.syne,
              backgroundColor: colors.orange,
              color: colors.cream,
              letterSpacing: '0.06em',
            }}
          >
            Become a Partner
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="rounded-2xl border p-5"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              <div
                className="h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: colors.cream,
                  fontFamily: fonts.syne,
                  fontSize: 13,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {partner.name}
              </div>
              <p
                className="text-sm"
                style={{
                  fontFamily: fonts.bricolage,
                  color: `${colors.cream}aa`,
                  lineHeight: 1.6,
                }}
              >
                {partner.role}
              </p>
            </div>
          ))}

          <div
            className="rounded-2xl border p-5 flex flex-col justify-between"
            style={{
              borderColor: 'rgba(255,255,255,0.08)',
              backgroundColor: 'rgba(255,255,255,0.05)',
            }}
          >
            <p
              style={{
                fontFamily: fonts.bricolage,
                fontSize: 18,
                color: colors.white,
                fontWeight: 700,
              }}
            >
              Add your organization to the map.
            </p>
            <a
              href="#partner"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold"
              style={{
                fontFamily: fonts.syne,
                color: colors.orange,
                letterSpacing: '0.08em',
              }}
            >
              Partner with us {'>'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
