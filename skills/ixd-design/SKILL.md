---
name: ixd-design
description: |
  Use when designing apps, websites, mini-programs, or desktop clients (PC/Mac/Electron/Tauri).
  Covers interaction design, visual design, prototyping, and developer handoff.
  Triggers: '交互设计', '原型设计', '页面流程', '信息架构', '设计文档', '视觉设计',
  '配色方案', 'wireframe', 'mockup', 'prototype', 'user flow', 'interaction spec',
  设计页面, 设计App, 做原型, PC客户端设计, 桌面端交互, design screens/pages/features.
  8-phase workflow: context → architecture → flows → page specs → components → visual → prototype → delivery.
compatibility: No external tools required. Works with any LLM that supports markdown instructions.
metadata: {"openclaw": {"emoji": "🎨"}}
---

# IxD Full Workflow Skill v1.0

An 8-phase workflow producing professional interaction + visual design deliverables with flexible quick-start resumption.

> **v1.1**: Phase 7 TDD workflow added — test-first interaction development, batch heuristic walkthrough (Tool 2), and Phase 2 completeness check with merged review report.
>
> **v1.0**: 8-phase workflow; natural language triggers; 22 page types (including 4 desktop-specific); Phase 4 with 10 sections (交互走查 + 微交互说明); cross-platform dual prototypes (mobile + desktop); Phase 8 document structure with full desktop coverage; 快捷键映射总表 appendix; Socratic discovery (Phase 1); dependency-aware phase resumption; final review gate with 3-round fix cycle.

---

## Output Directory Rule

**ALL phase deliverables MUST be saved to `doc/ixd/` in the current project directory.**

```
doc/ixd/
├── phase1-context.md           ← Phase 1 output
├── phase2-architecture.md      ← Phase 2 output
├── phase3-userflows.md         ← Phase 3 output
├── phase4-page-specs/
│   ├── page-1.md              ← Page specs
│   ├── page-2.md
│   └── ...
├── phase5-components.md        ← Phase 5 output
├── phase6-visual.md            ← Phase 6 output
├── phase7-prototype.html       ← Phase 7 output (mobile, default)
├── phase7-prototype-desktop.html ← Phase 7 output (desktop, if specified)
├── phase7-prototype-mobile.html  ← Phase 7 output (cross-platform: mobile)
├── phase8-document.md          ← Phase 8 output
├── phase8-review-round-1.md    ← Review report (round 1)
└── progress.json               ← Phase progress tracker
```

Create `doc/ixd/` if it doesn't exist. After each phase, save the deliverable AND update `doc/ixd/progress.json`.

**progress.json schema:**
```json
{
  "product": "<<product_name>>",
  "platform": "mobile",
  "language": "<<detected_language: zh|en>>",
  "phases": {
    "1": { "status": "done", "file": "phase1-context.md", "summary": "<<positioning>>; target users: <<user_roles>>; platform: <<platform>>; principles: <<keywords>>; visual direction: <<keywords>>" },
    "2": { "status": "done", "file": "phase2-architecture.md", "summary": "<<N>> pages (<<type_distribution>>); navigation: <<nav_pattern>>; key modules: <<module_names>>" },
    "3": { "status": "done", "file": "phase3-userflows.md", "summary": "<<N>> core flows: <<flow_names>>; key decision points: <<description>>" },
    "4": {
      "status": "done",
      "file": "phase4-page-specs/",
      "summary": "Completed <<N>>/<<total>> page specs; latest batch: <<page_names>>",
      "pagesCompleted": [],
      "pagesTotal": 0
    },
    "5": { "status": "pending", "file": null, "summary": null },
    "6": { "status": "pending", "file": null, "summary": null },
    "7": {
      "status": "pending",
      "file": null,
      "summary": null,
      "pagesCompleted": [],
      "pagesTotal": 0
    },
    "8": { "status": "pending", "file": null, "summary": null, "reviewRounds": 0, "reviewResult": null }
  },
  "lastUpdated": "<<ISO_timestamp>>"
}
```

**Summary field guidelines**: Each summary should be a **single line, ≤200 chars**, capturing the key decisions and numbers that downstream phases need. This enables lightweight context loading — later phases can read summaries instead of full files for indirect dependencies.

**Phase 4 & 7 special fields**:
- `pagesCompleted`: Array of page IDs (e.g., `["P01", "P02", "P03"]`) — tracks which pages are documented/implemented
- `pagesTotal`: Total number of pages from Phase 2 inventory — used for completeness check

---

## Phase Map

| # | Phase | Key Deliverable | File | Reference |
|---|-------|----------------|------|-----------|
| 1 | Product Context | Design brief, principles, challenges | `doc/ixd/phase1-context.md` | `references/phase1-context.md` |
| 2 | Information Architecture | Exhaustive sitemap, page inventory (22 types) | `doc/ixd/phase2-architecture.md` | `references/phase2-architecture.md` |
| 3 | User Flows | Mermaid flow diagrams, step tables | `doc/ixd/phase3-userflows.md` | `references/phase3-userflow.md` |
| 4 | Page Interaction Specs | Per-page 10-section interaction spec | `doc/ixd/phase4-page-specs/` | `references/phase4-page-interaction.md` |
| 5 | Component Library | Design tokens, component specs | `doc/ixd/phase5-components.md` | `references/phase5-components.md` |
| 6 | Visual Design | 10-dimension visual system | `doc/ixd/phase6-visual.md` | `references/phase6-visual.md` |
| 7 | Interactive Prototype | High-fidelity HTML prototype (dual for cross-platform) | `doc/ixd/phase7-prototype*.html` | `references/phase7-prototype.md` |
| 8 | Design Document | Complete specification document | `doc/ixd/phase8-document.md` | `references/phase8-delivery.md` |

---

## Quick-Start & Resume System

The skill supports two ways to enter or resume the workflow.

### Method 1: Natural Language Detection

| User says | Start Phase |
|-----------|-------------|
| "start from phase N" / "从阶段N开始" | Phase N |
| "continue where we left off" / "继续上次的设计" | Auto-detect |
| "design an app/desktop app for me" / "帮我设计一个App/PC客户端" | Phase 1 |
| "I have a PRD" / "我有PRD了" | Phase 2 |
| "draw user flows" / "帮我画用户流程图" | Phase 3 |
| "design this page" / "帮我设计这个页面" | Phase 4 |
| "create component specs" / "整理组件规范" | Phase 5 |
| "visual design" / "color scheme" / "做视觉方案" | Phase 6 |
| "clickable prototype" / "做个可点击原型" | Phase 7 |
| "design document" / "write design doc" / "写设计文档" | Phase 8 |

### Method 2: Artifact Auto-Detection

When the user provides prior work or `doc/ixd/` files exist, auto-detect completed phases:

**Check `doc/ixd/progress.json` FIRST.** If it exists, use it as ground truth.

