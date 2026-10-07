<div align="center">

# 🏋️ FitTrack

**Train with intent. Log every set.**

A dark, premium workout library and daily planner. Browse lifts, lock them into today's plan, save the rest for later, and watch the week's work add up.

![Next.js](https://img.shields.io/badge/Next.js-App_Router-000?logo=nextdotjs) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white) ![daisyUI](https://img.shields.io/badge/daisyUI-5-ccff00)

</div>

---

## ✨ Key features

1. **Workout library**: responsive 3×4 grid of cards (image, muscle tags, equipment, duration / calories / rating) with a skeleton loading animation while data is fetched.
2. **Instant search & muscle filters**: find a lift by name or tag; filter chips are generated from the live data.
3. **Rich details page**: two-column layout with a specs panel, ordered instructions and one-tap *Add to today's plan* / *Save for later*, each with a toast and a live navbar counter.
4. **My Plan log**: live Exercises / Minutes / Calories metrics, a 5-lift daily cap with a capacity meter, *Today's Plan* and *Saved* tabs, *Mark as Done* and remove actions.
5. **Sort controls**: sort by Duration, Calories or Rating, with an ascending / descending toggle.
6. **Persistent state**: plan, saved and done lists survive reloads via `localStorage` (and sync across tabs).
7. **Resilient data layer**: automatic fallback to the alternative API, retry buttons, and a friendly 404 for unknown routes or workouts.
8. **Responsive & accessible**: mobile, tablet and desktop layouts, visible keyboard focus, ARIA roles, reduced-motion support.

## 🛠️ Technologies

| Purpose | Tech |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + [daisyUI](https://daisyui.com/) 5 (custom `fittrack` theme) |
| Icons | [lucide-react](https://lucide.dev/) |
| Fonts | Oswald (display) + Inter (body) via `@fontsource-variable` |
| State | `useSyncExternalStore` + `localStorage` |

## 📁 Project structure

```
app/
  layout.tsx              Root layout: fonts, navbar, footer, toasts
  page.tsx                Home: hero + library
  workouts/[id]/page.tsx  Workout details
  my-plan/page.tsx        My Plan (log)
  not-found.tsx           404 page
  error.tsx               Runtime error boundary
  globals.css             daisyUI theme + design tokens
components/               Navbar, Hero, Library, WorkoutCard, WorkoutDetail, PlanView, ToastProvider ...
hooks/                    useAsync, useWorkouts, usePlan
lib/                      api (with fallback), planStore, sort, types, brand
public/                   banner.png
```

## 🚀 Getting started

```bash
git clone https://github.com/<your-username>/fittrack-workout-library.git
cd fittrack-workout-library
npm install
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run lint
```

## 🔌 API

| Endpoint | URL |
| --- | --- |
| All workouts | `https://api.abcz.workers.dev/api/fitlog` |
| Single workout | `https://api.abcz.workers.dev/api/fitlog/:id` |
| Fallback (all / single) | `https://api.api-store.workers.dev/api/fitlog[/:id]` |

## ☁️ Deployment

Deployed on **Vercel**. Dynamic routes such as `/workouts/7` are handled by Next.js, so reloading any page works.

🔗 Live site: _add your Vercel link here_

## 🎨 Rebranding

All brand copy lives in [`lib/brand.ts`](./lib/brand.ts), so renaming the product is a one-file change.

---

<div align="center">Built for lifters who log honestly. 💪</div>