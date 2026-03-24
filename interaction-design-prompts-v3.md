# AI 交互设计全流程提示词体系

> 适用于 Claude / GPT 等大模型，产出对标墨刀、Figma 等工具的完整交互+视觉设计成果物
> 作者：Weiping | 版本：v3.0

---

## 版本记录

| 版本 | 日期 | 变更内容 |
|------|------|---------|
| v1.0 | 2026-03 | 初版，7 阶段交互设计体系 |
| v2.0 | 2026-03 | 新增阶段六「视觉设计」；页面类型体系从 7 类扩展到 18 类；新增完整页面穷举清单模板（附录 E）；更新一次性 Prompt 和对照表；阶段总数调整为 8 |
| v2.1 | 2026-03 | 新增 PC 客户端平台支持（Windows/macOS 原生应用、Flutter/Electron 跨平台桌面端）；补充全流程桌面端交互范式（鼠标悬停、键盘快捷键、窗口管理、信息密度等）；新增「窗口/面板」页面类型；适配规范覆盖桌面布局；附录 E 补充桌面端专属页面清单 |
| v2.2 | 2026-03 | 阶段七重构：统一为平台参数驱动模式，默认输出移动端原型，桌面端需显式指定，双端原型作为独立选项；移除「单平台」与「跨平台」区分，简化提示词结构 |
| v2.3 | 2026-03 | 阶段七重构：集成 React 18 + TypeScript + Tailwind CSS + shadcn/ui 技术栈，输出可在浏览器直接打开的单文件 HTML；新增技术栈表格、开发流程、shadcn/ui 组件推荐、代码示例、AI 设计风格指南 |
| v2.4 | 2026-03 | 阶段七更新：新增「原型展示入口页面」章节，包含 iPhone 框架模拟器（状态栏、Home Indicator）、桌面端窗口框架（标题栏、窗口控制按钮）、项目名称展示、浅色/深色模式切换、页面导航器、PrototypeShell 组件示例 |
| v2.5 | 2026-03 | 阶段七重构：外壳组件(PrototypeShell)精简为仅包含项目名+主题切换+展示区域，设备模拟(手机/桌面框)移至页面组件内部；新增PhoneFrame和WindowFrame组件；外壳不随滚动移动；鼠标滚动模拟滑动；严格遵循阶段四交互、阶段五控件、阶段六视觉要求 |
| v2.6 | 2026-03 | 阶段七新增TDD开发方法：测试先行编写交互测试、批次交互走查(工具二47项检查表)、阶段二页面清单完整性检查，输出合并的评审报告 |
| v2.7 | 2026-03 | 阶段八文档第四章改为页面索引目录（含规格文件引用），不再内嵌完整交互内容；最终评审关卡改为用各阶段质量清单审查文档对应章节（非审查各阶段源文件）；附录A用阶段七清单审查；全文用阶段八清单审查 |
| v2.8 | 2026-03 | 阶段七重构：PhoneFrame/WindowFrame 采用 Slot 模式（tabBar/sidebar prop），移除旧 tabs[]/showTabBar/activeTab API；新增 data-testid 支持 TDD 测试；集成 Vitest + Testing Library 测试框架；动态岛添加 pointer-events-none；批次评审统一写入 phase7-review-master.md（增量追加），移除独立 batch-N 文件；新增 AppTabBar/AppSidebar 组件模式和移动端/桌面端职责划分表；补充 Word 风格桌面菜单栏/工具栏实现方案 |
| v2.9 | 2026-03 | 阶段四改为按页面输出：每页单独保存为 `phase4-page-specs/page-<ID>.md`（如 `page-P01.md`），替代原有按批次合并的 `batch-N.md`；阶段五/七/八中对阶段四文件的引用同步更新为按页面 ID 加载 |
| v3.0 | 2026-03 | 新增苏格拉底式发现框架（阶段一前置 8 维度提问算法，0-8 个自适应问题，附中英双语模板）；新增快速启动与恢复系统（自动检测已完成阶段、阶段四/七页面级恢复逻辑）；新增阶段职责边界表和 Token 前向引用规则；新增 progress.json Schema（含 platform 字段、pagesCompleted/pagesTotal 追踪字段）；新增上下文加载依赖表；新增 14 条操作纪律；新增阶段八最终质量关卡（强制验证流程 + 修复循环 + 三轮硬阻断）；补充语言检测与 Mock 数据策略 |

---

## 使用说明

本提示词体系分为 **8 个阶段**，对应从需求到交付的完整设计流程。每个阶段包含：

- **阶段说明**：该阶段的目标和产出物
- **提示词模板**：可直接使用的 Prompt（`<<变量>>` 为需替换内容）
- **产出格式说明**：期望 AI 输出的格式和结构
- **质量检查清单**：用于验收 AI 产出

### 全流程一览

```
阶段一 → 阶段二 → 阶段三 → 阶段四 → 阶段五 → 阶段六 → 阶段七 → 阶段八
产品上下文  信息架构  用户流程  页面交互说明  组件规范   视觉设计   可交互原型  设计交付
                                                    ▲ NEW: web-artifacts-builder skill
```

建议按阶段顺序使用，每阶段确认后再进入下一阶段。也可以将多个阶段合并为一个 Prompt 一次性执行。

---

## 全局运作机制

本节说明 AI 执行本提示词体系时的核心运作规则，了解这些规则有助于更好地协作。

### 快速启动与恢复

AI 支持两种方式进入或恢复工作流程：

**自然语言触发**

| 用户输入 | AI 起点 |
|---------|--------|
| "帮我设计一个 App/PC 客户端" | 阶段一 |
| "我已有 PRD 了" | 阶段二 |
| "帮我画用户流程图" | 阶段三 |
| "帮我设计这个页面" | 阶段四 |
| "整理组件规范" | 阶段五 |
| "做视觉方案/配色方案" | 阶段六 |
| "做个可点击原型" | 阶段七 |
| "写设计文档" | 阶段八 |
| "继续上次的设计" / "continue where we left off" | 自动检测 |
| "从阶段 N 开始" | 阶段 N |

**自动检测恢复**

当用户提供已有工作成果或 `docs/ixd/` 下存在文件时，AI 自动检测已完成阶段：
- 优先读取 `docs/ixd/progress.json`（若存在则以此为准）
- 否则根据内容信号推断（如用户粘贴了页面清单 → 阶段二完成）
- 检测后向用户确认，经同意后继续

> "根据 `docs/ixd/progress.json` / 您提供的内容，我识别出以下阶段已完成：阶段一 ✅、阶段二 ✅。建议从**阶段三（用户流程）**继续。这样对吗？"

**阶段四 / 阶段七 的页面级恢复**

这两个阶段按页面逐批推进。中断后恢复时：
1. AI 读取 `progress.json` 中的 `pagesCompleted` 数组，确认已完成页面
2. 计算剩余页面，从首个未完成页面继续
3. 所有批次完成后，强制执行**完整性检查**（对照阶段二页面清单，补齐遗漏页面，才能标记阶段完成）

---

### progress.json Schema

每完成一个阶段，AI 在 `docs/ixd/` 下创建或更新 `progress.json`，用于追踪进度和跨阶段传递摘要信息：

```json
{
  "product": "<<产品名>>",
  "platform": "mobile",
  "language": "zh",
  "phases": {
    "1": { "status": "done", "file": "phase1-context.md", "summary": "<<精简摘要，≤200字>>" },
    "2": { "status": "done", "file": "phase2-architecture.md", "summary": "<<摘要>>" },
    "3": { "status": "done", "file": "phase3-userflows.md", "summary": "<<摘要>>" },
    "4": {
      "status": "done",
      "file": "phase4-page-specs/",
      "summary": "完成 N/total 页",
      "pagesCompleted": ["P01", "P02", "P03"],
      "pagesTotal": 20
    },
    "5": { "status": "pending", "file": null, "summary": null },
    "6": { "status": "pending", "file": null, "summary": null },
    "7": {
      "status": "pending", "file": null, "summary": null,
      "pagesCompleted": [], "pagesTotal": 0
    },
    "8": { "status": "pending", "file": null, "summary": null, "reviewRounds": 0, "reviewResult": null }
  },
  "lastUpdated": "<<ISO 时间戳>>"
}
```

**`platform` 字段决定阶段七原型输出**：

| `platform` 值 | 输出文件 |
|--------------|---------|
| `"mobile"`（默认） | `docs/ixd/phase7-prototype.html` |
| `"desktop"` | `docs/ixd/phase7-prototype-desktop.html` |
| `"both"` | `docs/ixd/phase7-prototype-mobile.html` + `phase7-prototype-desktop.html` |

阶段一执行时根据平台信息自动写入 `platform` 字段，后续阶段不需要重复指定。

---

### 阶段职责边界（强制）

每个阶段有严格的产出范围，AI 不得在当前阶段提前产出后续阶段的内容：

| 阶段 | 可以产出 | 绝对不得产出 |
|------|---------|------------|
| **P1** 产品上下文 | 产品定位、用户角色、核心模块、设计原则、视觉方向关键词 | 页面清单、用户流程、交互规格、具体色值/字号 |
| **P2** 信息架构 | 页面清单、站点地图、导航结构、页面类型 | 用户流程图、交互规格、组件规范、视觉决策 |
| **P3** 用户流程 | 任务流程图、步骤表、决策节点、异常路径 | 交互规格、组件规范、视觉决策 |
| **P4** 页面交互说明 | 布局结构、组件清单、交互行为、页面状态、动效概念（Token 变量名）、适配规则 | 具体色值（hex）、具体字号/间距（px）、组件 Props/API 定义 |

**Token 前向引用规则**：P1-P4 阶段引用视觉属性时，只能使用**命名 Token**，不得写具体值：

```
✅ 正确（P4 动效）：transition: var(--motion-duration-page) var(--motion-easing-standard)
❌ 错误（P4 动效）：transition: 300ms cubic-bezier(0.4, 0, 0.2, 1)

✅ 正确（P4 布局）：background: var(--color-surface); border-radius: var(--radius-card)
❌ 错误（P4 布局）：background: #FFFFFF; border-radius: 12px
```

Token 名称在**阶段五**结构化定义，具体值（hex、px、ms）在**阶段六**填入。

任何阶段如需提前建议后续阶段的方向，只能在产出末尾加标注区块（非正式产出，不构成设计决策）：

```markdown
> **[仅供参考 — 阶段 N 的输入建议]**
> - <<对后续阶段的建议>>
> 以上为非约束性建议，将在阶段 N 重新评估。
```

---

### 上下文加载依赖表

各阶段执行前，AI 按以下规则加载已有产出，避免重复加载浪费上下文：

| 当前阶段 | 必须完整加载 | 仅读摘要（progress.json） | 跳过 |
|---------|------------|------------------------|------|
| P1 | — | — | — |
| P2 | P1 | — | — |
| P3 | P1, P2 | — | — |
| P4 | P2, P3 | P1 | — |
| P5 | P4（当前批次页面，逐页加载） | P1, P2 | P3 |
| P6 | P1, P5 | P2 | P3, P4 |
| P7 | P5, P6, P4（当前批次页面） | P1, P2 | P3 |
| P8 | P1, P2, P3, P5, P6, P4（按章节） | — | — |

阶段四产出为逐页文件（`phase4-page-specs/`），**不要一次性全部加载**，按当前处理批次逐页读取。

---

### 操作纪律

1. **语言跟随**：检测用户输入主要语言，产出文档全程使用同一语言；Mock 数据跟随语言文化（中文：张明/李芳/北京市朝阳区；英文：John/Sarah/San Francisco, CA）
2. **平台优先级**：默认移动端；用户提及"PC 客户端/Electron/Tauri/桌面端"时自动设为 `desktop` 或 `both`
3. **分批处理**：阶段四 3-5 页/批；阶段七 3-5 页/批（双端时 2-3 页×2 平台）
4. **单位标准**：所有数值（间距/字号/圆角/图标/动效时长/断点/窗口尺寸等）统一使用 `px`，不使用 rem/em/pt/sp/dp/vw/vh
5. **先视觉后原型**：必须完成阶段六再执行阶段七
6. **22 类页面**：阶段二必须覆盖完整 22 类（含桌面端专属：工作区/侧边面板/偏好设置/托盘菜单栏）
7. **平台驱动原型**：阶段七输出由 `progress.json.platform` 决定；`"both"` 时输出两个独立文件，不使用响应式断点混排
8. **完整性检查强制**：阶段四和七完成所有批次后必须对照阶段二清单核查、补齐遗漏页面
9. **阶段边界纪律**：每个阶段只产出其定义范围内的内容，不抢跑
10. **Mermaid 图表**：所有流程图/架构图使用 Mermaid 语法输出
11. **真实 Mock 数据**：使用真实感数据（人名/地址/内容），不用 "xxx" 或 "example" 占位
12. **每阶段后更新进度**：完成每个阶段后立即保存产出物并更新 `progress.json`
13. **文档引用而非内嵌**：阶段八第四章引用阶段四各页面规格文件路径，不内嵌完整交互内容
14. **三轮评审上限**：阶段八质量评审最多 3 轮；第 3 轮仍失败则输出阻塞报告并终止，等待人工干预

---

## 阶段一：产品上下文建立

### 目标
让 AI 理解产品背景，建立设计约束，相当于设计师的 Kick-off 会议。

> **AI 执行方式**：收到产品信息后，AI **先分析**已提供内容覆盖的信息维度（平台/核心模块/目标用户/设计风格/技术栈/设计规范基底/竞品参考/差异化定位），只针对**真正缺失的关键维度**提出 0-8 个精准问题（若信息已足够则直接跳过提问）。问题按下游影响排序，逐一提问，选项类问题标注推荐选项，开放类问题给出示例。全部信息确认后再输出阶段一产出物。平台信息确认后同步写入 `docs/ixd/progress.json` 的 `platform` 字段，供后续阶段引用。

### 提示词模板

```
你是一位拥有 10 年经验的资深交互设计师兼视觉设计师，精通移动端、Web 端和桌面端产品设计，
熟悉 Material Design 3、Apple HIG、Fluent Design（Windows）、macOS HIG 等主流设计体系，
同时具备品牌视觉、UI视觉、动效设计的专业能力。

请基于以下产品背景，建立设计上下文：

## 产品信息
- 产品名称：<<产品名称>>
- 产品类型：<<App/Web/小程序/PC客户端/跨平台>>
- 目标平台：<<iOS/Android/Web/Windows/macOS/Linux/Flutter/Electron/React Native>>
- 产品定位：<<一句话描述产品价值主张>>

## 目标用户
- 主要用户角色：<<角色1：描述>>、<<角色2：描述>>
- 使用场景：<<核心使用场景描述>>
- 用户技术水平：<<小白/普通/专业>>
- 年龄段：<<年龄范围>>

## 核心功能
<<列出 3-7 个核心功能模块>>

## 设计约束
- 设计语言：<<遵循的设计规范，桌面端可选 Fluent Design / macOS HIG / 自定义>>
- 品牌色：<<主色/辅助色/强调色，如有>>
- 品牌调性：<<专业严谨/年轻活力/温暖亲和/科技未来/简约克制/...>>
- 已有设计资产：<<是否有现有的设计系统、组件库或品牌手册>>
- 技术约束：<<前端框架、桌面端框架（Flutter/Electron/Tauri/Swift/WPF）、性能要求等>>
- 竞品参考：<<1-3 个竞品名称及参考点>>

## 你的任务
1. 确认你对产品的理解，输出一段 **产品设计摘要**（200 字以内）
2. 识别 **设计挑战**（3-5 个关键设计难点，含交互和视觉层面）
3. 提出 **设计原则**（3-5 条指导后续设计的原则）
4. 列出 **设计参考**（推荐 2-3 个可参考的优秀产品及理由，需涵盖交互和视觉两个维度）
5. 输出初步 **视觉方向建议**（色彩倾向、字体气质、视觉风格关键词 3-5 个）
```

