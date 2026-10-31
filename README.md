# Elara Zahnmedizin – Website

Single-page landing site for Elara Zahnmedizin, Meitingen (Next.js 16, TypeScript, Tailwind CSS 4).

```bash
npm install
cp .env.example .env.local   # fill in what is available
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint
```

## Where things live

| What | Where |
|---|---|
| All practice details, copy, services, FAQs, image paths | `src/content/site.ts` |
| Page sections | `src/components/sections/` |
| Enquiry API (validation + delivery) | `src/app/api/anfrage/route.ts`, `src/lib/enquiry.ts` |
| Analytics hooks + consent | `src/lib/analytics.ts`, `src/components/ConsentManager.tsx`, `src/components/AnalyticsListener.tsx` |
| Impressum / Datenschutz text | `src/content/legal.ts` (pages in `src/app/impressum`, `src/app/datenschutz`) |
| Images | `public/images/` |
| 3D showcase page (`/3d`) | `src/app/3d/page.tsx`, `src/app/3d/three-d.css`, `src/components/three/` |
| three.js (vendored custom build, MIT) | `src/vendor/three/` |

## 3D page

`/3d` is a separate, eye-catching version of the landing page (the classic page at `/` is unchanged):
a WebGL tooth in the hero that follows the mouse and turns while scrolling, 3D tilt cards for the
services, a rotating 3D photo carousel, extruded step numbers and scroll-in animations. It reuses the
content from `src/content/site.ts` and the real contact form. three.js is only loaded on this page.
Visitors with "reduce motion" get a still scene; without WebGL the page still works (no tooth).
The page is set to `noindex` so the classic page stays the one search engines show.

To rebuild the vendored three.js file (e.g. after adding a class to the scene), bundle the needed
exports from `three/build/three.module.js` with esbuild (`--bundle --format=esm --minify`).

## Deployment

- **Production (recommended):** any Node host (e.g. Vercel) with `npm run build && npm start`. The
  built-in enquiry API (`/api/anfrage`) works there.
- **Preview on GitHub Pages:** `.github/workflows/pages.yml` builds a static export on every push to
  `main` and publishes it at `https://shahzadishq.github.io/elara/` (not indexed by search engines).
  Pages has no server, so the enquiry form needs the repository variable `ENQUIRY_ENDPOINT`
  (Settings → Secrets and variables → Actions → Variables), e.g. a Formspree form URL. Optional
  variables: `BOOKING_URL`, `GTM_ID`. Repository Settings → Pages → Source must be **GitHub Actions**.

Configuration via environment variables is documented in `.env.example`.
Launch status, open items and content that needs client confirmation: see **[HANDOVER.md](./HANDOVER.md)**.
