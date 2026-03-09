# MonoSchemes Kit

## 📖 Descripción

Design system completo con componentes reutilizables. Construido con HTML, CSS y JavaScript vanilla, diseñado en Figma y sincronizable con código.

Cada componente se lee directamente desde el archivo de Figma y se traduce a código usando design tokens, manteniendo medidas, tipografía y estilos fieles al diseño original.

## 🎨 Figma File

[MonoSchemes kit en Figma](https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit)

## 🚀 Inicio Rápido

### Instalación

```bash
git clone https://github.com/tu-usuario/monoschemes-kit.git
cd monoschemes-kit
```

No requiere dependencias. Abre `index.html` directamente en el navegador.

### Uso

```bash
# Con cualquier servidor estático local
npx serve .
# o
python3 -m http.server 8080
```

Luego abre `http://localhost:8080` en tu navegador.

## 📁 Estructura del Proyecto

```
monoschemes-kit/
├── index.html                  # Catálogo de componentes
├── src/
│   ├── styles/
│   │   └── tokens.css          # Variables CSS (design tokens)
│   ├── tokens/
│   │   └── tokens.json         # Design tokens fuente
│   └── components/
│       ├── accordion.html/css/js
│       ├── app-header.html/css
│       ├── avatar.html/css
│       ├── chip.html/css/js
│       ├── grid.html/css
│       ├── image.html/css
│       ├── logo.html/css
│       ├── nav-item.html/css/js
│       └── text.html/css
└── README.md
```

## 🧩 Componentes

Todos los componentes son standalone: pueden abrirse directamente en el navegador sin build step.

### Accordion
Sección colapsable con animación de apertura/cierre.
- **Estados:** collapsed, expanded
- **Interactividad:** toggle vía JS
- **Figma node:** `86:368`

### App Header
Cabecera de aplicación composable con Logo y Nav.
- **Elementos:** Logo · Site title · Tagline · Nav · Menu icon
- **Responsive:** Desktop (todo) · Tablet (sin tagline) · Mobile (logo + menú)
- **Max-width:** 1440px · Padding: 16px
- **Figma node:** `2:45`

### Avatar
Imagen de perfil de usuario en tres tipos y estilos.
- **Type:** Icon · Initials · Image
- **Style:** Round (100px) · Rounded (8px) · Square (0px)
- **Tamaño:** 64×64px · Background: `#D9D9D9`
- **Figma node:** `2:35`

### Chip
Etiqueta interactiva con variante de drag & drop.
- **Type:** default (texto + close) · drag (handle + texto + close)
- **Interactividad:** close elimina el chip, drag reordena
- **Border:** 1px solid `#000` · Padding: 8px
- **Figma node:** `10:468`

### Grid
Sistema de columnas responsive de 5 breakpoints.
- **Small:** 360px · 4 cols · sin padding
- **Medium:** 768px · 8 cols · padding `0 24px`
- **Large:** 1440px · 16 cols · padding `0 16px`
- **Max:** 1920px · 16 cols · padding exterior `0 168px`
- **Full:** sin max-width · 16 cols
- **Figma node:** `106:1130`

### Image
Placeholder de imagen en 9 aspect ratios, todos a 360px de ancho.
- **Ratios:** 1:1 · 16:9 · 9:16 · 5:4 · 4:5 · 4:3 · 3:4 · 3:2 · 2:3
- **Background:** `#D9D9D9` · Icono centrado
- **Figma node:** `86:217`

### Logo
Logotipo en variante de texto o imagen.
- **Type=Text:** "Logo" · Inter 500 · 20px
- **Type=Image:** placeholder 40×40px · `#D9D9D9`
- **Figma node:** `727:2495`

### Nav/Item
Ítem de navegación con estado hover con underline.
- **Status:** Enable (sin borde) · Hover (border-bottom 1px `#000`)
- **Tipografía:** Inter 700 · 12px (Button/Left)
- **Figma node:** `673:2102`

### Text
Sistema tipográfico completo con todas las variantes.
- **Headings:** h1–h6 (56px–20px)
- **Subtitles:** subtitle 1–2 (16px–14px · 700)
- **Body:** body 1–2 (16px–14px · 400)
- **Utility:** caption (12px) · overline (10px · uppercase · letter-spacing 20%)
- **Color:** `#2B2F36` (token `--color-text-primary`)
- **Figma node:** `130:1708`

## 🎨 Design Tokens

Los tokens se definen en `src/tokens/tokens.json` y se exponen como variables CSS en `src/styles/tokens.css`.

```css
/* Colores */
--color-text-primary: #2B2F36;
--color-text-secondary: #40444A;
--color-bg-page: #FFFFFF;
--color-bg-surface: #F6F7F9;
--color-bg-hover: #E2E5E9;
--color-border-default: #40444A;

/* Tipografía */
--font-family: 'Inter', -apple-system, sans-serif;
--font-h1-size: 56px;
--font-body1-size: 16px;
/* ... */

/* Espaciado */
--spacing-xs: 8px;
--spacing-sm: 16px;
--spacing-md: 24px;
--spacing-lg: 50px;
```

Para usar los tokens en cualquier componente:

```html
<link rel="stylesheet" href="../styles/tokens.css">
```

## 🔄 Sincronización con Figma

El kit está conectado al archivo de Figma mediante [figma-developer-mcp](https://github.com/GLips/Figma-Context-MCP). Cada componente incluye el node ID de Figma en los comentarios CSS para facilitar la trazabilidad.

```css
/* Chip — MonoSchemes Design System
 * Figma: XZ8yMM8VJihEwmyFaW6sCB · node 10:468
 */
```

## 🛠️ Añadir un Nuevo Componente

1. Localizar el node ID del componente en Figma
2. Leer las especificaciones: layout, fills, strokes, tipografía
3. Crear `src/components/[nombre].html`, `.css`, `.js`
4. Importar `tokens.css` en el HTML
5. Añadir el enlace en `index.html`

```html
<!-- index.html -->
<a href="./src/components/nuevo-componente.html" class="component-card">
  <h3>Nuevo Componente</h3>
  <p class="body1">✅ Ready to use</p>
</a>
```

## 📄 Licencia

MIT
