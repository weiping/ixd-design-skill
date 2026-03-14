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

**Key Change in v2.5**: Device simulation (phone/desktop frame) is no longer in the shell — it's implemented within each page component. The shell only provides the project name, theme toggle, and scrollable display area.

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

1. **Phase 4 (Interaction Specs)**: `doc/ixd/phase4-page-interaction.md` — Contains per-page interaction requirements, gestures, animations, and user flow specifications
2. **Phase 5 (Component Library)**: `doc/ixd/phase5-components.md` — Contains component specifications, states, and design tokens
3. **Phase 6 (Visual Design)**: `doc/ixd/phase6-visual.md` — Contains color system, typography, spacing, and visual styling

Define Phase 6 Design Tokens in `src/index.css` as CSS variables and Tailwind theme:

**Color System** (example):
```css
:root {
  --primary: <<primary-color>>;
  --primary-foreground: <<primary-text-color>>;
  --secondary: <<secondary-color>>;
  --accent: <<accent-color>>;
  --background: <<background-color>>;
  --foreground: <<text-color>>;
  --muted: <<muted-background>>;
  --muted-foreground: <<muted-text>>;
  --card: <<card-background>>;
  --border: <<border-color>>;
  --radius: <<border-radius-base>>;
  /* Functional colors */
  --success: <<success-color>>;
  --warning: <<warning-color>>;
  --destructive: <<error-color>>;
}

.dark {
  /* Dark mode variable overrides */
  --background: <<dark-background>>;
  --foreground: <<dark-text>>;
  /* ... */
}

/* Hide scrollbar utility for prototype content areas */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari, Opera */
}
```

**Tailwind Theme Extension** (tailwind.config.js):
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
        'display': ['<<Display-size>>', { lineHeight: '<<line-height>>' }],
        'h1': ['<<H1-size>>', { lineHeight: '<<line-height>>', fontWeight: '600' }],
        // ...
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)', // Mobile safe area
      }
    }
  }
}
```

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

> **CRITICAL**: Each page component MUST be wrapped in the device frame (PhoneFrame/WindowFrame) to ensure proper device simulation.

**TDD Cycle (per page)**:

For each page, follow RED → GREEN → proceed:

```
1. Write test  (RED)    → pnpm test → FAIL   ← component doesn't exist yet
2. Implement component  → pnpm test → PASS   ← GREEN
3. Next page in batch
...
After all pages in batch: Bundle + Walkthrough heuristic check (visual quality)
```

**Mobile Page Test Template**:
```tsx
// src/pages/__tests__/CommunityHome.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommunityHome } from '../CommunityHome';

