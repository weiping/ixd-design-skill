# 🎨 IxD Design Skill

[中文版](README_CN.md)

An [AgentSkills](https://agentskills.io)-compatible skill that guides AI assistants through a structured 8-phase interaction design workflow — from product context to developer handoff.

**No external tools required.** Pure instruction skill. Works with any LLM that supports markdown instructions.

---

## ✨ Features

- **8-phase structured workflow** — Context → Architecture → Flows → Page Specs → Components → Visual → Prototype → Delivery
- **Socratic discovery** — Adaptive 0–8 question pre-interview that analyzes user input and only asks what's missing
- **Bilingual output** — Source code in English; dialogue and deliverables follow user's input language (Chinese → Chinese, English → English)
- **22-type page taxonomy** — Exhaustive page classification including 4 desktop-specific types
- **10-section per-page specs** — Developer-ready interaction specifications with mandatory walkthrough
- **Cross-platform dual prototypes** — Separate mobile (390×844) + desktop (1280×800) HTML prototypes sharing design tokens
- **PC desktop client support** — Hover states, right-click menus, keyboard shortcuts, drag & drop, window management
- **Slot pattern for device frames** — `PhoneFrame` accepts a `tabBar` slot; `WindowFrame` accepts a `sidebar` slot — custom components, not data arrays
- **TDD-first prototype workflow** — Vitest + Testing Library pre-installed; `data-testid` built into PhoneFrame/WindowFrame for automated smoke tests before walkthrough
- **Word-style desktop layout** — `flex flex-col h-full` pattern for fixed MenuBar + Toolbar above scrollable content inside WindowFrame
- **47-item heuristic walkthrough** — Automated interaction quality check across 10 categories
- **Unified batch review report** — All batch reviews append to `phase7-review-master.md` (single incremental file, no per-batch files)
- **6 auxiliary tools** — Competitor analysis, heuristic review, A/B comparison, visual style exploration, multi-perspective review, micro-interaction design
- **Final review gate** — Mandatory walkthrough + multi-perspective review with fix cycle (max 3 rounds) before delivery
- **Smart phase resumption** — Dependency-aware context loading, not "load everything"

## 📋 Workflow Overview

```
P1              P2               P3           P4              P5           P6       P7          P8
Product       → Information    → User       → Page          → Component → Visual → Prototype → Delivery
Context         Architecture     Flows        Interaction      Specs       Design               & Review
                                              Specs
```

| Phase | Key Output | File |
|-------|------------|------|
| P1 — Product Context | Design brief, principles, visual direction | `phase1-context.md` |
| P2 — Information Architecture | 22-type page inventory, sitemap, navigation | `phase2-architecture.md` |
| P3 — User Flows | Mermaid flow diagrams, edge cases | `phase3-userflows.md` |
| P4 — Page Interaction Specs | Per-page 10-section interaction specs | `phase4-page-specs/` |
| P5 — Component Specs | Design tokens, component library | `phase5-components.md` |
| P6 — Visual Design | 10-dimension visual system | `phase6-visual.md` |
| P7 — Interactive Prototype | High-fidelity HTML prototype | `phase7-prototype*.html` |
| P8 — Design Delivery | Complete spec document + review report | `phase8-document.md` |

All outputs are saved to `doc/ixd/` in the working project directory.

## 🚀 Quick Start

### Installation

<details>
<summary><strong>Claude Code</strong></summary>

**Option A — Marketplace (recommended)**

```bash
# Add the marketplace repository
/plugin marketplace add weiping/ixd-design-skill

# Install the skill
/plugin install ixd-design
```

**Option B — Manual install as local skill**

```bash
cp -r skills/ixd-design ~/.claude/skills/ixd-design
```

**Option C — Manual install as local plugin**

Clone the repo and install from local path:

```bash
git clone https://github.com/weiping/ixd-design-skill.git
/plugin install /path/to/ixd-design-skill
```

Claude Code reads `.claude-plugin/plugin.json` and loads `skills/` automatically.
</details>

<details>
<summary><strong>Claude Projects / Other LLMs</strong></summary>

1. Copy `SKILL.md` content into system prompt or custom instructions
2. Upload `references/` files as project knowledge
</details>

<details>
<summary><strong>Pi</strong> </summary>

```bash
# Global — available in all projects
cp -r skills/ixd-design ~/.pi/skills/ixd-design

# Or project-level
cp -r skills/ixd-design <project>/.pi/skills/ixd-design
```

Pi discovers `SKILL.md` automatically. No configuration needed.
</details>

<details>
<summary><strong>OpenClaw</strong></summary>

```bash
# From ClawHub (if published)
clawhub install ixd-design

# Manual: shared across all agents
cp -r skills/ixd-design ~/.openclaw/skills/ixd-design

# Manual: per-agent (workspace-level, highest precedence)
cp -r skills/ixd-design <workspace>/skills/ixd-design
```

Skill precedence: workspace > `~/.openclaw/skills` > bundled.
Refresh skills or start a new session to pick up the skill.

You can also add a shared folder via `skills.load.extraDirs` in `~/.openclaw/openclaw.json` for multi-agent setups.
</details>

### Usage

Just talk naturally. The skill auto-detects your intent:

```
"Design a budgeting app for me"                → starts from Phase 1
"I already have a PRD, start from architecture" → starts from Phase 2
"Start from phase 4"                            → starts from Phase 4
"Continue the previous design"                  → auto-detects from progress.json

# Chinese triggers also work:
# "帮我设计一个记账 App"          → starts from Phase 1
# "我有PRD了，直接开始信息架构"    → starts from Phase 2
# "从阶段4开始"                   → starts from Phase 4
# "继续上次的设计"                → auto-detects from progress.json
```

## 🧠 Key Design Decisions

### Language Policy

The skill follows a bilingual approach:

| Component | Language |
|-----------|----------|
| Source code (SKILL.md, references/) | English |
| Variable names, placeholders | English |
| Dialogue output | Follows user's input language |
| Generated deliverables | Follows user's input language |
| Mock data examples | Both Chinese and English provided |

**How it works**:
- User inputs in Chinese → All dialogue and deliverables in Chinese
- User inputs in English → All dialogue and deliverables in English
- Language is auto-detected from the first message and stored in `progress.json`

### Socratic Discovery (Phase 1)

The skill doesn't blindly ask a checklist. It analyzes user input against 8 information dimensions, skips what's already known, and generates only the questions that matter — between 0 and 8.

```
User: "Design a collaborative note-taking tool like Notion, React stack"
                    ↓
     D1 platform: missing  → ask
     D2 features: partial  → shorter follow-up
     D3 users: missing     → ask
     D4 style: inferred from "like Notion" → skip
     D5 tech: resolved (React) → skip
     D6 design system: missing → ask
     D7 reference: resolved (Notion) → skip
     D8 positioning: partial → shorter follow-up
                    ↓
          Result: 4 questions (not 8)
```

### Phase Resumption Context

Each phase loads only the prior outputs it directly depends on — not everything:

| Phase | Must Load (Full) | Summary Only | Skip |
|-------|-----------------|--------------|------|
| P4 | P2, P3 | P1 | — |
| P5 | P4 (pages being worked on, load individually) | P1, P2 | P3 |
| P6 | P1, P5 | P2 | P3, P4 |
| P7 | P5, P6, P4 (pages being prototyped) | P1, P2 | P3 |

This saves tokens and keeps context focused.

### Final Review Gate (Phase 8)

After the delivery document is generated, a mandatory review loop runs:

```
Generate document → Walkthrough (47 items) + Multi-perspective review (6 roles)
                            ↓
                     Pass? ──→ ✅ Done
                       ↓ No
                  Fix source files → Re-review (Round 2)
                       ↓ Still no
                  Fix again → Re-review (Round 3)
                       ↓ Still no
                  ⛔ BLOCK — human intervention required
```

## 📁 File Structure

```
ixd-design-skill/
├── .claude-plugin/
│   └── plugin.json                 ← Claude Code plugin metadata
├── README.md                       ← This file (English)
├── README_CN.md                    ← Chinese version
├── LICENSE                         ← MIT
├── demo-prototype.html             ← Built demo prototype (open in browser)
└── skills/
    └── ixd-design/                 ← AgentSkills-compatible skill folder
        ├── SKILL.md                ← Main entry point (740+ lines)
        ├── INSTALL.md              ← Installation guide
        ├── references/
        │   ├── phase1-context.md       ← Product context gathering
        │   ├── phase2-architecture.md  ← 22-type page taxonomy
        │   ├── phase3-userflow.md      ← Flow diagram patterns
        │   ├── phase4-page-interaction.md ← 10-section page spec format
        │   ├── phase5-components.md    ← Design token + component spec
        │   ├── phase6-visual.md        ← 10-dimension visual system
        │   ├── phase7-prototype.md     ← HTML prototype patterns (mobile + desktop)
        │   ├── phase8-delivery.md      ← Delivery document structure
        │   ├── auxiliary-tools.md      ← 6 auxiliary design tools
        │   └── quickref.md            ← Quick reference card
        └── scripts/
            ├── init-artifact.sh        ← Project scaffolding (React + Vite + Tailwind + shadcn/ui + Vitest)
            ├── bundle-artifact.sh      ← Bundle React app to single HTML file
            ├── shadcn-components.tar.gz ← Pre-built shadcn/ui components
            └── templates/              ← Canonical layout component templates (single source of truth)
                ├── PrototypeShell.tsx  ← Shell: project name, theme toggle, page nav
                ├── PhoneFrame.tsx      ← Mobile frame: iPhone 14, tabBar slot, data-testid
                ├── WindowFrame.tsx     ← Desktop frame: macOS window, sidebar slot, data-testid
                ├── ThemeContext.tsx    ← Theme provider for light/dark mode
                └── layout-index.ts    ← Re-exports all layout components
```

### Demo Prototype

This repo includes a built demo prototype at `demo-prototype.html`. Open it in your browser to see a complete cross-platform task management app with:

- **Mobile**: Home, Projects, Calendar, Messages, Profile pages with bottom tab navigation
- **Desktop**: Dashboard, Projects, Calendar, Messages, Team, Analytics, Settings with sidebar navigation
- **Light/Dark theme toggle**
- **20+ interactive tasks** with completion, filtering, and priority badges
- **Complete UI components**: Select, Progress, Dialog, Dropdown, Tooltip, and more

To modify the demo, edit `demo-prototype/src/App.tsx` or create a new prototype:

```bash
# Create a new prototype project
bash skills/ixd-design/scripts/init-artifact.sh my-prototype
cd my-prototype
pnpm dev
```

### Output Structure (generated per project)

```
doc/ixd/
├── progress.json               ← Phase tracker with per-phase summaries
├── phase1-context.md
├── phase2-architecture.md
├── phase3-userflows.md
├── phase4-page-specs/
│   ├── page-P01.md            ← One file per page, named by Phase 2 page ID
│   └── ...
├── phase5-components.md
├── phase6-visual.md
├── phase7-prototype.html           ← Mobile-only prototype
├── phase7-prototype-mobile.html    ← Cross-platform: mobile
├── phase7-prototype-desktop.html   ← Cross-platform: desktop
├── phase7-review-master.md         ← Unified review report (all batches + completeness check)
├── phase8-document.md
└── phase8-review-round-1.md        ← Final delivery review report
```

## 🔧 Auxiliary Tools

These tools can be invoked at any point via natural language:

| Tool | Trigger |
|------|---------|
| Competitor Analysis | "competitor analysis" / "分析竞品" |
| Design Heuristic Review | "review checklist" / "交互走查" |
| A/B Comparison | "compare approaches" / "对比方案" |
| Visual Style Exploration | "style options" / "探索风格" |
| Multi-Perspective Review | "different viewpoints" / "多角色评审" |
| Micro-Interaction Design | "micro-interaction" / "微交互" |

## 📊 Key Numbers

| Metric | Value |
|--------|-------|
| Page types | 22 (including 4 desktop-specific) |
| Per-page spec sections | 10 |
| Visual design dimensions | 10 |
| Walkthrough checklist items | 47 |
| Review perspectives | 6 roles |
| Max review rounds | 3 (then hard block) |
| Touch target (mobile) | ≥ 44×44pt |
| Click target (desktop) | ≥ 32×32px |
| Core task reach | ≤ 3 taps/clicks |

## 🌐 Platform Compatibility

| Platform | Status | Install Method |
|----------|--------|----------------|
| [Pi](https://github.com/mariozechner/pi-coding-agent) | ✅ Native | `~/.pi/skills/` or project-level |
| [OpenClaw](https://openclaw.ai) | ✅ Compatible | `clawhub install` or `~/.openclaw/skills/` |
| [Claude Code](https://code.claude.com) | ✅ Plugin | `/plugin install` marketplace or `~/.claude/skills/` |
| Claude Projects | ✅ Compatible | Custom instructions + knowledge files |
| GPT-4+ / Gemini Pro+ | ✅ Compatible | System prompt |

Follows the [AgentSkills](https://agentskills.io) open standard (CSO v1).

## 📄 License

[MIT](LICENSE) © 2026 Weiping Liu
