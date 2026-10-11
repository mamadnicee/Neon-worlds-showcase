# NEON//ODYSSEY — interactive worlds showcase

A standalone React 18 + Vite 5 + TypeScript experiential showcase. A living atlas of four
impossible worlds rendered with pure CSS/SVG/procedural visuals — no external images, fonts,
or network calls at runtime. Fully offline-buildable.

## Quick start

```bash
npm install     # install dependencies (creates package-lock.json)
npm run dev     # local dev server (http://localhost:5173)
npm run build   # TypeScript check + production build to dist/
npm run typecheck
npm run preview # serve the production build locally
```

## Cloudflare Pages

- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 18 or newer (set `NODE_VERSION` env var if needed)

## Architecture

```
src/
  App.tsx            # page composition: navbar, hero + orbit scene, worlds, notes, CTA
  main.tsx           # React 18 createRoot entry
  style.css          # design system: palette tokens, atmosphere, components, art direction
  data/worlds.ts     # typed content: worlds + field notes (edit here to retheme)
  hooks/useAmbience.ts  # reduced-motion, mobile, scroll progress, active-section observers
```

Key ideas:

- **Procedural visuals only** — the orbit scene is CSS 3D transforms + pointer-captured
  dragging; field-note art is layered gradients/masks; no canvas or WebGL libraries.
- **Scroll state** — scroll progress bar and a `IntersectionObserver`-based timeline
  navigator (right edge) track the active world.
- **Accessibility** — semantic landmarks, skip link, focus-visible outlines, Escape-closing
  mobile menu with focus return, labelled orbit nodes as buttons (keyboard reachable),
  `role="progressbar"` scroll bar, `aria-current` timeline, screen-reader labels on art.
- **Reduced motion** — `prefers-reduced-motion` disables hue rotation, planet float,
  pointer light, transitions, and smooth scrolling via CSS (and React for the pointer layer).
- **Responsive** — fluid `clamp()` type, grid collapses to single column, orbit rescales
  with viewport, mobile menu under 860 px.

## Palette (see `src/style.css` `:root`)

| Token      | Value     | Use                       |
| ---------- | --------- | ------------------------- |
| `--amber`  | `#ffbe0b` | sun, warm accents         |
| `--blaze`  | `#fb5607` | gradients                 |
| `--pink`   | `#ff006e` | brand accent, timeline    |
| `--violet` | `#8338ec` | glow, atmosphere          |
| `--azure`  | `#3a86ff` | cool accents, focus ring  |
| `--black`  | `#080808` | background                |
| `--pearl`  | `#ffe7ff` | text                      |

## Customizing

- **Content**: edit `src/data/worlds.ts` — worlds, titles, stats, and field notes are data.
- **Palette**: change the CSS custom properties in `:root`; every visual derives from them.
- **New world**: append an entry in `worlds.ts` (add a matching `.world-*` class if you want
  a bespoke art variant in `style.css`).
