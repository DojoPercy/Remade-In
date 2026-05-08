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
    const existing = await writeClient.fetch<{ _id: string; unsubscribed?: boolean } | null>(
      `*[_type == "subscriber" && email == $email][0]{ _id, unsubscribed }`,
      { email },
    )

    if (existing) {
      // Re-subscribe if they previously unsubscribed
      if (existing.unsubscribed) {
        await writeClient.patch(existing._id).set({ unsubscribed: false }).commit()
        return { success: true, message: "Welcome back! You're on the list again." }
      }
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
