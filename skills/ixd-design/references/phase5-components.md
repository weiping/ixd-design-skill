# Phase 5: Component Library

## Objective

Extract reusable components from the page specs (Phase 4) and document them as a component library with design tokens. This is the equivalent of Modao's "component library" feature.

## Deliverable 1: Design Tokens

Design tokens are the atomic values that all components reference.

### Color System

[English]
```markdown
## Color System

### Brand Colors
| Token | Value | Usage |
|-------|-------|-------|
| --color-primary | #<<hex>> | Primary actions, links, selected states |
| --color-primary-light | #<<hex>> | Primary light background |
| --color-primary-dark | #<<hex>> | Primary pressed state |

### Semantic Colors
| Token | Value | Usage |
|-------|-------|-------|
| --color-success | #52C41A | Success states |
| --color-warning | #FAAD14 | Warning states |
| --color-error | #FF4D4F | Error states, required markers |
| --color-info | #1890FF | Information messages |

### Neutral Colors
| Token | Value | Usage |
|-------|-------|-------|
| --color-text-primary | #1A1A1A | Headings, primary body text |
| --color-text-secondary | #666666 | Secondary text, descriptions |
| --color-text-placeholder | #BFBFBF | Input placeholder text |
| --color-text-disabled | #C0C0C0 | Disabled state text |
| --color-border | #E8E8E8 | Dividers, borders |
| --color-bg-page | #F5F5F5 | Page background |
| --color-bg-card | #FFFFFF | Card/component background |
| --color-bg-mask | rgba(0,0,0,0.45) | Overlay mask |

### Dark Mode Mapping
| Light Token | Dark Value |
|-------------|------------|
| --color-text-primary | #E8E8E8 |
| --color-bg-page | #141414 |
| --color-bg-card | #1F1F1F |
```

[中文]
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

[English]
```markdown
## Typography System

**Font Family**:
- Chinese: <<PingFang SC / HarmonyOS Sans / Noto Sans SC>>
- English: <<SF Pro / Roboto / follow Chinese>>
- Numeric: <<DIN / Roboto Mono>> (amounts, counters, etc.)

### Type Scale
| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| --font-title-xl | 24px | 32px | Semibold (600) | Large headings |
| --font-title-lg | 20px | 28px | Semibold (600) | Page titles |
| --font-title-md | 17px | 24px | Medium (500) | Section titles, nav titles |
| --font-body-lg | 16px | 24px | Regular (400) | Large body text |
| --font-body-md | 14px | 22px | Regular (400) | Body text (default) |
| --font-body-sm | 12px | 18px | Regular (400) | Secondary text, labels |
| --font-caption | 10px | 14px | Regular (400) | Fine print, badges |
```

[中文]
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

### Desktop Font Fallback

[English]
```markdown
| Platform | Fallback Order |
|----------|----------------|
| Windows | Microsoft YaHei → SimHei → sans-serif |
| macOS | PingFang SC → Hiragino Sans GB → sans-serif |

> Desktop base font size can be 1-2px smaller than mobile

```

[中文]
```markdown

| 平台 | 降级顺序 |
|------|---------|
| Windows | Microsoft YaHei → SimHei → sans-serif |
| macOS | PingFang SC → Hiragino Sans GB → sans-serif |

> 桌面端基础字号可比移动端小 1-2px
```


### Desktop Icon Sizes

[English]
```markdown
| Context | Icon Size | Click Area |
|---------|-----------|------------|
| Sidebar navigation | 20px | 32×32px |
| Toolbar buttons | 16-20px | 28×28px |
| System tray | 16-22px (Win 16 / macOS 22) | — |
| Menu item prefix | 16px | — |
```

[中文]
```markdown
| 场景 | 图标尺寸 | 点击区域 |
|------|---------|---------|
| 侧边栏导航 | 20px | 32×32px |
| 工具栏按钮 | 16-20px | 28×28px |
| 系统托盘 | 16-22px（Win 16 / macOS 22） | — |
| 菜单项前缀 | 16px | — |
```

### Spacing System (4px Grid)

[English]
```markdown
## Spacing System (4px Grid)

| Token | Value | Usage |
|-------|-------|-------|
| --space-xs | 4px | Tight spacing (icon to text) |
| --space-sm | 8px | Small spacing (form item internal) |
| --space-md | 12px | Medium spacing (card padding) |
| --space-lg | 16px | Large spacing (block gaps, page margins) |
| --space-xl | 24px | Extra large spacing (section separators) |
| --space-xxl | 32px | Huge spacing (page top/bottom whitespace) |

Page horizontal margins: 16px (compact) / 20px (standard) / 24px (relaxed)
```

[中文]
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

[English]
```markdown
| Token | Value | Usage |
|-------|-------|-------|
| --radius-sm | 4px | Small elements (tags, badges) |
| --radius-md | 8px | Cards, input fields |
| --radius-lg | 12px | Dialogs, bottom panels |
| --radius-xl | 16px | Large rounded cards |
| --radius-full | 9999px | Circular (avatars, pill buttons) |
```

[中文]
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

[English]
```markdown
| Token | Value | Usage |
|-------|-------|-------|
| --shadow-sm | 0 1px 2px rgba(0,0,0,0.06) | Slight elevation (cards) |
| --shadow-md | 0 4px 12px rgba(0,0,0,0.08) | Medium elevation (dialogs) |
| --shadow-lg | 0 8px 24px rgba(0,0,0,0.12) | High elevation (bottom panels) |
```

