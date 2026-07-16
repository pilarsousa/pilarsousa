# Misión Origen

Landing page for Misión Origen — Next.js 16 (App Router, Turbopack) +
Tailwind v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Branches and deployments

This repository holds **two unrelated landing pages**. They share no commit
history and no code — only the repo.

| Branch   | Site          | Vercel project  | URL                        |
| -------- | ------------- | --------------- | -------------------------- |
| `master` | Bootcamp      | `pilarsousa`    | `pilarsousa.vercel.app`    |
| `main`   | Misión Origen | `mision-origen` | `mision-origen.vercel.app` |

`master` is the repository's default branch, so **pull requests target it by
default** — always retarget to `main` when working on Misión Origen. Merging the
two branches is not viable: they have no common ancestor, and about 20 files
collide (`globals.css`, `layout.tsx`, `page.tsx` and several components share
names but are entirely different).

## Structure

- `src/app/` — App Router entry, root layout, global theme tokens
- `src/components/sections/` — one file per landing section, composed in `page.tsx`
- `src/components/ui/` — reusable primitives (buttons, reveals, carousel)
- `public/fonts/` — self-hosted fonts (Jost, Zen Dots)

## Conventions

- Design tokens live in `@theme` inside `src/app/globals.css`; use the semantic
  utilities (`bg-background`, `text-cyan`) rather than raw hex.
- Tailwind v4 only emits classes it can see as **static strings** — never build
  a class name by interpolation.
- Section seams are faded with a 24px gradient overlay pinned to the section
  edge (see `Pilar.tsx`). The gradient's target color is hardcoded because of
  the static-string rule above, so it must be updated by hand if the palette
  changes.
