'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface PartnerFormState {
  success: boolean
  message: string
}

export async function submitPartnerInquiry(
  _prev: PartnerFormState | null,
  formData: FormData,
): Promise<PartnerFormState> {
  const name         = (formData.get('name')    as string | null)?.trim() ?? ''
  const org          = (formData.get('org')     as string | null)?.trim() ?? ''
  const email        = (formData.get('email')   as string | null)?.trim().toLowerCase() ?? ''
  const type         = (formData.get('type')    as string | null)?.trim() ?? ''
  const message      = (formData.get('message') as string | null)?.trim() ?? ''

  if (!name)    return { success: false, message: 'Please enter your name.' }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                return { success: false, message: 'Please enter a valid email address.' }
  if (!message) return { success: false, message: 'Please tell us about your interest.' }

  const toEmail = process.env.PARTNER_EMAIL
  if (!toEmail) {
    console.error('PARTNER_EMAIL env variable is not set')
    return { success: false, message: 'Configuration error. Please email us directly.' }
  }

  try {
    await resend.emails.send({
      from:    'Remade In <noreply@remadein.nl>',
      to:      toEmail,
      replyTo: email,
      subject: `Partnership Inquiry${type ? ` — ${type}` : ''} from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2b2b22">
          <div style="background:#6776b6;padding:32px 40px;border-radius:12px 12px 0 0">
            <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:800">New Partnership Inquiry</h1>
            <p style="color:rgba(255,255,255,0.65);margin:8px 0 0;font-size:14px">Received via remadein.nl/partner</p>
          </div>
          <div style="background:#f8f9ff;padding:32px 40px;border-radius:0 0 12px 12px;border:1px solid #e0e6f8;border-top:none">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6f8;width:160px">
                <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#6776b6">Name</span>
              </td><td style="padding:10px 0;border-bottom:1px solid #e0e6f8">
                <span style="font-size:15px;color:#2b2b22">${name}</span>
              </td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6f8">
                <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#6776b6">Organisation</span>
              </td><td style="padding:10px 0;border-bottom:1px solid #e0e6f8">
                <span style="font-size:15px;color:#2b2b22">${org || '—'}</span>
              </td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6f8">
                <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#6776b6">Email</span>
              </td><td style="padding:10px 0;border-bottom:1px solid #e0e6f8">
                <a href="mailto:${email}" style="font-size:15px;color:#d8570f">${email}</a>
              </td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6f8">
                <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#6776b6">Type</span>
              </td><td style="padding:10px 0;border-bottom:1px solid #e0e6f8">
                <span style="font-size:15px;color:#2b2b22">${type || '—'}</span>
              </td></tr>
            </table>
            <div style="margin-top:24px">
              <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#6776b6;margin:0 0 10px">Message</p>
              <p style="font-size:15px;line-height:1.75;color:#2b2b22;margin:0;white-space:pre-wrap">${message}</p>
            </div>
            <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e0e6f8">
              <a href="mailto:${email}" style="display:inline-block;background:#d8570f;color:#fff;padding:12px 24px;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;text-transform:uppercase;letter-spacing:0.08em">Reply to ${name}</a>
            </div>
          </div>
        </div>
      `,
    })

    return { success: true, message: "Thank you! We'll be in touch within a few days." }
  } catch (err) {
    console.error('Partner inquiry email error:', err)
    return { success: false, message: 'Something went wrong. Please try again or email us directly.' }
  }
}
