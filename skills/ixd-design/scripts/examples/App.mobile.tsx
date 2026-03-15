// src/App.mobile.tsx — Mobile prototype app entry
// Shows routing pattern with PrototypeShell + PhoneFrame + AppTabBar
import { useState } from 'react';
import { PrototypeShell } from '@/components/layout/PrototypeShell';
import { PhoneFrame } from '@/components/layout/PhoneFrame';
import { AppTabBar } from '@/components/layout/AppTabBar';
import { Home, ProductDetail, Cart, Profile } from '@/pages/mobile';

const pages = [
  { id: 'home', name: 'Home' },
  { id: 'detail', name: 'Detail' },
  { id: 'cart', name: 'Cart' },
  { id: 'profile', name: 'Profile' },
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      // Pages with Tab Bar: pass AppTabBar as tabBar slot
      case 'home':
        return (
          <PhoneFrame tabBar={<AppTabBar activeTab="home" onTabChange={setCurrentPage} />}>
            <Home />
          </PhoneFrame>
        );
      // Pages without Tab Bar: omit tabBar prop (detail pages, auth pages, etc.)
      case 'detail':
        return (
          <PhoneFrame>
            <ProductDetail />
          </PhoneFrame>
        );
      case 'cart':
        return (
          <PhoneFrame tabBar={<AppTabBar activeTab="cart" onTabChange={setCurrentPage} />}>
            <Cart />
          </PhoneFrame>
        );
      case 'profile':
        return (
          <PhoneFrame tabBar={<AppTabBar activeTab="profile" onTabChange={setCurrentPage} />}>
            <Profile />
          </PhoneFrame>
        );
      default:
        return null;
    }
  };

  return (
    <PrototypeShell
      productName="<<Product Name>>"
      displayMode="mobile"
      pages={pages}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      interactions={[
        // From Phase 4 interaction specs
        'Tap product card to view details',
        'Swipe left on cart item to delete',
        'Pull down to refresh home data',
      ]}
    >
      {renderPage()}
    </PrototypeShell>
  );
}

export default App;
