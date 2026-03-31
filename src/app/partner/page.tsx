import Nav from '@/components/Nav'
import DonationBanner from '@/components/DonationBanner'
import Footer from '@/components/Footer'
import { colors, fonts } from '@/lib/tokens'

export const metadata = {
  title: 'Partner With Us — Remade In',
  description:
    'Join Remade In as a brand, investor, institution, or tailor. Help us build a justice-led textile remanufacturing ecosystem.',
}

const PARTNERSHIP_TYPES = [
  {
    label: 'Brands & Retailers',
    icon: '👗',
    body: 'Integrate remanufacturing into your production model. We connect you to skilled tailors in Kantamanto and the Netherlands, provide co-branded storytelling, and help you meet circular economy targets with real, measurable impact.',
    cta: 'Brand Partnership',
  },
  {
    label: 'Investors & Funders',
    icon: '💼',
    body: 'Fund the Open Bale Digital Tool, our regional remanufacturing hubs, or the 1M Garment Movement. We offer transparent impact reporting and early access to our findings. Every euro stretches further in a community-led model.',
    cta: 'Invest in Impact',
  },
  {
    label: 'Institutions & Policy Makers',
    icon: '🏛️',
    body: 'We work with governments, municipalities, and academic institutions to pilot circular textile infrastructure. Our Blueprint provides a ready-made framework for policy and procurement decisions.',
    cta: 'Institutional Collaboration',
  },
  {
    label: 'Tailors & Makers',
    icon: '🧵',
    body: 'Whether you are based in Accra or Amsterdam, we want to work with you. Join our network of skilled remanufacturers, access training and tools, and be part of a new economic model that values your expertise.',
    cta: 'Join the Network',
  },
]

export default function PartnerPage() {
  return (
    <>
      <Nav />

      {/* ── Hero ── */}
      <section
        className="px-8 md:px-20 pt-32 pb-16 md:pt-40 md:pb-24"
        style={{ backgroundColor: '#d0e2ff' }}
      >
        <p
          className="text-[13px] font-bold uppercase tracking-[0.28em] mb-6"
          style={{ fontFamily: fonts.syne, color: '#6776b6' }}
        >
          Partner With Us
        </p>
        <h1
          className="font-extrabold leading-[1.0] max-w-3xl"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(42px, 7vw, 88px)',
            letterSpacing: '-0.03em',
            color: colors.dark,
          }}
        >
          There is a role{' '}
          <em style={{ color: '#6776b6', fontStyle: 'italic' }}>for you</em>{' '}
          in this.
        </h1>
        <p
          className="mt-8 max-w-2xl"
          style={{
            fontFamily: fonts.bricolage,
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            lineHeight: 1.75,
            color: `${colors.dark}88`,
          }}
        >
          Whether you are a brand, a tailor, a donor, or a policy maker — radical collaboration is how we fix a broken system. Tell us how you want to be involved and we will find the best way to work together.
        </p>
      </section>

      {/* ── Partnership types ── */}
      <section
        className="px-8 md:px-20 py-16 md:py-24"
        style={{ backgroundColor: colors.white }}
      >
        <p
          className="text-[11px] font-bold uppercase tracking-[0.28em] mb-12"
          style={{ fontFamily: fonts.syne, color: colors.orange }}
        >
          Ways to Partner
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PARTNERSHIP_TYPES.map((p) => (
            <div
              key={p.label}
              className="flex flex-col rounded-2xl p-8"
              style={{ backgroundColor: '#d0e2ff' }}
            >
              <span className="text-3xl mb-5" role="img" aria-label={p.label}>{p.icon}</span>
              <h3
                className="font-bold mb-4"
                style={{ fontFamily: fonts.bricolage, fontSize: 22, color: '#6776b6', letterSpacing: '-0.01em' }}
              >
                {p.label}
              </h3>
              <p
                className="flex-1"
                style={{ fontFamily: fonts.bricolage, fontSize: 15, lineHeight: 1.8, color: `${colors.dark}88` }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact form ── */}
      <section
        id="partner"
        className="px-8 md:px-20 py-16 md:py-24"
        style={{ backgroundColor: colors.white, borderTop: `1px solid ${colors.dark}0a` }}
      >
        <div className="max-w-2xl">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.28em] mb-4"
            style={{ fontFamily: fonts.syne, color: colors.orange }}
          >
            Get in Touch
          </p>
          <h2
            className="font-extrabold mb-10"
            style={{
              fontFamily: fonts.bricolage,
              fontSize: 'clamp(28px, 3vw, 42px)',
              letterSpacing: '-0.02em',
              color: colors.dark,
            }}
          >
            Tell us about your interest.
          </h2>

          <form
            action={`mailto:hello@remadein.nl?subject=Partnership%20Interest`}
            method="get"
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ fontFamily: fonts.syne, color: `${colors.dark}66` }}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="px-4 py-3 rounded-xl border text-[15px] outline-none transition-colors duration-200"
                  style={{
                    fontFamily: fonts.bricolage,
                    borderColor: `${colors.dark}18`,
                    color: colors.dark,
                    backgroundColor: colors.white,
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="org"
                  className="text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ fontFamily: fonts.syne, color: `${colors.dark}66` }}
                >
                  Organisation
                </label>
                <input
                  id="org"
                  name="org"
                  type="text"
                  placeholder="Your organisation"
                  className="px-4 py-3 rounded-xl border text-[15px] outline-none transition-colors duration-200"
                  style={{
                    fontFamily: fonts.bricolage,
                    borderColor: `${colors.dark}18`,
                    color: colors.dark,
                    backgroundColor: colors.white,
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ fontFamily: fonts.syne, color: `${colors.dark}66` }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="px-4 py-3 rounded-xl border text-[15px] outline-none transition-colors duration-200"
                style={{
                  fontFamily: fonts.bricolage,
                  borderColor: `${colors.dark}18`,
                  color: colors.dark,
                  backgroundColor: colors.white,
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="type"
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ fontFamily: fonts.syne, color: `${colors.dark}66` }}
              >
                Partnership Type
              </label>
              <select
                id="type"
                name="type"
                className="px-4 py-3 rounded-xl border text-[15px] outline-none"
                style={{
                  fontFamily: fonts.bricolage,
                  borderColor: `${colors.dark}18`,
                  color: colors.dark,
                  backgroundColor: colors.white,
                }}
              >
                <option value="">Select one…</option>
                {PARTNERSHIP_TYPES.map((p) => (
                  <option key={p.label} value={p.label}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ fontFamily: fonts.syne, color: `${colors.dark}66` }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="body"
                rows={5}
                placeholder="Tell us about your interest and how you'd like to collaborate…"
                className="px-4 py-3 rounded-xl border text-[15px] outline-none resize-none transition-colors duration-200"
                style={{
                  fontFamily: fonts.bricolage,
                  borderColor: `${colors.dark}18`,
                  color: colors.dark,
                  backgroundColor: colors.white,
                }}
              />
            </div>

            <button
              type="submit"
              className="self-start px-8 py-3.5 rounded-full text-[14px] font-bold tracking-wide transition-opacity duration-200 hover:opacity-90"
              style={{ fontFamily: fonts.syne, backgroundColor: colors.orange, color: '#ffffff' }}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <DonationBanner />
      <Footer />
    </>
  )
}
