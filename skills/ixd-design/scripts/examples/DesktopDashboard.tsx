// src/pages/desktop/Dashboard.tsx — Desktop page with Sidebar
// Pattern: basic desktop page with sidebar navigation
// ✅ Dark theme: use Tailwind semantic tokens (bg-background, text-foreground, etc.) — never hardcode colors
import { WindowFrame } from '@/components/layout/WindowFrame';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { useState } from 'react';

export function Dashboard() {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <WindowFrame
      title="Dashboard"
      width={1280}
      height={800}
      sidebar={<AppSidebar activeItem={activeItem} onItemChange={setActiveItem} />}
    >
      {/**
       * Page content — scrollable area to the right of the sidebar
       * ✅ DO: use semantic tokens for all color values — dark mode works automatically
       * ❌ DON'T: hardcode colors (bg-white, text-gray-900, border-gray-200) — breaks dark mode
       */}
      <div className="p-6 bg-background text-foreground">
        <h1 className="text-foreground font-semibold text-xl">Dashboard</h1>
        {/* Card surfaces — use bg-card / text-card-foreground */}
        <div className="mt-4 rounded-lg bg-card text-card-foreground border border-border p-4">
          {/* ... page content ... */}
        </div>
        {/* Muted secondary text */}
        <p className="mt-2 text-sm text-muted-foreground">
          {/* ... subtitle, metadata ... */}
        </p>
      </div>
    </WindowFrame>
  );
}
