// src/components/layout/AppMenuBar.tsx
// App-level menu bar (File / Edit / View / ...)
// Used with flex-shrink-0 inside a flex-col h-full wrapper in WindowFrame children

export function AppMenuBar() {
  return (
    <div className="flex-shrink-0 h-8 flex items-center px-2 gap-1 bg-neutral-100 border-b border-neutral-200 text-sm">
      {['File', 'Edit', 'View', 'Insert', 'Format', 'Help'].map(label => (
        <button key={label} className="px-3 py-1 rounded hover:bg-neutral-200 text-neutral-700">
          {label}
        </button>
      ))}
    </div>
  );
}