### 产出格式
- 产品设计摘要：自然段落
- 设计挑战：编号列表 + 简要说明
- 设计原则：原则名 + 解释
- 设计参考：产品名 + 参考理由
- 视觉方向：关键词 + 简要描述

---

## 阶段二：信息架构设计

### 目标
产出完整的产品信息架构图（对标墨刀的"页面树"功能），确保 **穷举所有页面** 无遗漏。

### 提示词模板

```
基于上一步建立的产品上下文，请设计完整的信息架构。

## 输出要求

### 1. 页面清单表（穷举版）
以表格形式输出所有页面，必须覆盖以下全部页面类别（如不适用标注 N/A）：

| 页面编号 | 页面名称 | 所属模块 | 页面层级 | 页面类型 | 入口来源 | 简要说明 |

#### 页面类型完整清单（22 类）

**核心内容类**
1. 聚合页（Hub）— 首页、工作台，多模块入口集合
2. 列表页（List）— 内容列表、订单列表，同类数据的集合展示
3. 详情页（Detail）— 内容详情、商品详情，单条数据的完整展示
4. 搜索页（Search）— 搜索输入 + 历史 + 联想 + 结果展示
5. 筛选/排序页（Filter）— 筛选面板、排序选项（可为独立页或浮层）

**表单与输入类**
6. 表单页（Form）— 注册、编辑资料、发布内容，用户输入/编辑
7. 多步表单（Wizard）— 分步填写，带进度指示器
8. 选择器页（Picker）— 地区选择、日期选择、联系人选择

**反馈与结果类**
9. 结果页（Result）— 提交成功、支付完成、操作确认
10. 空态页（Empty）— 无数据、无网络、无权限（通常作为状态而非独立页面）

**账户与系统类**
11. 登录/注册页（Auth）— 登录、注册、忘记密码、验证码
12. 个人中心/主页（Profile）— 用户信息展示 + 功能入口
13. 设置页（Settings）— 系统设置、账户设置、隐私设置
14. 关于/协议页（About）— 关于我们、用户协议、隐私政策

**引导与过渡类**
15. 启动页/闪屏（Splash）— App 启动品牌展示
16. 引导页/新手教程（Onboarding）— 首次使用的功能引导（轮播或分步）
17. 过渡/加载页（Transition）— 全屏加载、处理中

**覆盖层类**
18. 弹窗/浮层（Overlay）— 弹窗(Dialog)、底部面板(Sheet)、操作菜单(ActionSheet)、全屏浮层

**桌面端专属类**（PC 客户端适用）
19. 主窗口/工作区（Workspace）— 桌面端主界面，含多面板/分栏布局、工具栏
20. 侧边面板（Side Panel）— 可折叠的侧栏，如导航面板、属性面板、文件树
21. 偏好设置/系统设置窗口（Preferences）— 独立窗口或模态设置面板（对标系统级设置）
22. 托盘/菜单栏（Tray/Menu Bar）— 系统托盘弹出面板、菜单栏下拉菜单（macOS/Windows）

### 2. 信息架构图
用 Mermaid 的 graph TD 语法输出页面层级结构，格式示例：
graph TD
    A[首页] --> B[模块A]
    A --> C[模块B]
    B --> B1[子页面1]

### 3. Tab/导航结构
说明主导航形式及各导航项的：

**移动端导航**：底部 Tab / 顶部导航
**桌面端导航**：侧边栏导航（可折叠）/ 顶部菜单栏 / 混合导航（顶部+侧边）
**跨平台导航**：各平台的导航形式差异及一致性策略

- 导航项名称和图标建议
- 对应的默认页面
- 角标/红点策略
- 桌面端：键盘快捷键绑定（如有）

### 4. 全局组件清单
列出跨页面复用的全局组件：
- 导航栏（样式变体）
- 弹窗类型
- Toast 提示
- 加载状态
- 空态组件

### 5. 页面穷举校验
完成页面清单后，请对照以下维度自查是否遗漏：

□ 用户生命周期：首次安装→启动→注册→登录→使用→设置→退出→卸载
□ 内容生命周期：创建→编辑→发布→审核→展示→归档→删除
□ 交易生命周期：浏览→加购→下单→支付→配送→签收→评价→退款
□ 账户管理：注册/登录/找回密码/修改密码/绑定手机/实名认证/注销
□ 消息通知：系统通知/业务通知/聊天消息/推送落地页
□ 异常兜底：404/网络错误/服务维护/版本过低/被封禁
□ 法规合规：用户协议/隐私政策/权限申请说明
□ 桌面端专属（如为 PC 客户端）：安装/卸载→首次启动→窗口管理→托盘行为→自动更新→快捷键→系统集成（文件关联/右键菜单/协议唤起）

## 设计原则
- 层级不超过 4 层
- 核心功能 3 步内可达
- 导航结构符合用户心智模型
- 兼顾<<目标平台>>的导航范式（移动端底部 Tab / 桌面端侧边栏+菜单栏 / Web 顶部导航）
```

### 产出物
- 页面清单表（穷举版，覆盖 22 类页面）
- Mermaid 信息架构图
- 导航结构说明
- 全局组件清单
- 页面穷举校验结果

---

## 阶段三：核心用户流程

### 目标
产出关键任务的用户流程图，对标墨刀的"流程连线"功能。

### 提示词模板

```
请为以下核心任务设计完整的用户流程：

## 核心任务列表
<<列出 3-5 个核心任务，例如：>>
1. <<任务1：如"新用户注册并完成首次下单">>
2. <<任务2：如"老用户搜索商品并完成支付">>
3. <<任务3：如"用户发起退款并跟踪进度">>

## 必须包含的系统级流程
除了核心业务流程外，请同时输出以下通用流程：
4. 冷启动流程：安装→启动→引导→注册/登录→首页（桌面端：下载→安装向导→首次启动→配置向导→主窗口）
5. 异常恢复流程：网络断开→重连→数据恢复
6. 自动更新流程（桌面端）：检测更新→提示用户→后台下载→安装→重启（可选）

## 每个流程需包含

### 用户流程图（Mermaid flowchart）
使用 Mermaid 的 flowchart TD 语法，需体现：
- 起点和终点
- 判断节点（菱形）
- 正常路径（实线箭头）
- 异常路径（虚线箭头）
- 页面跳转标注

格式示例：
flowchart TD
    Start([打开App]) --> A[首页]
    A --> B{已登录?}
    B -->|是| C[商品列表]
    B -->|否| D[登录页]
    D --> E{登录方式}
    E -->|手机号| F[验证码登录]
    E -->|第三方| G[OAuth授权]
    F --> C
    G --> C
    C --> End([完成])

### 流程说明表
| 步骤 | 页面/组件 | 用户操作 | 系统响应 | 异常处理 | 耗时预估 |

### 关键决策点
说明流程中的关键分支逻辑和业务规则

## 设计要求
- 完整覆盖正常流程和主要异常流程
- 标注需要 Loading 状态的节点
- 标注需要确认弹窗的节点
- 考虑网络异常、权限不足等通用异常
- 用流程图验证阶段二的页面清单是否有遗漏（如发现新页面需回溯补充）
```

---

## 阶段四：逐页交互说明

### 目标
为每个页面产出详细的交互说明文档，这是核心产出物，对标墨刀的"交互标注"。

### 提示词模板

```
请为以下页面编写详细的交互设计说明：

## 页面信息
- 页面编号：<<P01>>
- 页面名称：<<页面名称>>
- 所属模块：<<模块名>>
- 页面类型：<<聚合页/列表页/详情页/表单页/搜索页/结果页/工作区/侧边面板/...（22类之一）>>
- 上游页面：<<从哪些页面进入>>
- 下游页面：<<可跳转到哪些页面>>

## 输出格式

### 1. 页面概述
一段话描述页面的核心功能和在产品中的位置

### 2. 页面布局结构
用文本描述页面的区域划分。根据目标平台选择对应模板：

**移动端布局**（App / 小程序），从上到下：
```
┌──────────────────────────────────┐
│  顶部区域：状态栏 + 导航栏        │
├──────────────────────────────────┤
│  内容区域A：<<描述>>              │
├──────────────────────────────────┤
│  内容区域B：<<描述>>              │
├──────────────────────────────────┤
│  底部区域：操作栏 / Tab栏         │
└──────────────────────────────────┘
```

**桌面端布局**（Windows / macOS 原生应用、Flutter/Electron 桌面端），多面板分栏：
```
┌──────────────────────────────────────────────────────────┐
│  标题栏：应用图标 + 标题 + 窗口控制按钮(最小化/最大化/关闭) │
│  (macOS: 左侧红绿灯 + 可拖拽区域; Windows: 右侧按钮)      │
├──────────────────────────────────────────────────────────┤
│  菜单栏/工具栏：<<菜单项 / 工具按钮 / 搜索框 / 用户头像>>   │
├────────────┬─────────────────────────┬───────────────────┤
│  侧边栏     │  主内容区                │  辅助面板(可选)    │
│  (可折叠)   │                         │  (属性/详情/预览)  │
│             │  内容区域A：<<描述>>      │                   │
│  导航菜单    │                         │  <<描述>>          │
│  树形结构    │  内容区域B：<<描述>>      │                   │
│  文件列表    │                         │                   │
│             │                         │                   │
│  <<宽度>>   │  <<弹性宽度>>            │  <<宽度>>          │
├────────────┴─────────────────────────┴───────────────────┤
│  底部状态栏：<<状态信息 / 进度指示 / 快捷操作>>              │
└──────────────────────────────────────────────────────────┘
```

**桌面端布局补充说明**：
- 侧边栏：折叠态宽度 <<48-64px>>，展开态宽度 <<200-280px>>，支持拖拽调整
- 辅助面板：宽度 <<240-360px>>，可关闭/可拖拽调整，不需要时隐藏
- 分栏拖拽分割线：<<是否支持用户拖拽调整各区域宽度>>
- 窗口最小尺寸下的降级：<<侧边栏自动折叠 / 辅助面板自动隐藏>>
- 多 Tab/多标签页：<<是否支持内容区多标签切换，类似浏览器 Tab>>

**跨平台产品**需同时描述移动端和桌面端两套布局，并说明布局切换的断点和过渡策略。

### 3. 组件清单
以表格形式列出页面中所有交互组件：
| 组件编号 | 组件名称 | 组件类型 | 位置区域 | 交互行为 | 触发条件 |

组件类型：按钮、输入框、选择器、开关、卡片、列表项、图标按钮、
         浮层、弹窗、吸底栏、下拉刷新、加载更多、步骤指示器、
         轮播图、标签栏、搜索栏、富文本、地图、视频播放器 等

### 4. 交互行为详细说明
对每个组件的交互行为详细描述：

**组件名称：<<名称>>**
- 点击/触摸：<<响应行为>>
- 长按：<<响应行为，如有>>
- 滑动：<<响应行为，如有>>
- 悬停（桌面端）：<<hover 状态变化、Tooltip 显示，如有>>
- 右键菜单（桌面端）：<<上下文菜单项，如有>>
- 键盘操作（桌面端）：<<Tab 聚焦/Enter 确认/Esc 取消/快捷键，如有>>
- 拖拽（桌面端）：<<拖拽行为、拖拽区域指示，如有>>
- 输入：<<输入规则和实时校验，如有>>
- 禁用态：<<何时禁用、禁用样式>>
- 反馈：<<操作反馈形式：Toast / 动画 / 震动 / 声音>>

### 5. 页面状态流转
列出页面的所有状态及转换条件：

| 状态名 | 触发条件 | 视觉表现 | 可执行操作 |
|--------|----------|----------|------------|
| 默认态 | 正常加载完成 | 显示内容列表 | 浏览/点击/下拉刷新 |
| 加载态 | 进入页面/下拉刷新 | 骨架屏/下拉动画 | 等待 |
| 空态   | 数据为空 | 空态插图+引导文案 | 点击刷新/跳转 |
| 错误态 | 网络异常/服务错误 | 错误提示+重试按钮 | 点击重试 |
| 无权限态 | 未登录/无权限 | 权限提示+引导 | 去登录/去申请 |
| 部分加载态 | 部分数据成功/部分失败 | 成功区域展示+失败区域错误提示 | 重试失败部分 |
| 编辑态 | 进入编辑模式 | 编辑工具栏出现、组件变为可编辑 | 编辑/保存/取消 |

### 6. 动效说明
- 页面转场：<<push/present/fade/slide/自定义>>
- 元素动画：<<出现/消失/状态变化的动效>>
- 手势交互：<<左滑删除/下拉刷新/惯性滚动等>>

### 7. 数据加载策略
- 首次加载：<<全量/分页/懒加载>>
- 刷新策略：<<下拉刷新/定时轮询/WebSocket>>
- 缓存策略：<<是否缓存/缓存时效/离线降级>>
- 分页规则：<<每页条数/加载更多触发条件>>

### 8. 适配说明
- PC 客户端适配：<<窗口最小尺寸/可拖拽调整/分栏布局响应规则/标题栏样式（原生/自绘）>>
- PC 浏览器适配：<<PC / 电脑浏览器的布局变化>>
- 大屏适配：<<iPad / 平板的布局变化>>
- 小屏适配：<<SE / 小屏手机的裁剪策略>>
- 横屏：<<是否支持 / 横屏下的布局>>
- 深色模式：<<色彩适配规则，桌面端需支持跟随系统主题>>
- 无障碍：<<VoiceOver/屏幕阅读器标签 / 最小触摸区域 / 键盘导航焦点指示>>
- 多窗口（桌面端）：<<是否支持多窗口/窗口间通信/窗口记忆位置>>

### 9. 交互走查（必做，输出前自查）
完成上述 1-8 节后、正式输出本页交互说明之前，请对照 **附录 B「交互走查清单」** 逐项自查。
将走查结果以表格形式附在页面交互说明末尾：

| 走查项 | 结果 | 备注 |
|--------|------|------|
| 所有按钮是否有明确的点击反馈 | ✅ 通过 | — |
| 页面是否覆盖了所有状态 | ⚠️ 部分 | 缺少部分加载态，已补充 |
| ... | ... | ... |

如发现不通过项，需先回溯修改 1-8 节的对应内容，再输出最终版本。

### 10. 特定场景微交互说明
识别本页面中需要精细微交互设计的场景（如点赞、收藏、删除、提交成功、开关切换、拖拽排序等），
按 **附录 B「微交互设计」** 模板格式，逐个描述：

**微交互场景：<<场景名，如"收藏按钮">>**
1. 触发条件：<<用户点击收藏图标>>
2. 视觉变化：<<图标从线性→填充，颜色从 N-500→主色，尺寸先放大 120% 再回弹至 100%>>
3. 动效参数：<<时长 300ms，Spring 曲线，延迟 0ms>>
4. 声音/震动反馈：<<轻触震动（移动端）/ 无（桌面端）>>
5. 状态反转：<<再次点击取消收藏，图标从填充→线性，颜色回退，无弹性动画，200ms ease-out>>
6. CSS/代码伪代码：<<关键帧伪代码>>

如本页面无需微交互（如纯静态协议页），标注"本页面无特定微交互场景"即可。
```

