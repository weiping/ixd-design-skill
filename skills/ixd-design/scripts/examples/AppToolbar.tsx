// src/components/layout/AppToolbar.tsx
// App-level toolbar / ribbon (Bold / Italic / Undo / Redo / ...)
// Used with flex-shrink-0 inside a flex-col h-full wrapper in WindowFrame children
// ✅ Design Tokens: use semantic tokens (bg-background, border-border) — never hardcode bg-white / border-neutral-200

export function AppToolbar() {
  return (
    // bg-background + border-border → token-backed, matches Phase 6 design system & dark mode
    <div className="flex-shrink-0 h-10 flex items-center gap-1 px-3 bg-background border-b border-border">
      {/* hover:bg-accent → token-backed hover state; text-foreground → token-backed label */}
      <button className="p-1.5 rounded hover:bg-accent hover:text-accent-foreground font-bold text-sm text-foreground">B</button>
      <button className="p-1.5 rounded hover:bg-accent hover:text-accent-foreground italic text-sm text-foreground">I</button>
      <button className="p-1.5 rounded hover:bg-accent hover:text-accent-foreground underline text-sm text-foreground">U</button>
      {/* ... more toolbar buttons per Phase 4 spec ... */}
    </div>
  );
}