If no progress.json, detect from provided content:

| Signal | Implies Phase Complete |
|--------|----------------------|
| Product name + user roles + features mentioned | Phase 1 ✓ |
| Page list or sitemap present | Phase 2 ✓ |
| Flow diagrams or step tables present | Phase 3 ✓ |
| Per-page interaction specs present | Phase 4 ✓ |
| Component list with props/states | Phase 5 ✓ |
| Color values + font specs defined | Phase 6 ✓ |
| HTML/React prototype code present | Phase 7 ✓ |

After detection, confirm with the user:
> "Based on `doc/ixd/progress.json` / the content you provided, I've identified these phases as complete: Phase 1 ✅, Phase 2 ✅. Suggesting to start from **Phase 3 (User Flows)**. Is this correct?"

---

### Resume Logic for Phase 4 & 7 (Page-Based Phases)

Phase 4 and Phase 7 are **page-based** — they process multiple pages across batches. When resuming these phases:

#### Step 1: Read Progress State

```js
// Read from progress.json
const { phases } = require('./doc/ixd/progress.json');
const phase4Status = phases['4'];
const phase7Status = phases['7'];
```

#### Step 2: Identify Completed vs. Remaining Pages

For Phase 4:
```js
const completedPages = phase4Status.pagesCompleted || [];  // e.g., ["P01", "P02", "P03"]
const pagesTotal = phase4Status.pagesTotal || 0;

// Read expected pages from Phase 2
const expectedPages = readPageInventory('doc/ixd/phase2-architecture.md');

// Calculate remaining
const remainingPages = expectedPages.filter(p => !completedPages.includes(p.id));
```

For Phase 7 (same logic, but check prototype implementation status):
```js
const completedPages = phase7Status.pagesCompleted || [];
const pagesTotal = phase7Status.pagesTotal || 0;
const remainingPages = expectedPages.filter(p => !completedPages.includes(p.id));
```

#### Step 3: Resume Decision Tree

```
IF remainingPages.length === 0:
  → Run Completeness Check (Step 4)

ELSE IF remainingPages.length > 0:
  → Resume from first remaining page
  → Output: "Phase <<N>> completed <<M>>/<<total>> pages, continuing with <<K>> remaining pages: <<page name list>>"
  → Process in batches of 3-5 pages (Phase 4) or 2-3 pages (Phase 7)
  → Update pagesCompleted after each batch
```

#### Step 4: Completeness Check (when all pages marked complete)

Even when `pagesCompleted.length === pagesTotal`, verify against Phase 2 inventory:

```js
// 1. Read Phase 2 page inventory
const phase2Pages = readPageInventory('doc/ixd/phase2-architecture.md');

// 2. For Phase 4: scan phase4-page-specs/ directory
const phase4ActualPages = scanPhase4Specs('doc/ixd/phase4-page-specs/');

// For Phase 7: scan prototype code for route definitions
const phase7ActualPages = scanPrototypeRoutes('doc/ixd/phase7-prototype*.html');

// 3. Compare
const missingPages = phase2Pages.filter(p => !phase4ActualPages.includes(p.id));

IF missingPages.length === 0:
  → ✅ All pages verified, proceed to next phase

ELSE:
  → ⚠️ Found <<N>> missing pages: <<page name list>>
  → Generate missing pages first, then proceed to next phase
  → Update progress.json after supplementing
```

#### Resume Confirmation Message

```
## Phase <<N>> Resume

**Completed pages**: <<M>>/<<total>>
**Remaining pages**: <<K>>

<<IF remainingPages.length > 0>>
### Pages to Process
| Page ID | Page Name | Page Type |
|---------|-----------|-----------|
| <<P04>> | <<Product Detail>> | Detail |
| <<P05>> | <<Shopping Cart>> | List |
| ... | ... | ... |

Resuming from **<<first remaining page name>>**.

<<ELSE>>
### Completeness Check
Verifying against Phase 2 page inventory...

✅ All pages verified, proceeding to Phase <<N+1>>.
-- OR --
⚠️ Missing pages found: <<page name list>>, supplementing first then proceeding to next phase.
```

---

## Phase Execution Guide

### Before Each Phase — Context Loading Strategy

Each phase depends on specific prior outputs. Loading everything wastes tokens; loading too little produces inconsistent results.

**Step 1**: Always read `doc/ixd/progress.json` first (lightweight, has per-phase summaries).

**Step 2**: Load prior phase outputs according to this dependency table:

| Starting Phase | MUST Load (Full Files) | Summary Only (from progress.json) | Skip |
|---|---|---|---|
| P1 | — | — | — |
| P2 | P1 | — | — |
| P3 | P1, P2 | — | — |
| P4 | P2, P3 | P1 | — |
| P5 | P4 (batch being worked on or completed) | P1, P2 | P3 |
| P6 | P1, P5 | P2 | P3, P4 |
| P7 | P5, P6, P4 (pages being prototyped) | P1, P2 | P3 |
| P8 | P1, P2, P3, P5, P6, P4 (chapter-by-chapter) | — | — |

**P4 Special Handling**: Phase 4 outputs are per-page files in `doc/ixd/phase4-page-specs/`. Do NOT load all at once.
- **Phase 4 completeness check** reads P2 page inventory to identify missing pages.
- **Phase 5** reads P4 batch-by-batch to extract components, then synthesizes.
- **Phase 7** loads only the pages being prototyped in the current batch, and reads P2 for completeness check.
- **Phase 8** references P4 by section, does not need all pages in memory simultaneously.

**Step 3**: Read the current phase's reference file: `references/phase<N>-<name>.md`

**Step 4**: If resuming (not Phase 1), briefly recap key decisions before executing:
> "Based on existing deliverables, the product is <<product_name>>, target platform <<platform>>, with <<N>> pages. Now entering Phase <<N>>..."

**Step 5**: Execute the phase, save deliverables to `doc/ixd/`, update `progress.json`.

**Why this dependency structure:**
- **P1 (context)** is small (~2K tokens) and contains foundational decisions (platform, brand direction, design principles). Most phases benefit from having it.
- **P2 (architecture)** defines the page inventory and navigation — essential for any phase that deals with pages or navigation.
- **P3 (flows)** describes user journeys — needed by P4 to write per-page interaction logic, but its information is already embedded in P4's output. Later phases can skip P3.
- **P4 (page specs)** is the largest deliverable. Only load the specific pages relevant to the current task.
- **P5 (components/tokens)** is the bridge between interaction specs and visual/prototype — compact enough to always load when needed.
- **P6 (visual)** must be loaded for P7 (prototype needs the visual system).
- **P8 (delivery)** packages everything but works chapter-by-chapter, not all-at-once.

---

### Phase 1: Product Context

**Goal**: Establish shared understanding of product, users, and constraints.

#### Phase 1 Step A: Socratic Discovery

