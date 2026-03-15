// src/components/layout/AppSidebar.tsx
// Desktop sidebar navigation — implement per Phase 4 spec
// Pass to WindowFrame via sidebar prop

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
