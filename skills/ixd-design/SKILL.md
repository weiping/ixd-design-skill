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
├── phase7-prototype.html       ← Phase 7 output (single-platform)
├── phase7-prototype-mobile.html  ← Phase 7 output (cross-platform: mobile)
├── phase7-prototype-desktop.html ← Phase 7 output (cross-platform: desktop)
├── phase8-document.md          ← Phase 8 output
├── phase8-review-round-1.md    ← Review report (round 1)
└── progress.json               ← Phase progress tracker
```

Create `doc/ixd/` if it doesn't exist. After each phase, save the deliverable AND update `doc/ixd/progress.json`.

**progress.json schema:**
```json
{
  "product": "产品名称",
  "platform": ["mobile", "web", "pc-client"],
  "crossPlatform": true,
  "phases": {
    "1": { "status": "done", "file": "phase1-context.md", "summary": "<<产品定位>>; 目标用户<<用户角色>>; 平台<<平台>>; 设计原则<<原则关键词>>; 视觉方向<<关键词>>" },
    "2": { "status": "done", "file": "phase2-architecture.md", "summary": "共<<N>>个页面(<<类型分布>>); 导航<<导航模式>>; 关键模块<<模块名>>" },
    "3": { "status": "done", "file": "phase3-userflows.md", "summary": "<<N>>条核心流程: <<流程1名>>/<<流程2名>>...; 关键决策点<<描述>>" },
    "4": { "status": "done", "file": "phase4-page-specs/", "summary": "已完成<<N>>/<<总数>>个页面交互说明; 最近批次: <<页面名列表>>" },
    "5": { "status": "pending", "file": null, "summary": null },
    "6": { "status": "pending", "file": null, "summary": null },
    "7": { "status": "pending", "file": null, "summary": null },
    "8": { "status": "pending", "file": null, "summary": null, "reviewRounds": 0, "reviewResult": null }
  },
  "lastUpdated": "2026-03-11T12:00:00Z"
}
```

**Summary field guidelines**: Each summary should be a **single line, ≤200 chars**, capturing the key decisions and numbers that downstream phases need. This enables lightweight context loading — later phases can read summaries instead of full files for indirect dependencies.


---

## Phase Map

| # | Phase | Key Deliverable | File | Reference |
|---|-------|----------------|------|-----------|
| 1 | Product Context 产品上下文 | Design brief, principles, challenges | `doc/ixd/phase1-context.md` | `references/phase1-context.md` |
| 2 | Information Architecture 信息架构 | Exhaustive sitemap, page inventory (22 types) | `doc/ixd/phase2-architecture.md` | `references/phase2-architecture.md` |
| 3 | User Flows 用户流程 | Mermaid flow diagrams, step tables | `doc/ixd/phase3-userflows.md` | `references/phase3-userflow.md` |
| 4 | Page Interaction Specs 页面交互说明 | Per-page 10-section interaction spec | `doc/ixd/phase4-page-specs/` | `references/phase4-page-interaction.md` |
| 5 | Component Library 组件规范 | Design tokens, component specs | `doc/ixd/phase5-components.md` | `references/phase5-components.md` |
| 6 | Visual Design 视觉设计 | 10-dimension visual system | `doc/ixd/phase6-visual.md` | `references/phase6-visual.md` |
| 7 | Interactive Prototype 可交互原型 | High-fidelity HTML prototype (dual for cross-platform) | `doc/ixd/phase7-prototype*.html` | `references/phase7-prototype.md` |
| 8 | Design Document 设计交付 | Complete specification document | `doc/ixd/phase8-document.md` | `references/phase8-delivery.md` |

---

## Quick-Start & Resume System

The skill supports two ways to enter or resume the workflow.

### Method 1: Natural Language Detection

| User says (CN) | User says (EN) | Start Phase |
|----------------|----------------|-------------|
| "从阶段N开始" / "从第N阶段开始" | "start from phase N" | Phase N |
| "继续上次的设计" / "接着做" | "continue where we left off" | Auto-detect |
| "帮我设计一个App/PC客户端" | "design an app/desktop app for me" | Phase 1 |
| "我有PRD了" / "需求文档已有" | "I have a PRD" | Phase 2 |
| "帮我画用户流程图" | "draw user flows" | Phase 3 |
| "帮我设计这个页面" | "design this page" | Phase 4 |
| "整理组件规范" | "create component specs" | Phase 5 |
| "做视觉方案" / "配色" / "字体" | "visual design" / "color scheme" | Phase 6 |
| "做个可点击原型" | "clickable prototype" | Phase 7 |
| "写设计文档" / "交付文档" | "design document" | Phase 8 |

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
> "根据 `doc/ixd/progress.json` / 你提供的内容，我判断以下阶段已完成：阶段一 ✅、阶段二 ✅。建议从 **阶段三（用户流程）** 开始。是否正确？"

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
- **Phase 5** reads P4 batch-by-batch to extract components, then synthesizes.
- **Phase 7** loads only the pages being prototyped in the current batch.
- **Phase 8** references P4 by section, does not need all pages in memory simultaneously.

**Step 3**: Read the current phase's reference file: `references/phase<N>-<name>.md`

**Step 4**: If resuming (not Phase 1), briefly recap key decisions before executing:
> "根据已有产出，产品为 <<产品名>>，目标平台 <<平台>>，共 <<N>> 个页面。现在进入阶段 <<N>>..."

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

**#### Phase 1 Step A: Socratic Discovery (苏格拉底式提问)

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
| D1 | 产品平台 | Determines page types, navigation, components, prototype strategy | P2-P8 all |
| D2 | 核心功能模块 | Drives page inventory and user flows | P2, P3, P4 |
| D3 | 目标用户与场景 | Drives flow design and interaction complexity | P3, P4 |
| D4 | 设计风格/视觉方向 | Drives visual system, component style | P5, P6, P7 |
| D5 | 技术框架 | Constrains component approach and prototype | P5, P7 |
| D6 | 设计规范基底 | Determines component library foundation | P5, P6 |
| D7 | 竞品/参考产品 | Calibrates design direction and scope | P1, P2, P6 |
| D8 | 产品定位与差异化 | Guides design principles and trade-offs | P1, all |

**Question Format Rules:**

- Each question is either **open-ended** (自由回答) or **multiple-choice** (选择题)
- Multiple-choice questions MUST include a **recommended option** marked with `⭐ 推荐`
- Multiple-choice can be single-select or multi-select (indicate which)
- Every question includes a brief reason explaining WHY this info matters
- One question per turn, show progress: `📋 问题 (2/5)`

**Question Templates by Dimension:**

```
D1 — 产品平台 [选择题, 可多选]
📋 问题 (1/N)
产品的目标平台是？（可多选，直接影响后续所有阶段的设计方向）
  A. 📱 iOS / Android App
  B. 🌐 Web 应用（浏览器）
  C. 🔮 微信小程序 / 支付宝小程序
  D. 🖥️ PC 桌面客户端 (Electron / Tauri / Flutter Desktop / 原生)  ⭐ 如果你提到了桌面端功能
  E. 📱+🖥️ 跨平台（移动端 + 桌面端）
  F. 其他: ___

