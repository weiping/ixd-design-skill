# Phase 5: Component Library

## Objective

Extract reusable components from the page specs (Phase 4) and document them as a component library with design tokens. This is the equivalent of Modao's "component library" feature.

## Deliverable 1: Design Tokens

Design tokens are the atomic values that all components reference.

### Color System

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

### Typography Scale

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

### Desktop Font Fallback

| Platform | Fallback Order |
|----------|----------------|
| Windows | Microsoft YaHei → SimHei → sans-serif |
| macOS | PingFang SC → Hiragino Sans GB → sans-serif |

> Desktop base font size can be 1-2px smaller than mobile

### Desktop Icon Sizes

| Context | Icon Size | Click Area |
|---------|-----------|------------|
| Sidebar navigation | 20px | 32×32px |
| Toolbar buttons | 16-20px | 28×28px |
| System tray | 16-22px (Win 16 / macOS 22) | — |
| Menu item prefix | 16px | — |

### Spacing System (4px Grid)

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

### Border Radius

```markdown
| Token | Value | Usage |
|-------|-------|-------|
| --radius-sm | 4px | Small elements (tags, badges) |
| --radius-md | 8px | Cards, input fields |
| --radius-lg | 12px | Dialogs, bottom panels |
| --radius-xl | 16px | Large rounded cards |
| --radius-full | 9999px | Circular (avatars, pill buttons) |
```

### Shadow & Elevation

```markdown
| Token | Value | Usage |
|-------|-------|-------|
| --shadow-sm | 0 1px 2px rgba(0,0,0,0.06) | Slight elevation (cards) |
| --shadow-md | 0 4px 12px rgba(0,0,0,0.08) | Medium elevation (dialogs) |
| --shadow-lg | 0 8px 24px rgba(0,0,0,0.12) | High elevation (bottom panels) |
```

### Motion Tokens

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

---

## Deliverable 2: Component Specs

### Component Spec Template

For each reusable component:

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

### Component Categories

Organize components by these categories:

**Basic Components**: Button, Input, Checkbox, Radio, Switch, Slider, Stepper
**Feedback Components**: Toast, Dialog, ActionSheet, BottomSheet, Progress, Skeleton
**Navigation Components**: NavBar, TabBar, SegmentedControl, Breadcrumb, Steps
**Data Display**: Card, ListItem, Tag, Badge, Avatar, Image, Empty
**Business Components**: (Product-specific, derived from Phase 4 page specs)
**Desktop-Exclusive Components**:
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

---

## Quality Checklist

- [ ] All design tokens are defined with specific values
- [ ] Token naming is consistent and semantic
- [ ] Every component from Phase 4 is covered
- [ ] Component specs include all states
- [ ] Touch targets ≥ 44px documented
- [ ] Dark mode token mapping is complete
- [ ] Responsive breakpoints are defined