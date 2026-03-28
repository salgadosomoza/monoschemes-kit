# MonoSchemes — Setup Guide

## Prerequisites
- Node.js v18+
- Git
- Figma account (Pro plan for write access)
- Claude Code installed (`npm install -g @anthropic-ai/claude-code`)

## 1. Clone the repos

```bash
git clone https://github.com/salgadosomoza/monoschemes-kit
git clone https://github.com/salgadosomoza/monoschemes-ui
```

## 2. Install dependencies

```bash
# monoschemes-kit (vanilla reference)
cd monoschemes-kit
# No dependencies — open index.html directly in browser

# monoschemes-ui (React library)
cd ../monoschemes-ui
npm install
```

## 3. Run locally

```bash
# Component catalog (vanilla)
cd monoschemes-kit
node server.cjs        # serves components.json on localhost:3000
open index.html        # open in browser

# Storybook (React)
cd monoschemes-ui
npm run dev            # opens localhost:6006
```

## 4. Configure Figma MCP

```bash
# Add Figma HTTP MCP (requires Figma Pro plan)
claude mcp add --transport http figma https://mcp.figma.com/mcp -s user
# Restart Claude Code — it will prompt OAuth login with Figma
```

## 5. Install Claude Code skills

```bash
cd monoschemes-kit
./scripts/install-skills.sh
```

Available skills after install:
- `/monoschemes-audit` — audit Figma vs components.json vs React
- `/monoschemes-audit Button` — audit single component
- `/monoschemes-audit --fix` — auto-fix naming issues

## 6. Figma file
https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit

## Project structure

```
monoschemes-kit/          # Vanilla reference + tokens
  src/
    components/           # HTML/CSS/JS components
    tokens/
      tokens.json         # Design tokens (source of truth)
      components.json     # Component contract (Figma ↔ React)
    styles/
      tokens.css          # CSS custom properties
  skills/                 # Claude Code skills (versioned)
  scripts/
    install-skills.sh     # Install skills to ~/.claude/skills/
  server.cjs              # Local server for components.json

monoschemes-ui/           # React component library
  src/
    components/           # React components
    styles/
      tokens.css          # Synced from monoschemes-kit
  stories/                # Storybook stories
```

## Key conventions
- All Figma props lowercase (type, variant, status, state)
- Values in lowercase-kebab (subtitle-1, drag-and-drop)
- Slots with # are ignored in audits (label#3:2)
- disabled is always a boolean prop, never a type value
- See skills/monoschemes-audit/references/naming-rules.md for full rules

## Keeping in sync
When Figma changes:
1. Run `/monoschemes-audit` in Claude Code
2. Review the report
3. Run `/monoschemes-audit --fix` to apply fixes
4. Update React components in monoschemes-ui if needed
