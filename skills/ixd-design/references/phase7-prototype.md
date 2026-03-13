# Phase 7: Interactive Prototype

## Objective

Generate a clickable, high-fidelity prototype using the built-in scripts. Output is a single HTML file that can be opened directly in a browser — this is AI's unique advantage over traditional tools like Modao.

> **v2.3 Update**: Integrated React 18 + TypeScript + Tailwind CSS + shadcn/ui tech stack with built-in initialization and bundling scripts.
>
> **v2.4 Update**: Added PrototypeShell component for unified prototype display entry page with device frame simulator, theme toggle, and page navigator.

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

| platform | Project Structure | Output File(s) | Viewport |
|----------|-------------------|----------------|----------|
| `"mobile"` (default) | Single project | `prototype.html` | 390×844px phone frame |
| `"desktop"` | Single project | `prototype.html` | 1280×800px window frame |
| `"both"` | Single project, dual entry | `prototype-mobile.html` + `prototype-desktop.html` | Both viewports |

**Cross-Platform Strategy**: For `platform: "both"`, use a single project with platform-specific page components and dual bundle outputs. This ensures:
- Single source of truth for Design Tokens
- Shared business components and mock data
- Automatic visual consistency across platforms
- Easier maintenance

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

### Step 3: Implement Page Components

Organize components in `src/` directory.

**Mobile-Only Structure** (`platform: "mobile"` - default):

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (pre-installed)
│   ├── layout/
│   │   ├── MobileLayout.tsx    # Tab Bar + Top nav
│   │   └── PrototypeShell.tsx  # iPhone frame wrapper
│   └── shared/          # Shared business components
├── pages/               # Page components
│   ├── Home.tsx
│   ├── ProductList.tsx
│   └── ...
├── hooks/               # Custom Hooks
├── lib/                 # Utility functions + mock data
├── App.tsx              # Main app (routing configuration)
├── main.tsx             # Entry point
└── index.css            # Global styles + Design Tokens
```

**Desktop-Only Structure** (`platform: "desktop"`):

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (pre-installed)
│   ├── layout/
│   │   ├── DesktopLayout.tsx   # Sidebar + Toolbar + Title bar
│   │   └── PrototypeShell.tsx  # Window frame wrapper
│   └── shared/          # Shared business components
├── pages/               # Page components
│   ├── Home.tsx
│   ├── ProductList.tsx
│   └── ...
├── hooks/               # Custom Hooks
├── lib/                 # Utility functions + mock data
├── App.tsx              # Main app (routing configuration)
├── main.tsx             # Entry point
└── index.css            # Global styles + Design Tokens
```