D2 — 核心功能模块 [问答题]
📋 问题 (2/N)
产品的核心功能模块有哪些？（3-7 个即可，每个用一句话描述。这决定了信息架构和页面数量）
例如："① 内容发布 — 用户创建和编辑图文内容；② 社交互动 — 点赞、评论、关注；③ 消息中心 — 私信和系统通知"

D3 — 目标用户与场景 [问答题]
📋 问题 (3/N)
产品的主要用户是谁？他们在什么场景下使用？（2-3 个用户角色即可。这决定了用户流程设计和交互复杂度）
例如："① 内容创作者 — 日常通勤时用手机发布短内容；② 读者 — 睡前浏览推荐内容"

D4 — 设计风格 [选择题, 单选]
📋 问题 (4/N)
你期望的设计风格方向？（这决定了视觉系统和原型的整体调性）
  A. 🧊 简约克制 — 大量留白，信息密度低（如 Apple、Linear）⭐ 推荐：适合工具类和内容类产品
  B. 🎨 活泼多彩 — 丰富色彩，圆润元素（如 Notion、Figma）
  C. 🏢 专业严谨 — 高信息密度，数据导向（如 Bloomberg、飞书）
  D. 🌿 温暖人文 — 柔和配色，自然元素（如 Calm、小红书）
  E. 🔮 科技未来 — 深色基调，渐变光效（如 Vercel、Arc）
  F. 其他: ___

