#!/bin/bash

# Exit on error
set -e

# Detect Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)

echo "🔍 Detected Node.js version: $NODE_VERSION"

if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ Error: Node.js 18 or higher is required"
  echo "   Current version: $(node -v)"
  exit 1
fi

# Set Vite version based on Node version
if [ "$NODE_VERSION" -ge 20 ]; then
  VITE_VERSION="latest"
  echo "✅ Using Vite latest (Node 20+)"
else
  VITE_VERSION="5.4.11"
  echo "✅ Using Vite $VITE_VERSION (Node 18 compatible)"
fi

# Detect OS and set sed syntax
if [[ "$OSTYPE" == "darwin"* ]]; then
  SED_INPLACE="sed -i ''"
else
  SED_INPLACE="sed -i"
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
  echo "📦 pnpm not found. Installing pnpm..."
  npm install -g pnpm
fi

# Check if project name is provided
if [ -z "$1" ]; then
  echo "❌ Usage: ./create-react-shadcn-complete.sh <project-name>"
  exit 1
fi

PROJECT_NAME="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPONENTS_TARBALL="$SCRIPT_DIR/shadcn-components.tar.gz"

# Check if components tarball exists
if [ ! -f "$COMPONENTS_TARBALL" ]; then
  echo "❌ Error: shadcn-components.tar.gz not found in script directory"
  echo "   Expected location: $COMPONENTS_TARBALL"
  exit 1
fi

echo "🚀 Creating new React + Vite project: $PROJECT_NAME"

# Create new Vite project (always use latest create-vite, pin vite version later)
pnpm create vite "$PROJECT_NAME" --template react-ts

# Navigate into project directory
cd "$PROJECT_NAME"

echo "🧹 Cleaning up Vite template..."
$SED_INPLACE '/<link rel="icon".*vite\.svg/d' index.html
$SED_INPLACE 's/<title>.*<\/title>/<title>'"$PROJECT_NAME"'<\/title>/' index.html

echo "📦 Installing base dependencies..."
pnpm install

# Pin Vite version for Node 18
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "📌 Pinning Vite to $VITE_VERSION for Node 18 compatibility..."
  pnpm add -D vite@$VITE_VERSION
fi

echo "📦 Installing Tailwind CSS and dependencies..."
pnpm install -D tailwindcss@3.4.1 postcss autoprefixer @types/node tailwindcss-animate
pnpm install class-variance-authority clsx tailwind-merge lucide-react next-themes

echo "⚙️  Creating Tailwind and PostCSS configuration..."
cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

echo "📝 Configuring Tailwind with shadcn theme..."
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
EOF

# Add Tailwind directives and CSS variables to index.css
echo "🎨 Adding Tailwind directives and CSS variables..."
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
EOF

# Add path aliases to tsconfig.json
echo "🔧 Adding path aliases to tsconfig.json..."
node -e "
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
config.compilerOptions = config.compilerOptions || {};
config.compilerOptions.baseUrl = '.';
config.compilerOptions.paths = { '@/*': ['./src/*'] };
fs.writeFileSync('tsconfig.json', JSON.stringify(config, null, 2));
"

# Add path aliases to tsconfig.app.json
echo "🔧 Adding path aliases to tsconfig.app.json..."
node -e "
const fs = require('fs');
const path = 'tsconfig.app.json';
const content = fs.readFileSync(path, 'utf8');
// Remove comments manually
const lines = content.split('\n').filter(line => !line.trim().startsWith('//'));
const jsonContent = lines.join('\n');
const config = JSON.parse(jsonContent.replace(/\/\*[\s\S]*?\*\//g, '').replace(/,(\s*[}\]])/g, '\$1'));
config.compilerOptions = config.compilerOptions || {};
config.compilerOptions.baseUrl = '.';
config.compilerOptions.paths = { '@/*': ['./src/*'] };
fs.writeFileSync(path, JSON.stringify(config, null, 2));
"

# Update vite.config.ts
echo "⚙️  Updating Vite configuration..."
cat > vite.config.ts << 'EOF'
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
EOF

# Install all shadcn/ui dependencies
echo "📦 Installing shadcn/ui dependencies..."
pnpm install @radix-ui/react-accordion @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip
pnpm install sonner cmdk vaul embla-carousel-react react-day-picker react-resizable-panels date-fns react-hook-form @hookform/resolvers zod

# Extract shadcn components from tarball
echo "📦 Extracting shadcn/ui components..."
tar -xzf "$COMPONENTS_TARBALL" -C src/

# Create components.json for reference
echo "📝 Creating components.json config..."
cat > components.json << 'EOF'
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
EOF

# ============================================
# Step 5: Create layout components template
# ============================================
echo "🏗️  Creating layout components (PrototypeShell, PhoneFrame, WindowFrame)..."

mkdir -p src/components/layout

# Create PrototypeShell.tsx
cat > src/components/layout/PrototypeShell.tsx << 'EOF'
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
  pages?: PageItem[];
  currentPage?: string;
  onPageChange?: (pageId: string) => void;
  interactions?: string[];
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

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-neutral-950' : 'bg-neutral-50'} ${theme}`}>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b backdrop-blur-sm bg-background/80">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {productName}
          </h1>
          <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">v1.0</span>
        </div>
        <div className="flex items-center gap-2">
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
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            )}
          </Button>
        </div>
      </header>

      <main className="pt-20 pb-8 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

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
EOF