describe('CommunityHome', () => {
  // ① Smoke — renders without crashing (catches import errors, undefined vars)
  it('renders without crashing', () => {
    expect(() => render(<CommunityHome />)).not.toThrow();
  });

  // ② Device frame — MUST wrap in PhoneFrame (data-testid="phone-frame" built-in)
  it('wraps in PhoneFrame', () => {
    const { getByTestId } = render(<CommunityHome />);
    expect(getByTestId('phone-frame')).toBeInTheDocument();
  });

  // ③ Key content — replace with actual content from Phase 4 spec
  it('shows main content area', () => {
    render(<CommunityHome />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  // ④ Key interaction — add per Phase 4 interaction spec (optional but recommended)
  it('clicking a feed card opens detail', async () => {
    const user = userEvent.setup();
    render(<CommunityHome />);
    // implement per Phase 4 spec
  });
});
```

**Desktop Page Test Template**:
```tsx
// src/pages/desktop/__tests__/Dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import { Dashboard } from '../Dashboard';

describe('Dashboard', () => {
  it('renders without crashing', () => {
    expect(() => render(<Dashboard />)).not.toThrow();
  });

  // ② Device frame — MUST wrap in WindowFrame (data-testid="window-frame" built-in)
  it('wraps in WindowFrame', () => {
    const { getByTestId } = render(<Dashboard />);
    expect(getByTestId('window-frame')).toBeInTheDocument();
  });

  // ③ Key content — replace with actual content from Phase 4 spec
  it('shows dashboard content', () => {
    render(<Dashboard />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
```

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

```tsx
// src/pages/CommunityHome.tsx (Mobile — page with Tab Bar + Top Nav)
import { PhoneFrame } from '@/components/layout/PhoneFrame';
import { AppTabBar } from '@/components/layout/AppTabBar';

export function CommunityHome() {
  return (
    <PhoneFrame
      theme="light"
      tabBar={<AppTabBar activeTab="community" onTabChange={(tab) => console.log(tab)} />}
    >
      {/**
       * children = scrollable page content ONLY.
       * ✅ DO: implement page-specific top nav bar (搜索/分段控件/消息图标) here
       * ✅ DO: implement all scrollable page content here
       * ❌ DON'T: re-implement status bar — PhoneFrame already provides it (flex child inside screen area)
       * ❌ DON'T: re-implement Tab Bar — pass it via `tabBar` prop above
       */}
      <TopNavBar />        {/* Page-specific top nav: search + segments + message icon */}
      <div className="p-4">
        <h1>Community Feed</h1>
        {/* ... waterfall feed content ... */}
      </div>
    </PhoneFrame>
  );
}
```

```tsx
// src/pages/PostDetail.tsx (Mobile — detail page WITHOUT Tab Bar)
import { PhoneFrame } from '@/components/layout/PhoneFrame';

export function PostDetail() {
  return (
    <PhoneFrame theme="light">
      {/* No tabBar prop → no Tab Bar rendered */}
      <BackNavBar title="帖子详情" />
      <div className="p-4">
        {/* ... post detail content ... */}
      </div>
    </PhoneFrame>
  );
}
```

```tsx
// src/pages/desktop/Home.tsx (Desktop)
import { WindowFrame } from '@/components/layout/WindowFrame';
import { AppSidebar } from '@/components/layout/AppSidebar';

export function Home() {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <WindowFrame
      theme="light"
      title="Dashboard"
      width={1280}
      height={800}
      sidebar={<AppSidebar activeItem={activeItem} onItemChange={setActiveItem} />}
    >
      {/* Page content — scrollable area to the right of the sidebar */}
      <div className="p-6">
        <h1>Dashboard</h1>
        {/* ... page content ... */}
      </div>
    </WindowFrame>
  );
}
```

**Reference Phase 4 for each page**:
- **Interaction Specs**: Each page must implement the gestures, transitions, and behaviors defined in `phase4-page-interaction.md`
- **Component States**: Use component states (default, hover, pressed, disabled, loading) as defined in `phase5-components.md`
- **Visual Styling**: Apply colors, typography, and spacing from `phase6-visual.md`

**Common Mistakes to Avoid**:
- ❌ NOT using PhoneFrame/WindowFrame — device simulation won't work
- ❌ Putting content outside PhoneFrame/WindowFrame — won't scroll properly
- ❌ Forgetting to wrap each page — only first page has frame
- ❌ Re-implementing the **status bar** inside page children — PhoneFrame already renders it as a flex child; adding it again causes duplication and layout overflow
- ❌ Adding `pt-11` to page `children` — status bar is now a flex sibling above `children`, no manual top padding needed
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

### Step 5: Bundle to Single HTML

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

**1. Create entry HTML files**:

`index.mobile.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title><Product Name> - Mobile Prototype</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.mobile.tsx"></script>
</body>
</html>
```

`index.desktop.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><Product Name> - Desktop Prototype</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.desktop.tsx"></script>
</body>
</html>
```

**2. Create entry TSX files**:

`src/main.mobile.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.mobile';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`src/main.desktop.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.desktop';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**3. Bundle each entry**:

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

**NEW in v2.5**: Device frame is now implemented as a separate component within each page, not in the shell. This allows proper scroll capture and swipe simulation.

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

> **v2.9 change**: Status bar moved **inside** the screen area as a `flex-shrink-0` flex child (was `absolute`).
> This ensures the status bar inherits the screen background and uses theme-aware text color (dark text on light screen,
> white text on dark screen). `pt-11` on `children` is **no longer needed**.
> Wheel event listener is now attached to the **outermost frame div** (covers the entire phone area),
> so scrolling anywhere on the phone — including the status bar and tab bar zones — scrolls the content area,
> not the outer PrototypeShell.

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
// Typical page with custom Tab Bar
<PhoneFrame theme="light" tabBar={<AppTabBar activeTab="home" onTabChange={setTab} />}>
  {/* Top navigation bar (page-specific, scrolls with content or sticky) */}
  <TopNavBar title="社区" rightIcon={<SearchIcon />} />
  {/* Scrollable page content */}
  <WaterfallFeed posts={posts} />
</PhoneFrame>

// Page without Tab Bar (e.g. detail page, auth page)
<PhoneFrame theme="light">
  <DetailPageContent />
</PhoneFrame>
```

**AppTabBar pattern** (implement in `src/components/layout/AppTabBar.tsx`):
```tsx
// Custom Tab Bar — full control over design,凸起 button, badges, colors
export function AppTabBar({ activeTab, onTabChange }) {
  return (
    <div className="h-[83px] bg-white border-t border-neutral-100 flex items-start justify-around px-4 pt-2">
      <TabItem id="community" label="社区" icon={<PawIcon />} active={activeTab === 'community'} />
      <TabItem id="consult" label="问诊" icon={<MedIcon />} active={activeTab === 'consult'} />
      {/* Center publish button — raised above tab bar */}
      <div className="relative -top-4">
        <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <PlusIcon className="w-7 h-7 text-white" />
        </button>
      </div>
      <TabItem id="shop" label="商城" icon={<ShopIcon />} active={activeTab === 'shop'} />
      <TabItem id="profile" label="我的" icon={<UserIcon />} active={activeTab === 'profile'} />
    </div>
  );
}
```

## WindowFrame Component (Desktop Device Simulation)

Desktop window frame is also moved into page components.

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
      theme="light"
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

```tsx
// src/pages/desktop/Editor.tsx
import { WindowFrame } from '@/components/layout/WindowFrame';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppMenuBar } from '@/components/layout/AppMenuBar';
import { AppToolbar } from '@/components/layout/AppToolbar';

export function Editor() {
  return (
    <WindowFrame
      theme="light"
      title="Document.docx — MyEditor"
      width={1280}
      height={800}
      sidebar={<AppSidebar activeItem="editor" />}  {/* optional */}
    >
      {/**
       * App Chrome bars: use flex-col h-full wrapper.
       * h-full fills the content area exactly — no outer overflow, outer div won't scroll.
       * AppMenuBar and AppToolbar are flex-shrink-0 (non-scrolling).
       * The inner div (flex-1 overflow-y-auto) handles the actual page scroll.
       */}
      <div className="flex flex-col h-full">
        <AppMenuBar />   {/* App Chrome: File / Edit / View / Format / ... */}
        <AppToolbar />   {/* App Chrome: Bold / Italic / Undo / Redo / ... */}
        <div className="flex-1 overflow-y-auto">
          {/* Page content — scrollable */}
          <DocumentContent />
        </div>
      </div>
    </WindowFrame>
  );
}
```

**Why `flex flex-col h-full` works**:
- `h-full` fills the WindowFrame content area exactly → outer `overflow-auto` never activates
- Menu bar and toolbar are `flex-shrink-0` → they stay fixed above content, never scroll
- `flex-1 overflow-y-auto` on the inner div → handles page scrolling independently

**AppMenuBar pattern** (define once, used by all pages that share the menu):
```tsx
// src/components/layout/AppMenuBar.tsx
export function AppMenuBar() {
  return (
    <div className="flex-shrink-0 h-8 flex items-center px-2 gap-1 bg-neutral-100 border-b border-neutral-200 text-sm">
      {['File', 'Edit', 'View', 'Insert', 'Format', 'Help'].map(label => (
        <button key={label} className="px-3 py-1 rounded hover:bg-neutral-200 text-neutral-700">
          {label}
        </button>
      ))}
    </div>
  );
}
```

**AppToolbar pattern** (ribbon / icon toolbar):
```tsx
// src/components/layout/AppToolbar.tsx
export function AppToolbar() {
  return (
    <div className="flex-shrink-0 h-10 flex items-center gap-1 px-3 bg-white border-b border-neutral-200">
      <button className="p-1.5 rounded hover:bg-neutral-100 font-bold text-sm">B</button>
      <button className="p-1.5 rounded hover:bg-neutral-100 italic text-sm">I</button>
      <button className="p-1.5 rounded hover:bg-neutral-100 underline text-sm">U</button>
      {/* ... more toolbar buttons per Phase 4 spec ... */}
    </div>
  );
}
```

**AppSidebar Pattern** (implement per Phase 4 spec):
```tsx
// src/components/layout/AppSidebar.tsx
interface AppSidebarProps {
  activeItem: string;
  onItemChange?: (id: string) => void;
}

export function AppSidebar({ activeItem, onItemChange }: AppSidebarProps) {
  // Phase 4 spec defines: navigation items, collapsible behavior, item icons, active states
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChartIcon /> },
    // ... more items from Phase 4 spec
  ];

  return (
    <div className="w-60 h-full bg-neutral-50 border-r border-neutral-200 flex flex-col py-4">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => onItemChange?.(item.id)}
          className={`flex items-center gap-3 px-4 py-2 text-sm ${
            activeItem === item.id ? 'bg-neutral-100 font-medium' : 'text-neutral-600 hover:bg-neutral-50'
          }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}
```


## Implementation Reference: Phase 4-6 Integration

### Phase 4 (Interaction Specs) Requirements

Each page component MUST implement interactions defined in `phase4-page-interaction.md`:

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

```tsx
// src/App.mobile.tsx
import { useState } from 'react';
import { PrototypeShell } from '@/components/layout/PrototypeShell';
import { PhoneFrame } from '@/components/layout/PhoneFrame';
import { Home, ProductDetail, Cart, Profile } from '@/pages/mobile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const pages = [
    { id: 'home', name: 'Home' },
    { id: 'detail', name: 'Detail' },
    { id: 'cart', name: 'Cart' },
    { id: 'profile', name: 'Profile' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      // Pages with Tab Bar: pass AppTabBar as tabBar slot
      case 'home':
        return <PhoneFrame theme={theme} tabBar={<AppTabBar activeTab="home" onTabChange={setCurrentPage} />}>
          <Home />
        </PhoneFrame>;
      // Pages without Tab Bar: omit tabBar prop (detail pages, auth pages, etc.)
      case 'detail':
        return <PhoneFrame theme={theme}>
          <ProductDetail />
        </PhoneFrame>;
      case 'cart':
        return <PhoneFrame theme={theme} tabBar={<AppTabBar activeTab="cart" onTabChange={setCurrentPage} />}>
          <Cart />
        </PhoneFrame>;
      case 'profile':
        return <PhoneFrame theme={theme} tabBar={<AppTabBar activeTab="profile" onTabChange={setCurrentPage} />}>
          <Profile />
        </PhoneFrame>;
      default:
        return null;
    }
  };

  return (
    <PrototypeShell
      productName="<<Product Name>>"
      pages={pages}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      interactions={[
        // From Phase 4 interaction specs
        "Tap product card to view details",
        "Swipe left on cart item to delete",
        "Pull down to refresh home data",
      ]}
    >
      {renderPage()}
    </PrototypeShell>
  );
}
```

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

1. **Generate Pages** (Batch)
   - Read Phase 4 specs for pages in this batch
   - **CRITICAL**: Each page MUST wrap content in PhoneFrame (mobile) or WindowFrame (desktop)

2. **Bundle and Verify**
   - Run `bundle-artifact.sh` to produce prototype HTML
   - **VERIFY**: Check HTML includes device frames:
     ```bash
     grep -o "PhoneFrame" phase7-prototype.html | head -5  # At least 5 pages
     grep -o "WindowFrame" phase7-prototype.html | head -5  # At least 5 pages (desktop)
     grep -o "PrototypeShell" phase7-prototype.html | head -1  # At least 1
     ```
   - **If frame count < page count**: Pages are not using device frames. Fix before continuing.

3. **Batch Walkthrough + Per-Page Verification** (see [Per-Page Verification Procedure](#per-page-verification-procedure))
   - For each page in the batch: run Tool 2 heuristic (47 items) + check Quality Checklist
   - **Append** results to `doc/ixd/phase7-review-master.md` as a new `## Batch N` section
   - (Create `phase7-review-master.md` on Batch 1; all subsequent batches append to it)

4. **Fix Issues** (if any)
   - Address all FAIL items before proceeding to next batch

5. **Pause for User Confirmation**

### Single-Platform Batch Output (`platform: "mobile"` or `"desktop"`)

1. **Read page inventory** from `doc/ixd/phase2-architecture.md`
2. **Read interaction specs** from `doc/ixd/phase4-page-interaction.md` for each page
3. **Prioritize by importance**: dashboard/home → core lists → detail pages → forms → settings → secondary pages
4. **Output in batches of 3-5 pages** per turn to avoid token limits
5. **After each batch**:
   - Run `bundle-artifact.sh` to produce updated prototype HTML
   - Save/overwrite `doc/ixd/phase7-prototype.html` (or platform-specific filename)
   - Update `progress.json`: record completed page IDs and `lastBatch`
   - **Append batch review to master report**: write `## Batch N` section to `doc/ixd/phase7-review-master.md` (create on Batch 1, append thereafter)
   - **PAUSE** — output a summary then ask the user:
     > "✅ Batch N complete — pages X, Y, Z implemented. Prototype updated: `phase7-prototype.html`
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
3. **Implement layout components**: `AppTabBar.tsx` (mobile Tab Bar) and `AppSidebar.tsx` (desktop Sidebar) with platform-specific navigation
4. **Implement page pairs**: For each page, create both `pages/mobile/X.tsx` and `pages/desktop/X.tsx`
5. **Batch by page, not by platform**: Complete the mobile + desktop versions of a page together before moving to the next
6. **Page-by-page order**: dashboard/home → list/browse → detail → form/create → settings
7. **Output in batches of 2-3 page pairs per turn**
8. **After each batch**:
   - Bundle both platforms: run `bundle-artifact.sh` for mobile + desktop entries
   - Save/overwrite `doc/ixd/phase7-prototype-mobile.html` and `phase7-prototype-desktop.html`
   - Update `progress.json` with completed page IDs for both platforms
   - **Append batch review to master report**: write `## Batch N (mobile + desktop)` section to `doc/ixd/phase7-review-master.md`
   - **PAUSE** — output a summary then ask:
     > "✅ Batch N complete — page pairs X, Y implemented (mobile + desktop).
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
| `bundle` | All pages done, not bundled | Proceed to Step 4: Bundle |
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

### Per-Page Verification (Mandatory)

Each page in the batch must pass the following checks:

**Mobile**:
- [ ] **TDD tests pass** — `pnpm test:run` exits green (smoke + `data-testid="phone-frame"` + content checks)
- [ ] PrototypeShell provides project name, theme toggle, display area (no device frame in shell)
- [ ] PhoneFrame component wraps each mobile page with realistic iPhone frame
- [ ] Status bar with time, signal, WiFi, battery (SVG icons)
- [ ] Dynamic Island and Home Indicator present
- [ ] **No scrollbar visible** — uses `scrollbar-hide` utility
- [ ] **Mouse wheel converts to swipe** — scroll events captured in PhoneFrame
- [ ] Tab Bar passed via `tabBar` prop slot (not re-implemented inside page children)
- [ ] All pages from Phase 2 architecture implemented
- [ ] Phase 4 interactions implemented (gestures, transitions)
- [ ] Phase 5 component states used correctly
- [ ] Phase 6 design tokens applied consistently
- [ ] Page transitions have animation
- [ ] Mock data is realistic
- [ ] Touch targets are ≥ 44px
- [ ] Back navigation works consistently
- [ ] Dark mode toggle works
- [ ] No broken interactions or dead-end states

**Desktop**:
- [ ] **TDD tests pass** — `pnpm test:run` exits green (smoke + `data-testid="window-frame"` + content checks)
- [ ] PrototypeShell provides project name, theme toggle, display area (no device frame in shell)
- [ ] WindowFrame component wraps each desktop page with macOS/Windows style window
- [ ] Title bar with window controls (red/yellow/green dots for macOS) — NOT re-implemented inside children
- [ ] Window frame with proper shadow and border
- [ ] Sidebar passed via `sidebar` prop slot (not re-implemented inside page children)
- [ ] Content area scrollable (right of sidebar)
- [ ] App-level Menu Bar / Toolbar (if applicable) uses `flex flex-col h-full` wrapper — stays fixed above content
- [ ] All pages from Phase 2 architecture implemented
- [ ] Phase 4 interactions implemented (keyboard shortcuts, hover states)
- [ ] Phase 5 component states used correctly
- [ ] Phase 6 design tokens applied consistently
- [ ] Sidebar navigation works and collapses correctly (240px ↔ 56px)
- [ ] Keyboard navigation works (Tab focus ring visible on all interactive elements)
- [ ] Keyboard shortcuts registered and hint labels shown
- [ ] Right-click context menu appears on relevant items (shadcn/ui ContextMenu)
- [ ] Hover states on all interactive elements
- [ ] Tooltips with appropriate delay (shadcn/ui Tooltip)
- [ ] Dark mode toggle works
- [ ] No broken interactions or dead-end states

### Per-Page Verification Procedure

This is the execution procedure for **Step 3 of each batch** ("Batch Walkthrough + Per-Page Verification"). For each batch of pages, perform the following **for every page** in the batch:

1. **Run `pnpm test:run`**: All TDD tests must pass before walkthrough
2. **Run Tool 2 Heuristic**: Check each page against the 47-item checklist
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