D5 — 技术框架 [选择题, 单选]
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

D6 — 设计规范基底 [选择题, 单选]
📋 问题 (6/N)
采用哪个设计规范作为基底？（影响组件库选型和交互范式）
  A. Ant Design  ⭐ 推荐：中后台/B端产品
  B. Material Design 3 (Google)
  C. Apple HIG (iOS/macOS)
  D. Fluent Design (Windows)
  E. 自建设计系统（从零开始）
  F. 尚未确定（由我根据产品类型推荐）
  G. 其他: ___

D7 — 竞品参考 [问答题]
📋 问题 (7/N)
有没有想参考的竞品或产品？（1-3 个，说明具体参考哪个维度：交互方式/视觉风格/信息架构/某个功能）
例如："参考 Notion 的 block 编辑交互 + Linear 的视觉极简风格"
如果没有也可以跳过，我会根据产品类型推荐。

D8 — 产品定位 [问答题]
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

1. After analyzing user input, announce: `"我需要了解 <<N>> 个关键信息，每次一个问题："` (if N=0: `"你提供的信息已经足够，直接进入设计！"`)
2. Ask question 1, wait for answer
3. Ask question 2, wait for answer
4. ... repeat until all questions answered
5. Summarize all gathered context in a brief recap
6. Proceed to Step B

If user says "跳过" / "不重要" / "你决定" for any question, use the recommended option (for choice questions) or make a reasonable assumption (for open-ended questions), and note the assumption in the deliverable.

#### Phase 1 Step B: Deliverable Generation

**Platform Detection**: When filling product info, explicitly ask/detect the target platform:
- Mobile (iOS/Android/跨平台)
- Web
- 小程序/Mini-program
- **PC 客户端** (Electron / Tauri / Flutter / WPF / macOS Native)
- Cross-platform (mobile + PC)

If platform includes **PC 客户端**, note this in the context doc — it triggers PC-specific sections in Phases 2, 4, 5, 6, and 7.

If product is **cross-platform** (mobile + PC), set `crossPlatform: true` in progress.json — this triggers dual prototype output in Phase 7.

Save to: `doc/ixd/phase1-context.md`
Read: `references/phase1-context.md`

---

### Phase 2: Information Architecture

**Goal**: Exhaustively map all pages using the **22-type** taxonomy.

**Page Type Taxonomy (22 types)**:

**核心内容类** (1-5): 聚合页(Hub), 列表页(List), 详情页(Detail), 搜索页(Search), 筛选/排序页(Filter)

**表单与输入类** (6-8): 表单页(Form), 多步表单(Wizard), 选择器页(Picker)

**反馈与结果类** (9-10): 结果页(Result), 空态页(Empty)

**账户与系统类** (11-14): 登录/注册页(Auth), 个人中心(Profile), 设置页(Settings), 关于/协议页(About)

**引导与过渡类** (15-17): 启动页/闪屏(Splash), 引导页(Onboarding), 过渡/加载页(Transition)

**覆盖层类** (18): 弹窗/浮层(Overlay)

