import React, { useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';

interface PhoneFrameProps {
  /** Scrollable page content. Status bar safe area is handled internally — do NOT add pt-11.
   *  Do NOT add a bottom tab bar here — use the `tabBar` slot instead. */
  children: React.ReactNode;
  /** Optional: custom Tab Bar component rendered as a flex child at the bottom of the screen area.
   *  Use this for app-level navigation (e.g. <AppTabBar />) that should be fixed above the home indicator.
   *  The slot is rendered as flex-shrink-0, so it stays within the screen area and never covers the phone border. */
  tabBar?: React.ReactNode;
  /**
   * Optional theme override. When omitted (recommended), theme is inherited from the
   * nearest PrototypeShell via ThemeContext — the shell's toggle propagates here automatically.
   * Only pass this prop when you need a page that is always light or always dark regardless
   * of the shell setting (e.g. a forced-dark onboarding splash).
   */
  theme?: 'light' | 'dark';
}

export function PhoneFrame({
  children,
  tabBar,
  theme: themeProp,
}: PhoneFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Inherit theme from PrototypeShell context; explicit prop overrides for special pages.
  const contextTheme = useTheme();
  const theme = themeProp ?? contextTheme;

  // Capture ALL wheel events over the entire phone frame and route them to
  // the scrollable content area — prevents the outer PrototypeShell from scrolling.
  useEffect(() => {
    const frame = frameRef.current;
    const content = scrollRef.current;
    if (!frame || !content) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Walk up from the event target to find the nearest scrollable element.
      // This allows pages with their own scroll containers (lists, feeds, modals)
      // to scroll correctly instead of always routing to PhoneFrame's root container.
      let target = e.target as HTMLElement | null;
      while (target && target !== frame) {
        const style = getComputedStyle(target);
        const overflowY = style.overflowY;
        const canScroll =
          overflowY !== 'hidden' &&
          overflowY !== 'visible' &&
          target.scrollHeight > target.clientHeight;
        if (canScroll) {
          target.scrollTop += e.deltaY;
          return;
        }
        target = target.parentElement;
      }

      // Fallback: scroll PhoneFrame's own content wrapper
      content.scrollTop += e.deltaY;
    };

    frame.addEventListener('wheel', handleWheel, { passive: false });
    return () => frame.removeEventListener('wheel', handleWheel);
  }, []);

  const isDark = theme === 'dark';

  // Status bar text: dark text on light screen, white text on dark screen
  const statusTextClass = isDark ? 'text-white' : 'text-neutral-900';

  // Current time — static snapshot at render time (matches real iOS status bar)
  const timeStr = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex justify-center" data-testid="phone-frame">
      {/* iPhone 14 Frame — 390×844px, phone border is p-1.5 (6px) */}
      <div
        ref={frameRef}
        className={`relative rounded-[48px] p-1.5 shadow-2xl overflow-hidden ring-1 ${
          isDark ? 'bg-neutral-800 ring-neutral-700' : 'bg-neutral-900 ring-neutral-200'
        }`}
        style={{ width: '390px', height: '844px' }}
      >
        {/* Screen Area — flex column, clipped by phone border */}
        <div
          className={`rounded-[40px] h-full overflow-hidden flex flex-col ${
            isDark ? 'bg-neutral-900' : 'bg-white'
          }`}
        >
          {/* Status Bar — inside screen area so it inherits screen background.
              Theme-aware text color ensures visibility on both light and dark screens. */}
          <div
            className={`flex-shrink-0 h-11 flex items-center justify-between px-6 ${statusTextClass}`}
          >
            {/* Time */}
            <span className="text-sm font-semibold tabular-nums">{timeStr}</span>

            {/* Right icons: Signal · WiFi · Battery */}
            <div className="flex items-center gap-[5px]">
              {/* Signal bars — 4 bars with ascending heights */}
              <div className="flex items-end gap-[2px]" style={{ height: '11px' }}>
                <div className="w-[3px] rounded-sm bg-current" style={{ height: '4px' }} />
                <div className="w-[3px] rounded-sm bg-current" style={{ height: '6px' }} />
                <div className="w-[3px] rounded-sm bg-current" style={{ height: '8px' }} />
                <div className="w-[3px] rounded-sm bg-current opacity-30" style={{ height: '11px' }} />
              </div>

              {/* WiFi — three arcs + dot */}
              <svg
                className="w-[15px] h-[11px]"
                viewBox="0 0 15 11"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
              >
                <circle cx="7.5" cy="10" r="1.2" fill="currentColor" stroke="none" />
                <path d="M4.5 7.5a4.2 4.2 0 0 1 6 0" strokeWidth="1.4" />
                <path d="M2 5a7.5 7.5 0 0 1 11 0" strokeWidth="1.4" />
                <path d="M0 2.5a11 11 0 0 1 15 0" strokeWidth="1.4" />
              </svg>

              {/* Battery — outline + fill + terminal */}
              <svg
                className="w-[22px] h-[11px]"
                viewBox="0 0 22 11"
                fill="currentColor"
              >
                {/* Outer casing */}
                <rect x="0.5" y="0.5" width="19" height="10" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
                {/* Fill (75%) */}
                <rect x="2" y="2" width="14" height="7" rx="1.5" />
                {/* Terminal nub */}
                <rect x="20.5" y="3.5" width="1.5" height="4" rx="0.75" />
              </svg>
            </div>
          </div>

          {/* Scrollable content — no pt-11 needed (status bar is a flex child above) */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide touch-pan-y"
            style={{ scrollBehavior: 'smooth' }}
          >
            {children}
          </div>

          {/* Tab Bar slot — flex-shrink-0 child, stays within screen area, never covers phone border.
              Pass your custom Tab Bar component here (supports 凸起 button, badges, any design). */}
          {tabBar && (
            <div className="flex-shrink-0">
              {tabBar}
            </div>
          )}
        </div>

        {/* Dynamic Island — pointer-events-none so it doesn't block taps on status bar */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-full z-20 pointer-events-none" />

        {/* Home Indicator */}
        <div
          className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full ${
            isDark ? 'bg-white/60' : 'bg-neutral-900/30'
          }`}
        />
      </div>
    </div>
  );
}
