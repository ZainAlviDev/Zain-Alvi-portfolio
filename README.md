# Zain Ul Abideen — Portfolio

Personal portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS** and GSAP.

## Edit content

- All text (profile, experience, projects, skills) lives in `src/data/profile.ts`.
- The "Ask my AI" chatbot answers come from `src/lib/bot.ts` (no external AI service).
- CV download: `public/Zain-Ul-Abideen-CV.pdf` — replace it when your CV changes.
- Project images: `public/projects/*.svg` — swap in real screenshots and update the
  `images` paths in `profile.ts`.

Keep the CV and this site in sync: same dates, titles, projects and skills.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

```bash
npx vercel --prod
```
