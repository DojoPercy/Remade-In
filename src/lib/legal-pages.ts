import { colors } from '@/lib/tokens'

export interface LegalSummaryCard {
  label: string
  value: string
}

export interface LegalSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export interface LegalFallbackPage {
  documentId: string
  title: string
  eyebrow: string
  intro: string
  description: string
  updatedAt: string
  contactEmail: string
  contactAddress: string[]
  contactLabel: string
  accent: string
  surface: string
  summaryCards: LegalSummaryCard[]
  sections: LegalSection[]
}

export const LEGAL_FALLBACKS: Record<'privacy' | 'cookies' | 'terms', LegalFallbackPage> = {
  privacy: {
    documentId: 'privacyPage',
    title: 'Privacy Policy',
    eyebrow: 'Privacy and data rights',
    intro:
      'How Stichting Remade In collects, uses, stores, and shares information when people visit remadein.org or engage with our programmes, events, and communications.',
    description:
      'Learn what data Remade In collects, the GDPR rights available to users, and how international transfers, retention, and security are handled.',
    updatedAt: '2026-04-06',
    contactEmail: 'info@remadein.org',
    contactAddress: [
      'Stichting Remade In',
      'Kronehoefstraat 72',
      '5622 AC Eindhoven',
      'Noord Brabant, Netherlands',
    ],
    contactLabel: 'Data rights requests',
    accent: colors.blue,
    surface: colors.lightBlue,
    summaryCards: [
      { label: 'Sensitive data', value: 'No' },
      { label: 'Automated decisions', value: 'No profiling' },
      { label: 'Main legal regime', value: 'GDPR' },
      { label: 'Retention check', value: '2 years of inactivity' },
    ],
    sections: [
      {
        title: 'Summary of key points',
        paragraphs: [
          "This privacy notice explains what information Stichting Remade In processes and why. We process information you provide directly, such as names, emails, phone numbers, and organisation details, as well as technical information collected automatically when you use our Services.",
          'We do not process sensitive personal data for these Services, and we do not use profiling or automated decision-making systems that create legal or similarly significant effects for you.',
          'Because we use service providers with global infrastructure, including Google services, personal data may be transferred outside the European Economic Area. Where that happens, we rely on appropriate safeguards such as Standard Contractual Clauses.',
        ],
      },
      {
        title: '1. What information do we collect?',
        paragraphs: [
          'We collect personal information that you voluntarily provide when you contact us, sign up for updates, participate in programmes, or engage with us through events, marketing, or partnerships.',
          'We also collect limited technical information automatically when you navigate our Services.',
        ],
        bullets: [
          'Contact data: names, email addresses, and phone numbers.',
          'Professional data: company name and business-related authentication data.',
          'Log and usage data: IP address, browser type, timestamps, referrers, and pages viewed.',
          'Device data: information about your computer, tablet, or phone.',
          'Location data: precise or imprecise location inferred for example from your IP address.',
        ],
      },
      {
        title: '2. How do we process your information?',
        paragraphs: [
          'We process your information to operate, provide, maintain, and improve our Services, to respond to enquiries, to manage programme participation, to send communications you request, to protect the security of our website, and to comply with legal obligations.',
          'We do not engage in profiling or automated decision-making that produces legal or similarly significant effects concerning you.',
        ],
      },
      {
        title: '3. Legal bases for processing',
        paragraphs: [
          'Under the GDPR, we rely on legal bases including consent, legitimate interests, legal obligations, and vital interests depending on the context in which the information is processed.',
        ],
        bullets: [
          'Consent for optional communications and similar activities.',
          'Legitimate interests such as analysing site usage, preventing misuse, and improving Services.',
          'Legal obligations where record keeping or compliance duties apply.',
          'Vital interests in rare circumstances involving safety or urgent protection.',
        ],
      },
      {
        title: '4. Sharing and international transfers',
        paragraphs: [
          'We may share information with carefully selected categories of service providers that support our website, communications, analytics, or operational workflows.',
          'Because some providers operate globally, personal information may be processed outside the EEA, including in the United States. Where relevant, we rely on Standard Contractual Clauses and similar safeguards approved by the European Commission.',
        ],
      },
      {
        title: '5. Cookies and tracking',
        paragraphs: [
          'We use cookies and similar technologies to keep the website secure, support essential functionality, and understand traffic patterns through analytics tools such as Google Analytics.',
          'You can control cookies through your browser settings and any cookie controls made available on the site.',
        ],
      },
      {
        title: '6. Data retention',
        paragraphs: [
          'We keep information only for as long as necessary for the purposes described in this notice, including providing Services, maintaining records, and complying with legal obligations.',
          'If you have not interacted with our Services for more than two years, we will securely delete or anonymise the data unless a longer retention period is required by Dutch tax, accounting, or other legal obligations.',
        ],
      },
      {
        title: '7. Data security',
        paragraphs: [
          'We use technical and organisational measures designed to protect the personal information we process. No system can guarantee absolute security, and transmission to our Services remains at your own risk. We recommend using secure networks and devices when accessing the site.',
        ],
      },
      {
        title: '8. Privacy of minors',
        paragraphs: [
          'We do not knowingly collect personal data from children under 18 years of age. If we learn that we have collected personal data from a minor, we will take reasonable steps to delete it or otherwise stop processing it promptly.',
        ],
      },
      {
        title: '9. Your privacy rights',
        paragraphs: [
          'If you are in the EEA or otherwise protected by applicable privacy law, you may have rights to access, correct, delete, restrict, object to, or port your personal information. You may also withdraw consent at any time where consent is the legal basis for processing.',
          'You can exercise these rights by contacting us using the email address listed below. You also have the right to lodge a complaint with the Dutch Data Protection Authority, the Autoriteit Persoonsgegevens.',
        ],
      },
      {
        title: '10. Updates and contact',
        paragraphs: [
          'We may update this policy from time to time to reflect legal, operational, or service changes. The Last Updated date above indicates when the current version took effect.',
          'For questions, requests, or concerns about this policy or our privacy practices, contact us using the details below.',
        ],
      },
    ],
  },
  cookies: {
    documentId: 'cookiesPage',
    title: 'Cookie Policy',
    eyebrow: 'Cookies and analytics',
    intro:
      'How Remade In uses cookies, analytics tags, and similar technologies to keep the site working, understand traffic, and improve the experience over time.',
    description:
      'Read how essential cookies, analytics tools, browser controls, and cookie choices are handled on the Remade In website.',
    updatedAt: '2026-04-06',
    contactEmail: 'info@remadein.org',
    contactAddress: [
      'Stichting Remade In',
      'Kronehoefstraat 72',
      '5622 AC Eindhoven',
      'Noord Brabant, Netherlands',
    ],
    contactLabel: 'Cookie questions',
    accent: colors.green,
    surface: '#eff3d6',
    summaryCards: [
      { label: 'Essential cookies', value: 'Used' },
      { label: 'Analytics cookies', value: 'Google Analytics' },
      { label: 'Advertising cookies', value: 'Not used by default' },
      { label: 'User control', value: 'Browser settings' },
    ],
    sections: [
      {
        title: '1. What are cookies?',
        paragraphs: [
          'Cookies are small text files stored on your device when you visit a website. Similar technologies such as pixels, local storage, and analytics scripts can also be used to recognise devices, remember preferences, and understand how people use a site.',
        ],
      },
      {
        title: '2. Why we use cookies',
        paragraphs: [
          'We use cookies and similar tools to keep the website secure, remember functional preferences where relevant, measure traffic, and improve site performance and content decisions.',
        ],
        bullets: [
          'Essential functionality and security.',
          'Performance measurement and analytics.',
          'Understanding how visitors navigate the site.',
          'Improving content, design, and technical reliability.',
        ],
      },
      {
        title: '3. Types of cookies we may use',
        paragraphs: [
          'Different cookies serve different purposes. Some are required for the site to work, while others help us understand usage patterns.',
        ],
        bullets: [
          'Strictly necessary cookies required for security and core site functionality.',
          'Analytics cookies that help us understand traffic and page performance.',
          'Preference cookies where relevant to remember user settings.',
        ],
      },
      {
        title: '4. Analytics and third parties',
        paragraphs: [
          'We may use analytics providers such as Google Analytics to understand how visitors use the website. These services may collect technical details such as IP address, browser type, approximate location, referral data, and the pages visited.',
          'Where third-party tools are active, their own privacy and cookie terms may also apply.',
        ],
      },
      {
        title: '5. How to control cookies',
        paragraphs: [
          'You can usually manage or delete cookies through your browser settings. Blocking some cookies may affect the way parts of the site function.',
        ],
        bullets: [
          'Clear existing cookies from your browser.',
          'Block future cookies through browser privacy settings.',
          'Use any consent or preference controls made available on the site.',
          'Opt out of Google Analytics through the tools provided by Google where available.',
        ],
      },
      {
        title: '6. Changes to this cookie policy',
        paragraphs: [
          'We may update this policy as our website, technology stack, or legal obligations change. The Last Updated date indicates when the current version took effect.',
        ],
      },
      {
        title: '7. Contact',
        paragraphs: [
          'If you have any questions about how we use cookies or analytics tools, contact us using the details below.',
        ],
      },
    ],
  },
  terms: {
    documentId: 'termsPage',
    title: 'Terms of Use',
    eyebrow: 'Use of this website',
    intro:
      'The baseline terms for accessing and using the Remade In website, including acceptable use, intellectual property, disclaimers, and contact information.',
    description:
      'Review the terms that apply when using the Remade In website, including content ownership, acceptable use, disclaimers, and liability limits.',
    updatedAt: '2026-04-06',
    contactEmail: 'info@remadein.org',
    contactAddress: [
      'Stichting Remade In',
      'Kronehoefstraat 72',
      '5622 AC Eindhoven',
      'Noord Brabant, Netherlands',
    ],
    contactLabel: 'Terms questions',
    accent: colors.orange,
    surface: '#fde6d9',
    summaryCards: [
      { label: 'Use allowed', value: 'Lawful and respectful' },
      { label: 'IP ownership', value: 'Remade In or licensors' },
      { label: 'External links', value: 'Third-party terms apply' },
      { label: 'Governing context', value: 'Netherlands' },
    ],
    sections: [
      {
        title: '1. Acceptance of these terms',
        paragraphs: [
          'By accessing or using this website, you agree to these Terms of Use and any applicable laws. If you do not agree, you should not use the site.',
        ],
      },
      {
        title: '2. Permitted use',
        paragraphs: [
          'You may use the site for lawful informational, educational, and engagement purposes. You agree not to misuse the site or interfere with its operation.',
        ],
        bullets: [
          'Do not attempt to gain unauthorised access to systems or data.',
          'Do not use the site to distribute malware, spam, or unlawful content.',
          'Do not copy or scrape content in a way that breaches applicable law or these terms.',
        ],
      },
      {
        title: '3. Intellectual property',
        paragraphs: [
          'Unless otherwise stated, the content on this site, including text, design, branding, graphics, and other materials, is owned by Stichting Remade In or its licensors and is protected by applicable intellectual property laws.',
          'You may not reproduce, republish, distribute, modify, or commercially exploit site content without prior written permission, except where applicable law allows limited use.',
        ],
      },
      {
        title: '4. Accuracy and availability',
        paragraphs: [
          'We aim to keep the website accurate and up to date, but we do not guarantee that all content is complete, current, or error free at all times. We may change, suspend, or remove parts of the site without notice.',
        ],
      },
      {
        title: '5. Third-party links and services',
        paragraphs: [
          'The site may contain links to third-party websites, platforms, maps, videos, or tools. We are not responsible for third-party content, security, availability, or privacy practices, and your use of those services is governed by their own terms and policies.',
        ],
      },
      {
        title: '6. Disclaimer',
        paragraphs: [
          'The site is provided on an as-is and as-available basis. To the fullest extent permitted by law, we disclaim warranties of any kind, whether express or implied, including warranties of accuracy, merchantability, fitness for a particular purpose, and non-infringement.',
        ],
      },
      {
        title: '7. Limitation of liability',
        paragraphs: [
          'To the fullest extent permitted by law, Stichting Remade In will not be liable for indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the site. Nothing in these terms limits liability where such limitation is not permitted by law.',
        ],
      },
      {
        title: '8. Governing law and updates',
        paragraphs: [
          'These terms are governed by the laws applicable in the Netherlands unless mandatory law requires otherwise. We may update these terms from time to time, and continued use of the site after updates means you accept the revised version.',
        ],
      },
      {
        title: '9. Contact',
        paragraphs: [
          'For questions about these Terms of Use, contact us using the details below.',
        ],
      },
    ],
  },
}
