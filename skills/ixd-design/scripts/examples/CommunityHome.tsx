// src/pages/CommunityHome.tsx — Mobile page with Tab Bar + Top Nav
// Pattern: page with custom Tab Bar passed via tabBar slot
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
       * ❌ DON'T: re-implement status bar — PhoneFrame already provides it
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
