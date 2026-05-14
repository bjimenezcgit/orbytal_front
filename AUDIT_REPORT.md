# 🔍 Orbytal Landing Page — Audit Report
**Fecha:** 14 de mayo de 2026  
**Stack:** React + Vite + TypeScript + Tailwind CSS  
**Estado general:** Base heredada de otro producto (“Bunfi”), con router y páginas sin cablear al entry point; brand Orbytal no integrado.

---

## Resumen ejecutivo

El repositorio es un proyecto Vite + React 19 + TypeScript con Tailwind CSS v4 vía PostCSS. El `App` raíz solo muestra el título “Bunfi” (`src/App.tsx`), mientras que existe un árbol completo de rutas y páginas (`src/router/index.tsx`, `src/pages/*`) inspirado en una app financiera anterior, **no importado** desde `src/main.tsx`. Los tokens de diseño actuales en `src/index.css` (`@theme`) son de la marca Bunfi (navy, violet, etc.), no la paleta Orbytal. No hay `tailwind.config.ts/js`: la configuración es “CSS-first” de Tailwind v4. Hay dependencias (`axios`, `zustand`) sin uso en el código fuente visible. La preparación para escalar existe en carpeta, pero el wiring al arranque está incompleto y el naming/brand no alinea con Orbytal Digital Group.

---

## Puntuación por categoría

| Categoría                  | Estado     | Prioridad |
|---------------------------|------------|-----------|
| Estructura del proyecto    | Carpetas `pages`, `components`, `hooks`, `router` presentes; entry no usa el router | 🟡 Importante |
| Configuración Tailwind     | v4 con `@import "tailwindcss"` + `@theme` en `index.css`; sin `tailwind.config.*` | 🟢 Mejora |
| Brand System               | Paleta Orbytal no integrada; tokens y copy Bunfi en CSS y páginas | 🔴 Crítico |
| Calidad del código         | TS con props tipadas en `PageWrapper`; código huérfano (router); mezcla Tailwind + `style` inline | 🟡 Importante |
| Responsive                 | Uso extensivo de utilidades responsive en páginas (no activas en runtime actual) | 🟢 Mejora |
| Performance                | Lazy routes en router (no montado); sin imágenes pesadas en flujo actual de `App` | 🟢 Mejora |
| Accesibilidad              | Páginas con `<nav>`, `<main>`, `<aside>` donde aplica; botones sin `type`; modal con cierre poco accesible | 🟡 Importante |
| Preparación para escalar   | Alias `@/*` y router listos conceptualmente; falta integrar `Router` en `main` o limpiar | 🟡 Importante |

---

## Hallazgos detallados

### 1. Estructura del proyecto

**Estado actual:** `src/main.tsx` monta solo `<App />`. Existen `src/router/index.tsx`, `src/pages/` (Landing, Home, Onboarding, Register), `src/components/` (PageLoader, PageWrapper), `src/hooks/usePageTransition.ts`, `src/assets/` (vite.svg, react.svg).

**Problemas:** El router **no está conectado** al árbol de React; las rutas y páginas son código muerto en runtime. Convención de alias `@/` coherente con `vite.config.ts` y `tsconfig.app.json`.

**Recomendación:** Decidir: o bien envolver la app con `BrowserRouter` / `RouterProvider` desde `main.tsx`, o eliminar el árbol no usado para evitar confusión (como en un reset base).

---

### 2. Configuración de Tailwind

**Estado actual:** `postcss.config.js` usa `@tailwindcss/postcss`. `src/index.css` líneas 1–63: `@import "tailwindcss"` y bloque `@theme { ... }` con tokens personalizados.

**Problemas:** No existe `tailwind.config.ts` ni `.js` en la raíz (esperable en v4 con configuración en CSS). Los tokens no están alineados con Orbytal.

**Recomendación:** Documentar en el equipo que el design system vive en `@theme` hasta que se centralice; mapear tokens Orbytal a variables `--color-*` y `--font-*`.

---

### 3. Brand System — integración

**Estado actual:** Colores y tipografía en `src/index.css` (p. ej. líneas 4–52: navy, violet; líneas 50–52: Inter, JetBrains Mono). `src/App.tsx` línea 7: texto “Bunfi”. Páginas (`Landing.tsx`, etc.) con copy y marca “Bunfi”.

**Problemas:** Ningún token `#E50914`, `#050505`, Aptos Narrow u equivalente. Contradicción explícita con el brand Orbytal indicado en el brief.

**Recomendación:** Sustituir el bloque `@theme` por tokens `orbytal-*`, cargar fuente web (Aptos Narrow no está en Google Fonts; equivalente sugerido: **Roboto Condensed** o **Barlow Condensed** + tamaño base 11px si se desea fidelidad al spec).