**桌面端专属类** (19-22):
- 19\. 主窗口/工作区(Workspace) — 桌面端主界面，含多面板/分栏布局、工具栏
- 20\. 侧边面板(Side Panel) — 可折叠的侧栏，如导航面板、属性面板、文件树
- 21\. 偏好设置窗口(Preferences) — 独立窗口或模态设置面板（对标系统级设置）
- 22\. 托盘/菜单栏(Tray/Menu Bar) — 系统托盘弹出面板、菜单栏下拉菜单

**Navigation Structure**: Split by platform:
- **移动端导航**: 底部 Tab / 顶部导航
- **桌面端导航**: 侧边栏导航（可折叠）/ 顶部菜单栏 / 工具栏 / 混合导航（顶部+侧边）
- **跨平台导航**: 各平台的导航形式差异及一致性策略，导航项映射关系

**Desktop Lifecycle Check**: If platform includes PC client, add to page exhaustiveness check:
- 安装/卸载→首次启动→窗口管理→托盘行为→自动更新→快捷键→系统集成（文件关联/右键菜单/协议唤起）

Save to: `doc/ixd/phase2-architecture.md`
Read: `references/phase2-architecture.md`

---

### Phase 3: User Flows

**Goal**: Design task-oriented flow diagrams for 3-5 core scenarios + system flows.

If platform includes PC client, include desktop-specific flows:
- 冷启动流程: 下载→安装向导→首次启动→配置向导→主窗口
- 自动更新流程: 检测更新→提示用户→后台下载→安装→重启

Save to: `doc/ixd/phase3-userflows.md`
Read: `references/phase3-userflow.md`

---

### Phase 4: Page Interaction Specs

**Goal**: Developer-ready interaction specs. The core deliverable.

Each page now has **10 sections**:

| Section | Name | Description |
|---------|------|-------------|
| 1 | 页面概述 | Core function and position in product |
| 2 | 页面布局结构 | Layout areas (mobile single-column / desktop multi-panel), cross-platform products describe both |
| 3 | 组件清单 | All interactive components in table format |
| 4 | 交互行为详细说明 | Per-component: click, long-press, swipe, hover, right-click, keyboard, drag, input, disabled, feedback |
| 5 | 页面状态流转 | All states: default, loading, empty, error, no-permission, partial-load, edit mode (7 states) |
| 6 | 动效说明 | Transitions, element animations, gesture interactions |
| 7 | 数据加载策略 | First load, refresh, cache, pagination |
| 8 | 适配说明 | PC client adaptation (window min size, resizable, panel layout, title bar style), PC browser, tablet, small screen, landscape, dark mode, accessibility, multi-window (desktop) |
| 9 | 交互走查 | **Mandatory**: Before output, self-check against Appendix B walkthrough checklist. Output results as table. If any item fails, go back and fix sections 1-8 first. |
| 10 | 特定场景微交互说明 | Identify micro-interaction scenarios on this page (like, favorite, delete, toggle, drag-sort, etc.) and describe: trigger, visual change, animation params, haptic/sound feedback, state reversal, CSS pseudo-code. If none needed, mark "本页面无特定微交互场景". |

Process in batches of 3-5 pages. Save each batch as `doc/ixd/phase4-page-specs/batch-<N>.md`.
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
- 窗口最小尺寸: width × height
- 窗口默认尺寸: width × height
- 信息密度: 桌面端可采用紧凑模式（行高/间距缩小 20-30%）
- 标题栏样式: 原生标题栏 / 自绘标题栏 / 无标题栏（macOS 红绿灯区域预留）
- 菜单栏: 系统原生菜单栏（macOS）/ 应用内菜单栏 / 无菜单栏

Save to: `doc/ixd/phase5-components.md`
Read: `references/phase5-components.md`

---

### Phase 6: Visual Design

**Goal**: Complete visual language across 10 dimensions.

**Desktop Font Fallback** (Section 2 Typography):
- Windows 中文降级: Microsoft YaHei → SimHei → sans-serif
- macOS 中文降级: PingFang SC → Hiragino Sans GB → sans-serif
- 桌面端可内嵌自定义字体（无 Web 加载性能顾虑）
- 字号基准: 桌面端基准字号可比移动端小 1-2px

