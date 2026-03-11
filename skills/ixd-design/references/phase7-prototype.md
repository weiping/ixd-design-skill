# Phase 7: Interactive Prototype （可交互原型）

## Objective

Generate a clickable, high-fidelity prototype that can be tested in a browser or rendered as a claude.ai artifact. This is the AI's unique advantage over traditional tools like Modao — producing real, functional code.

## Output Formats

| Format | Use Case | File |
|--------|----------|------|
| Single HTML | Quick demo, standalone sharing | `.html` |
| React JSX | Claude.ai artifact rendering | `.jsx` |
| Multi-file React | Complex prototypes (via web-artifacts-builder skill) | `.jsx` + supporting files |

Default to **React JSX** when in claude.ai, **single HTML** when in Claude Code.

### Cross-Platform Dual-File Strategy

For cross-platform projects, output **TWO separate files** instead of one responsive file:

| File | Viewport | Purpose |
|------|----------|---------|
| `prototype-mobile.html` | 390×844 phone simulation | Mobile-native interaction patterns |
| `prototype-desktop.html` | 1280×800 desktop window simulation | Desktop-native interaction patterns |

Both files share the **same Design Token CSS variables** (colors, typography scale, spacing units, border-radius, shadows) but implement **different platform-native interaction patterns**.

**Why two files instead of responsive CSS?**

- Mobile and desktop have fundamentally different **information architecture** — mobile uses flat, card-based stacking; desktop uses sidebar + multi-panel spatial layouts
- **Navigation paradigms** differ: bottom tab bar (mobile) vs. sidebar + top toolbar (desktop)
- **Information density** differs: mobile shows 3-5 items per viewport; desktop shows 10-20+ with auxiliary info
- **Interaction models** differ: touch/swipe/pull-to-refresh (mobile) vs. hover/right-click/keyboard shortcuts/drag-resize (desktop)
- A single responsive file forces compromises that make neither platform feel native

**Single-platform projects** still use one file (`.html` or `.jsx`).

## Architecture: Mobile Phone Frame

Always wrap the mobile prototype in a phone-shaped container:

```jsx
// Phone frame wrapper
<div style={{
  maxWidth: '390px',
  height: '844px',
  margin: '0 auto',
  borderRadius: '40px',
  overflow: 'hidden',
  boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
  position: 'relative',
  background: '#fff'
}}>
  {/* Status bar */}
  <div style={{ height: '47px', background: '#fff', display: 'flex', ... }}>
    <span>9:41</span>
    {/* battery, signal icons */}
  </div>

  {/* Page content (scrollable) */}
  <div style={{ height: 'calc(100% - 47px - 83px)', overflowY: 'auto' }}>
    {currentPage}
  </div>

  {/* Tab bar (if applicable) */}
  <div style={{ height: '83px', borderTop: '1px solid #eee', ... }}>
    {tabs}
  </div>
</div>
```

## Architecture: Desktop Window Frame

Wrap the desktop prototype in a window-shaped container with native chrome:

```
Desktop frame: 1280×800px
├── Title Bar (custom, draggable)
│   ├── Traffic lights (macOS) or Min/Max/Close (Windows)
│   └── Window title / breadcrumb
├── Toolbar (top actions, search, view toggles)
├── Main Layout (horizontal)
│   ├── Sidebar Navigation (collapsible: 240px ↔ 56px)
│   ├── Content Area (flexible)
│   └── Auxiliary Panel (optional, resizable)
└── Status Bar (bottom, contextual info)
```

