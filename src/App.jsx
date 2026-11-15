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
import AboutUs from './components/home/AboutUs';

const PAGES = {
  shop: ShopPage,
  'box-builder': BoxBuilderPage,
  health: HealthPage,
  farm: FarmPage,
  orders: OrdersPage,
  profile: ProfilePage,
  about: AboutUs
};

function AppShell() {
  const { activeTab, apiError } = useStore();
  const Page = PAGES[activeTab] || ShopPage;

  return (
    <div className="relative min-h-screen text-[#152A1B] font-sans antialiased">
      {/* Page background: mint gradient, soft green glows and a faint dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#F4FAF5] via-[#EEF6F0] to-[#F8FBF8]"
      >
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#98E59E]/30 blur-3xl" />
        <div className="absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[#2C6E49]/15 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-[#CDEFD2]/50 blur-3xl" />
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(21,59,43,0.10)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

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