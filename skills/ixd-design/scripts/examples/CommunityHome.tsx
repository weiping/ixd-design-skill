// src/pages/CommunityHome.tsx — Mobile page with Tab Bar + Top Nav
// Pattern: page with custom Tab Bar passed via tabBar slot
// ✅ Dark theme: use Tailwind semantic tokens (bg-background, text-foreground, etc.) — never hardcode colors
import { PhoneFrame } from '@/components/layout/PhoneFrame';
import { AppTabBar } from '@/components/layout/AppTabBar';

export function CommunityHome() {
  return (
    <PhoneFrame
      tabBar={<AppTabBar activeTab="community" onTabChange={(tab) => console.log(tab)} />}
    >
      {/**
       * children = scrollable page content ONLY.
       * ✅ DO: implement page-specific top nav bar (搜索/分段控件/消息图标) here
       * ✅ DO: implement all scrollable page content here
       * ✅ DO: use semantic tokens (bg-background, text-foreground, border-border) — dark mode works automatically
       * ❌ DON'T: re-implement status bar — PhoneFrame already provides it
       * ❌ DON'T: re-implement Tab Bar — pass it via `tabBar` prop above
       * ❌ DON'T: hardcode colors (bg-white, text-gray-900, #ffffff) — breaks dark mode
       */}
      <TopNavBar />        {/* Page-specific top nav: search + segments + message icon */}
      <div className="p-4 bg-background text-foreground">
        <h1 className="text-foreground font-semibold">Community Feed</h1>
        {/* Card example — use bg-card / text-card-foreground for card surfaces */}
        <div className="mt-3 rounded-xl bg-card text-card-foreground border border-border p-4">
          {/* ... waterfall feed content ... */}
        </div>
      </div>
    </PhoneFrame>
  );
}