```jsx
// Desktop window frame wrapper
const DesktopFrame = ({ children, title = 'App', platform = 'macos' }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div style={{
      width: '1280px',
      height: '800px',
      margin: '20px auto',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      border: '1px solid #d1d1d1'
    }}>
      {/* Title bar */}
      <div style={{
        height: '38px',
        background: 'linear-gradient(180deg, #f6f6f6, #e8e8e8)',
        borderBottom: '1px solid #d1d1d1',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        cursor: 'default',
        WebkitUserSelect: 'none'
      }}>
        {platform === 'macos' ? (
          <div style={{ display: 'flex', gap: '8px', marginRight: '16px' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          </div>
        ) : (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
            <button style={{ width: 46, height: 30, border: 'none', background: 'transparent' }}>─</button>
            <button style={{ width: 46, height: 30, border: 'none', background: 'transparent' }}>□</button>
            <button style={{ width: 46, height: 30, border: 'none', background: 'transparent' }}>✕</button>
          </div>
        )}
        <span style={{ fontSize: '13px', color: '#4d4d4d', fontWeight: 500 }}>{title}</span>
      </div>

      {/* Toolbar */}
      <div style={{
        height: '44px',
        background: '#fafafa',
        borderBottom: '1px solid #e5e5e5',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '8px'
      }}>
        {/* toolbar content: buttons, search, view toggles */}
      </div>

      {/* Main layout */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{
          width: sidebarCollapsed ? '56px' : '240px',
          borderRight: '1px solid #e5e5e5',
          background: '#f7f7f7',
          transition: 'width 0.2s ease',
          overflow: 'hidden',
          flexShrink: 0
        }}>
          <SidebarNav collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </div>

        {/* Optional: auxiliary panel */}
        {/* <ResizablePanel defaultWidth={320} minWidth={240} maxWidth={480} /> */}
      </div>

      {/* Status bar */}
      <div style={{
        height: '24px',
        background: '#f0f0f0',
        borderTop: '1px solid #e5e5e5',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        fontSize: '11px',
        color: '#888'
      }}>
        <span>就绪</span>
        <span style={{ marginLeft: 'auto' }}>共 42 项</span>
      </div>
    </div>
  );
};
```

## Routing: Hash-based SPA

```jsx
const [currentPage, setCurrentPage] = useState('home');
const [pageHistory, setPageHistory] = useState(['home']);

const navigate = (page) => {
  setPageHistory(prev => [...prev, page]);
  setCurrentPage(page);
};

const goBack = () => {
  if (pageHistory.length > 1) {
    const newHistory = pageHistory.slice(0, -1);
    setPageHistory(newHistory);
    setCurrentPage(newHistory[newHistory.length - 1]);
  }
};
```

## Page Transition Animations

```css
/* Slide in from right (push) */
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

/* Slide up from bottom (present/modal) */
@keyframes slideInUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.page-enter { animation: slideInRight 0.3s ease-out; }
.modal-enter { animation: slideInUp 0.3s ease-out; }
```

## State Simulation Patterns

### Loading State (Skeleton Screen)

```jsx
const SkeletonCard = () => (
  <div className="animate-pulse p-4">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-3 bg-gray-200 rounded w-1/2" />
  </div>
);

// Usage: simulate loading delay
const [loading, setLoading] = useState(true);
useEffect(() => {
  setTimeout(() => setLoading(false), 1500);
}, []);
```

### Empty State

```jsx
const EmptyState = ({ icon, title, description, actionText, onAction }) => (
  <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
    <div className="text-6xl mb-4">{icon || '📭'}</div>
    <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 mb-6">{description}</p>
    {actionText && (
      <button
        onClick={onAction}
        className="px-6 py-2 bg-blue-500 text-white rounded-full text-sm"
      >
        {actionText}
      </button>
    )}
  </div>
);
```

### State Switcher (Debug Tool)

Add a floating debug panel to toggle page states:

```jsx
const [debugState, setDebugState] = useState('default');

const StateSwitcher = () => (
  <div style={{
    position: 'fixed', bottom: 100, right: 20,
    background: '#333', borderRadius: 8, padding: 8,
    display: 'flex', gap: 4, zIndex: 9999
  }}>
    {['default', 'loading', 'empty', 'error'].map(s => (
      <button
        key={s}
        onClick={() => setDebugState(s)}
        style={{
          padding: '4px 8px', borderRadius: 4, fontSize: 10,
          background: debugState === s ? '#007AFF' : '#555',
          color: '#fff', border: 'none', cursor: 'pointer'
        }}
      >
        {s}
      </button>
    ))}
  </div>
);
```

## Common UI Patterns

### Mobile: Tab Bar

