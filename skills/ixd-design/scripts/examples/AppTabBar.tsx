// src/components/layout/AppTabBar.tsx
// Custom Tab Bar — full control over design, 凸起 button, badges, colors
// Implement per Phase 4 spec; pass to PhoneFrame via tabBar prop
// ✅ Dark theme: use Tailwind semantic tokens — never hardcode bg-white / border-gray-*

interface AppTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppTabBar({ activeTab, onTabChange }: AppTabBarProps) {
  return (
    // bg-background + border-border → automatically switches in dark mode
    <div className="h-[83px] bg-background border-t border-border flex items-start justify-around px-4 pt-2">
      <TabItem id="community" label="社区" icon={<PawIcon />} active={activeTab === 'community'} onTabChange={onTabChange} />
      <TabItem id="consult" label="问诊" icon={<MedIcon />} active={activeTab === 'consult'} onTabChange={onTabChange} />
      {/* Center publish button — raised above tab bar */}
      <div className="relative -top-4">
        {/* bg-primary is a semantic token — stays correct in both themes */}
        <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <PlusIcon className="w-7 h-7 text-primary-foreground" />
        </button>
      </div>
      <TabItem id="shop" label="商城" icon={<ShopIcon />} active={activeTab === 'shop'} onTabChange={onTabChange} />
      <TabItem id="profile" label="我的" icon={<UserIcon />} active={activeTab === 'profile'} onTabChange={onTabChange} />
    </div>
  );
}
