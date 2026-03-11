# 🎨 IxD Design Skill

An [AgentSkills](https://agentskills.io)-compatible skill that guides AI assistants through a structured 8-phase interaction design workflow — from product context to developer handoff.

**No external tools required.** Pure instruction skill. Works with any LLM that supports markdown instructions.

---

## ✨ Features

- **8-phase structured workflow** — Context → Architecture → Flows → Page Specs → Components → Visual → Prototype → Delivery
- **Socratic discovery** — Adaptive 0-8 question pre-interview that analyzes user input and only asks what's missing
- **22-type page taxonomy** — Exhaustive page classification including 4 desktop-specific types
- **10-section per-page specs** — Developer-ready interaction specifications with mandatory walkthrough
- **Cross-platform dual prototypes** — Separate mobile (390×844) + desktop (1280×800) HTML prototypes sharing design tokens
- **PC desktop client support** — Hover states, right-click menus, keyboard shortcuts, drag & drop, window management
- **47-item heuristic walkthrough** — Automated interaction quality check across 10 categories
- **7 auxiliary tools** — Competitor analysis, heuristic review, A/B comparison, visual style exploration, multi-perspective review, micro-interaction design, PC client interaction
- **Final review gate** — Mandatory walkthrough + multi-perspective review with fix cycle (max 3 rounds) before delivery
- **Smart phase resumption** — Dependency-aware context loading, not "load everything"

## 📋 Workflow Overview

```
P1          P2           P3          P4             P5         P6        P7         P8
产品上下文 → 信息架构   → 用户流程 → 页面交互说明 → 组件规范 → 视觉设计 → 原型     → 交付+评审
Context     Architecture  Flows      Page Specs     Components Visual    Prototype   Delivery
```

| Phase | Key Output | File |
|-------|------------|------|
| P1 — 产品上下文 | Design brief, principles, visual direction | `phase1-context.md` |
| P2 — 信息架构 | 22-type page inventory, sitemap, navigation | `phase2-architecture.md` |
| P3 — 用户流程 | Mermaid flow diagrams, edge cases | `phase3-userflows.md` |
| P4 — 页面交互说明 | Per-page 10-section interaction specs | `phase4-page-specs/` |
| P5 — 组件规范 | Design tokens, component library | `phase5-components.md` |
| P6 — 视觉设计 | 10-dimension visual system | `phase6-visual.md` |
| P7 — 可交互原型 | High-fidelity HTML prototype | `phase7-prototype*.html` |
| P8 — 设计交付 | Complete spec document + review report | `phase8-document.md` |

All outputs are saved to `doc/ixd/` in the working project directory.

## 🚀 Quick Start

### Installation

<details>
<summary><strong>Pi</strong> (recommended)</summary>

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
# Manual install
cp -r skills/ixd-design ~/.openclaw/workspace/skills/ixd-design

# Or shared across agents
cp -r skills/ixd-design ~/.openclaw/skills/ixd-design
```

Refresh skills or start a new session.
</details>

<details>
<summary><strong>Claude Code</strong></summary>

```bash
cp -r skills/ixd-design ~/.claude/skills/ixd-design
```
</details>

<details>
<summary><strong>Claude Projects / Other LLMs</strong></summary>

1. Copy `SKILL.md` content into system prompt or custom instructions
2. Upload `references/` files as project knowledge
</details>

### Usage

Just talk naturally. The skill auto-detects your intent:

```
"帮我设计一个记账 App"          → starts from Phase 1
"我有PRD了，直接开始信息架构"    → starts from Phase 2
"从阶段4开始"                   → starts from Phase 4
"继续上次的设计"                → auto-detects from progress.json
```

## 🧠 Key Design Decisions

### Socratic Discovery (Phase 1)

The skill doesn't blindly ask a checklist. It analyzes user input against 8 information dimensions, skips what's already known, and generates only the questions that matter — between 0 and 8.

```
User: "帮我设计一个类似 Notion 的协作笔记工具，React 技术栈"
                    ↓
     D1 platform: missing  → ask
     D2 features: partial  → shorter follow-up
     D3 users: missing     → ask
     D4 style: inferred from "类似 Notion" → skip
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
| P5 | P4 (current batch) | P1, P2 | P3 |
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
├── README.md                           ← This file
├── LICENSE                             ← MIT
└── skills/
    └── ixd-design/                     ← AgentSkills-compatible skill folder
        ├── SKILL.md                    ← Main entry point (743 lines)
        ├── INSTALL.md                  ← Installation guide
        └── references/
            ├── phase1-context.md       ← Product context gathering
            ├── phase2-architecture.md  ← 22-type page taxonomy
            ├── phase3-userflow.md      ← Flow diagram patterns
            ├── phase4-page-interaction.md ← 10-section page spec format
            ├── phase5-components.md    ← Design token + component spec
            ├── phase6-visual.md        ← 10-dimension visual system
            ├── phase7-prototype.md     ← HTML prototype patterns (mobile + desktop)
            ├── phase8-delivery.md      ← Delivery document structure
            ├── auxiliary-tools.md      ← 7 auxiliary design tools
            └── quickref.md            ← Quick reference card
```

### Output Structure (generated per project)

```
doc/ixd/
├── progress.json               ← Phase tracker with per-phase summaries
├── phase1-context.md
├── phase2-architecture.md
├── phase3-userflows.md
├── phase4-page-specs/
│   ├── batch-1.md
│   └── ...
├── phase5-components.md
├── phase6-visual.md
├── phase7-prototype-mobile.html    ← Cross-platform: mobile
├── phase7-prototype-desktop.html   ← Cross-platform: desktop
├── phase8-document.md
└── phase8-review-round-1.md        ← Review report
```

## 🔧 Auxiliary Tools

These tools can be invoked at any point via natural language:

| Tool | Trigger |
|------|---------|
| Competitor Analysis | "分析竞品" / "competitor analysis" |
| Design Heuristic Review | "交互走查" / "review checklist" |
| A/B Comparison | "对比方案" / "compare approaches" |
| Visual Style Exploration | "探索风格" / "style options" |
| Multi-Perspective Review | "多角色评审" / "different viewpoints" |
| Micro-Interaction Design | "微交互" / "micro-interaction" |
| PC Client Interaction | "PC客户端设计" / "desktop interaction" |

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

| Platform | Status | Notes |
|----------|--------|-------|
| [Pi](https://github.com/mariozechner/pi-coding-agent) | ✅ Native | Auto-discovered via `SKILL.md` |
| [OpenClaw](https://openclaw.ai) | ✅ Compatible | With `metadata.openclaw.emoji` |
| Claude Code | ✅ Compatible | Via `~/.claude/skills/` |
| Claude Projects | ✅ Compatible | Via custom instructions + knowledge |
| GPT-4+ / Gemini Pro+ | ✅ Compatible | Via system prompt |

Follows the [AgentSkills](https://agentskills.io) open standard (CSO v1).

## 📄 License

[MIT](LICENSE) © 2026 Weiping Liu