```jsx
const TabBar = ({ current, onChange }) => {
  const tabs = [
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'discover', label: '发现', icon: '🔍' },
    { id: 'messages', label: '消息', icon: '💬', badge: 3 },
    { id: 'profile', label: '我的', icon: '👤' },
  ];

  return (
    <div className="flex justify-around items-center h-full bg-white">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex flex-col items-center gap-0.5 relative
            ${current === tab.id ? 'text-blue-500' : 'text-gray-400'}`}
        >
          <span className="text-xl">{tab.icon}</span>
          <span className="text-[10px]">{tab.label}</span>
          {tab.badge && (
            <span className="absolute -top-1 right-0 bg-red-500 text-white
              text-[9px] rounded-full min-w-[16px] h-4 flex items-center
              justify-center px-1">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
```

### Desktop: Sidebar Navigation

```jsx
const SidebarNav = ({ collapsed, onToggle, current, onChange }) => {
  const items = [
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'projects', label: '项目', icon: '📁' },
    { id: 'messages', label: '消息', icon: '💬', badge: 3 },
    { id: 'analytics', label: '分析', icon: '📊' },
    { id: 'settings', label: '设置', icon: '⚙️' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '8px 0' }}>
      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        style={{
          width: '100%', padding: '8px 16px', border: 'none',
          background: 'transparent', cursor: 'pointer',
          textAlign: collapsed ? 'center' : 'right',
          fontSize: '14px', color: '#888'
        }}
      >
        {collapsed ? '→' : '←'}
      </button>

      {/* Nav items */}
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: collapsed ? '10px 0' : '10px 16px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            border: 'none', cursor: 'pointer', width: '100%',
            background: current === item.id ? '#e8f0fe' : 'transparent',
            color: current === item.id ? '#1a73e8' : '#333',
            borderRadius: '6px', margin: '2px 8px',
            position: 'relative', fontSize: '14px',
            transition: 'background 0.15s ease'
          }}
          onMouseEnter={e => {
            if (current !== item.id) e.currentTarget.style.background = '#eee';
          }}
          onMouseLeave={e => {
            if (current !== item.id) e.currentTarget.style.background = 'transparent';
          }}
        >
          <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
          {!collapsed && <span>{item.label}</span>}
          {item.badge && !collapsed && (
            <span style={{
              marginLeft: 'auto', background: '#e53935', color: '#fff',
              fontSize: '11px', borderRadius: '10px', padding: '1px 6px',
              minWidth: '18px', textAlign: 'center'
            }}>
              {item.badge}
            </span>
          )}
          {item.badge && collapsed && (
            <span style={{
              position: 'absolute', top: '6px', right: '10px',
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#e53935'
            }} />
          )}
        </button>
      ))}
    </div>
  );
};
```

### Navigation Bar

```jsx
const NavBar = ({ title, onBack, rightAction }) => (
  <div className="flex items-center h-11 px-4 bg-white border-b border-gray-100">
    {onBack && (
      <button onClick={onBack} className="text-xl mr-3">←</button>
    )}
    <h1 className="flex-1 text-base font-medium truncate">{title}</h1>
    {rightAction}
  </div>
);
```

### Pull-to-Refresh

```jsx
const PullToRefresh = ({ children, onRefresh }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh?.();
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div>
      {refreshing && (
        <div className="flex justify-center py-3">
          <div className="animate-spin w-5 h-5 border-2 border-blue-500
            border-t-transparent rounded-full" />
        </div>
      )}
      {children}
    </div>
  );
};
```

### Toast

```jsx
const [toast, setToast] = useState(null);

const showToast = (message, type = 'info') => {
  setToast({ message, type });
  setTimeout(() => setToast(null), 2000);
};

// Render
{toast && (
  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    bg-black/70 text-white px-6 py-3 rounded-lg text-sm z-50
    animate-fade-in">
    {toast.type === 'success' && '✓ '}
    {toast.type === 'error' && '✗ '}
    {toast.message}
  </div>
)}
```

## Desktop Interaction Patterns

### Hover States

All interactive elements must have visible hover feedback:

```jsx
// Generic hover wrapper
const Hoverable = ({ children, hoverStyle, style, ...props }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ ...style, ...(hovered ? hoverStyle : {}), transition: 'all 0.15s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
};

// Example: list row hover
<Hoverable
  style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '6px' }}
  hoverStyle={{ background: '#f5f5f5' }}
  onClick={() => navigate('detail')}
>
  <span>项目文档</span>
</Hoverable>
```

### Right-Click Context Menu

```jsx
const ContextMenu = ({ x, y, items, onClose }) => {
  useEffect(() => {
    const handler = () => onClose();
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', left: x, top: y, zIndex: 10000,
      background: '#fff', borderRadius: '8px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
      border: '1px solid #e5e5e5',
      padding: '4px 0', minWidth: '180px'
    }}>
      {items.map((item, i) =>
        item.separator ? (
          <div key={i} style={{ height: '1px', background: '#e5e5e5', margin: '4px 0' }} />
        ) : (
          <button
            key={i}
            onClick={() => { item.action(); onClose(); }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '6px 16px', border: 'none',
              background: 'transparent', cursor: 'pointer',
              fontSize: '13px', color: item.danger ? '#e53935' : '#333',
              textAlign: 'left'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span>{item.label}</span>
            {item.shortcut && (
              <span style={{ fontSize: '11px', color: '#aaa', marginLeft: '24px' }}>
                {item.shortcut}
              </span>
            )}
          </button>
        )
      )}
    </div>
  );
};