Before producing the Phase 1 deliverable, analyze what the user has already provided and determine what critical gaps remain. This step generates **0-8 targeted questions** — zero means the user's input is already sufficient, skip directly to Step B.

**Question Generation Process:**

1. Parse the user's input (natural language description, PRD, or requirements doc)
2. Check each of the 8 info dimensions below against what was provided
3. For each dimension: if the info is **clearly stated or can be confidently inferred** → mark as resolved; if **ambiguous or missing** → generate a question
4. Eliminate redundant questions (if one answer would resolve multiple dimensions, merge)
5. Sort by downstream impact (questions affecting more phases come first)
6. Cap at 8 questions maximum — ask only what truly matters

**The 8 Info Dimensions (by downstream impact):**

| # | Dimension | Why Critical | Affects Phases |
|---|-----------|-------------|----------------|
| D1 | Target Platform | Determines page types, navigation, components, prototype strategy | P2-P8 all |
| D2 | Core Modules | Drives page inventory and user flows | P2, P3, P4 |
| D3 | Target Users & Scenarios | Drives flow design and interaction complexity | P3, P4 |
| D4 | Design Style / Visual Direction | Drives visual system, component style | P5, P6, P7 |
| D5 | Tech Framework | Constrains component approach and prototype | P5, P7 |
| D6 | Design System Base | Determines component library foundation | P5, P6 |
| D7 | Competitors / References | Calibrates design direction and scope | P1, P2, P6 |
| D8 | Positioning & Differentiation | Guides design principles and trade-offs | P1, all |

**Question Format Rules:**

- Each question is either **open-ended** or **multiple-choice**
- Multiple-choice questions MUST include a **recommended option** marked with `⭐ Recommended`
- Multiple-choice can be single-select or multi-select (indicate which)
- Every question includes a brief reason explaining WHY this info matters
- One question per turn, show progress: `📋 Question (2/5)`

**Question Templates by Dimension (Bilingual):**

When user inputs Chinese, use Chinese templates. When user inputs English, use English templates.

```
D1 — Target Platform [Multiple Choice, Single Select]

[English]
📋 Question (1/N)
What is the target platform? (Single select, directly determines prototype output and design direction)
  A. 📱 Mobile (iOS / Android App / Web / Mini-program) ⭐ Default
  B. 🖥️ Desktop (PC Client: Electron / Tauri / Flutter Desktop / Native)
  C. 📱+🖥️ Cross-platform (Mobile + Desktop, output two prototypes)
  D. Other: ___

[中文]
📋 问题 (1/N)
产品的目标平台是？（单选，直接决定原型输出形式和后续阶段的设计方向）
  A. 📱 移动端（iOS / Android App / Web / 小程序）⭐ 默认选项
  B. 🖥️ 桌面端（PC 客户端: Electron / Tauri / Flutter Desktop / 原生）
  C. 📱+🖥️ 跨平台（移动端 + 桌面端，输出两套原型）
  D. 其他: ___

---

D2 — Core Modules [Open-ended]

[English]
📋 Question (2/N)
What are the core functional modules? (3-7 modules, one sentence each. This determines IA and page count.)
Example: "① Content Publishing — users create and edit text/image content; ② Social Interaction — like, comment, follow; ③ Message Center — DMs and system notifications"

[中文]
📋 问题 (2/N)
产品的核心功能模块有哪些？（3-7 个即可，每个用一句话描述。这决定了信息架构和页面数量）
例如："① 内容发布 — 用户创建和编辑图文内容；② 社交互动 — 点赞、评论、关注；③ 消息中心 — 私信和系统通知"

---

D3 — Target Users & Scenarios [Open-ended]

[English]
📋 Question (3/N)
Who are the primary users? What scenarios do they use the product in? (2-3 user personas. This determines flow design and interaction complexity.)
Example: "① Content Creator — publishes short content on phone during daily commute; ② Reader — browses recommended content before sleep"

[中文]
📋 问题 (3/N)
产品的主要用户是谁？他们在什么场景下使用？（2-3 个用户角色即可。这决定了用户流程设计和交互复杂度）
例如："① 内容创作者 — 日常通勤时用手机发布短内容；② 读者 — 睡前浏览推荐内容"

---

D4 — Design Style [Multiple Choice, Single Select]

[English]
📋 Question (4/N)
What design style direction do you prefer? (This determines the visual system and prototype tone.)
  A. 🧊 Minimal — lots of whitespace, low information density (e.g., Apple, Linear) ⭐ Recommended for tools and content products
  B. 🎨 Playful — rich colors, rounded elements (e.g., Notion, Figma)
  C. 🏢 Professional — high density, data-driven (e.g., Bloomberg, Lark)
  D. 🌿 Warm — soft colors, natural elements (e.g., Calm, Xiaohongshu)
  E. 🔮 Futuristic — dark theme, gradient glow effects (e.g., Vercel, Arc)
  F. Other: ___

[中文]
📋 问题 (4/N)
你期望的设计风格方向？（这决定了视觉系统和原型的整体调性）
  A. 🧊 简约克制 — 大量留白，信息密度低（如 Apple、Linear）⭐ 推荐：适合工具类和内容类产品
  B. 🎨 活泼多彩 — 丰富色彩，圆润元素（如 Notion、Figma）
  C. 🏢 专业严谨 — 高信息密度，数据导向（如 Bloomberg、飞书）
  D. 🌿 温暖人文 — 柔和配色，自然元素（如 Calm、小红书）
  E. 🔮 科技未来 — 深色基调，渐变光效（如 Vercel、Arc）
  F. 其他: ___

---

D5 — Tech Framework [Multiple Choice, Single Select]

[English]
📋 Question (5/N)
What is the frontend tech stack? (Affects component spec granularity and prototype implementation.)
  A. React / Next.js  ⭐ Recommended: prototype can be directly reused
  B. Vue / Nuxt
  C. React Native / Expo
  D. Flutter
  E. SwiftUI (iOS/macOS native)
  F. Electron / Tauri (Desktop)
  G. Undecided
  H. Other: ___

[中文]
📋 问题 (5/N)
前端技术栈是？（影响组件规范的粒度和原型的实现方式）
  A. React / Next.js  ⭐ 推荐：原型可直接复用
  B. Vue / Nuxt
  C. React Native / Expo
  D. Flutter
  E. SwiftUI (iOS/macOS 原生)
  F. Electron / Tauri（桌面端）
  G. 尚未确定
  H. 其他: ___

---

D6 — Design System Base [Multiple Choice, Single Select]

[English]
📋 Question (6/N)
Which design system will you use as a base? (Affects component library selection and interaction patterns.)
  A. Ant Design  ⭐ Recommended: B2B / enterprise products
  B. Material Design 3 (Google)
  C. Apple HIG (iOS/macOS)
  D. Fluent Design (Windows)
  E. Custom design system (from scratch)
  F. Undecided (I will recommend based on product type)
  G. Other: ___

[中文]
📋 问题 (6/N)
采用哪个设计规范作为基底？（影响组件库选型和交互范式）
  A. Ant Design  ⭐ 推荐：中后台/B端产品
  B. Material Design 3 (Google)
  C. Apple HIG (iOS/macOS)
  D. Fluent Design (Windows)
  E. 自建设计系统（从零开始）
  F. 尚未确定（由我根据产品类型推荐）
  G. 其他: ___

---

D7 — Competitors / References [Open-ended]

[English]
📋 Question (7/N)
Any competitors or products you'd like to reference? (1-3 products, specify which dimension: interaction / visual / IA / specific feature.)
Example: "Reference Notion's block editing interaction + Linear's minimal visual style"
If none, skip and I'll recommend based on product type.

[中文]
📋 问题 (7/N)
有没有想参考的竞品或产品？（1-3 个，说明具体参考哪个维度：交互方式/视觉风格/信息架构/某个功能）
例如："参考 Notion 的 block 编辑交互 + Linear 的视觉极简风格"
如果没有也可以跳过，我会根据产品类型推荐。

---

D8 — Positioning & Differentiation [Open-ended]

[English]
📋 Question (8/N)
In one sentence: what's the biggest difference between this product and existing competitors? (This affects design principles.)
Example: "Compared to Notion, we focus more on Chinese users' collaboration habits, mobile-first approach"

[中文]
📋 问题 (8/N)
用一句话描述：这个产品和市面上已有的同类产品相比，最大的不同是什么？（这会影响设计原则的制定）
例如："和 Notion 相比，我们更聚焦于中国用户的协作习惯，强调移动端优先"
```

