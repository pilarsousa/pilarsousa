# Respaldo de leads en Supabase

Los leads del formulario de Misión Origen se guardan en Supabase **antes** de
enviarse a Go High Level. Si GHL falla (workflow despublicado, sin saldo,
caído), el contacto queda igual en la base y se puede exportar a mano.

> **Nota sobre la guía de "Connect to Supabase" de Next.js.** El asistente de
> Supabase sugiere `@supabase/ssr`, cookies y middleware con variables
> `NEXT_PUBLIC_*`. Eso es para apps donde los visitantes **inician sesión** y
> cada uno ve sus propios datos. Este caso es el opuesto: un endpoint de
> servidor que escribe una tabla privada. Por eso aquí se usa `supabase-js`
> directo con la **service role key** y variables **sin** el prefijo
> `NEXT_PUBLIC_`: ese prefijo publica el valor en el bundle del navegador, y
> una tabla con datos personales de clientes no debe ser accesible desde ahí.

---

## Paso 1 — Crear la tabla

En Supabase → **SQL Editor** → **New query**, pegá esto y ejecutá (**Run**):

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  email text not null,
  telefono text not null,
  source text not null default 'unknown',
  -- pending: guardado, envío a GHL sin resolver
  -- sent:    GHL lo aceptó
  -- failed:  GHL lo rechazó — hay que cargarlo a mano
  status text not null default 'pending',
  detail text
);

-- Consultas típicas: "los que fallaron" y "los últimos primero".
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- RLS activo y SIN policies: nadie entra con las claves públicas.
-- El endpoint usa la service role key, que las omite por diseño.
alter table public.leads enable row level security;
```

## Paso 2 — Copiar las credenciales

En Supabase → **Settings → API**:

| Dato | Dónde está |
| ---- | ---------- |
| **Project URL** | `https://xxxxx.supabase.co` |
| **service_role key** | Sección "Project API keys" → `service_role` → *Reveal* |

> ⚠️ La **service_role key** salta todas las reglas de seguridad. Va sólo en
> variables de entorno del servidor. Nunca en el código, ni en el repo, ni en
> un chat, ni con prefijo `NEXT_PUBLIC_`.

## Paso 3 — Cargar las variables en Vercel

Vercel → proyecto **`pilarsousa`** → **Settings → Environment Variables**:

| Name | Value | Environments |
| ---- | ----- | ------------ |
| `SUPABASE_URL` | la Project URL del Paso 2 | Production + Preview |
| `SUPABASE_SERVICE_ROLE_KEY` | la service_role key del Paso 2 | Production + Preview |

Las variables nuevas aplican recién en un deploy nuevo: hacé **Redeploy** o
esperá al próximo push.

## Paso 4 — En local (opcional)

Creá `.env.local` en la raíz del proyecto:

```
GHL_WEBHOOK_URL=tu-url-de-webhook
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

`.env.local` está en `.gitignore`, así que no se sube.

---

## Ver y exportar los leads

Supabase → **Table Editor** → tabla `leads`. Ahí los ves, filtrás y exportás a
CSV sin escribir SQL.

Para ver sólo los que **no** llegaron a GHL, SQL Editor:

```sql
select created_at, nombre, email, telefono, detail
from public.leads
where status = 'failed'
order by created_at desc;
```

Esos son los que hay que cargar a mano en GHL.

---

## Qué pasa si Supabase no está configurado

El endpoint **no se rompe**: detecta que faltan las variables, lo avisa en los
logs y sigue enviando a GHL como siempre. El respaldo simplemente queda
inactivo hasta que se carguen. El formulario nunca deja de funcionar por esto.