// Usage
const [contextMenu, setContextMenu] = useState(null);

const handleContextMenu = (e) => {
  e.preventDefault();
  setContextMenu({
    x: e.clientX, y: e.clientY,
    items: [
      { label: '打开', shortcut: '⏎', action: () => navigate('detail') },
      { label: '在新窗口打开', shortcut: '⌘⏎', action: () => {} },
      { separator: true },
      { label: '复制', shortcut: '⌘C', action: () => {} },
      { label: '移动到…', action: () => {} },
      { separator: true },
      { label: '删除', shortcut: '⌫', danger: true, action: () => {} },
    ]
  });
};
```

### Keyboard Shortcut Hints

Display shortcut hints on buttons and menu items:

```jsx
const ShortcutButton = ({ label, shortcut, onClick, ...props }) => (
  <button
    onClick={onClick}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      padding: '6px 12px', border: '1px solid #d1d1d1',
      borderRadius: '6px', background: '#fff', cursor: 'pointer',
      fontSize: '13px', color: '#333'
    }}
    title={`${label} (${shortcut})`}
    {...props}
  >
    <span>{label}</span>
    <kbd style={{
      fontSize: '11px', color: '#888', background: '#f5f5f5',
      padding: '1px 5px', borderRadius: '3px',
      border: '1px solid #ddd'
    }}>
      {shortcut}
    </kbd>
  </button>
);

// Register keyboard shortcuts
useEffect(() => {
  const handler = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openCommandPalette();
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
      e.preventDefault();
      createNewItem();
    }
  };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, []);
```

### Tab Focus Navigation

```jsx
// Visible focus ring for keyboard navigation
const focusRingStyle = `
  *:focus-visible {
    outline: 2px solid #1a73e8;
    outline-offset: 2px;
    border-radius: 4px;
  }
  *:focus:not(:focus-visible) {
    outline: none;
  }
`;

// Inject as <style> in the prototype
<style>{focusRingStyle}</style>

// Ensure all interactive elements are focusable with proper tabIndex
// Use tabIndex={0} on custom interactive elements
// Use tabIndex={-1} to remove from tab order but allow programmatic focus
```

### Resizable Split Panes

```jsx
const ResizablePanes = ({ left, right, defaultSplit = 0.6, minLeft = 200, minRight = 200 }) => {
  const containerRef = useRef(null);
  const [split, setSplit] = useState(defaultSplit);
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = () => setDragging(true);

  useEffect(() => {
    if (!dragging) return;
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      const minLeftRatio = minLeft / rect.width;
      const minRightRatio = 1 - (minRight / rect.width);
      setSplit(Math.max(minLeftRatio, Math.min(minRightRatio, ratio)));
    };
    const handleMouseUp = () => setDragging(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, minLeft, minRight]);

  return (
    <div ref={containerRef} style={{ display: 'flex', height: '100%', position: 'relative' }}>
      <div style={{ width: `${split * 100}%`, overflow: 'auto' }}>{left}</div>
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: '6px', cursor: 'col-resize', background: dragging ? '#1a73e8' : '#e5e5e5',
          transition: dragging ? 'none' : 'background 0.15s',
          flexShrink: 0
        }}
      />
      <div style={{ flex: 1, overflow: 'auto' }}>{right}</div>
    </div>
  );
};
```

### Tooltip with Delay

```jsx
const Tooltip = ({ children, text, delay = 500 }) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const timerRef = useRef(null);

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {visible && (
        <div style={{
          position: 'fixed', left: pos.x, top: pos.y,
          transform: 'translate(-50%, -100%)',
          background: '#333', color: '#fff',
          padding: '4px 10px', borderRadius: '4px',
          fontSize: '12px', whiteSpace: 'nowrap',
          pointerEvents: 'none', zIndex: 10000
        }}>
          {text}
        </div>
      )}
    </>
  );
};
```

## Realistic Mock Data

Always use Chinese mock data for Chinese products:

```jsx
const mockUsers = [
  { name: '张明', avatar: '👨‍💼', role: '产品经理' },
  { name: '李芳', avatar: '👩‍💻', role: '前端工程师' },
  { name: '王伟', avatar: '👨‍🔬', role: '数据分析师' },
];