**Cross-Platform Structure** (`platform: "both"`):

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (pre-installed)
│   ├── layout/          # Layout components
│   │   ├── MobileLayout.tsx    # Mobile: Tab Bar + Top nav
│   │   ├── DesktopLayout.tsx   # Desktop: Sidebar + Toolbar
│   │   └── PrototypeShell.tsx  # Device frame wrapper (supports both platforms)
│   └── shared/          # Shared business components (same logic, different layouts)
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
├── App.mobile.tsx       # Mobile entry point
├── App.desktop.tsx      # Desktop entry point
└── index.css            # Global styles + Design Tokens (shared)
```

**Cross-Platform Key Points**:
- Design Tokens in `index.css` are shared (single source of truth)
- Mock data in `lib/` is shared
- Layout components differ: `MobileLayout` vs `DesktopLayout`
- Page components can share business logic but differ in layout/interaction
- Use `App.mobile.tsx` and `App.desktop.tsx` as separate entry points

### Step 4: Bundle to Single HTML

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

## PrototypeShell Component (Entry Page)

All prototypes must include a **unified entry display page** wrapped by PrototypeShell, similar to Modao's "prototype demo" feature.

### Required Elements

1. **Project Name**
   - Display at top center or top-left
   - Use Phase 6 brand color or Display/H1 font size
   - Optional subtitle: version number, update date

2. **Light/Dark Mode Toggle**
   - Position: top-right corner or navbar
   - Style: icon button (☀️/🌙) or Toggle Switch
   - Toggle applies `.dark` class globally
   - Default follows system preference (`prefers-color-scheme`)

3. **Device Frame Simulator**
   Display corresponding device frame based on target platform:

   **Mobile Prototype (iPhone Frame)**:
   ```
   ┌─────────────────────────┐
   │       ◀  □  ▶          │ ← Status bar (time, signal, battery)
   ├─────────────────────────┤
   │                         │
   │                         │
   │     Prototype Content   │ ← 390×844px (iPhone 14 standard)
   │     (actual page)       │
   │                         │
   │                         │
   ├─────────────────────────┤
   │  ━━━━━━━━━━━━━━━━━━━━   │ ← Home Indicator
   └─────────────────────────┘
   ```
   - Frame style: 40px border-radius, black/white border (follows theme)
   - Size: 390×844px (iPhone 14) or 430×932px (iPhone 14 Pro Max)
   - Status bar: time, signal, WiFi, battery icons (use SVG)
   - Home Indicator: 134×5px rounded bar at bottom

   **Desktop Prototype (Window Frame)**:
   ```
   ┌──────────────────────────────────────────────────┐
   │ ○ ○ ○  Window Title (Product Name)    ─ □ ✕   │ ← Title bar + window controls
   ├──────────────────────────────────────────────────┤
   │                                                  │
   │                                                  │
   │              Prototype Content                   │ ← 1280×800px or custom
   │              (actual page)                       │
   │                                                  │
   │                                                  │
   └──────────────────────────────────────────────────┘
   ```
   - Frame style: 8px border-radius, window shadow (box-shadow)
   - Title bar height: 32px (macOS) or 28px (Windows 11)
   - Window control buttons:
     - macOS: red/yellow/green dots (close/minimize/maximize)
     - Windows: minimize/maximize/close icons

4. **Page Navigator**
   - Position: bottom or side of entry page
   - Function: quick jump to any page
   - Style: page thumbnail grid or page name list
   - Current page highlighted

5. **Interaction Guide Panel (optional)**
   - Entry: "?" icon top-left or "Interactions" button
   - Content: list of interaction behaviors for current page (from Phase 4)
   - Style: use shadcn/ui `Sheet` or `Dialog` component

### PrototypeShell Component Code

```tsx
// src/components/layout/PrototypeShell.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PageItem {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface PrototypeShellProps {
  productName: string;
  platform: 'mobile' | 'desktop';
  children: React.ReactNode;
  pages?: PageItem[]; // Page navigator items
  currentPage?: string; // Current active page
  onPageChange?: (pageId: string) => void;
  interactions?: string[]; // Interaction guide list
}

