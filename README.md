# Pilar Sousa — landings

Landing pages served from one Next.js app: **one repo, one branch, one
Vercel project, one deploy**. Next.js 16 (App Router, Turbopack) + Tailwind v4.

| URL                        | Landing                              | Lives in                                  |
| -------------------------- | ------------------------------------ | ----------------------------------------- |
| `/`                        | Volver al Origen — venta             | `src/app/(ventas-root)/`                  |
| `/mision-origen`           | Misión Origen                        | `src/app/(mision-origen)/mision-origen/`  |
| `/gracias-mision-origen`   | Misión Origen — gracias              | `src/app/(mision-origen)/gracias-mision-origen/` |
| `/bootcamp`                | Bootcamp Reset Identidad             | `src/app/bootcamp/`                       |
| `/bootcamp/gracias`        | Bootcamp — thank you                 | `src/app/bootcamp/gracias/`               |
| `/game`                    | Game (código + form)                 | `src/app/game/`                           |
| `/game/home`, `/game/form` | Game — pantallas internas            | `src/app/game/`                           |
| `/volver-al-origen`        | **Lista de espera 3.ª ed. (en producción)** | `src/app/volver-al-origen/`        |
| `/lista-de-espera`         | **Lista de espera — rediseño (borrador)**   | `src/app/lista-de-espera/`         |

`/ventas` no es una landing: es un `permanentRedirect` a `/`, que quedó de
cuando la de venta vivía en esa ruta.

## Las dos listas de espera

Hay **dos árboles completos y separados** de la misma landing, y la separación
es deliberada:

- **`/volver-al-origen`** es la que está publicada. Es el destino del rewrite de
  la raíz para el dominio de pauta, así que **cualquier cambio aquí sale a
  producción en el siguiente deploy**.
- **`/lista-de-espera`** es el rediseño de la 3.ª edición, donde se trabaja sin
  tocar lo anterior. Va con `robots: noindex`.

**No comparten un solo componente, a propósito.** Con una carpeta común, cada
retoque del borrador se filtraría a la landing publicada — que es exactamente el
problema que esta separación viene a resolver. Duplicar es la decisión correcta
aquí; si algo hay que arreglar en las dos, se arregla dos veces.

Tres cosas más que las mantienen despegadas, y conviene no unificarlas:

| | `/volver-al-origen` | `/lista-de-espera` |
| --- | --- | --- |
| `robots` | indexable | `noindex, nofollow` |
| `GRACIAS_PATH` | `/volver-al-origen/gracias` | `/lista-de-espera/gracias` |
| `LEAD_SOURCE` | `volver-al-origen-waitlist` | `lista-de-espera-borrador` |

Ese `LEAD_SOURCE` distinto es lo que permite distinguir en el CRM de qué landing
vino cada registro. Compartiéndolo, las pruebas del borrador ensuciarían las
métricas de la real.

**Cuidado con los slugs parecidos.** `/lista-de-espera-3.0` y `/lista-de-espera-3`
son rewrites hacia la landing **publicada** (URLs de pauta antiguas), mientras
que `/lista-de-espera`, sin sufijo, es el **borrador**. Un guion de diferencia
lleva a sitios opuestos.

Respaldo de la versión publicada antes de la separación: tag
`respaldo-volver-al-origen-3f79fd8` y rama `respaldo-mi-landing`.

**Game** (`/game`) is a standalone one-screen landing (no scroll) over
`public/game/game-img/hero-game.jpg`, reusing Volver al Origen's `.mo-scope`
palette + fonts. Two actions: a **code** button (client-side check against
`VALID_CODES`, then a content preview + PDF download) and a **form** button
(→ `/game/form`, posts to `/api/register` with `source: "game"`, then a
verification animation + reward PDF). Codes, preview copy and PDF paths all
live in `src/components/game/game-config.ts`; drop the PDFs in
`public/game/pdf/` (see the LEEME there).

## Rewrites y redirects (`next.config.ts`)

Los **rewrites van en `beforeFiles`**, no en la lista suelta que devuelve
`rewrites()` por defecto: aquella se evalúa *después* de los archivos, así que
una regla sobre `/` nunca llegaría a aplicarse porque la raíz ya existe como
página.

- **`/` con `Host: lp.pilarsousa.es` → `/volver-al-origen`.** Es lo que hace que
  el dominio de pauta sirva la lista de espera en su raíz. Condicionado por
  host: en cualquier otro dominio, `/` sigue siendo la landing de venta.
- **`/lista-de-espera-3.0` y `/lista-de-espera-3` → `/volver-al-origen`** (y sus
  `/gracias`). Son URLs de pauta antiguas, sin condición de host.
- **`/gracias` → `/bootcamp/gracias`**, redirect temporal (307). Es una red de
  seguridad mientras el checkout de Stripe siga apuntando ahí su success URL;
  se puede quitar en cuanto se actualice.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Branch and deploy

There is a single branch: **`master`**. It is the Production Branch of the
`pilarsousa` Vercel project, so **pushing to `master` deploys every landing at
once** — incluida la lista de espera que está en producción.
There is no second branch and no second Vercel project — if you find yourself
wanting either, read the palettes section below first.

**History worth knowing.** Until July 2026 the two landings lived on separate
branches (`master` and `main`) with *no common ancestor*, each deploying as its
own Vercel project. They could never be merged: ~20 files collided by name with
entirely different content. Commit `867bb5f` ported Volver al Origen into `master`
as a route instead. The old branches are gone, but their history is preserved:

