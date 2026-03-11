# Phase 5: Component Library （组件规范）

## Objective

Extract reusable components from the page specs (Phase 4) and document them as a component library with design tokens. This is the equivalent of Modao's "component library" feature.

## Deliverable 1: Design Tokens

Design tokens are the atomic values that all components reference.

### Color System

```markdown
## 颜色系统

### 品牌色
| Token | 色值 | 用途 |
|-------|------|------|
| --color-primary | #<<hex>> | 主操作、链接、选中态 |
| --color-primary-light | #<<hex>> | 主色浅色背景 |
| --color-primary-dark | #<<hex>> | 主色按下态 |

### 功能色
| Token | 色值 | 用途 |
|-------|------|------|
| --color-success | #52C41A | 成功状态 |
| --color-warning | #FAAD14 | 警告状态 |
| --color-error | #FF4D4F | 错误状态、必填标记 |
| --color-info | #1890FF | 信息提示 |

### 中性色
| Token | 色值 | 用途 |
|-------|------|------|
| --color-text-primary | #1A1A1A | 标题、正文主文字 |
| --color-text-secondary | #666666 | 辅助文字、说明 |
| --color-text-placeholder | #BFBFBF | 输入框占位文字 |
| --color-text-disabled | #C0C0C0 | 禁用态文字 |
| --color-border | #E8E8E8 | 分割线、边框 |
| --color-bg-page | #F5F5F5 | 页面背景 |
| --color-bg-card | #FFFFFF | 卡片/组件背景 |
| --color-bg-mask | rgba(0,0,0,0.45) | 蒙层 |

### 深色模式映射
| Light Token | Dark Value |
|-------------|-----------|
| --color-text-primary | #E8E8E8 |
| --color-bg-page | #141414 |
| --color-bg-card | #1F1F1F |
```

### Typography Scale

```markdown
## 字体系统

**字体族**：
- 中文：<<PingFang SC / HarmonyOS Sans / Noto Sans SC>>
- 英文：<<SF Pro / Roboto / 跟随中文>>
- 数字：<<DIN / Roboto Mono>>（金额、计数器等）

### 字号阶梯
| Token | 字号 | 行高 | 字重 | 用途 |
|-------|------|------|------|------|
| --font-title-xl | 24px | 32px | Semibold (600) | 大标题 |
| --font-title-lg | 20px | 28px | Semibold (600) | 页面标题 |
| --font-title-md | 17px | 24px | Medium (500) | 区块标题、导航标题 |
| --font-body-lg | 16px | 24px | Regular (400) | 正文大 |
| --font-body-md | 14px | 22px | Regular (400) | 正文（默认） |
| --font-body-sm | 12px | 18px | Regular (400) | 辅助文字、标签 |
| --font-caption | 10px | 14px | Regular (400) | 极小说明、角标 |
```

### 桌面端字体降级

| 平台 | 降级顺序 |
|------|---------|
| Windows | Microsoft YaHei → SimHei → sans-serif |
| macOS | PingFang SC → Hiragino Sans GB → sans-serif |

> 桌面端基础字号可比移动端小 1-2px

### 桌面端图标尺寸

| 场景 | 图标尺寸 | 点击区域 |
|------|---------|---------|
| 侧边栏导航 | 20px | 32×32px |
| 工具栏按钮 | 16-20px | 28×28px |
| 系统托盘 | 16-22px（Win 16 / macOS 22） | — |
| 菜单项前缀 | 16px | — |

### Spacing System (4px Grid)

```markdown
## 间距系统（基于 4px 网格）

| Token | 值 | 用途 |
|-------|-----|------|
| --space-xs | 4px | 紧凑间距（图标与文字） |
| --space-sm | 8px | 小间距（表单项内部） |
| --space-md | 12px | 中间距（卡片内边距） |
| --space-lg | 16px | 大间距（区块间距、页面边距） |
| --space-xl | 24px | 超大间距（区块分隔） |
| --space-xxl | 32px | 特大间距（页面顶部/底部留白） |

页面水平边距：16px（紧凑）/ 20px（标准）/ 24px（宽松）
```

### Border Radius

```markdown
| Token | 值 | 用途 |
|-------|-----|------|
| --radius-sm | 4px | 小型元素（标签、Badge） |
| --radius-md | 8px | 卡片、输入框 |
| --radius-lg | 12px | 弹窗、底部面板 |
| --radius-xl | 16px | 大圆角卡片 |
| --radius-full | 9999px | 圆形（头像、胶囊按钮） |
```

### Shadow & Elevation

```markdown
| Token | 值 | 用途 |
|-------|-----|------|
| --shadow-sm | 0 1px 2px rgba(0,0,0,0.06) | 轻微浮起（卡片） |
| --shadow-md | 0 4px 12px rgba(0,0,0,0.08) | 中等浮起（弹窗） |
| --shadow-lg | 0 8px 24px rgba(0,0,0,0.12) | 高浮起（底部面板） |
```

### Motion Tokens

```markdown
| Token | 值 | 用途 |
|-------|-----|------|
| --duration-fast | 150ms | 微交互（hover、toggle） |
| --duration-normal | 300ms | 标准交互（转场、展开） |
| --duration-slow | 500ms | 复杂动画（页面切换） |
| --easing-standard | cubic-bezier(0.4, 0, 0.2, 1) | 标准缓动 |
| --easing-decelerate | cubic-bezier(0, 0, 0.2, 1) | 进入动画 |
| --easing-accelerate | cubic-bezier(0.4, 0, 1, 1) | 退出动画 |
```