**Adaptive Question Selection Algorithm:**

```
FOR each dimension D1-D8:
  IF user input clearly covers this dimension:
    SKIP (don't ask)
  ELIF user input partially covers (ambiguous):
    Generate a SHORTER follow-up question (not the full template)
  ELSE (no info at all):
    Use the full question template
END FOR

REMOVE questions where the answer can be confidently inferred:
  e.g., user says "我要做一个 iOS App" → D1 resolved, skip
  e.g., user says "类似 Notion 的笔记工具" → D7 partially resolved, D8 partially resolved

MERGE questions that overlap:
  e.g., if both D5 and D6 are missing, combine into one question about tech + design system

SORT by impact (D1 > D2 > D3 > D4 > D5 ≈ D6 > D7 ≈ D8)

RESULT: 0-8 questions
```

**Asking Flow:**

1. After analyzing user input, announce: `"I need to clarify <<N>> key pieces of information, one question at a time:"` (if N=0: `"The information you provided is sufficient, proceeding to design!"`)
2. Ask question 1, wait for answer
3. Ask question 2, wait for answer
4. ... repeat until all questions answered
5. Summarize all gathered context in a brief recap
6. Proceed to Step B

If user says "skip" / "not important" / "you decide" for any question, use the recommended option (for choice questions) or make a reasonable assumption (for open-ended questions), and note the assumption in the deliverable.

#### Phase 1 Step B: Deliverable Generation

**Platform Configuration**: Detect and record the target platform in `progress.json`:
- `platform: "mobile"` (default) — Mobile App / Web / Mini-program
- `platform: "desktop"` — PC client only (Electron / Tauri / Flutter Desktop / Native)
- `platform: "both"` — Cross-platform (mobile + desktop)

**Platform Detection Logic**:
1. If user explicitly mentions "PC 客户端" / "桌面端" / "Electron" / "Tauri" → set `platform: "desktop"` or `platform: "both"`
2. If user mentions both mobile and desktop contexts → set `platform: "both"`
3. Default to `platform: "mobile"` if not specified

The `platform` value determines:
- **Phase 7 output**: `"mobile"` → `phase7-prototype.html`; `"desktop"` → `phase7-prototype-desktop.html`; `"both"` → two files (`phase7-prototype-mobile.html` + `phase7-prototype-desktop.html`)
- **Phase 2, 4, 5, 6**: Whether to include desktop-specific sections

Save to: `doc/ixd/phase1-context.md`
Read: `references/phase1-context.md`

---

### Phase 2: Information Architecture

**Goal**: Exhaustively map all pages using the **22-type** taxonomy.

**Page Type Taxonomy (22 types):**

**Core Content (1-5)**: Hub, List, Detail, Search, Filter

**Forms & Input (6-8)**: Form, Wizard (multi-step form), Picker

**Feedback & Results (9-10)**: Result, Empty State

**Account & System (11-14)**: Auth (login/register), Profile, Settings, About/Legal

**Onboarding & Transitions (15-17)**: Splash, Onboarding, Transition/Loading

**Overlays (18)**: Dialog/Modal/Sheet

**Desktop-Exclusive (19-22)**:
- 19. Workspace — Main desktop interface with multi-panel layout, toolbars
- 20. Side Panel — Collapsible sidebar (navigation, properties, file tree)
- 21. Preferences — Standalone settings window or modal
- 22. Tray/Menu Bar — System tray popup, menu bar dropdown

**Navigation Structure**: Split by platform:
- **Mobile Navigation**: Bottom Tab / Top Navigation
- **Desktop Navigation**: Sidebar (collapsible) / Top Menu Bar / Toolbar / Hybrid
- **Cross-platform Navigation**: Navigation differences and consistency strategy, navigation item mapping

**Desktop Lifecycle Check**: If platform includes PC client, add to page exhaustiveness check:
- Install/Uninstall → First Launch → Window Management → Tray Behavior → Auto-update → Keyboard Shortcuts → System Integration (file association / context menu / protocol handler)

Save to: `doc/ixd/phase2-architecture.md`
Read: `references/phase2-architecture.md`

---

### Phase 3: User Flows

**Goal**: Design task-oriented flow diagrams for 3-5 core scenarios + system flows.

If platform includes PC client, include desktop-specific flows:
- Cold Start Flow: Download → Install Wizard → First Launch → Setup Wizard → Main Window
- Auto-update Flow: Check Update → Prompt User → Background Download → Install → Restart

Save to: `doc/ixd/phase3-userflows.md`
Read: `references/phase3-userflow.md`

---

### Phase 4: Page Interaction Specs

**Goal**: Developer-ready interaction specs. The core deliverable.

Each page now has **10 sections**:

| Section | Name | Description |
|---------|------|-------------|
| 1 | Page Overview | Core function and position in product |
| 2 | Layout Structure | Layout areas (mobile single-column / desktop multi-panel), cross-platform products describe both |
| 3 | Component Inventory | All interactive components in table format |
| 4 | Interaction Behaviors | Per-component: click, long-press, swipe, hover, right-click, keyboard, drag, input, disabled, feedback |
| 5 | State Machine | All states: default, loading, empty, error, no-permission, partial-load, edit mode (7 states) |
| 6 | Motion Specs | Transitions, element animations, gesture interactions |
| 7 | Data Loading Strategy | First load, refresh, cache, pagination |
| 8 | Adaptation Rules | PC client adaptation (window min size, resizable, panel layout, title bar style), PC browser, tablet, small screen, landscape, dark mode, accessibility, multi-window (desktop) |
| 9 | Interaction Walkthrough | **Mandatory**: Before output, self-check against Appendix B walkthrough checklist. Output results as table. If any item fails, go back and fix sections 1-8 first. |
| 10 | Micro-interaction Specs | Identify micro-interaction scenarios on this page (like, favorite, delete, toggle, drag-sort, etc.) and describe: trigger, visual change, animation params, haptic/sound feedback, state reversal, CSS pseudo-code. If none needed, mark "No specific micro-interaction scenarios on this page". |

**Resume Check** (execute on phase entry):

```
1. Read progress.json → check phases["4"].pagesCompleted
2. Read Phase 2 page inventory → get expectedPages
3. Calculate remainingPages = expectedPages - pagesCompleted
4. IF remainingPages.length > 0:
     → Resume from first remaining page
     → Output: "Phase 4 completed <<M>>/<<total>> pages, continuing with <<K>> remaining pages"
   ELSE:
     → Run Completeness Check (scan actual files)
     → IF all verified: proceed to Phase 5
     → IF missing: supplement, then proceed to Phase 5
```

Process in batches of 3-5 pages. Save each batch as `doc/ixd/phase4-page-specs/batch-<N>.md`.

**Batch Completeness Tracking**:
- After each batch, record completed page IDs in `progress.json`
- Before each new batch, check remaining pages from Phase 2 inventory
- Prioritize: core pages → high-traffic pages → secondary pages

**Page Completeness Check** (MANDATORY after all batches):

After generating all page specs, verify completeness against Phase 2 inventory:
1. Read expected pages from `doc/ixd/phase2-architecture.md`
2. Scan `doc/ixd/phase4-page-specs/` to identify documented pages
3. Compare and identify missing pages
4. If missing pages found: generate specs using the 10-section template
5. Output a completeness report showing ✅ completed / ⚠️ missing for each page
6. Update `progress.json` with `pagesCompleted` and `pagesTotal` fields
7. **Only after completeness check passes**: mark Phase 4 as `status: "done"` and proceed to Phase 5

Read: `references/phase4-page-interaction.md`

---

### Phase 5: Component Library

**Goal**: Extract and document reusable components + design tokens.

**PC Client Components**: If platform includes PC client, add these component categories:
- Window chrome (title bar, window controls)
- Toolbar buttons & toolbars
- Context menus / right-click menus
- Resizable split panes
- Data tables (sortable, resizable columns, multi-select)
- Tree views
- Command palette (Cmd+K / Ctrl+K)
- Tooltips with keyboard shortcut badges
- Status bar components
- System tray panel

**Desktop Window Specs** (in responsive section):
- Window minimum size: width × height
- Window default size: width × height
- Information density: Desktop can use compact mode (20-30% smaller line height/spacing)
- Title bar style: Native title bar / Custom title bar / No title bar (macOS traffic light area reserved)
- Menu bar: System native menu bar (macOS) / In-app menu bar / No menu bar

Save to: `doc/ixd/phase5-components.md`
Read: `references/phase5-components.md`

---

### Phase 6: Visual Design

**Goal**: Complete visual language across 10 dimensions.

**Desktop Font Fallback** (Section 2 Typography):
- Windows Chinese fallback: Microsoft YaHei → SimHei → sans-serif
- macOS Chinese fallback: PingFang SC → Hiragino Sans GB → sans-serif
- Desktop can embed custom fonts (no web loading performance concerns)
- Font size baseline: Desktop baseline can be 1-2px smaller than mobile

**Desktop Icon Sizes** (Section 3 Iconography):
- Sidebar navigation: 20px, click area 32×32px
- Toolbar buttons: 16-20px, click area 28×28px
- System tray: 16-22px (Windows 16px / macOS 22px)
- Menu item prefix: 16px

**Desktop Grid** (Section 7 Spacing & Grid):
- lg: 1024px–1279px (small window PC)
- xl: 1280px–1439px (standard PC, sidebar expanded)
- 2xl: ≥1440px (wide screen / external monitor, 3-column layout or 1200px max-width centered)
- Desktop column count: 12-16 columns
- Desktop max content width: 1200px/1440px/unlimited (tool applications)

**System Theme** (Section 9 Dark Mode):
- Desktop follows system theme auto-switch / In-app independent setting / Both supported
- Listen to system theme changes and switch in real-time
- Windows high contrast mode support

Save to: `doc/ixd/phase6-visual.md`
Read: `references/phase6-visual.md`

---

### Phase 7: Interactive Prototype

**Goal**: Clickable high-fidelity prototype using Phase 6's visual system.

**Platform-Driven Output Strategy**:

The `platform` field in `progress.json` determines output:

| platform | Output File(s) | Description |
|----------|---------------|-------------|
| `"mobile"` (default) | `phase7-prototype.html` | Mobile prototype with phone frame, tab bar, touch interactions |
| `"desktop"` | `phase7-prototype-desktop.html` | Desktop prototype with window frame, sidebar, hover/keyboard interactions |
| `"both"` | `phase7-prototype-mobile.html` + `phase7-prototype-desktop.html` | Two separate files sharing the same Design Token CSS variables |

**Why separate files for cross-platform?**

- Mobile and desktop have fundamentally different **information architecture** — mobile uses flat, card-based stacking; desktop uses sidebar + multi-panel spatial layouts
- **Navigation paradigms** differ: bottom tab bar (mobile) vs. sidebar + top toolbar (desktop)
- **Information density** differs: mobile shows 3-5 items per viewport; desktop shows 10-20+ with auxiliary info
- **Interaction models** differ: touch/swipe/pull-to-refresh (mobile) vs. hover/right-click/keyboard shortcuts/drag-resize (desktop)
- A single responsive file forces compromises that make neither platform feel native

**Mobile Prototype Specifications**:
- Viewport: 390×844px (iPhone 14/15, centered phone frame)
- Navigation: Bottom Tab + Top nav bar
- Interactions: Touch gestures, pull-to-refresh, swipe actions
- Page transitions: Slide animation

**Desktop Prototype Specifications**:
- Viewport: 1280×800px (desktop window frame with title bar)
- Navigation: Sidebar (collapsible: 240px ↔ 56px) + Top toolbar/menu bar
- Interactions: Hover states, right-click context menus, keyboard shortcuts, multi-panel drag, Tab focus navigation
- Page transitions: Fade animation
- Window chrome: Custom title bar with traffic lights (macOS) or window controls (Windows)