### 批量输出提示词

```
请按照上述交互说明格式（1-10 节），依次输出以下页面的完整交互说明：
<<粘贴阶段二的页面清单表>>

可以按模块分批输出，每次输出 3-5 个页面。
先输出 <<模块名>> 模块的所有页面。

⚠️ 每个页面必须包含第 9 节「交互走查」结果表和第 10 节「微交互说明」。
走查不通过的项需先修正再输出。

注意：如果在编写过程中发现有页面在阶段二被遗漏，请标注出来以便回溯补充。
```

---

## 阶段五：组件规范文档

### 目标
产出项目级的组件规范，对标墨刀的"组件库"功能。

### 提示词模板

```
基于前述所有页面的交互设计，请整理输出项目级组件规范文档。

## 输出结构

### 1. 组件总览
按类别列出所有用到的组件：
- 基础组件（按钮、输入框、开关、选择器...）
- 反馈组件（Toast、弹窗、底部面板、加载器...）
- 导航组件（导航栏、Tab栏、面包屑、分段控制器...）
- 数据展示（卡片、列表、标签、徽标、头像...）
- 媒体组件（图片、视频、音频、地图...）
- 业务组件（<<项目特有的业务组件>>）

### 2. 每个组件需包含

#### 组件名称
**功能描述**：一句话说明

**属性/变体（Props/Variants）**：
| 属性名 | 类型 | 可选值 | 默认值 | 说明 |

**尺寸规格**：
- 宽度/高度/内边距/圆角
- 最小触摸区域（>= 44pt）
- 字号/字重/行高

**状态定义**：
| 状态 | 视觉表现 | 触发条件 |
默认态 / 悬停态 / 按下态 / 聚焦态 / 禁用态 / 加载态 / 拖拽态（桌面端）

**交互规则**：
- 点击行为
- 手势行为
- 悬停行为（桌面端：Tooltip / 高亮 / 预览）
- 键盘行为（Tab 序 / Enter / Space / Esc / 快捷键）
- 拖拽行为（桌面端：拖拽手柄 / 放置区域指示 / 拖拽预览）
- 反馈方式

**使用规范**：
- 适用场景
- 禁用场景
- 与其他组件的搭配规则

**代码接口建议**（可选）：
    ```dart / tsx / vue
    // 组件调用示例
    ```

### 3. 设计 Token

> **阶段五职责边界**：阶段五负责定义结构性 Token（间距/圆角/阴影层级/动效参数）的具体数值，以及颜色和字体的 **Token 名称**（语义标识符）。颜色 hex 值和字体族名称由**阶段六**填入，此处一律写 `TBD（→ 阶段六）`。

输出项目级的设计 Token：
- 颜色系统 Token 名称（主色/中性色/语义色/渐变）— hex 值 `TBD（→ 阶段六）`
- 字体系统 Token 名称（中文/英文/数字字族）— 字体族名 `TBD（→ 阶段六）`；字号阶梯/字重/行高在本阶段定义
- 间距系统（4px 基准网格）
- 圆角系统
- 阴影系统（层级结构，阴影参数在本阶段定义）
- 动效曲线和时长

### 4. 响应式断点
| 断点名称 | 宽度范围 | 典型设备 | 布局策略 |

需覆盖：手机竖屏 / 手机横屏 / 平板竖屏 / 平板横屏 / 桌面端小窗口 / 桌面端标准 / 桌面端宽屏

**桌面端专属规范**（PC 客户端适用）：
- 窗口最小尺寸：<<宽度 × 高度>>
- 窗口默认尺寸：<<宽度 × 高度>>
- 信息密度：桌面端可采用紧凑模式（行高/间距缩小 20-30%）
- 标题栏样式：<<原生标题栏 / 自绘标题栏 / 无标题栏（macOS 红绿灯区域预留）>>
- 菜单栏：<<是否使用系统原生菜单栏（macOS）/ 应用内菜单栏 / 无菜单栏>>

```
---

## 阶段六：视觉设计

### 目标
基于交互方案和组件规范，产出完整的视觉设计方案。对标 Figma 的高保真设计稿能力，覆盖色彩、字体、图标、插图、品牌表达等维度。

> **为什么放在阶段五和阶段七之间？**
> 组件规范（阶段五）定义了"骨架"——组件有哪些、尺寸多大、状态几种，并声明了颜色/字体的 Token **名称**（值暂为 TBD）；
> 视觉设计（本阶段）为骨架"穿衣服"——赋予色彩、质感、品牌个性，并将确定的 hex 值**回填**至 `phase5-components.md` 中的 TBD 占位符；
> 可交互原型（阶段七）读取已完整填值的设计 Token，将穿好衣服的设计落地为可体验的代码。

### 提示词模板

```
你是一位资深 UI/视觉设计师，精通移动端、Web 端和桌面端（Windows/macOS）的视觉体系构建。
请基于前述产品上下文、交互方案和组件规范，设计完整的视觉方案。

## 产品视觉输入
- 品牌调性关键词：<<3-5 个关键词，如"专业 可信赖 温暖 现代 克制">>
- 目标用户审美偏好：<<用户群体的视觉偏好描述>>
- 竞品视觉参考：<<竞品的视觉特点和我们的差异化方向>>
- 已有品牌资产：<<Logo/品牌色/品牌字体，如有>>
- 设计规范基底：<<Material Design 3 / Apple HIG / Ant Design / Fluent Design / macOS HIG / 自定义>>

## 请按以下结构输出视觉设计方案

### 一、色彩系统 (Color System)

#### 1.1 品牌色 (Brand Colors)
| 色彩角色 | 色值 (Light) | 色值 (Dark) | HSL | 使用场景 | 面积占比建议 |
|----------|-------------|-------------|-----|---------|-------------|
| 主色 Primary | #<<hex>> | #<<hex>> | <<H,S,L>> | 主按钮/链接/选中态/进度条 | 5-15% |
| 主色变体-浅 | #<<hex>> | #<<hex>> | | 主色背景/选中底色/标签底色 | |
| 主色变体-深 | #<<hex>> | #<<hex>> | | 按下态/深色强调 | |
| 辅助色 Secondary | #<<hex>> | #<<hex>> | | 次要操作/辅助信息/图表 | 3-8% |
| 强调色 Accent | #<<hex>> | #<<hex>> | | 高亮/特殊入口/促销标签 | <5% |

#### 1.2 功能色 (Semantic Colors)
| 语义 | 色值 | 使用场景 |
|------|------|---------|
| 成功 Success | #<<hex>> | 成功提示/完成状态/上涨指标 |
| 警告 Warning | #<<hex>> | 警告提示/待处理/注意 |
| 错误 Error | #<<hex>> | 错误提示/必填标记/下跌指标/删除 |
| 信息 Info | #<<hex>> | 普通提示/帮助信息 |

#### 1.3 中性色阶 (Neutral Scale)
从深到浅输出 8-10 个灰度层级，标注每个层级的具体使用场景：
| 层级 | 色值 (Light) | 色值 (Dark) | 用途 |
|------|-------------|-------------|------|
| N-900 | #1A1A1A | #F5F5F5 | 主标题 |
| N-700 | #333333 | #E0E0E0 | 正文 |
| N-500 | #666666 | #ABABAB | 辅助文字/次要信息 |
| N-400 | #999999 | #808080 | 占位文字/禁用文字 |
| N-300 | #CCCCCC | #555555 | 边框/分割线 |
| N-200 | #E8E8E8 | #333333 | 背景分割/卡片描边 |
| N-100 | #F5F5F5 | #1F1F1F | 页面背景/灰色底 |
| N-50  | #FAFAFA | #141414 | 输入框底色/hover底色 |
| N-0   | #FFFFFF | #0A0A0A | 卡片/组件背景 |

#### 1.4 渐变方案 (Gradients)（如有）
| 名称 | 起始色 | 结束色 | 角度 | 使用场景 |

#### 1.5 色彩无障碍校验
| 前景/背景组合 | 对比度 | WCAG AA | WCAG AAA |
主文字 on 白色背景
辅助文字 on 白色背景
白色文字 on 主色背景
主色 on 深色背景

### 二、字体系统 (Typography System)

#### 2.1 字体选择
| 用途 | 中文字体 | 英文字体 | 数字字体 | 降级方案 |
|------|---------|---------|---------|---------|
| 标题 | <<字体>> | <<字体>> | <<字体>> | <<系统降级>> |
| 正文 | <<字体>> | <<字体>> | - | <<系统降级>> |
| 数据 | - | - | <<字体>> | <<系统降级>> |
| 代码/等宽 | - | <<字体>> | - | <<系统降级>> |

附字体选择理由（与品牌调性的匹配关系）

**桌面端字体补充说明**（PC 客户端适用）：
- Windows 中文降级：Microsoft YaHei → SimHei → sans-serif
- macOS 中文降级：PingFang SC → Hiragino Sans GB → sans-serif
- 桌面端可内嵌自定义字体（Web 端受加载性能限制，桌面端无此顾虑）
- 字号基准：桌面端基准字号可比移动端小 1-2px（用户距离屏幕更远但屏幕更大）

#### 2.2 字号/行高/字重 阶梯
| Token 名 | 字号 | 行高 | 字重 | 使用场景 | 示例 |
|----------|------|------|------|---------|------|
| Display | 32px | 40px | Bold (700) | 数据大盘数字/营销大字 | "¥199.00" |
| H1 | 24px | 32px | Semibold (600) | 页面大标题 | "我的订单" |
| H2 | 20px | 28px | Semibold (600) | 区块标题 | "热门推荐" |
| H3 | 17px | 24px | Medium (500) | 导航标题/卡片标题 | "张明的就诊记录" |
| Body-L | 16px | 24px | Regular (400) | 正文大/重要说明 | 长文本段落 |
| Body-M | 14px | 22px | Regular (400) | 默认正文 | 列表描述/表单标签 |
| Body-S | 12px | 18px | Regular (400) | 辅助文字/时间/标签 | "3分钟前" |
| Caption | 10px | 14px | Regular (400) | 角标/极小说明 | 数字徽标 |

#### 2.3 文字排版规则
- 段落间距：<<规则>>
- 最大行宽：<<字符数/像素>>
- 中英文混排：<<间距规则>>
- 数字等宽/比例：<<规则>>
- 文字截断规则：单行省略 / 多行省略（最多 N 行）

### 三、图标系统 (Iconography)

#### 3.1 图标风格定义
- 风格：<<线性(Outline)/面性(Filled)/双色(Duotone)/圆润(Rounded)>>
- 线宽：<<1.5px/2px>>
- 圆角：<<是否统一圆角>>
- 网格：<<24×24 / 20×20>>
- 视觉修正：<<圆形图标缩小比例>>

#### 3.2 图标尺寸规范
| 使用场景 | 图标尺寸 | 触摸/点击区域 | 示例 |
|---------|---------|---------|------|
| Tab栏（移动端） | 24px | 44×44px | 首页/发现/消息/我的 |
| 侧边栏导航（桌面端） | 20px | 32×32px | 导航菜单图标 |
| 导航栏操作 | 24px | 44×44px（移动）/ 32×32px（桌面） | 返回/搜索/更多 |
| 工具栏按钮（桌面端） | 16-20px | 28×28px | 工具栏操作图标 |
| 列表前缀 | 20px | - | 列表项左侧图标 |
| 输入框内 | 16px | - | 搜索/清除/密码切换 |
| 按钮内 | 16-20px | - | 按钮前/后图标 |
| 系统托盘（桌面端） | 16-22px | - | 托盘图标（Windows 16px / macOS 22px）|
| 菜单项前缀（桌面端） | 16px | - | 右键菜单/下拉菜单图标 |

#### 3.3 图标库来源
推荐图标库：<<Lucide/Phosphor/Tabler/SF Symbols/Material Symbols>>
自定义图标清单：<<需要定制的特殊业务图标列表>>

### 四、插图系统 (Illustrations)

#### 4.1 插图风格
- 风格关键词：<<扁平/3D/线性/手绘/等距/渐变/...>>
- 人物风格：<<有无人物/抽象/写实/卡通>>
- 色彩规则：<<使用品牌色体系/专用插图色板>>

#### 4.2 插图使用场景
| 场景 | 尺寸 | 插图内容建议 | 配合文案 |
|------|------|-------------|---------|
| 空态-无数据 | 200×160px | <<描述>> | "暂无数据，去逛逛吧" |
| 空态-无网络 | 200×160px | <<描述>> | "网络开小差了，点击重试" |
| 空态-无权限 | 200×160px | <<描述>> | "暂无权限，请联系管理员" |
| 空态-无搜索结果 | 200×160px | <<描述>> | "未找到相关内容" |
| 新手引导 | 全屏 | <<描述>> | 引导文案 |
| 操作成功 | 120×120px | <<描述>> | "提交成功" |
| 404/异常 | 200×160px | <<描述>> | "页面走丢了" |
| 节日/运营 | 按需 | <<描述>> | 运营文案 |

### 五、阴影与层级 (Elevation)

| 层级 | 阴影值 (Light) | 阴影值 (Dark) | 使用场景 |
|------|---------------|---------------|---------|
| Level 0 | none | none | 页面背景/平铺内容 |
| Level 1 | 0 1px 3px rgba(0,0,0,0.06) | 0 1px 3px rgba(0,0,0,0.3) | 卡片/列表 |
| Level 2 | 0 4px 12px rgba(0,0,0,0.08) | 0 4px 12px rgba(0,0,0,0.4) | 浮起卡片/Dropdown |
| Level 3 | 0 8px 24px rgba(0,0,0,0.12) | 0 8px 24px rgba(0,0,0,0.5) | 弹窗/底部面板 |
| Level 4 | 0 16px 48px rgba(0,0,0,0.16) | 0 16px 48px rgba(0,0,0,0.6) | 浮层/全屏遮罩 |

### 六、圆角系统 (Border Radius)

| Token | 值 | 使用场景 |
|-------|-----|---------|
| radius-none | 0 | 全宽按钮/分割线 |
| radius-sm | 4px | 小元素（标签/Badge/Chip） |
| radius-md | 8px | 输入框/卡片/中等元素 |
| radius-lg | 12px | 弹窗/面板/大卡片 |
| radius-xl | 16px | 底部面板顶部/大圆角卡片 |
| radius-2xl | 24px | 胶囊按钮/特殊视觉 |
| radius-full | 9999px | 头像/圆形按钮/Tag |

### 七、间距与栅格 (Spacing & Grid)

#### 7.1 基础间距
基于 4px 网格的间距系统：
| Token | 值 | 使用场景 |
|-------|-----|---------|
| space-1 | 4px | 极小间距（图标与文字紧凑排列） |
| space-2 | 8px | 小间距（同组元素间距） |
| space-3 | 12px | 中间距（表单项间距/卡片内边距-紧凑） |
| space-4 | 16px | 标准间距（页面水平边距/卡片内边距-标准） |
| space-5 | 20px | 较大间距（区块间距） |
| space-6 | 24px | 大间距（区块分隔） |
| space-8 | 32px | 超大间距（章节分隔/页面顶底留白） |
| space-10 | 40px | 特大间距（品牌区域/首屏留白） |

#### 7.2 页面栅格
- 栏数：<<4栏(手机)/8栏(平板)/12栏(桌面浏览器)/12-16栏(桌面客户端)>>
- 列宽：<<弹性>>
- 列间距(Gutter)：<<16px/20px/24px>>
- 页面边距(Margin)：<<16px(手机)/20px(平板)/24-32px(桌面)>>
- 桌面端最大内容宽度：<<1200px/1440px/无限制（如为工具类应用）>>

### 八、页面类型视觉标注 + 视觉例外表 (Page-Type Visual Annotations + Exception Table)

不再只标注 3-5 个核心页面，而是为产品中存在的**每种页面类型各选一个代表页**进行视觉标注（基于阶段二页面清单），形成"视觉参考库"，供阶段七原型实现时按页面类型查阅。

**选取规则**：将阶段二页面映射到 22 种页面类型，每种类型选该产品中最重要的一个页面作为代表。不存在的类型跳过。

**常见类型 → 代表页映射参考**：Hub（首页/主工作区）/ List（核心列表）/ Detail（核心详情）/ Search（搜索结果）/ Filter（筛选浏览）/ Form（主表单）/ Wizard（向导）/ Result（成功页）/ Auth（登录页）/ Profile（个人主页）/ Settings（主设置）/ Dialog/Sheet（主弹层）/ Workspace（桌面端主工作区）/ …

#### 八-A. 各类型代表页标注

对产品中存在的每种页面类型，输出以下标注：

```
#### [类型：<<Hub / List / Detail / ...>>] — 代表页：<<页面名>>