---

## Deliverable 2: Component Specs

### Component Spec Template

For each reusable component:

```markdown
## <<组件名称>> (<<ComponentName>>)

### 功能描述
<<一句话说明>>

### 属性 / 变体
| 属性 | 类型 | 可选值 | 默认值 | 说明 |
|------|------|--------|-------|------|
| type | enum | primary / secondary / text / danger | primary | 按钮类型 |
| size | enum | large / medium / small | medium | 尺寸 |
| disabled | boolean | true / false | false | 是否禁用 |
| loading | boolean | true / false | false | 是否加载中 |
| icon | string | icon name | - | 前置图标 |

### 尺寸规格
| 尺寸 | 高度 | 内边距 | 字号 | 圆角 | 最小宽度 |
|------|------|--------|------|------|---------|
| large | 48px | 0 24px | 16px | 8px | 120px |
| medium | 40px | 0 16px | 14px | 8px | 80px |
| small | 32px | 0 12px | 12px | 6px | 60px |

最小触摸区域：44 × 44px（小于此尺寸时扩大热区）

### 状态定义
| 状态 | 背景色 | 文字色 | 边框 | 其他 |
|------|--------|-------|------|------|
| 默认态 | --color-primary | #FFF | none | - |
| 悬停态 | <<悬停背景色>> | <<悬停文字色>> | <<悬停边框>> | cursor: pointer |
| 按下态 | --color-primary-dark | #FFF | none | scale(0.98) |
| 聚焦态 | <<聚焦背景色>> | <<聚焦文字色>> | <<聚焦边框，如 2px solid focus-ring>> | outline / focus-ring |
| 禁用态 | --color-primary 40% | #FFF 60% | none | 不可点击 |
| 加载态 | --color-primary | #FFF | none | spinner 替换文字 |
| 拖拽态(桌面端) | <<拖拽背景色>> | <<拖拽文字色>> | <<拖拽边框>> | opacity: 0.6, cursor: grabbing |

### 交互规则
- 点击：<<触发操作>> + <<反馈>>
- 连续点击：<<防抖 300ms / 禁止重复点击>>
- 悬停行为（桌面端）：<<Tooltip / 高亮 / 预览>>
- 键盘行为：<<Tab 序 / Enter / Space / Esc / 快捷键>>
- 拖拽行为（桌面端）：<<拖拽手柄 / 放置区域指示 / 拖拽预览>>

### 使用规范
- **适用**：<<什么场景使用>>
- **禁止**：<<什么场景不要用>>
- **搭配**：<<与哪些组件配合使用>>
```

### Component Categories

Organize components by these categories:

**基础组件**: Button, Input, Checkbox, Radio, Switch, Slider, Stepper
**反馈组件**: Toast, Dialog, ActionSheet, BottomSheet, Progress, Skeleton
**导航组件**: NavBar, TabBar, SegmentedControl, Breadcrumb, Steps
**数据展示**: Card, ListItem, Tag, Badge, Avatar, Image, Empty
**业务组件**: (Product-specific, derived from Phase 4 page specs)
**桌面端专属组件**:
- 侧边栏 / Sidebar（可折叠、可调宽度）
- 工具栏 / Toolbar（图标按钮、分隔符）
- 上下文菜单 / Context Menu（右键触发）
- 分割面板 / Split Pane（可调分隔线）
- 命令面板 / Command Palette（Cmd+K 搜索）
- 系统托盘面板 / Tray Panel
- 状态栏 / Status Bar
- 数据表格 / Data Table（可排序、可调列宽）
- 树形视图 / Tree View

---

## Deliverable 3: Responsive Breakpoints

```markdown
| 断点名称 | 宽度范围 | 典型设备 | 布局策略 |
|---------|---------|---------|---------|
| xs | < 375px | iPhone SE | 单栏，紧凑间距 |
| sm | 375-413px | iPhone 14 | 单栏，标准间距（基准） |
| md | 414-767px | iPhone 14 Plus / 小平板 | 单栏，宽松间距 |
| lg | 768-1023px | iPad Mini / iPad | 双栏布局 |
| xl | 1024-1279px | 桌面端小窗口 | 多栏布局，侧边导航 |
| 2xl | 1280-1439px | 桌面端标准 | 多栏布局，宽侧边栏 |
| 3xl | ≥ 1440px | 桌面端宽屏 | 多栏布局，最大内容宽度限制 |

### 桌面端专属规范

| 规范项 | 说明 |
|-------|------|
| 窗口最小尺寸 | <<宽 × 高，如 800×600>> |
| 窗口默认尺寸 | <<宽 × 高，如 1200×800>> |
| 信息密度 | 桌面端可采用紧凑模式（行高/间距缩小 20-30%） |
| 标题栏样式 | <<原生 / 自绘 / 无标题栏（macOS 红绿灯预留）>> |
| 菜单栏 | <<系统原生 macOS / 应用内 / 无>> |
```

---

## Quality Checklist

- [ ] All design tokens are defined with specific values
- [ ] Token naming is consistent and semantic
- [ ] Every component from Phase 4 is covered
- [ ] Component specs include all states
- [ ] Touch targets ≥ 44px documented
- [ ] Dark mode token mapping is complete
- [ ] Responsive breakpoints are defined


