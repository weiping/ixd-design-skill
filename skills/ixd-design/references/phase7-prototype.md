# Phase 7: Interactive Prototype

## Objective

Generate a clickable, high-fidelity prototype that can be tested in a browser or rendered as a claude.ai artifact. This is the AI's unique advantage over traditional tools like Modao — producing real, functional code.

## Platform Configuration

The `platform` field in `progress.json` determines the output:

| platform | Output File(s) | Viewport | Primary Interactions |
|----------|---------------|----------|---------------------|
| `"mobile"` (default) | `phase7-prototype.html` | 390×844px phone frame | Touch, swipe, pull-to-refresh |
| `"desktop"` | `phase7-prototype-desktop.html` | 1280×800px window frame | Hover, right-click, keyboard, drag |
| `"both"` | Two files (mobile + desktop) | Both viewports | Both interaction sets |

**Default behavior**: If `platform` is not set, assume `"mobile"`.

## Output Formats

| Format | Use Case | File |
|--------|----------|------|
| Single HTML | Quick demo, standalone sharing | `.html` |
| React JSX | Claude.ai artifact rendering | `.jsx` |
| Multi-file React | Complex prototypes (via web-artifacts-builder skill) | `.jsx` + supporting files |

Default to **React JSX** when in claude.ai, **single HTML** when in Claude Code.

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
        <span>Ready</span>
        <span style={{ marginLeft: 'auto' }}>42 items total</span>
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
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'discover', label: 'Discover', icon: '🔍' },
    { id: 'messages', label: 'Messages', icon: '💬', badge: 3 },
    { id: 'profile', label: 'Profile', icon: '👤' },
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
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'messages', label: 'Messages', icon: '💬', badge: 3 },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
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
  <span>Project Documents</span>
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
      { label: 'Open', shortcut: '⏎', action: () => navigate('detail') },
      { label: 'Open in New Window', shortcut: '⌘⏎', action: () => {} },
      { separator: true },
      { label: 'Copy', shortcut: '⌘C', action: () => {} },
      { label: 'Move to...', action: () => {} },
      { separator: true },
      { label: 'Delete', shortcut: '⌫', danger: true, action: () => {} },
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

Use mock data that matches the output language. For Chinese products:

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

For English products:

```jsx
const mockUsers = [
  { name: 'John', avatar: '👨‍💼', role: 'Product Manager' },
  { name: 'Sarah', avatar: '👩‍💻', role: 'Frontend Engineer' },
  { name: 'Mike', avatar: '👨‍🔬', role: 'Data Analyst' },
];

const mockMessages = [
  { from: 'John', content: 'The review meeting has been moved to 3pm', time: '10:32', unread: true },
  { from: 'Product Team', content: 'Sarah: The new prototype has been updated', time: '09:45', unread: false },
];
```

## Implementation Strategy

### Step 1 — Read Platform Configuration

```js
// Read from progress.json
const { platform } = require('./doc/ixd/progress.json');
// Values: "mobile" (default) | "desktop" | "both"
```

### Step 2 — Generate Framework

**Mobile (`platform: "mobile"`)**:
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
    <PhoneFrame>
      <StatusBar />
      <div className="flex-1 overflow-y-auto">
        {renderPage()}
      </div>
      <TabBar current={page} onChange={setPage} />
    </PhoneFrame>
  );
}
```

**Desktop (`platform: "desktop"`)**:
```jsx
export default function App() {
  const [page, setPage] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // ... state management

  return (
    <DesktopFrame title="App Name" platform="macos">
      <SidebarNav
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        current={page}
        onChange={setPage}
      />
      <div className="flex-1 overflow-y-auto">
        {renderPage()}
      </div>
    </DesktopFrame>
  );
}
```

### Step 3 — Fill Pages

Implement each page with real content, states, and interactions.

### Step 4 — Polish

Add animations, loading states, error states, edge cases.

### Cross-Platform (`platform: "both"`)

For projects targeting both mobile and desktop, generate **two separate files**:

1. **Generate shared Design Token CSS variables** (used by both files):

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

2. **Generate mobile prototype** (`phase7-prototype-mobile.html`): Phone frame, tab bar, touch interactions

3. **Generate desktop prototype** (`phase7-prototype-desktop.html`): Window frame, sidebar, hover/keyboard interactions

4. **Fill pages for both**: Implement all pages in both files, ensuring content parity but platform-appropriate layouts

5. **Independent QA**: Test each prototype independently against its platform's quality checklist

## Resume Logic (Breakpoint Recovery)

When resuming Phase 7 after a break, follow this process:

### Step 1: Read Progress State

```js
// Read from progress.json
const phase7Status = progress.phases['7'];
const completedPages = phase7Status.pagesCompleted || [];
const pagesTotal = phase7Status.pagesTotal || 0;
const platform = progress.platform || 'mobile'; // "mobile" | "desktop" | "both"
```

### Step 2: Calculate Remaining Pages

```js
// Read Phase 2 page inventory
const expectedPages = readPageInventory('doc/ixd/phase2-architecture.md');
// Returns: [{ id: 'P01', name: 'Home', type: 'Hub' }, ...]

// Calculate remaining
const remainingPages = expectedPages.filter(p => !completedPages.includes(p.id));
```

### Step 3: Resume Decision

```
IF remainingPages.length > 0:
  OUTPUT: "## Phase 7 Resume

  **Platform**: <<mobile/desktop/both>>
  **Completed**: <<M>>/<<total>> pages
  **Remaining**: <<K>> pages to implement

  | Page ID | Page Name | Page Type |
  |---------|-----------|-----------|
  | <<P04>> | <<Product Detail>> | Detail |
  | ... | ... | ... |

  Resuming from **<<first remaining page>>**."

  → Process remaining pages in batches (3-5 for single platform, 2-3×2 for cross-platform)
  → Update pagesCompleted after each batch

