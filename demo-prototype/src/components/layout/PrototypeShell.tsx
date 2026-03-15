import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeContext } from './ThemeContext';

interface PageItem {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface PrototypeShellProps {
  productName: string;
  children: React.ReactNode;
  pages?: PageItem[];
  currentPage?: string;
  onPageChange?: (pageId: string) => void;
  interactions?: string[];
  /** Display mode: 'mobile' shows phone frame, 'desktop' shows window frame, 'auto' matches content width */
  displayMode?: 'mobile' | 'desktop' | 'auto';
  /** Custom content width - overrides displayMode */
  contentWidth?: number;
  /** Corner radius style: 'rounded' (rounded) or 'square' (sharp corners) - matches device frame */
  cornerStyle?: 'rounded' | 'square';
}

export function PrototypeShell({
  productName,
  children,
  pages = [],
  currentPage = '',
  onPageChange,
  interactions,
  displayMode = 'auto',
  contentWidth,
  cornerStyle = 'rounded'
}: PrototypeShellProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Calculate content width based on displayMode
  const getContentWidth = () => {
    if (contentWidth) return contentWidth;
    switch (displayMode) {
      case 'mobile':
        return 390; // iPhone width + frame padding
      case 'desktop':
        return 1280; // Desktop width
      default:
        return undefined; // auto width
    }
  };

  const contentWidthValue = getContentWidth();
  const cornerClass = cornerStyle === 'rounded' ? 'rounded-2xl' : 'rounded-none';

  return (
    // ThemeContext.Provider propagates the current theme to all descendant
    // PhoneFrame / WindowFrame components — no need to pass theme prop manually.
    <ThemeContext.Provider value={theme}>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-neutral-950' : 'bg-neutral-50'} ${theme}`}>
        <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b backdrop-blur-sm bg-background/80 ${cornerClass}`}>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              {productName}
            </h1>
            <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">v1.0</span>
          </div>
          <div className="flex items-center gap-2">
            {interactions && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                    Guide
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <h2 className="text-lg font-semibold mb-4">Interactions (Phase 4)</h2>
                  <ul className="space-y-2">
                    {interactions.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground">• {item}</li>
                    ))}
                  </ul>
                </SheetContent>
              </Sheet>
            )}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              )}
            </Button>
          </div>
        </header>

        <main className="pt-20 pb-8 px-4 min-h-screen">
          <div
            className={`mx-auto transition-all duration-300 ${cornerClass}`}
            style={contentWidthValue ? { width: `${contentWidthValue}px` } : {}}
          >
            {children}
          </div>
        </main>

        {pages.length > 0 && (
          <nav className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageChange?.(page.id)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentPage === page.id
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                title={page.name}
              />
            ))}
          </nav>
        )}
      </div>
    </ThemeContext.Provider>
  );
}
