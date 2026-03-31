'use client'

import { useActionState } from 'react'
import { subscribeToNewsletter } from '@/app/actions/subscribe'
import { colors, fonts } from '@/lib/tokens'

export default function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeToNewsletter, null)

  if (state?.success) {
    return (
      <p
        className="text-[14px] font-semibold"
        style={{ fontFamily: fonts.bricolage, color: colors.orange }}
      >
        {state.message}
      </p>
    )
  }

  return (
    <form action={action} className="flex flex-col sm:flex-row gap-2 w-full max-w-sm">
      <input
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        className="flex-1 px-4 py-2.5 rounded-full text-[14px] outline-none border transition-colors duration-200"
        style={{
          fontFamily: fonts.bricolage,
          backgroundColor: `${colors.cream}08`,
          borderColor: `${colors.cream}20`,
          color: colors.cream,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = `${colors.orange}80`)}
        onBlur={(e) => (e.currentTarget.style.borderColor = `${colors.cream}20`)}
      />
      <button
        type="submit"
        disabled={pending}
        className="shrink-0 px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
        style={{
          fontFamily: fonts.syne,
          backgroundColor: colors.orange,
          color: '#ffffff',
        }}
      >
        {pending ? 'Joining…' : 'Join'}
      </button>
      {state?.message && !state.success && (
        <p className="text-[12px] mt-1 w-full" style={{ color: `${colors.cream}80`, fontFamily: fonts.bricolage }}>
          {state.message}
        </p>
      )}
    </form>
  )
}