# Create PhoneFrame.tsx
cat > src/components/layout/PhoneFrame.tsx << 'EOF'
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
      <div
        className={`relative rounded-[48px] p-1.5 shadow-2xl overflow-hidden ring-1 ${
          theme === 'dark' ? 'bg-neutral-800 ring-neutral-700' : 'bg-neutral-900 ring-neutral-200'
        }`}
        style={{ width: '390px', height: '844px' }}
      >
        <div className="absolute top-0 left-0 right-0 h-11 flex items-center justify-between px-6 text-white z-10">
          <span className="text-sm font-medium">
            {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-[2px] h-3">
              <div className="w-0.5 bg-white rounded-full" />
              <div className="w-0.5 bg-white rounded-full" />
              <div className="w-0.5 bg-white rounded-full" />
              <div className="w-0.5 bg-white/40 rounded-full" />
            </div>
            <svg className="w-4 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
            <svg className="w-5 h-2.5" viewBox="0 0 24 12" fill="currentColor">
              <rect x="1" y="4" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="3" y="5.5" width="14" height="5" rx="1.5" />
              <rect x="20" y="4.5" width="2" height="3" rx="0.5" />
            </svg>
          </div>
        </div>

        <div
          ref={contentRef}
          className={`rounded-[40px] h-full overflow-hidden flex flex-col ${
            theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
          }`}
        >
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pt-11 pb-16 touch-pan-y"
            style={{ scrollBehavior: 'smooth' }}
          >
            {children}
          </div>

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

        <div className="absolute top-1 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-full z-20" />
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/60 rounded-full" />
      </div>
    </div>
  );
}
EOF

# Create WindowFrame.tsx
cat > src/components/layout/WindowFrame.tsx << 'EOF'
import { useRef, useEffect } from 'react';

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
      <div
        className={`rounded-xl shadow-2xl overflow-hidden ring-1 ${
          theme === 'dark' ? 'bg-neutral-800 ring-neutral-700' : 'bg-white ring-neutral-200'
        }`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div
          className={`h-10 flex items-center px-4 gap-3 ${
            theme === 'dark' ? 'bg-neutral-800 border-b border-neutral-700' : 'bg-neutral-100 border-b border-neutral-200'
          }`}
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
          </div>
          <span className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {title}
          </span>
        </div>

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
EOF

# Create layout index.ts
cat > src/components/layout/index.ts << 'EOF'
export { PrototypeShell } from './PrototypeShell';
export { PhoneFrame } from './PhoneFrame';
export { WindowFrame } from './WindowFrame';
EOF

echo "✅ Layout components created!"

echo "✅ Setup complete! You can now use Tailwind CSS and shadcn/ui in your project."
echo ""
echo "📦 Included components (40+ total):"
echo "  - accordion, alert, aspect-ratio, avatar, badge, breadcrumb"
echo "  - button, calendar, card, carousel, checkbox, collapsible"
echo "  - command, context-menu, dialog, drawer, dropdown-menu"
echo "  - form, hover-card, input, label, menubar, navigation-menu"
echo "  - popover, progress, radio-group, resizable, scroll-area"
echo "  - select, separator, sheet, skeleton, slider, sonner"
echo "  - switch, table, tabs, textarea, toast, toggle, toggle-group, tooltip"
echo ""
echo "To start developing:"
echo "  cd $PROJECT_NAME"
echo "  pnpm dev"
echo ""
echo "📚 Import components like:"
echo "  import { Button } from '@/components/ui/button'"
echo "  import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'"
echo "  import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'"
