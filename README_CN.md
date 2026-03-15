# 🎨 IxD Design Skill — 交互设计技能

[English](README.md)

兼容 [AgentSkills](https://agentskills.io) 标准的 AI 技能，引导 AI 助手完成结构化的 8 阶段交互设计工作流 — 从产品上下文到开发交付。

**无需外部工具。** 纯指令技能，适用于任何支持 Markdown 指令的 LLM。

---

## ✨ 功能特性

- **8 阶段结构化工作流** — 上下文 → 架构 → 流程 → 页面说明 → 组件 → 视觉 → 原型 → 交付
- **苏格拉底式探索** — 自适应 0–8 个问题的前置访谈，分析用户输入并只问缺失的部分
- **双语输出** — 源代码统一英文；对话和交付物跟随用户输入语言（中文输入 → 中文输出，英文输入 → 英文输出）
- **22 种页面分类** — 详尽的页面类型体系，含 4 种桌面端专属类型
- **每页 10 节规格说明** — 面向开发者的交互规格，含强制走查环节
- **跨平台双原型** — 独立的移动端 (390×844) + 桌面端 (1280×800) HTML 原型，共享设计令牌
- **PC 桌面客户端支持** — 悬停状态、右键菜单、键盘快捷键、拖拽、窗口管理
- **Slot 模式设备框架** — `PhoneFrame` 接受 `tabBar` slot；`WindowFrame` 接受 `sidebar` slot — 传入自定义组件，而非数据数组
- **TDD 优先原型开发** — 预装 Vitest + Testing Library；PhoneFrame/WindowFrame 内置 `data-testid`，支持走查前自动化冒烟测试
- **Word 风格桌面布局** — `flex flex-col h-full` 模式，在 WindowFrame 内实现固定菜单栏 + 工具栏 + 可滚动内容区
- **47 项启发式走查** — 覆盖 10 个类别的自动化交互质量检查
- **统一批次评审报告** — 所有批次评审追加写入 `phase7-review-master.md`（单文件增量追加，不生成独立批次文件）
- **6 个辅助工具** — 竞品分析、启发式评审、A/B 对比、视觉风格探索、多角色评审、微交互设计
- **最终评审关卡** — 强制走查 + 多角色评审修复循环（最多 3 轮）后方可交付
- **智能阶段恢复** — 基于依赖关系的上下文加载，而非"加载所有内容"

## 📋 工作流概览

```
P1          P2           P3          P4             P5         P6        P7         P8
产品上下文 → 信息架构   → 用户流程 → 页面交互说明 → 组件规范 → 视觉设计 → 原型     → 交付+评审
(Context)   (Architecture) (Flows)   (Page Specs)  (Components)(Visual) (Prototype) (Delivery)
```

| 阶段 | 关键产出 | 文件 |
|------|---------|------|
| P1 — 产品上下文 (Product Context) | 设计简报、设计原则、视觉方向 | `phase1-context.md` |
| P2 — 信息架构 (Information Architecture) | 22 种页面清单、站点地图、导航结构 | `phase2-architecture.md` |
| P3 — 用户流程 (User Flows) | Mermaid 流程图、边界情况 | `phase3-userflows.md` |
| P4 — 页面交互说明 (Page Interaction Specs) | 每页 10 节交互规格 | `phase4-page-specs/` |
| P5 — 组件规范 (Component Specs) | 设计令牌、组件库 | `phase5-components.md` |
| P6 — 视觉设计 (Visual Design) | 10 维度视觉系统 | `phase6-visual.md` |
| P7 — 可交互原型 (Interactive Prototype) | 高保真 HTML 原型 | `phase7-prototype*.html` |
| P8 — 设计交付 (Design Delivery) | 完整规格文档 + 评审报告 | `phase8-document.md` |

所有产出保存在项目目录的 `doc/ixd/` 下。

## 🚀 快速开始

### 安装

<details>
<summary><strong>Claude Code</strong></summary>

**方案 A — 插件市场（推荐）**

```bash
# 添加市场仓库
/plugin marketplace add weiping/ixd-design-skill

# 安装技能
/plugin install ixd-design
```

**方案 B — 手动安装为本地技能**

```bash
cp -r skills/ixd-design ~/.claude/skills/ixd-design
```

**方案 C — 手动安装为本地插件**

克隆仓库后从本地路径安装：

```bash
git clone https://github.com/weiping/ixd-design-skill.git
/plugin install /path/to/ixd-design-skill
```

Claude Code 会读取 `.claude-plugin/plugin.json` 并自动加载 `skills/`。
</details>

<details>
<summary><strong>Claude Projects / 其他 LLM</strong></summary>

1. 将 `SKILL.md` 内容复制到系统提示词或自定义指令中
2. 将 `references/` 文件上传为项目知识库
</details>

<details>
<summary><strong>Pi</strong></summary>

```bash
# 全局安装 — 所有项目可用
cp -r skills/ixd-design ~/.pi/skills/ixd-design

# 或项目级安装
cp -r skills/ixd-design <project>/.pi/skills/ixd-design
```

Pi 会自动发现 `SKILL.md`，无需额外配置。
</details>

<details>
<summary><strong>OpenClaw</strong></summary>

```bash
# 从 ClawHub 安装（如已发布）
clawhub install ixd-design

# 手动安装：所有 agent 共享
cp -r skills/ixd-design ~/.openclaw/skills/ixd-design

# 手动安装：单 agent（workspace 级，最高优先级）
cp -r skills/ixd-design <workspace>/skills/ixd-design
```

技能优先级：workspace > `~/.openclaw/skills` > 内置。
刷新技能或新开会话即可生效。

也可以通过 `~/.openclaw/openclaw.json` 中的 `skills.load.extraDirs` 添加共享目录，适用于多 agent 场景。
</details>

### 使用方法

自然语言交流即可，技能会自动识别你的意图：

```
"帮我设计一个记账 App"          → 从阶段 1 开始
"我有PRD了，直接开始信息架构"    → 从阶段 2 开始
"从阶段4开始"                   → 从阶段 4 开始
"继续上次的设计"                → 从 progress.json 自动检测

# 英文触发同样有效：
# "Design a budgeting app for me"                → starts from Phase 1
# "I already have a PRD, start from architecture" → starts from Phase 2
# "Start from phase 4"                            → starts from Phase 4
# "Continue the previous design"                  → auto-detects from progress.json
```

## 🧠 核心设计决策

### 语言策略

技能采用双语策略：

| 组件 | 语言 |
|------|------|
| 源代码（SKILL.md、references/） | 英文 |
| 变量名、占位符 | 英文 |
| 对话输出 | 跟随用户输入语言 |
| 生成交付物 | 跟随用户输入语言 |
| Mock 数据示例 | 同时提供中英文版本 |

**工作原理**：
- 用户中文输入 → 所有对话和交付物均为中文
- 用户英文输入 → 所有对话和交付物均为英文
- 语言从首条消息自动检测，并存储在 `progress.json` 中

### 苏格拉底式探索（阶段 1）

技能不会盲目问一堆清单问题。它会分析用户输入，对照 8 个信息维度，跳过已知信息，只生成真正需要的问题 — 0 到 8 个不等。

```
用户: "帮我设计一个类似 Notion 的协作笔记工具，React 技术栈"
                    ↓
     D1 平台: 缺失  → 提问
     D2 功能: 部分已知  → 简短追问
     D3 用户: 缺失     → 提问
     D4 风格: 从"类似 Notion"推断 → 跳过
     D5 技术: 已确定 (React) → 跳过
     D6 设计系统: 缺失 → 提问
     D7 参考: 已确定 (Notion) → 跳过
     D8 定位: 部分已知 → 简短追问
                    ↓
          结果: 4 个问题（而非 8 个）
```

### 阶段恢复上下文

每个阶段只加载直接依赖的前序产出 — 而非全部：

| 阶段 | 必须完整加载 | 仅加载摘要 | 跳过 |
|------|------------|----------|------|
| P4 | P2, P3 | P1 | — |
| P5 | P4（当前批次） | P1, P2 | P3 |
| P6 | P1, P5 | P2 | P3, P4 |
| P7 | P5, P6, P4（正在原型化的页面） | P1, P2 | P3 |

这样可以节省 token 并保持上下文聚焦。

### 最终评审关卡（阶段 8）

交付文档生成后，强制执行评审循环：

```
生成文档 → 走查（47 项）+ 多角色评审（6 个角色）
                            ↓
                     通过? ──→ ✅ 完成
                       ↓ 否
                  修复源文件 → 重新评审（第 2 轮）
                       ↓ 仍未通过
                  再次修复 → 重新评审（第 3 轮）
                       ↓ 仍未通过
                  ⛔ 阻断 — 需人工介入
```

## 📁 文件结构

```
ixd-design-skill/
├── .claude-plugin/
│   └── plugin.json                 ← Claude Code 插件元数据
├── README.md                       ← 英文版说明
├── README_CN.md                    ← 本文件（中文版）
├── LICENSE                         ← MIT
├── demo-prototype.html             ← 已构建的演示原型（在浏览器中打开）
└── skills/
    └── ixd-design/                 ← AgentSkills 兼容的技能目录
        ├── SKILL.md                ← 主入口文件（740+ 行）
        ├── INSTALL.md              ← 安装指南
        ├── references/
        │   ├── phase1-context.md       ← 产品上下文收集
        │   ├── phase2-architecture.md  ← 22 种页面分类体系
        │   ├── phase3-userflow.md      ← 流程图模式
        │   ├── phase4-page-interaction.md ← 10 节页面规格格式
        │   ├── phase5-components.md    ← 设计令牌 + 组件规格
        │   ├── phase6-visual.md        ← 10 维度视觉系统
        │   ├── phase7-prototype.md     ← HTML 原型模式（移动端 + 桌面端）
        │   ├── phase8-delivery.md      ← 交付文档结构
        │   ├── auxiliary-tools.md      ← 6 个辅助设计工具
        │   └── quickref.md            ← 快速参考卡片
        └── scripts/
            ├── init-artifact.sh        ← 项目脚手架（React + Vite + Tailwind + shadcn/ui + Vitest）
            ├── bundle-artifact.sh      ← 将 React 应用打包为单文件 HTML
            ├── shadcn-components.tar.gz ← 预构建的 shadcn/ui 组件包
            └── templates/              ← 布局组件模板（单一可信源）
                ├── PrototypeShell.tsx  ← 外壳：项目名 + 主题切换 + 页面导航
                ├── PhoneFrame.tsx      ← 移动端框架：iPhone 14，tabBar slot，data-testid
                ├── WindowFrame.tsx     ← 桌面端框架：macOS 窗口，sidebar slot，data-testid
                ├── ThemeContext.tsx    ← 主题 Provider，支持浅色/深色模式
                └── layout-index.ts    ← 统一导出所有布局组件
```

### 演示原型

本仓库包含已构建的演示原型 `demo-prototype.html`。在浏览器中打开即可体验完整的跨平台任务管理应用：

- **移动端**：首页、项目、日历、消息、个人资料页面，底部 Tab 导航
- **桌面端**：仪表盘、项目、日历、消息、团队、分析、设置页面，侧边栏导航
- **浅色/深色主题切换**
- **20+ 交互任务**：包含完成勾选、筛选、优先级标签
- **完整 UI 组件**：下拉选择、进度条、对话框、下拉菜单、工具提示等

如需修改演示内容，编辑 `demo-prototype/src/App.tsx` 或创建新原型：

```bash
# 创建新原型项目
bash skills/ixd-design/scripts/init-artifact.sh my-prototype
cd my-prototype
pnpm dev
```

### 产出结构（按项目生成）

```
doc/ixd/
├── progress.json               ← 阶段追踪器（含各阶段摘要）
├── phase1-context.md
├── phase2-architecture.md
├── phase3-userflows.md
├── phase4-page-specs/
│   ├── batch-1.md
│   └── ...
├── phase5-components.md
├── phase6-visual.md
├── phase7-prototype.html           ← 仅移动端原型
├── phase7-prototype-mobile.html    ← 跨平台：移动端
├── phase7-prototype-desktop.html   ← 跨平台：桌面端
├── phase7-review-master.md         ← 统一评审报告（所有批次 + 完整性检查）
├── phase8-document.md
└── phase8-review-round-1.md        ← 最终交付评审报告
```

## 🔧 辅助工具

这些工具可在任意阶段通过自然语言调用：

| 工具 | 触发方式 |
|------|---------|
| 竞品分析 (Competitor Analysis) | "分析竞品" / "competitor analysis" |
| 设计启发式评审 (Design Heuristic Review) | "交互走查" / "review checklist" |
| A/B 对比 (A/B Comparison) | "对比方案" / "compare approaches" |
| 视觉风格探索 (Visual Style Exploration) | "探索风格" / "style options" |
| 多角色评审 (Multi-Perspective Review) | "多角色评审" / "different viewpoints" |
| 微交互设计 (Micro-Interaction Design) | "微交互" / "micro-interaction" |

## 📊 关键数据

| 指标 | 数值 |
|------|------|
| 页面类型 | 22（含 4 种桌面端专属类型） |
| 每页规格节数 | 10 |
| 视觉设计维度 | 10 |
| 走查清单项数 | 47 |
| 评审角色 | 6 个 |
| 最大评审轮数 | 3（之后硬性阻断） |
| 触控目标（移动端） | ≥ 44×44pt |
| 点击目标（桌面端） | ≥ 32×32px |
| 核心任务触达 | ≤ 3 次点击 |

## 🌐 平台兼容性

| 平台 | 状态 | 安装方式 |
|------|------|---------|
| [Pi](https://github.com/mariozechner/pi-coding-agent) | ✅ 原生支持 | `~/.pi/skills/` 或项目级 |
| [OpenClaw](https://openclaw.ai) | ✅ 兼容 | `clawhub install` 或 `~/.openclaw/skills/` |
| [Claude Code](https://code.claude.com) | ✅ 插件 | `/plugin install` 市场或 `~/.claude/skills/` |
| Claude Projects | ✅ 兼容 | 自定义指令 + 知识文件 |
| GPT-4+ / Gemini Pro+ | ✅ 兼容 | 系统提示词 |

遵循 [AgentSkills](https://agentskills.io) 开放标准（CSO v1）。

## 📄 许可证

[MIT](LICENSE) © 2026 Weiping Liu
