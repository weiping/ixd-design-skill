# Phase 7: Interactive Prototype

## Objective

Generate a clickable, high-fidelity prototype using the built-in scripts. Output is a single HTML file that can be opened directly in a browser — this is AI's unique advantage over traditional tools like Modao.

## Tech Stack

This phase uses the following technology stack:

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18 | Component-based UI framework |
| TypeScript | Latest | Type safety |
| Vite | Latest | Development build tool |
| Tailwind CSS | 3.4.1 | Atomic CSS framework |
| shadcn/ui | Latest | High-quality UI component library (40+ pre-installed components) |
| Parcel | Latest | Bundle to single HTML file |

**Tech Stack Advantages**:
- shadcn/ui provides 40+ ready-to-use professional components (Button, Card, Dialog, Sheet, Tabs, Toast, etc.)
- Tailwind CSS with shadcn/ui's theme system enables easy Design Token implementation
- React component architecture for page reuse and state management
- Final output is a single HTML file that opens directly in a browser without a server

## Built-in Scripts

The following scripts are provided in the `scripts/` directory:

| Script | Purpose |
|--------|---------|
| `init-artifact.sh` | Initialize a new React + TypeScript + Tailwind + shadcn/ui project |
| `bundle-artifact.sh` | Bundle the project into a single HTML file |
| `shadcn-components.tar.gz` | Pre-packaged 40+ shadcn/ui components |

**Script Location**: `<skill-dir>/scripts/`

## Platform Configuration

The `platform` field in `progress.json` determines the output:

| platform | Project Structure | Output File(s) | Device Simulation |
|----------|-------------------|----------------|------------------|
| `"mobile"` (default) | Single project | `prototype.html` | Phone frame inside page content |
| `"desktop"` | Single project | `prototype.html` | Window frame inside page content |
| `"both"` | Single project, dual entry | `prototype-mobile.html` + `prototype-desktop.html` | Both viewports |

**Default behavior**: If `platform` is not set, assume `"mobile"`.

## Development Workflow

### Step 1: Initialize Project

Run the initialization script from the skill's scripts directory:

```bash
# Project naming convention
# Single platform: <product-name>-prototype
# Dual platform: <product-name>-prototype-mobile / <product-name>-prototype-desktop

# Replace <skill-dir> with the actual skill directory path
bash <skill-dir>/scripts/init-artifact.sh <product-name>-prototype
cd <product-name>-prototype
```

After initialization, the project includes:
- ✅ React + TypeScript (via Vite)
- ✅ Tailwind CSS 3.4.1 with shadcn/ui theming system
- ✅ Path aliases (`@/`) configured
- ✅ 40+ shadcn/ui components pre-installed
- ✅ All Radix UI dependencies included
- ✅ Parcel configured for bundling (via .parcelrc)
- ✅ Node 18+ compatibility (auto-detects and pins Vite version)

**Pre-installed shadcn/ui Components** (40+ total):
- accordion, alert, aspect-ratio, avatar, badge, breadcrumb
- button, calendar, card, carousel, checkbox, collapsible
- command, context-menu, dialog, drawer, dropdown-menu
- form, hover-card, input, label, menubar, navigation-menu
- popover, progress, radio-group, resizable, scroll-area
- select, separator, sheet, skeleton, slider, sonner
- switch, table, tabs, textarea, toast, toggle, toggle-group, tooltip

### Step 2: Implement Design Tokens

**IMPORTANT**: Before implementing, read the following documents to ensure the prototype strictly follows established specifications:

1. **Phase 4 (Interaction Specs)**: `doc/ixd/phase4-page-specs/` — Contains per-page interaction requirements, gestures, animations, and user flow specifications (one file per page: `page-P01.md`, `page-P02.md`, …)
2. **Phase 5 (Component Library)**: `doc/ixd/phase5-components.md` — Contains component specifications, states, and design tokens
3. **Phase 6 (Visual Design)**: `doc/ixd/phase6-visual.md` — Contains color system, typography, spacing, and visual styling

Define Phase 6 Design Tokens in `src/index.css` as CSS variables and Tailwind theme:

📄 **Examples**: `scripts/examples/design-tokens.css` (CSS variables template) and `scripts/examples/tailwind.config.js` (Tailwind theme extension) — read these files when implementing tokens.

### Step 3: Verify Device Frame Components

Before developing any pages, verify the device frame components are properly set up:

1. **Run Initialization** (if not done):
   ```bash
   bash <skill-dir>/scripts/init-artifact.sh <project-name>-prototype
   cd <product-name>-prototype
   ```

2. **Verify Component Files Exist**:
   ```
   src/components/layout/
   ├── PrototypeShell.tsx  ✅ Must exist
   ├── PhoneFrame.tsx      ✅ Must exist (mobile)
   ├── WindowFrame.tsx     ✅ Must exist (desktop)
   └── index.ts            ✅ Export all components
   ```

3. **Configure PrototypeShell for Your Platform**:
   > **IMPORTANT**: Match display area size with device frame for consistent appearance

   ```tsx
   // Mobile prototype - use 'mobile' displayMode (390px width)
   <PrototypeShell
     productName="My App"
     displayMode="mobile"
     cornerStyle="rounded"
   >
     <PhoneFrame>...</PhoneFrame>
   </PrototypeShell>

   // Desktop prototype - use 'desktop' displayMode (1280px width)
   <PrototypeShell
     productName="My App"
     displayMode="desktop"
     cornerStyle="rounded"
   >
     <WindowFrame>...</WindowFrame>
   </PrototypeShell>

   // Custom width - use contentWidth prop
   <PrototypeShell
     productName="My App"
     contentWidth={800}
     cornerStyle="square"
   >
     {/* custom content */}
   </PrototypeShell>
   ```

   **Props**:
   | Prop | Type | Description |
   |------|------|-------------|
   | `displayMode` | `'mobile' \| 'desktop' \| 'auto'` | Sets content width to match device (390px/1280px) |
   | `contentWidth` | `number` | Custom width in pixels, overrides displayMode |
   | `cornerStyle` | `'rounded' \| 'square'` | Corner radius style - should match device frame |

4. **Verify Bundle Includes Frames**:
   ```bash
   grep -o "PrototypeShell" dist/bundle.html  # Must be present
   grep -o "PhoneFrame" dist/bundle.html     # Must be present (mobile)
   grep -o "WindowFrame" dist/bundle.html    # Must be present (desktop)
   ```

5. **Verify Display Area Size** (Optional):
   ```bash
   # Check content width matches device frame
   grep -o "width: 390px" phase7-prototype.html   # Mobile
   grep -o "width: 1280px" phase7-prototype.html  # Desktop
   ```

### Step 4: Implement Page Components (TDD Cycle)

> **CRITICAL — TDD IS MANDATORY**: You MUST write the test first before writing any component code. Do NOT implement a page without a passing test. Skipping TDD is not permitted.

> **CRITICAL**: Each page component MUST be wrapped in the device frame (PhoneFrame/WindowFrame) to ensure proper device simulation.

**TDD Cycle (per page)**:

For each page, strictly follow RED → GREEN → proceed — **no exceptions**:

```
❌ WRONG: Write component first, then test (or skip test entirely)
✅ CORRECT: Write test first (RED), then implement until GREEN

1. Write test  (RED)    → pnpm test → FAIL   ← component doesn't exist yet
2. Implement component  → pnpm test → PASS   ← GREEN
3. Next page in batch
...
After all pages in batch: Bundle + Walkthrough heuristic check (visual quality)
```

**Mobile Page Test Template**:
📄 See `scripts/examples/CommunityHome.test.tsx` — copy and adapt for each mobile page.

**Desktop Page Test Template**:
📄 See `scripts/examples/Dashboard.test.tsx` — copy and adapt for each desktop page.

**Test commands**:
```bash
pnpm test        # watch mode — runs during development, re-runs on save
pnpm test:run    # single run — use before bundling to confirm all pages pass
```

**What tests cover vs Walkthrough**:

| Concern | Vitest (automated) | Walkthrough (heuristic) |
|---------|-------------------|------------------------|
| Renders without crashing | ✅ | — |
| Wrapped in device frame | ✅ (`data-testid`) | ✅ (bundle grep) |
| Key content from Phase 4 | ✅ | ✅ |
| State/interaction logic | ✅ | ⚠️ manual |
| Safe area / flex layout | ❌ jsdom has no CSS | ✅ |
| Animations / transitions | ❌ | ✅ |
| Visual design tokens | ❌ | ✅ |

> Tests catch **structural and logic** mistakes early. Walkthrough catches **visual and layout** issues after bundling. Both are required.

