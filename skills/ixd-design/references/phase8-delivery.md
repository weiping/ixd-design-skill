# Phase 8: Design Delivery Document

## Objective

Package all design deliverables from Phases 1-7 into a formal, structured document suitable for handoff to development teams, stakeholders, and design reviews. Supports single-platform (mobile-only) and cross-platform (mobile + desktop) projects.

## Output Formats

| Format | Tool | Best For |
|--------|------|----------|
| Markdown (.md) | Direct output | Quick review, version control, wiki |
| Word (.docx) | Use docx skill | Formal delivery, client handoff |
| PDF (.pdf) | Use pdf skill | Read-only distribution |
| HTML report | Single-file HTML | Interactive viewing with embedded diagrams |

Default to Markdown first for review, then convert to .docx if the user needs formal delivery.

---

## Document Structure

[English]
```
<<Product Name>> Interaction Design Specification

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cover Page
  - Product name
  - Document type: Interaction Design Specification
  - Version: v1.0
  - Date: <<YYYY-MM-DD>>
  - Author: <<author name>>
  - Status: Draft / Under Review / Finalized
  - Target Platforms: iOS / Android / macOS / Windows / Web (check as applicable)

Revision History
  | Version | Date | Author | Changes |

Table of Contents (auto-generated)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chapter 1: Design Overview
  1.1 Product Background
      → Phase 1: Product design summary
  1.2 Design Goals
      → Phase 1: Goals derived from design challenges
  1.3 Design Principles
      → Phase 1: Design principles list
  1.4 Design Scope
      → Features and pages covered in this design
  1.5 Target Platforms and Cross-Platform Strategy
      - Platform list (iOS / Android / macOS / Windows / Web)
      - Design language baseline (e.g., iOS HIG + Material baseline)
      - Consistency vs differentiation strategy (what stays consistent, what varies by platform)
      - Platform priority (which platform is the primary design baseline)
  1.6 Design References
      → Phase 1: Competitor references and learnings
  1.7 Terminology
      → Product-specific terms and abbreviations

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chapter 2: Information Architecture
  2.1 Product Structure Diagram
      → Phase 2: Mermaid sitemap (convert to image for docx)
  2.2 Page Inventory (exhaustive, covering 22 page types, including desktop-exclusive)
      → Phase 2: Complete page inventory table
  2.3 Navigation Structure
      - Mobile navigation: Tab bar design, nav bar behavior
      - Desktop navigation: Sidebar design, top menu bar behavior
  2.4 Navigation Mapping
      → Mobile nav items ↔ Desktop nav items correspondence
      → Which mobile tabs merge into desktop sidebar groups
      → Desktop-only navigation entries (e.g., menu bar, tray menu)
  2.5 Global Components
      → Phase 2: Global component inventory
  2.6 Exhaustiveness Check
      → Coverage check for all page types
      → Desktop lifecycle pages: install wizard, auto-update, window management, tray menu

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chapter 3: User Flows
  3.1 Core Flows Overview
      → Brief list of all flows
  3.2 Flow Details
      → Phase 3: Expand by flow number
      → Each flow: Mermaid flowchart + step table + decision points
  3.3 Exception Handling Specifications
      → General exception handling rules (network/permission/timeout)
  3.4 Desktop-Exclusive Flows
      - Install/uninstall flow (install wizard steps, uninstall confirmation and data cleanup)
      - Auto-update flow (check update, download, install restart, silent update strategy)
      - Window management flow (multi-window open/close/switch/arrange)
      - Tray behavior (minimize to tray, tray menu items, tray notification bubble)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chapter 4: Page Interaction Specifications
  (Organized by module)

  This chapter provides a **page index** of all interaction specs.
  Full content lives in the source files under `doc/ixd/phase4-page-specs/` — refer there for complete details.
  This avoids document bloat while ensuring all pages are traceable.

  4.0 Page Interaction Index

  | Page ID | Page Name | Module | Page Type | Spec File | Key Interactions |
  |---------|-----------|--------|-----------|-----------|-----------------|
  | P01 | <<Page Name>> | <<Module>> | <<Hub/List/…>> | `phase4-page-specs/batch-1.md § P01` | <<1-sentence summary>> |
  | P02 | <<Page Name>> | <<Module>> | <<List>> | `phase4-page-specs/batch-1.md § P02` | <<1-sentence summary>> |
  | … | … | … | … | … | … |

  4.x <<Module Name>>
    4.x.1 P01 <<Page Name>>
      Spec: `doc/ixd/phase4-page-specs/batch-N.md § P01`
      Sections: Overview / Layout / Components / Interactions / States / Motion / Data / Adaptation / Micro-interactions
      Key interaction highlights: <<1-2 sentences on most important behaviors>>
      Desktop additions (if cross-platform):
        - Hover / Context menu / Keyboard shortcuts / Drag / Focus order
      Multi-window: <<yes: independent window / no>>
    4.x.2 P02 <<Page Name>>
      Spec: `doc/ixd/phase4-page-specs/batch-N.md § P02`
      …

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chapter 5: Component Specifications
  5.1 Design Tokens (Structural)
      → Spacing / Border Radius / Shadow levels / Motion timing & curves: Phase 5
      → Color token values (hex) / Font family selections: Phase 6 (back-filled into phase5-components.md)
      Note: When Phase 6 back-fill is complete, phase5-components.md contains the full token set.
  5.2 Basic Components
      → Phase 5: Button/Input/Selector, etc.
  5.3 Feedback Components
      → Phase 5: Toast/Dialog/Panel, etc.
  5.4 Desktop-Exclusive Component Specifications
      - Window title bar (custom title bar vs native, draggable area, button layout)
      - Sidebar navigation (expand/collapse, width, grouping, icon+text mode)
      - Context menu (menu item structure, dividers, submenus, disabled state)
      - Toolbar (icon button groups, dividers, overflow menu, custom arrangement)
      - Resizable split pane (drag divider, min/max width, remember last position)
      - Tooltip (trigger: hover delay, position strategy, rich text tooltip)
      - System tray menu (menu items, status icon, notification bubble)
  5.5 Responsive and Platform Adaptation
      → Phase 5: Breakpoint definitions and layout strategy
      → Desktop window specifications:
          - Minimum window size (recommended min width/height)
          - Default window size (first launch size)
          - Fullscreen layout (content max width in fullscreen/maximized)
      → Information density levels:
          - Compact: for professional tool applications
          - Comfortable: default density
          - Spacious: for content consumption applications

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chapter 6: Visual Design
  6.1 Color System
      - Brand colors (Primary / Secondary / Accent)
      - Semantic colors (Success / Warning / Error / Info)
      - Neutral scale (N-900 → N-0)
      - Gradient schemes (if any)
      - Color accessibility check (contrast table)

  6.2 Typography System
      - Font selection (Chinese/English/Numeric/Code monospace + rationale)
      - Desktop font fallback:
          Windows: Microsoft YaHei → SimHei → sans-serif
          macOS: PingFang SC → Hiragino Sans GB → sans-serif
      - Type scale (8 levels with size/line-height/weight)
      - Typography rules (line width/paragraph spacing/mixed content/truncation)

  6.3 Icon System
      - Style definition (outline/filled/duotone/rounded + stroke width/grid)
      - Size specifications (mobile + desktop-exclusive: sidebar/toolbar/tray/menu)
      - Icon library source + custom icon list

  6.4 Illustration System
      - Illustration style (style keywords/character style/color rules)
      - Usage scenarios (empty state/onboarding/success/error/promotional)
      - Asset specifications (size/copy pairing)

  6.5 Shadow and Elevation
      - Elevation Level 0-4 (Light + Dark shadow values)
      - Usage per level

  6.6 Border Radius System
      - Radius scale (none/sm/md/lg/xl/2xl/full)
      - Mapping to component types

  6.7 Spacing and Grid
      - 4px base spacing system
      - Grid (including desktop 12-16 columns / max content width / compact spacing)
      - Page margin rules

  6.8 Page-Type Visual Annotations + Exception Table
      - 8A: One representative page annotated per page type present (Hub/List/Detail/Form/Auth/Settings/… up to 20 types)
            Each annotation covers: atmosphere, background, nav bar, card style, CTA style, brand elements
      - 8B: Visual Exception Table — only pages that deviate from their type representative
            Exception types: Background / Color override / Layout override / Typography override / Illustration / Dark forced / Chrome hidden
      - Cross-platform products: each type annotation includes a Desktop Differences sub-section
            (title bar/sidebar width/information density/window chrome)

  6.9 Dark Mode Scheme
      - Adaptation strategy (full/core/follow system)
      - Color mapping table (Light ↔ Dark complete reference)
      - Image processing strategy
      - Desktop: follow system theme auto-switch / Windows high contrast support

  6.10 Motion Visual Specifications
      - Motion principles (2-3 items)
      - Easing curves (Standard / Decelerate / Accelerate / Spring)
      - Duration specifications (micro/component/page/complex/window animation)
      - Desktop motion notes (shorter duration/respect reduced motion setting/drag instant response)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chapter 7: Global Interaction Specifications
  7.1 Gesture Specifications (Mobile)
      - Pull to refresh, swipe to delete, long press, double tap, pinch to zoom
      - Gesture conflict resolution rules

  7.2 Mouse and Keyboard Interaction Specifications (Desktop)
      - Global keyboard shortcut mapping table (macOS Cmd / Windows Ctrl dual-column reference)
      - Tab focus order rules (focus ring, skip decorative elements, focus trap handling)
      - Context menu specifications (context-relevant menu items, dividers, submenus)
      - Drag specifications (drag handle, drop zones, visual feedback, cancel drag)

  7.3 Transition Animation Specifications
      - Mobile: Push / Present / Slide, spring curves
      - Desktop: Fade / Crossfade, shorter duration, more restrained

  7.4 Feedback Mechanisms
      - Toast: usage scenarios, duration, position
      - Dialog: confirmation dialog, input dialog, permission dialog
      - SnackBar: undo-able operations
      - Loading: in-button / full-page / skeleton screen
      - Desktop system notifications: OS-level notifications (macOS Notification Center / Windows Action Center)

  7.5 Loading Strategy
      - Skeleton screen usage guidelines
      - Pull to refresh behavior
      - Pagination (page number / cursor / trigger condition)
      - Offline caching strategy

  7.6 Exception Handling
      - Network disconnected: <<handling method>>
      - Server error (5xx): <<handling method>>
      - Request timeout: <<handling method>>
      - Data format exception: <<fallback plan>>

  7.7 Permission Management
      - System permission request timing and copy
      - Business permission insufficient handling
      - Login session expired handling

  7.8 Push Notifications
      - Mobile push notifications (notification types, priority, tap actions, in-app notification style)
      - Desktop system notifications (OS notification center integration, Dock/taskbar badge, notification tap behavior)

  7.9 Dark Mode
      - Color mapping rules
      - Image handling (reduce brightness/use dark assets)
      - Special component adaptation
      - Desktop: follow system theme auto-switch

  7.10 Desktop Window Management Specifications
      - Minimize/maximize/fullscreen/split-screen behavior
      - Tray minimization (close window vs minimize to tray strategy)
      - Multi-window management (window list, window switching, window menu)
      - Window position and size memory (restore last window state on next launch)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Appendix
  A. Prototype Demo
      - Single-platform project: online prototype link
      - Cross-platform project: mobile prototype link + desktop prototype link
      - Or attached prototype files

  B. Visual Style Samples
      - Core page visual mockup thumbnails
      - Light/dark mode comparison
      - Mobile/desktop comparison

  C. Design Asset Inventory
      - Icon library source
      - Illustration assets
      - Font files

  D. Development Handoff Notes
      - Annotation unit explanation (px/pt/dp conversion)
      - Animation implementation suggestions (recommended libraries/frameworks)
      - API data format suggestions
      - Cross-platform shared logic vs differences
      - Platform-specific implementation notes:
          Windows: custom title bar implementation, system tray icon
          macOS: Traffic lights customization, file association
          Web: responsive breakpoint implementation
      - Design Token mapping:
          Web: CSS Custom Properties
          Flutter: ThemeData
          iOS/macOS: Swift Asset Catalog
          Windows: WPF ResourceDictionary

  E. Page Exhaustiveness Checklist (including desktop-exclusive pages)
      → Complete numbered list of all pages, for cross-reference

  F. Keyboard Shortcut Mapping Summary
      → macOS + Windows dual-column reference table
      → Grouped by function: navigation/editing/view/file/help
```

