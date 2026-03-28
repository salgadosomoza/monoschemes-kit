# MonoSchemes Naming Rules

## Figma → React conventions

| Figma | React | Rule |
|---|---|---|
| Type=Primary | variant="primary" | "type" only if semantically correct |
| Style=h1 | style="h1" | lowercase always |
| Status=Active | status="active" | lowercase always |
| State=Default | state="default" | lowercase always |
| subtitle 1 | subtitle-1 | spaces → hyphens |
| drag and drop | drag-and-drop | spaces → hyphens |
| Show drag#10:11 | IGNORE | slot with # |
| Label#3:2 | IGNORE | slot with # |
| style (reserved) | variant | "style" → "variant" in React |
| type=disabled | disabled=true | disabled is boolean prop |

## Prop types
- VARIANT → string union in React
- TEXT → string prop (ignore in audit if has #)
- BOOLEAN → boolean prop
- INSTANCE_SWAP → ReactNode prop (ignore in audit if has #)

## Required states per component type
- Interactive (Button, Chip, NavItem): hover, disabled
- Form inputs: default, focused, disabled, error
- Toggle/Checkbox/Radio: inactive, active, disabled
- Display (Text, Image, Logo): no states required

## File structure (monoschemes-ui)
src/components/[Name]/
  [Name].tsx
  [Name].css
  index.ts
stories/[Name].stories.tsx  (or stories/Form/Form[Name].stories.tsx)
