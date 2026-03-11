# IxD Design Skill — Installation Guide

**Version:** v1.0
**Standard:** [AgentSkills](https://agentskills.io) compatible
**No external dependencies** — pure instruction skill, no CLI tools or API keys required.

## What This Skill Does

Guides an AI assistant through a structured 8-phase interaction design workflow, from product context to developer handoff.

### Key Features

- 8-phase structured workflow (P1 Context → P8 Delivery)
- Mandatory interaction walkthrough (交互走查) before each page output
- 22-type page taxonomy for comprehensive information architecture
- Per-page 10-section interaction specifications
- Cross-platform dual prototype support (mobile + desktop)
- PC desktop client support (Windows/macOS/Electron/Tauri/Flutter desktop)
- 6 auxiliary design tools (competitor analysis, heuristic review, A/B comparison, visual style exploration, multi-perspective review, micro-interaction design)
- HTML/Tailwind prototype code generation
- Complete design system and component documentation

## Installation

### Pi (recommended)

Copy the `ixd-design/` folder to any of these locations:

```bash
# Global (all projects)
~/.pi/skills/ixd-design/

# Or project-level
<project>/.pi/skills/ixd-design/
<project>/.agents/skills/ixd-design/
```

Pi discovers `SKILL.md` automatically. No configuration needed.

### OpenClaw

```bash
# Via ClawHub (if published)
clawhub install ixd-design

# Or manually copy to workspace
cp -r ixd-design/ ~/.openclaw/workspace/skills/ixd-design/

# Or shared across agents
cp -r ixd-design/ ~/.openclaw/skills/ixd-design/
```

Refresh skills or start a new session to pick up the skill.

### Claude Code

```bash
cp -r ixd-design/ ~/.claude/skills/ixd-design/
```

### Claude Projects / Custom Instructions

1. Copy the contents of `SKILL.md` into your Claude Project's custom instructions
2. Place the `references/` folder contents as project knowledge files
3. Place `templates/prototype-shell.js` as a project knowledge file

### Other AI Assistants (GPT-4+, Gemini Pro+)

1. Include `SKILL.md` content in system prompt or custom instructions
2. Reference files in `references/` can be loaded on-demand when each phase is reached
3. Template files provide starter code for prototype generation

## Phase Overview

| Phase | Name | Key Output |
|-------|------|------------|
| P1 | 产品上下文 | Product brief, user personas, design goals |
| P2 | 信息架构 | 22-type page inventory, sitemap, navigation model |
| P3 | 用户流程 | Task flows (Mermaid), edge cases, error paths |
| P4 | 页面交互说明 | Per-page 10-section interaction specs |
| P5 | 组件规范 | Design tokens, component library |
| P6 | 视觉设计 | Color, typography, visual language (10 dimensions) |
| P7 | 原型 | Interactive HTML/Tailwind prototype |
| P8 | 交付 | Developer handoff documentation |

## Usage

Start a conversation with natural language:

| User says | Start Phase |
|-----------|-------------|
| 帮我设计一个App | Phase 1 |
| 我有PRD了 | Phase 2 |
| 画用户流程图 | Phase 3 |
| 设计这个页面 | Phase 4 |
| 整理组件规范 | Phase 5 |
| 做视觉方案/配色 | Phase 6 |
| 做可点击原型 | Phase 7 |
| 写设计文档 | Phase 8 |

## File Structure

```
ixd-design/
├── SKILL.md                       ← Main entry point
├── INSTALL.md                     ← This file
├── references/
    ├── phase1-context.md          ← Product context
    ├── phase2-architecture.md     ← Information architecture (22 page types)
    ├── phase3-userflow.md         ← User flows
    ├── phase4-page-interaction.md ← Page interaction specs (10 sections)
    ├── phase5-components.md       ← Component specifications
    ├── phase6-visual.md           ← Visual design (10 dimensions)
    ├── phase7-prototype.md        ← Prototype patterns (mobile + desktop frames)
    ├── phase8-delivery.md         ← Delivery documentation
    ├── auxiliary-tools.md         ← Auxiliary design tools
    └── quickref.md                ← Quick reference card
└── templates/
    └── prototype-shell.js         ← Prototype framework template
```

## Notes

- The skill uses natural language triggers only — no slash commands needed
- Cross-platform products should generate dual prototypes (mobile + desktop) for each page
- Desktop-specific interactions (keyboard navigation, hover states, drag & drop, right-click menus) are covered in Phase 4 specs and the heuristic review checklist
- The interaction walkthrough (交互走查) uses a 47-item checklist across 10 categories