**整体氛围**：<<一段话描述视觉感受>>
**背景处理**：<<纯色 / 渐变 / 纹理 / 图片模糊>>

**布局标注**：
- 导航栏高度：<<px>>，背景：<<色值 / 透明>>
- 内容区上边距：<<px>>
- 卡片样式：<<圆角 / 阴影 / 边框>>，间距：<<px>>
- 主要 CTA 按钮：<<高度 / 圆角 / 渐变或纯色>>

**特殊视觉元素**：
<<该类型页面特有的视觉设计，如品牌氛围图/背景装饰/插画/进场动画等>>
```

> 跨平台产品：每个类型标注末尾加"**桌面端差异**"子节：
> - 标题栏/工具栏样式（高度/背景/按钮位置）
> - 侧边栏宽度（折叠态/展开态）
> - 信息密度（间距/字号与移动端的差异）
> - 窗口 chrome 样式（边框/阴影/圆角）

#### 八-B. 视觉例外表

完成类型代表页标注后，扫描阶段二所有页面，只记录**视觉处理与其所属类型代表页或设计系统默认值有偏差的页面**。未列出的页面一律遵循其类型代表页的标注。

| 页面 ID | 页面名 | 例外类型 | 描述 | 作用范围 |
|---------|--------|---------|------|---------|
| <<P03>> | <<订单成功>> | 背景 | 品牌渐变：主色→强调色，135° | 全屏背景 |
| <<P08>> | <<限时活动>> | 颜色覆盖 | 所有 CTA 按钮改用强调色 | 全页 |
| <<P12>> | <<引导步骤 2>> | 插画全屏 | 全屏插画，无标准卡片布局 | 内容区 |
| ... | ... | ... | ... | ... |

**例外类型**：`背景` / `颜色覆盖` / `布局覆盖` / `字体覆盖` / `插画全屏` / `强制深色` / `导航隐藏`

> 若无例外：写"所有页面均遵循设计系统默认值和类型代表页标注。"

### 九、深色模式方案 (Dark Mode)

#### 9.1 适配策略
- <<完整适配 / 仅核心页面适配 / 跟随系统>>
- 桌面端：<<跟随系统主题自动切换 / 应用内独立设置 / 两者兼支持>>
- 系统集成（桌面端）：<<是否监听系统主题变化实时切换 / Windows 高对比度模式支持>>

#### 9.2 深色模式规则
- 背景：不使用纯黑 #000，使用 <<深灰色值>> 作为最深层
- 文字：不使用纯白 #FFF，使用 <<浅灰色值>> 降低刺眼感
- 颜色映射：主色保持/调整饱和度和明度
- 图片处理：<<降低亮度到85% / 加深色叠加 / 使用专用深色素材>>
- 阴影：在深色模式下改为 <<更深的背景色差异/发光阴影>>

#### 9.3 深色模式色彩对照表
| 元素 | Light Mode | Dark Mode |
|------|-----------|-----------|
| 页面背景 | <<色值>> | <<色值>> |
| 卡片背景 | <<色值>> | <<色值>> |
| 一级文字 | <<色值>> | <<色值>> |
| 二级文字 | <<色值>> | <<色值>> |
| 分割线 | <<色值>> | <<色值>> |
| 主色按钮 | <<色值>> | <<色值>> |

### 十、动效视觉 (Motion Design)

#### 10.1 动效原则
<<2-3 条动效设计原则，如"有目的性""自然流畅""保持克制">>

#### 10.2 缓动曲线
| 名称 | 曲线值 | 使用场景 |
|------|--------|---------|
| Standard | cubic-bezier(0.4, 0, 0.2, 1) | 通用过渡/位移 |
| Decelerate | cubic-bezier(0, 0, 0.2, 1) | 元素进入/出现 |
| Accelerate | cubic-bezier(0.4, 0, 1, 1) | 元素退出/消失 |
| Spring | <<参数>> | 弹性效果/强调/快乐 |

#### 10.3 动效时长规范
| 类型 | 时长 | 示例 |
|------|------|------|
| 微交互 | 100-200ms | Toggle/按压/Hover |
| 组件过渡 | 200-300ms | 展开/收起/Fade |
| 页面转场 | 300-400ms | Push/Present/Tab切换 |
| 复杂动画 | 400-600ms | 引导动画/成功庆祝 |
| 窗口动画（桌面端） | 200-300ms | 窗口弹出/面板展开/侧栏折叠 |

**桌面端动效补充**：
- 桌面端用户对响应速度更敏感，动效时长可比移动端缩短 20-30%
- 尊重系统"减少动效"设置（macOS: Reduce motion / Windows: 动画效果关闭）
- 窗口拖拽跟手要即时，不加缓动

## 输出格式
以上全部以结构化 Markdown 输出，色值同时提供 HEX 格式。
如需输出为设计文件/HTML样例板，请告知。
```

### 补充提示词：视觉样例板 (Style Tile)

```
请基于上述视觉方案，生成一个 HTML 视觉样例板（Style Tile），
在一个页面内集中展示：

1. 色彩板（所有色值的色块展示，含 Light/Dark 对比）
2. 字体排版样例（各字号层级的实际渲染效果，使用中文示例文字）
3. 图标样例（展示各尺寸和使用场景）
4. 组件视觉样例（按钮各状态、输入框各状态、卡片、标签等）
5. 阴影层级展示（从 Level 0 到 Level 4 的卡片）
6. 间距尺标展示（可视化间距值）
7. 圆角对比展示
8. 深色模式对比（左右分栏或切换按钮）

技术要求：
- 单文件 HTML + 内联 CSS
- 可在浏览器中直接打开
- 支持 Light/Dark 模式切换
- 使用 CSS 变量实现主题切换
```

### Token 回填：将色值写回阶段五

完成色彩系统（一）和字体系统（二）后，必须将确定的 hex 值和字体族名称**回填**至 `docs/ixd/phase5-components.md`，替换所有 `TBD（→ 阶段六）` 占位符：

| 回填目标（阶段五 Token）| 来源（阶段六章节） |
|---|---|
| `--color-primary` 等品牌色 hex | 一、色彩系统 → 1.1 品牌色 |
| `--color-neutral-*` 中性色阶 hex | 一、色彩系统 → 1.3 中性色阶 |
| `--color-success/warning/error/info` | 一、色彩系统 → 1.2 功能色 |
| Dark mode 映射 hex | 一、色彩系统 → 各色 Dark 列 |
| `--font-family-zh/en/num` | 二、字体系统 → 2.1 字体选择 |

**回填验证清单**：
- [ ] `phase5-components.md` 中所有品牌色 Token 已替换为实际 hex 值
- [ ] 中性色阶全部 Token（N-50 ～ N-900）已填值
- [ ] 深色模式映射表已补全 hex 值
- [ ] 中/英/数字字体族 Token 已填写实际字体名称
- [ ] 无残留 `TBD（→ 阶段六）` 占位符

### 产出物
- 视觉设计方案文档（十个维度）
- 视觉样例板 HTML（可选）
- 深色模式对照表
- 回填完成的 `docs/ixd/phase5-components.md`（Token 值完整版）

---

## 阶段七：可交互 HTML 原型

### 目标
生成可点击的高保真 HTML 原型，对标墨刀的"原型演示"功能。这是 AI 相比传统工具的差异化优势。

### 技术栈

本阶段使用以下技术栈生成高保真原型：

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18 | 组件化 UI 框架 |
| TypeScript | Latest | 类型安全 |
| Vite | Latest | 开发构建工具 |
| Tailwind CSS | 3.4.1 | 原子化 CSS 框架 |
| shadcn/ui | Latest | 高质量 UI 组件库（40+ 预装组件） |
| Parcel | Latest | 打包为单文件 HTML |

**技术栈优势**：
- shadcn/ui 提供 40+ 开箱即用的专业组件（Button、Card、Dialog、Sheet、Tabs、Toast 等）
- Tailwind CSS 配合 shadcn/ui 的主题系统，轻松实现 Design Token
- React 组件化架构，便于页面复用和状态管理
- 最终输出单文件 HTML，可在浏览器直接打开，无需服务器

### 提示词模板

```
请基于前述交互设计方案和视觉设计方案，生成可交互的高保真 HTML 原型。

## 原型配置

> **平台驱动输出**：输出策略由阶段一写入 `docs/ixd/progress.json` 的 `platform` 字段自动决定，无需重复指定：
> | `platform` 值 | 输出文件 | 原型类型 |
> |--------------|---------|---------|
> | `"mobile"`（默认）| `phase7-prototype.html` | 手机框架 + 触摸交互 |
> | `"desktop"` | `phase7-prototype-desktop.html` | 窗口框架 + 鼠标键盘交互 |
> | `"both"` | `phase7-prototype-mobile.html` + `phase7-prototype-desktop.html` | 两个独立文件，共享 Design Token |
>
> **为什么双端不用响应式单文件**：移动端与桌面端的信息架构、导航范式、信息密度、交互模型均有本质差异，用响应式单文件会让两端都无法达到原生体验。

- **目标平台**：<<由 progress.json.platform 字段决定；如需覆盖，请说明原因>>
- **双端输出**：<<否（默认）/ 是>>（同时生成移动端 + 桌面端原型）

## 开发流程

### 第一步：初始化项目
使用 web-artifacts-builder skill 创建项目：
- 项目名称建议：`<<产品名>>-prototype`
- 此步骤会自动配置好 React + TypeScript + Tailwind CSS + shadcn/ui 环境

### 第二步：实现设计 Token
在 `src/index.css` 或全局 CSS 文件中，将阶段六的 Design Token 定义为 CSS 变量和 Tailwind 主题配置：

**色彩系统**（示例）：
```css
:root {
  --primary: <<主色色值>>;
  --primary-foreground: <<主色文字色值>>;
  --secondary: <<辅助色色值>>;
  --accent: <<强调色色值>>;
  --background: <<背景色色值>>;
  --foreground: <<文字色色值>>;
  --muted: <<弱化背景色>>;
  --muted-foreground: <<弱化文字色>>;
  --card: <<卡片背景色>>;
  --border: <<边框色>>;
  --radius: <<圆角基准值>>;
  /* 功能色 */
  --success: <<成功色>>;
  --warning: <<警告色>>;
  --destructive: <<错误色>>;
}

.dark {
  /* 深色模式变量覆盖 */
  --background: <<深色背景>>;
  --foreground: <<深色文字>>;
  /* ... */
}

/* 隐藏滚动条工具类 - 用于原型内容区域 */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE 和 Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome、Safari、Opera */
}
```

**Tailwind 主题扩展**（tailwind.config.js）：
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        // ...
      },
      fontSize: {
        'display': ['<<Display字号>>', { lineHeight: '<<行高>>' }],
        'h1': ['<<H1字号>>', { lineHeight: '<<行高>>', fontWeight: '600' }],
        // ...
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)', // 移动端安全区
      }
    }
  }
}
```

### 第三步：实现页面组件
在 `src/` 目录下按页面结构组织组件：

**单平台移动端** (`platform: "mobile"` - 默认):
```
src/
├── components/
│   ├── ui/              # shadcn/ui 组件（已预装）
│   ├── layout/
│   │   ├── MobileLayout.tsx    # Tab Bar + 顶部导航
│   │   └── PrototypeShell.tsx  # iPhone 框架包装
│   └── shared/          # 共享业务组件
├── pages/               # 页面组件
│   ├── Home.tsx
│   └── ...
├── hooks/               # 自定义 Hooks
├── lib/                 # 工具函数 + mock 数据
├── App.tsx              # 主应用（路由配置）
├── main.tsx             # 入口文件
└── index.css            # 全局样式 + Design Token
```

**单平台桌面端** (`platform: "desktop"`):
```
src/
├── components/
│   ├── ui/              # shadcn/ui 组件（已预装）
│   ├── layout/
│   │   ├── DesktopLayout.tsx   # 侧边栏 + 工具栏 + 标题栏
│   │   └── PrototypeShell.tsx  # 窗口框架包装
│   └── shared/          # 共享业务组件
├── pages/               # 页面组件
│   ├── Home.tsx
│   └── ...
├── hooks/               # 自定义 Hooks
├── lib/                 # 工具函数 + mock 数据
├── App.tsx              # 主应用（路由配置）
├── main.tsx             # 入口文件
└── index.css            # 全局样式 + Design Token
```

**跨平台双端** (`platform: "both"`):
```
src/
├── components/
│   ├── ui/              # shadcn/ui 组件（已预装）
│   ├── layout/
│   │   ├── MobileLayout.tsx    # 移动端布局
│   │   ├── DesktopLayout.tsx   # 桌面端布局
│   │   └── PrototypeShell.tsx  # 设备框架包装（支持双端）
│   └── shared/          # 共享业务组件
├── pages/
│   ├── mobile/          # 移动端页面
│   └── desktop/         # 桌面端页面
├── hooks/               # 自定义 Hooks
├── lib/                 # 工具函数 + 共享 mock 数据
│   └── mockData.ts
├── App.mobile.tsx       # 移动端入口
├── App.desktop.tsx      # 桌面端入口
└── index.css            # 共享 Design Token
```