**Resume Check** (execute on phase entry):

```
1. Read progress.json → check phases["7"].pagesCompleted
2. Read Phase 2 page inventory → get expectedPages
3. Calculate remainingPages = expectedPages - pagesCompleted
4. IF remainingPages.length > 0:
     → Resume from first remaining page
     → Output: "Phase 7 completed <<M>>/<<total>> pages, continuing with <<K>> remaining pages"
   ELSE:
     → Run Completeness Check (scan prototype code for routes)
     → IF all verified: proceed to Phase 8
     → IF missing: supplement, then proceed to Phase 8
```

**Generation Steps (TDD Workflow)**:

> **TDD Methodology**: Phase 7 follows Test-Driven Development — write interaction tests first based on Phase 4 specs, then implement to pass tests.

For single-platform (`platform: "mobile"` or `"desktop"`):
1. **Resume check**: Skip already completed pages
2. Generate framework (routing + navigation + frame) if not exists
3. **TDD Step 1 - Write Tests**: For each page in the batch, write interaction tests based on Phase 4 specs:
   - Read `doc/ixd/phase4-page-specs/page-X.md` for each page
   - Extract interaction requirements (gestures, transitions, animations, states)
   - Write Playwright/React Testing Library tests for each interaction
4. **TDD Step 2 - Implement (RED)**: Run tests — they should FAIL initially
5. **TDD Step 3 - Implement (GREEN)**: Implement page components to pass all tests
6. **TDD Step 4 - Polish (IMPROVE)**: Refactor animations, states, edge cases
7. **Batch Review**: Run interaction walkthrough against Phase 4 and Tool 2 checklist
8. **Completeness check** against Phase 2 page inventory
9. **Only after all checks pass**: proceed to next batch or Phase 8

For cross-platform (`platform: "both"`):
1. **Resume check**: Skip already completed pages (check both platforms)
2. Generate shared Design Token CSS variables if not exists
3. Generate/extend mobile prototype (`phase7-prototype-mobile.html`)
4. Generate/extend desktop prototype (`phase7-prototype-desktop.html`)
5. **TDD Workflow** per batch (steps 3-7 above, applied to both platforms)
6. Independent QA per platform
7. **Completeness check** against Phase 2 page inventory (verify both platforms)
8. **Only after all checks pass**: proceed to next batch or Phase 8

**Batch Output Strategy**:
- Read page inventory from `doc/ixd/phase2-architecture.md`
- Output in batches: 3-5 pages (single platform) or 2-3 pages × 2 platforms (cross-platform)
- **After each batch**:
  1. Run `bundle-artifact.sh` to produce the latest prototype HTML file(s)
  2. Save/overwrite the output to `doc/ixd/phase7-prototype*.html`
  3. Update `progress.json`: increment `pagesCompleted`, record `lastBatch`
  4. **TDD Test Run**: Execute interaction tests for the batch
  5. **Batch Interaction Walkthrough**: Run Tool 2 checklist against batch pages
     - Read Phase 4 specs for each page in batch
     - Verify against 47-item heuristic checklist
     - Output batch review report to `doc/ixd/phase7-batch-N-review.md`
  6. If issues found: fix and re-run walkthrough until passing
  7. **PAUSE** — output a batch summary and ask the user:
     > "✅ Batch N complete — pages X, Y, Z implemented. Prototype updated: `phase7-prototype.html`
     > Progress: <<M>>/<<total>> pages done.
     > Batch Review: `phase7-batch-N-review.md` (see attached)
     > **Continue to next batch?** (yes / stop here)"
  8. Wait for user confirmation before proceeding to the next batch
- Track completed pages in `progress.json`
- Update `pagesCompleted` after each batch

**Batch Interaction Walkthrough Procedure** (MANDATORY after each batch):

After generating a batch of pages, perform the following review:

1. **Read Phase 4 specs** for each page in the batch:
   - `doc/ixd/phase4-page-specs/page-X.md`
   - Extract interaction requirements, gestures, transitions, animations

2. **Run Tool 2 Heuristic Checklist** (47 items) against batch pages:
   - Basic Interactions (5 items)
   - Page States (4 items)
   - Navigation and Flow (4 items)
   - Forms and Input (4 items)
   - Data Loading (4 items)
   - Content Display (4 items)
   - Visual and Brand (5 items)
   - Touch and Click (3 items)
   - Desktop-Exclusive (10 items, if applicable)
   - Cross-Platform Consistency (4 items, if applicable)

3. **Generate Batch Review Report** (`doc/ixd/phase7-batch-N-review.md`):
   ```markdown
   ## Batch N Interaction Review Report

   **Batch**: Pages X, Y, Z
   **Date**: YYYY-MM-DD
   **Reviewer**: AI (TDD Walkthrough)

   ### Walkthrough Score

   | Dimension | Pass/Total | Score |
   |-----------|------------|-------|
   | Basic Interactions | /5 | % |
   | Page States | /4 | % |
   | ... | ... | ... |
   | **Overall** | **/47** | **%** |

   ### Issues Found
   - <<Issue 1>>
   - <<Issue 2>>

   ### Fixes Applied
   - <<Fix 1>>
   - <<Fix 2>>

   ### Verdict
   ✅ PASS / ❌ FAIL (requires re-implementation)
   ```

4. **If issues found**: Fix the issues in the prototype, re-run walkthrough, update report

5. **Append to Master Report**: Merge batch review into `doc/ixd/phase7-review-master.md`

**Page Completeness Check** (MANDATORY after all batches):

After generating all pages, verify completeness against Phase 2 inventory:
1. Read expected pages from `doc/ixd/phase2-architecture.md`
2. Scan prototype code to identify implemented pages (check route definitions)
3. Compare and identify missing pages
4. If missing pages found: read corresponding specs from `doc/ixd/phase4-page-specs/` and implement
5. Output a completeness report showing ✅ implemented / ⚠️ missing for each page
6. Update `progress.json` with `pagesCompleted` and `pagesTotal` fields
7. **Append to Master Report**: Add completeness check to `doc/ixd/phase7-review-master.md`
8. **Only after completeness check passes**: mark Phase 7 as `status: "done"` and proceed to Phase 8

Save to: `doc/ixd/phase7-prototype.html` (mobile) or `doc/ixd/phase7-prototype-desktop.html` (desktop) or both files (cross-platform)
Read: `references/phase7-prototype.md`

---

### Phase 8: Design Delivery Document

**Goal**: Package everything into a formal spec document.

**Document Structure (v2.1)**:

**Cover**: Product Name, Document Type, **Target Platform**, Version/Date/Author/Status

**Chapter 1: Design Overview**
- 1.1 Product Background
- 1.2 Design Goals
- 1.3 Design Principles
- 1.4 Design Scope & Boundaries
- **1.5 Target Platform & Cross-platform Strategy** — Platform coverage, design language base per platform (MD3/HIG/Fluent), consistency strategy (what's consistent / what's allowed to differ), platform priority
- 1.6 Design References & Competitor Analysis
- 1.7 Terminology

