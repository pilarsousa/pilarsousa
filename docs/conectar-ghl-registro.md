# Conectar /registro con GoHighLevel por API

Guía para dejar funcionando el registro del **Seminario de Neurometafísica**
(`lp.pilarsousa.es/registro`) en GoHighLevel: cada persona que se registra
queda guardada como contacto, con la etiqueta `registro-neurometafisica`, y
recibe el email de registro.

## Cómo funciona

1. La persona completa el formulario de `/registro`.
2. El servidor guarda el lead en Supabase (respaldo) y lo manda a GHL por API:
   crea o actualiza el contacto y le **suma** la etiqueta
   `registro-neurometafisica` (sin borrar las etiquetas que ya tuviera).
3. En GHL, un workflow con el disparador "etiqueta añadida" manda el email.

La etiqueta es el "grupo": identifica a quienes vienen de `/registro`, sirve
para filtrarlos en una lista inteligente y es lo que dispara el email.

Las demás landings siguen por el webhook de siempre (`GHL_WEBHOOK_URL`).
Mientras no se carguen las dos variables del paso 3, `/registro` también
sigue por el webhook.

> Los nombres del menú pueden aparecer en español o en inglés según el idioma
> de la cuenta; acá van los dos.

## 1. Crear el token de API (Private Integration)

1. Entrar a la **subcuenta de Pilar** (no a la vista de agencia).
2. **Configuración (Settings) → Integraciones privadas (Private Integrations)**.
   - Si no aparece: en la vista de agencia, revisar **Labs** y activar
     Private Integrations, o pedir el permiso en
     **Settings → Team → (tu usuario) → Roles & Permissions**.
3. **Crear nueva integración (Create new Integration)**.
   - Nombre: `Landing /registro (Vercel)`.
   - Descripción: `Guarda los registros de lp.pilarsousa.es/registro`.
4. Permisos (scopes): marcar **solo** los de contactos:
   - **View Contacts** (`contacts.readonly`)
   - **Edit Contacts** (`contacts.write`)
5. Crear y **copiar el token en ese momento**: GHL lo muestra una sola vez.
   Guardarlo en un gestor de contraseñas, nunca en un chat ni en el código.

El token no vence solo. GHL recomienda rotarlo cada 90 días (al rotar, el
viejo sigue funcionando 7 días; hay tiempo de actualizarlo en Vercel).

## 2. Copiar el ID de la subcuenta (Location ID)

**Configuración (Settings) → Perfil de la empresa (Business Profile)** →
campo **Location ID**.

También está en la URL de GHL: `app.gohighlevel.com/v2/location/ESTE_ES_EL_ID/...`

## 3. Cargar las variables en Vercel

Proyecto `pilarsousa` → **Settings → Environment Variables**:

| Variable          | Valor                        | Entorno     |
| ----------------- | ---------------------------- | ----------- |
| `GHL_API_KEY`     | el token del paso 1          | Production  |
| `GHL_LOCATION_ID` | el ID del paso 2             | Production  |

Sólo **Production**: si se cargan en Preview, cada prueba en una vista previa
crea contactos reales y manda emails reales.

Después, **Deployments → (el último) → Redeploy** para que las tome.

## 4. Crear la etiqueta y la lista (el grupo)

1. **Configuración → Etiquetas (Tags) → Nueva etiqueta**:
   `registro-neurometafisica` (exactamente así, en minúsculas y con guion).
   GHL la crearía sola con el primer registro, pero crearla antes permite
   armar el workflow ahora.
2. **Contactos (Contacts) → Filtros → Etiqueta (Tag) → es →
   `registro-neurometafisica` → Guardar como lista inteligente (Smart List)**:
   `Registro · Neurometafísica`. Ahí se ven todos los registrados.

## 5. Crear el email

1. **Marketing → Emails → Plantillas (Templates) → Nueva (New)**.
2. Elegir el editor de **código HTML** ("Code editor" / "HTML personalizado").
3. Pegar el HTML del email de registro. No está en el repo a propósito: lo
   tiene Laureano (en su copia local, `docs/emails/`, ignorada por git).
4. **Reemplazar los campos entre corchetes** antes de guardar:
   `[FECHA]`, `[HORA ESPAÑA]`, `[HORA MÉXICO]`, `[HORA ARGENTINA]`.
   Tienen que coincidir con la landing.
5. Guardar la plantilla como `Registro · Neurometafísica`.

Asunto sugerido: `Tu plaza está reservada · Seminario de Neurometafísica`
Preencabezado: ya va dentro del HTML.

Remitente: usar un email del dominio de Pilar verificado en GHL
(**Configuración → Email Services**). Con un dominio sin verificar, el email
tiende a caer en spam.

## 6. Crear el workflow que lo envía

1. **Automatización (Automation) → Workflows → Crear workflow → Empezar desde
   cero (Start from scratch)**.
2. **Disparador (Trigger): Etiqueta de contacto (Contact Tag)**.
   - Filtro: **Etiqueta añadida (Tag Added)** = `registro-neurometafisica`.
3. **Acción: Enviar email (Send Email)**.
   - Plantilla: `Registro · Neurometafísica`.
   - Remitente y asunto del paso 5.
4. Nombre del workflow: `Registro · Neurometafísica → email de bienvenida`.
5. **Guardar** y **Publicar** (arriba a la derecha, de Draft a Publish).

## 7. Probar de punta a punta

1. Registrarse en `lp.pilarsousa.es/registro` con un email propio.
2. En GHL: el contacto aparece en la lista `Registro · Neurometafísica`, con la
   etiqueta y la fuente `Landing /registro · Seminario de Neurometafísica`.
3. Llega el email de registro.
4. En Supabase, tabla `leads`: la fila con `source = 'neurometafisica-v1'`
   tiene `status = 'sent'` y en `detail` el ID del contacto de GHL.

Si en Supabase el estado es `failed`, la columna `detail` dice por qué:

| `detail` empieza con          | Qué pasó                                             |
| ----------------------------- | ---------------------------------------------------- |
| `ghl_api_upsert_401` / `403`  | Token mal copiado o sin el permiso Edit Contacts     |
| `ghl_api_upsert_400` / `422`  | Location ID equivocado o dato rechazado por GHL      |
| `ghl_api_tags_…`              | El contacto se guardó pero sin etiqueta: no salió el email |
| `…_inalcanzable`              | GHL no respondió a tiempo (8 s)                      |

En todos esos casos el lead no se pierde: queda en Supabase y en los logs de
Vercel (buscar `LEAD_FALLBACK`).

## En el código

- `src/lib/ghl.ts`: la llamada a la API, qué landings van por API y con qué
  etiqueta (`LANDINGS_POR_API`).
- `src/app/api/register/route.ts`: decide API o webhook según la landing.
- El HTML del email no se versiona (`docs/emails/` está en `.gitignore`): la
  versión vigente es la plantilla guardada en GoHighLevel.