### 第四步：打包为单文件 HTML
将代码打包为单个 HTML 文件：
- **单平台**：`bundle.html` → 重命名为 `prototype.html`
- **跨平台双端**：`prototype-mobile.html` + `prototype-desktop.html`
- 该文件可在浏览器直接打开，无需任何服务器

## 平台特定实现要求

### 移动端原型
- **视口**：在 `index.html` 设置 `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`
- **布局组件**：
  - 使用 shadcn/ui 的 `Tabs` 组件实现底部 Tab 导航
  - 顶部导航栏自定义组件（返回按钮 + 标题 + 操作按钮）
- **页面转场**：使用 CSS `transform: translateX()` 或 Framer Motion 实现 slide 动画
- **触摸交互**：
  - 下拉刷新：自定义 Hook 或使用 `@tanstack/react-query` 的 `useQuery`
  - 左滑删除：自定义手势处理或 `framer-motion` 的 `drag` 属性
- **shadcn/ui 推荐组件**：`Button`、`Card`、`Input`、`Sheet`（底部面板）、`Dialog`、`Toast`、`Tabs`

### 桌面端原型
- **视口**：`max-width: 1280px` 居中模拟桌面窗口
- **布局组件**：
  - 侧边栏：使用 `Sheet` 或自定义可折叠面板
  - 顶部工具栏：使用 `Menubar` 或自定义 Toolbar 组件
  - 窗口标题栏：模拟关闭/最小化/最大化按钮样式
- **页面转场**：fade 动画（opacity transition）
- **多面板布局**：使用 CSS Grid 或 Flexbox 实现可拖拽分割线
- **键盘导航**：
  - Tab 焦点：确保所有可交互元素有正确的 `tabIndex`
  - 快捷键：使用自定义 Hook 监听 `keydown` 事件
- **鼠标交互**：
  - hover 态：Tailwind 的 `hover:` 前缀
  - 右键菜单：shadcn/ui 的 `ContextMenu` 组件
  - Tooltip：shadcn/ui 的 `Tooltip` 组件
  - 拖拽：`framer-motion` 的 `drag` 或原生 drag API
- **shadcn/ui 推荐组件**：`Button`、`Card`、`Input`、`Sheet`、`Dialog`、`Toast`、`Tabs`、`Menubar`、`ContextMenu`、`Tooltip`、`Separator`

## 交互实现指南

### 页面导航
**移动端**：
```tsx
// 使用 Hash 路由或状态切换
const [currentPage, setCurrentPage] = useState('home');

// Tab Bar 组件使用 shadcn/ui Tabs
<Tabs defaultValue="home" className="fixed bottom-0 ...">
  <TabsList>
    <TabsTrigger value="home" onClick={() => setCurrentPage('home')}>
      <HomeIcon /> 首页
    </TabsTrigger>
    {/* ... */}
  </TabsList>
</Tabs>
```

**桌面端**：
```tsx
// 侧边栏导航 + 路由状态
const navigate = (page: string) => setCurrentPage(page);

// 快捷键支持
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.altKey && e.key === 'ArrowLeft') navigate('back');
    if (e.altKey && e.key === 'ArrowRight') navigate('forward');
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### 表单交互
- 使用 shadcn/ui 的 `Input`、`Select`、`Checkbox`、`Switch`、`RadioGroup`、`Slider` 等组件
- 表单校验：使用 `react-hook-form` + `zod`（如已安装）或自定义状态校验
- 禁用态联动：根据表单状态控制 `Button` 的 `disabled` 属性

### 状态模拟
```tsx
// 加载态模拟
const [isLoading, setIsLoading] = useState(false);
const loadData = async () => {
  setIsLoading(true);
  await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟 1.5s 加载
  setIsLoading(false);
};

// Toast 提示
import { toast } from '@/components/ui/use-toast';
toast({ title: '操作成功', description: '数据已保存' });
```

### 深色模式
```tsx
// 使用 next-themes 或简单状态切换
const [theme, setTheme] = useState<'light' | 'dark'>('light');

// 在根元素添加 class
<div className={theme}>
  {/* 应用内容 */}
</div>

// 切换按钮
<Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
  {theme === 'light' ? '🌙' : '☀️'}
</Button>
```

## 原型展示入口页面（简化外壳）

所有原型必须包含一个**统一的入口展示页面**（PrototypeShell），对标墨刀的"原型演示"功能。

**v2.5 重要更新**：设备模拟（手机框/桌面窗口）从外壳移至各页面组件内部。外壳仅提供项目名称、主题切换和展示区域，不包含设备框架。

### 外壳必备元素

1. **项目名称**
   - 显示在页面顶部中央或左上角
   - 使用阶段六定义的品牌主色或 Display/H1 字号
   - 可选副标题：项目版本号、更新日期

2. **浅色/深色模式切换**
   - 位置：页面右上角或导航栏
   - 样式：图标按钮（☀️/🌙）或 Toggle Switch
   - 切换时全局应用 `.dark` class
   - 默认跟随系统偏好（`prefers-color-scheme`）

3. **展示区域**
   - 包含交互页面内容
   - **外壳不随鼠标滚动移动** — 滚动事件由页面内部的设备框架捕获
   - 每个页面组件使用 PhoneFrame（移动端）或 WindowFrame（桌面端）包装

4. **页面导航器**
   - 位置：入口页面侧边（桌面端）或底部
   - 功能：快速跳转到任意页面
   - 样式：圆点指示器
   - 当前页高亮显示

5. **交互说明浮窗（可选）**
   - 入口：右上角"？"图标或"交互说明"按钮
   - 内容：当前页面的交互行为列表（从阶段四提取）
   - 样式：使用 shadcn/ui 的 `Sheet` 或 `Dialog` 组件

### 外壳代码示例

```tsx
// PrototypeShell.tsx - 原型展示外壳组件
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface PageItem {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface PrototypeShellProps {
  productName: string;
  platform: 'mobile' | 'desktop';
  children: React.ReactNode;
  pages?: PageItem[]; // 页面导航项
  currentPage?: string; // 当前激活页面
  onPageChange?: (pageId: string) => void;
  interactions?: string[]; // 交互说明列表
}

export function PrototypeShell({
  productName,
  children,
  pages = [],
  currentPage = '',
  onPageChange,
  interactions
}: PrototypeShellProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // 跟随系统偏好
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // 阻止外壳滚动 - 滚动事件由子组件处理
  const handleWheel = (e: React.WheelEvent) => {
    // 不阻止默认行为 - 让子组件处理滚动
  };

  return (
    <div
      className={`min-h-screen ${theme === 'dark' ? 'bg-neutral-950' : 'bg-neutral-50'} ${theme}`}
      onWheel={handleWheel}
    >
      {/* 顶部控制栏 - 固定不滚动 */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b backdrop-blur-sm bg-background/80">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {productName}
          </h1>
          <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">v1.0</span>
        </div>
        <div className="flex items-center gap-2">
          {/* 交互说明 - 从阶段四提取 */}
          {interactions && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                  交互指南
                </Button>
              </SheetTrigger>
              <SheetContent>
                <h2 className="text-lg font-semibold mb-4">交互说明（阶段四）</h2>
                <ul className="space-y-2">
                  {interactions.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {item}</li>
                  ))}
                </ul>
              </SheetContent>
            </Sheet>
          )}
          {/* 主题切换 */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            )}
          </Button>
        </div>
      </header>

      {/* 展示区域 - 包含设备框架和页面内容 */}
      {/* 外壳不滚动 - 滚动事件由 PhoneFrame/WindowFrame 捕获 */}
      <main className="pt-20 pb-8 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* 页面导航器 - 侧边圆点指示器 */}
      {pages.length > 0 && (
        <nav className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange?.(page.id)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentPage === page.id
                  ? 'bg-primary scale-125'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              title={page.name}
            />
          ))}
        </nav>
      )}
    </div>
  );
}
```

### PhoneFrame 组件（移动端设备模拟）

**v2.5 新增**：设备框架作为独立组件，在每个页面内部使用。实现无滚动条显示、鼠标滚轮模拟滑动。

```tsx
// src/components/layout/PhoneFrame.tsx - 移动端手机框架组件
// 单一职责：提供 iPhone 14 物理框架，内置手机 Chrome（状态栏、灵动岛、Home Indicator）
// Tab Bar 通过 tabBar slot 传入，由调用者提供自定义 AppTabBar 组件
import React, { useRef, useEffect } from 'react';

interface PhoneFrameProps {
  /** 可滚动的页面内容（主区域），内部已预留 pt-11 状态栏安全区 */
  children: React.ReactNode;
  /** 可选：自定义 Tab Bar 组件，渲染在屏幕底部（flex-shrink-0），不遮挡手机边框 */
  tabBar?: React.ReactNode;
  theme?: 'light' | 'dark';
}

