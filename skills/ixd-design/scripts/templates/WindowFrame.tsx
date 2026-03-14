import React, { useRef, useEffect } from 'react';

interface WindowFrameProps {
  /** Scrollable page content (main area to the right of the sidebar).
   *  Do NOT re-implement the title bar or sidebar here — use the `sidebar` slot instead. */
  children: React.ReactNode;
  /** Optional: custom Sidebar component rendered as a flex-shrink-0 column to the left of content.
   *  Use this for app-level navigation (e.g. <AppSidebar />) that should be fixed alongside the content area.
   *  The slot is rendered as flex-shrink-0 in a flex-row body, so it stays within the window area. */
  sidebar?: React.ReactNode;
  theme?: 'light' | 'dark';
  title?: string;
  width?: number;
  height?: number;
}

export function WindowFrame({
  children,
  sidebar,
  theme = 'light',
  title = 'Application',
  width = 1280,
  height = 800
}: WindowFrameProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = scrollRef.current;
    if (!content) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      content.scrollTop += e.deltaY;
    };

    content.addEventListener('wheel', handleWheel, { passive: false });
    return () => content.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="flex justify-center">
      {/* Desktop Window Frame — title bar is window Chrome, always present */}
      <div
        className={`rounded-xl shadow-2xl overflow-hidden ring-1 flex flex-col ${
          theme === 'dark' ? 'bg-neutral-800 ring-neutral-700' : 'bg-white ring-neutral-200'
        }`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {/* Title Bar — window Chrome (macOS style traffic lights + title) */}
        <div
          className={`h-10 flex-shrink-0 flex items-center px-4 gap-3 ${
            theme === 'dark' ? 'bg-neutral-800 border-b border-neutral-700' : 'bg-neutral-100 border-b border-neutral-200'
          }`}
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
          </div>
          <span className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {title}
          </span>
        </div>

        {/* Body — flex-row: sidebar slot (left) + scrollable content area (right) */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar slot — flex-shrink-0, stays within window area, never overflows.
              Pass your custom Sidebar component here (supports collapsible, nav items, any design). */}
          {sidebar && (
            <div className="flex-shrink-0 h-full">
              {sidebar}
            </div>
          )}

          {/* Scrollable content area */}
          <div
            ref={scrollRef}
            className={`flex-1 overflow-auto ${
              theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
