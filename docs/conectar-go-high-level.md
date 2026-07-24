# Conectar el formulario con Go High Level (GHL)

Guía para dejar que los leads del formulario de **Misión Origen** (el de la
sección Hero) se guarden como contactos en Go High Level.

El código ya está hecho y probado. Lo que falta es la configuración del lado de
GHL y de Vercel, que es lo que cubre este documento. No hay que tocar código
para conectarlo — solo cargar una variable de entorno.

---

## Cómo funciona (para entender qué estás conectando)

```
Formulario (navegador)
        │  POST /api/register  (nombre, email, telefono, source)
        ▼
Route handler en el servidor  ── src/app/api/register/route.ts
        │  reenvía el lead al webhook de GHL
        ▼
Go High Level (Inbound Webhook → Workflow → crea el contacto)
```

**Por qué pasa por un endpoint nuestro y no directo a GHL:** si el navegador
llamara a GHL directamente, la URL del webhook quedaría visible en el código de
la página y cualquiera podría verla y llenarte la cuenta de contactos falsos. El
endpoint corre en el servidor de Vercel, así que la URL se mantiene secreta.

El endpoint lee la URL del webhook de una variable de entorno llamada
**`GHL_WEBHOOK_URL`**. Mientras esa variable no esté cargada, el formulario
muestra un error al enviar (es a propósito: no finge un éxito que no ocurrió).

---

## Paso 1 — Crear el Inbound Webhook en GHL

1. En GHL, entrá a **Automation → Workflows** y creá un workflow nuevo (en
   blanco).
2. Como **trigger**, elegí **"Inbound Webhook"**.
3. GHL te muestra una **URL de webhook**. Copiala — esa es la que vas a cargar
   en Vercel en el Paso 3.

## Paso 2 — Que GHL "aprenda" los campos

GHL necesita ver un envío de ejemplo para poder mapear los campos. El endpoint
le manda este JSON:

```json
{
  "nombre": "Ana Pérez",
  "email": "ana@mail.com",
  "telefono": "+34 600 123 456",
  "source": "mision-origen",
  "submittedAt": "2026-07-17T15:42:22.135Z"
}
```

Para dispararle un ejemplo, pegá tu URL de webhook en este comando y ejecutalo
(desde cualquier terminal con `curl`):

```bash
curl -X POST "TU_URL_DE_WEBHOOK" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana Prueba","email":"ana@mail.com","telefono":"+34600123456","source":"mision-origen","submittedAt":"2026-07-17T15:42:22.135Z"}'
```

Después volvé al workflow: GHL ya debería reconocer los campos `nombre`,
`email`, `telefono`, `source` y `submittedAt` para mapearlos.

## Paso 3 — Mapear los campos y crear el contacto

En el workflow, después del trigger, agregá una acción **"Create/Update
Contact"** y mapeá:

| Campo que llega | Campo del contacto en GHL |
| --------------- | ------------------------- |
| `nombre`        | Nombre / Full Name        |
| `email`         | Email                     |
| `telefono`      | Phone                     |
| `source`        | (opcional) un tag o campo personalizado |

- `source` indica de qué landing vino el lead. Hoy siempre es `"mision-origen"`,
  pero el campo ya existe por si el Bootcamp suma un formulario más adelante.
  Conviene usarlo para agregar un **tag** (ej. una acción "Add Tag" con el valor
  de `source`) y así poder segmentar.
- Podés agregar más acciones después: mandar un mail de bienvenida, sumar a una
  campaña, a un pipeline, etc. Eso ya es todo dentro de GHL.

Cuando termines, **guardá y publicá** el workflow.

## Paso 4 — Cargar la URL en Vercel

1. Entrá al proyecto **`pilarsousa`** en Vercel → **Settings → Environment
   Variables**.
2. Agregá una variable:
   - **Name:** `GHL_WEBHOOK_URL`
   - **Value:** la URL del webhook del Paso 1
   - **Environments:** marcá **Production** (y **Preview** también, si querés que
     los deploys de prueba capturen leads).
3. **Importante:** las variables nuevas recién aplican en un deploy nuevo. Hacé
   un **Redeploy** del último deploy, o esperá al próximo push.

## Paso 5 — Probar de verdad

Entrá a `pilarsousa.vercel.app/`, completá el formulario del Hero y envialo.
Debería aparecer un **contacto nuevo en GHL** con los datos cargados. Ese es el
único paso que confirma que todo quedó bien conectado.

---

## Probar en local (opcional, para desarrollo)

Si trabajás el proyecto en tu máquina y querés que el formulario funcione ahí:

1. Copiá `.env.example` a `.env.local`.
2. Poné tu URL de webhook en `GHL_WEBHOOK_URL`.
3. Corré `npm run dev`. `.env.local` no se sube a git, así que tu URL no se
   filtra.

---

## Si algo no anda

El endpoint devuelve códigos distintos según el problema. Los ves en Vercel →
tu proyecto → **Logs** (o en la consola del navegador, pestaña Network, al
enviar el formulario):

| Código | Qué significa | Qué revisar |
| ------ | ------------- | ----------- |
| **500** | `GHL_WEBHOOK_URL` no está cargada | Cargá la variable en Vercel (Paso 4) y redeployá |
| **400** | Los datos del formulario llegaron incompletos o mal | Normalmente es validación; no suele pasar desde el form real |
| **200** con `queued: true` | GHL rechazó el lead, pero el lead **no se perdió** | Ver "Recuperar leads" abajo, y revisar por qué falla GHL |
| **200** | Todo bien, el lead se envió | Si no aparece en GHL, revisá el mapeo de campos del Paso 3 |

### Recuperar leads cuando GHL falla

Si GHL rechaza el envío (workflow despublicado, URL mal, o **sin saldo en la
cuenta** — GHL devuelve `422 Billing failure` cuando el workflow usa una acción
premium y la Location no tiene fondos), el endpoint **no descarta el lead**: lo
escribe en los logs y le responde `200` al navegador, para que el visitante vea
la confirmación en lugar de un error que no puede resolver.

Para rescatarlos, andá a **Vercel → tu proyecto → Logs** y buscá
`LEAD_FALLBACK`. Cada coincidencia es una línea como esta:

```
LEAD_FALLBACK {"nombre":"Ana Pérez","email":"ana@mail.com","telefono":"+34600123456","source":"mision-origen","reason":"ghl_422","at":"2026-07-24T11:51:29.113Z"}
```

Copiá esos datos y cargalos a mano en GHL.

> **Ojo con la retención de logs.** En el plan Hobby de Vercel los logs duran
> ~1 hora. Si la caída se extiende, revisá y exportá seguido, o el respaldo se
> pierde igual. Es un paliativo para salir del paso — la solución de fondo es
> arreglar la causa en GHL.

Referencias en el código, por si hace falta:

- Endpoint: `src/app/api/register/route.ts`
- Formulario: `src/components/mision-origen/ui/ReservaForm.tsx`
- Plantilla de la variable: `.env.example`
