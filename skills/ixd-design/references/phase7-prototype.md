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

### Step 4: use TDD Implement Page Components (Wrap in Device Frame)

> **CRITICAL**: Each page component MUST be wrapped in the device frame (PhoneFrame/WindowFrame) to ensure proper device simulation.

**Page Implementation Pattern**:

```tsx
// src/pages/Home.tsx (Mobile)
import { PhoneFrame } from '@/components/layout/PhoneFrame';

export function Home() {
  return (
    <PhoneFrame theme="light" tabs={[...]}>
      <div className="p-4">
        <h1>Welcome Home</h1>
      </div>
    </PhoneFrame>
  );
}
```

```tsx
// src/pages/Home.tsx (Mobile)
import { PhoneFrame } from '@/components/layout/PhoneFrame';

export function Home() {
  return (
    <PhoneFrame
      theme="light"
      tabs={[
        { id: 'home', label: 'Home', icon: <HomeIcon /> },
        { id: 'profile', label: 'Profile', icon: <UserIcon /> },
      ]}
      activeTab="home"
      onTabChange={(tab) => console.log(tab)}
    >
      {/* Page content goes INSIDE PhoneFrame */}
      <div className="p-4">
        <h1>Welcome Home</h1>
        {/* ... page content ... */}
      </div>
    </PhoneFrame>
  );
}
```

```tsx
// src/pages/Home.tsx (Desktop)
import { WindowFrame } from '@/components/layout/WindowFrame';

export function Home() {
  return (
    <WindowFrame
      theme="light"
      title="Dashboard"
      width={1280}
      height={800}
    >
      {/* Page content goes INSIDE WindowFrame */}
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
- ❌ Adding page-level top navigation bar — will cover iPhone status bar
- ❌ Adding page-level bottom navigation bar — will cover iPhone home indicator
- ❌ Using native scrollbar — PhoneFrame already handles scrolling with `scrollbar-hide`

**Mobile Page Development Rules**:
| Issue | Solution |
|-------|----------|
| Status bar covered by page | PhoneFrame already has `pt-11` padding — do NOT add top nav |
| Home indicator covered by page | PhoneFrame already has `pb-16` padding — do NOT add bottom nav |
| Scrollbar visible | PhoneFrame uses `scrollbar-hide` class — no action needed |

> **NOTE**: PhoneFrame already includes:
> - Status bar area (44px top padding via `pt-11`)
> - Home indicator area (64px bottom padding via `pb-16`)
> - Hidden scrollbar (`scrollbar-hide` class)
> - Scroll event capture (mouse wheel → swipe)
> - Tab Bar (via `tabs` prop) - positioned at bottom, separate from content
>
> **DO NOT** add your own top/bottom navigation inside PhoneFrame children.
>
> **Content Safe Area**: Your page content goes inside PhoneFrame children. It should NOT exceed:
> - Top: beyond 44px (status bar area)
> - Bottom: beyond content height minus 64px (tab bar area)
> - Left/Right: within 390px width (phone frame)

**Mobile-Only Structure** (`platform: "mobile"` - default):

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (pre-installed)
│   ├── layout/
│   │   ├── MobileLayout.tsx    # Tab Bar + Top nav (inside phone frame)
│   │   └── PrototypeShell.tsx # Simplified shell (project name + theme)
│   │   └── PhoneFrame.tsx     # Device frame for mobile pages
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
│   │   ├── DesktopLayout.tsx   # Sidebar + Toolbar (inside window frame)
│   │   ├── PrototypeShell.tsx # Simplified shell (project name + theme)
│   │   └── WindowFrame.tsx    # Desktop window frame for pages
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
│   │   ├── MobileLayout.tsx    # Mobile: Tab Bar + Top nav
│   │   ├── DesktopLayout.tsx  # Desktop: Sidebar + Toolbar
│   │   ├── PrototypeShell.tsx # Shell (project name + theme)
│   │   ├── PhoneFrame.tsx     # Mobile device frame
│   │   └── WindowFrame.tsx   # Desktop device frame
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

```tsx
// src/components/layout/PrototypeShell.tsx
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
  children: React.ReactNode;
  pages?: PageItem[]; // Page navigator items
  currentPage?: string; // Current active page
  onPageChange?: (pageId: string) => void;
  interactions?: string[]; // Interaction guide list from Phase 4
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

  // Follow system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Prevent shell from scrolling - capture scroll in child components
  const handleWheel = (e: React.WheelEvent) => {
    // Don't prevent default - let children handle scroll
  };

  return (
    <div
      className={`min-h-screen ${theme === 'dark' ? 'bg-neutral-950' : 'bg-neutral-50'} ${theme}`}
      onWheel={handleWheel}
    >
      {/* Top control bar - refined aesthetic */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b backdrop-blur-sm bg-background/80">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {productName}
          </h1>
          <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">v1.0</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Interaction guide - from Phase 4 */}
          {interactions && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                  Guide
                </Button>
              </SheetTrigger>
              <SheetContent>
                <h2 className="text-lg font-semibold mb-4">Interactions (Phase 4)</h2>
                <ul className="space-y-2">
                  {interactions.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {item}</li>
                  ))}
                </ul>
              </SheetContent>
            </Sheet>
          )}
          {/* Theme toggle - icon button */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            )}
          </Button>
        </div>
      </header>

      {/* Display Area - contains device frame with page content */}
      {/* This area captures scroll events - shell header stays fixed */}
      <main className="pt-20 pb-8 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Page Navigator - side dots for desktop, bottom for mobile */}
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

