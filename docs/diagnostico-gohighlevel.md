# Diagnóstico de frecuencia — qué hay que configurar en GoHighLevel

Documento para el técnico que administra GoHighLevel del lado del cliente.
Describe qué le va a llegar desde la web y qué tiene que dejar montado para
recibirlo. **No hace falta darnos ningún acceso a GHL**: sólo la URL del
webhook.

---

## 1. Lo que hay que crear

Un **workflow** con disparador **Inbound Webhook**.

Al crearlo, GHL genera una URL. **Esa URL es lo único que necesitamos.** Se nos
pasa y la cargamos en una variable de entorno del sitio
(`GHL_DIAGNOSTICO_WEBHOOK_URL`); no viaja al navegador ni queda visible en la
página.

> Si preferís que este embudo entre por el mismo workflow que ya recibe los
> registros de la lista de espera, no hace falta URL nueva: se distinguen por
> el campo `source`. Nosotros recomendamos uno propio, porque las acciones
> posteriores son distintas.

---

## 2. Cuándo se dispara

**Dos veces por persona, y las dos con el mismo email.**

| Momento | `etapa` | Qué trae |
|---|---|---|
| Al completar nombre, email y teléfono, **antes** del test | `formulario` | Sólo datos de contacto |
| Al terminar las 7 preguntas | `resultado` | Contacto **+ diagnóstico** |

**Por qué dos veces:** el formulario va antes del test, así que quien abandona
en la pregunta 3 igual es un lead con sus datos completos. Si esperáramos al
final, esa gente se perdería.

> ⚠️ **Lo más importante de todo este documento:** el workflow tiene que
> **buscar el contacto por email y actualizarlo** (upsert), no crear uno nuevo.
> Si crea uno nuevo, cada persona que termine el test aparecerá **duplicada**:
> una vez sin diagnóstico y otra con él.
>
> El email nos llega siempre **en minúsculas** y sin espacios, justamente para
> que la coincidencia sea fiable.

---

## 3. Los campos que llegan

Todos van en el primer nivel del JSON (sin objetos anidados), para que
aparezcan directamente en el mapeador de campos de GHL.

### Siempre

| Campo | Tipo | Ejemplo |
|---|---|---|
| `etapa` | texto | `formulario` / `resultado` |
| `nombre` | texto | `Ana` |
| `email` | texto | `ana@gmail.com` |
| `telefono` | texto | `+54 9 11 1234 5678` |
| `source` | texto | `diagnostico` |
| `enviado_en` | texto (ISO 8601) | `2026-09-03T14:05:11.204Z` |

### Sólo cuando `etapa` = `resultado`

| Campo | Tipo | Ejemplo | Para qué |
|---|---|---|---|
| `frecuencia_dominante` | texto | `miedo` | **Este es el campo que decide qué video se envía.** |
| `frecuencia_nombre` | texto | `Miedo` | El nombre para mostrar, si se quiere usar en el cuerpo del email |
| `pct_culpa` | número | `14` | Porcentaje de esa frecuencia |
| `pct_apatia` | número | `29` | |
| `pct_verguenza` | número | `14` | |
| `pct_miedo` | número | `43` | |
| `hubo_empate` | booleano | `false` | Si el resultado salió de un desempate |
| `respuestas` | texto | `p1:p1d\|p2:p2a\|p3:p3a\|...` | Las respuestas crudas |

**Valores posibles de `frecuencia_dominante`** — son exactamente estos cuatro,
siempre en minúsculas y sin tildes:

```
culpa      apatia      verguenza      miedo
```

> `apatia` y `verguenza` van **sin tilde** a propósito. Si la automatización
> compara contra `apatía` o `vergüenza`, no va a coincidir nunca y esas
> personas se quedarán sin email.

---

## 4. Campos personalizados a crear

En **Settings → Custom Fields**, sobre el objeto Contacto:

| Nombre sugerido | Tipo en GHL | Obligatorio |
|---|---|---|
| `frecuencia_dominante` | Texto (o Lista desplegable con los 4 valores) | **Sí** |
| `respuestas_diagnostico` | Texto largo | Recomendado |
| `hubo_empate` | Casilla / Texto | Opcional |
| `pct_culpa`, `pct_apatia`, `pct_verguenza`, `pct_miedo` | Número | Opcional |

Con `frecuencia_dominante` solo ya se puede enviar el email correcto. Los demás
sirven para segmentar y para poder recalcular el diagnóstico más adelante si
cambian las preguntas.

---

## 5. La automatización del email

Dentro del mismo workflow, después de guardar el contacto:

1. **Condición:** `etapa` es igual a `resultado`
   *(si no se filtra, el email se enviaría también en el primer disparo, cuando
   todavía no hay diagnóstico).*
2. **Bifurcación por `frecuencia_dominante`**, con cuatro ramas:
   `culpa` · `apatia` · `verguenza` · `miedo`
3. En cada rama, **enviar el email con el video de esa frecuencia**.

Hacen falta **4 plantillas de email**, una por frecuencia, cada una con su
enlace al video correspondiente.

> **Nota:** si el envío se hace desde otra plataforma de mail marketing en vez
> de desde GHL, el punto 3 se sustituye por la acción que empuje el contacto a
> esa plataforma **llevando `frecuencia_dominante` con él**. Ese dato es el
> único imprescindible: sin él, la otra plataforma no puede elegir el video.

---

## 6. Cómo probarlo antes de lanzar

1. Hacer el test entero en la web con un email real y controlado.
2. Verificar en GHL que aparece **un solo contacto**, no dos.
3. Verificar que `frecuencia_dominante` tiene uno de los cuatro valores.
4. Verificar que llega el email con el video de esa frecuencia.
5. **Repetir eligiendo respuestas distintas** hasta obtener una frecuencia
   diferente, y comprobar que el video que llega también cambia.

El paso 5 es el que de verdad prueba la bifurcación: con una sola pasada
funcionaría igual aunque las cuatro ramas apuntaran al mismo video.

---

## 7. Qué pasa si GHL falla

La web **nunca le muestra un error al visitante** por un fallo del CRM: sus
datos ya están guardados de nuestro lado antes de intentar el envío, y el
recorrido continúa con normalidad.

Si el webhook rechaza o no responde, el lead queda:

- respaldado en nuestra base de datos, y
- registrado en los logs del servidor con el prefijo `LEAD_FALLBACK`,
  recuperable y cargable a mano.

O sea: un problema de configuración en GHL retrasa la entrega del email, pero
**no hace perder ningún contacto**.

---

## 8. Resumen de lo que necesitamos del lado del cliente

- [ ] La **URL del Inbound Webhook** del workflow.
- [ ] Los **campos personalizados** de la sección 4, creados.
- [ ] El workflow configurado para **actualizar por email**, no duplicar.
- [ ] Las **4 plantillas de email**, una por frecuencia, con su video.
- [ ] Confirmación de si el email sale **desde GHL** o desde otra plataforma
      de mail marketing (y en ese caso, cuál).