---

### 4. Calidad del código

**Estado actual:** `PageWrapper` (`src/components/PageWrapper.tsx`) tipa `Props` con `React.ReactNode`. `Register.tsx` es placeholder mínimo.

**Problemas:** `PageLoader.tsx` línea 6: clase `text-muted` — en `@theme` no hay `--color-muted`; existe el patrón `text-text-muted` usado en otras vistas; posible estilo incorrecto o clase huérfana. `usePageTransition.ts`: el `useEffect` usa dependencias `[]` pero recibe `delay` (riesgo de stale closure si cambiara el delay). Mezcla Tailwind + `style` inline en `PageWrapper` (líneas 14–17).

**Recomendación:** Unificar tokens de texto; corregir deps del hook o fijar delay constante; preferir utilidades `transition-opacity` donde sea posible.

---

### 5. Responsive / mobile-first

**Estado actual:** En `Landing.tsx` y otras páginas hay utilidades tipo `px-6`, `max-w-*`, layouts flex; no se audita viewport en vivo porque `App` no renderiza esas páginas.

**Recomendación:** Al activar la landing, revisar nav con muchos ítems en `md`/`sm` (p. ej. `Landing.tsx` líneas 14–28: nav horizontal sin menú hamburguesa).

---

### 6. Performance y buenas prácticas

**Estado actual:** Router con `lazy()` y `Suspense` (`src/router/index.tsx` líneas 1–8, 10–42). Sin `index.ts` barrel en `src/components`. No hay `.env` en el listado auditado (no obligatorio para landing estática).

**Problemas:** `axios` y `zustand` en `package.json` sin imports en el código fuente bajo `src/` auditado.

**Recomendación:** Eliminar dependencias no usadas cuando se estabilice el producto (fuera del alcance si se prohíbe tocar `package.json` en un paso dado).

---

### 7. Accesibilidad básica

**Estado actual:** Estructura semántica razonable en páginas heredadas (`nav`, `main`, `aside`). `index.html` línea 2: `lang="en"` mientras el contenido es mayoritariamente español.

**Problemas:** Botones de navegación sin `type="button"` donde no son submit. Modal en `Landing.tsx` (aprox. líneas 59–63): overlay con `onClick` para cerrar; falta manejo de foco/teclado típico de diálogo accesible.

**Recomendación:** `lang="es"`, roles `dialog`/`aria-modal`, foco atrapado, y contraste al aplicar fondos oscuros Orbytal.

---

### 8. Preparación para escalar

**Estado actual:** Estructura multi-página y router definido; alias `@/` operativo.

**Problemas:** Desconexión entre `main.tsx` y el router impide escalar sin un cambio explícito.

**Recomendación:** Un solo punto de montaje (`main.tsx`) que importe el proveedor de rutas o una limpieza total hacia una sola página hasta definir rutas.

---

## Plan de acción sugerido

1. **🔴** Definir brand en `@theme`: colores Orbytal + fuente equivalente y tamaño base.  
2. **🔴** Renombrar/reescribir copy y títulos (`App.tsx`, `index.html`) a Orbytal Digital Group.  
3. **🟡** Conectar `main.tsx` al router **o** eliminar código Bunfi no usado para un estado base claro.  
4. **🟡** Corregir `lang`, clases rotas (`text-muted`), y deps del hook de transición.  
5. **🟢** Añadir barrels solo donde reduzcan fricción; revisar nav responsive al publicar landing.  
6. **🟢** Limpiar dependencias no usadas cuando las políticas del repo lo permitan.

---

## Archivos que requieren atención inmediata

| Archivo | Motivo |
|---------|--------|
| `src/main.tsx` | No importa el router; el árbol de rutas no se ejecuta. |
| `src/App.tsx` | Marca y contenido “Bunfi”; no refleja Orbytal. |
| `src/index.css` | Tokens completos del proyecto anterior (Bunfi). |
| `src/router/index.tsx` | Infraestructura de rutas sin uso desde el entry. |
| `src/pages/Landing.tsx` (y resto de `pages/`) | Producto/copy heredados; alto esfuerzo de rebranding si se conservan. |
| `src/components/PageLoader.tsx` | Posible clase `text-muted` inconsistente con `@theme` (línea 6). |
| `index.html` | `lang="en"` vs contenido en español; título ya “Orbytal” (línea 7) — alinear con contenido. |

---

*Auditoría realizada solo con lectura del código en el momento del análisis; los hallazgos de rutas/páginas aplican al estado del repo antes de cualquier limpieza posterior.*