**Page Implementation Pattern**:
📄 Examples (read when implementing):
- `scripts/examples/CommunityHome.tsx` — mobile page with Tab Bar + Top Nav
- `scripts/examples/PostDetail.tsx` — mobile detail page without Tab Bar
- `scripts/examples/DesktopDashboard.tsx` — desktop page with Sidebar

**Reference Phase 4 for each page**:
- **Interaction Specs**: Each page must implement the gestures, transitions, and behaviors defined in `phase4-page-specs/page-N.md`
- **Component States**: Use component states (default, hover, pressed, disabled, loading) as defined in `phase5-components.md`
- **Visual Styling**: Apply colors, typography, and spacing from `phase6-visual.md` using the two-step lookup below:

**Phase 6 Visual Lookup (per page)**:

1. **Identify the page type** (Hub / List / Detail / Form / Auth / …) from the Phase 2 page inventory
2. **Find the type representative annotation** in `phase6-visual.md` Section 8A — this is the baseline visual spec for all pages of this type (background, nav bar, card style, CTA style, brand elements)
3. **Check the Visual Exception Table** (`phase6-visual.md` Section 8B) — if this specific page appears in the table, apply the listed override on top of the type representative
4. If the page type has no representative annotation and no exception entry, apply the standard design system defaults (tokens from `phase5-components.md` + colors from `phase6-visual.md` Section 1)

```
Visual decision priority (highest → lowest):
Page-specific exception (Section 8B)
  ↓
Type representative annotation (Section 8A)
  ↓
Design system defaults (Phase 5 tokens + Phase 6 color/typography)
```

**Cross-Platform Pages — Dual Implementation Required**:

> **RULE**: Check the `Platform` column in the Phase 2 page inventory (`doc/ixd/phase2-architecture.md`). Pages marked `Cross-platform` / `跨平台` MUST produce **two separate implementations** — one in `pages/mobile/` and one in `pages/desktop/` — each following its own Phase 4 layout spec. Implementing only one version does not satisfy this requirement.

| Platform value in Phase 2 | Required implementation |
|---------------------------|------------------------|
| `Mobile` / `移动端` / `MiniApp` / `小程序` | `pages/mobile/X.tsx` only |
| `Desktop` / `PC端` | `pages/desktop/X.tsx` only |
| `Web` | per Phase 4 spec (mobile or desktop frame) |
| `Cross-platform` / `跨平台` | `pages/mobile/X.tsx` **AND** `pages/desktop/X.tsx` |

When implementing a cross-platform page pair:
1. Read the Phase 4 spec for the mobile version first → write test (RED → `pnpm test` FAIL) → implement `pages/mobile/X.tsx` → GREEN
2. Read the Phase 4 spec for the desktop version → write test (RED → `pnpm test` FAIL) → implement `pages/desktop/X.tsx` → GREEN
3. Both versions share mock data from `lib/mockData.ts` and shared business components from `components/shared/`
4. Do NOT port mobile layout to desktop — each must use its platform-native frame and navigation pattern

> **CRITICAL — USE DESIGN TOKENS FOR ALL STYLING**: Every color, typography size/weight, border-radius, and shadow value MUST come from the Design Tokens defined in `src/index.css` (Step 2). Do NOT use raw Tailwind palette values — they bypass the design system and break Phase 6 visual fidelity.
>
> | ❌ Raw Tailwind (avoid) | ✅ Design Token (required) |
> |------------------------|--------------------------|
> | `bg-neutral-50` / `bg-gray-100` | `bg-background` / `bg-muted` / `bg-card` |
> | `text-gray-900` / `text-neutral-700` | `text-foreground` / `text-muted-foreground` / `text-card-foreground` |
> | `border-neutral-200` / `border-gray-300` | `border-border` |
> | `bg-blue-500` / `bg-indigo-600` (brand) | `bg-primary` / `bg-secondary` / `bg-accent` |
> | `text-white` on colored button | `text-primary-foreground` / `text-accent-foreground` |
> | `hover:bg-neutral-100` | `hover:bg-accent hover:text-accent-foreground` |
> | `rounded-lg` (arbitrary choice) | `rounded-[var(--radius)]` or use shadcn component defaults |
>
> **Apply this rule to every element**: backgrounds, text, borders, icons, dividers, hover/active states, badges, and overlays.

**Theme Propagation (Context)**:

`PrototypeShell` propagates the theme to all descendant `PhoneFrame`/`WindowFrame` via `ThemeContext`. **Do NOT pass `theme` prop** on page-level usage — just omit it and the shell toggle works automatically:

```tsx
// ✅ CORRECT — omit theme prop; shell toggle propagates automatically
<PhoneFrame tabBar={<AppTabBar />}>
  ...
</PhoneFrame>

// ✅ CORRECT — use explicit prop ONLY for pages that must always be dark/light
<PhoneFrame theme="dark">  {/* forced-dark splash */}
  ...
</PhoneFrame>

// ❌ WRONG — hardcoding theme="light" breaks the shell toggle
<PhoneFrame theme="light">
  ...
</PhoneFrame>
```

`useTheme()` is available for page content that needs to respond to theme changes:

```tsx
import { useTheme } from '@/components/layout';

export function MyPage() {
  const theme = useTheme(); // 'light' | 'dark', updates when shell toggles
  return (
    <PhoneFrame>
      <div className={theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'}>
        {/* Or better: use Tailwind tokens (bg-background text-foreground) */}
      </div>
    </PhoneFrame>
  );
}
```

**Dark Theme Support (MANDATORY)**:

> **CRITICAL**: Every page component and shared component (TabBar, Sidebar, NavBar, etc.) MUST support both light and dark themes. Components that only work in light mode are not acceptable — the shell's theme toggle must visually affect all page content.

Page content must respond to theme changes. Use one of these patterns (in order of preference):

| Priority | Pattern | Example |
|----------|---------|---------|
| 1st | Tailwind semantic tokens | `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border` |
| 2nd | Tailwind `dark:` variants | `bg-white dark:bg-neutral-900` |
| 3rd | `useTheme()` hook | `theme === 'dark' ? 'bg-neutral-900' : 'bg-white'` |
| ❌ Avoid | Raw hex / hardcoded value | `style={{ background: '#ffffff' }}` — breaks dark mode |

**Common Mistakes to Avoid**:
- ❌ NOT using PhoneFrame/WindowFrame — device simulation won't work
- ❌ Putting content outside PhoneFrame/WindowFrame — won't scroll properly
- ❌ Forgetting to wrap each page — only first page has frame
- ❌ Re-implementing the **status bar** inside page children — PhoneFrame already renders it as a flex child; adding it again causes duplication and layout overflow
- ❌ Adding `pt-11` to page `children` — status bar is now a flex sibling above `children`, no manual top padding needed
- ❌ Hardcoding `theme="light"` or `theme="dark"` on PhoneFrame/WindowFrame — breaks the shell's theme toggle; omit the prop instead
- ❌ Hardcoding colors as raw hex (`#ffffff`, `#1a1a1a`) in page content — use Tailwind tokens or `dark:` variants so dark mode works
- ❌ Implementing Tab Bar inside page children — use `tabBar` prop slot so it stays within screen area
- ❌ Using native scrollbar — PhoneFrame already handles scrolling with `scrollbar-hide`
- ❌ Re-implementing the **title bar** inside WindowFrame children — WindowFrame already renders it
- ❌ Implementing Sidebar inside page children — use `sidebar` prop slot so it stays as `flex-shrink-0` and never overflows the window
- ❌ Putting app-level Menu Bar / Toolbar directly in children (without `flex flex-col h-full` wrapper) — they will scroll with page content instead of staying fixed
- ❌ Re-implementing Menu Bar / Toolbar on every page individually — extract to `AppMenuBar` / `AppToolbar` components, use once per page via wrapper

**Mobile Page Responsibility Split**:

| Element | Belongs in | Reason |
|---------|-----------|--------|
| Status Bar (time / signal / battery) | **PhoneFrame** — already built-in | Phone Chrome, same on every page |
| Dynamic Island | **PhoneFrame** — already built-in | Phone Chrome |
| Home Indicator | **PhoneFrame** — already built-in | Phone Chrome |
| Tab Bar | **`tabBar` prop** → `AppTabBar` component | App Chrome, shared across pages, supports custom design (凸起按钮, badges) |
| Top Navigation Bar  | **Page `children`** | Page-specific, may scroll or collapse per Phase 4 spec |
| Page content (lists, cards, forms) | **Page `children`** | Page-specific, scrollable |

