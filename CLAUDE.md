# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an [AgentSkills](https://agentskills.io)-compatible skill that guides AI assistants through a structured 8-phase interaction design workflow. It's a **pure instruction skill** — no build tools or external dependencies required.

## Repository Structure

```
skills/ixd-design/
├── SKILL.md                 # Main entry point (1230+ lines) — the skill definition
├── INSTALL.md               # Installation guide
├── references/              # Phase-specific reference docs (phase1-context.md through phase8-delivery.md)
│   ├── auxiliary-tools.md   # 6 auxiliary design tools
│   └── quickref.md          # Quick reference card
└── scripts/
    ├── init-artifact.sh     # Scaffolds React + Vite + Tailwind + shadcn/ui + Vitest
    ├── bundle-artifact.sh   # Bundles React app into single HTML file
    ├── shadcn-components.tar.gz  # Pre-built shadcn/ui components (40+)
    └── templates/           # Layout component templates — SINGLE SOURCE OF TRUTH
        ├── PrototypeShell.tsx   # Shell with project name, theme toggle, page nav
        ├── PhoneFrame.tsx       # Mobile frame (iPhone 14, 390×844), tabBar slot
        ├── WindowFrame.tsx      # Desktop frame (1280×800), sidebar slot
        └── layout-index.ts      # Re-exports all layout components
```

## Key Architecture

### 8-Phase Workflow

```
P1 Context → P2 Architecture → P3 User Flows → P4 Page Specs → P5 Components → P6 Visual → P7 Prototype → P8 Delivery
```

Each phase produces artifacts in `docs/ixd/` of the target project.

### Phase Dependency for Context Loading

Phases only load their direct dependencies (not everything):

| Phase | Must Load (Full) | Summary Only | Skip |
|-------|-----------------|--------------|------|
| P4 | P2, P3 | P1 | — |
| P5 | P4 (current batch) | P1, P2 | P3 |
| P6 | P1, P5 | P2 | P3, P4 |
| P7 | P5, P6, P4 (pages being prototyped) | P1, P2 | P3 |

### Slot Pattern for Device Frames

- `PhoneFrame` accepts a `tabBar` slot for custom tab bar components
- `WindowFrame` accepts a `sidebar` slot for custom sidebar components
- **Important**: Pass React components, not data arrays

### Language Policy

- Source code (SKILL.md, references/): English
- Dialogue and deliverables: Follow user's input language (auto-detected from first message)
- Language stored in `progress.json` in target projects

## Prototype Development (Phase 7)

### Initialize a New Prototype Project

```bash
# From the skill's scripts directory
bash skills/ixd-design/scripts/init-artifact.sh <project-name>-prototype
cd <project-name>-prototype
pnpm dev
```

This creates a React + Vite + Tailwind + shadcn/ui project with 40+ pre-installed components and Vitest for testing.

### Bundle to Single HTML

```bash
# From the prototype project root
bash /path/to/skill/scripts/bundle-artifact.sh
# Output: bundle.html (single-file artifact)
```

### Layout Component Templates

Edit templates in `scripts/templates/`, NOT in generated projects. The init script copies from templates — they are the single source of truth.

## Platform Configuration

The `platform` field in target project's `progress.json` determines output:

| platform | Output Files |
|----------|-------------|
| `"mobile"` (default) | `prototype.html` |
| `"desktop"` | `prototype.html` |
| `"both"` | `prototype-mobile.html` + `prototype-desktop.html` |

## Plugin Metadata Files

- `.claude-plugin/plugin.json` — Claude Code plugin manifest
- `marketplace.json` — Marketplace distribution manifest (enables `/plugin marketplace add`)

Both files must stay in sync for version, description, and author fields.