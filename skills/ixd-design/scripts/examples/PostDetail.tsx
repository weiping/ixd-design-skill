// src/pages/PostDetail.tsx — Mobile detail page WITHOUT Tab Bar
// Pattern: page without tab bar (detail pages, auth pages, etc.)
import { PhoneFrame } from '@/components/layout/PhoneFrame';

export function PostDetail() {
  return (
    <PhoneFrame>
      {/* No tabBar prop → no Tab Bar rendered */}
      <BackNavBar title="帖子详情" />
      <div className="p-4">
        {/* ... post detail content ... */}
      </div>
    </PhoneFrame>
  );
}