[中文]
```
《<<产品名称>> 交互设计说明书》

━━━━━━━━━━━━━━━━━━━━━━━━━━━

封面
  - 产品名称
  - 文档类型：交互设计说明书
  - 版本：v1.0
  - 日期：<<YYYY-MM-DD>>
  - 作者：<<作者名>>
  - 状态：草稿 / 评审中 / 已定稿
  - 目标平台：iOS / Android / macOS / Windows / Web（按实际勾选）

修订记录
  | 版本 | 日期 | 修订人 | 修订内容 |

目录（自动生成）

━━━━━━━━━━━━━━━━━━━━━━━━━━━

第一章 设计概述
  1.1 产品背景
      → Phase 1: 产品设计摘要
  1.2 设计目标
      → Phase 1: 从设计挑战推导出的目标
  1.3 设计原则
      → Phase 1: 设计原则列表
  1.4 设计范围
      → 本次设计覆盖的功能模块和页面范围
  1.5 目标平台与跨平台策略
      - 平台清单（iOS / Android / macOS / Windows / Web）
      - 设计语言基底（e.g., iOS HIG + Material baseline）
      - 一致性 vs 差异策略（哪些保持一致，哪些按平台差异化）
      - 平台优先级（以哪个平台为设计主基准）
  1.6 设计参考
      → Phase 1: 竞品参考和借鉴点
  1.7 术语定义
      → 产品特有的术语和缩写

━━━━━━━━━━━━━━━━━━━━━━━━━━━

第二章 信息架构
  2.1 产品结构图
      → Phase 2: Mermaid sitemap (转为图片嵌入 docx)
  2.2 页面清单（穷举版，覆盖22类页面，含桌面端专属）
      → Phase 2: 完整页面清单表
  2.3 导航结构
      - 移动端导航：Tab bar 设计、导航栏行为
      - 桌面端导航：Sidebar 设计、顶部菜单栏行为
  2.4 导航映射关系
      → 移动端导航项 ↔ 桌面端导航项的对应关系
      → 哪些移动端 Tab 合并为桌面端 Sidebar 分组
      → 桌面端独有的导航入口（如菜单栏、托盘菜单）
  2.5 全局组件
      → Phase 2: 全局组件清单
  2.6 穷举校验
      → 覆盖所有页面类型的完整性检查
      → 桌面端生命周期页面：安装向导、自动更新、窗口管理、托盘菜单

━━━━━━━━━━━━━━━━━━━━━━━━━━━

第三章 用户流程
  3.1 核心流程总览
      → 所有流程的简要清单
  3.2 流程详述
      → Phase 3: 按流程编号逐一展开
      → 每个流程: Mermaid 流程图 + 步骤表 + 决策点
  3.3 异常处理规范
      → 通用异常处理规则（网络/权限/超时）
  3.4 桌面端专属流程
      - 安装/卸载流程（安装向导步骤、卸载确认与数据清理）
      - 自动更新流程（检查更新、下载、安装重启、静默更新策略）
      - 窗口管理流程（多窗口打开/关闭/切换/排列）
      - 托盘行为（最小化到托盘、托盘菜单项、托盘通知气泡）

━━━━━━━━━━━━━━━━━━━━━━━━━━━

第四章 页面交互说明
  （按模块分节）

  本章提供所有页面交互规格的**索引目录**。
  完整内容见源文件 `doc/ixd/phase4-page-specs/`，详细规格请查阅对应文件。
  此方式避免文档体积过大，同时确保所有页面可追溯。

  4.0 页面交互索引

  | 页面 ID | 页面名称 | 所属模块 | 页面类型 | 规格文件 | 核心交互要点 |
  |---------|----------|----------|----------|----------|------------|
  | P01 | <<页面名>> | <<模块>> | <<Hub/List/…>> | `phase4-page-specs/batch-1.md § P01` | <<一句话概述>> |
  | P02 | <<页面名>> | <<模块>> | <<List>> | `phase4-page-specs/batch-1.md § P02` | <<一句话概述>> |
  | … | … | … | … | … | … |

  4.x <<模块名称>>
    4.x.1 P01 <<页面名>>
      规格文件：`doc/ixd/phase4-page-specs/batch-N.md § P01`
      包含章节：概述 / 布局结构 / 组件列表 / 交互规格 / 页面状态 / 动效规格 / 数据策略 / 适配规则 / 微交互
      核心交互要点：<<1-2 句，描述最重要的交互行为>>
      桌面端补充（跨平台时）：悬停态 / 右键菜单 / 快捷键 / 拖拽 / 焦点顺序
      多窗口：<<是（可独立窗口）/ 否>>
    4.x.2 P02 <<页面名>>
      规格文件：`doc/ixd/phase4-page-specs/batch-N.md § P02`
      …

━━━━━━━━━━━━━━━━━━━━━━━━━━━

第五章 组件规范
  5.1 设计 Token（结构性）
      → 间距/圆角/阴影层级/动效时长与缓动曲线：Phase 5
      → 颜色 Token 值（hex）/字体家族选型：Phase 6（回填至 phase5-components.md）
      注：Phase 6 回填完成后，phase5-components.md 包含完整 Token 集合。
  5.2 基础组件
      → Phase 5: 按钮/输入框/选择器 等
  5.3 反馈组件
      → Phase 5: Toast/弹窗/面板 等
  5.4 桌面端专属组件规范
      - 窗口标题栏（自定义标题栏 vs 系统原生、拖拽区域、按钮布局）
      - 侧边栏导航（展开/折叠、宽度、分组、图标+文字模式）
      - 右键菜单（菜单项结构、分隔线、子菜单、禁用态）
      - 工具栏（图标按钮组、分隔符、溢出菜单、自定义排列）
      - 可调节分割面板（拖拽分割线、最小/最大宽度、记忆上次位置）
      - Tooltip（触发方式: hover 延迟、位置策略、富文本 Tooltip）
      - 系统托盘菜单（菜单项、状态图标、气泡通知）
  5.5 响应式与平台适配
      → Phase 5: 断点定义和布局策略
      → 桌面端窗口规格:
          - 最小窗口尺寸（推荐最小宽高）
          - 默认窗口尺寸（首次启动尺寸）
          - 全屏布局（全屏/最大化时的内容区最大宽度）
      → 信息密度分级:
          - Compact（紧凑）: 适用于专业工具类应用
          - Comfortable（舒适）: 默认密度
          - Spacious（宽松）: 适用于内容消费类应用

━━━━━━━━━━━━━━━━━━━━━━━━━━━

第六章 视觉设计
  6.1 色彩系统
      - 品牌色（Primary / Secondary / Accent）
      - 功能色（Success / Warning / Error / Info）
      - 中性色阶（N-900 → N-0）
      - 渐变方案（如有）
      - 色彩无障碍校验（对比度表）

  6.2 字体系统
      - 字体选择（中文/英文/数字/代码等宽 + 选择理由）
      - 桌面端字体降级方案:
          Windows: Microsoft YaHei → SimHei → sans-serif
          macOS: PingFang SC → Hiragino Sans GB → sans-serif
      - 字号/行高/字重阶梯（8 级）
      - 排版规则（行宽/段间距/中英混排/截断规则）

  6.3 图标系统
      - 风格定义（线性/面性/双色/圆润 + 线宽/网格）
      - 尺寸规范（移动端 + 桌面端专属尺寸：侧边栏/工具栏/托盘/菜单项）
      - 图标库来源 + 自定义图标清单

  6.4 插图系统
      - 插图风格（风格关键词/人物风格/色彩规则）
      - 使用场景清单（空态/引导/成功/异常/运营）
      - 素材规格（尺寸/文案搭配）

  6.5 阴影与层级
      - Elevation Level 0-4（Light + Dark 阴影值）
      - 各层级使用场景

  6.6 圆角系统
      - 圆角阶梯（none/sm/md/lg/xl/2xl/full）
      - 与组件类型的映射

  6.7 间距与栅格
      - 4px 基础间距系统
      - 栅格（含桌面端 12-16 栏 / 最大内容宽度 / 紧凑间距）
      - 页面边距规则

  6.8 页面类型视觉标注 + 视觉例外表
      - 八-A：对产品中存在的每种页面类型各标注一个代表页（Hub/List/Detail/Form/Auth/Settings/… 最多 20 种）
              每个标注含：整体氛围、背景处理、导航栏、卡片样式、CTA 样式、特殊视觉元素
      - 八-B：视觉例外表 — 只记录与类型代表页有偏差的页面
              例外类型：背景 / 颜色覆盖 / 布局覆盖 / 字体覆盖 / 插画全屏 / 强制深色 / 导航隐藏
      - 跨平台产品：每个类型标注含"桌面端差异"子节
              （标题栏/侧边栏宽度/信息密度/窗口 chrome）

  6.9 深色模式方案
      - 适配策略（完整/核心/跟随系统）
      - 颜色映射表（Light ↔ Dark 完整对照）
      - 图片处理策略
      - 桌面端: 跟随系统主题自动切换 / Windows 高对比度支持

  6.10 动效视觉规范
      - 动效原则（2-3 条）
      - 缓动曲线（Standard / Decelerate / Accelerate / Spring）
      - 时长规范（微交互/组件/页面/复杂/窗口动画）
      - 桌面端动效补充（时长缩短/尊重减少动效设置/拖拽即时响应）

━━━━━━━━━━━━━━━━━━━━━━━━━━━

第七章 全局交互规范
  7.1 手势规范（移动端）
      - 下拉刷新、左滑删除、长按、双击、缩放
      - 手势冲突处理规则

  7.2 鼠标与键盘交互规范（桌面端）
      - 全局快捷键映射表（macOS Cmd / Windows Ctrl 双列对照）
      - Tab 焦点顺序规则（焦点环、跳过装饰元素、焦点陷阱处理）
      - 右键菜单规范（上下文相关菜单项、分隔线、子菜单）
      - 拖拽规范（拖拽手柄、放置区域、视觉反馈、取消拖拽）

  7.3 转场动画规范
      - 移动端: Push / Present / Slide, 弹性曲线
      - 桌面端: Fade / Crossfade, 更短时长, 更克制

  7.4 反馈机制
      - Toast: 使用场景、时长、位置
      - Dialog: 确认弹窗、输入弹窗、权限弹窗
      - SnackBar: 可撤销操作
      - Loading: 按钮内 / 全页 / 骨架屏
      - 桌面端系统通知: OS 级通知（macOS Notification Center / Windows Action Center）

  7.5 加载策略
      - 骨架屏使用规范
      - 下拉刷新行为
      - 分页加载（页码 / 游标 / 触发条件）
      - 离线缓存策略

  7.6 异常处理
      - 网络断开：<<处理方式>>
      - 服务端错误（5xx）：<<处理方式>>
      - 请求超时：<<处理方式>>
      - 数据格式异常：<<降级方案>>

  7.7 权限管理
      - 系统权限请求时机和文案
      - 业务权限不足的处理
      - 登录态过期的处理

  7.8 推送通知
      - 移动端推送通知（通知类型、优先级、点击跳转规则、应用内通知样式）
      - 桌面端系统通知（OS 通知中心集成、Dock/任务栏角标、通知点击行为）

  7.9 深色模式
      - 颜色映射规则
      - 图片处理（降低亮度/使用深色资源）
      - 特殊组件适配
      - 桌面端: 跟随系统主题自动切换（auto-switch）

  7.10 桌面端窗口管理规范
      - 最小化/最大化/全屏/分屏行为
      - 托盘最小化（关闭窗口 vs 最小化到托盘的策略）
      - 多窗口管理（窗口列表、窗口切换、窗口菜单）
      - 窗口位置与尺寸记忆（下次启动恢复上次窗口状态）

━━━━━━━━━━━━━━━━━━━━━━━━━━━

附录
  A. 原型演示
      - 单平台项目: 在线原型链接
      - 跨平台项目: 移动端原型链接 + 桌面端原型链接
      - 或附带原型文件

  B. 视觉样例板
      - 核心页面视觉稿缩略图
      - 浅色/深色模式对比
      - 移动端/桌面端对比

  C. 设计资源清单
      - 图标库来源
      - 插图资源
      - 字体文件

  D. 开发交接注意事项
      - 标注单位说明（px/pt/dp 的换算）
      - 动效实现建议（推荐库/框架）
      - 接口数据格式建议
      - 跨平台共享逻辑 vs 差异点
      - 平台专属实现注意事项:
          Windows: 自定义标题栏实现、系统托盘图标
          macOS: Traffic lights 定制、文件关联
          Web: 响应式断点实现
      - Design Token 映射:
          Web: CSS Custom Properties
          Flutter: ThemeData
          iOS/macOS: Swift Asset Catalog
          Windows: WPF ResourceDictionary

  E. 页面穷举清单（含桌面端专属页面）
      → 所有页面的完整编号列表，用于交叉校验

  F. 快捷键映射总表
      → macOS + Windows 双列对照表
      → 按功能分组: 导航/编辑/视图/文件/帮助
```