## PhoneFrame Component (Mobile Device Simulation)

**NEW in v2.5**: Device frame is now implemented as a separate component within each page, not in the shell. This allows proper scroll capture and swipe simulation.

### Key Features:
- Realistic iPhone frame (Dynamic Island, status bar, home indicator)
- **No visible scrollbar** — uses `scrollbar-hide` utility
- **Mouse wheel converts to swipe** — captures wheel events and translates to scroll
- Bottom Tab Bar for navigation

```tsx
// src/components/layout/PhoneFrame.tsx
import { useRef, useEffect, useState } from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  showTabBar?: boolean;
  tabs?: { id: string; label: string; icon?: React.ReactNode }[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function PhoneFrame({
  children,
  theme = 'light',
  showTabBar = true,
  tabs = [],
  activeTab = '',
  onTabChange
}: PhoneFrameProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Convert mouse wheel to swipe/scroll
  useEffect(() => {
    const content = scrollRef.current;
    if (!content) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent default to stop page scroll
      e.preventDefault();
      // Translate vertical scroll to the content
      content.scrollTop += e.deltaY;
    };

    content.addEventListener('wheel', handleWheel, { passive: false });
    return () => content.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="flex justify-center">
      {/* iPhone 14 Frame - 390×844 */}
      <div
        className={`relative rounded-[48px] p-1.5 shadow-2xl overflow-hidden ring-1 ${
          theme === 'dark' ? 'bg-neutral-800 ring-neutral-700' : 'bg-neutral-900 ring-neutral-200'
        }`}
        style={{ width: '390px', height: '844px' }}
      >
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-11 flex items-center justify-between px-6 text-white z-10">
          <span className="text-sm font-medium">
            {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </span>
          <div className="flex items-center gap-1.5">
            {/* Signal bars */}
            <div className="flex items-end gap-[2px] h-3">
              <div className="w-0.5 bg-white rounded-full" />
              <div className="w-0.5 bg-white rounded-full" />
              <div className="w-0.5 bg-white rounded-full" />
              <div className="w-0.5 bg-white/40 rounded-full" />
            </div>
            {/* WiFi icon */}
            <svg className="w-4 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
            {/* Battery icon */}
            <svg className="w-5 h-2.5" viewBox="0 0 24 12" fill="currentColor">
              <rect x="1" y="4" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="3" y="5.5" width="14" height="5" rx="1.5" />
              <rect x="20" y="4.5" width="2" height="3" rx="0.5" />
            </svg>
          </div>
        </div>

        {/* Screen Area */}
        <div
          ref={contentRef}
          className={`rounded-[40px] h-full overflow-hidden flex flex-col ${
            theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
          }`}
        >
          {/* Content - NO scrollbar, wheel converts to swipe */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pt-11 pb-16 touch-pan-y"
            style={{ scrollBehavior: 'smooth' }}
          >
            {children}
          </div>

          {/* Tab Bar - inside phone frame */}
          {showTabBar && tabs.length > 0 && (
            <div
              className={`absolute bottom-0 left-0 right-0 h-16 ${
                theme === 'dark' ? 'bg-neutral-900 border-t border-neutral-800' : 'bg-white border-t border-neutral-100'
              } flex items-center justify-around px-4`}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange?.(tab.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? theme === 'dark' ? 'text-white' : 'text-black'
                      : theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
                  }`}
                >
                  {tab.icon || <div className="w-5 h-5 rounded-sm bg-current opacity-20" />}
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Island */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-full z-20" />

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/60 rounded-full" />
      </div>
    </div>
  );
}
```

## WindowFrame Component (Desktop Device Simulation)

Desktop window frame is also moved into page components.

```tsx
// src/components/layout/WindowFrame.tsx
import { useRef, useEffect, useState } from 'react';

