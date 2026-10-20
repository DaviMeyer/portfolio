# Davi Meyer – Portfolio

Personal portfolio of **Davi Meyer**, Full Stack Developer & Software Engineer at SIX Group.

**Live:** [davimeyer.dev](https://davimeyer.dev)

## About

A single-page portfolio with animated sections for background, experience, projects and hobbies. It supports light and dark mode and several color themes.

## Sections

- **Hero** – introduction
- **Timeline** – education and professional experience
- **Projects** – selected side projects (see below)
- **Hobbies** – what I do beyond coding
- **Footer** – links to GitHub and contact

## Projects showcased

| Project | Description |
|---|---|
| [Tram Departures Board](https://tram.davimeyer.dev) | Live tram departures for two stations in Zürich |
| [Neon Gravity](https://neon-gravity.davimeyer.dev) | Canvas physics game |
| [World Cup 2026 App](https://wm.davimeyer.dev) | Live scores and AI-powered match analyses |
| [Geometry Ultra](https://geometry-ultra.davimeyer.dev) | Online multiplayer game with global leaderboards |

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) with React 19 and the React Compiler
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) 4
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide](https://lucide.dev) icons
- [Vercel](https://vercel.com) for hosting and Web Analytics

## SEO

The site ships a generated `sitemap.xml` and `robots.txt` (`src/app/sitemap.ts`, `src/app/robots.ts`), a canonical URL, Open Graph metadata and `Person` structured data (JSON-LD) in `src/app/layout.tsx`.

## Getting started

Requirements: Node.js 20 or newer.

```bash
git clone https://github.com/DaviMeyer/portfolio.git
cd portfolio
npm install
npm run dev
```

The app runs on [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── app/          # Layout, page, sitemap, robots
├── components/   # Hero, Timeline, Projects, Hobbies, Footer, ...
├── context/      # Theme context (mode and color theme)
├── data/         # Content for timeline and hobbies
└── types/        # Shared TypeScript types
```

## Contact

- Website: [davimeyer.dev](https://davimeyer.dev)
- GitHub: [@DaviMeyer](https://github.com/DaviMeyer)
