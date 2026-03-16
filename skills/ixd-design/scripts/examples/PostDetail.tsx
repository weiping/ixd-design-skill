// src/pages/PostDetail.tsx — Mobile detail page WITHOUT Tab Bar
// Pattern: page without tab bar (detail pages, auth pages, etc.)
// ✅ Dark theme: use Tailwind semantic tokens (bg-background, text-foreground, etc.) — never hardcode colors
import { PhoneFrame } from '@/components/layout/PhoneFrame';

export function PostDetail() {
  return (
    <PhoneFrame>
      {/* No tabBar prop → no Tab Bar rendered */}
      {/**
       * ✅ DO: use semantic tokens for all color values — dark mode works automatically
       * ❌ DON'T: hardcode colors (bg-white, text-gray-900, border-gray-200) — breaks dark mode
       */}
      <BackNavBar title="帖子详情" />
      <div className="p-4 bg-background text-foreground">
        {/* Content surfaces — use bg-card / text-card-foreground for card areas */}
        <div className="rounded-xl bg-card text-card-foreground border border-border p-4">
          {/* ... post detail content ... */}
        </div>
        {/* Secondary text — use text-muted-foreground */}
        <p className="mt-2 text-sm text-muted-foreground">
          {/* ... timestamp, author info ... */}
        </p>
      </div>
    </PhoneFrame>
  );
}