interface WindowFrameProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  title?: string;
  width?: number;
  height?: number;
}

export function WindowFrame({
  children,
  theme = 'light',
  title = 'Application',
  width = 1280,
  height = 800
}: WindowFrameProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mouse wheel for content scrolling
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
    <div className="flex justify-center">
      {/* Desktop Window Frame */}
      <div
        className={`rounded-xl shadow-2xl overflow-hidden ring-1 ${
          theme === 'dark' ? 'bg-neutral-800 ring-neutral-700' : 'bg-white ring-neutral-200'
        }`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {/* Title Bar - macOS style */}
        <div
          className={`h-10 flex items-center px-4 gap-3 ${
            theme === 'dark' ? 'bg-neutral-800 border-b border-neutral-700' : 'bg-neutral-100 border-b border-neutral-200'
          }`}
        >
          {/* Window Controls */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
          </div>
          {/* Title */}
          <span className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {title}
          </span>
        </div>

        {/* Content Area - scrollable */}
        <div
          ref={scrollRef}
          className={`h-[calc(100%-40px)] overflow-auto ${
            theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'
          }`}
        >
          {children}
        </div>
      </div>
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

  // Phase 4 interaction: swipe between sections
  const tabs = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'discover', label: 'Discover', icon: <DiscoverIcon /> },
    { id: 'cart', label: 'Cart', icon: <CartIcon /> },
    { id: 'profile', label: 'Profile', icon: <ProfileIcon /> },
  ];

  return (
    <PhoneFrame
      theme={theme}
      showTabBar={true}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {/* Page content - implements Phase 4 layout from interaction specs */}
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

  // Tab navigation for mobile
  const tabs = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'cart', label: 'Cart', icon: <CartIcon /> },
    { id: 'profile', label: 'Profile', icon: <ProfileIcon /> },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <PhoneFrame theme={theme} tabs={tabs} activeTab="home" onTabChange={setCurrentPage}>
          <Home />
        </PhoneFrame>;
      case 'detail':
        return <PhoneFrame theme={theme}>
          <ProductDetail />
        </PhoneFrame>;
      case 'cart':
        return <PhoneFrame theme={theme} tabs={tabs} activeTab="cart" onTabChange={setCurrentPage}>
          <Cart />
        </PhoneFrame>;
      case 'profile':
        return <PhoneFrame theme={theme} tabs={tabs} activeTab="profile" onTabChange={setCurrentPage}>
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

3. **Batch Interaction Walkthrough**
   - Run Tool 2 heuristic checklist against batch pages
   - Generate batch review report

4. **Fix Issues** (if any)
   - Address issues found in walkthrough

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
   - **Generate Batch Review Report**: `doc/ixd/phase7-batch-N-review.md`
   - **PAUSE** — output a summary then ask the user:
     > "✅ Batch N complete — pages X, Y, Z implemented. Prototype updated: `phase7-prototype.html`
     > Progress: M/total pages done.
     > Batch Review: `phase7-batch-N-review.md` attached
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
3. **Implement layout components**: `MobileLayout.tsx` and `DesktopLayout.tsx` with platform-specific navigation
4. **Implement page pairs**: For each page, create both `pages/mobile/X.tsx` and `pages/desktop/X.tsx`
5. **Batch by page, not by platform**: Complete the mobile + desktop versions of a page together before moving to the next
6. **Page-by-page order**: dashboard/home → list/browse → detail → form/create → settings
7. **Output in batches of 2-3 page pairs per turn**
8. **After each batch**:
   - Bundle both platforms: run `bundle-artifact.sh` for mobile + desktop entries
   - Save/overwrite `doc/ixd/phase7-prototype-mobile.html` and `phase7-prototype-desktop.html`
   - Update `progress.json` with completed page IDs for both platforms
   - **Generate Batch Review Report** for both platforms: `doc/ixd/phase7-batch-N-review.md`
   - **PAUSE** — output a summary then ask:
     > "✅ Batch N complete — page pairs X, Y implemented (mobile + desktop).
     > Prototypes updated: `phase7-prototype-mobile.html` + `phase7-prototype-desktop.html`
     > Progress: M/total page pairs done.
     > Batch Review: `phase7-batch-N-review.md` attached
     > **Continue to next batch?** (yes / stop here)"
   - Wait for user confirmation before proceeding

### Batch Interaction Walkthrough Report

After each batch, generate a review report:

```markdown
## Batch N Interaction Review Report

**Batch**: Pages X, Y, Z
**Platform**: mobile | desktop | both
**Date**: YYYY-MM-DD
**Reviewer**: AI (Walkthrough)

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

### Merging into Master Report

After each batch review:
1. Append batch review to `doc/ixd/phase7-review-master.md`
2. If issues were found and fixed, note the fixes in the master report
3. If verdict is FAIL, do NOT proceed to next batch until issues are resolved

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
- [ ] PrototypeShell provides project name, theme toggle, display area (no device frame in shell)
- [ ] PhoneFrame component wraps each mobile page with realistic iPhone frame
- [ ] Status bar with time, signal, WiFi, battery (SVG icons)
- [ ] Dynamic Island and Home Indicator present
- [ ] **No scrollbar visible** — uses `scrollbar-hide` utility
- [ ] **Mouse wheel converts to swipe** — scroll events captured in PhoneFrame
- [ ] Tab Bar inside phone frame (not in shell)
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
- [ ] PrototypeShell provides project name, theme toggle, display area (no device frame in shell)
- [ ] WindowFrame component wraps each desktop page with macOS/Windows style window
- [ ] Title bar with window controls (red/yellow/green dots for macOS)
- [ ] Window frame with proper shadow and border
- [ ] Content area scrollable
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

For each batch of pages generated, perform the following verification **for every page**:

1. **Run Tool 2 Heuristic**: Check against 47-item checklist
2. **Per-Page Check**:
   ```markdown
   ## Phase 7 Batch N Per-Page Verification Report

   **Batch**: Pages X, Y, Z
   **Date**: YYYY-MM-DD

   ### Per-Page Check

   | Page ID | Page Name | Tool 2 | Phase 4 Compliance |
   |---------|-----------|--------|-------------------|
   | P01 | Home | 95% | ✅ |
   | P02 | List | 88% | ✅ |
   | P03 | Detail | 75% | ⚠️ Missing gestures |

   ### Issues Found
   - Page P03: Tool 2 score below 80%

   ### Verdict
   ✅ All pages pass - Continue to next batch
   ❌ Some pages need fixes - Fix and re-verify
   ```

4. **Update Progress**:
   - Mark pages as verified in `progress.json`
   - If any page fails: fix issues, re-verify before proceeding

---