> **NOTE**: PhoneFrame provides:
> - **Status bar** (44px height, flex child inside screen) — rendered automatically, theme-aware colors, do NOT re-implement
> - **`tabBar` slot** — your custom `AppTabBar` component renders here as `flex-shrink-0`
> - **Hidden scrollbar** (`scrollbar-hide` class)
> - **Mouse wheel → scroll** translation (captures wheel events on entire phone frame; walks up from event target to find the nearest scrollable element — inner scroll containers scroll first, PhoneFrame root is fallback)
> - **Dynamic Island** (`pointer-events-none`, phone Chrome)
>
> **Content Safe Area**: Page `children` must respect:
> - Top: Status bar (44px) is already above `children` — do NOT add `pt-11`; DO add page-specific top nav bar if needed
> - Bottom: `tabBar` slot height is defined by `AppTabBar` — do NOT add bottom nav in children
> - Left/Right: within 390px screen width

**Mobile-Only Structure** (`platform: "mobile"` - default):

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (pre-installed)
│   ├── layout/
│   │   ├── AppTabBar.tsx      # Custom Tab Bar (tabBar slot for PhoneFrame) — implement per Phase 4 spec
│   │   ├── PrototypeShell.tsx # Simplified shell (project name + theme)
│   │   └── PhoneFrame.tsx     # Device frame for mobile pages (status bar built-in)
│   └── shared/          # Shared business components
├── pages/               # Page components (each wraps in PhoneFrame)
│   ├── Home.tsx
│   ├── ProductList.tsx
│   └── ...
├── hooks/              # Custom Hooks
│   └── useSwipeScroll.ts   # Mouse wheel to swipe simulation
├── lib/                # Utility functions + mock data
├── App.tsx             # Main app (routing configuration)
├── main.tsx            # Entry point
└── index.css           # Global styles + Design Tokens (Phase 6)
```

**Desktop-Only Structure** (`platform: "desktop"`):

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (pre-installed)
│   ├── layout/
│   │   ├── AppSidebar.tsx     # Custom Sidebar (sidebar slot for WindowFrame) — implement per Phase 4 spec
│   │   ├── AppMenuBar.tsx     # App-level menu bar (File/Edit/View/...) — only if Phase 4 spec includes it
│   │   ├── AppToolbar.tsx     # App-level toolbar/ribbon — only if Phase 4 spec includes it
│   │   ├── PrototypeShell.tsx # Simplified shell (project name + theme)
│   │   └── WindowFrame.tsx    # Desktop window frame for pages (title bar built-in)
│   └── shared/          # Shared business components
├── pages/               # Page components (each wraps in WindowFrame)
│   ├── Home.tsx
│   ├── ProductList.tsx
│   └── ...
├── hooks/              # Custom Hooks
├── lib/                # Utility functions + mock data
├── App.tsx             # Main app (routing configuration)
├── main.tsx            # Entry point
└── index.css           # Global styles + Design Tokens (Phase 6)
```

**Cross-Platform Structure** (`platform: "both"`):

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (pre-installed)
│   ├── layout/          # Layout components
│   │   ├── AppTabBar.tsx      # Mobile: Custom Tab Bar (tabBar slot for PhoneFrame)
│   │   ├── AppSidebar.tsx     # Desktop: Custom Sidebar (sidebar slot for WindowFrame)
│   │   ├── PrototypeShell.tsx # Shell (project name + theme)
│   │   ├── PhoneFrame.tsx     # Mobile device frame (status bar built-in)
│   │   └── WindowFrame.tsx    # Desktop device frame (title bar built-in)
│   └── shared/          # Shared business components
├── pages/
│   ├── mobile/          # Mobile-specific page implementations
│   │   ├── Home.tsx
│   │   ├── ProductList.tsx
│   │   └── ...
│   ├── desktop/         # Desktop-specific page implementations
│   │   ├── Home.tsx
│   │   ├── ProductList.tsx
│   │   └── ...
│   └── shared/          # Shared page fragments/components (optional)
├── hooks/               # Custom Hooks
├── lib/                 # Utility functions + mock data
│   └── mockData.ts      # Shared mock data
├── App.mobile.tsx      # Mobile entry point
├── App.desktop.tsx      # Desktop entry point
└── index.css            # Global styles + Design Tokens (shared)
```

### Step 5: Page Quality Check

Before bundling, run the Quality Checklist against every implemented page. For cross-platform projects (`platform: "both"`), check **both** the mobile and desktop version of each page.

**Severity levels** — defined in the [Quality Checklist](#quality-checklist) section:
- **P0 — Critical**: Prototype is broken or unusable. MUST fix before proceeding.
- **P1 — Important**: Significant deviation from spec or design system. MUST fix before bundling.
- **P2 — Suggested**: Minor improvement; fix if time allows, otherwise log for next iteration.

**Quality Check Loop**:

```
For each page (and each platform version for cross-platform pages):
  ├── Run through every item in the Quality Checklist
  ├── Record each FAIL with its severity (P0 / P1 / P2)
  └── If any P0 or P1 FAILs found:
        ├── Fix ALL P0 issues immediately
        ├── Fix ALL P1 issues
        └── Re-run Quality Check for the fixed pages → repeat until no P0/P1 FAILs remain
  → Only after zero P0/P1 FAILs: proceed to Step 6 (Bundle)
```

**Record results** in `doc/ixd/phase7-review-master.md` under the current batch section:

```markdown
### Quality Check — Batch N

| Page | Platform | P0 FAILs | P1 FAILs | P2 FAILs | Status |
|------|----------|----------|----------|----------|--------|
| Home | Mobile   | 0        | 1        | 2        | ⚠️ Fix P1 |
| Home | Desktop  | 0        | 0        | 1        | ✅ |
| Detail | Mobile | 1        | 0        | 0        | ❌ Fix P0 |

#### Issues Found

| ID | Page | Platform | Severity | Checklist Item | Description | Fix Applied |
|----|------|----------|----------|----------------|-------------|-------------|
| Q1 | Home | Mobile | P1 | Design Token enforced | `bg-gray-100` used in FeedCard | Changed to `bg-muted` |
| Q2 | Detail | Mobile | P0 | Safe area compliance | Content overflows behind status bar | Added `pt-0`, fixed nav structure |

#### Re-check Results (after fixes)

| Page | Platform | P0 FAILs | P1 FAILs | Status |
|------|----------|----------|----------|--------|
| Home | Mobile   | 0        | 0        | ✅ |
| Detail | Mobile | 0        | 0        | ✅ |

**Quality Check Verdict**: ✅ All P0/P1 resolved — proceed to Bundle
```

> **IMPORTANT**: P2 issues do NOT block bundling. Log them in the issues table and continue.

---

### Step 6: Bundle to Single HTML

#### Single-Platform Bundling

Run the bundling script from the project root:

```bash
# Run from the project root directory
bash <skill-dir>/scripts/bundle-artifact.sh
```

Output: `bundle.html`

**Naming convention**:
- Mobile-only: rename to `prototype.html` or `prototype-mobile.html`
- Desktop-only: rename to `prototype.html` or `prototype-desktop.html`

#### Cross-Platform Bundling

For `platform: "both"`, create two HTML entry files and bundle separately:

**1. Create entry files** (📄 read for exact content):
- `scripts/examples/index.mobile.html` — mobile HTML entry
- `scripts/examples/index.desktop.html` — desktop HTML entry
- `scripts/examples/main.mobile.tsx` — mobile React entry
- `scripts/examples/main.desktop.tsx` — desktop React entry

**2. Bundle each entry**:

```bash
# Bundle mobile version
pnpm exec parcel build index.mobile.html --dist-dir dist/mobile --no-source-maps
pnpm exec html-inline dist/mobile/index.mobile.html > prototype-mobile.html

# Bundle desktop version
pnpm exec parcel build index.desktop.html --dist-dir dist/desktop --no-source-maps
pnpm exec html-inline dist/desktop/index.desktop.html > prototype-desktop.html
```

Output: `prototype-mobile.html` + `prototype-desktop.html`

## PrototypeShell Component (Simplified Shell)

The shell provides a simplified display environment without device frames. **Device simulation is now moved to each page component**.

### Shell Required Elements

1. **Project Name**
   - Display at top center or top-left
   - Use Phase 6 brand color or Display/H1 font size
   - Optional subtitle: version number, update date

2. **Light/Dark Mode Toggle**
   - Position: top-right corner or navbar
   - Style: icon button (☀️/🌙) or Toggle Switch
   - Toggle applies `.dark` class globally
   - Default follows system preference (`prefers-color-scheme`)

3. **Display Area**
   - Contains the interactive page with device simulation
   - **Captures scroll events** — outer shell does NOT scroll
   - Each page component wraps content in device frame (PhoneFrame/WindowFrame)

### Shell Component Code

> **Canonical source**: `scripts/templates/PrototypeShell.tsx`
> The component is copied verbatim into the project by `init-artifact.sh`.
> **Do NOT edit** the code block below — edit the template file instead.

**Props API**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `productName` | `string` | — | Product name shown in header |
| `children` | `ReactNode` | — | Page content (device frames) |
| `displayMode` | `'mobile' \| 'desktop' \| 'auto'` | `'auto'` | Sets content width: 390px / 1280px / auto |
| `contentWidth` | `number` | — | Custom width, overrides `displayMode` |
| `cornerStyle` | `'rounded' \| 'square'` | `'rounded'` | Header corner radius, should match device frame |
| `pages` | `PageItem[]` | `[]` | Page navigator dots (right side) |
| `currentPage` | `string` | `''` | Active page id |
| `onPageChange` | `(id: string) => void` | — | Page navigation callback |
| `interactions` | `string[]` | — | Interaction guide list (Phase 4 summary) |

**Usage**:
```tsx
<PrototypeShell productName="My App" displayMode="mobile" cornerStyle="rounded">
  <PhoneFrame ...>...</PhoneFrame>