**Chapter 2: Information Architecture**
- 2.1 Product Structure Diagram (Mermaid)
- 2.2 Page Inventory Table (exhaustive, covering **22 types**, including desktop-exclusive types)
- 2.3 Navigation Structure Design — **Mobile Navigation** (Bottom Tab / Top Nav) + **Desktop Navigation** (Sidebar / Menu Bar / Toolbar) + Cross-platform navigation mapping
- 2.4 Global Component Notes
- 2.5 Page Exhaustiveness Verification Record (including **Desktop Lifecycle** dimension)

**Chapter 3: User Flows**
- 3.1 Core Flows Overview
- 3.2 Detailed Flow Descriptions (with diagrams and step tables)
- 3.3 Exception Flow Handling Standards
- **3.4 Desktop-Exclusive Flows** (Install / Auto-update / Window Management / Tray Behavior, if applicable)

**Chapter 4: Page Interaction Specs**
- Organized by module, each page includes 10 sections: Overview / Layout / Components / Interactions / States / Motion / Data Strategy / Adaptation / **Walkthrough** / **Micro-interactions**
- Cross-platform products: Each page describes both **Mobile Layout** (single-column) and **Desktop Layout** (multi-panel), noting differences
- Desktop interactions: Hover states / Right-click menus / Keyboard shortcuts / Drag behaviors / Focus navigation
- Multi-window pages (desktop): Note whether standalone window, inter-window communication

**Chapter 5: Component Specs**
- 5.1 Design Tokens (shared)
- 5.2 Base Component Specs (including desktop states: hover / focus / drag)
- 5.3 Business Component Specs
- **5.4 Desktop-Exclusive Component Specs** (Sidebar / Toolbar / Menu Bar / Status Bar / Split Panel / Command Palette / System Tray Panel)
- **5.5 Responsive Adaptation Specs** — Breakpoint system (Phone / Tablet / Desktop Small / Desktop Standard / Desktop Wide) + **Desktop Window Specs** (min size / default size / title bar style) + Information density levels (mobile standard vs desktop compact)

**Chapter 6: Visual Design**
- 6.1 Color System (brand / functional / neutral / gradients)
- 6.2 Typography System (font selection / size scale / layout rules / **Desktop Font Fallback**: Windows YaHei chain + macOS PingFang chain)
- 6.3 Icon System (style / sizes / icon library / **Desktop-Exclusive Sizes**: sidebar / toolbar / tray / menu items)
- 6.4 Illustration System (style / use cases / asset list)
- 6.5 Shadows & Elevation
- 6.6 Border Radius System
- 6.7 Spacing & Grid (including **Desktop** column count / max content width / compact spacing / **Desktop Grid**)
- 6.8 Key Page Visual Annotations (cross-platform products need separate annotations for mobile and desktop)
- 6.9 Dark Mode Specs (including **Desktop System Theme Following Strategy** / Windows High Contrast support)
- 6.10 Motion Visual Specs (including **Desktop Window Animations** / Reduced Motion system setting respect)

**Chapter 7: Global Interaction Standards**
- 7.1 Gesture Standards (Mobile)
- **7.2 Mouse & Keyboard Interaction Standards (Desktop)** — Global shortcut mapping table (Function → macOS Shortcut → Windows Shortcut), Tab focus navigation order rules, Right-click menu trigger areas and item standards, Drag interaction standards (draggable elements / drop zone indicators / drag preview)
- 7.3 Transition Animation Standards (Mobile slide vs Desktop fade)
- 7.4 Feedback Mechanisms (Toast / Alert / SnackBar / Desktop System Notifications)
- 7.5 Loading Strategies (Skeleton screen / Pull-to-refresh / Pagination)
- 7.6 Exception Handling (Network errors / Service errors / Permission denied)
- 7.7 Permission Management Interactions
- 7.8 Push Notification Interactions (Mobile push / Desktop system notifications)
- 7.9 Dark Mode Adaptation Rules (including system theme following)
- **7.10 Desktop Window Management Standards** (Minimize / Maximize / Fullscreen / Split-screen / Tray minimize / Multi-window / Window position memory)

**Appendices**:
- A. Prototype Demo Links — **Single Platform**: Prototype HTML link; **Cross-platform**: Mobile prototype (prototype-mobile.html) + Desktop prototype (prototype-desktop.html)
- B. Style Tile
- C. Design Asset List (Icon library / Illustrations / Font files)
- D. Developer Handoff Notes — **Cross-platform Shared Logic & Platform Differences List**, **Platform-Specific Implementation Notes** (Windows title bar / macOS traffic lights / System tray / File association / Protocol handler), **Design Token to Tech Stack Mapping** (CSS variables / Flutter ThemeData / Swift Asset Catalog / WPF ResourceDictionary)
- E. Page Exhaustiveness Checklist (complete version, including **Desktop-Exclusive Pages**)
- **F. Keyboard Shortcut Mapping Table** (Desktop, macOS + Windows dual-column comparison)

Save to: `doc/ixd/phase8-document.md`
Read: `references/phase8-delivery.md`

---

### Phase 8 — Final Review Gate

**After the Phase 8 document is saved**, a mandatory two-part review must pass before the workflow is considered complete. This is NOT optional.

#### Review Procedure

**Step 1: Interaction Walkthrough** — Run the full 47-item heuristic checklist (Tool 2 from `references/auxiliary-tools.md`) against 3-5 representative pages from the design document. Output the scoring table.

**Step 2: Multi-Perspective Review** — Run the 6-perspective review (Tool 4 from `references/auxiliary-tools.md`) against the complete design. Output the priority table.

**Step 3: Save review report** to `doc/ixd/phase8-review-round-<N>.md` (N = 1, 2, or 3).

**Step 4: Pass/Fail judgment**:

| Condition | Verdict |
|---|---|
| Walkthrough: no priority fix items AND Review: no P0/P1 items | ✅ **PASS** — workflow complete |
| Walkthrough: has priority fix items OR Review: has P0 or P1 items | ❌ **FAIL** — enter fix cycle |

P2 (suggested) items do NOT block — record them in the report for future iteration.

#### Fix Cycle

When review **FAILS**:

1. List all blocking items (walkthrough priority fixes + review P0/P1 items)
2. Trace each item to its **source phase and file**:
   - Page interaction issues → fix `doc/ixd/phase4-page-specs/<page>.md`
   - Component spec issues → fix `doc/ixd/phase5-components.md`
   - Visual consistency issues → fix `doc/ixd/phase6-visual.md`
   - Flow defects → fix `doc/ixd/phase3-userflows.md`
   - Architecture/navigation issues → fix `doc/ixd/phase2-architecture.md`