export function PrototypeShell({
  productName,
  platform,
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

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-neutral-950' : 'bg-neutral-50'} p-6 ${theme}`}>
      {/* Top control bar - refined aesthetic */}
      <header className="flex items-center justify-between mb-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {productName}
          </h1>
          <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">v1.0</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Interaction guide */}
          {interactions && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                  Guide
                </Button>
              </SheetTrigger>
              <SheetContent>
                <h2 className="text-lg font-semibold mb-4">Interactions</h2>
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

      {/* Device frame */}
      <div className="flex justify-center">
        {platform === 'mobile' ? (
          // iPhone frame - refined with subtle border
          <div className={`relative rounded-[48px] p-1.5 shadow-2xl overflow-hidden ring-1 ${theme === 'dark' ? 'bg-neutral-800 ring-neutral-700' : 'bg-neutral-900 ring-neutral-200'}`}
               style={{ width: '390px', height: '844px' }}>
            {/* Status bar - realistic iPhone style */}
            <div className="absolute top-0 left-0 right-0 h-11 flex items-center justify-between px-6 text-white z-10">
              <span className="text-sm font-medium">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
              <div className="flex items-center gap-1.5">
                {/* Signal bars */}
                <div className="flex items-end gap-[2px] h-3">
                  <div className="w-0.5 bg-white rounded-full"/><div className="w-0.5 bg-white rounded-full"/><div className="w-0.5 bg-white rounded-full"/><div className="w-0.5 bg-white/40 rounded-full"/>
                </div>
                {/* WiFi */}
                <svg className="w-4 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                {/* Battery */}
                <svg className="w-5 h-2.5" viewBox="0 0 24 12" fill="currentColor"><rect x="1" y="4" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/><rect x="3" y="5.5" width="14" height="5" rx="1.5"/><rect x="20" y="4.5" width="2" height="3" rx="0.5"/></svg>
              </div>
            </div>
            {/* Screen area */}
            <div className={`rounded-[40px] h-full overflow-hidden flex flex-col ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}`}>
              {/* Content area */}
              <div className="flex-1 overflow-auto scrollbar-hide pt-11 pb-16">
                {children}
              </div>
              {/* Page Navigator - Bottom Tab Bar */}
              {pages.length > 0 && (
                <div className={`absolute bottom-0 left-0 right-0 h-16 ${theme === 'dark' ? 'bg-neutral-900 border-t border-neutral-800' : 'bg-white border-t border-neutral-100'} flex items-center justify-around px-4`}>
                  {pages.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => onPageChange?.(page.id)}
                      className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                        currentPage === page.id
                          ? (theme === 'dark' ? 'text-white' : 'text-black')
                          : (theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400')
                      }`}
                    >
                      {page.icon || <div className="w-5 h-5 rounded-sm bg-current opacity-20" />}
                      <span className="text-[10px] font-medium">{page.name}</span>
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
        ) : (
          // Desktop window frame - refined
          <div className={`rounded-xl shadow-2xl overflow-hidden ${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'} ring-1 ${theme === 'dark' ? 'ring-neutral-700' : 'ring-neutral-200'}`}
               style={{ width: '1280px', height: '800px' }}>
            {/* Title bar - macOS style */}
            <div className={`h-10 flex items-center px-4 gap-3 ${theme === 'dark' ? 'bg-neutral-800 border-b border-neutral-700' : 'bg-neutral-100 border-b border-neutral-200'}`}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
              </div>
              <span className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>{productName}</span>
            </div>
            {/* Content area */}
            <div className={`h-[calc(100%-40px)] overflow-auto ${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
              {children}
            </div>
          </div>
        )}
      </div>

      {/* Page Navigator - Desktop sidebar (optional) */}
      {platform === 'desktop' && pages.length > 0 && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange?.(page.id)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPage === page.id
                  ? 'bg-primary scale-125'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              title={page.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

### Usage in App.tsx

```tsx
import { PrototypeShell } from '@/components/layout/PrototypeShell';
import { Home, ProductDetail, Cart, Profile } from '@/pages';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const pages = [
    { id: 'home', name: 'Home' },
    { id: 'cart', name: 'Cart' },
    { id: 'profile', name: 'Profile' },
  ];

  return (
    <PrototypeShell
      productName="<<Product Name>>"
      platform="<<mobile/desktop>>"
      pages={pages}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      interactions={[
        "Click product card to view details",
        "Swipe left to delete cart item",
        "Pull down to refresh home data",
      ]}
    >
      {currentPage === 'home' && <Home />}
      {currentPage === 'detail' && <ProductDetail />}
      {currentPage === 'cart' && <Cart />}
      {currentPage === 'profile' && <Profile />}
      {/* ... */}
    </PrototypeShell>
  );
}
```

### Typography & Aesthetic Guidelines

To achieve a distinctive, non-generic look:

**Fonts** (Choose from Phase 6):
```css
/* Example: Editorial style */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;500&display=swap');

:root {
  --font-display: 'Playfair Display', serif;
  --font-body: 'Source Sans 3', sans-serif;
}
```

**Backgrounds**:
- Use subtle gradients, noise textures, or paper-like backgrounds
- Avoid pure white (#ffffff) or pure black (#000000)
- Consider warm off-white: `#FAFAF8` or cool gray: `#F5F5F7`

**Animations**:
```css
/* Smooth page transitions */
.page-enter {
  opacity: 0;
  transform: translateX(20px);
}
.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}

/* Subtle hover effects */
.card-hover {
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}
```

## Platform-Specific Implementation

### Mobile Prototype

- **Viewport**: Set in `index.html`: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`
- **Layout Components**:
  - Use shadcn/ui `Tabs` component for bottom Tab navigation
  - Custom top navbar (back button + title + action button)
- **Page Transitions**: Use CSS `transform: translateX()` or Framer Motion for slide animations
- **Touch Interactions**:
  - Pull-to-refresh: custom Hook or `@tanstack/react-query` `useQuery`
  - Swipe-to-delete: custom gesture handling or `framer-motion` `drag` property
- **Recommended shadcn/ui Components**: `Button`, `Card`, `Input`, `Sheet` (bottom panel), `Dialog`, `Toast`, `Tabs`

### Desktop Prototype

- **Viewport**: `max-width: 1280px` centered to simulate desktop window
- **Layout Components**:
  - Sidebar: use `Sheet` or custom collapsible panel
  - Top toolbar: use `Menubar` or custom Toolbar component
  - Window title bar: simulate close/minimize/maximize button styles
- **Page Transitions**: fade animation (opacity transition)
- **Multi-panel Layout**: use CSS Grid or Flexbox with draggable dividers
- **Keyboard Navigation**:
  - Tab focus: ensure all interactive elements have correct `tabIndex`
  - Shortcuts: use custom Hook to listen for `keydown` events
- **Mouse Interactions**:
  - Hover states: Tailwind `hover:` prefix
  - Right-click menu: shadcn/ui `ContextMenu` component
  - Tooltip: shadcn/ui `Tooltip` component
  - Drag: `framer-motion` `drag` or native drag API
- **Recommended shadcn/ui Components**: `Button`, `Card`, `Input`, `Sheet`, `Dialog`, `Toast`, `Tabs`, `Menubar`, `ContextMenu`, `Tooltip`, `Separator`

## Common UI Patterns with shadcn/ui

### Page Navigation

**Mobile**:
```tsx
// Use Hash routing or state switching
const [currentPage, setCurrentPage] = useState('home');

// Tab Bar using shadcn/ui Tabs
<Tabs defaultValue="home" className="fixed bottom-0 ...">
  <TabsList>
    <TabsTrigger value="home" onClick={() => setCurrentPage('home')}>
      <HomeIcon /> Home
    </TabsTrigger>
    {/* ... */}
  </TabsList>
</Tabs>
```

**Desktop**:
```tsx
// Sidebar navigation + routing state
const navigate = (page: string) => setCurrentPage(page);

// Keyboard shortcut support
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.altKey && e.key === 'ArrowLeft') navigate('back');
    if (e.altKey && e.key === 'ArrowRight') navigate('forward');
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Form Interactions

- Use shadcn/ui components: `Input`, `Select`, `Checkbox`, `Switch`, `RadioGroup`, `Slider`
- Form validation: use `react-hook-form` + `zod` (if installed) or custom state validation
- Disabled state linkage: control `Button` `disabled` prop based on form state

### State Simulation

```tsx
// Loading state simulation
const [isLoading, setIsLoading] = useState(false);
const loadData = async () => {
  setIsLoading(true);
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate 1.5s loading
  setIsLoading(false);
};

// Toast notification
import { toast } from '@/components/ui/use-toast';
toast({ title: 'Success', description: 'Data saved' });
```

### Dark Mode

```tsx
// Use next-themes or simple state toggle
const [theme, setTheme] = useState<'light' | 'dark'>('light');

// Apply class to root element
<div className={theme}>
  {/* App content */}
</div>

// Toggle button
<Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
  {theme === 'light' ? '🌙' : '☀️'}
</Button>
```

## Batch Output Strategy

### Single-Platform Batch Output (`platform: "mobile"` or `"desktop"`)

1. **Read page inventory** from `doc/ixd/phase2-architecture.md`
2. **Prioritize by importance**: dashboard/home → core lists → detail pages → forms → settings → secondary pages
3. **Output in batches of 3-5 pages** per turn to avoid token limits
4. **After each batch**:
   - Run `bundle-artifact.sh` to produce updated prototype HTML
   - Save/overwrite `doc/ixd/phase7-prototype.html` (or platform-specific filename)
   - Update `progress.json`: record completed page IDs and `lastBatch`
   - **PAUSE** — output a summary then ask the user:
     > "✅ Batch N complete — pages X, Y, Z implemented. Prototype updated: `phase7-prototype.html`
     > Progress: M/total pages done.
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

1. **Implement shared resources first**: Design Tokens (`index.css`), mock data (`lib/mockData.ts`), shared components
2. **Implement layout components**: `MobileLayout.tsx` and `DesktopLayout.tsx` with platform-specific navigation
3. **Implement page pairs**: For each page, create both `pages/mobile/X.tsx` and `pages/desktop/X.tsx`
4. **Batch by page, not by platform**: Complete the mobile + desktop versions of a page together before moving to the next
5. **Page-by-page order**: dashboard/home → list/browse → detail → form/create → settings
6. **Output in batches of 2-3 page pairs per turn**
7. **After each batch**:
   - Bundle both platforms: run `bundle-artifact.sh` for mobile + desktop entries
   - Save/overwrite `doc/ixd/phase7-prototype-mobile.html` and `phase7-prototype-desktop.html`
   - Update `progress.json` with completed page IDs for both platforms
   - **PAUSE** — output a summary then ask:
     > "✅ Batch N complete — page pairs X, Y implemented (mobile + desktop).
     > Prototypes updated: `phase7-prototype-mobile.html` + `phase7-prototype-desktop.html`
     > Progress: M/total page pairs done.
     > **Continue to next batch?** (yes / stop here)"
   - Wait for user confirmation before proceeding

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
| `tokens` | Design tokens not implemented | Resume from Step 2: Implement Design Tokens |
| `layout` | Layout framework not ready | Resume from Step 2.5: Implement layout components |
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

Resuming from **${remainingPages[0].name}**.`);

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
const mobilePages = extractPagesFromPrototype('src/pages/');

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
  - `prototype-mobile.html` — Mobile prototype (390×844px phone frame)
  - `prototype-desktop.html` — Desktop prototype (1280×800px window frame)

**Advantages of single-project approach**:
- Shared Design Tokens ensure visual consistency
- Shared mock data reduces duplication
- Shared business components maximize code reuse
- Single `pnpm install` for all dependencies

Each output file implements platform-native interaction paradigms without responsive breakpoint mixing.

## Design Style Guide (Avoid AI Feel)

To avoid producing overly "AI-looking" designs:
- ❌ Avoid over-centered layouts
- ❌ Avoid large purple gradients
- ❌ Avoid uniform border-radius (use different radii based on element hierarchy)
- ❌ Avoid default Inter font (choose appropriate font based on Phase 6 font system)
- ✅ Use brand colors and design language defined in Phase 6
- ✅ Maintain clear visual hierarchy (title > body > auxiliary text)
- ✅ Appropriate use of whitespace and breathing room

## Quality Checklist

### Mobile

- [ ] Phone frame with realistic status bar (390×844)
- [ ] PrototypeShell wrapper with project name and theme toggle
- [ ] All pages from the spec are implemented
- [ ] Tab navigation works correctly (shadcn/ui Tabs)
- [ ] Page transitions have animation
- [ ] At least default + loading states are shown
- [ ] Mock data is realistic
- [ ] Touch targets are ≥ 44px
- [ ] Scrolling works naturally in content areas
- [ ] Back navigation works consistently
- [ ] Dark mode toggle works
- [ ] No broken interactions or dead-end states

### Desktop

- [ ] Window frame with title bar and traffic lights/window controls (1280×800)
- [ ] PrototypeShell wrapper with project name and theme toggle
- [ ] Sidebar navigation works and collapses correctly (240px ↔ 56px)
- [ ] Sidebar collapsed state shows icons only without label overflow
- [ ] Keyboard navigation works (Tab focus ring visible on all interactive elements)
- [ ] Keyboard shortcuts are registered and hint labels shown
- [ ] Right-click context menu appears on relevant items (shadcn/ui ContextMenu)
- [ ] Hover states on all interactive elements (Tailwind hover:)
- [ ] Tooltips with appropriate delay (shadcn/ui Tooltip)
- [ ] Window resize does not break layout
- [ ] Title bar area is styled correctly (draggable feel, no selectable text)
- [ ] Information density is appropriate (more items visible than mobile)
- [ ] All pages from the spec are implemented
- [ ] Dark mode toggle works
- [ ] No broken interactions or dead-end states