</PrototypeShell>
```

## PhoneFrame Component (Mobile Device Simulation)

> **Canonical source**: `scripts/templates/PhoneFrame.tsx`
> The component is copied verbatim into the project by `init-artifact.sh`.
> **Do NOT edit** the code block below — edit the template file instead.

### Design Principle

PhoneFrame manages **phone Chrome** only (status bar, frame, dynamic island, home indicator, scroll container). App-level navigation (Tab Bar, top nav) is implemented by the caller and passed via slots.

**Why not build Tab Bar into PhoneFrame?**
- Phase 4 specs often require custom Tab Bar designs (e.g., raised center publish button, branded colors, badge counts)
- Top navigation bars are page-specific (different headers per page)
- The generic `tabs: { id, label, icon }[]` API cannot express complex Tab Bar layouts

### Key Features:
- Realistic iPhone 14 frame (390×844px, Dynamic Island, status bar, home indicator)
- **No visible scrollbar** — uses `scrollbar-hide` utility
- **Mouse wheel converts to swipe** — captures wheel events and translates to scroll
- **`tabBar` slot** — rendered as `flex-shrink-0` at bottom, stays within screen area, never covers phone border
- **Dynamic Island** has `pointer-events-none` — does not intercept clicks

### Layout Structure

```
PhoneFrame outer div (relative, 390×844px, p-1.5, overflow-hidden)  ← wheel events captured here
├── Screen Area (rounded-[40px], h-full, flex-col)
│   ├── Status Bar (flex-shrink-0, h-11=44px)         ← inside screen, theme-aware text color
│   ├── Content (flex-1, overflow-y-auto)              ← scrollable, NO pt-11 needed
│   │   ├── [Top Nav Bar]  ← page-specific, inside children
│   │   └── [Page Content] ← scrollable
│   └── tabBar slot (flex-shrink-0)                   ← custom Tab Bar, within screen area
├── Dynamic Island (absolute top-1, z-20, pointer-events-none)
└── Home Indicator (absolute bottom-1, h-1)
```

**Props API**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Scrollable page content (top nav + main content). Status bar safe area is handled internally — do NOT add `pt-11`. |
| `tabBar` | `ReactNode` | `undefined` | Custom Tab Bar component. Rendered as `flex-shrink-0` at bottom of screen area. Pass `null` for pages without Tab Bar. |
| `theme` | `'light' \| 'dark'` | `'light'` | Frame and screen background color scheme |

**Safe Area Rules**:
- Top: Status bar (44px) is a flex child — automatically present, do NOT add extra top padding to `children`
- Bottom: `tabBar` slot is `flex-shrink-0` — the slot itself defines the height (e.g., 49pt + safe area)
- Left/Right: content stays within 390px screen area

**Usage**:
```tsx
// Typical page with custom Tab Bar — omit theme prop; PrototypeShell toggle propagates automatically
<PhoneFrame tabBar={<AppTabBar activeTab="home" onTabChange={setTab} />}>
  {/* Top navigation bar (page-specific, scrolls with content or sticky) */}
  <TopNavBar title="社区" rightIcon={<SearchIcon />} />
  {/* Scrollable page content */}
  <WaterfallFeed posts={posts} />
</PhoneFrame>

// Page without Tab Bar (e.g. detail page, auth page)
<PhoneFrame>
  <DetailPageContent />
</PhoneFrame>
```

**AppTabBar pattern** (implement in `src/components/layout/AppTabBar.tsx`):
📄 See `scripts/examples/AppTabBar.tsx` — shows custom Tab Bar with raised center button and badge support.

## WindowFrame Component (Desktop Device Simulation)

> **Canonical source**: `scripts/templates/WindowFrame.tsx`
> The component is copied verbatim into the project by `init-artifact.sh`.
> **Do NOT edit** the code block below — edit the template file instead.

**Props API**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Scrollable main content area (right of sidebar) |
| `sidebar` | `ReactNode` | `undefined` | Custom Sidebar component — rendered as `flex-shrink-0` column to the left of content. Use this for app-level navigation (e.g. `<AppSidebar />`). |
| `theme` | `'light' \| 'dark'` | `'light'` | Frame color scheme |
| `title` | `string` | `'Application'` | Title bar text |
| `width` | `number` | `1280` | Window width in px |
| `height` | `number` | `800` | Window height in px |

**Usage**:
```tsx
import { WindowFrame } from '@/components/layout/WindowFrame';
import { AppSidebar } from '@/components/layout/AppSidebar';

export function Dashboard() {
  return (
    <WindowFrame
      title="Dashboard"
      width={1280}
      height={800}
      sidebar={<AppSidebar activeItem="dashboard" />}
    >
      {/* Page content — scrollable, right of sidebar */}
      <div className="p-6">
        <h1>Dashboard</h1>
        {/* ... page content ... */}
      </div>
    </WindowFrame>
  );
}
```

**Desktop Page Responsibility Split**:

| Element | Belongs in | Reason |
|---------|-----------|--------|
| Title Bar (traffic lights + window title) | **WindowFrame** — already built-in | Window Chrome, same on every page |
| Sidebar (navigation items) | **`sidebar` prop** → `AppSidebar` component | App Chrome, shared across pages, supports collapsible design |
| App-level Menu Bar (File / Edit / View / ...) | **`children` wrapper** → `AppMenuBar` (flex-shrink-0) | App Chrome — use `flex flex-col h-full` wrapper pattern (see below) |
| App-level Toolbar / Ribbon (Bold / Undo / Insert...) | **`children` wrapper** → `AppToolbar` (flex-shrink-0) | App Chrome — same wrapper pattern |
| Page-specific Toolbar (Filter / Sort / Breadcrumb) | **Page `children`** | Page-specific, part of scrollable content |
| Page content (lists, tables, forms) | **Page `children`** | Page-specific, scrollable |

> **NOTE**: WindowFrame provides:
> - **Title bar** (40px height, window Chrome) — rendered automatically, macOS traffic lights + title text
> - **`sidebar` slot** — your custom `AppSidebar` component renders here as `flex-shrink-0` to the left of content
> - **Mouse wheel → scroll** translation for the content area (simulates desktop scrolling)
>
> **Content Safe Area**: Page `children` must respect:
> - Left: `sidebar` slot width is defined by `AppSidebar` — do NOT add sidebar navigation in children
> - Right: within total window width minus sidebar
> - Top: title bar is outside the content area — do NOT re-implement it inside children

**Word-style App Layout Pattern** (app with menu bar + toolbar):

When the app has an app-level menu bar and/or toolbar (e.g. Microsoft Word, Figma, VS Code), use a `flex flex-col h-full` wrapper as the FIRST element in `children`. This keeps the bars fixed (non-scrolling) above the scrollable content area:

📄 **Examples** (read when implementing):
- `scripts/examples/Editor.tsx` — Word-style desktop page with Menu Bar + Toolbar (the `flex flex-col h-full` wrapper pattern)
- `scripts/examples/AppMenuBar.tsx` — app-level menu bar component
- `scripts/examples/AppToolbar.tsx` — app-level toolbar/ribbon component

**Why `flex flex-col h-full` works**:
- `h-full` fills the WindowFrame content area exactly → outer `overflow-auto` never activates
- Menu bar and toolbar are `flex-shrink-0` → they stay fixed above content, never scroll
- `flex-1 overflow-y-auto` on the inner div → handles page scrolling independently

**AppSidebar Pattern** (implement per Phase 4 spec):
📄 See `scripts/examples/AppSidebar.tsx` — shows collapsible sidebar with navigation items and active state.


## Implementation Reference: Phase 4-6 Integration

### Phase 4 (Interaction Specs) Requirements

Each page component MUST implement interactions defined in `doc/ixd/phase4-page-specs/<page-id>.md`:

| Interaction Type | Implementation |
|-----------------|----------------|
| Tap/Click | React onClick handlers |
| Swipe | Wheel event + scroll translation (mobile) |
| Pull-to-refresh | Custom hook with scroll position detection |
| Page transitions | CSS transform or Framer Motion |
| Gestures | useSwipeScroll hook for touch simulation |

**Example** — Implementing a page from Phase 4:

```tsx
// src/pages/mobile/Home.tsx
import { PhoneFrame } from '@/components/layout/PhoneFrame';
import { useState } from 'react';

