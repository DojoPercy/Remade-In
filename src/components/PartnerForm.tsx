'use client'

import { useActionState } from 'react'
import { motion } from 'framer-motion'
import { colors, fonts } from '@/lib/tokens'
import { submitPartnerInquiry } from '@/app/actions/submitPartner'

const PARTNERSHIP_TYPES = [
  'Brands & Retailers',
  'Investors & Funders',
  'Institutions & Policy Makers',
  'Tailors & Makers',
  'Other',
]

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const inputStyle = {
  fontFamily: fonts.bricolage,
  fontSize: 15,
  borderColor: 'rgba(255,255,255,0.18)',
  color: '#ffffff',
  backgroundColor: 'rgba(255,255,255,0.06)',
}

const labelStyle = {
  fontFamily: fonts.syne,
  fontSize: 10,
  color: 'rgba(255,255,255,0.45)',
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[10px] font-bold uppercase tracking-[0.2em]"
        style={labelStyle}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

export default function PartnerForm() {
  const [state, action, pending] = useActionState(submitPartnerInquiry, null)

  if (state?.success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="flex flex-col items-start gap-4 p-10 rounded-2xl"
        style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)' }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: colors.orange }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p
          className="font-extrabold"
          style={{ fontFamily: fonts.bricolage, fontSize: 22, color: '#ffffff', letterSpacing: '-0.02em' }}
        >
          Message sent.
        </p>
        <p style={{ fontFamily: fonts.bricolage, fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.65)' }}>
          {state.message}
        </p>
      </motion.div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="name" label="Name *">
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="px-4 py-3 rounded-xl border text-[15px] outline-none transition-colors duration-200 placeholder:opacity-30"
            style={inputStyle}
          />
        </Field>
        <Field id="org" label="Organisation">
          <input
            id="org"
            name="org"
            type="text"
            placeholder="Your organisation"
            className="px-4 py-3 rounded-xl border text-[15px] outline-none transition-colors duration-200 placeholder:opacity-30"
            style={inputStyle}
          />
        </Field>
      </div>

      <Field id="email" label="Email *">
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="px-4 py-3 rounded-xl border text-[15px] outline-none transition-colors duration-200 placeholder:opacity-30"
          style={inputStyle}
        />
      </Field>

      <Field id="type" label="Partnership Type">
        <select
          id="type"
          name="type"
          className="px-4 py-3 rounded-xl border text-[15px] outline-none"
          style={{ ...inputStyle, backgroundColor: 'rgba(255,255,255,0.06)' }}
        >
          <option value="">Select one…</option>
          {PARTNERSHIP_TYPES.map((p) => (
            <option key={p} value={p} style={{ backgroundColor: colors.blue, color: '#ffffff' }}>
              {p}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label="Message *">
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your interest and how you'd like to collaborate…"
          className="px-4 py-3 rounded-xl border text-[15px] outline-none resize-none transition-colors duration-200 placeholder:opacity-30"
          style={inputStyle}
        />
      </Field>

      {state && !state.success && (
        <p
          className="text-[13px]"
          style={{ fontFamily: fonts.bricolage, color: colors.peach }}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start px-8 py-3.5 rounded-full text-[13px] font-bold uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
        style={{ fontFamily: fonts.syne, backgroundColor: colors.orange, color: '#ffffff' }}
      >
        {pending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