---

## Conversion to .docx

When the user needs a formal Word document:

1. Read the docx skill: `view /mnt/skills/public/docx/SKILL.md`
2. Convert Mermaid diagrams to images first:
   - Use a Mermaid CLI or render to SVG/PNG
   - Embed as images in the document
3. Use the docx skill's table and heading patterns
4. Include a proper Table of Contents

### Mermaid to Image Conversion

```bash
# If mmdc (mermaid-cli) is available:
npx -p @mermaid-js/mermaid-cli mmdc -i diagram.mmd -o diagram.png -t default -b white

# Alternative: render as SVG in HTML, then screenshot
```

### Document Styling Recommendations

- **Font**: PingFang SC (Mac) / Microsoft YaHei (Windows) for Chinese
- **Heading colors**: Use the product's primary brand color
- **Tables**: Alternate row shading for readability
- **Page layout**: A4, 2.5cm margins, page numbers in footer
- **Header**: Product name + document title
- **Footer**: Page number + version + date

---

## Quality Checklist

Final document review:
- [ ] All 7 chapters present and populated
- [ ] Table of contents matches content
- [ ] All Mermaid diagrams rendered (not raw code)
- [ ] Page numbering is correct
- [ ] Cross-references between sections are accurate
- [ ] No placeholder text remaining
- [ ] Version number and date are current
- [ ] Terminology is consistent throughout
- [ ] Document can stand alone (no external context required)
- [ ] Cross-platform: desktop-specific chapters present (Ch3.4, Ch5.4, Ch7.2, Ch7.10)
- [ ] Cross-platform: keyboard shortcut mapping table included (Appendix F)
- [ ] Cross-platform: dual-platform navigation documented (Ch2.3 + Ch2.4)
- [ ] Cross-platform: Design Token mapping in appendix (Appendix D)
- [ ] Desktop: window management specs complete (Ch7.10)
- [ ] Desktop: keyboard interaction specs complete (Ch7.2)
- [ ] Desktop: desktop component specs complete (Ch5.4)

