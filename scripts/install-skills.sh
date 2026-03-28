#!/bin/bash
# Installs MonoSchemes skills to ~/.claude/skills/
SKILLS_DIR="$(dirname "$0")/../skills"
TARGET_DIR="$HOME/.claude/skills"

echo "Installing MonoSchemes skills..."
cp -r "$SKILLS_DIR/monoschemes-audit" "$TARGET_DIR/"
echo "✅ monoschemes-audit installed"
