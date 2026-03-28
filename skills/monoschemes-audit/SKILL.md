---
name: monoschemes-audit
description: "Audits the MonoSchemes design system by comparing Figma component properties against components.json and React Storybook components. Invoke when the user wants to audit, sync, or check consistency between Figma and code in the MonoSchemes project. Also invoke when asked to fix naming issues, add missing states, or verify component properties match React conventions."
disable-model-invocation: false
---

# MonoSchemes Design System Audit

Audits MonoSchemes by comparing three sources of truth:
1. Figma (XZ8yMM8VJihEwmyFaW6sCB)
2. components.json contract
3. React components in monoschemes-ui

Always load [naming-rules.md](references/naming-rules.md) before starting.

## Paths
- components.json: ~/Documents/Proyectos/Monoschemes/monoschemes-kit/src/tokens/components.json
- React components: ~/Documents/Proyectos/Monoschemes/monoschemes-ui/src/components/
- Stories: ~/Documents/Proyectos/Monoschemes/monoschemes-ui/stories/

## Audit Steps

### Step 1 — Read components.json
Read the contract file to get expected props, variants and figmaNode IDs.

### Step 2 — Fetch Figma data
For each component, call get_figma_data with its figmaNode ID.
Extract componentPropertyDefinitions from the COMPONENT_SET.

### Step 3 — Compare Figma vs components.json
For each prop:
- Name match? Flag if capitalized (Type→type, Status→status, Style→style)
- Values match? Flag missing or extra values
- Slots ignored: props with # (label#3:2, Text#130:0) → NOT errors
- Flag missing states: disabled, error, focused, hover, active where expected

### Step 4 — Check React component
Verify for each component:
- File exists: src/components/[Name]/[Name].tsx
- Props match components.json
- stories/[Name].stories.tsx exists
- stories has parameters.design.url with Figma node link

### Step 5 — Report
Format output as:

## Audit Report — [date]
Total: X | ✅ Synced: X | ⚠️ Needs Update: X | ❌ Missing: X

### ✅ Synced
- ComponentName

### ⚠️ Needs Update
- ComponentName
  - Figma: prop "Status" should be "status"
  - Missing state: disabled

### ❌ Missing
- ComponentName — exists in components.json but no React component

### 🔗 No Figma Link
- ComponentName — stories file has no design parameters

## Auto-fix mode
If user adds "fix" or "--fix":
1. Rename props in Figma using figma-use skill
2. Update components.json to match
3. Report all changes made

## Scope
- Default: audit all components in components.json
- Single component: /monoschemes-audit Button
- Fix mode: /monoschemes-audit --fix
- Fix single: /monoschemes-audit Button --fix
