import { client } from '@/lib/sanity/client'
import { imageUrl } from '@/lib/sanity/image'
import { communityVoicesQuery } from '@/lib/sanity/queries'
import type { CommunityVoice as CommunityVoiceCMS } from '@/lib/sanity/types'
import CommunityVoiceCarousel, { type VoiceItem } from './CommunityVoiceCarousel'

// ── Static fallback data ───────────────────────────────────────────────────────
// Used when no CMS entries exist yet. Remove once studio is populated.

const FALLBACK_VOICES: VoiceItem[] = [
  {
    id: 'static-1',
    name: 'Micheal Asante',
    slug: 'micheal-asante',
    quote: 'When we open the bale, it is just not enough. Money I had saved up over some number of years began to get exhausted.',
    photoSrc: '/Upcyclers/KSCxBenBreuer-6.jpg',
    market: 'Ghana',
    location: 'Accra, Ghana',
  },
  {
    id: 'static-2',
    name: 'Abena Owusu',
    slug: 'abena-owusu',
    quote: 'Remanufacturing gave me a skill, a voice, and a way to provide for my family without destroying the planet in the process.',
    photoSrc: '/Upcyclers/KSCxBenBreuer-32.jpg',
    market: 'Ghana',
    location: 'Accra, Ghana',
  },
  {
    id: 'static-3',
    name: 'Kwame Darko',
    slug: 'kwame-darko',
    quote: 'Every garment that passes through my hands is someone\'s discarded dream — and my opportunity to give it a second life.',
    photoSrc: '/Upcyclers/KSCxBenBreuer-64.jpg',
    market: 'Ghana',
    location: 'Accra, Ghana',
  },
  {
    id: 'static-4',
    name: 'Fatima Al-Hassan',
    slug: 'fatima-al-hassan',
    quote: 'The system was never designed for people like us to win. Remanufacturing changes that — one garment, one community at a time.',
    photoSrc: '/Upcyclers/KSCxBenBreuer-78.jpg',
    market: 'Ghana',
    location: 'Accra, Ghana',
  },
]

// ── Helpers ────────────────────────────────────────────────────────────────────

function normalise(doc: CommunityVoiceCMS): VoiceItem {
  return {
    id: doc._id,
    name: doc.name,
    slug: doc.slug.current,
    quote: doc.quote,
    photoSrc: doc.photo?.asset
      ? imageUrl(doc.photo.asset, 840, 960)
      : '/Upcyclers/KSCxBenBreuer-6.jpg',
    market: doc.market ?? 'Kantamanto Market',
    location: doc.location ?? 'Accra, Ghana',
    role: doc.role,
  }
}

// ── Server component ──────────────────────────────────────────────────────────

export default async function CommunityVoice() {
  let voices: VoiceItem[] = FALLBACK_VOICES

  try {
    const cms: CommunityVoiceCMS[] = await client.fetch(
      communityVoicesQuery,
      {},
      // Next.js ISR — revalidate every 60 s
      { next: { revalidate: 60 } },
    )
    if (cms && cms.length > 0) {
      voices = cms.map(normalise)
    }
  } catch {
    // CMS unavailable (e.g. env vars not set in dev) — use fallback silently
  }

  return <CommunityVoiceCarousel voices={voices} />
}