export function PhoneFrame({
  children,
  tabBar,
  theme = 'light',
}: PhoneFrameProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 鼠标滚轮转换为滑动/滚动
  useEffect(() => {
    const content = scrollRef.current;
    if (!content) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      content.scrollTop += e.deltaY;
    };

    content.addEventListener('wheel', handleWheel, { passive: false });
    return () => content.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="flex justify-center" data-testid="phone-frame">
      {/* iPhone 14 框架 — 390×844px，手机边框为 p-1.5 (6px) */}
      <div
        className={`relative rounded-[48px] p-1.5 shadow-2xl overflow-hidden ring-1 ${
          theme === 'dark' ? 'bg-neutral-800 ring-neutral-700' : 'bg-neutral-900 ring-neutral-200'
        }`}
        style={{ width: '390px', height: '844px' }}
      >
        {/* 状态栏 — 手机 Chrome，始终存在，绝对定位于外层框架 */}
        <div className="absolute top-0 left-0 right-0 h-11 flex items-center justify-between px-6 text-white z-10">
          <span className="text-sm font-medium">
            {new Date().toLocaleTimeString('zh-CN', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </span>
          <div className="flex items-center gap-1.5">
            {/* 信号格 */}
            <div className="flex items-end gap-[2px] h-3">
              <div className="w-0.5 bg-white rounded-full" />
              <div className="w-0.5 bg-white rounded-full" />
              <div className="w-0.5 bg-white rounded-full" />
              <div className="w-0.5 bg-white/40 rounded-full" />
            </div>
            {/* WiFi */}
            <svg className="w-4 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
            {/* 电池 */}
            <svg className="w-5 h-2.5" viewBox="0 0 24 12" fill="currentColor">
              <rect x="1" y="4" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="3" y="5.5" width="14" height="5" rx="1.5" />
              <rect x="20" y="4.5" width="2" height="3" rx="0.5" />
            </svg>
          </div>
        </div>

        {/* 屏幕区域 — flex-col，被手机边框裁剪（rounded-[40px] overflow-hidden） */}
        <div
          ref={contentRef}
          className={`rounded-[40px] h-full overflow-hidden flex flex-col ${
            theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
          }`}
        >
          {/* 可滚动内容区 — pt-11 预留 44px 状态栏安全区 */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pt-11 touch-pan-y"
            style={{ scrollBehavior: 'smooth' }}
          >
            {children}
          </div>

          {/* Tab Bar slot — flex-shrink-0，在屏幕内部，不遮挡手机边框 */}
          {tabBar && (
            <div className="flex-shrink-0">
              {tabBar}
            </div>
          )}
        </div>

        {/* 灵动岛 — pointer-events-none 避免阻挡状态栏区域点击 */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-full z-20 pointer-events-none" />

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/60 rounded-full" />
      </div>
    </div>
  );
}
```

**移动端职责划分**（v2.8 新增）：

| UI 层 | 由谁负责 | 说明 |
|-------|---------|------|
| 状态栏（时间/信号/电量） | **PhoneFrame** — 内置 | 手机 Chrome，每页相同 |
| 灵动岛 | **PhoneFrame** — 内置 | 手机 Chrome |
| Home Indicator | **PhoneFrame** — 内置 | 手机 Chrome |
| Tab Bar | **`tabBar` prop** → `AppTabBar` 组件 | App Chrome，各页共享，支持自定义（凸起按钮、徽标等） |
| 顶部导航栏（标题/返回/搜索） | **页面 `children`** | 页面特有，可随滚动折叠 |
| 页面内容（列表/卡片/表单） | **页面 `children`** | 页面特有，可滚动 |

**AppTabBar 示例**：
```tsx
// src/components/AppTabBar.tsx
function AppTabBar({ currentPage, onNavigate }: { currentPage: string; onNavigate: (id: string) => void }) {
  const tabs = [
    { id: 'home', label: '首页', icon: <HomeIcon /> },
    { id: 'discover', label: '发现', icon: <DiscoverIcon /> },
    { id: 'cart', label: '购物车', icon: <CartIcon /> },
    { id: 'profile', label: '我的', icon: <ProfileIcon /> },
  ];
  return (
    <div className="flex items-center justify-around h-16 bg-white border-t border-neutral-100">
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onNavigate(tab.id)}
          className={`flex flex-col items-center gap-1 px-3 py-1 ${
            currentPage === tab.id ? 'text-black' : 'text-neutral-400'
          }`}>
          {tab.icon}
          <span className="text-[10px] font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
```

### WindowFrame 组件（桌面端设备模拟）

```tsx
// src/components/layout/WindowFrame.tsx - 桌面端窗口框架组件
// 单一职责：提供 macOS 风格窗口框架，内置标题栏（窗口 Chrome）
// Sidebar 通过 sidebar slot 传入，由调用者提供自定义 AppSidebar 组件
import React, { useRef, useEffect } from 'react';

interface WindowFrameProps {
  /** 可滚动的页面内容（主区域，在 sidebar 右侧）。不要在此处重新实现标题栏或侧边栏 */
  children: React.ReactNode;
  /** 可选：自定义 Sidebar 组件，渲染为内容区左侧的 flex-shrink-0 列 */
  sidebar?: React.ReactNode;
  theme?: 'light' | 'dark';
  title?: string;
  width?: number;
  height?: number;
}

export function WindowFrame({
  children,
  sidebar,
  theme = 'light',
  title = 'Application',
  width = 1280,
  height = 800
}: WindowFrameProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = scrollRef.current;
    if (!content) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      content.scrollTop += e.deltaY;
    };

    content.addEventListener('wheel', handleWheel, { passive: false });
    return () => content.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="flex justify-center" data-testid="window-frame">
      {/* 桌面窗口框架 — 标题栏为窗口 Chrome，始终存在 */}
      <div
        className={`rounded-xl shadow-2xl overflow-hidden ring-1 flex flex-col ${
          theme === 'dark' ? 'bg-neutral-800 ring-neutral-700' : 'bg-white ring-neutral-200'
        }`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {/* 标题栏 — 窗口 Chrome（macOS 红黄绿交通灯 + 标题），不在 children 中重新实现 */}
        <div
          className={`h-10 flex-shrink-0 flex items-center px-4 gap-3 ${
            theme === 'dark' ? 'bg-neutral-800 border-b border-neutral-700' : 'bg-neutral-100 border-b border-neutral-200'
          }`}
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
          </div>
          <span className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {title}
          </span>
        </div>

        {/* Body — flex-row：sidebar slot（左）+ 可滚动内容区（右） */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar slot — flex-shrink-0，高度撑满，不超出窗口区域 */}
          {sidebar && (
            <div className="flex-shrink-0 h-full">
              {sidebar}
            </div>
          )}

          {/* 可滚动内容区 */}
          <div
            ref={scrollRef}
            className={`flex-1 overflow-auto ${
              theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
```

**桌面端职责划分**（v2.8 新增）：

| UI 层 | 由谁负责 | 说明 |
|-------|---------|------|
| 标题栏（窗口控制按钮 + 标题） | **WindowFrame** — 内置 | 窗口 Chrome，不在 children 中重新实现 |
| 侧边栏导航 | **`sidebar` prop** → `AppSidebar` 组件 | App Chrome，各页共享，支持折叠/展开 |
| 菜单栏 + 工具栏（Word 风格） | **页面 `children`** — `flex flex-col h-full` 包裹 | AppMenuBar/AppToolbar 为 `flex-shrink-0`，内容区为 `flex-1 overflow-y-auto` |
| 页面级工具栏（如编辑器工具条） | **页面 `children`** | 页面特有，不跨页共享 |
| 页面内容 | **页面 `children`** | 可滚动主内容区 |

**AppSidebar 示例**：
```tsx
// src/components/AppSidebar.tsx
function AppSidebar({ currentPage, onNavigate }: { currentPage: string; onNavigate: (id: string) => void }) {
  const navItems = [
    { id: 'dashboard', label: '概览', icon: <DashboardIcon /> },
    { id: 'analytics', label: '数据', icon: <AnalyticsIcon /> },
    { id: 'settings', label: '设置', icon: <SettingsIcon /> },
  ];
  return (
    <div className="w-60 h-full flex flex-col bg-neutral-100 border-r border-neutral-200">
      <div className="p-4 font-semibold text-sm">AppName</div>
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map(item => (
          <button key={item.id} onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
              currentPage === item.id ? 'bg-neutral-200 font-medium' : 'text-neutral-600 hover:bg-neutral-200'
            }`}>
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
```

**Word 风格菜单栏 + 工具栏（在 children 中实现）**：
```tsx
// 当应用需要菜单栏 + 工具栏时，在 children 中用 flex flex-col h-full 包裹
function Dashboard({ currentPage, onNavigate }: PageProps) {
  return (
    <WindowFrame sidebar={<AppSidebar currentPage={currentPage} onNavigate={onNavigate} />}>
      {/* flex flex-col h-full 让菜单栏/工具栏固定，内容区滚动 */}
      <div className="flex flex-col h-full">
        {/* 菜单栏 — flex-shrink-0 */}
        <AppMenuBar />
        {/* 工具栏 — flex-shrink-0 */}
        <AppToolbar />
        {/* 可滚动内容区 — flex-1 overflow-y-auto */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* 页面内容 */}
        </div>
      </div>
    </WindowFrame>
  );
}
```

### 入口页面使用方式

在 `App.tsx` 中包裹所有页面，每个页面使用 PhoneFrame 或 WindowFrame 包装：

```tsx
// 移动端示例：使用 tabBar slot 传入自定义 AppTabBar
import { PrototypeShell } from '@/components/layout/PrototypeShell';
import { PhoneFrame } from '@/components/layout/PhoneFrame';
import { AppTabBar } from '@/components/AppTabBar';
import { Home, ProductDetail, Cart, Profile } from '@/pages/mobile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const pages = [
    { id: 'home', name: '首页' },
    { id: 'detail', name: '详情' },
    { id: 'cart', name: '购物车' },
    { id: 'profile', name: '我的' },
  ];

  // Tab Bar 作为 slot 传入 — 仅在需要 Tab 的页面使用
  const tabBar = <AppTabBar currentPage={currentPage} onNavigate={setCurrentPage} />;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <PhoneFrame theme={theme} tabBar={tabBar}>
            <Home />
          </PhoneFrame>
        );
      case 'detail':
        // 详情页无 Tab Bar
        return (
          <PhoneFrame theme={theme}>
            <ProductDetail />
          </PhoneFrame>
        );
      case 'cart':
        return (
          <PhoneFrame theme={theme} tabBar={tabBar}>
            <Cart />
          </PhoneFrame>
        );
      case 'profile':
        return (
          <PhoneFrame theme={theme} tabBar={tabBar}>
            <Profile />
          </PhoneFrame>
        );
      default:
        return null;
    }
  };

  return (
    <PrototypeShell
      productName="<<产品名称>>"
      pages={pages}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      interactions={[
        // 从阶段四交互规范提取
        "点击商品卡片跳转详情页",
        "左滑删除购物车商品",
        "下拉刷新首页数据",
      ]}
    >
      {renderPage()}
    </PrototypeShell>
  );
}
```

```tsx
// 桌面端示例：使用 sidebar slot 传入自定义 AppSidebar
import { WindowFrame } from '@/components/layout/WindowFrame';
import { AppSidebar } from '@/components/AppSidebar';
import { Dashboard, Analytics, Settings } from '@/pages/desktop';

function DesktopApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const sidebar = <AppSidebar currentPage={currentPage} onNavigate={setCurrentPage} />;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <WindowFrame theme={theme} sidebar={sidebar} title="Dashboard">
            <Dashboard />
          </WindowFrame>
        );
      case 'analytics':
        return (
          <WindowFrame theme={theme} sidebar={sidebar} title="Analytics">
            <Analytics />
          </WindowFrame>
        );
      default:
        return null;
    }
  };

  return (
    <PrototypeShell productName="<<产品名称>>" pages={[...]} currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </PrototypeShell>
  );
}
```

### 页面实现前的阶段六视觉查阅（Phase 6 Visual Lookup）

实现每个页面前，必须执行以下三步视觉查阅，确保视觉决策有依据：

1. **确定页面类型**（Hub / List / Detail / Form / Auth / …），来自阶段二页面清单
2. **读取类型代表页标注**（`phase6-visual.md` 八-A 节）— 该页面类型的基线视觉规格（背景处理、导航栏、卡片样式、CTA 样式、特殊视觉元素）
3. **检查视觉例外表**（`phase6-visual.md` 八-B 节）— 若该页面出现在例外表中，在类型代表页基础上叠加例外描述

```
视觉决策优先级（高→低）：
页面级例外（八-B 节）
  ↓
类型代表页标注（八-A 节）
  ↓
设计系统默认值（阶段五 Token + 阶段六色彩/字体）
```

> 若页面类型无代表页标注且无例外记录，则直接应用设计系统默认值。

---

### 字体与美学设计指南

为了实现独特、非通用的外观，请遵循**阶段六视觉规范**：

**字体**（从阶段六选择）：
```css
/* 示例：从阶段六 Typography System 选择 */
@import url('https://fonts.googleapis.com/css2?family=<<标题字体>>:wght@400;600;700&family=<<正文字体>>:wght@300;400;500&display=swap');

:root {
  --font-display: '<<标题字体>>', serif;
  --font-body: '<<正文字体>>', sans-serif;
}
```

**背景**：
- 使用阶段六定义的色彩系统
- 避免纯白 (#ffffff) 或纯黑 (#000000)

**动画**（从阶段四交互规范）：
```css
/* 页面切换 - 从阶段四 interaction specs */
.page-enter {
  opacity: 0;
  transform: translateX(20px);
}
.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}

/* 按键反馈 - 从阶段五 component states */
.tap-active {
  transform: scale(0.98);
  transition: transform 100ms ease;
}
```

## 附加功能（可选）
- 左上角添加"交互说明"浮窗按钮：使用 `Dialog` 或 `Sheet` 展示当前页面的交互标注
- 页面底部添加页面状态切换器：使用 `Select` 或 `RadioGroup` 切换默认/加载/空态/错误态
- 右上角添加"视觉标注"模式：使用 CSS overlay 显示间距/色值/字号标注

## 输出文件

### 单端原型（默认）
打包输出为 **单个 bundle.html 文件**：
- 移动端：`bundle.html`（或 `prototype-mobile.html`）- 页面内含 PhoneFrame 手机框
- 桌面端：`bundle.html`（或 `prototype-desktop.html`）- 页面内含 WindowFrame 窗口框

### 双端原型
**同一项目，双入口打包**：
- 项目：`<<产品名>>-prototype/`（包含移动端和桌面端两套实现）
- 输出：
  - `prototype-mobile.html` — 移动端原型（页面内含 PhoneFrame 手机框）
  - `prototype-desktop.html` — 桌面端原型（页面内含 WindowFrame 窗口框）

**单项目优势**：
- 共享 Design Token（阶段六），确保视觉一致性
- 共享 mock 数据，减少重复
- 共享业务组件，最大化代码复用
- 共享业务组件，最大化代码复用
- 只需一次 `pnpm install`

两个输出文件各自实现平台原生的交互范式，不使用响应式断点混排。

## 设计风格指南（避免 AI 感）

为避免产出"AI 味"过重的设计，请遵循：
- ❌ 避免过度居中布局
- ❌ 避免大面积紫色渐变
- ❌ 避免统一圆角（根据元素层级使用不同圆角）
- ❌ 避免默认 Inter 字体（根据阶段六的字体系统选择合适字体）
- ✅ 使用阶段六定义的品牌色和设计语言
- ✅ 保持视觉层级清晰（标题 > 正文 > 辅助文字）
- ✅ 适度使用留白和呼吸感
```

### 分步生成策略

如果页面较多，可按以下策略分步生成：

```
## 第一步：初始化项目
使用 web-artifacts-builder skill 初始化项目。
项目名称：`<<产品名>>-prototype`

初始化后，项目已包含：
- React + TypeScript 环境
- Tailwind CSS + shadcn/ui 配置
- 40+ 预装 shadcn/ui 组件
- Parcel 打包配置

## 第二步：实现 Design Token 和布局框架
在 `src/index.css` 中定义阶段六的全部 Design Token（色彩/字体/间距/圆角/阴影）。

创建布局组件：

**移动端**：
- `MobileLayout.tsx`：底部 Tab 导航（使用 shadcn/ui Tabs）+ 顶部导航栏
- 页面转场动画组件

**桌面端**：
- `DesktopLayout.tsx`：侧边栏导航（可折叠）+ 顶部工具栏 + 窗口标题栏模拟
- 多面板布局框架（侧边栏 + 主内容区 + 辅助面板）

暂时每个页面用占位内容即可。

## 第三步：逐页填充
现在请填充 <<页面名>> 的完整内容，需要实现以下交互：
<<粘贴该页面的交互行为详细说明>>

使用 shadcn/ui 组件快速构建 UI：
- 按钮：`<Button variant="default|secondary|outline|ghost">`
- 卡片：`<Card><CardHeader><CardTitle>...</CardTitle></CardHeader><CardContent>...</CardContent></Card>`
- 输入框：`<Input placeholder="..." />`
- 列表：`<Card>` 循环渲染
- 底部面板：`<Sheet>`
- 弹窗：`<Dialog>`
- Toast：`toast({ title: '...', description: '...' })`

## 第四步：打包和验收
使用 web-artifacts-builder skill 打包项目。
输出文件 `bundle.html`（或双端的 `prototype-mobile.html` + `prototype-desktop.html`），在浏览器中打开验收：

1. 页面间跳转是否流畅
2. 动画是否连贯
3. 各状态是否可正常切换
4. 视觉样式是否严格遵循阶段六的视觉方案
5. 深色模式是否正确切换
6. 桌面端专属（如有）：键盘导航、悬停态、右键菜单是否正常
```

### 双端原型分步生成

当需要同时输出移动端和桌面端原型时：

```
## 第一步：初始化项目
项目名称：`<<产品名>>-prototype`

使用 iweb-artifacts-builder skill 初始化项目后，项目已包含：
- React + TypeScript 环境
- Tailwind CSS + shadcn/ui 配置
- 40+ 预装 shadcn/ui 组件

## 第二步：实现 Design Token
在 `src/index.css` 中定义阶段六的全部 Design Token：
- 色彩变量（Light + Dark）
- 字体系统变量
- 间距 / 圆角 / 阴影变量
- 动效曲线变量

两套原型将共享此文件，确保视觉一致性。

## 第三步：创建双入口结构
创建移动端和桌面端两套入口：

**目录结构**：
```
src/
├── components/
│   ├── layout/
│   │   ├── MobileLayout.tsx    # 移动端布局
│   │   └── DesktopLayout.tsx   # 桌面端布局
│   └── shared/                 # 共享业务组件
├── pages/
│   ├── mobile/                 # 移动端页面
│   └── desktop/                # 桌面端页面
├── lib/
│   └── mockData.ts             # 共享 mock 数据
├── App.mobile.tsx              # 移动端入口
├── App.desktop.tsx             # 桌面端入口
└── index.css                   # 共享 Design Token
```

**入口 HTML 文件**：
- `index.mobile.html` → 引用 `App.mobile.tsx`
- `index.desktop.html` → 引用 `App.desktop.tsx`

## 第四步：实现布局组件
**移动端布局** (`MobileLayout.tsx`)：
- 390×844px 居中手机模拟器（使用 CSS max-width + margin auto）
- 底部 Tab 导航（shadcn/ui Tabs）+ 顶部导航栏
- 页面转场使用 slide 动画

**桌面端布局** (`DesktopLayout.tsx`)：
- 1280×800px 桌面窗口模拟（含自绘标题栏 + 窗口控制按钮）
- 侧边栏导航（可折叠）+ 顶部工具栏/菜单栏
- 多面板布局：CSS Grid 实现侧边栏 + 主内容区 + 辅助面板
- 页面转场使用 fade 动画

## 第五步：逐页填充（两端同步）
同时实现 `pages/mobile/X.tsx` 和 `pages/desktop/X.tsx`：

移动端和桌面端的差异点：
- 布局差异：移动端单栏 vs 桌面端分栏
- 导航差异：移动端 push 跳转 vs 桌面端面板内切换
- 交互差异：移动端手势 vs 桌面端鼠标键盘

共享的内容：
- Design Token（视觉一致性）
- Mock 数据（`lib/mockData.ts`）
- 业务逻辑组件

<<粘贴该页面的交互行为详细说明>>

## 第六步：双入口打包
使用 web-artifacts-builder skill 分别打包两个入口：

```bash
# 打包移动端
pnpm exec parcel build index.mobile.html --dist-dir dist/mobile --no-source-maps
pnpm exec html-inline dist/mobile/index.mobile.html > prototype-mobile.html

# 打包桌面端
pnpm exec parcel build index.desktop.html --dist-dir dist/desktop --no-source-maps
pnpm exec html-inline dist/desktop/index.desktop.html > prototype-desktop.html
```

## 第七步：独立验收
分别检查两个输出文件：
1. 移动端：手势交互是否流畅、底部 Tab 切换是否正常、页面状态覆盖是否完整
2. 桌面端：键盘导航是否可用、侧边栏折叠/展开是否正常、右键菜单是否在正确区域触发
3. 两端共性：深色模式切换、视觉样式是否一致
```

### 批量输出提示词