3. Fix the source files **and** update the corresponding sections in `doc/ixd/phase8-document.md`
4. Re-run Step 1-4 as **Round N+1**

#### Hard Block (Three Strikes)

If **Round 3 still FAILS**:

1. Save `doc/ixd/phase8-review-round-3.md` with all remaining blocking items
2. Update `doc/ixd/progress.json`:
   ```json
   {
     "8": {
       "status": "blocked",
       "file": "phase8-document.md",
       "summary": "Review failed 3 rounds; blocking items: <<blocking items summary>>",
       "reviewRounds": 3,
       "blockingItems": ["<<item1>>", "<<item2>>"]
     }
   }
   ```
3. Output to user:
   > ⛔ **Review failed (3/3 rounds)**, workflow blocked. Remaining blocking items require manual intervention:
   > 1. <<blocking item 1>> — Suggest restarting from Phase <<N>>
   > 2. <<blocking item 2>> — Suggest restarting from Phase <<N>>
   >
   > After fixing, say "continue from phase N" to resume the workflow.
4. **TERMINATE** — do NOT proceed further or auto-fix. Wait for human instruction.

#### Review Report Template

```markdown
# Phase 8 Design Review Report — Round <<N>>

**Product**: <<product_name>>
**Date**: <<YYYY-MM-DD>>
**Result**: ✅ PASS / ❌ FAIL

---

## Part 1: Interaction Walkthrough

### Sampled Pages
<<List 3-5 representative pages reviewed>>

### Walkthrough Scores

| Dimension | Passed/Total | Score |
|-----------|--------------|-------|
| Basic Interactions | /5 | % |
| Page States | /4 | % |
| Navigation & Flows | /4 | % |
| Forms & Input | /4 | % |
| Data Loading | /4 | % |
| Content Display | /4 | % |
| Visual & Brand | /5 | % |
| Touch & Click | /3 | % |
| Desktop-Exclusive | /10 | % |
| Cross-platform Consistency | /4 | % |
| **Overall** | **/47** | **%** |

### Priority Fix Items (Blocking)
<<If none, write "None">>

### General Issues (Non-blocking)
<<If none, write "None">>

---

## Part 2: Multi-Perspective Review

### Per-Perspective Feedback
(Each of 6 perspectives: 2 praises + 2 improvements)

### Priority Improvement Table

| Priority | Improvement | Source Perspective | Impact | Source Phase |
|----------|-------------|-------------------|--------|--------------|
| P0 | <<improvement>> | <<perspective>> | <<impact>> | Phase <<N>> |
| P1 | <<improvement>> | <<perspective>> | <<impact>> | Phase <<N>> |
| P2 | <<improvement>> | <<perspective>> | <<impact>> | Phase <<N>> |

---

## Verdict

- Walkthrough priority fixes: <<N>> items
- Review P0 items: <<N>> items
- Review P1 items: <<N>> items
- **Conclusion**: ✅ PASS / ❌ FAIL (reason: <<summary>>)

<<If FAIL>>
### Fix Plan
| # | Blocking Item | Source File | Fix Action |
|---|---------------|-------------|------------|
| 1 | <<item>> | `doc/ixd/<<file>>` | <<specific fix>> |
```

---

## Auxiliary Tools

| Tool | Trigger (Natural Language) | Reference |
|------|---------------------------|-----------|
| Competitor Analysis | "analyze competitors" / "competitor analysis" / mentions a competitor name | `references/auxiliary-tools.md` |
| Design Heuristic Review | "walkthrough" / "review checklist" / "interaction walkthrough" | `references/auxiliary-tools.md` |
| A/B Comparison | "two options" / "compare approaches" / "compare solutions" | `references/auxiliary-tools.md` |
| Visual Style Exploration | "explore styles" / "style options" / "visual style" / "style direction" | `references/auxiliary-tools.md` |
| Multi-Perspective Review | "multi-perspective review" / "different viewpoints" / "multiple angles" | `references/auxiliary-tools.md` |
| Micro-Interaction Design | "micro-interaction" / "animation details" / "interaction polish" | `references/auxiliary-tools.md` |
| PC Client Interaction | "PC client design" / "desktop interaction" / "desktop UX" | `references/auxiliary-tools.md` |

---

## Language Policy

### Source Code Language
All skill source code (SKILL.md, reference files, templates, prompts) uses **English** for:
- Variable names, function names, file names
- Code comments and documentation
- Template placeholders (e.g., `<<product_name>>`, `<<page_id>>`)
- Section headers and structural elements

### Output Language Detection
Dialogue output and deliverables follow the **user's input language**:

| User Input Language | Output Language | Example |
|---------------------|-----------------|---------|
| Chinese (中文) | Chinese | 用户问"设计一个App" → 用中文对话和输出 |
| English | English | User asks "design an app" → respond and output in English |
| Mixed | Primary language | 主要是中文 → 用中文输出 |

**Detection Rules**:
1. Check the first user message that triggers the skill
2. Count Chinese characters vs English words
3. If Chinese characters > 50% → output in Chinese; else → output in English
4. If user switches language mid-conversation, adapt to the new primary language

**Deliverable Language**:
- All generated documents (`phase1-context.md`, `phase2-architecture.md`, etc.) use the detected language
- Mock data (names, addresses, content) uses the appropriate language/culture
- Technical terms may remain in English when commonly used (e.g., "Token", "API", "Component")

---

## Operational Notes

1. **Language Detection**: Detect user's language from input; output dialogue and deliverables in the same language.
2. **Output First**: Always save deliverables to `doc/ixd/`.
3. **Progressive disclosure**: Introduce one phase at a time.
4. **Batch processing**: Phase 4 can produce 50+ pages. Process 3-5 per turn.
5. **Mermaid diagrams**: Use Mermaid syntax for all diagrams.
6. **Real mock data**: Use realistic names/addresses matching the output language (Chinese: 张明, 李芳, 北京市朝阳区; English: John, Sarah, San Francisco, CA).
7. **Platform default**: Mobile-first. Explicitly ask if PC/desktop is in scope.
8. **PC client flag**: Once PC client is confirmed as a target platform, all phases automatically include PC-specific sections.
9. **Visual before prototype**: Always complete Phase 6 before Phase 7.
10. **22 page types**: Use the full 22-type taxonomy (including 4 desktop-specific types: Workspace, Side Panel, Preferences, Tray/Menu Bar) when cataloging pages.
11. **Platform-driven prototype**: Phase 7 output is determined by `progress.json.platform`: `"mobile"` (default) → one file; `"desktop"` → one file; `"both"` → two separate files. Never use responsive breakpoints in one file to simulate both platforms.
12. **Page completeness check**: Phase 4 and Phase 7 MUST verify against Phase 2 page inventory. Output a completeness report showing ✅ completed / ⚠️ missing for each page. Generate missing pages before marking the phase as complete.
