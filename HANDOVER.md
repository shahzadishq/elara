# Elara Zahnmedizin – Handover

Status: **design and build done, but not ready to launch.** See "Launch blockers" below.

## 1. What was built

A single-page landing site in German (Next.js 16, TypeScript, Tailwind CSS 4). It is built for Google Ads traffic. Everything a visitor reads is in `src/content/site.ts`.

The page sections, in order:

- Sticky header with anchor navigation and click-to-call.
- Hero (white background).
- Practice introduction.
- Services: 8 treatments as a card grid. The whole card links to the appointment form.
- "So funktioniert's": a three-step scroll story. On desktop the image column stays pinned, and each step activates as it reaches the middle of the screen, cross-fading its photo and filling the progress line. On mobile each step shows its own photo.
- Why Elara.
- Patient testimonials (see section 3).
- Team.
- FAQ accordion.
- Contact section with phone, e-mail, opening hours and the enquiry form. Opening hours also appear in the hero image card. The address and "Route planen" are in the footer.
- Footer.
- On mobile, a bottom action bar with "Termin vereinbaren" and "Anrufen". It hides while the contact form is on screen so it never covers form fields.

**Design.** The palette comes from the logo: navy `#103f72` and teal `#20a8b2`, set on warm ivory and sand. All text uses Manrope, the logo's font, self-hosted through `next/font`. Headings are extra-bold, with a hand-drawn teal underline on key words. To underline a word, wrap it in `*asterisks*` in `site.ts`. Eyebrow labels are pill-shaped. The logo and four photos come from the updated brand-asset set (tooth icon). The X-ray room photo is from the first set; it shows no branding. All 5 photos are used and cropped per section with their aspect ratios kept. The team group photo appears twice (scroll story and Team section) because there are only 5 photos.

**Enquiry form** (`/api/anfrage`):

- Fields: name, preferred contact method (e-mail or phone), an optional preferred time, and an optional short message.
- It warns visitors not to enter confidential health information.
- Validation runs on the client and again on the server. The server also has a honeypot field and a basic rate limit.
- It has loading, success and error states, and focuses/announces them for screen readers.
- The server reports success **only after delivery succeeds**. Delivery goes through Resend e-mail or a webhook (see `.env.example`). If neither is configured, the server returns 503 and the visitor sees an error message with the phone number.

**Analytics hooks** (`src/lib/analytics.ts`):

- Events: `appointment_cta_click`, `phone_click`, `email_click`, `directions_click`, and `enquiry_submit_success`. The last one fires only after the server confirms the enquiry was delivered.
- Events carry only the button's placement on the page, and the service ID for service buttons. No personal data is sent.
- Events are pushed to `dataLayer` only after consent.
- Google Tag Manager loads **only** after the visitor clicks "Akzeptieren". The consent banner appears only when `NEXT_PUBLIC_GTM_ID` is set. Without an ID there is no banner and no tracking script.

**SEO:**

- `lang="de"`, a single H1, a German title, meta description and Open Graph tags.
- `Dentist` structured data with verified details only. There is no rating or review markup.
- The canonical URL, OG image and structured-data URL are only emitted once `NEXT_PUBLIC_SITE_URL` is set.

**Review mode.** Set `NEXT_PUBLIC_REVIEW_MODE=1` on a preview deployment. Every unconfirmed item then shows a "Zu bestätigen" badge, and the draft FAQs become visible, so the client can review them on the page.

## 2. Reference services used – need confirmation

Both reference sites were fetched as page text only; I did not see them rendered. I used them for topics, services and conversion patterns. No copy, images, reviews, team identities or credentials were taken from them.

| Service on the page | amedis-augsburg.de | alldent-zahnzentrum-augsburg.de |
|---|---|---|
| Prophylaxe & professionelle Zahnreinigung | ✓ | ✓ |
| Parodontitis-Behandlung | ✓ | ✓ |
| Füllungen & Wurzelbehandlung | ✓ (Wurzelbehandlung) | ✓ |
| Zahnersatz (Kronen, Brücken, Prothesen) | ✓ | ✓ |
| Implantate | ✓ | ✓ |
| Oralchirurgie & Weisheitszähne | ✓ (MKG-Chirurgie) | ✓ |
| Kinderzahnheilkunde | ✓ | – |
| Ästhetische Zahnmedizin (Bleaching, Veneers, Aligner) | ✓ | ✓ |

Some reference topics were **deliberately left out** because they involve claims I could not verify:

- Notdienst / 24-hour emergency service.
- Angstpatienten (anxious patients).
- Narkose or Dämmerschlaf (sedation).
- 3D-Röntgen/DVT and microscope treatment.
- An in-house dental lab.
- Kiefergelenk (jaw joint) and Zähneknirschen (teeth grinding).
- Invisalign as a brand name.
- "Feste Zähne an einem Tag" (fixed teeth in one day).

Any of these can be added in `site.ts` once confirmed.

Other wording to confirm:

- **Approach statements.** The hero intro, "Die Praxis" and the Team text say things like "nehmen uns Zeit" and "erklären verständlich". These are soft commitments, not facts I could check.
- **"Viele Behandlungen unter einem Dach"** depends on the final service list.
- **FAQ "Welche Behandlungen…"** also depends on the final service list.
- **FAQ "Akute Zahnschmerzen"** tells people to call during opening hours and to use the zahnärztlicher Notdienst otherwise. It makes no availability promise, but the practice should approve it.
- **Step 3 of the scroll story** uses the X-ray room photo as a general view of the practice rooms.