```
请按照上述可交互高保真 HTML 原型要求，依次输出以下页面的完整原型：
<<粘贴阶段二的页面清单表>>

**目标平台**：<<移动端（默认）/ 桌面端 / 双端>>
**双端输出**：<<否（默认）/ 是>>

按优先级顺序分批输出，每次输出 3-5 个页面。
如为双端输出，每次同时输出同一页面的移动端和桌面端两个版本。

技术栈：React 18 + TypeScript + Tailwind CSS + shadcn/ui
最终输出：单文件 HTML（可在浏览器直接打开）
```

### TDD 开发方法（v2.6 新增，v2.8 更新）

阶段七采用测试驱动开发（TDD）方法：

1. **测试先行**：每个页面实现前，先根据阶段四交互规格编写 Vitest 测试（smoke + `data-testid` + 内容断言）
2. **红绿重构**：先写失败的测试（RED → `pnpm test` 失败），然后实现页面通过测试（GREEN → `pnpm test` 通过）
3. **批次交互走查**：每批次页面完成后，运行 `pnpm test:run` 确认通过，再对照工具二（47项启发式检查表）进行走查
4. **生成评审报告**：将批次评审结果**追加写入** `docs/ixd/phase7-review-master.md` 的 `## Batch N` 节（**不生成独立批次文件**）
5. **完整性检查**：所有批次完成后，对照阶段二页面清单检查是否有遗漏

**测试框架**：`pnpm test`（watch 模式）/ `pnpm test:run`（单次运行，用于打包前确认）

**页面测试模板**（移动端）：
```tsx
import { render, screen } from '@testing-library/react';
import { Home } from '../Home';

describe('Home', () => {
  it('renders without crashing', () => {
    expect(() => render(<Home />)).not.toThrow();
  });
  it('wraps in PhoneFrame', () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId('phone-frame')).toBeInTheDocument();
  });
  it('shows main content area', () => {
    render(<Home />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
```

### 批次交互走查流程

每批次页面完成后：
1. 运行 `pnpm test:run`，确认所有测试通过（TDD 绿灯）
2. 读取该批次各页面的阶段四规格（每页一个文件：`docs/ixd/phase4-page-specs/page-<ID>.md`）
3. 对照工具二（辅助工具.md）的 47 项启发式检查表逐项核查
4. 将评审结果**追加**到 `docs/ixd/phase7-review-master.md` 的 `## Batch N` 节
5. 如有问题，修复后重新运行 `pnpm test:run` + 重新走查，直到通过
6. 确认通过后才能继续下一批次

**评审主报告结构**（`phase7-review-master.md`，单文件增量追加）：
```markdown
# Phase 7 Review Master Report

## Batch 1 — Pages: Home, ProductList, ProductDetail
[批次 1 走查结果 + 每页验证表 + 结论]

## Batch 2 — Pages: Cart, Profile, Settings
[批次 2 走查结果 + 每页验证表 + 结论]

## Final Completeness Check
[对照阶段二清单的完整性核查报告]
```

### 阶段二完整性检查

所有批次完成后：
1. 读取阶段二 `docs/ixd/phase2-architecture.md` 页面清单
2. 扫描原型代码确认已实现的页面
3. 对比清单，标识遗漏页面
4. 如有遗漏，实现遗漏页面
5. 输出完整性报告，追加到 `phase7-review-master.md` 的 `## Final Completeness Check` 节

---

## 阶段八：设计交付文档

### 目标
将所有设计成果汇总为一份可交付的设计文档（对标墨刀的"设计文档导出"功能）。

> **v2.0 更新**：文档结构新增视觉设计章节，并将视觉样例板作为附录。
> **v2.1 更新**：文档结构全面覆盖 PC 客户端（Windows/macOS/跨平台桌面端），新增跨平台策略章节、桌面端专属规范，附录补充双端原型链接和平台差异交接清单。

### 提示词模板

```
请将前述所有交互+视觉设计成果整合为一份完整的《产品设计说明书》。

## 文档结构

### 封面
- 产品名称
- 文档类型：产品交互与视觉设计说明书
- 目标平台：<<iOS / Android / Web / Windows / macOS / Flutter 跨平台 / ...>>
- 版本号 / 日期 / 作者 / 状态（草稿/评审中/已定稿）

### 修订记录
| 版本 | 日期 | 修订人 | 修订内容 |

### 目录
自动生成

### 第一章：设计概述
1.1 产品背景
1.2 设计目标
1.3 设计原则
1.4 设计范围与边界
1.5 目标平台与跨平台策略
    - 覆盖平台清单（移动端 / Web / PC 客户端）
    - 各平台设计语言基底（Material Design 3 / Apple HIG / Fluent Design / macOS HIG）
    - 跨平台一致性策略：哪些保持一致（品牌色/图标风格/Design Token），哪些允许差异（导航模式/信息密度/窗口管理）
    - 平台优先级：主平台 vs 适配平台
1.6 设计参考与竞品分析
1.7 术语定义

### 第二章：信息架构
2.1 产品结构图（Mermaid）
2.2 页面清单总表（穷举版，覆盖 22 类页面，含桌面端专属页面类型）
2.3 导航结构设计
    - 移动端导航：底部 Tab / 顶部导航
    - 桌面端导航：侧边栏（可折叠）/ 顶部菜单栏 / 工具栏
    - 各平台导航映射关系（移动端 Tab 1 = 桌面端侧边栏第 1 项）
2.4 全局组件说明
2.5 页面穷举校验记录（含桌面端生命周期维度）

### 第三章：用户流程
3.1 核心流程总览
3.2 各流程详细说明（含流程图和步骤表）
3.3 异常流程处理规范
3.4 桌面端专属流程（安装/自动更新/窗口管理/托盘行为，如适用）

### 第四章：页面交互说明
（按模块分节）

**4.x <<模块名称>>**
  4.x.1 P01 <<页面名>>
    包含章节：概述 / 布局结构 / 组件列表 / 交互规格 / 页面状态 / 动效规格 / 数据策略 / 适配规则 / 微交互
    核心交互要点：<<1-2 句，描述最重要的交互行为>>
    桌面端补充（跨平台时）：悬停态 / 右键菜单 / 快捷键 / 拖拽 / 焦点顺序
    多窗口：<<是（可独立窗口）/ 否>>
    规格文件：`docs/ixd/phase4-page-specs/page-P01.md`

### 第五章：组件规范
5.1 设计 Token（共享）
    → 结构性 Token（间距/圆角/阴影层级/动效时长与曲线）：阶段五定义
    → 颜色 Token hex 值 / 字体族选择：阶段六定义后回填至 phase5-components.md
    注：阶段六回填完成后，phase5-components.md 即为完整 Token 集合，此章节以该文件为准
5.2 基础组件规范（含各组件的桌面端状态：悬停态 / 聚焦态 / 拖拽态）
5.3 业务组件规范
5.4 桌面端专属组件规范（侧边栏/工具栏/菜单栏/状态栏/分割面板/命令面板/系统托盘面板）
5.5 响应式适配规范
    - 断点体系（手机/平板/桌面小窗口/桌面标准/桌面宽屏）
    - 桌面端窗口规范（最小尺寸/默认尺寸/标题栏样式）
    - 信息密度分级（移动端标准密度 vs 桌面端紧凑密度）

### 第六章：视觉设计
6.1 色彩系统（品牌色/功能色/中性色/渐变）
6.2 字体系统（字体选择/字号阶梯/排版规则/桌面端字体降级方案：Windows 雅黑链 + macOS 苹方链）
6.3 图标系统（风格/尺寸/图标库/桌面端专属尺寸：侧边栏/工具栏/托盘/菜单项）
6.4 插图系统（风格/使用场景/素材清单）
6.5 阴影与层级
6.6 圆角系统
6.7 间距与栅格（含桌面端栏数/最大内容宽度/紧凑间距）
6.8 页面类型视觉标注 + 视觉例外表
    - 八-A：每种页面类型各一个代表页标注（氛围/背景/导航栏/卡片/CTA/特殊元素）
    - 八-B：视觉例外表（仅记录偏离类型代表页的页面，7种例外类型）
    - 跨平台产品：每个类型标注含"桌面端差异"子节
6.9 深色模式方案（含桌面端跟随系统主题策略/Windows 高对比度支持）
6.10 动效视觉规范（含桌面端窗口动画/减少动效系统设置尊重）

### 第七章：全局交互规范
7.1 手势规范（移动端）
7.2 鼠标与键盘交互规范（桌面端）
    - 全局快捷键映射表（功能 → macOS 快捷键 → Windows 快捷键）
    - Tab 焦点导航顺序规则
    - 右键菜单触发区域与菜单项规范
    - 拖拽交互规范（可拖拽元素/放置区域指示/拖拽预览）
7.3 转场动画规范（移动端 slide vs 桌面端 fade）
7.4 反馈机制（Toast / Alert / SnackBar / 桌面端系统通知）
7.5 加载策略（骨架屏 / 下拉刷新 / 分页加载）
7.6 异常处理（网络错误 / 服务异常 / 权限不足）
7.7 权限管理交互
7.8 推送通知交互（移动端推送 / 桌面端系统通知）
7.9 深色模式适配规则（含跟随系统主题）
7.10 桌面端窗口管理规范（最小化/最大化/全屏/分屏/托盘最小化/多窗口/窗口位置记忆）

### 附录
A. 原型演示链接
   - 单平台产品：原型 HTML 链接
   - 跨平台产品：移动端原型 (prototype-mobile.html) + 桌面端原型 (prototype-desktop.html)
B. 视觉样例板（Style Tile）
C. 设计资源清单（图标库/插图/字体文件）
D. 开发交接注意事项
   - 跨平台共享逻辑与平台差异清单
   - 各平台特殊实现提醒（Windows 标题栏/macOS 红绿灯/系统托盘/文件关联/协议唤起）
   - Design Token 到各技术栈的映射（CSS 变量 / Flutter ThemeData / Swift Asset Catalog / WPF ResourceDictionary）
E. 页面穷举清单（完整版，含桌面端专属页面）
F. 快捷键映射总表（桌面端，macOS + Windows 双列对照）

## 输出格式
请输出为结构化 Markdown。如需 Word 文档（.docx），请告知。
```

### 阶段八最终质量关卡（强制）

`phase8-document.md` 生成后，必须通过以下验证流程，工作流程才算完成。**此步骤不可跳过。**

#### 验证流程

**步骤一：各阶段质量清单核查**

用各阶段质量清单逐一核查 `phase8-document.md` 的对应章节（不是检查各阶段源文件本身）：

| 阶段质量清单 | 核查 phase8 文档的章节 |
|------------|----------------------|
| 阶段一清单 | 第一章（设计概述：背景/目标/原则/范围/平台策略） |
| 阶段二清单 | 第二章（信息架构：站点图/页面清单/导航/穷举校验） |
| 阶段三清单 | 第三章（用户流程：核心流程/决策节点/异常处理） |
| 阶段四清单 | 第四章（页面交互索引：所有页面列出/规格文件引用/核心要点） |
| 阶段五清单 | 第五章（组件规范：设计 Token/基础组件/桌面端组件/响应式） |
| 阶段六清单 | 第六章（视觉设计：色彩/字体/图标/类型标注8A+8B/深色模式） |
| 阶段七清单 | 附录 A（原型演示：文件存在/所有页面实现/交互完整性） |
| 阶段八清单 | 完整文档（所有章节完整/无占位符/交叉引用正确/术语一致） |

**步骤二：多视角评审**（参见附录 B「角色切换法」，6 个视角）

**步骤三：保存评审报告**至 `docs/ixd/phase8-review-round-N.md`

**步骤四：Pass / Fail 判定**

| 条件 | 结论 |
|------|------|
| 所有质量清单通过 且 评审无 P0/P1 问题 | ✅ **PASS** — 工作流程完成 |
| 任一清单不通过 或 评审有 P0/P1 问题 | ❌ **FAIL** — 进入修复循环 |

P2（建议类）问题不阻塞，记录于报告留待后续迭代。

#### 修复循环

评审失败时：

1. 列出所有阻塞项，追溯至各阶段源文件：
   - 交互问题 → 修改 `docs/ixd/phase4-page-specs/<page-id>.md`
   - 组件问题 → 修改 `docs/ixd/phase5-components.md`
   - 视觉问题 → 修改 `docs/ixd/phase6-visual.md`
   - 流程问题 → 修改 `docs/ixd/phase3-userflows.md`
   - 架构/导航问题 → 修改 `docs/ixd/phase2-architecture.md`
2. 同步更新源文件 **和** `phase8-document.md` 对应章节
3. 以 Round N+1 重新执行步骤一至四

**三轮硬阻断**：若第 3 轮评审仍 FAIL，输出阻塞报告并终止：

```markdown
⛔ 评审失败（第 3/3 轮），工作流程阻断。以下阻塞项需人工干预：
1. <<阻塞项 1>> — 建议从阶段 N 重新开始
2. <<阻塞项 2>> — 建议从阶段 N 重新开始

修复后，告知"从阶段 N 继续"即可恢复工作流程。
```

#### 修复循环提示词

```
请对 `docs/ixd/phase8-document.md` 执行最终质量关卡：

第一步：用各阶段质量清单（阶段一至八）逐一核查文档对应章节，输出每章节的通过/不通过结果。
第二步：从产品经理、资深设计师、前端工程师、QA工程师、视障用户、品牌设计师 6 个视角进行评审，每个视角给出 2 个亮点和 2 个改进建议。
第三步：保存评审报告至 `docs/ixd/phase8-review-round-<<N>>.md`。
第四步：输出 Pass/Fail 判定。若 Fail，列出所有阻塞项并说明源文件修改路径。
```

---

## 附录 A：一次性完整 Prompt（精简版 v2.0）

如果不需要分阶段执行，可以使用以下一次性提示词：

```
你是一位资深交互+视觉设计师。请基于以下产品需求，输出完整的设计方案。

## 产品信息
- 名称：<<产品名称>>
- 平台：<<iOS/Android/Web/Windows/macOS/跨平台>>
- 定位：<<产品一句话描述>>
- 目标用户：<<用户画像简述>>
- 核心功能：<<3-5 个核心功能>>
- 设计语言：<<Material Design / Apple HIG / Fluent Design / macOS HIG / 自定义>>
- 品牌调性：<<3-5 个关键词>>
- 竞品参考：<<1-2 个竞品>>

## 请按以下顺序输出

1. **设计上下文**：产品理解、设计挑战、设计原则（简洁）
2. **信息架构**：穷举版页面清单表 + Mermaid 结构图
3. **核心流程**：重要任务的 Mermaid 流程图 + 步骤表
4. **页面交互说明**：全部页面的索引目录（规格文件引用 + 核心交互要点），详细内容见 `phase4-page-specs/`
5. **组件规范概要**：设计 Token + 关键组件规范
6. **视觉设计方案**：色彩系统 + 字体系统 + 图标/插图方向 + 深色模式 + 页面类型视觉标注（八-A）+ 视觉例外表（八-B）
7. **HTML 原型**：根据穷举版页面清单，全部页面的可交互高保真原型代码（融合视觉方案）

## 质量要求
- 交互说明的颗粒度要达到开发可直接实现的程度
- 覆盖所有页面状态（默认/加载/空/错误/无权限）
- 视觉方案需包含 Light + Dark 双模式
- 色彩需通过 WCAG AA 无障碍校验
- 考虑异常流程和边界情况
- 使用真实感的模拟数据
```