ELSE (remainingPages.length === 0):
  → Run Completeness Check (Step 4)
```

### Step 4: Completeness Check (when all pages marked complete)

Even when `pagesCompleted.length === pagesTotal`, verify actual implementation:

```js
// For single platform
const actualPages = extractPagesFromPrototype('phase7-prototype.html');

// For cross-platform
const mobilePages = extractPagesFromPrototype('phase7-prototype-mobile.html');
const desktopPages = extractPagesFromPrototype('phase7-prototype-desktop.html');

// Compare with Phase 2 inventory
const missingPages = expectedPages.filter(p => !actualPages.includes(p.id));
```

**Result Handling**:
```
IF missingPages.length === 0:
  OUTPUT: "✅ Completeness check passed, all <<N>> pages implemented. Proceeding to Phase 8."
  → Set phase 7 status to "done"
  → Proceed to Phase 8

ELSE:
  OUTPUT: "⚠️ Found <<N>> missing pages: <<page name list>>

  Will supplement these page implementations first."
  → Generate missing pages
  → Re-run completeness check
  → Then proceed to Phase 8
```

---

## Batch Output Strategy

### Single-Platform Batch Output (`platform: "mobile"` or `"desktop"`)

When generating pages for a single platform, follow this strategy:

1. **Read page inventory** from `doc/ixd/phase2-architecture.md` — get the complete list of pages
2. **Prioritize by importance**: dashboard/home → core lists → detail pages → forms → settings → secondary pages
3. **Output in batches of 3-5 pages** per turn to avoid token limits
4. **Track progress**: After each batch, record which pages are completed in `progress.json`

**Batch order example**:
```
Batch 1: Home(Hub) + Core list pages + Core detail pages
Batch 2: Secondary list pages + Secondary detail pages + Form pages
Batch 3: Settings pages + Profile pages + Search pages
Batch 4: Onboarding pages + Empty states + Error pages + Other auxiliary pages
```

### Cross-Platform Batch Output (`platform: "both"`)

When `platform: "both"`, follow this strategy for outputting pages:

1. **Start with the page that has the biggest layout difference** between mobile and desktop (e.g., a dashboard or multi-panel workspace) — this establishes the pattern for how content maps across platforms
2. **Output the same page for both platforms simultaneously** (mobile first, then desktop) before moving to the next page — this ensures content parity and catches design inconsistencies early
3. **Shared components** (cards, badges, avatars) should use the same Design Token variables — only the layout container and interaction patterns differ
4. **Page-by-page order**: dashboard/home → list/browse → detail → form/create → settings
5. **Output in batches of 2-3 pages × 2 platforms = 4-6 files per turn**

## Page Completeness Check

After all pages are generated, perform a **completeness check** against the Phase 2 page inventory:

### Step 1: Read Page Inventory

```js
// Read from phase2-architecture.md
// Extract the page list table to get all expected pages
const expectedPages = [
  { id: 'P01', name: 'Home', type: 'Hub' },
  { id: 'P02', name: 'Product List', type: 'List' },
  { id: 'P03', name: 'Product Detail', type: 'Detail' },
  // ... all pages from Phase 2
];
```

### Step 2: Check Implemented Pages

Scan the prototype code to identify which pages have been implemented:

```js
// For single platform
const implementedPages = []; // Extract from switch/case or route definitions

// For cross-platform, check both files
const mobilePages = [];   // from phase7-prototype-mobile.html
const desktopPages = [];  // from phase7-prototype-desktop.html
```

### Step 3: Identify Missing Pages

```js
const missingPages = expectedPages.filter(p => !implementedPages.includes(p.id));

if (missingPages.length > 0) {
  console.log(`⚠️ Missing ${missingPages.length} pages:`, missingPages);
  // Proceed to Step 4
} else {
  console.log('✅ All pages implemented');
}
```

### Step 4: Generate Missing Pages

For each missing page:
1. Read the corresponding page spec from `doc/ixd/phase4-page-specs/<page-id>.md`
2. Implement the page in the prototype(s)
3. Add the page to the routing switch/case
4. Ensure navigation links point to the new page

### Step 5: Update Progress

```json
// Update progress.json
{
  "7": {
    "status": "done",
    "file": "phase7-prototype.html",
    "summary": "Completed <<N>>/<<total>> pages; mobile prototype",
    "pagesCompleted": ["P01", "P02", "P03", "..."],
    "pagesTotal": 15
  }
}
```

### Completeness Report Template

After the check, output a brief report:

```
## Phase 7 Page Completeness Check

**Platform**: Mobile / Desktop / Both
**Phase 2 Total Pages**: <<N>>
**Implemented Pages**: <<M>>

| Status | Page ID | Page Name | Page Type |
|--------|---------|-----------|-----------|
| ✅ | P01 | Home | Hub |
| ✅ | P02 | List | List |
| ⚠️ | P05 | Settings | Settings | ← Needs supplement
| ... | ... | ... | ... |

**Missing Pages**: <<N-M>>
<<If none missing, write "None, all pages implemented">>

<<If missing>>
### Supplement Plan
Will supplement missing pages in this order:
1. <<Page Name>> (<<Page ID>>)
2. <<Page Name>> (<<Page ID>>)
...
```

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