## 3. Missing client information or integrations

- **Contact details:** supplied by the client: Hauptstraße 56, 86405 Meitingen · phone +49 152 342 736 71 · info@landsberger-medienagentur.de · Mo–Fr 9–17, Sa 9–12, Sunday closed.
- **Form delivery:** no endpoint or credentials were supplied. Set either the `RESEND_*` variables or `CONTACT_WEBHOOK_URL`.
- **Impressum and Datenschutz:** no approved text was supplied. `/impressum` and `/datenschutz` currently show a clearly marked placeholder and are set to `noindex`. The privacy text in the form and in the consent banner also needs legal review against the final setup.
- **Team:** no names, titles or biographies were supplied. The Team section shows the group photo with generic text only. To add people, fill in `team.members` in `site.ts`.
- **Patient reviews:** five reviews supplied by the client (Alex B., Maria T., Michael R., Jennifer F., Richard S.) are shown. They are labelled as Google reviews and show a 5-star rating as supplied by the client. The stars are visual only: there is no review or rating structured data, because Google does not allow self-serving review markup.
- **Booking URL:** none supplied, so every "Termin vereinbaren" button goes to the enquiry form. Set `NEXT_PUBLIC_BOOKING_URL` if an online booking tool exists (e.g. Doctolib).
- **Analytics / Google Ads:** no GTM or Ads IDs were supplied, so no tracking is active. Set `NEXT_PUBLIC_GTM_ID`, then configure the Google Ads conversion inside GTM using the `enquiry_submit_success` and `phone_click` events.
- **Production domain:** unknown. Set `NEXT_PUBLIC_SITE_URL` to enable the canonical URL, OG image and structured-data URL.
- **Draft FAQs:** the answers are hidden until supplied. They cover:
  - which insurance types the practice treats (gesetzlich/privat),
  - what to bring to the first appointment,
  - how the practice handles anxious patients.
- **More photography (recommended):** with only 5 photos, one image is used twice. Individual team portraits, a treatment room and an exterior or entrance shot would let every section have its own image.

## Preview deployment (GitHub Pages)

- Workflow `.github/workflows/pages.yml` deploys a static export on every push to `main` to `https://shahzadishq.github.io/elara/`. The preview is marked `noindex`.
- Pages cannot run the server-side form API. Until the `ENQUIRY_ENDPOINT` repository variable points at an external form service (for example Formspree), the preview form shows its error state with the phone number. It never shows a fake success.
- For the production launch, a Node host (for example Vercel) is recommended. There the built-in `/api/anfrage` route with Resend or a webhook works as described above.

## 4. Checks completed

- `npm run build`, `tsc --noEmit` and `npm run lint` all pass cleanly.
- Every section was inspected at 375, 768, 1024 and 1440 px. There is no horizontal overflow, no broken images, and exactly one H1.
- Automated Playwright checks, all passing:
  - The mobile menu opens and closes. Focus moves into it and back, Escape closes it, and it closes after a link is clicked.
  - Anchor navigation scrolls to the right section.
  - The service accordion expands, and its appointment button goes to `#kontakt`.
  - The FAQ accordion works from the keyboard. Collapsed panels are `inert`, so hidden links can't be tabbed to.
  - The mobile bar hides while the contact form is on screen.
  - The form shows required-field and format errors and moves focus to the first invalid field.
  - Form errors: with no delivery configured, the server returns 503, the visitor sees the error state, no success is shown and no conversion event fires.
  - Form success: with a test webhook configured, the server returns 200, the webhook receives the enquiry, the success state shows and exactly one conversion event fires.
  - No personal data appears in any analytics event.
  - Consent: with a test GTM ID, nothing loads before a choice or after "Ablehnen". GTM loads only after "Akzeptieren", and events then reach `dataLayer`.
  - The consent banner sits above the mobile action bar.
- Static export for GitHub Pages was served locally under `/elara/` and checked at 375 and 1440 px: every image, font and script loads, there are no failed requests and no overflow, the menu works, legal pages and footer links resolve, and the form shows its error state when no endpoint is set.
- Server-side validation was checked directly: invalid JSON is rejected, and so is invalid data.
- Bugs found and fixed during testing:
  - The mobile menu was clipped behind the page because the header's backdrop-filter made it the containing block for the menu.
  - Validating a field on blur shifted the layout, which could make a click on the contact-method toggle miss.

## 5. Remaining launch blockers

1. Configure form delivery (the contact form is built; it needs `RESEND_*` or `CONTACT_WEBHOOK_URL`) and send a real test enquiry to the practice inbox.
2. Replace the placeholder Impressum and Datenschutz with approved legal texts, and have the form and consent wording reviewed.
3. Get the client to confirm the service list and the approach wording (section 2).
4. Set `NEXT_PUBLIC_SITE_URL`, plus `NEXT_PUBLIC_GTM_ID` if tracking is wanted. Then set up the Ads conversions in GTM.

Note: this site is set up to support a Google Ads landing page, but it does not guarantee ad approval or legal compliance.
