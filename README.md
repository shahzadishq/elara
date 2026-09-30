# Elara Zahnmedizin – Website

Single-page landing site for Elara Zahnmedizin, Augsburg (Next.js 16, TypeScript, Tailwind CSS 4).

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
| Legal page placeholders | `src/app/impressum`, `src/app/datenschutz` |
| Images | `public/images/` |

Configuration via environment variables is documented in `.env.example`.
Launch status, open items and content that needs client confirmation: see **[HANDOVER.md](./HANDOVER.md)**.