```bash
git log mision-origen-pre-unificacion   # the 10 commits Volver al Origen was built in
git log mision-origen-rewrite-proxy     # a vercel.json proxy stopgap, superseded
```

## Structure

```
src/app/
  layout.tsx              root: <html>/<body>, GTM, Analytics, ALL font vars
  globals.css             design tokens for ALL landings — read the next section
  (ventas-root)/          route group: stripped from the URL
    layout.tsx            metadata de la landing de venta
    page.tsx              -> /
  (mision-origen)/        route group
    mision-origen/        -> /mision-origen
    gracias-mision-origen/
  bootcamp/               -> /bootcamp, /bootcamp/gracias
  game/                   -> /game, /game/home, /game/form
  volver-al-origen/       -> lista de espera PUBLICADA (+ /gracias)
  lista-de-espera/        -> lista de espera REDISEÑO, noindex (+ /gracias)
  ventas/page.tsx         permanentRedirect a /
  api/                    register, geo, game-quiz
src/components/
  sections/  ui/          Bootcamp's components
  mision-origen/          Misión Origen, namespaced
  ventas/                 la landing de venta
  game/                   el juego
  volver-al-origen/       árbol completo de la lista de espera publicada
  lista-de-espera/        árbol completo del rediseño — NO comparte nada con el anterior
  shared/                 lo verdaderamente común
src/lib/cn.ts             shared
public/
  mision-origen/          imágenes de Misión Origen
  volver-origen/          imágenes de las dos listas de espera
  game/                   imágenes y PDFs del juego
  fonts/                  self-hosted Jost + Zen Dots
  Testimonios/            compartidas
  *.jpg|png               imágenes del Bootcamp, sueltas en la raíz (histórico)
```

`(ventas-root)` y `(mision-origen)` son **route groups**: los paréntesis los
mantienen fuera de la URL, así que el `page.tsx` del primero sirve `/`. Cada
landing tiene su propio layout, de modo que es dueña de su `metadata` y de su
cromo visual sin filtrarlo a las demás.

Qué landing ocupa la raíz lo decide **sólo** cuál está en el route group sin
segmento: cambiarlo es mover carpetas, no tocar Vercel. La excepción es el
dominio de pauta, que llega ahí por el rewrite condicionado por host descrito
arriba y no por la estructura de carpetas.

## The part that will bite you: varias paletas, un solo Tailwind

El `@theme` de Tailwind v4 es **global** — un build, un `:root`. Y aquí hay
varias landings que declaran los mismos tokens semánticos con valores distintos:

|                      | Bootcamp      | Misión Origen  | Volver al Origen |
| -------------------- | ------------- | -------------- | ---------------- |
| `--color-background` | `#080808` ink | `#000000` void | `#0b1502` negro verdoso |
| `--color-accent`     | gold          | hot pink       | verde luminoso   |
| `--font-display`     | Cinzel        | Zen Dots       | Cinzel           |

Se mantienen separadas así:

- Las **paletas crudas** nunca colisionan (gold/forest vs neon/cyan vs
  lumen/forest), así que conviven en `@theme`.
- Los **alias semánticos que sí colisionan** se declaran en `@theme` con los
  valores del Bootcamp y se redefinen en bloques de ámbito dentro de
  `globals.css`: **`.mo-scope`** (Misión Origen) y **`.vo-scope`** (las dos
  listas de espera). El layout de cada landing se envuelve en su clase, y ahí
  `bg-background` resuelve a lo suyo.

Esto funciona sólo porque Tailwind compila las utilidades a `var(--token)` en
vez de incrustar el valor. Dos consecuencias:

1. **Añadir un token semántico a `@theme` obliga a decidir si cada `*-scope`
   necesita su contrapartida.** Si se olvida, el valor del Bootcamp se cuela sin
   avisar en las demás.
2. **Nunca hagas que un componente compartido decida según la landing en la que
   está.** Duplícalo en su carpeta. Son landings de marketing: están hechas para
   divergir, y ésa es también la razón de que `/volver-al-origen` y
   `/lista-de-espera` no compartan nada.

La textura de grano va en `.bc-scope::before` por lo mismo — estuvo en
`body::before`, que ahora cubriría todas las landings a la vez.

## Lead registration (Go High Level)

Todos los formularios del repo —el hero de Misión Origen, el del juego y los de
las dos listas de espera— postean a `src/app/api/register/route.ts`, un route
handler de servidor que reenvía el lead a un webhook entrante de Go High Level.
La URL se lee de la variable `GHL_WEBHOOK_URL` y **nunca viaja al navegador**.
Mientras esa variable no esté puesta (en Vercel, y en `.env.local` para local),
el formulario devuelve error al enviar en lugar de un falso éxito.

El campo `source` del payload es lo que etiqueta cada lead por landing en el
CRM, y por eso cada formulario declara su propia constante `LEAD_SOURCE`. El
endpoint revalida en servidor y devuelve 400 (entrada inválida), 502 (GHL
inalcanzable) o 500 (webhook sin configurar).

- Alta paso a paso —crear el webhook, mapear campos, añadir la variable—:
  **[docs/conectar-go-high-level.md](docs/conectar-go-high-level.md)**.
- Copia de seguridad de los leads en Supabase, por si GHL falla o hay que
  auditar: **[docs/respaldo-leads-supabase.md](docs/respaldo-leads-supabase.md)**.

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
- The Bootcamp's images sit loose in `public/` while Volver al Origen's are in
  `public/mision-origen/`. Moving them to `public/bootcamp/` would be tidier but
  touches a lot of references for no functional gain.