const mockMessages = [
  { from: '张明', content: '下午的评审会议改到3点了', time: '10:32', unread: true },
  { from: '产品讨论群', content: '李芳: 新版原型已经更新了', time: '09:45', unread: false },
];
```

## Implementation Strategy

### Single Platform (3-5 pages)

Generate everything in one file. Three steps:

**Step 1 — Framework**: Set up the shell (routing + navigation + frame wrapper)

```jsx
export default function App() {
  const [page, setPage] = useState('home');
  // ... state management

  const renderPage = () => {
    switch(page) {
      case 'home': return <HomePage />;
      case 'detail': return <DetailPage />;
      case 'form': return <FormPage />;
      default: return <HomePage />;
    }
  };

  return (
    <PhoneFrame> {/* or <DesktopFrame> */}
      <StatusBar />
      <div className="flex-1 overflow-y-auto">
        {renderPage()}
      </div>
      <TabBar current={page} onChange={setPage} /> {/* or <SidebarNav /> */}
    </PhoneFrame>
  );
}
```

**Step 2 — Fill pages**: Implement each page with real content, states, and interactions

**Step 3 — Polish**: Add animations, loading states, error states, edge cases

### Cross-Platform (5 steps)

For projects targeting both mobile and desktop:

**Step 1 — Shared Design Tokens**: Define CSS variables shared by both files

```css
:root {
  /* Colors */
  --color-primary: #1a73e8;
  --color-primary-hover: #1557b0;
  --color-bg: #ffffff;
  --color-surface: #f7f7f7;
  --color-border: #e5e5e5;
  --color-text-primary: #333333;
  --color-text-secondary: #888888;
  --color-danger: #e53935;

  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --text-xs: 11px;
  --text-sm: 13px;
  --text-base: 15px;
  --text-lg: 17px;
  --text-xl: 22px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Shape */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.12);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.16);
}
```

**Step 2 — Mobile prototype** (`prototype-mobile.html`): Build the mobile version with phone frame, tab bar, touch interactions

**Step 3 — Desktop prototype** (`prototype-desktop.html`): Build the desktop version with window frame, sidebar, hover/keyboard interactions

**Step 4 — Fill pages for both**: Implement all pages in both files, ensuring content parity but platform-appropriate layouts

**Step 5 — Independent QA**: Test each prototype independently against its platform's quality checklist

## Cross-Platform Batch Output Strategy

When outputting pages for both platforms, follow this strategy:

1. **Start with the page that has the biggest layout difference** between mobile and desktop (e.g., a dashboard or multi-panel workspace) — this establishes the pattern for how content maps across platforms
2. **Output the same page for both platforms simultaneously** (mobile first, then desktop) before moving to the next page — this ensures content parity and catches design inconsistencies early
3. **Shared components** (cards, badges, avatars) should use the same Design Token variables — only the layout container and interaction patterns differ
4. **Page-by-page order**: dashboard/home → list/browse → detail → form/create → settings

## Quality Checklist

### Mobile

- [ ] Phone frame with realistic status bar (390×844)
- [ ] All pages from the spec are implemented
- [ ] Tab navigation works correctly
- [ ] Page transitions have animation
- [ ] At least default + loading states are shown
- [ ] Mock data is realistic (Chinese names, content)
- [ ] Touch targets are ≥ 44px
- [ ] Scrolling works naturally in content areas
- [ ] Back navigation works consistently
- [ ] No broken interactions or dead-end states

### Desktop

- [ ] Window frame with title bar and traffic lights / window controls (1280×800)
- [ ] Sidebar navigation works and collapses correctly (240px ↔ 56px)
- [ ] Sidebar collapsed state shows icons only with no label overflow
- [ ] Keyboard navigation works (Tab focus ring visible on all interactive elements)
- [ ] Keyboard shortcuts are registered and hint labels shown
- [ ] Right-click context menu appears on relevant items
- [ ] Hover states on all interactive elements (buttons, rows, links, cards)
- [ ] Window resize does not break layout
- [ ] Title bar area is styled correctly (draggable feel, no selectable text)
- [ ] Information density is appropriate (more items visible than mobile)
- [ ] All pages from the spec are implemented
- [ ] No broken interactions or dead-end states