**Desktop Icon Sizes** (Section 3 Iconography):
- 侧边栏导航: 20px, click area 32×32px
- 工具栏按钮: 16-20px, click area 28×28px
- 系统托盘: 16-22px (Windows 16px / macOS 22px)
- 菜单项前缀: 16px

**Desktop Grid** (Section 7 Spacing & Grid):
- lg: 1024px–1279px (small window PC)
- xl: 1280px–1439px (standard PC, sidebar expanded)
- 2xl: ≥1440px (wide screen / external monitor, 3-column layout or 1200px max-width centered)
- 桌面端栏数: 12-16栏
- 桌面端最大内容宽度: 1200px/1440px/无限制（工具类应用）

**System Theme** (Section 9 Dark Mode):
- 桌面端跟随系统主题自动切换 / 应用内独立设置 / 两者兼支持
- 监听系统主题变化实时切换
- Windows 高对比度模式支持

Save to: `doc/ixd/phase6-visual.md`
Read: `references/phase6-visual.md`

---

### Phase 7: Interactive Prototype

**Goal**: Clickable high-fidelity prototype using Phase 6's visual system.

**Cross-Platform Dual Prototype Strategy**:

For **cross-platform products** (mobile + PC), output **TWO separate HTML files** sharing the same Design Token CSS variables:

| File | Viewport | Navigation | Interaction Focus |
|------|----------|------------|-------------------|
| `phase7-prototype-mobile.html` | 390×844px (iPhone centered) | Bottom Tab + Top nav bar | Touch gestures, pull-to-refresh, swipe actions |
| `phase7-prototype-desktop.html` | 1280×800px (desktop window) | Sidebar + Top toolbar/menu bar | Hover states, right-click menus, keyboard shortcuts, multi-panel drag, window title bar |

Both files share the same CSS variables (Design Token) but implement platform-native interaction paradigms independently. Do NOT use responsive breakpoints in a single file to simulate both — the information architecture, navigation hierarchy, and information density differences between mobile and desktop are too large for single-file simulation.

For **single-platform products**, output one file: `phase7-prototype.html`

**Generation Steps (Cross-Platform)**:
1. Generate shared Design Token CSS variables block
2. Generate mobile prototype (`phase7-prototype-mobile.html`)
3. Generate desktop prototype (`phase7-prototype-desktop.html`)
4. Fill pages in parallel (both platforms per page)
5. Independent QA per platform

**PC Client Layout** (desktop prototype):
- `max-width: 100%` (not mobile frame)
- Sidebar navigation (240px expanded / 56px collapsed)
- Toolbar at top
- Two or three column main layout
- Context menu on right-click
- Keyboard shortcut hints on buttons/menu items
- Window resize response at lg/xl/2xl breakpoints
- Simulated window title bar (close/minimize/maximize button styles)
- Tab focus navigation and Esc to close

Save to: `doc/ixd/phase7-prototype.html` (single-platform) or `doc/ixd/phase7-prototype-mobile.html` + `doc/ixd/phase7-prototype-desktop.html` (cross-platform)
Read: `references/phase7-prototype.md`

---

### Phase 8: Design Delivery Document

**Goal**: Package everything into a formal spec document.

**Document Structure (v2.1)**:

**Cover**: 产品名称, 文档类型, **目标平台**, 版本号/日期/作者/状态

**Chapter 1: 设计概述**
- 1.1 产品背景
- 1.2 设计目标
- 1.3 设计原则
- 1.4 设计范围与边界
- **1.5 目标平台与跨平台策略** — 覆盖平台清单, 各平台设计语言基底 (MD3/HIG/Fluent), 跨平台一致性策略 (哪些一致/哪些允许差异), 平台优先级
- 1.6 设计参考与竞品分析
- 1.7 术语定义