export function Home() {
  const [activeTab, setActiveTab] = useState('home');

  // Phase 4 interaction: pull-to-refresh
  const handleRefresh = () => {
    // Implement refresh logic
  };

  return (
    <PhoneFrame
      theme={theme}
      tabBar={<AppTabBar activeTab={activeTab} onTabChange={setActiveTab} />}
    >
      {/* Page content - implements Phase 4 layout from interaction specs */}
      {/* Top nav bar (page-specific) goes here as a child */}
      <div className="p-4">
        {/* Content from Phase 4 Layout Structure */}
      </div>
    </PhoneFrame>
  );
}
```

### Phase 5 (Component Library) Requirements

Use components with correct states from `phase5-components.md`:

```tsx
// Using shadcn/ui components with Phase 5 states
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Button states from Phase 5
<Button
  variant="default"    // Primary - from Phase 5 token
  size="lg"            // Touch target ≥44px
  disabled={isDisabled} // Disabled state
  loading={isLoading}  // Loading state
>
  {label}
</Button>
```

### Phase 6 (Visual Design) Requirements

**Before implementing any page**, run the Phase 6 Visual Lookup:
1. Identify page type → read Section 8A type representative annotation
2. Check Section 8B exception table for this specific page
3. Apply: exception overrides > type annotation > design system defaults

Apply design tokens from `phase6-visual.md`:

```tsx
// Using Phase 6 colors, typography, spacing
<div className="
  bg-background          /* Phase 6 background token */
  text-foreground       /* Phase 6 text token */
  p-4                  /* Phase 6 spacing */
  rounded-lg           /* Phase 6 border-radius */
">
  <h1 className="text-h1 font-semibold">
    {/* Phase 6 typography scale */}
  </h1>
</div>
```

## Usage Example in App.tsx

📄 See `scripts/examples/App.mobile.tsx` — complete mobile routing example with PrototypeShell + PhoneFrame + AppTabBar page switching.

## Typography & Aesthetic Guidelines

Follow Phase 6 visual requirements. For distinctive, non-generic aesthetics:

**Fonts** (from Phase 6):
```css
/* Example from Phase 6 Typography System */
@import url('https://fonts.googleapis.com/css2?family=<<Display Font>>:wght@400;600;700&family=<<Body Font>>:wght@300;400;500&display=swap');

:root {
  --font-display: '<<Display Font>>', serif;
  --font-body: '<<Body Font>>', sans-serif;
}
```

**Backgrounds**:
- Use subtle gradients, noise textures, or paper-like backgrounds
- Avoid pure white (#ffffff) or pure black (#000000)
- Apply Phase 6 color tokens consistently

**Animations** (from Phase 4):
```css
/* Page transitions from Phase 4 interaction specs */
.page-enter {
  opacity: 0;
  transform: translateX(20px);
}
.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}

/* Touch feedback from Phase 5 component states */
.tap-active {
  transform: scale(0.98);
  transition: transform 100ms ease;
}
```

## Batch Output Strategy

### Batch Workflow (Walkthrough-Based)

**Use when**: Many pages pending, want to generate 3-5 pages in one turn

**Process**:

1. **Generate Pages** (Batch, TDD cycle per page)
   - Read Phase 4 specs for pages in this batch
   - **CRITICAL**: For each page — write test first (`pnpm test` → FAIL), then implement until GREEN. Do NOT implement before the test exists.
   - **CRITICAL**: Each page MUST wrap content in PhoneFrame (mobile) or WindowFrame (desktop)

2. **Page Quality Check** (see [Step 5: Page Quality Check](#step-5-page-quality-check))
   - Run the **detailed Quality Checklist** against every page in this batch:
     - **Mobile pages**: Check all A1-A7 categories (Frame & Containment, Safe Area, Overlay Architecture, Input Toolbar, Navigation, Visual Tokens, Shell)
     - **Desktop pages**: Check all B1-B8 categories (WindowFrame & Entry Point, Window Dimensions, Overlay Architecture, Right-Panel, Safe Area, Navigation, Visual Tokens, Shell)
     - **Cross-platform pages**: Also check C. Cross-Platform category (Dual implementation, Platform-native layout, Design Token consistency, Shared resources)
   - For cross-platform batches, check **both** mobile and desktop versions
   - Fix all P0 and P1 FAILs; re-run check until zero P0/P1 remain
   - Record results in `doc/ixd/phase7-review-master.md` under `### Quality Check — Batch N`

3. **Bundle and Verify**
   - Run `bundle-artifact.sh` to produce prototype HTML
   - **VERIFY**: Check HTML includes device frames:
     ```bash
     grep -o "PhoneFrame" phase7-prototype.html | head -5  # At least 5 pages
     grep -o "WindowFrame" phase7-prototype.html | head -5  # At least 5 pages (desktop)
     grep -o "PrototypeShell" phase7-prototype.html | head -1  # At least 1
     ```
   - **If frame count < page count**: Pages are not using device frames. Fix before continuing.

