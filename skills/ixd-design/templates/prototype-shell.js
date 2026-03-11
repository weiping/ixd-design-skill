/**
 * IxD Prototype Shell Template — Mobile
 * 
 * This is a starter template for generating interactive prototypes (MOBILE version).
 * It provides the phone frame, routing, tab bar, nav bar, and common
 * UI patterns. Fill in the page components for your specific product.
 * 
 * For PC desktop client prototypes, see phase7-prototype.md Desktop Window Frame section.
 * Cross-platform products should generate TWO separate files:
 *   - prototype-mobile.html (this template)
 *   - prototype-desktop.html (desktop shell with sidebar nav + toolbar + multi-panel layout)
 * Both files share the same Design Token CSS variables.
 * 
 * Usage: Copy this template and customize for the target product.
 * Works as both a React JSX artifact and a standalone HTML file.
 */

// ============================================================
// CONFIGURATION - Modify these for each product
// ============================================================

const CONFIG = {
  // Product info
  productName: '<<产品名称>>',
  
  // Design tokens
  colors: {
    primary: '#007AFF',
    primaryDark: '#0056CC',
    primaryLight: '#E5F0FF',
    success: '#52C41A',
    warning: '#FAAD14',
    error: '#FF4D4F',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textPlaceholder: '#BFBFBF',
    border: '#E8E8E8',
    bgPage: '#F5F5F5',
    bgCard: '#FFFFFF',
    bgMask: 'rgba(0,0,0,0.45)',
  },
  
  // Tab configuration
  tabs: [
    { id: 'home', label: '首页', icon: '🏠', iconActive: '🏠' },
    { id: 'discover', label: '发现', icon: '🔍', iconActive: '🔍' },
    { id: 'messages', label: '消息', icon: '💬', iconActive: '💬', badge: 3 },
    { id: 'profile', label: '我的', icon: '👤', iconActive: '👤' },
  ],
  
  // Pages configuration
  pages: {
    home: { title: '首页', hasTabBar: true, hasNavBar: false },
    discover: { title: '发现', hasTabBar: true, hasNavBar: true },
    messages: { title: '消息', hasTabBar: true, hasNavBar: true },
    profile: { title: '我的', hasTabBar: true, hasNavBar: false },
    // Add sub-pages here:
    // detail: { title: '详情', hasTabBar: false, hasNavBar: true, hasBack: true },
  },
};

// ============================================================
// REACT COMPONENT TEMPLATE
// ============================================================

/*
import { useState, useEffect, useCallback } from "react";

export default function PrototypeApp() {
  // --- Routing ---
  const [currentPage, setCurrentPage] = useState('home');
  const [pageHistory, setPageHistory] = useState(['home']);
  const [pageTransition, setPageTransition] = useState('');

  const navigate = useCallback((page) => {
    setPageTransition('slide-in');
    setPageHistory(prev => [...prev, page]);
    setCurrentPage(page);
    setTimeout(() => setPageTransition(''), 300);
  }, []);

  const goBack = useCallback(() => {
    if (pageHistory.length > 1) {
      setPageTransition('slide-out');
      const newHistory = pageHistory.slice(0, -1);
      setPageHistory(newHistory);
      setCurrentPage(newHistory[newHistory.length - 1]);
      setTimeout(() => setPageTransition(''), 300);
    }
  }, [pageHistory]);

  // --- Toast ---
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  }, []);

  // --- Debug State Switcher ---
  const [debugState, setDebugState] = useState('default');

  // --- Page Config ---
  const pageConfig = CONFIG.pages[currentPage] || CONFIG.pages.home;
  const isTabPage = pageConfig.hasTabBar;

  // --- Render ---
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', background: '#1a1a2e', padding: '20px'
    }}>
      {/* Phone Frame */}
      <div style={{
        width: '390px', height: '844px',
        borderRadius: '40px', overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        position: 'relative', background: CONFIG.colors.bgPage,
        display: 'flex', flexDirection: 'column'
      }}>
        
        {/* Status Bar */}
        <StatusBar />
        
        {/* Nav Bar */}
        {pageConfig.hasNavBar && (
          <NavBar
            title={pageConfig.title}
            onBack={pageConfig.hasBack ? goBack : undefined}
          />
        )}
        
        {/* Page Content */}
        <div style={{
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          animation: pageTransition === 'slide-in'
            ? 'slideInRight 0.3s ease-out'
            : pageTransition === 'slide-out'
              ? 'slideOutRight 0.3s ease-out'
              : 'none'
        }}>
          {renderPage(currentPage, { navigate, goBack, showToast, debugState })}
        </div>
        
        {/* Tab Bar */}
        {isTabPage && (
          <TabBar
            current={currentPage}
            onChange={(tab) => {
              setPageHistory([tab]);
              setCurrentPage(tab);
            }}
            tabs={CONFIG.tabs}
          />
        )}
        
        {/* Toast */}
        {toast && <Toast message={toast.message} type={toast.type} />}
        
        {/* Home Indicator */}
        <div style={{
          height: '34px', display: 'flex', justifyContent: 'center',
          alignItems: 'flex-end', paddingBottom: '8px'
        }}>
          <div style={{
            width: '134px', height: '5px', borderRadius: '3px',
            background: '#000'
          }} />
        </div>
      </div>
      
      {/* Debug State Switcher */}
      <DebugPanel state={debugState} onChange={setDebugState} />
      
      {/* Global Styles */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(30%); opacity: 0.5; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-10%); opacity: 0.8; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

// ============================================================
// SHARED COMPONENTS
// ============================================================

function StatusBar() { ... }
function NavBar({ title, onBack, rightAction }) { ... }
function TabBar({ current, onChange, tabs }) { ... }
function Toast({ message, type }) { ... }
function DebugPanel({ state, onChange }) { ... }
function SkeletonScreen() { ... }
function EmptyState({ icon, title, description, actionText, onAction }) { ... }
function ErrorState({ onRetry }) { ... }

// ============================================================
// PAGE COMPONENTS - Replace these with actual page content
// ============================================================

function renderPage(pageId, props) {
  switch(pageId) {
    case 'home': return <HomePage {...props} />;
    case 'discover': return <DiscoverPage {...props} />;
    case 'messages': return <MessagesPage {...props} />;
    case 'profile': return <ProfilePage {...props} />;
    default: return <HomePage {...props} />;
  }
}

function HomePage({ navigate, showToast, debugState }) {
  // Replace with actual home page content
  return <div>Home Page Content</div>;
}

// ... more page components
*/

module.exports = { CONFIG };