---

## Final Review Gate

After the quality checklist above passes, a **mandatory review gate** must be executed before the workflow is considered complete. See SKILL.md "Phase 8 — Final Review Gate" for the full procedure.

**Note**: Walkthrough is already completed during Phase 4 and Phase 7 - no need to repeat in final review.

Summary:
1. Run **Quality Checklist Verification** — use each phase's checklist to verify the **corresponding chapter** in `phase8-document.md`:
   - Phase 1 checklist → Chapter 1 (Design Overview)
   - Phase 2 checklist → Chapter 2 (Information Architecture)
   - Phase 3 checklist → Chapter 3 (User Flows)
   - Phase 4 checklist → Chapter 4 (Page Interaction Index — all pages listed with file references)
   - Phase 5 checklist → Chapter 5 (Component Specifications)
   - Phase 6 checklist → Chapter 6 (Visual Design)
   - Phase 7 checklist → Appendix A (Prototype Demo — confirm prototype files exist and are complete)
   - Phase 8 checklist → Full document (all chapters present, no placeholders, cross-references correct)
2. Run **Multi-Perspective Review** (Tool 4) against the complete design
3. Save report to `doc/ixd/phase8-review-round-<N>.md`
4. **PASS** if: all chapter checklists pass AND no P0/P1 review items
5. **FAIL** → fix source files + corresponding document chapter → re-review (max 3 rounds)
6. **BLOCK** after 3 failures → terminate, require human intervention