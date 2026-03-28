# CLAUDE.md

## Project
monoschemes-kit — Vanilla HTML/CSS/JS reference implementation of the MonoSchemes design system.
This is the design and token source. The React library lives in monoschemes-ui.

## Related repos
- monoschemes-kit (this repo): https://github.com/salgadosomoza/monoschemes-kit
- monoschemes-ui (React library): https://github.com/salgadosomoza/monoschemes-ui
- Figma file: https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit

## Stack
- Vanilla HTML + CSS + JavaScript (no build step)
- Design tokens in src/tokens/tokens.json + src/styles/tokens.css
- Components in src/components/[name].html + .css + .js
- Component definitions in src/tokens/components.json
- Local dev server: node server.cjs (port 3000, serves components.json)

## Token conventions
- Colors: --color-[category]-[variant] (e.g. --color-text-primary, --color-bg-surface)
- Typography: --font-[style]-[property] (e.g. --font-h1-size, --font-body1-size)
- Spacing: --spacing-[size] (e.g. --spacing-xs, --spacing-sm, --spacing-md, --spacing-lg)

## Component structure
Each component:
  src/components/[name].html  — markup + usage example
  src/components/[name].css   — styles using tokens
  src/components/[name].js    — interactions (if needed)

Each CSS file must include a comment with the Figma node ID:
  /* [ComponentName] — MonoSchemes Design System
   * Figma: XZ8yMM8VJihEwmyFaW6sCB · node [id]
   */

## components.json
src/tokens/components.json is the contract between Figma and code.
It defines variants per component (cleaned, no # props).
Used by the Figma plugin for audit and sync.

## Figma plugin
The plugin lives in a separate folder (figma-code-sync).
It reads components.json to audit Figma vs code.
Run server.cjs to expose components.json via localhost:3000.

## Current components
- Accordion ✅ (node 86:368)
- App Header ✅ (node 2:45)
- Avatar ✅ (node 2:35)
- Chip ✅ (node 10:468)
- Grid ✅ (node 106:1130)
- Image ✅ (node 86:217)
- Logo ✅ (node 727:2495)
- Nav/Item ✅ (node 673:2102)
- Text ✅ (node 130:1708)
