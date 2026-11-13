import React from 'react';
import { AlertCircle } from 'lucide-react';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProductModal from './components/modals/ProductModal';
import LoginModal from './components/modals/LoginModal';
import CartDrawer from './components/modals/CartDrawer';
import CheckoutSuccessModal from './components/modals/CheckoutSuccessModal';
import ShopPage from './pages/ShopPage';
import BoxBuilderPage from './pages/BoxBuilderPage';
import HealthPage from './pages/HealthPage';
import FarmPage from './pages/FarmPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';

const PAGES = {
  shop: ShopPage,
  'box-builder': BoxBuilderPage,
  health: HealthPage,
  farm: FarmPage,
  orders: OrdersPage,
  profile: ProfilePage
};

function AppShell() {
  const { activeTab, apiError } = useStore();
  const Page = PAGES[activeTab] || ShopPage;

  return (
    <div className="min-h-screen bg-[#FAFBF9] text-[#152A1B] font-sans antialiased">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-12">
        {apiError && activeTab === 'shop' && (
          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-2xl flex items-center space-x-2">
            <AlertCircle size={15} className="text-amber-600 shrink-0" />
            <span>{apiError}</span>
          </div>
        )}
        <Page />
      </main>

      <Footer />

      <ProductModal />
      <LoginModal />
      <CartDrawer />
      <CheckoutSuccessModal />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  );
}