**Chapter 2: 信息架构**
- 2.1 产品结构图（Mermaid）
- 2.2 页面清单总表（穷举版，覆盖 **22 类**页面，含桌面端专属类型）
- 2.3 导航结构设计 — **移动端导航** (底部 Tab/顶部导航) + **桌面端导航** (侧边栏/菜单栏/工具栏) + 各平台导航映射关系
- 2.4 全局组件说明
- 2.5 页面穷举校验记录（含**桌面端生命周期**维度）

**Chapter 3: 用户流程**
- 3.1 核心流程总览
- 3.2 各流程详细说明（含流程图和步骤表）
- 3.3 异常流程处理规范
- **3.4 桌面端专属流程**（安装/自动更新/窗口管理/托盘行为，如适用）

**Chapter 4: 页面交互说明**
- 按模块分节，每页包含 10 sections: 概述/布局/组件/交互/状态/动效/数据策略/适配/**交互走查**/**微交互**
- 跨平台产品: 每个页面同时描述 **移动端布局**（单栏）和 **桌面端布局**（多面板分栏），标注两端差异点
- 桌面端交互: 悬停态 / 右键菜单 / 键盘快捷键 / 拖拽行为 / 焦点导航
- 多窗口页面（桌面端）: 标注是否独立窗口、窗口间通信方式

**Chapter 5: 组件规范**
- 5.1 设计 Token（共享）
- 5.2 基础组件规范（含各组件的桌面端状态: 悬停态/聚焦态/拖拽态）
- 5.3 业务组件规范
- **5.4 桌面端专属组件规范**（侧边栏/工具栏/菜单栏/状态栏/分割面板/命令面板/系统托盘面板）
- **5.5 响应式适配规范** — 断点体系(手机/平板/桌面小窗口/桌面标准/桌面宽屏) + **桌面端窗口规范**(最小尺寸/默认尺寸/标题栏样式) + 信息密度分级(移动端标准密度 vs 桌面端紧凑密度)

**Chapter 6: 视觉设计**
- 6.1 色彩系统（品牌色/功能色/中性色/渐变）
- 6.2 字体系统（字体选择/字号阶梯/排版规则/**桌面端字体降级方案**: Windows 雅黑链 + macOS 苹方链）
- 6.3 图标系统（风格/尺寸/图标库/**桌面端专属尺寸**: 侧边栏/工具栏/托盘/菜单项）
- 6.4 插图系统（风格/使用场景/素材清单）
- 6.5 阴影与层级
- 6.6 圆角系统
- 6.7 间距与栅格（含**桌面端**栏数/最大内容宽度/紧凑间距/**桌面端栅格**)
- 6.8 关键页面视觉标注（跨平台产品需分别标注移动端和桌面端版本）
- 6.9 深色模式方案（含**桌面端跟随系统主题策略**/Windows 高对比度支持）
- 6.10 动效视觉规范（含**桌面端窗口动画**/减少动效系统设置尊重）

**Chapter 7: 全局交互规范**
- 7.1 手势规范（移动端）
- **7.2 鼠标与键盘交互规范（桌面端）** — 全局快捷键映射表(功能→macOS快捷键→Windows快捷键), Tab焦点导航顺序规则, 右键菜单触发区域与菜单项规范, 拖拽交互规范(可拖拽元素/放置区域指示/拖拽预览)
- 7.3 转场动画规范（移动端 slide vs 桌面端 fade）
- 7.4 反馈机制（Toast/Alert/SnackBar/桌面端系统通知）
- 7.5 加载策略（骨架屏/下拉刷新/分页加载）
- 7.6 异常处理（网络错误/服务异常/权限不足）
- 7.7 权限管理交互
- 7.8 推送通知交互（移动端推送/桌面端系统通知）
- 7.9 深色模式适配规则（含跟随系统主题）
- **7.10 桌面端窗口管理规范**（最小化/最大化/全屏/分屏/托盘最小化/多窗口/窗口位置记忆）