[中文]
```markdown
| Token | 值 | 用途 |
|-------|-----|------|
| --shadow-sm | 0 1px 2px rgba(0,0,0,0.06) | 轻微浮起（卡片） |
| --shadow-md | 0 4px 12px rgba(0,0,0,0.08) | 中等浮起（弹窗） |
| --shadow-lg | 0 8px 24px rgba(0,0,0,0.12) | 高浮起（底部面板） |
```

### Motion Tokens

[English]
```markdown
| Token | Value | Usage |
|-------|-------|-------|
| --duration-fast | 150ms | Micro-interactions (hover, toggle) |
| --duration-normal | 300ms | Standard interactions (transitions, expand) |
| --duration-slow | 500ms | Complex animations (page transitions) |
| --easing-standard | cubic-bezier(0.4, 0, 0.2, 1) | Standard easing |
| --easing-decelerate | cubic-bezier(0, 0, 0.2, 1) | Enter animations |
| --easing-accelerate | cubic-bezier(0.4, 0, 1, 1) | Exit animations |
```

[中文]
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

[English]
```markdown
## <<Component Name>> (<<ComponentName>>)

### Description
<<One sentence description>>

### Properties / Variants
| Property | Type | Options | Default | Description |
|----------|------|---------|---------|-------------|
| type | enum | primary / secondary / text / danger | primary | Button type |
| size | enum | large / medium / small | medium | Size |
| disabled | boolean | true / false | false | Whether disabled |
| loading | boolean | true / false | false | Whether loading |
| icon | string | icon name | - | Leading icon |

### Size Specs
| Size | Height | Padding | Font Size | Radius | Min Width |
|------|--------|---------|-----------|--------|-----------|
| large | 48px | 0 24px | 16px | 8px | 120px |
| medium | 40px | 0 16px | 14px | 8px | 80px |
| small | 32px | 0 12px | 12px | 6px | 60px |

Minimum touch target: 44 × 44px (expand hit area if smaller)

### State Definitions
| State | Background | Text Color | Border | Other |
|-------|------------|------------|--------|-------|
| Default | --color-primary | #FFF | none | - |
| Hover | <<hover background>> | <<hover text>> | <<hover border>> | cursor: pointer |
| Pressed | --color-primary-dark | #FFF | none | scale(0.98) |
| Focused | <<focus background>> | <<focus text>> | <<focus border, e.g. 2px solid focus-ring>> | outline / focus-ring |
| Disabled | --color-primary 40% | #FFF 60% | none | Not clickable |
| Loading | --color-primary | #FFF | none | spinner replaces text |
| Dragging (Desktop) | <<drag background>> | <<drag text>> | <<drag border>> | opacity: 0.6, cursor: grabbing |

### Interaction Rules
- Tap: <<triggered action>> + <<feedback>>
- Rapid tap: <<debounce 300ms / prevent duplicate>>
- Hover behavior (Desktop): <<Tooltip / highlight / preview>>
- Keyboard behavior: <<Tab order / Enter / Space / Esc / shortcuts>>
- Drag behavior (Desktop): <<drag handle / drop zone indicator / drag preview>>

### Usage Guidelines
- **Use when**: <<scenarios to use>>
- **Avoid when**: <<scenarios not to use>>
- **Pair with**: <<components to use together>>
```

[中文]
```markdown
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

**Basic Components(基础组件)**: Button, Input, Checkbox, Radio, Switch, Slider, Stepper
**Feedback Components(反馈组件)**: Toast, Dialog, ActionSheet, BottomSheet, Progress, Skeleton
**Navigation Components(导航组件)**: NavBar, TabBar, SegmentedControl, Breadcrumb, Steps
**Data Display(数据展示)**: Card, ListItem, Tag, Badge, Avatar, Image, Empty
**Business Components(业务组件)**: (Product-specific, derived from Phase 4 page specs)
**Desktop-Exclusive Components(桌面端专属组件)**:
- Sidebar (collapsible, resizable)
- Toolbar (icon buttons, dividers)
- Context Menu (right-click triggered)
- Split Pane (adjustable divider)
- Command Palette (Cmd+K search)
- System Tray Panel
- Status Bar
- Data Table (sortable, resizable columns)
- Tree View

---

## Deliverable 3: Responsive Breakpoints

[English]
```markdown
| Breakpoint | Width Range | Typical Devices | Layout Strategy |
|------------|-------------|-----------------|-----------------|
| xs | < 375px | iPhone SE | Single column, compact spacing |
| sm | 375-413px | iPhone 14 | Single column, standard spacing (baseline) |
| md | 414-767px | iPhone 14 Plus / Small tablet | Single column, relaxed spacing |
| lg | 768-1023px | iPad Mini / iPad | Two-column layout |
| xl | 1024-1279px | Desktop small window | Multi-column, side navigation |
| 2xl | 1280-1439px | Desktop standard | Multi-column, wide sidebar |
| 3xl | ≥ 1440px | Desktop widescreen | Multi-column, max content width limit |

### Desktop-Exclusive Specs

| Spec Item | Description |
|-----------|-------------|
| Window minimum size | <<width × height, e.g., 800×600>> |
| Window default size | <<width × height, e.g., 1200×800>> |
| Information density | Desktop can use compact mode (line height/spacing reduced 20-30%) |
| Title bar style | <<native / custom / no title bar (macOS traffic lights reserved)>> |
| Menu bar | <<native macOS / in-app / none>> |
```

[中文]
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