4. **Batch Walkthrough + Per-Page Verification** (see [Per-Page Verification Procedure](#per-page-verification-procedure))
   - For each page in the batch: run Tool 2 heuristic (47 items) — focus on **visual/rendering aspects only** (animations, safe area layout, visual token rendering, dual-theme appearance, Phase 4 interaction compliance). Do NOT re-run the Quality Checklist — that was already completed in step 2.
   - **Append** results to `doc/ixd/phase7-review-master.md` as a new `## Batch N` section
   - (Create `phase7-review-master.md` on Batch 1; all subsequent batches append to it)

5. **Fix Issues** (if any)
   - Address all FAIL items before proceeding to next batch

6. **Pause for User Confirmation**

### Single-Platform Batch Output (`platform: "mobile"` or `"desktop"`)

1. **Read page inventory** from `doc/ixd/phase2-architecture.md`
2. **Read interaction specs** from `doc/ixd/phase4-page-specs/<page-id>.md` for each page in the batch
3. **Prioritize by importance**: dashboard/home → core lists → detail pages → forms → settings → secondary pages
4. **Output in batches of 3-5 pages** per turn to avoid token limits
5. **After each batch**:
   - **Page Quality Check**: run Quality Checklist for all pages in this batch; fix P0/P1 FAILs and re-check until zero P0/P1 remain; record results in `doc/ixd/phase7-review-master.md` → `### Quality Check — Batch N`
   - Run `bundle-artifact.sh` to produce updated prototype HTML
   - Save/overwrite `doc/ixd/phase7-prototype.html` (or platform-specific filename)
   - Update `progress.json`: record completed page IDs and `lastBatch`
   - **Append batch review to master report**: write `## Batch N` section to `doc/ixd/phase7-review-master.md` (create on Batch 1, append thereafter)
   - **PAUSE** — output a summary then ask the user:
     > "✅ Batch N complete — pages X, Y, Z implemented. Quality Check: all P0/P1 resolved. Prototype updated: `phase7-prototype.html`
     > Progress: M/total pages done.
     > Batch Review: `phase7-review-master.md` → Batch N section
     > **Continue to next batch?** (yes / stop here)"
   - Wait for user confirmation before proceeding

**Batch order example**:
```
Batch 1: Home(Hub) + Core list pages + Core detail pages
Batch 2: Secondary list pages + Secondary detail pages + Form pages
Batch 3: Settings pages + Profile pages + Search pages
Batch 4: Onboarding pages + Empty states + Error pages + Other auxiliary pages
```

### Cross-Platform Batch Output (`platform: "both"`)

When `platform: "both"`, implement both platforms in a single project:

1. **Read Phase 4, 5, 6 requirements first** for each page
2. **Implement shared resources first**: Design Tokens (`index.css`), mock data (`lib/mockData.ts`), shared components
3. **Implement layout components** (TDD): `AppTabBar.tsx` (mobile Tab Bar) and `AppSidebar.tsx` (desktop Sidebar) — write a smoke test first (renders without crashing + correct `data-testid`) → implement → `pnpm test` GREEN
4. **Implement page pairs** (TDD per page): For each page — write test (RED → `pnpm test` FAIL) → implement `pages/mobile/X.tsx` → GREEN, then write test (RED) → implement `pages/desktop/X.tsx` → GREEN
5. **Batch by page, not by platform**: Complete the mobile + desktop versions of a page together before moving to the next
6. **Page-by-page order**: dashboard/home → list/browse → detail → form/create → settings
7. **Output in batches of 2-3 page pairs per turn**
8. **After each batch**:
   - **Page Quality Check**: run Quality Checklist for **both** the mobile and desktop version of each page in this batch; fix P0/P1 FAILs and re-check until zero P0/P1 remain for all versions; record results in `doc/ixd/phase7-review-master.md` → `### Quality Check — Batch N`
   - Bundle both platforms: run `bundle-artifact.sh` for mobile + desktop entries
   - Save/overwrite `doc/ixd/phase7-prototype-mobile.html` and `phase7-prototype-desktop.html`
   - Update `progress.json` with completed page IDs for both platforms
   - **Append batch review to master report**: write `## Batch N (mobile + desktop)` section to `doc/ixd/phase7-review-master.md`
   - **PAUSE** — output a summary then ask:
     > "✅ Batch N complete — page pairs X, Y implemented (mobile + desktop). Quality Check: all P0/P1 resolved.
     > Prototypes updated: `phase7-prototype-mobile.html` + `phase7-prototype-desktop.html`
     > Progress: M/total page pairs done.
     > Batch Review: `phase7-review-master.md` → Batch N section
     > **Continue to next batch?** (yes / stop here)"
   - Wait for user confirmation before proceeding

### Batch Interaction Walkthrough Report

After each batch, **append** the following section to `doc/ixd/phase7-review-master.md`:

```markdown
## Batch N — Pages: X, Y, Z

**Platform**: mobile | desktop | both
**Date**: YYYY-MM-DD
**Reviewer**: AI (Walkthrough + Per-Page Verification)

### Test Results
- Tool 2 Heuristic: <<PASS/FAIL>> (X/47 items passed)

### Walkthrough Score

| Dimension | Pass/Total | Score |
|-----------|------------|-------|
| Basic Interactions | /5 | % |
| Page States | /4 | % |
| Navigation and Flow | /4 | % |
| Forms and Input | /4 | % |
| Data Loading | /4 | % |
| Content Display | /4 | % |
| Visual and Brand | /5 | % |
| Touch and Click | /3 | % |
| Desktop-Exclusive | /10 | % |
| Cross-Platform Consistency | /4 | % |
| **Overall** | **/47** | **%** |

### Issues Found
1. <<Issue 1 - Severity: P0/P1/P2>>
2. <<Issue 2 - Severity: P0/P1/P2>>

### Fixes Applied
- <<Fix 1>>
- <<Fix 2>>

### Phase 4 Compliance
- [ ] All interactions from Phase 4 implemented
- [ ] All transitions match Phase 4 specifications
- [ ] All component states from Phase 5 applied

### Verdict
✅ PASS - Continue to next batch
❌ FAIL - Requires fixes before proceeding
```

### Master Report Structure (`phase7-review-master.md`)

All batch reviews and the final completeness check are written to **one file** with incremental sections:

```markdown
# Phase 7 Review Master Report

## Batch 1 — Pages: Home, ProductList, ProductDetail
[batch 1 walkthrough + per-page table + verdict]

## Batch 2 — Pages: Cart, Profile, Settings
[batch 2 walkthrough + per-page table + verdict]

...

## Final Completeness Check
[completeness report against Phase 2 inventory]
```

**Rules**:
- Create `phase7-review-master.md` on Batch 1; **append** (never overwrite) for all subsequent batches
- If issues were found and fixed, record fixes inline under the relevant batch section
- If verdict is FAIL: do NOT proceed to next batch until issues are resolved and verdict updated to PASS

## Resume Logic (Breakpoint Recovery)

When resuming Phase 7 after a break, follow this process:

### Step 1: Read Progress State

```js
// Read from progress.json
const phase7Status = progress.phases['7'];
const completedSteps = phase7Status.completedSteps || [];
const currentStep = phase7Status.currentStep || 'init';
const completedPages = phase7Status.pagesCompleted || [];
const platform = progress.platform || 'mobile'; // "mobile" | "desktop" | "both"
```

### Step 2: Determine Resume Point

| currentStep | Description | Resume Action |
|-------------|-------------|---------------|
| `init` | Project not initialized | Start from Step 1: Initialize project |
| `tokens` | Design tokens not implemented | Resume from Step 2: Implement Design Tokens (from Phase 6) |
| `layout` | Layout framework not ready | Resume from Step 3: Implement PhoneFrame/WindowFrame |
| `pages` | Pages being filled | Continue filling from first incomplete page |
| `bundle` | All pages done, not bundled | Proceed to Step 5: Bundle |
| `done` | Phase complete | Run completeness check, proceed to Phase 8 |

### Step 3: Page Resume Logic

```js
// If currentStep === 'pages'
const expectedPages = readPageInventory('doc/ixd/phase2-architecture.md');
const remainingPages = expectedPages.filter(p => !completedPages.includes(p.id));

if (remainingPages.length > 0) {
  // Output resume message
  console.log(`## Phase 7 Resume

**Platform**: ${platform}
**Completed**: ${completedPages.length}/${expectedPages.length} pages
**Remaining**: ${remainingPages.length} pages to implement

| Page ID | Page Name | Page Type |
|---------|-----------|-----------|
${remainingPages.map(p => `| ${p.id} | ${p.name} | ${p.type} |`).join('\n')}

Resuming from **${remainingPages[0].name}**.
Remember to apply Phase 4 interaction specs, Phase 5 component states, and Phase 6 visual tokens.`);

  // Process remaining pages in batches
  // Update pagesCompleted after each batch
}
```

### Step 4: Completeness Check

When all pages are marked complete, verify actual implementation:

```js
// For single platform
const actualPages = extractPagesFromPrototype('src/pages/');

// For cross-platform, check both
const mobilePages = extractPagesFromPrototype('src/pages/mobile/');
const desktopPages = extractPagesFromPrototype('src/pages/desktop/');

// Compare with Phase 2 inventory
const missingPages = expectedPages.filter(p => !actualPages.includes(p.id));

if (missingPages.length === 0) {
  // All pages implemented
  console.log('✅ Completeness check passed. Proceeding to bundle.');
  // Update progress: currentStep = 'bundle'
} else {
  console.log(`⚠️ Found ${missingPages.length} missing pages`);
  // Generate missing pages, then re-run check
}
```

### Phase 2 Completeness Report

After all batches are complete, generate a completeness report against Phase 2 page inventory:

```markdown
## Phase 7 Completeness Report

**Date**: YYYY-MM-DD
**Platform**: mobile | desktop | both
**Total Pages**: X (from Phase 2)
**Implemented**: Y
**Missing**: Z

### Page Inventory Check

| Page ID | Page Name | Status |
|---------|-----------|--------|
| P01 | Home | ✅ |
| P02 | Product List | ✅ |
| P03 | Product Detail | ⚠️ Missing |
| ... | ... | ... |

### Missing Pages
1. **Page Name** - Reason: <<why missing>>
   - Action: <<implement / skip>>

### Cross-Platform Check (if applicable)
- Mobile Pages: X/Y implemented
- Desktop Pages: X/Y implemented
- Gaps: <<list gaps>>

### Verdict
✅ COMPLETE - Proceed to Phase 8
⚠️ INCOMPLETE - Missing pages need implementation
```

### Merging Final Report

After generating completeness report:
1. Append completeness report to `doc/ixd/phase7-review-master.md`
2. Update `progress.json` with final `pagesCompleted` and `pagesTotal`
3. If verdict is COMPLETE, proceed to Phase 8
4. If verdict is INCOMPLETE, implement missing pages then re-run completeness check

### Progress Update Format

```json
{
  "phases": {
    "7": {
      "status": "in_progress",
      "currentStep": "pages",
      "completedSteps": ["init", "tokens", "layout"],
      "pagesCompleted": ["P01", "P02", "P03"],
      "pagesTotal": 15,
      "platform": "mobile",
      "projectPath": "<product-name>-prototype",
      "lastUpdated": "2026-03-13T10:30:00Z"
    }
  }
}
```

## Output Files

### Single-Platform Prototype (default)

Bundled as **single HTML file**:
- Project: `<product-name>-prototype/`
- Output: `bundle.html` (rename to `prototype.html` or `prototype-mobile.html`/`prototype-desktop.html`)

### Cross-Platform Prototype

**Single project, dual output files**:
- Project: `<product-name>-prototype/` (contains both mobile and desktop implementations)
- Outputs:
  - `prototype-mobile.html` — Mobile prototype (phone frame inside display area)
  - `prototype-desktop.html` — Desktop prototype (window frame inside display area)

**Advantages of single-project approach**:
- Shared Design Tokens ensure visual consistency (Phase 6)
- Shared mock data reduces duplication
- Shared business components maximize code reuse
- Single `pnpm install` for all dependencies

Each output file implements platform-native interaction paradigms without responsive breakpoint mixing.

## Design Style Guide (Avoid AI Feel)

Follow Phase 6 visual requirements. To avoid producing overly "AI-looking" designs:
- ❌ Avoid over-centered layouts
- ❌ Avoid large purple gradients
- ❌ Avoid uniform border-radius (use different radii based on element hierarchy)
- ❌ Avoid default Inter font (choose appropriate font based on Phase 6 font system)
- ✅ Use brand colors and design language defined in Phase 6
- ✅ Maintain clear visual hierarchy (title > body > auxiliary text)
- ✅ Appropriate use of whitespace and breathing room

## Quality Checklist

**Usage in Development Workflow**:
- **Step 5 (Page Quality Check)**: Run this checklist before bundling to catch structural and code-level issues
- **Batch Workflow Step 2 (Page Quality Check)**: Run this checklist for each page batch before walkthrough
- **Focus Areas**: Frame containment, safe area compliance, overlay architecture, design tokens, theme support
- **Batch Workflow Step 4 (Walkthrough)**: After Quality Check passes, run visual/rendering verification (Tool 2 Heuristic) — do NOT re-run this checklist

### Issue Severity Levels

| Level | Name | Definition | Action Required |
|-------|------|------------|-----------------|
| **P0** | Critical | Prototype is broken, frame missing, page crashes, or content completely inaccessible. Makes the prototype unusable. | **Must fix immediately.** Do not bundle until all P0s are resolved. Re-run full Quality Check after fix. |
| **P1** | Important | Significant deviation from spec, design system violation, broken navigation, or theme failure. Degrades prototype quality noticeably. | **Must fix before bundling.** Re-run Quality Check for affected pages after fix. |
| **P2** | Suggested | Minor visual imperfection, missing enhancement, or suboptimal implementation. Prototype remains functional and spec-compliant. | Fix if time allows. Log in issues table and proceed to bundle if not fixed. |

> **Fix loop rule**: After fixing P0/P1 issues, re-run the Quality Check for the affected pages only. Repeat until zero P0/P1 FAILs remain across all pages (and both platforms for cross-platform projects).

---

### Per-Page Verification (Mandatory)

Each page in the batch must pass the following checks. Each item is tagged with its severity level.

#### A. Mobile

**A1. Frame & Containment (PhoneFrame)**
- [ ] `[P0]` **TDD tests pass** — `pnpm test` exits green (smoke + `data-testid="phone-frame"` + content checks)
- [ ] `[P0]` PhoneFrame component wraps each mobile page; the root element inside PhoneFrame is `<div className="flex flex-col h-full ...">` (or a single container that fills the phone screen)
- [ ] `[P0]` No content uses `position: fixed` — all overlays and full-screen views use `position: absolute` so they stay within PhoneFrame bounds and do not escape to the browser viewport
- [ ] `[P0]` **Bottom action bars use flex layout, not absolute positioning** — bottom bars and toolbars use `flex-shrink-0` pattern inside a `flex flex-col h-full` parent; NEVER `absolute bottom-0 left-0 right-0` (which anchors to PhoneFrame's outer border, not the screen area)
- [ ] `[P0]` No broken interactions or dead-end states
- [ ] `[P0]` Tab Bar passed via `tabBar` prop slot (not re-implemented inside page children)

**A2. Safe Area Compliance**
- [ ] `[P0]` No content hidden behind status bar (no manual `pt-11`); Tab Bar within screen area via `tabBar` slot; content stays within 390px
- [ ] `[P1]` Content area wrapping: `<PhoneFrame>` → `<div className="relative flex flex-col h-full">` (the `relative` is critical — it makes `absolute`-positioned overlays anchor to the screen area, not the phone border)
- [ ] `[P1]` Pages with `overflow-y-auto` content DO NOT set `pb-N` as a padding hack to avoid bottom bar overlap; they use `flex-shrink-0` on the bottom bar instead

**A3. Overlay Architecture**
- [ ] `[P0]` **Overlay-type pages are embedded as inline overlays, NOT navigated as separate routes** — pages classified as Overlay (Dialog/Modal/Sheet/Picker/Disclaimer/Share) in Phase 2 are rendered by their upstream page using local state; the upstream page imports and renders the overlay component inline
- [ ] `[P1]` Overlay components use `absolute inset-0 z-50` (within the upstream page's `relative` container); they never use `fixed inset-0` for mobile
- [ ] `[P1]` Overlay components have a `data-testid` root element and the upstream page has tests verifying they open/close correctly (no navigation call triggered)
- [ ] `[P1]` Image pickers, disclaimer sheets, share sheets, media viewers triggered from chat/report pages are embedded as overlays — clicking opens them inline, no page route change occurs

**A4. Input Toolbar Layout (for pages with input bars)**
- [ ] `[P1]` Input toolbar buttons match the spec layout — typically `[icon] [input] [send/voice]`; no duplicate function buttons (e.g., two microphone buttons in the same toolbar)
- [ ] `[P1]` Voice recording overlay (C17) is a full-screen overlay (`absolute inset-0`) with half-transparent backdrop + mic icon + waveform + timer; NOT a small bottom strip (C18 = desktop modal pattern)
- [ ] `[P1]` Toolbar layout uses exactly the number of buttons specified in Phase 4 component table; cross-check C-numbered components with implementation

**A5. Interaction Flows & Navigation**
- [ ] `[P1]` Splash/onboarding page has auto-redirect timer (check Phase 4 spec for timing)
- [ ] `[P1]` All upstream → downstream page flows connected; no orphan pages (pages with no entry point from a parent page)
- [ ] `[P1]` Image/media click handlers in chat and detail pages trigger P15-style media viewer overlay
- [ ] `[P1]` Share buttons in report/chat detail pages trigger share overlay within the same `relative` container
- [ ] `[P1]` All pages from Phase 2 architecture implemented

**A6. Visual & Design Tokens**
- [ ] `[P1]` Phase 4 interactions implemented (gestures, transitions)
- [ ] `[P1]` Phase 5 component states used correctly
- [ ] `[P1]` Phase 6 design tokens applied consistently
- [ ] `[P1]` Touch targets ≥ 44px
- [ ] `[P1]` Back navigation works consistently
- [ ] `[P1]` **Design Token enforced** — no raw hex values (`#xxxxxx`), no raw Tailwind palette classes (`bg-gray-100`, `text-neutral-700`); all colors via semantic tokens (`bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`, etc.)
- [ ] `[P1]` **Brand-specific exceptions documented** — certain colors (e.g., WeChat green `#07C160`) are intentionally hardcoded as brand identity; document these in Phase 6 visual spec Section 8B exceptions
- [ ] `[P1]` **Both themes verified** — page renders correctly in light mode AND dark mode; no element uses hardcoded light-only or dark-only color (`bg-white`, `bg-neutral-900`, `border-neutral-200`, `dark:bg-neutral-*`, etc.)

**A7. Shell & Device Frame**
- [ ] `[P1]` PrototypeShell provides project name, theme toggle, display area (no device frame in shell)
- [ ] `[P1]` Status bar with time, signal, WiFi, battery (SVG icons)
- [ ] `[P1]` **No scrollbar visible** — uses `scrollbar-hide` utility
- [ ] `[P1]` **Mouse wheel converts to swipe** — scroll events captured in PhoneFrame
- [ ] `[P2]` Dynamic Island and Home Indicator present
- [ ] `[P2]` Page transitions have animation
- [ ] `[P2]` Mock data is realistic

---

#### B. Desktop

**B1. WindowFrame & Entry Point**
- [ ] `[P0]` **TDD tests pass** — `pnpm test` exits green (smoke + `data-testid="window-frame"` + content checks)
- [ ] `[P0]` **Desktop prototype starts from the login/auth page** (not the home/dashboard page) — App.desktop.tsx `useState` defaults to the login page ID
- [ ] `[P0]` WindowFrame component wraps **every non-overlay desktop page**; pages that lack WindowFrame must be wrapped in App's router either inline or with an explicit `<WindowFrame>` wrapper
- [ ] `[P0]` Title bar with window controls (red/yellow/green dots for macOS) — NOT re-implemented inside children
- [ ] `[P0]` Sidebar passed via `sidebar` prop slot (not re-implemented inside page children)
- [ ] `[P0]` No broken interactions or dead-end states

**B2. Window Dimensions**
- [ ] `[P1]` **Auth pages (login/register/OTP/forgot-password) use compact window size** (≤640×600) — these are modal-like auth dialogs, not full workspace windows
- [ ] `[P1]` Auth page components use `h-full` (not `min-h-screen`) for their root element — `min-h-screen` overflows inside a fixed-height WindowFrame
- [ ] `[P1]` **Main app pages use standard window size** (default 1280×800) — workspace, lists, details, settings
- [ ] `[P1]` **Auth pages have no double WindowFrame** — if the component already has its own WindowFrame, the App router should NOT wrap it again in another WindowFrame

**B3. Overlay Architecture (Desktop)**
- [ ] `[P0]` **Dialog/overlay pages do NOT have WindowFrame** — pages classified as Dialog/Modal/Sheet in Phase 2 render without WindowFrame; they are presented as overlays by their upstream pages
- [ ] `[P1]` Dialog/overlay components use `absolute inset-0 z-50` (within their upstream page's `relative` container) for overlays that should fill the window; they NEVER use `fixed inset-0` on desktop (which escapes the WindowFrame)
- [ ] `[P1]` Dialog pages (e.g., confirmation dialogs, permission dialogs) that use `fixed inset-0` for a full-screen backdrop are acceptable ONLY when they are presented standalone in the prototype picker (for preview purposes); when triggered from upstream pages they should be overlay components
- [ ] `[P1]` **Right-panel detail pages are embedded inline, not separate routes** — pages designed as right-panel sub-views (e.g., history panels, report detail panels) are shown inline in the parent page's right column by toggling local state; clicking "history" does not navigate to a new WindowFrame page

**B4. Right-Panel Inline Expansion (for multi-panel layouts)**
- [ ] `[P1]` List pages with a right detail column (Hub/List with sidebar) show detail views inline in the right panel when an item is clicked — not by navigating to a new full-page route
- [ ] `[P1]` The right-panel detail component: (a) has no WindowFrame wrapper, (b) has an `onBack` prop to close itself, (c) is rendered conditionally by the parent's `detailView` state
- [ ] `[P1]` Multi-level right-panel navigation works (e.g., list → item → sub-item) via local state `detailView` enum, not via App-level routing

**B5. Safe Area & Layout Containment**
- [ ] `[P0]` No content uses `position: fixed` inside a WindowFrame — all overlays use `position: absolute` so they stay within window bounds
- [ ] `[P1]` Content area scrollable (right of sidebar)
- [ ] `[P1]` App-level toolbar/header uses `flex flex-col h-full` + `flex-shrink-0` wrapper — stays fixed above content

**B6. Interaction & Navigation**
- [ ] `[P1]` All pages from Phase 2 architecture implemented
- [ ] `[P1]` Phase 4 interactions implemented (keyboard shortcuts, hover states)
- [ ] `[P1]` Phase 5 component states used correctly
- [ ] `[P1]` Phase 6 design tokens applied consistently
- [ ] `[P1]` Sidebar navigation works and collapses correctly (240px ↔ 56px)
- [ ] `[P1]` Keyboard navigation works (Tab focus ring visible on all interactive elements)
- [ ] `[P1]` Hover states on all interactive elements

**B7. Visual & Design Tokens**
- [ ] `[P1]` **Design Token enforced** — no raw hex values, no raw Tailwind palette classes (`bg-white`, `bg-neutral-*`, `border-neutral-*`); all colors via semantic tokens (`bg-background`, `border-border`, etc.)
- [ ] `[P1]` **Both themes verified** — page renders correctly in light mode AND dark mode; desktop pages must NOT use `bg-white dark:bg-neutral-900` (hardcoded duality); use `bg-background` which handles both
- [ ] `[P1]` Window frame with proper shadow and border

**B8. Shell**
- [ ] `[P1]` PrototypeShell provides project name, theme toggle, display area (no device frame in shell)
- [ ] `[P2]` Keyboard shortcuts registered and hint labels shown
- [ ] `[P2]` Right-click context menu appears on relevant items (shadcn/ui ContextMenu)
- [ ] `[P2]` Tooltips with appropriate delay (shadcn/ui Tooltip)

---

#### C. Cross-Platform (only when `platform: "both"`)

- [ ] `[P0]` **Dual implementation** — every `Cross-platform` page from Phase 2 has both `pages/mobile/X.tsx` AND `pages/desktop/X.tsx`; no page implemented on one platform only
- [ ] `[P1]` **Platform-native layout** — mobile uses PhoneFrame + Tab Bar; desktop uses WindowFrame + Sidebar; layouts are NOT copies of each other
- [ ] `[P1]` **Design Token consistency** — both versions use the same `index.css` token definitions
- [ ] `[P1]` **Overlay architecture consistent** — same pages are overlay on both platforms (e.g., disclaimer sheet, share panel, image picker); behavior may differ by platform (mobile: `absolute inset-0` full-screen; desktop: `absolute` positioned panel within window)
- [ ] `[P2]` **Shared resources used** — both versions reference shared mock data and shared business components; logic is not duplicated

---

### Quick Reference: Common Failure Patterns

The following patterns have been observed in real prototypes and MUST be explicitly checked:

| Pattern | Platform | Severity | Correct Approach |
|---------|----------|----------|-----------------|
| Bottom bar uses `absolute bottom-0 left-0 right-0` | Mobile | P0 | Use `flex flex-col h-full` + `flex-shrink-0` on bar |
| Overlay component rendered as PhoneFrame sibling (not inside `relative` container) | Mobile | P0 | Move overlay inside `<div className="relative flex flex-col h-full">` |
| Overlay uses `fixed inset-0` (escapes PhoneFrame to browser viewport) | Mobile | P0 | Change to `absolute inset-0 z-50` |
| Missing `relative` wrapper on upstream page that contains overlays | Mobile | P1 | Add `relative` to PhoneFrame's direct child container |
| Bottom content area uses `pb-N` hack instead of `flex-shrink-0` | Mobile | P1 | Refactor layout to flex column |
| Voice recording overlay is a small bottom strip (C18 pattern instead of C17) | Mobile | P1 | Full-screen `absolute inset-0` with backdrop + waveform + swipe-to-cancel hint |
| Two microphone buttons in input toolbar | Mobile | P1 | Single right-side button: enters voice mode when empty, sends when has text |
| No P15 overlay trigger from image messages in chat | Mobile | P1 | Add `onClick={() => setShowMediaViewer(true)}` to image thumbnails |
| App.desktop.tsx default page is home/dashboard, not login | Desktop | P0 | `useState('P03')` (login page ID) |
| Auth page double-wrapped in WindowFrame (component + App router) | Desktop | P0 | Remove outer wrapper in App router |
| Auth page uses `min-h-screen` inside WindowFrame | Desktop | P1 | Change to `h-full overflow-y-auto scrollbar-hide` |
| Main app page has no WindowFrame in standalone preview | Desktop | P1 | Wrap in `<WindowFrame>` in App router's switch-case |
| Desktop page uses `fixed inset-0` (escapes WindowFrame) | Desktop | P0 | Change to `absolute inset-0 z-50` |
| Right-panel detail page is a separate route (not inline panel) | Desktop | P1 | Embed as inline component in parent's right column via `detailView` state |
| Hardcoded `bg-white dark:bg-neutral-900` / `border-neutral-*` | Both | P1 | Replace with `bg-background` / `border-border` |
| Brand color (WeChat green, etc.) overridden by theme token | Both | P1 | Hardcode brand color; document as exception in Phase 6 Section 8B |

---

### Per-Page Verification Procedure

This is the execution procedure for **Step 4 of each batch** ("Batch Walkthrough + Per-Page Verification"). It covers **visual/rendering verification only** — structural and code-level checks were already completed in step 2 (Quality Check). For each batch of pages, perform the following **for every page** in the batch:

> **Scope**: Tool 2 Heuristic covers rendering concerns that jsdom cannot verify during the pre-bundle Quality Check: safe area / flex layout, animations / transitions, and visual design token rendering. Do NOT re-run the Quality Checklist here.

1. **Run `pnpm test:run`**: All TDD tests must pass before walkthrough (quick re-confirm after bundle)
2. **Run Tool 2 Heuristic**: Check each page against the 47-item checklist — focus on visual and Phase 4 compliance items
3. **Per-Page Check**: Record results in master report
   *(This table is written as part of the `## Batch N` section in `phase7-review-master.md`)*

   | Page ID | Page Name | TDD ✅ | Tool 2 Score | Phase 4 Compliance |
   |---------|-----------|--------|-------------|-------------------|
   | P01 | Home | ✅ | 95% | ✅ |
   | P02 | List | ✅ | 88% | ✅ |
   | P03 | Detail | ✅ | 75% | ⚠️ Missing gestures |

   **Issues Found**: P03 Tool 2 score below 80%
   **Verdict**: ✅ All pages pass — Continue / ❌ Fix before proceeding

4. **Fix Issues** (if any): fix failing pages, re-run `pnpm test:run` + re-verify, update verdict in master report

5. **Update Progress**:
   - Mark pages as verified in `progress.json`
   - Only proceed to next batch when all pages in current batch have PASS verdict

---
