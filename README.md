# vyshnavi.dev

Personal portfolio for **Vyshnavi D P** — software engineer focused on backend systems and applied AI.

Live at [vyshnavi.dev](https://vyshnavi.dev).

## Stack

- **Next.js 13.5** (App Router, static export)
- **React 18** with **TypeScript**
- **Tailwind CSS** + custom design tokens (`app/globals.css`)
- **Framer Motion** for entrance animations
- **next/font** (Inter + JetBrains Mono, self-hosted)
- Deployed on **Netlify** via `@netlify/plugin-nextjs`

## Project structure

```
app/                    # Next.js routes
  page.tsx              # Home
  about/page.tsx
  projects/page.tsx     # Project index
  projects/[slug]/      # Per-project case studies
  resume/page.tsx
  sitemap.ts            # SEO sitemap
  layout.tsx            # Root layout, metadata, fonts
  globals.css           # Design tokens + base styles
components/
  home/                 # Hero, Projects, Experience, ContactCTA, etc.
  projects/             # Case study + project list
  resume/               # Resume client component
  ui/                   # shadcn primitives (mostly unused)
lib/
  site.ts               # Single source of truth: contact, degree, years, OG
  projects.ts           # Project data (matches each GitHub repo's README)
  motion-prefs.ts       # prefers-reduced-motion helpers
public/
  resume.pdf            # Downloadable resume
  og-default.svg        # OG card for link previews
```

## Single source of truth

Almost every fact about the site (contact email, social URLs, years of
experience, degree, school, OG copy) lives in
[`lib/site.ts`](./lib/site.ts). Change it there and it propagates to the
hero, footer, JSON-LD structured data, metadata, and resume page.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
npm run start
```

The `dev` script sets `WATCHPACK_POLLING=true` to avoid macOS `EMFILE`
errors when too many files are watched.

## Deploy

`netlify.toml` runs `npx next build`; the
[`@netlify/plugin-nextjs`](https://www.npmjs.com/package/@netlify/plugin-nextjs)
plugin handles the App Router output. Push to `main` triggers a
production deploy.

## License

Code is released under the **MIT** license. Content (resume copy,
project descriptions, photography) is © Vyshnavi D P — please don't
reuse those without asking.
