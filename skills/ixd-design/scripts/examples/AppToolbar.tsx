// src/components/layout/AppToolbar.tsx
// App-level toolbar / ribbon (Bold / Italic / Undo / Redo / ...)
// Used with flex-shrink-0 inside a flex-col h-full wrapper in WindowFrame children

export function AppToolbar() {
  return (
    <div className="flex-shrink-0 h-10 flex items-center gap-1 px-3 bg-white border-b border-neutral-200">
      <button className="p-1.5 rounded hover:bg-neutral-100 font-bold text-sm">B</button>
      <button className="p-1.5 rounded hover:bg-neutral-100 italic text-sm">I</button>
      <button className="p-1.5 rounded hover:bg-neutral-100 underline text-sm">U</button>
      {/* ... more toolbar buttons per Phase 4 spec ... */}
    </div>
  );
}
