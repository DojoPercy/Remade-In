'use server'

import { writeClient } from '@/lib/sanity/client'

export async function subscribeToNewsletter(
  _prev: { success: boolean; message: string } | null,
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  const email = (formData.get('email') as string | null)?.trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  try {
    // Avoid duplicates
    const existing = await writeClient.fetch<string | null>(
      `*[_type == "subscriber" && email == $email][0]._id`,
      { email },
    )
    if (existing) {
      return { success: true, message: "You're already on our list!" }
    }

    await writeClient.create({
      _type: 'subscriber',
      email,
      subscribedAt: new Date().toISOString(),
      source: 'footer',
    })

    return { success: true, message: "You're in! We'll be in touch." }
  } catch (err) {
    console.error('Newsletter subscribe error:', err)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}
