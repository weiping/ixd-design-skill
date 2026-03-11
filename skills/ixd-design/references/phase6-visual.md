# Phase 6: Visual Design （视觉设计）

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

1. Color System
2. Typography System
3. Iconography
4. Illustration System
5. Elevation & Shadows
6. Border Radius
7. Spacing & Grid
8. Key Screen Visual Specs
9. Dark Mode Scheme
10. Motion Design Tokens

---

## 1. Color System

### Structure

```
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
```

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
- 代码/等宽: Menlo / Consolas / JetBrains Mono / Fira Code

### Type Scale (8 levels)

| Token | Size | Line Height | Weight | Usage |
|-------|------|------------|--------|-------|
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

### 桌面端字体补充说明

| 平台 | 中文降级顺序 |
|------|------------|
| Windows | Microsoft YaHei → SimHei → sans-serif |
| macOS | PingFang SC → Hiragino Sans GB → sans-serif |

- 桌面端可内嵌自定义字体（Web: @font-face / 客户端: 随包分发）
- 字号基准：桌面端可比移动端小 1-2px

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
|---------|-----------|-----------------|---------|
| Tab bar | 24px | 44×44px | Home/Search/Messages/Profile |
| Nav bar action | 24px | 44×44px（移动端）/ 32×32px（桌面端） | Back/Search/More |
| List prefix | 20px | — | List item icon |
| Input internal | 16px | — | Search/Clear/Toggle |
| Button icon | 16-20px | — | Icon before/after label |
| 侧边栏导航（桌面端） | 20px | 32×32px | Navigation items |
| 工具栏按钮（桌面端） | 16-20px | 28×28px | Toolbar actions |
| 系统托盘（桌面端） | 16-22px | —（Win 16 / macOS 22） | Tray icon |
| 菜单项前缀（桌面端） | 16px | — | Menu item icon |

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
|----------|-----------|-------------------|--------------|
| Empty-no-data | 200×160px | Relevant to context | "暂无数据" |
| Empty-no-network | 200×160px | Disconnected device | "网络开小差了" |
| Empty-no-permission | 200×160px | Lock/shield | "暂无权限" |
| Empty-no-results | 200×160px | Magnifying glass | "未找到相关内容" |
| Onboarding | Full-width | Feature illustration | Feature description |
| Success | 120×120px | Celebration/checkmark | "操作成功" |
| Error/404 | 200×160px | Lost/confused | "页面走丢了" |

---

## 5-7. Elevation, Radius, Spacing

See the component library (Phase 5) for base values. Visual design adds:
- Elevation: Light AND Dark mode shadow values
- Radius: Consistent usage mapping to component types
- Spacing: Visual rhythm verification across key screens

### Grid Columns
- 4 栏（手机）/ 8 栏（平板）/ 12 栏（桌面浏览器）/ 12-16 栏（桌面客户端）

### 桌面端最大内容宽度
- <<1200px / 1440px / 无限制（根据产品类型选择）>>

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

> 跨平台产品需分别标注移动端和桌面端版本

#### 桌面端差异（每个关键页面需补充）
- 标题栏 / 工具栏样式
- 侧边栏宽度
- 信息密度调整
- 窗口 chrome 样式

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

### 桌面端暗色模式策略
- 跟随系统主题自动切换 / 应用内独立设置 / 两者兼支持
- 系统集成：监听系统主题变化实时切换
- Windows 高对比度模式支持

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
| 窗口动画（桌面端） | 200-300ms | 窗口打开、关闭、最小化 |
| Page | 300-400ms | Push, present, tab switch |
| Complex | 400-600ms | Onboarding, celebration |

### 桌面端动效补充
- 动效时长比移动端缩短 20-30%
- 尊重系统"减少动效"设置（prefers-reduced-motion）
- 窗口拖拽即时响应，无缓动

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


