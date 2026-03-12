# Phase 6: Visual Design

## Objective

Based on the interaction specs (Phase 4) and component library (Phase 5), produce a complete visual design system. This bridges the gap between "what the product does" and "how it looks and feels" — equivalent to a Figma high-fidelity design token system.

## Why This Phase Exists Here

```
Phase 5 (Component Library) → defines the SKELETON (what components exist, sizes, states)
Phase 6 (Visual Design)     → dresses the skeleton (color, type, icons, brand personality)
Phase 7 (Prototype)         → brings the dressed skeleton to life (interactive code)
```

Visual design decisions must be made BEFORE prototyping, otherwise the prototype will use generic styling that doesn't reflect the product's brand or intended emotional tone.

## Deliverables (10 Dimensions)

[english]
```markdown
## 1. Color System

### Structure

````
Brand Colors
├── Primary (main action color)
│   ├── Primary-Light (backgrounds, selected states)
│   └── Primary-Dark (pressed states, emphasis)
├── Secondary (supporting actions)
└── Accent (highlights, special elements)

Semantic Colors
├── Success (#52C41A family)
├── Warning (#FAAD14 family)
├── Error (#FF4D4F family)
└── Info (#1890FF family)

Neutral Scale (8-10 levels)
├── N-900 (darkest text)
├── N-700 (body text)
├── N-500 (secondary text)
├── N-400 (placeholder)
├── N-300 (borders)
├── N-200 (dividers)
├── N-100 (page background)
├── N-50 (input background)
└── N-0 (card/surface background)
````

### Color Rules
- Primary color area: 5-15% of any screen (never overwhelming)
- Semantic colors: only for their designated purpose (never decorative)
- All text/background combos must pass WCAG AA (4.5:1 minimum)
- Provide both Light and Dark mode values for every color

### Accessibility Check Table
Verify these critical combos:
- Primary text on white → must be ≥ 4.5:1
- Secondary text on white → must be ≥ 4.5:1
- White text on primary → must be ≥ 4.5:1
- Primary text on dark background → must be ≥ 4.5:1

---

## 2. Typography System

### Font Selection Criteria
- Chinese font: Match brand tone (PingFang=modern, Noto=neutral, Source Han=professional)
- English font: Complement Chinese font rhythm
- Numeric font: Consider tabular (monospace) figures for data/prices
- Code/monospace: Menlo / Consolas / JetBrains Mono / Fira Code

### Type Scale (8 levels)

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| Display | 32px | 40px | Bold | Hero numbers, marketing |
| H1 | 24px | 32px | Semibold | Page titles |
| H2 | 20px | 28px | Semibold | Section titles |
| H3 | 17px | 24px | Medium | Card titles, nav titles |
| Body-L | 16px | 24px | Regular | Large body, emphasis |
| Body-M | 14px | 22px | Regular | Default body text |
| Body-S | 12px | 18px | Regular | Captions, timestamps |
| Caption | 10px | 14px | Regular | Badges, fine print |

### Typography Rules
- Maximum line width: 40 characters (Chinese) for readability
- Paragraph spacing: 0.5× line height
- Chinese-English mixed: 0.25em natural spacing
- Truncation: single-line ellipsis or multi-line (max N lines)

### Desktop Font Fallback

| Platform | Fallback Order |
|----------|----------------|
| Windows | Microsoft YaHei → SimHei → sans-serif |
| macOS | PingFang SC → Hiragino Sans GB → sans-serif |

- Desktop can embed custom fonts (Web: @font-face / Client: bundle with app)
- Base font size: Desktop can be 1-2px smaller than mobile

---

## 3. Iconography

### Style Definition
Define one consistent icon style for the entire product:
- **Style**: Outline / Filled / Duotone / Rounded
- **Stroke width**: 1.5px or 2px
- **Grid**: 24×24px base (with optical corrections)
- **Corner radius**: Consistent with brand radius system

### Size Rules
| Context | Icon Size | Touch/Click Area | Example |
|---------|-----------|------------------|---------|
| Tab bar | 24px | 44×44px | Home/Search/Messages/Profile |
| Nav bar action | 24px | 44×44px (mobile) / 32×32px (desktop) | Back/Search/More |
| List prefix | 20px | — | List item icon |
| Input internal | 16px | — | Search/Clear/Toggle |
| Button icon | 16-20px | — | Icon before/after label |
| Sidebar navigation (desktop) | 20px | 32×32px | Navigation items |
| Toolbar button (desktop) | 16-20px | 28×28px | Toolbar actions |
| System tray (desktop) | 16-22px | — (Win 16 / macOS 22) | Tray icon |
| Menu item prefix (desktop) | 16px | — | Menu item icon |

### Recommended Libraries
- Lucide (clean, consistent, React-friendly)
- Phosphor (versatile, 6 weights)
- Tabler Icons (2px stroke, open source)
- SF Symbols (iOS native)
- Material Symbols (Google/Android native)

---

## 4. Illustration System

Define illustration style and usage scenarios:

| Scenario | Dimensions | Content Direction | Copy Pattern |
|----------|------------|-------------------|--------------|
| Empty-no-data | 200×160px | Relevant to context | "No data yet" |
| Empty-no-network | 200×160px | Disconnected device | "Network unavailable" |
| Empty-no-permission | 200×160px | Lock/shield | "No permission" |
| Empty-no-results | 200×160px | Magnifying glass | "No results found" |
| Onboarding | Full-width | Feature illustration | Feature description |
| Success | 120×120px | Celebration/checkmark | "Operation successful" |
| Error/404 | 200×160px | Lost/confused | "Page not found" |

---

## 5-7. Elevation, Radius, Spacing

See the component library (Phase 5) for base values. Visual design adds:
- Elevation: Light AND Dark mode shadow values
- Radius: Consistent usage mapping to component types
- Spacing: Visual rhythm verification across key screens

### Grid Columns
- 4 columns (phone) / 8 columns (tablet) / 12 columns (desktop browser) / 12-16 columns (desktop client)

### Desktop Max Content Width
- <<1200px / 1440px / unlimited (choose based on product type)>>

---

## 8. Key Screen Visual Specs

For 3-5 core screens, produce detailed visual annotations:

```markdown
### Screen: <<Page Name>>

