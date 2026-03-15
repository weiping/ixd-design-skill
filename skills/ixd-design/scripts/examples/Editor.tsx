// src/pages/desktop/Editor.tsx — Word-style desktop page with Menu Bar + Toolbar
// Pattern: app-level bars (non-scrolling) above scrollable content area
import { WindowFrame } from '@/components/layout/WindowFrame';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppMenuBar } from '@/components/layout/AppMenuBar';
import { AppToolbar } from '@/components/layout/AppToolbar';

export function Editor() {
  return (
    <WindowFrame
      title="Document.docx — MyEditor"
      width={1280}
      height={800}
      sidebar={<AppSidebar activeItem="editor" />}  // optional
    >
      {/**
       * App Chrome bars: use flex-col h-full wrapper.
       * h-full fills the content area exactly — no outer overflow, outer div won't scroll.
       * AppMenuBar and AppToolbar are flex-shrink-0 (non-scrolling).
       * The inner div (flex-1 overflow-y-auto) handles the actual page scroll.
       */}
      <div className="flex flex-col h-full">
        <AppMenuBar />   {/* App Chrome: File / Edit / View / Format / ... */}
        <AppToolbar />   {/* App Chrome: Bold / Italic / Undo / Redo / ... */}
        <div className="flex-1 overflow-y-auto">
          {/* Page content — scrollable */}
          <DocumentContent />
        </div>
      </div>
    </WindowFrame>
  );
}