**Appendices**:
- A. 原型演示链接 — **单平台**: 原型 HTML 链接; **跨平台**: 移动端原型(prototype-mobile.html) + 桌面端原型(prototype-desktop.html)
- B. 视觉样例板（Style Tile）
- C. 设计资源清单（图标库/插图/字体文件）
- D. 开发交接注意事项 — **跨平台共享逻辑与平台差异清单**, 各**平台特殊实现提醒**(Windows标题栏/macOS红绿灯/系统托盘/文件关联/协议唤起), **Design Token到各技术栈的映射**(CSS变量/Flutter ThemeData/Swift Asset Catalog/WPF ResourceDictionary)
- E. 页面穷举清单（完整版，含**桌面端专属页面**）
- **F. 快捷键映射总表**（桌面端，macOS + Windows 双列对照）

Save to: `doc/ixd/phase8-document.md`
Read: `references/phase8-delivery.md`

---

### Phase 8 — Final Review Gate (评审门禁)

**After the Phase 8 document is saved**, a mandatory two-part review must pass before the workflow is considered complete. This is NOT optional.

#### Review Procedure

**Step 1: 交互走查** — Run the full 47-item heuristic checklist (Tool 2 from `references/auxiliary-tools.md`) against 3-5 representative pages from the design document. Output the scoring table.

**Step 2: 多角色评审** — Run the 6-perspective review (Tool 4 from `references/auxiliary-tools.md`) against the complete design. Output the priority table.

**Step 3: Save review report** to `doc/ixd/phase8-review-round-<N>.md` (N = 1, 2, or 3).

**Step 4: Pass/Fail judgment**:

| Condition | Verdict |
|---|---|
| 走查：无优先修复项 AND 评审：无 P0/P1 改进项 | ✅ **PASS** — workflow complete |
| 走查：存在优先修复项 OR 评审：存在 P0 或 P1 改进项 | ❌ **FAIL** — enter fix cycle |

P2 (建议) items do NOT block — record them in the report for future iteration.

#### Fix Cycle (修复循环)

When review **FAILS**:

1. List all blocking items (走查优先修复项 + 评审 P0/P1 items)
2. Trace each item to its **source phase and file**:
   - 页面交互问题 → fix `doc/ixd/phase4-page-specs/<page>.md`
   - 组件规范问题 → fix `doc/ixd/phase5-components.md`
   - 视觉一致性问题 → fix `doc/ixd/phase6-visual.md`
   - 流程缺陷 → fix `doc/ixd/phase3-userflows.md`
   - 架构/导航问题 → fix `doc/ixd/phase2-architecture.md`
3. Fix the source files **and** update the corresponding sections in `doc/ixd/phase8-document.md`
4. Re-run Step 1-4 as **Round N+1**

#### Hard Block (三振出局)

If **Round 3 still FAILS**:

1. Save `doc/ixd/phase8-review-round-3.md` with all remaining blocking items
2. Update `doc/ixd/progress.json`:
   ```json
   {
     "8": {
       "status": "blocked",
       "file": "phase8-document.md",
       "summary": "评审3轮未通过; 阻塞项: <<blocking items summary>>",
       "reviewRounds": 3,
       "blockingItems": ["<<item1>>", "<<item2>>"]
     }
   }
   ```
3. Output to user:
   > ⛔ **评审未通过（3/3 轮）**，已阻塞。剩余阻塞项需人工介入：
   > 1. <<阻塞项1>> — 建议从阶段 <<N>> 重做
   > 2. <<阻塞项2>> — 建议从阶段 <<N>> 重做
   >
   > 修正后请说「从阶段N继续」以恢复工作流。
4. **TERMINATE** — do NOT proceed further or auto-fix. Wait for human instruction.

#### Review Report Template

