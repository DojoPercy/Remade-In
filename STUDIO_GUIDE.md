# Remade In — Studio Content Guide

> This guide explains how to update your website content using the Remade In Studio.
> No coding required. Everything here can be done from your browser.

---

## Accessing the Studio

**Local (during development)**
```
http://localhost:3333
```

**Live (once deployed)**
Your developer will provide a URL like `https://remade-in.sanity.studio`

You will need a Sanity account. Ask your developer to invite you at [sanity.io/manage](https://sanity.io/manage).

---

## Overview — What You Can Edit

The left sidebar in the Studio shows five sections:

| Section | What it controls |
|---|---|
| **Site Settings** | Navigation links, social media URLs, contact email |
| **Home Page** | Hero headline, ticker text, card columns, impact stats, donation banner |
| **Research Archive** | Research documents, white papers, policy briefs |
| **Community Voices** | Quotes and profiles shown in the carousel |
| **Gallery** | The five event photos on the homepage |

---

## Site Settings

**Found at:** Sidebar → Site Settings

### Navigation Links
The main navigation bar across the top of the website.

- Click **Site Settings**
- Scroll to **Main Navigation**
- Each item has a **Label** (what visitors see) and an **Href** (where it links)
- Drag items to reorder them
- Click **Publish** when done

### Social Links
Instagram, LinkedIn, and other social media URLs.

- Scroll to **Social Links**
- Update the URL for each platform
- Click **Publish**

---

## Home Page

**Found at:** Sidebar → Home Page

The Home Page document is divided into five tabs at the top: **Hero**, **Ticker**, **We Are The Glue**, **Impact Teaser**, and **Donation Banner**.

---

### Hero Tab

The first thing visitors see when they land on the website.

| Field | What it does |
|---|---|
| **Headline** | Main text before the orange italic word (e.g. "Building our Circular Fashion") |
| **Headline Accent Word** | The orange italic word (e.g. "Future") |
| **Headline Tagline** | Second line of the headline (e.g. "— one Community at a Time") |
| **Subheadline** | The paragraph below the headline |
| **Primary CTA Label** | Text on the first button (e.g. "See the Blueprint") |
| **Secondary CTA Label** | Text on the second button (e.g. "Our 2025 Impact") |
| **Background Image** | The full-screen photo behind the hero |
| **Social Proof Tags** | The small pill labels at the bottom (e.g. "Kantamanto Market, Ghana") |

> **Tip:** Keep the headline short — it renders very large on screen. The accent word works best as a single powerful word.

---

### Ticker Tab

The orange scrolling banner that appears just below the hero.

| Field | What it does |
|---|---|
| **Ticker Items** | List of phrases that scroll across the banner |

- Click **Add item** to add a new phrase
- Click the trash icon to remove one
- Items will loop automatically — you don't need to repeat them

---

### We Are The Glue Tab

The three cards (The Problem / The Solution / The Invitation) section.

**Headline fields** — the three lines of the big heading on the left.

**Three Columns** — each card has:

| Field | What it does |
|---|---|
| **Number** | Display number (e.g. "01") |
| **Title** | The bold statement on the card |
| **Description** | The supporting text below the title |
| **Image Focal Position** | Controls which part of the card photo is visible (e.g. "30% center"). Leave as-is unless the photo crops badly. |

> **Important:** There must always be exactly 3 columns. Do not add or delete.

---

### Impact Teaser Tab

The dark section with animated numbers showing your 2025 impact.

| Field | What it does |
|---|---|
| **Impact Year** | The year shown in the eyebrow label (e.g. `2025`) |
| **Hero Stats** | The three large animated counters |
| **Secondary Stats** | The four smaller stats in the bottom strip |

**Editing a Hero Stat:**
- **Counter Target** — the number the counter counts up to (e.g. `500000`)
- **Unit Suffix** — the unit shown in orange after the number (e.g. `L` or `kg`)
- **Label** — the bold text below the number (e.g. "Litres of water saved")
- **Note** — the small grey text below (e.g. "through upcycling & reuse")

**Editing a Secondary Stat:**
- **Display Value** — shown as-is, so format it yourself (e.g. `3,200+` or `€10,280`)
- **Label** — the small uppercase text below

> **Tip:** Update these every year when you publish your annual impact report. Change the Impact Year field to match.

---

### Donation Banner Tab

The orange call-to-action section at the bottom of the homepage.

| Field | What it does |
|---|---|
| **Eyebrow Text** | Small label above the headline (e.g. "Support the Mission") |
| **Headline** | The large heading (e.g. "Help us reach 1,000,000 garments.") |
| **Body Copy** | The paragraph describing what donations fund |
| **Primary CTA Label** | Text on the dark button (e.g. "Donate via Donorbox") |
| **Primary CTA URL** | Where the donate button links — your Donorbox URL |
| **Secondary CTA Label** | Text on the outline button (e.g. "Partner With Us") |
| **Stats** | The three numbers in the bottom strip (value + label pairs) |

---

## Research Archive

**Found at:** Sidebar → Research Archive

Each item is a document — a report, white paper, or policy brief — that appears as a card in the Research Archive section of the homepage.

### Adding a New Document

1. Click **Research Archive** in the sidebar
2. Click **+ Create new document** (or the pencil icon)
3. Fill in the fields:

| Field | What it does |
|---|---|
| **Title** | The document name shown on the card |
| **Document Type** | Report / White Paper / Policy Brief — controls the filter pills |
| **Year** | Publication year (e.g. `2025`) |
| **Description** | Short summary shown on the card body |
| **Page Count** | Number of pages (e.g. `24`) |
| **Document URL** | Link to the PDF or external page. Leave blank if not yet published. |
| **Header Colour** | The colour of the card's top section. Use a hex code (e.g. `#E8330A` for orange). |
| **Card Rotation** | Slight tilt in degrees — gives the archive a paper-stack feel. Keep between `-3` and `3`. |
| **Featured** | Toggle on to pin this document to the front of the list |
| **Published Date** | Used for sorting — set to the actual publication date |

4. Click **Publish**

> **Colour guide for card headers:**
> - Orange (Remade In brand): `#E8330A`
> - Green (White Papers): `#008D68`
> - Blue (Policy Briefs): `#0A3BFF`
> - Pink/Red (Reports): `#EB3A69`

### Editing or Unpublishing a Document
- Click the document title in the list to open it
- Make your changes and click **Publish**
- To remove it from the site without deleting, set **Featured** to off and change the Published Date to a future date (it will fall out of the display order)

---

## Community Voices

**Found at:** Sidebar → Community Voices

The quote carousel section with upcycler profiles.

### Adding a New Voice

1. Click **Community Voices**
2. Click **+ Create new**
3. Fill in the fields:

| Field | What it does |
|---|---|
| **Name** | The person's full name |
| **Quote** | Their quote — keep it under 200 characters for best display |
| **Portrait Photo** | Square or portrait photo. The face should be centred — use the hotspot tool (click the photo after uploading, then drag the orange circle to the face) |
| **Market / Hub** | Where they work (e.g. "Kantamanto Market") |
| **City, Country** | Location shown below their name (e.g. "Accra, Ghana") |
| **Display Order** | Controls the order in the carousel. Lower numbers appear first. |
| **Active** | Uncheck to hide this person without deleting them |

4. Click **Publish**

> **Hotspot tip:** After uploading a portrait, click **Edit** on the image, then drag the orange dot to the person's face. This ensures the photo always crops correctly at different screen sizes.

---

## Gallery

**Found at:** Sidebar → Gallery

The five-photo event grid in the "In The Field" section.

The grid has five fixed slots — each occupies a specific position:

| Grid Slot | Position |
|---|---|
| **a** | Large landscape photo — top left (most prominent) |
| **b** | Portrait photo — top right |
| **c** | Small square — bottom left |
| **d** | Small square — bottom centre |
| **e** | Wide landscape — bottom right |

### Replacing a Photo

1. Click the image you want to replace in the list (or create a new one)
2. Set the **Grid Area** to the correct slot (a through e)
3. Upload the new **Photo** — click the image field, then drag & drop or click to browse
4. Set the **Location Label** (e.g. `Amsterdam, NL` or `Accra, Ghana`)
5. Optionally adjust the **Focal Position** — controls which part of the photo is visible (default `50% center` works for most images)
6. Make sure **Active** is checked
7. Click **Publish**

> **Photo tips:**
> - Use landscape photos (wider than tall) for slots **a** and **e**
> - Use portrait photos (taller than wide) for slot **b**
> - Minimum recommended size: **1200 × 800px**
> - Avoid photos with important content at the very edges — it may be cropped

---

## Publishing Changes

Every change in the Studio must be **published** before it appears on the website.

- Look for the **Publish** button in the bottom right of each document
- A green dot means the document is published and live
- An orange dot means there are unpublished changes
- A grey dot means the document has never been published

**How long does it take to appear on the site?**

Most changes are visible within **60 seconds** of publishing (the site checks for updates every minute). Gallery images may take up to **60 minutes** due to a longer cache.

If a change doesn't appear, try a **hard refresh** in your browser (`Ctrl + Shift + R` on Windows, `Cmd + Shift + R` on Mac).

---

## Common Questions

**Can I break the website by making changes here?**
No. Every section of the website has a built-in fallback. If a field is left empty or a document is unpublished, the website will show the default content instead of breaking.

**Can I delete a research document?**
Yes, but it's safer to set it to unpublished (toggle off the Featured flag and set a future date). Deleting is permanent.

**What image formats are supported?**
JPG, PNG, and WebP. JPG is recommended for photos. Keep file sizes under 5MB.

**Can I add more than 5 gallery images?**
The homepage grid always shows exactly 5 slots (a–e). Additional images won't appear on the homepage, but you can prepare future ones by creating them with **Active** turned off and switching them in when you're ready.

**Who do I contact if something isn't working?**
Contact your developer. Provide a screenshot of the error and which section you were editing.

---

*Last updated: March 2026*
