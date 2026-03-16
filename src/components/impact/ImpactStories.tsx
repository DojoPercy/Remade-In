import Image from 'next/image'
import { colors, fonts } from '@/lib/tokens'

const STORIES = [
  {
    name: 'Micheal Asante',
    role: 'Kantamanto Market',
    quote:
      'When we open the bale, it is just not enough. Remanufacturing gives me a way to keep working with dignity.',
    image: '/Upcyclers/KSCxBenBreuer-6.jpg',
  },
  {
    name: 'Abena Owusu',
    role: 'Community maker',
    quote:
      'Remanufacturing gave me a skill, a voice, and a way to provide for my family without destroying the planet.',
    image: '/Upcyclers/KSCxBenBreuer-32.jpg',
  },
  {
    name: 'Kwame Darko',
    role: 'Repair lead',
    quote:
      "Every garment that passes through my hands is someone's discarded dream -- and my chance to give it a second life.",
    image: '/Upcyclers/KSCxBenBreuer-64.jpg',
  },
]

export default function ImpactStories() {
  return (
    <section
      className="px-8 md:px-20 pt-16 pb-28"
      style={{ backgroundColor: colors.charcoal }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-[0.12em] mb-3"
          style={{ fontFamily: fonts.syne, color: colors.orange, fontSize: 12 }}
        >
          Community Impact Stories
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
            The people behind the metrics.
          </h2>
          <a
            href="#"
            className="inline-flex items-center text-sm font-bold"
            style={{ fontFamily: fonts.syne, color: colors.cream, letterSpacing: '0.06em' }}
          >
            Read All Stories {'>'}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORIES.map((story) => (
            <div
              key={story.name}
              className="rounded-2xl border overflow-hidden"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="relative h-56">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p
                  style={{
                    fontFamily: fonts.bricolage,
                    fontSize: 16,
                    fontWeight: 700,
                    color: colors.white,
                  }}
                >
                  {story.name}
                </p>
                <p
                  className="text-xs uppercase"
                  style={{
                    fontFamily: fonts.syne,
                    letterSpacing: '0.12em',
                    color: `${colors.cream}88`,
                  }}
                >
                  {story.role}
                </p>
                <p
                  className="mt-4 text-sm"
                  style={{ fontFamily: fonts.bricolage, color: `${colors.cream}aa`, lineHeight: 1.7 }}
                >
                  "{story.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
