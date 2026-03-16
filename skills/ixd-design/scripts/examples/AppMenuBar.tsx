// src/components/layout/AppMenuBar.tsx
// App-level menu bar (File / Edit / View / ...)
// Used with flex-shrink-0 inside a flex-col h-full wrapper in WindowFrame children
// ✅ Design Tokens: use semantic tokens (bg-muted, border-border, text-foreground) — never hardcode bg-neutral-100 / text-neutral-700

export function AppMenuBar() {
  return (
    // bg-muted + border-border → token-backed, matches Phase 6 design system & dark mode
    <div className="flex-shrink-0 h-8 flex items-center px-2 gap-1 bg-muted border-b border-border text-sm">
      {['File', 'Edit', 'View', 'Insert', 'Format', 'Help'].map(label => (
        // text-foreground for label; hover:bg-accent hover:text-accent-foreground for interactive state
        <button key={label} className="px-3 py-1 rounded hover:bg-accent hover:text-accent-foreground text-foreground">
          {label}
        </button>
      ))}
    </div>
  );
}
