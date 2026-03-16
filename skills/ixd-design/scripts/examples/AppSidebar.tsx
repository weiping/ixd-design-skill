// src/components/layout/AppSidebar.tsx
// Desktop sidebar navigation — implement per Phase 4 spec
// Pass to WindowFrame via sidebar prop
// ✅ Dark theme: use Tailwind semantic tokens — never hardcode bg-neutral-50 / text-neutral-600

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
    // bg-muted + border-border → automatically switches in dark mode
    <div className="w-60 h-full bg-muted border-r border-border flex flex-col py-4">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => onItemChange?.(item.id)}
          className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
            activeItem === item.id
              ? 'bg-accent text-accent-foreground font-medium'          // active: semantic accent
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'  // inactive: muted → accent on hover
          }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}
