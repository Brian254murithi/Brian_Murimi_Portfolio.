# Brian Murimi — Developer Portfolio

A polished, animated single-page portfolio built with React + Vite, Tailwind CSS, and Framer Motion, with an AI chat assistant backed by a Netlify serverless function.

## Setup

```bash
cd brian-portfolio
npm install
npm run dev        # start dev server
npm run build      # production build
npm run preview    # preview the build
netlify dev        # run locally WITH the chat function (npm i -g netlify-cli)
```

## Things to replace

| What | Where |
| --- | --- |
| Profile photo | `src/assets/profile.svg` → replace with `profile.jpg` (update imports in `Hero.jsx`, `About.jsx`, `ChatPanel.jsx`) |
| Project screenshots | `src/assets/projects/*.svg` → swap each with real screenshots |
| LinkedIn / Instagram usernames | `src/data/socials.js` |
| Live demo / GitHub links | `src/data/projects.js` |
| Contact form ID | `.env` → `VITE_FORMSPREE_ENDPOINT` (and the string in `Contact.jsx`) |
| Anthropic API key | `ANTHROPIC_API_KEY` in Netlify dashboard |
| CV file | drop `cv.pdf` into `public/` |

All social links live in `src/data/socials.js` — one edit updates hero, side rail, contact, and footer.

## Project structure

```
src/
  components/   Navbar, Hero, About, Skills, Experience, Projects, Education,
                Contact, Footer, ChatWidget, ChatPanel, Section, SocialIcons, ...
  data/         socials.js, skills.js, experience.js, projects.js, assistantPrompt.js
  assets/       profile + project mockups (swap me)
netlify/functions/chat.js   # serverless Claude proxy (keeps the API key secret)
netlify.toml
```

## Deploy to Netlify

1. Push this folder to GitHub (or drag the folder into Netlify's deploy UI).
2. New site → Import project; build command `npm run build`, publish directory `dist`.
3. Site settings → Environment variables: add `ANTHROPIC_API_KEY` (from console.anthropic.com) and `VITE_FORMSPREE_ENDPOINT`.
4. Deploy. The chat widget calls `/.netlify/functions/chat`, which uses your key server-side.

## Features

- Dark mode by default with a persisted light/dark toggle
- Typing hero, scroll progress bar, cursor follower (desktop), scroll-drawn animated timeline, tilting project cards with a detail modal, animated counters, staggered social icons
- Floating AI assistant: sessionStorage persistence, quick replies, typing indicator, Esc to close, aria-live announcements, WhatsApp/Email escape hatches, graceful fallback when the API is unreachable
- Rate-limited, length-limited serverless chat proxy
- Accessible (aria labels, keyboard nav, reduced-motion support), SEO/Open Graph meta tags, responsive from 360px to 1440px
