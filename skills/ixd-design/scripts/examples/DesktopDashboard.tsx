// src/pages/desktop/Dashboard.tsx — Desktop page with Sidebar
// Pattern: basic desktop page with sidebar navigation
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
      {/* Page content — scrollable area to the right of the sidebar */}
      <div className="p-6">
        <h1>Dashboard</h1>
        {/* ... page content ... */}
      </div>
    </WindowFrame>
  );
}