**Overall Atmosphere**: <<Describe the visual feeling in one sentence>>
**Background**: <<Solid color / gradient / texture / blurred image>>

**Layout Annotations**:
- Nav bar: height <<px>>, bg <<color/transparent>>, title <<style>>
- Content top padding: <<px>>
- Card: radius <<px>>, shadow Level <<N>>, gap <<px>>
- Primary CTA: height <<px>>, radius <<px>>, bg <<solid/gradient>>

**Brand Elements**:
<<Any special visual treatment unique to this screen:
  header gradient, brand illustration, decorative shapes, etc.>>
```

> Cross-platform products need separate annotations for mobile and desktop versions

#### Desktop Differences (per key screen)
- Title bar / toolbar style
- Sidebar width
- Information density adjustment
- Window chrome style

---

## 9. Dark Mode

### Strategy Options
- **Full adaptation**: Every screen has a dark counterpart
- **Core only**: Key screens adapted, settings/about may not
- **System follow**: Auto-switch based on OS setting

### Key Rules
- Never use pure black (#000) — use dark grey (e.g., #0A0A0A, #141414)
- Never use pure white text (#FFF) — use off-white (e.g., #E8E8E8, #F0F0F0)
- Primary color: may need saturation/brightness adjustment for dark backgrounds
- Images: reduce brightness to ~85% or apply dark overlay
- Shadows: switch to either deeper background differentiation or subtle light glow

### Color Mapping Table
Must provide a complete mapping for all neutral and brand colors.

### Desktop Dark Mode Strategy
- Follow system theme auto-switch / In-app independent setting / Both supported
- System integration: Monitor system theme changes and switch in real-time
- Windows high contrast mode support

---

## 10. Motion Design

### Motion Principles
Define 2-3 principles (e.g., "purposeful", "natural", "restrained")

### Easing Curves
| Name | Value | Usage |
|------|-------|-------|
| Standard | cubic-bezier(0.4, 0, 0.2, 1) | General transitions |
| Decelerate | cubic-bezier(0, 0, 0.2, 1) | Element enter |
| Accelerate | cubic-bezier(0.4, 0, 1, 1) | Element exit |
| Spring | spring(1, 80, 10, 0) | Bounce, delight |

### Duration Scale
| Type | Duration | Examples |
|------|----------|----------|
| Micro | 100-200ms | Toggle, press, hover |
| Component | 200-300ms | Expand, collapse, fade |
| Window animation (desktop) | 200-300ms | Window open, close, minimize |
| Page | 300-400ms | Push, present, tab switch |
| Complex | 400-600ms | Onboarding, celebration |

### Desktop Motion Notes
- Animation duration 20-30% shorter than mobile
- Respect system "reduce motion" setting (prefers-reduced-motion)
- Window drag instant response, no easing

```

[中文]
```markddown
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

### 八、关键页面视觉标注 (Key Screen Specs)

为 3-5 个核心页面输出视觉标注说明（跨平台产品需分别标注移动端和桌面端版本）：

#### 页面：<<页面名>>
**整体氛围**：<<一段话描述视觉感受>>
**背景处理**：<<纯色/渐变/纹理/图片模糊>>
**布局标注**：
- 导航栏高度：<<px>>，背景：<<色值/透明>>
- 内容区上边距：<<px>>
- 卡片样式：<<圆角/阴影/边框>>，间距：<<px>>
- 按钮样式：<<高度/圆角/渐变或纯色>>

**特殊视觉元素**：
<<该页面独有的视觉设计，如品牌氛围图/背景装饰/动画等>>

**桌面端差异**（PC 客户端适用）：
- 标题栏/工具栏样式：<<高度/背景/按钮位置>>
- 侧边栏宽度：<<折叠态/展开态>>
- 信息密度调整：<<间距/字号与移动端的差异>>
- 窗口 chrome 样式：<<边框/阴影/圆角>>

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
```

---

## Optional: Style Tile (HTML)

Generate an HTML page that visually demonstrates all design tokens:
- Color swatches (all palettes, Light + Dark)
- Typography samples (all levels with Chinese example text)
- Icon samples (all sizes)
- Component visual samples (button states, input states, cards)
- Shadow levels (card stack)
- Spacing visualization
- Border radius comparison
- Dark mode toggle

---

## Quality Checklist

- [ ] All colors provided in HEX format with Light + Dark values
- [ ] Type scale covers all 8 levels with specific values
- [ ] All text/background combos pass WCAG AA (4.5:1)
- [ ] Icon style is consistent and size rules are defined
- [ ] Illustration scenarios cover all empty states
- [ ] Dark mode mapping is complete (no gaps)
- [ ] Motion curves and durations are specified
- [ ] 3-5 key screens have detailed visual annotations
- [ ] Visual system is consistent with the brand tone from Phase 1