```markdown
# Phase 8 设计评审报告 — Round <<N>>

**产品**: <<产品名称>>
**日期**: <<YYYY-MM-DD>>
**评审结果**: ✅ 通过 / ❌ 未通过

---

## Part 1: 交互走查

### 抽样页面
<<列出被走查的 3-5 个代表性页面>>

### 走查评分

| 维度 | 通过/总数 | 得分 |
|------|----------|------|
| 基础交互 | /5 | % |
| 页面状态 | /4 | % |
| 导航与流程 | /4 | % |
| 表单与输入 | /4 | % |
| 数据加载 | /4 | % |
| 内容展示 | /4 | % |
| 视觉与品牌 | /5 | % |
| 触摸与点击 | /3 | % |
| 桌面端专属 | /10 | % |
| 跨平台一致性 | /4 | % |
| **综合** | **/47** | **%** |

### 优先修复项（阻塞）
<<若无则写「无」>>

### 一般问题（不阻塞）
<<若无则写「无」>>

---

## Part 2: 多角色评审

### 各视角意见
（6 个视角各 2 赞同 + 2 改进）

### 综合改进优先级

| 优先级 | 改进项 | 来源视角 | 影响范围 | 溯源阶段 |
|--------|--------|---------|---------|---------|
| P0 | <<改进项>> | <<视角>> | <<影响>> | Phase <<N>> |
| P1 | <<改进项>> | <<视角>> | <<影响>> | Phase <<N>> |
| P2 | <<改进项>> | <<视角>> | <<影响>> | Phase <<N>> |

---

## 判定

- 走查优先修复项: <<N>> 项
- 评审 P0 项: <<N>> 项
- 评审 P1 项: <<N>> 项
- **结论**: ✅ PASS / ❌ FAIL（原因: <<概述>>）

<<若 FAIL>>
### 修复计划
| # | 阻塞项 | 溯源文件 | 修复动作 |
|---|--------|---------|---------|
| 1 | <<项>> | `doc/ixd/<<file>>` | <<具体修复>> |
```


---

## Auxiliary Tools

| Tool | Trigger (Natural Language) | Reference |
|------|---------------------------|-----------|
| Competitor Analysis | "分析竞品" / "competitor analysis" / mentions a competitor name | `references/auxiliary-tools.md` |
| Design Heuristic Review | "走查" / "review checklist" / "交互走查" | `references/auxiliary-tools.md` |
| A/B Comparison | "两个方案" / "compare approaches" / "对比方案" | `references/auxiliary-tools.md` |
| Visual Style Exploration | "探索风格" / "style options" / "视觉风格" / "风格方向" | `references/auxiliary-tools.md` |
| Multi-Perspective Review | "多角色评审" / "different viewpoints" / "多视角审视" | `references/auxiliary-tools.md` |
| Micro-Interaction Design | "微交互" / "micro-interaction" / "动效细节" | `references/auxiliary-tools.md` |
| PC Client Interaction | "PC客户端设计" / "desktop interaction" / "桌面端交互" | `references/auxiliary-tools.md` |

---

## Operational Notes

1. **Language**: Default to Chinese for Chinese-speaking users. All deliverables and mock data use Chinese.
2. **Output First**: Always save deliverables to `doc/ixd/`.
3. **Progressive disclosure**: Introduce one phase at a time.
4. **Batch processing**: Phase 4 can produce 50+ pages. Process 3-5 per turn.
5. **Mermaid diagrams**: Use Mermaid syntax for all diagrams.
6. **Real mock data**: Use realistic Chinese names (张明, 李芳), addresses (北京市朝阳区).
7. **Platform default**: Mobile-first. Explicitly ask if PC/desktop is in scope.
8. **PC client flag**: Once PC client is confirmed as a target platform, all phases automatically include PC-specific sections.
9. **Visual before prototype**: Always complete Phase 6 before Phase 7.
10. **22 page types**: Use the full 22-type taxonomy (including 4 desktop-specific types: Workspace, Side Panel, Preferences, Tray/Menu Bar) when cataloging pages.
11. **Cross-platform dual prototype**: For products targeting both mobile and desktop, Phase 7 outputs TWO separate HTML files (`prototype-mobile.html` + `prototype-desktop.html`) sharing the same Design Token CSS variables. Single-platform products output one file. Never use responsive breakpoints in one file to simulate both platforms.
