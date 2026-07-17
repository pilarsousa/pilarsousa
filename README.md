# Pilar Sousa — landings

Two landing pages served from one Next.js app: **one repo, one branch, one
Vercel project, one deploy**. Next.js 16 (App Router, Turbopack) + Tailwind v4.

| URL                 | Landing                  | Lives in                       |
| ------------------- | ------------------------ | ------------------------------ |
| `/`                 | Misión Origen            | `src/app/(mision-origen)/`     |
| `/bootcamp`         | Bootcamp Reset Identidad | `src/app/bootcamp/`            |
| `/bootcamp/gracias` | Bootcamp — thank you     | `src/app/bootcamp/gracias/`    |

Two redirects in `next.config.ts` cover the URLs from before the root swap:
`/mision-origen` → `/` and `/gracias` → `/bootcamp/gracias`, both temporary
(307). The second is a safety net while the Stripe checkout still points its
success URL at `/gracias`; remove it once the checkout is updated to
`/bootcamp/gracias`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Branch and deploy

There is a single branch: **`master`**. It is the Production Branch of the
`pilarsousa` Vercel project, so **pushing to `master` deploys both landings**.
There is no second branch and no second Vercel project — if you find yourself
wanting either, read the palettes section below first.

**History worth knowing.** Until July 2026 the two landings lived on separate
branches (`master` and `main`) with *no common ancestor*, each deploying as its
own Vercel project. They could never be merged: ~20 files collided by name with
entirely different content. Commit `867bb5f` ported Misión Origen into `master`
as a route instead. The old branches are gone, but their history is preserved:

```bash
git log mision-origen-pre-unificacion   # the 10 commits Misión Origen was built in
git log mision-origen-rewrite-proxy     # a vercel.json proxy stopgap, superseded
```

## Structure

```
src/app/
  layout.tsx              root: <html>/<body>, GTM, Analytics, ALL font vars
  globals.css             design tokens for BOTH landings — read the next section
  (mision-origen)/        route group: stripped from the URL
    layout.tsx            Misión Origen metadata + .mo-scope + AnnouncementBar
    page.tsx              -> /
  bootcamp/
    layout.tsx            Bootcamp metadata + .bc-scope
    page.tsx              -> /bootcamp
    gracias/page.tsx      -> /bootcamp/gracias
src/components/
  sections/  ui/          Bootcamp's components
  mision-origen/          Misión Origen's components, namespaced
  ui/Container.tsx        shared (byte-identical in both landings)
src/lib/cn.ts             shared
public/
  mision-origen/          Misión Origen's images
  fonts/                  self-hosted Jost + Zen Dots (Misión Origen)
  Testimonios/            shared by both landings
  *.jpg|png               Bootcamp's images, loose at the root (historical)
```

`(mision-origen)` is a **route group**: the parentheses keep it out of the URL,
so `page.tsx` there serves `/`. Each landing has its own layout so it owns its
own `metadata` and visual chrome without leaking either onto the other. Which
landing sits at the root is decided purely by which one is the route group —
swapping them is a matter of moving folders, not touching Vercel.

## The part that will bite you: two palettes, one Tailwind

Tailwind v4's `@theme` is **global** — one build, one `:root`. Both landings
define the same semantic tokens with different values:

|                      | Bootcamp      | Misión Origen  |
| -------------------- | ------------- | -------------- |
| `--color-background` | `#080808` ink | `#000000` void |
| `--color-accent`     | gold          | hot pink       |
| `--font-display`     | Cinzel        | Zen Dots       |

They are kept apart like this:

- The **raw palettes** never collide (gold/forest vs neon/cyan), so both sit in
  `@theme` together.
- The **seven colliding semantic aliases** are declared in `@theme` with the
  Bootcamp's values (it is the landing at the domain root), and redefined in the
  **`.mo-scope`** block in `globals.css`. Misión Origen's layout wraps itself in
  that class, so `bg-background` resolves to void inside it and to ink outside.

This works only because Tailwind compiles utilities to `var(--token)` rather
than inlining values. Two consequences:

1. **Adding a semantic token to `@theme` means deciding whether `.mo-scope`
   needs a counterpart.** Forget, and the Bootcamp's value silently bleeds into
   Misión Origen.
2. **Never make a shared component branch on which landing it is in.** Duplicate
   it into `components/mision-origen/` instead. These are marketing landings;
   they are meant to diverge.

The dot-grain texture is on `.bc-scope::before` for the same reason — it used to
be on `body::before`, which would now cover both landings.

## Conventions

- Use the semantic utilities (`bg-background`, `text-cyan`) rather than raw hex.
- **Tailwind v4 only emits classes it can see as static strings** — never build
  a class name by interpolation. This is why the section-seam gradients in
  `Pilar.tsx` hardcode their target color: update them by hand if the palette
  changes.
- Next 16 only serves the `images.qualities` values declared in
  `next.config.ts`; asking for one outside the list is ignored silently and you
  get the default (75).
- See `AGENTS.md`: this Next.js version has breaking changes, and the docs
  shipped in `node_modules/next/dist/docs/` are the source of truth.

## Known loose ends

- `public/fonts/solaria*.woff` and `public/fonts/Jost/static/` (~1.4 MB) are not
  referenced by anything — `next/font` loads only the variable fonts.
- The Bootcamp's images sit loose in `public/` while Misión Origen's are in
  `public/mision-origen/`. Moving them to `public/bootcamp/` would be tidier but
  touches a lot of references for no functional gain.
