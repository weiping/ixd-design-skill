import React, { useRef, useEffect } from 'react';

interface PhoneFrameProps {
  /** Scrollable page content. pt-11 (44px) is applied internally for the status bar safe area.
   *  Do NOT add a top navigation bar or bottom tab bar here — use the `tabBar` slot instead. */
  children: React.ReactNode;
  /** Optional: custom Tab Bar component rendered as a flex child at the bottom of the screen area.
   *  Use this for app-level navigation (e.g. <AppTabBar />) that should be fixed above the home indicator.
   *  The slot is rendered as flex-shrink-0, so it stays within the screen area and never covers the phone border. */
  tabBar?: React.ReactNode;
  theme?: 'light' | 'dark';
}

export function PhoneFrame({
  children,
  tabBar,
  theme = 'light',
}: PhoneFrameProps) {
  const contentRef = useRef<HTMLDivElement>(null);
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
      {/* iPhone 14 Frame — 390×844px, phone border is p-1.5 (6px) */}
      <div
        className={`relative rounded-[48px] p-1.5 shadow-2xl overflow-hidden ring-1 ${
          theme === 'dark' ? 'bg-neutral-800 ring-neutral-700' : 'bg-neutral-900 ring-neutral-200'
        }`}
        style={{ width: '390px', height: '844px' }}
      >
        {/* Status Bar — phone Chrome, always present, absolute on outer frame */}
        <div className="absolute top-0 left-0 right-0 h-11 flex items-center justify-between px-6 text-white z-10">
          <span className="text-sm font-medium">
            {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-[2px] h-3">
              <div className="w-0.5 bg-white rounded-full" />
              <div className="w-0.5 bg-white rounded-full" />
              <div className="w-0.5 bg-white rounded-full" />
              <div className="w-0.5 bg-white/40 rounded-full" />
            </div>
            <svg className="w-4 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
            <svg className="w-5 h-2.5" viewBox="0 0 24 12" fill="currentColor">
              <rect x="1" y="4" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="3" y="5.5" width="14" height="5" rx="1.5" />
              <rect x="20" y="4.5" width="2" height="3" rx="0.5" />
            </svg>
          </div>
        </div>

        {/* Screen Area — flex column, clipped by phone border (rounded-[40px] overflow-hidden) */}
        <div
          ref={contentRef}
          className={`rounded-[40px] h-full overflow-hidden flex flex-col ${
            theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
          }`}
        >
          {/* Scrollable content — pt-11 reserves the 44px status bar safe area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pt-11 touch-pan-y"
            style={{ scrollBehavior: 'smooth' }}
          >
            {children}
          </div>

          {/* Tab Bar slot — flex-shrink-0 child, stays within screen area, never covers phone border.
              Pass your custom Tab Bar component here (supports凸起 button, badges, any design). */}
          {tabBar && (
            <div className="flex-shrink-0">
              {tabBar}
            </div>
          )}
        </div>

        {/* Dynamic Island — pointer-events-none so it doesn't block clicks on status bar area */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-full z-20 pointer-events-none" />
        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/60 rounded-full" />
      </div>
    </div>
  );
}