---

## 附录 B：辅助提示词工具箱

### 竞品交互分析

```
请分析 <<竞品名称>> 的 <<功能模块>> 交互设计：
1. 信息架构：该功能的页面结构
2. 核心流程：完成主要任务的步骤
3. 交互亮点：值得借鉴的交互细节
4. 视觉特色：色彩/字体/图标/动效的设计特点
5. 不足之处：可以改进的交互和视觉问题
6. 设计启发：我们的产品可以借鉴什么
```

### 交互走查清单

```
请对 <<页面名称>> 的交互设计进行走查，检查以下维度：

**基础交互**
□ 所有按钮是否有明确的点击反馈？
□ 所有输入框是否有校验规则和错误提示？
□ 关键操作是否有二次确认？
□ 不可逆操作是否有警告？
□ 手势操作是否有发现性提示？

**页面状态**
□ 页面是否覆盖了所有状态（默认/加载/空/错误/部分加载/编辑态）？
□ 加载时间超过 1 秒是否有进度指示？
□ 网络中断时是否有离线降级方案？
□ 页面返回后是否恢复滚动位置和之前的状态？

**导航与流程**
□ 返回路径是否清晰且符合预期？
□ 当前位置是否有清晰指示（高亮Tab/面包屑/标题）？
□ 跳转到外部页面后能否正确返回？
□ 多步流程中途退出是否有草稿保存/挽留提示？

**表单与输入**
□ 表单是否支持草稿自动保存/离开挽留？
□ 输入框是否支持系统自动填充（autofill）？
□ 长表单是否有分组或锚点导航？
□ 提交失败后已填内容是否保留？

**数据加载**
□ 列表是否有分页/加载更多/触底加载策略？
□ 下拉刷新是否有明确的视觉反馈和完成提示？
□ 缓存数据是否有时效标识（如"5分钟前更新"）？
□ 大数据量下是否考虑虚拟滚动/懒加载？

**内容展示**
□ 文字过长是否有截断规则（单行省略/多行省略/展开收起）？
□ 图片加载失败是否有占位/降级方案？
□ 空态文案是否有引导行动（CTA 按钮/跳转链接）？
□ 数据为零和数据未加载是否做了区分？

**视觉与品牌**
□ 文字是否满足 WCAG AA 对比度要求？
□ 视觉层级是否清晰（标题 > 正文 > 辅助文字）？
□ 品牌色使用是否克制（5-15% 面积占比）？
□ 深色模式下是否有配色适配？
□ 是否支持动态字体大小？

**触摸与点击**
□ 触摸目标是否不小于 44×44pt？（桌面端点击目标不小于 32×32px？）
□ 相邻可点击元素之间是否有足够间距（≥8px）？
□ 可点击区域是否大于视觉区域（扩大热区）？

**桌面端专属**（PC 客户端适用）
□ 是否支持完整的键盘导航（Tab/Shift+Tab/Enter/Esc）？
□ 焦点指示器是否清晰可见且样式统一？
□ 悬停态是否在所有可交互元素上有视觉反馈？
□ 右键菜单是否在合理场景提供？菜单项是否完整？
□ 窗口缩放后布局是否正常响应（不溢出/不错位）？
□ 是否支持系统级快捷键（Cmd/Ctrl+C/V/Z/A/S 等）？
□ 可拖拽元素是否有拖拽手柄或光标变化提示？
□ 拖拽过程中是否有放置区域指示和拖拽预览？
□ 多窗口场景下数据是否同步？
□ Tooltip 是否有合理延迟（显示 300-500ms / 移开即消失）？

**跨平台一致性**（跨平台产品适用）
□ 同一功能在移动端和桌面端的操作步骤是否对等？
□ 移动端手势操作在桌面端是否有对应的鼠标/键盘替代？
□ 两端的页面状态和数据是否同步一致？
□ 品牌表达（色彩/图标/插图）在两端是否统一？
```

### 交互方案 A/B 对比

```
对于 <<功能描述>> 这个交互需求，请设计两种不同的交互方案：

方案 A 偏向：<<设计倾向，如"效率优先/步骤精简">>
方案 B 偏向：<<设计倾向，如"引导优先/信息完整">>

每个方案包含：
1. 设计思路（一段话）
2. 流程图（Mermaid）
3. 关键页面布局描述
4. 视觉差异说明（如有）
5. 优劣势分析

最后给出推荐方案及理由。
```

### 微交互设计

```
请为以下场景设计微交互细节：

场景：<<如"点赞按钮"/"下单成功"/"消息发送"/"拖拽排序"/"开关切换">>

需要描述：
1. 触发条件（什么操作触发，移动端和桌面端分别说明）
2. 视觉变化（颜色/大小/形状/位置变化）
3. 动效参数（时长/曲线/延迟）
4. 声音/震动反馈（移动端震动 / 桌面端音效，如有）
5. 状态反转（如何撤销/恢复，反转动效是否与正向不同）
6. 桌面端补充（hover 预览态 / 光标变化 / 快捷键触发，如有）
7. CSS/代码伪代码（关键动画实现）
```

### 视觉风格探索

```
请为 <<产品名称>> 探索 3 种不同的视觉风格方向：

方向 A：<<风格关键词，如"科技极简">>
方向 B：<<风格关键词，如"温暖人文">>
方向 C：<<风格关键词，如"年轻潮流">>

每个方向需包含：
1. 情绪板描述（Mood Board）：3-5 个视觉意象
2. 色彩方案：主色+辅助色+中性色（含色值）
3. 字体建议：中文+英文字体搭配
4. 图标风格：线性/面性/风格描述
5. 首页视觉概念描述（文字描述视觉效果）
6. 适合人群和场景分析

最后推荐最适合本产品的方向及理由。
```

---

## 附录 C：Prompt 进阶技巧

### 1. 参照锚定法
在 Prompt 中直接引用竞品截图或设计参考：
```
参考这张截图中的交互模式和视觉风格（<<上传截图>>），
为我的 <<功能>> 设计类似但更优化的方案。
交互改进方向：<<具体要求>>
视觉差异化方向：<<具体要求>>
```

### 2. 逐层细化法
先宏观后微观，每一步确认后再深入：
```
→ 阶段一 Prompt → 确认 → 阶段二 Prompt → 确认 → ...
```
好处：避免 AI 在错误方向上走太远，每步可修正。

### 3. 约束驱动法
通过施加具体约束，逼出更有创意的方案：
```
请在以下约束下设计 <<功能>> 的交互：
- 约束 1：用户完成任务不超过 3 步
- 约束 2：首屏不出现任何弹窗
- 约束 3：不使用传统的表单输入方式
- 约束 4：适配单手操作
- 约束 5：只使用两种颜色（主色+中性色）
```

### 4. 角色切换法
让 AI 从不同角色视角审视设计：
```
现在请分别从以下角色的视角，评价这个交互和视觉方案：
1. 产品新手用户（第一次使用）
2. 产品重度用户（每天使用 10+ 次）
3. 视障用户（依赖屏幕阅读器）
4. 前端开发工程师（负责实现）
5. QA 测试工程师（负责测试）
6. 品牌设计师（关注视觉一致性和品牌调性）
每个角色给出 2 个赞同点和 2 个改进建议。
```

### 5. 迭代优化法
对已有方案做针对性优化：
```
基于当前的 <<页面名>> 设计方案，请做以下优化：
1. 减少用户认知负担：<<具体要求>>
2. 提升操作效率：<<具体要求>>
3. 增强情感化设计：<<具体要求>>
4. 提升视觉品质：<<具体要求>>
输出优化前后的对比说明。
```

---

## 附录 D：成果物与工具功能对照表（v2.0）

| 墨刀/Figma 功能 | AI 对应产出 | 提示词阶段 |
|----------------|------------|-----------|
| 页面树 | 信息架构 Mermaid 图 + 穷举页面清单表 | 阶段二 |
| 流程图 | Mermaid flowchart 用户流程图 | 阶段三 |
| 页面设计 | 文本布局描述 + HTML 原型 | 阶段四/七 |
| 交互连线 | 页面跳转关系表 + 流程图 | 阶段三/四 |
| 交互标注 | 组件交互行为详细说明（含桌面端悬停/键盘/右键） | 阶段四 |
| 状态标注 | 页面状态流转表 | 阶段四 |
| 组件库 | 组件规范文档（含桌面端状态和交互） | 阶段五 |
| **色彩样式** | **色彩系统文档 + CSS 变量** | **阶段六** |
| **字体样式** | **字体系统阶梯 + 排版规则（含桌面端字体降级）** | **阶段六** |
| **设计稿/视觉标注** | **页面类型视觉标注（八-A）+ 视觉例外表（八-B）+ Style Tile** | **阶段六** |
| **深色模式** | **Dark Mode 色彩对照表（支持跟随系统主题）** | **阶段六** |
| **图标/插图管理** | **图标规范 + 插图场景清单（含桌面端托盘图标）** | **阶段六** |
| 原型演示 | 可交互 HTML 原型（web-artifacts-builder: React + shadcn/ui，单文件 HTML） | 阶段七 |
| 设计文档导出 | 完整交互与视觉设计说明书 | 阶段八 |
| 评审协作 | Quality Checklist 多角色评审 | 附录 B |

---

## 附录 E：页面穷举参考清单

以下是常见 App 产品的页面穷举模板，设计时逐项对照确认是否需要：

### 一、启动与引导
- [ ] 启动闪屏页 (Splash Screen)
- [ ] 新手引导页 (Onboarding，通常 3-5 页轮播)
- [ ] 功能更新介绍页 (What's New)
- [ ] 权限申请引导页 (通知权限/定位权限/相册权限)
- [ ] 安装向导页 (桌面端：安装路径/组件选择/快捷方式创建)
- [ ] 首次配置向导 (桌面端：语言/主题/账号登录/数据迁移)

### 二、账户体系
- [ ] 登录页 (手机号/邮箱/用户名)
- [ ] 第三方登录页 (微信/Apple/Google 授权)
- [ ] 注册页 (独立注册或与登录合并)
- [ ] 验证码输入页
- [ ] 忘记密码/重置密码页
- [ ] 修改密码页
- [ ] 绑定手机号页
- [ ] 实名认证页 (如需)
- [ ] 账号注销页

### 三、核心导航 (L1 页面)
- [ ] 首页/工作台 (聚合页)
- [ ] 分类/发现页
- [ ] 消息/通知中心
- [ ] 购物车/收藏夹 (如为电商)
- [ ] 个人中心/我的

### 四、内容浏览
- [ ] 内容列表页 (各种列表：订单/文章/商品/...)
- [ ] 内容详情页 (各种详情)
- [ ] 搜索页 (搜索框+历史+热搜+联想)
- [ ] 搜索结果页 (结果列表+筛选)
- [ ] 筛选面板/页面
- [ ] 排序面板
- [ ] 图片/视频预览页 (全屏查看)
- [ ] 地图页 (如涉及位置)

### 五、内容创建与编辑
- [ ] 内容创建/发布页
- [ ] 内容编辑页
- [ ] 富文本编辑器
- [ ] 图片/视频选择与裁剪
- [ ] 草稿箱

### 六、表单与流程
- [ ] 单页表单 (编辑资料/填写信息)
- [ ] 多步表单/向导页 (带步骤指示器)
- [ ] 地址选择/编辑页
- [ ] 日期时间选择页
- [ ] 支付页/收银台 (如涉及交易)

### 七、操作结果
- [ ] 操作成功页
- [ ] 操作失败页
- [ ] 支付成功页
- [ ] 提交等待/审核中页

### 八、消息与通信
- [ ] 消息列表/会话列表
- [ ] 聊天详情页
- [ ] 系统通知列表
- [ ] 通知详情页

### 九、个人中心子页
- [ ] 个人资料/编辑资料
- [ ] 我的订单/记录
- [ ] 我的收藏/关注
- [ ] 钱包/余额
- [ ] 优惠券/会员
- [ ] 邀请好友/分享

### 十、设置与系统
- [ ] 设置主页
- [ ] 账户安全
- [ ] 通知设置
- [ ] 隐私设置
- [ ] 通用设置 (语言/字体大小/深色模式)
- [ ] 快捷键设置 (桌面端：自定义快捷键映射)
- [ ] 代理/网络设置 (桌面端)
- [ ] 存储/下载路径设置 (桌面端)
- [ ] 开机自启动/后台运行设置 (桌面端)
- [ ] 缓存清理
- [ ] 关于我们
- [ ] 用户协议
- [ ] 隐私政策
- [ ] 帮助与反馈/FAQ
- [ ] 联系客服 (客服入口)
- [ ] 版本更新

### 十一、异常与兜底
- [ ] 404 页面不存在
- [ ] 网络错误页
- [ ] 服务维护页
- [ ] 版本过低强制更新页
- [ ] 账号异常/被封禁页
- [ ] 功能暂不可用页

### 十二、覆盖层 (Overlay)
- [ ] 确认弹窗 (Dialog)
- [ ] 操作菜单 (Action Sheet)
- [ ] 底部面板 (Bottom Sheet)
- [ ] 全屏浮层
- [ ] Tooltip / Popover 提示
- [ ] 图片裁剪浮层
- [ ] 分享面板

### 十三、桌面端专属（PC 客户端适用）

#### 窗口与系统集成
- [ ] 主窗口/工作区（含工具栏、侧边栏、内容区多面板布局）
- [ ] 自绘标题栏（Windows 风格 / macOS 红绿灯风格）
- [ ] 系统托盘/菜单栏弹出面板（最小化到托盘后的快捷面板）
- [ ] 多窗口场景（如设置窗口独立于主窗口）
- [ ] 窗口最小化/最大化/全屏/分屏状态适配

#### 安装与更新
- [ ] 安装引导/首次启动向导
- [ ] 自动更新提示 (有新版本可用)
- [ ] 更新下载进度页
- [ ] 更新完成/重启提示
- [ ] 版本降级/回滚页（如有）

#### 桌面端导航与操作
- [ ] 侧边栏导航面板（可折叠/展开）
- [ ] 顶部菜单栏（File/Edit/View/Help 等，macOS 原生菜单栏）
- [ ] 右键上下文菜单（不同区域的右键菜单项）
- [ ] 命令面板 / 快捷搜索（Cmd+K / Ctrl+K 唤起）
- [ ] 快捷键设置/自定义页
- [ ] 键盘快捷键参考面板（Cmd+/ 或 Help 菜单）

#### 桌面端设置
- [ ] 偏好设置窗口（通用/外观/快捷键/网络/存储等分类 Tab）
- [ ] 代理/网络设置（如需）
- [ ] 存储路径/下载路径设置
- [ ] 开机自启动设置
- [ ] 系统权限管理（文件访问/通知/辅助功能等）

#### 文件与数据
- [ ] 文件导入/打开页（支持拖拽导入）
- [ ] 文件导出/另存为页
- [ ] 最近文件/项目列表
- [ ] 本地数据管理/清理

-